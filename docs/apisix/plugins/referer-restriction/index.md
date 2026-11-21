# referer-restriction

> This document contains information about the Apache APISIX referer-restriction Plugin, which can be used to restrict access to a Service or a Route by whitelisting/blacklisting the Referer request header.

Source: https://apisix.apache.org/docs/apisix/plugins/referer-restriction/

## Description

The `referer-restriction` Plugin can be used to restrict access to a Service or a Route by whitelisting/blacklisting the `Referer` request header.

## Attributes

| Name           | Type          | Required | Default                          | Valid values | Description                                                                                       |
|----------------|---------------|----------|----------------------------------|--------------|---------------------------------------------------------------------------------------------------|
| whitelist      | array[string] | False    |                                  |              | List of hostnames to whitelist. A hostname can start with `*` for wildcard.                       |
| blacklist      | array[string] | False    |                                  |              | List of hostnames to blacklist. A hostname can start with `*` for wildcard.                       |
| message        | string        | False    | "Your referer host is not allowed" | [1, 1024]    | Message returned when access is not allowed.                                                      |
| bypass_missing | boolean       | False    | false                            |              | When set to `true`, bypasses the check when the `Referer` request header is missing or malformed. |

:::info[IMPORTANT]

Only one of `whitelist` or `blacklist` attribute must be specified. They cannot work together.

:::

## Enable Plugin

You can enable the Plugin on a specific Route or a Service as shown below:

:::note
You can fetch the `admin_key` from `config.yaml` and save to an environment variable with the following command:

```bash
admin_key=$(yq '.deployment.admin.admin_key[0].key' conf/config.yaml | sed 's/"//g')
```

:::

```shell
curl http://127.0.0.1:9180/apisix/admin/routes/1 -H "X-API-KEY: $admin_key" -X PUT -d '
{
    "uri": "/index.html",
    "upstream": {
        "type": "roundrobin",
        "nodes": {
            "127.0.0.1:1980": 1
        }
    },
    "plugins": {
        "referer-restriction": {
            "bypass_missing": true,
            "whitelist": [
                "xx.com",
                "*.xx.com"
            ]
        }
    }
}'
```

## Example usage

Once you have configured the Plugin as shown above, you can test it by setting `Referer: http://xx.com/x`:

```shell
curl http://127.0.0.1:9080/index.html -H 'Referer: http://xx.com/x'
```

```shell
HTTP/1.1 200 OK
...
```

Now, if you make a request with `Referer: http://yy.com/x`, the request will be blocked:

```shell
curl http://127.0.0.1:9080/index.html -H 'Referer: http://yy.com/x'
```

```shell
HTTP/1.1 403 Forbidden
...
{"message":"Your referer host is not allowed"}
```

Since we have set `bypass_missing` to `true`, a request without the `Referer` header will be successful as the check is skipped:

```shell
curl http://127.0.0.1:9080/index.html
```

```shell
HTTP/1.1 200 OK
...
```

## Delete Plugin

To remove the `referer-restriction` Plugin, you can delete the corresponding JSON configuration from the Plugin configuration. APISIX will automatically reload and you do not have to restart for this to take effect.

```shell
curl http://127.0.0.1:9180/apisix/admin/routes/1 -H "X-API-KEY: $admin_key" -X PUT -d '
{
    "uri": "/index.html",
    "plugins": {},
    "upstream": {
        "type": "roundrobin",
        "nodes": {
            "127.0.0.1:1980": 1
        }
    }
}'
```
