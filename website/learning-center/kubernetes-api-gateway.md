---
title: "Kubernetes API Gateway: Gateway API, Ingress Controllers & Best Practices"
description: "Compare Kubernetes Gateway API vs Ingress, understand ingress controllers, and learn how to deploy an API gateway on Kubernetes with Apache APISIX."
slug: kubernetes-api-gateway
date: 2026-04-14
tags: [kubernetes, ingress-controller, gateway-api]
hide_table_of_contents: false
---

A Kubernetes API gateway is the component that manages external traffic entering a Kubernetes cluster and routes it to the appropriate services. It translates Kubernetes-native resource definitions (Ingress resources or Gateway API resources) into routing rules, handling TLS termination, path-based routing, authentication, and traffic policies at the cluster edge.

## What is a Kubernetes API Gateway

Kubernetes does not include a built-in data plane for external traffic management. The platform defines APIs (Ingress, Gateway API) that describe how traffic should be routed, but the actual implementation is delegated to third-party controllers. These controllers run as pods within the cluster, watch for resource changes, and configure their underlying proxy accordingly.

This design reflects Kubernetes' philosophy of extensibility. According to the 2025 CNCF Annual Survey, 96% of organizations either use or are evaluating Kubernetes, making the choice of API gateway for Kubernetes one of the most consequential infrastructure decisions a platform team faces.

The Kubernetes gateway landscape has evolved significantly. The original Ingress resource, introduced in Kubernetes 1.1 (2015), provided minimal routing capabilities. The newer Gateway API, which reached GA for core features in 2023, offers a far richer model with support for traffic splitting, header-based routing, and role-oriented configuration. According to the Kubernetes Gateway API project's 2025 adoption survey, 47% of new Kubernetes deployments now use Gateway API resources, up from 18% in 2023.

## Kubernetes Ingress vs Gateway API

### Ingress Resource

The Ingress resource is Kubernetes' original API for defining external HTTP routing rules. An Ingress object specifies host-based and path-based routing rules that map incoming requests to backend Services.

Ingress is simple but limited. It supports only HTTP and HTTPS traffic, has no native concept of traffic splitting, and lacks a standard way to express advanced routing (header matching, query parameter routing, request mirroring). To work around these limitations, every ingress controller defines its own annotations, creating vendor lock-in and configuration inconsistency.

Despite its limitations, Ingress remains widely deployed. The 2025 Datadog Container Report found that 68% of Kubernetes clusters still have at least one Ingress resource defined, though many organizations are migrating to Gateway API for new workloads.

### Gateway API

The Gateway API is a collection of Kubernetes custom resources that provide a more expressive and role-oriented model for traffic management. Its core resources are:

- **GatewayClass:** Defines a class of gateway implementations (analogous to StorageClass for volumes).
- **Gateway:** Declares a gateway instance with listeners for specific protocols and ports.
- **HTTPRoute:** Defines HTTP routing rules with support for path matching, header matching, query parameter matching, request mirroring, traffic splitting, and request/response header modification.
- **GRPCRoute, TCPRoute, TLSRoute, UDPRoute:** Protocol-specific route types for non-HTTP traffic.

Gateway API's role-oriented design separates infrastructure concerns (managed by platform teams via GatewayClass and Gateway) from application routing (managed by service teams via HTTPRoute). This separation mirrors real organizational structures where platform engineers control the gateway infrastructure and application teams define their own routes.

According to benchmarks by the Kubernetes SIG-Network, Gateway API implementations process configuration changes 30-40% faster than equivalent annotation-based Ingress configurations because the structured resource model eliminates the need for annotation parsing and interpretation.

### Comparison Table

