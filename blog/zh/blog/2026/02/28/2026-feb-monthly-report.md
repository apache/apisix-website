---
title: "2026 社区月报 (02.01 - 02.28)"
keywords: ["Apache APISIX", "API 网关", "社区月报", "贡献者"]
description: Apache APISIX 社区的月报旨在帮助社区成员更全面地了解社区的最新动态，方便大家参与到 Apache APISIX 社区中来。
tags: [Community]
image: https://static.api7.ai/uploads/2026/02/28/EDuu5wUR_2026-feb-monthly-report-cover-cn.webp
---

> 最近，我们引入并更新了一些功能，包括为支持通过 Control API 获取 Stream 健康检查数据、`elasticsearch-logger` 插件支持通过请求头进行认证、在 `limit-conn` 和 `ai-rate-limiting` 插件中支持 `rules` 配置等。有关更多细节，请阅读本期月报。

<!--truncate-->

## 导语

Apache APISIX 项目始终秉承着开源社区协作的精神，自问世起便崭露头角，如今已经成为全球最活跃的开源 API 网关项目之一。正如谚语所言，“众人拾柴火焰高”，这一辉煌成就，得益于整个社区伙伴的协同努力。

从 2026.02.01 至 2026.02.28，有 11 名开发者提交了 45 个 commits，为 Apache APISIX 做出了重要贡献。感谢这些伙伴们对 Apache APISIX 的无私支持！正是因为你们的付出，才能让 Apache APISIX 项目不断改进、提升和壮大。

## 贡献者统计

