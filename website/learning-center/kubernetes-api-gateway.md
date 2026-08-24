---
title: "Kubernetes API Gateway: Gateway API & Ingress"
description: "Compare Kubernetes Gateway API vs Ingress, understand controller architecture, and evaluate Apache APISIX deployment patterns for Kubernetes."
slug: kubernetes-api-gateway
date: 2026-04-14
tags: [kubernetes, ingress-controller, gateway-api]
hide_table_of_contents: false
---

A Kubernetes API gateway manages external traffic entering a cluster and routes it to the appropriate Services. An ingress or Gateway API controller translates Kubernetes resources into gateway routing and policy configuration. Apache APISIX can also use [Kubernetes service discovery](/docs/apisix/discovery/kubernetes/) when a route needs to resolve changing backend endpoints without static upstream addresses.

## What is a Kubernetes API Gateway

Kubernetes does not include a built-in data plane for external traffic management. The platform defines APIs (Ingress, Gateway API) that describe how traffic should be routed, but the actual implementation is delegated to third-party controllers. These controllers run as pods within the cluster, watch for resource changes, and configure their underlying proxy accordingly.

This extensibility lets platform teams choose a controller and data plane that match their routing, policy, and operating requirements.

The original Ingress resource provides a deliberately limited HTTP routing model. The newer Gateway API offers a richer, role-oriented model with support for traffic splitting, header-based routing, and additional protocols, with feature maturity varying by resource and implementation.

## Kubernetes Ingress vs Gateway API

### Ingress Resource

The Ingress resource is Kubernetes' original API for defining external HTTP routing rules. An Ingress object specifies host-based and path-based routing rules that map incoming requests to backend Services.

Ingress is simple but limited. It supports only HTTP and HTTPS traffic, has no native concept of traffic splitting, and lacks a standard way to express advanced routing (header matching, query parameter routing, request mirroring). To work around these limitations, every ingress controller defines its own annotations, creating vendor lock-in and configuration inconsistency.

Ingress remains supported, while Kubernetes recommends Gateway API as its successor for teams that need its expanded model. Migration timing depends on controller conformance and the policies a workload uses.

### Gateway API

The Gateway API is a collection of Kubernetes custom resources that provide a more expressive and role-oriented model for traffic management. Its core resources are:

- **GatewayClass:** Defines a class of gateway implementations (analogous to StorageClass for volumes).
- **Gateway:** Declares a gateway instance with listeners for specific protocols and ports.
- **HTTPRoute:** Defines HTTP routing rules with support for path matching, header matching, query parameter matching, request mirroring, traffic splitting, and request/response header modification.
- **GRPCRoute, TCPRoute, TLSRoute, UDPRoute:** Protocol-specific route types for non-HTTP traffic.

Gateway API's role-oriented design separates infrastructure concerns (managed by platform teams via GatewayClass and Gateway) from application routing (managed by service teams via HTTPRoute). This separation mirrors real organizational structures where platform engineers control the gateway infrastructure and application teams define their own routes.

Gateway API replaces many controller-specific annotations with structured resources and fields, improving portability for capabilities included in the specification and supported by the chosen implementation.

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

Common options include NGINX Ingress Controller, Apache APISIX Ingress Controller, Traefik, and Kong Ingress Controller. Compare their supported Kubernetes APIs, policy models, release lifecycles, and operational requirements against your cluster needs.

## Choosing an Ingress Controller

### Apache APISIX Ingress Controller

APISIX Ingress Controller pairs a Kubernetes-native control plane with the Apache APISIX data plane. It supports Ingress resources and Gateway API, allowing gradual migration. Its differentiators include dynamic configuration without gateway restarts and access to APISIX traffic, security, and observability plugins.

APISIX is built on NGINX and LuaJIT. Its plugin architecture means that authentication, rate limiting, request transformation, and observability can be configured through Kubernetes custom resources without modifying application code. Measure throughput and latency with the plugin chain, TLS settings, and traffic profile intended for production.

### NGINX Ingress Controller

NGINX Ingress Controller uses NGINX as its data plane and supports annotations and other project-specific configuration for features beyond the core Ingress API. Teams should account for the lifecycle and configuration model of the specific NGINX controller distribution they choose.

### Traefik

Traefik provides provider-based service discovery and integrates with multiple orchestrators beyond Kubernetes. Its middleware system offers a model for cross-cutting concerns such as authentication, headers, and rate limiting.

### Kong Ingress Controller

Kong pairs its API gateway with a Kubernetes controller and supports PostgreSQL-backed, DB-less, and hybrid deployment modes. Available plugins and management capabilities vary by Kong edition and deployment mode.

## How Apache APISIX Works as a Kubernetes API Gateway

