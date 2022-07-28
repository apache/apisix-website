---
title: "初探 Kubernetes Service APIs"
author: "金卫"
authorURL: "https://github.com/gxthrj"
authorImageURL: "https://avatars2.githubusercontent.com/u/4413028?s=400&u=e140a6d2bf19c426da6498b8888edc96509be649&v=4"
keywords:
- API 网关
- APISIX
- Apache APISIX
- Kubernetes Service APIs
description: 本文介绍了 Kubernetes Service APIs 的基本概念、主要特点、以及如何管理资源读写权限和主要的扩展点，以及推行会带来的改变。
tags: [Ecosystem]
---

> 本文通过提问的方式，对 Kubernetes Service APIs 做了一些基本介绍，从整体来看，Kubernetes Service APIs 提炼了很多 ingress 的最佳实践，比如表达能力的增强，其实就是扩展了 Route 的能力，再比如 BackendPolicy 对象，可以为 upstream 指定几乎所有的 Kubernetes 后端资源。

<!--truncate-->

> Source:
>
> - https://github.com/apache/apisix
> - https://github.com/apache/apisix-ingress-controller

## 前言

笔者是 Apache APISIX PMC，也是 Apache APISIX Ingress Controller Founder，通过调研和社区交流，打算在 Apache APISIX Ingress Controller 的后期版本中逐步支持 Kubernetes Service APIs.

我们知道 Kubernetes 为了将集群内部服务暴露出去，有多种方案实现，其中一个比较受大众推崇的就是 Ingress。Ingress 作为一种对外暴露服务的标准，有相当多的第三方实现，每种实现都有各自的技术栈 和 所依赖的网关的影子，相互之间并不兼容。

