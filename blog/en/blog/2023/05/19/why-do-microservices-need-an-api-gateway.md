---
title: Why Microservices Use an API Gateway
authors:
  - name: API7.ai
    title: Author
    url: https://github.com/api7
    image_url: https://avatars.githubusercontent.com/u/61078451?s=200&v=4
keywords:
  - Apache APISIX
  - Microservices
  - Microservices API Gateway
  - API Gateway Architecture
description: Learn when microservices need an API gateway, which responsibilities belong at the gateway, and when a simpler alternative is enough.
tags: [Ecosystem]
image: https://static.apiseven.com/uploads/2023/02/16/CHqaC3Xw_Ecosystem%20%E6%A8%A1%E6%9D%BF1.png
---

An API gateway can give clients one entry point to a set of microservices and apply shared traffic policies before requests reach those services. It is useful in many microservice systems, but it is not a requirement for every architecture. The decision depends on client exposure, traffic policies, team ownership, and operational complexity.

<!--truncate-->

## What Is a Microservice Architecture?

A microservice architecture divides an application into independently deployable services organized around business capabilities. Services commonly communicate through synchronous APIs, asynchronous messages, or both.

This approach can let teams release and scale parts of a system independently. It also introduces distributed-system concerns: network failures, service discovery, end-to-end observability, identity propagation, versioning, and consistency across service boundaries. A gateway addresses some edge-traffic concerns, but it does not solve every microservice challenge.

## What Does an API Gateway Do?

An API gateway receives client traffic, matches it to a route, and proxies it to an upstream service. Depending on the gateway and its configuration, it can also apply policies such as:

- client authentication and coarse-grained authorization;
- rate limits, request-size limits, and other traffic controls;
- TLS termination and certificate management;
- request or response transformation;
- load balancing and health-based routing;
- metrics, access logs, and tracing integration;
- canary or weighted routing between service versions.

The gateway is part of the request path. Its availability, capacity, configuration security, and failure behavior therefore need the same engineering attention as other production infrastructure.

## Why Put a Gateway in Front of Microservices?

### Give external clients a stable entry point

Without a gateway or another edge proxy, clients may need to know the location and interface of each exposed service. A gateway can keep internal service addresses private and present stable public routes while services move or scale behind it.

This indirection helps, but it is not a substitute for API versioning and compatibility. A gateway can route versions; service owners still need to design and deprecate interfaces deliberately.

### Apply shared edge policies consistently

Authentication, traffic limits, request validation, and telemetry often need a consistent enforcement point. Implementing the same edge policy independently in every service can produce drift and repeated maintenance.

Centralization should be selective. Business authorization rules usually require domain context and often belong in the service as well. A gateway check does not remove the need for service-to-service identity, authorization, or input validation behind the gateway.

### Protect upstream capacity

Rate limits, concurrency controls, timeouts, and circuit-breaking policies can reject or contain some harmful traffic before it consumes service capacity. These policies must be based on measured service limits and realistic failure modes. A rate limit alone cannot guarantee availability, and an incorrectly configured retry policy can amplify an outage.

### Improve traffic visibility

A gateway can generate consistent access logs and traffic metrics for requests that pass through it. Distributed traces can then connect gateway spans with downstream services when trace context is propagated correctly.

Gateway telemetry is only one view. It does not reveal internal asynchronous work or service-to-service calls that bypass the gateway, so services and message infrastructure still need their own instrumentation.

### Change routing without changing clients

Gateways can support weighted traffic splitting, header-based routing, and controlled migration between upstream versions. This is useful for canary releases and service decomposition, provided that the configuration is reviewed, tested, and easy to roll back.

## When You May Not Need an API Gateway

A gateway adds another component and another policy layer. A simpler option may be sufficient when:

- the system has one internal client and only a few services;
- no API is exposed outside a trusted network boundary;
- an existing ingress proxy already provides the required routing and TLS features;
- service-mesh ingress or a cloud load balancer covers the current use case;
- the team cannot yet operate the gateway reliably.

