---
title: Advanced URL rewriting with Apache APISIX
authors:
  - name: Nicolas Fränkel
    title: Author
    url: https://github.com/nfrankel
    image_url: https://avatars.githubusercontent.com/u/752258
keywords:
  - APISIX
  - Rate Limiting
  - Consumer
  - Consumer Groups
description: >
  In my talk Evolving your APIs, I mention that an API Gateways is a Reverse Proxy "on steroids". One key difference between the former and the latter is that the API Gateway is not unfriendly to business logic. The poster child is rate-limiting.
tags: [Ecosystem]
image: https://static.apiseven.com/uploads/2024/07/27/U4BZicm8_speedometer-1249610.jpg
---

<head>
    <link rel="canonical" href="https://blog.frankel.ch/different-rate-limits-apisix/" />
</head>

>In my talk Evolving your APIs, I mention that an API Gateway is a Reverse Proxy "on steroids". One key difference between the former and the latter is that the API Gateway is not unfriendly to business logic. The poster child is rate-limiting.

<!--truncate-->

Rate-limiting is an age-old Reverse Proxy feature focused on protecting against <abbr title="Distributed Denial of Service">DDoS</abbr> attacks. It treats all clients the same and is purely technical. In this day and age, most API providers offer different subscription tiers; the higher the tier, the higher the rate limit, and the more you pay incidentally. It's not technical anymore and requires to differentiate between clients.

