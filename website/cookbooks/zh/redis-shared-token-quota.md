---
title: 使用 Redis® 软件在多个 APISIX 节点间共享 LLM token 配额
slug: redis-shared-token-quota
translation_of: redis-shared-token-quota
description: 验证两个 APISIX 3.18 节点共享同一个响应后 LLM token 计数，包括跨节点拒绝和明确的 Redis® 降级行为。
difficulty: 中等
---

本 Cookbook 定义如何验证两个 APISIX 节点使用同一个以 Redis® 软件为后端的 token 计数；在下述发布门通过前，不声称已完成端到端验证。同时明确记账边界：APISIX 在请求前检查已有计数，但只有在 LLM 返回后才加入真实 token usage。这是共享的上游用量配额，并非零超额的预算预留。

## 预期结果

真实服务实验必须证明：

1. 发往 APISIX 节点 A 的请求成功，Provider 返回的 token usage 被写入 Redis® 数据库。
2. 发往节点 B 的请求看到同一份剩余额度。
3. 使额度越界的响应仍可能成功；之后发往任一节点的请求才返回配置的 `429`。
4. Provider 响应没有可用 `usage` 时，计数不会增加，并明确记录为记账缺口。
5. `allow_degradation: false` 时，请求前 Redis® 检查失败会返回错误，而不是静默绕过配额。
6. `allow_degradation: true` 时，请求会到达真实 Provider，并被明确标记为没有配额保护的流量。

## 固定范围

网关固定到 [APISIX 3.18.0 标签提交](https://github.com/apache/apisix/commit/0796d9c2cbedb1f8bf8194292ff526599f4fde20)。首个验证 profile 使用单节点 `redis` policy。插件 Schema 还包含 Redis® Cluster 与 Redis® Sentinel，但只有各自在真实拓扑和故障切换实验通过后，本文才能把它们标记为已验证。

实验必须固定 APISIX 与 Redis® 的不可变镜像 digest，使用会返回 token usage 的真实 LLM，从空的唯一作用域计数开始，连续通过两次，并由第二位操作者复现。带伪造 `usage` 的 mock 响应不是端到端证据。

[打开固定版本的双节点实验](https://github.com/apache/apisix-website/tree/master/examples/redis-ai-gateway)。基础设施预检无需 Provider key；`test-shared-quota.sh` 需要真实 OpenAI 响应中的 token usage。

## 配置契约

显式设置拒绝状态码，并让故障策略保持可见：

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

完整实验会通过 Secret 引用补充 `ai-proxy` Provider 与凭据，为两个 APISIX 节点下发相同 Route 和 Redis® 配置，并只暴露 Gateway 端口。Admin、Control API 与 Redis® 端口都保留在私有网络。

## 验收顺序

| 步骤 | 节点 | 预期证据 |
|---|---|---|
| 基线 | A | HTTP 200、真实 Provider 响应、配额 header、Provider `usage`，以及一次对应的 Redis® 计数增加 |
| 跨节点读取 | B | 剩余额度包含节点 A 的用量，而不是一份新的本地预算 |
| 越过阈值 | A 或 B | 越界响应可能仍为 HTTP 200；Redis® 数据库中已提交的数值超过配置阈值 |
| 执行拒绝 | 另一个节点 | 下一个请求返回 HTTP 429，Provider 调用数不增加 |
| 窗口重置 | 两个节点 | 固定窗口过期后，两边才会在新窗口内重新接受流量 |
| 请求前故障关闭 | A | Redis® 服务在配额检查前不可用，禁用降级时返回错误，Provider 调用数不增加 |
| 故障放行 | B | Redis® 服务在配额检查前不可用，启用降级时到达 Provider；证据明确标注此请求不受配额保护 |

每次模型成功响应后，都要轮询 Redis® 计数再执行下一条断言。否则，响应日志与记账时序可能让合法的响应后写入看起来像缺失。

## Header 不能单独证明什么

配额 header 适合给客户端反馈，但不是独立的记账证据。应为同一请求同时保存响应 header、Provider `usage`、Redis® value 与 TTL、APISIX error log 和 Provider 调用增量。若完整 Redis® key 包含 Consumer、Route 或模型标识，不得公开。

## 生产边界

- 固定窗口计数不会在请求上游前预留 prompt 的最大 completion token；并发请求可能越界。
- Provider 不返回 token usage 时，此机制无法给响应记账。
- `allow_degradation: true` 通过在 Redis® 故障时移除配额保护来保持可用性，必须对这一状态告警。
- `allow_degradation: false` 只会对请求前检查观测到的 Redis® 错误执行故障关闭。异步响应后写入失败无法撤回当前响应，并可能使 usage 未提交；必须对 APISIX 写入错误告警，并与 Provider usage 对账。
- `ai-cache` 命中会在限流插件之前返回，不消耗这份上游 token 配额。
- 每租户配额必须先认证调用方，并用可信的服务端身份（例如 `$consumer_name`）配置 `rules.key`。仅启用认证不会拆分默认的 constant 计数；付费配额不得使用调用方可伪造的 header 作为 key。

## 清理

删除实验 Route，只删除带唯一作用域的 Redis® counter key，停止两个 APISIX 节点与 Redis® 服务，并确认没有凭据文件被 Git 跟踪。不得对共享 Redis® 服务执行 `FLUSHALL`。

真实服务验收通过后，本页会补充命令资产和脱敏证据链接。

Redis is a registered trademark of Redis Ltd. Any rights therein are reserved to Redis Ltd. 此社区 Cookbook 未获得 Redis® 的认可、支持或认证。
