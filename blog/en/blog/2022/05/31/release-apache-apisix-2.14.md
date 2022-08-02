---
title: "Release Apache APISIX 2.14.1"
authors:
  - name: "Zexuan Luo"
    title: "Author"
    url: "https://github.com/spacewander"
    image_url: "https://avatars.githubusercontent.com/u/4161644?v=4"
  - name: "Fei Han"
    title: "Technical Writer"
    url: "https://github.com/hf400159"
    image_url: "https://github.com/hf400159.png"
keywords: 
- Apache APISIX
- 2.14.1
- Release Notes
- API Gateway
- WebSocket
description: 2.14.1 is officially released! This release supports service discovery on CP and Web Socket-based pubsub proxy and non-HTTP Layer 7 protocols.
tags: [Community]
---

> Exploratory release - Apache APISIX 2.14.1 is officially released. This release supports not only service discovery on the control plane, but also Istio, a WebSocket-based pubsub proxy framework, and an xRPC-based framework for managing non-HTTP layer 7 protocols.

<!--truncate-->

It has been more than two months since the last APISIX v2.13 LTS version was released. In the past, each minor version release of APISIX will bring you new functions. However, the functions released in APISIX v2.14.1 will keep up with the forefront of technology, bringing you many exploratory new functions, and will explore the release of APISIX v3. Welcome to explore these new functions.

Next, let's take a look at what exploratory new features are supported by APISIX.

![Apache APISIX 2.14.0 Features Preview](https://static.apiseven.com/202108/1653985197318-dfabcc34-29c5-4f51-a471-c37af73a3f29.png)

## Pubsub proxy framework based on WebSocket

Before APISIX v2.14.1, whether it was proxying gRPC requests or ordinary HTTP requests, the upstream of APISIX was a docking application server, which could not meet the needs of diversified scenarios. For example, if users need to use other upstream types (such as Kafka), they can only achieve it through other means. However, in APISIX v2.14.1, APISIX has added a Websocket-based message subscription broker framework, which allows clients to subscribe to messages in a specified message queue (upstream) through APISIX. Now you can use APISIX to subscribe to Kafka messages.

Taking Kafka as an example, we need to configure the following:

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

The above example is to add a Kafka-type upstream to the route and include multiple Brokers.
You can subscribe to this upstream by referring to the following steps:

1. First, establish a connection via WebSocket.
2. Get the current offset of a Partition in Topic. The following example uses Protobuf to encode the associated request and response:

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

For example, the request to get the offset is:

```shell
message CmdKafkaListOffset {
    string topic = 1;
    int32 partition = 2;
    int64 timestamp = 3;
}
```

For the specific meaning of each field, please refer to [pubsub.proto](https://github.com/apache/apisix/blob/master/apisix/include/apisix/model/pubsub.proto).

3. Every subsequent subscription operation can obtain the latest message according to the current offset.
Note: After the message is successfully obtained, the current offset needs to be updated, and the updated offset is the previously returned offset + 1.

For specific operations, please refer to the source code and test cases:

- [kafka.t](https://github.com/apache/apisix/blob/master/t/pubsub/kafka.t)
- [pubsub.lua](https://github.com/apache/apisix/blob/master/t/lib/pubsub.lua)

Although the current Pubsub framework only provides the low-level interface, it already fulfills the two most basic requirements:

- Expose Kafka service capabilities through commonly used `80/443` ports, without requiring an additional layer of application server encapsulation.
- Allows adding authentication plug-ins to add security protection to Kafka services like using a general Websocket framework.

If you encounter problems during actual use, you can report to the Apache APISIX community by submitting an issue, and the community will continue to improve and enhance this function based on the feedback from users.

## Manage non-HTTP layer 7 protocols based on the xRPC framework

APISIX supports proxy TCP protocol in early versions, but in some scenarios, pure TCP protocol proxy cannot meet user requirements. Because some functions can only be implemented after encoding and decoding the application protocol, users need a proxy for a specific application protocol, such as Redis Proxy, Kafka Proxy, etc.

Beginning with APISIX v2.14.1, APISIX provides the xRPC framework, which allows developers to customize specific application protocols on the framework. Based on the xRPC framework, APISIX can provide proxy support for several major application protocols. At the same time, users can also support their own private TCP-based application protocols based on this framework, so that it has the precise granularity similar to HTTP protocol proxy and higher-level layer 7 control.

At present, APISIX has implemented the proxy function of Redis on the xRPC framework, which supports injecting delays and selectively recording log content according to commands. Although APISIX needs to encode and decode the Redis protocol, in a simple SET/GET performance test, using APISIX with dual worker processes as a proxy, its performance can reach 80% of the direct connection to Redis.

You can create a stream route that proxies the Redis protocol by referring to the following command:

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

When the command is GET or ping, there will be a 5 second delay. At the same time, after each command is executed, it will judge whether it takes more than 1 second. If so, it will trigger the corresponding `logger` object and send the `syslog` UDP log to `127.0.0.1:8125`.

## The Control Plane supports service discovery

Before v2.14.1, APISIX only supported service discovery on the data plane. In this case, each APISIX instance needs to obtain service discovery data, but users have reported the following problems in the actual application process:

1. Each APISIX instance needs to pull data from the service discovery system, which complicates the network topology.
2. Service discovery configuration needs to be configured on each APISIX instance. To change the password, you must modify the configuration file and publish it to each APISIX instance.
3. Currently, many service discovery systems do not provide Lua SDK. If you want to use these service discovery systems, you need to directly connect to the HTTP API provided by the server (if it exists).

Therefore, starting from v2.14.1, APISIX will support service discovery on the control plane. Service discovery will be implemented through the [APISIX-Seed](https://github.com/api7/apisix-seed/) project.

The principle of this function is to use `apisix-seed` to simultaneously monitor the Upstream-related resources in etcd and the corresponding upstream service resources in the service discovery component, and update the relevant Upstream information in etcd when the upstream service resources in the service discovery component change.

The specific implementation process is as follows:

![error/APISIX-Seed.png](https://static.apiseven.com/202108/1653983575757-97b39a39-8bd1-4e1e-b708-a7b43976c342.png)

At present, the solution of the control plane service discovery also has shortcomings, such as the greater pressure on etcd. Therefore, APISIX will keep both service discovery schemes at the same time, and prove which scheme is better through more practical applications.

## Initial support for Istio

In order to adapt to a wider range of application scenarios, starting from v2.14.1, APISIX will try to be compatible with Istio, and start to explore in the field of service mesh in the form of Istio as the control plane and APISIX as the Data Plane.

Since the configuration of Istio is issued through the xDS protocol, the [Amesh](https://github.com/api7/amesh) project was developed to convert the xDS issued by Istio into the configuration of APISIX. At present, APISIX has been able to run through the official Istio Simple Bookstore App demo. In subsequent releases, APISIX will continue to expand support for xDS, bringing the capabilities of Istio and APISIX closer together.

## More plugins and functions

In addition to the exploratory features mentioned above, this release also provides users with some more traditional features:

- Added `casdoor` plugin to improve the interaction experience with Casdoor.
- The `response-rewrite` plugin has added a replacement filter for Body.

For more details on feature updates and bug fixes, please refer to the official [Releases CHANGELOG](https://github.com/apache/apisix/blob/master/CHANGELOG.md).
