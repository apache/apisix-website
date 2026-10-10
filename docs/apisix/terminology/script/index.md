# Script

Source: https://apisix.apache.org/docs/apisix/terminology/script/

## Description

Scripts lets you write arbitrary Lua code or directly call existing plugins and execute them during the HTTP request/response lifecycle.

A Script configuration can be directly bound to a [Route](/docs/apisix/terminology/route/).

Scripts and [Plugins](/docs/apisix/terminology/plugin/) are mutually exclusive, and a Script is executed before a Plugin. This means that after configuring a Script, the Plugin configured on the Route will **not** be executed.

Scripts also have a concept of execution phase which supports the `access`, `header_filter`, `body_filter`, and the `log` phase. The corresponding phase will be executed automatically by the system in the Script.

```json
{
    ...
    "script": "local _M = {} \n function _M.access(api_ctx) \n ngx.log(ngx.INFO,\"hit access phase\") \n end \nreturn _M"
}
```