In this post, I want to detail how to do it with Apache APISIX. Note I take most of the material from the [workshop](https://nfrankel.github.io/apisix-workshop/).

## Rate-limiting for the masses

Apache APISIX offers no less than three plugins to rate limit requests:

* [limit conn](https://apisix.apache.org/docs/apisix/plugins/limit-conn/): limits the number of concurrent requests
* [limit req](https://https://apisix.apache.org/docs/apisix/plugins/limit-req/): limits the number of requests based on the [Leaky Bucket](https://en.wikipedia.org/wiki/Leaky_bucket) algorithm
* [limit count](https://https://apisix.apache.org/docs/apisix/plugins/limit-count/): limits the number of requests based on a fixed time window

The `limit-count` plugin is a good candidate for this post.

Let's configure the plugin for a route:

```yaml
routes:
  - uri: /get
    upstream:
      nodes:
        "http://httpbin.org:80": 1
    plugins:
      limit-count:                     #1
        count: 1                       #2
        time_window: 60                #2
        rejected_code: 429             #3
#END
```

1. Set the `limit-count` plugin
2. Limit requests to one every 60 seconds
3. Override the default HTTP response code, _i.e._, `503`

At this point, we configured regular rate limiting.

```bash
curl -v http://localhost:9080/get
curl -v http://localhost:9080/get
```

If we execute the second request before a minute has passed, the result is the following:

```http
HTTP/1.1 429 Too Many Requests
Date: Tue, 09 Jul 2024 06:55:07 GMT
Content-Type: text/html; charset=utf-8
Content-Length: 241
Connection: keep-alive
X-RateLimit-Limit: 1                   #1
X-RateLimit-Remaining: 0               #2
X-RateLimit-Reset: 59                  #3
Server: APISIX/3.9.1

<html>
<head><title>429 Too Many Requests</title></head>
<body>
<center><h1>429 Too Many Requests</h1></center>
<hr><center>openresty</center>
<p><em>Powered by <a href="https://apisix.apache.org/">APISIX</a>.</em></p></body>
</html>
```

1. Configured limit
2. Remaining quota
3. Waiting time in seconds before quota replenishment

## Per-consumer rate limiting

To configure per-consumer rate limiting, we first need to implement request authentication. APISIX offers many authentication plugins; we shall use the simplest one, [key-auth](https://apisix.apache.org/docs/apisix/plugins/key-auth/). `key-auth` checks a specific HTTP request header - `apikey` by default.

Here's how we configure consumers:

```yaml
consumers:
  - username: johndoe                  #1
    plugins:
      key-auth:
        key: john                      #2
  - username: janedoe                  #1
    plugins:
      key-auth:
        key: jane                      #2
```

1. Users
2. HTTP header request value

```bash
curl -H 'apikey: john' localhost:9080/get #1
curl -H 'apikey: jane' localhost:9080/get #2
```

1. Authenticate as `johndoe`
2. Authenticate as `janedoe`

In general, you attach plugins to APISIX routes but can also attach them to consumers. We can now move the `limit-count` plugin.

```yaml
routes:
  - uri: /get
    upstream:
      nodes:
        "httpbin:80": 1
    plugins:
      key-auth: ~                      #1

consumers:
  - username: johndoe
    plugins:
      key-auth:
        key: john
      limit-count:
        count: 1                       #2
        time_window: 60
        rejected_code: 429
  - username: janedoe
    plugins:
      key-auth:
        key: jane
      limit-count:
        count: 5                       #2
        time_window: 60
        rejected_code: 429
#END
```

1. The route is only accessible to requests authenticating with `key-auth`
2. `johndoe` has a lower limit count than `janedoe`. Did he forget to pay his subscription fees?

```bash
curl -H 'apikey: john' localhost:9080/get
curl -H 'apikey: john' localhost:9080/get
curl -H 'apikey: jane' localhost:9080/get
curl -H 'apikey: jane' localhost:9080/get
```

The second request gets rate-limited.

## Per-group rate limiting

We never attach permissions directly to identities in Identity Management systems. It's considered bad practice because when a person moves around the organization, we need to add and remove permissions one by one. The good practice is to attach permissions to groups and set the person in that group. When the person moves, we change their group; the person loses permissions from the old group and gets permissions from the new group. People get their permissions _transitively_ via their groups.

Apache APISIX offers an abstraction called a `Consumer Group` for this.

Let's create two consumer groups with different rate limit values:

```yaml
consumer_groups:
  - id: 1
    plugins:
      limit-count:
        count: 1
        time_window: 60
        rejected_code: 429
  - id: 2
    plugins:
      limit-count:
        count: 5
        time_window: 60
        rejected_code: 429
```

The next step is to attach consumers to these groups:

```yaml
consumers:
  - username: johndoe
    group_id: 1
    plugins:
      key-auth:
        key: john
  - username: janedoe
    group_id: 2
    plugins:
      key-auth:
        key: jane
```

```bash
curl -H 'apikey: john' localhost:9080/get
curl -H 'apikey: john' localhost:9080/get
curl -H 'apikey: jane' localhost:9080/get
curl -H 'apikey: jane' localhost:9080/get
```

The second request gets rate-limited.

We have the same results as before with two benefits. The first one is as I wrote above: when consumers move in and out, they change their permissions accordingly.

The second benefit is that the limit count is shared among all consumers of a group.  Indeed, when you set a limit, you don't want each consumer to be rate limited at X requests per Y second; you want the group as a whole to share the limit. In this way, if a single consumer is very active, they will naturally cap the rate of other consumers who share the same group.

Of course, you can set a limit on both a consumer and the group it belongs to. In this case, the lowest limit will apply first.

```yaml
consumers:
  - username: johndoe
    group_id: 2                        #1
    plugins:
      key-auth:
        key: john
      limit-count:
        count: 1                       #2
        time_window: 60
        rejected_code: 429
  - username: janedoe
    group_id: 2
    plugins:
      key-auth:
        key: jane
```

1. Move `johndoe` to group 2
2. Limit him individually

```bash
curl -H 'apikey: john' localhost:9080/get
curl -H 'apikey: john' localhost:9080/get #1
```

1. `johndoe` hits the limit here, but `janedoe` now only has four requests left from this minute, as the former used one request

## Conclusion

In this post, we implement rate limiting with Apache APISIX. We set the rate limit on a route and moved it to individual consumers. Then we moved it to consumer groups, so all consumers in a group share the same "pool".

The complete source code for this post can be found on [GitHub](https://github.com/ajavageek/rate-limit-apisix).

**To go further:**

* [Consumer](https://apisix.apache.org/docs/apisix/terminology/consumer/)
* [Consumer Group](https://apisix.apache.org/docs/apisix/terminology/consumer-group/)
* [Apache APISIX Hands-on Lab](https://nfrankel.github.io/apisix-workshop/)
