---
title: "APISIX Ingress 项目从 0 到 1 的发展历程"
slug: 2021/10/26/apisix-ingress
author: "金卫"
authorURL: "https://github.com/gxthrj"
authorImageURL: "https://avatars.githubusercontent.com/u/4413028?v=4"
keywords: 
- Apache APISIX
- APISIX Ingress Controller
- Kubernetes
- API 网关
- Apache
description: 本文详细描述了 Apache APISIX Ingress Controller 的成长历程，以及 APISIX Ingress 加入社区后的功能提升与社区帮助等多方面细节收获。
tags: [Ecosystem, Community]
---

> 本文描述了 APISIX Ingress 的成长历程，以及 APISIX Ingress 加入社区后的功能提升与社区帮助等多方面细节收获。

<!--truncate-->

## 概念篇

### APISIX Ingress 概述

在 K8s 生态中，Ingress 作为表示 K8s 流量入口的一种资源，想要让其生效，就需要有一个 Ingress Controller 去监听 K8s 中的 Ingress 资源，并对这些资源进行相应规则的解析和实际承载流量。

APISIX Ingress 则是基于 Apache APISIX 的 Ingress Controller 实现，实现了对 Kubernetes 的扩展，同时也支持 Ingress resource 的原生资源定义。

![APISIX Ingress 架构](https://static.apiseven.com/202108/1635304156040-50b7a2ae-ed0c-42ac-8517-edd0715e0082.png)

通过上图可以看到，APISIX Ingress 是在 Kubernetes 集群中部署，并代理 Kubernetes 外部集群的请求。然后将这些请求反向代理到 Kubernetes 集群 Service，同时也支持直接将服务推送到 Service Pod。

### 什么是 Apache APISIX

前边我们提到了 APISIX Ingress 是采用 Apache APISIX 作为实际承载业务流量的数据面，那么 Apache APISIX 项目又是做什么的呢？

Apache APISIX 是 Apache 基金会旗下的顶级开源项目，也是当前最活跃的开源网关项目，目前也通过中国信通院的可信开源项目认证。作为一个动态、实时、高性能的开源 API 网关，Apache APISIX 提供了负载均衡、动态上游、灰度发布、服务熔断、身份认证、可观测性等丰富的流量管理功能。

![Apache APISIX 架构](https://static.apiseven.com/202108/1635304156053-68751f2e-40e7-4932-99a4-5b9cc8f60628.png)

从上图框架可以看到，Apache APISIX 分为两部分，左侧数据面用来处理流量的反向代理，右侧控制面负责配置的分发。

Apache APISIX Ingress Controller 采用声明式的配置，经过内部处理后，最终会通过控制面的 Admin API 将数据同步到 etcd 中并传输给 Apache APISIX，实现 Apache APISIX 集群的配置同步。

更多关于 Apache APISIX Ingress Controller 特性讲解[点此查阅](https://github.com/apache/apisix-ingress-controller)。

## 成长篇

关于 Apache APISIX Ingress 的使用场景或者产品对比优势等，在往期的分享中大都提及了很多。这次我们换个角度，从 Apache APISIX Ingress 的诞生及发展角度进行解析。

### 加入 Apache 社区

![发展历程](https://static.apiseven.com/202108/1635304156115-9d5e41d0-a8e9-4a6e-8a1a-757f3107a49a.png)

2019 年我给 APISIX Ingress Controller 项目提供了第一行代码，2020 年 12 月份该项目被正式加入到 Apache 社区。在产品更新上，今年 6 月份我们发布了第一个 GA 版本，同时在刚刚过去的 10 月份中也发布了 1.3 版本，预计在今年 11 月份将会发布 1.4 版本，保证项目的正常更新迭代。

![贡献者增长曲线图](https://static.apiseven.com/202108/1635304156111-d0b82a61-b304-42ce-8d3a-2b959d3cb271.png)

上图是 Apache APISIX Ingress Controller 的贡献者增长曲线图。结合时间轴可以看到，从 2020 年 12 月加入 Apache 社区后，贡献者的人数增加速度呈现出高速稳定增长的态势。侧面反映出 Apache APISIX Ingress 得到了越来越多小伙伴的关注，并开始逐步应用到企业生产环境中。

### 在社区中成长

从个人项目或企业内部孵化出的项目开始到加入社区，前后环境的转换必然会导致项目工作方式的变化。加入社区后，Apache APISIX Ingress 在功能和项目整体度上得到了更多的支持与帮助。

#### 开启异步化讨论

成为 Apache 软件基金会项目后，Apache APISIX Ingress Controller 项目变得更加开放。比如关于产品每一个特性的新增或者修改都必须经过一些公开的讨论，讨论的方式一般分为邮件列表讨论和 GitHub Issue 讨论。

![邮件列表](https://static.apiseven.com/202108/1635304156102-8877f3da-a43d-4b94-9a84-a95743546112.png)
![GitHub Issue](https://static.apiseven.com/202108/1635304156096-c0eeb189-54f8-4ebe-b019-f41001869186.png)

目前是上述两种讨论同时发起，尽可能多地让大家站在各自的使用场景以及使用角度去评判特性的合理性。因为这已不再是一个个人项目，而是一个社区项目，是多人参与的合作产出。

同时，通过邮件列表和 GitHub Issue 的异步式讨论，可以更全面地收集到社区的反馈（不管是提问还是回答），在公开化的基础上为后续问题的搜索和整理提供了便利。

#### 增设社区例会

在互动方面，Apache APISIX Ingress 吸取了一些其他社区的经验，开放了一个每两周进行的社区例会活动。

这是一个新的渠道，我们希望让项目透明化的同时，也可以为社区小伙伴提供一个更生活化的渠道来一起讨论问题。

通过这个双周例会，我们会给大家详细介绍最近两周项目发生了哪些变化，有哪些新的 issue 被提出以及哪些 PR 正在等待合并。当然也会跟大家一起讨论当前项目的一些问题或建议。

我们希望这不仅是一个即时讨论的过程，更是一个分享和交流多角度事物观察的互动。

具体关于双周例会的会议内容[点此查阅](https://github.com/apache/apisix-ingress-controller/issues/614)，也可以点此查看[往期例会回放](https://space.bilibili.com/551921247)。

#### 项目细节更合规

进入 Apache 社区后，另一个比较大的变化是项目规划上变得更加规范，不管是代码、测试还是版本发布。

在代码层面，目前社区采用的是 [Golang 代码规范](https://github.com/uber-go/guide)，通过 Action CI 进行一些自动化检查。

为了保证项目特性能够快速合并，并且不会引入新的 bug，在测试规范上我们也进行了相关要求。比如在特性开发过程中，一定要包含单元测试或者 e2e 测试，其中 e2e 测试集成了 gruntwork-io/terratest 以及 kubernetes-sigs/kind，用来构建 Kubernetes 测试环境。

同时测试框架采用的是社区中广为接纳的 Ginkgo，测试用例的完善极大地保证了项目稳定性，同时也降低了项目的维护成本。

在版本发布方面，目前也是严格遵循了 Apache 社区的发版规范。同时由于 APISIX Ingress Controller 也是属于 Kubernetes 的一个扩展，所以在涉及 CRD 的迭代部分也是按照 Kubernetes 的发版规则进行。

## 收获篇

除了上述提到的关于项目制度上的一些规范，走向社区的过程中，我们也收获了很多小伙伴们的「技术回馈」。

### 完善了更多细节功能

这些贡献大都来源于社区小伙伴们平时在使用 APISIX Ingress 当中遇到的一些问题，或者场景上的一些完善，比如：

- Admission Hook
- Ingress 本身的 Prometheus Metrics
- mTLs
- 灰度功能的完善
- 产品使用文档的补充

更多特性[点此查看](https://github.com/apache/apisix-ingress-controller/#readme)。

同时借助社区的反馈，我们也顺应大家的需求支持了[多平台集成功能](https://github.com/apache/apisix-ingress-controller/blob/master/install.md#installation)。

![多平台集成](https://static.apiseven.com/202108/1635304156088-035cb0b0-8138-4e93-af5c-8e6ee8371f81.png)

### 丰富了使用场景库

在社区里得到功能加持的同时，也收获了关于 Apache APISIX Ingress 的使用场景上的丰富。

#### 场景一：Kubernetes 集群内部

最典型的一种方式是在 Kubernetes 集群内部进行部署，如下图就是一个典型的使用场景示意图。

![使用场景1](https://static.apiseven.com/202108/1635304156077-ced688eb-9dbf-4895-b7a2-acb2f4a288b2.png)

客户端经过外部 LB 后，经过 Apache APISIX 进行承接处理。Apache APISIX 作为网关也是一个反向代理，同时还可以部署在 Kubernetes 集群内外。

上图的部署场景就是在 Kubernetes 内部集成 APISIX Ingress Controller，通过 APISIX Ingress Controller 将 Kubernetes 的声明式配置同步到 Apache APISIX。这样外部的请求就可以通过 Apache APISIX 集群数据面去直接代理后续 Upstream 的业务服务。

#### 场景二：跨集群部署

苏州思必驰公司的用户为我们提供了关于跨集群使用场景，大体流程如下所示。

![跨集群部署](https://static.apiseven.com/202108/1635304156072-ae9a3943-e686-4629-a5b7-0b5c38301139.png)

在上图架构中有两个集群，即云主机正式集群和物理机集群。Apache APISIX Ingress Controller 在每一个集群内都有部署，在与 Kubernetes API server 交互的同时，通过 Apache APISIX Admin API 将配置同步到 Apache APISIX 集群。

在跨集群场景时，主要是通过 Apache APISIX 来打通集群之间的互相访问。通常集群之间的访问分为专线和公网，借助 Apache APISIX 的健康检查功能，可以做到当专线或公网传输失败时自动将流量切换到其他正常通道上，保证了业务的稳定与高可用。

#### 场景三：一个 Apache APISIX 集群管理多个 Kubernetes 集群

![多 Kubernetes 集群](https://static.apiseven.com/202108/1635304156063-c7d879c6-8dfb-4ead-a88d-b5bdc9e453d6.png)

该使用场景是将 APISIX Ingress Controller 部署在 Kubernetes 集群内部，与场景一不同的是这里有多个 Kubernetes 集群。但相应的 Apache APISIX 实际上是部署在所有 Kubernetes 集群外部，然后通过 Apache APISIX Ingress Controller 将各自集群的配置同步到总的 Apache APISIX 集群中。

这样做的优势是可以通过一套 SLB Cluster 去完全控制各个 Kubernetes 集群，满足一些企业架构为多集群或跨机房的使用场景，减少业务流量上的转发次数。

### 总结

得益于以上收获成果，Apache APISIX Ingress 也得到了越来越多的关注，越来越多的企业也开始将 APISIX Ingress Controller 应用到自家产品中，比如中国移动、又拍云、有赞、观为智慧等多家企业。未来期待更多企业选择 Apache APISIX Ingress。

## 未来规划

Apache APISIX Ingress 在不断迭代的过程中，也收到了很多社区小伙伴的一些建议，比如对未来产品的一些功能规划：

### 后续支持 Kubernetes gateway API

目前 Kubernetes 社区里也有很多企业在做自己的 Ingress 项目支持，Kubernetes 社区为了能统一 Ingress 的设计，给出了 gateway API 的实现标准。一旦实现了这种标准，后续用户再使用 APISIX Ingress 时，就可以做到同一份配置在不同的 Ingress 里去使用，完美适配多方部署。

### 后续支持 Ingress Controller 单体架构

目前社区里有一些声音会认为 Apache APISIX 所依赖的 etcd 实际上是一个有状态的服务，一旦涉及到有状态的服务，就需要额外去关注存储和迁移相关的工作。

大家希望在容器化的云原生场景下，让 Apache APISIX 可以无缝扩容，所以后续也会去进行 Ingress Controller 单体架构的部署规划。在这种场景下，Apache APISIX 可以脱离 etcd 单独部署，声明式配置可以被 Apache APISIX Ingress Controller 监听并同步到 Apache APISIX。

更多未来规划以及特性相关内容[点此查阅](https://github.com/apache/apisix-ingress-controller/milestones)。

社区的发展是永无止境的，很感谢一路以来各位用户对 Apache APISIX Ingress Controller 的支持。希望大家在后续使用过程中，可以积极地参与和反馈关于 Apache APISIX Ingress Controller 项目的任何问题，让产品变得更优秀。
