---
title: "Release Apache APISIX 3.12.0"
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
description: The Apache APISIX 3.12.0 version is released on March 25, 2025. This release includes a few changes, new features, bug fixes, and other improvements to user experiences.
tags: [Community]
---

We are glad to present Apache APISIX 3.12.0 with exciting new features, bug fixes, and other improvements to user experiences.

<!--truncate-->

This new release adds a number of new features, including a number of AI plugins, the support of valid issuers in the `openid-connect` plugin, the support of rate limiting response header name customization, and more.

There are also a few important changes included in this release. Should you find these changes impacting your operations, please plan your upgrade accordingly.

## Breaking Changes

### Refactor `ai-proxy` plugin

The `ai-proxy` plugin has been refactored to improve maintainability and performance. Changes include not requiring an upstream configuration, the removal of max timeout in schema, and the support for various providers, including openai, deepseek, and openai-compatible.

For more information, see PR [#12030](https://github.com/apache/apisix/pull/12030), [#12055](https://github.com/apache/apisix/pull/12055), and [#12004](https://github.com/apache/apisix/pull/12004).

### Replace plugin attribute with plugin metadata in `opentelemetry` plugin

Plugin attributes `batch_span_processor`, `collector`, and `trace_id_source` configuration are now migrated to plugin metadata from configuration file.

For more information, see PR [#11940](https://github.com/apache/apisix/pull/11940).

### Add expiration time for Prometheus metrics

In the previous version, Prometheus metrics do not expire. APISIX now ensures that all Prometheus metrics have an expiration time to prevent stale data accumulation. You can customize the metric expiration time in the configuration file. Users relying on Prometheus should see more efficient storage usage.

For more information, see PR [#11838](https://github.com/apache/apisix/pull/11838).

### Remove the requirement of `case` in `workflow` plugin

The `workflow` plugin now does not enforce `case` as a required attribute.

For more information, see PR [#11787](https://github.com/apache/apisix/pull/11787).

## New Features

### Support proxying to embedding models in `ai-proxy` plugin

APISIX now supports proxying to embedding models, in addition to proxying to LLM models.

For more information, see PR [#12062](https://github.com/apache/apisix/pull/12062).

### Add `ai-proxy-multi` plugin

The `ai-proxy-multi` plugin has been introduced to support load balancing between multiple LLM instances, enhancing fault tolerance. The plugin can be used with `ai-rate-limiting` to implement rate limiting for specific instances.

For more information, see PR [#11986](https://github.com/apache/apisix/pull/11986).

### Add `ai-rate-limiting` plugin

The `ai-rate-limiting` plugin introduces LLM instance-specific rate limiting strategies, allowing fine-grained control over API usage based on workload demands. This helps prevent excessive resource consumption while maintaining optimal model performance.

For more information, see PR [#12037](https://github.com/apache/apisix/pull/12037) and [#12047](https://github.com/apache/apisix/pull/12047).

### Add `ai-prompt-guard` plugin

The new `ai-prompt-guard` plugin provides security and content moderation for LLM-generated responses by filtering harmful or undesired prompts. This feature is useful in applications that require input sanitization to prevent misuse of LLMs.

For more information, see PR [#12008](https://github.com/apache/apisix/pull/12008).

### Add `ai-rag` plugin

The `ai-rag` plugin supports retrieval-augmented generation (RAG) workflows by integrating external knowledge retrieval with LLM responses. This enhances LLM-generated content by incorporating relevant factual data.

For more information, see PR [#11568](https://github.com/apache/apisix/pull/11568).

### Add `ai-content-moderation` plugin

The `ai-content-moderation` plugin integrates with AWS Comprehend to help enforce content policies by filtering harmful or inappropriate LLM-generated content. This is useful for compliance and content safety applications.

For more information, see PR [#11541](https://github.com/apache/apisix/pull/11541).

### Support the use of system-provided certificates in `ssl_trusted_certificate`

APISIX now allows the use of system-provided SSL certificates by setting `ssl_trusted_certificate` to system in the configuration file. This simplifies certificate management for environments that use system-provided CA bundles.

For more information, see PR [#11809](https://github.com/apache/apisix/pull/11809).

### Support execution of custom logic in plugins

A new `_meta.pre_function` attribute has been introduced in plugins to allow executing custom logic before each request processing phase. This feature provides greater control over request handling, enabling pre-processing tasks such as variable registration.

For more information, see PR [#11793](https://github.com/apache/apisix/pull/11793).

### Support anonymous consumer

APISIX now supports an “anonymous” consumer, which can be assigned to requests that do not match any existing consumer during authentication. This is particularly useful for scenarios where certain endpoints need to allow unauthenticated access while still applying consumer-based policies.

For more information, see PR [#11917](https://github.com/apache/apisix/pull/11917).

### Add `valid_issuers` attribute in `openid-connect` plugin

The `openid-connect` plugin now supports a `valid_issuers` attribute for whitelisting trusted JWT issuers. When not configured, the plugin will validate using issuers returned in the discovery document will be used. If both are missing, the issuer will not be validated.

For more information, see PR [#12002](https://github.com/apache/apisix/pull/12002).

### Store JWT in the request context in `jwt-auth` plugin

APISIX now supports the storage of JWT tokens in the request context, allowing other plugins to access token details without needing to re-parse them. This improves efficiency when working with authentication and authorization plugins.

For more information, see PR [#11675](https://github.com/apache/apisix/pull/11675).

### Support configuring `key_claim_name` in `jwt-auth` plugin

The JWT authentication plugin now allows customization of the `key_claim_name`, providing flexibility in extracting user identifiers from JWT claims.

For more information, see PR [#11772](https://github.com/apache/apisix/pull/11772).

### Cuztomize rate limiting response header names

Users can now customize rate limiting response header names, allowing flexibility in how rate-limiting information is exposed to clients. This change helps tailor responses to meet specific application needs.

For more information, see PR [#11831](https://github.com/apache/apisix/pull/11831).

### Support multipart content-type in `body-transformer` plugin

The `body-transformer` plugin now supports multipart requests, enabling transformation of file uploads and other multipart payloads.

For more information, see PR [#11767](https://github.com/apache/apisix/pull/11767).

## Other Updates

- Return errors at authentication failure instead of logging in `multi-auth` plugin (PR [#11775](https://github.com/apache/apisix/pull/11775))
- Add Total Requests per Second (TPS) Panel to Grafana Dashboard (PR [#11692](https://github.com/apache/apisix/pull/11692))
- Resync etcd when a lower revision is detected to ensure data consistency (PR [#12015](https://github.com/apache/apisix/pull/12015))
- Remove the `stream` default value in `ai-proxy` to prevent unintended behavior (PR [#12013](https://github.com/apache/apisix/pull/12013))
- Fix `gRPC-web` response two trailer chunks, ensuring proper response formatting (PR [#11988](https://github.com/apache/apisix/pull/11988))
- Resolve `event_id` being nil in the `chaitin-waf` plugin, improving logging accuracy (PR [#11651](https://github.com/apache/apisix/pull/11651))
- Fix race condition when updating `upstream.nodes` to prevent unexpected behavior (PR [#11916](https://github.com/apache/apisix/pull/11916))
- Ensure `upstream_obj.upstream` is not a string to maintain data integrity (PR [#11932](https://github.com/apache/apisix/pull/11932))

## Changelog

For a complete list of changes in this release, please see [CHANGELOG](https://github.com/apache/apisix/blob/master/CHANGELOG.md#3120).