![贡献者名单](https://static.api7.ai/uploads/2026/02/28/iQbt1dLQ_2026-feb-contributor-list.webp)

![新晋贡献者](https://static.api7.ai/uploads/2026/02/28/aetNLUjx_2026-feb-new-contributors.webp)

## Good First Issue

### Issue #13043

**链接**：https://github.com/apache/apisix/issues/13043

**问题描述**：修复 `limit-count`、`limit-req` 和 `limit-conn` 插件中文文档中的参数名称错误。

## 近期亮点功能

### 1. 将云日志服务的 scheme 配置化，默认设置为 `https`

相关 PR：https://github.com/apache/apisix/pull/13009

贡献者：[shreemaan-abhishek](https://github.com/shreemaan-abhishek)

本 PR 将访问 CLS（云日志服务）的 scheme 改为可配置项，解决此前默认使用 `http` 的安全隐患，并将默认 scheme 调整为 `https` 以提升数据传输安全性。

### 2. 在 `limit-count` 插件中，当父节点无效时抛出 panic 错误

相关 PR：https://github.com/apache/apisix/pull/13030

贡献者：[janiussyafiq](https://github.com/janiussyafiq)

本 PR 对 `limit-count` 插件进行重构，当检测到无效的父节点时直接抛出 panic 错误，避免错误状态继续传播。

### 3. 支持通过 Control API 获取 Stream 健康检查数据

相关 PR：https://github.com/apache/apisix/pull/12996

贡献者：[shreemaan-abhishek](https://github.com/shreemaan-abhishek)

本 PR 修复了 Stream 模式下的上游健康检查状态无法通过 Control API 获取的问题。此前 `/v1/healthcheck` 接口仅返回 HTTP 上游的健康检查状态，导致 Stream 路由的健康检查数据无法显示。现在该接口已扩展支持返回 Stream 上游的健康检查信息，确保所有健康检查状态都能被完整展示。

### 4. 在 `limit-count` 插件的规则中支持配置 `header` 前缀

相关 PR：https://github.com/apache/apisix/pull/13004

贡献者：[shreemaan-abhishek](https://github.com/shreemaan-abhishek)

本 PR 为 `limit-count` 插件新增 `header` 前缀配置能力，用于在多条规则同时触发时区分不同限流状态的响应头。用户可通过配置 `header_prefix` 自定义前缀，默认值为当前执行规则的索引值，从而实现多条限流规则的响应头隔离，避免状态信息混淆。

### 5. `elasticsearch-logger` 插件支持通过请求头进行认证

相关 PR：https://github.com/apache/apisix/pull/12994

贡献者：[shreemaan-abhishek](https://github.com/shreemaan-abhishek)

本 PR 为 `elasticsearch-logger` 插件新增基于请求头的认证支持，允许使用 API Key 等令牌机制替代基础认证。

### 6. 在 `limit-conn` 和 `ai-rate-limiting` 插件中支持 `rules` 配置

相关 PR：https://github.com/apache/apisix/pull/13000

贡献者：[shreemaan-abhishek](https://github.com/shreemaan-abhishek)

本 PR 为 `limit-conn` 和 `ai-rate-limiting` 插件新增 `rules` 配置支持，允许通过多条规则灵活配置限流策略，与 limit-count 插件的规则机制保持一致。

### 7. 在 Eureka 服务发现中支持域名格式的节点

相关 PR：https://github.com/apache/apisix/pull/12993

贡献者：[shreemaan-abhishek](https://github.com/shreemaan-abhishek)

本 PR 修复了 Eureka 服务发现中域名格式节点无法访问的问题。此前当 Eureka 注册的地址为域名而非 IP 时，APISIX 会报错 "no host allowed while connecting to upstream"，现已支持正确解析域名并转发请求。

### 8. 在 `openid-connect` 插件支持使用 Redis 存储会话

相关 PR：https://github.com/apache/apisix/pull/12986

贡献者：[shreemaan-abhishek](https://github.com/shreemaan-abhishek)

本 PR 为 `openid-connect` 插件新增 Redis 会话存储支持。在多路由共享认证状态的场景中（如同时保护前端 SPA 和后端 API），使用 Redis 存储会话可实现跨路由的令牌刷新和会话共享，解决此前因会话隔离导致的刷新失败或登录循环问题。

### 9. `limit-count` 插件支持配置多条规则

相关 PR：https://github.com/apache/apisix/pull/12977

贡献者：[shreemaan-abhishek](https://github.com/shreemaan-abhishek)

本 PR 为 `limit-count` 插件新增多规则配置支持。在 PR #12967 实现变量动态构建限流规则的基础上，现允许配置多条限流规则，以实现更复杂的限流策略。

### 10. 为 `opentelemetry` 插件添加更多 span

相关 PR：https://github.com/apache/apisix/pull/12686

贡献者：[nic-6443](https://github.com/nic-6443)

本 PR 为 `opentelemetry` 插件增强分布式追踪能力，在请求生命周期的关键阶段（SSL/SNI 解析、访问、请求/响应头过滤、请求体过滤、上游连接、日志记录）新增 span 采集，并优化 span 传播、上下文管理和单请求生命周期管理，提供更完善的可观测性支持。

### 11. `jwt-auth` 插件支持更多算法

相关 PR：https://github.com/apache/apisix/pull/12944

贡献者：[shreemaan-abhishek](https://github.com/shreemaan-abhishek)

本 PR 为 `jwt-auth` 插件扩展支持的签名算法，新增支持 HS384、HS512、RS256、RS384、RS512、ES256、ES384、ES512、PS256、PS384、PS512 和 EdDSA 算法，提供更灵活的 JWT 令牌生成和验证能力。

### 12. 在 `limit-conn`, `limit-count`, `ai-rate-limiting` 插件中支持在配置中使用变量

相关 PR：https://github.com/apache/apisix/pull/12967

贡献者：[shreemaan-abhishek](https://github.com/shreemaan-abhishek)

本 PR 为 `limit-conn`、`limit-count` 和 `ai-rate-limiting` 插件新增变量配置支持，允许在限流配置中使用变量，实现动态限流策略。

### 13. 支持在 `resolve_var` 中设置默认值

相关 PR：https://github.com/apache/apisix/pull/12963

贡献者：[shreemaan-abhishek](https://github.com/shreemaan-abhishek)

本 PR 增强 `resolve_var` 函数，当变量不存在时支持使用默认值，避免因变量缺失导致的解析失败。

## 结语

Apache APISIX 的项目[官网](https://apisix.apache.org/zh/)和 Github 上的 [Issues](https://github.com/apache/apisix/issues) 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 Issues 中搜索，也可以参与 Issues 上的讨论，提出自己的想法和实践经验。
