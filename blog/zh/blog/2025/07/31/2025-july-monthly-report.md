---
title: "2025 社区月报 (07.01 - 07.31)"
keywords: ["Apache APISIX", "API 网关", "社区月报", "贡献者"]
description: Apache APISIX 社区的月报旨在帮助社区成员更全面地了解社区的最新动态，方便大家参与到 Apache APISIX 社区中来。
tags: [Community]
image: https://static.api7.ai/uploads/2025/07/31/pjYuOSbt_2025-july-monthly-report-cover-cn.webp
---

> 最近，我们新增并优化了一些功能，如在 AI 插件中新增 AI/ML API 为 Provider、完善 Datadog 插件指标、OIDC 认证中支持自定义 Claim 校验等。有关更多细节，请阅读本期月报。

<!--truncate-->

## 导语

Apache APISIX 项目始终秉承着开源社区协作的精神，自问世起便崭露头角，如今已经成为全球最活跃的开源 API 网关项目之一。正如谚语所言，“众人拾柴火焰高”，这一辉煌成就，得益于整个社区伙伴的协同努力。

从 2025.07.01 至 2025.07.31，有 20 名开发者提交了 96 个 commits，为 Apache APISIX 做出了重要贡献。感谢这些伙伴们对 Apache APISIX 的无私支持！正是因为你们的付出，才能让 Apache APISIX 项目不断改进、提升和壮大。

## 贡献者统计

![贡献者名单](https://static.api7.ai/uploads/2025/07/31/QnqX7l1o_2025-july-contributor-list.webp)

![新晋贡献者](https://static.api7.ai/uploads/2025/07/31/7dQAgNIT_2025-july-new-contributors.webp)

## 近期亮点功能

### 1. 完善 Datadog 插件指标

相关 PR：https://github.com/apache/apisix/pull/11943

贡献者：[deiwin](https://github.com/deiwin)

Datadog 插件之前未涵盖限流限速响应计数、服务不可达时的网关错误以及网关与服务之间的网络延迟等关键指标。此 PR 通过提供更全面和兼容的指标解决了这些局限性，同时确保了向后兼容性和成本效益。

### 2. 解耦 Prometheus Exporter 的计算与输出

相关 PR：https://github.com/apache/apisix/pull/12383

贡献者：[SkyeYoung](https://github.com/SkyeYoung)

此 PR 针对 Apache APISIX Prometheus Exporter 功能的增强，实现了指标计算与输出的分离。计算过程现在在特权代理进程中定期（默认每 15 秒）运行，数据存储在共享字典中；`/apisix/prometheus/metrics` API 移至工作进程中，它仅读取并返回共享字典中的缓存数据。

### 3. OIDC 认证中支持自定义 Claim 校验

相关 PR：https://github.com/apache/apisix/pull/11824

贡献者：[beardnick](https://github.com/beardnick)

支持在 OpenID Connect 认证中对自定义 Claim 进行校验。用户可通过 `claim_validators` 配置某个 Claim 的合法取值，若未匹配成功，则返回 `401` 拒绝访问，从而实现对后端服务的精细化访问控制。

### 4. `forward-auth` 插件新增 `extra_headers` 支持

相关 PR：https://github.com/apache/apisix/pull/12405

贡献者：[Revolyssup](https://github.com/Revolyssup)

此 PR 用于修复 [#11200](https://github.com/apache/apisix/issues/11200)，是 [#12404](https://github.com/apache/apisix/pull/12404) 的进一步完善。在 `forward-auth` 插件中新增 `extra_headers` 配置项，支持将请求体中的指定字段提取为请求头并转发至认证服务。

### 5. 新增全局开关一键禁用上游健康检查功能

相关 PR：https://github.com/apache/apisix/pull/12407

贡献者：[Revolyssup](https://github.com/Revolyssup)

此 PR 新增全局配置字段 `apisix.disable_upstream_healthcheck`，可一键禁用所有上游健康检查。在生产服务不可用的紧急情况下，用户可迅速启动 APISIX 服务，加快恢复速度，简化故障排查流程。

### 6. 单条日志支持多个 `json.delay_encode` 对象

相关 PR：https://github.com/apache/apisix/pull/12395

贡献者：[Revolyssup](https://github.com/Revolyssup)

支持在单条日志中添加最多 16 个唯一的 `json.delay_encode` 对象，提升 Apache APISIX 的结构化日志记录能力。

### 7. AI 插件中新增 AI/ML API 为 Provider

相关 PR：https://github.com/apache/apisix/pull/12379

贡献者：[D1m7asis](https://github.com/D1m7asis)

此 PR 为 Apache APISIX 的 `ai-proxy`、`ai-proxy-multi` 和 `ai-request-rewrite` 插件新增 AI/ML API 为 Provider。AI/ML API 提供兼容 OpenAI 的 API，接入超 300 个大模型，无需自定义驱动或进行任何覆盖配置，即可轻松实现请求路由与代理。

### 8. 支持基于请求体的 `ctx.var.post_arg` 路由匹配

相关 PR：https://github.com/apache/apisix/pull/12296

贡献者：[Revolyssup](https://github.com/Revolyssup)

此 PR 支持在路由匹配中使用 `ctx.var.post_arg`，可从请求体中提取参数进行匹配，支持 JSON、multipart 和 URL-encoded 三种格式。

## 结语

Apache APISIX 的项目[官网](https://apisix.apache.org/zh/)和 Github 上的 [Issues](https://github.com/apache/apisix/issues) 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 Issues 中搜索，也可以参与 Issues 上的讨论，提出自己的想法和实践经验。
