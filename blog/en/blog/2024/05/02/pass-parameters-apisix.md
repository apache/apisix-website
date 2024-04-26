---
title: Five ways to pass parameters to Apache APISIX
authors:
  - name: Nicolas Fränkel
    title: Author
    url: https://github.com/nfrankel
    image_url: https://avatars.githubusercontent.com/u/752258
keywords:
  - APISIX
  - REST
  - HTTP API
description: >
  I recently read 6 Ways To Pass Parameters to Spring REST API. Though the title is a bit misleading, as it's unrelated to REST, it does an excellent job listing all ways to send parameters to a Spring application. I want to do the same for Apache APISIX; it's beneficial when you write a custom plugin.
tags: [Ecosystem]
image: https://static.apiseven.com/uploads/2024/04/25/V05nSV5W_american-football-63109.jpg
---

<head>
    <link rel="canonical" href="https://blog.frankel.ch/pass-parameters-apisix/" />
</head>

>I recently read [6 Ways To Pass Parameters to Spring REST API](https://javabulletin.substack.com/p/6-ways-to-pass-parameters-to-spring). Though the title is a bit misleading, as it's unrelated to REST, it does an excellent job listing all ways to send parameters to a Spring application. I want to do the same for Apache APISIX; it's beneficial when you write a custom plugin.

<!--truncate-->

## General setup

The general setup uses Docker Compose and static configuration.
I'll have one plugin per way to pass parameters.

```yaml
services:
  httpbin:
    image: kennethreitz/httpbin                                         #1
  apisix:
    image: apache/apisix:3.9.0-debian
    volumes:
      - ./apisix/conf/config.yml:/usr/local/apisix/conf/config.yaml:ro
      - ./apisix/conf/apisix.yml:/usr/local/apisix/conf/apisix.yaml:ro  #2
      - ./apisix/plugins:/opt/apisix/plugins:ro                         #3
    ports:
      - "9080:9080"
```

1. Local httpbin for more reliable results and less outbound network traffic
2. Static configuration file
3. Plugins folder, one file per plugin

```yaml
deployment:
  role: data_plane
  role_data_plane:
    config_provider: yaml                                              #1
apisix:
  extra_lua_path: /opt/?.lua                                           #2
plugins:
  - proxy-rewrite                                                      #3
  - path-variables                                                     #4
# ...  
```

1. Set static configuration
2. Use every Lua file under `/opt/apisix/plugins` as a plugin
3. Regular plugin
4. Custom plugin, one per alternative

## Path variables

Path variables are a straightforward way to pass data. Their main issue is that they are limited to simple values, _e.g._, `/links/{n}/{offset}`. The naive approach is to write the following Lua code:

```lua
local core = require("apisix.core")

function _M.access(_, ctx)
    local captures, _ = ngx.re.match(ctx.var.uri, '/path/(.*)/(.*)')  --1-2
    for k, v in pairs(captures) do
        core.log.warn('Order-Value pair: ', k, '=', v)
    end
end
```

1. APISIX stores the URI in `ctx.var.uri`
2. Nginx offers a regular expression API

Let's try:

```bash
curl localhost:9080/path/15/3
```

The log displays:

```
Order-Value pair: 0=/path/15/3
Order-Value pair: 1=15
Order-Value pair: 2=3
```

I didn't manage errors, though. Alternatively, we can rely on Apache APISIX features: a specific [router](https://apisix.apache.org/docs/apisix/terminology/router/). The default router, `radixtree_host_uri`, uses both the host and the URI to match requests. `radixtree_uri_with_parameter` lets go of the host part but also matches parameters.

```yaml
apisix:
  extra_lua_path: /opt/?.lua
  router:
    http: radixtree_uri_with_parameter
```

We need to update the route:

```yaml
routes:
  - path-variables
  - uri: /path/:n/:offset                                              #1
    upstream_id: 1
    plugins:
      path-variables: ~
```

1. Store `n` and `offset` in the context, under `ctx.curr_req_matched`

We keep the plugin just to log the path variables:

```lua
function _M.access(_, ctx)
    core.log.warn('n: ', ctx.curr_req_matched.n, ', offset: ', ctx.curr_req_matched.offset)
end
```

The result is as expected with the same request as above:

```
n: 15, offset: 3
```

## Query parameters

Query parameters are another regular way to pass data. Like path variables, you can only pass simple values, _e.g._, `/?foo=bar`. The Lua code doesn't require regular expressions:

```lua
local core = require("apisix.core")

function _M.access(_, _)
    local args, _ = ngx.req.get_uri_args()
    for k, v in pairs(args) do
        core.log.warn('Order-Value pair: ', k, '=', v)
    end
end
```

Let's try:

```bash
curl localhost:9080/query\?foo=one\&bar=three
```

The log displays:

```
Key-Value pair: bar=three
Key-Value pair: foo=one
```

Remember that query parameters have no order.

Our code contains an issue, though. The `ngx.req.get_uri_args()` accepts [parameters](https://github.com/openresty/lua-nginx-module/#ngxreqget_uri_args). Remember that the client can pass a query parameter multiple times with different values, _e.g._, `?foo=one&foo=two`? The first parameter is the maximum number of values returned for a single query parameter. To avoid ignoring value, we should set it to 0, _i.e._, unbounded.

Since every plugin designer must remember it, we can add the result to the context for other plugins down the chain. The updated code looks like this:

```lua
local core = require("apisix.core")

function _M.get_uri_args(ctx)
    if not ctx then
        ctx = ngx.ctx.api_ctx
    end
    if not ctx.req_uri_args then
        local args, _ = ngx.req.get_uri_args(0)
        ctx.req_uri_args = args
    end
    return ctx.req_uri_args
end

function _M.access(_, ctx)
    for k, v in pairs(ctx.req_uri_args) do
        core.log.warn('Key-Value pair: ', k, '=', v)
    end
end
```

## Request headers

Request headers are another way to pass parameters. While they generally only contain simple values, you can also use them to send structured values, _e.g._, JSON. Depending on your requirement, APISIX can list all request headers or a specific one. Here, I get all of them:

```lua
local core = require("apisix.core")

function _M.access(_, _)
    local headers = core.request.headers()
    for k, v in pairs(headers) do
        core.log.warn('Key-Value pair: ', k, '=', v)
    end
end
```

We test with a simple request:

```bash
curl -H 'foo: 1' -H 'bar: two'  localhost:9080/headers
```

And we got more than we expected because curl added default headers:

```
Key-Value pair: user-agent=curl/8.4.0
Key-Value pair: bar=two
Key-Value pair: foo=1
Key-Value pair: host=localhost:9080
Key-Value pair: accept=*/*
```

## Request body

Setting a request body is the usual way to send structured data, _e.g_, JSON. Nginx offers a simple API to collect such data.

```lua
local core = require("apisix.core")

function _M.access(_, _)
    local args = core.request.get_post_args()                          --1
    local body = next(args, nil)                                       --2
    core.log.warn('Body: ', body)
end
```

1. Access the body as a regular Lua table
2. A table is necessary in case of multipart payloads, _e.g._, file uploads. Here, we assume there's a single arg, the content body.

It's time to test:

```bash
curl  localhost:9080/body -X POST -d '{ "foo": 1, "bar": { "baz": "two" } }'
```

The result is as expected:

```
Body: { "foo": 1, "bar": { "baz": "two" } }
```

## Cookies

Last but not least, we can send parameters via cookies. The difference with previous alternatives is that cookies persist on the client side, and the browser sends them with each request. On the Lua side, we need to know the cookie name instead of listing all query parameters or headers.

```lua
local core = require("apisix.core")

function _M.access(_, ctx)
    local foo = ctx.var.cookie_foo                                     --1
    core.log.warn('Cookie value: ', foo)
end
```

1. The cookie is named `foo` and is case-insensitive

Let's test:

```bash
curl --cookie "foo=Bar"  localhost:9080/cookies
```

The result is correct:

```
Cookie value: Bar
```

## Summary

In this post, we listed five alternatives to pass parameters server-side and explained how to access them on Apache APISIX. Here's the API summary:

| Alternative | Source | API |
| ---         | ---    | --- |
| Path variable | APISIX Router | Use the `radixtree_uri_with_parameter` router |
| Query parameter | Nginx | `ngx.req.get_uri_args(0)` |
| Request header | APISIX core lib | `core.request.headers()` |
| Request body | APISIX core lib | `core.request.get_post_args()` |
| Cookie | Method context parameter | `ctx.var.cookie_<name>` |

Thanks a lot to [Zeping Bai](https://github.com/bzp2010) for his review and explanations.

The complete source code for this post can be found on [GitHub](https://github.com/ajavageek/apisix-pass-parameters).

**To go further:**

* [6 Ways To Pass Parameters to Spring REST API](https://javabulletin.substack.com/p/6-ways-to-pass-parameters-to-spring)
* [How to Build an Apache APISIX Plugin From 0 to 1?](https://api7.ai/blog/how-to-build-an-apache-apisix-plugin-from-0-to-1)
