---
title: Redis® software
slug: redis
description: Use Redis® software as the exact and semantic response-cache backend for APISIX AI Gateway, or as the shared token-counter backend across APISIX nodes.
category: data
method: Built-in APISIX plugins
verification: validation-in-progress
owner: Apache APISIX community
apisix_version: 3.18.0
external_version: Redis® Open Source 8.10.1
protocols:
  - RESP
reviewed_at: "2026-08-25"
evidence_url: https://github.com/apache/apisix/blob/0796d9c2cbedb1f8bf8194292ff526599f4fde20/apisix/plugins/ai-cache.lua
---

Apache APISIX 3.18 has two separate paths backed by Redis® software: `ai-cache` stores reusable LLM responses, while `ai-rate-limiting` shares post-response token counters across APISIX nodes. They have different topology and failure behavior, so choose and operate them independently.

<div class="architecture-flow" aria-label="APISIX and Redis® architecture">
  <span>AI client</span><span>→</span><span>Apache APISIX</span><span>↔</span><span>Redis® software</span>
</div>

## Capability scope

| Capability | APISIX 3.18 behavior | Important boundary |
|---|---|---|
| Exact response cache | Redis® software stores the body of an HTTP 200 AI response keyed by a normalized request body and configured provider options. The default TTL is 3,600 seconds and the default maximum response is 1 MiB. | Arbitrary forwarded headers are not part of the default key. Strip client-controlled provider-routing headers, or represent every response-determining value with a trusted server-side variable in `cache_key.include_vars`. The cache policy supports one Redis® endpoint in 3.18. It does not provide request coalescing, honor upstream `Cache-Control`, or expose a dedicated purge API. A hit reconstructs HTTP 200 and `Content-Type`; other upstream response headers are not stored or replayed. |
| Semantic response cache | After an exact miss, APISIX can embed a plain-text OpenAI Chat prompt and query Redis® Search for a similar cached response. | Semantic matching is limited to plain-text OpenAI Chat requests. Multimodal requests and non-empty tool or function calls bypass this layer. The exact layer remains enabled. |
| Shared token quota | `ai-rate-limiting` can store a fixed-window token counter in a Redis® database so multiple APISIX nodes see the same usage. | Accounting happens after a model response supplies token usage. It is not a prepaid reservation: a large or concurrent response can cross the limit before a later request is rejected. |
| Streaming cache | A complete supported SSE response can be cached after APISIX sees the protocol terminal event. | Interrupted streams are not cached. JSON and SSE use separate entries. A cache hit replays the complete stored SSE immediately; it does not reproduce the original token cadence. |

Semantic caching requires Redis® Search commands. The companion lab pins Redis® Open Source 8.10.1, and its infrastructure preflight checks that `FT._LIST` is available. That check is infrastructure evidence only; it does not verify the LLM cache path. For an earlier Redis® Open Source or Redis® Stack release, pin and test the exact version rather than assuming compatibility.

## Isolation and security

Cache entries are isolated by Route by default, but Consumers on the same Route can share them. For multi-tenant traffic, first authenticate each tenant as a distinct Consumer and then set `cache_key.include_consumer: true`, or include a trusted server-side tenant variable. The option alone does not isolate unauthenticated traffic, and a client-controlled header is not a tenant boundary. Strip any client-controlled header that can change provider routing or output before proxying; if a response-determining value must vary, derive it from trusted server-side state and include it with `cache_key.include_vars`.

Redis® credentials should use an APISIX secret reference. Keep the Redis® endpoint on a private network, enable TLS certificate verification where TLS is used, and do not expose cached prompts, embeddings, provider request IDs, or full Redis® keys in logs or screenshots.

## Failure behavior

- Cache, vector-search, and embedding errors degrade to a cache miss, so APISIX continues to the LLM. A `MISS` header alone does not prove the Redis® service is healthy.
- Shared quota is different. A pre-request Redis® quota check failure returns an error when `allow_degradation: false`, or lets the request continue without quota protection when it is `true`. This setting cannot fail closed after the LLM response: if the Redis® service fails between the access check and the asynchronous log-phase counter write, the response can succeed and the token increment can remain uncommitted; alert on write errors.
- A cache hit returns before `ai-rate-limiting` runs. It avoids an upstream model call and does not increase the Redis® token counter.

## Observability

The APISIX Prometheus plugin exports cache hits by `exact` or `semantic` layer, misses, bypasses, and embedding-latency histograms. `ai-rate-limiting` does not export a dedicated Redis® token-counter metric; validate it with response headers, Redis® state, APISIX logs, and provider usage together.

## Source-reviewed references

- [`ai-cache` source at the APISIX 3.18.0 tag](https://github.com/apache/apisix/blob/0796d9c2cbedb1f8bf8194292ff526599f4fde20/apisix/plugins/ai-cache.lua)
- [`ai-cache` schema](https://github.com/apache/apisix/blob/0796d9c2cbedb1f8bf8194292ff526599f4fde20/apisix/plugins/ai-cache/schema.lua)
- [Semantic-cache implementation](https://github.com/apache/apisix/blob/0796d9c2cbedb1f8bf8194292ff526599f4fde20/apisix/plugins/ai-cache/semantic.lua)
- [`ai-rate-limiting` source](https://github.com/apache/apisix/blob/0796d9c2cbedb1f8bf8194292ff526599f4fde20/apisix/plugins/ai-rate-limiting.lua)
- [Redis® Search module lifecycle](https://redis.io/docs/latest/operate/oss_and_stack/stack-with-enterprise/modules-lifecycle/)
- [Pinned two-node APISIX and Redis® lab](https://github.com/apache/apisix-website/tree/master/examples/redis-ai-gateway)

This page remains **Validation in progress** until the pinned lab records provider-side chat and embedding call counters, complete and interrupted SSE evidence, two clean runs, sanitized logs, and an independent second-operator reproduction. Source review establishes the intended 3.18.0 behavior; it is not runtime verification.

Redis is a registered trademark of Redis Ltd. Any rights therein are reserved to Redis Ltd. This community integration is not endorsed, supported, or certified by Redis®.
