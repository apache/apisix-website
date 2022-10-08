---
title: "如何与 Dapr 集成打造 Apache APISIX 网关控制器"
author: "张善友"
authorURL: "https://github.com/geffzhang"
authorImageURL: "https://avatars.githubusercontent.com/u/439390?v=4"
keywords: 
- Apache APISIX
- Dapr
- Kubernetes
- API 网关
- Sidecar
description: 本文为大家介绍了 Dapr 和 Apache APISIX Ingress Controller 的相关概念，并展示了集成 Dapr 创建一个 Apache APISIX 控制器的具体步骤及测试示例项目。
tags: [Ecosystem]
image: https://static.apiseven.com/2022/blog/0818/ecosystem/dapr.png
---

> 本文将为大家展示如何通过集成 Dapr 创建一个 Apache APISIX 控制器。包括项目概念以及具体操作步骤。

<!--truncate-->

<head>
    <link rel="canonical" href="https://blog.dapr.io/posts/2022/01/13/enable-dapr-with-apache-apisix-ingress-controller/" />
</head>

本质上，Apache APISIX 控制器将配置相同标准 Dapr annotations 以注入 daprd sidecar。通过公开这个 sidecar，将允许外部应用程序与集群中启用 Dapr 的应用程序进行通信。

下图为实际项目中的架构流程：

