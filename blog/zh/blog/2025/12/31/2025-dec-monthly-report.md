---
title: "2025 社区月报 (12.01 - 12.31)"
keywords: ["Apache APISIX", "API 网关", "社区月报", "贡献者"]
description: Apache APISIX 社区的月报旨在帮助社区成员更全面地了解社区的最新动态，方便大家参与到 Apache APISIX 社区中来。
tags: [Community]
image: https://static.api7.ai/uploads/2025/12/31/lZRW4BcF_2025-dec-monthly-report-cover-cn.webp
---

> 最近，我们新增并优化了一些功能，如为日志插件添加嵌套日志格式支持，为 Stream Routes 添加协议验证与删除保护等。有关更多细节，请阅读本期月报。

<!--truncate-->

## 导语

Apache APISIX 项目始终秉承着开源社区协作的精神，自问世起便崭露头角，如今已经成为全球最活跃的开源 API 网关项目之一。正如谚语所言，“众人拾柴火焰高”，这一辉煌成就，得益于整个社区伙伴的协同努力。

从 2025.12.01 至 2025.12.31，有 18 名开发者提交了 45 个 commits，为 Apache APISIX 做出了重要贡献。感谢这些伙伴们对 Apache APISIX 的无私支持！正是因为你们的付出，才能让 Apache APISIX 项目不断改进、提升和壮大。

## 贡献者统计

![贡献者名单](https://static.api7.ai/uploads/2025/12/31/JYHrOHwr_2025-dec-contributor-list.webp)

![新晋贡献者](https://static.api7.ai/uploads/2025/12/31/BoMJKqrs_2025-dec-new-contributors.webp)

## 近期亮点功能

### 1. 为 `file-logger` 插件元数据添加全局默认 `path` 配置

相关 PR：https://github.com/apache/apisix/pull/12825

贡献者：[TaeyeongKwak](https://github.com/TaeyeongKwak)

本 PR 为 `file-logger` 插件的元数据新增了 `path` 属性。通过 `plugin_metadata`，用户可以全局配置一个默认的日志文件路径。当单个 `file-logger` 插件实例未在其配置中明确定义自身路径时，将自动使用该全局默认路径。

### 2. 为日志插件添加嵌套日志格式支持

相关 PR：https://github.com/apache/apisix/pull/12679

贡献者：[TaeyeongKwak](https://github.com/TaeyeongKwak)

此 PR 为日志插件的 `log_format` 配置新增了对嵌套（层级式）数据结构的支持。此前，日志格式仅支持扁平的键值对结构；现在，用户可以通过定义层级式或可重叠的日志结构，更有效地组织和分组日志字段，从而获得更清晰、更具结构化的日志输出。

### 3. 为 Stream Routes 添加协议验证与删除保护

相关 PR：https://github.com/apache/apisix/pull/12794

贡献者：[yixianOu](https://github.com/yixianOu)

本 PR 为 Stream Routes 引入了依赖验证与删除保护功能。

- 现在，当创建引用 `superior_id` 的下级路由时，系统会验证所引用的上级路由是否存在，并确保它们的协议一致。
- 实现了一个删除检查器，防止任何当前被其他路由引用为 `superior_id` 的 stream route 被删除。
- 新增了测试文件 `t/admin/stream-routes-subordinate.t`，涵盖了路由创建、协议不匹配以及删除保护等场景。

## 结语

Apache APISIX 的项目[官网](https://apisix.apache.org/zh/)和 Github 上的 [Issues](https://github.com/apache/apisix/issues) 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 Issues 中搜索，也可以参与 Issues 上的讨论，提出自己的想法和实践经验。

## 近期博客推荐

- [Apache APISIX Ingress Controller 2.0 正式发布](https://apisix.apache.org/zh/blog/2025/12/19/apisix-ingress-controller-2-0-release/)

  Apache APISIX Ingress Controller 2.0 正式发布，带来全面的 Gateway API 支持、灵活的多数据面部署模式以及无需 etcd 的轻量级运维，以实现更稳健、可扩展的 Kubernetes 流量管理。

我们很高兴地宣布 Apache APISIX 3.14.1 版本已经发布。该版本带来一则修复以改善用户体验。
