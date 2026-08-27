---
title: Share an LLM token quota across APISIX nodes with Redis
slug: redis-shared-token-quota
description: Share a post-response token counter between two APISIX 3.18 nodes, and test cross-node enforcement and Redis failure handling.
category: reliability
verification: validation-in-progress
owner: Apache APISIX community
difficulty: Intermediate
duration: 35 minutes
apisix_version: 3.18.0
external_version: Redis Open Source 8.10.1
integrations:
  - redis
plugins:
  - ai-proxy
  - ai-rate-limiting
reviewed_at: "2026-08-25"
evidence_url: https://github.com/apache/apisix/blob/0796d9c2cbedb1f8bf8194292ff526599f4fde20/apisix/plugins/ai-rate-limiting.lua
---

This cookbook shows how two APISIX nodes can share one Redis-backed LLM token counter. APISIX reads the current counter before proxying a request and records the provider-reported usage after the response. A request can therefore take usage past the limit before the next request is rejected. Treat this as a shared usage limit, not a prepaid budget.

## What you'll test

Run the lab against a live provider and check the following:

1. A request sent to APISIX node A succeeds and its provider-reported token usage is written to the Redis database.
2. A request sent to node B sees the same remaining quota.
3. The response that crosses the quota may still succeed; the next request on either node receives the configured `429`.
4. A provider response without a usable `usage` object does not increase the counter; record the request as missing usage data.
5. With `allow_degradation: false`, a pre-request Redis check failure returns an error rather than silently bypassing quota.
6. With `allow_degradation: true`, the request reaches the live provider; record it as bypassing quota enforcement.

## Version and test requirements

The gateway is fixed to the [APISIX 3.18.0 tag commit](https://github.com/apache/apisix/commit/0796d9c2cbedb1f8bf8194292ff526599f4fde20). This test covers the `redis` policy with one Redis endpoint. The plugin schema also supports Redis Cluster and Redis Sentinel, but each needs its own topology and failover test before it can be marked as verified.

Use the pinned APISIX and Redis image digests, a live LLM that reports token usage, and an empty counter unique to the test. Run the test twice from a clean state and ask another operator to reproduce it. A mock response with a fabricated `usage` field does not verify the full flow.

[Open the pinned two-node lab](https://github.com/apache/apisix-website/tree/master/examples/redis-ai-gateway). Its infrastructure preflight needs no provider key; `test-shared-quota.sh` requires a real OpenAI response with token usage.

## Configuration

Set the rejection code and degradation behavior explicitly:

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

The linked lab adds the `ai-proxy` provider and credentials through secret references. Both APISIX nodes use the same Route and Redis configuration, and only their gateway ports are exposed. The Admin API, Control API, and Redis ports remain on private networks.

## Test checklist

| Step | Node | Expected result |
|---|---|---|
| Baseline | A | HTTP 200, live provider response, quota headers, provider `usage`, and one corresponding Redis counter increase |
| Cross-node read | B | Remaining quota reflects node A's usage rather than a fresh local budget |
| Cross the limit | A or B | The crossing response may be HTTP 200; the committed Redis value exceeds the configured limit |
| Enforce | Other node | The next request is HTTP 429 and provider call count does not increase |
| Reset | Both | After the fixed window expires, both nodes accept traffic under a new counter window |
| Pre-request fail closed | A | The Redis service is unavailable before the quota check, so degradation disabled returns an error and provider count stays unchanged |
| Degrade open | B | The Redis service is unavailable before the quota check, so degradation enabled reaches the provider; record the request as bypassing quota enforcement |

After each successful model response, wait for the Redis counter to update before running the next check. Token accounting happens in the log phase, so checking immediately can produce a false failure.

## Verify the counter, not just the headers

Quota headers tell the client how much quota remains, but they do not prove that usage was recorded. For the same request, capture the response headers, provider `usage`, Redis value and TTL, APISIX error log, and provider call count. Do not publish a complete Redis key if it contains Consumer, Route, or model identifiers.

## Before using this in production

- This fixed-window counter does not reserve the prompt's worst-case completion tokens before sending the request. Concurrent requests can overshoot.
- When the provider does not return token usage, the usage cannot be added to the counter.
- `allow_degradation: true` lets the request continue without quota enforcement during a Redis fault. Alert on that state.
- `allow_degradation: false` only fails closed for a Redis error observed by the pre-request check. A failure in the asynchronous post-response write cannot retract the response and can leave usage uncommitted; alert on APISIX write errors and reconcile against provider usage.
- `ai-cache` hits return before the rate-limiter runs and do not consume this upstream token quota.
- For a per-tenant quota, authenticate the caller and configure `rules.key` from a trusted server-side identity such as `$consumer_name`. Authentication alone does not create a separate counter for each tenant. Do not base a paid quota on a caller-controlled header.

## Cleanup

Delete the lab Routes, remove only the Redis counter keys created by the lab, and stop both APISIX nodes and Redis. Confirm that no file containing credentials is tracked. Never run `FLUSHALL` against a shared Redis service.

Redis is a registered trademark of Redis Ltd. This community cookbook is not endorsed, supported, or certified by Redis Ltd.
