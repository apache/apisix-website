# Consumer Group

> Consumer Group in Apache APISIX.

Source: https://apisix.apache.org/docs/apisix/terminology/consumer-group/

## Description

Consumer Groups are used to extract commonly used [Plugin](/docs/apisix/terminology/plugin/) configurations and can be bound directly to a [Consumer](/docs/apisix/terminology/consumer/).

With consumer groups, you can define any number of plugins, e.g. rate limiting and apply them to a set of consumers,
instead of managing each consumer individually.

## Example

The example below illustrates how to create a Consumer Group and bind it to a Consumer.

Create a Consumer Group which shares the same rate limiting quota:

:::note
You can fetch the `admin_key` from `config.yaml` and save to an environment variable with the following command:

```bash
admin_key=$(yq '.deployment.admin.admin_key[0].key' conf/config.yaml | sed 's/"//g')
```

:::

```shell
curl http://127.0.0.1:9180/apisix/admin/consumer_groups/company_a \
-H "X-API-KEY: $admin_key" -X PUT -d '
{
    "plugins": {
        "limit-count": {
            "count": 200,
            "time_window": 60,
            "rejected_code": 503,
            "group": "grp_company_a"
        }
    }
}'
```

Create a Consumer within the Consumer Group:

```shell
curl http://127.0.0.1:9180/apisix/admin/consumers \
-H "X-API-KEY: $admin_key" -X PUT -d '
{
    "username": "jack",
    "plugins": {
        "key-auth": {
            "key": "auth-one"
        }
    },
    "group_id": "company_a"
}'
```

When APISIX can't find the Consumer Group with the `group_id`, the Admin API is terminated with a status code of `400`.

:::tip

1. When the same plugin is configured in [consumer](/docs/apisix/terminology/consumer/), [routing](/docs/apisix/terminology/route/), [plugin config](/docs/apisix/terminology/plugin-config/) and [service](/docs/apisix/terminology/service/), only one configuration is in effect, and the consumer has the highest priority. Please refer to [Plugin](/docs/apisix/terminology/plugin/).
2. If a Consumer already has the `plugins` field configured, the plugins in the Consumer Group will effectively be merged into it. The same plugin in the Consumer Group will not override the one configured directly in the Consumer.

:::

For example, if we configure a Consumer Group as shown below:

```json
{
    "id": "bar",
    "plugins": {
        "response-rewrite": {
            "body": "hello"
        }
    }
}
```

To a Consumer as shown below.

```json
{
    "username": "foo",
    "group_id": "bar",
    "plugins": {
        "basic-auth": {
            "username": "foo",
            "password": "bar"
        },
        "response-rewrite": {
            "body": "world"
        }
    }
}
```

Then the `body` in `response-rewrite` keeps `world`.
