---
title: Share an LLM token quota across APISIX nodes with Redis® software
slug: redis-shared-token-quota
description: Validate one post-response LLM token counter across two APISIX 3.18 nodes, including cross-node rejection and explicit Redis® degradation behavior.
category: reliability
verification: validation-in-progress
owner: Apache APISIX community
difficulty: Intermediate
duration: 35 minutes
apisix_version: 3.18.0
external_version: Redis® Open Source 8.10.1
integrations:
  - redis
plugins:
  - ai-proxy
  - ai-rate-limiting
reviewed_at: "2026-08-25"
evidence_url: https://github.com/apache/apisix/blob/0796d9c2cbedb1f8bf8194292ff526599f4fde20/apisix/plugins/ai-rate-limiting.lua
---

This cookbook defines how to verify that two APISIX nodes use one token counter backed by Redis® software; it does not claim E2E verification until the publication gate below passes. It also makes the accounting boundary explicit: APISIX checks the existing counter before a request, but adds the real token usage only after the LLM response. This is a shared upstream-usage quota, not a zero-overshoot budget reservation.

## Outcome

The real-service lab must prove:

1. A request sent to APISIX node A succeeds and its provider-reported token usage is written to the Redis® database.
2. A request sent to node B sees the same remaining quota.
3. The response that crosses the quota may still succeed; the next request on either node receives the configured `429`.
4. A provider response without a usable `usage` object does not increase the counter and is reported as an accounting gap.
5. With `allow_degradation: false`, a pre-request Redis® check failure returns an error rather than silently bypassing quota.
6. With `allow_degradation: true`, the request reaches the real provider and is explicitly classified as unprotected traffic.

## Pinned scope

The gateway is fixed to the [APISIX 3.18.0 tag commit](https://github.com/apache/apisix/commit/0796d9c2cbedb1f8bf8194292ff526599f4fde20). The first verified profile uses the single-node `redis` policy. Redis® Cluster and Redis® Sentinel appear in the plugin schema, but each requires a separate real topology and failover run before this cookbook can claim those profiles as verified.

The lab must pin immutable APISIX and Redis® image digests, use a real LLM that returns token usage, start from an empty uniquely scoped counter, pass twice, and be reproduced by a second operator. A mock response with a fabricated `usage` field is not E2E evidence.

[Open the pinned two-node lab](https://github.com/apache/apisix-website/tree/master/examples/redis-ai-gateway). Its infrastructure preflight needs no provider key; `test-shared-quota.sh` requires a real OpenAI response with token usage.

## Configuration contract

Use an explicit rejection code and keep the failure policy visible:

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

The complete lab adds the `ai-proxy` provider and credentials through secret references, gives both APISIX nodes the same Route and Redis® configuration, and exposes only their gateway ports. Admin, Control API, and Redis® ports stay on private networks.

## Acceptance sequence

| Step | Node | Expected evidence |
|---|---|---|
| Baseline | A | HTTP 200, real provider response, quota headers, provider `usage`, and one corresponding Redis® counter increase |
| Cross-node read | B | Remaining quota reflects node A's usage rather than a fresh local budget |
| Cross the limit | A or B | The crossing response may be HTTP 200; the committed Redis® value exceeds the configured limit |
| Enforce | Other node | The next request is HTTP 429 and provider call count does not increase |
| Reset | Both | Only after the fixed window expires do both nodes accept traffic under a new counter window |
| Pre-request fail closed | A | The Redis® service is unavailable before the quota check, so degradation disabled returns an error and provider count stays unchanged |
| Degrade open | B | The Redis® service is unavailable before the quota check, so degradation enabled reaches the provider; evidence labels it as not quota-protected |

Poll the Redis® counter after every successful model response before issuing the next assertion. Otherwise, response-log timing can make a valid post-response write look missing.

## What the headers do not prove

Quota headers are useful client feedback, but they are not independent accounting evidence. Capture the response headers, provider `usage`, Redis® value and TTL, APISIX error log, and provider call delta for the same request. Do not expose the complete Redis® key if it contains Consumer, Route, or model identifiers.

## Production boundaries

- This fixed-window counter does not reserve the prompt's worst-case completion tokens before sending the request. Concurrent requests can overshoot.
- When the provider does not return token usage, the response cannot be charged by this mechanism.
- `allow_degradation: true` preserves availability by removing quota protection during a Redis® fault. Alert on that state.
- `allow_degradation: false` only fails closed for a Redis® error observed by the pre-request check. A failure in the asynchronous post-response write cannot retract the response and can leave usage uncommitted; alert on APISIX write errors and reconcile against provider usage.
- `ai-cache` hits return before the rate-limiter runs and do not consume this upstream token quota.
- For a per-tenant quota, authenticate the caller and configure `rules.key` from a trusted server-side identity such as `$consumer_name`. Authentication alone does not partition the default constant counter. Do not base a paid quota on a caller-controlled header.

## Cleanup

Delete the lab Routes, remove only the uniquely scoped Redis® counter keys, stop both APISIX nodes and the Redis® service, and verify no credential file is tracked. Do not use `FLUSHALL` against a shared Redis® service.

The command assets and sanitized evidence will be linked here after the real-service acceptance gate passes.

Redis is a registered trademark of Redis Ltd. Any rights therein are reserved to Redis Ltd. This community cookbook is not endorsed, supported, or certified by Redis®.
