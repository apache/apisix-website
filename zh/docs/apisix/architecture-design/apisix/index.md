# 软件架构

> 云原生网关 Apache APISIX 的软件架构

Source: https://apisix.apache.org/zh/docs/apisix/architecture-design/apisix/

Apache APISIX 是一个动态、实时、高性能的云原生 API 网关。它构建于 NGINX + ngx_lua 的技术基础之上，充分利用了 LuaJIT 所提供的强大性能。 [为什么 Apache APISIX 选择 NGINX+Lua 技术栈？](https://apisix.apache.org/zh/blog/2021/08/25/why-apache-apisix-chose-nginx-and-lua/)。

![软件架构](https://raw.githubusercontent.com/apache/apisix/master/docs/assets/images/flow-software-architecture.png)

APISIX 主要分为两个部分：

1. APISIX 核心：包括 Lua 插件、多语言插件运行时（Plugin Runner）、Wasm 插件运行时等；
2. 功能丰富的各种内置插件：包括可观测性、安全、流量控制等。

APISIX 在其核心中，提供了路由匹配、负载均衡、服务发现、API 管理等重要功能，以及配置管理等基础性模块。除此之外，APISIX 插件运行时也包含其中，提供原生 Lua 插件的运行框架和多语言插件的运行框架，以及实验性的 Wasm 插件运行时等。APISIX 多语言插件运行时提供多种开发语言的支持，比如 Golang、Java、Python、JS 等。

APISIX 目前也内置了各类插件，覆盖了 API 网关的各种领域，如认证鉴权、安全、可观测性、流量管理、多协议接入等。当前 APISIX 内置的插件使用原生 Lua 实现，关于各个插件的介绍与使用方式，可以查看相关[插件文档](https://apisix.apache.org/docs/apisix/plugins/batch-requests)。

## 插件加载流程

![插件加载流程](https://raw.githubusercontent.com/apache/apisix/master/docs/assets/images/flow-load-plugin.png)

## 插件内部结构

![插件内部结构](https://raw.githubusercontent.com/apache/apisix/master/docs/assets/images/flow-plugin-internal.png)
