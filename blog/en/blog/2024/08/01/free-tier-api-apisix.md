---
title: Free tier API with Apache APISIX
authors:
  - name: Nicolas Fränkel
    title: Author
    url: https://github.com/nfrankel
    image_url: https://avatars.githubusercontent.com/u/752258
keywords:
  - APISIX
  - Free tier
  - Rate limiting
  - Consumer
description: >
  Lots of service providers offer a free tier of their service. The idea is to let you kick their service's tires freely. If you need to go above the free tier at any point, you'll likely stay on the service and pay. In this day and age, most services are online and accessible via an API. Today, we will implement a free tier with Apache APISIX.
tags: [Ecosystem]
image: https://static.apiseven.com/uploads/2024/08/03/9WL5vdEC_beer-2439237.jpg
---

<head>
    <link rel="canonical" href="https://blog.frankel.ch/free-tier-api-apisix/" />
</head>

>Lots of service providers offer a free tier of their service. The idea is to let you kick their service's tires freely. If you need to go above the free tier at any point, you'll likely stay on the service and pay. In this day and age, most services are online and accessible via an API. Today, we will implement a free tier with [Apache APISIX](https://apisix.apache.org/).

<!--truncate-->

## A naive approach

I implemented a free tier in my post [Evolving your RESTful APIs, a step-by-step approach](https://blog.frankel.ch/evolve-apis/#know-your-users), albeit in a very naive way. I copy-pasted the [limit-count](https://apisix.apache.org/docs/apisix/plugins/limit-count/) plugin and added my required logic.

```lua
function _M.access(conf, ctx)
    core.log.info("ver: ", ctx.conf_version)

    -- no limit if the request is authenticated
    local key = core.request.header(ctx, conf.header)                               #1
    if key then
        local consumer_conf = consumer_mod.plugin("key-auth")                       #2
        if consumer_conf then
            local consumers = lrucache("consumers_key", consumer_conf.conf_version, #3
                    create_consume_cache, consumer_conf)
            local consumer = consumers[key]                                         #4
            if consumer then                                                        #5
                return
            end
        end
    end
-- rest of the logic
```

1. Get the configured request header value
2. Get the consumer's `key-auth` configuration
3. Get consumers
4. Get the consumer with the passed API key if they exist
5. If they exist, bypass the rate limiting logic

The downside of this approach is that the code is now my own. It has evolved since I copied it, and I'm stuck with the version I copied. We can do better, with the help of the `vars` parameter on routes.

## APISIX route matching

APISIX delegates its matching rule to a [router](https://apisix.apache.org/docs/apisix/terminology/router/).
Standard matching parameters include:

* The URI
* The HTTP method. By default, all methods match.
* The host
* The remote address

Most users do match on the URI; a small minority use HTTP methods and the host. However, they are not the only matching parameters. Knowing the rest will bring you into the world of advanced users of APISIX.

Let's take a simple example, header-based API versioning. You'd need actually to match a specific HTTP request header. I've already described how to do it [previously](https://blog.frankel.ch/api-versioning/). In essence, `vars` is an additional matching criterion that allows the evaluation of APISIX and nginx variables.

```yaml
routes:
  - uri: /*
    upstream_id: 1
    vars: [[ "http_accept", "==", "vnd.ch.frankel.myservice.v1+json" ]]
```

The above route will match if, and only if, the HTTP `Accept` header is equal to `vnd.ch.frankel.myservice.v1+json`. You can find the complete list of supported operators in the [lua-resty-expr](https://github.com/api7/lua-resty-expr) project.

APISIX matches routes in a non-specified order by default. If URIs are _disjointed_, that's not an issue.

```yaml
routes:
  - uri: /*
    upstream_id: 1
    vars: [[ "http_accept", "==", "vnd.ch.frankel.myservice.v1+json" ]]
  - uri: /*
    upstream_id: 2
    vars: [[ "http_accept", "==", "vnd.ch.frankel.myservice.v2+json" ]]
```

Problems arise when URIs are somehow not disjointed. For example, imagine I want to set a default route for unversioned calls.

```yaml
routes:
  - uri: /*
    upstream_id: 1
    vars: [[ "http_accept", "==", "vnd.ch.frankel.myservice.v1+json" ]]
  - uri: /*
    upstream_id: 2
    vars: [[ "http_accept", "==", "vnd.ch.frankel.myservice.v2+json" ]]
  - uri: /*
    upstream_id: 1
```

We need the third route to be evaluated last. If it's evaluated first, it will match all requests, regardless of their HTTP headers. APISIX offers the `priority` parameter to order route evaluation. By default, a route's priority is 0. Let's use `priority` to implement the versioning correctly:

```yaml
routes:
  - uri: /*
    upstream_id: 1
    vars: [[ "http_accept", "==", "vnd.ch.frankel.myservice.v1+json" ]]
    priority: 10                                              #1
  - uri: /*
    upstream_id: 2
    vars: [[ "http_accept", "==", "vnd.ch.frankel.myservice.v2+json" ]]
    priority: 10                                              #1
  - uri: /*
    upstream_id: 1
```

1. Evaluated first. The order is not relevant since the URIs are disjointed.

## Implementing free tier with matching rules

We are now ready to implement our free tier with matching rules.

The first route to be evaluated should be the one with authentication and no rate limit:

```yaml
routes:
  - uri: /get
    upstream_id: 1
    vars: [[ "http_apikey", "~~", ".*"]]                      #1
    plugins:
      key-auth: ~                                             #2
    priority: 10                                              #3
```

1. Match if the request has an HTTP header named `apikey`
2. Authenticate the request
3. Evaluate first

The other route is evaluated afterward.

```yaml
  - uri: /get
    upstream_id: 1
    plugins:
      limit-count:                                            #1
        count: 1
        time_window: 60
        rejected_code: 429
```

1. Rate limit this route

When you configure APISIX with the above snippets, and it receives a request to `/get`, it tries to match the first route *only* if it has an `apikey` request header:

1. If it has one:
    * The `key-auth` plugin kicks in
    * If it succeeds, APISIX forwars the request to the upstream
    * If it fails, APISIX returns a 403 HTTP status code
2. If it has no such request header, it matches the second route with a rate limit.

## Conclusion

A free tier is a must for any API service provider worth its salt. In this post, I've explained how to configure such free tier with Apache APISIX.

The complete source code for this post can be found on [GitHub](https://github.com/ajavageek/free-tier-apisix).

**To go further:**

* [Consumer](https://apisix.apache.org/docs/apisix/terminology/consumer/)
* [limit-count plugin](https://apisix.apache.org/docs/apisix/plugins/limit-count/)
* [router-radixtree](https://apisix.apache.org/docs/apisix/router-radixtree/)
* [lua-resty-expr](https://github.com/api7/lua-resty-expr)
