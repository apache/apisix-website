---
title: "基于 APISIX 的服务网格方案 Amesh 积极开发中！"
authors:
  - name: "lingsamuel"
    title: "Author"
    url: "https://github.com/lingsamuel"
    image_url: "https://github.com/lingsamuel.png"
keywords: 
- Apache APISIX
- Amesh
- Service Mesh
- 服务网格
- Kubernetes
description: Amesh 是 Apache APISIX 的服务网格库。它适配了 xDS 协议，可以从诸如 Istio 的控制平面中接收数据，并生成 APISIX 所需的数据结构，使得 APISIX 能够在服务网格领域作为数据面发挥作用。
tags: [Ecosystem]
---

> 在云原生快速发展的前提下，服务网格领域也开始逐渐火热。目前阶段，大家所熟知的服务网格解决方案很多，每种产品又各有其优势。因此在面对不同的行业或者业务背景时，每个人的选型想法都各不相同。

<!--truncate-->

> 作者 [lingsamuel](https://github.com/lingsamuel)，API7.ai 云原生技术专家，Apache APISIX Committer。

Apache APISIX 是一个动态、实时、高性能的云原生 API 网关，提供负载均衡、动态上游、灰度发布、服务熔断、身份认证、可观测性等丰富的流量管理功能。基于 APISIX 的扩展道路上，除了 APISIX Ingress 在云原生领域被各大厂商开始关注外，基于 APISIX 的服务网格方案也在积极迭代中。

## 基于 APISIX 的服务网格方案

[Amesh](https://github.com/api7/amesh) 是 [Apache APISIX](https://github.com/apache/apisix) 的服务网格库。它适配了 xDS 协议，可以从诸如 Istio 的控制平面中接收数据，并生成 APISIX 所需的数据结构，使得 APISIX 能够在服务网格领域作为数据面发挥作用。

依靠 Amesh，APISIX 可以工作在服务网格模式下，不使用传统的 etcd 作为数据中心，而是使用 shdict 与 Amesh 库直接进行数据交换，避免了额外的性能损耗，使得大规模部署成为可能。

通过使用 Amesh，可以在服务网格领域获得 APISIX 具备的高性能、丰富的流量管理功能、易扩展性等多种优势。

### Amesh 的架构

Amesh 通过适配 xDS 协议，可以让 APISIX 替代 Istio 所使用的 envoy 组件来接管集群流量。在实际使用中，APISIX 将作为 Pod 的 Sidecar 接管网格内的所有流量。目前 Amesh 的架构如下图所示：

![Amesh 架构](https://static.apiseven.com/uploads/2023/01/19/99lIgVfj_image42fix.png)

通过架构图可以看到，通过 xDS 协议，Amesh 可以将 Istio 作为控制面，从 Istio 侧获取配置信息，并将其转义为 APISIX 所需的配置。

而网格内部的所有流量都将由 APISIX 接管。其中，APISIX 的配置中心被设置为 Amesh，这使得 APISIX 脱离 etcd 的依赖。Amesh 为 APISIX 提供了一种从 xDS 协议中获取配置信息的方式。

此外，Amesh 在 v0.2 中提供了额外的可选控制面组件：`amesh-controller` ，它增加了 Amesh 专用的 CRD，可以为 APISIX 配置一些 Istio 所不支持的额外功能。额外带有 `amesh-controller` 的架构如下图所示：

![amesh-controller 架构](https://static.apiseven.com/uploads/2023/01/19/AQCRwtA8_image43fix.png)

正如前文所提到的，`amesh controller` 是可选组件。在未安装时，Amesh 也能正常使用 Istio 的原生能力提供服务。在安装了 amesh-controller 后，Amesh 能自动检测到控制面的加入，并动态地从中获取配置，而无需重启。

`amesh-controller` 为 Amesh 提供了 Istio 无法提供的 APISIX 特有功能。例如在安装 `amesh-controller` 后，用户能为服务配置 APISIX 原生具备的海量插件。

## Amesh 发展状态

目前 Amesh 项目正在积极开发中。在最近发布的的 v0.2 版本中，Amesh 新增了可选的控制面 `amesh-controller` 组件，为 Amesh 提供了 APISIX 所支持的强大的插件系统，大大增强了 Amesh 的可扩展性。

### 扩展能力

在使用 Amesh 时，如果是常规的 Istio 部署，用户则可以通过 Lua 或 Wasm 来对 Envoy 进行功能扩展。

与 Envoy 原生能力相比，APISIX 官方即支持插件扩展能力，维护了 80+ 的插件可供用户使用，许多功能已经原生集成。但由于在 Istio 中，不能对这些插件进行配置，无法直接使用这些插件所提供的能力。

为此，Amesh v2.0 版本新增了一个控制面组件，即前文提到的 `amesh-controller`。它为用户提供了配置 APISIX 插件的能力，使 APISIX 众多的插件在服务网格场景下也能开箱即用，而无需用户进行自定义的开发。

### 应用示例

在 Amesh v0.2 版本中，可以通过安装 `amesh-controller` 并使用提供的 `AmeshPluginConfig` CRD 来进行 APISIX 的插件配置。

例如，我们可以为请求的响应添加特定的 header，这里可以通过配置 APISIX 的 `response-rewrite` 插件实现。

假设我们需要添加的 header 为 `X-Header`，其值为 `AddedHeader`，我们可以配置如下的 `AmeshPluginConfig`，此时请求的响应中就会带上我们所需的 header。

```YAML
apiVersion: apisix.apache.org/v1alpha1
kind: AmeshPluginConfig
metadata:
  name: ampc-sample
spec:
  plugins:
    - name: response-rewrite
      config: '{"headers": {"X-Header":"AddedHeader"}}'
```

## 总结

在本文中，我们简单介绍了 [Amesh](https://github.com/api7/amesh) 的架构，以及在 v0.2 版本中提供的 `amesh-controller` 所带来的架构变更，可以更好地帮助用户理解 Amesh 的工作原理。

在当下技术发展趋势中，服务网格势必是未来的流行趋势。虽然现在各种方案都还不太完善，但整体都属于螺旋上升的状态。当然，基于 APISIX 的服务网格也正朝着大家心目中的理想型服务网格解决方案奋进，也欢迎各位对 APISIX 服务网格方案感兴趣的朋友们进行尝鲜。
