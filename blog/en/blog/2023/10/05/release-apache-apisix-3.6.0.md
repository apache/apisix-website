---
title: "Release Apache APISIX 3.6.0"
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
description: The Apache APISIX 3.6.0 version is released on October 5, 2023. This release includes a few new features, bug fixes, and continuous improvements to user experiences.
tags: [Community]
---

We are glad to present Apache APISIX 3.6.0 with exciting new features, bug fixes, and other improvements to user experiences.

<!--truncate-->

This new release adds a number of new features, including the support for using local DNS resolvers in service discovery, forwarding Dubbo traffic, the use of NGINX variables in `opentelemetry` plugin, and more.

There are also a few important changes included in this release. Should you find these changes impacting your operations, please plan your upgrade accordingly.

## Breaking Changes

### Remove gRPC support between APISIX and etcd

The support of gPRC communication between APISIX and etcd is removed in this release, which removes `etcd.use_grpc` option in the configuration files. The change resolves a few bugs.

If you are currently using gRPC between APISIX and etcd, please plan for a change to use HTTP.

For more information, see [change proposal](https://lists.apache.org/thread/b69vjkbdszdtk9y30k45c2tvg4f3hqwt) and [PR #10015](https://github.com/apache/apisix/pull/10015).

### Remove Conf Server

Conf server is removed following the removal of gRPC support between APISIX and etcd. The change resolves a few bugs.

If you are currently deploying APISIX in decoupled mode, please note that in this release, data plane (DP) APISIX instance no longer directly communicates with the control plane (CP) APISIX instance. Both instances now communicate with etcd. Please plan for a change to update the configurations accordingly as per the [decoupled mode documentation](https://github.com/apache/apisix/blob/release/3.6/docs/en/latest/deployment-modes.md#decoupled).

For more information, see [change proposal](https://lists.apache.org/thread/b69vjkbdszdtk9y30k45c2tvg4f3hqwt) and [PR #10012](https://github.com/apache/apisix/pull/10012).

### Enforce strict schema validation of the APISIX core resources

Enforce strict schema validation on the APISIX core resources.

For example, if you configure a custom field to the upstream:

```shell
curl http://127.0.0.1:9180/apisix/admin/upstreams/1 -X PUT \
  -H "X-API-KEY: ${ADMIN_API_KEY}" \
  -d '{
    "type": "roundrobin",
    "nodes": {
      "127.0.0.1:8080": 1
    },
    "custom_field": "this_is_not_allowed"
  }'
```

You should receive a `400` response of the following:

```text
{"error_msg":"invalid configuration: additional properties forbidden found .*"\}
```

For more information, see [PR #10233](https://github.com/apache/apisix/pull/10233).

## New Features

### Support the use of local DNS resolvers for service discovery

Support the configuration of local DNS resolvers for service discovery. The configuration files now offer a new option `resolv_conf`, where you can specify the path to the file with a list of local DNS resolvers.

You should configure only one of the `servers` and `resolv_conf`, such as the following:

```yaml title="conf/config.yaml"
discovery:
  dns:
    # servers:
    #  - "127.0.0.1:8600"          # Address of DNS server.
    resolv_conf: /etc/resolv.conf  # Path to the local DNS resolver config.
```

For more information, see [PR #9770](https://github.com/apache/apisix/pull/9770).

### Support direct forwarding of Dubbo traffic

Support Dubbo protocol in xRPC, which allows APISIX to directly forward Dubbo traffic.

For more information, see [PR #9660](https://github.com/apache/apisix/pull/9660).

### Support the use of NGINX variables in `opentelemetry` plugin

Support the use of NGINX variables in `opentelemetry` plugin. For example, you can configure the configuration file as follows:

```yaml title="conf/config.yaml"
http:
  enable_access_log: true
  access_log: "/dev/stdout"
  access_log_format: '{"time": "$time_iso8601","opentelemetry_context_traceparent": "$opentelemetry_context_traceparent","opentelemetry_trace_id": "$opentelemetry_trace_id","opentelemetry_span_id": "$opentelemetry_span_id","remote_addr": "$remote_addr","uri": "$uri"}'
  access_log_format_escape: json
plugins:
  - opentelemetry
plugin_attr:
  opentelemetry:
    set_ngx_var: true
```

For more information, see [PR #8871](https://github.com/apache/apisix/pull/8871).

### Support rewriting request body in external plugins

Support the rewrite of request body in external (i.e. non-Lua) plugins.

For more information, see [PR #9990](https://github.com/apache/apisix/pull/9990).

## Other Updates

- Support configuring the buffer size for the access log ([PR #10225](https://github.com/apache/apisix/pull/10225))
- Remove Rust dependency to simplify installation ([PR #10121](https://github.com/apache/apisix/pull/10121))
- Support HTTPS in `traffic-split` plugin ([PR #9115](https://github.com/apache/apisix/pull/9115))
- Support UNIX sock host pattern in the `chaitin-waf` plugin ([PR #10161](https://github.com/apache/apisix/pull/10161))
- Fix GraphQL POST request route matching exception ([PR #10198](https://github.com/apache/apisix/pull/10198))
- Add error handlers for invalid `cache_zone` in the `proxy-cache` plugin ([PR #10138](https://github.com/apache/apisix/pull/10138))

## Changelog

For a complete list of changes in this release, please see [CHANGELOG](https://github.com/apache/apisix/blob/master/CHANGELOG.md#360).
