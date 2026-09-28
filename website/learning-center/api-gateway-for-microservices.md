---
title: "API Gateway for Microservices: Architecture, Patterns & Best Practices"
description: "Learn when microservices benefit from an API gateway, when a simpler alternative is enough, how responsibilities split, and how to evaluate Apache APISIX."
slug: api-gateway-for-microservices
date: 2026-04-14
tags: [microservices, architecture, api-gateway]
hide_table_of_contents: false
---

Microservices architectures often use an [API gateway](/learning-center/what-is-an-api-gateway/) as a stable entry point for API consumers and to route requests to the correct backend services. The gateway can apply shared edge policies such as client authentication, rate limiting, protocol translation, and traffic observability. Services still own business authorization, domain validation, and telemetry for work that happens behind or outside the gateway.

## Why Microservices Need a Gateway

A microservices architecture decomposes a monolithic application into independently deployable services, each owning a specific business domain. While this approach improves development velocity and scaling flexibility, it introduces operational challenges that compound as the number of services grows.

Without a gateway or an equivalent edge or composition layer, clients may need to know and coordinate calls to several service endpoints. A single mobile application screen might require data from five different services, which can force the client to manage multiple connections, handle partial failures, and aggregate responses. As organizations scale their microservices fleets, keeping that orchestration in every client can become difficult.

The API gateway pattern addresses this by placing a routing and policy layer between clients and the service fleet. The gateway accepts client requests, routes them to the appropriate services, and returns their responses. Some systems also use a separate composition service or backend-for-frontend when one client operation requires data from several services.

The gateway can also reduce duplication of shared edge concerns. Authentication, logging, rate limiting, CORS handling, and request validation may otherwise be implemented through service code, libraries, sidecars, proxies, or platform services. A gateway provides one policy point for traffic that crosses it, reducing duplication when those policies belong at the edge; services still retain business-specific controls.

## When a Simpler Alternative Is Enough

Microservices do not automatically require an API gateway. A reverse proxy, ingress controller, service-mesh ingress, cloud load balancer, or direct client-to-service access may be sufficient when:

- the system has one internal client and only a few services;
- no API is exposed outside a trusted network boundary;
- an existing ingress proxy already provides the required routing and TLS features;
- service-mesh ingress or a cloud load balancer covers the current traffic and policy requirements; or
- the team cannot yet operate another critical traffic component reliably.

Choose from concrete routing, security, client, and operating requirements rather than from the use of microservices alone. A gateway becomes useful when the system needs a stable client-facing entry point, shared edge policies, upstream protection, or traffic controls that simpler infrastructure does not provide.

## Core Gateway Patterns

### Request Routing

The most fundamental gateway pattern routes incoming requests to the correct upstream service based on URL paths, headers, methods, or other request attributes. A gateway might route `/api/users/*` to the user service, `/api/orders/*` to the order service, and `/api/products/*` to the catalog service.

Dynamic routing takes this further by reading route configurations from a control plane or configuration store, allowing accepted route changes to be applied without restarting gateway processes. Apache APISIX supports dynamic route configuration through its Admin API and etcd-backed configuration store; rollout safety still depends on validation, control-plane availability, and rollback practices.

### API Composition (Aggregation)

API composition combines responses from multiple microservices into a single response for the client. Instead of requiring a mobile application to make five separate API calls to render a dashboard, a composition-capable gateway, backend for frontend (BFF), or separate composition service can fetch data from all five services in parallel and return a unified response.

This pattern can reduce client-side complexity and network round trips. It also adds orchestration logic and failure handling to the composition layer, so teams should measure whether the extra hop improves the target client experience.

### Backend for Frontend (BFF)

The BFF pattern creates gateway configurations tailored to specific client types. A mobile BFF provides compact responses optimized for bandwidth constraints and small screens. A web BFF returns richer data structures suited to desktop layouts. An internal BFF serves admin tools with elevated access.

Each BFF acts as a specialized API layer that transforms and filters upstream service responses for its target client. The pattern can keep client-specific response shaping out of general-purpose services, but each BFF still needs clear ownership, authentication, observability, and lifecycle management.

### Service Mesh Integration

In architectures that deploy both an API gateway and a service mesh, the gateway often applies client- and consumer-facing API policies while the mesh manages workload identity and service-to-service policy. This is a common division of responsibility, not a strict traffic rule: service meshes can provide ingress gateways, and API gateways can route internal traffic.

