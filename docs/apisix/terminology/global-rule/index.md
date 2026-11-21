# Global Rules

> This article describes how to use global rules.

Source: https://apisix.apache.org/docs/apisix/terminology/global-rule/

## Description

A [Global Rule](/docs/apisix/admin-api/#global-rule) configures [Plugins](/docs/apisix/terminology/plugin/) for incoming requests independently of Plugins bound to a [Route](/docs/apisix/terminology/route/), [Service](/docs/apisix/terminology/service/), [Consumer](/docs/apisix/terminology/consumer/), or [Plugin Config](/docs/apisix/terminology/plugin-config/). Rate-limiting and observability Plugins are often enabled globally to apply consistent behavior across APIs.

Global Rule Plugins run before locally bound Plugins within the same phase. The complete order is global `rewrite`, local `rewrite`, global `access`, then local `access`. A global `access` handler therefore does not run before a local `rewrite` handler. Priorities order Plugins within each phase and scope, and an early response prevents later handlers from running. See [Plugins execution order](/docs/apisix/terminology/plugin/#plugins-execution-order) for details.

## Example

The example below shows how you can use the `limit-count` Plugin on all requests:

:::note
You can fetch the `admin_key` from `config.yaml` and save to an environment variable with the following command:

```bash
admin_key=$(yq '.deployment.admin.admin_key[0].key' conf/config.yaml | sed 's/"//g')
```

:::

```shell
curl -X PUT \
  http://{apisix_listen_address}/apisix/admin/global_rules/1 \
  -H 'Content-Type: application/json' \
  -H "X-API-KEY: $admin_key" \
  -d '{
        "plugins": {
            "limit-count": {
                "time_window": 60,
                "policy": "local",
                "count": 2,
                "key": "remote_addr",
                "rejected_code": 503
            }
        }
    }'
```

You can also list all the Global rules by making this request with the Admin API:

```shell
curl http://{apisix_listen_address}/apisix/admin/global_rules -H "X-API-KEY: $admin_key"
```
