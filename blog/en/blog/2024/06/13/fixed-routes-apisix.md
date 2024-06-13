---
title: Random and fixed routes with Apache APISIX
authors:
  - name: Nicolas Fränkel
    title: Author
    url: https://github.com/nfrankel
    image_url: https://avatars.githubusercontent.com/u/752258
keywords:
  - APISIX
  - routes
  - split-traffic
description: >
  My ideas for blog posts inevitably start to dry up after over two years at Apache APISIX. Hence, I did some triage on the [APISIX repo](https://github.com/apache/apisix/issues). I stumbled upon this one question.
tags: [Ecosystem]
image: https://static.apiseven.com/uploads/2024/06/12/2XTLbwyU_tower-1897536.jpg
---

<head>
    <link rel="canonical" href="https://blog.frankel.ch/fixed-routes-apisix/" />
</head>

>My ideas for blog posts inevitably start to dry up after over two years at [Apache APISIX](https://apisix.apache.org/). Hence, I did some triage on the [APISIX repo](https://github.com/apache/apisix/issues). I stumbled upon this one question:

<!--truncate-->

>We have a requirement to use a plugin, where we need to route the traffic on percentage basis. I'll give an example for better understanding.
>
>We have an URL <https://xyz.com/ca/fr/index.html> where ca is country (canada) and fr is french language. Now the traffic needs to routed 10% to <https://xyz.com/ca/en/index.html> and the remaining 90% to <https://xyz.com/ca/fr/index.html>. And whenever we're routing the traffic to <https://xyz.com/ca/en/index.html> we need to set a cookie. So for next call, if the cookie is there, it should directly go to <https://xyz.com/ca/en/index.html> else it should go via a 10:90 traffic split. What is the best possible way to achieve this ??
>
>-- [help request: Setting cookie based on a condition](https://github.com/apache/apisix/issues/11279)

The use case is interesting, and I decided to tackle it.

I'll rephrase the requirements first:

* If no cookie is set, randomly forward the request to one of the upstreams
* If a cookie has been set, forward the request to the correct upstream.

For easier testing:

* I change the odds from 10:90 to 50:50
* I use the root instead of a host plus a path

Finally, I assume that the upstream sets the cookie.

Newcomers to Apache APISIX understand the matching algorithm very quickly: if a request matches a route's host, method, and path, forward it to the upstream set.

```yaml
routes:
  - id: 1
    uri: /hello
    host: foo.com
    methods:
      - GET
      - PUT
      - POST
    upstream_id: 1
```

```bash
curl --resolve foo.com:127.0.0.1 http://foo.com/hello            #1
curl -X POST --resolve foo.com:127.0.0.1 http://foo.com/hello    #2
curl -X PUT --resolve foo.com:127.0.0.1 http://foo.com/hello     #2
curl --resolve bar.com:127.0.0.1 http://bar.com/hello            #3
curl --resolve foo.com:127.0.0.1 http://foo.com/hello/john       #4
```

1. Matches host, method as `curl` defaults to `GET`, and path
2. Matches host, method, and path
3. Doesn't match host
4. Doesn't match path as the configured path doesn't hold a `*` character

`path` is the only required parameter; neither `host` nor `methods` are. `host` defaults to any host and `methods` to any method.

Beyond these three main widespread matching parameters, others are available, _e.g._, `remote_addrs` or `vars`. Let's focus on the latter. The documentation on the Route API is pretty concise:

>Matches based on the specified variables consistent with variables in Nginx. Takes the form `[[var, operator, val], [var, operator, val], ...]]`. Note that this is case sensitive when matching a cookie name. See [lua-resty-expr](https://github.com/api7/lua-resty-expr) for more details.
>
>-- [Route API](https://apisix.apache.org/docs/apisix/admin-api/#request-body-parameters)

One can only understand `vars` in the Router Radix Tree documentation. The Router Radix Tree powers the Apache APISIX's matching engine.

>Nginx provides a variety of built-in variables that can be used to filter routes based on certain criteria. Here is an example of how to filter routes by Nginx built-in variables:
>
>-- [How to filter route by Nginx built-in variable?](https://apisix.apache.org/docs/apisix/router-radixtree/#how-to-filter-route-by-nginx-built-in-variable)
>
>```bash
>$ curl http://127.0.0.1:9180/apisix/admin/routes/1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -i -d '
>{
>    "uri": "/index.html",
>    "vars": [
>        ["http_host", "==", "iresty.com"],
>        ["cookie_device_id", "==", "a66f0cdc4ba2df8c096f74c9110163a9"],
>        ["arg_name", "==", "json"],
>        ["arg_age", ">", "18"],
>        ["arg_address", "~~", "China.*"]
>    ],
>    "upstream": {
>        "type": "roundrobin",
>        "nodes": {
>            "127.0.0.1:1980": 1
>        }
>    }
>}'
>```
>
>This route will require the request header `host` equal `iresty.com`, request cookie key `_device_id` equal `a66f0cdc4ba2df8c096f74c9110163a9`, etc.  You can learn more at [radixtree-new](https://github.com/api7/lua-resty-radixtree#new).

Among all Nginx variables, we can find `$cookie_xxx`. Hence, we can come up with the following configuration:

```yaml
routes:
  - name: Check for French cookie
    uri: /
    vars: [[ "cookie_site", "==", "fr" ]]             #1
    upstream_id: 1
  - name: Check for English cookie
    uri: /
    vars: [[ "cookie_site", "==", "en" ]]             #2
    upstream_id: 2
```

1. Match if a cookie named `site` has value `fr`
2. Match if a cookie named `site` has value `en`

We need to configure the final route, the one used when no cookie is set. We use the `traffic-split` plugin to assign a route randomly.

>The `traffic-split` Plugin can be used to dynamically direct portions of traffic to various Upstream services.
>
>This is done by configuring `match`, which are custom rules for splitting traffic, and `weighted_upstreams` which is a set of Upstreams to direct traffic to.
>
>When a request is matched based on the `match` attribute configuration, it will be directed to the Upstreams based on their configured `weights`. You can also omit using the `match` attribute and direct all traffic based on `weighted_upstreams`.
>
>-- [traffic-split](https://apisix.apache.org/docs/apisix/plugins/traffic-split/)

The third route is the following:

```yaml
  - name: Let the fate decide
    uri: /
    upstream_id: 1                                    #1
    plugins:
      traffic-split:
        rules:
          - weighted_upstreams:
              - weight: 50                            #1
              - upstream_id: 2                        #2
                weight: 50                            #2
```

1. The weight of the upstream `1` is `50`
2. The upstream `2` weight is also `50` out of the total weight sum. It's a half-half chance of APISIX forwarding it to either upstream

At this point, we need to solve one remaining issue: the order in which APISIX will evaluate the routes. When routes' paths are disjoint, the order plays no role; when they are overlapping, it does.

For example, if APISIX evaluates the last route first, it will forward the request to a random upstream, even though a cookie might have been set. We need to force the evaluation of the first two routes first. For that, APISIX offers the `priority` parameter; its value is `0` by default. It evaluates routes matching by order of decreasing priority. We need to override it to evaluate the random route last.

```yaml
  - name: Let the fate decide
    uri: /
    upstream_id: 1
    priority: -1
#...
```

You can try the setup in a browser or with `curl`. With curl, we can set the "first" request like this:

```bash
curl -v localhost:9080
```

If the upstream sets the cookie correctly, you should see the following line among the different response headers:

```
Set-Cookie: site=fr
```

Since curl doesn't store cookies by default, the value should change across several calls. If we set the cookie, the value stays constant:

```bash
curl -v --cookie 'site=en' localhost:9080                  #1
```

1. The cookie name is case-sensitive; beware

The browser keeps the cookie, so it's even simpler. Just go to <http:localhost:9080> and refresh several times: the content is the same as well. The content will change if you change the cookie to another possible value and request again.

The complete source code for this post can be found on [GitHub](https://github.com/ajavageek/fixed-route-apisix).

**To go further:**

* [Setting cookie based on a condition](https://github.com/apache/apisix/issues/11279)
* [router-radixtree](https://apisix.apache.org/docs/apisix/router-radixtree/)
* [Route Admin API](https://apisix.apache.org/docs/apisix/admin-api/#route-api)
