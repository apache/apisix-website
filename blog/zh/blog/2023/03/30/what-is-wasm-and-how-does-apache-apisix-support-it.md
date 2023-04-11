---
title: "WebAssembly 助力云原生：APISIX 如何借助 Wasm 插件实现扩展功能？"
authors:
  - name: "朱欣欣"
    title: "Author"
    url: "https://github.com/starsz"
    image_url: "https://github.com/starsz.png"
keywords: 
- APISIX
- Wasm
- API 网关
- APISIX 商业化
description: 本文将介绍 Wasm，以及 Apache APISIX 如何实现 Wasm 功能。
tags: [Ecosystem]
---

> 本文将介绍 Wasm，以及 Apache APISIX 如何实现 Wasm 功能。

<!--truncate-->

> 作者[朱欣欣](https://github.com/starsz)，API7.ai 技术工程师。

## 什么是 Wasm

[Wasm](http://webassembly.org) 是 WebAssembly 的缩写。WebAssembly/Wasm 是一个基于堆栈的虚拟机设计的指令格式。
在 Wasm 未出现之前，浏览器中只能支持运行 Javascript 语言。当 Wasm 出现之后，使得高级语言例如 C/C++/Golang 能够在浏览器中运行。当前，主流的浏览器包括 Chrome、Firefox、Safari 等浏览器都已完成对 Wasm 的支持。并且得益于 WASI 项目的推进，服务端也已经能够支持运行 Wasm 指令。
如今在网关侧，Apache APISIX 也已完成对 Wasm 的支持，开发者可以通过高级语言 C/C++/Go/Rust 并按照 [proxy-wasm](https://github.com/proxy-wasm/spec) 规范来完成 Wasm 插件的开发。

![wasm](https://static.apiseven.com/uploads/2023/03/10/6ZI9czxe_whiteboard_exported_image.jpeg)

## 为什么 APISIX 要支持 Wasm 插件

相比较原生的 Lua 插件，Wasm 插件存在如下优势：

- 可扩展性：APISIX 通过支持 Wasm，我们可以结合 `proxy-wasm` 提供的 SDK，使用 C++/Golang/Rust 等语言进行插件开发。由于高级语言往往拥有更加丰富的生态，所以我们可以依托于这些生态来实现支持更多功能丰富的插件。

- 安全性：由于 APISIX 和 Wasm 之前的调用依托于 `proxy-wasm` 提供的 ABI（二进制应用接口），这部分的访问调用更为安全。Wasm 插件只允许对请求进行特定的修改。另外，由于 Wasm 插件运行在特定的 VM 中，所以即使插件运行出现崩溃也不会影响 APISIX 主进程的运行。

## APISIX 如何支持 Wasm

了解完 Wasm，现在我们将从自顶向下的角度来看 APISIX 是如何支持 Wasm 插件功能的。

![apisix-wasm](https://static.apiseven.com/uploads/2023/03/10/5t9ZpK7P_apisx-wasm.jpeg)

### APISIX Wasm 插件

在 APISIX 中，我们可以使用高级语言 C/C++/Go/Rust 来按照 `proxy-wasm` 规范以及对应的 SDK 来编写插件。

> `proxy-wasm` 是 Envoy 推出的在 L4/L7 代理之间的 ABI 的规范与标准。
在该规范中定义了包含内存管理、四层代理、七层代理扩展等 ABI。
例如在七层代理中，`proxy-wasm` 规范定义了 proxy_on_http_request_headers，proxy_on_http_request_body，proxy_on_http_request_trailers，proxy_on_http_response_headers 等 ABI，使得模块能够在各个阶段对请求内容进行获取与修改。

例如，我们使用 Golang 结合 [proxy-wasm-go-sdk](https://github.com/tetratelabs/proxy-wasm-go-sdk), 编写如下插件：

> `proxy-wasm-go-sdk` 正是上述 `proxy-wasm` 规范的 SDK，它帮助开发者更好的使用 Golang 编写 proxy-wasm 插件。

不过需要注意的是，由于原生 Golang 在支持 WASI 时存在一些问题，因此该 SDK 基于 TinyGo 实现，更多内容可以[点击](https://github.com/tetratelabs/proxy-wasm-go-sdk/blob/main/doc/OVERVIEW.md#tinygo-vs-the-official-go-compiler)进行查看。

该插件的主要功能用于将 HTTP 修改请求的响应状态码与响应体，引用自 APISIX [链接](https://github.com/apache/apisix/blob/master/t/wasm/fault-injection/main.go)，

```go
...
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
        ctx.Body = v.GetStringBytes("body")
        ctx.HttpStatus = uint32(v.GetUint("http_status"))
        if v.Exists("percentage") {
                ctx.Percentage = v.GetInt("percentage")
        } else {
                ctx.Percentage = 100
        }

        // schema check
        if ctx.HttpStatus < 200 {
                proxywasm.LogError("bad http_status")
                return types.OnPluginStartStatusFailed
        }
        if ctx.Percentage < 0 || ctx.Percentage > 100 {
                proxywasm.LogError("bad percentage")
                return types.OnPluginStartStatusFailed
        }

        return types.OnPluginStartStatusOK
}

func (ctx *httpLifecycle) OnHttpRequestHeaders(numHeaders int, endOfStream bool) types.Action {
        plugin := ctx.parent
        if !sampleHit(plugin.Percentage) {
                return types.ActionContinue
        }

        err := proxywasm.SendHttpResponse(plugin.HttpStatus, nil, plugin.Body, -1)
        if err != nil {
                proxywasm.LogErrorf("failed to send local response: %v", err)
                return types.ActionContinue
        }
        return types.ActionPause
}
...
```

之后，我们通过 `tiny-go` 将上述的 Golang 代码编译生成 `.wasm` 文件

```bash
tinygo build -o wasm_fault_injection.go.wasm -scheduler=none -target=wasi ./main.go
```

完成编译之后，我们得到了 `fault_injection.go.wasm` 文件

> 如果对 wasm 文件内容感兴趣的话，我们可以使用 [wasm-tool](https://github.com/bytecodealliance/wasm-tools) 工具来查看该 wasm 文件的具体内容。
`wasm-tools dump hello.go.wasm`

将 `wasm_fault_injection.go.wasm` 配置到 APISIX 到 `config.yaml`，并将该插件命名为 `wasm_fault_injection`。

```yaml
apisix:
        ...
wasm:
  plugins:
    - name: wasm_fault_injection
      priority: 7997
      file: wasm_fault_injection.go.wasm
```

之后，我们启动 APISIX ，并创建一条路由引用该 Wasm 插件：

```bash
curl  http://127.0.0.1:9180/apisix/admin/routes/1 \
-H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '{
    "uri":"/*",
    "upstream":{
        "type":"roundrobin",
        "timeout":{
            "connect":1,
            "read":1,
            "send":1
        },
        "nodes":{
            "httpbin.org:80":1
        }
    },
    "plugins":{
        "wasm_fault_injection":{
            "conf":"{\"http_status\":200, \"body\":\"Hello WebAssembly!\n\"}"
        }
    },
    "name":"wasm_fault_injection"
}'

```

进行访问测试，发现响应体已被修改为 "Hello WebAssembly"，由此 Wasm 插件已经生效。

```bash
curl 127.0.0.1:9080/get -v
*   Trying 127.0.0.1:9080...
* Connected to 127.0.0.1 (127.0.0.1) port 9080 (#0)
> GET /get HTTP/1.1
> Host: 127.0.0.1:9080
> User-Agent: curl/7.81.0
> Accept: */*
>
* Mark bundle as not supporting multiuse
< HTTP/1.1 200 OK
< Date: Thu, 09 Feb 2023 07:46:50 GMT
< Content-Type: text/plain; charset=utf-8
< Transfer-Encoding: chunked
< Connection: keep-alive
< Server: APISIX/3.1.0
<
Hello WebAssembly!
```

### Wasm-nginx-module

了解完 Apache APISIX 如何使用 Wasm 插件，现在我们更进一步来了解 "为什么我们能在 Wasm 插件中获取到请求的内容并修改请求？" 。
由于 APISIX 选用 Openresty 作为底层框架，因此 Wasm 插件中想要能够获取到请求内容和修改请求内容，就需要和 openResty 或者 NGINX 提供的 API 进行交互。`wasm-nginx-module` 正是提供了这部分能力。

> `wasm-nginx-module` 是由 [API7](https://api7.ai/) 研发的支持 Wasm 的 NGINX 模块。
该模块尝试在 NGINX 的基础上实现 `proxy-wasm-abi`，并且向上封装了 Lua API，使得我们能够在 Lua 层面完成 `proxy-wasm-abi` 的调用。
更多内容可参考 [wasm-nginx-module](https://github.com/api7/wasm-nginx-module)。

例如，当我们的 APISIX 运行到 "access" 阶段时，会调用 `wasm-nginx-module` 中提供的 Lua 方法
on_http_request_headers。

```lua
-- apisix/wasm.lua
...
local ok, err = wasm.on_http_request_headers(plugin_ctx)
   if not ok then
       core.log.error(name, ": failed to run wasm plugin: ", err)
       return 503
   end
end
...

```

之后在该方法中，将调用 `wasm-nginx-module` 中 `ngx_http_wasm_on_http` 方法，

```lua
ngx_int_t
ngx_http_wasm_on_http(ngx_http_wasm_plugin_ctx_t *hwp_ctx, ngx_http_request_t *r,
                      ngx_http_wasm_phase_t type, const u_char *body, size_t size,
                      int end_of_body)
{
    ...

    ctx = ngx_http_wasm_get_module_ctx(r);

    if (type == HTTP_REQUEST_HEADERS) {
        cb_name = &proxy_on_request_headers;
    } else if (type == HTTP_REQUEST_BODY) {
        cb_name = &proxy_on_request_body;
    } else if (type == HTTP_RESPONSE_HEADERS) {
        cb_name = &proxy_on_response_headers;
    } else {
        cb_name = &proxy_on_response_body;
    }

    if (type == HTTP_REQUEST_HEADERS || type == HTTP_RESPONSE_HEADERS) {
        if (hwp_ctx->hw_plugin->abi_version == PROXY_WASM_ABI_VER_010) {
            rc = ngx_wasm_vm->call(hwp_ctx->hw_plugin->plugin,
                                   cb_name,
                                   true, NGX_WASM_PARAM_I32_I32, http_ctx->id, 0);
        } else {
            rc = ngx_wasm_vm->call(hwp_ctx->hw_plugin->plugin,
                                   cb_name,
                                   true, NGX_WASM_PARAM_I32_I32_I32, http_ctx->id,
                                   0, 1);
        }

    } else {
        rc = ngx_wasm_vm->call(hwp_ctx->hw_plugin->plugin,
                              cb_name,
                              true, NGX_WASM_PARAM_I32_I32_I32, http_ctx->id,
                              size, end_of_body);
    }
    ...
}
```

在 `wasm-nginx-module` 中，我们将根据不同的阶段，设置 `cb_name`，例如：`HTTP_REQUEST_HEADERS` 对应 `proxy_on_request_headers`，之后将在 `ngx_wasm_vm->call`  中调用 vm 中的方法也就是我们在上文中提到的 wasm 插件 `OnHttpRequestHeaders` 的方法。

至此，整个 APISIX 调用 wasm 插件，运行 Golang 的调用链便梳理完成，调用链如下：

![wasm-call](https://static.apiseven.com/uploads/2023/03/10/fzwAEDi4_call.png)

### Wasm VM

Wasm VM 用于真正执行 Wasm 代码的虚拟机，在 `wasm-nginx-module` 中实现了对两种虚拟机 "wasmtime" 和 "wasmedge" 两种虚拟机，在 APISIX 中默认选择使用 "wasmtime" 作为 Wasm 代码的运行虚拟机。

> Wasmtime
[Wasmtime](https://github.com/bytecodealliance/wasmtime) 是由 bytecodealliance 开源的 WebAssembly 和 WASI 的小型高效运行时。它能够在 Web 外部运行 WebAssembly 代码，即可以用作命令行使用，也可以作为 WebAssembly 运行引擎嵌入到其他程序作为库使用。
Wasmedge
[Wasmedge](https://wasmedge.org/) 是为边缘计算优化的轻量级、高性能、可扩展的 WebAssembly (Wasm) 虚拟机，可用于云原生、边缘和去中心化的应用。

在 Wasm vm 中首先通过 `load` 方法将 `.wasm` 文件加载到内存，之后我们便可以通过 VM 的 call 方法来调用这些方法。VM 底层依托于 WASI 的接口实现，使得 Wasm 代码不仅能够运行在浏览器端，同时也支持能够在服务端进行。

## 总结

通过本文我们了解到 Wasm 是什么以及 APISIX 如何支持 Wasm 插件。APISIX 通过支持 Wasm 插件，不但可以扩充对多语言的支持，例如通过 C++, Rust, Golang, AssemblyScript 等进行插件开发，而且由于 WebAssembly 正在从浏览器走向云原生拥有了更加丰富的生态与使用场景，因此 APISIX 也可以借助 Wasm 完成在 API 网关侧更多的扩展功能，解决更多使用场景。
