---
title: "API Gateway vs Load Balancer: Key Differences Explained"
description: "Understand the differences between an API gateway and a load balancer. Learn when to use each, how they complement each other, and where they overlap."
slug: api-gateway-vs-load-balancer
date: 2026-04-14
tags: [api-gateway, load-balancer, architecture]
hide_table_of_contents: false
faq:
  - q: "Does upstream load balancing make an API gateway highly available?"
    a: >-
      No. Upstream load balancing distributes requests from the gateway to backend instances. The gateway tier still needs multiple nodes, a stable entry point, health checks, and a failure-handling plan so that the gateway itself does not become a single point of failure.
  - q: "Who should own health checks when a load balancer and API gateway are both deployed?"
    a: >-
      A common division is for the external load balancer to check gateway nodes while the gateway checks its service upstreams. Define ownership at each boundary and avoid overlapping checks that can remove healthy targets for different reasons or create conflicting recovery behavior.
  - q: "How should retries be configured across a load balancer and an API gateway?"
    a: >-
      Assign a bounded retry budget to the layer that has the best view of each failure boundary. Uncoordinated retries at both layers can multiply requests, increase latency, and replay operations that are not safe to repeat. Test timeout and retry behavior together under partial failures.
---

A load balancer distributes traffic across healthy backend instances. An API gateway controls how clients use APIs through routing and policies such as authentication, rate limiting, transformation, and observability. Their capabilities overlap at Layer 7, but they solve different architectural problems. Many production systems use both: a network or cloud load balancer exposes a highly available gateway cluster, and the gateway applies API policies before balancing requests across services.

## What Is a Load Balancer?

A load balancer presents one endpoint in front of multiple servers and selects a healthy target for each connection or request. Its primary goals are availability, horizontal scaling, and efficient traffic distribution.

Load balancers commonly operate at one of two layers:

- **Layer 4 load balancing** uses transport information such as IP addresses, ports, and TCP or UDP connections. It can distribute traffic without interpreting an HTTP request.
- **Layer 7 load balancing** understands application protocols such as HTTP and HTTPS. Depending on the product, it can route by host, path, header, or other request attributes and may provide selected security or traffic-management features.

The exact boundary depends on the implementation. A modern application load balancer may support TLS termination, identity integration, redirects, header modification, or weighted routing. It should not be treated as a featureless network component.

## What Is an API Gateway?

An [API gateway](/learning-center/what-is-an-api-gateway/) is an application-aware entry point for APIs. It routes requests to services and provides a policy layer for concerns that would otherwise be implemented repeatedly across clients or backends.

Typical gateway responsibilities include authenticating callers, enforcing general access policies, applying per-consumer or per-route limits, rewriting requests and responses, collecting gateway telemetry, and managing traffic between API versions or upstream services. Services still own business authorization, resource ownership, and domain-specific rules.

API gateways primarily work at Layer 7. Some products can also proxy TCP or UDP traffic, but their API-specific policies generally apply to the protocols and request phases supported by that gateway.

## API Gateway vs Load Balancer

The table describes common product roles, not a universal feature checklist. Layer 7 load balancers and API gateways continue to adopt overlapping capabilities, so a product evaluation should verify the exact policy model and protocol support you need.

| Dimension | Load Balancer | API Gateway |
| --- | --- | --- |
| Primary purpose | Distribute traffic across healthy targets | Route and govern API traffic |
| Common operating layer | Layer 4 or Layer 7 | Primarily Layer 7 |
| Routing model | Listener and target-pool rules | API routes, methods, headers, consumers, and other request attributes |
| Health checks | Core capability in most products | Commonly available for gateway upstreams |
| TLS termination | Common | Common |
| Authentication | Available in some Layer 7 products | Common gateway policy |
| Rate limiting | Product-dependent | Commonly configurable by route, consumer, credential, or other keys |
| Request and response changes | Product-dependent | Common through explicit gateway policies or plugins |
| Protocol conversion | Not a typical load-balancing concern | Available only when the gateway supports and is configured for a specific conversion |
| Observability | Connection, target, and request metrics vary by product | API route, consumer, plugin, and upstream telemetry varies by configuration |
| Traffic releases | Weighted target routing in many products | Route- and upstream-level traffic controls, depending on the gateway |

The most useful distinction is the operating model. A load balancer is centered on listeners, target groups, and target health. An API gateway is centered on APIs, routes, consumers, credentials, and reusable policies.

## Where the Capabilities Overlap

Both components can terminate TLS, route HTTP traffic, check backend health, retry selected failures, and distribute requests among targets. A Layer 7 load balancer may be sufficient when an application needs host- or path-based routing but only a small set of API policies.

