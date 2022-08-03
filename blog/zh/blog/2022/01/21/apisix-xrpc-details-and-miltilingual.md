---
title: "多协议接入框架 xRPC 细节前瞻"
authors:
  - name: "帅进超"
    title: "Author"
    url: "https://github.com/shuaijinchao"
    image_url: "https://avatars.githubusercontent.com/u/8529452?v=4"
  - name: "苏钰"
    title: "Technical Writer"
    url: "https://github.com/SylviaBABY"
    image_url: "https://avatars.githubusercontent.com/u/39793568?v=4"
keywords: 
- 多协议
- Apache APISIX
- Java
- 多语言
- 生态
description: 本文为大家带来了 Apache APISIX 即将发布的 xRPC 框架以及相关细节，同时介绍了 Apache APISIX 在多语言开发支持中的细节展示。
tags: [Ecosystem]
---

> 本文为大家带来了 Apache APISIX 即将发布的 xRPC 框架以及相关细节，同时介绍了 Apache APISIX 在多语言开发支持中的细节展示。

<!--truncate-->

随着业务场景和需求越来越复杂和多样化，越来越多的标准和协议都开始崭露头角。Apache APISIX 作为 Apache 基金会的顶级开源项目，一直积极参与并推进相关生态层面的扩展。

本文将从**多协议代理**与**多语言支持**两个角度，为大家带来 Apache APISIX 即将发布的 xRPC 框架与多语言插件的相关示例。

## 多协议代理

在 Apache APISIX 中，每个请求都会对应一个 Route 对象。目前 Apache APISIX 的代理场景主要以下两种。

