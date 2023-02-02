---
title: "服务网格领域的百花齐放，是否存在一个更优解？"
authors:
  - name: "林志煌"
    title: "Author"
    url: "https://github.com/hansedong"
    image_url: "https://github.com/hansedong.png"
  - name: "lingsamuel"
    title: "Author"
    url: "https://github.com/lingsamuel"
    image_url: "https://github.com/lingsamuel.png"
keywords: 
- 服务网格
- Apache APISIX
- Amesh
- Service Mesh
- Kubernetes
- Istio
description: 本文介绍了什么是服务网格？服务网格如何工作？以及具体实际应用。然后介绍了什么是 Amesh？以及 Amesh 目前的发展状态。
tags: [Ecosystem]
---

> 本文介绍了什么是服务网格？服务网格如何工作？以及具体实际应用。然后介绍了什么是 Amesh？以及 Amesh 目前的发展状态。

<!--truncate-->

> 作者[lingsamuel](https://github.com/lingsamuel)，API7.ai 云原生技术专家，Apache APISIX Committer。
>
> 作者[林志煌](https://github.com/oil-oil)，API7.ai 技术工程师，Apache APISIX contributor。

**服务网格是一种技术架构，它用于管理微服务系统中各个服务之间的通信，旨在处理微服务间的流量（也称为东西向流量）。**

![服务网格示例图](https://static.apiseven.com/uploads/2023/01/18/wScWsjXh_download_image%20%2810%29.png)

在云原生应用中，一个应用的背后可能存在着成百上千个服务，各个服务可能又有着若干个实例，各个实例的状态也一直在变化。在如此复杂的服务运行环境中，如何保障用户的可靠访问以及维持业务的平稳运行成为一个很大的挑战，服务网格的治理方案便应运而生。

服务网格就像是微服务间的 TCP/IP，负责服务间的网络调用、限流限速、监控等。服务网格目前主要应用在 Kubernetes 平台上，其最经典的一种实现模式是 Sidecar 模式：将一些通用功能抽象到 Sidecar 容器中，并将 Sidecar 容器与服务容器挂载在同一个 Pod 里。由于 Sidecar 容器与服务容器并行，且各个 Sidecar 间相互通讯，共同构成了网格形式的网络，因此称之为服务网格。当然，Sidecar 并非唯一的一种服务网格实现模式，除此之外还有 [DaemonSet 模式](https://wecode.wepay.com/posts/scds-battle-of-containerization)及 [Ambient mesh 模式](https://istio.io/latest/blog/2022/introducing-ambient-mesh/)。

## 为什么需要服务网格？

在服务网格流行之前，很多微服务架构的服务治理都是通过微服务框架配合控制平台实现的，这种方式存在以下几个问题：

1. 框架与业务耦合，整体复杂度与运维难度很高，且开发者需要对公共库有一定的了解，没法只专注于业务实现。
2. 需要维护多种语言版本的框架，增加了维护的成本。
3. 微服务框架本身的升级成本比较高，在升级时往往需要进行业务重启等操作。
4. 线上存在很多版本的框架，会导致复杂的兼容性考虑。

面对以上这些问题，原 Twitter 工程师 Willian Morgan 提出了 Service Mesh 的概念，即服务网格。服务网格通过 Sidecar 模式实现在不侵入业务服务的情况下将基础设施与业务逻辑解耦，实现跨语言统一更新发布及运维。

![服务网格内部实现](https://static.apiseven.com/uploads/2023/01/18/K8DWpiNn_download_image%20%283%29.jpeg)

服务网格将流量管理、可观测性和安全通讯等功能下沉到基础组件，因此开发者无需关心通信层和服务治理的具体实现，与通信相关的一切工作直接交给服务网格，让开发者能够更关注于业务的开发。基于服务网格的这些特点，前面提到的几个问题都能够得到有效解决。

## 服务网格是如何工作的？

服务网格不会为应用的运行时环境加入新功能，任何架构中的应用还是需要相应的规则来指定请求如何从 A 点到达 B 点。但服务网格的不同之处在于，它从各个服务中提取逻辑管理的服务间通信，并将其抽象为一个基础架构层。

目前服务网格大多数采用是**数据面** + **控制面**的架构模式，如下图所示：

![目前的服务网格示例图](https://static.apiseven.com/uploads/2023/01/18/U2Vw7rs3_download_image%20%282%29%20%281%29.png)

其中控制面用于管理和配置数据面以及在运行时执行策略。单个网格中控制平面的所有实例共享相同的配置资源。主要聚焦于安全、可观测性、流量管控等策略的处理和下发，同时还能够收集和集中数据平面的遥测数据，供运维人员使用。

而数据面通常以代理的形式实现，是由一个个的网络代理 Sidecar 组成，Sidecar 与业务应用实例并行，通过拦截业务数据流以管控业务应用的流量。

在前面的介绍中有提到服务网格是将 Sidecar 设计模式在 Kubernetes 进行实现，通过容器化的方式实现了封装，Sidecar 主张以额外的容器来扩展或增强主容器，这个额外的容器被称为 Sidecar 容器，它与业务容器在同一个 Pod 中。而服务网格即是一个个 Sidecar 代理所构成的网格式网络。

## 服务网格的实际应用

在微服务架构中，工程师往往会为对外暴露的服务采取加密或访问限制的措施以保障服务的安全，但却忽视了集群内部的流量通信安全，所以至今仍有很多微服务应用没有采取服务间通信的加密措施，集群内部的流量以明文的形式进行传输，非常容易导致内部流量遭到数据窃听或是中间人攻击。

而为了防止集群内部流量遭到攻击，通常会使用 mTLS 将通讯数据进行加密。mTLS 可以用于确保服务网格中微服务之间的通信安全。它使用加密安全技术相互认证各个微服务并加密它们之间的流量。

![mTLS加密](https://static.apiseven.com/uploads/2023/01/18/bT2Zctxd_download_image%20%281%29%20%281%29.png)

虽然可以直接在微服务中定义通信安全策略并执行身份验证和加密，但在每一个微服务中去单独实现相同的功能效率是很低的。而且增加功能还需要改动业务代码，侵入业务逻辑。且即便完成了功能，后期的升级迭代与测试都需要开发者投入额外精力去维护，无法专注于业务功能的开发。

而使用服务网格，我们就可以在不影响原本业务的情况下零感知的为服务提供 mTLS 通信。因为在服务网格中，服务通信相关的功能都被转移至 Sidecar 代理中实现。**在整个实现过程中，业务应用都不会受到影响，降低开发者心智负担。**

当然，服务网格除了可以实现类似 mTLS 这类的内部流量安全配置功能，通过调整控制面的配置还能快速的拓展包括流量管控，可观测性，协议编解码等更多功能。

## 更优的服务网格方案？

虽然服务网格解决了很多微服务架构中的痛点，但它也同时有自己的局限性，在软件开发中复杂度是不灭的，只是在不同的部分之间做转移。我们将服务治理抽离为单独的一层就要面对流量链路的增长以及运维难度的提升，且服务网格需要在云原生的环境中使用，这对于运维的专业能力及工程实践经验有了更高的要求。所以说技术只是用于解决问题的工具，服务网格能带来的价值还是得从应用的从实际情况出发。

作为 Apache 软件基金会的顶级项目，Apache APISIX 是一个动态、实时、高性能的云原生 API 网关，提供负载均衡、动态上游、灰度发布、服务熔断、身份认证、可观测性等丰富的流量管理功能。在基于 APISIX 的扩展道路上，除了 APISIX Ingress 在云原生领域被各大厂商开始关注外，基于 APISIX 的服务网格方案也在积极迭代中。

## 基于 APISIX 的服务网格方案——Amesh

[Amesh](https://github.com/api7/Amesh) 是 [Apache APISIX](https://github.com/apache/apisix) 的服务网格库。它适配了 xDS 协议，可以从诸如 Istio 的控制平面中接收数据，并生成 APISIX 所需的数据结构，使得 APISIX 能够在服务网格领域作为数据面发挥作用。

依靠 Amesh，APISIX 可以工作在服务网格模式下，不使用传统的 etcd 作为数据中心，而是使用 shdict 与 Amesh 库直接进行数据交换，避免了额外的性能损耗，使得大规模部署成为可能。

通过使用 Amesh，可以在服务网格领域获得 APISIX 具备的高性能、丰富的流量管理功能、易扩展性等多种优势。

Amesh 通过适配 xDS 协议，可以让 APISIX 替代 Istio 所使用的 Envoy 组件来接管集群流量。在实际使用中，APISIX 将作为 Pod 的 Sidecar 接管网格内的所有流量。目前 Amesh 的架构如下图所示：

![Amesh架构](https://static.apiseven.com/uploads/2023/01/19/99lIgVfj_image42fix.png)

通过架构图可以看到，通过 xDS 协议，Amesh 可以将 Istio 作为控制面，从 Istio 侧获取配置信息，并将其转义为 APISIX 所需的配置。

而网格内部的所有流量都将由 APISIX 接管。其中，APISIX 的配置中心被设置为 Amesh，这使得 APISIX 脱离 etcd 的依赖。Amesh 为 APISIX 提供了一种从 xDS 协议中获取配置信息的方式。

此外，Amesh 在 v0.2 中提供了额外的可选控制面组件：[amesh-controller](https://github.com/api7/Amesh/tree/main/controller/charts/amesh-controller)。Amesh Controller 增加了 Amesh 专用的 CRD，可以为 APISIX 配置一些 Istio 所不支持的额外功能。额外带有 `amesh-controller` 的架构如下图所示：

![amesh-controller架构](https://static.apiseven.com/uploads/2023/01/19/AQCRwtA8_image43fix.png)

正如前文所提到的，Amesh Controller 是可选组件。在未安装时，Amesh 也能正常使用 Istio 的原生能力提供服务。在安装了 `amesh-controller` 后，Amesh 能自动检测到控制面的加入，并动态地从中获取配置，而无需重启。

Amesh controller 为 Amesh 提供了 Istio 无法提供的 APISIX 特有功能。例如在安装 `amesh-controller` 后，用户能为服务配置 APISIX 原生具备的海量插件，使 APISIX 众多的插件在服务网格场景下也能开箱即用，而无需用户进行自定义的开发。

## Amesh 发展状态

目前 Amesh 项目正在积极开发中。在最近发布的的 [v0.2 版本](https://github.com/api7/Amesh/releases/tag/v0.0.2)中，Amesh 新增了可选的控制面 amesh-controller 组件，为 Amesh 提供了 APISIX 所支持的强大的插件系统，大大增强了 Amesh 的可扩展性。

### 扩展能力

在使用 Amesh 时，如果是常规的 Istio 部署，用户则可以通过 Lua 或 Wasm 来对 Envoy 进行功能扩展。

与 Envoy 原生能力相比，APISIX 官方即支持插件扩展能力，维护了 80+ 的插件可供用户使用，许多功能已经原生集成。但由于在 Istio 中，不能对这些插件进行配置，无法直接使用这些插件所提供的能力。

为此，Amesh v2.0 版本新增了一个控制面组件，即前文提到的 `amesh-controller`。它为用户提供了配置 APISIX 插件的能力，使 APISIX 众多的插件在服务网格场景下也能开箱即用，而无需用户进行自定义的开发。

### 应用示例

在 Amesh v0.2 版本中，可以通过安装 `amesh-controller` 并使用提供的 `AmeshPluginConfig` CRD 来进行 APISIX 的插件配置。

例如，我们可以为请求的响应添加特定的 header，这里可以通过配置 APISIX 的 `response-rewrite` 插件实现。

假设我们需要添加的 header 为 `X-Header`，其值为 `AddedHeader`，我们可以配置如下的 `AmeshPluginConfig`，此时请求的响应中就会带上我们所需的 header。

```yaml
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

随着云原生的爆炸式发展及服务网格的不断优化，未来的服务网格可能会完全取代传统微服务架构，成为各个企业微服务及云原生改造的首选架构。虽然现在各种方案都还不太完善，但整体都属于螺旋上升的状态。当然，基于 APISIX 的服务网格也正朝着大家心目中的理想型服务网格解决方案奋进，也欢迎各位对 APISIX 服务网格方案感兴趣的朋友们进行尝鲜。
