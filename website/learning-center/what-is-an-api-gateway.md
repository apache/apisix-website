---
title: "What is an API Gateway? Definition, Benefits & Use Cases"
description: "Learn what an API Gateway is, how it handles routing, authentication, rate limiting, observability, and where Apache APISIX fits."
slug: what-is-an-api-gateway
date: 2026-04-14
tags: [api-gateway, concepts]
hide_table_of_contents: false
faq:
  - q: "What is the difference between an API gateway and a load balancer?"
    a: >-
      A load balancer's primary role is distributing traffic across healthy server instances. Some Layer 7 load balancers also provide authentication, rate limiting, or header-based routing, so the feature sets can overlap. An API gateway is designed around API-level policies for routes and consumers, such as authentication, quotas, transformation, and API observability. Choose based on the policy model you need, not on a strict feature checklist.
  - q: "Do I need an API gateway for a monolithic application?"
    a: >-
      An API gateway is not strictly required for a monolith, but it can still add value. If your monolith exposes APIs consumed by external clients, mobile apps, or third-party integrators, a gateway provides centralized authentication, rate limiting, and monitoring without modifying the application. It also positions your architecture for incremental migration to microservices using the strangler fig pattern.
  - q: "How does an API gateway affect latency?"
    a: >-
      An API gateway adds another network hop and executes policies before forwarding a request, so it always adds some latency. The actual overhead depends on deployment topology, TLS settings, enabled plugins, request and response transformations, and logging. Benchmark the gateway with the same policy chain and traffic profile you expect in production rather than relying on a universal latency figure.
  - q: "Can an API gateway replace a service mesh?"
    a: >-
      An API gateway and a service mesh usually serve different traffic boundaries. The gateway handles north-south traffic from API clients to services, while a service mesh focuses on east-west service-to-service communication. Apache APISIX can expose and control APIs at a cluster edge, but that does not replace mesh capabilities such as workload identity and service-to-service mTLS.
  - q: "Is an API gateway the same as an API management platform?"
    a: >-
      No. An API gateway is the runtime component that processes API traffic. API management is a broader category that can include a gateway, developer onboarding, API documentation, lifecycle governance, and analytics. Apache APISIX provides the open-source gateway layer; teams can integrate it with the other tools required for their API lifecycle.
---

An API gateway is a server that sits between clients and backend services, acting as an entry point for the APIs placed behind it. It accepts incoming requests, applies policies such as authentication, rate limiting, and transformation, then routes each request to the appropriate upstream service and returns the response to the caller.

The main benefits of an API gateway are consistent edge policy enforcement, less duplicated infrastructure logic, and a stable entry point as backend services change. Teams can centralize access control, traffic shaping, and gateway-level observability while leaving business authorization and service-specific behavior in the applications that own them.

## How Does an API Gateway Work?

The request lifecycle through an API gateway follows a well-defined pipeline:

1. **Client sends a request.** A mobile app, browser, or upstream service issues an HTTP/HTTPS request to the gateway endpoint. For APIs exposed through the gateway, the client does not need to know the location of individual backend services.

2. **Gateway evaluates policies.** The gateway inspects the incoming request and runs it through a chain of plugins or middleware. This typically includes validating authentication tokens (JWT, OAuth 2.0, API keys), enforcing rate limits, checking IP allowlists, and applying request transformations such as header injection or body rewriting.

3. **Gateway routes to the upstream.** Based on the request path, host header, or other matching criteria, the gateway selects a target upstream service. If multiple instances are registered, the gateway applies a load-balancing algorithm (round-robin, least connections, consistent hashing) to pick a specific node.

4. **Backend processes the request.** The upstream service handles the business logic and returns a response to the gateway.

5. **Gateway processes the response.** Before forwarding the response to the client, the gateway can apply response transformations, inject CORS headers, compress the payload, or cache the result for subsequent identical requests.

6. **Gateway returns the response.** The final response reaches the client with appropriate status codes, headers, and payload. When the corresponding observability features are enabled, the gateway can emit metrics, access logs, and trace data for the traffic it processes.

Each policy and network hop adds some processing time. Measure gateway latency with the same TLS settings, plugins, logging, payloads, and traffic profile you plan to run in production.

## Key Features of an API Gateway

A production-grade API gateway provides a broad surface of capabilities. The following features represent the core functionality that distinguishes a gateway from a simple reverse proxy.

