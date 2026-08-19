---
title: "Release Apache APISIX 3.18.0"
authors:
  - name: "Abhishek Choudhary"
    title: "Author"
    url: "https://github.com/shreemaan-abhishek"
    image_url: "https://github.com/shreemaan-abhishek.png"
  - name: "Traky Deng"
    title: "Technical Writer"
    url: "https://github.com/kayx23"
    image_url: "https://github.com/kayx23.png"
keywords:
  - Apache APISIX
  - API Gateway
  - API Management Platform
  - New Release
  - Cloud Native
description: Apache APISIX 3.18.0 is released on Aug 24, 2026. This release introduces AI response caching, semantic model routing, new security plugins, L4 enhancements, observability improvements, and important upgrade considerations.
tags: [Community]
---

<!-- TODO: Replace Aug 24, 2026 with the final release date. -->

We are glad to present Apache APISIX 3.18.0 with new AI Gateway capabilities, stronger security defaults, L4 proxy enhancements, observability improvements, and reliability fixes across the gateway.

<!--truncate-->

This release introduces exact, semantic, and streaming response caching for LLM traffic; semantic model routing; Lakera Guard integration; an advanced LDAP authentication plugin; richer Prometheus metrics; and several improvements to stream proxying, health checks, logging, and encryption.

The release also contains backward-incompatible changes. Review the following migration notes before upgrading.

## Breaking Changes

The following changes affect existing behavior, defaults, configuration, or observability contracts. Use the upgrade plan under each item to identify affected deployments and prepare the necessary changes before rollout.

### Debug plugin reporting includes phases and execution order

The `Apisix-Plugins` response header now reports ordered `plugin-name#phase` entries instead of a de-duplicated list of plugin names. Update tools that parse this header.

**Upgrade plan:** If you consume `Apisix-Plugins`, update parsers to accept `plugin-name#phase`, repeated plugin names across phases, and ordered entries. Do not treat inferred post-header phases such as `body_filter` or `log` as proof that the phase executed; verify representative routes if tooling makes decisions from this header.

