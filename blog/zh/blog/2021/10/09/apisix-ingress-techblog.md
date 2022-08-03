---
title: "从概念到实践帮你快速上手 Apache APISIX Ingress"
author: "张晋涛"
authorURL: "https://github.com/tao12345666333"
authorImageURL: "https://avatars.githubusercontent.com/u/3264292?v=4"
date: 2021-10-09
keywords: 
- Apache APISIX
- API 网关
- Ingress
- Kubernetes
- 自定义资源
description: 本文详细讲解了 API 网关 Apache APISIX Ingress 的定义以及该项目与 K8s Ingress NGINX 不同和优势，也为大家介绍了流量切分，配置认证、资源扩展等多个场景。
tags: [Ecosystem, Community]
---

>作者张晋涛，Apache APISIX Committer、Kubernetes Ingress Nginx Reviewer，多个云原生开源项目的贡献者。

<!--truncate-->

## Apache APISIX Ingress 概览

### Apache APISIX Ingress 定义

在 K8s 生态中，Ingress 作为表示 K8s 流量入口的一种资源，想要让其生效，就需要有一个 Ingress Controller 去监听 K8s 中的 Ingress 资源，并对这些资源进行相应规则的解析和实际承载流量。在当下趋势中，像 Kubernetes Ingress Nginx 就是使用最广泛的 Ingress Controller 实现。

而 APISIX Ingress 则是另一种 Ingress Controller 的实现。跟 Kubernetes Ingress Nginx 的区别主要在于 APISIX Ingress 是以 Apache APISIX 作为实际承载业务流量的数据面。如下图所示，当用户请求到具体的某一个服务/API/网页时，通过外部代理将整个业务流量/用户请求传输到 K8s 集群，然后经过 APISIX Ingress 进行后续处理。

