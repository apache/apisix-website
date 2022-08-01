---
title: "Release Apache APISIX 2.12.0"
authors:
  - name: "Zexuan Luo"
    title: "Author"
    url: "https://github.com/spacewander"
    image_url: "https://avatars.githubusercontent.com/u/4161644?v=4"
  - name: "Sylvia"
    title: "Technical Writer"
    url: "https://github.com/SylviaBABY"
    image_url: "https://avatars.githubusercontent.com/u/39793568?v=4"
keywords: 
- Apache APISIX
- 2.12.0
- Release
- Serverless
- API Gateway
description: The first version with new features in 2022. Support more authentication plugins and Serverless integration, rich log functions and more details.
tags: [Community]
---

> Following the release of version 2.11.0, Apache APISIX will also bring you the first version with new features in 2022 during the upcoming Spring Festival.

<!--truncate-->

## New Feature: More Serverless Integrations

Remember that in the last release, Apache APISIX added support for Azure Function. This new version is also full of intention, adding support for more Serverless vendors in the feature set.

Users can now also combine AWS Lambda and Apache OpenWhisk in Apache APISIX to expose specific functions on the gateway.

## New features: More Authentication Plugins

This new release also brings two new plugins that we've been waiting for: `forward-auth` and `opa`.

- The `forward-auth` plugin is similar to Traefik's plugin of the same name, which allows sending the information of the current request to an external service for authentication.
- The `opa` plugin integrates with the well-known Open Policy Agent, which can perform complex authentication functions via OPA.

These two plugins will add to the authentication functionality of Apache APISIX, giving users richer and easier authentication operations.

## New features: More Logging Features

In addition to the authentication plugins mentioned above, this new release will also bring three new logging plugins: `google-cloud-logging`, `splunk-hec-logging` and `rocketmq-logger`.

In the future, Apache APISIX will connect to more and more logging service providers and open source brokers to make logging easier.

### Support for logging response bodies

The 2.12.0 release also supports logging of response bodies at the logging level. As with other Apache APISIX features, this feature can be enabled dynamically via expressions. This makes it possible to log only when a specific Content-Type and Content-Length is returned upstream, without having to worry about the problems associated with full response body collection.

An example can be found below.

```json
{
    "plugins": {
        "kafka-logger": {
            "broker_list" : {
                "127.0.0.1":9092
            },
            "kafka_topic" : "test2",
            "include_resp_body": true,
            "include_resp_body_expr": [
                [
                    "sent_http_content_length",
                    "<",
                    "4096"
                ],
                [
                    "sent_http_content_type",
                    "==",
                    "application/json"
                ],
            ]
        }
    },
    "upstream": {
        "nodes": {
            "127.0.0.1:1980": 1
        },
        "type": "roundrobin"
    },
    "uri": "/hello"
}
```

> The above configuration will log only when Content-Length < 4096 and Content-Type is "application/json".

### Support for registering custom variables

Another feature closely related to logging is that the new version of Apache APISIX now supports registration of custom variables. Combined with APISIX's custom logging format, it is possible to fully customize the reported log content. This means that log generation and reporting can be decoupled without modifying specific logging plugins. Here is a simple demonstration with an example.

For example, we can register a variable a6_route_labels in our own plug-in.

```c
local core = require "apisix.core"

core.ctx.register_var("a6_route_labels", function(ctx)
    local route = ctx.matched_route and ctx.matched_route.value
    if route and route.labels then
        return route.labels
    end
    return nil
end)
```

And use it in a custom log format.

```json
{
    "log_format": {
        "host": "$host",
        "labels": "$a6_route_labels",
        "client_ip": "$remote_addr"
    }
}
```

Suppose our Route looks like this.

```json
{
    "plugins": {
        "http-logger": {
            "uri": "http://127.0.0.1:1980/log",
            "batch_max_size": 1,
            "concat_method": "json"
        }
    },
    "upstream": {
        "nodes": {
            "127.0.0.1:1982": 1
        },
        "type": "roundrobin"
    },
    "labels": {
        "k": "v"
    },
    "uri": "/hello"
}
```

Eventually you will receive the log as shown below.

```
{"client_ip":"127.0.0.1","host":"localhost","labels":{"k":"v"},"route_id":"1"}
```

## New: L4 Proxy Support for TLS over TCP Upstream

With the new Upstream Scheme introduced in version 2.12.0, Apache APISIX now supports proxying to TLS over TCP.

See below for details, just specify Scheme as TLS in the Upstream configuration.

```json
{
    "scheme": "tls",
    "nodes": {
        "127.0.0.1:1995": 1
    },
    "type": "roundrobin"
}
```

The TCP proxy feature of Apache APISIX is now fully supported by TLS. In addition, we also support configuring the Access Log of the L4 proxy in a static file.

```
stream:
    enable_access_log: false         # enable access log or not, default false
    access_log: logs/access_stream.log
    access_log_format: "$remote_addr [$time_local] $protocol $status $bytes_sent $bytes_received $session_time"
                                            # create your custom log format by visiting http://nginx.org/en/docs/varindex.html
    access_log_format_escape: default       # allows setting json or default characters escaping in variables
```

## Update: Multi-language plug-ins continue to improve

### WASM ecosystem is more feature-rich

In previous releases, Apache APISIX has opened up support for the WASM ecosystem. In version 2.12.0, a number of details have been updated for the WASM ecosystem.

Apache APISIX now supports running WASM code at the header_filter stage, making up for the fact that existing external plugins cannot modify the response.

In addition, we also support HTTP communication inside WASM through Apache APISIX as a host. With this feature, we have also re-implemented the forward-auth plugin with WASM. The functionality of the plugin is almost identical to the Lua version, and even the test cases pass with a name change from the Lua version.

### Java Plugin Runner latest version released

Of course, we haven't forgotten to update for existing external plugins, and with this 2.12.0 release, Apache APISIX now allows external plugins to fetch request bodies.

For example, the recent release of Java Plugin Runner version 2 includes this feature. The new version of the Java Plugin Runner also supports dynamic fetching of APISIX variables at runtime.

## More details

In addition to the new features and components mentioned above, Apache APISIX version 2.12.0 has been updated with the following features.

- gRPC-Web support: After gRPC proxies and HTTP to gRPC, we welcome the third member of the gRPC family. Apache APISIX now also supports the proxy gRPC Web protocol.
- `limit-count` enhancements: The `limit-count` plugin now supports sharing of counters between requests and routes, which is quite flexible.

More details about the Apache APISIX 2.12.0 update can be found in the [Change log](https://github.com/apache/apisix/blob/release/2.12/CHANGELOG.md#2120) corresponding to this release.

## Download

To obtain the latest version of Apache APISIX 2.12.0, you can download it via the following path.

- Source code: Please visit [Download page](https://apisix.apache.org/downloads/)
- Binary installation package: Please visit [Installation Guide](https://apisix.apache.org/zh/docs/apisix/how-to-build/)
