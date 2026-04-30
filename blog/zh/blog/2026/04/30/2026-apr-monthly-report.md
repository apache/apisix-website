---
title: "2026 社区月报 (04.01 - 04.30)"
keywords: ["Apache APISIX", "API 网关", "社区月报", "贡献者"]
description: Apache APISIX 社区的月报旨在帮助社区成员更全面地了解社区的最新动态，方便大家参与到 Apache APISIX 社区中来。
tags: [Community]
image: TODO_COVER_IMAGE_ZH
---

> 最近，我们引入并更新了一些新功能，包括 `ai-proxy` 插件支持 AWS Bedrock、原生支持 Anthropic Messages API 协议、支持 OpenAI Responses API、`ai-rate-limiting` 新增基于表达式的限流策略、`request-id` 插件支持 UUID v7 生成等。有关更多细节，请阅读本期月报。

<!--truncate-->

## 导语

Apache APISIX 项目始终秉承着开源社区协作的精神，自问世起便崭露头角，如今已经成为全球最活跃的开源 API 网关项目之一。正如谚语所言，“众人拾柴火焰高”，这一辉煌成就，得益于整个社区伙伴的协同努力。

从 2026.04.01 至 2026.04.30，有 17 名开发者提交了 129 个 commits，为 Apache APISIX 做出了重要贡献。感谢这些伙伴们对 Apache APISIX 的无私支持！正是因为你们的付出，才能让 Apache APISIX 项目不断改进、提升和壮大。

## 贡献者统计

![贡献者名单](TODO_CONTRIBUTOR_LIST_IMAGE)

![新晋贡献者](TODO_NEW_CONTRIBUTORS_IMAGE)

## 近期亮点功能

### 1. `ai-proxy` 插件支持 AWS Bedrock

相关 PR：https://github.com/apache/apisix/pull/13249

