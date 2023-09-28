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
tags: [Community]
image: https://static.apiseven.com/2022/10/19/634f6677742a1.png
---

APISIX 3.5 引入了一系列令人振奋的新特性，将为用户带来更高级别的安全性、性能和可扩展性，从而为用户提供更多选择，使得在构建和管理 API 时变得更加便捷和灵活。
<!--truncate-->

## APISIX 简介

[Apache APISIX](https://apisix.apache.org/zh/)，新一代云原生 API 网关，是 Apache 软件基金会顶级项目。APISIX 是一个动态、实时、高性能的云原生 API 网关，提供了负载均衡、动态上游、灰度发布、服务熔断、身份认证、可观测性等丰富的流量管理功能。Apache APISIX 基于 NGINX 和 LuaJIT 构建，具有超高性能，单核 QPS 高达 23000，平均延迟仅为 0.2 毫秒。它不仅能解决传统架构中的问题，同时更适应了云原生时代的需求。

APISIX 社区活跃，生态丰富，拥有近 100 个开源插件，涵盖网络安全、性能优化、负载均衡、监控日志和流量管理等场景，为用户提供了强大而灵活的 API 网关解决方案。[APISIX](https://github.com/apache/apisix) 是目前 GitHub 上最活跃的 API 网关项目，每天处理超过 1 万亿次的 API 调用，并且这个数字仍在不断增长。

![APISIX Architecture](https://static.apiseven.com/uploads/2023/09/21/kJDnBMVX_APISIX%20Architecture.png)

APISIX 的出现[解决了 NGINX 的两大痛点](https://apisix.apache.org/zh/blog/2022/07/30/why-we-need-apache-apisix/)。

- 一是 NGINX 不支持集群管理。几乎每家互联网厂商都有自己的 NGINX 配置管理系统，系统虽然大同小异但是一直没有统一的方案。
- 二是 NGINX 不支持配置的热加载。很多公司一旦修改了配置，重新加载 NGINX 的时间可能需要半个小时以上。并且，在 Kubernetes 体系下，上游会经常发生变化，如果使用 NGINX 来处理就需要频繁重启服务，这对于企业是不可接受的。APISIX 支持集群管理和动态加载，提供了高可靠性、弹性扩展、灵活性以及无缝更新的优势。

作为亚太占有率最高的 API 网关，APISIX 有着广泛的应用场景，可应用于网关、Kubernetes Ingress、服务网格等场景，可以帮助企业快速、安全地处理 API 和微服务流量。APISIX 目前已获得全球企业和组织的测试和高度认可，用户包括 Amber Group、[Airwallex](https://apisix.apache.org/zh/blog/2021/11/03/airwallex-usercase/)、Lotus Cars、[vivo](https://apisix.apache.org/zh/blog/2022/11/13/vivo-with-apache-apisix/)、[WPS](https://apisix.apache.org/zh/blog/2021/09/28/wps-usercase/)、[爱奇艺](https://apisix.apache.org/zh/blog/2021/09/07/iqiyi-usercase/)等。

## APISIX 3.5 版本新特性

### Host 级别 TLS 协议配置

这个特性指的是在 NGINX 指定文件里，通过 YAML 指定全局，来配置支持客户端 TLS 的版本。比如所有的 API 只支持 TLS 1.2 和 TLS 1.3，但是有一些旧的客户端需要支持更早版本的 TLS 1.1，则可以同时配置，合并生效。

主要特性与优势：

1. 全局 TLS 版本配置：通过在 NGINX 指定文件中使用 YAML 格式，轻松配置客户端 TLS 版本的全局设置。

2. 与旧客户端的兼容性：通过同时配置和合并不同的 TLS 版本，满足需要支持旧版本 TLS 1.1 的客户端，确保通信的平稳和连续性。

3. 精细化控制：APISIX 借助 OpenResty 动态地为每个主机动态指定不同的 TLS 协议。这种精细化的控制能够根据每个 API 主机的独特需求，实现 TLS 配置的最佳安全性和灵活性。

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

在 APISIX 推出的一系列新特性中，值得称赞的是 APISIX 集成了 coraza-proxy-wasm 插件。APISIX 支持 Wasm（WebAssembly）开发插件，Coraza 也提供了 Wasm 插件可供选择，因而 APISIX 集成 Coraza 的成本相对较低。Wasm 的跨平台特性使得 APISIX 和 Coraza 可以无缝协同工作，免除了大规模修改代码并进行适配的工作。

主要特性与优势：

1. 强大的安全性：coraza-proxy-wasm 插件是一个基于 Wasm 的 Web 应用防火墙插件，通过实时分析和监控 HTTP 和 HTTPS 流量，可以检测和阻止常见的 Web 攻击，如 SQL 注入、跨站脚本（XSS）、跨站请求伪造（CSRF）等。

2. 灵活性和可扩展性：你可以灵活地配置和管理 WAF 规则，可以根据特定的应用程序需求进行定制。支持自定义规则和策略，可以根据具体的安全需求进行配置，还可以与其他安全工具和系统进行集成，提供更全面的安全解决方案。

目前可以使用 APISIX 进行更多 Wasm 上的应用，但目前还不支持异步调用，预计 10 月初会推出一个支持在 Wasm 异步调用的版本。之后也可以使用 Rust 或者 Golang 等主流的语言完整地开发 APISIX 插件。

### HTTP/3 & QUIC

APISIX 支持 HTTP/3 和 QUIC 协议可以带来更快的传输速度、更好的网络性能、更高的连接效率，并具备兼容性和未来性。这将有助于提升应用程序的性能和用户体验，并使其能够适应不断发展的网络环境。

APISIX 通过维护自己的 NGINX 版本，即 apisix-base，将 HTTP/3 和 QUIC 的补丁应用到 APISIX 的自有版本中，形成了一个自己的发行版。因为 APISIX 是基于 NGINX 和 OpenResty 之上的，因而 APISIX 要启用这个特性，还需要更新周边的生态系统，尤其是依赖上游的 NGINX 和 OpenResty。目前 APISIX 正在等待 OpenResty 的 master 版本升级到 NGINX 的 1.25 以上版本，再对 APISIX 的一些补丁和接口进行更新。预计在 10 月份可以实现。

主要特性与优势：

1. 更快的传输速度：HTTP/3 和 QUIC 采用了优化的传输机制，包括多路复用、0-RTT 连接建立和更好的拥塞控制等。这些技术能够显著提升数据传输的速度，减少延迟，从而提供更快的响应时间和更高的吞吐量。

2. 更好的网络性能：HTTP/3 和 QUIC 通过使用 UDP 协议作为传输层协议，绕过了 TCP 的一些限制和性能瓶颈。UDP 协议在不可靠网络环境下表现更好，能够更好地适应网络抖动和丢包等情况，从而提供更稳定和可靠的网络连接。

3. 更高的连接效率：HTTP/3 和 QUIC 采用了 0-RTT 连接建立的机制，可以在客户端和服务器之间建立更快速的初始连接。这意味着在与服务器建立连接时可以减少往返延迟，加快请求响应的周期，提高用户体验。

## APISIX 蓝图

### GitOps

APISIX 是云原生 API 网关，它与云原生系统能够更好地集成。尽管可以使用 YAML 编写 APISIX 配置，但 APISIX 缺乏与 CICD 等相关生态系统，如 Jenkins、ArgoCD 等生态的完整集成。APISIX Ingress Controller 项目在这方面进行了许多对接和集成工作，但 APISIX 本身在裸金属或虚拟机等非 Kubernetes 环境中使用时，并没有提供一套完整的声明式工具来支持 GitOps。

在接下来的一个月里，APISIX 将着重解决这个问题。通过 APISIX 的声明式工具 ADC，帮助用户在非 Kubernetes 环境中以声明式的方式进行各种集成。完成这项工作后，用户能在非 Kubernetes 环境中与 Jenkins、ArgoCD 等工具进行良好的对接，并使用 GitOps 的内部 CICD 方式来控制 APISIX 的各种行为，实现多环境发布等功能。

### OpenAPI

当我们谈到 API 网关时，实际上我们一直在讨论的不仅仅是 API 网关本身，因为 API 网关只是 API 全生命周期管理的一个环节。API 生命周期管理涵盖了 API 设计、API 文档、测试、网关以及货币化等方面，它是一个由多个组件构成的链条，而 API 网关只是其中一个非常重要的组件。要将所有这些组件串联起来，我们需要各个系统之间的接口或标准，而 Open API 就是其中非常重要的一环。

Open API 有多个版本，目前主流的是 OpenAPI 2.0（也被称为 Swagger）或者 OpenAPI 3.0。APISIX 的里程碑目标是完整地支持包括 Swagger、OpenAPI 3.0 以及 Postman Collection 等各种 API 定义方式。我们将支持使用 YAML 方式编写 API 定义，类似于 OpenAPI 这种协议格式。在 APISIX 完成 GitOps 支持后，用户能够方便地将在 Postman 等工具中定义的 API 导入到 APISIX 网关中，同时也可以将 APISIX 已定义的 API 导出到 Postman 等工具中进行集成。

### 重构外部 plugin runner

APISIX提供了多种插件编写方式，包括 Lua、Wasm 和其他外部插件。然而，在 Wasm 的开发中，APISIX 面临了一些问题，特别是在 plugin runner 方面。目前，plugin runner 和 APISIX 之间的通信是通过自定义的 RPC 协议进行的。然而，如果用户需要读取请求体或修改返回体等内容，仅仅使用 demo 是不够的。而且，当用户真正将其应用于生产环境时，自定义 RPC 会带来较高的改造成本，因为用户需要修改 RPC 协议，而且自定义 RPC 无法良好支持后续的各种语言库。

![APISIX plugin runner](https://static.apiseven.com/uploads/2023/09/22/QOQToIY9_9269cb5f-41dd-4f3f-bff1-a5f0c3b01bdc.jpeg)

因此，在新的 plugin runner 设计中，放弃 RPC 调用方式，转而采用标准的 HTTP 调用。在 HTTP 调用中，可以将其类比为云服务提供商提供的基于函数的 serverless 方式。在 APISIX 中，将通过 HTTP 方式调用远程函数，忽略底层使用的实现语言。通过这种方式，消除了自定义的 RPC 协议。

在下个月，我们将发布一个新的演示 demo，尽管在性能方面可能会有一定的损失，但对于用户的可扩展性和灵活性将有显著提升。用户不再需要了解中间的自定义协议，而是可以使用函数方式进行操作，从而获得更大的灵活性选择。用户可以考虑性能和 APISIX 整体阶段的完整性，选择使用 Lua 编写插件；如果用户认为 Lua 语言的维护难度较高，可以选择使用 Wasm；如果用户对性能要求没有那么严格，可以使用之前提到的函数方式进行调用。

### 重构文档

在 APISIX 社区中，经常有人抱怨[文档](https://apisix.apache.org/zh/docs/)质量低下。APISIX 文档之所以显得不专业，存在很多问题或遗漏，主要是因为它是一个社区驱动的项目，拥有大约 600 位贡献者，其中一半是代码贡献者，另一半是文档贡献者。这些来自不同背景的数百人编写文档，每个人描述问题方式都不同，因此文档内容的质量可能不一致。为此，我们计划对整个文档进行全面重构，并确保内容的质量。

我们将花费半年时间来重构 APISIX 的文档。新的 APISIX 文档将包括六个部分。首先是 Getting Started，可以让你在几分钟内快速了解和运行 APISIX；然后是 How to Guide，介绍一些常见的 APISIX 应用场景；接下来是背景信息介绍，解释一些概念，比如路由和服务的定义；此外，还将提供最佳实践，详细介绍 APISIX 在生产环境中的使用；另一个重点是对大约 100 个插件的介绍；最后是 reference 部分。

## 总结

APISIX 作为 API 网关中的佼佼者，积极与更多的生态集成，以丰富自身的功能，同时提升 APISIX 的使用体验。

Host 级别的 TLS 协议配置让用户可以在不同的主机级别上进行个性化的 TLS 配置，提供更高的安全性和定制性。APISIX 支持 Wasm 和 Coraza WAF，用户可以使用 Wasm 语言编写高性能的插件，进一步增强 APISIX 的功能；而 Coraza WAF 是一个强大的 Web 应用程序防火墙，它将进一步增强 APISIX 的安全防护能力。另外，APISIX 还将支持 HTTP/3 和 QUIC，这些是新一代的网络协议，具有更快的传输速度和更好的性能，为用户提供更流畅的体验。此外，APISIX 还公布了重要的蓝图：GitOps，OpenAPI，重构 plugin runner，以及重构外部文档。

APISIX 这一系列令人振奋的新特性和蓝图将为用户带来更高级别的安全性、性能和可扩展性，从而为用户提供更多选择，使得在构建和管理 API 时变得更加便捷和灵活。
