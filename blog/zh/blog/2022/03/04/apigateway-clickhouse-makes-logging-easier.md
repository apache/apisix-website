---
title: "API 网关集成 ClickHouse 插件提升全链路日志效率"
authors:
  - name: "祁振东"
    title: "Author"
    url: "https://github.com/zhendongcmss"
    image_url: "https://github.com/zhendongcmss.png"
  - name: "曾奕霖"
    title: "Technical Writer"
    url: "https://github.com/yzeng25"
    image_url: "https://github.com/yzeng25.png"
keywords: 
- Apache APISIX
- API 网关
- ClickHouse
- 日志
- Ecosystem
description: 本文讲述了社区贡献者祁振东为云原生 API 网关 Apache APISIX 贡献 `clickhouse-logger` 的历程，以及如何使用该插件简化业务架构，提升全链路日志效率。
tags: [Plugins, Ecosystem]
---

> 本文作者祁振东，来自中国移动云能力中心。从事分布式对象存储软件开发工作，参与移动云多个资源池的建设工作，在对象存储领域有丰富的实战经验。本文讲述了社区贡献者祁振东为 Apache APISIX 贡献 `clickhouse-logger` 的历程，以及如何使用该插件简化业务架构，提升全链路日志效率。

<!--truncate-->

## 背景信息

Apache APISIX 是一个动态、实时、高性能的 API 网关，提供负载均衡、动态上游、灰度发布、服务熔断、身份认证、可观测性等丰富的流量管理功能。作为 API 网关，Apache APISIX 拥有多种类型的实用插件。得益于 Apache APISIX 的插件热加载机制，我们无需重启便可启用插件、修改插件配置和停用插件。

ClickHouse 由 Yandex 开发，在 2016 年开源。ClickHouse 不止是一个数据库， 也是一个数据库管理系统，它允许在运行时创建表和数据库、加载数据和运行查询，而无需重新配置或重启服务。

随着越来越多的公司开始将业务迁移上云，如何高效地实现日志收发及日志分析，增强系统的可观测性成为了一个难题。中国移动云能力中心作为一家提供公有云服务的企业，前期基于 Apache APISIX 的业务日志收发和和分析系统的架构大致是这样的。

