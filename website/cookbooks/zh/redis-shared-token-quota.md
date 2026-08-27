---
title: 使用 Redis 在多个 APISIX 节点间共享 LLM token 配额
slug: redis-shared-token-quota
translation_of: redis-shared-token-quota
description: 验证两个 APISIX 3.18 节点能否通过 Redis 共享 LLM Token 用量，并正确执行跨节点限流与故障降级。
difficulty: 中等
duration: 35 分钟
---

两个 APISIX 节点可以通过 Redis 共用一份 LLM Token 计数。APISIX 会在代理请求前读取当前计数，但只在模型返回后记录 Provider 上报的实际用量。因此，某个请求可能先让用量超过上限，后续请求才会被拒绝。它适合限制共享用量，不能当作预付预算。

## 实验内容

使用真实 Provider 运行实验，并检查以下行为：

1. 发往 APISIX 节点 A 的请求成功，Provider 返回的 Token 用量被写入 Redis 数据库。
2. 节点 B 能读取节点 A 已消耗的用量和对应的剩余额度。
3. 导致用量超限的请求本身仍可能成功；后续请求才会返回配置的 `429`。
4. Provider 响应没有可用 `usage` 时，计数不会增加，并明确记录为记账缺口。
5. `allow_degradation: false` 时，请求前 Redis 检查失败会返回错误，而不是静默绕过配额。
6. `allow_degradation: true` 时，请求会到达 Provider；测试结果应注明该请求绕过了配额限制。

## 版本与测试要求

网关固定到 [APISIX 3.18.0 标签提交](https://github.com/apache/apisix/commit/0796d9c2cbedb1f8bf8194292ff526599f4fde20)。本指南只测试使用单个 Redis 端点的 `redis` policy。插件 Schema 也支持 Redis Cluster 和 Redis Sentinel，但需要分别完成真实拓扑与故障切换测试，才能标记为已验证。

实验环境使用指定的 APISIX 与 Redis 镜像摘要（digest）、会返回 Token 用量的 LLM，以及仅供本次测试使用的空计数器。从空环境重复运行两次，并由另一位操作者独立复测。带伪造 `usage` 的 Mock 响应不能验证完整链路。

[打开固定版本的双节点实验](https://github.com/apache/apisix-website/tree/master/examples/redis-ai-gateway)。基础设施预检无需 Provider key；`test-shared-quota.sh` 需要真实 OpenAI 响应中的 token usage。

## 配置示例

请显式设置拒绝状态码和降级策略：

```json
{
  "ai-rate-limiting": {
    "limit": 100,
    "time_window": 300,
    "limit_strategy": "total_tokens",
    "policy": "redis",
    "redis_host": "redis",
    "redis_port": 6379,
    "redis_database": 0,
    "rejected_code": 429,
    "show_limit_quota_header": true,
    "allow_degradation": false
  }
}
```

配套实验通过 Secret 引用配置 `ai-proxy` Provider 与凭据。两个 APISIX 节点使用相同的 Route 和 Redis 配置，只对外暴露 Gateway 端口；Admin API、Control API 和 Redis 端口都保留在私有网络。

## 测试清单

| 步骤 | 节点 | 预期结果 |
|---|---|---|
| 基线 | A | HTTP 200、Provider 响应、配额响应头、Provider `usage`，以及一次对应的 Redis 计数增加 |
| 跨节点读取 | B | 剩余额度包含节点 A 的用量，而不是一份新的本地预算 |
| 越过阈值 | A 或 B | 越界响应可能仍为 HTTP 200；Redis 数据库中已提交的数值超过配置阈值 |
| 执行拒绝 | 另一个节点 | 下一个请求返回 HTTP 429，Provider 调用数不增加 |
| 窗口重置 | 两个节点 | 固定窗口过期后，两边才会在新窗口内重新接受流量 |
| 请求前故障关闭 | A | Redis 服务在配额检查前不可用，禁用降级时返回错误，Provider 调用数不增加 |
| 故障放行 | B | Redis 服务在配额检查前不可用，启用降级时到达 Provider；测试结果注明该请求绕过了配额限制 |

每次模型响应成功后，先轮询 Redis，确认计数已写入，再进行下一项检查。记账发生在 log 阶段，若立即读取，可能误判为漏记。

## 不要只看响应头

配额响应头只能告诉客户端剩余额度，不能单独证明用量已经记账。对同一个请求，应同时保存响应头、Provider `usage`、Redis 中的值与 TTL、APISIX error log 和 Provider 调用次数变化。若完整 Redis key 包含 Consumer、Route 或模型标识，不要公开。

## 生产环境注意事项

- 固定窗口计数不会在调用上游前按请求可能生成的最大 Token 数预留额度；并发请求可能超限。
- Provider 不返回 Token 用量时，此机制无法给响应记账。
- Redis 故障时，`allow_degradation: true` 会放行请求，但此时不再提供配额保护；应对此状态告警。
- `allow_degradation: false` 只在请求前 Redis 检查失败时拒绝请求。响应后的异步写入失败无法撤回已返回的响应，也可能导致用量未记录。应监控 APISIX 写入错误，并与 Provider 用量对账。
- `ai-cache` 命中会在限流插件之前返回，不消耗这份上游 token 配额。
- 每租户配额必须先认证调用方，并用可信的服务端身份（例如 `$consumer_name`）配置 `rules.key`。仅启用认证不会为每个租户创建独立计数；付费配额不得使用调用方可伪造的请求头作为键。

## 清理

删除实验 Route，只清理本实验创建的 Redis counter key，然后停止两个 APISIX 节点与 Redis。确认含凭据的文件没有被 Git 跟踪。不要对共享 Redis 服务执行 `FLUSHALL`。

Redis 是 Redis Ltd. 的注册商标。本社区指南与 Redis Ltd. 无隶属关系，也未获得其认可、支持或认证。
