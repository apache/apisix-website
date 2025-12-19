---
title: "Apache APISIX Ingress Controller 2.0: Production-Ready Platform for Modern Traffic Management"
authors:
  - name: Yilia Lin
    title: Technical Writer
    url: https://github.com/Yilialinn
    image_url: https://github.com/Yilialinn.png
keywords:
  - Ingress Controller
  - APISIX Ingress Controller
  - Kubernetes Ingress
  - Gateway API
  - Apache APISIX
description: Apache APISIX Ingress Controller 2.0 delivers comprehensive Gateway API support, flexible multi-data-plane deployment, and etcd-free operation for robust, scalable Kubernetes traffic management.
tags: [Ecosystem]
image: https://static.apiseven.com/2022/10/19/634f6677742a1.png
---

> Apache APISIX Ingress Controller 2.0 is officially released. It delivers comprehensive Gateway API support, flexible multi-data-plane deployment, and etcd-free operation for robust, scalable Kubernetes traffic management.

<!--truncate-->

Built on the high-performance API gateway Apache APISIX, [APISIX Ingress Controller](https://github.com/apache/apisix-ingress-controller) has undergone multiple iterations and validations, now capable of handling large-scale traffic management demands. The Apache APISIX community is pleased to announce the official release of [APISIX Ingress Controller 2.0](https://apisix.apache.org/docs/ingress-controller/overview/). This release delivers substantial enhancements across three foundational pillars—comprehensive compatibility, adaptable architecture, and enterprise-grade stability—empowering users to migrate their technology stacks smoothly and reliably.

## Highlights of Apache APISIX Ingress Controller 2.0

### Support Gateway API

This release achieves a significant milestone in Gateway API coverage with the addition of TCPRoute, UDPRoute, GRPCRoute, and TLSRoute. These extensions provide native, protocol-aware routing for a wide range of traffic types—from traditional HTTP and TCP/UDP to modern gRPC and TLS passthrough/termination. This unified support allows organizations to manage diverse ingress requirements within a consistent, future-ready configuration model, simplifying multi-protocol deployment and easing the transition to full Gateway API adoption.

### Introduce Gateway API Extensions

APISIX Ingress Controller 2.0 introduces a set of official Gateway API extensions under the `apisix.apache.org/v1alpha1` group. Developed and maintained within the Gateway API implementer community, these extensions provide production-grade capabilities that securely and reliably extend the standard specification.

- **GatewayProxy**: It defines the connection between the APISIX Ingress Controller and the APISIX, including auth, endpoints, and global plugins. It is referenced via `parametersRef` in Gateway, GatewayClass, or IngressClass resources.

- **BackendTrafficPolicy**: It is for fine-grained traffic management of backend services, including load balancing, timeouts, retries, and host header handling in the APISIX Ingress Controller.

- **Consumer**: It defines API consumers and their credentials, enabling authentication and plugin configuration for controlling access to API endpoints.

- **PluginConfig**: It defines reusable plugin configurations that can be referenced by other resources like HTTPRoute, enabling separation of routing logic and plugin settings for better reusability and manageability.

- **HTTPRoutePolicy**: It configures advanced traffic management and routing policies for HTTPRoute or Ingress resources, enhancing functionality without modifying the original resources.

These extensions offer a standardized, vendor-supported path to leverage advanced APISIX features directly within the Gateway API ecosystem.

### Support APISIX Standalone API-Driven Mode

APISIX Ingress Controller 2.0 offers a lightweight, etcd-free deployment option through its Standalone [API-Driven Mode](https://apisix.apache.org/docs/apisix/deployment-modes/#api-driven).

This deployment paradigm stores routing configurations entirely in memory rather than in a configuration file, eliminating reliance on external databases. Updates are performed through a dedicated Standalone Admin API, which replaces the full configuration in a single operation and takes effect immediately via hot reloading, without requiring a restart.

This mode is designed specifically for the APISIX Ingress Controller and is primarily intended for integration with [ADC (API Declarative CLI)](https://github.com/api7/adc).

> ⚠️ This mode is intended for use with APISIX Ingress Controller and ADC. Direct usage without fully understanding its internal behavior is not recommended.

### Support Multi-Data-Plane Deployment Mode

This release introduces flexible deployment options supporting multiple data plane modes, enabling a single ingress controller to manage several independent APISIX instances. This approach is ideal for environments requiring strict isolation—such as multi-tenancy, staging vs. production, or region-based routing—while maintaining centralized control.

#### Admin API Mode

In the traditional deployment approach, APISIX uses etcd as its configuration center, allowing administrators to dynamically manage routes, upstreams, and other resources through RESTful APIs. It supports distributed cluster deployments with real-time configuration synchronization.

<div align="center">
<img alt="APISIX Ingress Controller Admin API Mode" style="width: 60%" src="https://static.api7.ai/uploads/2025/12/19/lX98Vcaj_apisix-ingress-controller-2-admin-api-mode.webp"></img>
</div>

#### Standalone Mode (Experimental)

APISIX can also run independently without relying on etcd, which is especially well‑suited for Kubernetes and single‑node deployments. It operates in two sub‑modes:

- **File-driven**: Configuration is managed through `conf/apisix.yaml` files
- **API-driven**: Configuration is stored in memory and fully managed through the dedicated `/apisix/admin/configs` endpoint

This mode is particularly suitable for Kubernetes environments and single-node deployments, where the API-driven memory management approach combines the convenience of traditional Admin API with the simplicity of Standalone mode.

<div align="center">
<img alt="APISIX Ingress Controller Standalone Mode" style="width: 60%" src="https://static.api7.ai/uploads/2025/12/19/8IxjQgCP_apisix-ingress-controller-2-standalone-mode.webp"></img>
</div>

This multi-mode strategy empowers organizations to tailor their ingress architecture to diverse requirements without sacrificing manageability or control.

## Conclusion

Apache APISIX Ingress Controller 2.0 represents a significant evolution in Kubernetes ingress management, delivering a robust platform built for the complexity of modern, multi-protocol applications. By uniting comprehensive Gateway API support, extensible configuration through official API extensions, a lightweight standalone deployment mode, and versatile multi-data-plane management, this release provides a cohesive and powerful foundation for dynamic cloud environments.

Whether you are standardizing ingress across diverse workloads, seeking greater architectural flexibility, or requiring enterprise-grade stability at scale, APISIX Ingress Controller 2.0 offers a forward-looking solution that simplifies operations without compromising capability. It stands as a testament to the community-driven innovation within the Apache APISIX ecosystem, designed to meet today's demands while adapting to tomorrow's challenges.

> For a complete list of features and changes, please refer to the [Release Changelog](https://github.com/apache/apisix-ingress-controller/blob/2.0.0/CHANGELOG.md#200).