Direct client-to-service access, a reverse proxy, an ingress controller, and a gateway are design choices with overlapping capabilities. Start from concrete requirements rather than adding a gateway because the architecture is called “microservices.”

## Gateway Responsibilities vs Service Responsibilities

Clear ownership prevents a gateway from becoming a monolithic business-logic layer.

| Concern | Typical gateway role | Typical service role |
| --- | --- | --- |
| Authentication | Validate supported client credentials or tokens | Enforce identity requirements for internal calls where needed |
| Authorization | Apply route- or consumer-level policy | Enforce resource- and domain-level permissions |
| Rate limiting | Protect shared entry points and upstream capacity | Apply business quotas or workload-specific limits |
| Validation | Enforce basic protocol, size, or schema constraints | Validate domain rules and state transitions |
| Observability | Record edge traffic and propagate trace context | Instrument internal work and business outcomes |
| Composition | Perform limited protocol or payload adaptation | Own workflows and business orchestration |

Avoid putting long-running orchestration or domain decisions in gateway plugins merely to centralize them. That increases coupling and makes the traffic layer harder to operate and test.

## Common Architecture Risks

### A single unmanaged gateway failure domain

Deploy enough data-plane capacity across appropriate failure domains, define health checks, and test behavior when the control plane or configuration store is unavailable. “Using a gateway” does not itself create high availability.

### One policy for every service

Different upstreams have different latency, capacity, data sensitivity, and client behavior. Use route- or consumer-specific controls where the risk justifies them, and preserve an auditable default policy.

### Treating the gateway as the only security boundary

Protect administrative APIs and configuration stores, restrict network access, rotate secrets, and secure service-to-service communication. Services should not blindly trust client-controlled identity headers; the architecture must ensure those headers are removed or set only by a trusted component.

### Unbounded gateway customization

Plugins run in a critical traffic component. Review custom code, constrain network and secret access, test failure behavior, and keep expensive or blocking work out of the request path.

## Using Apache APISIX with Microservices

[Apache APISIX](https://apisix.apache.org/) is an open-source API gateway that provides dynamic routing and a plugin model for traffic management, authentication, observability, and protocol handling. It can run as a gateway for services deployed on virtual machines, containers, or Kubernetes, depending on the selected deployment architecture.

A practical evaluation should verify:

1. how routes and upstreams are configured and promoted between environments;
2. which authentication and authorization model protects each API;
3. how APISIX discovers or receives updates about service endpoints;
4. what telemetry is exported and how sensitive data is handled;
5. how the data plane behaves during upstream, network, and control-plane failures;
6. how upgrades, backups, rollbacks, and incident response are performed.

Start with the [APISIX getting-started guide](https://apisix.apache.org/docs/apisix/getting-started/) and evaluate only the [plugins](https://apisix.apache.org/docs/apisix/plugins/) required by the workload. Fewer well-tested policies are safer than enabling features without a clear owner.

## Frequently Asked Questions

### Do all microservices need to pass through one gateway?

No. External or north-south traffic commonly enters through a gateway, while internal service-to-service traffic may use direct discovery, a service mesh, or another controlled path. The topology should reflect trust boundaries and operating requirements.

### Is an API gateway the same as a service mesh?

No. Their capabilities can overlap, but a gateway usually focuses on client-to-service entry traffic and API policies. A service mesh generally focuses on communication between workloads. Some systems use both; smaller systems may need only one.

### Does a gateway remove authentication code from every service?

It can centralize supported client authentication, but services may still need authorization and identity checks, especially for internal calls and resource-level permissions. Design explicit trust and identity propagation rules.

### Can an API gateway orchestrate multiple microservices?

Some gateways can transform or chain requests through plugins, but business workflows are usually easier to test and own in an application or orchestration service. Keep gateway composition limited and measurable.

## Conclusion

Microservices do not automatically require an API gateway. A gateway is valuable when a system needs a stable entry point, consistent edge policies, upstream protection, traffic observability, or controlled routing across many services. It is unnecessary overhead when simpler infrastructure already satisfies those requirements.

Define the boundary, assign each policy to the gateway or service deliberately, and test the complete failure model before making the gateway a critical production dependency.
