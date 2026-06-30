---
title: "2026 社区月报 (06.01 - 06.30)"
keywords: ["Apache APISIX", "API 网关", "社区月报", "贡献者"]
description: Apache APISIX 社区的月报旨在帮助社区成员更全面地了解社区的最新动态，方便大家参与到 Apache APISIX 社区中来。
tags: [Community]
image: https://static.api7.ai/uploads/2026/06/30/jAdrrmmG_2026-06-monthly-report-cover-cn.webp
---

> 最近，我们引入并更新了一些新功能，包括 SAML 认证、GraphQL 缓存、路由级代理缓冲控制、更丰富的 AI 可观测性、新增 LLM 安全与缓存插件、更安全的请求体读取，以及增强的限流后端等。有关更多细节，请阅读本期月报。

<!--truncate-->

## 导语

Apache APISIX 项目始终秉承着开源社区协作的精神，自问世起便崭露头角，如今已经成为全球最活跃的开源 API 网关项目之一。正如谚语所言，"众人拾柴火焰高"，这一辉煌成就，得益于整个社区伙伴的协同努力。

从 2026.06.01 至 2026.06.30，有 16 名开发者提交了 137 个 commits，为 Apache APISIX 做出了重要贡献。感谢这些伙伴们对 Apache APISIX 的无私支持！正是因为你们的付出，才能让 Apache APISIX 项目不断改进、提升和壮大。

## 贡献者统计

