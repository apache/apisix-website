---
title: "A \"Tiny\" APISIX Plugin"
authors:
  - name: Navendu Pottekkat
    title: Author
    url: https://github.com/navendu-pottekkat
    image_url: https://avatars.githubusercontent.com/u/49474499
keywords:
  - Wasm
  - Go
  - Plugin
description: "A \"tiny\" example to demonstrate how Apache APISIX supports Wasm plugins."
tags: [Plugins]
image: https://static.apiseven.com/uploads/2023/06/27/Z8CkI8kj_wasm-cover.png
---

> In this article, we will write a "tiny" Go plugin for APISIX, compile it to a Wasm binary, run it in APISIX, and learn how it all works. We will also compare the benefits and costs of using Wasm plugins, external plugins (plugin runners), and native Lua plugins.

<!--truncate-->

<head>
    <link rel="canonical" href="https://navendu.me/posts/tiny-apisix-plugin/" />
</head>

A key feature of Apache APISIX is its pluggable architecture. In addition to providing [80+ Lua plugins](https://apisix.apache.org/plugins/) out of the box, APISIX also supports external plugins written in other languages through [plugin runners](https://apisix.apache.org/docs/go-plugin-runner/getting-started/) and [WebAssembly (Wasm)](https://apisix.apache.org/docs/apisix/wasm/).

In this article, we will write a "tiny" Go plugin for APISIX, compile it to a Wasm binary, run it in APISIX, and learn how it all works. We will also compare the benefits and costs of using Wasm plugins, external plugins (plugin runners), and native Lua plugins.

## APISIX and Wasm

APISIX supports Wasm through the [WebAssembly for Proxies (proxy-wasm) specification](https://github.com/proxy-wasm/spec). APISIX is a host environment that implements the specification, and developers can use the [SDKs](https://github.com/proxy-wasm/spec#sdks) available in multiple languages to create plugins.

Using Wasm plugins in APISIX has multiple advantages:

* Many programming languages compile to Wasm. This allows you to leverage the capabilities of your tech stack in APISIX plugins.
* The plugins run inside APISIX and not on external plugin runners. This means you compromise less on performance while writing external plugins.
* Wasm plugins run inside APISIX but in a separate VM. So even if the plugin crashes, APISIX can continue to run.
* _APISIX can only maintain its Wasm support without having to maintain plugin runners for multiple languages\*._

_\* These advantages come with a set of caveats which we will look at later._

APISIX's plugin architecture below shows native Lua plugins, external plugins through plugin runners, and Wasm plugins:

![Lua plugins, plugin runners, and Wasm plugins](https://static.apiseven.com/uploads/2023/06/27/yBnZnCrv_plugin-route-light.png)

## A "Tiny" Go Plugin

Let's get coding! To write a Go plugin, we will use the [proxy-wasm-go-sdk](https://github.com/tetratelabs/proxy-wasm-go-sdk).

Reading through the documentation, you will understand why this plugin is called "tiny," i.e., the SDK uses the [TinyGo](https://tinygo.org/) compiler instead of the official Go compiler. You can read more about why this is the case on the [SDK\'s overview page](https://github.com/tetratelabs/proxy-wasm-go-sdk/blob/main/doc/OVERVIEW.md), but the TLDR version is that the Go compiler can only produce Wasm binaries that run in the browser.

For our example, we will create a plugin that adds a response header. The code below is pretty self-explanatory, and you can refer to [other plugins](https://github.com/apache/apisix/blob/master/t/wasm/) for more implementation details:

```go title="main.go"
// references:
// https://github.com/tetratelabs/proxy-wasm-go-sdk/tree/main/examples
// https://github.com/apache/apisix/blob/master/t/wasm/
package main

import (
    "github.com/tetratelabs/proxy-wasm-go-sdk/proxywasm"
    "github.com/tetratelabs/proxy-wasm-go-sdk/proxywasm/types"

    "github.com/valyala/fastjson"
)

func main() {
    proxywasm.SetVMContext(&vmContext{})
}

// each plugin has its own VMContext.
// it is responsible for creating multiple PluginContexts for each route.
type vmContext struct {
    types.DefaultVMContext
}

// each route has its own PluginContext.
// it corresponds to one instance of the plugin.
func (*vmContext) NewPluginContext(contextID uint32) types.PluginContext {
    return &pluginContext{}
}

type header struct {
    Name  string
    Value string
}

type pluginContext struct {
    types.DefaultPluginContext
    Headers []header
}

func (ctx *pluginContext) OnPluginStart(pluginConfigurationSize int) types.OnPluginStartStatus {
    data, err := proxywasm.GetPluginConfiguration()
    if err != nil {
        proxywasm.LogErrorf("error reading plugin configuration: %v", err)
        return types.OnPluginStartStatusFailed
    }

    var p fastjson.Parser
    v, err := p.ParseBytes(data)
    if err != nil {
        proxywasm.LogErrorf("error decoding plugin configuration: %v", err)
        return types.OnPluginStartStatusFailed
    }
    headers := v.GetArray("headers")
    ctx.Headers = make([]header, len(headers))
    for i, hdr := range headers {
        ctx.Headers[i] = header{
            Name:  string(hdr.GetStringBytes("name")),
            Value: string(hdr.GetStringBytes("value")),
        }
    }
    return types.OnPluginStartStatusOK
}

// each HTTP request to a route has its own HTTPContext
func (ctx *pluginContext) NewHttpContext(contextID uint32) types.HttpContext {
    return &httpContext{parent: ctx}
}

type httpContext struct {
    types.DefaultHttpContext
    parent *pluginContext
}

func (ctx *httpContext) OnHttpResponseHeaders(numHeaders int, endOfStream bool) types.Action {
    plugin := ctx.parent
    for _, hdr := range plugin.Headers {
        proxywasm.ReplaceHttpResponseHeader(hdr.Name, hdr.Value)
    }

    return types.ActionContinue
}
```

To compile our plugin to a Wasm binary, we can run:

```shell
tinygo build -o custom_response_header.go.wasm -scheduler=none -target=wasi ./main.go
```

## Configuring APISIX to Run the Plugin

To use the Wasm plugin, we first have to update our APISIX configuration file to add this:

```yaml title="config.yaml"
wasm:
  plugins:
    - name: custom-response-header
      priority: 7000
      file: /opt/apisix/wasm/custom_response_header.go.wasm
```

Now we can create a route and enable this plugin:

```yaml title="apisix.yaml"
routes:
  - uri: /*
    upstream:
      type: roundrobin
      nodes:
        "127.0.0.1:80": 1
    plugins:
      custom-response-header:
       conf: |
        {
          "headers": [{
            "name": "X-Go-Wasm", "value": "APISIX"
          }]
        }
#END
```

:::note

The above configuration assumes that APISIX is deployed in [standalone mode](https://apisix.apache.org/docs/apisix/deployment-modes/#standalone).

:::

## Testing the Plugin

We can send a request to the created route to test the plugin:

```shell
curl http://127.0.0.1:9080 -s --head
```

The response header would be as shown below:

```text
...
X-Go-Wasm: APISIX
```

## Wasm for the Win?

From this article, it seems like using Wasm plugins benefits both users and APISIX maintainers.

A test using our example `custom-response-header` function implemented through a Lua plugin, an external Go plugin runner, and a Wasm plugin show how the performance varies:

![Wasm plugins aren't that bad!](https://static.apiseven.com/uploads/2023/06/27/bbkiAJgI_plugin-performance-light.png)

_Running 30s tests with 5 threads and 50 connections using [wrk](https://github.com/wg/wrk)._

Looking solely at this example, it might be tempting to ask why anyone would want to use plugin runners or write Lua plugins. Well, all the advantages of using Wasm comes with the following caveats:

* **Limited plugins**: The Wasm implementation of programming languages often lacks complete support. For Go, we were limited to using the TinyGo compiler, similar to other languages.
* **Immature stack**: Wasm and its usage outside the browser is still a relatively new concept. The proxy-wasm spec also has its limitations due to its relative novelty.
* **Lack of concurrency**: Wasm does not have built-in concurrency support. This could be a deal breaker for typical APISIX uses cases where high performance is critical.
* **Better alternatives**: Since APISIX can be extended using Lua plugins or plugin runners, there are always alternatives to using Wasm.

Despite these caveats, the future of Wasm in APISIX and other proxies seems promising. You can choose to hop on the Wasm bandwagon if its benefits tip the scale against these costs. But currently, APISIX plans to continue supporting all three ways of creating custom plugins for the foreseeable future.