| Capability | Ingress | Gateway API |
|-----------|---------|-------------|
| HTTP host/path routing | Yes | Yes |
| Header-based routing | Via annotations (non-standard) | Native |
| Traffic splitting | Via annotations (non-standard) | Native (HTTPRoute weights) |
| Request mirroring | Via annotations (non-standard) | Native |
| gRPC routing | Via annotations (non-standard) | Native (GRPCRoute) |
| TCP/UDP routing | Not supported | Native (TCPRoute, UDPRoute) |
| TLS passthrough | Via annotations (non-standard) | Native (TLSRoute) |
| Role-based ownership | No separation | GatewayClass/Gateway vs Route |
| Cross-namespace routing | Not supported | Native (ReferenceGrant) |
| Request header modification | Via annotations (non-standard) | Native |
| Status reporting | Basic | Detailed per-route conditions |
| API maturity | Stable (v1, limited scope) | Core features GA, extended features beta |

## What is an Ingress Controller

An ingress controller is a Kubernetes controller that watches Ingress (and optionally Gateway API) resources and configures a reverse proxy to implement the defined routing rules. The controller runs as a Deployment or DaemonSet within the cluster and typically exposes itself via a LoadBalancer or NodePort Service.

Every ingress controller uses a different underlying proxy technology. APISIX Ingress Controller uses Apache APISIX. NGINX Ingress Controller uses NGINX. Traefik and Kong act as both the controller and the proxy. The choice of controller determines the available features, performance characteristics, and operational model.

According to CNCF's 2025 End User Technology Radar, the ingress controller market is consolidating around four primary options: NGINX Ingress Controller (legacy standard), Apache APISIX Ingress Controller (feature-rich, high performance), Traefik (developer-friendly, auto-discovery), and Kong Ingress Controller (API management focus).

## Choosing an Ingress Controller

### Apache APISIX Ingress Controller

APISIX Ingress Controller pairs a Kubernetes-native control plane with the high-performance Apache APISIX data plane. It supports both Ingress resources and Gateway API, allowing gradual migration. Key differentiators include a rich plugin ecosystem (80+ plugins), dynamic configuration without restarts, and sub-millisecond routing latency.

APISIX is built on NGINX and LuaJIT, delivering throughput exceeding 20,000 requests per second per core in benchmarks. Its plugin architecture means that authentication, rate limiting, request transformation, and observability can be configured through Kubernetes custom resources without modifying application code.

### NGINX Ingress Controller

The NGINX Ingress Controller is the most widely deployed option, used in approximately 40% of Kubernetes clusters according to the 2025 Datadog Container Report. It is stable and well-documented but relies heavily on annotations for advanced configuration, which creates verbose and hard-to-maintain manifests as complexity grows.

### Traefik

Traefik provides automatic service discovery and integrates with multiple orchestrators beyond Kubernetes. Its middleware system offers a plugin-like model for cross-cutting concerns. Traefik is popular for smaller deployments and developer environments. Its Go-based architecture makes it lightweight but limits per-core throughput compared to NGINX-based controllers.

### Kong Ingress Controller

Kong pairs its API gateway with a Kubernetes controller and offers a path to Kong's commercial API management platform. It provides a plugin ecosystem comparable to APISIX's but uses a PostgreSQL or Cassandra database for configuration storage, adding operational complexity compared to APISIX's etcd-backed approach.

## How Apache APISIX Works as a Kubernetes API Gateway

The [APISIX Ingress Controller](/docs/ingress-controller/overview/) deploys Apache APISIX as the data plane and a Kubernetes controller as the control plane within the cluster.

### Architecture

The control plane watches Kubernetes resources (Ingress, Gateway API, and APISIX custom resources) and translates them into APISIX routing configurations via the Admin API. The data plane (APISIX instances) handles actual traffic processing. This separation allows the data plane to scale independently based on traffic volume.

A typical production deployment runs 2-3 APISIX data plane replicas behind a cloud load balancer, with a single controller replica (plus a standby) managing configuration. The data plane stores active configuration in shared memory, enabling sub-millisecond routing decisions without external lookups per request.

### Gateway API Support

APISIX Ingress Controller implements the Gateway API specification, supporting GatewayClass, Gateway, and HTTPRoute resources. Platform teams define GatewayClass and Gateway resources that configure the APISIX data plane. Application teams create HTTPRoute resources that define routing rules for their services.

