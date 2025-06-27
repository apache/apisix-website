---
title: "Release Apache APISIX 3.12.0"
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
description: The Apache APISIX 3.13.0 version is released on June 30, 2025. This release includes a few changes, new features, bug fixes, and other improvements to user experiences.
tags: [Community]
---

We are glad to present Apache APISIX 3.13.0 with exciting new features, bug fixes, and other improvements to user experiences.

<!--truncate-->

This release introduces a number of new features, including the `mcp-bridge` and `lago` plugins, the standalone Admin API, status health check endpoint, L4 proxy health check, and more.

While there are no breaking changes, a few features have been marked for deprecation for future releases. Please review the deprecation notes to stay informed about future changes.

## Deprecations

### Mark the `server-info` plugin as deprecated

The `server-info` plugin is now marked for deprecation and will be removed in a future release. It periodically writes server info to etcd, which can cause performance issues in large clusters due to excessive etcd writes during startup.

For more information, see the [mailing list proposal](https://lists.apache.org/thread/nrwqo1gbc0z4z48fkb8dd4rn0trnfnz9) and [PR #12244](https://github.com/apache/apisix/pull/12244).

### Warn on etcd write operations in decoupled `data_plane` mode

When APISIX is running in the decoupled mode as the data plane instance, it now logs warnings if the data plane instance performs etcd write operations via core.etcd functions or the CLI. Writes will be deprecated in future releases, where such operations will be disallowed.

For more information, see the [mailing list proposal](https://lists.apache.org/thread/gfsooqm4cz6cx2sh7htmqgwlml5kggm2) outlining the future enforcement plan and [PR #12241](https://github.com/apache/apisix/pull/12241) for change in this release.

## New Features

### Add Standalone Admin API

This release introduces a new Admin API for standalone mode, allowing users to manage in-memory configurations via HTTP PUT (to update) and GET (to retrieve). Configurations can be submitted in JSON or YAML, validated, and broadcast to all workers within the same APISIX instance—making the mode fully stateless. This feature improves support for use cases such as the Ingress Controller.

For more information, see relevant PRs [#12179](https://github.com/apache/apisix/pull/12179), [#12214](https://github.com/apache/apisix/pull/12214), [#12256](https://github.com/apache/apisix/pull/12256), [#12295](https://github.com/apache/apisix/pull/12295), [#12317](https://github.com/apache/apisix/pull/12317), and [#12333](https://github.com/apache/apisix/pull/12333).

### Support health check for L4 proxy

APISIX now supports upstream health checks when operating as an L4 proxy, enabling improved reliability and automatic failover for TCP/UDP traffic.

For more information, see PR [#12180](https://github.com/apache/apisix/pull/12180).

### Add status health check endpoint

This release introduces a health check endpoint that indicates when APISIX is ready to serve traffic. In standalone mode, it reports readiness after configuration is loaded from external clients (e.g., Ingress Controller). When using etcd, the endpoint remains unhealthy until all workers have completed the initial configuration load. This helps external systems perform accurate readiness checks.

For more information, see [#12200](https://github.com/apache/apisix/pull/12200).

### Add `mcp-bridge` plugin

This release introduces the `mcp-bridge` plugin, which converts stdio-based MCP servers to HTTP SSE-based interfaces, with support for subprocess management and prototype session handling across NGINX workers. To support broader use cases, the MCP server has been refactored into a standalone module, replacing the original mcp-bridge implementation with a more flexible framework while preserving backward compatibility through existing tests.

For more information, see [#12168](https://github.com/apache/apisix/pull/12168) and [#12151](https://github.com/apache/apisix/pull/12151).

### Add `lago` plugin  

This release introduces the lago plugin, enabling integration with Lago for API monetization. The plugin logs API calls and charges consumers based on configured billing metrics and subscriptions. It supports flexible use cases such as token-based billing for AI services or per-call billing for APIs, and allows multiple routes to be linked to different pricing models for pay-as-you-go scenarios.

For more information, see [#12196](https://github.com/apache/apisix/pull/12196).

### Add `headers` attribute to the `loki-logger` plugin

This release adds a `headers` attribute to the `loki-logger` plugin. This allows, for example, setting an authorization header when sending logs to a remote Loki service.

For more information, see [#12243](https://github.com/apache/apisix/pull/12243).

### Add metadata fields to core resource schemas

This release adds standardized metadata for core resources, including name, description, and labels. The addition improves resource consistency and addresses issues in downstream projects.

For more information, see PR [#12224](https://github.com/apache/apisix/pull/12224).

### Add `max_pending_entries` attribute to batch processor

This release introduces a new `max_pending_entries` option to the batch processor to prevent memory spikes when the log server is slow or unresponsive. This option allows dropping new entries if too many pending callbacks are waiting to be processed.

For more information, see PR [#12338](https://github.com/apache/apisix/pull/12338).

### Enhance Admin API filtering

The Admin API now supports filtering routes and stream routes by `service_id` and `upstream_id`, making it easier to query and manage related resources, especially for the APISIX Dashboard project.

For more information, see PR [#12291](https://github.com/apache/apisix/pull/12291).

### Expose APISIX version in Prometheus `node_info` metric

This release enhances the Prometheus `node_info` metric by adding a version label to expose the current APISIX version, improving observability and version tracking.

For more information, see PR [#12367](https://github.com/apache/apisix/pull/12367).

### Support dash (-) in consumer usernames

This release allows the use of dashes (-) in consumer usernames. This is useful for scenarios such as namespacing in Kubernetes, where consumer names like namespace-username are needed for resource isolation.

For more information, see PR [#12296](https://github.com/apache/apisix/pull/12296).

## Dependencies

Upgraded core dependencies for improved stability, compatibility, and to address known issues:

- Bumped OpenResty to v1.27.1.2 (PR [#12307](https://github.com/apache/apisix/pull/12307))
- Bumped LuaRocks to v3.12.0 (PR [#12305](https://github.com/apache/apisix/pull/12305))

## Other Updates

- Compare service discovery nodes by address to improve performance (PR [#12258](https://github.com/apache/apisix/pull/12258))
- Change log level to `debug` to reduce unnecessary logs (PR [#12361](https://github.com/apache/apisix/pull/12361))
- Adjust log level from `warn` to `info` when removing stale batch processors (PR [#12297](https://github.com/apache/apisix/pull/12297))
- Refactor `ai-proxy` plugin to move `read_response` into the `ai_driver.request` function (PR [#12101](https://github.com/apache/apisix/pull/12101))
- Prevent stale health checker from running when the number of new nodes is less than or equal to one (PR [#12118](https://github.com/apache/apisix/pull/12118))
- Release health checker when there are zero nodes (PR [#12126](https://github.com/apache/apisix/pull/12126))
- Parse and validate `apisix.yaml` in the CLI only during startup (PR [#12216](https://github.com/apache/apisix/pull/12216))
- Restrict TLSv1.3 cross-SNI session resumption (PR [#12366](https://github.com/apache/apisix/pull/12366))
- Fix data dump issue in Kubernetes service discovery single mode (PR [#12284](https://github.com/apache/apisix/pull/12284))
- Handle `nil` port cases in Consul by defaulting to port 80 (PR [#12304](https://github.com/apache/apisix/pull/12304))

## Changelog

For a complete list of changes in this release, please see [CHANGELOG](https://github.com/apache/apisix/blob/master/CHANGELOG.md#3130).
