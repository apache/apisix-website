---
title: "Apache APISIX 2.14.1 正式发布"
authors:
  - name: "罗泽轩"
    title: "Author"
    url: "https://github.com/spacewander"
    image_url: "https://avatars.githubusercontent.com/u/4161644?v=4"
  - name: "韩飞"
    title: "Technical Writer"
    url: "https://github.com/hf400159"
    image_url: "https://github.com/hf400159.png"
keywords: 
- Apache APISIX
- 2.14.1
- WebSocket
- API 网关
description: Apache APISIX 2.14.1 正式发布！该版本支持在控制面实现服务发现，还支持 Istio、基于 WebSocket 的 pubsub 代理框架和基于 xRPC 框架管理非 HTTP 七层协议。
tags: [Community]
---

> 探索性版本—— Apache APISIX 2.14.1 正式发布。该版本不仅支持了在控制面实现服务发现，还支持了 Istio、基于 WebSocket 的 pubsub 代理框架和基于 xRPC 框架管理非 HTTP 的 7 层协议。

<!--truncate-->

距离上次 APISIX v2.13 LTS 版本发布已经有两个多月的时间，以往每次 APISIX 的小版本发布，都会为大家带来新功能。然而 APISIX v2.14.1 版本发布的功能，将紧跟技术前沿，为大家带来了诸多探索性的新功能，并为 APISIX v3 版本的发布投石问路，欢迎大家探索这些新功能。

接下来我们先看下 APISIX 支持了哪些探索性的新功能。

