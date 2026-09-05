# What is gRPC? Protocol Buffers, Performance & API Gateway Integration

> Learn what the gRPC protocol is, how gRPC APIs use Protocol Buffers, streaming, and HTTP/2, and how Apache APISIX proxies and transforms gRPC traffic.

Source: https://apisix.apache.org/learning-center/what-is-grpc/

gRPC is a high-performance, open-source remote procedure call (RPC) framework originally developed by Google. The gRPC protocol uses Protocol Buffers for binary serialization and HTTP/2 for transport, enabling strongly typed gRPC APIs, bidirectional streaming, and smaller payloads than equivalent JSON over REST.

## Why gRPC Exists

REST remains a strong choice for public-facing, resource-oriented APIs. For high-frequency service-to-service communication, however, JSON encoding, repeated request-response exchanges, and separately maintained client models can add overhead or allow contracts to drift. gRPC addresses these concerns with generated interfaces, binary messages, multiplexed transport, and built-in streaming.

Google developed gRPC internally (as Stubby) and open-sourced it in 2015. Adoption has grown steadily, and gRPC has become a common choice for latency-sensitive internal APIs in performance-critical systems.

## How gRPC Works

### Protocol Buffers (Protobuf)

Protocol Buffers are gRPC's default interface definition language (IDL) and message format. A `.proto` file defines the service contract, including methods, request types, and response types:

```protobuf
syntax = "proto3";

service OrderService {
  rpc GetOrder (OrderRequest) returns (OrderResponse);
  rpc StreamOrders (OrderFilter) returns (stream OrderResponse);
}

message OrderRequest {
  string order_id = 1;
}

message OrderResponse {
  string order_id = 1;
  string status = 2;
  double total = 3;
}
```

The `protoc` compiler generates client and server code in many languages from this definition. For many schemas, binary serialization produces more compact payloads than an equivalent JSON representation, but the exact size and processing cost depend on the data model and implementation.

### HTTP/2 Transport

gRPC runs exclusively on HTTP/2, which provides several performance advantages over HTTP/1.1:

- **Multiplexing.** Multiple RPC streams can share one TCP connection without the request-level blocking behavior of HTTP/1.1. Packet loss can still affect streams sharing the same TCP connection.
- **Header compression.** HPACK compression significantly reduces header overhead for repeated headers.
- **Binary framing.** HTTP/2 frames are binary, eliminating the text parsing overhead of HTTP/1.1.

Together with Protocol Buffers, these transport features can reduce connection and serialization overhead for service-to-service communication. The benefit depends on payload size, concurrency, network conditions, and implementation details.

### Streaming Modes

gRPC supports four communication patterns:

1. **Unary RPC.** Single request, single response. Equivalent to a REST call.
2. **Server streaming.** Client sends one request, server returns a stream of responses. Useful for real-time feeds or large result sets.
3. **Client streaming.** Client sends a stream of messages, server returns one response. Useful for batched uploads or telemetry ingestion.
4. **Bidirectional streaming.** Both sides send streams of messages concurrently. Useful for chat, collaborative editing, or real-time synchronization.

In practice, unary calls represent the majority of gRPC usage, with server streaming being the next most common pattern. The streaming capabilities differentiate gRPC from REST most sharply in real-time and high-throughput scenarios.

## gRPC vs REST Comparison

| Aspect | gRPC | REST |
|---|---|---|
| Serialization | Protocol Buffers (binary) | JSON (text) |
| Transport | HTTP/2 only | HTTP/1.1 or HTTP/2 |
| Contract | `.proto` file (strict) | OpenAPI/Swagger (optional) |
| Streaming | Native (4 modes) | Limited (SSE, WebSocket) |
| Code Generation | Built-in (`protoc`) | Third-party tools |
| Browser Support | Requires proxy (gRPC-Web) | Native |
| Payload Size | Compact binary encoding; schema-dependent | Text encoding; schema-dependent |
| Latency | Optimized for RPC and streaming; workload-dependent | Workload- and endpoint-dependent |
| Human Readability | Binary (needs tooling) | JSON is human-readable |
| Caching | Not HTTP-cacheable by default | HTTP caching built-in |
| Tooling Maturity | Growing | Extensive |

REST is often easier to expose as a public API, while gRPC is often selected for typed, internal service communication and streaming. The two protocols can serve complementary roles in the same architecture.

## When to Use gRPC

**Use gRPC when:**

- Services communicate with high frequency and low latency requirements (trading systems, real-time analytics, game backends).
- Payload efficiency matters because of bandwidth constraints or high message volumes.
- Strong typing and contract-first development are priorities. The `.proto` file becomes the single source of truth.
- Streaming is a core requirement (live data feeds, event-driven architectures, IoT telemetry).
- Polyglot environments need consistent client/server code generation across multiple languages.

**Stick with REST when:**

- The API is public-facing and must be browser-accessible without additional proxying.
- Human readability and debuggability with standard HTTP tools (curl, Postman) are important for developer experience.
- HTTP caching semantics are essential for performance.
- The team's existing tooling and expertise are REST-centric, and migration cost outweighs the performance gain.

A system can expose REST at its public edge and use gRPC internally, allowing each interface to use the protocol that best fits its clients and operational requirements.