![总体架构流程](https://static.apiseven.com/202108/1637119221118-75dab9f1-4092-4684-ad23-34932d8a7eac.png)

## 基本项目概览

### Apache APISIX Ingress

在 K8s 生态中，Ingress 作为表示 K8s 流量入口的一种资源，想要让其生效，就需要有一个 Ingress Controller 去监听 K8s 中的 Ingress 资源，并对这些资源进行相应规则的解析和实际承载流量。在当下趋势中，像 Kubernetes Ingress Nginx 就是使用最广泛的 Ingress Controller 实现。

而 APISIX Ingress 则是另一种 Ingress Controller 的实现。跟 Kubernetes Ingress Nginx 的区别主要在于 APISIX Ingress 是以 Apache APISIX 作为实际承载业务流量的数据面。如下图所示，当用户请求到具体的某一个服务/API/网页时，通过外部代理将整个业务流量/用户请求传输到 K8s 集群，然后经过 APISIX Ingress 进行后续处理。

![APISIX Ingress](https://static.apiseven.com/2022/09/30/6336a25db849f.png)

从上图可以看到，APISIX Ingress 分成了两部分。一部分是 APISIX Ingress Controller，作为控制面它将完成配置管理与分发。另一部分 APISIX Proxy Pod 负责承载业务流量，它是通过 CRD(Custom Resource Definitions) 的方式实现的。Apache APISIX Ingress 除了支持自定义资源外，还支持原生的 K8s Ingress 资源。

点击查看[更多详情](https://www.apiseven.com/zh/blog/apisix-ingress-details)。

### Dapr

Dapr 是一个可移植、事件驱动的运行时。它使开发人员简单地去构建运行在云和 edge 上弹性、无状态和有状态的应用，并且包含多种语言和开发人员框架。

![Dapr 生态图](https://static.apiseven.com/202108/1637119221120-15a5be20-17a2-4c18-a82e-91e1ff3709f0.png)

今天，我们正经历一波云应用浪潮。开发人员熟悉 web+ 数据库应用程序架构(例如经典的3层设计)，但不熟悉本质上是分布式的微服务应用程序架构。开发人员希望专注于业务逻辑，同时依靠平台为他们的应用程序注入伸缩性、弹性、可维护性、弹性和其他本地云架构的属性。

这就是 Dapr 的用武之地。

Dapr 可以将构建微服务应用程序的最佳实践编入开放、独立的构建块中，使用户能够使用自己选择的语言和框架构建可移植的应用程序。每个构建块都是完全独立，并可在应用程序中使用其中的一个或多个。

此外，Dapr 与平台无关，这意味着用户可以在任何 Kubernetes 集群和其他与 Dapr 集成的托管环境本地运行应用程序。

点击查看[更多详情](https://docs.dapr.io/zh-hans/concepts/overview/)。

## 实践开始

### 环境准备

- Kubernetes 1.19+ 集群，集群上已经配置了 Dapr
- 安装了 Helm CLI 3x
- Kubectl CLI 已安装并配置为访问集群
- 可选：用于创建自签名证书的 OpenSSL
- Apache APISIX 的 Helm Chart 版本为 0.7.2+

### 步骤一：Apache APISIX Helm 配置

通过运行以下命令为 Apache APISIX 控制器添加最新的 helm chart repo：

```shell
helm repo add apisix https://charts.apiseven.com
helm repo update
```

### 步骤二：创建 Apache APISIX Ingerss 命名空间

确保当前 kubectl 上下文指向正确的 Kubernetes 集群，然后运行以下命令：

```shell
kubectl create namespace ingress-apisix
```

### 步骤三：安装支持 Dapr 的 APISIX 控制器

使用以下内容创建一个名为 dapr-annotations.yaml 的文件，以在 Apache APISIX Proxy Pod 上设置注释。

```yaml
apisix:
  podAnnotations:
    dapr.io/enabled: "true"
    dapr.io/app-id: " apisix-gateway"
dapr.io/app-port: "9080"
dapr.io/enable-metrics: "true"
dapr.io/metrics-port: "9099"
dapr.io/sidecar-listen-addresses: 0.0.0.0
dapr.io/config: ingress-apisix-config
```

> 注意：上面的 app-port 是告诉 daprd sidecar Proxy 在监听哪个端口。有关受支持的注释完整列表，可参考 [Dapr Kubernetes pod 注释规范](https://docs.dapr.io/operations/hosting/kubernetes/kubernetes-annotations/)。

下面以我个人在 AKS 上安装的示例 dapr-annotations.yaml 进行展示。

```yaml
 apisix:
  podAnnotations:
    dapr.io/app-id: apisix-gateway
    dapr.io/app-port: '9080'
    dapr.io/enable-metrics: 'true'
    dapr.io/enabled: 'true'
    dapr.io/metrics-port: '9099'
dapr.io/sidecar-listen-addresses: 0.0.0.0
dapr.io/config: ingress-apisix-config

gateway:
  type: LoadBalancer

ingress-controller:
  enabled: true

dashboard:
  enabled: true
```

接下来运行以下命令（引用上述文件）：

```shell
helm install apisix apisix/apisix -f dapr-annotations.yaml -n ingress-apisix
```

将启动的 APISIX Dashboard Pod 向外暴露，便于后续使用：

```shell
# 可以通过 kubectl get pods -n ingress-apisix 获取 dashboard-pod-name
kubectl port-forward ${dashboard-pod-name} 9000:9000
```

### 步骤四：创建 Apache APISIX 的 Dapr Sidecar 资源

首先，通过 `http://localhost:9000` 访问 APISIX Dashboard 配置 Apache APISIX upstream-apisix-dapr。

![配置上游业务](https://static.apiseven.com/202108/1637119221106-e57ae8b8-38ed-46ea-b219-401619fadbe3.png)

在这里主机名填写：apisix-gateway-dapr，端口号填写 3500。

```json
{
  "nodes": [
    {
      "host": "apisix-gateway-dapr",
      "port": 3500,
      "weight": 1
    }
  ],
  "retries": 1,
  "timeout": {
    "connect": 6,
    "read": 6,
    "send": 6
  },
  "type": "roundrobin",
  "scheme": "http",
  "pass_host": "pass",
  "name": "apisix-dapr"
}
```

然后配置 Apache APISIX 服务 apisix-gateway-dapr，上游服务选择 apisix-dapr。

![配置服务](https://static.apiseven.com/202108/1637119221115-ae7c847a-99a3-4ee6-b36f-4269fd067198.png)

```json
{
  "name": "apisix-gateway-dapr",
  "upstream_id": "376187148778341098"
}
```

### 步骤五：部署测试示例项目

[HTTPBin](https://httpbin.org/) 是以 Python+Flask 写的一款工具，这款工具涵盖了各类 HTTP 场景，且每个接口都有返回。接下来，我们使用 kennethreitz/httpbin 作为示例项目进行演示。

```shell
kubectl apply -f 01.namespace.yaml
kubectl apply -f 02.deployment.yaml
kubectl apply -f 03.svc.yaml
```

![项目配置](https://static.apiseven.com/202108/1637119221110-9b901451-6ca6-4d15-b591-69f7c5d57ce1.png)

上图为假设有一个使用 Dapr app-id kennethreitz-httpbin 运行的微服务。

#### 路径匹配改写

这里补充一下关于路径匹配的相关设置。比如请求网关是 /httpbin/*，后端接收路径应该是 /*，中间的 httpbin 只充当服务名的标识。

![填写释义](https://static.apiseven.com/202108/1637119221114-90c1ef58-6743-419c-be87-9cdc8503aa30.png)

在支持命名空间的托管平台上，Dapr 应用 ID 是符合有效的 FQDN 格式，其中包括目标名称空间。例如，以下字符串包含应用 ID（svc-kennethreitz-httpbin）以及应用运行在命名空间（kind-test）。

最后可以通过访问：http://20.195.90.43/httpbin/get 来查看代理是否成功。

![检查是否代理成功](https://static.apiseven.com/202108/1637119221100-13997340-dfb6-45fb-abba-4215e0318238.png)

## 额外补充说明

当然，在进行部署的过程中，也可以在 Kubernetes 中使用 Apache APISIX 官方 Helm 仓库直接部署 Apache APISIX 和 APISIX Ingress Controller。这样可以直接将 Apache APISIX 作为网关，进行 APISIX Ingress Controller 的数据面来承载业务流量。

最后将 Dapr 通过 Sidecar annotations 注入到 Apache APISIX Proxy Pod，通过服务调用模块来调用集群中的微服务，实现完整流程部署。

### 删除 Apache APISIX 控制器

如项目结束，想要删除 Apache APISIX 控制器，可按下方命令操作（记得不要忘记删除之前创建的命名空间 ingress-apisix）。

```shell
helm delete apisix -n ingress-apisix
```
