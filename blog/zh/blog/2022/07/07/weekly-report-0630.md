---
title: "社区双周报 6.16 - 6.30"
keywords: 
- Apache APISIX
- API 网关
- 社区周报
- 贡献者
description: 云原生 API 网关 Apache APISIX 近两周新增了支持用户自定义插件优先级、检查配置文件中的 plugin_metadata、`kafka` 插件新增相关参数支持等功能。
tags: [Community]
---

> 从 6.16 - 6.30，有 29 位开发者为 Apache APISIX 提交了 98 个 commits。感谢这些小伙伴为 Apache APISIX 添砖加瓦，是你们的无私付出，让 Apache APISIX 项目变得更好！

<!--truncate-->

## 导语

Apache APISIX 从开源第一天就以社区方式成长，迅速成为全世界最活跃的开源 API 网关项目。这些成就，离不开社区小伙伴们的共同奋斗。

“独行者速，众行者远”。Apache APISIX 社区周报希望可以帮助社区小伙伴们更好地掌握 Apache APISIX 社区的进展，方便大家参与到 Apache APISIX 社区中来。

我们还整理了一些适合新来社区的小伙伴们参加的 issue！感兴趣的同学们，走过路过不要错过！

## 贡献者统计

![本周贡献者名单](https://static.apiseven.com/2022/blog/0707/3.jpg)

![本周新晋贡献者](https://static.apiseven.com/2022/blog/0707/1.png)

## Good first issue

### Issue #1075

**链接**：https://github.com/apache/apisix-ingress-controller/issues/1075

**问题描述**：在当前版本中，我们会使用最新版本的 APISIX 进行 e2e 测试，以确保 APISIX Ingress 和 APISIX 的兼容性，但是我们无法得知 APISIX 最新的一些变化。因此需要添加一个计划任务，来使用  `apisix:dev` 镜像进行回归测试。

在此之前，默认情况下使用 `apisix:dev` 进行 e2e 测试，但这种方式会影响开发体验，因为有时候发现 e2e 测试失败了，但实际上是由于 APISIX 发生了变化而没有同步到 APISIX Ingress 中。

## 近期功能特性亮点

- [`kafka` 插件新增相关参数支持](https://github.com/apache/apisix/pull/7266)（贡献者：[mikawudi](https://github.com/mikawudi)）

- [允许用户自定义插件优先级](https://github.com/apache/apisix/pull/7273)（贡献者：[tzssangglass](https://github.com/tzssangglass)）

- [支持检查配置文件中的 plugin_metadata](https://github.com/apache/apisix/pull/7315)（贡献者：[fesily](https://github.com/fesily)）

## 近期博文推荐

- [助力开发者，全方位解读 APISIX 测试案例](https://apisix.apache.org/zh/blog/2022/06/27/getting-start-with-apisix-test-cases)

本文主要介绍了如何编写以及运行 APISIX 的测试案例。

- [APISIX 与 Ory Hydra 集成丰富身份认证方式](https://apisix.apache.org/zh/blog/2022/07/04/apisix-integrates-with-hydra)

本文介绍了 Apache APISIX 如何与 Ory Hydra 集成实现集中式身份认证。

- [使用 Keycloak 与 API 网关保护你的 API](https://apisix.apache.org/zh/blog/2022/07/06/use-keycloak-with-api-gateway-to-secure-apis)

本篇文章将一步一步引导你如何使用 API 网关与 Keycloak 保护你的 API。

Apache APISIX 的项目官网和 Github 上的 issue 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 issue 中搜索，也可以参与 issue 上的讨论，提出自己的想法和实践经验。