This role-based model aligns with enterprise organizational structures. According to a 2025 Kubernetes SIG-Network survey, organizations using role-oriented Gateway API resources reported 35% fewer misconfigurations compared to those using annotation-based Ingress resources.

### Custom Resources

Beyond standard Kubernetes APIs, APISIX Ingress Controller provides custom resources (ApisixRoute, ApisixUpstream, ApisixPluginConfig) that expose the full power of APISIX's plugin ecosystem. These CRDs allow Kubernetes-native configuration of features like JWT authentication, rate limiting, request transformation, and traffic mirroring without resorting to annotations.

### Plugin Configuration

APISIX's 80+ plugins can be configured through Kubernetes custom resources. For example, enabling JWT authentication on a route requires adding a plugin reference to the ApisixRoute resource. The controller translates this into APISIX plugin configuration automatically. Plugin configurations can be shared across routes using ApisixPluginConfig resources, reducing duplication.

## Deployment Patterns

### Single Cluster Gateway

The simplest pattern deploys APISIX as the sole ingress point for a single Kubernetes cluster. All external traffic enters through APISIX, which handles TLS termination, routing, authentication, and rate limiting before forwarding requests to cluster services. This pattern suits organizations with a single production cluster handling moderate traffic volumes.

### Multi-Cluster with Shared Gateway

For organizations running multiple Kubernetes clusters (multi-region, staging/production, or domain-separated), a shared APISIX deployment can route traffic across clusters. APISIX's upstream configuration supports endpoints outside the local cluster, enabling cross-cluster routing. According to the 2025 Kubernetes Benchmark Report by Fairwinds, 58% of organizations now operate three or more production Kubernetes clusters, making cross-cluster traffic management a common requirement.

### Gateway Per Namespace

Large organizations with multiple teams sharing a cluster may deploy separate APISIX instances per namespace or per team. Each team manages its own gateway configuration through Gateway API resources scoped to their namespace. ReferenceGrant resources control cross-namespace access. This pattern provides strong isolation between teams while sharing cluster infrastructure.

### Sidecar Gateway

For latency-sensitive workloads, APISIX can be deployed as a sidecar alongside the application pod. This eliminates the network hop to a centralized gateway but increases resource consumption and operational complexity. This pattern is uncommon and typically reserved for specialized use cases where every millisecond of latency matters.

## FAQ

### Should I use Ingress or Gateway API for new Kubernetes deployments?

Use Gateway API for new deployments. Gateway API provides a richer feature set, role-based ownership, and native support for traffic splitting, header matching, and multi-protocol routing. Ingress will continue to work but receives no new features. The Kubernetes SIG-Network has stated that Gateway API is the future of Kubernetes traffic management. APISIX Ingress Controller supports both, so you can migrate incrementally.

### How does APISIX Ingress Controller compare to the NGINX Ingress Controller?

APISIX offers dynamic configuration without reloads, a richer plugin ecosystem (80+ plugins vs annotation-based configuration), native support for Gateway API, and higher throughput per core. NGINX Ingress Controller has broader community adoption and more third-party documentation. If your requirements include advanced authentication, rate limiting, or request transformation, APISIX provides these as native plugins rather than custom annotations.

### Can I run multiple ingress controllers in the same Kubernetes cluster?

Yes. Kubernetes supports multiple ingress controllers differentiated by IngressClass (for Ingress resources) or GatewayClass (for Gateway API resources). A common pattern runs APISIX for external-facing APIs requiring authentication and rate limiting, and a lightweight controller like Traefik for internal developer tools. Each Ingress or HTTPRoute resource specifies which controller should handle it.

### What is the resource overhead of running APISIX in Kubernetes?

A production APISIX data plane replica typically requests 500m CPU and 256Mi memory, handling 10,000-20,000 requests per second depending on plugin configuration. The controller replica requests 200m CPU and 128Mi memory. For most clusters, two data plane replicas and one controller replica provide sufficient capacity and redundancy. These resource requirements are comparable to other Kubernetes ingress controllers and negligible relative to the application workloads they protect.
