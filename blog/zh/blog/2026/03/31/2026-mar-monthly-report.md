---
title: "2026 社区月报 (03.01 - 03.31)"
keywords: ["Apache APISIX", "API 网关", "社区月报", "贡献者"]
description: Apache APISIX 社区的月报旨在帮助社区成员更全面地了解社区的最新动态，方便大家参与到 Apache APISIX 社区中来。
tags: [Community]
image: https://static.api7.ai/uploads/2026/04/09/U5gntpTT_2026-03-monthly-report-cover-cn.webp
---

> 最近，我们引入并更新了一些新功能，包括在 Standalone 模式下拒绝配置未知插件、为日志插件添加 `max_body_bytes` 和 `resp_body_bytes` 属性，以及在 `clickhouse-logger` 插件中支持使用密钥管理等。有关更多细节，请阅读本期月报。

<!--truncate-->

## 导语

Apache APISIX 项目始终秉承着开源社区协作的精神，自问世起便崭露头角，如今已经成为全球最活跃的开源 API 网关项目之一。正如谚语所言，"众人拾柴火焰高"，这一辉煌成就，得益于整个社区伙伴的协同努力。

从 2026.03.01 至 2026.03.31，有 14 名开发者提交了 32 个 commits，为 Apache APISIX 做出了重要贡献。感谢这些伙伴们对 Apache APISIX 的无私支持！正是因为你们的付出，才能让 Apache APISIX 项目不断改进、提升和壮大。

## 贡献者统计

![贡献者名单](https://static.api7.ai/uploads/2026/04/09/OMqEYzVH_2026-march-contributor-list.webp)

![新晋贡献者](https://static.api7.ai/uploads/2026/04/09/RUAKNAsx_2026-03-contributors.webp)

## Good First Issue

### Issue #13108

**链接**：https://github.com/apache/apisix/issues/13108

**问题描述**：`config.yaml.example` 文件中缺少部分 AI 插件（`ai-request-rewrite` 和 `ai-aliyun-content-moderation`），且 AI 插件部分的优先级排序不正确。例如，`ai-prompt-guard`（优先级 1072）被排在了 `ai-prompt-template`（优先级 1071）之后，不符合预期的降序排列。

**预期结果**：所有在 `apisix/cli/config.lua` 中注册的 AI 插件都应列入 `config.yaml.example`，并按优先级降序排列。

## 近期亮点功能

### 1. 在 Standalone 模式下拒绝配置未知插件

相关 PR：https://github.com/apache/apisix/pull/13046

贡献者：[shreemaan-abhishek](https://github.com/shreemaan-abhishek)

本 PR 为 APISIX 的 Standalone 模式新增校验逻辑，当配置中引用了未知或未注册的插件时将直接拒绝该配置。此前在 `apisix.yaml` 中配置未知插件不会触发任何错误，可能导致静默的配置错误。现在 APISIX 会明确拒绝此类配置，帮助用户尽早发现插件名拼写错误或配置异常。

### 2. 为日志插件添加 `max_body_bytes` 和 `resp_body_bytes` 属性

相关 PR：https://github.com/apache/apisix/pull/13034

贡献者：[janiussyafiq](https://github.com/janiussyafiq)

本 PR 将 `max_body_bytes` 和 `resp_body_bytes` 属性同步至多个日志插件，包括 `http-logger`、`skywalking-logger`、`tcp-logger`、`rocketmq-logger`、`udp-logger`、`clickhouse-logger`、`syslog`、`sls-logger`、`file-logger`、`loggly`、`elasticsearch-logger`、`tencent-cloud-cls` 和 `loki-logger`。这些属性允许用户控制日志中捕获的请求和响应体的最大大小，提升了所有日志插件的配置一致性。

### 3. `clickhouse-logger` 插件支持使用密钥管理

相关 PR：https://github.com/apache/apisix/pull/12951

贡献者：[vlad-vinogradov-47](https://github.com/vlad-vinogradov-47)

本 PR 为 `clickhouse-logger` 插件新增密钥管理支持，允许用户将敏感的凭证信息（如用户名和密码）存储在环境变量或 HashiCorp Vault 中，而无需在插件配置中硬编码。这一改进增强了安全性，避免凭证信息暴露在配置文件中。

## 结语

Apache APISIX 的项目[官网](https://apisix.apache.org/zh/)和 Github 上的 [Issues](https://github.com/apache/apisix/issues) 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 Issues 中搜索，也可以参与 Issues 上的讨论，提出自己的想法和实践经验。
