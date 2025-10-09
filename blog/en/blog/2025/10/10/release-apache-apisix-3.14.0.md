---
title: "Release Apache APISIX 3.14.0"
authors:
  - name: "Ashish Tiwari"
    title: "Author"
    url: "https://github.com/Revolyssup"
    image_url: "https://github.com/Revolyssup.png"
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
description: The Apache APISIX 3.14.0 version is released on Oct 10, 2025. This release includes a few changes, new features, bug fixes, and other improvements to user experiences.
tags: [Community]
---

We are glad to present Apache APISIX 3.14.0 with exciting new features, bug fixes, and other improvements to user experiences.

<!--truncate-->

This release introduces several new features, including new AI proxy variables for logging, support for AI/ML API providers in AI plugins, route matching based on the request body, support for the KSUID algorithm in the `request-id` plugin, and more.

There are also a few important changes included in this release. Should you find these changes impacting your operations, please plan your upgrade accordingly.

## Breaking Changes

### Admin API no longer populates default values

The Admin API will no longer automatically populate default values when writing configurations. Previously, when users submitted configurations through the Admin API, APISIX would automatically fill in default values for optional fields before storing them. This behavior has been removed to prevent user confusion and improve compatibility with tools like the APISIX Ingress Controller.

This change affects how configurations are written but not how they are read - when retrieving configurations via GET requests, the default values will still be present in the response as they are populated during the read operation.

Users should ensure their configuration supply all necessary values in the Admin API payload, as default values will no longer be automatically added during write operations.