Whether a team needs both depends on its trust boundaries and policy model. The [API gateway vs service mesh comparison](/learning-center/api-gateway-vs-service-mesh/) explains the overlap and provides a decision checklist for gateway-only, mesh-only, and combined deployments.

## Gateway and Service Responsibilities

Clear ownership prevents the gateway from becoming a business-logic layer and prevents services from assuming that all traffic passed through the gateway.

| Concern | Typical gateway role | Typical service role |
| --- | --- | --- |
| Authentication | Validate supported client credentials or tokens | Enforce identity requirements for internal calls where needed |
| Authorization | Apply route- or consumer-level policy | Enforce resource- and domain-level permissions |
| Rate limiting | Protect shared entry points and upstream capacity | Apply business quotas or workload-specific limits |
| Validation | Enforce protocol, request-size, or basic schema constraints | Validate domain rules and state transitions |
| Observability | Record edge traffic and propagate trace context | Instrument internal work and business outcomes |
| Composition | Perform limited protocol or payload adaptation | Own workflows and business orchestration |

Long-running orchestration and domain decisions are usually easier to own and test in an application, BFF, or orchestration service than in gateway plugins. The exact boundary should reflect the trust model and failure behavior of the system.

## Key Features for Microservices

### Service Discovery

In a microservices environment, services scale dynamically and their network locations change frequently. Static configuration of upstream addresses becomes impractical at scale. A configured service-discovery integration lets the gateway resolve service instances from a registry. Endpoint discovery and health checking are separate concerns unless the selected integration explicitly combines them.

Apache APISIX integrates with multiple service discovery systems, documented in its [discovery configuration guide](/docs/apisix/discovery/). Supported options include Consul, Eureka, Nacos, DNS, and Kubernetes. Each discovery implementation has its own refresh and filtering behavior. APISIX [active and passive health checks](/docs/apisix/tutorials/health-check/) can separately mark upstream nodes unhealthy when their checks and thresholds are configured.

In Kubernetes environments, the APISIX Ingress Controller can translate supported Kubernetes resources into APISIX configuration. Verify the controller version, resource type, and reconciliation behavior required by the deployment rather than assuming that every discovery integration has the same update model.

### Circuit Breaking

Circuit breaking prevents cascading failures by stopping requests to an unhealthy upstream service. When error rates exceed a configured threshold, the circuit opens and the gateway returns a fast failure response instead of forwarding requests to the struggling service. After a cooldown period, the circuit enters a half-open state and allows a limited number of test requests through. If those succeed, the circuit closes and normal traffic resumes.

Without bounded timeouts, retries, and failure controls, an unhealthy service can consume gateway and client resources and contribute to cascading failures. Circuit-breaker thresholds must be tuned from real error, latency, and recovery behavior; an overly sensitive policy can reject healthy traffic.

### Canary Deployment

Canary deployment routes a small percentage of production traffic to a new service version while the majority continues to hit the stable version. The gateway controls the traffic split, enabling teams to validate new releases with real traffic before committing to a full rollout.

APISIX supports traffic splitting through weighted upstream configurations. Teams can begin with a small share of traffic and increase it only when service-level metrics remain within the rollout criteria. Reverting the traffic split still requires an explicit, tested configuration or deployment action.

### Distributed Tracing

In a microservices architecture, a client request can traverse several services. Distributed tracing can connect spans from those hops when each participating component propagates compatible trace context and emits spans. A configured gateway tracing plugin can start or continue trace context for requests that pass through APISIX.

APISIX provides plugins for tracing and exporting gateway-visible spans to systems such as Zipkin, SkyWalking, and OpenTelemetry-compatible backends. End-to-end traces still require compatible context propagation and instrumentation in downstream services; gateway telemetry alone covers only traffic and processing visible to APISIX.

For services that use [gRPC](/learning-center/what-is-grpc/), the gateway must preserve HTTP/2 and streaming behavior or explicitly translate the protocol for clients that cannot use native gRPC.

## How Apache APISIX Supports Microservices

Apache APISIX is designed for microservices environments, offering dynamic configuration, multi-protocol support, and native integration with cloud-native infrastructure.

**Dynamic configuration without restarts.** APISIX stores configuration in etcd and applies changes in real time. Routes, upstream definitions, plugins, and consumers can be added, modified, or removed through the Admin API without restarting any gateway node. This is essential in microservices environments where service endpoints change frequently.

**Plugin pipeline architecture.** APISIX's plugin system runs a configurable pipeline of plugins on each request. For microservices, this means authentication, rate limiting, request transformation, and logging execute as independent pipeline stages. Plugins can be enabled per-route, per-service, or globally, providing fine-grained control over cross-cutting behavior.