An API gateway becomes useful when policies need to follow API semantics. Examples include applying different authentication methods to different routes, enforcing quotas for individual consumers, transforming a request for a specific upstream, or recording metrics by API route. Protocol conversion is not automatic: it requires a supported capability and an explicit mapping. For example, Apache APISIX provides a [`grpc-transcode` plugin](/docs/apisix/plugins/grpc-transcode/) for configured HTTP-to-gRPC mappings.

## Where Should a Load Balancer Sit Relative to an API Gateway?

There is no single correct placement. Three patterns are common.

### Load Balancer in Front of an API Gateway Cluster

```text
Clients -> Load balancer -> API gateway nodes -> Backend services
```

The load balancer exposes a stable network endpoint and distributes connections across multiple gateway nodes. The gateway nodes then apply API policies and select backend services. This pattern is useful when a cloud platform, Kubernetes environment, or network team provides the external entry point and the gateway must be deployed for high availability.

### API Gateway Balancing Across Service Instances

```text
Clients -> API gateway -> Service instances
```

If the gateway already receives traffic through a suitable highly available endpoint, it can balance requests across the instances of each upstream service. This can remove a separate Layer 7 load-balancing hop between the gateway and those services. It does not remove the need to design availability for the gateway nodes themselves.

### Load Balancer Without an API Gateway

```text
Clients -> Load balancer -> Application instances
```

This is often sufficient for applications that primarily need availability and scaling, have no shared API policy requirements, or already implement the necessary controls elsewhere.

## When to Use Each

Use a load balancer when the main requirement is to distribute TCP, UDP, HTTP, or HTTPS traffic across healthy targets, expose a stable endpoint, or provide network-level availability for a cluster.

Use an API gateway when you need consistent API routing and policies across services, such as caller authentication, granular rate limits, request transformation, API-specific telemetry, or controlled traffic migration.

Use both when the gateway itself needs a highly available network entry point or when infrastructure and API policy have separate owners. Before adding both layers, verify that each component has a distinct responsibility; duplicate retries, timeouts, health checks, and routing rules can make failures harder to diagnose.

## How Apache APISIX Handles Load Balancing

Apache APISIX is an open-source API gateway with load balancing in its core request-processing path. An APISIX [Upstream](/docs/apisix/terminology/upstream/) represents a set of service nodes and the rules used to select among them. Supported algorithms include:

- **Weighted round robin (`roundrobin`)** to distribute requests according to node weights.
- **Consistent hashing (`chash`)** to select nodes from a configurable key such as a request variable, header, cookie, or authenticated consumer.
- **Exponentially weighted moving average (`ewma`)** to prefer nodes with lower observed latency.
- **Least connections (`least_conn`)** to account for active connections and configured node weights.

Upstreams can also use active and passive [health checks](/docs/apisix/tutorials/health-check/) and retries. For controlled releases across different upstreams, the [`traffic-split` plugin](/docs/apisix/plugins/traffic-split/) provides condition- and weight-based traffic distribution.

APISIX can therefore perform application-layer routing, API policy enforcement, and upstream load balancing in the same gateway layer. It does not automatically replace an external load balancer. A separate cloud, hardware, or Layer 4 load balancer may still provide the public entry point, distribute connections across APISIX nodes, or supply network services outside the gateway's scope. APISIX can also be configured as a [stream proxy](/docs/apisix/stream-proxy/) for TCP and UDP traffic, but stream routes and HTTP routes have different capabilities and configuration models.

## Compare Performance in Your Own Traffic Path

Adding application-layer inspection and policies requires work that a simple Layer 4 forwarding path does not perform. The actual latency and throughput difference depends on the products, protocols, TLS configuration, enabled gateway policies, logging, upstream behavior, hardware, and traffic shape. A universal microsecond or millisecond estimate is not reliable enough for architecture decisions.

Benchmark the configurations you intend to operate. Compare at least the load balancer alone, the gateway with routing only, and the gateway with the production policy set. Measure tail latency as well as average latency, and test failure behavior such as unhealthy upstreams, retries, and gateway-node loss. This reveals whether an additional layer creates meaningful cost in your environment and whether its policy benefits justify that cost.

## Conclusion

A load balancer answers where a connection or request should go among healthy targets. An API gateway also decides how an API request should be admitted, shaped, observed, and routed. Use the smallest architecture that satisfies both availability and API policy requirements. When both are needed, give the load balancer responsibility for the gateway cluster's network entry point and give the gateway responsibility for APIs and their upstream services.
