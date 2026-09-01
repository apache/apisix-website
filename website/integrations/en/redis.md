---
title: Redis
slug: redis
description: Use Redis for AI response caching, shared token counters, and request quotas across APISIX nodes.
category: data
method: Built-in APISIX plugins
verification: validation-in-progress
owner: Apache APISIX community
apisix_version: 3.18.0
external_version: Redis Open Source 8.10.1
protocols:
  - RESP
reviewed_at: "2026-08-28"
evidence_url: https://github.com/apache/apisix/blob/0796d9c2cbedb1f8bf8194292ff526599f4fde20/apisix/plugins/ai-cache.lua
---

Apache APISIX 3.18 can use Redis for reusable LLM responses, shared token counters, and distributed request quotas. These features have different deployment and failure characteristics, so configure and operate them separately.

<div class="architecture-flow" aria-label="APISIX and Redis architecture">
  <span>AI client</span><span>→</span><span>Apache APISIX</span><span>↔</span><span>Redis</span>
</div>

## How APISIX uses Redis

| Use case | APISIX 3.18 behavior | Limits and operational notes |
|---|---|---|
| Exact response cache | Redis stores the body of an HTTP 200 AI response. The key includes a normalized request body and configured provider options. The default TTL is 3,600 seconds and the default maximum response is 1 MiB. | Forwarded headers are not part of the default key. If a header can change the provider response, remove it or map it to a trusted server-side variable and include that variable in `cache_key.include_vars`. APISIX 3.18 supports one Redis endpoint for the cache. It does not coalesce concurrent cache misses, honor upstream `Cache-Control`, or provide a purge API. A hit restores HTTP 200 and `Content-Type`; other upstream response headers are not replayed. |
| Semantic response cache | After an exact miss, APISIX can embed a plain-text OpenAI Chat prompt and query Redis Search for a similar cached response. | Semantic matching is limited to plain-text OpenAI Chat requests. Multimodal requests and non-empty tool or function calls bypass this layer. The exact layer remains enabled. |
| Shared token quota | `ai-rate-limiting` can store a fixed-window token counter in a Redis database so multiple APISIX nodes see the same usage. | Accounting happens after a model response supplies token usage. It is not a prepaid reservation: a large or concurrent response can cross the limit before a later request is rejected. |
| Shared request quota | `limit-count` with `policy: redis` stores request counters in Redis so different APISIX nodes use the same quota. | Choose the counter key from trusted state. Fixed and sliding windows are available. `sync_interval` reduces Redis round trips but lets the global count lag between synchronizations. The companion lab has not tested this path. |
| Streaming cache | A complete supported SSE response can be cached after APISIX sees the protocol terminal event. | Interrupted streams are not cached. JSON and SSE use separate entries. A cache hit replays the complete stored SSE immediately; it does not reproduce the original token cadence. |

Semantic caching requires Redis Search commands. The companion lab pins Redis Open Source 8.10.1 and checks that `FT._LIST` is available. This preflight confirms the Redis setup, not the LLM cache path. If you use an earlier Redis Open Source or Redis Stack release, pin and test that exact version.

## Isolation and security

By default, APISIX separates cache entries by Route, not by Consumer. To isolate tenants, authenticate each tenant as a distinct Consumer and set `cache_key.include_consumer: true`, or add a trusted server-side tenant variable to the key. This option does not isolate unauthenticated traffic, and a client-controlled header is not a tenant boundary. Remove any client-controlled header that can change provider routing or output. If a response must vary by another value, derive it from trusted server-side state and include it with `cache_key.include_vars`.

Store Redis credentials in an APISIX Secret and keep Redis on a private network. Enable certificate verification when using TLS, and do not expose cached prompts, embeddings, provider request IDs, or full Redis keys in logs or screenshots.

## Failure behavior

- Cache, vector-search, and embedding errors degrade to a cache miss, so APISIX continues to the LLM. A `MISS` header alone does not prove the Redis service is healthy.
- Shared quota behaves differently. A pre-request Redis check returns an error when `allow_degradation: false`; when set to `true`, APISIX lets the request continue without quota protection. This setting applies only to the pre-request check. If Redis fails before the log-phase write completes, the response may succeed without recording its token usage. Monitor APISIX for write errors.
- `limit-count` also follows `allow_degradation` when its Redis dependency fails. Redis Cluster and Sentinel policies are documented and covered by upstream tests, but this page does not claim their failover behavior was validated in the companion lab.
- A cache hit returns before `ai-rate-limiting` runs. It avoids an upstream model call and does not increase the Redis token counter.

## Observability

The APISIX Prometheus plugin exports cache hits by `exact` or `semantic` layer, misses, bypasses, and embedding-latency histograms. `ai-rate-limiting` does not export a dedicated Redis token-counter metric. To verify shared token usage, compare the response headers, Redis state, APISIX logs, and provider-reported usage.

## References

- [`ai-cache` source at the APISIX 3.18.0 tag](https://github.com/apache/apisix/blob/0796d9c2cbedb1f8bf8194292ff526599f4fde20/apisix/plugins/ai-cache.lua)
- [`ai-cache` schema](https://github.com/apache/apisix/blob/0796d9c2cbedb1f8bf8194292ff526599f4fde20/apisix/plugins/ai-cache/schema.lua)
- [Semantic-cache implementation](https://github.com/apache/apisix/blob/0796d9c2cbedb1f8bf8194292ff526599f4fde20/apisix/plugins/ai-cache/semantic.lua)
- [`ai-rate-limiting` source](https://github.com/apache/apisix/blob/0796d9c2cbedb1f8bf8194292ff526599f4fde20/apisix/plugins/ai-rate-limiting.lua)
- [`limit-count` source](https://github.com/apache/apisix/blob/0796d9c2cbedb1f8bf8194292ff526599f4fde20/apisix/plugins/limit-count.lua)
- [Redis Search module lifecycle](https://redis.io/docs/latest/operate/oss_and_stack/stack-with-enterprise/modules-lifecycle/)
- [Pinned two-node APISIX and Redis lab](https://github.com/apache/apisix-website/tree/master/examples/redis-ai-gateway)

The behavior above matches the APISIX 3.18.0 source, but runtime testing is not complete. Keep this page marked **Validation in progress** until the lab records provider-side chat and embedding call counts, complete and interrupted SSE results, two clean runs, sanitized logs, a rerun by another operator, and a separate validation of the Redis-backed `limit-count` request-quota path.

Redis is a registered trademark of Redis Ltd. This community integration is not endorsed, supported, or certified by Redis Ltd.
