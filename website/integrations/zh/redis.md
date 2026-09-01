---
title: Redis
slug: redis
translation_of: redis
description: 在多个 APISIX 节点间使用 Redis 共享 AI 响应缓存、Token 计数和请求配额。
method: APISIX 内置插件
---

Apache APISIX 3.18 可使用 Redis 保存可复用的 LLM 响应、共享 Token 计数和分布式请求配额。这些能力的部署方式与故障处理不同，需要分别配置和运维。

<div class="architecture-flow" aria-label="APISIX 与 Redis 架构">
  <span>AI 客户端</span><span>→</span><span>Apache APISIX</span><span>↔</span><span>Redis</span>
</div>

## APISIX 如何使用 Redis

| 场景 | APISIX 3.18 行为 | 限制与运维说明 |
|---|---|---|
| 精确响应缓存 | Redis 保存 HTTP 200 AI 响应的正文。缓存键包含规范化后的请求正文和 Provider 配置。默认 TTL 为 3,600 秒，默认最大响应为 1 MiB。 | 默认缓存键不包含转发 header。应移除客户端可控的 Provider 路由 header；如果其他值也会影响响应，应从可信服务端变量取值，并通过 `cache_key.include_vars` 加入缓存键。APISIX 3.18 的缓存只支持一个 Redis endpoint，不提供请求合并，也不处理上游 `Cache-Control`，没有专用清理 API。命中时会恢复 HTTP 200 与 `Content-Type`，其他上游响应 header 不会回放。 |
| 语义响应缓存 | 精确缓存未命中后，APISIX 可为纯文本 OpenAI Chat prompt 生成 embedding，并通过 Redis Search 查找相似响应。 | 语义匹配只适用于纯文本 OpenAI Chat。多模态请求和非空 tool/function call 会绕过这一层；精确缓存层始终启用。 |
| 共享 token 配额 | `ai-rate-limiting` 可把固定窗口计数保存在 Redis 数据库中，使多个 APISIX 节点看到同一份用量。 | 只有模型响应给出 usage 后才记账，并非预付式额度预留；大响应或并发响应可能先越过阈值，后续请求才被拒绝。 |
| 共享请求配额 | `limit-count` 使用 `policy: redis` 时，会把请求计数保存在 Redis 中，使不同 APISIX 节点共用一份配额。 | 计数键应来自可信状态。插件支持固定窗口和滑动窗口；`sync_interval` 可减少 Redis 往返，但同步间隔内的全局计数会暂时滞后。配套实验尚未测试这条链路。 |
| 流式缓存 | APISIX 识别到协议终止事件后，可缓存完整、受支持的 SSE 响应。 | 中断的流不会写入缓存；JSON 与 SSE 使用不同条目；命中时会立即回放完整 SSE，不会复现原始 token 节奏。 |

语义缓存需要 Redis Search 命令。配套实验固定使用 Redis Open Source 8.10.1，并检查 `FT._LIST` 是否可用。这个预检只能确认 Redis 环境正常，不能验证 LLM 缓存链路。若使用更早的 Redis Open Source 或 Redis Stack 版本，需要固定并测试具体版本。

## 隔离与安全

缓存默认按 Route 隔离，而不是按 Consumer 隔离。如果多个 Consumer 共用一条 Route，应先把每个租户认证为独立 Consumer，再设置 `cache_key.include_consumer: true`；也可以把可信的服务端租户变量加入缓存键。这个选项不能隔离未认证流量，客户端可伪造的 header 也不能作为租户边界。代理前应移除会改变 Provider 路由或输出的客户端可控 header。其他影响响应的值应来自可信的服务端状态，并通过 `cache_key.include_vars` 加入缓存键。

Redis 凭据应使用 APISIX Secret 引用。Redis 服务应位于私有网络；使用 TLS 时必须校验证书；日志和截图中不要暴露缓存正文、embedding、Provider request ID 或完整 Redis key。

## 失败行为

- 缓存、向量搜索或 embedding 出错时会降级为缓存未命中，APISIX 继续请求 LLM。因此，仅看到 `MISS` header 不能证明 Redis 服务健康。
- 共享配额的处理方式不同。请求前 Redis 配额检查失败时，`allow_degradation: false` 会返回错误；设为 `true` 时会放行请求，但不再提供配额保护。这个开关只影响请求前检查。如果 Redis 在 access 阶段检查完成后、log 阶段异步写入计数前发生故障，当前响应仍可能成功，Token 用量也可能未写入；应监控写入错误。
- `limit-count` 的 Redis 依赖发生故障时，也会按 `allow_degradation` 处理。Redis Cluster 和 Sentinel policy 已有官方文档与上游测试，但本文不声称配套实验验证了故障切换。
- 缓存命中会在 `ai-rate-limiting` 之前直接返回，因此不会调用上游模型，也不会增加 Redis token 计数。

## 可观测性

APISIX Prometheus 插件会导出按 `exact` 或 `semantic` 分层的命中数、未命中数、绕过数和 embedding 延迟直方图。`ai-rate-limiting` 没有专用的 Redis token-counter 指标，应结合响应 header、Redis 状态、APISIX 日志和 Provider usage 进行验证。

## 参考资料

- [APISIX 3.18.0 标签中的 `ai-cache` 源码](https://github.com/apache/apisix/blob/0796d9c2cbedb1f8bf8194292ff526599f4fde20/apisix/plugins/ai-cache.lua)
- [`ai-cache` Schema](https://github.com/apache/apisix/blob/0796d9c2cbedb1f8bf8194292ff526599f4fde20/apisix/plugins/ai-cache/schema.lua)
- [语义缓存实现](https://github.com/apache/apisix/blob/0796d9c2cbedb1f8bf8194292ff526599f4fde20/apisix/plugins/ai-cache/semantic.lua)
- [`ai-rate-limiting` 源码](https://github.com/apache/apisix/blob/0796d9c2cbedb1f8bf8194292ff526599f4fde20/apisix/plugins/ai-rate-limiting.lua)
- [`limit-count` 源码](https://github.com/apache/apisix/blob/0796d9c2cbedb1f8bf8194292ff526599f4fde20/apisix/plugins/limit-count.lua)
- [Redis Search 模块生命周期](https://redis.io/docs/latest/operate/oss_and_stack/stack-with-enterprise/modules-lifecycle/)
- [固定版本的双节点 APISIX 与 Redis 实验](https://github.com/apache/apisix-website/tree/master/examples/redis-ai-gateway)

以上行为与 APISIX 3.18.0 源码一致，但运行时测试尚未完成。在记录 Provider 侧 Chat 与 Embedding 调用次数、完整和中断的 SSE 测试结果、两次从空环境开始的运行结果和脱敏日志，由其他人独立复现，并单独验证基于 Redis 的 `limit-count` 请求配额链路前，状态保持“**验证进行中**”。

Redis 是 Redis Ltd. 的注册商标。本社区集成与 Redis Ltd. 无隶属关系，也未获得其认可、支持或认证。
