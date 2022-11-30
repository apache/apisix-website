---
title: "APISIX Ingress 是如何支持上千个 Pod 副本的应用"
author: "容鑫"
authorURL: "https://github.com/AlinsRan"
authorImageURL: "https://github.com/AlinsRan.png"
keywords: 
- Kubernetes
- APISIX Ingress
- 开源
- APISIX
- Pod
description: 本文通过介绍 Kubernetes 中上千个 Pod 副本应用场景的解析，提出技术实现的困难。介绍 APISIX Ingress 是如何解决这一难题的。
tags: [Ecosystem]
---

> 本文通过介绍 Kubernetes 中上千个 Pod 副本应用场景的解析，提出技术实现的困难。介绍 APISIX Ingress 是如何解决这一难题的。

<!--truncate-->

## 在 Kubernetes 中为什么会遇到上千个 Pod 副本的应用场景？

在 Kubernetes 中，Pod 是最小的调度单元。应用程序实际是以 Pod 在运行的，通常情况下出于可扩展性和降低爆炸半径等方面的考虑，只会给 Pod 设置有限的资源。那么对于大流量的场景，一般都是通过水平扩容的方式进行应对。

例如电商行业在进行促销活动或秒杀抢购活动时，业务流量相对较大。为了应对这种场景，通常会设置弹性扩容。在活动进行时，服务会进行弹性伸缩直到能够承载流量，这时会基于弹性扩容的策略，为业务增加副本数，也就是 Pod 会变多。

每个 Pod 都有各自唯一的 IP ，但同时 Pod 的 IP 也不是固定的。为了及时追踪 Pod IP 的变化，从而进行负载均衡，Endpoints API 提供了在 Kubernetes 中跟踪网络端点的一种简单而直接的方法。

但随着 Kubernetes 集群和服务逐渐开始为更多的后端 Pod 进行处理和发送请求，比如上文提到大流量场景下，Pod 数量会被不断扩容，Endpoints API 也将变得越大。这种情况下，Endpoints API 局限性变得越来越明显，甚至成为性能瓶颈。

为了解决这个局限性问题，在 Kubernetes v1.21 的版本中引入了对 Endpointslice API 的支持，解决了 Endpoints API 处理大量网络端点带来的性能问题，同时提供了可扩展和可伸缩的能力。

通过下图我们可以明显看到它们之间的区别：

- Endpoints 在流量高峰时的变化：

