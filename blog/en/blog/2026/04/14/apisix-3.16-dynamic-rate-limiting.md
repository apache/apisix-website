---
title: "What's New in Apache APISIX 3.16: Dynamic Rate Limiting for Your API Gateway"
authors:
  - name: "Ming Wen"
    title: "Author"
    url: "https://github.com/moonming"
    image_url: "https://github.com/moonming.png"
keywords:
  - Apache APISIX
  - API Gateway
  - Rate Limiting
  - Dynamic Rate Limiting
  - AI Gateway
  - Multi-Tenant
  - Token Budget
description: Apache APISIX 3.16 introduces dynamic rate limiting with multiple rules and variable support across limit-count, limit-conn, and ai-rate-limiting plugins, enabling context-aware, per-tier, and multi-tenant rate limiting in a single route configuration.
tags: [Products]
---

Rate limiting is one of the most critical capabilities in any API gateway. Yet for years, most gateways — including APISIX — have treated it as a static, one-size-fits-all configuration: set a number, set a time window, done.

In practice, real-world rate limiting is far more nuanced. A SaaS platform needs different quotas for free and paid users. An AI gateway must enforce token budgets that vary by model and consumer. A multi-tenant API must isolate rate limits per tenant without duplicating routes.

Apache APISIX 3.16 addresses these challenges head-on with two powerful enhancements to the rate limiting plugins: **multiple rules** and **variable support**. Together, they transform rate limiting from static configuration into a dynamic, context-aware policy engine.

<!--truncate-->

## What Changed in APISIX 3.16

APISIX 3.16 introduces two complementary features across the `limit-count`, `limit-conn`, and `ai-rate-limiting` plugins:

| Feature | Description | Supported Plugins |
|---------|-------------|-------------------|
| Multiple rules | Define an array of rate limiting rules with independent thresholds and time windows | `limit-count`, `limit-conn`, `ai-rate-limiting` |
| Variable support | Use APISIX variables (`${remote_addr}`, `${http_*}`, `${consumer_name}`, etc.) in `count`, `time_window`, and `key` fields, with optional default values via `${var ?? default}` | `limit-count`, `limit-conn`, `ai-rate-limiting` |

Both features are fully backward compatible. Existing configurations continue to work without modification.

## Multiple Rules: Beyond Single-Threshold Rate Limiting

### The Problem

Consider a common requirement: limit an API to **10 requests per second** and **500 requests per minute**. Before 3.16, you had to configure two separate plugin instances or chain multiple routes. This was verbose, error-prone, and hard to maintain.

### The Solution

The new `rules` array lets you define multiple rate limiting policies in a single plugin configuration. Each rule operates independently with its own counter, time window, and key.

```json
{
  "uri": "/api/v1/*",
  "plugins": {
    "limit-count": {
      "rules": [
        {
          "count": 10,
          "time_window": 1,
          "key": "${remote_addr}_per_second",
          "header_prefix": "per-second"
        },
        {
          "count": 500,
          "time_window": 60,
          "key": "${remote_addr}_per_minute",
          "header_prefix": "per-minute"
        },
        {
          "count": 10000,
          "time_window": 86400,
          "key": "${remote_addr}_per_day",
          "header_prefix": "per-day"
        }
      ],
      "rejected_code": 429
    }
  },
  "upstream": {
    "type": "roundrobin",
    "nodes": {
      "127.0.0.1:1980": 1
    }
  }
}
```

With this configuration, APISIX enforces all three limits simultaneously. A client hitting the per-second limit receives a `429` response with headers indicating which limit was exceeded:

```
X-Per-Second-RateLimit-Limit: 10
X-Per-Second-RateLimit-Remaining: 0
X-Per-Second-RateLimit-Reset: 1
X-Per-Minute-RateLimit-Limit: 500
X-Per-Minute-RateLimit-Remaining: 499
X-Per-Minute-RateLimit-Reset: 60
```

The `header_prefix` field lets clients distinguish which rule triggered the rejection — critical for debugging and client-side retry logic.

