---
title: "Integrate Apache APISIX with gRPC-Web"
authors:
  - name: "Jinchao Shuai"
    title: "Author"
    url: "https://github.com/shuaijinchao"
    image_url: "https://avatars.githubusercontent.com/u/8529452?v=4"
  - name: "Yilin Zeng"
    title: "Technical Writer"
    url: "https://github.com/yzeng25"
    image_url: "https://avatars.githubusercontent.com/u/36651058?v=4"
keywords: 
- Apache APISIX
- gRPC
- API Gateway
- Ecology
description: APISIX has broadened the scope of support for the gRPC ecosystem. This article will introduce details of using the gRPC web protocol request proxy.
tags: [Ecosystem,Plugins]
---

> Apache APISIX already supports gRPC protocol proxies, as well as HTTP(s) to gRPC Server proxies via the gRPC Transcode plugin. Through active community discussion and contributions, Apache APISIX has broadened the scope of support for the gRPC ecosystem: support for the gRPC Web Protocol Request Proxy.

<!--truncate-->

## gRPC Web Introduction

Originally developed by Google, gRPC is a high-performance remote procedure call framework implemented on HTTP/2. However, because browsers do not directly expose HTTP/2, Web applications cannot use gRPC directly. gRPC Web is a standardized protocol that solves this problem.

The first gRPC-web implementation was released in 2018 as a JavaScript library through which Web applications can communicate directly with the gRPC service. The principle is to create an end-to-end gRPC pipeline compatible with HTTP/1.1 and HTTP/2. The browser then sends a regular HTTP request, and a gRPC-Web proxy located between the browser and the server translates the request and response. Similar to gRPC, gRPC Web uses a predefined contract between the Web client and the back-end gRPC service. protocol Buffers are used to serialize and encode messages.

