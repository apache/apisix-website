---
title: "社区双周报 (12.19 - 1.1)"
keywords: 
- Apache APISIX
- API 网关
- 社区周报
- 贡献者
description: “独行者速，众行者远”。Apache APISIX 社区周报希望可以帮助社区小伙伴们更好地掌握 Apache APISIX 社区的进展，方便大家参与到 Apache APISIX 社区中来。
tags: [Community]
image: https://static.apiseven.com/2023/01/05/63b66c8388a6c.png
---

> 从 2022.12.19 - 2023.1.1，有 21 位开发者为 Apache APISIX 提交了 64 个 commit。感谢这些小伙伴为 Apache APISIX 添砖加瓦，是你们的无私付出，让 Apache APISIX 项目变得更好！

<!--truncate-->

## 导语

Apache APISIX 从开源第一天就以社区方式成长，迅速成为全世界最活跃的开源 API 网关项目。这些成就，离不开社区小伙伴们的共同奋斗。

“独行者速，众行者远”。Apache APISIX 社区周报希望可以帮助社区小伙伴们更好地掌握 Apache APISIX 社区的进展，方便大家参与到 Apache APISIX 社区中来。

我们还整理了一些适合新来社区的小伙伴们参加的 issue！感兴趣的同学们，走过路过不要错过！

## 贡献者统计

![贡献者名单](https://static.apiseven.com/2023/01/05/63b66c807be86.png)

![新晋贡献者](https://static.apiseven.com/2023/01/05/63b66c8590e1f.png)

## Good first issue

### Issue #1572

**链接**：https://github.com/apache/apisix-ingress-controller/issues/1572

**问题描述**：更新 GitHub PR 模板，当前模板过于简约。

## 近期功能特性亮点

- [更多 APISIX 插件原生支持数据加密特性](https://github.com/apache/apisix/pull/8487)（贡献者：[tzssangglass](https://github.com/tzssangglass)）

- [支持通过 gRPC 协议在 NGINX 启动前与 etcd 交互](https://github.com/apache/apisix/pull/8548)（贡献者：[spacewander](https://github.com/spacewander)）

- [`consumer-restriction` 插件添加 consumer_group_id 字段，为 Consumer 增添更多分类条件](https://github.com/apache/apisix/pull/8567)（贡献者：[ronething](https://github.com/ronething)）

Apache APISIX 的项目官网和 Github 上的 Issue 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 Issue 中搜索，也可以参与 Issue 上的讨论，提出自己的想法和实践经验。

## 近期博文推荐

- [Apache APISIX 3.1.0 正式发布](https://apisix.apache.org/zh/blog/2022/12/30/release-apache-apisix-3.1.0/)

    Apache APISIX 3.1.0 版本正式发布！此版本带来很多关于安全层面的功能支持，同时新增内置调试插件，旨在优化对 APISIX 的使用体验。

- [为什么 APISIX Ingress 是比 Traefik 更好的选择？](https://apisix.apache.org/zh/blog/2022/12/19/apisix-ingress-better-than-traefik/)

    本文可以为正在选型 Kubernetes Ingress Controller 产品的用户提供一些帮助。

- [认证鉴权对于 API 网关的重要性](https://apisix.apache.org/zh/blog/2022/12/19/auth-apisix-gateway/)

    认证鉴权作为 API 网关不可或缺的能力，已然成为用户在选型 API 网关时考量的重要因素之一。

- [聚焦人机交互智能应用领域，APISIX 在希沃网关的应用与实践](https://apisix.apache.org/zh/blog/2022/12/13/seewo-with-apache-apisix/)

    随着技术的飞速发展，在人际交互智能领域，业务需求也对架构迭代有了更高的要求。为了应对日趋成熟及快速增长的业务现状，希沃又是如何在网关层面进行跟进的呢？

- [智慧交通系统网新电气，如何基于 APISIX 迭代数字智联平台](https://apisix.apache.org/zh/blog/2022/12/09/insigma-with-apache-apisix/)

    在城市智能交通的覆盖范围下，很多场景对于流量处理和系统稳定性都要求极高。为了应对这种城市级别的数字智能要求，网新电气基于 APISIX 进行了网关层面的迭代。

- [APISIX 在君润人力云原生平台的架构实践](https://apisix.apache.org/zh/blog/2022/12/07/junrunrenli-with-apisix/)

    本文从君润人力业务快速扩张的背景入手，重点介绍开源 API 网关 APISIX 对其自研平台系统架构的多样化应用场景支持。