### Request Routing

The gateway matches incoming requests to upstream services based on URI paths, HTTP methods, headers, query parameters, or custom expressions. Advanced gateways support regex-based matching, wildcard routes, and priority-weighted rules. Apache APISIX supports [radixtree-based routing](/docs/apisix/terminology/route/) that scales efficiently even with thousands of route entries.

### Load Balancing

Distributing traffic across service instances prevents hotspots and improves availability. Gateways typically support round-robin, weighted round-robin, least connections, consistent hashing, and EWMA (exponentially weighted moving average) algorithms. Health checks --- both active probes and passive failure detection --- automatically remove unhealthy nodes from the upstream pool.

### Authentication and Authorization

Centralizing [API gateway authentication](/learning-center/api-gateway-authentication/) and common access policies reduces duplicated security logic across services. Common mechanisms include JWT validation, OAuth 2.0 token introspection, HMAC signatures, LDAP, and [API key authentication](/docs/apisix/plugins/key-auth/). Some gateways also integrate with external identity providers through OpenID Connect. Backend services still need to enforce business authorization, resource ownership, and other application-specific rules.

### Rate Limiting

Rate limiting protects backend services from traffic spikes, abusive clients, and cascading failures. Gateways enforce limits at multiple granularities: per consumer, per route, per IP, or globally. In Apache APISIX, [`limit-req`](/docs/apisix/plugins/limit-req/) uses a leaky-bucket algorithm for request-rate control, while [`limit-count`](/docs/apisix/plugins/limit-count/) applies quotas within fixed time windows. Redis-backed policies can share counters across gateway nodes when a deployment requires a cluster-wide limit.

### Caching

Response caching at the gateway layer can reduce backend load and improve latency for read-heavy endpoints. Gateways cache responses based on configurable TTLs, cache keys (URI, headers, query strings), and bypass rules. The benefit depends on response cacheability, request distribution, cache sizing, and invalidation requirements, so teams should measure hit rate and upstream load for their own traffic.

### Request and Response Transformation

Gateways can rewrite requests before they reach the backend and transform responses before they reach the client. Depending on the product and configuration, this can include header manipulation, body rewriting, HTTP-to-gRPC transcoding, GraphQL-to-REST mapping, and payload format conversion. Explicit mappings are required, and more complex translations may still need a dedicated adapter service.

### Monitoring and Observability

A gateway sees the requests that pass through it, making it a useful instrumentation point for API metrics. Production gateways can export access logs, request and response latencies, error rates, and throughput to systems such as Prometheus, Datadog, and OpenTelemetry collectors. Apache APISIX can expose [Prometheus metrics](/docs/apisix/plugins/prometheus/) that teams may visualize in Grafana, and it provides plugins for tracing systems such as SkyWalking and Zipkin.

### SSL/TLS Termination

The gateway can terminate client-facing TLS and centralize certificate selection and policy enforcement. Communication from the gateway to upstream services is configured separately and can use TLS or [mutual TLS](/learning-center/what-is-mutual-tls/) when the network and identity model require it. This separation lets teams manage encryption and certificate rotation at both trust boundaries instead of assuming internal traffic is safe by default.

### Circuit Breaking

When a backend service becomes degraded or unresponsive, a circuit breaker at the gateway stops forwarding requests to it, preventing cascading failures across the system. After a configurable cooldown, the gateway sends probe requests to test recovery. This pattern is critical in microservices architectures where a single failing service can take down an entire request chain.

### API Versioning and Canary Releases

Gateways can route a percentage of traffic to new service versions, enabling canary deployments and blue-green releases without changing client integrations. Traffic-splitting rules let teams gradually shift load from v1 to v2, monitor error rates, and adjust or revert the routing rules if metrics degrade.

## API Gateway vs Load Balancer vs Reverse Proxy

These three components overlap in functionality but serve different primary purposes:

