---
title: "APISIX 集成 Kafka 实现高效实时日志监控"
authors:
  - name: "白泽平"
    title: "Author"
    url: "https://github.com/bzp2010"
    image_url: "https://avatars.githubusercontent.com/u/8078418?v=4"
  - name: "苏钰"
    title: "Technical Writer"
    url: "https://github.com/SylviaBABY"
    image_url: "https://avatars.githubusercontent.com/u/39793568?v=4"
keywords: 
- Apache APISIX
- Apache Kafka
- Kafka
- 日志
- 监控
description: 本文介绍了如何在 Apache APISIX 中使用 kafka-logger 插件。经过多次功能强化后，目前该插件已具备非常成熟且完善的功能。
tags: [Ecosystem,Plugins]
image: https://static.apiseven.com/2022/blog/0818/plugins/kafka.png
---

> Apache APISIX 早在 1.2 版本开始就已经提供了 `kafka-logger` 插件的支持，其后又经过多次功能强化，目前已具备非常成熟且完善的功能。支持将 API 请求日志，甚至请求体和响应体以 JSON 格式推送至 Kafka 集群中。

<!--truncate-->

Apache Kafka 是由 Apache 管理的开源流处理平台，由 Scala 和 Java 编写，为处理实时数据提供了统一、高吞吐、低延迟的功能特性。

其持久化层本质上是一个“按照分布式事务日志架构的大规模发布/订阅消息队列”，这使它作为企业级基础设施来处理流式数据非常有价值。目前已被数千家公司用于高性能数据管道、流分析、数据集成和任务关键型应用程序等领域。

## 实现方式：kafka-logger

Apache APISIX 早在 1.2 版本开始就已经提供了 `kafka-logger` 插件的支持，其后又经过多次功能强化，目前已具备非常成熟且完善的功能。支持将 API 请求日志，甚至请求体和响应体以 JSON 格式推送至 Kafka 集群中。

使用 `kafka-logger` 时，用户可以发送多种数据并自定义发送的日志格式，同时还支持以批处理的方式打包发送日志或进行自动重试等功能。

## 如何使用

### 步骤1：启动 Kafka 集群

