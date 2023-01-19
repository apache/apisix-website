---
title: "社区双周报 (1.2 - 1.15)"
keywords: 
- Apache APISIX
- API 网关
- 社区周报
- 贡献者
description: “独行者速，众行者远”。Apache APISIX 社区周报希望可以帮助社区小伙伴们更好地掌握 Apache APISIX 社区的进展，方便大家参与到 Apache APISIX 社区中来。
tags: [Community]
image: https://static.apiseven.com/uploads/2023/01/19/l4EyvNRI_%E7%A4%BE%E5%8C%BA%E5%8F%8C%E5%91%A8%E6%8A%A5-%E5%A4%B4%E5%9B%BE-01%E5%91%A8.png
---

> 从 2023.1.2 - 2023.1.15，有 19 位开发者为 Apache APISIX 提交了 33 个 commit。感谢这些小伙伴为 Apache APISIX 添砖加瓦，是你们的无私付出，让 Apache APISIX 项目变得更好！

<!--truncate-->

## 导语

Apache APISIX 从开源第一天就以社区方式成长，迅速成为全世界最活跃的开源 API 网关项目。这些成就，离不开社区小伙伴们的共同奋斗。

“独行者速，众行者远”。Apache APISIX 社区周报希望可以帮助社区小伙伴们更好地掌握 Apache APISIX 社区的进展，方便大家参与到 Apache APISIX 社区中来。

**值得一提的是，新晋贡献者来自多个国家（波兰、巴基斯坦、挪威、越南），APISIX 正在被世界各地有趣的开发者们关注并参与贡献。**

## 贡献者统计

![贡献者名单](https://static.apiseven.com/uploads/2023/01/19/ttc04wzr_%E7%A4%BE%E5%8C%BA%E5%8F%8C%E5%91%A8%E6%8A%A5-%E8%B4%A1%E7%8C%AE%E8%80%85%E6%B5%B7%E6%8A%A5-01%E5%91%A8.png)

![新晋贡献者](https://static.apiseven.com/uploads/2023/01/19/m0C82lr9_%E7%A4%BE%E5%8C%BA%E5%8F%8C%E5%91%A8%E6%8A%A5-%E6%96%B0%E6%99%8B%E6%B5%B7%E6%8A%A5-01%E5%91%A8.png)

## 近期功能特性亮点

- [`limit-count` 插件添加 Redis 集群 TLS/SSL 连接模式支持。](https://github.com/apache/apisix/pull/8558)（贡献者：[ronething](https://github.com/ronething)）

- [`limit-count` 插件添加 `X-RateLimit-Reset` 支持。](https://github.com/apache/apisix/pull/8578)（贡献者：[mscb402](https://github.com/mscb402)）

- [Logger 类插件支持定制化日志格式。](https://github.com/apache/apisix/pull/8583)（贡献者：[spacewander](https://github.com/spacewander)）

- [Stream 代理模式添加 Eureka 服务发现支持。](https://github.com/apache/apisix/pull/8583)（贡献者：[ronething](https://github.com/ronething)）

- [Stream 代理模式添加 DNS 服务发现支持。](https://github.com/apache/apisix/pull/8593)（贡献者：[ronething](https://github.com/ronething)）

- [Stream 代理模式添加 Nacos 服务发现支持。](https://github.com/apache/apisix/pull/8584)（贡献者：[ronething](https://github.com/ronething)）

Apache APISIX 的项目官网和 Github 上的 Issue 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 Issue 中搜索，也可以参与 Issue 上的讨论，提出自己的想法和实践经验。

## 近期博文推荐

- [马蜂窝如何利用 APISIX 网关实现微服务架构升级](https://apisix.apache.org/zh/blog/2023/01/15/mafengwo-with-apisix/)

    本文从马蜂窝的微服务架构平台蜂效迭代过程和应用 APISIX 后的产品实践角度，为大家呈现了基于 APISIX 的网关应用实例。

- [Apache APISIX Ingress 1.6 正式发布](https://apisix.apache.org/zh/blog/2023/01/10/release-apisix-ingress-1.6/)

    Apache APISIX Ingress 1.6 版本正式发布！此版本带来了 Gateway API 的支持，同时新增服务发现组件集成与代理外部服务，优化对 APISIX Ingress Controller 的使用体验。

- [2022 Apache APISIX 年度记忆](https://apisix.apache.org/zh/blog/2023/01/02/2022-summary/)

    本文将带您回顾 Apache APISIX 社区在 2022 年在各领域取得的成绩。

- [Apache APISIX 3.1.0 正式发布](https://apisix.apache.org/zh/blog/2022/12/30/release-apache-apisix-3.1.0/)

    Apache APISIX 3.1.0 版本正式发布！此版本带来很多关于安全层面的功能支持，同时新增内置调试插件，旨在优化对 APISIX 的使用体验。
