# Global rules

> 本文介绍了全局规则的概念以及如何启用全局规则。

Source: https://apisix.apache.org/zh/docs/apisix/terminology/global-rule/

## 描述

[Plugin](/zh/docs/apisix/terminology/plugin/) 配置可直接绑定在 [Route](/zh/docs/apisix/terminology/route/) 上，也可以被绑定在 [Service](/zh/docs/apisix/terminology/service/) 或 [Consumer](/zh/docs/apisix/terminology/consumer/) 上。

如果你需要一个能作用于所有请求的 Plugin，可以通过 Global Rules 启用一个全局的插件配置。

同一阶段内的全局规则插件会先于局部绑定的插件执行。但是，局部绑定插件的 `rewrite` 处理函数会先于全局规则插件的 `access` 处理函数执行。完整顺序请参见[插件执行顺序](/zh/docs/apisix/terminology/plugin/#插件执行顺序)。

## 使用示例

以下示例展示了如何为所有请求启用 `limit-count` 插件：

:::note

您可以这样从 `config.yaml` 中获取 `admin_key` 并存入环境变量：

```bash
admin_key=$(yq '.deployment.admin.admin_key[0].key' conf/config.yaml | sed 's/"//g')
```

:::

```shell
curl http://127.0.0.1:9180/apisix/admin/global_rules/1 -X PUT \
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

你也可以通过以下命令查看所有的全局规则：

```shell
curl http://127.0.0.1:9180/apisix/admin/global_rules -H "X-API-KEY: $admin_key"
```
