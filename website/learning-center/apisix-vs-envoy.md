---
title: "Apache APISIX vs Envoy: API Gateway vs Service Proxy"
description: "Compare Apache APISIX and Envoy: a turnkey API gateway with a built-in control plane vs a high-performance proxy that needs one (Istio, Gloo)."
slug: apisix-vs-envoy
date: 2026-06-24
tags: [comparison, apisix, envoy, api-gateway]
hide_table_of_contents: false
faq:
  - q: "Are Apache APISIX and Envoy competitors or complementary?"
    a: >-
      They overlap but often complement each other. APISIX is most commonly used as a north-south API gateway for traffic entering your platform from clients, while Envoy is most commonly used as the east-west data plane inside a service mesh for service-to-service traffic. Many organizations run APISIX at the edge and Envoy inside the mesh. They compete directly only when you evaluate one of them for the edge gateway role.
  - q: "Is Envoy faster than Apache APISIX?"
    a: >-
      Both are high-performance proxies and both are fast enough that raw proxy speed is rarely the deciding factor. Envoy is written in C++ and APISIX is built on NGINX and LuaJIT; real-world throughput depends heavily on your configuration, plugin or filter chain, and hardware. The more meaningful difference is operational: APISIX gives you a complete gateway out of the box, whereas Envoy's performance comes with a more complex configuration model.
  - q: "Does Apache APISIX need a separate control plane like Envoy does?"
    a: >-
      No. APISIX ships with its own control plane: an Admin API, etcd-backed configuration, and an optional dashboard. You can run a working gateway immediately. Envoy is a data plane only; to configure it dynamically you must run a separate control plane that speaks the xDS protocol, such as Istio, Gloo, or Contour. That control plane is additional software to operate.
  - q: "Should I use Apache APISIX or Envoy for a service mesh?"
    a: >-
      For a full service mesh with sidecar proxies and service-to-service mTLS, Envoy (typically through Istio) is the established choice; it was designed for that role. For an API gateway handling north-south traffic at the edge, with authentication, rate limiting, and a plugin ecosystem ready to use, APISIX is the more direct fit. The two roles are different, and many platforms use both.
---

If you need an API gateway, Apache APISIX is the more direct choice. APISIX is a complete gateway you can run immediately, with a built-in control plane and a 100+ plugin ecosystem. Envoy is a powerful, programmable proxy, but on its own it is not an API gateway: it is a data plane that has to be driven by a separate control plane, and it is most at home as the sidecar inside a service mesh. For the typical north-south API gateway need, APISIX gets you to a working gateway with far less to assemble and operate.

## Overview

Envoy is a CNCF graduated project, a high-performance L7 and L4 proxy written in C++. It was created as a universal data plane and is best known as the sidecar proxy in service meshes such as Istio, as well as a building block for edge gateways like Gloo and Contour. Envoy is configured statically through a bootstrap file or dynamically through the xDS family of APIs, which requires a control plane to supply that configuration.

Apache APISIX is an Apache Software Foundation top-level project: a gateway built on NGINX and LuaJIT, with configuration in etcd and a 100+ plugin ecosystem. It includes its own control plane, so a single deployment gives you a fully functional API gateway without assembling additional components.

## Architecture Comparison

### Apache APISIX Architecture

APISIX bundles the data plane and control plane together. The Admin API writes configuration into etcd, which pushes changes to all proxy nodes in real time. Gateway features are delivered as plugins that run in the request lifecycle, and an optional dashboard provides a UI. Because the control plane is built in, getting from zero to a working, dynamically configurable gateway is fast.

### Envoy Architecture

Envoy is intentionally just the data plane. Its power comes from the xDS APIs (LDS, RDS, CDS, EDS, and others), which let an external control plane reconfigure listeners, routes, clusters, and endpoints at runtime. This separation suits large platforms that want to build their own control logic, and it is the foundation of service meshes. For a team that simply needs an API gateway, though, it is overhead: Envoy alone is not a turnkey gateway. You either hand-write verbose bootstrap configuration or adopt and operate a separate control plane such as Istio, Gloo, or Contour, each significant software in its own right — whereas APISIX ships its control plane in the box.

