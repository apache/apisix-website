---
title: 使用 Redis® 软件的精确与语义匹配缓存 LLM 响应
slug: redis-ai-cache
translation_of: redis-ai-cache
description: 构建并验证 APISIX 3.18 响应缓存链路，覆盖精确命中、语义匹配、租户隔离、完整流检查和 Redis® 故障测试。
difficulty: 中等
duration: 45 分钟
---

本 Cookbook 的发布门不只要求 Redis® 软件上的一次 `MISS` 和一次 `HIT`。它还要求证明：命中时真实模型没有被调用；语义匹配不超出文档支持的请求形态；不同租户不能复用彼此缓存；不完整的流永远不会写入缓存；Redis® 服务故障也不会让 LLM 链路不可用。

## 预期结果

从空 Redis® 数据库开始，实验将使用真实 OpenAI Chat 与 Embeddings API 验证：

1. 第一个相同请求未命中，并调用一次 chat Provider。
2. 第二个相同请求精确命中，不再调用 chat Provider。
3. 经过校准的改写问题语义命中，无关问题未命中。
4. best-effort L1 回填成功后，再次发送改写问题会精确命中，且不再调用 embedding Provider。回填出错时会记录日志，但当前语义命中仍会返回。
5. Consumer B 不能命中 Consumer A 预热的缓存。
6. 完整、受支持的 SSE 可复用，中断响应不能复用。
7. Redis® 服务或 embedding endpoint 不可用时，APISIX 仍以缓存未命中方式调用真实 chat Provider。

## 固定范围

网关源码固定到 [APISIX 3.18.0 标签提交](https://github.com/apache/apisix/commit/0796d9c2cbedb1f8bf8194292ff526599f4fde20)。页面变为“**端到端已验证**”前，实验还必须记录：

- APISIX 与 Redis® 不可变镜像 digest；
- Redis® 服务端版本，以及成功的 `FT.CREATE`/`FT.SEARCH` 预检；
- chat 与 embedding Provider、模型标识、区域和测试时间；
- 独立于 APISIX 响应 header 的脱敏 Provider 调用计数；
- 两次干净运行与第二位操作者复现。

mock 或 fixture server 不能满足发布门。没有 Provider 凭据时，只能验证容器与 Redis® Search 预检，不能把缓存结果标记为已验证。

[打开固定版本实验](https://github.com/apache/apisix-website/tree/master/examples/redis-ai-gateway)。`check-infra.sh` 无需 Provider 凭据即可运行；`test-cache.sh` 需要真实 OpenAI Chat 与 Embeddings API。

## 安全配置形态

被测试的 Route 必须包含以下边界：

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

可运行实验会补全 Route、Consumer 认证、Provider 配置、私有网络和清理步骤。目前它通过响应 header 与 Redis® 状态验证，并未启用或抓取 APISIX Prometheus 插件。上面的片段是安全契约，并非独立部署配置：`include_consumer` 只有在 APISIX 已认证 Consumer 后才生效；生产 TLS 连接必须设置 `redis_ssl_verify: true`。

APISIX 可能转发未进入默认 AI 缓存键的客户端 header。实验会在代理前移除 OpenAI organization、project 和 beta-selection header。生产环境应移除所有会改变 Provider 响应的客户端可控 header；或者从可信服务端状态生成该值，并通过 `cache_key.include_vars` 加入缓存键。

## 验收顺序

| 检查 | 可观察证据 | 失败信号 |
|---|---|---|
| 精确缓存 | `MISS` 后 `HIT`，缓存响应正文字节一致，chat Provider 计数依次为 `+1`、`+0` | 仅根据缓存 header 推测 Provider 调用数 |
| 语义缓存 | 不同问题返回带 similarity header 的 `HIT`，数值不低于阈值；无关问题返回 `MISS` | 固定写死无法由当前 embedding 模型复现的分数 |
| L2 回填 L1 | 回填成功；再次发送改写问题是精确 `HIT`，embedding 计数增量为 `+0` | 出现回填告警，或重复请求再次调用 embedding 服务 |
| 租户隔离 | Consumer B 得到 `MISS`，Consumer A 仍为 `HIT` | 只依赖调用方可伪造的租户 header |
| 流式响应 | 完整 SSE 可复用；主动中断的 SSE 重试仍为 `MISS` | 把 partial stream 称为可缓存，或宣称命中后仍按 token 节奏回放 |
| 故障行为 | Redis® 服务停止后仍由真实模型返回响应并显示 `MISS`；日志能识别后端故障但不含正文和密钥 | 把 `MISS` 当作 Redis® 服务健康证明 |

## 结果度量

chat 和 embedding 调用数必须来自 Provider 侧计数。在另行启用并抓取 APISIX Prometheus 插件的部署中，可使用以下 series 观察缓存行为：

- `apisix_ai_cache_hits_total{layer="exact"}`
- `apisix_ai_cache_hits_total{layer="semantic"}`
- `apisix_ai_cache_misses_total`
- `apisix_ai_cache_bypasses_total`
- `apisix_ai_cache_embedding_latency_bucket`

命中率按 `hits / (hits + misses)` 计算，绕过覆盖率单独报告。不要直接把缓存 header 或历史响应中的 `usage` 转换为成本节省。成本结论必须使用同一固定请求集分别关闭和启用缓存，并披露真实 Provider usage、工作负载重复率和样本数。

## 生产边界

- APISIX 3.18 的缓存后端只支持一个 Redis® endpoint；本文不声称 `ai-cache` 支持 Redis® Cluster 或 Sentinel。
- 语义匹配仅适用于纯文本 OpenAI Chat。tool call、多模态输入和其他协议不会因配置而自动支持语义缓存。
- 缓存命中不会再经过优先级更低的 Guardrail 插件。安全策略变化后若没有明确的失效方案，不要直接组合使用。
- 证据中不得公开完整 prompt、缓存响应、embedding、API key、Provider request ID 或完整 Redis® key。

## 清理

实验清理必须删除 APISIX Route 和 Consumer，只删除带唯一前缀的缓存索引与 key，停止隔离容器，并确认含密钥的环境文件没有被 Git 跟踪。不得清空共享 Redis® 数据库。

真实服务验收通过后，本页会补充命令资产和脱敏结果链接。

Redis is a registered trademark of Redis Ltd. Any rights therein are reserved to Redis Ltd. 此社区 Cookbook 未获得 Redis® 的认可、支持或认证。
