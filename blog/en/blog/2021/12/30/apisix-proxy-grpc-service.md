---
title: "Use API gateway to proxy gRPC service"
authors:
  - name: "Bozhong Yu"
    title: "Author"
    url: "https://github.com/zaunist"
    image_url: "https://avatars.githubusercontent.com/u/38528079?v=4"
  - name: "Sylvia"
    title: "Technical Writer"
    url: "https://github.com/SylviaBABY"
    image_url: "https://avatars.githubusercontent.com/u/39793568?v=4"
keywords: 
- Apache APISIX
- gRPC
- Google
- proto
- plugin
description: This article shows you how to proxy client HTTP traffic to the back-end gRPC service via the `grpc-transcode` plugin in API Gateway Apache APISIX.
tags: [Ecosystem]
---

> This article shows you how to proxy client HTTP traffic to the back-end gRPC service via the `grpc-transcode` plugin in Apache APISIX.

<!--truncate-->

## Introduction

### Apache APISIX

[Apache APISIX](https://apisix.apache.org/) is a dynamic, real-time, high-performance API gateway that provides load balancing, dynamic upstream, canary release, service fusion, authentication, observability, and other rich traffic management features. Apache APISIX not only supports dynamic change and hot-plugging of plug-ins, but also has a rich library of plug-in resources.

### gRPC

[gRPC](https://grpc.io/) is an open source remote procedure call system initiated by Google. The system is based on HTTP/2 protocol transport, using Protocol Buffers as the interface description language, and can be run in any environment. The gRPC service provides pluggable mode support for load balancing, link tracing, health checking, and authentication, effectively connecting multiple services between data centers.

## Plugin Introduction

In order to add support for gRPC service proxies, Apache APISIX has released `grpc-transcode`, a gRPC-based plugin that invokes gRPC services in a RESTful way.

The plugin supports specifying the contents of `.proto` files in Apache APISIX and implementing proxies for different gRPC services through user-defined gRPC services.

### Integration Principle

The user specifies the `.proto` content in Apache APISIX, binds the corresponding proto by the `proto_id` in the `grpc-transcode` plugin, and configures the Service and Method defined in the `.proto` to implement a proxy for the gRPC service.

The basic principle is as follows: the user can configure a `grpc-transcode` plugin in the route, and when the route matches the request, it will forward the gRPC request to the upstream service.

:::note
The `grpc-transcode` plugin supports configuration of `proto_id`, `grpc service name`, `grpc service method`, `grpc deadline`, and `pb_option`. Based on the configuration, the upstream gRPC service is invoked and the response obtained from the upstream gRPC service is returned to the client.
:::

## How to use

### Environment Preparation

Before configuring Apache APISIX, you need to start the gRPC service.

#### Step 1: Configure the grpc-server-example service

1. Clone the `grpc-server-example` repository.

```shell
git clone https://github.com/api7/grpc_server_example
```

2. Start grpc-server.

```shell
cd grpc_server_example
go run main.go
```

3. Verify the gRPC service, it is recommended to use `grpcurl` to verify the availability of the service.

```shell
grpcurl -d '{"name": "zhangsan"}' -plaintext 127.0.0.1:50051 helloworld.Greeter.SayHello
```

After correctly starting the gRPC service, executing the above command will output the following.

```json
{
 "message": "Hello zhangsan"
}
```

#### Step 2: Configure Apache APISIX

1. Add proto

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

2. In the specified Route, proxy the gRPC service interface.

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

Details of the specific code interpretation and supported parameters can be found below.

| Name      | Type                        | Requirement | Default | Description                       |
|:----------|:-----------------------------|:------|:-------|:---------------------------|
| proto_id  | string/integer               | required | N/A  | `.proto` content id        |
| service   | string                       | required | N/A  | the grpc service name                |
| method    | string                       | required | N/A  | the method name of grpc service  |
| deadline  | number                       | optional | 0    | deadline for grpc in milliseconds          |
| pb_option | array[string(pb_option_def)] | optional | N/A  | protobuf options |

### Testing Requests

Here we will use cURL for testing.

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

The feedback from the code shows that the request was successfully proxied to the back-end gRPC service.

### Disabling the plugin

If you are done using the `grpc-transcode` plugin on the route, simply remove the plugin-related configuration from the route configuration to turn off the `grpc-transcode` plugin on the route.

Thanks to the Apache APISIX plugin hot-loading mode, there is no need to restart Apache APISIX to turn it on and off.

```shell
# Disable the plugin
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

## Summary

This article provides a step-by-step guide to using the `grpc-transcode` plugin to proxy requests to a back-end gRPC service via RESTful. By using this plugin, Apache APISIX can be configured to proxy to the gRPC service only.

For more descriptions and a complete configuration list of the grpc-transcode plugin, please refer to the [official documentation](https://apisix.apache.org/docs/apisix/next/plugins/grpc-transcode/).
