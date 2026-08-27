---
title: Redis® 软件
slug: redis
translation_of: redis
description: 使用 Redis® 软件作为 APISIX AI Gateway 的精确与语义响应缓存后端，或在多个 APISIX 节点间共享 token 计数。
method: APISIX 内置插件
---

Apache APISIX 3.18 提供两条彼此独立、以 Redis® 软件为后端的集成路径：`ai-cache` 保存可复用的 LLM 响应，`ai-rate-limiting` 则在多个 APISIX 节点之间共享响应后的 token 计数。两者的拓扑与失败行为不同，应分别选择和运维。

<div class="architecture-flow" aria-label="APISIX 与 Redis® 架构">
  <span>AI 客户端</span><span>→</span><span>Apache APISIX</span><span>↔</span><span>Redis® 软件</span>
</div>

## 能力范围

| 能力 | APISIX 3.18 行为 | 重要边界 |
|---|---|---|
| 精确响应缓存 | Redis® 软件按规范化后的请求正文与 Provider 配置保存 HTTP 200 AI 响应的正文。默认 TTL 为 3,600 秒，默认最大响应为 1 MiB。 | 任意转发 header 默认不会进入缓存键。应移除客户端可控的 Provider 路由 header，或用可信服务端变量表示每个响应决定因素，并通过 `cache_key.include_vars` 加入缓存键。3.18 的缓存策略只支持一个 Redis® 地址；没有请求合并，不处理上游 `Cache-Control`，也没有专用清理 API。命中会重建 HTTP 200 与 `Content-Type`；其他上游响应 header 不会被保存或回放。 |
| 语义响应缓存 | 精确缓存未命中后，APISIX 可为纯文本 OpenAI Chat prompt 生成 embedding，并通过 Redis® Search 查找相似响应。 | 语义匹配只适用于纯文本 OpenAI Chat。多模态请求和非空 tool/function call 会绕过这一层；精确缓存层始终启用。 |
| 共享 token 配额 | `ai-rate-limiting` 可把固定窗口计数保存在 Redis® 数据库中，使多个 APISIX 节点看到同一份用量。 | 只有模型响应给出 usage 后才记账，并非预付式额度预留；大响应或并发响应可能先越过阈值，后续请求才被拒绝。 |
| 流式缓存 | APISIX 识别到协议终止事件后，可缓存完整、受支持的 SSE 响应。 | 中断的流不会写入缓存；JSON 与 SSE 使用不同条目；命中时会立即回放完整 SSE，不会复现原始 token 节奏。 |

语义缓存需要 Redis® Search 命令。配套实验固定 Redis® Open Source 8.10.1，其基础设施预检会检查 `FT._LIST` 是否可用。该检查仅属于基础设施证据，不能验证 LLM 缓存链路。若使用更早的 Redis® Open Source 或 Redis® Stack 版本，应固定并验证精确版本，不要默认兼容。

## 隔离与安全

缓存默认按 Route 隔离，但同一 Route 上的不同 Consumer 可能共享缓存。多租户流量必须先把各租户认证为不同 Consumer，再配置 `cache_key.include_consumer: true`；也可以加入可信的服务端租户变量。该选项本身不能隔离未认证流量，仅使用客户端可伪造的 header 也不能构成租户边界。代理前应移除任何会改变 Provider 路由或输出的客户端可控 header；如果响应决定因素确实需要变化，应从可信服务端状态生成，并通过 `cache_key.include_vars` 加入缓存键。

Redis® 凭据应使用 APISIX Secret 引用。Redis® 服务应位于私有网络；使用 TLS 时必须校验证书；日志和截图中不要暴露缓存正文、embedding、Provider request ID 或完整 Redis® key。

## 失败行为

- 缓存、向量搜索或 embedding 出错时会降级为缓存未命中，APISIX 继续请求 LLM。因此，仅看到 `MISS` header 不能证明 Redis® 服务健康。
- 共享配额的行为不同：请求前 Redis® 配额检查失败时，`allow_degradation: false` 返回错误，设为 `true` 则在无配额保护的情况下继续。该设置无法对响应后记账失败执行关闭：若 Redis® 服务在 access 检查与异步 log 阶段计数写入之间故障，当前响应仍可能成功且 token 增量可能未提交；必须对写入错误告警。
- 缓存命中会在 `ai-rate-limiting` 之前直接返回，因此不会调用上游模型，也不会增加 Redis® token 计数。

## 可观测性

APISIX Prometheus 插件会导出按 `exact` 或 `semantic` 分层的命中数、未命中数、绕过数和 embedding 延迟直方图。`ai-rate-limiting` 没有专用的 Redis® token-counter 指标，应结合响应 header、Redis® 状态、APISIX 日志和 Provider usage 进行验证。

## 已核对的源码

- [APISIX 3.18.0 标签中的 `ai-cache` 源码](https://github.com/apache/apisix/blob/0796d9c2cbedb1f8bf8194292ff526599f4fde20/apisix/plugins/ai-cache.lua)
- [`ai-cache` Schema](https://github.com/apache/apisix/blob/0796d9c2cbedb1f8bf8194292ff526599f4fde20/apisix/plugins/ai-cache/schema.lua)
- [语义缓存实现](https://github.com/apache/apisix/blob/0796d9c2cbedb1f8bf8194292ff526599f4fde20/apisix/plugins/ai-cache/semantic.lua)
- [`ai-rate-limiting` 源码](https://github.com/apache/apisix/blob/0796d9c2cbedb1f8bf8194292ff526599f4fde20/apisix/plugins/ai-rate-limiting.lua)
- [Redis® Search 模块生命周期](https://redis.io/docs/latest/operate/oss_and_stack/stack-with-enterprise/modules-lifecycle/)
- [固定版本的双节点 APISIX 与 Redis® 实验](https://github.com/apache/apisix-website/tree/master/examples/redis-ai-gateway)

在固定版本实验取得 Provider 侧 chat 与 embedding 调用计数、完整与中断 SSE 证据、两次干净运行、脱敏日志，并由第二位操作者独立复现前，本页面保持“**验证进行中**”。源码核对只能证明 3.18.0 的预期行为，不能替代运行时验证。

Redis is a registered trademark of Redis Ltd. Any rights therein are reserved to Redis Ltd. 此社区集成未获得 Redis® 的认可、支持或认证。
