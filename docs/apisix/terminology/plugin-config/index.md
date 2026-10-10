# Plugin Config

> Plugin Config in Apache APISIX.

Source: https://apisix.apache.org/docs/apisix/terminology/plugin-config/

## Description

Plugin Configs are used to extract commonly used [Plugin](/docs/apisix/terminology/plugin/) configurations and can be bound directly to a [Route](/docs/apisix/terminology/route/).

While configuring the same plugin, only one copy of the configuration is valid. Please read the [plugin execution order](/docs/apisix/terminology/plugin/#plugins-execution-order) and [plugin merging order](/docs/apisix/terminology/plugin/#plugins-merging-precedence).

## Example

The example below illustrates how to create a Plugin Config and bind it to a Route:

:::note
You can fetch the `admin_key` from `config.yaml` and save to an environment variable with the following command:

```bash
admin_key=$(yq '.deployment.admin.admin_key[0].key' conf/config.yaml | sed 's/"//g')
```

:::

```shell
curl http://127.0.0.1:9180/apisix/admin/plugin_configs/1 \
-H "X-API-KEY: $admin_key" -X PUT -i -d '
{
    "desc": "blah",
    "plugins": {
        "limit-count": {
            "count": 2,
            "time_window": 60,
            "rejected_code": 503
        }
    }
}'
```

```shell
curl http://127.0.0.1:9180/apisix/admin/routes/1 \
-H "X-API-KEY: $admin_key" -X PUT -i -d '
{
    "uris": ["/index.html"],
    "plugin_config_id": 1,
    "upstream": {
        "type": "roundrobin",
        "nodes": {
            "127.0.0.1:1980": 1
        }
    }
}'
```

When APISIX can't find the Plugin Config with the `id`, the requests reaching this Route are terminated with a status code of `503`.

:::note

If a Route already has the `plugins` field configured, the plugins in the Plugin Config will effectively be merged to it.

The same plugin in the Plugin Config will not override the ones configured directly in the Route. For more information, see [Plugin](/docs/apisix/terminology/plugin/).

:::

For example, if you configure a Plugin Config as shown below:

```shell
curl http://127.0.0.1:9180/apisix/admin/plugin_configs/1 \
 -H "X-API-KEY: $admin_key" -X PUT -i -d '
{
    "desc": "I am plugin_config 1",
    "plugins": {
        "ip-restriction": {
            "whitelist": [
                "127.0.0.0/24",
                "113.74.26.106"
            ]
        },
        "limit-count": {
            "count": 2,
            "time_window": 60,
            "rejected_code": 503
        }
    }
}'
```

to a Route as shown below,

```shell
curl http://127.0.0.1:9180/apisix/admin/routes/1 \
-H "X-API-KEY: $admin_key" -X PUT -i -d '
{
    "uris": ["/index.html"],
    "plugin_config_id": 1,
    "upstream": {
        "type": "roundrobin",
        "nodes": {
            "127.0.0.1:1980": 1
        }
    }
    "plugins": {
        "proxy-rewrite": {
            "uri": "/test/add",
            "host": "apisix.iresty.com"
        },
        "limit-count": {
            "count": 20,
            "time_window": 60,
            "rejected_code": 503,
            "key": "remote_addr"
        }
    }
}'
```

the effective configuration will be as the one shown below:

```shell
curl http://127.0.0.1:9180/apisix/admin/routes/1 \
-H "X-API-KEY: $admin_key" -X PUT -i -d '
{
    "uris": ["/index.html"],
    "upstream": {
        "type": "roundrobin",
        "nodes": {
            "127.0.0.1:1980": 1
        }
    }
    "plugins": {
        "ip-restriction": {
            "whitelist": [
                "127.0.0.0/24",
                "113.74.26.106"
            ]
        },
        "proxy-rewrite": {
            "uri": "/test/add",
            "host": "apisix.iresty.com"
        },
        "limit-count": {
            "count": 20,
            "time_window": 60,
            "rejected_code": 503
        }
    }
}'
```