For more information, see [PR #13710](https://github.com/apache/apisix/pull/13710).

### Request and response buffering is limited by default

Several plugins that buffer request or response bodies now default to a 64 MiB limit. Oversized request bodies can be rejected, while oversized responses can be truncated or passed through without caching, depending on the plugin. Configure `max_req_body_size` or `max_resp_body_size` on an affected plugin where larger payloads are expected.

**Upgrade plan:** If you use an affected body-buffering plugin, identify routes that can exceed 64 MiB and set its `max_req_body_size` or `max_resp_body_size` before upgrading. Test only the applicable path: oversized requests are rejected; response-transforming plugins can truncate; memory `proxy-cache` passes an oversized response through without caching it.

For more information, see [PR #13705](https://github.com/apache/apisix/pull/13705).

### Logger backlogs drop excess entries by default

Batch-processor-based loggers now default `max_pending_entries` to `8192`. When a logging backend cannot keep up, new entries above the limit are discarded to protect worker memory. Increase the limit only after accounting for log body sizes and available memory.

**Upgrade plan:** If you use a batch-processor-based logger, compare its expected backlog, `batch_max_size`, and logged body sizes with each worker's memory budget. Set `max_pending_entries` explicitly when `8192` is unsuitable, alert on discard messages, and test a slow or unavailable logging backend; larger logged bodies can require a lower limit.

For more information, see [PR #13826](https://github.com/apache/apisix/pull/13826).

### AWS content moderation uses decoded AI content

`ai-aws-content-moderation` now runs after `ai-proxy` or `ai-proxy-multi`, moderates protocol-decoded prompt content, and returns provider-compatible deny responses. The plugin requires AI proxy context, its priority changes from `1050` to `1031`, and the default deny status is now `200`.

**Upgrade plan:** If you use `ai-aws-content-moderation`, pair it with `ai-proxy` or `ai-proxy-multi` wherever requests must actually be moderated. Pin `deny_code: 400` if clients rely on the previous HTTP error contract, and choose `fail_mode` explicitly for traffic the AI proxy cannot recognize. Test an allowed prompt, a denied prompt, and an unrecognized request shape.

For more information, see [PR #13647](https://github.com/apache/apisix/pull/13647).

### Aliyun request moderation defaults to the latest user turn

`ai-aliyun-content-moderation` now defaults to moderating the latest consecutive block of `user` messages. The later `request_check_roles` option can include `user`, `tool`, and `system`; `request_check_mode` applies to `user` and `tool`, while selected `system` content is checked on every request. The plugin cannot select `assistant` history, so no configuration exactly restores the previous all-message behavior.

**Upgrade plan:** If you use request moderation, choose both fields explicitly. To approximate the previous coverage, set `request_check_mode: all` and `request_check_roles: ["user", "tool", "system"]`; this still does not inspect `assistant` history, and tool-result extraction depends on the AI protocol. If the previous policy relied on those uncovered messages, add a separate control or revise the policy. Test earlier and latest user turns, selected system content, and tool output in every protocol you accept.

For more information, see [PR #13598](https://github.com/apache/apisix/pull/13598).

### SLS logger verifies TLS certificates by default

`sls-logger` now defaults `ssl_verify` to `true` and sends SNI. Custom or self-signed logging endpoints must use a trusted certificate or explicitly set `ssl_verify: false`.

**Upgrade plan:** If you use `sls-logger`, test each configured TLS endpoint with the APISIX trust store and the exact configured hostname. Custom or self-signed endpoints need a trusted chain and hostname-valid certificate; use `ssl_verify: false` only as a deliberate temporary exception after assessing the credential-exposure risk.

For more information, see [PR #13785](https://github.com/apache/apisix/pull/13785).

### OpenID Connect validation fails closed

The `openid-connect` plugin now rejects tokens when the trusted issuer cannot be determined, treats `claim_validator.audience.match_with_client_id` as requiring an audience claim, and enforces `required_scopes` in authorization-code sessions. Review providers that issue opaque access tokens or omit scope claims.

**Upgrade plan:** Test only the OIDC checks you configure. For `match_with_client_id`, confirm issued tokens contain a matching audience. For local JWT validation when discovery can be unavailable, configure `claim_validator.issuer.valid_issuers`. For authorization-code routes with `required_scopes`, confirm the access token is a JWT with a string `scope` claim or the ID token carries it; opaque access tokens without either claim will be denied. Exercise both bearer and session flows that your deployment uses.

For more information, see [PR #13829](https://github.com/apache/apisix/pull/13829).

### Duplicate consumer authentication keys are checked on write

The Admin API now checks writes for duplicate lookup keys across Consumers and credentials for `key-auth`, `basic-auth`, `jwt-auth`, `hmac-auth`, and LDAP authentication, and rejects detected collisions with 400. The protection is best effort: the locally watched Consumer view can lag rapid or concurrent writes, and incoming Secret or environment references cannot be resolved for this check.

**Upgrade plan:** Independently audit existing Consumers and credentials for duplicate authentication keys, including values supplied through Secret or environment references, and resolve collisions before rollout. Do not rely on the new Admin API check as the only uniqueness control; serialize sensitive migrations where practical, then update and authenticate with each affected Consumer to verify ownership.

For more information, see [PR #13529](https://github.com/apache/apisix/pull/13529).

### Forwarded-header handling changes

`$var_x_forwarded_proto` is removed, while `$var_x_forwarded_host` and `$var_x_forwarded_port` are no longer writable from Lua. Plugins should use `core.request.set_header` to change upstream forwarding headers. Trusted peers that omit `X-Forwarded-Host` or `X-Forwarded-Port` now receive APISIX-observed values, and logger payloads include sanitized forwarded headers.

**Upgrade plan:** If custom plugins, NGINX snippets, or log formats reference the three `$var_x_forwarded_*` variables, replace Lua writes with `core.request.set_header` and remove reads of the deleted `$var_x_forwarded_proto`. If log consumers enforce a fixed request-header schema, allow the three sanitized headers. Deployments with `trusted_addresses` should also test trusted peers that omit forwarded host or port values; the default no-boundary request path otherwise retains its upstream behavior.

For more information, see [PR #13803](https://github.com/apache/apisix/pull/13803).

### AI proxy defaults to the FFI HTTP client

`ai-proxy`, `ai-proxy-multi`, and `ai-request-rewrite` now default to `ngx_http_ffi_client`. The APISIX Runtime pinned by this release includes the compatible v0.1.3 client. Operators using an older or custom runtime without that module or its resolver hook must upgrade the runtime or set `plugin_attr.ai-proxy.http_client: lua-resty-http`.

**Upgrade plan:** The runtime pinned by APISIX 3.18.0 needs no compatibility change. If you use an older or custom runtime, inspect `nginx -V` and confirm a compatible `ngx_http_ffi_client` revision with the resolver hook used by v0.1.3; module presence alone is insufficient. Upgrade the runtime or set `plugin_attr.ai-proxy.http_client: lua-resty-http` before AI traffic, then test DNS resolution, TLS, buffered responses, and streaming paths that your providers use.

For more information, see [PR #13778](https://github.com/apache/apisix/pull/13778).

### Large `post_arg.*` route matches are bounded

JSON and multipart bodies read for `post_arg.*` route predicates now default to a 64 MiB cap. A larger body no longer matches the predicate and can result in a 404. Raise `apisix.max_post_args_readable_size` or set it to `0` to retain unlimited reads.

**Upgrade plan:** If a Route matches `post_arg.*` against JSON or multipart bodies, determine its maximum expected request size and set `apisix.max_post_args_readable_size` explicitly when 64 MiB is insufficient. Setting `0` restores unlimited reads but also restores the memory-exhaustion risk. Test an over-limit request and confirm whether it should fall through to another Route or return 404.

For more information, see [PR #13601](https://github.com/apache/apisix/pull/13601).

### Existing LDAP TLS verification is now effective

The LDAP client dependency upgrade makes `ldap-auth.tls_verify: true` perform certificate verification instead of acting as a no-op. Deployments with self-signed or hostname-mismatched LDAP certificates must install a trusted matching certificate or explicitly disable verification where appropriate.

**Upgrade plan:** If an existing `ldap-auth` deployment enables `tls_verify`, validate the certificate chain and SAN against `ldap_uri` before rollout and configure the required trusted CA. Test each encrypted connection mode actually in use, such as LDAPS or StartTLS; configurations with verification disabled do not gain this failure mode.

For more information, see [PR #13762](https://github.com/apache/apisix/pull/13762).

### LDAP Consumer DNs use RFC 4514 escaping

`ldap-auth` now looks up Consumers using the escaped bind DN returned by the LDAP client. Consumers for usernames containing characters such as commas or plus signs must use the RFC 4514-escaped `user_dn` form.

**Upgrade plan:** If LDAP usernames can contain DN-special characters, generate the bind DN with LDAP-aware RFC 4514 escaping and update the corresponding Consumer `user_dn` before upgrading. Usernames without those characters are unchanged. Test both LDAP bind success and association with the intended Consumer.

For more information, see [PR #13805](https://github.com/apache/apisix/pull/13805).

### Prometheus LLM latency gains a `type` label

`apisix_llm_latency` now distinguishes `type="total"` from `type="ttft"`, and streaming requests emit both observations. Update dashboards, alerts, and recording rules to select `type="total"` when they need the previous total-latency meaning.

**Upgrade plan:** If dashboards, alerts, or recording rules use `apisix_llm_latency`, add `type="total"` where the old total-latency meaning is required, or aggregate by `type` intentionally. Validate cardinality and sample counts for streaming traffic because each streaming request now contributes one `total` and one `ttft` observation; non-streaming traffic contributes only `total`.

For more information, see [PR #13487](https://github.com/apache/apisix/pull/13487).

### AI security plugins default to skipping unrecognized traffic

The new `fail_mode` option defaults to `skip` for `ai-aliyun-content-moderation`, `ai-aws-content-moderation`, and `ai-prompt-guard`. Unrecognized traffic now passes through unchecked whether the plugin is exposed through a Route, Service, or Consumer. This replaces Aliyun's previous 500 and AWS's raw-body moderation behavior, while preserving `ai-prompt-guard`'s previous pass-through outcome.

**Upgrade plan:** If you use any of these plugins, classify each Route, Service, or Consumer binding by whether it can receive mixed or unrecognized traffic. Set `fail_mode: error` where bypass is unacceptable; use `skip` or `warn` deliberately where mixed traffic must pass. Test non-JSON bodies, unsupported AI protocols, and requests that do not pass through `ai-proxy`.

For more information, see [PR #13489](https://github.com/apache/apisix/pull/13489).

## New Features

APISIX 3.18.0 expands AI Gateway, authentication, L4 proxying, observability, rate limiting, logging, and traffic-management capabilities. The following sections explain the use cases, behavior, and key configuration choices for each major addition.

### Cache LLM responses with `ai-cache`

The new `ai-cache` plugin reduces latency and upstream token cost for repetitive LLM workloads such as support assistants, document Q&A, translation, and prompt-based automation. It supports three complementary capabilities:

- An exact Redis-backed L1 cache for byte-equivalent request semantics.
- An optional semantic L2 cache that embeds prompts with OpenAI or Azure OpenAI and searches RediSearch by cosine similarity.
- Complete SSE capture and replay for supported streaming providers, with JSON and SSE entries stored separately.

Cache keys include the client protocol, effective model and provider, response-determining parameters, and the selected AI instance. They can also isolate by Route, Consumer, or selected NGINX variables. Redis and embedding failures fail open as a normal miss, so the cache does not become an availability dependency.

The following example enables exact and semantic caching. The first request populates both layers; a later paraphrase can be served from L2 when its similarity clears the configured threshold.

```json
{
  "ai-cache": {
    "redis_host": "127.0.0.1",
    "redis_port": 6379,
    "layers": ["exact", "semantic"],
    "semantic": {
      "similarity_threshold": 0.9,
      "embedding": {
        "openai": {
          "model": "text-embedding-3-small",
          "api_key": "$env://OPENAI_API_KEY"
        }
      },
      "vector_search": {
        "redis": {}
      }
    }
  }
}
```

For more information, see [PR #13578](https://github.com/apache/apisix/pull/13578), [PR #13632](https://github.com/apache/apisix/pull/13632), and [PR #13644](https://github.com/apache/apisix/pull/13644).

### Route prompts to models by meaning

`ai-proxy-multi` adds a `semantic` balancing algorithm for deployments where the available models are not interchangeable. A single endpoint can route coding prompts to a capable model, translation to a lower-cost model, and unmatched traffic to a general fallback without exposing provider topology to clients.

APISIX embeds each instance's natural-language examples once and caches the resulting reference vectors by configuration version. Each request requires one prompt-embedding call, followed by in-process cosine comparison. No vector database is needed. If embedding fails or no score clears the threshold, the request goes to the configured fallback instance.

```json
{
  "ai-proxy-multi": {
    "balancer": {
      "algorithm": "semantic",
      "threshold": 0.6
    },
    "semantic_opts": {
      "fallback": "general",
      "embeddings": {
        "provider": "openai",
        "model": "text-embedding-3-small",
        "auth": {
          "header": {
            "Authorization": "Bearer $env://EMBEDDING_API_KEY"
          }
        }
      }
    },
    "instances": [
      {
        "name": "code",
        "provider": "openai",
        "weight": 1,
        "auth": {"header": {"Authorization": "Bearer $env://OPENAI_API_KEY"}},
        "options": {"model": "gpt-4o"},
        "override": {"endpoint": "https://api.openai.com/v1/chat/completions"},
        "examples": ["debug this stack trace", "write a Python function"]
      },
      {
        "name": "general",
        "provider": "openai",
        "weight": 1,
        "auth": {"header": {"Authorization": "Bearer $env://OPENAI_API_KEY"}},
        "options": {"model": "gpt-4o-mini"},
        "override": {"endpoint": "https://api.openai.com/v1/chat/completions"},
        "examples": ["answer a general question"]
      }
    ]
  }
}
```

Semantic selection is best-effort routing, not a content-security control, and does not yet provide health-aware retry after an instance is selected.

For more information, see [PR #13676](https://github.com/apache/apisix/pull/13676).

### Protect LLM requests and responses with Lakera Guard

The new `ai-lakera-guard` plugin integrates with the Lakera Guard v2 API to detect prompt injection, sensitive information, policy violations, and malicious links at the gateway. It can scan requests, responses, or both, so applications do not need to implement the same guardrail integration independently.

In `block` mode, flagged traffic is replaced with a provider-compatible refusal body. Streaming output is buffered before release so flagged tokens do not reach the client. In `alert` mode, operators can observe verdicts before enforcing them. Lakera API failures are controlled separately through `fail_open`, making the availability-versus-enforcement decision explicit.

```json
{
  "ai-lakera-guard": {
    "api_key": "$env://LAKERA_API_KEY",
    "direction": "both",
    "action": "alert",
    "fail_open": true,
    "reveal_failure_categories": false
  }
}
```

A practical rollout is to begin with `action: alert` and `fail_open: true`, inspect detector results and false positives, then move selected Routes to `block`. For strict output enforcement, use `fail_open: false`; streaming responses are then buffered so an unavailable scanner cannot leak unchecked output.

For more information, see [PR #13570](https://github.com/apache/apisix/pull/13570) and [PR #13606](https://github.com/apache/apisix/pull/13606).

### Moderate more AI traffic with AWS and Aliyun

AWS moderation can now inspect non-streaming and streaming responses in addition to requests. Realtime mode checks batches while a response is streaming and can replace the remainder immediately; final-packet mode scores the assembled output and records a risk level. Long content is split at UTF-8 boundaries and batched within AWS Comprehend's segment limits.

The role controls differ slightly between providers. AWS can select `user`, `tool`, `assistant`, and `system`; Aliyun can select `user`, `tool`, and `system`. Selected turn roles follow latest-turn or all-history behavior, while selected system content is checked on every request. OpenAI's `developer` role is treated as system-level content.

```json
{
  "ai-aws-content-moderation": {
    "comprehend": {
      "access_key_id": "$env://AWS_ACCESS_KEY_ID",
      "secret_access_key": "$env://AWS_SECRET_ACCESS_KEY",
      "region": "us-east-1"
    },
    "request_check_roles": ["user", "tool", "system"],
    "request_check_mode": "last",
    "check_response": true,
    "stream_check_mode": "realtime"
  }
}
```

These controls help Agent and MCP workloads moderate tool output and potentially poisoned system instructions without repeatedly sending the entire conversation history to the moderation provider.

For more information, see [PR #13735](https://github.com/apache/apisix/pull/13735), [PR #13773](https://github.com/apache/apisix/pull/13773), [PR #13767](https://github.com/apache/apisix/pull/13767), [PR #13646](https://github.com/apache/apisix/pull/13646), and [PR #13780](https://github.com/apache/apisix/pull/13780).

### Add advanced LDAP authentication

The new `ldap-auth-advanced` plugin supports directories where a username cannot be converted directly into a bind DN. It first searches for the user and then binds as the resolved DN, covering common Active Directory deployments that authenticate with attributes such as `sAMAccountName`.

Search can use a service account or anonymous bind. The plugin supports LDAPS, StartTLS, certificate verification, connection pooling, LDAP filter escaping, bounded searches, and Consumer association by `user_dn`. Authentication failures return 401, while directory transport and configuration failures remain distinguishable as server errors.

```json
{
  "ldap-auth-advanced": {
    "ldap_uri": "ldap.example.com:636",
    "use_ldaps": true,
    "ssl_verify": true,
    "base_dn": "ou=users,dc=example,dc=org",
    "attribute": "sAMAccountName",
    "bind_dn": "cn=apisix,ou=services,dc=example,dc=org",
    "ldap_password": "$env://LDAP_BIND_PASSWORD"
  }
}
```

By default, successful authentication must map to an APISIX Consumer. Set `consumer_required` deliberately if the directory identity should be authenticated without Consumer-based policies.

For more information, see [PR #13762](https://github.com/apache/apisix/pull/13762).

### Improve stream and L4 proxying

Stream listeners can now enable or disable inbound and outbound PROXY protocol independently per TCP port. This removes the previous all-or-nothing global behavior and lets one APISIX instance serve clients and upstreams with different protocol requirements.

When APISIX is behind a trusted load balancer, `nginx_config.stream.real_ip_from` adopts the client address from the inbound PROXY header. That address is then available to Stream plugins and can be rebuilt into the header sent upstream. L4 TLS upstreams can also receive a client certificate from inline configuration or `tls.client_cert_id`.

```yaml
apisix:
  proxy_mode: http&stream
  stream_proxy:
    tcp:
      - addr: 9100
        proxy_protocol: true
        proxy_protocol_to_upstream: true
nginx_config:
  stream:
    real_ip_from:
      - 10.0.0.0/8
```

Prometheus complements these controls with live active-connection gauges, termination status, and downstream/upstream ingress and egress bandwidth per listening address. The metrics require the APISIX Runtime included with this release and degrade gracefully on older runtimes.

For more information, see [PR #13561](https://github.com/apache/apisix/pull/13561), [PR #13700](https://github.com/apache/apisix/pull/13700), [PR #13596](https://github.com/apache/apisix/pull/13596), and [PR #13796](https://github.com/apache/apisix/pull/13796).

### Expand Prometheus controls and AI metrics

Prometheus adds AI cache hit, miss, and bypass counters, an embedding-latency histogram, LLM prompt and completion token distributions, and separate total-latency and TTFT observations. These metrics make it possible to measure cache effectiveness, embedding overhead, prompt-size percentiles, and streaming responsiveness directly from the gateway.

High-cardinality deployments can collapse selected built-in label values through plugin metadata without removing labels from the metric schema. Client-supplied model label values are also capped at 128 bytes. Library upgrades fix duplicate series, a 100% CPU loop when the metric dictionary fills, and failure to reclaim expired entries.

```json
{
  "disabled_labels": {
    "http_status": ["node", "consumer"],
    "http_latency": ["node"],
    "llm_prompt_tokens": ["request_llm_model"]
  }
}
```

Apply `disabled_labels` through `/apisix/admin/plugin_metadata/prometheus`. Structural labels such as HTTP status code and latency type cannot be disabled because collapsing them would merge measurements with different meanings.

For more information, see [PR #13659](https://github.com/apache/apisix/pull/13659), [PR #13202](https://github.com/apache/apisix/pull/13202), [PR #13637](https://github.com/apache/apisix/pull/13637), [PR #13602](https://github.com/apache/apisix/pull/13602), [PR #13708](https://github.com/apache/apisix/pull/13708), and [PR #13754](https://github.com/apache/apisix/pull/13754).

### Share rate limits through Redis

`ai-rate-limiting` can now store token counters in Redis, Redis Cluster, or Redis Sentinel, allowing multiple APISIX nodes to enforce one quota. The existing `local` policy remains the default and continues to maintain a separate counter per gateway node.

`limit-count` adds three independent controls: a Sentinel backend for high availability, sliding-window counters that smooth boundary bursts, and delayed synchronization that batches Redis updates for high-throughput workloads. Delayed sync trades short-lived global accuracy for fewer network round trips; omit `sync_interval` when exact per-request Redis accounting is required.

```json
{
  "limit-count": {
    "count": 5000,
    "time_window": 60,
    "key": "consumer_name",
    "key_type": "var",
    "window_type": "sliding",
    "policy": "redis-sentinel",
    "redis_sentinels": [
      {"host": "10.0.0.1", "port": 26379},
      {"host": "10.0.0.2", "port": 26379}
    ],
    "redis_master_name": "mymaster",
    "sync_interval": 1
  }
}
```

The sliding-window and delayed-sync implementations also receive atomicity and quota-calculation fixes in this release, so the new modes should be adopted together with the full 3.18.0 patch set.

For more information, see [PR #13670](https://github.com/apache/apisix/pull/13670) and [PR #13443](https://github.com/apache/apisix/pull/13443).

### Enhance OpenID Connect client flows

The `openid-connect` plugin adds Pushed Authorization Requests (PAR), DPoP proof generation for token and userinfo calls, and client assertion algorithm and audience controls. PAR and DPoP are opt-in and use nested configuration objects; DPoP private keys are encrypted at rest.

Applications that need the original signed ID token can enable `set_raw_id_token_header`, which forwards it as `X-Raw-ID-Token` in the authorization-code session flow. This differs from `X-ID-Token`, which contains encoded decoded claims rather than the provider's signed JWT.

```json
{
  "openid-connect": {
    "client_id": "apisix",
    "client_secret": "$env://OIDC_CLIENT_SECRET",
    "discovery": "https://idp.example.com/.well-known/openid-configuration",
    "redirect_uri": "https://gateway.example.com/callback",
    "par": {
      "enabled": true
    },
    "set_raw_id_token_header": true,
    "session": {
      "secret": "$env://OIDC_SESSION_SECRET"
    }
  }
}
```

The plugin also recovers more gracefully from browser-flow failures. A stale callback or `temporarily_unavailable` response can restart authentication from the original URL, with a bounded retry counter to prevent redirect loops. Deliberate outcomes such as `access_denied` are not retried.

For more information, see [PR #13649](https://github.com/apache/apisix/pull/13649), [PR #13616](https://github.com/apache/apisix/pull/13616), [PR #13712](https://github.com/apache/apisix/pull/13712), and [PR #13825](https://github.com/apache/apisix/pull/13825).

### Enrich logging and protect stored credentials

Logger plugins support `log_format_extra`, which overlays selected fields onto the default structured log instead of replacing it. This is useful when adding tenant, upstream, or business context while retaining request headers, response data, latency fields, APISIX version, and resource identifiers.

```json
{
  "log_format_extra": {
    "upstream_host": "$upstream_unresolved_host",
    "tenant": "$http_x_tenant_id"
  }
}
```

Kafka logging can connect to TLS-enabled brokers, and Produce API version `2` can be selected when broker-side message timestamps are required. The Kafka output of `error-log-logger` receives the same TLS capability.

Credential storage is also hardened: custom Elasticsearch and Loki headers, Redis passwords in rate-limiting plugins, Sentinel passwords, and inline Stream upstream client keys are encrypted at rest when data encryption is enabled. Debug logging paths that exposed serialized logger payloads or Kafka SASL credentials have been removed.

For more information, see [PR #13568](https://github.com/apache/apisix/pull/13568), [PR #13607](https://github.com/apache/apisix/pull/13607), [PR #13521](https://github.com/apache/apisix/pull/13521), [PR #13612](https://github.com/apache/apisix/pull/13612), [PR #13784](https://github.com/apache/apisix/pull/13784), and [PR #13624](https://github.com/apache/apisix/pull/13624).

### Add routing, health-check, and encryption options

APISIX can keep `%2F` encoded while matching parameterized Routes, allowing a value such as `cat%2Fdog` to remain one path parameter rather than becoming two segments. The option is global, disabled by default, and only affects matching and captured parameters; downstream phases continue to see the normalized URI.

Active health checks can send a custom HTTP method and request body. This is useful for upstreams that cannot be meaningfully checked with a bodyless GET, including LLM endpoints that require a minimal chat-completion POST.

```json
{
  "checks": {
    "active": {
      "type": "https",
      "http_method": "POST",
      "http_path": "/v1/chat/completions",
      "http_req_body": "{\"model\":\"health-check\",\"messages\":[{\"role\":\"user\",\"content\":\"ping\"}]}"
    }
  }
}
```

The data-encryption keyring now accepts 16-byte AES-128 and 32-byte AES-256 keys in the same rotation set. Operators can place a new AES-256 key first while retaining older AES-128 keys for decryption. Default shared dictionaries are also larger for Prometheus, discovery, and tracing data that cannot safely evict entries when full.

For more information, see [PR #13626](https://github.com/apache/apisix/pull/13626), [PR #13726](https://github.com/apache/apisix/pull/13726), [PR #13756](https://github.com/apache/apisix/pull/13756), and [PR #13688](https://github.com/apache/apisix/pull/13688).

## Bug Fixes

This release also resolves correctness, security, and reliability issues across major gateway subsystems. The fixes are grouped by affected area so operators can quickly identify the changes relevant to their deployments.

### AI Gateway correctness and protocol compatibility

AI proxying now preserves more of the upstream provider's intent and keeps retries isolated from earlier attempts. Clients receive the original 429/5xx error body and content type when a request is not retried; when fallback does occur, each instance rebuilds its request from the untouched client body so model options do not leak between instances. AI latency variables also use milliseconds consistently on successful and error responses. See [PR #13565](https://github.com/apache/apisix/pull/13565), [PR #13793](https://github.com/apache/apisix/pull/13793), and [PR #13711](https://github.com/apache/apisix/pull/13711).

Protocol conversion is more resilient and faithful:

- Anthropic clients no longer hang when an upstream stream ends before opening a content block, and invalid `tool_call` arguments no longer discard an otherwise usable response. See [PR #13583](https://github.com/apache/apisix/pull/13583) and [PR #13599](https://github.com/apache/apisix/pull/13599).
- Anthropic tool-result ordering, tool-name mapping, reasoning effort, structured output, and message shaping now align more closely with OpenAI-compatible upstream expectations. See [PR #13674](https://github.com/apache/apisix/pull/13674).
- Structured and multimodal message content is flattened consistently for text consumers while remaining distinct in exact cache keys; semantic caching bypasses prompts containing non-text state. See [PR #13634](https://github.com/apache/apisix/pull/13634) and [PR #13654](https://github.com/apache/apisix/pull/13654).
- Realtime moderation no longer counts one upstream chunk multiple times when protocol conversion fans it out into several client events. See [PR #13765](https://github.com/apache/apisix/pull/13765).

Internal requests from `ai-request-rewrite` no longer forward the downstream client's `Authorization` or `Cookie` headers to the configured LLM endpoint. The transparent `ai-proxy` path still forwards client headers as documented. See [PR #13699](https://github.com/apache/apisix/pull/13699).

### Authentication and identity security

Authentication plugins now reject malformed input cleanly and prevent client-controlled identity data from reaching upstream services:

- Malformed JWT signatures return 401 rather than triggering a 500, while `jwe-decrypt` correctly allows a missing token when `strict` is disabled. See [PR #13518](https://github.com/apache/apisix/pull/13518) and [PR #13822](https://github.com/apache/apisix/pull/13822).
- `wolf-rbac` and `attach-consumer-label` always remove client-supplied identity headers before applying trusted identity data. See [PR #13696](https://github.com/apache/apisix/pull/13696) and [PR #13590](https://github.com/apache/apisix/pull/13590).
- `key-auth` reports its real failure reason through `multi-auth`, `basic-auth` validates `anonymous_consumer`, and `hmac-auth` reliably removes credentials when requested. See [PR #13693](https://github.com/apache/apisix/pull/13693), [PR #13682](https://github.com/apache/apisix/pull/13682), and [PR #13820](https://github.com/apache/apisix/pull/13820).

CAS single-logout callbacks now stop at the plugin instead of being proxied upstream, and Casdoor sessions expire with their access tokens. Request IDs generated with the `nanoid` algorithm now use a CSPRNG and no longer suffer duplicate IDs, malformed output, or file-descriptor leaks. See [PR #13610](https://github.com/apache/apisix/pull/13610), [PR #13500](https://github.com/apache/apisix/pull/13500), and [PR #13508](https://github.com/apache/apisix/pull/13508).

### Health checks and load balancing

Consistent-hash rings now remain tied to configured nodes and weights while unhealthy targets are skipped at selection time, preventing healthy keys from moving unnecessarily. Least-connection balancing retains live load across scaling events and releases Stream connections correctly, so a newly added empty node is preferred over already-loaded nodes. See [PR #13532](https://github.com/apache/apisix/pull/13532) and [PR #13666](https://github.com/apache/apisix/pull/13666).

Active health checks receive several reliability fixes:

- Node-only upstream changes reconcile targets in place instead of destroying the checker, retaining health state and avoiding a window where unhealthy nodes receive traffic. See [PR #13629](https://github.com/apache/apisix/pull/13629).
- Domain nodes are probed with the configured domain as Host and TLS SNI rather than the resolved IP. See [PR #13743](https://github.com/apache/apisix/pull/13743).
- Stale targets are purged across all checkers, the periodic lock is released correctly, and failed AI upstream construction no longer aborts the timer for unrelated resources. See [PR #13627](https://github.com/apache/apisix/pull/13627) and [PR #13592](https://github.com/apache/apisix/pull/13592).
- `ai-proxy-multi` refreshes a picker after asynchronous health checkers appear and preserves existing query parameters in health-check paths. See [PR #13505](https://github.com/apache/apisix/pull/13505) and [PR #13506](https://github.com/apache/apisix/pull/13506).

HTTPS upstreams using different referenced client certificates no longer share one keepalive pool. See [PR #13587](https://github.com/apache/apisix/pull/13587).

### Rate limiting

Sliding-window enforcement now performs the accept-or-reject decision and counter increment atomically on Redis backends. Delayed synchronization reports the previous window's weighted contribution correctly, preventing a fresh quota from appearing at every window boundary. See [PR #13574](https://github.com/apache/apisix/pull/13574) and [PR #13704](https://github.com/apache/apisix/pull/13704).

Variable-resolved `count` and `time_window` values must now be positive safe integers. A malformed client-controlled value is rejected instead of crashing the limiter or silently skipping a rule. See [PR #13573](https://github.com/apache/apisix/pull/13573).

Counter and connection isolation is corrected across workflows, Consumers, and Redis backends:

- Each `limit-conn` workflow action receives its own counter, while Consumer-level counters are shared across that Consumer's Routes rather than being fragmented per Route. See [PR #13591](https://github.com/apache/apisix/pull/13591) and [PR #13600](https://github.com/apache/apisix/pull/13600).
- Redis and Sentinel keepalive pools are separated by database, credentials, and TLS settings, preventing counters from landing in another configuration's connection context. See [PR #13516](https://github.com/apache/apisix/pull/13516) and [PR #13553](https://github.com/apache/apisix/pull/13553).
- Redis policy schemas are copied before extension, and Redis Cluster script cache misses no longer trigger unnecessary topology refreshes. See [PR #13555](https://github.com/apache/apisix/pull/13555) and [PR #13579](https://github.com/apache/apisix/pull/13579).

### Caching and request processing

The in-memory `proxy-cache` strategy now uses an injective storage-key layout so a crafted request cannot read or overwrite another request's Vary variant. The layout version is bumped, making pre-upgrade memory-cache entries cold until they expire. `graphql-proxy-cache` PURGE also removes every indexed Vary variant instead of only the legacy base entry. See [PR #13831](https://github.com/apache/apisix/pull/13831) and [PR #13523](https://github.com/apache/apisix/pull/13523).

Buffered request bodies are now reframed correctly before internal HTTP calls. `forward-auth`, AWS Lambda, Azure Functions, and OpenFunction remove stale client `Transfer-Encoding` and `Content-Length` values and let the HTTP client generate framing for the actual buffered body. See [PR #13642](https://github.com/apache/apisix/pull/13642) and [PR #13798](https://github.com/apache/apisix/pull/13798).

Additional data-processing fixes include:

- GraphQL fragment depth calculation is linear rather than exponential, and fragment cycles are rejected explicitly. See [PR #13809](https://github.com/apache/apisix/pull/13809).
- XML namespace removal no longer mutates a table during traversal, preserving namespaced keys and repeated elements reliably. See [PR #13522](https://github.com/apache/apisix/pull/13522).
- AWS Lambda SigV4 signs the same canonical, encoded, multi-value query string that is sent on the wire. See [PR #13520](https://github.com/apache/apisix/pull/13520).
- Empty repeated protobuf fields encode as JSON arrays, and JSON array element removal compacts the array instead of leaving holes. See [PR #13678](https://github.com/apache/apisix/pull/13678) and [PR #13818](https://github.com/apache/apisix/pull/13818).
- Duplicated `Content-Type` headers are rejected cleanly, control characters are escaped out of `$upstream_uri`, and unsafe URI rewriting retains the client query string. See [PR #13691](https://github.com/apache/apisix/pull/13691), [PR #13787](https://github.com/apache/apisix/pull/13787), and [PR #12843](https://github.com/apache/apisix/pull/12843).

### Logging and observability

Logger payloads and credentials are less likely to leak or cross configuration boundaries:

- Elasticsearch, Kafka, RocketMQ, SLS, and Syslog no longer write serialized log payloads into the error log; Kafka SASL credentials are redacted from error paths. See [PR #13502](https://github.com/apache/apisix/pull/13502) and [PR #13786](https://github.com/apache/apisix/pull/13786).
- Loki resolves dynamic labels per request and groups each batch by the resolved label set, preventing one service's labels from leaking to another. See [PR #13562](https://github.com/apache/apisix/pull/13562).
- Loggly binds each batch processor to its own configuration, preventing one Route's token or tags from being used for another Route's batch. See [PR #13648](https://github.com/apache/apisix/pull/13648).
- Datadog falls back to per-metric datagrams when a coalesced DogStatsD packet would exceed the agent's default receive buffer. See [PR #13665](https://github.com/apache/apisix/pull/13665).
- Partial log rotation still sends the reopen signal when at least one file was rotated successfully. See [PR #13375](https://github.com/apache/apisix/pull/13375).

OpenTelemetry tracers are rebuilt after metadata changes, and core-span injection uses an independent cache entry so it retains its always-on sampling behavior. Invalid, duplicated, or non-hex `X-Request-Id` values fall back to a generated trace ID rather than crashing export, and metadata value types are validated correctly. See [PR #13618](https://github.com/apache/apisix/pull/13618), [PR #13633](https://github.com/apache/apisix/pull/13633), [PR #12990](https://github.com/apache/apisix/pull/12990), and [PR #13690](https://github.com/apache/apisix/pull/13690).

### Configuration, discovery, and secrets

Configuration updates and discovery now recover more predictably:

- A transient DNS failure no longer leaves an upstream returning 503 after the same address becomes resolvable again. Consul skips one malformed node without discarding the remaining service nodes, and Stream Nacos discovery receives its required shared dictionary. See [PR #13137](https://github.com/apache/apisix/pull/13137), [PR #13513](https://github.com/apache/apisix/pull/13513), and [PR #13541](https://github.com/apache/apisix/pull/13541).
- Service hosts are normalized case-insensitively, xRPC schemas initialize when Stream routing needs them, and PROXY protocol listeners can bind IPv6 when IPv6 is enabled. See [PR #13781](https://github.com/apache/apisix/pull/13781), [PR #13515](https://github.com/apache/apisix/pull/13515), and [PR #12859](https://github.com/apache/apisix/pull/12859).
- Full etcd reloads retain the previous valid value when new data is invalid, watch timeouts no longer skip revisions, and unchanged items are reused to avoid unnecessary router rebuilds. See [PR #13717](https://github.com/apache/apisix/pull/13717) and [PR #13721](https://github.com/apache/apisix/pull/13721).

Environment and secret handling also receives several corrections:

- Exact-key environment lookup prevents prefix collisions, config-key substitution removes the unresolved key, and `nginx_config.envs` safely quotes values containing spaces. See [PR #13595](https://github.com/apache/apisix/pull/13595), [PR #12885](https://github.com/apache/apisix/pull/12885), and [PR #13713](https://github.com/apache/apisix/pull/13713).
- Secret cache entries invalidate when `/secrets` changes, and unresolved references now produce a field-specific error instead of failing silently. See [PR #13668](https://github.com/apache/apisix/pull/13668) and [PR #13737](https://github.com/apache/apisix/pull/13737).
- Consumer authentication fails closed when a secret reference remains unresolved. Stream TLS and referenced upstream SSL objects now initialize and resolve environment- or secret-backed certificate material correctly. See [PR #13667](https://github.com/apache/apisix/pull/13667), [PR #12935](https://github.com/apache/apisix/pull/12935), and [PR #13062](https://github.com/apache/apisix/pull/13062).

Plugin state survives Consumer Route merges, and parent lookup now supports every plugin-bearing resource type. See [PR #13757](https://github.com/apache/apisix/pull/13757) and [PR #13663](https://github.com/apache/apisix/pull/13663).

## Other Updates

The following performance, refactoring, and maintenance changes reduce runtime overhead and simplify internal behavior without introducing new user-facing capabilities.

- Reduce hot-path work by caching the filtered global-rule plugin set across phases, skipping Zipkin tag construction for unsampled requests, and reusing one Datadog UDP socket per batch. See [PR #13779](https://github.com/apache/apisix/pull/13779), [PR #13656](https://github.com/apache/apisix/pull/13656), and [PR #13653](https://github.com/apache/apisix/pull/13653).
- Remove the unused `clean_handlers` mechanism, separate generic data encryption from SSL-specific code, and remove the redundant CAS raw-cookie fallback. See [PR #13761](https://github.com/apache/apisix/pull/13761), [PR #13564](https://github.com/apache/apisix/pull/13564), and [PR #13635](https://github.com/apache/apisix/pull/13635).
- Silence expected metadata warnings for disabled or cross-subsystem plugins and standardize field-level schema documentation on `description`. See [PR #13514](https://github.com/apache/apisix/pull/13514) and [PR #13547](https://github.com/apache/apisix/pull/13547).

## Changelog

For the complete list of changes in this release, see the [3.18.0 changelog](https://github.com/apache/apisix/blob/master/CHANGELOG.md#3180).
