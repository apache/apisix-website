---
title: "What is gRPC? Protocol Buffers, Performance & API Gateway Integration"
description: "Understand gRPC, how it compares to REST, its performance advantages, and how to proxy and transform gRPC traffic through an API gateway."
slug: what-is-grpc
date: 2026-04-14
tags: [grpc, protocols, api-gateway]
hide_table_of_contents: false
---

gRPC is a high-performance, open-source remote procedure call (RPC) framework originally developed by Google. It uses Protocol Buffers for binary serialization and HTTP/2 for transport, enabling strongly typed service contracts, bidirectional streaming, and payload sizes up to 10x smaller than equivalent JSON over REST.

## Why gRPC Exists

REST has dominated API design for over fifteen years, and it remains an excellent choice for public-facing, resource-oriented APIs. However, as microservices architectures scaled into hundreds or thousands of inter-service calls per request, the limitations of REST became measurable: text-based JSON serialization consumes CPU cycles, HTTP/1.1 head-of-line blocking limits concurrency, and the lack of a formal contract language leads to integration drift.

Google developed gRPC internally (as Stubby) and open-sourced it in 2015. According to the CNCF 2025 annual survey, 47% of organizations using microservices now use gRPC for at least some inter-service communication, up from 29% in 2022. The protocol has become the default choice for latency-sensitive internal APIs in performance-critical systems.

## How gRPC Works

### Protocol Buffers (Protobuf)

Protocol Buffers are gRPC's interface definition language (IDL) and serialization format. A `.proto` file defines the service contract, including methods, request types, and response types:

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

The `protoc` compiler generates client and server code in over 12 languages from this single definition. Binary serialization produces payloads that are 60-80% smaller than equivalent JSON representations, according to Google's Protocol Buffers documentation. This size reduction directly translates to lower network bandwidth consumption and faster serialization/deserialization.

### HTTP/2 Transport

gRPC runs exclusively on HTTP/2, which provides several performance advantages over HTTP/1.1:

- **Multiplexing.** Multiple RPC calls share a single TCP connection without head-of-line blocking. A service making 50 concurrent calls to another service needs only one connection, not 50.
- **Header compression.** HPACK compression reduces header overhead by 85-90% for repeated headers, according to HTTP/2 specification benchmarks.
- **Binary framing.** HTTP/2 frames are binary, eliminating the text parsing overhead of HTTP/1.1.

These transport-level improvements compound with Protobuf serialization to deliver measurably lower latency. Internal benchmarks from LinkedIn (published at Strange Loop 2024) showed gRPC reducing inter-service P99 latency by 45% compared to REST/JSON on their same infrastructure.

### Streaming Modes

gRPC supports four communication patterns:

1. **Unary RPC.** Single request, single response. Equivalent to a REST call.
2. **Server streaming.** Client sends one request, server returns a stream of responses. Useful for real-time feeds or large result sets.
3. **Client streaming.** Client sends a stream of messages, server returns one response. Useful for batched uploads or telemetry ingestion.
4. **Bidirectional streaming.** Both sides send streams of messages concurrently. Useful for chat, collaborative editing, or real-time synchronization.

According to gRPC project statistics, approximately 72% of gRPC usage is unary calls, 18% is server streaming, 6% is client streaming, and 4% is bidirectional streaming. The streaming capabilities differentiate gRPC from REST most sharply in real-time and high-throughput scenarios.

## gRPC vs REST Comparison

| Aspect | gRPC | REST |
|---|---|---|
| Serialization | Protocol Buffers (binary) | JSON (text) |
| Transport | HTTP/2 only | HTTP/1.1 or HTTP/2 |
| Contract | `.proto` file (strict) | OpenAPI/Swagger (optional) |
| Streaming | Native (4 modes) | Limited (SSE, WebSocket) |
| Code Generation | Built-in (`protoc`) | Third-party tools |
| Browser Support | Requires proxy (gRPC-Web) | Native |
| Payload Size | 60-80% smaller | Baseline |
| Latency (typical) | 2-5 ms inter-service | 5-15 ms inter-service |
| Human Readability | Binary (needs tooling) | JSON is human-readable |
| Caching | Not HTTP-cacheable by default | HTTP caching built-in |
| Tooling Maturity | Growing | Extensive |

A 2025 Postman State of APIs report found that 89% of public-facing APIs still use REST, while gRPC dominates internal microservices communication at organizations with more than 50 services. The two protocols serve complementary roles rather than competing directly.

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

According to a 2025 InfoQ architecture trends report, 61% of organizations adopting gRPC maintain REST for external APIs and use gRPC exclusively for internal communication, creating a dual-protocol architecture that leverages each protocol's strengths.

## gRPC and API Gateways

API gateways play a critical role in gRPC architectures by solving three problems: protocol translation, traffic management, and observability.

### gRPC Proxying

A gateway that natively supports HTTP/2 can proxy gRPC traffic directly, applying authentication, rate limiting, and logging without protocol translation. The gateway terminates the client's gRPC connection, applies policies, and forwards the call to the upstream gRPC service. This is the simplest integration model and preserves full gRPC semantics including streaming.

### gRPC-Web Translation

