---
title: "2025 社区月报 (10.01 - 10.31)"
keywords: ["Apache APISIX", "API 网关", "社区月报", "贡献者"]
description: Apache APISIX 社区的月报旨在帮助社区成员更全面地了解社区的最新动态，方便大家参与到 Apache APISIX 社区中来。
tags: [Community]
image: https://static.api7.ai/uploads/2025/10/31/8W29SZKg_202510-monthly-report-cover-cn.webp
---

> 最近，我们新增并优化了一些功能，如为所有日志插件添加 `max_pending_entries` 限制积压日志数量，为 `kafka-logger` 插件新增 SCRAM 认证支持等。有关更多细节，请阅读本期月报。

<!--truncate-->

## 导语

Apache APISIX 项目始终秉承着开源社区协作的精神，自问世起便崭露头角，如今已经成为全球最活跃的开源 API 网关项目之一。正如谚语所言，“众人拾柴火焰高”，这一辉煌成就，得益于整个社区伙伴的协同努力。

从 2025.10.01 至 2025.10.31，有 9 名开发者提交了 73 个 commits，为 Apache APISIX 做出了重要贡献。感谢这些伙伴们对 Apache APISIX 的无私支持！正是因为你们的付出，才能让 Apache APISIX 项目不断改进、提升和壮大。

## 贡献者统计

![贡献者名单](https://static.api7.ai/uploads/2025/10/31/SOcjK3wK_2025-oct-contributors.webp)

![新晋贡献者](https://static.api7.ai/uploads/2025/10/31/V7U7v4Z5_2025-oct-new-contributor.webp)

## 近期亮点功能

### 1. 为所有日志插件添加 max_pending_entries 限制积压日志数量

相关 PR：https://github.com/apache/apisix/pull/12709

贡献者：[Revolyssup](https://github.com/Revolyssup)

当外部日志服务（如 Kafka）响应缓慢或不可用时，未发送的日志条目会不受控制地堆积，引发内存使用量激增。本 PR 将 `kafka-logger` 插件中已有的 `max_pending_entries` 配置同步到其他日志插件。该配置可限制积压日志的数量，达到上限后，新的日志会被丢弃，以此保证系统的稳定性。

### 2. 放宽路由资源名称的长度限制

相关 PR：https://github.com/apache/apisix/pull/11822

贡献者：[csotiriou](https://github.com/csotiriou)

本 PR 提升了路由名称的最大允许长度，新限制是原默认值的三倍。此项变更很有必要，因为在 APISIX Ingress Controller 中，路由名称由 Kubernetes 命名空间及其他标识符自动拼接生成，其长度很容易超出原先的限制。

### 3. 为 `kafka-logger` 插件新增 SCRAM 认证支持

相关 PR：https://github.com/apache/apisix/pull/12693

贡献者：[Revolyssup](https://github.com/Revolyssup)

本 PR 为 `kafka-logger` 插件新增了 SCRAM 认证支持，提升了连接安全性。此前该插件仅支持 PLAIN 认证模式，而底层客户端库已具备 SCRAM 认证能力。本次修改弥补了这一差距，为连接 Kafka 集群提供了更安全的认证方式。

### 4. 重构密钥管理，采用基于 URI 的缓存机制

相关 PR：https://github.com/apache/apisix/pull/12682

贡献者：[Revolyssup](https://github.com/Revolyssup)

本 PR 重构 `apisix/secret.lua` 改用密钥 URI 作为缓存键，替代原有的完整配置对象，有效避免多个配置引用同一密钥时的重复存储问题。同时为成功获取和失败获取的密钥分别建立缓存实例，支持对两类缓存进行独立的配置和管理。另外 `fetch_secrets()` API 已经进行了简化，移除了冗余参数，实现了密钥在内部的自动解析。

### 5. 在 SSL 配置中支持通配符 SNI 匹配

相关 PR：https://github.com/apache/apisix/pull/12668

贡献者：[Revolyssup](https://github.com/Revolyssup)

本 PR 为 APISIX 增强了 SSL SNI 的匹配能力，新增了对全通配符 (`*`) 的支持。此前，APISIX 仅支持精确域名匹配（如 `abc.test.com`）和部分通配符（如 `.test.com`），但缺少对全局通配符的支持。此项改进确保了与 Gateway API 中 HTTPSListener 规范的兼容性，满足了该规范在处理带通配符服务器名称指示的 SSL 连接时的核心一致性测试要求。

## 结语

Apache APISIX 的项目[官网](https://apisix.apache.org/zh/)和 Github 上的 [Issues](https://github.com/apache/apisix/issues) 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 Issues 中搜索，也可以参与 Issues 上的讨论，提出自己的想法和实践经验。

## 近期博客推荐

- [Apache APISIX 3.14.0 正式发布](https://apisix.apache.org/zh/blog/2025/10/10/release-apache-apisix-3.14.0/)

  此版本引入了多项新功能，包括用于日志记录的新 AI 插件变量、AI 插件中对 AI/ML API 提供程序的支持、基于请求正文的路由匹配、request-id 插件中对 KSUID 算法的支持等等。

- [Apache APISIX 3.14.1 正式发布](https://apisix.apache.org/zh/blog/2025/10/17/release-apache-apisix-3.14.1/)

  我们很高兴地宣布 Apache APISIX 3.14.1 版本已经发布。该版本带来一则修复以改善用户体验。