**Kubernetes-native operation.** The [APISIX Ingress Controller](/docs/ingress-controller/concepts/gateway-api/) deploys APISIX as a Kubernetes-native gateway, supporting both the legacy Ingress resource and the newer Gateway API specification. This allows platform teams to manage gateway configuration using familiar Kubernetes declarative workflows.

**Service discovery integration.** APISIX's [service discovery](/docs/apisix/discovery/) capabilities can resolve upstream nodes through configured integrations such as Consul, Nacos, Eureka, DNS, and Kubernetes. Refresh behavior depends on the selected integration, while excluding unhealthy nodes requires an appropriate registry policy or APISIX health-check configuration.

**Observability.** Built-in plugins can export gateway metrics, traces, and logs to configured external systems. These signals describe requests processed by APISIX; services, queues, and other internal paths need their own instrumentation for end-to-end operational visibility.

## Operational Risks to Plan For

Adding a gateway concentrates important traffic and policy decisions, so deployment and configuration choices can create their own failure modes:

- **Gateway failure domain.** Run enough data-plane capacity across the failure domains required by the service, define health checks, and test behavior when the control plane or configuration store is unavailable. Deploying a gateway does not by itself provide high availability.
- **One policy for unlike services.** Upstreams differ in latency, capacity, data sensitivity, and client behavior. Use route- or consumer-specific controls where needed, and keep default policies explicit and auditable.
- **Gateway-only security.** Protect administrative APIs and configuration stores, restrict network access, and secure service-to-service communication. Services must not trust client-controlled identity headers unless a trusted component removes or replaces them.
- **Unbounded plugin work.** Plugins run in a critical request path. Review custom code, limit its network and secret access, test failure behavior, and keep expensive or blocking work out of the request path.

## Practical Evaluation Checklist

Before making Apache APISIX a production dependency, verify:

1. how routes and upstreams are configured, reviewed, and promoted between environments;
2. which authentication and authorization model protects each API and internal call path;
3. how APISIX discovers or receives updates about service endpoints;
4. which telemetry is exported, where sensitive data is filtered, and which internal paths need separate instrumentation;
5. how the data plane behaves during upstream, network, control-plane, and configuration-store failures; and
6. how upgrades, backups, rollbacks, and incident response are tested.

Start with the [APISIX getting-started guide](/docs/apisix/getting-started/) and enable only the [plugins required by the workload](/docs/apisix/terminology/plugin/). A smaller, well-tested policy set is easier to operate than features without clear owners or failure expectations.

## FAQ

### Do I need an API gateway if I already use a service mesh?

Not always. If the mesh ingress already provides the external routing and policy model an application needs, a separate API gateway may add unnecessary operational work. Add an API gateway when the system needs consumer-oriented authentication, quotas, request transformation, or an API policy boundary that is managed separately from workload policy. The [detailed gateway and service mesh comparison](/learning-center/api-gateway-vs-service-mesh/) covers the decision factors.

### How does an API gateway handle partial failures across microservices?

An API gateway can apply timeouts, bounded retries, circuit-breaking policies, and configured health checks before or while routing to an upstream. Those controls can contain some failures, but they do not define how a composed business response should degrade. If a client operation combines several services, place partial-result and fallback policy in the composition layer and specify which missing results are acceptable. In APISIX, health checks exclude nodes only after the configured active or passive thresholds mark them unhealthy; if no healthy node is available, the documented fallback behavior must also be included in the failure design.

### Should each microservice team manage their own gateway routes?

A decentralized model where service teams own their route configurations works well at scale, provided the platform team controls the global policies (authentication requirements, rate limiting defaults, logging standards). APISIX supports this through its Admin API, which can be integrated into CI/CD pipelines. Service teams declare their routes in version-controlled configuration files, and the deployment pipeline applies changes through the Admin API after policy validation.

### What is the performance impact of adding an API gateway to a microservices architecture?

An API gateway adds a network hop and the processing cost of each enabled policy. The impact depends on deployment topology, TLS, payload size, connection reuse, logging, and the selected plugins. Benchmark APISIX with the same routes, policies, and traffic profile planned for production, and include the gateway in latency and capacity budgets.

## Related

- [Kubernetes API gateway](/learning-center/kubernetes-api-gateway/)
- [Compare API gateways](/comparisons/)
- [Get started with Apache APISIX](/docs/apisix/getting-started/)
