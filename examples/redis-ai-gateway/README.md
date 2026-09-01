# Apache APISIX 3.18 and Redis AI Gateway lab

This lab accompanies the Redis integration page and its two cookbooks. It pins the APISIX and Redis images, keeps Redis and the APISIX management interfaces off the host, and separates infrastructure checks from tests that call a live provider.

## Pinned runtime

- Apache APISIX 3.18.0, tag commit `0796d9c2cbedb1f8bf8194292ff526599f4fde20`
- `apache/apisix:3.18.0-debian@sha256:84e6b5e787e9f889ebff88161cb9a16599bafcffa236c6b54c7f779a0655940d`
- Redis Open Source 8.10.1 with its bundled Search module explicitly loaded
- `redis:8-alpine@sha256:becdda6c7f4b3fb42e42fd7f120bbf5c54c4caaaf16f26da24e4563d2c1f0576`

The images are pinned with multi-architecture registry digests. This lab runs only on `linux/amd64` and `linux/arm64` because the bundled modules in the official Redis Open Source 8.10.1 image are available only for those architectures. When sharing results, include the platform-specific image ID.

## Run the infrastructure preflight

Requirements: Docker Compose, Bash, `awk`, `cmp`, `curl`, `jq`, and OpenSSL.

```bash
./scripts/setup.sh
```

The setup script creates a mode-`0600` `.env` with a unique Compose project ID and generated Redis and Consumer secrets. It starts two APISIX nodes and a private, ephemeral Redis instance from a clean state, then checks:

- both APISIX Status APIs report ready;
- only gateway ports `127.0.0.1:9080` and `127.0.0.1:9081` are published;
- the missing-key and valid-key authentication paths behave as expected without calling a provider;
- the Redis service is not published to the host;
- the Redis service reports version 8.10.1 and accepts `FT._LIST`;
- Compose resolved the expected immutable image digests.

This preflight does **not** call an LLM, so it does not verify caching or quota behavior end to end.

## Run the OpenAI tests

Add a dedicated, least-privilege OpenAI API key to `.env`. The tests use `gpt-4o-mini` and `text-embedding-3-small` by default. They never print the key or prompt/response bodies.

Before proxying, the Routes remove the Consumer credential and any client-supplied OpenAI organization, project, or beta header. These headers can affect the provider response but are not part of the cache key. Access logs also omit raw query strings. Send the Consumer key in the `apikey` header; never put credentials in the URL.

```dotenv
OPENAI_API_KEY=replace-me
```

Then run:

```bash
./scripts/test-shared-quota.sh
./scripts/test-cache.sh
./scripts/test-failure-modes.sh
```

The quota test sends a live request through node A and waits for APISIX to write the provider's `usage.total_tokens` value to Redis. It then checks that node B applies the same counter and returns the configured `429`.

The cache test verifies an exact cross-node hit, byte-identical response-body replay, Consumer isolation, a semantic hit for a paraphrased prompt, semantic-to-exact backfill, and an unrelated miss. It never lowers the similarity threshold automatically.

The failure test compares cache fail-open behavior with rate limiting when `allow_degradation` is `false` and when it is `true`.

## Remaining validation

The public pages will remain **Validation in progress** until the following checks are also complete:

- provider-side chat and embedding call counters, correlated to each request;
- complete and interrupted SSE cases;
- two clean runs and a rerun by another operator;
- sanitized APISIX logs proving no credential or body leakage;
- live Redis Cluster and Sentinel failover tests before either mode is marked verified;
- a documented test date, machine architecture, provider region, and model identifiers.

APISIX records token usage after the provider responds, so a large response or concurrent requests can exceed the limit. This is not a prepaid budget. In APISIX 3.18.0, `ai-cache` uses one Redis endpoint; this lab does not test cache HA.

## Cleanup

```bash
./scripts/cleanup.sh
```

Cleanup removes only the containers and network for the lab's unique Compose project. Redis has no host port and its data is not persisted. The scripts never run `FLUSHALL` against an external service. Cleanup leaves the mode-`0600`, Git-ignored `.env` in place so you can run the lab again. Delete that file when you are finished, especially if it contains a provider key.

Redis is a registered trademark of Redis Ltd. This community lab is not endorsed, supported, or certified by Redis Ltd.
