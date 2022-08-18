---
title: "两种方式教你在 K8s 中轻松部署 Apache APISIX"
authors:
  - name: "喻柏仲"
    title: "Author"
    url: "https://github.com/zaunist"
    image_url: "https://avatars.githubusercontent.com/u/38528079?v=4"
  - name: "苏钰"
    title: "Technical Writer"
    url: "https://github.com/SylviaBABY"
    image_url: "https://avatars.githubusercontent.com/u/39793568?v=4"
keywords: 
- Apache APISIX
- Kubernetes
- APISIX Dashboard
- 部署安装
- 集群
description: 云原生 API 网关 Apache APISIX 目前支持多种方式进行安装部署，本文主要介绍如何在 Kubernetes 环境中部署 Apache APISIX 以及 APISIX-Dashboard。
tags: [Ecosystem]
image: https://static.apiseven.com/2022/blog/0818/ecosystem/kubernetes.png
---

> Apache APISIX 目前支持多种方式进行安装部署，本文主要介绍如何在 Kubernetes 环境中部署 Apache APISIX 以及 APISIX-Dashboard。

<!--truncate-->

Apache APISIX 是一个动态、实时、高性能的开源 API 网关，提供负载均衡、动态上游、灰度发布、服务熔断、身份认证、可观测性等丰富的流量管理功能。

而 Kubernetes 作为自动部署、扩展和管理容器化应用程序的开源系统，旨在为用户提供**跨主机集群**的自动部署、扩展以及运行应用程序容器等相关功能支持。如何快速地在 K8s 中部署 Apache APISIX 并通过 Dashboard 进行相关信息的展示，这里我们为大家整理了两种非常容易上手的安装思路。

## 环境准备

在正式进入安装部署前，确保网络畅通并准备好相应的 K8s 集群。

