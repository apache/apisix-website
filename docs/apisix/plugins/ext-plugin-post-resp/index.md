# External Plugin Post-Response (ext-plugin-post-resp)

> This document contains information about the Apache APISIX ext-plugin-post-resp Plugin.

Source: https://apisix.apache.org/docs/apisix/plugins/ext-plugin-post-resp/

## Description

The `ext-plugin-post-resp` Plugin is for running specific external Plugins in the Plugin Runner before executing the built-in Lua Plugins.

The `ext-plugin-post-resp` plugin will be executed after the request gets a response from the upstream.

This plugin uses [lua-resty-http](https://github.com/api7/lua-resty-http) library under the hood to send requests to the upstream, due to which the [proxy-control](/docs/apisix/plugins/proxy-control/), [proxy-mirror](/docs/apisix/plugins/proxy-mirror/), and [proxy-cache](/docs/apisix/plugins/proxy-cache/) plugins are not available to be used alongside this plugin. Also, [mTLS Between APISIX and Upstream](/docs/apisix/mtls/#mtls-between-apisix-and-upstream) is not yet supported.

See [External Plugin](/docs/apisix/external-plugin/) to learn more.

:::note

Execution of External Plugins will affect the response of the current request.

:::

## Attributes

| Name              | Type    | Required | Default | Valid values                                                    | Description                                                                                                            |
|-------------------|---------|----------|---------|-----------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------|
| conf              | array   | False    |         | [{"name": "ext-plugin-A", "value": "{\"enable\":\"feature\"}"}] | List of Plugins and their configurations to be executed on the Plugin Runner.                                          |
| allow_degradation | boolean | False    | false   |                                                                 | Sets Plugin degradation when the Plugin Runner is not available. When set to `true`, requests are allowed to continue. |

## Enable Plugin

The example below enables the `ext-plugin-post-resp` Plugin on a specific Route:

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
        "ext-plugin-post-resp": {
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

To remove the `ext-plugin-post-resp` Plugin, you can delete the corresponding JSON configuration from the Plugin configuration. APISIX will automatically reload and you do not have to restart for this to take effect.

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
