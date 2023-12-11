---
title: Apache APISIX plugin priority, a leaky abstraction?
authors:
  - name: Nicolas Fränkel
    title: Author
    url: https://github.com/nfrankel
    image_url: https://avatars.githubusercontent.com/u/752258
keywords:
  - DevOps
  - plugins
  - priority
  - abstraction
description: >
    Apache APISIX builds upon the OpenResty reverse-proxy to offer a plugin-based architecture. The main benefit of such an architecture is that it brings structure to the configuration of routes. It's a help at scale, when managing hundreds or thousands of routes.
    In this post, I'd like to describe how plugins, priority, and phases play together and what pitfalls you must be aware of.
tags: [Ecosystem]
image: https://static.apiseven.com/uploads/2023/12/09/acT4tzVw_puzzle-3486885.jpg
---

>[Apache APISIX](https://apisix.apache.org/) builds upon the [OpenResty](https://openresty.org/en/) reverse-proxy to offer a plugin-based architecture. The main benefit of such an architecture is that it brings structure to the configuration of routes. It's a help at scale, when managing hundreds or thousands of routes.
>
>In this post, I'd like to describe how plugins, priority, and phases play together and what pitfalls you must be aware of.

<!--truncate-->

<head>
    <link rel="canonical" href="https://blog.frankel.ch/apisix-plugins-priority-leaky-abstraction/" />
</head>

## APISIX plugin's priority

When you configure a route with multiple plugins, Apache APISIX needs to execute them in a **consistent** order so that the results are the same over time. For this reason, every APISIX plugin has a _harcoded_ **priority**. You can check a plugin priority directly in the code. For example, here's the relevant code fragment for the `basic-auth` plugin:

```lua
local _M = {
    version = 0.1,
    priority = 2520,                                 #1
    type = 'auth',
    name = plugin_name,
    schema = schema,
    consumer_schema = consumer_schema
}
```

1. Priority is 2520

For documentation purposes, the `default-config.yaml` file lists the priority of all out-of-the-box plugins. Here's an excerpt:

```yaml
plugins:
  - ldap-auth                      # priority: 2540
  - hmac-auth                      # priority: 2530
  - basic-auth                     # priority: 2520
  - jwt-auth                       # priority: 2510
  - key-auth                       # priority: 2500
  - consumer-restriction           # priority: 2400
  - forward-auth                   # priority: 2002
  - opa                            # priority: 2001
  - authz-keycloak                 # priority: 2000
  #- error-log-logger              # priority: 1091
  - proxy-cache                    # priority: 1085
  - body-transformer               # priority: 1080
  - proxy-mirror                   # priority: 1010
  - proxy-rewrite                  # priority: 1008
  - workflow                       # priority: 1006
  - api-breaker                    # priority: 1005
  - limit-conn                     # priority: 1003
  - limit-count                    # priority: 1002
  - limit-req                      # priority: 1001
```

Imagine a route configured with `proxy-mirror` and `proxy-rewrite`. Because of their respective priority, `proxy-mirror` would run before `proxy-rewrite`.

```yaml
upstream:
  - id: 1
    nodes:
      "oldapi:8081": 1

routes:
  - id: 1
    uri: "/v1/hello*"
    upstream_id: 1
    plugins:
      proxy-rewrite:                                 #1-3
        regex_uri: ["/v1(.*)", "$1"]
      proxy-mirror:                                  #2
        host: http://new.api:8082
```

1. The plugin ordering in this file is not relevant
2. `proxy-mirror` has priority 1010 and will execute first
3. `proxy-rewrite` has priority 1008 and will run second

The above setup has an issue. For example, if we call `localhost:9080/v1/hello`, APISIX will first mirror the request, then remove the `/v1` prefix. Hence, the new API receives `/v1/hello` instead of `/hello`. It's possible to override the default priority to fix it:

```yaml
routes:
  - id: 1
    uri: "/v1/hello*"
    upstream_id: 1
    plugins:
      proxy-rewrite:
        _meta:
          priority: 1020                             #1
        regex_uri: ["/v1(.*)", "$1"]
      proxy-mirror:
        host: http://new.api:8082
```

1. Override the default priority

Now, `proxy-rewrite` has higher priority than `proxy-mirror`: the former runs before the latter.

In this case, it works flawlessly; in others, it might not. Let's dive further.

## APISIX phases

APISIX runs plugins not only according to their priorities but also through dedicated phases. Because APISIX builds upon OpenResty, which builds upon ngxinx, the phases are very similar to the phases of these two components.

nginx defines several [phases](http://nginx.org/en/docs/dev/development_guide.html#http_phases) an HTTP request goes through:

1. `NGX_HTTP_POST_READ_PHASE`
2. `NGX_HTTP_SERVER_REWRITE_PHASE`
3. `NGX_HTTP_FIND_CONFIG_PHASE`
4. `NGX_HTTP_REWRITE_PHASE`
5. `NGX_HTTP_POST_REWRITE_PHASE`
6. `NGX_HTTP_PREACCESS_PHASE`
7. `NGX_HTTP_ACCESS_PHASE`
8. `NGX_HTTP_POST_ACCESS_PHASE`
9. `NGX_HTTP_PRECONTENT_PHASE`
10. `NGX_HTTP_CONTENT_PHASE`
11. `NGX_HTTP_LOG_PHASE`

Each phase focuses on a task, _i.e._, `NGX_HTTP_ACCESS_PHASE` verifies that the client is authorized to make the request.

In turn, OpenResty offers similarly named phases.

[From nginx documentation:](https://openresty-reference.readthedocs.io/en/latest/Directives/)

![Order of Lua Nginx Module Directives](https://cloud.githubusercontent.com/assets/2137369/15272097/77d1c09e-1a37-11e6-97ef-d9767035fc3e.png)

image:77d1c09e-1a37-11e6-97ef-d9767035fc3e.png[,840,761]

Finally, here are the phases of Apache APISIX:

1. `rewrite`
2. `access`
3. `before_proxy`
4. `header_filter`
5. `body_filter`
6. `log`

[From Apache APISIX documentation:](https://apisix.apache.org/docs/apisix/terminology/plugin/#plugins-execution-lifecycle)

![Order of Apache APISIX phases](https://static.apiseven.com/uploads/2023/03/09/ZsH5C8Og_plugins-phases.png)

We have seen two ways to order plugins: by priority and by phase. Now comes the most important rule: **order by priority only works inside a phase**!

For example, the `redirect` plugin has a priority of 900 and runs in phase `rewrite`; the `gzip` plugin has a priority of 995 and runs in phase `body_filter`. Regardless of their respective priorities, `redirect` will happen before `gzip`, because `rewrite` happens before `body_filter`. Likewise, changing a priority won't "move" a plugin out of its phase.

The example above with `proxy-mirror` and `proxy-rewrite` worked because both run in the `rewrite` phase.

The main issue is that priority is documented in the [config-default.yaml](https://github.com/apache/apisix/blob/master/conf/config-default.yaml#L438) file, while the phase is buried in the code. Worse, some plugins run across different phases. For example, let's check the proxy `proxy-rewrite` plugin and, more precisely, the functions defined [there](https://github.com/apache/apisix/blob/master/apisix/plugins/proxy-rewrite.lua):

* `local function is_new_headers_conf(headers)`
* `local function check_set_headers(headers)`
* `function _M.check_schema(conf)`
* `function _M.rewrite(conf, ctx)`

The name of the `rewrite()` function is suspiciously similar to one of the phases above. Looking at other plugins, we see the same pattern repeat. Apache APISIX runs plugin functions with the same name as the phase.

I took the liberty of summarizing all plugins and their respective phases in a table.

<table>
<thead>
<tr>
  <th>Plugin</th>
  <th colspan="6">Phase</th>
</tr>
<tr>
  <th><em>General</em></th>
  <th><code>rewrite</code></th>
  <th><code>access</code></th>
  <th><code>before_proxy</code></th>
  <th><code>header_filter</code></th>
  <th><code>body_filter</code></th>
  <th><code>log</code></th>
</tr>
</thead>
<tbody>
<tr>
  <td><code>redirect</code></td>
  <td>X</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td><code>echo</code></td>
  <td></td>
  <td></td>
  <td></td>
  <td>X</td>
  <td>X</td>
  <td></td>
</tr>
<tr>
  <td><code>gzip</code></td>
  <td></td>
  <td></td>
  <td></td>
  <td>X</td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td><code>real-ip</code></td>
  <td>X</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td><code>ext-plugin-pre-req</code></td>
  <td>X</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td><code>ext-plugin-post-req</code></td>
  <td></td>
  <td>X</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td><code>ext-plugin-post-resp</code></td>
  <td></td>
  <td></td>
  <td>X</td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td><code>workflow</code></td>
  <td></td>
  <td>X</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
</tbody>
<thead>
<tr>
  <th><em>Transformation</em></th>
  <th><code>rewrite</code></th>
  <th><code>access</code></th>
  <th><code>before_proxy</code></th>
  <th><code>header_filter</code></th>
  <th><code>body_filter</code></th>
  <th><code>log</code></th>
</tr>
</thead>
<tbody>
<tr>
  <td><code>response-rewrite</code></td>
  <td></td>
  <td></td>
  <td></td>
  <td>X</td>
  <td>X</td>
  <td></td>
</tr>
<tr>
  <td><code>proxy-rewrite</code></td>
  <td>X</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td><code>grpc-transcode</code></td>
  <td></td>
  <td>X</td>
  <td></td>
  <td>X</td>
  <td>X</td>
  <td></td>
</tr>
<tr>
  <td><code>grpc-web</code></td>
  <td></td>
  <td>X</td>
  <td></td>
  <td>X</td>
  <td>X</td>
  <td></td>
</tr>
<tr>
  <td><code>fault-injection</code></td>
  <td>X</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td><code>mocking</code></td>
  <td></td>
  <td>X</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td><code>degraphql</code></td>
  <td></td>
  <td>X</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td><code>body-transformer</code></td>
  <td>X</td>
  <td></td>
  <td></td>
  <td>X</td>
  <td>X</td>
  <td></td>
</tr>
</tbody>
<thead>
<tr>
  <th><em>Authentication</em></th>
  <th><code>rewrite</code></th>
  <th><code>access</code></th>
  <th><code>before_proxy</code></th>
  <th><code>header_filter</code></th>
  <th><code>body_filter</code></th>
  <th><code>log</code></th>
</tr>
</thead>
<tbody>
<tr>
  <td><code>key-auth</code></td>
  <td>X</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td><code>jwt-auth</code></td>
  <td>X</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td><code>basic-auth</code></td>
  <td>X</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td><code>authz-keycloak</code></td>
  <td></td>
  <td>X</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td><code>authz-casdoor</code></td>
  <td></td>
  <td>X</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td><code>wolf-rbac</code></td>
  <td>X</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td><code>openid-connect</code></td>
  <td>X</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td><code>cas-auth</code></td>
  <td></td>
  <td>X</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td><code>hmac-auth</code></td>
  <td>X</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td><code>authz-casbin</code></td>
  <td>X</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td><code>ldap-auth</code></td>
  <td>X</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td><code>opa</code></td>
  <td></td>
  <td>X</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td><code>forward-auth</code></td>
  <td></td>
  <td>X</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
</tbody>
<thead>
<tr>
  <th><em>Security</em></th>
  <th><code>rewrite</code></th>
  <th><code>access</code></th>
  <th><code>before_proxy</code></th>
  <th><code>header_filter</code></th>
  <th><code>body_filter</code></th>
  <th><code>log</code></th>
</tr>
</thead>
<tbody>
<tr>
  <td><code>cors</code></td>
  <td>X</td>
  <td></td>
  <td></td>
  <td>X</td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td><code>uri-blocker</code></td>
  <td>X</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td><code>ua-restriction</code></td>
  <td></td>
  <td>X</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td><code>referer-restriction</code></td>
  <td></td>
  <td>X</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td><code>consumer-restriction</code></td>
  <td></td>
  <td>X</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td><code>csrf</code></td>
  <td></td>
  <td>X</td>
  <td></td>
  <td>X</td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td><code>public-api</code></td>
  <td></td>
  <td>X</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td><code>chaitin-waf</code></td>
  <td></td>
  <td>X</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
</tbody>
<thead>
<tr>
  <th><em>Traffic</em></th>
  <th><code>rewrite</code></th>
  <th><code>access</code></th>
  <th><code>before_proxy</code></th>
  <th><code>header_filter</code></th>
  <th><code>body_filter</code></th>
  <th><code>log</code></th>
</tr>
</thead>
<tbody>
<tr>
  <td><code>limit-req</code></td>
  <td></td>
  <td>X</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td><code>limit-conn</code></td>
  <td></td>
  <td>X</td>
  <td></td>
  <td></td>
  <td></td>
  <td>X</td>
</tr>
<tr>
  <td><code>limit-count</code></td>
  <td></td>
  <td>X</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td><code>proxy-cache</code> (init)</td>
  <td></td>
  <td>X</td>
  <td></td>
  <td>X</td>
  <td>X</td>
  <td></td>
</tr>
<tr>
  <td><code>proxy-cache</code> (disk)</td>
  <td></td>
  <td>X</td>
  <td></td>
  <td>X</td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td><code>proxy-cache</code> (memory)</td>
  <td></td>
  <td>X</td>
  <td></td>
  <td>X</td>
  <td>X</td>
  <td></td>
</tr>
<tr>
  <td><code>request-validation</code></td>
  <td>X</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td><code>proxy-mirror</code></td>
  <td>X</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td><code>api-breaker</code></td>
  <td></td>
  <td>X</td>
  <td></td>
  <td></td>
  <td></td>
  <td>X</td>
</tr>
<tr>
  <td><code>traffic-split</code></td>
  <td></td>
  <td>X</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td><code>request-id</code></td>
  <td>X</td>
  <td></td>
  <td></td>
  <td>X</td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td><code>proxy-control</code></td>
  <td>X</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td><code>client-control</code></td>
  <td>X</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
</tbody>
<thead>
<tr>
  <th><em>Observability</em></th>
  <th><code>rewrite</code></th>
  <th><code>access</code></th>
  <th><code>before_proxy</code></th>
  <th><code>header_filter</code></th>
  <th><code>body_filter</code></th>
  <th><code>log</code></th>
</tr>
</thead>
<tbody>
<tr>
  <td><code>zipkin</code></td>
  <td>X</td>
  <td>X</td>
  <td></td>
  <td>X</td>
  <td></td>
  <td>X</td>
</tr>
<tr>
  <td><code>skywalking</code></td>
  <td>X</td>
  <td></td>
  <td></td>
  <td></td>
  <td>X</td>
  <td></td>
</tr>
<tr>
  <td><code>opentelemetry</code></td>
  <td>X</td>
  <td></td>
  <td></td>
  <td></td>
  <td>X</td>
  <td></td>
</tr>
<tr>
  <td><code>prometheus</code></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td><code>node-status</code></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td><code>datadog</code></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td>X</td>
</tr>
<tr>
  <td><code>http-logger</code></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td>X</td>
  <td>X</td>
</tr>
<tr>
  <td><code>skywalking-logger</code></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td>X</td>
</tr>
<tr>
  <td><code>tcp-logger</code></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td>X</td>
</tr>
<tr>
  <td><code>kafka-logger</code></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td>X</td>
  <td>X</td>
</tr>
<tr>
  <td><code>rocketmq-logger</code></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td>X</td>
  <td>X</td>
</tr>
<tr>
  <td><code>udp-logger</code></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td>X</td>
</tr>
<tr>
  <td><code>clickhouse-logger</code></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td>X</td>
  <td>X</td>
</tr>
<tr>
  <td><code>syslog</code></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td>X</td>
</tr>
<tr>
  <td><code>log-rotate</code></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td><code>error-log-logger</code></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td><code>sls-logger</code></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td>X</td>
</tr>
<tr>
  <td><code>google-cloud-logging</code></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td>X</td>
</tr>
<tr>
  <td><code>splunk-hec-logging</code></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td>X</td>
</tr>
<tr>
  <td><code>file-logger</code></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td>X</td>
  <td>X</td>
</tr>
<tr>
  <td><code>loggly</code></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td>X</td>
  <td>X</td>
</tr>
<tr>
  <td><code>elasticsearch-logger</code></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td>X</td>
</tr>
<tr>
  <td><code>tencent-cloud-cls</code></td>
  <td></td>
  <td>X</td>
  <td></td>
  <td></td>
  <td>X</td>
  <td>X</td>
</tr>
<tr>
  <td><code>loki-logger</code></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td>X</td>
  <td>X</td>
</tr>
</tbody>
<thead>
<tr>
  <th><em>Other</em></th>
  <th><code>rewrite</code></th>
  <th><code>access</code></th>
  <th><code>before_proxy</code></th>
  <th><code>header_filter</code></th>
  <th><code>body_filter</code></th>
  <th><code>log</code></th>
</tr>
</thead>
<tbody>
<tr>
  <td><code>serverless</code></td>
  <td></td>
  <td>X</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td><code>openwhisk</code></td>
  <td></td>
  <td>X</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td><code>dubbo-proxy</code></td>
  <td></td>
  <td>X</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td><code>kafka-proxy</code></td>
  <td></td>
  <td>X</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
</tbody>
</table>

## Conclusion

I've detailed Apache APISIX plugin phases and priorities in this post. I've explained their relationship with one another. Icing on the cake, I documented each out-of-the-box plugin's phase(s). I hope it will prove helpful.

**To go further:**

* [Default plugin priorities](https://github.com/apache/apisix/blob/master/conf/config-default.yaml#L438)
* [Apache APISIX plugin execution lifecycle](https://apisix.apache.org/docs/apisix/terminology/plugin/#plugins-execution-lifecycle)
* [Plugin execution code](https://github.com/apache/apisix/blob/master/apisix/plugin.lua#L1126-L1193)

_Originally published at [A Java Geek](https://blog.frankel.ch/apisix-plugins-priority-leaky-abstraction/) on December 10<sup>th</sup>, 2023_
