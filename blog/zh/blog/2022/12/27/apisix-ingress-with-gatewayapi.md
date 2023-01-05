---
title: "APISIX Ingress 对 Gateway API 的支持和应用"
author: "lingsamuel"
authorURL: "https://github.com/lingsamuel"
authorImageURL: "https://github.com/lingsamuel.png"
keywords: 
- Apache APISIX
- Ingress
- Ingress controller
- Gateway API
description: 本文介绍了 Gateway API 这个将服务暴露到集群之外的全新规范，并且介绍了如何在 APISIX Ingress Controller 中使用它。
tags: [Ecosystem]
---

> 本文介绍了 Gateway API 这个将服务暴露到集群之外的全新规范，并且介绍了如何在 APISIX Ingress Controller 中使用它。

<!--truncate-->

> 作者@lingsamuel，API7.ai 云原生技术专家，Apache APISIX Committer。

Gateway API 是除原生 Service 与 Ingress 之外，APISIX 社区发起的独立规范，帮助用户将 Kubernetes 中的服务暴露到集群之外，由 [sig-network](https://github.com/kubernetes/community/tree/master/sig-network) （特别兴趣小组）管理。

Gateway API 支持大部分常用网络协议（HTTP、TCP、UDP 等）和对 TLS 的支持。此外，Gateway API 中的 Gateway 资源能够通过 Kubernetes API 来管理代理和网关的生命周期。

随着 Gateway API 被[广泛实现](https://gateway-api.sigs.k8s.io/implementations/)与应用，Gateway API 发布了 v0.5.0 版本。在该版本中，一些核心 API 首次进入 Beta 阶段，包括：GatewayClass、Gateway、HTTPRoute。

### **Gateway API 优势盘点**

Gateway API 不仅是 Ingress 的功能父集，还具有如下改进：

* **面向角色**：Gateway 由一组 API 资源组成，不同的 API 资源代表了使用与配置 Kubernetes 网络资源的不同角色。
* **表现力强**：Gateway API 的核心功能包含基于 Header 匹配、流量加权以及以及其他部分由 annotations 实现的非标准化功能。
* **可扩展**：Gateway API 允许不同资源在不同层级一同使用。这使得能够对 API 结构进行更精细化的控制。

此外，Gateway API 还包含了可移植、网关共享与跨命名空间引用等特性。

如下图所示，面向角色的设计使不同团队之间可以共享集群内部的网络基础设施，和集群管理员设置的策略与约束。由此，基础设施提供方、集群管理员、应用开发者等各种身份的角色可以只专注自己的工作，无需对其他角色负责。

不同的角色配置不同层级的 Gateway API 资源，这些资源相互配合，共同作用：

## 如何在 APISIX Ingress 中使用 Gateway API

### 第一步：安装 Gateway API CRD

要使用 Gateway API，需要先安装 Gateway API 的 CRD，有两种安装方式：APISIX Ingress Controller 仓库下的副本或官方仓库 [kubernetes-sigs/gateway-api](https://github.com/kubernetes-sigs/gateway-api/tree/main/config/crd/experimental)。

此处以 APISIX Ingress Controller 仓库的 CRD 副本为例，安装命令如下：

```shell
git pull git@github.com:apache/apisix-ingress-controller.git
cd apisix-ingress-controller
kubectl apply -f ./samples/deploy/gateway-api/
```

### 第二步：安装 APISIX Ingress Controller

在 APISIX Ingress Controller 中，默认不启用 Gateway API 支持，可通过参数 `--enable-gateway-api=true` 启用。随后在使用 Helm 安装时，可通过配置 values 来启用。

APISIX 与 APISIX Ingress Controller 安装命令如下：

```shell
helm repo add apisix https://charts.apiseven.com
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update
kubectl create ns apisix-ingress
helm install apisix apisix/apisix --namespace apisix-ingress \
  --set gateway.type=NodePort \
  --set ingress-controller.enabled=true \
  --set ingress-controller.config.apisix.serviceNamespace=apisix-ingress \
  --set ingress-controller.config.kubernetes.enableGatewayAPI=true
```

:::note 注意

参数 `--set ingress-controller.config.kubernetes.enableGatewayAPI=true` 用于开启 Gateway API 支持。

:::

这些命令将在 `apisix-ingress` 命名空间下创建完整的测试环境，包括 APISIX、etcd 与 APISIX Ingress Controller。

### 第三步：部署测试负载

使用 `kennethreitz/httpbin` 镜像作为测试负载。

在默认命名空间下部署这些负载，安装命令如下：

```shell
kubectl run httpbin --image kennethreitz/httpbin --port 80
kubectl expose pod httpbin --port 80
```

### 第四步：配置 HTTPRoute

目前，APISIX Ingress Controller 支持 `v1alpha2` 版本的 Gateway API 资源。

在测试时，使用如下 HTTPRoute 配置，将其保存到 `httproute.yaml` 文件中：

```yaml
# httproute.yaml
apiVersion: gateway.networking.k8s.io/v1alpha2
kind: HTTPRoute
metadata:
  name: basic-http-route
spec:
  hostnames:
  - local.httpbin.org
  rules:
  - backendRefs:
    - name: httpbin
      port: 80
    matches:
    - path:
        type: PathPrefix
        value: /
```

部署该 HTTPRoute 配置：

```shell
kubectl apply -f ./httproute.yaml
```

### 第五步：验证

在 APISIX 的 Pod 中直接验证，执行以下命令：

```shell
kubectl -n apisix-ingress exec -it \
  $(kubectl -n apisix-ingress get Pods -l "app.kubernetes.io/name=apisix" -o name) -c apisix -- \
  curl -H "Host: local.httpbin.org" localhost:9080/ip
```

预期输出为：

```shell
{
  "origin": "127.0.0.1"
}
```

由此，配置成功生效。

## APISIX Ingress 对 Gateway API 的支持状态

APISIX Ingress Controller 正在对 Gateway API 添加支持，现已处于 Alpha 阶段，支持 HTTPRoute、TCPRoute 等资源。

目前 Gateway API 已更新至 v0.5.1 版本，但对于 Gateway 与 Gateway Class 的支持还处于开发阶段，因此目前这些资源的配置暂时不会生效。

## 总结

在本文中，我们介绍了 Gateway API 这个将服务暴露到集群之外的全新规范，并且介绍了如何在 APISIX Ingress Controller 中使用它。APISIX Ingress Controller 对 Gateway API 的完整支持仍在积极开发中，欢迎感兴趣的朋友参与贡献。
