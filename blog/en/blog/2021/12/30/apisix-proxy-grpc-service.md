---
title: "Proxy HTTP Requests to gRPC with APISIX grpc-transcode"
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
  - grpc-transcode
  - API Gateway
  - Protocol Buffers
description: "Configure the APISIX grpc-transcode plugin to translate an HTTP request into a unary gRPC call using a registered Protocol Buffers definition."
tags: [Ecosystem]
---

Apache APISIX can proxy native gRPC traffic, translate gRPC-Web for browser clients, or transcode an HTTP request into a gRPC call. These are different use cases. This tutorial focuses on HTTP-to-gRPC transcoding with the `grpc-transcode` plugin.

<!--truncate-->

## Choose the Correct gRPC Mode

Before configuring a route, identify the client protocol:

- **Native gRPC proxying:** the client already speaks gRPC over HTTP/2. Configure a route and a `grpc` or `grpcs` upstream as documented for APISIX.
- **gRPC-Web:** a browser uses the gRPC-Web protocol. Use the `grpc-web` plugin with an appropriate gRPC upstream.
- **HTTP-to-gRPC transcoding:** an HTTP client sends a request that APISIX maps to a gRPC service and method. Use `grpc-transcode` and register the service's `.proto` definition.

The `grpc-transcode` plugin does not turn every arbitrary REST API into gRPC automatically. The configured input must map to the fields and method in the Protocol Buffers definition, and the current plugin documentation describes supported request and response behavior.

## How `grpc-transcode` Works

For a matching route, APISIX:

1. loads the Protocol Buffers definition referenced by `proto_id`;
2. maps the HTTP request data to the configured gRPC request message;
3. calls the configured `service` and `method` on an upstream whose scheme is `grpc` or `grpcs`;
4. translates the upstream response into the HTTP response format supported by the plugin.

This is useful for exposing a controlled HTTP interface to clients that cannot use native gRPC. It also creates a protocol boundary that must be documented and tested: HTTP status handling, gRPC status, field encoding, deadlines, and streaming capabilities are not interchangeable.

## Prerequisites

You need:

- a running APISIX instance and access to its Admin API;
- a reachable gRPC service;
- the exact `.proto` definition used by that service;
- a unary RPC supported by the plugin for this example.

The following snippets use a minimal `helloworld.Greeter/SayHello` service. Replace the addresses, credentials, and schema with your own values.

## Step 1: Register the Protocol Buffers Definition

Create a proto resource through the APISIX Admin API. The current resource path is `/apisix/admin/protos/{id}`.

```shell
curl "http://127.0.0.1:9180/apisix/admin/protos/1" \
  -X PUT \
  -H "X-API-KEY: $admin_key" \
  -d '
{
  "content": "syntax = \"proto3\";\npackage helloworld;\nservice Greeter {\n  rpc SayHello (HelloRequest) returns (HelloReply) {}\n}\nmessage HelloRequest {\n  string name = 1;\n}\nmessage HelloReply {\n  string message = 1;\n}"
}'
```

The registered definition must match the package, service, method, and message types implemented by the upstream. Treat proto changes as an API compatibility change and promote them through review and testing with the corresponding service version.

## Step 2: Create the Transcoding Route

Configure the plugin with the proto resource, fully qualified service name, and method. Set the upstream scheme to `grpc` for plaintext HTTP/2 inside a trusted network or `grpcs` when APISIX must use TLS to the upstream.

```shell
curl "http://127.0.0.1:9180/apisix/admin/routes/grpc-transcode-demo" \
  -X PUT \
  -H "X-API-KEY: $admin_key" \
  -d '
{
  "uri": "/hello",
  "methods": ["GET"],
  "plugins": {
    "grpc-transcode": {
      "proto_id": "1",
      "service": "helloworld.Greeter",
      "method": "SayHello"
    }
  },
  "upstream": {
    "type": "roundrobin",
    "scheme": "grpc",
    "nodes": {
      "127.0.0.1:50051": 1
    }
  }
}'
```

Restrict methods and request size to what the public API actually supports. The example embeds an upstream for clarity; production environments may reference a separately managed upstream object.

## Step 3: Call the HTTP Endpoint

For the schema above, an HTTP client can provide the `name` field as supported by the plugin:

```shell
curl "http://127.0.0.1:9080/hello?name=APISIX"
```

A successful response contains the translated `HelloReply`, for example:

```json
{
  "message": "Hello APISIX"
}
```

The exact encoding and error response depend on the plugin configuration and APISIX version. Test missing fields, invalid values, upstream timeouts, and every gRPC status your service can return. Do not infer HTTP semantics solely from a successful demonstration call.

## Production Considerations

### Schema compatibility

Keep the registered proto synchronized with the deployed gRPC service. Follow Protocol Buffers compatibility rules, avoid reusing field numbers, and test old clients during a staged rollout.

### Deadlines and retries

Set bounded timeouts based on the service's latency objective. Retries are safe only for operations that are idempotent under the application's semantics; automatically retrying a state-changing RPC can duplicate work.

### TLS and identity

Use `grpcs` when the network and threat model require upstream TLS, and configure certificate verification according to the current APISIX upstream TLS documentation. Client authentication at the HTTP route does not automatically provide service-to-service identity to the gRPC server.

### Error mapping

gRPC uses status codes and trailers, while HTTP clients expect HTTP status codes and bodies. Define which translated errors form part of the public API contract and verify them with integration tests. Preserve enough structured detail for clients without exposing internal stack traces.

### Streaming

Do not assume an HTTP transcoding route supports every client-, server-, or bidirectional-streaming pattern. Check the current plugin limitations. Native gRPC proxying may be the appropriate design when streaming is required.

### Observability

Capture route latency, upstream latency, gRPC status, HTTP status, and timeouts with bounded labels. Propagate trace context when supported, and redact credentials and sensitive request fields from logs.

## Frequently Asked Questions

### Is `grpc-transcode` required to proxy native gRPC?

No. It is for translating an HTTP request into a gRPC call. A client that already uses native gRPC can be proxied with an appropriate gRPC route and upstream without HTTP-to-gRPC transcoding.

### Is this the same as gRPC-Web?

No. gRPC-Web is a browser-oriented protocol handled by the `grpc-web` plugin. `grpc-transcode` exposes an HTTP-style interface mapped through a proto definition.

### Can APISIX infer the service and method from the proto?

The route explicitly configures `proto_id`, `service`, and `method`. This keeps the exposed HTTP route tied to a specific RPC rather than exposing every method in a schema by default.

### Where is the current field reference?

Use the official [`grpc-transcode` plugin documentation](https://apisix.apache.org/docs/apisix/plugins/grpc-transcode/) for the supported fields, request mappings, response options, and version-specific limitations.

## Conclusion

The APISIX `grpc-transcode` plugin is a protocol adapter for a defined HTTP-to-gRPC route. Register the exact proto, bind one service and method, configure a gRPC upstream, and test schema, deadline, error, and security behavior as part of the public API contract.

Use native gRPC proxying or gRPC-Web when those protocols match the client instead of adding an unnecessary transcoding layer.