![贡献者名单](https://static.api7.ai/uploads/2026/06/30/dyTaYX1z_2026-06-contributors.webp)

![新晋贡献者](https://static.api7.ai/uploads/2026/06/30/JQ0VNnHX_2026-06-new-contributors.webp)

## 近期亮点功能

为了帮助读者更快理解本月 24 项功能更新，以下先按主题进行归类，再展开介绍每个功能：

- **认证与身份管理：** `saml-auth`、`openid-connect`、`jwe-decrypt` 和 `hmac-auth` 相关增强。
- **流量处理与请求安全：** GraphQL 缓存、路由级代理缓冲、请求体读取限制、批量请求限制、按端口配置 PROXY Protocol，以及更安全的 `post_arg.*` 匹配。
- **AI Gateway：** 回退控制、LLM 可观测性、Consumer 绑定场景的 AI 插件处理、Lakera Guard、阿里云内容安全、AI 响应缓存和响应扫描。
- **可观测性与日志：** Prometheus 标签基数控制，以及在保留默认日志结构的基础上扩展自定义字段。
- **限流与凭证保护：** Redis Sentinel/滑动窗口支持，以及限流插件 Redis 凭证加密存储。

### 1. 新增 `saml-auth` 插件

相关 PR：https://github.com/apache/apisix/pull/13346

贡献者：[AlinsRan](https://github.com/AlinsRan)

本 PR 新增 `saml-auth` 插件，将 SAML 2.0 认证能力引入 APISIX 网关层。依赖 SAML 身份提供方的组织，可以通过 APISIX 保护上游服务，而无需在每个业务应用中分别实现 SAML 处理逻辑。

### 2. 新增 `graphql-proxy-cache` 插件

相关 PR：https://github.com/apache/apisix/pull/13435

贡献者：[AlinsRan](https://github.com/AlinsRan)

本 PR 引入 `graphql-proxy-cache` 插件，基于 APISIX 现有的 `proxy-cache` 基础设施缓存 GraphQL 查询响应。对于可缓存的 GraphQL 操作，该插件可以减少重复上游计算，并支持磁盘和内存两种缓存策略。

### 3. 新增 `proxy-buffering` 插件

相关 PR：https://github.com/apache/apisix/pull/13446

贡献者：[AlinsRan](https://github.com/AlinsRan)

本 PR 新增 `proxy-buffering` 插件，用于按路由控制 NGINX 代理缓冲行为。关闭缓冲后，APISIX 可以将响应直接流式传输给客户端，这对 Server-Sent Events、流式 API 和实时数据传递等场景非常重要。

### 4. `openid-connect` 本地 JWT 校验模式下 `client_secret` 可选

相关 PR：https://github.com/apache/apisix/pull/13472

贡献者：[AlinsRan](https://github.com/AlinsRan)

本 PR 让 `openid-connect` 在仅进行本地 Bearer Token 校验的模式下不再强制要求 `client_secret`，例如基于公钥或 JWKS 的 JWT 校验。对于不会调用身份提供方 token 或 introspection 端点的流程，用户无需再配置无意义的占位密钥。

### 5. 移除 `jwe-decrypt` 的服务端 Token 生成端点

相关 PR：https://github.com/apache/apisix/pull/13464

贡献者：[shreemaan-abhishek](https://github.com/shreemaan-abhishek)

本 PR 移除了 `jwe-decrypt` 插件中未完成的 `/apisix/plugin/jwe/encrypt` 辅助端点。APISIX 现在更专注于在网关层解密 JWE，而 Token 生成则由持有消费者密钥的服务负责。

### 6. `hmac-auth` 新增 `max_req_body_size`

相关 PR：https://github.com/apache/apisix/pull/13478

贡献者：[shreemaan-abhishek](https://github.com/shreemaan-abhishek)

本 PR 为启用请求体验证的 `hmac-auth` 路由新增 `max_req_body_size` 选项。超大请求体可以在被 APISIX 缓冲进内存之前被拒绝，从而提升全局 NGINX 请求体限制被调高或关闭时的安全性。

### 7. `openid-connect` Session 配置适配 `lua-resty-session` 4.x

相关 PR：https://github.com/apache/apisix/pull/13178

贡献者：[francescodedomenico](https://github.com/francescodedomenico)

本 PR 更新 `openid-connect` 的 session 配置 schema，使其与 `lua-resty-session` 4.x 保持一致。Session 选项现在以真实字段名暴露并进行显式校验，避免诸如过期时间等配置被静默忽略。

### 8. `ai-proxy-multi` 新增回退重试控制

相关 PR：https://github.com/apache/apisix/pull/13495

贡献者：[AlinsRan](https://github.com/AlinsRan)

本 PR 为 `ai-proxy-multi` 的 fallback 行为新增 `max_retries` 和 `retry_on_failure_within_ms`。运维人员可以限制单个请求尝试的备用 LLM 实例数量，并避免对慢失败进行重试，从而减少额外延迟和模型调用成本。

### 9. `forward-auth` 与 `ai-proxy` 限制请求体读取大小

相关 PR：https://github.com/apache/apisix/pull/13466

贡献者：[shreemaan-abhishek](https://github.com/shreemaan-abhishek)

本 PR 为 `forward-auth`、`ai-proxy` 和 `ai-proxy-multi` 新增 `max_req_body_size`。这些插件在解析前即可拒绝超大请求体，避免客户端让 worker 将任意大小的请求体缓冲到内存中。

### 10. `batch-requests` 限制 Pipeline 数量并收紧 Schema

相关 PR：https://github.com/apache/apisix/pull/13492

贡献者：[shreemaan-abhishek](https://github.com/shreemaan-abhishek)

本 PR 强化 `batch-requests` 插件，新增可配置的 `max_pipeline_items` 限制，要求 timeout 为正数，并拒绝 pipeline 条目中的未文档化字段。单个批量请求不再能扩展为无限数量的内部请求。

### 11. Prometheus 指标新增内置 LLM 直方图

相关 PR：https://github.com/apache/apisix/pull/13487

贡献者：[AlinsRan](https://github.com/AlinsRan)

本 PR 为 AI Gateway 流量增强 Prometheus 指标，提供更清晰的延迟和 token 分布数据。APISIX 现在可以区分 LLM 总延迟和流式响应首 token 时间，并暴露 prompt 与 completion token 直方图，便于基于分位数进行监控。

### 12. 新增 LLM 可观测性 NGINX 内置变量

相关 PR：https://github.com/apache/apisix/pull/13477

贡献者：[AlinsRan](https://github.com/AlinsRan)

本 PR 新增 8 个由 `ai-proxy` 自动填充的 `$llm_*` NGINX 变量。这些变量可以在访问日志和各类 logger 插件中暴露 LLM 请求与响应元数据，无需额外解析或插件配置。

### 13. AI 插件新增 Consumer 绑定场景的 `fail_mode`

相关 PR：https://github.com/apache/apisix/pull/13489

贡献者：[AlinsRan](https://github.com/AlinsRan)

本 PR 为绑定在 Consumer 或 Service 级别的 AI 安全插件新增统一的 `fail_mode` 机制。当插件收到无法检查的普通 HTTP、非 JSON 或非 AI 请求时，可以一致地选择跳过、告警或失败关闭。

### 14. `limit-count` 支持 Redis Sentinel、滑动窗口和延迟同步

相关 PR：https://github.com/apache/apisix/pull/13443

贡献者：[AlinsRan](https://github.com/AlinsRan)

本 PR 为 `limit-count` 扩展 Redis Sentinel 后端、滑动窗口和 Redis 策略的延迟同步能力。这些能力可以提升高可用性，减少固定窗口边界突发，并降低高流量路由上的逐请求 Redis 开销。

### 15. Prometheus 支持禁用标签值以降低基数

相关 PR：https://github.com/apache/apisix/pull/13202

贡献者：[janiussyafiq](https://github.com/janiussyafiq)

本 PR 在 Prometheus 插件元数据中新增 `disabled_labels` 选项。运维人员可以将选定内置标签的值折叠为空字符串，以降低指标基数，同时保持指标 schema 对仪表盘、告警和 recording rules 的兼容性。

### 16. Stream TCP Proxy 支持按端口配置 PROXY Protocol

相关 PR：https://github.com/apache/apisix/pull/13561

贡献者：[nic-6443](https://github.com/nic-6443)

本 PR 为 stream TCP proxy 条目新增按端口控制 PROXY Protocol 的能力。用户可以在特定端口上启用接收或发送 PROXY Protocol，而不是只能对所有 stream TCP 端口应用全局配置。

### 17. 新增 `log_format_extra` 以扩展默认日志输出

相关 PR：https://github.com/apache/apisix/pull/13568

贡献者：[shreemaan-abhishek](https://github.com/shreemaan-abhishek)

本 PR 新增 `log_format_extra`，允许在保留 APISIX 默认丰富日志字段的基础上叠加用户自定义字段。同时新增 `upstream_unresolved_host` 变量，便于记录配置中的上游主机名以及解析后的上游地址。

### 18. 新增 `ai-lakera-guard` 插件

相关 PR：https://github.com/apache/apisix/pull/13570

贡献者：[janiussyafiq](https://github.com/janiussyafiq)

本 PR 新增 `ai-lakera-guard` 插件，将 APISIX 与 Lakera Guard 集成，在网关层扫描 LLM 请求。该插件可帮助 AI 应用在请求到达后端模型服务前识别 prompt injection、越狱、PII 泄露、内容策略违规和恶意链接等风险。

### 19. 优化 `ai-aliyun-content-moderation` 性能和请求检查范围

相关 PR：https://github.com/apache/apisix/pull/13598

贡献者：[nic-6443](https://github.com/nic-6443)

本 PR 优化 `ai-aliyun-content-moderation`，将 O(n²) 的内容切分改为 O(n)，降低签名开销，并在单个请求内复用 HTTP 连接。同时新增按角色感知的 `request_check_mode`，让审核可以只关注最新用户输入，而不必每轮都重新审核完整对话。

### 20. `llm_summary` 纳入 AI 可观测性变量

相关 PR：https://github.com/apache/apisix/pull/13609

贡献者：[nic-6443](https://github.com/nic-6443)

本 PR 将流式模式、工具调用信息、缓存 token、reasoning token 和内容风险等级等 AI 可观测性字段加入 `llm_summary`。Logger 插件现在可以自动获得更完整的 AI 请求摘要，而无需逐个手动添加 `$llm_*` 变量。

### 21. 新增 `ai-cache` 插件

相关 PR：https://github.com/apache/apisix/pull/13578

贡献者：[janiussyafiq](https://github.com/janiussyafiq)

本 PR 新增 `ai-cache` 插件，用于缓存解析为相同 prompt 和 AI 实例的 LLM 响应。对于 FAQ 机器人、文档问答、翻译等重复性 AI 工作负载，该插件可以减少上游 token 成本和响应延迟。

### 22. `ai-lakera-guard` 支持响应扫描

相关 PR：https://github.com/apache/apisix/pull/13606

贡献者：[janiussyafiq](https://github.com/janiussyafiq)

本 PR 为 `ai-lakera-guard` 增加非流式和流式 LLM 响应扫描能力。用户可以配置插件检查输入、输出或两者；当响应被判定存在风险时，插件会用兼容提供商协议的拒绝消息替换原始响应。

### 23. 新增 `max_post_args_readable_size` 限制 `post_arg.*` 匹配读取

相关 PR：https://github.com/apache/apisix/pull/13601

贡献者：[shreemaan-abhishek](https://github.com/shreemaan-abhishek)

本 PR 新增 `apisix.max_post_args_readable_size`，限制 `post_arg.*` 路由匹配过程中读取请求体的大小。对于过大的 JSON 或 multipart 请求体，APISIX 不再为了路由谓词将其解析进 worker 内存，而是让相关谓词不匹配。

### 24. 限流插件中的 Redis 密码支持加密存储

相关 PR：https://github.com/apache/apisix/pull/13624

贡献者：[nic-6443](https://github.com/nic-6443)

本 PR 为 `limit-count`、`limit-req` 和 `limit-conn` 的 `redis_password` 与 `sentinel_password` 字段加入 `encrypt_fields`。启用数据加密后，限流插件使用的 Redis 凭证会在 etcd 中加密存储，并在运行时透明解密。

## 结语

Apache APISIX 的项目[官网](https://apisix.apache.org/zh/)和 GitHub 上的 [Issues](https://github.com/apache/apisix/issues) 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 Issues 中搜索，也可以参与 Issues 上的讨论，提出自己的想法和实践经验。
