---
title: "ApacheCon Asia 2021：Apache APISIX 技术议题一览"
author: "Apache APISIX 社区"
keywords:
- API 网关
- Apache APISIX
- ApacheCon
- Service Mesh
- K8s
description: 本文介绍了云原生 API 网关 Apache APISIX 在 ApacheCon Asia 中相关的主题，包括在移动云使用 APISIX、身份认证、限流限速、服务网格、Kubernetes Ingress 等。
tags: [Community]
---

> ApacheCon 是 Apache 软件基金会的官方全球系列会议。自 1998 年以来，ApacheCon 一直吸引着各个层次的参与者，在 350 多个 Apache 项目及其不同的社区中探索 “明日的技术”。ApacheCon Asia 是 ApacheCon 组委会针对亚太地区举办的 ApacheCon 在线会议，主要目标在于更好地服务亚太地区快速增长的 Apache 用户和贡献者。ApacheCon Asia 2021 将于今年 8 月 6-8 日在线举办。

<!--truncate-->

## 关于 ApacheCon Asia 2021

ApacheCon 是 Apache 软件基金会的官方全球系列会议。自 1998 年以来，ApacheCon 一直吸引着各个层次的参与者，在 350 多个 Apache 项目及其不同的社区中探索 “明日的技术”。

ApacheCon Asia 是 ApacheCon 组委会针对亚太地区举办的 ApacheCon 在线会议，主要目标在于更好地服务亚太地区快速增长的 Apache 用户和贡献者。ApacheCon Asia 2021 将于今年 8 月 6-8 日在线举办。

