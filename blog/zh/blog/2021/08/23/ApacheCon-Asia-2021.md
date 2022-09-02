---
title: "ApacheCon Asia 2021"
slug: 2021/08/23/apachecon-asia-2021
keywords:
- APISIX
- ApacheCon
- Apache Way
- 孵化
- 商业化
description: ApacheCon Asia 2021 于 2021 年 8 月 6-8 日在线举办。Apache APISIX 社区提交了限速，认证鉴权，服务网格、APISIX Ingress Controller 和开源商业化等相关议题。
tags: [Community]
---

> ApacheCon 是 Apache 软件基金会的官方全球系列会议。自 1998 年以来，ApacheCon 一直吸引着各个层次的参与者，在 350 多个 Apache 项目及其不同的社区中探索 “明日的技术”。ApacheCon Asia 是 ApacheCon 组委会针对亚太地区举办的 ApacheCon 在线会议，主要目标在于更好地服务亚太地区快速增长的 Apache 用户和贡献者。ApacheCon Asia 2021 于 2021 年 8 月 6-8 日在线举办。

<!--truncate-->

Apache APISIX 社区积极参与本次年度开源盛会，共提报了 8 个 API/微服务技术相关的议题，内容丰富。

## 使用 Apache APISIX 实现限流限速

分享者：陈军旭

谈到限流限速，人们往往最先想到的是 Nginx 。然而 Nginx 通过配置文件的方式实现，每次变更都需要 reload ，这让运维工作极其繁杂。另一方面，限速的条件被限制在 Nginx 的变量范围内，使得 Nginx 难以实现业务上精细化的限流限速需求。本次分享将带来如何使用 Apache APISIX 来实现动态、精细化、分布式的限流限速，以及如何通过插件编排来实现更符合业务需求的限流限速。

[**查看分享**](/articles/Speed-Limiting-With-Apache-APISIX)

## 用 Chaos Mesh 测试 Apache APISIX 的恢复能力

分享者：吴舒旸

Apache APISIX 是领先的 API 网关 OSS 之一。为了确保一切按计划进行，APISIX 使用了不同种类的测试，包括单元、e2e 和模糊测试。然而，我们仍然不确定，当一些不正常但不可避免的情况发生时，例如网络故障、IO 压力或 Pods 故障，APISIX 会如何表现。因此，在这里我们使用 Chaos Mesh，一个基于 Kubernetes 的混沌工程平台，可以顺利地注入不同种类的混沌，并将其整合到我们的 CI 管道中。在这个讲座的最后，听众会了解到混沌工程会在哪些方面给 API 网关带来好处，以及如何将混沌网整合到你自己的测试管道中。

[**查看分享**](/articles/Test-Apache-APISIX-Resilience-With-Chaos-Mesh)

## 使用 Apache APISIX 进行认证和授权

分享者：朱欣欣

认证和授权是 API 网关中非常必要的功能。这样一来，位于网关后面的服务就可以得到保护，避免未经授权或恶意的访问、数据泄露和黑客攻击。Apache APISIX 是一个动态、实时、高性能的 API 网关。而且它提供了许多插件，包括像 key-auth、Open-ID、wolf-RBAC 等认证和授权。本提案介绍了如何使用 APISIX 来进行认证和授权。

[**查看分享**](/articles/Using-Apache-APISIX-To-Do-Authentication-and-Authorization)

## 依托社区让 Apache APISIX 高速发展

分享者：王院生

在过去的一年里，APISIX 已经成为全世界最活跃的 API 网关项目，除了自身技术先进外，更得意于社区的高度活跃。截止目前，已经有来自世界各地 225 位贡献者参与贡献，并且还在保持高速增长。 本次分享会介绍 APISIX 在践行“社区重于代码”过程的一些心得。作为一个理想主义创业者，又是如何与 Apache 文化结合，让创业公司也能高速发展。

