---
title: "2026 社区月报 (07.01 - 07.31)"
keywords: ["Apache APISIX", "API 网关", "社区月报", "贡献者"]
description: Apache APISIX 社区的月报旨在帮助社区成员更全面地了解社区的最新动态，方便大家参与到 Apache APISIX 社区中来。
tags: [Community]
image: TODO_COVER_IMAGE_ZH
---

> 最近，我们引入并更新了一些新功能，包括 AI 语义缓存与语义负载均衡、更全面的 AI 内容审核、跨节点 AI 限流、更安全的插件请求与响应体缓冲，以及更丰富的可观测性指标等。有关更多细节，请阅读本期月报。

<!--truncate-->

## 导语

Apache APISIX 项目始终秉承着开源社区协作的精神，自问世起便崭露头角，如今已经成为全球最活跃的开源 API 网关项目之一。正如谚语所言，"众人拾柴火焰高"，这一辉煌成就，得益于整个社区伙伴的协同努力。

从 2026.07.01 至 2026.07.31，有 19 名开发者提交了 151 个 commits，为 Apache APISIX 做出了重要贡献。感谢这些伙伴们对 Apache APISIX 的无私支持！正是因为你们的付出，才能让 Apache APISIX 项目不断改进、提升和壮大。

## 贡献者统计

![贡献者名单](TODO_CONTRIBUTOR_LIST_IMAGE)

![新晋贡献者](TODO_NEW_CONTRIBUTORS_IMAGE)

## 近期亮点功能

### 1. `ai-cache` 新增语义缓存层

相关 PR：https://github.com/apache/apisix/pull/13632

