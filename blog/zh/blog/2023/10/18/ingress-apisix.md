---
title: "APISIX Ingress Controller：一种无需 etcd 的轻量级部署方式"
authors:
  - name: "容鑫"
    title: "Author"
    url: "https://github.com/AlinsRan"
    image_url: "https://github.com/AlinsRan.png"
  - name: "Yilia Lin"
    title: "Technical Writer"
    url: "https://github.com/Yilialinn"
    image_url: "https://avatars.githubusercontent.com/u/114121331?v=4"
keywords: 
- Apache APISIX
- APISIX Ingress Controller
- etcd
description: APISIX Ingress Controller 创新架构，摆脱对 etcd 集群的依赖，极大简化维护成本和系统复杂性。
tags: [Community]
image: https://static.apiseven.com/2022/10/19/634f6677742a1.png
---

> APISIX Ingress Controller 创新架构，摆脱对 etcd 集群的依赖，极大简化维护成本和系统复杂性。
<!--truncate-->

## 背景

APISIX Ingress Controller 是一个基于 Apache APISIX 的 Kubernetes Ingress Controller，它可以将 Kubernetes 中的 Ingress/CRDs 资源转换为 Apache APISIX 的路由规则，并同步到 Apache APISIX 集群中。由此一来，用户可以利用 Apache APISIX 的强大功能，如插件、负载均衡、健康检查等，来管理 Kubernetes 的入口流量。

