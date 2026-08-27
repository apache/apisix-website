# Apache APISIX 3.18 with Redis® software AI Gateway lab

This lab supports the Redis® Integration page and its two Cookbooks. It pins the gateway and store images, keeps the Redis® service and APISIX management surfaces off the host, and separates infrastructure checks from real-provider functional checks.

## Pinned runtime

- Apache APISIX 3.18.0, tag commit `0796d9c2cbedb1f8bf8194292ff526599f4fde20`
- `apache/apisix:3.18.0-debian@sha256:84e6b5e787e9f889ebff88161cb9a16599bafcffa236c6b54c7f779a0655940d`
- Redis® Open Source 8.10.1 with its bundled Search module explicitly loaded
- `redis:8-alpine@sha256:becdda6c7f4b3fb42e42fd7f120bbf5c54c4caaaf16f26da24e4563d2c1f0576`

The image references are multi-architecture registry digests, but this Search-enabled lab supports only `linux/amd64` and `linux/arm64` because the official Redis® Open Source 8.10.1 image builds bundled modules only for those architectures. Record the platform-specific image ID in every published result.

## Run the infrastructure preflight

Requirements: Docker Compose, Bash, `awk`, `cmp`, `curl`, `jq`, and OpenSSL.

```bash
./scripts/setup.sh
```

The setup script creates a mode-`0600` `.env` with a random isolated Compose instance ID and random Redis® and Consumer secrets, recreates two APISIX nodes and one private ephemeral Redis® service from a clean state, and checks:

- both APISIX Status APIs report ready;
- only gateway ports `127.0.0.1:9080` and `127.0.0.1:9081` are published;
- the missing-key and valid-key authentication paths behave as expected without calling a provider;
- the Redis® service is not published to the host;
- the Redis® service reports version 8.10.1 and accepts `FT._LIST`;
- Compose resolved the expected immutable image digests.

This preflight does **not** call an LLM and is not cache or quota E2E evidence.

## Run real-provider checks

Add a dedicated, least-privilege OpenAI API key to `.env`. The tests use `gpt-4o-mini` and `text-embedding-3-small` by default. They never print the key or prompt/response bodies.

The Routes remove successful key-auth credentials before proxying, and the lab access-log format excludes raw query strings. Send the Consumer key in the `apikey` header; do not place credentials in URLs.

```dotenv
OPENAI_API_KEY=replace-me
```

Then run:

```bash
./scripts/test-shared-quota.sh
./scripts/test-cache.sh
./scripts/test-failure-modes.sh
```

The quota test sends one real request through node A, waits until post-response token usage is committed to the Redis® database, requires the counter to equal provider `usage.total_tokens`, then requires node B to return the configured `429` from the same counter.

The cache test verifies an exact cross-node hit, byte-identical response-body replay, Consumer isolation, one semantic paraphrase hit, semantic-to-exact backfill, and an unrelated miss. It never lowers the similarity threshold automatically.

The failure test distinguishes cache fail-open behavior from rate-limit behavior with `allow_degradation` disabled or explicitly enabled.

## What is still outside this lab

Passing these scripts is not enough to mark the public Cookbooks E2E verified. Publication additionally requires:

- provider-side chat and embedding call counters, correlated to each request;
- complete and interrupted SSE cases;
- two clean runs and an independent second-operator reproduction;
- sanitized APISIX logs proving no credential or body leakage;
- separate real failover profiles before claiming Redis® Cluster or Sentinel support;
- a documented test date, machine architecture, provider region, and model identifiers.

APISIX token accounting happens after the provider response and can overshoot under a large or concurrent response. It is not prepaid budget reservation. Cache storage supports one Redis® endpoint in APISIX 3.18.0; this lab does not claim cache HA.

## Cleanup

```bash
./scripts/cleanup.sh
```

Cleanup removes only the randomly named lab instance's containers and network. The lab does not publish or persist Redis® data, and its scripts never run `FLUSHALL` against an external service.

Redis is a registered trademark of Redis Ltd. Any rights therein are reserved to Redis Ltd. This community lab is not endorsed, supported, or certified by Redis®.
