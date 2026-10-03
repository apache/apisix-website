# Global Rules

> This article describes how to use global rules.

Source: https://apisix.apache.org/docs/apisix/terminology/global-rule/

## Description

A [Plugin](/docs/apisix/terminology/plugin/) configuration can be bound directly to a [Route](/docs/apisix/terminology/route/), a [Service](/docs/apisix/terminology/service/) or a [Consumer](/docs/apisix/terminology/consumer/). But what if we want a Plugin to work on all requests? This is where we register a global Plugin with Global Rule.

Compared with the plugin configuration in Route, Service, Plugin Config, and Consumer, the plugin in the Global Rules is always executed first.

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