The [APISIX Ingress Controller](/docs/ingress-controller/overview/) uses Apache APISIX as its data plane and acts as the Kubernetes control plane. Teams can install the controller and data plane together or connect the controller to a separately managed APISIX deployment.

### Architecture

The control plane watches Kubernetes resources (Ingress, Gateway API, and APISIX custom resources) and translates them into APISIX routing configurations via the Admin API. The data plane (APISIX instances) handles actual traffic processing. This separation allows the data plane to scale independently based on traffic volume.

A production deployment normally runs multiple APISIX data-plane replicas behind a load balancer and separately manages controller availability. Choose replica counts, disruption budgets, and autoscaling thresholds from availability objectives and load tests rather than a universal sizing rule.

### Gateway API Support

APISIX Ingress Controller implements the Gateway API specification, supporting GatewayClass, Gateway, and HTTPRoute resources. Platform teams define GatewayClass and Gateway resources that configure the APISIX data plane. Application teams create HTTPRoute resources that define routing rules for their services.

This role-based model aligns with enterprise organizational structures and helps reduce misconfigurations compared to annotation-based Ingress resources.

### Custom Resources

Beyond standard Kubernetes APIs, APISIX Ingress Controller provides custom resources (ApisixRoute, ApisixUpstream, ApisixPluginConfig) that expose the full power of APISIX's plugin ecosystem. These CRDs allow Kubernetes-native configuration of features like JWT authentication, rate limiting, request transformation, and traffic mirroring without resorting to annotations.

### Plugin Configuration

APISIX plugins can be configured through Kubernetes custom resources. For example, enabling JWT authentication on a route requires adding a plugin reference to the ApisixRoute resource. The controller translates this into APISIX plugin configuration automatically. Plugin configurations can be shared across routes using ApisixPluginConfig resources, reducing duplication.

## Deployment Patterns

### Single Cluster Gateway

The simplest pattern deploys APISIX as the sole ingress point for a single Kubernetes cluster. All external traffic enters through APISIX, which handles TLS termination, routing, authentication, and rate limiting before forwarding requests to cluster services. This pattern suits organizations with a single production cluster handling moderate traffic volumes.

### Multi-Cluster with Shared Gateway

For organizations running multiple Kubernetes clusters (multi-region, staging/production, or domain-separated), a shared APISIX deployment can route traffic to configured upstream endpoints across clusters. This pattern requires explicit network connectivity, service discovery, health checks, and failure-domain planning.

### Gateway Per Namespace

Large organizations with multiple teams sharing a cluster may deploy separate APISIX instances per namespace or per team. Each team manages its own gateway configuration through Gateway API resources scoped to their namespace. ReferenceGrant resources control cross-namespace access. This pattern provides strong isolation between teams while sharing cluster infrastructure.

## FAQ

### Should I use Ingress or Gateway API for new Kubernetes deployments?

Use Gateway API for new deployments. Gateway API provides a richer feature set, role-based ownership, and native support for traffic splitting, header matching, and multi-protocol routing. Ingress will continue to work but receives no new features. The Kubernetes SIG-Network has stated that Gateway API is the future of Kubernetes traffic management. APISIX Ingress Controller supports both, so you can migrate incrementally.

### How does APISIX Ingress Controller compare to the NGINX Ingress Controller?

APISIX offers dynamic configuration without gateway reloads, Gateway API support, and plugins for authentication, rate limiting, and request transformation. NGINX controller capabilities and configuration mechanisms vary by distribution. Compare the exact Gateway API conformance, policy surface, release lifecycle, and benchmark results for the versions you plan to deploy.

### Can I run multiple ingress controllers in the same Kubernetes cluster?

Yes. Kubernetes supports multiple ingress controllers differentiated by IngressClass (for Ingress resources) or GatewayClass (for Gateway API resources). A common pattern runs APISIX for external-facing APIs requiring authentication and rate limiting, and a lightweight controller like Traefik for internal developer tools. Each Ingress or HTTPRoute resource specifies which controller should handle it.

### What is the resource overhead of running APISIX in Kubernetes?

Resource requirements depend on request and response size, TLS, enabled plugins, logging, upstream latency, and availability targets. Start with explicit resource requests and limits, then load-test the intended policy chain and tune replica counts or autoscaling from observed CPU, memory, latency, and saturation. Size the controller separately from the data plane because configuration churn and request traffic create different load profiles.

## Related

- [What is an API gateway?](/learning-center/what-is-an-api-gateway/)
- [API gateway for microservices](/learning-center/api-gateway-for-microservices/)
- [Compare API gateways](/comparisons/)
- [Get started with Apache APISIX](/docs/apisix/getting-started/)