## Variable Support: Context-Aware Rate Limiting

### The Problem

Static rate limits assume every consumer is equal. In reality, a free-tier user and an enterprise customer should have very different quotas. Before 3.16, supporting this meant creating separate routes for each tier — leading to route explosion and configuration drift.

### The Solution

Variable support lets you pull rate limiting parameters directly from the request context. The `count`, `time_window`, and `key` fields now accept APISIX variables.

### Example 1: Per-Tier Rate Limiting via HTTP Header

Suppose your authentication middleware injects an `X-Rate-Quota` header based on the user's subscription tier:

> **Prerequisite**: this example uses `${consumer_name}` as the rate limit key, which requires an authentication plugin on the route so that the consumer identity is available at request time. Add `key-auth` (or any other auth plugin) to the route plugins and create a consumer before testing.

```json
{
  "uri": "/api/v1/*",
  "plugins": {
    "key-auth": {},
    "limit-count": {
      "rules": [
        {
          "count": "${http_x_rate_quota ?? 100}",
          "time_window": 60,
          "key": "${consumer_name}"
        }
      ],
      "rejected_code": 429
    }
  },
  "upstream": {
    "type": "roundrobin",
    "nodes": {
      "127.0.0.1:1980": 1
    }
  }
}
```

Now the same route handles all tiers:

| Tier | `X-Rate-Quota` Header | Effective Limit |
|------|----------------------|-----------------|
| Free | 100 | 100 req/min |
| Pro | 1000 | 1,000 req/min |
| Enterprise | 50000 | 50,000 req/min |

One route. One plugin configuration. All tiers.

### Example 2: Multi-Tenant Isolation with Variable Combination

For a multi-tenant SaaS API, you can combine variables to create isolated rate limit buckets per tenant per endpoint:

```json
{
  "uri": "/api/v1/*",
  "plugins": {
    "limit-count": {
      "rules": [
        {
          "count": 1000,
          "time_window": 60,
          "key": "${http_x_tenant_id} ${uri}"
        }
      ],
      "rejected_code": 429
    }
  },
  "upstream": {
    "type": "roundrobin",
    "nodes": {
      "127.0.0.1:1980": 1
    }
  }
}
```

Tenant A calling `/api/v1/users` and Tenant B calling the same endpoint get independent counters. Tenant A calling `/api/v1/orders` gets yet another counter. This creates a natural per-tenant-per-endpoint isolation without any route duplication.

### Example 3: Dynamic Concurrent Connection Limits

The `limit-conn` plugin also supports rules and variables, enabling dynamic concurrency control:

