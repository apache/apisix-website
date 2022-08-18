---
title: "使用 Apache APISIX 代理 gRPC 服务"
authors:
  - name: "喻柏仲"
    title: "Author"
    url: "https://github.com/zaunist"
    image_url: "https://avatars.githubusercontent.com/u/38528079?v=4"
  - name: "苏钰"
    title: "Technical Writer"
    url: "https://github.com/SylviaBABY"
    image_url: "https://avatars.githubusercontent.com/u/39793568?v=4"
keywords: 
- Apache APISIX
- gRPC
- Google
- proto
- 插件
description: 本文为大家介绍如何在 Apache APISIX 中通过 `grpc-transcode`插件来将客户端的 HTTP 流量代理到后端 gRPC 服务上。
tags: [Ecosystem]
---

> 本文为大家介绍如何在 Apache APISIX 中通过 `grpc-transcode`插件来将客户端的 HTTP 流量代理到后端 gRPC 服务上。

<!--truncate-->

## 项目介绍

### Apache APISIX

[Apache APISIX](https://apisix.apache.org/) 是一个动态、实时、高性能的 API 网关，提供负载均衡、动态上游、灰度发布、服务熔断、身份认证、可观测性等丰富的流量管理功能。Apache APISIX 不仅支持插件动态变更和热插拔，而且拥有众多丰富的插件资源库。

### gRPC

[gRPC](https://grpc.io/) 是 Google 发起的一个开源远程过程调用（Remote procedure call）系统。该系统基于 HTTP/2 协议传输，使用 Protocol Buffers 作为接口描述语言，可以在任何环境中运行。通过 gRPC 服务可对负载均衡、链路追踪、健康检查和身份认证等功能进行可插拔模式支持，有效地连接数据中心之间的多项服务。

## 插件介绍

为了增加对 gRPC 服务代理的支持，Apache APISIX 发布了基于 gRPC 的插件 `grpc-transcode`，通过 RESTful 方式调用 gRPC 服务。

该插件支持在 Apache APISIX 中指定 `.proto` 文件的内容，并通过用户自定义 gRPC 服务来实现不同 gRPC 服务的代理。

### 集成原理

用户在 Apache APISIX 中指定 `.proto` 内容，通过在 `grpc-transcode` 插件中的 `proto_id` 绑定相应的 proto，并配置 `.proto` 中定义的 Service 和 Method，即可实现 gRPC 服务的代理。

基本原理如下：用户可以在路由中配置一个 `grpc-transcode` 插件，当路由匹配到请求时，会转发 gRPC 请求到上游的服务中。

:::note
`grpc-transcode` 插件支持对 `proto_id`、`grpc service name`、`grpc service method`、`grpc deadline` 以及 `pb_option` 进行配置。基于配置调用上游的 gRPC 服务，并将从上游 gRPC 服务中获取到的响应内容返回至客户端。
:::

## 如何使用

### 环境准备

在配置 Apache APISIX 之前，需要先启动 gRPC 服务。

#### 步骤一：配置 grpc-server-example 服务

1. 克隆 `grpc-server-example` 仓库。

```shell
git clone https://github.com/api7/grpc_server_example
```

2. 启动 grpc-server。

```shell
cd grpc_server_example
go run main.go
```

3. 验证 gRPC 服务，推荐使用 `grpcurl` 来验证服务的可用性。

```shell
grpcurl -d '{"name": "zhangsan"}' -plaintext 127.0.0.1:50051 helloworld.Greeter.SayHello
```

正确启动 gRPC 服务后，执行上述命令将会输出以下内容。

```json
{
 "message": "Hello zhangsan"
}
```

#### 步骤二：配置 Apache APISIX

1. 添加 proto

```shell
curl http://127.0.0.1:9080/apisix/admin/proto/1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "content" : "syntax = \"proto3\";
    package helloworld;
    service Greeter {
        rpc SayHello (HelloRequest) returns (HelloReply) {}
    }
    message HelloRequest {
        string name = 1;
    }
    message HelloReply {
        string message = 1;
    }"
}'
```

2. 在指定 Route 中，代理 gRPC 服务接口。

```shell
curl http://127.0.0.1:9080/apisix/admin/routes/1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "methods": ["GET"],
    "uri": "/grpctest",
    "plugins": {
        "grpc-transcode": {
         "proto_id": "1",
         "service": "helloworld.Greeter",
         "method": "SayHello"
        }
    },
    "upstream": {
        "scheme": "grpc",
        "type": "roundrobin",
        "nodes": {
            "127.0.0.1:50051": 1
        }
    }
}'
```

具体代码释义与支持的参数详情可参考下方：

| 名称      | 类型                         | 存在 | 默认值 | 描述                       |
|:-----------|:------------------------------|:------|:-------|:---------------------------|
| proto_id  | string/integer               | 必须 | N/A   | `.proto` 内容的 id         |
| service   | string                       | 必须 | N/A   | gRPC 服务名                |
| method    | string                       | 必须 | N/A   | gRPC 服务中要调用的方法名  |
| deadline  | number                       | 可选 | 0     | gRPC 服务截止时间        |
| pb_option | array[string(pb_option_def)] | 可选 | N/A   | proto 编码过程中的转换选项 |

### 测试请求

下面我们将使用 cURL 进行测试。

```shell
curl -i http://127.0.0.1:9080/grpctest\?name=world
HTTP/1.1 200 OK
Date: Mon, 27 Dec 2021 06:24:47 GMT
Content-Type: application/json
Transfer-Encoding: chunked
Connection: keep-alive
Server: APISIX/2.11.0
Trailer: grpc-status
Trailer: grpc-message

{"message":"Hello world"}
grpc-status: 0
grpc-message:
```

通过代码反馈可知，已成功将请求代理到后端 gRPC 服务上。

### 关闭插件

如使用完毕，只需要移除路由配置里 `plugin` 相关的配置，即可关闭路由上的 `grpc-transcode` 插件。得益于 Apache APISIX 插件热加载模式，开启和关闭都无需重启 Apache APISIX。

```shell
# 关闭插件
curl http://127.0.0.1:9080/apisix/admin/routes/111 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "methods": ["GET"],
    "uri": "/grpctest",
    "plugins": {},
    "upstream": {
        "scheme": "grpc",
        "type": "roundrobin",
        "nodes": {
            "127.0.0.1:50051": 1
        }
    }
}'
```

## 总结

本文为大家介绍了关于 `grpc-transcode` 插件的使用步骤，通过 RESTful 将请求代理到后端 gRPC 服务上。通过使用该插件，Apache APISIX 仅需通过配置即可实现对 gRPC 服务的代理。

更多关于 `grpc-transcode` 插件的说明和完整配置列表，请参考[官方文档](https://apisix.apache.org/docs/apisix/next/plugins/grpc-transcode/)。