贡献者：[shreemaan-abhishek](https://github.com/shreemaan-abhishek)

本 PR 为 `ai-proxy` 插件新增了对 AWS Bedrock 的支持。用户现在可以使用 `ai-proxy` 插件提供的统一接口，将 AI 请求路由到托管在 AWS Bedrock 上的模型，进一步扩展了所支持的 AI 平台范围。

### 2. 支持按协议覆盖 `request_body` 并将 `max_tokens` 映射重命名为 `llm_options`

相关 PR：https://github.com/apache/apisix/pull/13269

贡献者：[nic-6443](https://github.com/nic-6443)

本 PR 允许用户在 `ai-proxy` 插件中按协议覆盖请求体，为向不同 AI 提供商发送请求提供了更细粒度的控制。同时将 `max_tokens` 映射字段重命名为 `llm_options`，提升了配置的清晰度与可扩展性。

### 3. 新增支持感知提供商的 `max_tokens` 覆盖及优先级控制

相关 PR：https://github.com/apache/apisix/pull/13251

贡献者：[nic-6443](https://github.com/nic-6443)

本 PR 为 `ai-proxy` 插件新增感知 AI 提供商的 `max_tokens` 覆盖能力，并支持明确的优先级控制，使插件级别的设置可以被请求级别的值正确覆盖。这让用户在跨不同 AI 提供商限制 token 用量时行为更加可预期。

### 4. 流式传输时客户端断开连接则中止上游读取

相关 PR：https://github.com/apache/apisix/pull/13254

贡献者：[nic-6443](https://github.com/nic-6443)

本 PR 改善了 `ai-proxy` 插件的流式传输行为：当客户端在流式响应过程中断开连接时，会立即中止对上游 AI 提供商的读取。此前 APISIX 会在客户端断开后继续读取上游数据，浪费资源。现在连接将被清洁地终止。

### 5. 新增 `max_stream_duration_ms` 和 `max_response_bytes` 安全限制

相关 PR：https://github.com/apache/apisix/pull/13250

贡献者：[nic-6443](https://github.com/nic-6443)

本 PR 为 `ai-proxy` 插件引入了两个新的安全限制：`max_stream_duration_ms` 限制流式响应的总时长，`max_response_bytes` 限制从上游 AI 提供商读取的总字节数。这些保护措施有助于防止 AI 响应无限制地消耗时间或内存资源。

### 6. 新增 `core.response.get_response_source()` API 用于响应来源分类

相关 PR：https://github.com/apache/apisix/pull/13224

贡献者：[nic-6443](https://github.com/nic-6443)

本 PR 新增了核心 API `core.response.get_response_source()`，允许插件判断当前响应来源于上游、插件（如通过 `ngx.exit()` 返回）还是 APISIX 核心本身。这对需要根据响应来源执行不同逻辑的插件非常有用。

### 7. `/configs/validate` 接口在所有模式下均可用

相关 PR：https://github.com/apache/apisix/pull/13220

贡献者：[nic-6443](https://github.com/nic-6443)

本 PR 使 Admin API 的 `/configs/validate` 端点在所有部署模式（包括 Standalone 模式）下均可使用，而不仅限于 etcd 模式。用户无论以何种方式部署 APISIX，都可以验证配置文件的合法性。

### 8. `limit-count` 插件升级 `lua-resty-limit-traffic` 至 v1.2.0

相关 PR：https://github.com/apache/apisix/pull/13212

贡献者：[nic-6443](https://github.com/nic-6443)

本 PR 将 `limit-count` 插件底层依赖的 `lua-resty-limit-traffic` 库升级至 v1.2.0，引入了上游的 Bug 修复与性能改进。

### 9. `ai-rate-limiting` 插件新增基于表达式的限流策略

相关 PR：https://github.com/apache/apisix/pull/13191

贡献者：[nic-6443](https://github.com/nic-6443)

本 PR 为 `ai-rate-limiting` 插件新增了基于表达式的限流策略支持。用户现在可以使用 APISIX 表达式（如基于请求头、消费者名称或其他变量）动态定义限流 key，实现更灵活、更细粒度的 AI token 限流策略。

### 10. 支持 OpenAI Responses API（`/v1/responses`）

相关 PR：https://github.com/apache/apisix/pull/13186

贡献者：[nic-6443](https://github.com/nic-6443)

本 PR 为 `ai-proxy` 插件新增了对 OpenAI Responses API 端点（`/v1/responses`）的支持。用户现在可以通过 APISIX 代理发往最新 OpenAI Responses API 的请求，该 API 提供有状态的多轮对话能力。

### 11. `encrypt_fields` 支持嵌套结构

相关 PR：https://github.com/apache/apisix/pull/13192

贡献者：[nic-6443](https://github.com/nic-6443)

本 PR 增强了 `encrypt_fields` 机制，使其支持嵌套字段结构，从而允许对存储在深层嵌套插件配置中的敏感凭证进行正确加解密。这提升了使用嵌套配置对象的插件的安全覆盖范围。

### 12. 新增 `rate-limiting-info` 变量

相关 PR：https://github.com/apache/apisix/pull/13155

贡献者：[shreemaan-abhishek](https://github.com/shreemaan-abhishek)

本 PR 新增了内置变量 `rate-limiting-info`，将限流元数据（如剩余配额和重置时间）作为 APISIX 变量暴露出来。插件和日志配置现在可以引用该变量，在日志或响应中包含限流上下文信息。

### 13. 原生支持 Anthropic Messages API 协议

相关 PR：https://github.com/apache/apisix/pull/13181

贡献者：[nic-6443](https://github.com/nic-6443)

本 PR 为 `ai-proxy` 插件新增了对 Anthropic Messages API 协议的原生支持。用户现在可以直接使用原生 Anthropic Messages API 格式发送请求，无需经过 OpenAI 兼容格式转换，提供了对 Anthropic 特有功能更好的兼容性。

### 14. `request-id` 插件支持 UUID v7 生成

相关 PR：https://github.com/apache/apisix/pull/13152

贡献者：[shreemaan-abhishek](https://github.com/shreemaan-abhishek)

本 PR 为 `request-id` 插件新增了 UUID v7 生成支持。与随机的 UUID v4 不同，UUID v7 基于时间排序，更适合分布式追踪和日志关联等需要按时间顺序排列请求 ID 的场景。

### 15. `stream_proxy` 配置支持批量 TCP/UDP 端口范围

相关 PR：https://github.com/apache/apisix/pull/13153

贡献者：[shreemaan-abhishek](https://github.com/shreemaan-abhishek)

本 PR 为 `stream_proxy` 配置新增了批量 TCP/UDP 端口范围支持，允许用户通过范围格式（如 `9000-9010`）指定连续端口，而无需逐一列举。这简化了需要监听多个连续端口的服务的配置工作。

## 结语

Apache APISIX 的项目[官网](https://apisix.apache.org/zh/)和 GitHub 上的 [Issues](https://github.com/apache/apisix/issues) 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 Issues 中搜索，也可以参与 Issues 上的讨论，提出自己的想法和实践经验。
