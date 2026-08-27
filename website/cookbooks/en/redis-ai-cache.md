---
title: Cache LLM responses using Redis® software for exact and semantic matching
slug: redis-ai-cache
description: Build and validate an APISIX 3.18 response-cache path with exact hits, semantic matches, tenant isolation, complete-stream checks, and Redis® failure tests.
category: cost
verification: validation-in-progress
owner: Apache APISIX community
difficulty: Intermediate
duration: 45 minutes
apisix_version: 3.18.0
external_version: Redis® Open Source 8.10.1
integrations:
  - redis
plugins:
  - ai-proxy
  - ai-cache
reviewed_at: "2026-08-25"
evidence_url: https://github.com/apache/apisix/blob/0796d9c2cbedb1f8bf8194292ff526599f4fde20/apisix/plugins/ai-cache.lua
---

This cookbook sets a publication gate stricter than a `MISS` followed by a `HIT` with Redis® software. The gate requires proof that a real model was not called on a hit, semantic matching stays within its documented request shape, tenants cannot reuse each other's entries, incomplete streams are never cached, and a Redis® service outage does not make the LLM path unavailable.

## Outcome

From a clean Redis® database, the lab will prove these behaviors against the real OpenAI Chat and Embeddings APIs:

1. The first identical request is a miss and calls the chat provider once.
2. The second identical request is an exact hit and does not call the chat provider.
3. A calibrated paraphrase is a semantic hit; an unrelated prompt is a miss.
4. When the best-effort L1 backfill succeeds, repeating the paraphrase is an exact hit and does not call the embedding provider again. A backfill error is logged while the semantic hit is still served.
5. Consumer B cannot hit an entry warmed by Consumer A.
6. A complete supported SSE response can be reused, while an interrupted response cannot.
7. When the Redis® service or the embedding endpoint is unavailable, APISIX continues to the real chat provider as a miss.

## Pinned scope

The gateway code is pinned to the [APISIX 3.18.0 tag commit](https://github.com/apache/apisix/commit/0796d9c2cbedb1f8bf8194292ff526599f4fde20). Before this page changes to **E2E verified**, the lab must also record:

- the immutable APISIX and Redis® image digests;
- the Redis® server version and successful `FT.CREATE`/`FT.SEARCH` smoke test;
- chat and embedding provider names, model identifiers, region, and test time;
- sanitized provider call counters independent of APISIX response headers;
- two clean runs plus a second-operator reproduction.

No mock or fixture server can satisfy this gate. If provider credentials are unavailable, only the container and Redis® Search preflight may run; the cache result remains unverified.

[Open the pinned lab](https://github.com/apache/apisix-website/tree/master/examples/redis-ai-gateway). Its `check-infra.sh` can run without provider credentials; `test-cache.sh` requires the real OpenAI Chat and Embeddings APIs.

## Safe configuration shape

The tested Route must include all of these boundaries:

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
          "model": "<pinned-embedding-model>",
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

The runnable lab supplies the complete Route, Consumer authentication, provider configuration, private networks, and cleanup. It currently validates response headers and Redis® state; it does not enable or scrape the APISIX Prometheus plugin. The fragment above is the security contract, not a standalone deployment: `include_consumer` only works after APISIX authenticates a Consumer, and a production TLS connection must set `redis_ssl_verify: true`.

## Acceptance sequence

| Check | Observable evidence | Failure signal |
|---|---|---|
| Exact cache | `MISS` then `HIT`, byte-identical response body, chat-provider counter delta `+1` then `+0` | Inferring provider calls from the cache header alone |
| Semantic cache | Different prompt returns `HIT` with a similarity header at or above the configured threshold; unrelated prompt returns `MISS` | Hard-coding a similarity score that is not reproduced by the pinned embedding model |
| L2 to L1 backfill | Backfill succeeds; the repeated paraphrase is an exact `HIT` with embedding counter delta `+0` | A backfill warning, or another embedding call on the repeat |
| Tenant isolation | Consumer B gets `MISS`; Consumer A still gets `HIT` | Trusting a caller-supplied tenant header without server-side validation |
| Streaming | Complete SSE is reusable; a deliberately interrupted SSE remains `MISS` on retry | Calling a partial stream cacheable or claiming token-paced replay |
| Failure behavior | A Redis® outage returns a real model response with `MISS`; logs identify the backend failure without request bodies or secrets | Treating `MISS` as proof that the Redis® service is healthy |

## Measure the result

Use provider access counters for chat and embedding calls. In a separate deployment where the APISIX Prometheus plugin is enabled and scraped, use these series for cache behavior:

- `apisix_ai_cache_hits_total{layer="exact"}`
- `apisix_ai_cache_hits_total{layer="semantic"}`
- `apisix_ai_cache_misses_total`
- `apisix_ai_cache_bypasses_total`
- `apisix_ai_cache_embedding_latency_bucket`

Calculate hit ratio as `hits / (hits + misses)` and report bypass coverage separately. Do not translate cache headers or historical response `usage` fields directly into cost savings. A savings claim requires the same fixed request set with cache disabled and enabled, real provider usage, workload repetition rate, and disclosed sample size.

## Production boundaries

- APISIX 3.18 cache storage uses a single Redis® endpoint; this cookbook does not claim Redis® Cluster or Sentinel support for `ai-cache`.
- Semantic matching applies only to plain-text OpenAI Chat requests. Tool calls, multimodal inputs, and other protocols do not become semantically cacheable by configuration.
- A cache hit is not rescanned by a lower-priority guardrail plugin. Do not combine cache and newly changed safety policy without an explicit invalidation plan.
- Never publish full prompts, cached responses, embeddings, API keys, provider request IDs, or full Redis® keys as evidence.

## Cleanup

The lab cleanup must delete the APISIX Routes and Consumers, remove only the uniquely prefixed cache index and keys, stop the isolated containers, and confirm no secret-bearing environment file is tracked. It must not flush a shared Redis® database.

The command assets and captured results will be linked here after the real-service acceptance gate passes.

Redis is a registered trademark of Redis Ltd. Any rights therein are reserved to Redis Ltd. This community cookbook is not endorsed, supported, or certified by Redis®.