![APISIX Ingress 架构](https://static.apiseven.com/202108/1633765366863-8964a75c-0c16-4683-ad9b-c8c83ac64ec6.png)

从上图可以看到，APISIX Ingress 分成了两部分。一部分是 APISIX Ingress Controller，作为控制面它将完成配置管理与分发。另一部分 APISIX Proxy Pod 负责承载业务流量，它是通过 CRD（Custom Resource Definitions）的方式实现的。Apache APISIX Ingress 除了支持自定义资源外，还支持原生的 K8s Ingress 资源。

### Apache APISIX 简述

前边我们提到了 APISIX Ingress 是采用 Apache APISIX 作为实际承载业务流量的数据面，那么 Apache APISIX 项目又是做什么的呢？

![Apache APISIX 架构](https://static.apiseven.com/202108/1633765402660-6b20dd1c-bef6-4dcb-974e-fa80334e0623.png)

Apache APISIX 是 Apache 基金会旗下的顶级开源项目，也是当前最活跃的开源网关项目。作为一个动态、实时、高性能的开源 API 网关，Apache APISIX 提供了负载均衡、动态上游、灰度发布、服务熔断、身份认证、可观测性等丰富的流量管理功能。

Apache APISIX 可以帮助企业快速、安全地处理 API 和微服务流量，比如限流认证、日志安全功能，以及支持丰富的自定义插件。目前也与很多开源项目如 Apache SkyWalking、Prometheus 等之类的组件进行了相关集成。

## APISIX Ingress vs K8s Ingress Nginx

因为本人同时参与到了 APISIX Ingress 与 K8s Ingress Nginx 两个项目的开发和维护，所以很多人也会问我，这两个项目做比较的话，到底该如何选择？或者说为什么有了 K8s Ingress Nginx 还要再做 APISIX Ingress。

### 配置层面

在 APISIX Ingress 中，我们增加了一些丰富且灵活的配置，比如通过单个配置文件去实现灰度部署。但在 K8s Ingress Nginx 中去实现如上效果的话，最少也需要有两个 Ingress 资源文件才可以完成。

### 丰富度

在丰富度上，由于 Apache APISIX 本身的自带功能丰富且允许多种插件扩展使用，所以使用 APISIX Ingress 就可以省去自己额外配置功能的繁琐步骤，可以将更多的时间投入到实际开发中。

### 架构分离

APISIX Ingress 采用了数据面与控制面的分离架构，所以用户可以选择将数据面部署在 K8s 集群内部/外部。但 K8s Ingress Nginx 是将控制面和数据面放在了同一个 Pod 中，如果 Pod 或控制面出现一点闪失，整个 Pod 就会挂掉，进而影响到业务流量。

这种架构分离，给用户提供了比较方便的部署选择，同时在业务架构调整场景下，也方便进行相关数据的迁移与使用。

## APISIX Ingress 特性详解

由于 Apache APISIX 是一个全动态的高性能网关，所以在 APISIX Ingress 自身就支持了全动态，包括路由、SSL 证书、上游以及插件等等。

同时 APISIX Ingress 还具有以下特性：

* 支持 CRD，更容易理解声明式配置；同时状态检查可保证快速掌握声明配置的同步状态
* 支持高级路由匹配规则以及自定义资源，可与 Apache APISIX 官方 50 多个插件 & 客户自定义插件进行扩展使用
* 支持 K8s 原生 Ingress 配置
* 支持流量切分
* 支持 gRPC plaintext 与 TCP 4 层代理
* 服务自动注册发现，无惧扩缩容
* 更灵活的负载均衡策略，自带健康检查功能

以下我们将从 CRD 与自定义资源层面进行详细的介绍。

### CRD 扩展

在前面的介绍中我们提到了 CRD，那么 APISIX Ingress 是如何使用 CRD 扩展的？

![CRD 扩展](https://static.apiseven.com/202108/1633765449155-0e25f1d0-e62a-4c4f-ab9a-019f609ed5fb.png)

从用户层面来看，当 Client 发起请求，到达 Apache APISIX 后，会直接把相应的业务流量传输到后端（如 Service Pod），从而完成转发过程。此过程不需要经过 Ingress Controller，这样做可以保证一旦有问题出现，或者是进行变更、扩缩容或者迁移处理等，都不会影响到用户和业务流量。

同时在配置端，用户通过 kubectl apply，可将自定义 CRD 配置应用到 K8s 集群。Ingress Controller 会持续 watch 这些资源变更，来将相应配置应用到 Apache APISIX。

### 自定义资源

APISIX Ingress 目前已经支持的自定义资源主要是以下 5 类，涉及到路由、上游、消费者、证书相关和集群公共配置的相关类别。

#### APISIX Route（路由）

自定义资源 APISIX Route 中 `spec` 属性的顶级配置是 `http`。但其实 `spec` 是同时支持两种配置的，一种是下图示例的 `spec.http`，主要用于 7 层代理；另一种是 `spec.stream`，用于 4 层代理。在配置文件中，我们首先为其自定义了一项规则，即 match 下的相关参数。

![APISIX Route](https://static.apiseven.com/202108/1633765501091-e64ff6e5-5e3e-4b0f-adcc-7ff418edb52c.png)

如上图后端配置示例使用了同一个 Service，实际使用中大家根据场景进行调整即可。需要注意的是，`weight` 属性是用来配置相关 Service 权重。通过以上配置，从而实现一套完整的路由自定义资源。

#### APISIX Upstream（上游）

在配置 APISIX Upstream 时，需要注意 `name` 的内容要与 K8s 集群的 Service 保持一致，这样可以保证后续 APISIX Ingress Controller 准确匹配其相应流量。

![APISIX Upstream](https://static.apiseven.com/202108/1633765534667-3ce978ae-2d85-4de7-8a57-3c5be5f57604.png)

在配置文件中，`spec.loadbalancer` 主要负责负载均衡策略的设置，有多种策略模式可供选择。`spec.schem`e 则是协议类型的配置，目前只支持 HTTP 和 gRPC 协议。`spec.healthCheck` 主要是对健康检查功能进行设置，比如设置其活跃状态、生效协议与路径和最终反馈等参数配置。

#### APISIX Consumer（消费者）

在 APISIX Consumer 配置中，主要是增加了认证相关的功能，比如 `spec.authParameter`，目前该配置参数支持 `BasicAuth` 与 `KeyAuth` 这两种比较常见的认证类型。

![APISIX Consumer](https://static.apiseven.com/202108/1633765580844-9d17d699-fa45-4b43-9ed9-f8ea9c9cab48.png)

通过 `value` 可直接去配置相关的 `username` 和 `password`，或者直接使用 `secret` 进行配置，相比前者的明文配置会更安全一些。

#### APISIX TLS（证书）

APISIX TLS 主要是为了进行证书的管理。如示例所示，用户可以通过 `hosts` 来配置多个域名，`secret` 下的参数就是对应的配置证书。

![APISIX TLS](https://static.apiseven.com/202108/1633765614989-88b363c2-3805-4159-abfc-bac1b055559b.png)

同时 APISIX TLS 还配有 `spec.client`，用于进行 mTLS 双向认证的配置。

#### APISIX Config 相关

关于自定义资源支持的 Config 类型我们会从两个方面进行描述。

![APISIX Cluster Config](https://static.apiseven.com/202108/1633765647605-6ad1ba44-06fd-475d-a6ae-925b3cc9c1ce.png)

一种是 APISIX Cluster Config，它主要用于一些通用配置。目前支持在 K8s 或者 Apache APISIX 中全局使用 Prometheus 插件/全局配置 SkyWalking，后续开发中也会去增加一些其他的通用配置。

另一种就是我们现在正在 PR 中的 [APISIX Plugin Config](https://github.com/apache/apisix-ingress-controller/pull/689)。大家如果感兴趣的话，也可以点击链接来一起参与讨论。Plugin Config 主要是将通用的插件配置统一集合在一起，比如一些同样的配置，用户就可以通过 APISIX Plugin Config 同时应用在多个路由当中，省去了额外多项独立配置的繁琐步骤。

## APISIX Ingress 上手实践

目前大家可以通过 [Helm Charts](https://github.com/apache/apisix-helm-chart) 的方式来进行 APISIX Ingress 的部署。通过一条命令，就可以同时把 Apache APISIX 以及 APISIX Ingress，包括 Apache APISIX 所需要用到的 etcd 全部部署好，步骤非常简单。

![安装步骤](https://static.apiseven.com/202108/1633765686788-156b0641-aa78-4de8-833d-a187772470a5.png)

### 实践场景一：流量切分

通过使用 APISIX Ingress 可以实现按比例进行流量切分的效果，具体操作如下：

#### 步骤一：配置 APISIX Upstream

![配置 APISIX Upstream](https://static.apiseven.com/202108/1633765722480-edf8b1ec-98a4-4c18-bd3d-843c73f132bc.png)

#### 步骤二：配置 APISIX Route

通过在 `backends` 中去配置 `subset` 和 `weight`，来实现用户请求流量进入时的分流。如下图示例就是 90% 的流量会进入到 v1 中，10% 的流量进入到 v2 中。

![配置 APISIX Route](https://static.apiseven.com/202108/1633765771090-1e51e66c-0979-43b4-852b-28f2284a5d4e.png)

通过以上两步，就可以十分方便地按比例进行流量切分，实现类似灰度发布等场景需求。
更多具体操作细节也可参考：[Apache APISIX Ingress Controller 中的流量切分](https://www.apiseven.com/zh/blog/traffic-split-in-apache-apisix-ingress-controller)。

### 实践场景二：配置认证

如果想在 APISIX Ingress 中为某些路由配置 Basic Auth，可以参考如下操作：

#### 步骤一：创建 APISIX Consumer 资源

如前文所提到的，可以在 APISIX Consumer 配置中增加 `basicAuth`，并为其指定用户名和密码。

![创建资源](https://static.apiseven.com/202108/1633765803898-7a30c663-7ba8-4064-8772-a19c56cef191.png)

#### 步骤二：配置 APISIX Route，增加认证相关参数

在自定义资源 APISIX Route 中，通过在后端添加 `authenticatio`n，将其开启并指定认证类型即可。

![增加认证参数](https://static.apiseven.com/202108/1633765828596-9a0f0142-f201-4004-b85d-a34de4ee13dc.png)

通过以上步骤，就可以实现使用 Consumer 去完成相关配置认证。

### 实践场景三：K8s 资源扩展

正如我们在开头提到过的，APISIX Ingress 不仅支持自定义资源，还同时支持 K8s 原生的 Ingress 资源。

![K8s 原生资源](https://static.apiseven.com/202108/1633765859904-bc48dcc5-cd7a-4875-b248-5c4c64a2d7c5.png)

如上图是 K8s Ingress 资源。通常情况下如果想要在资源上做 rewrite，可以通过增加 annotation 配置属性。这样当用户携带 `httpbin.org` 请求时，就可以通过路径 /sample 将它重定向到 /ip。

当上述需求使用 APISIX Ingress 时，只需在 Ingress 增加一个 `kubernetes.io/ingress.class: apisix`，去指定 APISIX Ingress Controller 去监听这个资源，同时通过配置  `k8s.apisix.apache.org/rewrite-target: "/ip"`，就可以完成重定向到 /ip 路径。

![APISIX Ingress 资源](https://static.apiseven.com/202108/1633765888876-d2d252ee-706c-49f3-b630-03a7e72a0620.png)

以上示例只是目前 APISIX Ingress 对于原生 K8s Ingress 支持的一种方式，更多示例大家可以查看[具体文档](https://apisix.apache.org/docs/ingress-controller/practices/proxy-the-httpbin-service-with-ingress)进行参考使用。

## 未来规划

之后 APISIX Ingress 将会继续在功能与生态上进行更新，目前阶段已经完成了 [APISIX Ingress 与 Cert-manager 集成](https://github.com/apache/apisix-ingress-controller/blob/master/docs/en/latest/practices/manage-certificates-with-cert-manager.md)，后续将逐步实现以下目标：

1. 完成 Kubernetes V1.22+ 与 CRD V1 版本的适配支持（已经完成，即将在 APISIX Ingress V1.3 版本 中发布）
2. 支持 Gateway API（预计在 Q4 阶段实现）
3. 扩展新架构，以便于用户在不需要使用 etcd 的情况下，可以正常使用 APISIX Ingress
4. 丰富产品生态，扩展 APISIX Ingress 社区

最后也希望大家能够多多地参与到项目中来，比如每两周的周三下午 2 点都会有一次 APISIX Ingress 社区会议，会跟大家同步一下当前的项目进展或者遇到的问题。大家可以持续关注 Apache APISIX 视频号，届时可以直接参与社区会议直播。

[点此查看](https://github.com/apache/apisix-ingress-controller/issues/614)更多关于 APISIX Ingress 社区会议细节。