## gRPC and API Gateways

API gateways play a critical role in gRPC architectures by solving three problems: protocol translation, traffic management, and observability.

### gRPC Proxying

A gateway that natively supports HTTP/2 can proxy gRPC traffic directly, applying authentication, rate limiting, and logging without protocol translation. The gateway terminates the client's gRPC connection, applies policies, and forwards the call to the upstream gRPC service. This is the simplest integration model and preserves full gRPC semantics including streaming.

### gRPC-Web Translation

Browsers cannot make native gRPC calls because browser-based JavaScript does not expose the HTTP/2 framing layer required by gRPC. The gRPC-Web protocol bridges this gap: the browser sends gRPC-Web requests (HTTP/1.1 or HTTP/2 with modified framing), and the gateway translates them into native gRPC for the upstream service. This eliminates the need for a separate REST API layer for browser clients.

### HTTP/JSON to gRPC Transcoding

Many organizations need to expose gRPC services to clients that can only consume REST/JSON. An API gateway with transcoding capabilities can map HTTP endpoints and JSON payloads to selected gRPC methods and Protobuf messages. The exact mapping mechanism is gateway-specific: some implementations derive mappings from `.proto` annotations, while APISIX uses a Proto resource and an explicit service and method mapping. This enables a single gRPC backend to serve both gRPC and REST clients without maintaining two codebases.

In practice, gRPC deployments behind an API gateway typically use a mix of pure gRPC proxying, gRPC-Web for browser access, and transcoding to serve REST clients.

## How Apache APISIX Handles gRPC

Apache APISIX provides native gRPC support across all three integration patterns described above.

### Native gRPC Proxying

APISIX proxies gRPC traffic over HTTP/2, including unary and streaming calls. Routes use a `grpc` or `grpcs` upstream scheme. Route-level policies that operate on supported request metadata can then be applied, but plugin compatibility should be verified for the specific gRPC traffic and payload behavior.

### gRPC-Web Support

The [grpc-web plugin](/docs/apisix/plugins/grpc-web/) enables browser clients to communicate with gRPC backends through APISIX. The plugin handles the protocol translation between gRPC-Web and native gRPC, allowing frontend teams to consume gRPC services directly without building a REST translation layer. The [APISIX gRPC-Web integration guide](/blog/2022/01/25/apisix-grpc-web-integration/) provides an end-to-end configuration example.

### HTTP/JSON to gRPC Transcoding

The [grpc-transcode plugin](/docs/apisix/plugins/grpc-transcode/) maps an HTTP endpoint to a gRPC method using a Protobuf descriptor stored in an APISIX Proto resource. A Route enables the plugin with the Proto resource ID, service name, and method name. APISIX then translates JSON requests to Protobuf messages and Protobuf responses back to JSON for that mapping.

This allows teams to provide an HTTP/JSON interface for selected gRPC methods without maintaining a separate translation service. The plugin documentation includes the required Proto resource and Route configuration.

## gRPC Best Practices

1. **Version your `.proto` files carefully.** Protobuf supports backward-compatible field additions, but removing or renaming fields breaks clients. Use reserved field numbers for deleted fields.

2. **Set deadlines on every RPC.** Without a deadline, a hung upstream can hold client resources indefinitely. Missing or overly generous RPC deadlines are a common cause of cascading failures in distributed systems.

3. **Use load balancing at the connection level.** Because HTTP/2 multiplexes many RPCs over one connection, TCP-level load balancing (L4) is insufficient. Use L7 load balancing or client-side balancing to distribute RPCs across backend instances.

4. **Implement health checking.** gRPC defines a standard health checking protocol (`grpc.health.v1.Health`). Use it for readiness probes and load balancer health checks.

5. **Monitor per-method metrics.** Track latency, error rate, and throughput per gRPC method, not just per service. A slow `GetOrder` method is invisible if aggregated with a fast `ListOrders` method.

## FAQ

### Can gRPC completely replace REST?

Not in most architectures. gRPC is a strong fit for internal service-to-service communication where type safety and streaming matter. REST is often easier for public APIs because browsers and general HTTP tooling can use it directly, and HTTP caching semantics are familiar. A system can use gRPC internally and expose REST or GraphQL at the edge when clients require it.

### How do I debug gRPC calls if the payloads are binary?

Tools such as `grpcurl` and clients that support gRPC reflection can inspect services and make test calls. In production, capture transport status, method names, latency, and trace context at the gateway and service layers. Inspecting message bodies requires schema-aware tooling and an explicit decision about sensitive-data logging.

### What is the performance difference between gRPC and REST in practice?

gRPC can reduce serialization and connection overhead through binary messages, generated clients, HTTP/2 multiplexing, and streaming. It is not inherently faster for every workload. Measure representative payloads, concurrency, network conditions, server implementations, and gateway policies before choosing a protocol for performance reasons.

### Does gRPC work with WebAssembly or edge computing?

Yes. Protocol Buffer libraries are available for WebAssembly targets, and gRPC-Web lets browser-based applications communicate with gRPC services through a compatible proxy. At edge locations, support must be verified across the client, proxy, and upstream because native gRPC and gRPC-Web have different transport requirements.
