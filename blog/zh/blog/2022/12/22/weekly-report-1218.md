---
title: "社区双周报 (12.05 - 12.18)"
keywords: 
- Apache APISIX
- API 网关
- 社区周报
- 贡献者
description: 云原生 API 网关 Apache APISIX 近两周新增了国密密码套件，域名解析优化，Admin API 通过 gRPC 协议链接 ectd 等新功能。
tags: [Community]
image: https://static.apiseven.com/2022/12/22/63a40d559fbf7.png
---

> 从 12 月 5 日开始已有 27 位开发者为 Apache APISIX 提交了 68 个 commit。感谢以下小伙伴为 Apache APISIX 添砖加瓦（排名不分先后），是你们的无私付出，让 Apache APISIX 变得更好！

<!--truncate-->

## 导语

Apache APISIX 从开源第一天就以社区方式成长，迅速成为全世界最活跃的开源 API 网关项目。这些成就，离不开社区小伙伴们的共同奋斗。

“独行者速，众行者远”。Apache APISIX 社区周报希望可以帮助社区小伙伴们更好地掌握 Apache APISIX 社区的进展，方便大家参与到 Apache APISIX 社区中来。

我们还整理了一些适合新来社区的小伙伴们参加的 issue！感兴趣的同学们，走过路过不要错过！

## 贡献者统计

![贡献者海报-1205-1218.png](https://static.apiseven.com/2022/12/22/63a411bfb3595.png)

![新晋贡献者海报1205-1218.png](https://static.apiseven.com/2022/12/22/63a411c0d2e44.png)

## Good first issue

### Issue #1522

**链接**：https://github.com/apache/apisix-ingress-controller/issues/1522

**问题描述**：在 APISIX Ingress 的官网文档内，涉及到一些基础组成要素的内容中，多个文档之间存在不同步/不一致的问题。

### Issue #1547

**链接**：https://github.com/apache/apisix-ingress-controller/issues/1547

**问题描述**：正常情况下，CHANGELOG 文件应该由 release-tools 自动生成。而在最近的情况中，make update-all 指令可以修改 CHANGELOG 文件，这个问题需要修复。

## 近期功能特性亮点

### Apache APISIX

- [新增 `inspect` 插件](https://github.com/apache/apisix/pull/8400)（贡献者：[kingluo](https://github.com/kingluo)）

- [新增支持 Consul 作为服务发现模式](https://github.com/apache/apisix/pull/8380)（贡献者：[Fabriceli](https://github.com/Fabriceli)）

- [支持 `prometheus` 插件在特权进程中计算指标](https://github.com/apache/apisix/pull/8434)（贡献者：[tzssangglass](https://github.com/tzssangglass)）

- [支持通过 gRPC 同步数据](https://github.com/apache/apisix/pull/8450)（贡献者：[spacewander](https://github.com/spacewander)）

- [file-logger 插件支持记录响应体内容](https://github.com/apache/apisix/pull/8414)（贡献者：[pixeldin](https://github.com/pixeldin)）

- [支持在 Stream 子系统中解析域名](https://github.com/apache/apisix/pull/8500)（贡献者：[tzssangglass](https://github.com/tzssangglass)）

### Apache APISIX Ingress

- [为 Ingress 资源添加了新的 Annotation 来支持 response-rewrite 插件](https://github.com/apache/apisix-ingress-controller/pull/1487)（贡献者：[An-DJ](https://github.com/An-DJ)）

- [Ingress: 修正了数万 namespace 场景下，初始化耗时的问题](https://github.com/apache/apisix-ingress-controller/pull/1386)（贡献者：[shareinto](https://github.com/shareinto)）

- [Ingress：允许代理的外部服务可直接指定 Port](https://github.com/apache/apisix-ingress-controller/pull/1500)（贡献者：[Gallardot](https://github.com/Gallardot)）

Apache APISIX 的项目官网和 Github 上的 Issue 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 Issue 中搜索，也可以参与 Issue 上的讨论，提出自己的想法和实践经验。

## 近期博文推荐

- [聚焦人机交互智能应用领域，APISIX 在希沃网关的应用与实践](https://apisix.apache.org/zh/blog/2022/12/13/seewo-with-apache-apisix/)

    随着技术的飞速发展，在人际交互智能领域，业务需求也对架构迭代有了更高的要求。为了应对日趋成熟及快速增长的业务现状，希沃又是如何在网关层面进行跟进的呢？

- [智慧交通系统网新电气，如何基于 APISIX 迭代数字智联平台](https://apisix.apache.org/zh/blog/2022/12/09/insigma-with-apache-apisix/)

    在城市智能交通的覆盖范围下，很多场景对于流量处理和系统稳定性都要求极高。为了应对这种城市级别的数字智能要求，网新电气基于 APISIX 进行了网关层面的迭代。

- [Apache APISIX 玩转 Tongsuo 国密插件](https://apisix.apache.org/zh/blog/2022/12/08/apisix-support-tongsuo/)

    本文通过解读国密的相关内容与标准，呈现了当下国内技术环境中对于国密功能支持的现状。并从 API 网关 Apache APISIX 的角度，带来有关国密的探索与功能呈现。

- [APISIX 在君润人力云原生平台的架构实践](https://apisix.apache.org/zh/blog/2022/12/07/junrunrenli-with-apisix/)

    本文从君润人力业务快速扩张的背景入手，重点介绍开源 API 网关 APISIX 对其自研平台系统架构的多样化应用场景支持。

- [译文 | A poor man's API](https://apisix.apache.org/zh/blog/2022/12/a-poor-man%E2%80%98s-api/)

    本文将展示如何在不编写任何代码的情况下，简单实现一个 API 实践。

- [APISIX Ingress 是如何支持上千个 Pod 副本的应用](https://apisix.apache.org/zh/blog/2022/11/25/how-apisix-support-1000-pods/)

    本文通过介绍 Kubernetes 中上千个 Pod 副本应用场景的解析，提出技术实现的困难。介绍 APISIX Ingress 是如何解决这一难题的。

- [微服务中的服务发现是什么](https://apisix.apache.org/zh/blog/2022/11/10/what-is-service-in-microservice-discovery/)

    本文通过服务发现的相关背景和 APISIX 对于服务发现的应用与实践，来介绍微服务中的服务发现内容。