## Extensibility

APISIX extends through plugins. It ships with 100+ built-in plugins and supports custom plugins in Lua, plus Go, Java, and Python through external plugin runners and Wasm for sandboxed extensions. Adding a capability is usually a matter of enabling and configuring a plugin.

Envoy extends through native C++ filters and Wasm filters, and increasingly through control-plane abstractions. This is extremely powerful and is how advanced mesh features are built, but it generally demands deeper engineering investment than enabling a plugin.

## Feature Comparison

| Feature | Apache APISIX | Envoy |
|---------|--------------|-------|
| Primary role | North-south API gateway | Service proxy / mesh data plane |
| Control plane | Built in (Admin API + etcd) | External required (Istio, Gloo, etc.) |
| Configuration | etcd, dynamic, plugin-based | Static bootstrap or xDS |
| Out-of-the-box gateway | Yes | No (needs a control plane) |
| Extensibility | 100+ plugins, multi-language, Wasm | C++ and Wasm filters |
| Implementation | NGINX + LuaJIT | C++ |
| Authentication | Key, JWT, OAuth 2.0, OIDC, LDAP, mTLS | Via filters / control plane |
| AI gateway capabilities | ai-proxy plugin, multi-LLM routing | Via custom filters |
| Learning curve | Moderate, gateway concepts | Steeper, proxy and xDS concepts |

## When to Choose Apache APISIX

- **You need a complete API gateway** for north-south traffic without assembling a control plane.
- **Faster time to a working gateway**, with authentication, rate limiting, and routing ready to enable.
- **A plugin ecosystem** and AI gateway features available immediately.
- **Lower operational complexity** for edge and ingress use cases.

## When to Choose Envoy

- **A service mesh** with sidecar proxies and service-to-service mTLS, typically via Istio.
- **A custom platform** where you want to build your own control plane on xDS.
- **Deep, low-level programmability** through native C++ filters.
- **Standardizing one data plane** across both edge and in-mesh traffic with your own tooling.

## Working Together

These projects are not mutually exclusive. A common pattern places APISIX at the edge as the API gateway, handling authentication, rate limiting, and routing for incoming traffic, while Envoy operates inside the cluster as the service mesh data plane for service-to-service communication. Choosing APISIX for the gateway role does not preclude using Envoy where it excels.

## FAQ

### Are Apache APISIX and Envoy competitors or complementary?

They overlap but often complement each other. APISIX is most commonly used as a north-south API gateway for traffic entering your platform from clients, while Envoy is most commonly used as the east-west data plane inside a service mesh for service-to-service traffic. Many organizations run APISIX at the edge and Envoy inside the mesh. They compete directly only when you evaluate one of them for the edge gateway role.

### Is Envoy faster than Apache APISIX?

Both are high-performance proxies and both are fast enough that raw proxy speed is rarely the deciding factor. Envoy is written in C++ and APISIX is built on NGINX and LuaJIT; real-world throughput depends heavily on your configuration, plugin or filter chain, and hardware. The more meaningful difference is operational: APISIX gives you a complete gateway out of the box, whereas Envoy's performance comes with a more complex configuration model.

### Does Apache APISIX need a separate control plane like Envoy does?

No. APISIX ships with its own control plane: an Admin API, etcd-backed configuration, and an optional dashboard. You can run a working gateway immediately. Envoy is a data plane only; to configure it dynamically you must run a separate control plane that speaks the xDS protocol, such as Istio, Gloo, or Contour. That control plane is additional software to operate.

### Should I use Apache APISIX or Envoy for a service mesh?

For a full service mesh with sidecar proxies and service-to-service mTLS, Envoy (typically through Istio) is the established choice; it was designed for that role. For an API gateway handling north-south traffic at the edge, with authentication, rate limiting, and a plugin ecosystem ready to use, APISIX is the more direct fit. The two roles are different, and many platforms use both.