为了统一各种 Ingress 的实现，便于 Kubernetes 上统一管理，[SIG-NETWORK](https://github.com/kubernetes/community/tree/master/sig-network) 社区推出了[Kubernetes Service APIs](https://gateway-api.sigs.k8s.io/) 一套标准实现，称为第二代 Ingress 。

## 主题描述

本文从几个问题入手，对 Kubernetes Service APIs 的基本概念进行介绍。

## 介绍

### Kubernetes Service APIs 号称第二代 Ingress 技术，到底在哪些方面优于第一代

Kubernetes Service APIs 设计之初，目标并没有局限在 Ingress， 而是为了增强 service networking，着重通过以下几点来增强：表达性、扩展性、RBAC。

1. 更强的表达能力，例如 可以根据 header 、weighting 来管理流量

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

2. 增强了扩展能力，Service APIs 提出多层 API 的概念，各层独立暴露接口，方便其他自定义资源与 API 对接，做到更细粒度（API 粒度）的控制。

![api-model](https://gateway-api.sigs.k8s.io/images/api-model.png)

3. 面向角色 RBAC：多层 API 的实现，其中一个思想就是从使用者的角度去设计资源对象。这些资源最终会与 Kubernetes 上运行应用程序的常见角色进行映射。

## Kubernetes Service APIs 抽象出了哪些资源对象

Kubernetes Service APIs 基于使用者角色，将定义了以下几种资源：

GatewayClass, Gateway, Route

1. GatewayClass 定义了一组具有通用配置和行为的网关类型

- 与 Gateway 的关系，类似 ingress 中的 ingress.class annotation；

- GatewayClass 定义了一组共享相同配置和行为的网关。每个 GatewayClass 将由单个 controller 处理，controller 与 GatewayClass 是一对多的关系；

- GatewayClass 是 cluster 资源。必须至少定义一个 GatewayClass 才能具有功能网关。

2. Gateway 请求一个可以将流量转换为群集内服务的点。

- 作用：把集群外的流量引入集群内部。这个才是真正的 ingress 实体；

- 它定义了对特定 LB 配置的请求，该配置也是 GatewayClass 的配置和行为的实现；

- Gateway 资源可以由操作员直接创建，也可以由处理 GatewayClass 的 controller 创建；

- Gateway 与 Route 是多对多的关系；

3. Route 描述了通过网关的流量如何映射到服务。

![schema-uml](https://gateway-api.sigs.k8s.io/images/schema-uml.svg)

另外，Kubernetes Service APIs 为了能够灵活的配置后端服务，特地定义了一个 BackendPolicy 资源对象。

通过 BackendPolicy 对象，可以配置 TLS、健康检查 以及指定后端服务类型，比如 service 还是 pod。

## Kubernetes Service APIs 的推行会带来哪些改变

Kubernetes Service APIs 作为一种实现标准，带来了以下改变：

1. 通用性： 可以有多种实现，就像 ingress 有多种实现一样，可以根据网关的特点去自定义 ingress controller，但是他们都有一致的配置结构。一种数据结构，可以配置多种 ingress controller。

2. Class 概念：GatewayClasses 可以配置不同负载均衡实现的类型。这些类 class 使用户可以轻松而明确地了解哪些功能可以用作资源模型本身。

3. 共享网关：通过允许独立的路由资源 HTTPRoute 绑定到同一个 GatewayClass，它们可以共享负载平衡器和 VIP。按照使用者分层，这使得团队可以安全地共享基础结构，而无需关心下层 Gateway 的具体实现。

4. 带类型的后端引用: 使用带类型的后端引用，路由可以引用 Kubernetes Services，也可以引用任何类型的设计为网关后端的 Kubernetes 资源，比如 pod，又或者是 statefulset 比如 DB， 甚至是可访问的集群外部资源。

5. 跨命名空间引用：跨不同命名空间的路由可以绑定到 Gateway。允许跨命名空间的互相访问。同时也可以限制某个 Gateway 下的 Route 可以访问的命名空间范围。

## 目前有哪些 ingress 实现了 Kubernetes Service APIs

目前已知的从代码层面能看到对 Kubernetes Service APIs 资源对象支持的 Ingress 有 Contour, ingress-gce。

## Kubernetes Service APIs 如何管理资源读写权限

Kubernetes Service APIs 按照使用者的维度分为 3 个角色

1. 基础设施提供方 GatewayClass

2. 集群操作人员 Gateway

3. 应用开发者 Route

RBAC（基于角色的访问控制）是用于 Kubernetes 授权的标准。允许用户配置谁可以对特定范围内的资源执行操作。 RBAC 可用于启用上面定义的每个角色。

在大多数情况下，希望所有角色都可以读取所有资源

三层模型的写权限如下。

|                         | GatewayClass | Gateway | Route |
| ----------------------- | ------------ | ------- | ----- |
| Infrastructure Provider | Yes          | Yes     | Yes   |
| Cluster Operators       | No           | Yes     | Yes   |
| Application Developers  | No           | No      | Yes   |

## Kubernetes Service APIs 有哪些扩展点

网关的需求非常丰富，同一个场景实现的方式多种多样，各有利弊。Kubernetes Service APIs 提炼出 多层 资源对象，同时也预留了一些扩展点。

目前 Kubernetes Service APIs 的扩展点基本集中在 Route 上：

- RouteMatch 可以扩展 Route 匹配规则。

- specify Backend 可以扩展特定类型的 后端服务， 除了上面提到的 Kubernetes 资源外，还可以扩展比如 文件系统，函数表达式等。

- Route filter 可以在 Route 的生命周期中增加扩展点，处理 request/response 。

- Custom Route 以上扩展点都不能满足时，可以完全自定义一个 Route。

## 总结

本文通过提问的方式，对 Kubernetes Service APIs 做了一些基本介绍，从整体来看，Kubernetes Service APIs 提炼了很多 ingress 的最佳实践，比如表达能力的增强，其实就是扩展了 Route 的能力，再比如 BackendPolicy 对象，可以为 upstream 指定几乎所有的 Kubernetes 后端资源。当然，项目初期也有不足的地方，目前 Kubernetes Service APIs 虽然已经从大的层面上规定了资源对象，但资源对象内部还有不少细节需要讨论之后再确定，以防止可能出现的冲突场景，结构上存在一定变数。

---

参考:

- https://gateway-api.sigs.k8s.io/
- https://www.apiseven.com/zh/blog/a-first-look-at-kubernetes-service-api
