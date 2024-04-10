---
title: Implementing the Idempotency-Key specification on Apache APISIX
authors:
  - name: Nicolas Fränkel
    title: Author
    url: https://github.com/nfrankel
    image_url: https://avatars.githubusercontent.com/u/752258
keywords:
  - APISIX
  - Idempotency
  - IETF
  - specification
  - plugin
  - coding
description: >
  Last week, I wrote an analysis of the IETF Idempotency-Key specification. The specification aims to avoid duplicated requests. In short, the idea is for the client to send a unique key along with the request:
  If the server doesn't know the key, it proceeds as usual and then stores the response.
  If the server knows the key, it short-circuits any further processing and immediately returns the stored response.
  This post shows how to implement it with Apache APISIX.
tags: [Plugin]
image: https://static.apiseven.com/uploads/2024/04/09/0rfsRevo_stormtrooper-2899993.jpg
---

<head>
    <link rel="canonical" href="https://blog.frankel.ch/implement-idempotency-key-apisix/" />
</head>

>Last week, I wrote an [analysis](https://apisix.apache.org/blog/2024/04/04/fix-duplicate-api-requests/) of the [IETF Idempotency-Key specification](https://datatracker.ietf.org/doc/html/draft-ietf-httpapi-idempotency-key-header-04). The specification aims to avoid duplicated requests. In short, the idea is for the client to send a unique key along with the request:
>
>* If the server doesn't know the key, it proceeds as usual and then stores the response
>* If the server knows the key, it short-circuits any further processing and immediately returns the stored response
>
>This post shows how to implement it with [Apache APISIX](https://apisix.apache.org/).

<!--truncate-->

## Overview

Before starting coding, we need to define a couple of things. Apache APISIX offers a plugin-based architecture. Hence, we will code the above logic in a plugin.

Apache APISIX builds upon OpenResty, which builds upon nginx. Each component defines phases, which map more or less across the components. For more info on phases, please see [this previous post](https://apisix.apache.org/blog/2023/12/14/apisix-plugins-priority-leaky-abstraction/).

Finally, we shall decide on a priority. Priority defines the order in which APISIX runs plugins _inside a phase_. I decided on `1500`, as all authentication plugins have a priority in the `2000` and more range, but I want to return the cached response ASAP.

The specification requires us to store data. APISIX offers many abstractions, but storage is not one of them. We need access via the idempotency key so it looks like a key-value store.

I arbitrarily chose Redis, as it's pretty widespread **and** the client is already part of the APISIX distribution. Note that simple Redis doesn't offer JSON storage; hence, I use the `redis-stack` Docker image.

The local infrastructure is the following:

```yaml
services:
  apisix:
    image: apache/apisix:3.9.0-debian
    volumes:
      - ./apisix/config.yml:/usr/local/apisix/conf/config.yaml:ro
      - ./apisix/apisix.yml:/usr/local/apisix/conf/apisix.yaml:ro #1
      - ./plugin/src:/opt/apisix/plugins:ro                  #2
    ports:
      - "9080:9080"
  redis:
    image: redis/redis-stack:7.2.0-v9
    ports:
      - "8001:8001"                                          #3
```

1. Static route configuration
2. Path to our future plugin
3. Port of Redis Insights (GUI). Not necessary _per se_, but very useful during development for debugging

The APISIX configuration is the following:

```yaml
deployment:
  role: data_plane
  role_data_plane:
    config_provider: yaml                                    #1

apisix:
  extra_lua_path: /opt/?.lua                                 #2

plugins:
  - idempotency                    # priority: 1500          #3

plugin_attr:                                                 #4
  idempotency:
    host: redis                                              #5
```

1. Configure APISIX for static routes configuration
2. Configure the location of our plugin
3. Custom plugins need to be explicitly declared. The priority comment is not required but is good practice and improves maintainability
4. Common plugin configuration across all routes
5. See below

Finally, we declare our single route:

```yaml
routes:
  - uri: /*
    plugins:
      idempotency: ~                                         #1
    upstream:
      nodes:
        "httpbin.org:80": 1                                  #2
#END                                                         #3
```

1. Declare the plugin that we are going to create
2. httpbin is a useful upstream as we can try different URIs and methods
3. Mandatory for static routes configuration!

With this infrastructure in place, we can start the implementation.

## Laying out the plugin

The foundations of an Apache APISIX plugin are pretty basic:

```lua
local plugin_name = "idempotency"

local _M = {
    version = 1.0,
    priority = 1500,
    schema = {},
    name = plugin_name,
}

return _M
```

The next step is configuration, _e.g._ Redis host and port. For starters, we shall offer a single Redis configuration across all routes. That's the idea behind the `plugin_attr` section in the `config.yaml` file: common configuration. Let's flesh out our plugin:

```lua
local core = require("apisix.core")
local plugin = require("apisix.plugin")

local attr_schema = {                                       --1
    type = "object",
    properties = {
        host = {
            type = "string",
            description = "Redis host",
            default = "localhost",
        },
        port = {
            type = "integer",
            description = "Redis port",
            default = 6379,
        },
    },
}

function _M.init()
    local attr = plugin.plugin_attr(plugin_name) or {}
    local ok, err = core.schema.check(attr_schema, attr)    --2
    if not ok then
        core.log.error("Failed to check the plugin_attr[", plugin_name, "]", ": ", err)
        return false, err
    end
end
```

1. Define the shape of the configuration
2. Check the configuration is valid

Because I defined default values in the plugin, I can override only the `host` to `redis` to run inside my Docker Compose infrastructure and use the default port.

Next, I need to create the Redis client. Note that the platform prevents me from connecting in any phase after the rewrite/access section. Hence, I'll create it in the `init()` method and keep it until the end.

```lua
local redis_new = require("resty.redis").new                --1

function _M.init()

    -- ...

    redis = redis_new()                                     --2
    redis:set_timeout(1000)
    local ok, err = redis:connect(attr.host, attr.port)
    if not ok then
        core.log.error("Failed to connect to Redis: ", err)
        return false, err
    end
end
```

1. Reference the `new` function of the OpenResty Redis module
2. Call it to get an instance

The Redis client is now available in the `redis` variable throughout the rest of the plugin execution cycle.

## Implementing the nominal path

In my previous software engineer life, I usually implemented the nominal path first. Afterward, I made the code more robust by managing error cases individually. This way, if I had to release at any point, I would still deliver business values - with warnings. I shall approach this mini-project the same way.

The pseudo-algorithm on the nominal path looks like the following:

```
DO extract idempotency key from request
DO look up value from Redis
IF value doesn't exist
  DO set key in Redis with empty value
ELSE
  RETURN cached response
DO forward to upstream
DO store response in Redis
RETURN response
```

We need to map the logic to the phase I mentioned above. Two phases are available before the upstream, `rewrite` and `access`; three after, `header_filter`, `body_filter` and `log`. The `access` phase seemed obvious for work before, but I needed to figure out between the three others. I randomly chose the `body_filter`, but I'm more than willing to listen to sensible arguments for other phases.

Note that I removed logs to make the code more readable. Error and informational logs are necessary to ease debugging production issues.

```lua
function _M.access(conf, ctx)
    local idempotency_key = core.request.header(ctx, "Idempotency-Key") --1
    local redis_key = "idempotency#" .. idempotency_key     --2
    local resp, err = redis:hgetall(redis_key)              --3
    if not resp then
        return
    end
    if next(resp) == nil then                               --4
        local resp, err = redis:hset(redis_key, "request", true ) --4
        if not resp then
            return
        end
    else
        local data = normalize_hgetall_result(resp)         --5
        local response = core.json.decode(data["response"]) --6
        local body = response["body"]                       --7
        local status_code = response["status"]              --7
        local headers = response["headers"]
        for k, v in pairs(headers) do                       --7
            core.response.set_header(k, v)
        end
        return core.response.exit(status_code, body)        --8
    end
end
```

1. Extract the idempotency key from the request
2. Prefix the key so we avoid potential collisions
3. Get the data set stored in Redis under the idempotency key
4. If the key is not found, store it with a boolean mark
5. Transform the data in a Lua table via a custom utility function
6. The response is stored in JSON format to account for headers
7. Reconstruct the response
8. Return the reconstructed response to the client. Note the `return` statement: APISIX skips the later lifecycle phases

```lua
function _M.body_filter(conf, ctx)
    local idempotency_key = core.request.header(ctx, "Idempotency-Key") --1
    local redis_key = "idempotency#" .. idempotency_key
    if core.response then
        local response = {                                  --2
            status = ngx.status,
            body = core.response.hold_body_chunk(ctx, true),
            headers = ngx.resp.get_headers()
        }
        local redis_key = "idempotency#" .. redis_key
        local resp, err = red:set(redis_key, "response", core.json.encode(response)) --3
        if not resp then
            return
        end
    end
end
```

1. Extract the idempotency key from the request
2. Arrange the different elements of a response in a Lua table
3. Store the JSON-encoded response in a Redis set

Tests reveal that it works as expected.
Try:

```bash
curl -i -X POST -H 'Idempotency-Key: A' localhost:9080/response-headers\?freeform=hello
curl -i -H 'Idempotency-Key: B' localhost:9080/status/250
curl -i -H 'Idempotency-Key: C' -H 'foo: bar'  localhost:9080/status/250
```

Also, try to reuse a mismatched idempotency key, _e.g._, `A`, for the third request. As we haven't implemented any error management yet, you'll get the cached response for another request. It's time to up our game.

## Implementing error paths

The specification defines several error paths:

* Idempotency-Key is missing
* Idempotency-Key is already used
* A request is outstanding for this Idempotency-Key

Let's implement them one by one. First, let's check that the request has an idempotency key. Note that we can configure the plugin on a per-route basis, so if the route includes the plugin, we can conclude that it's mandatory.

```lua
function _M.access(conf, ctx)
    local idempotency_key = core.request.header(ctx, "Idempotency-Key")
    if not idempotency_key then
        return core.response.exit(400, "This operation is idempotent and it requires correct usage of Idempotency Key")
    end
    -- ...
```

Just return the appropriate 400 if the key is missing. That one was easy.

Checking the reuse of an existing key for a different request is slightly more involved. We first need to store the request, or more precisely, the fingerprint of what constitutes a request. Two requests are the same if they have: the same method, the same path, the same body, and the same headers. Depending on your situation, the domain (and the port) might or may not be part of them. For my simple implementation, I'll leave it out.

There are several problems to solve. First, I didn't find an existing API to hash the `core.request` object like there is in other languages I'm more familiar with, _e.g._, Java's `Object.hash()`. I decided to encode the object in JSON and hash the string. However, the existing `core.request` has sub-elements that cannot be converted to JSON. I had to extract the parts mentioned above and convert the table.

```lua
local function hash_request(request, ctx)
    local request = {                                       --1
        method = core.request.get_method(),
        uri = ctx.var.request_uri,
        headers = core.request.headers(),
        body = core.request.get_body()
    }
    local json = core.json.stably_encode(request)           --2
    return ngx.encode_base64(json)                          --3
end
```

1. Create a table with only the relevant parts
2. The `cjson` library produces JSON whose members might be sorted differently across several calls. Hence, it results in different hashes. The `core.json.stably_encode` fixes that issue.
3. Hash it

Then, instead of storing a boolean when receiving the request, we store the resulting hash instead.

```lua
local hash = hash_request(core.request, ctx)
if next(resp) == nil then
    core.log.warn("No key found in Redis for Idempotency-Key, set it: ", redis_key)
    local resp, err = redis:hset(redis_key, "request", hash)
    if not resp then
        core.log.error("Failed to set data in Redis: ", err)
        return
    end
then -- ...
```

We read the hash stored under the idempotency key on the other branch. If they don't match, we exit with the relevant error code:

```lua
local data = normalize_hgetall_result(resp)
local stored_hash = data["request"]
if hash ~= stored_hash then
    return core.response.exit(422, "This operation is idempotent and it requires correct usage of Idempotency Key. Idempotency Key MUST not be reused across different payloads of this operation.")
end
```

The final error management happens just afterward. Imagine the following scenario:

1. A request comes with idempotency key X
2. The plugin fingerprints and stores the hash in Redis
3. APISIX forwards the request to the upstream
4. A duplicate request comes with the same idempotency key, X
5. The plugin reads the data from Redis and finds no cached response

The upstream didn't finish processing the request; hence, the first request hasn't yet reached the `body_filter` phase.

We append the following code to the above snippet:

```lua
if not data["response"] then
    return core.response.exit(409, " request with the same Idempotency-Key for the same operation is being processed or is outstanding.")
end
```

That's it.

## Conclusion

In this post, I showed a simple implementation of the `Idempotency-Key` header specification on Apache APISIX via a plugin. At this stage, it has room for improvement: automated tests, the ability to configure Redis on a per route basis, configure the domain/path to be part of the request, configure a Redis cluster instead of a single instance, use another K/V store, etc.

Yet, it does implement the specification and has the potential to evolve into a more production-grade implementation.

The complete source code for this post can be found on [GitHub](https://github.com/ajavageek/apisix-idempotency-plugin).

**To go further:**

* [Idempotency-Key HTTP Header Field](https://datatracker.ietf.org/doc/html/draft-ietf-httpapi-idempotency-key-header-04)
* [Fixing duplicate API requests](https://apisix.apache.org/blog/2024/04/04/fix-duplicate-api-requests/)
* [Plugin Develop - APISIX website](https://apisix.apache.org/docs/apisix/plugin-develop/)
* [How to Build an Apache APISIX Plugin From 0 to 1?](https://api7.ai/blog/how-to-build-an-apache-apisix-plugin-from-0-to-1)
