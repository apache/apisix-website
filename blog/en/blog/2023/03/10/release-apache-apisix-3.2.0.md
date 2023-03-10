---
title: "Release Apache APISIX 3.2.0"
authors:
  - name: "Zexuan Luo"
    title: "Author"
    url: "https://github.com/spacewander"
    image_url: "https://github.com/spacewander.png"
  - name: "Yilia"
    title: "Technical Writer"
    url: "https://github.com/Yilialinn"
    image_url: "https://avatars.githubusercontent.com/u/114121331?v=4"
keywords: 
- Apache APISIX
- LTS
description: As the first LTS version since the 3.0 version, APISIX 3.2.0 is officially released!
tags: [Community]
---

> As the first LTS version since the 3.0 version, APISIX 3.2.0 is officially released! This release is a significant milestone for the 3.x era to replace the 2.x era.

<!--truncate-->

A new series of patch versions will be released based on the 3.2.0 version. As usual, many features and plugins are added to optimize the experience of using APISIX.

## New feature: service discovery on Layer 4

Only a few gateways support service discovery, and APISIX is one of them. In version 3.2.0, APISIX implemented the service discovery on Layer 4. In this way, you can also enjoy the convenience of service discovery when using APISIX as a TCP/UDP proxy. Like the service discovery on Layer 7, we need to configure the address of the service discovery server in `config.yaml` if we want to use service discovery:

```
discovery:
  nacos:
    host:
      - "http://192.168.33.1:8848"
```

Then configure `discovery_type` and `service_name` on the specific upstream:

```
$ curl http://127.0.0.1:9180/apisix/admin/stream_routes/1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -i -d '
{
    "remote_addr": "127.0.0.1",
    "upstream": {
        "scheme": "tcp",
        "discovery_type": "nacos",
        "service_name": "APISIX-NACOS",
        "type": "roundrobin"
    }
}'
```

In this way, when accessing stream_routes, the upstream node will obtain it from the APISIX-NACOS service of Nacos.

## New plugin: RESTful request to GraphQL

In version 3.2.0, APISIX added a plugin that converts RESTful requests into GraphQL. For example, suppose you have a GraphQL query like this:

```
query($name: String!, $githubAccount: String!) {
  persons(filter: { name: $name, githubAccount: $githubAccount }) {
    id
    name
    blog
    githubAccount
    talks {
      id
      title
    }
  }
}
```

$name and $githubAccount are two GraphQL variables in this code segment.

We can expose the same RESTful interface with the following configuration:

```
curl --location --request PUT 'http://localhost:9180/apisix/admin/routes/1' \
--header 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' \
--header 'Content-Type: application/json' \
--data-raw '{
    "uri": "/graphql",
    "upstream": {
        "type": "roundrobin",
        "nodes": {
            "127.0.0.1:8080": 1
        }
    },
    "plugins": {
        "degraphql": {
            "query": "query($name: String!, $githubAccount: String!) {\n  persons(filter: { name: $name, githubAccount: $githubAccount }) {\n    id\n    name\n    blog\n    githubAccount\n    talks {\n      id\n      title\n    }\n  }\n}",
            "variables": [
                "name",
                "githubAccount"
            ]
        }
    }
}'
```

Here `query` is the query statement we want to use, and `variables` is the list of variables declared in advance.

It can then be accessed as a RESTful interface:

```
curl --location --request POST 'http://localhost:9080/graphql' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Niek",
    "githubAccount": "npalm"
}'
```

The result is the same as accessing upstream directly with the corresponding GraphQL statement:

```
{
  "data": {
    "persons": [
      {
        "id": "7",
        "name": "Niek",
        "blog": "https://040code.github.io",
        "githubAccount": "npalm",
        "talks": [
          {
            "id": "19",
            "title": "GraphQL - The Next API Language"
          },
          {
            "id": "20",
            "title": "Immutable Infrastructure"
          }
        ]
      }
    ]
  }
}
```

You can also use the GET request to access the same interface, then the parameters need to be passed through the query string:

```
curl 'http://localhost:9080/graphql?name=Niek&githubAccount=npalm'
```

## New feature: support for setting log format on each log plugin

In version 3.2.0, we sorted out more than ten existing access log plugins of APISIX. Each plugin now supports configuring custom log formats:

1. Define the global log format in the plugin metadata

2. Define the log format of the current route in the configuration of the plugin on the specific routing rule

Take clickhouse-logger as an example,
Here's how to define a global log format:

```
curl http://127.0.0.1:9180/apisix/admin/plugin_metadata/clickhouse-logger \
-H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "log_format": {
        "host": "$host",
        "@timestamp": "$time_iso8601",
        "client_ip": "$remote_addr"
    }
}'
```

The following is the log format of the current route:

```
curl http://127.0.0.1:9180/apisix/admin/routes/1 \
-H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
      "plugins": {
            "clickhouse-logger": {
                "log_format": {
                    "host": "$host",
                    "@timestamp": "$time_iso8601",
                    "client_ip": "$remote_addr"
                },
                "user": "default",
                "password": "a",
                "database": "default",
                "logtable": "test",
                "endpoint_addrs": ["http://127.0.0.1:8123"]
            }
       },
      "upstream": {
           "type": "roundrobin",
           "nodes": {
               "127.0.0.1:1980": 1
           }
      },
      "uri": "/hello"
}'

```

## New plugin: request body/response body conversion

Are you struggling with how to introduce ancient upstream services that return XML to modern clients that only accept JSON? The new body-transformer plugin in 3.2.0 is open source to solve this problem.

The body-transformer plugin supports conversion between JSON and XML. But that's not the only thing it can do. It also supports configuring the specific format of the input and output content through templates. For example,

Suppose you have the following JSON template: `{"foo":"{{name .. " world"}}", "bar":{{age+10}}}`, and configure it to the `body-transformer` plugin in the `request.template` field:

```
    ...
    "body-transformer": {
        "request": {
            "template": "..."
        }
    }
    ...
```

Then when the request content is `{"name":"hello","age":20}`, the rewritten `{"foo":"hello world","bar":30}` is sent to the upstream. We use `lua-resty-template` to render templates, so you can embed Lua expressions in templates to implement rewriting logic.

The rewriting of upstream output is similar, except that the `response.template` field of the plugin needs to be configured.

## More new features: optimizations and more small features

In addition to the several big features mentioned above, this release contains several changes worth mentioning.

* The error-log-logger plugin supports sending error logs to Kafka

* The limit-count plugin supports returning the X-RateLimit-Reset response header

If you are interested in the full update details of the new release, please refer to the [CHANGELOG](https://github.com/apache/apisix/blob/master/CHANGELOG.md) of the 3.2.0 release.