![how gRPC-web works](https://static.apiseven.com/202108/1643099754071-1f5c3c68-f2bc-4746-95f5-cc083ace554b.png)

With gRPC Web, users can call back-end gRPC applications directly using a browser or Node client. However, there are some limitations to using gRPC-Web on the browser side to call gRPC services.

- Client-side streaming and bi-directional streaming calls are not supported.
- Calling gRPC services across domains requires CORS to be configured on the server side.
- The gRPC server side must be configured to support gRPC-Web, or a third-party service agent must be available to translate the call between the browser and the server.

## Apache APISIX gRPC Web Proxy

Apache APISIX supports the proxy of gRPC Web protocol by means of a plug-in, which completes the protocol conversion and data codec work when gRPC Web communicates with gRPC Server in the `grpc-web` plug-in, and its communication process is as follows.

gRPC Web Client -> Apache APISIX (protocol conversion & data codec) -> gRPC server

The following is a complete example showing how to build a gRPC Web Client and proxy gRPC Web requests through Apache APISIX. In the following example, we will use Go as the gRPC Server server handler and Node as the gRPC Web client requestor.

## Configure Protocol Buffer

The first step is to install the Protocol Buffer compiler and related plug-ins.

1. Install `protoc` and `proto-grpc-*`.

   The Protocol Buffer compiler `protoc` and the `protoc-gen-go` and `protoc-gen-grpc-web` plugins for generating Go, JavaScript, and gRPC web interface code for `.proto` need to be installed on your system before writing client and server-side applications.

   Please run the following script to install the above components.

   ```bash
   #!/usr/bin/env bash

    set -ex

    PROTOBUF_VERSION="3.19.0"
    wget https://github.com/protocolbuffers/protobuf/releases/download/v${PROTOBUF_VERSION}/protoc-${PROTOBUF_VERSION}-linux-x86_64.zip
    unzip protoc-${PROTOBUF_VERSION}-linux-x86_64.zip
    mv bin/protoc /usr/local/bin/protoc
    mv include/google /usr/local/include/
    chmod +x /usr/local/bin/protoc

    PROTO_GO_PLUGIN_VER="1.2.0"
    wget https://github.com/grpc/grpc-go/releases/download/cmd/protoc-gen-go-grpc/v${PROTO_GO_PLUGIN_VER}/protoc-gen-go-grpc.v${PROTO_GO_PLUGIN_VER}.linux.amd64.tar.gz
    tar -zxvf protoc-gen-go-grpc.v${PROTO_GO_PLUGIN_VER}.linux.amd64.tar.gz
    mv protoc-gen-go-grpc /usr/local/bin/protoc-gen-go
    chmod +x /usr/local/bin/protoc-gen-go

    PROTO_JS_PLUGIN_VER="1.3.0"
    wget https://github.com/grpc/grpc-web/releases/download/${PROTO_JS_PLUGIN_VER}/protoc-gen-grpc-web-${PROTO_JS_PLUGIN_VER}-linux-x86_64
    mv protoc-gen-grpc-web-${PROTO_JS_PLUGIN_VER}-linux-x86_64 /usr/local/bin/protoc-gen-grpc-web
    chmod +x /usr/local/bin/protoc-gen-grpc-web
   ```

2. Create the `SayHello` example `proto` file.

   ```go
    // a6/echo.proto

    syntax = "proto3";

    package a6;

    option go_package = "./;a6";

    message EchoRequest {
    string message = 1;
    }

    message EchoResponse {
    string message = 1;
    }

    service EchoService {
    rpc Echo(EchoRequest) returns (EchoResponse);
    }
   ```

## Configure the server-side application

1. Generate server-side Go raw messages and service/client stubs.

   ```bash
   protoc -I./a6 echo.proto --go_out=plugins=grpc:./a6
   ```

2. Implement the server-side handler interface.

   ```go
   // a6/echo.impl.go

    package a6

    import (
    "errors"
    "golang.org/x/net/context"
    )

    type EchoServiceImpl struct {
    }

    func (esi *EchoServiceImpl) Echo(ctx context.Context, in *EchoRequest) (*EchoResponse, error) {
    if len(in.Message) <= 0 {
        return nil, errors.New("message invalid")
    }
    return &EchoResponse{Message: "response: " + in.Message}, nil
    }
   ```

3. The server-side application runtime entry file.

   ```go
   // server.go
    package main

    import (
    "fmt"
    "log"
    "net"

    "apisix.apache.org/example/a6"
    "google.golang.org/grpc"
    )

    func main() {
    lis, err := net.Listen("tcp", fmt.Sprintf(":%d", 50001))
    if err != nil {
        log.Fatalf("failed to listen: %v", err)
    }

    grpcServer := grpc.NewServer()
    a6.RegisterEchoServiceServer(grpcServer, &a6.EchoServiceImpl{})

    if err = grpcServer.Serve(lis); err != nil {
        log.Fatalf("failed to serve: %s", err)
    }
    }
   ```

4. Compile and start the server-side service.

   ```bash
   go build -o grpc-server server.go
   ./grpc-server
   ```

## Configure client programs

1. Generate client-side `proto` code.

   Generate client-side JavaScript raw messages, service/client stubs and interface code for gRPC Web's JavaScript.

   The `proto` plugin for gRPC Web provides two modes of code generation.

   1. mode=grpcwebtext: The default generated code sends the payload in grpc-web-text format.

   - Content-type: application/grpc-web-text
   - Payload uses base64 encoding
   - Supports monadic and server streaming calls

   1. mode=grpcweb: send payload in binary protobuf format.

   - Content-type: application/grpc-web+proto
   - Payload is in binary protobuf format
   - Currently only monadic calls are supported
  
  ```bash
  $ protoc -I=./a6 echo.proto --js_out=import_style=commonjs:./a6 --grpc-web_out=import_style=commonjs,mode=grpcweb:./a6
  ```

2. Installing client-side dependencies.

   ```shell
   $ npm i grpc-web
   $ npm i google-protobuf
   ```

3. Execute entry file on client-side.

   ```shell
   // client.js
   const {EchoRequest} = require('./a6/echo_pb');
   const {EchoServiceClient} = require('./a6/echo_grpc_web_pb');
   // connect to  the entrance of Apache APISIX
   let echoService = new EchoServiceClient('http://127.0.0.1:9080');

   let request = new EchoRequest();
   request.setMessage("hello")

   echoService.echo(request, {}, function (err, response) {
       if (err) {
            console.log(err.code);
            console.log(err.message);
        } else {
            console.log(response.getMessage());
        }
    });
   ```

4. Final project structure

   ```bash
   $ tree .
    ├── a6
    │   ├── echo.impl.go
    │   ├── echo.pb.go
    │   ├── echo.proto
    │   ├── echo_grpc_web_pb.js
    │   └── echo_pb.js
    ├── client.js
    ├── server.go
    ├── go.mod
    ├── go.sum
    ├── package.json
    └── package-lock.json
   ```

After completing the above steps, you have configured the gRPC Server server application and the gRPC Web client application, and started the server application, which will receive requests on port `50001`.

## Configure Apache APISIX

Next, simply enable the `grpc-web` plugin in the Apache APISIX routing plugin configuration to proxy gRPC web requests.

1. Enable the `grpc-web` proxy plugin.

   Routing must use **prefix matching** (e.g., `/* or /grpc/example/*`), because the gRPC web client passes the package name, service interface name, method name, etc. declared in `proto` in the URI (e.g., `/path/a6.EchoService/Echo`), **using absolute match will prevent the plugin from extracting `proto` information from the URI**.

   ```shell
   $ curl http://127.0.0.1:9080/apisix/admin/routes/1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
    {
        "uri":"/*", // prefix matching mode
        "plugins":{
            "grpc-web":{} // enable gRPC Web plugin
        },
        "upstream":{
            "scheme":"grpc",
            "type":"roundrobin",
            "nodes":{
                "127.0.0.1:50001":1 // gRPC Server Listen 地址和端口
            }
        }
    }'
   ```

2. Validate gRPC Web Proxy Requests.

   The gRPC Web protocol request can be sent to Apache APISIX by executing `client.js` from Node.

   The above client-side and server-side processing logic are respectively: the client sends a message to the server with the content `hello`, the server receives the message and responds with `response: hello`, and the execution result is as follows.

   ```shell
   $ node client.js
   response: hello
   ```

3. Disable the `grpc-web` proxy plugin.

   Simply remove the grpc-web attribute from the routing plugin configuration.

   ```shell
   $ curl http://127.0.0.1:9080/apisix/admin/routes/1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
    {
        "uri":"/*",
        "plugins":{
        },
        "upstream":{
            "scheme":"grpc",
            "type":"roundrobin",
            "nodes":{
                "127.0.0.1:50001":1
            }
        }
    }'
   ```

## Summary

This article brings you hands-on experience about using `grpc-web` in Apache APISIX.

Feel free to start a discussion in [GitHub Discussions](https://github.com/apache/apisix/discussions) or communicate via the [mailing list](https://apisix.apache.org/zh/docs/general/join).
