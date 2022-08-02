---
title: A First Look at Kubernetes Service APIs
author: Wei Jin
authorURL: "https://github.com/gxthrj"
authorImageURL: "https://avatars2.githubusercontent.com/u/4413028?s=400&u=e140a6d2bf19c426da6498b8888edc96509be649&v=4"
keywords:
- API Gateway
- APISIX
- Apache APISIX
- Kubernetes Service APIs
description: This article introduces the basic concepts of Kubernetes Service APIs, their main features, and the changes brought about by their implementation.
tags: [Ecosystem]
---

> This article provides a basic introduction to the Kubernetes Service APIs by asking questions. As a whole, the Kubernetes Service APIs refine many ingress best practices, such as expression enhancements that actually extend the capabilities of Route, and BackendPolicy objects that can specify almost any Kubernetes backend resource for upstream.

<!--truncate-->

## Preface

The author is an Apache APISIX PMC and Apache APISIX Ingress Controller Founder. Through research and community communication, I plan to gradually support Kubernetes Service APIs in later versions of Apache APISIX Ingress Controller.

As we know, Kubernetes has a variety of solutions for exposing services inside the cluster, one of which is Ingress, a standard for exposing services to the public, and there are many third-party implementations of Ingress, each with its own technology stack and dependency on gateways that are not compatible with each other.

To unify the various Ingress implementations and facilitate unified management on Kubernetes, the [SIG-NETWORK](https://github.com/kubernetes/community/tree/master/sig-network) community has launched the [Kubernetes Service APIs](https://gateway-api.sigs.k8s.io/), a set of standard implementations called second-generation Ingress.

## Topic Description

This article provides an introduction to the basic concepts of Kubernetes Service APIs, starting with a few questions.

## Introduction

### Kubernetes Service APIs is called the second generation of Ingress technology, in what ways is it better than the first generation

The Kubernetes Service APIs were designed not to be limited to Ingress, but to enhance service networking by focusing on the following points: expressiveness, scalability, and RBAC.

For example, traffic can be managed based on header, weighting

```text
kind: HTTPRoute
apiVersion: networking.x-k8s.io/v1alpha1
...
matches:
  - path:
      value: "/foo"
    headers:
      values:
        version: "2"
  - path:
      value: "/v2/foo"
```

2. The Service APIs propose the concept of multi-layer APIs, each layer exposes its interface independently to facilitate other custom resources to interface with the APIs and achieve finer granularity (API granularity) control.

![api-model](https://gateway-api.sigs.k8s.io/images/api-model.png)

3. Role-oriented RBAC: One of the ideas behind the multi-tier API implementation is to design resource objects from the user's perspective. These resources are ultimately mapped to common roles for running applications on Kubernetes.

## What resource objects are abstracted by the Kubernetes Service APIs

The Kubernetes Service APIs will define the following kinds of resources based on user roles.

GatewayClass, Gateway, Route

1. GatewayClass defines a set of gateway types with common configuration and behavior

- relationship to the Gateway, similar to the ingress.class annotation in ingress.

- A GatewayClass defines a set of gateways that share the same configuration and behavior. Each GatewayClass will be handled by a single controller, and controllers have a one-to-many relationship with GatewayClass.

- A GatewayClass is a cluster resource. At least one GatewayClass must be defined to have a functional gateway.

2. Gateway requests a point at which traffic can be converted to services within the cluster.

- Role: Bringing traffic from outside the cluster inside the cluster. This is the true ingress entity.

- It defines a request for a specific LB configuration that is also the implementation of the GatewayClass configuration and behavior.

- Gateway resources can be created either directly by the operator or by the controller handling the GatewayClass.

- Gateway and Route are in a many-to-many relationship.

3. the Route describes how traffic passing through the gateway is mapped to a service.

![schema-uml](https://gateway-api.sigs.k8s.io/images/schema-uml.svg)

In addition, the Kubernetes Service APIs define a BackendPolicy resource object in order to enable flexible configuration of backend services.

The BackendPolicy object allows you to configure TLS, health checks, and specify the type of backend service, such as service or pod.

## What changes will come with the implementation of Kubernetes Service APIs

Kubernetes Service APIs, as an implementation standard, brings the following changes.

1. generality: there can be multiple implementations, just like there are multiple implementations of ingress. ingress controllers can be customized based on the characteristics of the gateway, but they all have a consistent configuration structure. A data structure, you can configure a variety of ingress controller.

2. Class concept: GatewayClasses can be configured for different types of load balancing implementations. These class classes allow the user to easily and explicitly understand what functionality can be used as the resource model itself.

3. By allowing independent routing resources HTTPRoute to be bound to the same GatewayClass, they can share load balancers and VIPs. layered by user, this allows teams to safely share infrastructure without having to care about the specific implementation of the lower level Gateway. 4.

4. backend references with types: With backend references with types, routes can reference Kubernetes Services, or any type of Kubernetes resource designed as a gateway backend, such as a pod, or a statefulset such as a DB, or even an accessible cluster external resource.

Cross-namespace references: Routes across different namespaces can be bound to a Gateway, allowing access to each other across namespaces. It is also possible to restrict the range of namespaces that a Route under a Gateway can access.

## What ingress implementations of Kubernetes Service APIs are currently available

The Ingress that are known to support Kubernetes Service APIs resource objects at the code level are Contour, ingress-gce.

## How Kubernetes Service APIs manage resource read and write permissions

The Kubernetes Service APIs are divided into 3 roles based on the user dimension

1. infrastructure provider GatewayClass

2. cluster operator Gateway

3. application developer Route

RBAC (Role Based Access Control) is the standard used for Kubernetes authorization. It allows users to configure who can perform operations on a specific range of resources. RBAC can be used to enable each of the roles defined above.

In most cases, all roles are expected to be able to read all resources

The three-tier model has the following write permissions.

| | GatewayClass | Gateway | Route |
| ----------------------- | ------------ | ------- | ----- |
| Infrastructure Provider | Yes | Yes | Yes |
| Cluster Operators | No | Yes | Yes | Yes | Application Developers | No | No | No
| The Kubernetes Service Provider is a service provider that provides a variety of services to the Kubernetes community.

## What are the extension points for Kubernetes Service APIs

The Kubernetes Service APIs refine the multi-tier resource object, but also leave some extension points open.

Currently, the Kubernetes Service APIs are focused on Route.

- RouteMatch extends Route matching rules.

- Specify Backend extends specific types of backend services, such as file systems, function expressions, etc., in addition to the Kubernetes resources mentioned above.

- Route filter adds extensions to the Route lifecycle to handle requests/response.

- Custom Route can be fully customized if none of the above extensions are met.

## Summary

This article provides a basic introduction to the Kubernetes Service APIs by asking questions. As a whole, the Kubernetes Service APIs refine a lot of ingress best practices, such as the enhancement of expression capabilities, which actually extends the capabilities of the Route, and the BackendPolicy object The Kubernetes Service APIs as a whole refine a lot of ingress best practices, such as the enhanced expressiveness, which actually extends the capabilities of Route, and the BackendPolicy object, which can specify almost all Kubernetes backend resources for upstream. Of course, there are also shortcomings in the early stage of the project. Although the Kubernetes Service APIs have specified the resource objects at a broad level, there are still a lot of details within the resource objects that need to be discussed and then determined to prevent possible conflict scenarios, and there are certain variables in the structure.

Reference:

- https://gateway-api.sigs.k8s.io/
- https://www.apiseven.com/zh/blog/a-first-look-at-kubernetes-service-api
- https://github.com/apache/apisix
- https://github.com/apache/apisix-ingress-controller