![Apache APISIX 2.14.1 更新概览](https://static.apiseven.com/202108/1653981177761-fdd9509a-2caf-43d6-a710-ee5f81d4a193.png)

## 基于 WebSocket 的 pubsub 代理框架

在 APISIX v2.14.1 版本之前，无论是代理 gRPC 请求还是普通的 HTTP 请求，APISIX 的上游都是对接的应用服务器，无法满足多元化场景需求。例如用户需要使用其他上游类型（比如 Kafka），就只能通过其他方式实现。但是在 APISIX v2.14.1 版本中，APISIX 新增了一个基于 Websocket 的消息订阅代理框架，该框架允许客户端通过 APISIX 来订阅指定消息队列（上游）中的消息。现在你可以使用 APISIX 来订阅 Kafka 中的消息。

以 Kafka 为例，我们需要如下配置：

```shell
curl -X PUT 'http://127.0.0.1:9080/apisix/admin/routes/kafka' \
    -H 'X-API-KEY: ${api-key}' \
    -H 'Content-Type: application/json' \
    -d '{
    "uri": "/kafka",
    "upstream": {
        "nodes": {
            "kafka-server1:9092": 1,
            "kafka-server2:9092": 1,
            "kafka-server3:9092": 1
        },
        "type": "none",
        "scheme": "kafka"
    }
}'
```

上述示例是在路由中添加了一个 Kafka 类型的上游，并包含了多个 Broker。

你可以参考以下步骤订阅该上游：

1. 首先请通过 WebSocket 建立连接。
2. 获取 Topic 中的某个 Partition 当前的 offset。以下示例使用了 Protobuf 来编码相关的请求和响应：

    ```
    message PubSubReq {
        int64 sequence = 1;
        oneof req {
            CmdEmpty cmd_empty                       = 31;
            CmdPing cmd_ping                         = 32;
            CmdKafkaFetch      cmd_kafka_fetch       = 33;
            CmdKafkaListOffset cmd_kafka_list_offset = 34;
        };
    }

    message PubSubResp {
        int64 sequence = 1;
        oneof resp {
            ErrorResp error_resp                       = 31;
            PongResp pong_resp                         = 32;
            KafkaFetchResp kafka_fetch_resp            = 33;
            KafkaListOffsetResp kafka_list_offset_resp = 34;
        };
    }
    ```

    获取 offset 的请求如下：

    ```
    message CmdKafkaListOffset {
        string topic = 1;
        int32 partition = 2;
        int64 timestamp = 3;
    }
    ```

    各个字段具体含义请参考 [pubsub.proto](https://github.com/apache/apisix/blob/master/apisix/include/apisix/model/pubsub.proto)。

3. 之后每次订阅操作都可以根据当前的 offset 来获取最新的消息。

:::tip

成功获取消息之后，需要更新当前的 offset，更新后的 offset 是之前返回的 offset + 1。

:::

具体操作可参考源码和测试用例：

- https://github.com/apache/apisix/blob/master/t/pubsub/kafka.t

- https://github.com/apache/apisix/blob/master/t/lib/pubsub.lua

虽然当前的 Pubsub 框架仅提供了底层的接口，但是它已经实现了两个最基本的需求：

- 通过常用的 `80/443` 端口暴露 Kafka 服务能力，无需应用服务器再封装多一层。
- 允许添加鉴权插件，像使用一般的 Websocket 框架那样给 Kafka 的服务增加安全保护。

如果你在实际使用过程中遇到问题，可以通过提交 [issue](https://github.com/apache/apisix/issues) 的方式反馈给 Apache APISIX 社区，社区将根据反馈，继续完善和增强这一功能。

## 基于 xRPC 框架管理非 HTTP 的 7 层协议

APISIX 在早期版本就支持代理 TCP 协议，但是部分场景中，纯粹的 TCP 协议代理无法满足用户需求。因为有些功能必须在对应用协议进行编解码之后才能实现，因此用户就需要特定应用协议的代理，比如 Redis Proxy、Kafka Proxy 等。

从 APISIX v2.14.1 版本开始，APISIX 提供了 xRPC 框架，允许开发者在该框架上自定义特定的应用协议。基于 xRPC 框架，APISIX 可以提供对若干主流应用协议的代理支持。同时用户也可以基于该框架来支持自己私有的基于 TCP 的应用协议，使其具备类似 HTTP 协议代理的精准颗粒度和更高阶的 7 层控制。

目前，APISIX 已经在 xRPC 框架上实现了 Redis 的代理功能，支持了根据命令注入延迟和有选择性地记录日志内容。尽管 APISIX 需要对 Redis 协议进行编解码，但是在简单的 SET/GET 性能测试中，使用双 Worker 进程的 APISIX 进行代理，其性能可以达到直连 Redis 的 80%。

你可以参考以下命令创建一个代理 Redis 协议的流路由：

```shell
curl http://127.0.0.1:9080/apisix/admin/stream_routes/1 \
-H 'X-API-KEY: ${api-key}' -X PUT -d '
{
    "upstream": {
        "type": "none",
        "nodes": {
            "127.0.0.1:6379": 1
        }
    },
    "protocol": {
        "name": "redis",
        "conf": {
            "faults": [{
                "commands": ["get", "ping"],
                "delay": 5
            }]
        },
        logger = {
            [
                "name": "syslog",
                "filter": [
                    ["rpc_time", ">=", 1],
                ],
                "conf": {
                    "host": "127.0.0.1",
                    "port": 8125,
                    "sock_type": "udp",
                    "batch_max_size": 1,
                    "flush_limit": 1
                }
            ]
        }
    }
}'
```

以上配置释义如下：

当命令是 GET 或 ping 时，将会有 5 秒延迟。同时每个命令执行之后，会判断其花费的时间是否超过 1 秒，如果是，则触发对应的 `logger` 对象，并发送 `syslog` UDP 日志到 `127.0.0.1` 的 `8125` 端口。

## 控制面支持服务发现

在 v2.14.1 版本之前，APISIX 仅在数据面支持了服务发现。这种情况下，每个 APISIX 实例都需要获取服务发现的数据，但是用户在实际应用过程中，反馈了以下问题：

1. 每个 APISIX 实例都需要从服务发现系统里拉取数据，这让网络拓扑变得复杂。
2. 服务发现配置需要在每个 APISIX 实例都配置一遍。如需修改密码，就必须修改配置文件，然后发布到每个 APISIX 实例上。
3. 当前许多服务发现都没有提供 Lua SDK，如果要使用这些服务发现系统，就需要自己直接对接该服务器提供的 HTTP API （假如存在）。

因此从 v2.14.1 版本开始，APISIX 将在控制面支持服务发现功能。服务发现将通过 [APISIX-Seed](https://github.com/api7/apisix-seed/) 实现。

该功能实现原理是通过 `apisix-seed` 同时监听 etcd 中 Upstream 相关的资源和服务发现组件中对应的上游服务资源，当服务发现组件中的上游服务资源发生变化时更新 etcd 中相关的 Upstream 信息。

具体实现流程如下图：

![error/APISIX-Seed 架构图.png](https://static.apiseven.com/202108/1653983575757-97b39a39-8bd1-4e1e-b708-a7b43976c342.png)

目前来看，控制面服务发现的方案也有不足之处，比如对 etcd 的压力较大。因此 APISIX 会同时保留两种服务发现方案，并通过更多实际应用来证明哪个方案会更优。

## 初步支持 Istio

为了适应更广泛的应用场景，从 v2.14.1 版本开始，APISIX 将尝试兼容 Istio，以 Istio 为控制面、APISIX 为数据面的形式，开始在服务网格领域中探索。

由于 Istio 的配置是通过 xDS 协议下发的，所以开发了 [Amesh](https://github.com/api7/amesh) 项目，把 Istio 下发的 xDS 转换成 APISIX 的配置。目前，APISIX 已经能够跑通 Istio 官方的 Simple Bookstore App demo。在后续版本中，APISIX 也会继续拓宽对 xDS 的支持，把 Istio 和 APISIX 的能力越来越紧密地结合在一起。

## 更多插件和功能

除了上面提到的几个探索性功能外，本次版本发布也为用户提供了一些较为传统的功能：

- 新增 `casdoor` 插件，提高与 Casdoor 的交互体验。
- `response-rewrite` 插件增加了针对 Body 的替换过滤器。

更多功能更新和 Bug 修复细节，请查看官方 [Releases CHANGELOG](https://github.com/apache/apisix/blob/master/CHANGELOG.md)。
