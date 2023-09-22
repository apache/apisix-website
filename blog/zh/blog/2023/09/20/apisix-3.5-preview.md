---
title: "Apache APISIX 3.5 新特性揭秘：全面预览"
authors:
  - name: Ming Wen
    title: Author
    url: https://github.com/moonming
    image_url: https://avatars.githubusercontent.com/u/26448043?v=4
  - name: Yilia Lin
    title: Technical Writer
    url: https://github.com/Yilialinn
    image_url: https://avatars.githubusercontent.com/u/114121331?v=4
keywords:
  - 开源社区
  - API 网关
  - Apache APISIX
description: APISIX 3.5 引入了一系列令人振奋的新特性，将为用户带来更高级别的安全性、性能和可扩展性，从而为用户提供更多选择，使得在构建和管理 API 时变得更加便捷和灵活。
tags: [Ecosystem]
image: https://static.apiseven.com/2022/10/19/634f6677742a1.png
---

APISIX 3.5 引入了一系列令人振奋的新特性，将为用户带来更高级别的安全性、性能和可扩展性，从而为用户提供更多选择，使得在构建和管理 API 时变得更加便捷和灵活。
<!--truncate-->

## APISIX 简介

[Apache APISIX](https://apisix.apache.org/zh/)，新一代云原生 API 网关，是 Apache 软件基金会顶级项目。APISIX 是一个动态、实时、高性能的云原生 API 网关，提供了负载均衡、动态上游、灰度发布、服务熔断、身份认证、可观测性等丰富的流量管理功能。Apache APISIX 基于 NGINX 和 LuaJIT 构建，具有超高性能，单核 QPS 高达 23000，平均延迟仅为 0.2 毫秒。它不仅能解决传统架构中的问题，同时更适应了云原生时代的需求。

APISIX 社区活跃，生态丰富，拥有近 100 个开源插件，涵盖网络安全、性能优化、负载均衡、监控日志和流量管理等场景，为用户提供了强大而灵活的 API 网关解决方案。[APISIX](https://github.com/apache/apisix) 是目前 GitHub 上最活跃的 API 网关项目，每天处理超过 1 万亿次的 API 调用，并且这个数字仍在不断增长。

![APISIX Architecture](https://static.apiseven.com/uploads/2023/09/21/kJDnBMVX_APISIX%20Architecture.png)

APISIX 的出现[解决了 NGINX 的两大痛点](https://apisix.apache.org/zh/blog/2022/07/30/why-we-need-apache-apisix/)。首先是 NGINX 不支持集群管理。几乎每家互联网厂商都有自己的 NGINX 配置管理系统，系统虽然大同小异但是一直没有统一的方案。其次是 NGINX 不支持配置的热加载。很多公司一旦修改了配置，重新加载 NGINX 的时间可能需要半个小时以上。并且，在 Kubernetes 体系下，上游会经常发生变化，如果使用 NGINX 来处理就需要频繁重启服务，这对于企业是不可接受的。APISIX 支持集群管理和动态加载，提供了高可靠性、弹性扩展、灵活性以及无缝更新的优势。

作为亚太占有率最高的 API 网关，APISIX 有着广泛的应用场景，可应用于网关、Kubernetes Ingress、服务网格等场景，可以帮助企业快速、安全地处理 API 和微服务流量。APISIX 目前已获得全球企业和组织的测试和高度认可，用户包括 Amber Group、[Airwallex](https://apisix.apache.org/zh/blog/2021/11/03/airwallex-usercase/)、Lotus Cars、[vivo](https://apisix.apache.org/zh/blog/2022/11/13/vivo-with-apache-apisix/)、[WPS](https://apisix.apache.org/zh/blog/2021/09/28/wps-usercase/)、[爱奇艺](https://apisix.apache.org/zh/blog/2021/09/07/iqiyi-usercase/)等。

## APISIX 3.5 版本新特性

### Host 级别 TLS 协议配置

这个特性指的是在 NGINX 指定文件里，通过 YAML 指定全局，来配置支持客户端 TLS 的版本。比如所有的 API 只支持 TLS 1.2 和 TLS 1.3，但是有一些旧的客户端需要支持更早版本的 TLS 1.1，则可以同时配置，合并生效。

APISIX 借助 OpenResty 动态地为每一个 host 指定不同的 TLS 协议，从而为用户提供更多的灵活性。

```yaml
apisix:
  ssl:
    ssl_protocols: TLSv1.2 TLSv1.3
```

```json5
// curl http://127.0.0.1:9180/admin/apisix/ssls/1
{
    "cert": "$cert",
    "key": "$key",
    "snis": ["test.com"],
    "ssl_protocols": [
        "TLSv1.2",
        "TLSv1.3"
    ]
}
```

### Wasm & Coraza WAF

Coraza WAF 是用 Golang 写的，其核心的 WAF 规则集和 ModSecurity 是一样的。Coraza 和很多的 API 网关项目如 Envoy、NGINX 和 APISIX，做了集成。

和 Coraza 集成的方式有两种：

1. 在 NGINX 里面嵌入一个用 Coraza 写的一个 C 的模块，或者用 Lua 写一个插件和 APISIX 集成。

2. 使用 Wasm 来进行集成，这种方式的好处在于和其他网关集成的方式是统一的。

APISIX 已经完成和 Coraza 在 Wasm 上的集成，如果你不需要进行异步调用，就可以进行更多 Wasm 上的应用。因为 WAF 是用 CPU 去进行正则表达式规则运算的场景，因此它主要涉及 CPU 计算而不涉及异步操作，所以 Wasm 在这种场景下非常适用。

但是如果需要异步调用怎么办？例如，需要在 Wasm 中访问数据库、访问外部 API 或网站，显然不能等待数据库查询结果才能进行下一步操作。这时候，您将需要进行异步调用，以确保性能达到足够高的水平。

目前 Wasm 里的一些标准协议或者 runtime 是不支持异步调用的，预计 10 月初会推出一个支持在 Wasm 异步调用的版本。之后也可以使用 Rust 或者 Golang 等主流的语言完整地开发 APISIX 插件。

### HTTP/3 & QUIC

我们有两种方式支持 HTTP/3 & QUIC。第一种是等待 OpenResty 进行升级，等它的 master 版本升级到 NGINX 的 1.25 以上版本，然后对 APISIX 的一些补丁和接口进行更新。因为 APISIX 是基于 NGINX 和 OpenResty 之上的，因而 APISIX 要启用这个特性，还需要更新周边的生态系统，尤其是依赖上游的 NGINX 和 OpenResty。

NGINX 对 HTTP/3 的支持比较晚，在大约 3-4 个月前才在主流版本中添加了相关功能；但 OpenResty 尚未支持。只有在 NGINX 和 OpenResty 都支持之后，APISIX 才能发布支持相关特性的版本。每个环节都需要进行升级，才能在 API 网关上完整地支持 HTTP/3 和 QUIC 等特性。预计在 10 月份可以实现。

第二种方式是 APISIX 维护自己的 NGINX 版本，即 APISIX base。我们将 HTTP/3 和 QUIC 的补丁应用到 APISIX 的自有版本中，形成一个自己的发行版，该方式在很早就已经实现了。

## APISIX 蓝图

### GitOps

首先要提到的就是 GitOps。APISIX 是云原生 API 网关，它与云原生系统能够更好地集成。尽管我们可以使用 YAML 编写 APISIX 配置，但 APISIX 缺乏与 CICD 等相关生态系统，如 Jenkins、ArgoCD 等生态的完整集成。APISIX Ingress Controller 项目在这方面进行了许多对接和集成工作，但 APISIX 本身在裸金属或虚拟机等非 Kubernetes 环境中使用时，并没有提供一套完整的声明式工具来支持 GitOps。

在接下来的一个月里，我们将着重解决这个问题。我们计划通过 APISIX 的声明式工具 ADC，帮助用户在非 Kubernetes 环境中以声明式的方式进行各种集成。完成这项工作后，用户能在非 Kubernetes 环境中与 Jenkins、ArgoCD 等工具进行良好的对接，并使用 GitOps 的内部 CICD 方式来控制 APISIX 的各种行为，实现多环境发布等功能。

### OpenAPI

另外一个重要的方面是 Open API。当我们谈到 API 网关时，实际上我们一直在讨论的不仅仅是 API 网关本身，因为 API 网关只是 API 全生命周期管理的一个环节。API 生命周期管理涵盖了 API 设计、API 文档、测试、网关以及货币化等方面，它是一个由多个组件构成的链条，而 API 网关只是其中一个非常重要的组件。要将所有这些组件串联起来，我们需要各个系统之间的接口或标准，而 Open API 就是其中非常重要的一环。

Open API 有多个版本，目前主流的是 OpenAPI 2.0（也被称为 Swagger）或者 OpenAPI 3.0。在 APISIX 中，我们的里程碑目标是完整地支持包括 Swagger、OpenAPI 3.0 以及 Postman Collection 等各种 API 定义方式。我们将支持使用 YAML 方式编写 API 定义，类似于 OpenAPI 这种协议格式。在 APISIX 完成 GitOps 支持后，用户能够方便地将在 Postman 等工具中定义的 API 导入到 APISIX 网关中，同时也可以将 APISIX 已定义的 API 导出到 Postman 等工具中进行集成。

### 重构外部 plugin runner

APISIX 不仅支持使用 Lua 编写插件，还可以使用 Wasm 和其他外部插件进行编写。然而，在 Wasm 上花费了大量精力之后，我们也面临着一些问题，特别是在右边 plugin runner 上。目前，plugin runner 和 APISIX 之间的通信是通过自定义的 RPC 协议进行的。如果用户需要读取请求体或修改返回体等内容，仅仅使用这个 demo 是不够的，同时当真正要将其投入生产环境时，自定义 RPC 对于用户来说改造成本较高，因为用户必须修改 RPC 协议，而且自定义 RPC 无法很好地支持后续的各种语言库。

![APISIX plugin runner](https://static.apiseven.com/uploads/2023/09/22/QOQToIY9_9269cb5f-41dd-4f3f-bff1-a5f0c3b01bdc.jpeg)

因此，在新的 plugin runner 设计中，我们放弃 RPC 调用方式，改为标准的 HTTP 调用。在 HTTP 调用中，你可以将其类比为云服务提供商提供的基于函数的 serverless 方式。在 APISIX 中，我们将通过 HTTP 方式调用远程函数，这样一来，我们实际上并不关心底层使用的是哪种语言实现。通过这种方式，我们消除了自定义的 RPC 协议，并且在下个月我们将发布一个新的演示 demo，尽管在性能方面可能会有一定的损失，但对于用户的可扩展性和灵活性将有显著提升。

用户不再需要了解中间的自定义协议，而是可以使用函数方式进行操作，这样给予了用户更多灵活选择的空间。用户可以出于性能和 APISIX 整体阶段的完整性考虑，选择使用 Lua 编写插件；如果用户认为 Lua 语言的维护难度较高，可以选择使用 Wasm；如果用户对性能要求没有那么高，可以使用我们之前提到的函数方式进行调用。

### 重构文档

另一个方面是 APISIX 的[文档](https://apisix.apache.org/zh/docs/)。在 APISIX 社区中，经常有人抱怨文档质量低下。APISIX 文档之所以显得不专业，存在很多问题或遗漏，主要是因为它是一个社区驱动的项目，它的背后有大约 600 个贡献者，有一半是代码贡献者，还有一半是文档贡献者。好几百个不同背景的人编写文档，每个人描述问题方式都不同，所以会出现文档内容参差不齐的情况。因此，我们将对整个文档进行全面重构，并且会确保内容的质量。

我们将花费半年时间来重构 APISIX 的文档。新的 APISIX 文档将包括六个部分。首先是 Getting Started，可以让你在几分钟内快速了解和运行 APISIX；然后是 How to Guide，介绍使用 APISIX 一些常见场景；还有背景信息介绍，介绍一些概念，例如什么是路由和服务；还有最佳实践，讲解 APISIX 在生产环境上的使用；另一个重点是对大约 100 个插件的介绍；最后是 reference。

## 总结

APISIX 作为 API 网关中的佼佼者，积极与更多的生态集成，以丰富自身的功能，同时提升 APISIX 的使用体验。

Host 级别的 TLS 协议配置让用户可以在不同的主机级别上进行个性化的 TLS 配置，提供更高的安全性和定制性。APISIX 支持 Wasm 和 Coraza WAF，用户可以使用 Wasm 语言编写高性能的插件，进一步增强 APISIX 的功能；而 Coraza WAF 是一个强大的 Web 应用程序防火墙，它将进一步增强 APISIX 的安全防护能力。另外，APISIX 还将支持 HTTP/3 和 QUIC，这些是新一代的网络协议，具有更快的传输速度和更好的性能，为用户提供更流畅的体验。此外，APISIX 还公布了重要的蓝图：GitOps，OpenAPI，重构 plugin runner，以及重构外部文档。

APISIX 这一系列令人振奋的新特性和蓝图将为用户带来更高级别的安全性、性能和可扩展性，从而为用户提供更多选择，使得在构建和管理 API 时变得更加便捷和灵活。