> **Prerequisite**: the per-consumer rule uses `${consumer_name}`, which requires an authentication plugin. Add `key-auth` to the route plugins and create a consumer before testing.
>
> **Note**: plain constant strings (e.g. `"global"`) are not supported as `key` values in the `rules` array due to a current APISIX limitation — the rule is silently skipped at runtime. Use a variable expression that always resolves instead, such as `"${http_host ?? global}"`. A fix has been filed at [apache/apisix#13180](https://github.com/apache/apisix/issues/13180).

```json
{
  "uri": "/api/v1/inference",
  "plugins": {
    "key-auth": {},
    "limit-conn": {
      "default_conn_delay": 0.1,
      "rules": [
        {
          "conn": 5,
          "burst": 2,
          "key": "${consumer_name}"
        },
        {
          "conn": 100,
          "burst": 20,
          "key": "${http_host ?? global}"
        }
      ],
      "rejected_code": 503
    }
  },
  "upstream": {
    "type": "roundrobin",
    "nodes": {
      "127.0.0.1:1980": 1
    }
  }
}
```

This limits each consumer to 5 concurrent connections while capping the total at 100 — preventing any single consumer from monopolizing backend capacity.

## AI Rate Limiting: Token Budget Management

> **Prerequisite**: `ai-rate-limiting` must be used alongside the `ai-proxy` plugin. Without `ai-proxy`, the plugin is silently inactive — it relies on `ai-proxy` to populate `ctx.picked_ai_instance_name` and `ctx.ai_token_usage` at runtime. The configuration below shows `ai-rate-limiting` in isolation for clarity; in production, add your `ai-proxy` configuration to the same route.
>
> **Note**: the global cap rule uses `"${http_host ?? global}"` instead of a plain `"global"` string. See the note in Example 3 for the reason.

For AI gateway use cases, the `ai-rate-limiting` plugin combines multiple rules with variable support for fine-grained token budget control:

```json
{
  "uri": "/v1/chat/completions",
  "plugins": {
    "ai-rate-limiting": {
      "limit_strategy": "total_tokens",
      "rules": [
        {
          "count": 10000,
          "time_window": 60,
          "key": "${consumer_name}_per_minute",
          "header_prefix": "consumer"
        },
        {
          "count": 500000,
          "time_window": 86400,
          "key": "${consumer_name}_per_day",
          "header_prefix": "daily"
        },
        {
          "count": 1000000,
          "time_window": 60,
          "key": "${http_host ?? global}",
          "header_prefix": "global"
        }
      ],
      "rejected_code": 429
    }
  },
  "upstream": {
    "type": "roundrobin",
    "nodes": {
      "127.0.0.1:1980": 1
    }
  }
}
```

This configuration enforces three simultaneous constraints:

1. **Per-consumer burst**: 10,000 tokens per minute per consumer
2. **Per-consumer daily**: 500,000 tokens per day per consumer
3. **Global capacity**: 1,000,000 tokens per minute across all consumers

As AI API costs scale directly with token usage, this kind of layered budget control is essential for production AI gateways.

## Combining Multiple Rules with Variables

The real power emerges when you combine both features. Here is a complete example for an API platform with tiered pricing:

> **Prerequisite**: add an authentication plugin (e.g. `key-auth`) to the route so that `${consumer_name}` is populated at runtime. The global cap rule uses `"${http_host ?? global}"` instead of a plain `"global"` string — see the note in Example 3 for the reason.

```json
{
  "uri": "/api/v1/*",
  "plugins": {
    "key-auth": {},
    "limit-count": {
      "rules": [
        {
          "count": "${http_x_burst_quota ?? 10}",
          "time_window": 1,
          "key": "${consumer_name}_per_second",
          "header_prefix": "burst"
        },
        {
          "count": "${http_x_sustained_quota ?? 500}",
          "time_window": 60,
          "key": "${consumer_name}_per_minute",
          "header_prefix": "sustained"
        },
        {
          "count": 100000,
          "time_window": 60,
          "key": "${http_host ?? global}",
          "header_prefix": "global"
        }
      ],
      "rejected_code": 429
    }
  },
  "upstream": {
    "type": "roundrobin",
    "nodes": {
      "127.0.0.1:1980": 1
    }
  }
}
```

The authentication layer sets per-consumer burst and sustained quotas via headers. APISIX enforces both per-consumer limits dynamically while maintaining a static global safety cap. No route duplication. No configuration drift between tiers.

## What's Next

The `limit-req` plugin (leaky bucket algorithm) does not yet support the `rules` array ([#13179](https://github.com/apache/apisix/issues/13179)). We welcome community contributions to bring it to feature parity.

We are also exploring deeper integration with external policy engines, enabling rate limiting quotas to be fetched from external key-value stores or policy services at runtime.

## Getting Started

Upgrade to APISIX 3.16:

```bash
# Docker
docker pull apache/apisix:3.16.0

# Helm
helm repo update
helm upgrade apisix apisix/apisix --set image.tag=3.16.0
```

Check the full documentation:

- [limit-count plugin](https://apisix.apache.org/docs/apisix/plugins/limit-count/)
- [limit-conn plugin](https://apisix.apache.org/docs/apisix/plugins/limit-conn/)
- [ai-rate-limiting plugin](https://apisix.apache.org/docs/apisix/plugins/ai-rate-limiting/)