![Endpoints 在流量高峰时的变化](https://static.apiseven.com/2022/11/25/638039cf30502.png)

- Endpointslices 在流量高峰时的变化：

![Endpointslices 在流量高峰时的变化](https://static.apiseven.com/2022/11/25/638039cf982b0.png)

在 Kubernetes 中，应用之间是如何进行相互访问的呢？Endpoints 和 Endpointslice 具体区别又是什么？和 Pod 有着什么样的关系？APISIX Ingress 中为什么要支持这些特性，以及如何进行安装和使用？本文将着重介绍这些问题。

## Kubernetes 中如何访问应用？

在 Kubernetes 中，每个 Pod 都有其自己唯一的 IP 地址。通常情况下，Service 通过 selector 和一组 Pod 建立关联，并提供了相同的 DNS 名，并可以在它之间进行负载均衡。Kubernetes 集群内不同应用之间可通过 DNS 进行相互访问。

在 Service 创建时，Kubernetes 会根据 Service 关联一个 Endpoints 资源，若 Service 没有定义 selector 字段，将不会自动创建 Endpoints。

### 什么是 Endpoints？

Endpoints 是 Kubernetes 中的一个资源对象，存储在 etcd 中，用来记录一个 Service 对应一组 Pod 的访问地址，一个 Service 只有一个 Endpoints 资源。
Endpoints 资源会去观测 Pod 集合，只要服务中的某个 Pod 发生变更，Endpoints 就会进行同步更新。

比如部署 3 个 httpbin 副本，查看 Pod 的情况，包括 IP 信息。

```bash
$ kubectl get pods -o wide
NAME                                 READY   STATUS    RESTARTS        AGE   IP            NODE             NOMINATED NODE   READINESS GATES
httpbin-deployment-fdd7d8dfb-8sxxq   1/1     Running   0               49m   10.1.36.133   docker-desktop   <none>           <none>
httpbin-deployment-fdd7d8dfb-bjw99   1/1     Running   4 (5h39m ago)   23d   10.1.36.125   docker-desktop   <none>           <none>
httpbin-deployment-fdd7d8dfb-r5nf9   1/1     Running   0               49m   10.1.36.131   docker-desktop   <none>           <none>
```

创建 httpbin 服务，并查看应 Endpoints 端点情况。

```shell
$ kubectl get endpoints httpbin
NAME      ENDPOINTS                                      AGE
httpbin   10.1.36.125:80,10.1.36.131:80,10.1.36.133:80   23d

```

**从上述示例可以看到，Endpoints 中 httpbin 资源对象的所有网络端点，分别对应了每个 Pod 的 IP 地址。**

当然， Endpoints 也有它的一些不足之处，比如：

1. Endpoints 具有容量限制，如果某个 Endpoints 资源中端口的个数超过 1000，那么 Endpoints 控制器会将其截断为 1000。
2. 一个 Service 只有一个 Endpoints 资源，这意味着它需要为支持相应服务的每个 Pod 存储 IP 等网络信息。这导致 Endpoints 资源变的十分巨大，其中一个端点发生了变更，将会导致整个 Endpoints 资源更新。当业务需要进行频繁端点更新时，一个巨大的 API 资源被相互传递，而这会影响到 Kubernetes 组件的性能，并且会产生大量的网络流量和额外的处理。

### 什么是 Endpointslices？

Endpointslices 为 Endpoints 提供了一种可扩缩和可拓展的替代方案，缓解处理大量网络端点带来的性能问题，还能为一些诸如拓扑路由的额外功能提供一个可扩展的平台。**该特性在 Kubernetes v1.21+ 的版本中已提供支持。**

EndpointSlice 旨在通过分片的方式来解决此问题，并没有使用单个 Endpoints 资源跟踪服务的所有网络端点，而是将它们拆分为多个较小的 EndpointSlice。

默认情况下，控制面创建和管理的 EndpointSlice 将包含不超过 100 个端点。 你可以使用 [kube-controller-manager](https://kubernetes.io/zh-cn/docs/reference/command-line-tools-reference/kube-controller-manager/) 的 `--max-endpoints-per-slice` 标志设置此值，其最大值为 1000。

### 为什么需要 Endpointslices？

首先，我们考虑具有 2000 个 Pod 的服务它最终可能具有 1.0 MB 的 Endpoints 资源。在生产环境中，如果该服务发生滚动更新或节点迁移，那么 Endpoints 资源将会频繁变更。

想象一下，如果滚动更新会导致全部 Pod 都被替换，[由于 etcd 具有最大请求大小限制](https://etcd.io/docs/v3.3/dev-guide/limit/#request-size-limit)，Kubernetes 对 Endpoints 最大容量限制为 1000，如果网络端点数量超出了 1000，那么多出来的网络端点，将不会被 Endpoints 资源记录。

当然也可能因为一些需求，需要多次进行滚动更新，那么这个巨大的 API 资源对象将会 Kubernetes 组件中来回传递，极大影响了 Kubernetes 组件的性能。
如果使用了 Endpointslices，假设一个服务后端有 2000 个 Pod。如果将配置修改为每个  Endpointslices 存储 100 个端点，最终将获得 20 个 Endpointslices。添加或删除 Pod 时，只需要更新其中 1 个 Endpointslice 资源即可，这样操作后，可扩展性和网络可伸缩有了很大的提升。

比起在流量高峰时，服务为了承载流量，扩容出大量的 Pod，Endpoints 资源会被频繁更新，两个使用场景的差异就变得非常明显。更重要的是，既然服务的所有 Pod IP 都不需要存储在单个资源中，那么我们就不必担心 etcd 中存储的对象的大小限制。

### Endpoints VS Endpointslice

> 因为 Endpointslice 是在 Kubernetes v1.21+ 的版本得到支持，所以该结论是基于 Kubernetes v1.21+ 版本。

通过上文的描述我们总结一下两种资源的适用情况。

Endpoints 适用场景：

- 有弹性伸缩需求，Pod 数量较少，传递资源不会造成大量网络流量和额外处理。
- 无弹性伸缩需求，Pod 数量不会太多。哪怕 Pod 数量是固定，但是总是要滚动更新或者出现故障的。

Endpointslice 适用场景:

- 有弹性需求，且 Pod 数量较多（几百上千）。
- Pod 数量很多（几百上千），因为 Endpoints 网络端点最大数量限制为 1000，所以超过 1000 的 Pod 必须得用 Endpointslice。

## 在 APISIX Ingress 中的实践

APISIX Ingress Controller 是一个 Ingress 控制器的实现。可以将用户配置的规则转换为 Apache APISIX中的规则，从而使用 APISIX 完成具体的流量承载。
在具体实现过程中，APISIX Ingress 通过 watch Endpoints 或 Endpointslice 资源的变化，从而让 APISIX 能够对 Pod 进行负载均衡和健康检查等。为了能够支持 Kubernetes v1.16+ 的版本，APISIX Ingress 在安装时，默认使用 Endpoints 的特性。

**如果你的集群版本为 Kubernetes v1.21+，在安装 APISIX Ingress 时，需要指定 `watchEndpointSlice=true` 标志来开启 Endpointslice 特性的支持。**

> 注意：在集群的版本为 Kubernetes v1.21+ 时，我们推荐使用 Endpointslice 特性。否则当服务中 Pod 数量超过 `--max-endpoints-per-slice` 标志设定的值时，由于 APISIX Ingress watch 的是 Endpoints 资源对象，则会导致配置的丢失。开启此特性，就不额外关注 `--max-endpoints-per-slice` 的值。

以下将为你简单介绍如何在 APISIX Ingress 中应用 Endpointslice 特性。

### 创建包含 20 个副本的 Service

使用 `kubectl apply -f httpbin-deploy.yaml` 命令，在 Kuernetes 中部署 httpbin 应用服务，并创建 20 个 Pod 副本。具体 `htppbin-deploy.yaml` 文件配置可参考下方代码。

```YAML
# htppbin-deploy.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: httpbin-deployment
spec:
  replicas: 20
  selector:
    matchLabels:
      app: httpbin-deployment
  strategy:
    rollingUpdate:
      maxSurge: 50%
      maxUnavailable: 1
    type: RollingUpdate
  template:
    metadata:
      labels:
        app: httpbin-deployment
    spec:
      terminationGracePeriodSeconds: 0
      containers:
        - livenessProbe:
            failureThreshold: 3
            initialDelaySeconds: 2
            periodSeconds: 5
            successThreshold: 1
            tcpSocket:
              port: 80
            timeoutSeconds: 2
          readinessProbe:
            failureThreshold: 3
            initialDelaySeconds: 2
            periodSeconds: 5
            successThreshold: 1
            tcpSocket:
              port: 80
            timeoutSeconds: 2
          image: "kennethreitz/httpbin:latest"
          imagePullPolicy: IfNotPresent
          name: httpbin-deployment
          ports:
            - containerPort: 80
              name: "http"
              protocol: "TCP"

---

apiVersion: v1
kind: Service
metadata:
  name: httpbin
spec:
  selector:
    app: httpbin-deployment
  ports:
    - name: http
      port: 80
      protocol: TCP
      targetPort: 80
  type: ClusterIP
```

### 通过 APISIX Ingress 代理

第一步，使用 Helm 安装 APISIX Ingress。
通过 `--set ingress-controller.config.kubernetes.watchEndpointSlice=true` 开启 Endpointslice 特性的支持。

```YAML
helm repo add apisix https://charts.apiseven.com
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update


kubectl create ns ingress-apisix
helm install apisix apisix/apisix \
  --set gateway.type=NodePort \
  --set ingress-controller.enabled=true \
  --namespace ingress-apisix \
  --set ingress-controller.config.apisix.serviceNamespace=ingress-apisix \
  --set ingress-controller.config.kubernetes.watchEndpointSlice=true
```

第二步，使用 CRD 资源进行代理。注意，APISIX Ingress 中对 Endpoints 和 Endpointslice 特性的支持，使用者是感知不到的，它们的配置都是一致的。

```YAML
apiVersion: apisix.apache.org/v2
kind: ApisixRoute
metadata:
  name: httpbin-route
spec:
  http:
  - name: rule
    match:
      hosts:
      - httpbin.org
      paths:
      - /get
    backends:
       - serviceName: httpbin
         servicePort: 80
```

第三步，进入 APISIX Pod 中查看。可以看到在 APISIX 中的 upstream 对象 nodes 字段包含了 20 个 Pod 的 IP 地址。

```bash
kubectl exec -it ${Pod for APISIX} -n ingress-apisix -- curl "http://127.0.0.1:9180/apisix/admin/upstreams" -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1'
```

```JSON
{
    "action": "get",
    "count": 1,
    "node": {
        "key": "\/apisix\/upstreams",
        "nodes": [
            {
                "value": {
                    "hash_on": "vars",
                    "desc": "Created by apisix-ingress-controller, DO NOT modify it manually",
                    "pass_host": "pass",
                    "nodes": [
                        {
                            "weight": 100,
                            "host": "10.1.36.100",
                            "priority": 0,
                            "port": 80
                        },
                        {
                            "weight": 100,
                            "host": "10.1.36.101",
                            "priority": 0,
                            "port": 80
                        },
                        {
                            "weight": 100,
                            "host": "10.1.36.102",
                            "priority": 0,
                            "port": 80
                        },
                        {
                            "weight": 100,
                            "host": "10.1.36.103",
                            "priority": 0,
                            "port": 80
                        },
                        {
                            "weight": 100,
                            "host": "10.1.36.104",
                            "priority": 0,
                            "port": 80
                        },
                        {
                            "weight": 100,
                            "host": "10.1.36.109",
                            "priority": 0,
                            "port": 80
                        },
                        {
                            "weight": 100,
                            "host": "10.1.36.92",
                            "priority": 0,
                            "port": 80
                        }
                        ... // 以下省略 13 个节点
                        // 10.1.36.118
                        // 10.1.36.115
                        // 10.1.36.116
                        // 10.1.36.106
                        // 10.1.36.113
                        // 10.1.36.111
                        // 10.1.36.108
                        // 10.1.36.114
                        // 10.1.36.107
                        // 10.1.36.110
                        // 10.1.36.105
                        // 10.1.36.112
                        // 10.1.36.117
                    ],
                    "labels": {
                        "managed-by": "apisix-ingress-controller"
                    },
                    "type": "roundrobin",
                    "name": "default_httpbin_80",
                    "scheme": "http"
                },
                "key": "\/apisix\/upstreams\/5ce57b8e"
            }
        ],
        "dir": true
    }
}
```

上述信息与 Endpointslice 中的网络端点相对应。

```YAML
addressType: IPv4
apiVersion: discovery.k8s.io/v1
endpoints:
- addresses:
  - 10.1.36.92
  ...
- addresses:
  - 10.1.36.100
  ...
- addresses:
  - 10.1.36.104
  ...
- addresses:
  - 10.1.36.102
  ...
- addresses:
  - 10.1.36.101
  ...
- addresses:
  - 10.1.36.103
  ...
- addresses:
  - 10.1.36.109
  ...
- addresses:
  - 10.1.36.118
  ...
- addresses:
  - 10.1.36.115
  ...
- addresses:
  - 10.1.36.116
  ...
- addresses:
  - 10.1.36.106
  ...
- addresses:
  - 10.1.36.113
  ...
- addresses:
  - 10.1.36.111
  ...
- addresses:
  - 10.1.36.108
  ...
- addresses:
  - 10.1.36.114
  ...
- addresses:
  - 10.1.36.107
  ...
- addresses:
  - 10.1.36.110
  ...
- addresses:
  - 10.1.36.105
  ...
- addresses:
  - 10.1.36.112
  ...
- addresses:
  - 10.1.36.117
  ...
kind: EndpointSlice
metadata:
  labels:
    endpointslice.kubernetes.io/managed-by: endpointslice-controller.k8s.io
    kubernetes.io/service-name: httpbin
  name: httpbin-dkvtr
  namespace: default
ports:
- name: http
  port: 80
  protocol: TCP
```

## 总结

本文介绍了 Kubernetes 需要部署大量 Pod 的场景和遇到的问题，对比了 Endpoints 和 Endpointslice 之间区别，以及如何安装 APISIX Ingress 来使用 Endpointslice 的特性。

如果你的集群版本为 Kubernetes v1.21+，推荐在安装 APISIX Ingress 时开启 Endpointslice 特性支持，这样就不用关注 `--max-endpoints-per-slice` 标志设定的值，从而避免配置丢失。
