---
title: "重磅功能！Apache APISIX 拥抱 WASM 生态"
author: "罗泽轩"
authorURL: "https://github.com/spacewander"
authorImageURL: "https://avatars.githubusercontent.com/u/4161644?v=4"
keywords: 
- Apache APISIX
- WASM
- WebAssembly
- 生态
- 插件
description: 本文介绍了云原生 API 网关 Apache APISIX 为什么选择 Proxy Wasm 来实现功能以及如何在 Apache APISIX 中使用 Wasm 并且通过实际示例演示如何测试插件。
tags: [Ecosystem]
---

> 在即将发布的 Apache APISIX 版本（2.11.0）中将会新增对于 WASM 的支持！通过阅读本文你将了解到 Apache APISIX 如何从 0 到 1 部署这项功能的支持与开发。

<!--truncate-->

在即将发布的 Apache APISIX 版本（2.11.0）中，我们新增了对于 WASM 的支持！现在开发者除了可以使用 Lua、Java、Go、Python、JavaScript 等多种编程语言开发 APISIX 的插件之外，也可以用 WASM 来开发插件。

![拥抱 WASM 生态](https://static.apiseven.com/202108/1637289637179-ab74d38f-acd4-4401-908f-e1d310a33583.png)

WASM 全称 [WebAssembly](https://webassembly.org/)，与上述具体编程语言运行时的不同之处在于，它是一套字节码标准，专门设计成可以在宿主环境中嵌套使用。

如果某种编程语言提供编译成 WASM 字节码的功能，就可以把该语言的应用编译成 WASM 字节码，运行在某个支持 WASM 的宿主环境中。

听起来，是不是只要某个宿主环境支持 WASM，就能像操作系统一样运行任意应用呢？

但其实这里有个限制，就像操作系统需要实现特定标准的 syscall 一样，要想运行特定的应用，也需要实现该应用所需的 API。

以 JavaScript 为例，虽然同样是 JavaScript 代码，但是针对浏览器写的 JS 模块不能直接用在 npm 包里面，因为两个的 API 不一样。

所以仅仅把 WASM 放到 Apache APISIX 里面并行不通，要想让开发者在 Apache APISIX 上运行 WASM，我们还需要提供一套专门的 API。

## 为什么选择 Proxy WASM

对于如何提供这套 API，我们曾经权衡过两套方案：

1. 参考 lua-nginx-module 的接口，实现对应的 WASM 版 API
2. 实现 Proxy WASM 这一套标准

[Proxy WASM](https://github.com/proxy-wasm/spec) 是 Envoy 的 WASM API 标准。所以上述问题其实等价于，我们是自己搞一套 API 标准还是复用 Envoy 已有标准呢？

> WASM API 标准可以拆成两个方面来看：
    1. Host，负责提供 API 的实现
    2. SDK，要想在不同的编程语言里面调用提供的 API，需要使用该语言来实现一套胶水层

如果我们遵循 Envoy 的标准，优势在于可以复用 Envoy 现有的 WASM SDK（Proxy WASM SDK），而不足之处在于这套标准是 Envoy 结合自己情况制定的，如果我们跟着实现，没有自己量身定制那么轻松。

经过社区的讨论后，我们最终决定采用 Proxy WASM 标准。「做难且正确的事」，实现 Proxy WASM 自然是难的事，但我们相信这是正确的事，通过社区的合作和共建，可以构建更加繁荣的生态。

## 如何在 Apache APISIX 中使用 WASM

Apache APISIX 目前已初步支持 WASM，可以使用 WASM 来编写 fault-injection 插件的部分功能。感兴趣的读者可以在本月底的 Apache APISIX 2.11.0 版本中尝尝鲜，敬请期待！

下面我们将结合 [proxy-wasm-go-sdk](https://github.com/tetratelabs/proxy-wasm-go-sdk/) 来讲讲怎么用 WASM 实现注入自定义响应的功能。

### 步骤一：基于 proxy-wasm-go-sdk 编写代码

实现代码（包含 `go.mod` 和其他）具体细节可[点击此处](https://github.com/apache/apisix/tree/master/t/wasm)查阅。

这里需要解释下，虽然 proxy-wasm-go-sdk 这个项目带了 Go 的名字，但它其实用的是 tinygo 而不是原生的 Go。因为原生的 Go 在支持 WASI（你可以认为它是非浏览器的 WASM 运行时接口）时会有一些问题，详情可[点击此处](https://github.com/tetratelabs/proxy-wasm-go-sdk/blob/main/doc/OVERVIEW.md#tinygo-vs-the-official-go-compiler)查阅。

### 步骤二：构建对应的 WASM 文件

```shell
tinygo build -o ./fault-injection/main.go.wasm -scheduler=none -target=wasi ./fault-injection/main.go
```

### 步骤三：在 Apache APISIX 的 config.yaml 引用该文件

```yaml
apisix:
        ...
wasm:
    plugins:
        - name: wasm_fault_injection
          priority: 7997
          file: t/wasm/fault-injection/main.go.wasm
```

通过以上操作，你可以像用 Lua 插件一样用这个 WASM 插件，比如：

```yaml
uri: "/wasm"
plugins:
  wasm_fault_injection:
    conf: '{"body":"hello world", "http_status":200}'
upstream:
  type: roundrobin
  nodes:
    127.0.0.1:1980: 1
```

注意 WASM 插件的配置都是 conf 字段下面的一条字符串，由对应的插件自己去做解析。

## 横向测评——条条大道通罗马

Apache APISIX 发展到现在，已经有三种编写插件的方式：

1. 原生的 Lua way，跑在 APISIX 里面
2. 多种语言的外部插件 runner，插件逻辑跑在 APISIX 外面
3. 把多种语言编译成 WASM，依然跑在 APISIX 里面

![APISIX 生态支持](https://static.apiseven.com/202108/1637289637159-f2fd1f09-4be6-4cd4-88a0-9c3a23c4f405.png)

这三种方式在诸如生态、成熟度等各个方面都差异很大。正巧我们都可以用它们来实现 fault-injection，所以可以比比看。

### 步骤一：配置路由

Lua way 的 fault-injection，自然是使用内置的 fault-injection 插件。Runner way 的 fault-injection 实现具体可[点击此处](https://github.com/apache/apisix-go-plugin-runner/blob/master/cmd/go-runner/plugins/fault_injection.go)查阅。

接下来让我们分别给它们配置不同的路由：

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

### 步骤二：实际压测

接下来试着用 wrk 进行压测，具体数据对比如下：

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

从上述结果可以看到，WASM 版本的性能介于外部插件和原生 Lua 之间。

WASM 版本的性能之所以比外部插件好那么多，是因为 fault-injection 功能简单，所以外部插件 RPC 带来的性能损耗过于明显。考虑到我们还没有对 WASM 实现做任何优化，这种情况已经让我们感到满意了。

而 WASM 的另一个好处，就是让我们一下子拥有多语言的支持（这也托了 Proxy WASM SDK 的福）。具体细节可参考下方文档：

- [Rust 版本 fault-injection](https://gist.github.com/spacewander/0357198ea21e022003c407fd23155f79)
- [AssemblyScript 版本 fault-injection](https://gist.github.com/spacewander/64773a706f1dc758aecc7f28aff7555d)

## 道路曲折，但前途光明

说了这么多 WASM 的好处，是不是有点心动呢？但它目前并非是一个完美的解决方案， WASM/Proxy WASM 还是有一些不够成熟的地方。比如：

- **编程语言支持待完善**：原生 Go 的 WASM 支持，主要是基于浏览器环境的，所以我们不得不用 tinygo 来实现。但是 tinygo 作为一个年轻的项目，还是有不少局限性。
- **Proxy WASM 生态有待成熟**：AssemblyScript 版本的 fault injection 实现，并没有 JSON decode 的部分。这是因为 AssemblyScript SDK 是基于 AssemblyScript 0.14.x 版本实现的，而几个开源的 AssemblyScript JSON 库都是针对高版本 AssemblyScript 实现的，没办法用在较为陈旧的 AssemblyScript 0.14 上。
- **WASM 没有内置协程**：WASM 目前尚未内置协程，所以没办法很好地被宿主的调度系统给调度起来。

虽然上面列举了几点不足之处，但是我们相信这个技术栈的前景是光明的：

1. 包括 Apache APISIX 和 Envoy 等开源项目对于 WASM 都很看重，有许多初创公司和大企业为 WASM 生态添砖加瓦，这意味着诸如 AssemblyScript SDK 停滞不前这样的困难，只会是暂时。长久看，Proxy WASM 的生态会枝繁叶茂。
2. WASM 作为 serverless 和 edge computing 的宠儿，有着光明的未来。在众多实际场景的落地和优化，会更快的解决技术上的不足。

## 写在最后

Apache APISIX 是个紧跟技术潮流的项目，“好风凭借力，送我上青天”，Apache APISIX 支持 WASM 是个长期的过程。

“千里之行，始于足下”，Apache APISIX 为了支持 WASM，已经发起了 [wasm-nginx-module](https://github.com/api7/wasm-nginx-module) 这个开源项目。感兴趣的读者可以关注该项目的进展，“独行者速，众行者远”，期待你的加入，一起创造世界顶级项目。
