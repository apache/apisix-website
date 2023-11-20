---
title: "Release Apache APISIX 3.7.0"
authors:
  - name: "Xin Rong"
    title: "Author"
    url: "https://github.com/AlinsRan"
    image_url: "https://github.com/AlinsRan.png"
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
description: The Apache APISIX 3.7.0 version is released on November 21, 2023. This release includes a few breaking changes, new features, and bug fixes.
tags: [Community]
---

We are glad to present Apache APISIX 3.7.0 with exciting new features, bug fixes, and other improvements to user experiences.

<!--truncate-->

This new release adds a number of new features, including the support for ACL tokens for Consul service discovery, authorization parameters in `openid-connect` plugin, Nacos AK/SK authentication, and more.

There are also a few important changes included in this release. Should you find these changes impacting your operations, please plan your upgrade accordingly.

## Breaking Changes

### Restrict modification to create time and update time of core resources

In the earlier versions, modifying resources' `create_time` and `update_time` was unrestricted with Admin API. This behaviour is unneeded and prone to risks. Starting from 3.7.0, users would not be allowed to modify these timestamps.

For more information, see [change proposal](https://lists.apache.org/thread/968kp7hd6zcg7ty2clomkbshmd53v71d) and [PR #10232](https://github.com/apache/apisix/pull/10232).

### Remove `exptime`, `validity_start`, and `validity_end` attributes from SSL schema

Remove `exptime`, `validity_start`, and `validity_end` attributes from SSL schema as these information are present in the certificate.

For more information, see [change proposal](https://lists.apache.org/thread/8l4h8f6wcv482s0b7vt17do5z3g1y3o3) and [PR #10323](https://github.com/apache/apisix/pull/10323).

### Update `opentelemetry` plugin attributes to beter follow the specifications

Replace attributes `route` with `apisix.route_name`, `service` with `apisix.service_name` in the `opentelemetry` plugin to follow the OpenTelemetry specifications for span name. For more information, see [PR #10393](https://github.com/apache/apisix/pull/10393).

## New Features

### Support ACL tokens for Consul discovery

Support for ACL tokens when using Consul or Consul KV service discovery. For more information, see [PR #10278](https://github.com/apache/apisix/pull/10278).

### Support configuring services for stream routes

Support referencing services in stream routes to configure upstreams. For more information, see [PR #10298](https://github.com/apache/apisix/pull/10298).

### Support authorization parameters in `openid-connect` plugin

Support additional authorization parameters in the `authorization_params` attribute of the `openid-connect` plugin. For more information, see [PR #10058](https://github.com/apache/apisix/pull/10058).

### Support setting variables in `zipkin` plugin

Support setting variables in zipkin plugin to expose the span information during the rewrite phase. For more information, see [documentation](https://github.com/wizhuo/apisix/blob/master/docs/en/latest/plugins/zipkin.md#variables) and [PR #10361](https://github.com/apache/apisix/pull/10361).

### Support Nacos AK/SK authentication

Support Nacos AK/SK authentication. The access key and secret key can be configured in the configuration file as follows:

```yaml title="config.yaml"
discovery:
  nacos:
    ...
    access_key: ""    # Nacos AccessKey ID
    secret_key: ""    # Nacos AccessKey Secret
```

For more information, see [PR #10445](https://github.com/apache/apisix/pull/10445).

## Other Updates

- Fix `post_arg_*` variable matching failure when the POST form `Content-Type` is appended with character set ([PR #10372](https://github.com/apache/apisix/pull/10372))
- Use `apisix-runtime` as the default APISIX runtime ([PR #10415](https://github.com/apache/apisix/pull/10415) and [PR #10427](https://github.com/apache/apisix/pull/10427))
- Add tests for `authz-keycloak` with apisix secrets ([PR #10353](https://github.com/apache/apisix/pull/10353))
- Keep healthcheck target state when upstream changes ([PR #10312](https://github.com/apache/apisix/pull/10312) and [PR #10307](https://github.com/apache/apisix/pull/10307))
- Fix incomplete log compression due to timeout in the `log-rotate` plugin  ([PR #8620](https://github.com/apache/apisix/pull/8620))

## Changelog

For a complete list of changes in this release, please see [CHANGELOG](https://github.com/apache/apisix/blob/master/CHANGELOG.md#370).
