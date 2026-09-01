---
title: "Cache LLM responses with Redis: exact and semantic matching"
slug: redis-ai-cache
description: Test exact and semantic response caching in APISIX 3.18, including tenant isolation, streaming responses, and Redis failures.
category: cost
verification: validation-in-progress
owner: Apache APISIX community
difficulty: Intermediate
duration: 45 minutes
apisix_version: 3.18.0
external_version: Redis Open Source 8.10.1
integrations:
  - redis
plugins:
  - ai-proxy
  - ai-cache
reviewed_at: "2026-08-25"
evidence_url: https://github.com/apache/apisix/blob/0796d9c2cbedb1f8bf8194292ff526599f4fde20/apisix/plugins/ai-cache.lua
---

A `MISS` followed by a `HIT` is not enough to validate an AI cache. This cookbook checks that cache hits avoid model calls, semantic matching stays within the supported request format, tenants remain isolated, incomplete streams are not cached, and Redis failures fall back to the LLM.

## What you'll test

Starting with an empty Redis database, run the lab against the live OpenAI Chat and Embeddings APIs and check the following:

1. The first identical request is a miss and calls the chat provider once.
2. The second identical request is an exact hit and does not call the chat provider.
3. A paraphrased prompt produces a semantic hit; an unrelated prompt produces a miss.
4. After a semantic hit is copied into the exact cache, repeating the paraphrase produces an exact hit without another embedding call. If that copy fails, APISIX still serves the semantic hit and logs the error.
5. Consumer B cannot hit an entry warmed by Consumer A.
6. A complete supported SSE response can be reused, while an interrupted response cannot.
7. When the Redis service or the embedding endpoint is unavailable, APISIX continues to the live chat provider as a miss.

## Version and test requirements

The gateway code is pinned to the [APISIX 3.18.0 tag commit](https://github.com/apache/apisix/commit/0796d9c2cbedb1f8bf8194292ff526599f4fde20). Keep this page at **Validation in progress** until the lab records:

- the immutable APISIX and Redis image digests;
- the Redis server version and successful `FT.CREATE`/`FT.SEARCH` smoke test;
- chat and embedding provider names, model identifiers, region, and test time;
- provider-side call counts that do not rely on APISIX response headers;
- two runs from an empty environment and an independent retest by another operator.

A mock or fixture server cannot replace these checks. Without provider credentials, you can run the container and Redis Search preflight, but the cache result remains unverified.

[Open the pinned lab](https://github.com/apache/apisix-website/tree/master/examples/redis-ai-gateway). Its `check-infra.sh` can run without provider credentials; `test-cache.sh` requires the live OpenAI Chat and Embeddings APIs.

## Configuration

Start with the following `ai-cache` settings:

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

This snippet shows the cache settings only. The linked lab also configures the Route, Consumer authentication, provider credentials, private networks, and cleanup. It checks response headers and Redis state, but does not enable or scrape the APISIX Prometheus plugin. `include_consumer` works only after APISIX authenticates a Consumer. For production TLS connections, set `redis_ssl_verify: true`.

APISIX can forward client headers that are not part of the default AI cache key. The lab strips OpenAI organization, project, and beta-selection headers before proxying. In production, strip every client-controlled header that can change the provider response, or derive the value from trusted server-side state and add it to `cache_key.include_vars`.

## Test checklist

| Check | Expected result | What is not enough |
|---|---|---|
| Exact cache | `MISS` then `HIT`, byte-identical response body, chat-provider counter delta `+1` then `+0` | Inferring provider calls from the cache header alone |
| Semantic cache | Different prompt returns `HIT` with a similarity header at or above the configured threshold; unrelated prompt returns `MISS` | Hard-coding a similarity score that is not reproduced by the pinned embedding model |
| Semantic hit copied to exact cache | The repeated paraphrase is an exact `HIT` with embedding counter delta `+0` | A copy warning, or another embedding call on the repeat |
| Tenant isolation | Consumer B gets `MISS`; Consumer A still gets `HIT` | Trusting a caller-supplied tenant header without server-side validation |
| Streaming | Complete SSE is reusable; a deliberately interrupted SSE remains `MISS` on retry | Calling a partial stream cacheable or claiming token-paced replay |
| Failure behavior | A Redis outage returns a live model response with `MISS`; logs identify the backend failure without request bodies or secrets | Treating `MISS` as proof that the Redis service is healthy |

## Measure the result

Use the provider's own logs or counters to measure chat and embedding calls. If your test deployment also enables and scrapes the APISIX Prometheus plugin, use these metrics to inspect cache behavior:

- `apisix_ai_cache_hits_total{layer="exact"}`
- `apisix_ai_cache_hits_total{layer="semantic"}`
- `apisix_ai_cache_misses_total`
- `apisix_ai_cache_bypasses_total`
- `apisix_ai_cache_embedding_latency_bucket`

Calculate hit ratio as `hits / (hits + misses)` and report bypass coverage separately. Do not estimate savings from cache headers or cached `usage` fields alone. Compare the same fixed workload with caching enabled and disabled, using provider-reported usage, the workload's repetition rate, and a disclosed sample size.

## Before using this in production

- APISIX 3.18 cache storage uses a single Redis endpoint; this cookbook does not claim Redis Cluster or Sentinel support for `ai-cache`.
- Semantic matching applies only to plain-text OpenAI Chat requests. Tool calls, multimodal inputs, and other protocols are not supported by semantic caching.
- A cache hit bypasses any lower-priority guardrail plugin. When a guardrail policy changes, invalidate responses cached under the previous policy before serving them again.
- Never publish full prompts, cached responses, embeddings, API keys, provider request IDs, or full Redis keys.

## Cleanup

Delete the lab Routes and Consumers, remove only the cache index and keys created by this lab, and stop the isolated containers. Confirm that no file containing credentials is tracked. Never flush a shared Redis database.

Redis is a registered trademark of Redis Ltd. This community cookbook is not endorsed, supported, or certified by Redis Ltd.
