# Protect API

> This article describes how to secure your API with the rate limiting plugin for API Gateway Apache APISIX.

Source: https://apisix.apache.org/docs/apisix/tutorials/protect-api/

This article describes secure your API with the rate limiting plugin for API Gateway Apache APISIX.

## Concept introduction

### Plugin

This represents the configuration of the plugins that are executed during the HTTP request/response lifecycle. A [Plugin](/docs/apisix/terminology/plugin/) configuration can be bound directly to a Route, a Service, a Consumer or a Plugin Config.

:::note

If [Route](/docs/apisix/terminology/route/), [Service](/docs/apisix/terminology/service/), [Plugin Config](/docs/apisix/terminology/plugin-config/) or [Consumer](/docs/apisix/terminology/consumer/) are all bound to the same for plugins, only one plugin configuration will take effect. The priority of plugin configurations is described in [plugin execution order](/docs/apisix/terminology/plugin/#plugins-execution-order). At the same time, there are various stages involved in the plugin execution process. See [plugin execution lifecycle](/docs/apisix/terminology/plugin/#plugins-execution-order).

:::

## Preconditions

Before following this tutorial, ensure you have [exposed the service](/docs/apisix/tutorials/expose-api/).

## Protect your API

We can use rate limits to limit our API services to ensure the stable operation of API services and avoid system crashes caused by some sudden traffic. We can restrict as follows:

1. Limit the request rate;
2. Limit the number of requests per unit time;
3. Delay request;
4. Reject client requests;
5. Limit the rate of response data.

APISIX provides several plugins for limiting current and speed, including [limit-conn](/docs/apisix/plugins/limit-conn/), [limit-count](/docs/apisix/plugins/limit-count/), [limit- req](/docs/apisix/plugins/limit-req/) and other plugins.

- The `limit-conn` Plugin limits the number of concurrent requests to your services.
- The `limit-req` Plugin limits the number of requests to your service using the leaky bucket algorithm.
- The `limit-count` Plugin limits the number of requests to your service by a given count per time.

Next, we will use the `limit-count` plugin as an example to show you how to protect your API with a rate limit plugin:

:::note
You can fetch the `admin_key` from `config.yaml` and save to an environment variable with the following command:

```bash
admin_key=$(yq '.deployment.admin.admin_key[0].key' conf/config.yaml | sed 's/"//g')
```

:::

1. Create a Route.

```shell
curl -i http://127.0.0.1:9180/apisix/admin/routes/1 \
-H "X-API-KEY: $admin_key" -X PUT -d '
{
    "uri": "/index.html",
    "plugins": {
        "limit-count": {
            "count": 2,
            "time_window": 60,
            "rejected_code": 503,
            "key_type": "var",
            "key": "remote_addr"
        }
    },
  "upstream_id": "1"
}'
```

In the above configuration, a Route with ID `1` is created using the upstream made in [Expose Service](/docs/apisix/tutorials/expose-api/), and the `limit-count` plugin is enabled. The plugin only allows the client to access the upstream service `2` times within `60` seconds. If more than two times, the `503` error code will be returned.

2. Test

```shell
curl http://127.0.0.1:9080/index.html
```

After using the above command to access three times in a row, the following error will appear:

```
<html>
<head><title>503 Service Temporarily Unavailable</title></head>
<body>
<center><h1>503 Service Temporarily Unavailable</h1></center>
<hr><center>openresty</center>
</body>
</html>
```

If the above result is returned, the `limit-count` plugin has taken effect and protected your API.

## More Traffic plugins

In addition to providing plugins for limiting current and speed, APISIX also offers many other plugins to meet the needs of actual scenarios:

- [proxy-cache](/docs/apisix/plugins/proxy-cache/): This plugin provides the ability to cache backend response data. It can be used with other plugins. The plugin supports both disk and memory-based caching. Currently, the data to be cached can be specified according to the response code and request mode, and more complex caching strategies can also be configured through the no_cache and cache_bypass attributes.
- [request-validation](/docs/apisix/plugins/request-validation/): This plugin is used to validate requests forwarded to upstream services in advance.
- [proxy-mirror](/docs/apisix/plugins/proxy-mirror/): This plugin provides the ability to mirror client requests. Traffic mirroring is copying the real online traffic to the mirroring service, so that the online traffic or request content can be analyzed in detail without affecting the online service.
- [api-breaker](/docs/apisix/plugins/api-breaker/): This plugin implements an API circuit breaker to help us protect upstream business services.
- [traffic-split](/docs/apisix/plugins/traffic-split/): You can use this plugin to gradually guide the percentage of traffic between upstreams to achieve blue-green release and grayscale release.
- [request-id](/docs/apisix/plugins/request-id/): The plugin adds a `unique` ID to each request proxy through APISIX for tracking API requests.
- [proxy-control](/docs/apisix/plugins/proxy-control/): This plugin can dynamically control the behavior of NGINX proxy.
- [client-control](/docs/apisix/plugins/client-control/): This plugin can dynamically control how NGINX handles client requests by setting an upper limit on the client request body size.

## More Tutorials

You can refer to the [Observe API](/docs/apisix/tutorials/observe-your-api/) document to monitor APISIX, collect logs, and track.