| Capability | Reverse Proxy | Load Balancer | API Gateway |
|---|---|---|---|
| Request forwarding | Core function | Core function | Core function |
| TLS termination | Common | Common | Common |
| Load balancing | Product-dependent | Core function | Common |
| Health checks | Product-dependent | Core function | Common |
| Authentication | Extension or product-dependent | Product-dependent at L7 | API policy |
| Rate limiting | Extension or product-dependent | Product-dependent at L7 | API policy |
| Request transformation | Product-dependent | Limited or product-dependent | API policy |
| API-aware routing | Basic HTTP routing | L7 routing | Route and consumer policies |
| Response caching | Product-dependent | Product-dependent | Product-dependent |
| Observability/metrics | Proxy metrics | Infrastructure metrics | API and consumer metrics |
| Protocol translation | Limited | Limited | Product-dependent |
| Plugin/middleware ecosystem | Product-dependent | Product-dependent | Core extensibility model |

Capabilities vary by product and configuration. The table describes each component's primary operating model rather than guaranteeing that a feature is present or absent.

**A reverse proxy** (e.g., NGINX or HAProxy in proxy mode) forwards client requests to backend servers and may provide TLS termination, caching, routing, and other configurable features. Its use as a reverse proxy does not by itself provide a consistent policy model for APIs and consumers.

**A load balancer** (e.g., AWS ALB, HAProxy, or Envoy in load-balancing deployments) distributes traffic across server instances using health checks and balancing algorithms. Layer 4 load balancers work at the transport layer. Layer 7 products can inspect HTTP requests and may offer selected authentication, rate limiting, routing, or transformation features, but their scope varies by product.

**An API gateway** builds on reverse proxy and load balancing capabilities but adds an API-aware runtime policy layer: authentication, rate limiting, request and response transformation, and observability. It is purpose-built for controlling API traffic.

In practice, many organizations start with a reverse proxy or load balancer and later adopt an API gateway as their API surface grows. Some gateways, including Apache APISIX, build on NGINX and OpenResty while adding dynamic routing and a configurable plugin pipeline for API traffic policies.

### API Gateway vs API Management

An API gateway is the runtime component on the request path. It routes traffic and enforces policies. API management is the broader lifecycle discipline and may also include API design, publishing, documentation, developer onboarding, analytics, and governance. A gateway can be part of an API management platform, but the two terms are not interchangeable. The [API gateway vs API management guide](/learning-center/api-gateway-vs-api-management/) compares their responsibilities and explains when teams need both.

## API Gateway Use Cases

### Microservices Architecture

In a microservices system with many independently deployed services, an API gateway provides the single entry point that abstracts internal service topology from external consumers. Clients interact with one stable endpoint; the gateway handles service discovery, routing, and cross-cutting concerns. The [API gateway for microservices guide](/learning-center/api-gateway-for-microservices/) explains patterns such as request routing, service discovery, and canary delivery in more detail.

### Mobile and IoT Backends

Mobile clients operate under bandwidth, latency, and battery constraints that differ significantly from desktop browsers. An API gateway can aggregate multiple backend calls into a single response (the Backend-for-Frontend pattern), compress payloads, and adapt supported protocols. IoT systems that use MQTT or other non-HTTP protocols may also require a specialized gateway or protocol adapter; support for proxying or translating those protocols varies by product.

### Multi-Cloud and Hybrid Deployments

Organizations running services across AWS, GCP, Azure, and on-premises data centers use an API gateway as the unified traffic layer. The gateway abstracts the underlying infrastructure, enabling consistent routing, security policies, and observability regardless of where a service is deployed. This is especially valuable during cloud migration, where services move between environments incrementally.

### API Monetization

Companies that expose APIs as products use gateways to identify consumers, enforce quotas, and emit usage records. Billing, pricing, entitlements, and account management normally live in connected business systems; the gateway supplies enforcement and traffic data rather than replacing those systems.

### Zero-Trust Security

A gateway can enforce authentication and authorization at the network edge before protected requests reach backend services. Combined with mTLS, IP allowlists, and threat-protection controls, the gateway can form one enforcement point in a zero-trust architecture. See [API gateway security](/learning-center/api-gateway-security/) for the security controls and trust boundaries that still need to be designed around it.

### Legacy System Modernization

When migrating from monolithic to microservices architectures, an API gateway acts as the facade in the strangler fig pattern. New services are deployed behind the gateway alongside the legacy monolith. The gateway gradually shifts traffic from old endpoints to new ones, allowing incremental migration without disrupting existing clients.

## Benefits of Using an API Gateway

### Simplified Client Integration

Clients interact with a single, well-documented endpoint instead of tracking the addresses and protocols of individual services. This reduces client-side complexity, eliminates service discovery logic in front-end code, and makes API consumption predictable.

