---
title: "Apache APISIX Ingress Controller 首个 GA 版本 v1.0 正式发布！"
slug: 2021/06/18/first-ga-version-v1.0-of-apache-apisix-ingress-controller-released
author: "张晋涛"
authorURL: "https://github.com/tao12345666333"
authorImageURL: "https://avatars.githubusercontent.com/u/3264292?v=4"
keywords:
- APISIX
- Apache APISIX
- Ingress Controller
description: Apache APISIX Ingress Controller 正式发布，支持 ApisixRoute 和  ApisixUpstream 等自定义资源，以及 K8s 原生 Ingress 资源等控制外部流量访问部署在 K8s 中的服务。
tags: [Community]
---

> Apache APISIX Ingress Controller v1.0 正式发布，可支持使用包括 `ApisixRoute`、`ApisixUpstream` 等自定义资源，以及 Kubernetes 原生 Ingress 资源等控制外部流量访问部署在 Kubernetes 中的服务。

<!--truncate-->

## 关于 Apache APISIX Ingress Controller

Apache APISIX Ingress Controller 是一个使用 Apache APISIX 作为数据面承载流量的云原生 Ingress Controller 实现，采用 CRD 的方式对 Kubernetes 进行了扩展。

<!--truncate-->

可支持使用包括 ApisixRoute、ApisixUpstream 等自定义资源，以及 Kubernetes 原生 Ingress 资源等控制外部流量访问部署在 Kubernetes 中的服务。

整体架构如下：

![Apache APISIX Ingress Controller 架构图](https://static.apiseven.com/202108/1639464578081-06d7c64a-b597-444f-a59f-0217676e1ffc.png)

## v1.0 最新特性

### 增加 ApisixConsumer 自定义资源使配置认证更方便

在之前的版本中，如果想要配置 keyAuth 或者 basicAuth 需要手动去调用 Apache APISIX 的 admin api 创建 consumer 配置。

在 v1.0 版本中，我们增加了 `ApisixConsumer` 资源，用户可以使用更原生的方式来定义 consumer 资源及为 ApisixRoute 配置认证。

例如通过以下配置定义一个 keyAuth 资源：

```yaml
apiVersion: apisix.apache.org/v2alpha1
kind: ApisixConsumer
metadata:
  name: keyauth
spec:
  authParameter:
    keyAuth:
      value:
        key: API
```

在 ApisixRoute 中只需要增加对应类型的 `authentication` 配置即可。

```yaml
apiVersion: apisix.apache.org/v2alpha1
kind: ApisixRoute
metadata:
  name: httpbin-route
spec:
  http:
   ...
   authentication:
     enable: true
     type: keyAuth
```

### 为 ApisixTls 增加 mTLS 支持

在 v1.0 版本中我们也为 ApisixTls 自定义资源增加了 mTLS 的支持，只需要在 ApisixTls 资源的配置中增加 client 配置即可，例如：

```yaml
apiVersion: apisix.apache.org/v1
kind: ApisixTls
metadata:
  name: sample-tls
spec:
  ...
  client:
    caSecret:
      name: client-ca-secret
      namespace: default
```

### 为原生 Ingress 资源增加了更多 annotation 来丰富其功能

- `k8s.apisix.apache.org/blocklist-source-range` 可对来源 IP 进行限制；
- `k8s.apisix.apache.org/rewrite-target` 和 `k8s.apisix.apache.org/rewrite-target-regex` 可进行 target 的 rewrite 操作；
- `k8s.apisix.apache.org/http-to-https` 可进行 HTTP 到 HTTPS 的强制重定向；

更多特性变更请参考项目 [CHANGELOG](https://github.com/apache/apisix-ingress-controller/blob/master/CHANGELOG.md) 。

## 为什么使用 APISIX Ingress Controller

Apache APISIX Ingress Controller 使用 Apache APISIX 作为其数据面承载业务流量，所以其从 Apache APISIX 继承了如下优势：

- **高性能 & 稳定性**：Apache APISIX 是一款云原生高性能动态 API 网关，已在众多企业大规模流量场景下使用，其性能及稳定性久经考验。
- **生态丰富**：Apache APISIX 是当前最活跃的开源网关项目，作为 Apache 顶级项目，无论是社区活跃度还是其插件生态都非常丰富，可满足用户的多种使用场景和需求；

此外，由于 APISIX Ingress Controller 还具备如下独有的优势：

- **兼容性好**：支持多个 Ingress 资源版本，在不同的 Kubernetes 版本中均可正常工作；
- **动态更新**：无论是 Ingress 资源或是证书等配置的更新，均已实现热加载，无需 reload，保障业务平稳运行；
- **扩容灵活**：由于 APISIX Ingress Controller 采用控制面和数据面分离的架构，所以在扩容时，可以单独扩容 Apache APISIX 这个数据面集群，而无须对 Apache APISIX Ingress Controller 进行扩容；
- **运维友好**：在当前架构下，用户可按实际情况选择将数据面 Apache APISIX 集群部署在 Kubernetes 集群中，或是部署在物理机环境。且 Apache APISIX Ingress Controller 故障不会对业务流量造成任何影响。
