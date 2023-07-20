---
title: "Release Apache APISIX 3.2.2"
authors:
  - name: "Xin Rong"
    title: "Author"
    url: "https://github.com/AlinsRan"
    image_url: "https://avatars.githubusercontent.com/u/79972061?v=4"
  - name: "Traky Deng"
    title: "Technical Writer"
    url: "https://github.com/kayx23"
    image_url: "https://avatars.githubusercontent.com/u/39619599?v=4"
keywords:
- Apache APISIX
- API Gateway
- API Management Platform
- New Release
- Cloud Native
description: The Apache APISIX 3.2.2 version is released on July 23, 2023. This release includes a list of fixes and optimizations.
tags: [Community]
---

We are pleased to present Apache APISIX 3.2.2 with a list of fixes and optimizations.

<!--truncate-->

## Fixes

### Upgrade `lua-resty-jwt` dependency version

Upgrade `lua-resty-jwt` dependency version from `0.2.4` to `0.2.5` to mitigate the risk of authentication bypass in APISIX `jwt-auth` plugin. ([PR #9837](https://github.com/apache/apisix/pull/9837))

### Implement optimizations for etcd

Support the use of one HTTP connection to watch the prefix for all etcd resources. This reduces the resource consumption and improved watch performance to be on par with gRPC connections. ([PR #9456](https://github.com/apache/apisix/pull/9456))

Enable keep-alive connections for etcd calls. ([PR #9420](https://github.com/apache/apisix/pull/9420))

### Fix the issue in `opentelemetry` and `grpc-transcode` plugins when used together

Fix the issue of `opentelemetry` and `grpc-transcode` plugins erroring out when used together. ([PR #9606](https://github.com/apache/apisix/pull/9606))

### Fix memory leaks in upstream health check

Fix memory leaks in upstream health check when the upstream nodes are configured in domain names. ([PR #9090](https://github.com/apache/apisix/pull/9090))

### Fix the issue in `wolf-rbac` plugin used with other plugins on consumer

Fix the issue of `wolf-rbac` plugin on consumer rendering other plugins on the consumer ineffective. ([PR #9298](https://github.com/apache/apisix/pull/9298))

### Fix the issue of using `mqtt_client_id` as a key in load balancing

Fix the issue of using `mqtt_client_id` as a key in upstream load balancing. ([PR #9450](https://github.com/apache/apisix/pull/9450))

### Fix the issue in `traffic-split` plugin host name resolution

Fix the issue where domain name configured in the `traffic-split` plugin is only resolved once. ([PR #9332](https://github.com/apache/apisix/pull/9332))

## Changelog

Read the changelog of this release [here](https://github.com/apache/apisix/blob/release/3.2/CHANGELOG.md#322).
