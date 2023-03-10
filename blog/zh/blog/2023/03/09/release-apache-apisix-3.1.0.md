---
title: "Apache APISIX 3.2.0 正式发布"
authors:
  - name: "罗泽轩"
    title: "Author"
    url: "https://github.com/spacewander"
    image_url: "https://github.com/spacewander.png"
  - name: "Yilialinn"
    title: "Technical Writer"
    url: "https://github.com/Yilialinn"
    image_url: "https://avatars.githubusercontent.com/u/114121331?v=4"
keywords: 
- Apache APISIX
- LTS
description: APISIX 3.2.0 是 3.0 大版本以来的第一个 LTS 版本。此次发版，是 3.x 时代更替 2.x 时代的一大里程碑。从此之后，新的一系列 patch 版本将会在 3.2 的基础上发布。本次发布一如往常一样带来了许多新的插件和特性，为 APISIX 的使用者带来不一样的新玩法。
tags: [Community]
---

> APISIX 3.2.0 是 3.0 大版本以来的第一个 LTS 版本。此次发版，是 3.x 时代更替 2.x 时代的一大里程碑。从此之后，新的一系列 patch 版本将会在 3.2 的基础上发布。本次发布一如往常一样带来了许多新的插件和特性，为 APISIX 的使用者带来不一样的新玩法。

<!--truncate-->

## 新特性：四层上的服务发现

只有少数网关支持服务发现，APISIX 就是其中之一。在 3.2.0 版本中，APISIX 把原来七层上的服务发现的功能也做到了四层上。这样一来，将 APISIX 作为 TCP/UDP 代理时也能享受到服务发现带来的便利性。和在七层上的服务发现一样，要想用上服务发现，我们需要先在 `config.yaml` 中配置服务发现服务器的地址：

```yaml
discovery:
  nacos:
    host:
      - "http://192.168.33.1:8848"
```

然后在具体的 upstream 上配置 `discovery_type` 和 `service_name`：

```shell
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

这样访问 stream_routes 时，上游的节点会从 Nacos 的 APISIX-NACOS 服务中获取。

## 新插件：RESTful 请求转 GraphQL

在 3.2 版本中，APISIX 新增了一个能将 RESTful 请求转成 GraphQL 的插件。假如你有这样的 GraphQL 查询语句：

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

其中 `$name` 和 `$githubAccount` 是两个 GraphQL 变量。

我们可以用如下的配置来暴露出同样的 RESTful 接口：

```shell
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

这里 `query` 是我们要用到的查询语句，`variables` 是事先声明的变量列表。

接下来就能像 RESTful 接口一样访问它：

```shell
curl --location --request POST 'http://localhost:9080/graphql' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Niek",
    "githubAccount": "npalm"
}'
```

结果跟直接用对应的 GraphQL 语句访问上游是一样的：

```json
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

你同样能用 GET 请求来访问同样的接口，这时候参数就需要通过 query string 来传递：

```
curl 'http://localhost:9080/graphql?name=Niek&githubAccount=npalm'
```

## 新特性：支持在每个日志插件上设置日志格式

在 3.2 版本，我们整理了 APISIX 现有的十多个 access 日志插件。现在每个插件都支持配置自定义日志格式：

1. 在该插件的 plugin metadata 中定义全局的日志格式
2. 在具体的路由规则上的该插件的配置中定义当前路由的日志格式

以 `clickhouse-logger` 为例，下面是定义全局日志格式的做法：

```shell
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

下面则是当前路由的日志格式：

```shell
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

## 新插件：请求体/响应体转换

你是否在为如何把返回 XML 的古早上游服务介绍给只接受 JSON 的现代客户端而苦恼？3.2.0 版本新增的 `body-transformer` 插件开源解决这个问题。

`body-transformer` 插件支持 JSON 和 XML 之间的互相转换。不过这并非是它唯一能做的事。它还支持通过模板配置输入输出的内容的具体格式。举个例子，

假设你有下面的 JSON 模板：`{"foo":"{{name .. " world"}}","bar":{{age+10}}}`，并把它配置到 `body-transformer` 插件的 `request.template` 字段中：

```
      ...
      "body-transformer": {
          "request": {
              "template": "..."
          }
      }
      ...
```

那么当请求内容为 `{"name":"hello","age":20}`，发送给上游的是改写之后的 `{"foo":"hello world","bar":30}`。我们采用了 `lua-resty-template` 来渲染模板，所以你可以在模板中嵌入 Lua 表达式来实现改写逻辑。

对上游输出的改写也是类似的，只是需要配置的是插件的 `response.template` 字段。

## 新功能：优化和更多的小功能

除了上面提到的几个大的功能外，此次发布也包含许多值得述说的改动：

* `error-log-logger` 插件支持发送错误日志到 Kafka
* `limit-count` 插件支持返回 `X-RateLimit-Reset` 响应头

等等。

如果你对完整的内容感兴趣，请参考 3.2 发布的 CHANGELOG：[https://github.com/apache/apisix/blob/release/3.2/docs/zh/latest/CHANGELOG.md#320](https://github.com/apache/apisix/blob/release/3.2/docs/zh/latest/CHANGELOG.md#320)