本文示例只演示了一种启动方式，其他启动方式细节可参考 [Kafka 官方文档](https://kafka.apache.org/documentation/#quickstart)。

```yaml
# 使用 docker-compose 启动一个具有 1个 zookeeper 节点、3个 kafka 节点的集群
# 同时还启动一个 EFAK 用于数据监控。
version: '3'

services:
  zookeeper:
    image: confluentinc/cp-zookeeper:6.2.1
    hostname: zookeeper
    ports:
      - "2181:2181"
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_SERVER_ID: 1
      ZOOKEEPER_SERVERS: zookeeper:2888:3888

  kafka1:
    image: confluentinc/cp-kafka:6.2.1
    hostname: kafka1
    ports:
      - "9092:9092"
    environment:
      KAFKA_ADVERTISED_LISTENERS: LISTENER_DOCKER_INTERNAL://kafka1:19092,LISTENER_DOCKER_EXTERNAL://${DOCKER_HOST_IP:-127.0.0.1}:9092
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: LISTENER_DOCKER_INTERNAL:PLAINTEXT,LISTENER_DOCKER_EXTERNAL:PLAINTEXT
      KAFKA_INTER_BROKER_LISTENER_NAME: LISTENER_DOCKER_INTERNAL
      KAFKA_ZOOKEEPER_CONNECT: "zookeeper:2181"
      KAFKA_BROKER_ID: 1
      KAFKA_LOG4J_LOGGERS: "kafka.controller=INFO,kafka.producer.async.DefaultEventHandler=INFO,state.change.logger=INFO"
    depends_on:
      - zookeeper

  kafka2:
    image: confluentinc/cp-kafka:6.2.1
    hostname: kafka2
    ports:
      - "9093:9093"
    environment:
      KAFKA_ADVERTISED_LISTENERS: LISTENER_DOCKER_INTERNAL://kafka2:19093,LISTENER_DOCKER_EXTERNAL://${DOCKER_HOST_IP:-127.0.0.1}:9093
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: LISTENER_DOCKER_INTERNAL:PLAINTEXT,LISTENER_DOCKER_EXTERNAL:PLAINTEXT
      KAFKA_INTER_BROKER_LISTENER_NAME: LISTENER_DOCKER_INTERNAL
      KAFKA_ZOOKEEPER_CONNECT: "zookeeper:2181"
      KAFKA_BROKER_ID: 2
      KAFKA_LOG4J_LOGGERS: "kafka.controller=INFO,kafka.producer.async.DefaultEventHandler=INFO,state.change.logger=INFO"
    depends_on:
      - zookeeper


  kafka3:
    image: confluentinc/cp-kafka:6.2.1
    hostname: kafka3
    ports:
      - "9094:9094"
    environment:
      KAFKA_ADVERTISED_LISTENERS: LISTENER_DOCKER_INTERNAL://kafka3:19094,LISTENER_DOCKER_EXTERNAL://${DOCKER_HOST_IP:-127.0.0.1}:9094
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: LISTENER_DOCKER_INTERNAL:PLAINTEXT,LISTENER_DOCKER_EXTERNAL:PLAINTEXT
      KAFKA_INTER_BROKER_LISTENER_NAME: LISTENER_DOCKER_INTERNAL
      KAFKA_ZOOKEEPER_CONNECT: "zookeeper:2181"
      KAFKA_BROKER_ID: 3
      KAFKA_LOG4J_LOGGERS: "kafka.controller=INFO,kafka.producer.async.DefaultEventHandler=INFO,state.change.logger=INFO"
    depends_on:
      - zookeeper

  efak:
    image: nickzurich/kafka-eagle:2.0.9
    hostname: efak
    ports:
      - "8048:8048"
    depends_on:
      - kafka1
      - kafka2
      - kafka3
```

### 步骤2：创建 Topic

接下来我们创建 `test Topic` 用于收集日志。

![test Topic](https://static.apiseven.com/202108/1642390784736-562187ed-ade9-4a2f-96e1-c79556f9dd7d.png)

### 步骤3：创建路由并开启插件

通过下方命令可进行路由创建与 `kafka-logger` 插件的开启。

```shell
curl -XPUT 'http://127.0.0.1:9080/apisix/admin/routes/r1' \
--header 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' \
--header 'Content-Type: application/json' \
--data-raw '{
    "uri": "/*",
    "plugins": {
        "kafka-logger": {
            "batch_max_size": 1,
            "broker_list": {
                "127.0.0.1": 9092
            },
            "disable": false,
            "kafka_topic": "test",
            "producer_type": "sync"
        }
    },
    "upstream": {
        "nodes": {
            "httpbin.org:80": 1
        },
        "type": "roundrobin"
    }
}'
```

上述代码中配置了 `kafka broker` 地址、目标 Topic、同步的生产模式和每一批次包含的最大日志数量。这里我们可以先将 `batch_max_size` 设置为 1，即每产生一条日志就向 Kafka 写入一条消息。

通过上述设置，就可以实现将 `/*` 路径下的 API 请求日志发送至 Kafka 的功能。

### 步骤4：发送请求

接下来我们通过 API 发送一些请求，并记录下请求次数。

```shell
# 向 API 发送 10 次请求
curl http://127.0.0.1:9080/get
```

通过下图可以看到，有一些日志消息已经被写入到我们创建的 `test topic`2 中。点击查看日志内容，可以发现上述进行的 API 请求日志已经被写入了。

![发送请求-1](https://static.apiseven.com/202108/1642390828394-721eccfa-ab02-4f8f-a0d8-8039e0eaabc1.png)

![发送请求-2](https://static.apiseven.com/202108/1642390874028-89683dfb-ab16-48cd-92de-496cc60df3b5.png)

#### 自定义日志结构

当然，在使用过程中我们也可以通过 `kafka-logger` 插件提供的元数据配置，来设置发送至 Kafka 的日志数据结构。通过设置 `log_format` 数据，可以控制发送的数据类型。

比如以下数据中的 `$host`、`$time_iso8601` 等，都是来自于 Nginx 提供的内置变量；也支持如 `$route_id` 和 `$service_id` 等 Apache APISIX 提供的变量配置。

```shell
curl -XPUT 'http://127.0.0.1:9080/apisix/admin/plugin_metadata/kafka-logger' \
--header 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' \
--header 'Content-Type: application/json' \
--data-raw '{
    "log_format": {
        "host": "$host",
        "@timestamp": "$time_iso8601",
        "client_ip": "$remote_addr",
        "route_id": "$route_id"
    }
}'
```

通过发送请求进行简单测试，可以看到上述日志结构设置已生效。目前 Apache APISIX 提供多种日志格式模板，在配置上具有极大的灵活性，更多日志格式细节可参考 [Apache APISIX 官方文档](https://apisix.apache.org/docs/apisix/plugins/kafka-logger#metadata)。

![自定义日志结构](https://static.apiseven.com/202108/1642390899127-d1eb560a-499e-4a9f-9227-4063ba711e2d.png)

### 关闭插件

如使用完毕，只需移除路由配置中 `kafka-logger` 插件相关配置并保存，即可关闭路由上的插件。得益于 Apache APISIX 的动态化优势，开启关闭插件的过程都不需要重启 Apache APISIX，十分方便。

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

## 总结

本文为大家介绍了关于 kafka-logger 插件的功能前瞻与使用步骤，更多关于 kafka-logger 插件说明和完整配置列表，可以参考官方文档。

也欢迎随时在 [GitHub Discussions](https://github.com/apache/apisix/discussions) 中发起讨论，或通过[邮件列表](https://apisix.apache.org/zh/docs/general/join)进行交流。
