# 使用 Redis 缓存 LLM 响应：精确匹配与语义匹配

> 验证 APISIX 3.18 的精确与语义缓存，包括租户隔离、流式响应和 Redis 故障处理。

Source: https://apisix.apache.org/zh/cookbooks/redis-ai-cache/

一次 `MISS` 和一次 `HIT` 还不足以说明 AI 缓存可用。本指南还会检查：命中时是否跳过真实模型调用、语义匹配是否只处理支持的请求格式、租户缓存是否隔离、中断的流是否不会写入缓存，以及 Redis 故障时请求是否仍能回退到 LLM。

## 实验内容

从空 Redis 数据库开始，使用真实 OpenAI Chat 与 Embeddings API 检查以下行为：

1. 第一个相同请求未命中，并调用一次 Chat Provider。
2. 第二个相同请求精确命中，不再调用 Chat Provider。
3. 与原问题语义相近的改写应命中，无关问题应未命中。
4. 语义命中成功写入精确缓存后，再次发送改写后的问题应精确命中，且不再调用 Embedding Provider。写入失败时记录日志，但不影响当前的语义命中响应。
5. Consumer B 不能命中 Consumer A 预热的缓存。
6. 完整、受支持的 SSE 可复用，中断响应不能复用。
7. Redis 服务或 Embedding 端点不可用时，APISIX 仍以缓存未命中方式调用 Chat Provider。

## 版本与测试要求

网关源码固定到 [APISIX 3.18.0 标签提交](https://github.com/apache/apisix/commit/0796d9c2cbedb1f8bf8194292ff526599f4fde20)。完成以下记录前，页面保持“**验证进行中**”：

- APISIX 与 Redis 的不可变镜像摘要（digest）；
- Redis 服务端版本，以及成功的 `FT.CREATE`/`FT.SEARCH` 预检；
- Chat 与 Embedding Provider、模型标识、区域和测试时间；
- 不依赖 APISIX 响应头的 Provider 侧调用次数；
- 从空环境重复运行两次，并由另一位操作者独立复测。

Mock 或 fixture server 不能替代这些检查。没有 Provider 凭据时，可以运行容器与 Redis Search 预检，但缓存结果仍不能标记为已验证。

[打开固定版本实验](https://github.com/apache/apisix-website/tree/master/examples/redis-ai-gateway)。`check-infra.sh` 无需 Provider 凭据即可运行；`test-cache.sh` 需要真实 OpenAI Chat 与 Embeddings API。

## 配置示例

测试 Route 至少应包含以下设置：

```json
{
  "ai-cache": {
    "layers": ["exact", "semantic"],
    "cache_key": {
      "include_consumer": true
    },
    "max_cache_body_size": 1048576,
    "redis_host": "redis",
    "redis_port": 6379,
    "redis_ssl": false,
    "semantic": {
      "similarity_threshold": 0.95,
      "embedding": {
        "openai": {
          "model": "<固定的-embedding-model>",
          "api_key": "$secret://<secret-resource>/<key>"
        }
      },
      "vector_search": {
        "redis": {
          "index": "apisix-cookbook-cache"
        }
      }
    }
  }
}
```

上面的片段只展示缓存设置。配套实验还会配置 Route、Consumer 认证、Provider 凭据、私有网络和清理步骤。实验会检查响应 header 与 Redis 状态，但不会启用或抓取 APISIX Prometheus 插件。`include_consumer` 只有在 APISIX 已认证 Consumer 后才生效；生产环境使用 TLS 时，必须设置 `redis_ssl_verify: true`。

APISIX 可能会转发未计入默认缓存键的客户端请求头。实验会在代理前删除 OpenAI 的 organization、project 和 beta-selection 请求头。生产环境中，凡是会影响 Provider 响应的客户端可控请求头，都应在代理前删除；如确需保留，应由服务端生成可信值，并通过 `cache_key.include_vars` 纳入缓存键。

## 测试清单

| 检查 | 通过条件 | 不能作为依据 |
|---|---|---|
| 精确缓存 | `MISS` 后 `HIT`，缓存响应正文字节一致，Chat Provider 计数依次为 `+1`、`+0` | 仅根据缓存响应头推测 Provider 调用数 |
| 语义缓存 | 不同问题返回带 similarity 响应头的 `HIT`，数值不低于阈值；无关问题返回 `MISS` | 固定写死无法由当前 Embedding 模型复现的分数 |
| 语义命中写入精确缓存 | 再次发送改写问题是精确 `HIT`，Embedding 计数增量为 `+0` | 出现写入告警，或重复请求再次调用 Embedding 服务 |
| 租户隔离 | Consumer B 得到 `MISS`，Consumer A 仍为 `HIT` | 只依赖调用方可伪造的租户请求头 |
| 流式响应 | 完整 SSE 可复用；主动中断的 SSE 重试仍为 `MISS` | 把中断的流称为可缓存，或宣称命中后仍按 Token 节奏回放 |
| 故障行为 | Redis 服务停止后仍由真实模型返回响应并显示 `MISS`；日志能识别后端故障但不含正文和密钥 | 把 `MISS` 当作 Redis 服务健康证明 |

## 结果度量

Chat 和 Embedding 的调用次数应以 Provider 侧数据为准。如果测试环境另行启用并抓取了 APISIX Prometheus 插件，可通过以下指标观察缓存行为：

- `apisix_ai_cache_hits_total{layer="exact"}`
- `apisix_ai_cache_hits_total{layer="semantic"}`
- `apisix_ai_cache_misses_total`
- `apisix_ai_cache_bypasses_total`
- `apisix_ai_cache_embedding_latency_bucket`

命中率按 `hits / (hits + misses)` 计算，绕过请求比例另行统计。不要仅凭缓存响应头或历史响应中的 `usage` 估算节省成本。评估成本时，应对同一组请求分别关闭和启用缓存，并记录 Provider 实际用量、请求重复率和样本量。

## 生产环境注意事项

- APISIX 3.18 的缓存后端只支持一个 Redis 端点；本文不声称 `ai-cache` 支持 Redis Cluster 或 Sentinel。
- 语义匹配仅适用于纯文本 OpenAI Chat。tool call、多模态输入和其他协议不会因配置而自动支持语义缓存。
- 缓存命中不会再经过优先级更低的 Guardrail 插件。安全策略变化后若没有明确的失效方案，不要直接组合使用。
- 不要公开完整 Prompt、缓存响应、Embedding、API key、Provider request ID 或完整 Redis key。

## 清理

删除实验 Route 和 Consumer，只清理本实验创建的缓存索引与 key，然后停止隔离容器。确认含凭据的文件没有被 Git 跟踪。不要清空共享 Redis 数据库。

Redis 是 Redis Ltd. 的注册商标。本社区指南与 Redis Ltd. 无隶属关系，也未获得其认可、支持或认证。