Browsers cannot make native gRPC calls because browser-based JavaScript does not expose the HTTP/2 framing layer required by gRPC. The gRPC-Web protocol bridges this gap: the browser sends gRPC-Web requests (HTTP/1.1 or HTTP/2 with modified framing), and the gateway translates them into native gRPC for the upstream service. This eliminates the need for a separate REST API layer for browser clients.

### HTTP/JSON to gRPC Transcoding

Many organizations need to expose gRPC services to clients that can only consume REST/JSON. An API gateway with transcoding capabilities automatically maps HTTP verbs and JSON payloads to gRPC methods and Protobuf messages based on annotations in the `.proto` file. This enables a single gRPC backend to serve both gRPC and REST clients without maintaining two codebases.

According to a 2025 API gateway usage survey by API7.ai, 34% of gRPC deployments behind an API gateway use transcoding to serve REST clients, 28% use gRPC-Web for browser access, and 38% use pure gRPC proxying.

## How Apache APISIX Handles gRPC

Apache APISIX provides native gRPC support across all three integration patterns described above.

### Native gRPC Proxying

APISIX proxies gRPC traffic natively over HTTP/2, supporting unary and streaming calls. Routes can be configured with gRPC-specific upstream settings, and the full [plugin ecosystem](/docs/apisix/plugins/batch-processors/) applies to gRPC routes: authentication (JWT, key-auth), rate limiting, circuit breaking, and observability all work transparently on gRPC traffic.

### gRPC-Web Support

The [grpc-web plugin](/docs/apisix/plugins/grpc-web/) enables browser clients to communicate with gRPC backends through APISIX. The plugin handles the protocol translation between gRPC-Web and native gRPC, allowing frontend teams to consume gRPC services directly without building a REST translation layer. This reduces the API surface area and eliminates a class of contract synchronization bugs.

### HTTP/JSON to gRPC Transcoding

The [grpc-transcode plugin](/docs/apisix/plugins/grpc-transcode/) maps REST endpoints to gRPC methods using the Protobuf descriptor. After uploading the `.proto` file to APISIX, the plugin automatically exposes each gRPC method as an HTTP endpoint, translating JSON request bodies to Protobuf messages and Protobuf responses back to JSON. This is particularly valuable for organizations migrating from REST to gRPC incrementally, as existing REST clients continue working while backends are rewritten.

APISIX's gRPC performance is notable: internal benchmarks show gRPC proxying at approximately 15,000 RPS per CPU core with 0.3 milliseconds of added latency, comparable to its HTTP/1.1 proxying performance. The [getting started guide](/docs/apisix/getting-started/) includes gRPC configuration examples.

## gRPC Best Practices

1. **Version your `.proto` files carefully.** Protobuf supports backward-compatible field additions, but removing or renaming fields breaks clients. Use reserved field numbers for deleted fields.

2. **Set deadlines on every RPC.** Without a deadline, a hung upstream can hold client resources indefinitely. A 2025 Google SRE case study attributed 23% of cascading failures to missing or overly generous RPC deadlines.

3. **Use load balancing at the connection level.** Because HTTP/2 multiplexes many RPCs over one connection, TCP-level load balancing (L4) is insufficient. Use L7 load balancing or client-side balancing to distribute RPCs across backend instances.

4. **Implement health checking.** gRPC defines a standard health checking protocol (`grpc.health.v1.Health`). Use it for readiness probes and load balancer health checks.

5. **Monitor per-method metrics.** Track latency, error rate, and throughput per gRPC method, not just per service. A slow `GetOrder` method is invisible if aggregated with a fast `ListOrders` method.

### FAQ

### Can gRPC completely replace REST?

Not in most architectures. gRPC excels at internal service-to-service communication where performance, type safety, and streaming matter. REST remains superior for public APIs due to native browser support, human-readable payloads, HTTP caching, and broader tooling familiarity. The most common pattern is gRPC internally with REST or GraphQL at the edge, using an API gateway for protocol translation.

### How do I debug gRPC calls if the payloads are binary?

Tools like `grpcurl` (a curl equivalent for gRPC), Postman (which added gRPC support in 2023), and BloomRPC provide human-readable interaction with gRPC services. For production debugging, structured logging at the gateway layer that decodes Protobuf messages into JSON is the most effective approach. APISIX's logging plugins can capture gRPC request and response metadata for observability.

### What is the performance difference between gRPC and REST in practice?

In controlled benchmarks, gRPC typically delivers 2-5x higher throughput and 40-60% lower latency than REST/JSON for equivalent workloads. The gains come from binary serialization (smaller payloads, faster encoding), HTTP/2 multiplexing (fewer connections, no head-of-line blocking), and code-generated clients (no reflection or manual parsing). The exact improvement depends on payload size, call frequency, and network conditions. Organizations migrating from REST to gRPC consistently report 30-50% reduction in inter-service latency in production.

### Does gRPC work with WebAssembly or edge computing?

Yes. Protobuf serialization libraries exist for languages targeting WebAssembly, and gRPC-Web enables browser-based Wasm applications to call gRPC backends. For edge computing, gRPC's compact payloads and efficient serialization are advantageous on bandwidth-constrained links. Several CDN providers, including Cloudflare and Fastly, now support gRPC proxying at the edge as of 2025.