![initial bussiness architecture](https://static.apiseven.com/202108/1646363723740-f92d6a39-64e0-4464-8c44-c73832362bf6.png)

随着业务的增长，上述方案不仅维护成本奇高，而且难以满足我们对于精细化数据分析的需求。由于 rsyslog 接收到的数据是一个字符串，而不是 JSON 格式的日志，给日志分析带来了一定的难度。

计算机领域有句名言： “任何问题都可以通过增加一个间接的中间层来解决”。我们其实也考虑过在 `tcp-logger` 和 rsyslog 之间再加一个中间层，使字符串转换为 JSON。但这显然不是长久之计。

所以我们换了一种思路去看待这个问题：如果把现有架构中的“tcp-logger+rsyslog+Promtail+Loki”看作是一个巨大的中间层，那么不论我们在这中间怎么添加额外的中间层，除了能解决燃眉之急外，只会使它变得更加臃肿和难以维护。市面上有没有一个产品能直接把“tcp-logger+rsyslog+Promtail+Loki”给替换掉呢？

带着这个问题，我们花了些时间进行调研，最终选择 ClickHouse 主要有以下几点原因。

1. ClickHouse 提供 HTTP 接口，方便其它模块调用。
2. 基于 ClickHouse 的分析工具链很成熟，能够满足我们对日志分析的需求。
3. ClickHouse 支持使用对象存储作为存储引擎，非常方便。
4. 没有必要自己重复“造轮子”。

接下来就只剩下一个问题需要解决了：如何实现 Apache APISIX 和 ClickHouse 之间的对接？以插件的形式实现对接其实是一个不错的方法。作为 Apache APISIX 社区的一员，我一直都在社区里面“潜水”，看到了最近 Apache APISIX 在生态方面的持续进步，其实我也有些心动，一直在使用 Apache APISIX，但还没有给社区贡献过代码，不如就借这个机会为社区的生态发展添一把火吧。

## ClickHouse 插件实现原理

`clickhouse-logger` 插件的作为一个中间层，对接 Apache APISIX 和 ClickHouse。如前文所说，我们使用Apache APISIX 作为七层负载均衡，请求经过 Apache APISIX 会产生日志，比如 access log 和 error log。`clickhouse-logger` 收集到日志后，会按照自身 metadata 所设置的日志格式，对这些日志进行整理。最后依靠批处理器将整理过的日志批量发送至 ClickHouse。

![clickhouse-logger architecture](https://static.apiseven.com/202108/1646363936994-c2646095-1ea4-4c1f-8cad-1dcecfc41df3.png)

`clickhouse-logger` 在我们这个场景下，起到了替代“tcp-logger+rsyslog+Promtail+Loki”的作用。免除了多个组件之间的格式转换和数据转发，可将 Log 数据请求直接推送到 ClickHouse 服务器。

![improved bussiness architecture](https://static.apiseven.com/202108/1646364005040-93d70286-e7e6-4fb5-a164-1de1c865ce2b.png)

## 操作步骤

以下是在一个路由中启用 `clickhouse-logger` 插件的示例过程。

### 启用 ClickHouse 插件

运行 `curl` 命令，为指定路由开启 `clickhouse-logger` 插件。

```shell
curl http://127.0.0.1:9080/apisix/admin/routes/1 \
-H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
      "plugins": {
            "clickhouse-logger": {
                "user": "default",
                "password": "a",
                "database": "default",
                "logtable": "test",
                "endpoint_addr": "http://127.0.0.1:8123"
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

`clickhouse-logger` 的参数表如下。

|名称|类型|必填|默认值|取值范围|描述|
|----|----|--------|------------|-----|-----------|
|endpoint_addr|string|是|n/a|n/a|ClickHouse 服务器的 endpoint。|
|database|string|是|n/a|n/a|使用的数据库。|
|logtable|string|是|n/a|n/a|写入的表名 。|
|user|string|是|n/a|n/a|ClickHouse 的用户。|
|password|string|是|n/a||ClickHouse 的密码 。|
|timeout|integer|否|3|[1,...]|发送请求后保持连接活动的时间。|
|name|string|否|"clickhouse-logger"|n/a|标识 logger 的唯一标识符。|
|batch_max_size|integer|否|100|[1,...]|设置每批发送日志的最大条数，当日志条数达到设置的最大值时，会自动推送全部日志到 `clickhouse`。|
|max_retry_count|integer|否|0|[0,...]|从处理管道中移除之前的最大重试次数。|
|retry_delay|integer|否|1|[0,...]|如果执行失败，则应延迟执行流程的秒数。|
|ssl_verify|boolean|否|true|[true,false]|验证证书。|

### 测试 ClickHouse 插件

1. 使用 `curl` 命令测试插件。
  
  ```shell
  curl -i http://127.0.0.1:9080/hello
  ```

2. 返回结果如下，则表示成功启用。

  ```shell
  HTTP/1.1 200 OK
  ...
  hello, world
  ```

### 进阶操作 1：设置日志格式

你可以使用 `log_format` 这个元数据设置自定义的日志格式，示例如下。

1. 配置 `log_format` 元数据参数。

  ```shell
  curl http://127.0.0.1:9080/apisix/admin/plugin_metadata/clickhouse-logger \
  -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
  {
      "log_format": {
          "host": "$host",
          "@timestamp": "$time_iso8601",
          "client_ip": "$remote_addr"
      }
  }'
  ```

  > 以 JSON 格式的键值对来声明日志格式。对于值部分，仅支持字符串。如果是以 `$` 开头，则表明是要获取 [APISIX 变量](https://apisix.apache.org/docs/apisix/apisix-variable)或 [Nginx 内置变量](http://nginx.org/en/docs/varindex.html)。**该设置是全局生效的**，意味着指定 `log_format` 后，将对所有绑定 `http-logger` 的 Route 或 Service 生效。

2. 创建 ClickHouse 写入的表格。

  ```sql
  CREATE TABLE default.test (
    `host` String,
    `client_ip` String,
    `route_id` String,
    `@timestamp` String,
    PRIMARY KEY(`@timestamp`)
  ) ENGINE = MergeTree()
  ```

3. 在 ClickHouse 上执行 `select * from default.test;`，将得到类似下面的数据。

  ```shell
  ┌─host──────┬─client_ip─┬─route_id─┬─@timestamp────────────────┐
  │ 127.0.0.1 │ 127.0.0.1 │    1     │ 2022-01-17T10:03:10+08:00 │
  └───────────┴───────────┴──────────┴───────────────────────────┘
  ```

### 进阶操作 2：使用 Grafana 与 ClickHouse 对接

1. 全局开启 `clickhouse-logger` 插件。

  ```shell
  curl http://127.0.0.1:9080/apisix/admin/global_rules/1 \
  -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
  {
      "plugins": {
          "clickhouse-logger": {
              "timeout": 3,
              "retry_delay": 1,
              "batch_max_size": 100,
              "user": "default",
              "password": "a",
              "database": "default",
              "logtable": "t",  "max_retry_count": 1,
              "endpoint_addr": "http://127.0.0.1:8123"
          }
      }
  }'
  ```

2. 配置 `log_format` 元数据参数。`log_format` 的格式必须与数据库表的结构保持一致，否则会导致写入失败。

  ```shell
   curl http://127.0.0.1:9080/apisix/admin/plugin_metadata/clickhouse-logger \
  -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
  {
      "log_format": {
          "upstream_header_time": "$upstream_header_time",
          "upstream_connect_time": "$upstream_connect_time",
          "status": "$status",
          "host": "$host",
          "body_bytes_sent": "$body_bytes_sent",
          "request": "$request",
          "remote_user": "$remote_user",
          "client_ip": "$remote_addr",
          "content_length": "$content_length",
          "local_time": "$fmt_ms_time_local",
          "http_referer": "$http_referer",
          "http_x_amz_target": "$http_x_amz_target",
          "http_x_request_id": "$http_x_request_id",
          "upstream_response_time": "$upstream_response_time",
          "upstream_status": "$upstream_status",
          "http_user_agent": "$http_user_agent",
          "request_time": "$request_time",
          "upstream_addr": "$upstream_addr",
          "http_host": "$http_host",
          "content_type": "$content_type"
      }
  }'
  ```

以下是使用 Grafana 与 Clickhouse 对接后的仪表盘视图。

![Grafana-1](https://static.apiseven.com/202108/1646366781343-ab2848fe-d10a-4222-a90d-79f4fe58999a.png)

![Grafana-2](https://static.apiseven.com/202108/1646366807867-4391a9ff-8b71-411c-8353-38957a5a2da1.png)

![Grafana-3](https://static.apiseven.com/202108/1646366832282-e8f24c63-c914-4051-8239-582bc3e58f50.png)

### 禁用 ClickHouse 插件

在插件配置中删除相应的配置即可禁用 `clickhouse-logger`。由于 Apache APISIX 插件是热加载模式，因此无需重新启动即可更新配置。

```shell
curl http://127.0.0.1:9080/apisix/admin/routes/1  \
-H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "methods": ["GET"],
    "uri": "/hello",
    "plugins": {},
    "upstream": {
        "type": "roundrobin",
        "nodes": {
            "127.0.0.1:1980": 1
        }
    }
}'
```

## 总结

以上就是我为 Apache APISIX 开发 `clickhouse-logger` 的全过程。希望社区里有更多的人愿意走出舒适区，实现自身的角色转换，从关注者变为贡献者的过程远比你想象的简单。