For more information, see [PR #12603](https://github.com/apache/apisix/pull/12603).

### `jwt-auth` plugin requires `secret` for non-RS/ES algorithms

The `jwt-auth` plugin will no longer automatically generate a secret value when none is provided for algorithms other than RS256 and ES256. Previously, when users configured the `jwt-auth` plugin without providing a secret for algorithms like HS256 or HS512, APISIX would automatically generate one.

Now users must explicitly configure the secret field when using algorithms other than RS256 and ES256. If no secret is provided, the plugin will return an error message requiring users to set this value manually.

This change improves configuration transparency and prevents potential confusion from auto-generated values. Users should review their `jwt-auth` plugin configurations and ensure they explicitly set the secret field where required.

For more information, see [PR #12611](https://github.com/apache/apisix/pull/12611).

### `openid-connect` plugin requires explicit session secret configuration

In this release, the `openid-connect` plugin no longer auto-generates a `session.secret` when `bearer_only` is set to `false` and no `session.secret` is provided. Instead, the user must explicitly specify `session.secret` when `bearer_only` is set to `false`.

For more information, see [PR #12609](https://github.com/apache/apisix/pull/12609).

## New Features

### Support route matching based on request body

You can now use `post_arg.*` in a route's `vars` to match requests based on the request body value. `post_arg` supports JSON, multipart, and URL-encoded request bodies, enabling flexible and dynamic routing logic based on message payloads.

For more information, see [PR #12388](https://github.com/apache/apisix/pull/12388).

### Add global switch to disable all upstream health checks

This release introduces a new configuration option `apisix.disable_upstream_healthcheck` in the `config.yaml` that allows you to turn off all upstream health checks at once. This is useful in emergency where health checking may interfere with routing fallback.

For more information, see [PR #12407](https://github.com/apache/apisix/pull/12407).

### Support multiple objects in a single log

This release increases flexibility of the `json.delay_encode` logging feature: up to 16 distinct `delay_encode` objects can now be included in a single log entry. This gives finer control over how and which parts of log payloads are delayed or encoded. 

For more information, see [PR #12395](https://github.com/apache/apisix/pull/12395).

### Add custom claim validation in `openid-connect` plugin

This release introduces the ability to configure custom claim validation in the `openid-connect` plugin. This enhancement allows users to define validation rules for specific claims, such as ensuring a claim matches one of a set of predefined values. If a claim fails validation, the request will be rejected.

For more information, see [PR #11824](https://github.com/apache/apisix/pull/11824).

### Support environment variables in `openid-connect` plugin

This release adds support for environment variables in the configuration of the `openid-connect` plugin. Users can now store sensitive fields, such as `client_secret`, in environment variables, enhancing security and flexibility during deployment.

For more information, see [PR #11451](https://github.com/apache/apisix/pull/11451).

### Introduce `traffic-split` plugin for stream routes

This release introduces the `traffic-split` plugin for stream routes (L4), enabling weighted traffic distribution across multiple upstreams. This enhancement allows more granular control over traffic routing in stream-based applications.

For more information, see [PR #12630](https://github.com/apache/apisix/pull/12630).

### Add KSUID algorithm in `request-id` plugin

This release supports KSUID (K-Sortable Globally Unique Identifier) algorithm in the `request-id` plugin for request ID generation.

For more information, see [PR #12573](https://github.com/apache/apisix/pull/12573).

### Introduce fallback mechanism in `ai-proxy-multi` plugin

This release enhances the `ai-proxy-multi` plugin by adding a fallback mechanism for specific error codes. This improvement ensures more resilient AI proxying by allowing predefined fallback behaviors when certain error conditions are met.

For more information, see [PR #12571](https://github.com/apache/apisix/pull/12571).

### Support metadata headers and HEAD method in Standalone API

The standalone API has two new response metadata headers: `X-Last-Modified` and `X-Digest`, which let clients detect which instance was last updated and inspect a configuration digest passed by the client.

In addition, HEAD requests are now supported (returning only metadata, not full config), making lightweight polling or metadata checks possible.  

For more information, see [PR #12526](https://github.com/apache/apisix/pull/12526).

### Add new AI proxy variables for logging

This release adds the following variables to the `ai-proxy` and `ai-proxy-multi` plugins:

* `apisix_upstream_response_time`: Time taken for APISIX to send the request to the upstream service and receive the full response.
* `request_type`: Type of request, where the value could be `traditional_http`, `ai_chat`, or `ai_stream`.
* `llm_time_to_first_token`: Duration from request sending to the first token received from the LLM service, in milliseconds.
* `llm_model`: LLM model name forwarded to the upstream LLM service.
* `request_llm_model`: LLM model name specified in the request.
* `llm_prompt_tokens`: Number of tokens in the prompt.
* `llm_completion_tokens`: Number of chat completion tokens in the prompt.

These variables can be logged in the access log, utilized with logging plugins, or exported as Prometheus metrics. This enhancement improves monitoring and debugging by offering insights into upstream service response times during AI proxying.

For more information, see [PR #12555](https://github.com/apache/apisix/pull/12555), [PR #12554](https://github.com/apache/apisix/pull/12554), [PR #12515](https://github.com/apache/apisix/pull/12515), and [PR #12518](https://github.com/apache/apisix/pull/12518).

### Introduce `ai-aliyun-content-moderation` plugin

This release introduces the new `ai-aliyun-content-moderation` plugin, enabling integration with Aliyun's Machine-Assisted Moderation Plus for content moderation. The plugin evaluates request bodies for profanity, hate speech, insults, harassment, violence, and more. Any request that exceeds the specified threshold will be rejected.

For more information, see [PR #12530](https://github.com/apache/apisix/pull/12530).

### Add Azure AI and AI/ML API providers to AI plugins

The `ai-proxy`, `ai-proxy-multi`, and `ai-request-rewrite` plugins now supports Azure AI and AI/ML API as providers.

When `provider` is set to `azure-openai`, the plugin proxies requests to the custom endpoint configured in `override` and additionally removes the model parameter from user requests.

AI/ML API provides a unified OpenAI-compatible API with access to 300+ LLMs such as GPT-4, Claude, Gemini, DeepSeek, and others. When `provider` is set to `aimlapi`, the plugin allows users to route AI requests to AIMLAPI-compatible endpoints, broadening the spectrum of AI providers that can be utilized within the APISIX ecosystem.

For more information, see [PR #12565](https://github.com/apache/apisix/pull/12565) and [PR #12379](https://github.com/apache/apisix/pull/12379).

### Support healthcheck in `ai-proxy-multi` plugin

The `ai-proxy-multi` plugin now includes health check support for upstream AI services. Each backend endpoint can be monitored for availability, and requests can be routed dynamically to healthy endpoints. This ensures high availability and prevents requests from being sent to unresponsive AI servers, improving reliability in production environments.

For more information, see [PR #12509](https://github.com/apache/apisix/pull/12509).

### Support `limit-conn` in `workflow` plugin rules

This release enhances the `workflow` plugin by allowing it to include the `limit-conn` plugin as part of workflow rules.

For more information, see [PR #12465](https://github.com/apache/apisix/pull/12465).

### Improve `datadog` plugin tagging

The `datadog` plugin now provides enhanced metrics and tags to support a wider range of observability needs. This update introduces several new tags:

- `response_status`: The HTTP response status code (e.g., "200", "404", "503").
- `response_status_class`: The class of the HTTP response status code (e.g., "2xx", "4xx", "5xx").
- `path`: The HTTP path pattern, available only if the `include_path` attribute is set to `true`.
- `method`: The HTTP method, available only if the `include_method` attribute is set to `true`.

For more information, see [PR #11943](https://github.com/apache/apisix/pull/11943).

### Add support for `extra_headers` in `forward-auth` plugin

The `forward-auth` plugin can now extract fields from the request body and inject them as headers to the upstream service, using `extra_headers` and `$post_arg.*`. For example, if authentication returns a user role or token in the response body, you can now map part of that body into a header that downstream services can consume.

For more information, see [PR #12405](https://github.com/apache/apisix/pull/12405).

## Other Updates

- Add healthcheck manager to decouple upstream (PR [#12426](https://github.com/apache/apisix/pull/12426))
- Decouple Prometheus exporter calculation and output (PR [#12383](https://github.com/apache/apisix/pull/12383))
- Redact encrypted fields from error logs to prevent sensitive data leakage (PR [#12629](https://github.com/apache/apisix/pull/12629))
- Fix inconsistent resolved nodes for health checks in the `ai-proxy-multi` plugin (PR [#12594](https://github.com/apache/apisix/pull/12594))
- Only trust `X-Forwarded-*` headers from configured `trusted_addresses` (PR [#12551](https://github.com/apache/apisix/pull/12551))
- Ensure redirects work correctly when scheme is not HTTPS (PR [#12561](https://github.com/apache/apisix/pull/12561))
- Fix UI redirect errors when running behind a proxy (PR [#12566](https://github.com/apache/apisix/pull/12566))
- Refresh stale LRU cache items for secrets in the background (PR [#12614](https://github.com/apache/apisix/pull/12614))
- Restore missing runtime information in health check manager (PR [#12607](https://github.com/apache/apisix/pull/12607))
- Support stream route configuration in Standalone Admin API mode (PR [#12604](https://github.com/apache/apisix/pull/12604))
- Only log response body when `include_resp_body` is enabled (PR [#12599](https://github.com/apache/apisix/pull/12599))
- Correct spelling of `get_healthcheck_events_module` function name (PR [#12587](https://github.com/apache/apisix/pull/12587))
- Prevent panic when `ai-proxy-multi` instance lacks a custom endpoint (PR [#12584](https://github.com/apache/apisix/pull/12584))
- Prevent message accumulation across requests in AI Prompt Decorator plugin (PR [#12582](https://github.com/apache/apisix/pull/12582))
- Remove stale `stream_worker_events.sock` file in Docker entrypoint (PR [#12546](https://github.com/apache/apisix/pull/12546))
- Add expiration time (`exptime`) to EWMA shared dictionary items (PR [#12557](https://github.com/apache/apisix/pull/12557))
- Catch malformed override endpoints in `ai-proxy` schema validation (PR [#12563](https://github.com/apache/apisix/pull/12563))
- Fix missing `ctx.llm_raw_usage` value in non-stream mode (PR [#12564](https://github.com/apache/apisix/pull/12564))
- Check types of `choices`, `usage`, and `content` fields in `ai-proxy` before use (PR [#12548](https://github.com/apache/apisix/pull/12548))
- Adjust ID length for Kubernetes service discovery (PR [#12536](https://github.com/apache/apisix/pull/12536))
- Make `basic-auth` scheme case-insensitive (PR [#12539](https://github.com/apache/apisix/pull/12539))
- Skip client certificate verification when only `tls.verify` is configured (PR [#12527](https://github.com/apache/apisix/pull/12527))
- Load full data from etcd when worker restarts (PR [#12523](https://github.com/apache/apisix/pull/12523))
- Upgrade etcd revision on watch request timeout (PR [#12514](https://github.com/apache/apisix/pull/12514))
- Enable EndpointSlices support for Kubernetes discovery (PR [#11654](https://github.com/apache/apisix/pull/11654))
- Include gRPC trailers even when response body is empty in `grpc-web` (PR [#12490](https://github.com/apache/apisix/pull/12490))
- Fix hostname retrieval issue on Red Hat systems (PR [#12267](https://github.com/apache/apisix/pull/12267))
- Fix batch processor cache not working when plugin is configured on service level (PR [#12474](https://github.com/apache/apisix/pull/12474))
- Resolve variable references in `$post_arg` for Forward Auth plugin’s `extra_headers` (PR [#12435](https://github.com/apache/apisix/pull/12435))
- Fix inconsistent circuit breaking due to premature `breaker_time` increment in `api-breaker` plugin (PR [#12451](https://github.com/apache/apisix/pull/12451))
- Add missing configuration validation for Standalone Admin API mode (PR [#12424](https://github.com/apache/apisix/pull/12424))
- Skip writing access logs when `enable_access_log` is set to false (PR [#11310](https://github.com/apache/apisix/pull/11310))
- Remove unused `set_ngx_var` attribute from OpenTelemetry plugin (PR [#12411](https://github.com/apache/apisix/pull/12411))
- Support `Content-Type` headers with charset for URL-encoded data in Request Validation plugin (PR [#12406](https://github.com/apache/apisix/pull/12406))
- Fix Zipkin `trace_id` and `span_id` format in `ngx_var` (PR [#12403](https://github.com/apache/apisix/pull/12403))
- Fix missed consumer updates caused by incorrect cache versioning (PR [#12413](https://github.com/apache/apisix/pull/12413))
- Ensure `get_keys` returns all items from shared dictionary beyond default 1024 limit (PR [#12380](https://github.com/apache/apisix/pull/12380))

## Changelog

For a complete list of changes in this release, please see [CHANGELOG](https://github.com/apache/apisix/blob/master/CHANGELOG.md#3140).
