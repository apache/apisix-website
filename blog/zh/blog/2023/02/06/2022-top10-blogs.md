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
---

> 本文整理盘点了 2022 年度 Top10 高阅读量文章，其中包括技术原理、生态共建、行业知识科普、流行插件实操教程等，建议收藏。

<!--truncate-->

Apache APISIX 社区在过去的一年里持续输出关于 API 网关、云原生、微服务等领域的文章，助力企业和个人在开发测试与生产环境中落地 APISIX 应用实践。

为了方便各位回顾学习，我们特地帮大家整理了年度 TOP10 高阅读量的文章，包括技术原理、生态共建、行业知识科普、流行插件实操教程等，强烈建议收藏。
本文通过服务发现的相关背景和 APISIX 对于服务发现的应用与实践，来介绍微服务中的服务发现内容。

## 优秀技术文章 Top10

Apache APISIX 结合 Authing 实现集中式身份认证管理
https://mp.weixin.qq.com/s/d1oxs5vLY_DqfZZH2Oajrg

与传统认证模式不同，集中身份认证模式把用户认证从应用服务中抽离了出来。以 Apache APISIX 为例，集中认证的流程如上图所示：首先由用户发起请求（request），然后由前置的网关负责用户认证流程，与身份提供方对接，向身份提供方发送身份认证（authorization）请求。身份提供方返回用户身份信息（user info）。网关完成用户身份识别后，将用户身份信息通过请求头的形式转发至后端应用。

化繁为简，Apache APISIX 集成 ClickHouse 插件提升全链路日志效率
https://mp.weixin.qq.com/s/4lKD4eQoQNiH7p_iktPY9g

ClickHouse 由 Yandex 开发，在2016年开源。ClickHouse 不止是一个数据库， 也是一个数据库管理系统，它允许在运行时创建表和数据库、加载数据和运行查询，而无需重新配置或重启服务。随着越来越多的公司开始将业务迁移上云，如何高效地实现日志收发及日志分析，增强系统的可观测性成为了一个难题。

重磅功能！Apache APISIX 拥抱 WASM 生态
https://mp.weixin.qq.com/s/gZrRqzSIVH7b04b1RF52AA

WASM 全称 WebAssembly，它是一套字节码标准，专门设计成可以在宿主环境中嵌套使用。要想运行特定的应用，需要实现该应用所需的 API。以 JavaScript 为例，虽然同样是 JavaScript 代码，但是针对浏览器写的 JS 模块不能直接用在 npm 包里面，因为两个的 API 不一样。所以仅仅把 WASM 放到 Apache APISIX 里面并行不通，要想让开发者在 Apache APISIX 上运行 WASM，我们还需要提供一套专门的 API。

代理类型升级，APISIX 支持 Kafka 作为上游
https://mp.weixin.qq.com/s/3GZwuzipBbXqp1i_HeQpHg

Apache APISIX 2.14 版本起，提供 Kafka 类型的上游，用户可以通过在路由中配置 scheme 为 Kafka 的上游开启 Kafka 消费者功能，从而在各种环境中实现消息订阅。本文将介绍 Kafka 发布订阅功能及 kafka-proxy 插件的使用细节，为大家呈现如何将 APISIX 与 Kafka 结合使用在浏览器等连接受限的场景，实现对 Kafka 中消息的消费。

开源云 IDE 产品新宠儿，如何使用 Gitpod 开发 APISIX？
https://mp.weixin.qq.com/s/xcTunwFz0dyJ4EbwNUaSfw

所谓“云 IDE”就是使用云端的计算资源作为开发环境，进行软件项目的开发。Apache APISIX 作为开源的云原生 API 网关，如何快速的部署 APISIX 的开发环境对于开发者是比较重要的。本文将为大家介绍如何使用 Gitpod 对 Apache APISIX 进行相关开发。

微服务中的服务发现是什么？
https://mp.weixin.qq.com/s/5Ap0vU_2aaZzmob90JzpLQ

在互联网刚开始出现的年代，人们要想访问某个在线服务，需要输入一长串的 IP 地址。IP 地址虽然不长，但是作为一串无意义的数字，要求记住特定服务的特定地址还是很考验人的记忆力。所以后来人们就发明了域名系统。每个在线服务会到域名商注册一个域名，然后通过 DNS 建立域名和具体 IP 的联系。这样一来，人们只需要输入一个好记的域名，就能访问到具体 IP 上的在线服务。这就是最早的服务发现。

新版本插件解读｜Apache OpenWhisk 集成闪亮登场
https://mp.weixin.qq.com/s/dyAmNj9CY-NIfbkG8_Gplg

本文将介绍 Apache APISIX 2.12.0 版本中新增的插件——openwhisk，并通过详细步骤向大家展示如何将 OpenWhisk 服务与 Apache APISIX 进行集成，来享受无服务器计算的优势。

多协议接入框架 xRPC 发布在即，为你解读更多 APISIX 生态细节
https://mp.weixin.qq.com/s/tbhsoJk_8UWdbXi_yUzY2A

本文为大家带来了 Apache APISIX 即将发布的 xRPC 框架以及相关细节，同时介绍了 Apache APISIX 在多语言开发支持中的细节展示。通过多协议代理与多语言支持两个角度，充分展示了 Apache APISIX 在面向生态的多项努力。也欢迎随时在 GitHub Discussions 中发起讨论，或通过邮件列表进行交流。

从原理到操作，让你在 APISIX 中代理 Dubbo 服务更便捷
https://mp.weixin.qq.com/s/WVh6eA8fCsAdHQfffnSiYQ
Apache Dubbo 一般会作为后端系统间 RPC 调用的实现框架，当需要提供 HTTP 接口给到前端时，会通过一个「胶水层」将 Dubbo Service 包装成 HTTP 接口，再交付到前端系统。Apache APISIX 基于开源项目 tengine/mod_dubbo 模块为 Apache Dubbo 服务配备了HTTP 网关能力。通过 dubbo-proxy 插件，可以轻松地将 Dubbo Service 发布为 HTTP 服务。

API 网关 Apache APISIX 集成 CNCF OpenFunction
https://mp.weixin.qq.com/s/b5QHbnFUd-r2VwXfySKJkg

无服务具有高度可扩展和成本低等优势，使用这种方式部署业务服务能够极大降低资源使用和投入成本。如果你正在使用 OpenFunction 作为无服务平台，你就可以使用 Apache APISIX 去代理这些函数的请求，为函数请求追加服务治理的能力。

## 延伸阅读

社区 > 代码，开源社区砥砺前行的背后故事
https://mp.weixin.qq.com/s/50kSEaUloNgYWf4BAVZpCQ（建议此处用图片超链接）

项目的快速成长与发展，除了产品本身的功能进步外，也离不开产品背后的社区与人。在使用 APISIX 的用户和企业中，他们反复提到过“APISIX 社区的响应速度真的超级快”。所以从这个角度来看，APISIX 快速增长的秘诀还是得益于整个社区的氛围，更具体地说是它的活跃性和开放性。而这也正是 Apache Way 的践行标准之一，以开放、透明的姿态去呈现产品和与人沟通。
