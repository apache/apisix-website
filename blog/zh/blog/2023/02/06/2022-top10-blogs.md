---
title: "2022 年度优质文章盘点 Top10"
authors:
  - name: "Shirley"
    title: "Author"
    url: "https://github.com/ShirleyHhh"
    image_url: "https://github.com/ShirleyHhh.png"
keywords: 
- Apache APISIX
- Amesh
- Kubernetes
- Apache APISIX
description: 本文整理盘点了 2022 年度 Top10 高阅读量文章，其中包括技术原理、生态共建、行业知识科普、流行插件实操教程等，建议收藏。
tags: [Ecosystem]
image: https://static.apiseven.com/uploads/2023/02/10/mIPzfTQf_top10_2.png
---

> 本文整理盘点了 2022 年度 Top10 高阅读量文章，其中包括技术原理、生态共建、行业知识科普、流行插件实操教程等，建议收藏。

<!--truncate-->

Apache APISIX 社区在过去的一年里持续输出关于 API 网关、云原生、微服务等领域的文章，助力企业和个人在开发测试与生产环境中落地 APISIX 应用实践。

为了方便社区同学回顾，我们整理盘点了 2022 年度 Top10 高阅读量文章，其中包括技术原理、生态共建、行业知识科普、流行插件实操教程等，建议收藏。

## 2022 年度优质文章 Top10

### [Apache APISIX 结合 Authing 实现集中式身份认证管理](https://apisix.apache.org/zh/blog/2022/01/04/authing/)

与传统认证模式不同，集中身份认证模式把用户认证从应用服务中抽离了出来。以 Apache APISIX 为例，集中认证的流程首先由用户发起请求（request），然后由前置的网关负责用户认证流程，与身份提供方对接，向身份提供方发送身份认证（authorization）请求。身份提供方返回用户身份信息（user info）。网关完成用户身份识别后，将用户身份信息通过请求头的形式转发至后端应用。

### [API 网关集成 ClickHouse 插件提升全链路日志效率](https://apisix.apache.org/zh/blog/2022/03/04/apigateway-clickhouse-makes-logging-easier/)

ClickHouse 由 Yandex 开发，在 2016 年开源。ClickHouse 不止是一个数据库， 也是一个数据库管理系统，它允许在运行时创建表和数据库、加载数据和运行查询，而无需重新配置或重启服务。随着越来越多的公司开始将业务迁移上云，如何高效地实现日志收发及日志分析，增强系统的可观测性成为了一个难题。

### [重磅功能！Apache APISIX 拥抱 WASM 生态](https://apisix.apache.org/zh/blog/2021/11/19/apisix-supports-wasm/)

WASM 全称 WebAssembly，它是一套字节码标准，专门设计成可以在宿主环境中嵌套使用。要想运行特定的应用，需要实现该应用所需的 API。以 JavaScript 为例，虽然同样是 JavaScript 代码，但是针对浏览器写的 JS 模块不能直接用在 npm 包里面，因为两个的 API 不一样。所以仅仅把 WASM 放到 Apache APISIX 里面并行不通，要想让开发者在 Apache APISIX 上运行 WASM，我们还需要提供一套专门的 API。

### [代理类型升级，APISIX 支持 Kafka 作为上游](https://apisix.apache.org/zh/blog/2022/01/17/apisix-kafka-integration/)

https://mp.weixin.qq.com/s/3GZwuzipBbXqp1i_HeQpHg

Apache APISIX 2.14 版本起，提供 Kafka 类型的上游，用户可以通过在路由中配置 Scheme 为 Kafka 的上游开启 Kafka 消费者功能，从而在各种环境中实现消息订阅。本文将介绍 Kafka 发布订阅功能及 `kafka-proxy` 插件的使用细节，为大家呈现如何将 APISIX 与 Kafka 结合使用在浏览器等连接受限的场景，实现对 Kafka 中消息的消费。

### [使用 Gitpod 开发 API 网关 Apache APISIX](https://apisix.apache.org/zh/blog/2022/03/03/develop-apisix-with-gitpod/)

Apache APISIX 作为开源的云原生 API 网关，如何快速的部署 APISIX 的开发环境对于开发者是比较重要的。本文将为大家介绍如何使用 Gitpod 对 Apache APISIX 进行相关开发。

### [微服务中的服务发现是什么？](https://apisix.apache.org/zh/blog/2022/11/10/what-is-service-in-microservice-discovery/)

在互联网刚开始出现的年代，人们要想访问某个在线服务，需要输入一长串的 IP 地址。IP 地址虽然不长，但是作为一串无意义的数字，要求记住特定服务的特定地址还是很考验人的记忆力。所以后来人们就发明了域名系统。每个在线服务会到域名商注册一个域名，然后通过 DNS 建立域名和具体 IP 的联系。这样一来，人们只需要输入一个好记的域名，就能访问到具体 IP 上的在线服务。这就是最早的服务发现。本文通过服务发现的相关背景和 APISIX 对于服务发现的应用与实践，来介绍微服务中的服务发现内容。

### [API 网关 APISIX 集成 OpenWhisk 丰富认证场景](https://apisix.apache.org/zh/blog/2021/12/24/apisix-integrate-openwhisk-plugin/)

本文将介绍 Apache APISIX 2.12.0 版本中新增的插件——OpenWhisk，并通过详细步骤向大家展示如何将 OpenWhisk 服务与 Apache APISIX 进行集成，来享受无服务器计算的优势。

### [多协议接入框架 xRPC 细节前瞻](https://apisix.apache.org/zh/blog/2022/01/21/apisix-xrpc-details-and-miltilingual/)

本文为大家带来了 Apache APISIX 即将发布的 xRPC 框架以及相关细节，同时介绍了 Apache APISIX 在多语言开发支持中的细节展示。通过多协议代理与多语言支持两个角度，充分展示了 Apache APISIX 在面向生态的多项努力。也欢迎随时在 GitHub Discussions 中发起讨论，或通过邮件列表进行交流。

### [让你在 Apache APISIX 中代理 Dubbo 服务更便捷](https://apisix.apache.org/zh/blog/2022/01/13/how-to-proxy-dubbo-in-apache-apisix/)

Apache Dubbo 是由阿里巴巴开源并捐赠给 Apache 的微服务开发框架，它提供了 RPC 通信与微服务治理两大关键能力。Apache APISIX 基于开源项目 tengine/mod_dubbo 模块为 Apache Dubbo 服务配备了HTTP 网关能力。通过 dubbo-proxy 插件，可以轻松地将 Dubbo Service 发布为 HTTP 服务。

### [API 网关 Apache APISIX 集成 CNCF OpenFunction](https://apisix.apache.org/zh/blog/2022/09/20/apisix-integrate-cncf-openfunction/)

无服务具有高度可扩展和成本低等优势，使用这种方式部署业务服务能够极大降低资源使用和投入成本。如果你正在使用 OpenFunction 作为无服务平台，你就可以使用 Apache APISIX 去代理这些函数的请求，为函数请求追加服务治理的能力。
