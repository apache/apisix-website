---
title: "Release Apache APISIX 3.4.0"
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
description: The Apache APISIX 3.4.0 version is released on June 30, 2023. This version adds a new plugin for Grafana Loki, allows for mTLS connection on the route level, and made performance optimization to continuously enhance the user experience of APISIX.
tags: [Community]
---

We are pleased to present Apache APISIX 3.4.0 with exciting new features and performance improvements.

<!--truncate-->

This release provides a new plugin `loki-logger` to forward logs to [Grafana Loki](https://grafana.com/oss/loki/), and allows for mTLS connection on the route level. In addition, the release also includes many other updates to continuously enhance the user experience of APISIX.

## New Features

### Support integration with Grafana Loki using the `loki-logger` plugin

The `loki-logger` plugin is used to forward logs to [Grafana Loki](https://grafana.com/oss/loki/) for analysis and storage.

When the plugin is enabled, APISIX serializes the request context information to [log entries in JSON](https://grafana.com/docs/loki/latest/api/#push-log-entries-to-loki) and submits it to the batch queue. When the maximum batch size is reached, the data in the queue is pushed to Loki.

For example, you can enable the `loki-logger` plugin on a specific route:

```shell
curl http://127.0.0.1:9180/apisix/admin/routes/1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "plugins": {
        "loki-logger": {
            "endpoint_addrs" : ["http://127.0.0.1:3100"]
        }
    },
    "upstream": {
       "nodes": {
           "127.0.0.1:1980": 1
       },
       "type": "roundrobin"
    },
    "uri": "/hello"
}'
```

If successful, APISIX logs should be forwarded to Loki running at `http://127.0.0.1:3100`.

For more information about the plugin, see `loki-logger` [plugin doc](https://github.com/apache/apisix/blob/release/3.4/docs/en/latest/plugins/loki-logger.md).

PR for this feature could be found here [#9399](https://github.com/apache/apisix/pull/9399).

### Support route-level mTLS

Support configuring mTLS on the route level. The Admin API SSL object now has a new configuration option, `client.skip_mtls_uri_regex`. Users can specify a list of URIs (RegEx supported) in this option, for which the verification of the client certificate should be skipped.

For example, you can configure a route-level mTLS such as the following:

```shell
curl http://127.0.0.1:9180/apisix/admin/routes/1 \
-H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "uri": "/*",
    "upstream": {
        "nodes": {
            "httpbin.org": 1
        }
    }
}'
```

```shell
curl http://127.0.0.1:9180/apisix/admin/ssls/1 \
-H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "cert": "'"$(path/to/certs/mtls_server.crt)"'",
    "key": "'"$(path/to/certs/mtls_server.key)"'",
    "snis": [
        "*.apisix.dev"
    ],
    "client": {
        "ca": "'"$(path/to/certs/mtls_ca.crt)"'",
        "depth": 10,
        "skip_mtls_uri_regex": [
            "/anything.*"
        ]
    }
}'
```

If the URI of a request is in the `skip_mtls_uri_regex` list, then the client certificate will not be checked. Note that other URIs of the associated SNI will get HTTP 400 response instead of an alert error in the SSL handshake phase, if the client certificate is missing or invalid.

For a detailed example, see [Tutorial: mTLS bypass based on regular expression matching against URI](https://github.com/apache/apisix/blob/release/3.4/docs/en/latest/tutorials/client-to-apisix-mtls.md#mtls-bypass-based-on-regular-expression-matching-against-uri).

PR for this feature could be found here [#9322](https://github.com/apache/apisix/pull/9322).

## Other Updates

* Support the use of one HTTP connection to watch the prefix for all etcd resources. This reduces the resource consumption and improved watch performance to be on par with gRPC connections ([PR #9456](https://github.com/apache/apisix/pull/9456))
* Support multiple RegEx patterns in the `proxy_rewrite` plugin ([PR #9194](https://github.com/apache/apisix/pull/9194))
* Allow users to configure `DEFAULT_BUCKETS` in the `prometheus` plugin ([PR #9673](https://github.com/apache/apisix/pull/9673))

## Changelog

For a complete list of new features and bug fixes included in this release, please see [CHANGELOG](https://github.com/apache/apisix/blob/master/CHANGELOG.md).
