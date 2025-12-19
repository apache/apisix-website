---
title: "Apache APISIX Ingress Controller 2.0：为现代流量管理而生"
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
description: Apache APISIX Ingress Controller 2.0 正式发布，带来全面的 Gateway API 支持、灵活的多数据面部署模式以及无需 etcd 的轻量级运维，以实现更稳健、可扩展的 Kubernetes 流量管理。
tags: [Ecosystem]
image: https://static.apiseven.com/2022/10/19/634f6677742a1.png
---

> Apache APISIX Ingress Controller 2.0 正式发布，带来全面的 Gateway API 支持、灵活的多数据面部署模式以及无需 etcd 的轻量级运维，以实现更稳健、可扩展的 Kubernetes 流量管理。

<!--truncate-->

基于高性能 API 网关 Apache APISIX 构建的 [APISIX Ingress Controller](https://github.com/apache/apisix-ingress-controller)，历经多个版本的迭代与验证，如今已能从容应对大规模流量管理的挑战。我们很高兴地宣布 [APISIX Ingress Controller 2.0](https://apisix.apache.org/zh/docs/ingress-controller/overview/) 正式发布。此版本围绕**全面的兼容性**、**灵活的架构**与**企业级的稳定性**三大核心进行增强，致力于帮助用户平稳、高效地完成技术栈迁移。

## Apache APISIX Ingress Controller 2.0 核心亮点

### 全面支持 Gateway API

本次发布通过新增对 TCPRoute、UDPRoute、GRPCRoute 和 TLSRoute 的支持，实现了支持 Gateway API 的重要里程碑。这些扩展为从传统 HTTP、TCP/UDP 到现代 gRPC 及 TLS 透传/终止等多种流量类型，提供了原生且感知协议的路由能力。通过这种统一的支持，企业能够在一个一致、面向未来的配置模型中管理复杂的入口需求，简化多协议部署，并平滑迈向完整的 Gateway API 体系。

### 引入 Gateway API 扩展

在遵循 Gateway API 设计原则的基础上，APISIX Ingress Controller 2.0 基于 Gateway API 引入了一组扩展 API `apisix.apache.org/v1alpha1`。这些扩展在保持标准资源核心语义和使用方式不变的前提下，提供了 Gateway API 当前未直接覆盖的附加能力，用于满足更复杂和多样化的实际使用场景。

- **GatewayProxy**：定义了 APISIX Ingress Controller 与 APISIX 数据面之间的连接，涵盖认证、端点及全局插件，可通过 Gateway、GatewayClass 或 IngressClass 资源中的 `parametersRef` 进行引用。

- **BackendTrafficPolicy**：为后端服务提供细粒度流量管理策略，包括负载均衡、超时、重试和主机头处理。

- **Consumer**：定义 API 消费者及其凭据，实现身份认证和插件配置，从而管控 API 端点访问。

- **PluginConfig**：定义可复用的插件配置模板，可供 HTTPRoute 等资源引用，实现路由逻辑与插件设置的解耦，提升可复用性和可管理性。

- **HTTPRoutePolicy**：可为现有的 HTTPRoute 或 Ingress 资源附加高级流量管理与路由策略，无需修改原始资源即可增强其功能。

这些扩展提供了一条标准化、受厂商支持的路径，让你能在 Gateway API 生态中直接运用 APISIX 的高级功能。

### 支持 APISIX Standalone API 驱动模式

APISIX Ingress Controller 2.0 提供了轻量级、无需 etcd 的 Standalone [API 驱动模式](https://apisix.apache.org/zh/docs/apisix/deployment-modes/#api-driven)作为部署新选择。

此部署范式将路由配置完全存储于内存而非配置文件，通过专用的独立管理 API，一次操作即可完成整体配置的替换与热加载，即时生效且无需重启进程。

此模式专为 APISIX Ingress Controller 设计，主要面向与 [ADC（API 声明式 CLI）](https://github.com/api7/adc)的深度集成场景。

### 支持多数据平面部署模式

APISIX Ingress Controller 2.0 推出了灵活的多数据面部署支持，允许单个 Controller 管理多个独立的 APISIX 实例。这一设计非常适用于需要严格隔离的环境，例如多租户、灰度生产隔离或地域化路由，同时能实现全局集中管控。

#### Admin API 模式

在传统部署架构中，APISIX 使用 etcd 作为其配置中心，管理员可通过 RESTful API 动态管理路由、上游服务等资源。该模式支持分布式集群部署，并能实现配置的实时同步。

<div align="center">
<img alt="APISIX Ingress Controller Admin API Mode" style="width: 60%" src="https://static.api7.ai/uploads/2025/12/19/lX98Vcaj_apisix-ingress-controller-2-admin-api-mode.webp"></img>
</div>

#### Standalone 模式

APISIX 也可脱离 etcd 独立运行，尤其适用于 Kubernetes 环境和单节点部署。它通过 API 驱动模式，配置存储于内存中，并通过专用的 `/apisix/admin/configs` 端点进行全量管理。

该模式巧妙融合了传统 Admin API 的便利性与 Standalone 模式的简洁性，为 Kubernetes 和单节点场景提供了高效灵活的管理体验。

<div align="center">
<img alt="APISIX Ingress Controller Standalone Mode" style="width: 60%" src="https://static.api7.ai/uploads/2025/12/19/8IxjQgCP_apisix-ingress-controller-2-standalone-mode.webp"></img>
</div>

通过这种多模式策略，企业可以根据多样化的需求灵活定制入口架构，在提升控制力的同时，不牺牲可管理性。

## 结语

Apache APISIX Ingress Controller 2.0 是 Kubernetes 入口管理领域的一次重要飞跃。它构建了一个坚固而灵活的平台，专为应对现代多协议应用的复杂性而生。通过整合全面的 Gateway API 支持、可扩展的官方 API 扩展、轻量化的独立部署模式以及多功能的多数据平面管理能力，此版本为动态多变的云环境提供了一个强大而一致的基石。

无论你正致力于统一多样化工作负载的入口访问、寻求更灵活的架构设计，还是需要具备企业级稳定性的扩展能力，APISIX Ingress Controller 2.0 都提供了一个面向未来的解决方案。它在简化运维的同时，毫不妥协地提供了强大功能，充分体现了 Apache APISIX 生态系统内社区驱动的创新活力，旨在既满足当下需求，也拥抱未来挑战。

> 有关完整的功能和变更列表，请参阅完整的 [Release Changelog](https://github.com/apache/apisix-ingress-controller/blob/2.0.0/CHANGELOG.md#200)。