[**查看分享**](/articles/Relying-On-The-Community-To-Get-Apache-APISIX-Up-Speed)

## Apache APISIX 从开源项目到商业化之路

分享者：温铭

温铭，[api7.ai](api7.ai) 创始人，Apache APISIX PMC 主席，Apache 基金会 member，他演讲的题目是“Apache APISIX 从开源项目到商业化之路”。

[**查看分享**](/articles/Apache-APISIX-From-OpenSource-Commercialization)

## 使用 Echarts 呈现社区活动的渲染图

分享者：孙毅

通过以下方式分析了开源资源库的情况：1.贡献者增长曲线；2.每月的贡献者活动；3.来反映开源项目的健康状况，这里我们分享一些关于如何制作这两张图的经验和一些有趣的事情。

[**查看分享**](/articles/Rendering-Community-Events-Using-ECharts)

## 按照 Apache Way 运作开源商业化公司，这行得通吗

分享者：温铭

Apache Way 是被无数开源项目证实的社区成功之道，那么对于开源商业公司而言，Apache Way 是否可行呢？它在商业社会是否行得通？ 通过 2 年开源商业公司的经营，[支流科技](https://api7.ai/)希望用公司的切身经历来回答这个问题。

[**查看分享**](/articles/Apache-APISIX-From-OpenSource-Commercialization-by-Apache-Way)

## 开源的魅力

分享者：琚致远

Apache 软件基金会顶级项目 Apache APISIX 以及子项目，在过去 30 天中共合并了 250+ PRs，贡献者趋势也十分乐观。除此之外，高质量的邮件列表、活跃的、QQ 群 与 GitHub 也吸引众多社区的关注。作为 Apache APISIX PMC，从我的视角来分享 Apache APISIX 做了哪些事情，催化出活跃的社区？

[**查看分享**](/articles/The-Appeal-of-OpenSource)

## Apache APISIX 在移动云对象存储 EOS 的应用与实践

分享者：陈焱山

该演讲主题主要是讲述 Apache APISIX 在中国移动公有云对象存储 EOS 中的应用与实践经验分享。首先介绍了中国移动公有云建设规划及对象存储产品发展演进历程，然后阐述了我们为什么选择 Apache APISIX 作为负载均衡网关，并对 EOS 流量治理架构演进三个阶段进行进行了详细介绍。同时，我们还分享了基于 Apache APISIX 我们解决了哪些实际生产问题，做了哪些方案及开发工作，最后对我们未来的演进做了一些规划说明。

[**查看分享**](/articles/Apache-APISIX-in-China-Mobile-Cloud)

## 如何将 Apache APISIX 扩展为一个服务网格的边车

分享者：张超

在这个主题中，我将介绍 apisix-mesh-agent 项目，它有一些能力将 Apache APISIX 扩展为服务网格场景中的边车程序，更重要的是，它使用 xDS 协议从 Istio、Kuma 等控制平面获取配置。之后，我将介绍关于在服务网中使用 Apache APISIX 的未来计划和期望。

[**查看分享**](/articles/How-To-Extend-Apache-APISIX-into-a-Service-Mesh-Sidecar)

## Apache APISIX 的演变

分享者：罗泽轩

在这个主题中，我将介绍一下 Apache APISIX 的发展，包括：1.我们所做的好决定；2.我们所做的不好的决定；3.我们的未来计划

[**查看分享**](/articles/The-Evolution-of-Apache-APISIX)

## 基于 Apache APISIX 的 Kubernetes Ingress 的实现

分享者：金卫

介绍基于 Apache APISIX 的 Kubernetes Ingress 的优势以及 Apache APISIX Ingress 的特点。

[**查看分享**](/articles/Apache-APISIX-Kubernetes-Ingress)

## Apache APISIX 的孵化器之旅

分享者：温铭

Apache APISIX 的孵化器之旅

[**查看分享**](/articles/Apache-APISIX-Incubator-Journey)
