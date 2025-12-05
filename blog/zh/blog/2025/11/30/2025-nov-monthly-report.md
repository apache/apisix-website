---
title: "2025 社区月报 (11.01 - 11.30)"
keywords: ["Apache APISIX", "API 网关", "社区月报", "贡献者"]
description: Apache APISIX 社区的月报旨在帮助社区成员更全面地了解社区的最新动态，方便大家参与到 Apache APISIX 社区中来。
tags: [Community]
image: https://static.api7.ai/uploads/2025/12/05/xPuUiOxS_2025-nov-monthly-report-cover-cn.webp
---

> 最近，我们新增了一项功能，即为 standalone 模式新增 Validate API。有关更多细节，请阅读本期月报。

<!--truncate-->

## 导语

Apache APISIX 项目始终秉承着开源社区协作的精神，自问世起便崭露头角，如今已经成为全球最活跃的开源 API 网关项目之一。正如谚语所言，“众人拾柴火焰高”，这一辉煌成就，得益于整个社区伙伴的协同努力。

从 2025.11.01 至 2025.11.30，有 15 名开发者提交了 41 个 commits，为 Apache APISIX 做出了重要贡献。感谢这些伙伴们对 Apache APISIX 的无私支持！正是因为你们的付出，才能让 Apache APISIX 项目不断改进、提升和壮大。

## 贡献者统计

![贡献者名单](https://static.api7.ai/uploads/2025/12/05/SWnnfZpg_2025-nov--contributor-list.webp)

![新晋贡献者](https://static.api7.ai/uploads/2025/12/05/ksDzwGaH_2025-nov-new-contributors.webp)

## 近期亮点功能

### 为 standalone 模式新增 Validate API

相关 PR：https://github.com/apache/apisix/pull/12718

贡献者：[Revolyssup](https://github.com/Revolyssup)

本 PR 为独立模式引入了 Validate API。Validate API 仅验证配置输入，但不会将配置保存到内存中。这让 APISIX Ingress Controller 可以在应用配置前验证从 CRD 转换而来的插件配置，从而防止运行时故障。

## 结语

Apache APISIX 的项目[官网](https://apisix.apache.org/zh/)和 Github 上的 [Issues](https://github.com/apache/apisix/issues) 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 Issues 中搜索，也可以参与 Issues 上的讨论，提出自己的想法和实践经验。

## 近期博客推荐

- [Apache APISIX 3.14.0 正式发布](https://apisix.apache.org/zh/blog/2025/10/10/release-apache-apisix-3.14.0/)

  此版本引入了多项新功能，包括用于日志记录的新 AI 插件变量、AI 插件中对 AI/ML API 提供程序的支持、基于请求正文的路由匹配、request-id 插件中对 KSUID 算法的支持等等。

- [Apache APISIX 3.14.1 正式发布](https://apisix.apache.org/zh/blog/2025/10/17/release-apache-apisix-3.14.1/)

  我们很高兴地宣布 Apache APISIX 3.14.1 版本已经发布。该版本带来一则修复以改善用户体验。
