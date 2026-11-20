---
title: "Release Apache APISIX 3.21.0"
authors:
  - name: "Ming Wen"
    title: "Author"
    url: "https://github.com/moonming"
    image_url: "https://github.com/moonming.png"
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
description: Apache APISIX 3.21.0 was released on Nov 20, 2026. This security-focused release incorporates ten NGINX fixes, strengthens Admin API key validation, removes sensitive values from configuration-validation and plugin-execution logs, and improves upstream and logger reliability.
tags: [Community]
---

We are glad to present Apache APISIX 3.21.0 with NGINX security updates, stricter Admin API key validation, safer configuration logging, and reliability fixes for upstream recovery and log delivery.

<!--truncate-->

This release upgrades APISIX Runtime to 1.4.3, which incorporates the NGINX 1.31.9 core and ten security fixes published on November 18, 2026. It also corrects worker health-check convergence, restarts slow-start ramping after a node becomes unavailable, and fixes several batch logger delivery paths.

The release contains backward-incompatible Runtime parsing, Admin API configuration, and encrypted-value storage changes. Complete the applicable upgrade plans before rollout.

## Breaking Changes

APISIX 3.21.0 changes the supported Runtime, tightens Admin API key configuration, and changes rollback compatibility for encrypted plugin values. Review all applicable upgrade plans, including for source installations, deployments where the Admin API listener is disabled, and deployments that encrypt plugin fields.

### Runtime 1.4.3 incorporates ten NGINX security fixes

APISIX Runtime 1.4.3 updates its OpenResty 1.31.8.1 build to the NGINX 1.31.9 core. The update includes ten security fixes; whether an individual issue applies depends on the modules and configuration in use.

| Area | Included fixes |
| --- | --- |
| HTTP/2 | CVE-2026-123007 and CVE-2026-123633 |
| HTTPS and HTTP/3 | CVE-2026-118899 and CVE-2026-121810 |
| DNS and stream TLS | CVE-2026-123634, CVE-2026-123640, CVE-2026-120967, and CVE-2026-120993 |
| Static files and mail proxy | CVE-2026-125283 and CVE-2026-113425 |

The standard Runtime build disables mail proxy protocols. Deployments using HTTP/2, HTTP/3, TLS request bodies, the NGINX resolver, stream TLS or PROXY protocol, or affected static-file configurations should evaluate the corresponding advisories.

NGINX 1.31.9 also tightens request and response parsing. A client header line without a colon is rejected with 400, a malformed upstream header can surface as 502, and a chunked request with excessive framing overhead is rejected.

**Upgrade plan:** Upgrade every gateway to an image or package that includes APISIX Runtime 1.4.3. If installing APISIX from the source archive, install Runtime 1.4.3 separately and then run `make deps APISIX_RUNTIME=1.4.3` to install the matching Lua dependencies. If you maintain a custom Runtime, confirm that it incorporates the complete NGINX 1.31.9 patch set before deploying APISIX 3.21.0. Test representative HTTP/2, HTTP/3, TLS, resolver, and stream paths that your deployment enables, and verify how clients and upstreams handle the stricter header and chunked-body parsing. There is no compatibility option that retains the earlier parsing behavior while applying these security fixes.

