# External Plugin Pre-Request (ext-plugin-pre-req)

> This document contains information about the Apache APISIX ext-plugin-pre-req Plugin.

Source: https://apisix.apache.org/docs/apisix/plugins/ext-plugin-pre-req/

## Description

The `ext-plugin-pre-req` Plugin is for running specific external Plugins in the Plugin Runner before executing the built-in Lua Plugins.

See [External Plugin](/docs/apisix/external-plugin/) to learn more.

:::note

Execution of External Plugins will affect the behavior of the current request.

:::

## Attributes

| Name              | Type    | Required | Default | Valid values                                                    | Description                                                                                                            |
|-------------------|---------|----------|---------|-----------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------|
| conf              | array   | False    |         | [{"name": "ext-plugin-A", "value": "{\"enable\":\"feature\"}"}] | List of Plugins and their configurations to be executed on the Plugin Runner.                                          |
| allow_degradation | boolean | False    | false   |                                                                 | Sets Plugin degradation when the Plugin Runner is not available. When set to `true`, requests are allowed to continue. |

## Enable Plugin

The example below enables the `ext-plugin-pre-req` Plugin on a specific Route:

:::note
You can fetch the `admin_key` from `config.yaml` and save to an environment variable with the following command:

```bash
admin_key=$(yq '.deployment.admin.admin_key[0].key' conf/config.yaml | sed 's/"//g')
```

:::

```shell
curl -i http://127.0.0.1:9180/apisix/admin/routes/1  -H "X-API-KEY: $admin_key" -X PUT -d '
{
    "uri": "/index.html",
    "plugins": {
        "ext-plugin-pre-req": {
            "conf" : [
                {"name": "ext-plugin-A", "value": "{\"enable\":\"feature\"}"}
            ]
        }
    },
    "upstream": {
        "type": "roundrobin",
        "nodes": {
            "127.0.0.1:1980": 1
        }
    }
}'
```

## Example usage

Once you have configured the External Plugin as shown above, you can make a request to execute the Plugin:

```shell
curl -i http://127.0.0.1:9080/index.html
```

This will reach the configured Plugin Runner and the `ext-plugin-A` will be executed.

## Delete Plugin

To remove the `ext-plugin-pre-req` Plugin, you can delete the corresponding JSON configuration from the Plugin configuration. APISIX will automatically reload and you do not have to restart for this to take effect.

```shell
curl http://127.0.0.1:9180/apisix/admin/routes/1  -H "X-API-KEY: $admin_key" -X PUT -d '
{
    "uri": "/index.html",
    "upstream": {
        "type": "roundrobin",
        "nodes": {
            "127.0.0.1:1980": 1
        }
    }
}'
```
