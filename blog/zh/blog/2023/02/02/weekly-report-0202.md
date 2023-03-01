---
title: "社区双周报 (1.16 - 1.29)"
keywords: 
- Apache APISIX
- API 网关
- 社区周报
- 贡献者
description: “独行者速，众行者远”。Apache APISIX 社区周报希望可以帮助社区小伙伴们更好地掌握 Apache APISIX 社区的进展，方便大家参与到 Apache APISIX 社区中来。
tags: [Community]
image: https://static.apiseven.com/uploads/2023/02/01/Uoq4Nykd_%E7%A4%BE%E5%8C%BA%E5%8F%8C%E5%91%A8%E6%8A%A5-%E5%A4%B4%E5%9B%BE-02%E5%91%A8.png
---

> 从 2023.1.16 - 2023.1.29，有 21 位开发者为 Apache APISIX 提交了 41 个 commit。感谢这些小伙伴为 Apache APISIX 添砖加瓦，是你们的无私付出，让 Apache APISIX 项目变得更好！

<!--truncate-->

## 导语

Apache APISIX 从开源第一天就以社区方式成长，迅速成为全世界最活跃的开源 API 网关项目。这些成就，离不开社区小伙伴们的共同奋斗。

“独行者速，众行者远”。Apache APISIX 社区周报希望可以帮助社区小伙伴们更好地掌握 Apache APISIX 社区的进展，方便大家参与到 Apache APISIX 社区中来。

我们还整理了一些适合新来社区的小伙伴们参加的 Issue！感兴趣的同学们，走过路过不要错过！

## 贡献者统计

![贡献者名单](https://static.apiseven.com/uploads/2023/02/01/AL9SEc50_%E7%A4%BE%E5%8C%BA%E5%8F%8C%E5%91%A8%E6%8A%A5-%E8%B4%A1%E7%8C%AE%E8%80%85%E6%B5%B7%E6%8A%A5-02%E5%91%A8.png)

![新晋贡献者](https://static.apiseven.com/uploads/2023/02/01/jQX92Uq2_%E7%A4%BE%E5%8C%BA%E5%8F%8C%E5%91%A8%E6%8A%A5-%E6%96%B0%E6%99%8B%E6%B5%B7%E6%8A%A5-02%E5%91%A8.png)

## Good First Issue

### Issue #8772

**链接**：https://github.com/apache/apisix/issues/8772

**问题描述**：对 OIDC 认证相关的自定义配置进行验证，以便用户对不合规配置限制其向后端访问。

### Issue #1075

**链接**：https://github.com/apache/apisix-ingress-controller/issues/1075

**问题描述**：为 APISIX Ingress 增加使用 apisix:dev 的回归测试，以便尽早发现与 APISIX 最新修改的兼容问题。

## 近期功能特性亮点

- [Stream 代理模式添加 Kubernetes 服务发现支持。](https://github.com/apache/apisix/pull/8640)（贡献者：[ronething](https://github.com/ronething)）

- [Stream 代理模式添加 consul_kv 服务发现支持。](https://github.com/apache/apisix/pull/8640)（贡献者：[ronething](https://github.com/ronething)）

Apache APISIX 的项目官网和 Github 上的 Issue 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 Issue 中搜索，也可以参与 Issue 上的讨论，提出自己的想法和实践经验。

## 近期博文推荐

- [API 网关策略的二三事](https://apisix.apache.org/zh/blog/2023/01/30/something-about-api-gateway-policy/)

    这篇文章介绍了什么是 API 网关策略，并针对认证授权、安全、流量处理与可观测性这四类 API 网关中常用的策略进行描述。

- [Apache APISIX 集成原生 Consul 的服务发现能力](https://apisix.apache.org/zh/blog/2023/01/18/consul-with-apisix/)

    Apache APISIX 支持原生 Consul 的服务发现能力。本文讲述了在 Apache APISIX 中实现服务发现和服务注册的全过程及 Consul 的相关原理。

- [马蜂窝如何利用 APISIX 网关实现微服务架构升级](https://apisix.apache.org/zh/blog/2023/01/15/mafengwo-with-apisix/)

    本文从马蜂窝的微服务架构平台蜂效迭代过程和应用 APISIX 后的产品实践角度，为大家呈现了基于 APISIX 的网关应用实例。

- [Apache APISIX Ingress 1.6 正式发布](https://apisix.apache.org/zh/blog/2023/01/10/release-apisix-ingress-1.6/)

    Apache APISIX Ingress 1.6 版本正式发布！此版本带来了 Gateway API 的支持，同时新增服务发现组件集成与代理外部服务，优化对 APISIX Ingress Controller 的使用体验。

- [2022 Apache APISIX 年度记忆](https://apisix.apache.org/zh/blog/2023/01/02/2022-summary/)

    本文将带您回顾 Apache APISIX 社区在 2022 年在各领域取得的成绩。

- [Apache APISIX 3.1.0 正式发布](https://apisix.apache.org/zh/blog/2022/12/30/release-apache-apisix-3.1.0/)

    Apache APISIX 3.1.0 版本正式发布！此版本带来很多关于安全层面的功能支持，同时新增内置调试插件，旨在优化对 APISIX 的使用体验。
