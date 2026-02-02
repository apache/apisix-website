---
title: "2026 社区月报 (01.01 - 01.31)"
keywords: ["Apache APISIX", "API 网关", "社区月报", "贡献者"]
description: Apache APISIX 社区的月报旨在帮助社区成员更全面地了解社区的最新动态，方便大家参与到 Apache APISIX 社区中来。
tags: [Community]
image: https://static.api7.ai/uploads/2026/01/30/ZkUprAVf_2026-jan-monthly-report-cover-cn.webp
---

> 最近，我们引入并更新了一些新功能，包括为限流插件支持 Redis Keepalive，以及支持 Google Vertex AI、Gemini、Anthropic 和 OpenRouter 等。有关更多细节，请阅读本期月报。

<!--truncate-->

## 导语

Apache APISIX 项目始终秉承着开源社区协作的精神，自问世起便崭露头角，如今已经成为全球最活跃的开源 API 网关项目之一。正如谚语所言，“众人拾柴火焰高”，这一辉煌成就，得益于整个社区伙伴的协同努力。

从 2026.01.01 至 2026.01.31，有 13 名开发者提交了 48 个 commits，为 Apache APISIX 做出了重要贡献。感谢这些伙伴们对 Apache APISIX 的无私支持！正是因为你们的付出，才能让 Apache APISIX 项目不断改进、提升和壮大。

## 贡献者统计

![贡献者名单](https://static.api7.ai/uploads/2026/01/30/Qtvol0me_2026-jan-contributor-list.webp)

![新晋贡献者](https://static.api7.ai/uploads/2026/01/30/knUmnrVN_2026-jan-new-contributors.webp)

### Issue #12932

**链接**：https://github.com/apache/apisix/issues/12932

**问题描述**：APISIX 以 Standalone 模式运行时，在 `apisix.yaml` 文件中设置环境变量，如果变量值是数字，则会被自动转换为数字。对于非常大的数字（超过 Lua 双精度浮点数可精确表示的范围），会出现精度丢失。例如，原本想作为字符串的数字 `356002209726529540` 被解析后变为 `3.5600220972653e+17`，导致实际值不正确。即使变量值使用双引号，也不会被当作字符串处理。

**预期结果**：在 `apisix.yaml` 中以 `${{VAR}}` 形式传入的值应始终被视为字符串，保留原始值，即使它看起来像数字。

## 近期亮点功能

### 1. 为限流插件支持 Redis Keepalive

相关 PR：https://github.com/apache/apisix/pull/12861

贡献者：[ChuanFF](https://github.com/ChuanFF)

此 PR 为 `limit-count`、`limit-conn` 和 `limit-req` 插件添加了 Redis 连接 Keepalive 配置支持，提升了连接复用和性能。同时，通过将 `connect_timeout` 和 `send_timeout` 与 `redis_timeout` 配置对齐，改进了 redis-cluster 策略中的超时处理，确保超时行为一致。

### 2. 新增 Request ID 插件对 `apisix_request_id` 变量的支持

相关 PR：https://github.com/apache/apisix/pull/12931

贡献者：[shreemaan-abhishek](https://github.com/shreemaan-abhishek)

新增对 `apisix_request_id` 变量的支持，并在启用 `request-id` 插件后将生成的 `request_id` 记录到错误日志中，帮助用户快速定位和排查请求相关问题。

### 3. 新增对 Vertex AI 的支持

相关 PR：https://github.com/apache/apisix/pull/12933

贡献者：[SkyeYoung](https://github.com/SkyeYoung)

基于 [#12565](https://github.com/apache/apisix/pull/12565) 的相关实现，新增对 Google Vertex AI 的支持，让用户可以通过 APISIX 将请求转发至 Vertex AI 服务。

### 4. 新增对 Gemini OpenAI API 的支持

相关 PR：https://github.com/apache/apisix/pull/12883

贡献者：[SkyeYoung](https://github.com/SkyeYoung)

基于 [#12565](https://github.com/apache/apisix/pull/12565) 的相关实现，新增对 Gemini OpenAI API 的支持，让用户可以通过 APISIX 将请求转发至 Gemini 服务。

### 5. 新增对 Anthropic OpenAI API 的支持

相关 PR：https://github.com/apache/apisix/pull/12881

贡献者：[SkyeYoung](https://github.com/SkyeYoung)

基于 [#12565](https://github.com/apache/apisix/pull/12565) 的相关实现，新增对 Anthropic OpenAI API 的支持，让用户可以通过 APISIX 将请求转发至 Anthropic 服务。

### 6. 新增对 OpenRouter 的支持

相关 PR：https://github.com/apache/apisix/pull/12878

贡献者：[SkyeYoung](https://github.com/SkyeYoung)

基于 [#12565](https://github.com/apache/apisix/pull/12565) 的相关实现，新增对 OpenRouter 的支持，让用户可以通过 APISIX 将请求转发至 OpenRouter 服务。

### 7. 认证插件支持在 `WWW-Authenticate` 响应头中自定义 Realm

相关 PR：https://github.com/apache/apisix/pull/12864

贡献者：[shreemaan-abhishek](https://github.com/shreemaan-abhishek)

为以下认证插件新增了 `realm` 配置选项：`basic-auth`、`key-auth`、`hmac-auth`、`jwt-auth` 和 `ldap-auth`。 用户可通过该配置，在认证失败返回 `401 Unauthorized` 时自定义 `WWW-Authenticate` 响应头中的 realm 值。该改动符合 HTTP 认证协议（RFC 7235），帮助客户端识别请求资源所属的“保护区域”，并确定使用哪组凭据重新发起请求。

### 8. 在 `grpc-web` 插件中允许非前缀匹配路由

相关 PR：https://github.com/apache/apisix/pull/12830

贡献者：[shreemaan-abhishek](https://github.com/shreemaan-abhishek)

APISIX 仅允许在 URI 前缀匹配的路由上使用 `grpc-web`，限制了客户端使用完整路由路径的场景。本 PR 移除了该限制，使 `grpc-web` 可在完全匹配路径的路由上使用，提高了兼容性和灵活性。

## 结语

Apache APISIX 的项目[官网](https://apisix.apache.org/zh/)和 Github 上的 [Issues](https://github.com/apache/apisix/issues) 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 Issues 中搜索，也可以参与 Issues 上的讨论，提出自己的想法和实践经验。
