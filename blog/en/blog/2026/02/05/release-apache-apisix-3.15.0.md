---
title: "Release Apache APISIX 3.15.0"
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
description: The Apache APISIX 3.15.0 version is released on Feb 5, 2026. This release includes a few changes, new features, bug fixes, and other improvements to user experiences.
tags: [Community]
---

We are glad to present Apache APISIX 3.15.0 with exciting new features, bug fixes, and other improvements to user experiences.

<!--truncate-->

This release introduces new AI providers, enhanced logging features, and multiple improvements across discovery, security, and plugin functionality.

This release introduces one breaking change that may impact existing deployments. Please review the change and plan your upgrade accordingly.

## Breaking Changes

### Disallow creating duplicate plugins in global rules

This release prevents the same plugin from being configured across multiple global rules. Previously, this could lead to undefined execution order and unpredictable behavior.

Configurations that rely on the same plugin appearing in multiple global rules will need to be restructured. The plugin will now only execute from the first global rule where it appears, and subsequent occurrences will be logged as errors.

For more information, see [PR #12800](https://github.com/apache/apisix/pull/12800).

## New Features

### New providers in AI plugins

This release expands the provider support in `ai-proxy`, `ai-proxy-multi`, and `ai-request-rewrite`. These plugins now support Google Cloud Vertex AI, Google Gemini, Anthropic, and OpenRouter.

For more information, see the following pull requests:

- [PR #12933 (Google Cloud Vertex AI)](https://github.com/apache/apisix/pull/12933)
- [PR #12883 (Google Gemini)](https://github.com/apache/apisix/pull/12883)
- [PR #12881 (Anthropic)](https://github.com/apache/apisix/pull/12881)
- [PR #12878 (OpenRouter)](https://github.com/apache/apisix/pull/12878)

### Kubernetes discovery readiness check

Service discovery for Kubernetes now includes a readiness status query through the `/status/ready` interface, enabling better health monitoring and integration with other discovery types.

For more information, see [PR #12852](https://github.com/apache/apisix/pull/12852).

### Auth plugins custom `www-authenticate` header with realm

Authentication plugins `basic-auth`, `key-auth`, `hmac-auth`, `jwt-auth`, and `ldap-auth` now support customizing the realm value in `WWW-Authenticate` header on 401 responses, implementing RFC 7235 standards for HTTP authentication.

For more information, see [PR #12864](https://github.com/apache/apisix/pull/12864).

### Add `apisix_request_id` variable for request identification

This release adds `apisix_request_id` variable that logs request IDs in both access and error logs. The variable is automatically set from the built-in `$request_id` and can be updated by the `request-id` plugin when enabled. This improves debugging and log correlation capabilities.

For more information, see [PR #12931](https://github.com/apache/apisix/pull/12931).

### Rate limiting plugins support configuring Redis keepalive

The `limit-count`, `limit-conn`, and `limit-req` plugins now support Redis connection keepalive parameters `redis_keepalive_timeout` and `redis_keepalive_pool`, improving connection stability and reducing overhead.

For more information, see [PR #12861](https://github.com/apache/apisix/pull/12861) and [PR #12955](https://github.com/apache/apisix/pull/12955).

### Access log logging plugins support max pending entries

All access log logging plugins now support the `max_pending_entries` parameter in their plugin metadata, which sets the maximum number of unprocessed entries allowed in the batch processor. When this limit is reached, new entries will be dropped until the backlog is reduced. This helps prevent memory spikes when the logger is slow or unavailable.

For more information, see [PR #12709](https://github.com/apache/apisix/pull/12709).

### Logger plugins support nested log format

Logger plugins now support hierarchical/nested log structures with a maximum depth of 5 levels, enabling more organized and readable log formats for better analysis.

For more information, see [PR #12697](https://github.com/apache/apisix/pull/12697).

### `file-logger` plugin metadata supports path properties

The `file-logger` plugin now supports configuring a default log file path globally, eliminating the need to specify paths individually in each plugin configuration.

For more information, see [PR #12825](https://github.com/apache/apisix/pull/12825).

### `kafka-logger` plugin supports SCRAM authentication

The `kafka-logger` plugin now supports SCRAM (Salted Challenge Response Authentication Mechanism) for secure authentication with Kafka clusters, expanding security compatibility.

For more information, see [PR #12693](https://github.com/apache/apisix/pull/12693).

### SSL certificate SNI matching supports wildcard

SSL certificate matching now supports the complete wildcard `*` value, in addition to the existing exact domain and partial wildcard support.

For more information, see [PR #12668](https://github.com/apache/apisix/pull/12668).

### `grpc-web` plugin supports exact matching in route URI

The `grpc-web` plugin now works with routes that do not use prefix matching, expanding flexibility for gRPC-Web deployments.

For more information, see [PR #12830](https://github.com/apache/apisix/pull/12830).

### Add validation API to API-driven standalone mode

The API-driven standalone mode (primarily used with ingress controller) now supports a new validation endpoint `/validate` which allows testing configurations without persisting them.

For more information, see [PR #12718](https://github.com/apache/apisix/pull/12718).

## Other Updates

- Support status API in file-driven standalone mode (PR [#12810](https://github.com/apache/apisix/pull/12810))
- Correct handling of EndpointSlices in Kubernetes service discovery (PR [#12634](https://github.com/apache/apisix/pull/12634))
- Relax resource name length from 100 to 256 characters to better support ingress controller name generation patterns (PR [#11822](https://github.com/apache/apisix/pull/11822))
- Add validation and deletion protection for stream routing (PR [#12794](https://github.com/apache/apisix/pull/12794))
- Prevent permanent quota blocking by making Redis key expiry configurable in the `limit-conn` plugin (PR [#12872](https://github.com/apache/apisix/pull/12872))
- Improve timing accuracy by starting the timer when a route is hit in SkyWalking integration (PR [#12855](https://github.com/apache/apisix/pull/12855))
- Improve performance by removing unnecessary deepcopy when destroying Prometheus (PR [#12905](https://github.com/apache/apisix/pull/12905))
- Prevent data corruption by ensuring safe Redis key eviction in the `limit-req` plugin (PR [#12911](https://github.com/apache/apisix/pull/12911))
- Improve debugging by using the meta parent to identify the plugin source in the `limit-count` plugin (PR [#12900](https://github.com/apache/apisix/pull/12900))
- Make `protocol_name` optional and default it to `MQTT` in the MQTT plugin (PR [#12831](https://github.com/apache/apisix/pull/12831))
- Ensure the number of sub-responses matches the sub-request count in the `batch-requests` plugin (PR [#12779](https://github.com/apache/apisix/pull/12779))
- Correct the logging schema key in the `ai-proxy-multi` plugin (PR [#12795](https://github.com/apache/apisix/pull/12795))
- Fix initialization and querying issues for `enable_data_encryption` in plugin metadata (PR [#12624](https://github.com/apache/apisix/pull/12624))
- Add an `X-Request-Id` header when the incoming request contains an empty value (PR [#12837](https://github.com/apache/apisix/pull/12837))
- Adjust directory permissions to allow APISIX to run on OpenShift without the `anyuid` command (PR [#12824](https://github.com/apache/apisix/pull/12824))
- Fix pre- and post-hook typos in Kubernetes discovery and improve cleanup safety (PR [#12288](https://github.com/apache/apisix/pull/12288))
- Improve performance by moving the IPv6 check to schema validation (PR [#12714](https://github.com/apache/apisix/pull/12714))
- Refactor cache logic to use the secret URI as the cache key and improve LRU cache implementation (PR [#12682](https://github.com/apache/apisix/pull/12682))
- Ensure `node_version` is maintained for independent upstreams (PR [#12856](https://github.com/apache/apisix/pull/12856))
- Fix request failures during reload when any Eureka node becomes unavailable (PR [#12906](https://github.com/apache/apisix/pull/12906))
- Add retry logic for Nacos service discovery requests after failures (PR [#12734](https://github.com/apache/apisix/pull/12734))
- Remove `lua-resty-worker-events` from core dependencies (PR [#12930](https://github.com/apache/apisix/pull/12930))
- Upgrade `lua-resty-logger-socket` dependency (PR [#12898](https://github.com/apache/apisix/pull/12898))
- Upgrade `lua-resty-dns-client` dependency (PR [#12851](https://github.com/apache/apisix/pull/12851))

## Changelog

For a complete list of changes in this release, please see [CHANGELOG](https://github.com/apache/apisix/blob/master/CHANGELOG.md#3150).
