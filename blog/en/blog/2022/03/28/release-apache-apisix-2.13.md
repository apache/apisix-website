---
title: "Release Apache APISIX 2.13.0"
authors:
  - name: "Zexuan Luo"
    title: "Author"
    url: "https://github.com/spacewander"
    image_url: "https://avatars.githubusercontent.com/u/4161644?v=4"
  - name: "Yilin Zeng"
    title: "Technical Writer"
    url: "https://github.com/yzeng25"
    image_url: "https://github.com/yzeng25.png"
keywords: 
- Apache APISIX
- API Gateway
- Service Discovery
- Release Notes
- LTS version
description: Apache APISIX 2.13.0 LTS version is released. This version not only has more stable performance, but also supports more observability and service discovery plugins.
tags: [Community]
---

> Apache APISIX community has rolled out a new LTS version, 2.13.0. This version not only delivers more stable performance, but also supports more observability and service discovery plugins, as well as a more robust multilingual development system.

<!--truncate-->

It has been more than half a year since the last LTS release of Apache APISIX, and today the Apache APISIX community is bringing a new LTS release, 2.13.0, which is not only more stable, but also supports more observability and service discovery plugins, and a more complete multilingual development system.

If you're trying to find a balance between stability and new features, Apache APISIX 2.13.0 is an ideal choice. Since 2.13.0 is a LTS version, we will release a series of patch releases based on 2.13.0.

![Apache APISIX 2.13.0 Features Preview](https://static.apiseven.com/202108/1648452101951-d69cb087-a6b4-490f-9a7b-47e122f72240.png)

## Features Preview

### New Change: API Is No Longer Exposed by Default

In versions prior to 2.13.0, we allowed plugins to register APIs that could be called by clients. For example, the `jwt-auth` plugin would register a JWT-signed interface that could be accessed by clients to generate signatures for validation. However, this design has a  drawback - since it is the interface that is exposed and not the route, it is not possible to enforce security for it in the same way as for routes. While existing mechanisms allow users to intercept interface access by writing a corresponding plugin interceptor, there are still security risks in this approach.

**Starting with version 2.13.0, we decide to make a major change and no longer expose the API by default**. If a user needs to expose an interface, they need to bind the interface to the corresponding route via the `public-api` plugin. This approach brings two benefits.

1. registered APIs will have higher visibility, currently registered APIs only take effect through display configuration, and access is user-defined.
2. More security options are allowed, and registered APIs have the same permission controls as routes.

Of course, there are other new changes in version 2.13.0, such as fixing unusual behaviors in previous versions. See [Apache APISIX 2.13.0 Changelog](https://github.com/apache/apisix/blob/release/2.13/CHANGELOG.md#2130) for detailed information.

### New Features: Enhancements in Observability

As an API gateway, Apache APISIX has been working to connect more services and open up more observability upstream and downstream. We've been puting efforts in this field with every release, and 2.13.0 is also included.

**This time we have added a new tracing plugin: `opentelemetry`, which allows sending OpenTelemetry tracing data to the configured collector**. Here is an example.

The collector is set in the static configuration.

```yaml
plugin_attr:
  opentelemetry:
    resource:
      service.name: APISIX
      tenant.id: business_id
    collector:
      address: "127.0.0.1:4317"
    batch_span_processor:
      drop_on_queue_full: false
      max_queue_size: 6
      batch_timeout: 2
      inactive_timeout: 1
      max_export_batch_size: 2
```

After that, tracing can be enabled on a specific route.

```shell
curl http://127.0.0.1:9080/apisix/admin/routes/1  \
-H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "methods": ["GET"],
    "uris": [
        "/uid/*"
    ],
    "plugins": {
        "opentelemetry": {
            "sampler": {
                "name": "always_on"
            }
        }
    },
    "upstream": {
        "type": "roundrobin",
        "nodes": {
            "127.0.0.1:8089": 1
        }
    }
}'
```

Requests that hit this route will report OpenTelemetry data to the corresponding collector.

In addition, we have added two new logging plugins that support reporting logs to ClickHouse and Loggly.

ClickHouse is one of the fastest OLAP databases in the world. Apache APISIX supports sending access logs and error logs to ClickHouse, as shown in the following example.

```shell
curl http://127.0.0.1:9080/apisix/admin/routes/1  \
-H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
      "plugins": {
            "clickhouse-logger": {
                "user": "default",
                "password": "a",
                "database": "default",
                "logtable": "test",
                "endpoint_addr": "http://127.0.0.1:8123"
            }
       },
      "upstream": {
           "type": "roundrobin",
           "nodes": {
               "127.0.0.1:1980": 1
           }
      },
      "uri": "/hello"
}'
```

```shell
curl http://127.0.0.1:9080/apisix/admin/plugin_metadata/error-log-logger  \
-H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
  "clickhouse": {
      "user": "default",
      "password": "a",
      "database": "error_log",
      "logtable": "t",
      "endpoint_addr": "http://127.0.0.1:8123"
  }
}'
```

Loggly is SolarWinds' SaaS platform for log processing, and we support sending access logs via syslog or HTTP/HTTPS. Examples are as follows.

Configure reporting method.

```shell
curl http://127.0.0.1:9080/apisix/admin/plugin_metadata/loggly  \
-H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
   "protocol": "http"
}'
```

Configure the routes that need to be reported.

```shell
curl http://127.0.0.1:9080/apisix/admin/routes/1  \
-H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "plugins":{
        "loggly":{
            "customer_token":"xxx",
        }
    },
    "upstream":{
        "type":"roundrobin",
        "nodes":{
            "127.0.0.1:80":1
        }
    },
    "uri":"/index.html"
}'
```

### Better Multilingual Development System

Apache APISIX has supported Wasm (Proxy Wasm SDK) since version 2.11, but the LTS version has not provided support for it. We add and improv this feature in 2.13.0.

After six months of development with over 10,000 lines of code (including testing and documentation), APISIX now has full support for running Wasm code in all four phases of **processing request headers, request bodies, response headers, and response bodies**. Apache APISIX 2.13.0 is the first LTS release to support Wasm, and we consider it as a milestone.

In addition to Wasm, we are also working on a traditional, RPC-based multilingual plugin system. Not long ago, we released Python Runner version 0.2.0. In a few days, we will also release Go Runner 0.3.0.

## Bugfixes

- SkyWalking and OpenTelemetry do not track authentication failures.
- `log-rotate` cutting logs do not support completion by hours.
- `deepcopy` does not copy `metatable`.
- `request-validate` handling of duplicate keys in JSON.
- `prometheus` duplicate calculation metrics.
- `conf.method` in `proxy-rewrite` does not work when `conf.headers` is missing.
- `traffic-split` fails to match when the first rule fails.
- etcd timeout triggers `resync_delay`.
- `proto` definition conflict.
- `limit-count` configuration remains unchanged and resets the counter.
- Admin API's `plugin-metadata` count and `global-rule` count report wrong count numbers.
- Labels are missing when merging route and service.

## More Details

In addition to the above features and components, Apache APISIX version 2.13.0 has been updated with the following features.

- grpc-transcode support for processing proto definitions with import via `.pb` files.
- Support for fetching upstream nodes from K8s configuration.
- Added `csrf` plugin to provide protection against cross-site request forgery.
- Add `mocking` plugin to generate test data easily.