For more information, see the [NGINX security advisories](https://nginx.org/en/security_advisories.html) and [PR #14223](https://github.com/apache/apisix/pull/14223).

### Admin API key entries require explicit roles

When `deployment.admin.admin_key_required` is enabled, every entry in `deployment.admin.admin_key` must now be an object with `role: admin` or `role: viewer`. If a `key` is present, it must be a string or YAML `null`. Configuration loading rejects missing roles, other role values, scalar entries, and numeric, Boolean, object, or array key values.

The validation applies to traditional and control-plane configurations, including a traditional deployment with the Admin API listener disabled. An empty Admin API credential supplied by a request no longer matches an empty configured key. At startup, APISIX generates a key only for an `admin` entry whose key is explicitly set to an empty string. An empty, missing, or `null` viewer key matches no request.

**Upgrade plan:** Before upgrading, inspect every `deployment.admin.admin_key` entry in traditional and control-plane configuration. Add an explicit `admin` or `viewer` role, convert each entry to an object, and quote keys that YAML could parse as a number or Boolean. If you rely on startup key generation, retain an explicitly empty string only on the intended `admin` entry and record the generated value after startup. Test an administrator request, a read-only viewer request, and a rejected write using the viewer key. Setting `admin_key_required: false` bypasses these entry checks because it disables Admin API key authentication; do not use it merely to preserve an invalid key configuration.

For more information, see [PR #14203](https://github.com/apache/apisix/pull/14203).

### Encrypted plugin values change rollback compatibility

Deployments with `apisix.data_encryption.enable_encrypt_fields` enabled are affected. APISIX now prefixes newly encrypted plugin configuration and plugin metadata values with `$ENC$v1$`. The marker lets APISIX identify and decrypt a protected value even if the current plugin schema no longer lists that field in `encrypt_fields`. Existing unmarked ciphertext remains readable for fields still listed in `encrypt_fields`.

An APISIX version without marker support treats the complete marked string as a literal value. This can make a mixed-version write unsafe and prevents a direct rollback after 3.21.0 has saved marked values.

**Upgrade plan:** If plugin field encryption is enabled, back up etcd before upgrading. Avoid Admin API writes during a rolling upgrade until every APISIX instance supports the marker. If you must roll back after APISIX 3.21.0 has saved marked values, restore the pre-upgrade data before starting a version without marker support, including the official 3.20.0 release.

For more information, see [PR #14162](https://github.com/apache/apisix/pull/14162).

## Security Fixes

In addition to the NGINX security update, APISIX reduces the risk of exposing configuration secrets through runtime and validation logs.

### Sensitive values are removed from configuration-validation and plugin-execution logs

APISIX now logs resource identifiers instead of complete Route, Service, Consumer, plugin, and stream-plugin configurations in validation and merge paths. Plugin configuration hashing and mismatch diagnostics also avoid printing the configuration body.

If a plugin configuration has an invalid top-level type, the Admin API reports that type without echoing the submitted value. Existing error monitoring that matches the previous value-bearing message should be updated to the new type-only wording.

For more information, see [PR #14157](https://github.com/apache/apisix/pull/14157).

## Bug Fixes

APISIX 3.21.0 corrects request forwarding and diagnostics, improves upstream and worker recovery, fixes stream bandwidth accounting, and prevents several logger batching and delivery failures.

### Request routing and diagnostics

- With `normalize_uri_like_servlet` enabled, APISIX now builds the forwarded query string after rewrite and access plugins run. Query credentials removed by `key-auth` or `jwt-auth` no longer reappear upstream. An explicit upstream URI still takes precedence, including for mirrored requests, and `data-mask` applies query masking when access logs contain `upstream_uri`. [PR #14163](https://github.com/apache/apisix/pull/14163)
- When the host-based router cannot fetch a Route's referenced Service, the error log now includes the Route ID. This helps locate a dangling reference without changing route matching. [PR #13723](https://github.com/apache/apisix/pull/13723)

### Upstream recovery and slow start

- A round-robin node using `warm_up_conf` now begins a new slow-start ramp whenever it returns after a health check removed it from the picker or after it was removed from the Upstream. The ramp restarts from `min_weight_percent` even after a short interruption because the process serving that address may have restarted. Changing a node's weight, including to `0`, is not treated as unavailability. [PR #14188](https://github.com/apache/apisix/pull/14188)
- `lua-resty-healthcheck-api7` is upgraded to 3.2.4. A newly created checker subscribes to health events before its initial poll, so a transition during initialization reaches the checker instead of leaving that worker with a stale healthy state and routing requests to a failed target. The fix covers the checker-construction window; recovery from events lost during normal operation remains separate work. [PR #14215](https://github.com/apache/apisix/pull/14215)
- `lua-resty-redis-cluster` is upgraded to 1.3.4. Probes of an unhealthy Redis Cluster node now reuse the configured TLS and authentication settings, allowing a recovered node to be recognized and returned to service. [PR #14181](https://github.com/apache/apisix/pull/14181)

### Stream metrics

- `apisix_stream_bandwidth` now counts traffic for a Service from its first session, including a short-lived session that ends before the next metrics refresh. [PR #14101](https://github.com/apache/apisix/pull/14101)

### Logger batching and delivery

- Batch processors now account for entries dropped after timer creation failures, callback exceptions, and retry exhaustion. Stale cleanup waits until every pushed entry is accounted for. An entry skipped because a logger filter does not match or because its request body cannot be read no longer consumes backlog capacity. Callback exceptions follow the configured retry and drop policy instead of terminating the timer early. If a callback raises after partially delivering a batch, the complete batch is retried and the collector can receive duplicate entries. [PR #14192](https://github.com/apache/apisix/pull/14192)
- `elasticsearch-logger` isolates batch processors by plugin configuration, so Routes using different endpoints, credentials, or headers do not send logs through another Route's processor. Elasticsearch version probing now runs from the batch path, and bulk action lines are built for the selected processor's cluster version. [PR #14192](https://github.com/apache/apisix/pull/14192)
- Logger configuration hashing now supports JSON `null`, and request/response body filter expressions are cached outside the plugin configuration. This prevents log-phase failures for configurations containing JSON `null` and for expressions that compile IPv6 `ipmatch` values. [PR #14192](https://github.com/apache/apisix/pull/14192)
- `tcp-logger` returns JSON serialization failures to the batch processor so the configured retry and drop policy can handle them. [PR #14004](https://github.com/apache/apisix/pull/14004)
- `splunk-hec-logging` safely handles non-200 responses whose JSON body omits `text` or sets it to `null`. The logged delivery error now retains the HTTP status and response body instead of raising a secondary concatenation error. [PR #14012](https://github.com/apache/apisix/pull/14012)

## Changelog

For a complete list of changes in this release, see the [3.21.0 changelog](https://github.com/apache/apisix/blob/3.21.0/CHANGELOG.md#3210).