### Centralized Security

The gateway can enforce edge authentication, encryption requirements, and common access policies for the APIs configured to use them. Central policy management reduces duplicated implementations and inconsistent controls, while backend services retain responsibility for business authorization and resource-level access decisions.

### Operational Visibility

Gateway telemetry provides metrics, access logs, and trace spans for the requests that pass through the gateway. It helps teams analyze API traffic patterns, gateway and upstream error rates, and observed latency, but it complements rather than replaces service instrumentation required for end-to-end traces and application-level visibility.

### Reduced Backend Load

Caching and rate limiting at the gateway layer can prevent unnecessary or excessive calls from reaching backend services. The effect depends on traffic patterns and cacheability, but these controls can reduce upstream work and protect service capacity during traffic spikes.

### Faster Time to Market

Developers can focus more on business logic when common concerns such as edge authentication, rate limiting, and request transformation are implemented and maintained consistently at the gateway. This reduces repeated integration work, while service-specific policies and application logic remain in the backend.

### Independent Scalability

The gateway and backend services scale independently. During a traffic surge, teams can horizontally scale the gateway layer without modifying any backend service. Conversely, backend services can be scaled, redeployed, or replaced without any client-facing changes.

## How Apache APISIX Works as an API Gateway

[Apache APISIX](/) is an open-source, cloud-native API gateway built on NGINX and LuaJIT. It provides dynamic routing and a plugin-based policy layer for authentication, traffic control, observability, and request or response transformation.

**Runtime architecture.** APISIX uses NGINX's event-driven request processing and LuaJIT-based plugins. Performance depends on hardware, topology, TLS, enabled plugins, and upstream behavior, so teams should benchmark their own production policy chain instead of treating a single published result as universal.

**Extensible policy layer.** The APISIX [plugin ecosystem](/plugins/) covers authentication, traffic control, observability, security, and transformation. Native plugins use Lua, while external plugin runners provide additional extension models where their operational tradeoffs are appropriate.

**Dynamic configuration.** Routes match request attributes, execute configured plugins, and forward traffic to an upstream. In traditional and decoupled deployment modes, APISIX stores configuration in etcd and exposes an Admin API, allowing route, upstream, consumer, and plugin changes to propagate without restarting gateway processes. Standalone mode can instead load declarative configuration without etcd.

**Open governance.** Apache APISIX is an Apache Software Foundation top-level project developed under community governance and released under the Apache License 2.0.

To get started with APISIX, see the [getting started guide](/docs/apisix/getting-started/).

## Frequently Asked Questions

### What is the difference between an API gateway and a load balancer?

A load balancer's primary role is distributing traffic across healthy server instances. Some Layer 7 load balancers also provide authentication, rate limiting, or header-based routing, so the feature sets can overlap. An API gateway is designed around API-level policies for routes and consumers, such as authentication, quotas, transformation, and API observability. Choose based on the policy model you need, not on a strict feature checklist.

### Do I need an API gateway for a monolithic application?

An API gateway is not strictly required for a monolith, but it can still add value. If your monolith exposes APIs consumed by external clients, mobile apps, or third-party integrators, a gateway provides centralized authentication, rate limiting, and monitoring without modifying the application. It also positions your architecture for incremental migration to microservices using the strangler fig pattern.

### How does an API gateway affect latency?

An API gateway adds another network hop and executes policies before forwarding a request, so it always adds some latency. The actual overhead depends on deployment topology, TLS settings, enabled plugins, request and response transformations, and logging. Benchmark the gateway with the same policy chain and traffic profile you expect in production rather than relying on a universal latency figure.

### Can an API gateway replace a service mesh?

An API gateway and a service mesh usually serve different traffic boundaries. The gateway handles north-south traffic from API clients to services, while a service mesh focuses on east-west service-to-service communication. Apache APISIX can expose and control APIs at a cluster edge, but that does not replace mesh capabilities such as workload identity and service-to-service mTLS.

### Is an API gateway the same as an API management platform?

No. An API gateway is the runtime component that processes API traffic. API management is a broader category that can include a gateway, developer onboarding, API documentation, lifecycle governance, and analytics. Apache APISIX provides the open-source gateway layer; teams can integrate it with the other tools required for their API lifecycle.
