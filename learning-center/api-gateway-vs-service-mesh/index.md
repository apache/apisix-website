# API Gateway vs Service Mesh: Differences, Overlap, and When to Use Both

> Compare API gateways and service meshes by traffic scope, identity, policy enforcement, deployment model, and operations, and learn when one or both fit.

Source: https://apisix.apache.org/learning-center/api-gateway-vs-service-mesh/

An API gateway and a service mesh both control network traffic, but they usually operate at different boundaries. An API gateway provides an API-facing entry point and applies policies for clients and consumers. A service mesh manages communication between workloads and can provide workload identity, service-to-service encryption, traffic policy, and telemetry across a group of services.

The boundary is not absolute. Service meshes can include ingress and egress gateways, while API gateways can route internal traffic. The useful question is therefore not which product owns a direction of traffic, but which identity, policy, and operational model each traffic path requires.

## What Is an API Gateway?

An [API gateway](/learning-center/what-is-an-api-gateway/) sits on the request path between API clients and backend services. It matches requests to routes, applies configured policies, selects an upstream, and returns the response to the client.

Common gateway responsibilities include:

- authenticating API consumers with mechanisms such as API keys, JWT, OAuth 2.0, or OpenID Connect;
- applying consumer- or route-level rate limits and quotas;
- transforming requests and responses;
- providing a stable API endpoint while backend locations change; and
- emitting metrics, logs, or traces for traffic that passes through the gateway.

An API gateway does not automatically establish identity and encrypted communication between every workload in an application. Backend services also remain responsible for business authorization and resource-level access decisions.

## What Is a Service Mesh?

A service mesh is an infrastructure layer for workload-to-workload communication. A mesh control plane distributes configuration and identity information to a data plane that processes service traffic. Depending on the implementation, that data plane can use sidecar proxies, shared node proxies, or other deployment models.

Common service mesh responsibilities include:

- assigning and verifying workload identities;
- encrypting service-to-service traffic with mTLS;
- applying traffic policies between workloads;
- collecting telemetry for calls inside the mesh; and
- controlling service discovery, routing, retries, and failover within the mesh.

