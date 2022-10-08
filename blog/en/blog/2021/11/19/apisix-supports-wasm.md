---
title: "Apache APISIX embraces the WASM ecosystem"
author: "Zexuan Luo"
authorURL: "https://github.com/spacewander"
authorImageURL: "https://avatars.githubusercontent.com/u/4161644?v=4"
keywords: 
- Apache APISIX
- WASM
- WebAssembly
- Ecosystem
- Plugin
description: This article introduces why the cloud native API gateway Apache APISIX chooses Proxy Wasm for its functionality and how to use Wasm in Apache APISIX.
tags: [Ecosystem]
image: https://static.apiseven.com/2022/10/08/634113b2e6978.png
---

> Support for WASM will be added in the upcoming Apache APISIX version (2.11.0)! By reading this article you will learn how Apache APISIX deploys the support and development of this feature from 0 to 1.

<!--truncate-->

In the upcoming release of Apache APISIX 2.11.0, we will add support for WASM! You can develop plugins in WASM, Lua, Java, Go, Python, JavaScript with Apache APISIX 2.11.0.

![Support WASM](https://static.apiseven.com/202108/1637289637179-ab74d38f-acd4-4401-908f-e1d310a33583.png)

WASM, known as [WebAssembly](https://webassembly.org/), differs from the specific programming language runtimes mentioned above, is a set of bytecode standards specifically designed to be used nested in a host environment.
If a programming language provides the ability to compile to WASM bytecode, applications written in that language can be compiled to WASM bytecode and run in some WASM-enabled host environment.

Doesn't it sound like you can run any application like an operating system as long as the host environment supports WASM?

But there is a limitation here. Just like an operating system needs to implement a specific standard syscall, in order to run a specific application, you need to implement the API required for that application.

Take JavaScript for example, although it is also JavaScript code, JS modules written for browsers can't be used directly in npm packages, because the APIs are different.

So just putting WASM into Apache APISIX doesn't work. To allow developers to run WASM on Apache APISIX, we also need to provide a special API.

## Why Proxy WASM

We weighed two options on how to provide this API.

1. Implement the corresponding WASM version of the API by referring to the lua-nginx-module interface
2. Implement Proxy WASM as a set of standards

[Proxy WASM](https://github.com/proxy-wasm/spec) is Envoy's WASM API standard. So the above question is really equivalent to, do we make our own API standard or do we reuse Envoy's existing standard?

> The WASM API standard can be broken down into two aspects:
    1. Host, which is responsible for providing the implementation of the API
    2. SDK, which is responsible for implementing a set of glue layers in a different programming language in order to call the provided APIs in that language

If we follow Envoy's standards, the advantage is that we can reuse Envoy's existing WASM SDK (Proxy WASM SDK), while the disadvantage is that this set of standards is developed by Envoy in conjunction with its own situation, and if we follow the implementation, tailoring it to meet our own demands is difficult.

After some community discussion, we finally decided to adopt the Proxy WASM standard. "Doing the hard and right thing" is naturally the hard thing to do, but we believe it is the right thing to do, and through community collaboration and building together, we can build a more prosperous ecosystem.

## How to use WASM in Apache APISIX

Apache APISIX now has initial support for WASM, which can be used to write parts of the fault-injection plugin. You can try it in Apache APISIX 2.11.0 at the end of this month, so stay tuned!

In the following, we will talk about how to use WASM to inject custom responses in conjunction with [proxy-wasm-go-sdk](https://github.com/tetratelabs/proxy-wasm-go-sdk/).

### Step 1: Write code based on proxy-wasm-go-sdk

The implementation code (including go.mod and others) can be found at [here](https://github.com/apache/apisix/tree/master/t/wasm).

It should be explained that although the proxy-wasm-go-sdk project carries the Go name, it actually uses tinygo instead of native Go, which has some problems supporting WASI (which you can think of as a non-browser WASM runtime interface), see [here](https://github.com/tetratelabs/proxy-wasm-go-sdk/blob/main/doc/OVERVIEW.md#tinygo-vs-the-official-go-compiler) for more details.

### Step 2: Build the corresponding WASM file

```shell
tinygo build -o ./fault-injection/main.go.wasm -scheduler=none -target=wasi ./fault-injection/main.go
```

### Step 3: Refer to this file in `config.yaml` in Apache APISIX

```yaml
apisix:
        ...
wasm:
    plugins:
        - name: wasm_fault_injection
          priority: 7997
          file: t/wasm/fault-injection/main.go.wasm
```

By doing so, you can use this WASM plugin as if it were a Lua plugin. For example:

```yaml
---
uri: "/wasm"
plugins:
  wasm_fault_injection:
    conf: '{"body":"hello world", "http_status":200}'
upstream:
  type: roundrobin
  nodes:
    127.0.0.1:1980: 1
```

Note that the configuration of the WASM plugin is a string under the conf field, which is parsed by the corresponding plugin itself.

## Cross-sectional evaluation

Apache APISIX has evolved to the point where there are three ways to write plugins:

1. Native Lua way, running inside of APISIX.
2. External plugin runner for multiple languages, where the plugin logic runs outside of APISIX.
3. Compile multiple languages into WASM, still running inside of APISIX.

![APISIX ecosystem](https://static.apiseven.com/202108/1637289637159-f2fd1f09-4be6-4cd4-88a0-9c3a23c4f405.png)
These three approaches are very different in various aspects such as ecology and maturity. It just so happens that we can use them all for fault-injection, so we can compare them.

### Step 1: Configure Routing

The Lua way of fault-injection, naturally, uses the built-in fault-injection plugin.The Runner way fault-injection implementation can be found [here](https://github.com/apache/apisix-go-plugin-runner/blob/master/cmd/go-runner/plugins/fault_injection.go).

Let's configure different routes for each of them.

```yaml
---
uri: "/wasm"
plugins:
  wasm_fault_injection:
    conf: '{"body":"hello world", "http_status":200}'
upstream:
  type: roundrobin
  nodes:
    127.0.0.1:1980: 1
---
plugins:
  ext-plugin-pre-req:
    conf:
    - name: fault-injection
      value: '{"body":"hello world", "http_status":200}'
upstream:
  nodes:
    127.0.0.1:1980: 1
  type: roundrobin
uri: /ext-plugin
---
plugins:
  fault-injection:
    abort:
      body: hello world
      http_status: 200
upstream:
  nodes:
    127.0.0.1:1980: 1
  type: roundrobin
uri: /fault-injection
```

### Step 2: The actual pressure test

Next, try to use wrk pressure. The specific data comparison is shown in the following chart:

<table>
    <tr>
        <td colspan="3">￥ wrk -d 30 -t 5 -c 50 http://127.0.0.1:9080/wasm | Running 30s test @ http://127.0.0.1:9080/wasm | 5 threads and 50 connections</td>
    </tr>
    <tr>
        <td><b>Thread Stats</b></td>
        <td><b>Latency</b></td>
        <td><b>Req/Sec</b></td>
    </tr>
    <tr>
        <td><b>Avg</b></td>
        <td>66.17ms</td>
        <td>7.01k</td>
    </tr>
    <tr>
        <td><b>Sdev</b></td>
        <td>226.42ms</td>
        <td>3.09k</td>
    </tr>
    <tr>
        <td><b>Max</b></td>
        <td>1.99s</td>
        <td>33.97k</td>
    </tr>
    <tr>
        <td><b>+/- Stdev</b></td>
        <td>91.89%</td>
        <td>82.28%</td>
    </tr>
    <tr>
        <td><b>Request details</b></td>
        <td colspan="2">650497 requests in 36.33s, 119.70MB read</td>
    </tr>
    <tr>
        <td><b>Socket errors</b></td>
        <td colspan="2">connect 0, read 0, write 0, timeout 63</td>
    </tr>
    <tr>
        <td><b>Request/sec</b></td>
        <td colspan="2">17903.17</td>
    </tr>
    <tr>
        <td><b>Transfer/sec</b></td>
        <td colspan="2">3.29MB</td>
    </tr>
</table>

<table>
    <tr>
        <td colspan="3">￥ wrk -d 30 -t 5 -c 50 http://127.0.0.1:9080/ext-plugin | Running 30s test @ http://127.0.0.1:9080/ext-plugin | 5 threads and 50 connections</td>
    </tr>
    <tr>
        <td><b>Thread Stats</b></td>
        <td><b>Latency</b></td>
        <td><b>Req/Sec</b></td>
    </tr>
    <tr>
        <td><b>Avg</b></td>
        <td>95.69ms</td>
        <td>3.23k</td>
    </tr>
    <tr>
        <td><b>Sdev</b></td>
        <td>229.09ms</td>
        <td>1.47k</td>
    </tr>
    <tr>
        <td><b>Max</b></td>
        <td>1.70s</td>
        <td>15.18k</td>
    </tr>
    <tr>
        <td><b>+/- Stdev</b></td>
        <td>87.37%</td>
        <td>83.89%</td>
    </tr>
    <tr>
        <td><b>Request details</b></td>
        <td colspan="2">362151 requests in 30.50s, 66.64MB read</td>
    </tr>
    <tr>
        <td><b>Socket errors</b></td>
        <td colspan="2">connect 0, read 0, write 0, timeout 17</td>
    </tr>
    <tr>
        <td><b>Request/sec</b></td>
        <td colspan="2">11873.12</td>
    </tr>
    <tr>
        <td><b>Transfer/sec</b></td>
        <td colspan="2">2.18MB</td>
    </tr>
</table>

<table>
    <tr>
        <td colspan="3">￥ wrk -d 30 -t 5 -c 50 http://127.0.0.1:9080/fault-injection | Running 30s test @ http://127.0.0.1:9080/fault-injection | 5 threads and 50 connections</td>
    </tr>
    <tr>
        <td><b>Thread Stats</b></td>
        <td><b>Latency</b></td>
        <td><b>Req/Sec</b></td>
    </tr>
    <tr>
        <td><b>Avg</b></td>
        <td>86.91ms</td>
        <td>7.90k</td>
    </tr>
    <tr>
        <td><b>Sdev</b></td>
        <td>263.14ms</td>
        <td>2.04k</td>
    </tr>
    <tr>
        <td><b>Max</b></td>
        <td>1.91s</td>
        <td>15.60k</td>
    </tr>
    <tr>
        <td><b>+/- Stdev</b></td>
        <td>90.73%</td>
        <td>81.97%</td>
    </tr>
    <tr>
        <td><b>Request details</b></td>
        <td colspan="2">974326 requests in 30.07s, 179.29MB read</td>
    </tr>
    <tr>
        <td><b>Socket errors</b></td>
        <td colspan="2">connect 0, read 0, write 0, timeout 8</td>
    </tr>
    <tr>
        <td><b>Request/sec</b></td>
        <td colspan="2">32405.28</td>
    </tr>
    <tr>
        <td><b>Transfer/sec</b></td>
        <td colspan="2">5.96MB</td>
    </tr>
</table>

As you can see from the results, the performance of the WASM version is somewhere between that of the external plugin and the native Lua.

The reason why the WASM version performs so much better than the external plugin is that the fault-injection functionality is simple, so the performance loss caused by the external plugin RPC is too obvious. Considering that we haven't made any optimizations to the WASM implementation, we are satisfied with this situation.

Another benefit of WASM is that we have multilingual support at once (thanks to the Proxy WASM SDK). Details can be found in the following documentation：

- [Fault-injection(Rust)](https://gist.github.com/spacewander/0357198ea21e022003c407fd23155f79)
- [Fault-injection(AssemblyScript)](https://gist.github.com/spacewander/64773a706f1dc758aecc7f28aff7555d)

## Advantages and disadvantages

With all these benefits of WASM, aren't you a bit excited? But it is not a perfect solution at the moment, WASM/Proxy WASM still has some immature areas. For example：

- **Programming language support to be improved**: native Go's WASM support is mainly based on the browser environment, so we had to use tinygo to implement it. However, tinygo is a young project and still has a lot of limitations.
- **Proxy WASM ecosystem needs to be mature**: AssemblyScript version of the fault injection implementation, and there is no JSON decode part. This is because the AssemblyScript SDK is based on AssemblyScript version 0.14.x, and several open-source AssemblyScript JSON libraries are implemented for higher versions of AssemblyScript, and can not be used on the older AssemblyScript 0.14.
- **WASM doesn't have a built-in concurrent process**: WASM does not have a built-in concurrent process, so it cannot be scheduled by the host's scheduling system.

While there are several shortcomings listed above, we believe the future of this technology stack is bright:

1. Open source projects, including Apache APISIX and Envoy, have a strong interest in WASM, and there are many startups and large enterprises adding to the WASM ecosystem, which means that difficulties such as the stagnant AssemblyScript SDK will only be temporary. In the long run, the Proxy WASM ecosystem will flourish.
2. WASM has a bright future as the darling of serverless and edge computing. The implementation and optimization of many practical scenarios will solve the technical deficiencies more quickly.

## Come and join the project

Apache APISIX is a project that keeps up with the technology trend, Apache APISIX support for WASM is a long-term process.

"A journey of a thousand miles begins with a single step",Apache APISIX has launched the [wasm-nginx-module](https://github.com/api7/wasm-nginx-module) open source project to support WASM.

Interested readers can follow the progress of the project, we look forward to your joining us and creating the world's top projects together.
