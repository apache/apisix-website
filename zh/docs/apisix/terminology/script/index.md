# Script

> 本文介绍了 Apache APISIX Script 的使用方法及注意事项。

Source: https://apisix.apache.org/zh/docs/apisix/terminology/script/

## 描述

Script 表示将在 `HTTP` 请求/响应生命周期期间执行的脚本。

Script 配置需要绑定在路由上。

Script 与 Plugin 不兼容，并且 Script 优先执行 Script，这意味着配置 Script 后，Route 上配置的 Plugin 将**不被执行**。

理论上，在 Script 中可以编写任意 Lua 代码，你也可以直接调用已有的插件以复用已有的代码。

Script 也有执行阶段概念，支持 `access`、`header_filter`、`body_filter` 和 `log` 阶段。系统会在相应阶段中自动执行 `Script` 脚本中对应阶段的代码。

```json
{
    ...
    "script": "local _M = {} \n function _M.access(api_ctx) \n ngx.log(ngx.INFO,\"hit access phase\") \n end \nreturn _M"
}
```
