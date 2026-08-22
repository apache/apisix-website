# proxy-control

> This document contains information about the Apache APISIX proxy-control Plugin, you can use it to control the behavior of the NGINX proxy dynamically.

Source: https://apisix.apache.org/docs/apisix/plugins/proxy-control/

## Description

The proxy-control Plugin dynamically controls the behavior of the NGINX proxy.

:::info[IMPORTANT]

This Plugin requires APISIX to run on [APISIX-Runtime](/docs/apisix/FAQ/#how-do-i-build-the-apisix-runtime-environment). See [apisix-build-tools](https://github.com/api7/apisix-build-tools) for more info.

:::

## Attributes

| Name              | Type    | Required | Default | Description                                                                                                                                                                 |
| ----------------- | ------- | -------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| request_buffering | boolean | False    | true    | When set to `true`, the Plugin dynamically sets the [`proxy_request_buffering`](https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_request_buffering) directive. |

## Enable Plugin

The example below enables the Plugin on a specific Route:

:::note
You can fetch the `admin_key` from `config.yaml` and save to an environment variable with the following command:

```bash
admin_key=$(yq '.deployment.admin.admin_key[0].key' conf/config.yaml | sed 's/"//g')
```

:::

```shell
curl -i http://127.0.0.1:9180/apisix/admin/routes/1 \
  -H "X-API-KEY: $admin_key" -X PUT -d '
{
    "uri": "/upload",
    "plugins": {
        "proxy-control": {
            "request_buffering": false
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

The example below shows the use case of uploading a big file:

```shell
curl -i http://127.0.0.1:9080/upload -d @very_big_file
```

It's expected to not find a message "a client request body is buffered to a temporary file" in the error log.

## Delete Plugin

To remove the `proxy-control` Plugin, you can delete the corresponding JSON configuration from the Plugin configuration. APISIX will automatically reload and you do not have to restart for this to take effect.

```shell
curl -i http://127.0.0.1:9180/apisix/admin/routes/1 \
  -H "X-API-KEY: $admin_key" -X PUT -d '
{
    "uri": "/upload",
    "upstream": {
        "type": "roundrobin",
        "nodes": {
            "127.0.0.1:1980": 1
        }
    }
}'
```
