---
title: "API 网关 APISIX 集成 RocketMQ 扩展日志监控功能"
authors: 
  - name: "余洲"
    title: "Author"
    url: "https://github.com/yuz10"
    image_url: "https://avatars.githubusercontent.com/u/14816818?v=4"
  - name: "苏钰"
    title: "Technical Writer"
    url: "https://github.com/SylviaBABY"
    image_url: "https://avatars.githubusercontent.com/u/39793568?v=4"
keywords: 
- Apache APISIX
- Apache RocketMQ
- API 网关
- 日志处理
- 监控功能
description: 本文介绍了 API 网关 Apache APISIX 新增的 rocketmq-logger 日志插件，通过该插件可以帮助你在使用 Apache APISIX 时更方便的与 RocketMQ 集群连接。
tags: [Ecosystem,Plugins]
image: https://static.apiseven.com/2022/blog/0818/plugins/RocketMQy.png
---

> 本文将为大家介绍 Apache APISIX 与 Apache RocketMQ 最新集成的 rocketmq-logger 插件功能与使用介绍。借助该插件，可以帮助您在使用 APISIX 中更方便的与 RocketMQ 集群连接。

<!--truncate-->

Apache RocketMQ 自 2016 年走入全球开发者视野以来，目前已发展成为电商、金融、教育、科技等多领域技术中台的核心数据底座。

据不完全统计，国内用户（包括金融、保险、财富和券商等各领域百强企业）超过 70% 的企业都在核心应用链路上规模化部署了 Apache RocketMQ，包括全球  5 大云厂商也纷纷上线了有关 Apache  RocketMQ 的云产品服务。

除了常规应用于核心业务消息的处理，也有非常多的公司开始使用 Apache RocketMQ 进行日志处理与分析。

## 插件介绍

为了满足广大企业用户对于日志处理的需求，Apache APISIX 发布了基于 Apache RocketMQ 的日志插件 `rocketmq-logger`，支持将 API 接口请求日志以 JSON 形式推送给 RocketMQ 集群。

该插件使用 RocketMQ 原生支持的 TCP 协议，通过 OpenResty 提供的无阻塞 TCP Socket API，实现了高并发、高性能访问等功能特性。

同时，使用 `rocketmq-logger` 插件发送的 API 日志格式与其他日志插件相同，同样支持批量发送日志、自定义日志格式、支持重试等功能。

此外，该插件还支持 TLS 加密传输，以及配置 AK、SK 认证方式访问 Apache RocketMQ，满足用户对于数据安全的需求。

## 如何使用

### 启动 RocketMQ

首先在本地利用下述命令来启动 RocketMQ，具体详细步骤可参考[官方文档](https://rocketmq.apache.org/docs/quick-start/)。

```shell
wget https://dlcdn.apache.org/rocketmq/4.9.2/rocketmq-all-4.9.2-bin-release.zip

unzip rocketmq-all-4.9.2-bin-release.zip

cd rocketmq-4.9.2/

nohup sh bin/mqnamesrv &

nohup sh bin/mqbroker -n 127.0.0.1:9876 -c conf/broker.conf &
```

### 在 Apache APISIX 中开启插件

在生产环境中只需执行一条命令，就可以为指定路由启用 `rocketmq-logger` 插件。

```shell
curl http://127.0.0.1:9080/apisix/admin/routes/1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "plugins": {
       "rocketmq-logger": {
           "nameserver_list" : [ "127.0.0.1:9876" ],
           "topic" : "test",
       }
    },
    "upstream": {
       "nodes": {
           "127.0.0.1:1980": 1
       },
       "type": "roundrobin"
    },
    "uri": "/hello"
}'
```

启用 `rocketmq-logger` 插件后，任何对端点 `URI/hello` 的请求都会将日志推送到 Apache RocketMQ 中。

具体支持的参数详情可参考下方表格：

| 名称             | 类型    | 描述                                             |
| ---------------- | ------- |  ------------------------------------------------ |
| nameserver_list  | object  | 要推送的 rocketmq 的 nameserver 列表。        |
| topic            | string  | 要推送的 topic。                             |
| key              | string  | 发送消息的keys。                             |
| tag              | string  | 发送消息的tags。                             |
| timeout          | integer | 发送数据的超时时间。                          |
| use_tls          | boolean | 是否开启TLS加密。                             |
| access_key       | string  | ACL认证的access key，空字符串表示不开启ACL。     |
| secret_key       | string  | ACL认证的secret key。                        |

#### 插件元数据设置

当然，如果在使用过程中不想使用默认的日志格式，也可以对插件进行元数据设置。

首先可以通过模板形式来调整相关日志格式。

| 名称             |  默认值        |  描述                                             |
| ---------------- |  ------------- | ------------------------------------------------ |
| log_format       |  {"host": "$host", "@timestamp": "$time_iso8601", "client_ip": "$remote_addr"} |    以 JSON 格式的键值对来声明日志格式。对于值部分，仅支持字符串。如果是以 `$` 开头，则表明是要获取 __APISIX__ 变量或 [Nginx 内置变量](http://nginx.org/en/docs/varindex.html)。特别的，__该设置是全局生效的__，意味着指定 log_format 后，将对所有绑定 http-logger 的 Route 或 Service 生效。 |

日志格式调整完成后，需要向 `/apisix/admin/plugin_metadata` 端点发出请求来更新元数据，具体可参考下方代码。

```shell
curl http://127.0.0.1:9080/apisix/admin/plugin_metadata/rocketmq-logger -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "log_format": {
        "host": "$host",
        "@timestamp": "$time_iso8601",
        "client_ip": "$remote_addr"
    }
}'
```

## 禁用插件

如果您不再使用该插件，可通过在插件配置中删除相应的 JSON 配置来禁用 `rocketmq-logger` 插件。该过程无需重新启动服务，输入下方代码即可立即生效。

```shell
curl http://127.0.0.1:9080/apisix/admin/routes/1  -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
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
