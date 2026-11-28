# Expose API

> This article describes how to publish services through the API Gateway Apache APISIX.

Source: https://apisix.apache.org/docs/apisix/tutorials/expose-api/

This article will guide you through APISIX's upstream, routing, and service concepts and introduce how to publish your services through APISIX.

## Concept introduction

### Upstream

[Upstream](/docs/apisix/terminology/upstream/) is a virtual host abstraction that performs load balancing on a given set of service nodes according to the configured rules.

The role of the Upstream is to load balance the service nodes according to the configuration rules, and Upstream information can be directly configured to the Route or Service.

When multiple routes or services refer to the same upstream, you can create an upstream object and use the upstream ID in the Route or Service to reference the upstream to reduce maintenance pressure.

### Route

[Routes](/docs/apisix/terminology/route/) match the client's request based on defined rules, load and execute the corresponding plugins, and forwards the request to the specified Upstream.

### Service

A [Service](/docs/apisix/terminology/service/) is an abstraction of an API (which can also be understood as a set of Route abstractions). It usually corresponds to an upstream service abstraction.

## Prerequisites

Please make sure you have [installed Apache APISIX](/docs/apisix/installation-guide/) before doing the following.

## Expose your service

1. Create an Upstream.

Create an Upstream service containing `httpbin.org` that you can use for testing. This is a return service that will return the parameters we passed in the request.

:::note
You can fetch the `admin_key` from `config.yaml` and save it to an environment variable with the following command:

```bash
admin_key=$(yq '.deployment.admin.admin_key[0].key' conf/config.yaml | sed 's/"//g')
```

:::

```
curl "http://127.0.0.1:9180/apisix/admin/upstreams/1" \
-H "X-API-KEY: $admin_key" -X PUT -d '
{
  "type": "roundrobin",
  "nodes": {
    "httpbin.org:80": 1
  }
}'
```

In this command, we use the Admin API key stored in `$admin_key`, use `roundrobin` as the load balancing mechanism, and set `httpbin.org:80` as the upstream service. To bind this upstream to a route, `upstream_id` needs to be set to `1` here. Here you can specify multiple upstreams under `nodes` to achieve load balancing.

For more information, please refer to [Upstream](/docs/apisix/terminology/upstream/).

2. Create a Route.

```shell
curl "http://127.0.0.1:9180/apisix/admin/routes/1" \
-H "X-API-KEY: $admin_key" -X PUT -d '
{
  "methods": ["GET"],
  "host": "example.com",
  "uri": "/anything/*",
  "upstream_id": "1"
}'
```

:::note

Adding an `upstream` object to your route can achieve the above effect.

```shell
curl "http://127.0.0.1:9180/apisix/admin/routes/1" \
-H "X-API-KEY: $admin_key" -X PUT -d '
{
  "methods": ["GET"],
  "host": "example.com",
  "uri": "/anything/*",
  "upstream": {
    "type": "roundrobin",
    "nodes": {
      "httpbin.org:80": 1
    }
  }
}'
```

:::

3. Test

After creating the Route, you can test the Service with the following command:

```
curl -i -X GET "http://127.0.0.1:9080/anything/get?foo1=bar1&foo2=bar2" -H "Host: example.com"
```

APISIX will forward the request to `http://httpbin.org:80/anything/get?foo1=bar1&foo2=bar2`.

## More Tutorials

You can refer to [Protect API](/docs/apisix/tutorials/protect-api/) to protect your API.

You can also use APISIX's [Plugin](/docs/apisix/terminology/plugin/) to achieve more functions.
