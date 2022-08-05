---
title: "Apache APISIX Ingress v1.5-rc1 正式发布"
author: "张晋涛"
authorURL: "https://github.com/tao12345666333"
authorImageURL: "https://github.com/tao12345666333.png"
keywords: 
- Apache APISIX
- Ingress
- Ingress controller
- Gateway API
- CRD
description: 历时 7 个月，Apache APISIX Ingress Controller v1.5-rc1 版本正式发布。带来 API Version 升级、Gateway API 支持以及 Ingress 相关资源的更新与调整。
tags: [Community]
---

> 历时 7 个月，Apache APISIX Ingress Controller v1.5-rc1 版本正式发布。带来 API Version 升级、Gateway API 支持以及 Ingress 相关资源的更新与调整。

<!--truncate-->

Apache APISIX Ingress Controller v1.5-rc1 版本正式发布。此版本历时 7 个月左右的时间，由 36 位贡献者进行了 144 次提交。其中有 22 位新晋贡献者，感谢大家对本项目的贡献与支持！

![贡献者名单](https://static.apiseven.com/2022/blog/0805/ingress-1.png)

接下来就让我们一起看下，在 APISIX Ingress v1.5 版本中有哪些重要更新。

## 所有 CRD API Version 升级至 v2

在 APISIX Ingress 项目初始，只有少数的几个 CRD ，并且每个资源都是各自进行 API Version 的维护。这就导致了后续有新资源引入或功能迭代的过程中，会出现每个自定义资源使用的 API Version 都不一样的状况，从而增加用户学习成本。

所以从 v1.3 版本开始，我们提出了统一所有资源 API Version 的 [Proposal](https://github.com/apache/apisix-ingress-controller/issues/707)。经过两个版本的迭代，现已正式引入了 v2 API Version，同时将 v2beta3 标记为废弃，直到 v1.7 版本时会完全移除 v2beta3。

## 基本支持 Gateway API

Gateway API 可以说是下一代的 Ingress 定义，具有更加丰富的表现能力。我们已经在 APISIX Ingress 中完成其中大多数资源的支持。

:::note 注意

此特性目前还在实验阶段，默认不启用。

:::

如果想要在 APISIX Ingress 中使用 Gateway API，可以在 controller 的配置文件中传递 `enable_gateway_api: true` 配置项来开启此功能。

在安装完 Gateway API 的 CRD 后，即可通过创建 `HTTPRoute` 资源来完成 7 层代理的配置。如下所示：

```yaml
apiVersion: gateway.networking.k8s.io/v1alpha2
kind: HTTPRoute
metadata:
  name: httpbin-route
spec:
  hostnames: ["httpbin.local"]
  rules:
  - matches:
    - path:
        type: PathPrefix
        value: /ip
    backendRefs:
    - name: httpbin
      port: 80
```

该配置生效后，客户端将可以通过 `httpbin.local/ip` 访问到后端 `httpbin` 的 `80` 端口。

此外，我们计划在 v1.6 版本中实现 Gateway API 剩余 `TCPRoute` 和 `UDPRoute` 这两种资源的支持，并计划引入 Gateway API 的一致性测试，以确保我们的实现与 Gateway API 的预期保持一致。

## 允许 Ingress 资源绑定任意插件

在 Apache APISIX Ingress Controller 项目中，支持使用 Kubernetes 原生的 Ingress 资源进行代理配置，但如果想要在 Ingress 资源中使用 APISIX 丰富的插件能力，就必须通过增加 Annotation 来完成，并且需要实现对应 Annotation 的逻辑。

这种方式限制了 Ingress 资源的插件能力，而且为每个插件单独开发 Annotaion 是一个相对高成本的事情。

在 v1.5 版本中，我们通过为 Ingress 资源增加了一个新的 Annotaion `k8s.apisix.apache.org/plugin-config-name`，这允许引用任意的 `ApisixPluginConfig` 资源，从而实现了让 Ingress 资源可以随意使用任意 APISIX 插件的能力。这将大大增加 APISIX Ingress Controller 的易用性，也将降低用户从其他 Ingress controller 向 APISIX Ingress Controller 迁移时的成本。

## 更多细节

除以上这些特性外，该版本中还加入了很多其他特性。比如：

- 定时 Kubernetes 集群往 APISIX 集群中同步数据的机制，保证 APISIX 集群中数据与在 Kubernetes 集群中配置的一致性；
- 为 ApisixConsumer 资源增加了更多的认证方式；
- 与 APISIX v2.15 版的兼容；
- 将所有依赖更新到最新版本，以便减少安全隐患；

更多具体发版细节，请参考 v1.5-rc1 的 [Changelog](https://github.com/apache/apisix-ingress-controller/blob/v1.5.0/CHANGELOG.md#150-rc1)。