For example, [Istio's architecture](https://istio.io/latest/docs/ops/deployment/architecture/) separates a control plane from a data plane that mediates traffic between services. A mesh can also expose ingress and egress gateways, so it should not be reduced to an east-west-only proxy layer.

## API Gateway vs Service Mesh

| Dimension | API Gateway | Service Mesh |
| --- | --- | --- |
| Primary policy subject | API client, consumer, application, or route | Workload, service, namespace, or service account |
| Common traffic scope | Requests entering an API boundary | Calls between participating workloads |
| Identity model | Client credentials, tokens, API keys, or client certificates | Workload identity and service-to-service certificates |
| Deployment model | Shared or dedicated gateway instances on selected traffic paths | A control plane plus proxies or data-plane components across participating workloads |
| Typical policies | Authentication, consumer quotas, request transformation, API routing | Workload authorization, mTLS, service routing, retries, and failover |
| Observability scope | Requests that pass through the gateway | Calls that pass through the mesh data plane |
| Main users | API, platform, application, and security teams | Platform, infrastructure, and service teams |
| API consumer semantics | Usually first-class through routes, consumers, credentials, and quotas | Usually centered on workload and service identity |

These are operating-model differences, not a universal feature checklist. Some API gateways support mTLS, service discovery, retries, and internal routing. Some service meshes support ingress gateways, rate limiting integrations, or Kubernetes Gateway API resources. Product capabilities and deployment choices determine the actual overlap.

## Where Their Capabilities Overlap

Both layers can influence routing, encryption, retries, timeouts, load balancing, and observability. That overlap can be useful, but it can also produce conflicting behavior if the same policy is configured independently in both places.

### Ingress and Egress

A service mesh ingress gateway can accept traffic from outside the mesh, and an egress gateway can control selected outbound calls. If a mesh ingress already provides the external authentication, routing, and policy model an application needs, a separate API gateway may not be necessary.

Teams often add an API gateway when they need consumer-oriented controls such as API keys, OAuth or OIDC integration, per-consumer quotas, request transformation, or a stable API contract that is managed separately from mesh workload policy.

### Traffic Management

API gateways and service meshes can both perform load balancing, health-aware routing, retries, and traffic splitting. The appropriate owner depends on the failure boundary. Gateway policy can protect an API entry point and its upstreams, while mesh policy can govern calls deeper in a service chain.

Avoid applying retries at every layer without a shared budget. A client retry, gateway retry, mesh retry, and application retry can multiply requests during an outage. Define which layer owns retries and timeouts for each path.

### Identity and Encryption

An API gateway can authenticate external callers and terminate or initiate TLS and mTLS on the connections it owns. A service mesh can issue workload identities and enforce mTLS between participating services. These controls protect different trust boundaries and may be used together.

Gateway-side mTLS does not by itself create mesh-wide workload identity. Likewise, workload mTLS inside a mesh does not replace client authentication or business authorization for a public API.

## When to Use an API Gateway

Use an API gateway without a service mesh when the main requirement is to expose and control APIs, and the added operational cost of a mesh is not justified. This is common when:

- external, partner, mobile, or browser clients need a stable API endpoint;
- teams need API authentication, consumer quotas, or request transformation;
- the number of internal services is manageable with existing platform networking; or
- only selected traffic paths require centralized policy enforcement.

An API gateway can also support internal APIs, but routing internal traffic through a gateway does not automatically provide every service with a workload identity or transparent service-to-service encryption.

## When to Use a Service Mesh

Use a service mesh without a separate API gateway when the primary problem is communication among many internal workloads and the mesh ingress capabilities already satisfy external requirements. This can fit environments that need:

- consistent workload identity and service-to-service mTLS;
- traffic and authorization policy across many services;
- telemetry for calls that do not pass through an API gateway; or
- common networking behavior across Kubernetes clusters, virtual machines, or both.

A mesh adds a control plane, data-plane resources, certificate lifecycle, and additional troubleshooting paths. Teams should adopt it for explicit workload-level requirements rather than as a default layer for every microservices deployment.

## When to Use Both

Use both when the system has distinct API-consumer and workload-policy requirements. A common arrangement is:

```text
API clients
    |
API gateway
    |
Mesh ingress or service endpoint
    |
Service mesh workloads
```

In this design, the API gateway can own client authentication, API routing, consumer limits, and transformations. The service mesh can own workload identity, service-to-service mTLS, and policies for calls inside the mesh.

The exact handoff differs by platform. A mesh gateway may receive traffic directly from the API gateway, or the API gateway may participate in the mesh through an integration supported by the mesh. Document the trust boundary, the source identity passed downstream, and which layer owns TLS, retries, timeouts, and telemetry.

## How Apache APISIX Fits with a Service Mesh

Apache APISIX is an open-source API gateway, not a complete service mesh. It can provide API-facing routing and policies, then forward requests to services that participate in a mesh.

For traffic that passes through APISIX, teams can configure:

- [Routes](/docs/apisix/terminology/route/) and [Consumers](/docs/apisix/terminology/consumer/) for API and caller-oriented policy;
- authentication, rate limiting, transformation, and observability plugins;
- [Upstreams](/docs/apisix/terminology/upstream/) for load balancing and retry behavior; and
- [service discovery integrations](/docs/apisix/discovery/) for supported registries.

APISIX also supports active and passive [upstream health checks](/docs/apisix/tutorials/health-check/). These gateway capabilities do not replace mesh-wide workload identity, sidecar or ambient data planes, or automatic service-to-service mTLS.

If a deployment uses APISIX with a mesh, align the two systems before production rollout:

1. Choose one owner for client identity and one owner for workload identity.
2. Decide where TLS terminates and where new encrypted connections begin.
3. Set one retry and timeout budget for the complete request path.
4. Preserve request and trace context across the gateway-to-mesh boundary.
5. Test failure behavior when either the gateway or mesh control plane is unavailable.

The Apache APISIX blog includes an [APISIX Ingress and Istio integration walkthrough](/blog/2021/12/17/exposure-istio-with-apisix-ingress/). It demonstrates the architectural handoff, although its version-specific commands should be checked against current APISIX Ingress Controller and Istio documentation before use.

## Decision Checklist

Before choosing one layer or both, answer these questions:

- Are policies attached primarily to API consumers or to workloads?
- Which traffic paths need identity and encryption?
- Do internal calls bypass the API gateway?
- Does the mesh ingress satisfy the required external API policies?
- Which layer owns retries, timeouts, and traffic splitting?
- Can the team operate and troubleshoot both control planes?
- How will identity and trace context cross the gateway-to-mesh boundary?

An API gateway and a service mesh are complementary when they enforce policies for different identities and traffic paths. They become redundant when both layers are deployed without a clear ownership model. Start with the required trust boundaries and operational responsibilities, then add only the infrastructure needed to enforce them.