![ApacheCon Asia 2021](https://static.apiseven.com/202108/1635750552467-1d0013df-9caa-43a3-bed2-b914d856c413.png)

近期 ApacheCon Asia 2021 团队正式公布了大会日程，Apache APISIX 社区积极参与本次年度开源盛会，共提报了 8 个 API/微服务技术相关的议题，内容丰富，欢迎关注。同时，ApacheCon Asia 2021 也为无法参加在线会议的各位开源爱好者提供了每个议题的回放和录播视频，详情请移步 [Apache Local Community 北京本地社区](https://space.bilibili.com/609014805)。

## 关于 API / 微服务技术议题

API 是服务连接的基石，通过 API 我们可以将各种服务进行搭建，并提供给用户使用；随着应用的复杂度越来越高，单体应用逐渐被拆分为微服务，产品可以快速迭代的同时也带来安全、维护和可观测性方面的技术挑战。

Apache APISIX 是 Apache 顶级项目，也是全球最活跃的开源网关项目。在这个专题中，大家不仅可以了解 Apache APISIX 设计理念，也会学习到 Apache APISIX 项目的最佳实践。

## Apache APISIX 在移动云对象存储 EOS 的应用与实践

### 议题简介

该演讲主题主要是讲述 Apache APISIX 在中国移动公有云对象存储 EOS 中的应用与实践经验分享。首先介绍了中国移动公有云建设规划及对象存储产品发展演进历程，然后阐述了我们为什么选择 Apache APISIX 作为负载均衡网关，并对 EOS 流量治理架构演进三个阶段进行进行了详细介绍。同时，我们还分享了基于 Apache APISIX 我们解决了哪些实际生产问题，做了哪些方案及开发工作，最后对我们未来的演进做了一些规划说明。

### 分享嘉宾

![陈焱山](https://static.apiseven.com/202108/1639465900639-ce850138-e0f5-4264-a902-be8ca94b93c0.png)

陈焱山 —  毕业后一直从事分布式存储软件开发及架构方案设计工作，深度参与了移动云建设过程，重点完成了对象存储相关的主要技术方案选型及落地开发建设工作。同时，在分布式对象存储领域拥有丰富的实战经验，目前正在思考基于 APISIX 七层网关实现对象存储流量治理工作，实现架构进一步升级。

### 分享时间

2021-08-07 15:30 GMT+8

## 使用 Apache APISIX 实现限流限速

### 议题简介

谈到限流限速，人们往往最先想到的是 Nginx。然而 Nginx 通过配置文件的方式实现，每次变更都需要 reload，这让运维工作极其繁杂。另一方面，限速的条件被限制在 Nginx 的变量范围内，使得 Nginx 难以实现业务上精细化的限流限速需求。

本次分享将带来如何使用 Apache APISIX 来实现动态、精细化、分布式的限流限速，以及如何通过插件编排来实现更符合业务需求的限流限速。

### 分享嘉宾

![陈军旭](https://static.apiseven.com/202108/1639465952917-9089d8e8-4509-4d14-91d9-84b587cb5e7d.png)

陈军旭 —  互联网老兵，曾任职于新浪、迅雷、360 等知名互联网公司，Apache APISIX Committer。

### 分享时间

2021-08-06 13:30 GMT+8

## 用混沌网测试 Apache APISIX 的恢复能力

### 议题简介

Apache APISIX 是领先的 API 网关 OSS 之一。为了确保一切按计划进行，APISIX 使用了不同种类的测试，包括单元、e2e 和模糊测试。然而，我们仍然不确定，当一些不正常但不可避免的情况发生时，例如网络故障、IO 压力或 pod 故障，APISIX 会如何表现。

因此，在这里我们使用 Chaos Mesh，一个基于 Kubernetes 的混沌工程平台，可以顺利地注入不同种类的混沌，并将其整合到我们的 CI 管道中。在这个讲座的最后，听众会了解到混沌工程会在哪些方面给 API 网关带来好处，以及如何将混沌网整合到你自己的测试管道中。

### 分享嘉宾

![吴舒旸](https://static.apiseven.com/202108/1639466011014-75736153-f109-4318-a693-38e3bb59cbdd.png)

吴舒旸 — Apache APISIX 和 Chaos Mesh 的 Committer，他领导了 Chaos Mesh 与 Apache APISIX CI 的整合工作。

### 分享时间

2021-08-06 14:50 GMT+8

## 使用 Apache APISIX 进行认证和授权

### 议题简介

认证和授权是 API 网关中非常必要的功能。这样一来，位于网关后面的服务就可以得到保护，避免未经授权或恶意的访问、数据泄露和黑客攻击。Apache APISIX 是一个动态、实时、高性能的 API 网关。而且它提供了许多插件，包括像 key-auth、Open-ID、wolf-RBAC 等认证和授权。本提案介绍了如何使用 Apache APISIX 来进行认证和授权。

### 分享嘉宾

![朱欣欣](https://static.apiseven.com/202108/1639466066729-9b4d07e2-47f3-4725-99d5-5266864e1c73.png)

朱欣欣 — Apache APISIX Committer，有多年 CDN 工作经验，熟悉网关。

### 分享时间

2021-08-06 15:30 GMT+8

## 依托社区让 Apache APISIX 高速发展

### 议题简介

在过去的一年里，Apache APISIX 已经成为全世界最活跃的 API 网关项目，除了自身技术先进外，更得益于社区的高度活跃。截止目前，已经有来自世界各地 225 位贡献者参与贡献，并且还在保持高速增长。本次分享会介绍 APISIX 在践行“社区重于代码”过程的一些心得。作为一个理想主义创业者，又是如何与 Apache 文化结合，让创业公司也能高速发展。

### 分享嘉宾

![王院生](https://static.apiseven.com/202108/1639466127487-bc14552c-5326-43f6-8753-c0df363c3922.png)

王院生 — 开源爱好者 Apache APISIX 创始人和 PMC 成员。

### 分享时间

2021-08-06 16:10 GMT+8

## 如何将 Apache APISIX 扩展为一个服务网格的边车

### 议题简介

在这个议题中将介绍 apisix-mesh-agent 项目，它有一些能力将 Apache APISIX 扩展为服务网格场景中的边车程序，更重要的是，它使用 xDS 协议从 Istio、Kuma 等控制平面获取配置。之后，我将介绍关于在服务网中使用 Apache APISIX 的未来计划和期望。

### 分享嘉宾

![张超](https://static.apiseven.com/202108/1639466178896-23fb5c6e-ccb1-46e0-ac02-55fef1b3bedf.png)

张超 — Apache APISIX PMC，OpenResty 贡献者，开源爱好者，现在正在研究 Service Mesh、Kubernetes 和 API Gateway。

### 分享时间

2021-08-07 13:30 GMT+8

## Apache APISIX 的演变

### 议题简介

Apache APISIX 是最受欢迎的 API 网关之一：https://github.com/apache/apisix，我将介绍一下 Apache APISIX 的发展，包括：

1. 我们所做的好决定
2. 我们所做的不好的决定
3. 我们的未来计划

### 分享嘉宾

![罗泽轩](https://static.apiseven.com/202108/1639466430768-b416eea2-e8e3-4a50-91b9-2d6b05aead10.png)

罗泽轩 —  Apache APISIX PMC，OpenResty 开发者。

### 分享时间

2021-08-07 14:10 GMT+8

## 基于 Apache APISIX 的 KUBERNETES INGRESS 的实现

### 议题简介

介绍基于 Apache APISIX 的 Kubernetes Ingress 的优势以及 Apache APISIX Ingress 的特点。

### 分享嘉宾

![金卫](https://static.apiseven.com/202108/1639466497596-7e4b91a9-2367-457a-ad33-0c5db7b87c24.png)

金卫  — Apache APISIX PMC，Apache apisix-ingress-controller Founder，Apache Skywalking Committer。

### 分享时间

2021-08-07 14:50 GMT+8