在这里，我们推荐使用 Kind 进行本地搭建 K8s 集群测试环境，非常方便且容易上手。根据[官方文档](https://kind.sigs.k8s.io/docs/user/quick-start/)步骤安装好 Kind 后，只需一条指令即可搭建好 K8s 集群环境。

```shell
kind create cluster
```

## 方式一：通过 Helm 安装

Helm 主要用于管理 Kubernetes 中的应用程序。类似 apt、yum、pacman 这些 Linux 中的包管理器，所以 Helm 也称为 Kubernetes 中的包管理器。

目前 Apache APISIX 已经提供了 [Helm Chart 仓库](https://github.com/apache/apisix-helm-chart)，用户可以非常方便地通过 Helm 来部署和卸载 Apache APISIX。

### 部署 Apache APISIX

首先添加 Apache APISIX Helm Chart 地址并更新仓库。

```shell
helm repo add apisix https://charts.apiseven.com
helm repo update
```

进行安装 Apache APISIX（此处演示是将 Apache APISIX 安装到 Default Namespace，如需自定义 Namespace，可参考[相关文档](https://kubernetes.io/docs/tasks/administer-cluster/namespaces/#creating-a-new-namespace)）。

```shell
helm install apisix apisix/apisix
```

上述指令执行成功后，会得到如下返回信息：

```shell
▶ helm install apisix apisix/apisix
NAME: apisix
LAST DEPLOYED: Sun Dec  5 14:43:19 2021
NAMESPACE: default
STATUS: deployed
REVISION: 1
TEST SUITE: None
NOTES:
1. Get the application URL by running these commands:
  export NODE_PORT=$(kubectl get --namespace default -o jsonpath="{.spec.ports[0].nodePort}" services apisix-gateway)
  export NODE_IP=$(kubectl get nodes --namespace default -o jsonpath="{.items[0].status.addresses[0].address}")
  echo http://$NODE_IP:$NODE_PORT
```

通过上述方式安装部署的 Apache APISIX，Admin API 会暴露在集群中 `9180` 端口，Gateway 暴露在 `80` 端口。如果要访问 Admin API，可以使用 `kubectl port-forward` 将端口转发到本地主机上的端口。

这里演示的是转发到本机 `9080` 端口情况，主要是为了和 Apache APISIX 官方文档同步，方便后续验证。

```shell
kubectl port-forward service/apisix-admin 9080:9180
```

之后可参考 [Apache APISIX 快速入门指南](https://apisix.apache.org/zh/docs/apisix/getting-started/)，进行 Upstream 的添加与绑定 Route 等相关操作。

最后进行新建路由的验证环节。

由于在本文演示中使用了 Kind 来搭建本地 K8s 集群，`apisix-gateway` 的 NodePort 访问不了，所以在验证之前还需要额外一步，即将集群中的 `80` 端口转发到本机 `8080` 端口。

```shell
kubectl port-forward service/apisix-gateway 8080:80
```

开始进行验证。

```shell
curl -X GET "http://127.0.0.1:8080/get?foo1=bar1&foo2=bar2" -H "Host: httpbin.org"
```

期望的返回结果可以参考下方示例。

```json
{
  "args": {
    "foo1": "bar1",
    "foo2": "bar2"
  },
  "headers": {
    "Accept": "*/*",
    "Accept-Encoding": "gzip",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.64.1",
    "X-Amzn-Trace-Id": "Root=1-61ac63b5-348d3c5567db393462cd0666",
    "X-Forwarded-Host": "httpbin.org"
  },
  "origin": "127.0.0.1, 192.46.208.201",
  "url": "http://httpbin.org/get?foo1=bar1&foo2=bar2"
}
```

### 部署 Apache APISIX-Dashboard

与部署 Apache APISIX 一样，通过 Helm 安装 Apache APISIX-Dashboard 也只需执行一条指令。

```shell
helm install apisix-dashboard apisix/apisix-dashboard
```

接下来转发 Dashboard 端口到本机。

```shell
kubectl port-forward service/apisix-dashboard 8080:80
```

最后访问本地 `localhost:8080` 就可以看到登录页面了。

:::note 注意
这里部署出来的 Apache APISIX-Dashboard 系统信息中不会出现 Apache APISIX 的节点信息。因为通过 Helm 方式进行安装的话默认是没有启用 `server-info` 插件，如有需要可在 apisix 的configmap 中自行添加。`server-info` 的配置可参考[相关文档](https://apisix.apache.org/docs/apisix/plugins/server-info/)。
:::

## 方式二：通过 yaml 文件部署

相较于上述 Helm 方式的部署，使用 yaml 文件来部署 Apache APISIX，可以更加方便地进行自定义配置。

### 部署 APISIX 及 Dashboard

:::note 注意
如果已经使用方式一部署过，在进行下述安装前需要先清除 ETCD 的 PVC 存储以方便后续操作。
:::

这里我们已经整理好了在部署 Apache APISIX、APISIX-Dashboard 及 etcd 集群时需要用到的 yaml 文件，大家可通过 [apisix-on-kubernetes 仓库](https://github.com/zaunist/apisix-on-kubernetes)进行调用接下来提到的相关文件。

首先克隆上述提到的 `apisix-on-kubernetes` 仓库。

```shell
git clone https://github.com/zaunist/apisix-on-kubernetes.git
```

然后执行以下命令。

```shell
kubectl apply -f etcd.yaml
kubectl apply -f apisix.yaml
kubectl apply -f apisix-dashboard.yaml
```

等待 Pod 全部启动，将 `apisix-dashboard` 端口转发到本机。

```shell
kubectl port-forward service/apisix-dashboard 8080:80
```

最后访问 `localhost:8080`，即可查看 Dashboard 相关信息。默认登录账号密码为 `admin`、`admin`。

:::tip 提示
在安装过程中为了更直观地看到部署情况，可以尝试利用 [Kubernetes Dashboard](https://github.com/kubernetes/dashboard) 在网页端查看 Pod 的运行情况。
:::

## 总结

本文介绍了两种在 Kubernetes 中部署 Apache APISIX 和 Apache APISIX-Dashboard 的方式。两种方式的最终目的都是一样的，但在使用过程中也各有各的优势。

比如使用 Helm 进行安装非常方便，仅需几条指令就可执行所有操作；通过 YAML 文件部署则比较方便地进行相关自定义配置的修改，更具有可操控性。

具体在实际场景中如何进行 Apache APISIX 的安装与部署，还要看大家的使用习惯，这里也仅为大家提供了两种思路进行参考。希望各位在后续使用 Apache APISIX 过程中可以开发出更多有趣的技巧和方法。