![APISIX Ingress Controller Architecture](https://static.apiseven.com/uploads/2023/10/24/aezup4a9_APISIX-Ingress-1.png)

![Architecture of APISIX Ingress Controller with Gateway API](https://static.apiseven.com/uploads/2023/10/24/ZtjVM6dH_APISIX-Ingress-2.png)

在之前的版本中，部署 APISIX Ingress Controller 集群需要额外维护一套高可用的 etcd 集群。实际上在使用过程中，它并不是那么好用，会带来了一些问题：

- **etcd 集群维护成本高**：部署高可用集群需要较高的学习与维护成本，需要考虑内存等系统资源的消耗。在 Kubernetes 中部署 etcd 集群需要注意的事项较多，往往由于不熟悉 etcd 而无法有效解决问题。还需关心内存等系统资源消耗。

- **使用成本高**：APISIX Ingress Controller 集群的部署需要三个组件，相比于单个组件的 ingress-nginx 而言，当前架构需要较高的学习和调试成本，十分不易于使用，给初次使用者带来额外的负担。

- **数据冗余和一致性问题**：即 Kubernetes etcd 保留一份，APISIX ETCD 集群也保留了一份。在使用过程中，往往需要避免两者数据不一致的情况，但由于 APISIX 并不依赖于 Ingress controller，它们之间处于解耦的关系，很难处理和避免这种情况。

- **实现 Gatewa API 遇到阻碍**：Gateway API 能够动态的管理一组 Gateway（APISIX） 的生命周期，APISIX 配置主要来源于 etcd，Ingress Controlle 需要同时感知一组 etcd 集群与 APISIX 的状态，这使得维护和管理都会十分复杂。

可以看到，在整个架构中，Apache APISIX 并不依赖于 Ingress Controller，后者只承担着配置推送的角色，实际上它并不具备管理 APISIX 的能力，这些问题在现有的架构中难以解决。**为了这些解决问题，我们需要设计新的 APISIX Ingress Controller 架构。**

## 新架构的设计

如果要解决现有架构的问题，则必须把 etcd 组件去掉。当前主要考虑了以下两个方案：

1. **渲染 `apisix.yaml` 配置文件**：根据 CRD 生成 `apisix.yaml` 配置文件，APISIX 在 yaml 部署模式下定期每秒钟全量读取 `apisix.yaml` 配置文件。

2. **模拟 etcd server API**：根据 CRD 构建 KV 内存数据库，并模拟 etcd server API 提供给 APISIX 进行使用。APISIX 将会尝试 watch Controller 提供的资源配置，并通知到 APISIX 实例。

显然，第一种方式会简单很多，但并不适用于网关直连后端 Pod 的场景，因为 Pod IP 在 Kubernetes 中具有动态伸缩的特性，Ingress Controller 会不断的生成 `apisix.yaml` 配置，这会导致 APISIX 路由树被频繁重建，从而造成长期的性能抖动。最终经社区讨论决定采用第二种方案，它的架构如下图所示：

![Architecture of New APISIX Ingress Controller](https://static.apiseven.com/uploads/2023/10/24/H7xooJ59_APISIX-Ingress-3.png)

![Architecture of New APISIX Ingress Controller (HA)](https://static.apiseven.com/uploads/2023/10/24/UbKWYGar_APISIX-Ingress-4.png)

APISIX Ingress Controller 在 Release v1.7.0 版本中实现了新架构，它相比具有以下优势：

- **以声明式配置作为配置的唯一来源**：APISIX 将只会地依赖于 Control Plane 提供的配置信息并作为唯一来源，这是 Kubernetes 常见的方式，极大减少了运维复杂性。

- **无需维护独立的 etcd 集群**：新架构摆脱了对独立 etcd 集群的依赖，对于用户来说，极大减少了维护成本与复杂性，更易于部署与使用。

- **推进 Kubernetes Gateway API 标准**：APISIX 将依赖于 Ingress Controller，使得后者能够管理 Gateway 的生命周期，这有助于落实 Gateway API 的完整实现。

### Gateway API 理想中的新架构

Gateway API 是 Ingress API 的下一代版本，提供了更丰富的功能和表达能力。目前 Gateway API 已得到了众多厂商和项目的支持，APISIX Ingress Controller 作为 Gateway API 的实现者之一，既遵循了 Gateway API 的标准规范，又结合了 Apache APISIX 的丰富特性，为用户提供了更多的网关配置和策略选项。

新架构的落地能够进一步推进了 Gateway API 的实现，以提供更好的路由配置和策略，并降低维护成本，使其更易部署与使用，同时也可以充分利用 Gateway API 的优势，提高 API 网关的管理效率。

![Gateway API](https://static.apiseven.com/uploads/2023/10/17/9n1XraKT_Ingress-APISIX-5.png)

## 新架构部署与使用

在本章节中，将会说明在 Kubernetes 中高可用安装和部署 APISIX Ingress Controller，并在例子中演示如何配置 `ApisixRoute` 以访问 `httpbin` 应用服务。

### 安装 APISIX Ingress Controller

1. 你可以运行以下命令，从 Github 克隆 APISIX 源码：

```shell
git clone --depth 1 --branch 1.7.0 https://github.com/apache/apisix-ingress-controller.git ingress-apisix-1.7.0

cd ingress-apisix-1.7.0
```

2. 安装 CRDs

```shell
kubectl apply -k samples/deploy/crd/v1/
```

3. 安装 APISIX Ingress Controller

```shell
kubectl apply -f samples/deploy/composite.yaml
```

4. 检查部署状态

- 检查 service

  ```shell
  kubectl get service  -n ingress-apisix # check service
  ```

  ```shell
  NAME                        TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)                      AGE
  ingress-apisix-gateway      NodePort    10.99.236.58     <none>        80:31143/TCP,443:30166/TCP   90s
  ```

- 检查 pods

  ```shell
  kubectl get pods -n ingress-apisix # check pod
  ```

  ```shell
  NAME                                                 READY   STATUS    RESTARTS   AGE
  ingress-apisix-composite-deployment-5df9bc99c7-xxpvq   2/2     Running   0          100s
  ```

### 高可用部署

- 部署 3 个实例，仅需配置 [replicas](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/) 便可实现高可用。

```shell
 kubectl scale deployment ingress-apisix-composite-deployment --replicas=3 -n ingress
-apisix
```

- 检查部署状态

```shell
kubectl get pods -n ingress-apisix
```

```shell

NAME                                                   READY   STATUS    RESTARTS   AGE
ingress-apisix-composite-deployment-6bfdc5d6f6-gjgql   2/2     Running   0          20s
ingress-apisix-composite-deployment-6bfdc5d6f6-jb24q   2/2     Running   0          20s
ingress-apisix-composite-deployment-6bfdc5d6f6-sjpzr   2/2     Running   0          45h
```

### 使用示例

> ApisixRoute 是 Ingress 的 CRDs 资源，用于表示将流量路由到具体的后端服务。

以下示例将延迟如何配置 `ApisixRoute` 将流量路由 `httpbin` 后端服务。

#### 部署 httpbin 应用服务

- 部署 `httpbin` 应用服务以及配置 `ApisixRoute`：

```shell
kubectl apply -f samples/httpbin/httpbin-route.yaml
```

- 具体 `ApisixRoute` 配置如下：

  - 带有 `Host: httpbin.org` 的所有请求将会路由到 `httpbin` 服务

  ```YAML
  apiVersion: apisix.apache.org/v2
  kind: ApisixRoute
  metadata:
    name: httpbin-route
  spec:
    http:
      - name: route-1
        match:
          hosts:
            - httpbin.org
          paths:
            - /*
        backends:
          - serviceName: httpbin
            servicePort: 80
  ```

#### 访问 httpbin 测试

通过本地端口转发，访问 `ingress-apisix-gateway` 服务，请求将从 ingress-apisix-gateway 路由到 httpbin 应用程序。

```Bash
# forward port 9080 -> service 80
kubectl port-forward service/ingress-apisix-gateway 9080:80 -n ingress-apisix &

# acesss httpbin
curl http://127.0.0.1:9080/headers -H 'Host: httpbin.org'
```

```Bash
{
  "headers": {
    "Accept": "*/*",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.74.0",
    "X-Forwarded-Host": "httpbin.org"
  }
}
```

## 总结

本文详细探讨了 APISIX Ingress Controller 的创新架构，它摆脱了对 etcd 集群的依赖，极大地简化了维护成本和系统复杂性。同时，APISIX Ingress Controller 也在积极推进 Kubernetes Gateway API 标准在 Ingress Controller 中的落地实现，以提供更丰富和一致的流量管理能力。

总而言之，无论是 APISIX Ingress Controller 的新架构还是 Kubernetes Gateway API 实现的落地，旨在为用户提供更加强大、灵活和易用的 Ingress Controller 解决方案，以满足不断变化的云原生应用程序部署和流量管理需求。
