---
title: Creating a Custom Data Mask Plugin
authors:
  - name: "Zeping Bai"
    title: "Author"
    url: "https://github.com/bzp2010"
    image_url: "https://avatars.githubusercontent.com/u/8078418?v=4"
  - name: "Navendu Pottekkat"
    title: "Author"
    url: "https://github.com/navendu-pottekkat"
    image_url: "https://avatars.githubusercontent.com/u/49474499"
keywords:
  - Plugin
  - Lua
  - OpenResty
  - Data mask
description: A tutorial on creating a custom Apache APISIX plugin in Lua through a real use case.
tags: [Plugins]
image: https://static.apiseven.com/uploads/2023/07/13/p0iSJGOY_data-mask-cover.png
---

> Creating a custom plugin for APISIX in Lua might be trivial or daunting, depending on your level of expertise in APISIX+OpenResty+Nginx. In this article, we will look at how you can create and run a custom plugin from the ground up while learning some basics of APISIX plugin development.

<!--truncate-->

When talking to one of our users from the fintech industry during the [Apache APISIX Community Meetup in Malaysia](https://www.youtube.com/watch?v=vRwAuvfZIgE), we came across a peculiar feature request: mask confidential data in responses.

For example, a response from the upstream might contain sensitive data like credit card numbers, and APISIX should be able to replace it with `*******` based on some predefined rules.

Creating such a plugin in Lua might be trivial or daunting, depending on your level of expertise in APISIX+OpenResty+Nginx. So in this article, we will look at how you can create and run this plugin from the ground up while learning some basics of APISIX plugin development in Lua.

## Setting Things Up

You can start with the template plugin from [apisix-plugin-template](https://github.com/api7/apisix-plugin-template). This contains [boilerplate code](https://github.com/api7/apisix-plugin-template/blob/main/apisix/plugins/demo.lua) for creating custom Lua plugins for APISIX.

To use the template, go to the repository and click "[Use this template](https://github.com/new?template_name=apisix-plugin-template&template_owner=api7)." You can then clone it to your local machine for modification.

Under the [apisix/plugins](https://github.com/api7/apisix-plugin-template/tree/main/apisix/plugins) directory, you will find a file named `demo.lua`. You can rename this to `data-mask.lua`. This will be the starting point for our custom plugin.

Initially, the main parts of the file will look like this containing some boilerplate code which includes some imports and variable definitions:

```lua {title="data-mask.lua"}
-- local common libs
local require = require
local core    = require("apisix.core")

-- module define
local plugin_name = "data-mask"

-- plugin schema
local plugin_schema = {
    type = "object",
    properties = {},
    required = {},
}

local _M = {
    version  = 0.1,            -- plugin version
    priority = 0,              -- the priority of this plugin will be 0
    name     = plugin_name,    -- plugin name
    schema   = plugin_schema,  -- plugin schema
}


-- module interface for schema check
-- @param `conf` user defined conf data
-- @param `schema_type` defined in `apisix/core/schema.lua`
-- @return <boolean>
function _M.check_schema(conf, schema_type)
    return core.schema.check(plugin_schema, conf)
end


-- module interface for header_filter phase
function _M.header_filter(conf, ctx)

end


-- module interface for body_filter phase
function _M.body_filter(conf, ctx)

end

return _M
```

There are three functions (interfaces for the plugin) declared on the structure `_M`:

1. `check_schema`: used for validating the plugin configuration and is called when this plugin is enabled on a route.
2. `header_filter` and
3. `body_filter`: for modifying the response header and body, respectively, before sending it to the client.

In the end, this returns `_M`, and the APISIX can use the data from this to get the metadata and functions from the plugin.

## Designing the Plugin

Like every sound engineer, let's first design the plugin before we start writing code.

The goal of this plugin is simple:

1. The user should be able to define what sensitive data would look like in the plugin configuration (maybe RegEx?).
2. They should be able to define what sensitive data should be replaced with (like `*******`).
3. APISIX should then modify requests and responses based on these configurations.

So each rule can contain a regular expression and a replacement string. This rule will be applied to the response, and the masked data will be returned to the client:

```json
{
  "rules": [
    {
      "regex": ".*",
      "replace": "******"
    },
    {
      "regex": ".*",
      "replace": "**"
    }
  ]
}
```

We can now define the JSON schema to validate the plugin configuration. This can help avoid issues with improper plugin configurations during runtime:

```lua
local plugin_schema = {
    type = "object",
    properties = {
        rules = {
            type = "array",
            items = {
                type = "object",
                properties = {
                    regex = {
                        type = "string",
                        minLength = 1,
                    },
                    replace = {
                        type = "string",
                    },
                },
                required = {
                    "regex",
                    "replace",
                },
                additionalProperties = false,
            },
            minItems = 1,
        },
    },
    required = {
        "rules",
    },
}
```

The `rules` here is an array of objects meaning you can have multiple rules for defining what sensitive data should look like and what it should be replaced with. Each object in the array contains two required string fields, `regex` and `replace`, just like we designed.

## Let's Write Some Code!

We have now decided what the plugin's functionality would look like and added some JSON schema to validate the plugin's configuration.

We will first modify the `_M.header_filter` function, which is called before the response header is sent to the client. But why are we changing this? Isn't our plugin supposed to modify the response body?

Well, yes. But when we modify the data in the response body (from `2378-4531-5789-1369` to `2378-\***\*-\*\***-1369`), the `Content-Length` header will no longer be accurate. This can cause the client to interpret that the data returned by the server is abnormal and fail to complete the request.

Since we haven't modified the request body yet, we cannot calculate the new, accurate value for the `Content-Length` header.  So we need to delete this header value, modify the response body, recalculate the new header value, and set it to the response. To do this in a single sweep, APISIX provides the `core.response.clear_header_as_body_modified` function:

```lua
function _M.header_filter(conf, ctx)
    core.response.clear_header_as_body_modified()
end
```

We can now work on modifying the response body to mask the data. To do this, we must modify the `_M.body_filter` function.

Sometimes, the upstream response will be sent in chunks (`Content-Encoding: chunked`), and the `body_filter` function will be called multiple times. Since each of these chunks are incomplete in itself, we need to cache the data passed each time and call the `body_filter` function only when all blocks are received and spliced together. And like before, APISIX provides a function, `core.response.hold_body_chunk` to handle this scenario:

```lua
local body = core.response.hold_body_chunk(ctx)
if not body then
    return
end
```

Now to mask the response data, we can use the `ngx.re.gsub` function, which takes in a regular expression and a replacement string and replaces matching strings with the replacement string.

The RegEx conforms to the PCRE specification. For example, when the expression is `(.*)-(.*)-(.*)-(.*)`, it will extract the four variables separated by `-`, and you can use `$1`, `$2`, `$3`, and `$4` in the replacement string to refer to the four variables:

```lua
for _, rule in ipairs(conf.rules) do
    body = ngx.re.gsub(body, rule.regex, rule.replace, "jo")
end
```

Finally, to set this as the new response body, we will modify the value of `ngx.arg[1]` as mentioned in the [OpenResty docs](https://github.com/openresty/lua-nginx-module/#body_filter_by_lua_block). Once we set the value of `ngx.arg[2]` to `true`, APISIX will send the new response body to the client:

```lua
ngx.arg[1] = body
ngx.arg[2] = true
```

Combining all these, the `body_filter` function will look like this:

```lua
function _M.body_filter(conf, ctx)
    local body = core.response.hold_body_chunk(ctx)
    if not body then
        return
    end

    for _, rule in ipairs(conf.rules) do
        body = ngx.re.gsub(body, rule.regex, rule.replace, "jo")
    end

    ngx.arg[1] = body
    ngx.arg[2] = true
end
```

Now the only thing left to do is glue everything together. The entire plugin code will look like this:

```lua
-- local common libs
local require     = require
local ipairs      = ipairs
local ngx_re_gsub = ngx.re.gsub
local core        = require("apisix.core")

-- module define
local plugin_name = "data-mask"

-- plugin schema
local plugin_schema = {
    type = "object",
    properties = {
        rules = {
            type = "array",
            items = {
                type = "object",
                properties = {
                    regex = {
                        type = "string",
                        minLength = 1,
                    },
                    replace = {
                        type = "string",
                    },
                },
                required = {
                    "regex",
                    "replace",
                },
                additionalProperties = false,
            },
            minItems = 1,
        },
    },
    required = {
        "rules",
    },
}

local _M = {
    version  = 0.1,            -- plugin version
    priority = 0,              -- the priority of this plugin will be 0
    name     = plugin_name,    -- plugin name
    schema   = plugin_schema,  -- plugin schema
}


-- module interface for schema check
-- @param `conf` user defined conf data
-- @param `schema_type` defined in `apisix/core/schema.lua`
-- @return <boolean>
function _M.check_schema(conf, schema_type)
    return core.schema.check(plugin_schema, conf)
end


-- module interface for header_filter phase
function _M.header_filter(conf, ctx)
    core.response.clear_header_as_body_modified()
end


-- module interface for body_filter phase
function _M.body_filter(conf, ctx)
    local body = core.response.hold_body_chunk(ctx)
    if not body then
        return
    end

    for _, rule in ipairs(conf.rules) do
        body = ngx_re_gsub(body, rule.regex, rule.replace, "jo")
    end

    ngx.arg[1] = body
    ngx.arg[2] = true
end

return _M
```

## Testing the Plugin

Let's assume our upstream will return a response like this:

```json
{
  "username": "jack",
  "credit_number": "2378-4531-5789-1369"
}
```

It contains the username and the credit card number, which is far from ideal. We can use the `data-mask` plugin to rewrite it to `2378-****-****-1369`. The configuration would look like this:

```json
{
  "rules": [
    {
      "regex": "\"credit_number\":\"(.*)-(.*)-(.*)-(.*)\"",
      "replace": "\"credit_number\":\"$1-****-****-$4\""
    }
  ]
}
```

A common way the APISIX plugin developers debug plugins by mocking upstream response is through the [serverless-pre-function](https://apisix.apache.org/docs/apisix/plugins/serverless/) plugin. Through this plugin, you can run custom Lua code, in our case, to send back a response with un-masked credit card numbers:

```lua
return function()
    ngx.header["Content-Type"] = "application/json";
    require("apisix.core").response.exit(200, {
        credit_number = "1234-5678-8765-4321",
        username = "jack"
    })
end
```

We can configure both our custom plugin and the `serverless-pre-function` plugin on the same route as shown below:

```shell
curl -X PUT 'http://localhost:9180/apisix/admin/routes/data-mask' \
-H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' \
-H 'Content-Type: application/json' \
--data '{
    "uri": "/data-mask",
    "plugins": {
        "serverless-pre-function": {
            "phase": "access",
            "functions": [
                "return function() ngx.header[\"Content-Type\"] = \"application/json\"; require(\"apisix.core\").response.exit(200, {credit_number = \"1234-5678-8765-4321\", username = \"jack\"}) end"
            ]
        },
        "data-mask": {
            "rules": [
                {
                    "regex":"\"credit_number\":\"(.*)-(.*)-(.*)-(.*)\"",
                    "replace": "\"credit_number\":\"$1-****-****-$4\""
                }
            ]
        }
    }
}'
```

Now if you send a request to the route, you will get back the masked credit card numbers in the response:

```shell
curl -X GET 'http://localhost:9080/data-mask'

{
  "username": "jack",
  "credit_number": "1234-****-****-4321"
}
```

## Using in Production

You can directly build your own APISIX image with this plugin included for using it in production:

```dockerfile
FROM apache/apisix:3.3.0-debian

COPY ./data-mask.lua /usr/local/apisix/apisix/plugins/data-mask.lua
```

Then run `docker build`:

```shell
docker build -t your-own-registry.com/apisix:3.3.0-data-mask .
```

Next, in the configuration file (`config.yaml`) you can add your plugin to the list:

```yaml
plugins:
  # any other plugins from config-default.yaml
  - xxxx
  - data-mask
```

Note: The values in `plugins` in the `config.yaml` file override those in the `config-default.yaml` file. If you want to use other plugins, copy it to the `config.yaml` file.

Once you add it to the configuration file, you should be able to use the plugin on your routes.

## Learn More

All the sample code from this article can be found [here](https://github.com/bzp2010/apisix-plugin-data-mask/blob/main/apisix/plugins/data-mask.lua). You can also use the [plugin template](https://github.com/api7/apisix-plugin-template) to create your own plugins easily.

APISIX comes with many in-built plugins; you can refer to its [source code](https://github.com/apache/apisix/tree/master/apisix/plugins) for more details on how you can create your own plugins. You can also refer to the [lua-nginx-module](https://github.com/openresty/lua-nginx-module) and this [series of OpenResty tutorials](https://api7.ai/learning-center/openresty) to learn more.