贡献者：[janiussyafiq](https://github.com/janiussyafiq)

本 PR 为 `ai-cache` 新增可选的语义二级缓存。在精确缓存未命中后，APISIX 可以对提示词生成向量，并在 RediSearch 向量索引中查找相似度达标的响应；该能力支持租户与模型隔离，且在嵌入服务或向量存储异常时会自动降级，不影响请求正常处理。

### 2. `ai-cache` 支持缓存流式响应

相关 PR：https://github.com/apache/apisix/pull/13644

贡献者：[janiussyafiq](https://github.com/janiussyafiq)

本 PR 扩展了 `ai-cache`，可在确认 SSE 流完整后缓存响应，并在缓存命中时使用正确的内容类型进行回放。缓存项会标记为 JSON 或 SSE 格式，同时通过统一的 Redis 连接与异常处理逻辑，提高流式缓存和一级缓存回填的可靠性。

### 3. Prometheus 新增 AI 缓存性能指标

相关 PR：https://github.com/apache/apisix/pull/13659

贡献者：[janiussyafiq](https://github.com/janiussyafiq)

本 PR 为 AI 缓存新增命中、未命中和绕过次数等 Prometheus 指标，并增加嵌入调用延迟直方图。新指标可以区分精确缓存与语义缓存命中，并沿用现有 LLM 指标标签，便于统一观察缓存效果与向量生成开销。

### 4. `ai-aliyun-content-moderation` 支持审核 system 与 tool 内容

相关 PR：https://github.com/apache/apisix/pull/13646

贡献者：[AlinsRan](https://github.com/AlinsRan)

本 PR 让 `ai-aliyun-content-moderation` 除用户消息外，还能审核 system 提示词，以及 OpenAI 兼容格式中独立的 tool-role 工具结果，覆盖 Agent 与 MCP 工作流中的间接提示词注入风险。新增的 `request_check_roles` 默认仍为 `["user"]`，因此现有配置的行为保持不变。

### 5. 路由匹配可保留路径参数中的编码斜杠

相关 PR：https://github.com/apache/apisix/pull/13626

贡献者：[AlinsRan](https://github.com/AlinsRan)

本 PR 新增可选配置 `apisix.match_uri_encoded_slash`，让 APISIX 在匹配路径参数时保留 `%2F` 的编码形式。由此，`/v1/:id/products/:type/list` 等路由可以接收包含编码斜杠的标识符；对于存在歧义或安全风险的路径，系统仍会保守地回退到 NGINX 规范化后的 URI。

### 6. 提高不可淘汰共享字典的默认容量

相关 PR：https://github.com/apache/apisix/pull/13688

贡献者：[nic-6443](https://github.com/nic-6443)

本 PR 提高了 Prometheus、服务发现和链路追踪所用共享字典的默认容量。由于这些字典写满后无法自动淘汰旧数据，更大的默认值可以减少中大型部署中指标静默丢失、上游节点无法解析或追踪 Span 丢失等问题；用户显式配置的容量仍会优先生效。

### 7. `ai-rate-limiting` 支持 Redis 共享计数器

相关 PR：https://github.com/apache/apisix/pull/13670

贡献者：[shreemaan-abhishek](https://github.com/shreemaan-abhishek)

本 PR 为 `ai-rate-limiting` 新增 Redis、Redis Cluster 和 Redis Sentinel 计数策略。集中式 Token 计数器可以在所有 APISIX 节点之间执行统一配额，避免实际限额随网关节点数增加而被放大；原有的本地策略仍是默认选项。

### 8. Kafka 日志插件支持连接启用 TLS 的 Broker

相关 PR：https://github.com/apache/apisix/pull/13607

贡献者：[ecsimsw](https://github.com/ecsimsw)

本 PR 为 `kafka-logger` 与 `error-log-logger` 暴露 TLS 配置，使其能够安全连接仅支持 TLS 的 AWS MSK 等 Kafka 集群。用户可以通过独立配置对象开启 TLS 与证书校验，该配置结构也为后续支持 mTLS 留出了扩展空间。

### 9. Stream PROXY 协议链路可保留真实客户端地址

相关 PR：https://github.com/apache/apisix/pull/13700

贡献者：[nic-6443](https://github.com/nic-6443)

本 PR 新增 `nginx_config.stream.real_ip_from`，为 Stream 代理提供与 HTTP 对应的可信来源配置。APISIX 信任前置负载均衡器后，可以从入站 PROXY 协议头获取客户端地址，并将其用于 Stream 访问日志、IP 类策略以及发送给上游的 PROXY 协议头。

### 10. `proxy-rewrite` 支持设置或追加同名多值请求头

相关 PR：https://github.com/apache/apisix/pull/13597

贡献者：[AlinsRan](https://github.com/AlinsRan)

本 PR 允许 `proxy-rewrite` 的 `headers.set` 与 `headers.add` 使用数组作为值。路由现在可以替换或追加 gRPC metadata 等同名多值请求头，同时保持现有标量配置的行为不变，数组中的每个元素仍支持 NGINX 变量与正则捕获结果。

### 11. 为插件请求与响应体缓冲设置容量上限

相关 PR：https://github.com/apache/apisix/pull/13705

贡献者：[shreemaan-abhishek](https://github.com/shreemaan-abhishek)

本 PR 为会在 Worker 内存中完整缓冲请求体或响应体的插件新增可配置容量限制，默认值为 64 MiB。超限请求会被拒绝，响应侧则会根据插件场景截断内容或改为不缓存地透传，从而降低无上限内存占用带来的风险。

### 12. 主动健康检查支持自定义 HTTP 方法与请求体

相关 PR：https://github.com/apache/apisix/pull/13726

贡献者：[AlinsRan](https://github.com/AlinsRan)

本 PR 为上游主动健康检查新增 `http_method` 和 `http_req_body` 配置。运维人员可以使用带实际 POST 请求体的探针检查 LLM Chat Completion 等端点，同时默认行为仍是无请求体的 GET，保持向后兼容。

### 13. `openid-connect` 可向上游传递原始签名 ID Token

相关 PR：https://github.com/apache/apisix/pull/13616

贡献者：[luarx](https://github.com/luarx)

本 PR 为 `openid-connect` 新增 `set_raw_id_token_header` 选项，可在完整 OIDC 会话流程中通过 `X-Raw-ID-Token` 向上游传递原始签名 ID Token JWT。与只包含解码后 Claims 的 `X-ID-Token` 不同，原始 Token 可以使用身份提供商的 JWKS 进行验签；APISIX 还会先清除客户端注入的同名请求头，而没有会话的 bearer 与 introspection 流程不支持该能力。

### 14. `ai-proxy-multi` 新增语义负载均衡

相关 PR：https://github.com/apache/apisix/pull/13676

贡献者：[AlinsRan](https://github.com/AlinsRan)

本 PR 新增 `semantic` 负载均衡算法，可根据请求提示词的语义选择合适的 LLM 实例。APISIX 会预先生成并缓存各实例示例的向量，再将每个请求与参考向量进行比较；若嵌入或相似度计算失败，则回退到兜底实例，无需外部分类服务即可实现面向成本与能力的智能路由。

### 15. `ai-aws-content-moderation` 支持审核 LLM 响应

相关 PR：https://github.com/apache/apisix/pull/13735

贡献者：[shreemaan-abhishek](https://github.com/shreemaan-abhishek)

本 PR 将 `ai-aws-content-moderation` 从仅审核请求扩展为同时支持非流式与流式 LLM 响应。非流式审核可以返回与上游协议兼容的拒绝内容，实时流式模式则能在检测到有害输出后替换剩余数据；默认的 `final_packet` 模式会在流结束后审核完整内容，并在最后的 SSE 数据事件中标记 `risk_level`。响应审核默认保持关闭。

## 结语

Apache APISIX 的项目[官网](https://apisix.apache.org/zh/)和 GitHub 上的 [Issues](https://github.com/apache/apisix/issues) 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 Issues 中搜索，也可以参与 Issues 上的讨论，提出自己的想法和实践经验。
