# kafka-proxy

> This document contains information about the Apache APISIX kafka-proxy Plugin.

Source: https://apisix.apache.org/zh/docs/apisix/plugins/kafka-proxy/

## Description

The `kafka-proxy` plugin can be used to configure advanced parameters for the kafka upstream of Apache APISIX, such as SASL authentication.

## Attributes

| Name              | Type    | Required | Default | Valid values  | Description                        |
|-------------------|---------|----------|---------|---------------|------------------------------------|
| sasl              | object  | optional |         | {"username": "user", "password" :"pwd"} | SASL/PLAIN authentication configuration, when this configuration exists, turn on SASL authentication; this object will contain two parameters username and password, they must be configured. |
| sasl.username     | string  | required |         |               | SASL/PLAIN authentication username |
| sasl.password     | string  | required |         |               | SASL/PLAIN authentication password |

NOTE: `encrypt_fields = {"sasl.password"}` is also defined in the schema, which means that the field will be stored encrypted in etcd. See [encrypted storage fields](/docs/apisix/plugin-develop/#encrypted-storage-fields).

:::note
If SASL authentication is enabled, the `sasl.username` and `sasl.password` must be set.
The current SASL authentication only supports PLAIN mode, which is the username password login method.
:::

## Example usage

When we use scheme as the upstream of kafka, we can add kafka authentication configuration to it through this plugin.

```shell
curl -X PUT 'http://127.0.0.1:9180/apisix/admin/routes/r1' \
    -H 'X-API-KEY: <api-key>' \
    -H 'Content-Type: application/json' \
    -d '{
    "uri": "/kafka",
    "plugins": {
        "kafka-proxy": {
            "sasl": {
                "username": "user",
                "password": "pwd"
            }
        }
    },
    "upstream": {
        "nodes": {
            "kafka-server1:9092": 1,
            "kafka-server2:9092": 1,
            "kafka-server3:9092": 1
        },
        "type": "none",
        "scheme": "kafka"
    }
}'
```

Now, we can test it by connecting to the `/kafka` endpoint via websocket.

## Delete Plugin

To remove the `kafka-proxy` Plugin, you can delete the corresponding JSON configuration from the Plugin configuration. APISIX will automatically reload and you do not have to restart for this to take effect.