![目前 APISIX 两种代理场景](https://static.apiseven.com/202108/1642732975469-74071c65-e869-4133-857f-822b58d6b86e.png)

第一种是 HTTP 协议代理，也是目前 APISIX 中最常用的请求代理。基于 HTTP 协议代理，Apache APISIX 目前已经实现了数十种流量治理能力，如：细粒度的流控、安全和可观测性等。

第二种则是基于 TCP 和 UDP 的动态协议代理和负载均衡，它提供了最基础的流量准入能力和链接级别的日志能力。这种代理模式可以代理任何基于 TCP/UDP 协议的请求，如：MySQL、Redis、Mongo 或 DNS 等。但由于它是基于 TCP/UDP 的代理没有上层的应用层协议，只能获取到四元组的一些基础信息，所以在扩展能力上会稍弱一些。

### 为什么要开发 xRPC 框架

由于 Stream Route 在协议代理上的限制，加之我们希望在 APISIX 上可以支持更多的应用层协议，以服务更多用户和应用场景，xRPC 框架应运而生。

通过 xRPC 框架可以非常便捷地扩展协议能力，不管是特定还是私有数据协议，都可以具备类似 HTTP 协议代理的**精准颗粒度**的和**更高阶的 7 层控制**，比如请求级别的可观测性、高级访问控制和代理策略等功能。

### 什么是 xRPC

xRPC 从字面角度来分析，即 X 为协议资源的抽象代表。而 RPC 是我们认为所有经过网关的资源都为一个过程调度，即它是一个协议扩展框架。所以在定位上，xRPC 是一个基础框架，而不是一种具体协议的实现。

![xRPC 架构图](https://static.apiseven.com/202108/1642733068660-f479ffcc-5bda-49de-bbd9-0d04d7259450.png)

从上图架构可以看出，xRPC 是基于 APISIX Core 扩展出来的框架。在该框架的基础之上，用户可以去实现不同应用层的协议，比如 Redis、MySQL、Mongo 和 Postgres 等。而在不同的协议之上，又可以去抽象一些共性因素，实现相关插件能力，让不同的协议可以共享这些能力。

所以 xRPC 的主要作用可以总结为：**提供标准化应用层协议的接入能力，支持跨协议的能力共享，以及让用户可以获得自定义协议的扩展能力**。

#### 应用场景示例

有了 xRPC 协议框架之后，它可以解决哪些场景呢？这里简单给大家举几个例子。

1. 示例 1 ：像 Redis 在早期版本中是不支持 TLS 的。如果我们系统里同时存在多个版本的 Redis，同时因为某些原因暂时不能在生产环境中升级 Redis，但又有增加 TLS 能力的需求。这个时候就可以基于 xPRC 的 Redis Protocol 来解决上述情况。
2. 示例 2：当我们想对某些 IP 或者调用方做频率限制并且想直观的看到每个调用来源的调用频率，这些 Redis 自身是不支持的。此时就可以通过那通过 xRPC 扩展出来的 Redis Protocol 完美解决。
3. 示例 3：如果想利用 MySQL 临时开启慢查询功能，只需接入 MySQL Protocol 并在 APISIX 配置相关策略即可，省去了后续再一台台机器去登录实例的繁琐步骤。

当然，类似的应用场景还很多，也希望在功能发布之后，大家多多在实际的应用过程中去体验和实践。接入 xPRC 后的调用过程如下图所示。

![调用过程](https://static.apiseven.com/202108/1643103835579-d215a120-f62e-4ba5-aa14-59ea3d38a429.png)

一旦通过 Apache APISIX 完成了上游服务的接管，就可以把上游不同的应用服务进行统一化管理。类似日志输出、监控、安全还有问题排查等功能，都可以通过一套标准化的策略来完成。

#### 计划实现阶段

目前 Apache APISIX xRPC 框架的设计，初步划分为 5 个阶段。

![计划实现阶段图](https://static.apiseven.com/202108/1643103835583-40afb0a0-ec20-40e8-84de-b34afee2724c.png)

- 阶段一：Read 读取数据与协议解码。
- 阶段二：Access Phase 准入阶段。提供插件接入功能，可实现安全、流控和准入等需求场景。
- 阶段三：Proxy 数据转发与负载均衡。提供自定义负载均衡策略及算法的接入支持。
- 阶段四：Send 发送数据与协议编码。
- 阶段五：Log Phase 日志阶段。提供插件接入功能，实现日志上报和记录等需求场景。

## 多语言生态

为了满足日益丰富和庞大的计算语言库，打造多语言环境的代码支持成为应对未来技术发展的第一门槛。Apache APISIX 在多语言开发的道路上也做了很多的探索与实践。

比如在近期已经实现了对 **WebAssembly** 的支持，具体实现细节与功能可参考「[Apache APISIX 拥抱 WASM 生态」](https://apisix.apache.org/zh/blog/2021/11/19/apisix-supports-wasm)文章。当然，目前 Apache APISIX 对 WASM 的功能支持还属于实验阶段，未来仍会继续完善对 WASM 的相关支持。如果您对此项目感兴趣，也欢迎积极参与到 [wasm-nginx-module](https://github.com/api7/wasm-nginx-module) 项目贡献中。

同时，在对 WASM 实现支持前，Apache APISIX 已通过 「xPluginRunner 多语言插件运行时」实现了对多种开发语言的支持。即在开发 APISIX 插件时，用户不仅可以使用 APISIX 原生支持的 Lua 代码去编写，也可以使用各自熟悉的语言，比如 Go、Java 和 Python 等，实现对 APISIX 插件的编写与扩展。

### xPluginRunner

![xPluginRunner 实现方式图](https://static.apiseven.com/202108/1642733411405-19b13181-0f5e-46af-837b-66e485f2e0b0.png)

xPluginRunner 的实现方式如上图所示。整个通信过程是在内置插件「开始执行之前」和「完成执行之后」，APISIX 会发起本地 RPC 请求到各语言的插件运行时。在插件运行时中，实现各个插件内的计算和策略处理，最后将结果响应给 APISIX，基于响应结果再进行后续的决策。

xPluginRunner 作为跟 Apache APISIX 通信的桥梁，主要实现了**私有数据协议的解析与 RPC 报文的封包与解包**。

目前 Apache APISIX xPluginRunner 的方案已经处于比较稳定的阶段了，从社区反馈中也得知部分企业已经开始尝试在生产环境中应用了。如果您对此项目感兴趣，也欢迎积极参与到各个开发语言插件项目中：

- [apisix-go-plugin-runner](https://github.com/apache/apisix-go-plugin-runner)
- [apisix-java-plugin-runner](https://github.com/apache/apisix-java-plugin-runner)
- [apache-apisix-python-runner](https://github.com/apache/apisix-python-plugin-runner)

最后我们将通过一个简单的 Java 示例，为大家展示一下如何基于 Java Plugin Runner 来开发 APISIX 插件。

### Java Plugin Runner 示例

首先在开发插件时，我们需要去实现 PluginFilter 的 Interface。Interface 中 `name` 方法主要用来标识和提取插件名称，`filter` 方法则用来过滤请求（也就是执行插件主体逻辑）。

![Plugin](https://static.apiseven.com/202108/1642733591297-642091b2-d4c7-4098-b7ff-41ffa5a2e00a.png)

![Interface](https://static.apiseven.com/202108/1642733657248-5b7db563-f95f-4683-997e-47e76eeda4d9.png)

需要额外注意一点，上述代码中出现的 `request` 和 `response` 两个参数在 Runner 中存在固定逻辑（所有 Runner 都适用）：

1. 如果希望请求继续转发，仅进行一些策略设置（如改写请求参数、头信息等），只需操作 `request` 对象即可。
2. 如果想要终止请求，可以通过 `response` 对象来完成（如设置响应体、响应头、状态码等）。

:::note 注意
APISIX 一旦感知到 Runner 中的 `response` 对象被操作就会立即终止当前请求。
:::

插件开发完成之后，就可以在 APISIX 中进行应用的实践了。首先将 Runner 及项目中的插件编译为 jar 包，并将 jar 包的绝对路径配置到 APISIX 主配置文件中，配置方式如下：

![将 Runner jar 配置到 APISIX 主配置](https://static.apiseven.com/202108/1642733807923-9e3ad231-0094-4e37-a830-29973b43e495.png)

最后重启 Apache APISIX，就可以进行路由和插件的配置及请求验证环节了。

![路由和插件配置](https://static.apiseven.com/202108/1642733908224-64f3ec2c-6d33-4130-b8b6-0fe10e00c48e.png)

![请求验证](https://static.apiseven.com/202108/1642733944940-69b06c71-22f7-45e4-9b6d-7f1b62167180.png)

## 总结

本文为大家带来了 Apache APISIX 即将发布的 xRPC 框架以及相关细节，同时介绍了 Apache APISIX 在多语言开发支持中的细节展示。通过多协议代理与多语言支持两个角度，充分展示了 Apache APISIX 在面向生态的多项努力。也欢迎随时在 [GitHub Discussions](https://github.com/apache/apisix/discussions) 中发起讨论，或通过[邮件列表](https://apisix.apache.org/zh/docs/general/join)进行交流。
