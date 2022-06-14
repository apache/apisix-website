---
title: "阿里云 MSE 基于 Apache APISIX 的全链路灰度方案实践"
authors:
  - name: "泮圣伟"
    title: "Author"
  - name: "韩飞"
    title: "Technical Writer"
    url: "https://github.com/hf400159"
    image_url: "https://github.com/hf400159.png"
keywords: 
- Apache APISIX
- API Gateway
- 阿里云微服务引擎
- MSE
description: 本篇文章描述了阿里云微服务引擎 MSE 如何基于 Apache APISIX 灵活的路由能力，配合 MSE 全链路灰度能力，通过极简的配置与无代码侵入的方式，来实现全链路灰度，释放基于 APISIX 的微服务架构的新价值。
tags: [User Case]
---

> 本篇文章描述了阿里云微服务引擎 MSE 如何基于 Apache APISIX 灵活的路由能力，配合 MSE 全链路灰度能力，通过极简的配置与无代码侵入的方式，来实现全链路灰度，释放基于 APISIX 的微服务架构的新价值。

<!--truncate-->

Apache APISIX 是一个开源的云原生 API 网关，作为 API 网关，它兼具动态、实时、高性能等特点，提供了负载均衡、动态上游、灰度发布、服务熔断、身份认证、可观测性等丰富的流量管理功能。你可以使用 Apache APISIX 来处理传统的南北向流量，以及服务间的东西向流量，也可以当做 K8s Ingress controller 来使用。得益于 APISIX 全动态的设计，可以随时进行配置更改并且均不需要重启服务。

阿里云微服务引擎 MSE 提供了非常易用的流量泳道能力，基于 Java Agent 字节码增强的技术实现，无缝支持市面上近 5 年的所有 Spring Cloud 和 Dubbo 的版本，通过极简的配置与无代码侵入的方式，来实现全链路灰度，释放基于 APISIX 的微服务架构的新价值。

## 全链路灰度方案简介

### 相关概念

- 泳道：为相同版本应用定义的一套隔离环境。只有满足了流控路由规则的请求流量才会路由到对应泳道里的打标应用。一个应用可以属于多个泳道，一个泳道可以包含多个应用，应用和泳道是多对多的关系。
- 基线环境：未打标的应用属于基线稳定版本的应用，即稳定的线上环境。
- 流量回退：泳道中所部署的服务数量并非要求与基线环境完全一致，当泳道中并不存在调用链中所依赖的其他服务时，流量需要回退至基线环境，进一步在必要的时候路由回对应标签的泳道。
- 泳道组：泳道的集合。泳道组的作用主要是为了区分不同团队或不同场景。

### 业务场景

基于流量泳道的全链路灰度能力，适用于以下业务场景：

- 日常开发/项目/测试环境隔离；
- 全链路灰度发布；
- 高可用同机房优先路由；
- 全链路压测。

### 技术原理

如何在实际业务场景中去快速落地全链路灰度呢？目前主要有两种解决方案，基于物理环境隔离和基于逻辑环境隔离。

#### 物理环境隔离

物理环境隔离，其实就是通过增加机器的方式来搭建真正意义上的流量隔离。

![物理环境隔离](https://user-images.githubusercontent.com/88811141/173307762-c8d3c115-c7c0-415d-94eb-f259cadab3bb.png)

该方案需要为灰度的服务搭建一套网络隔离、资源独立的环境，并在其中部署服务的灰度版本。由于与正式环境隔离，正式环境中的其他服务无法访问到需要灰度的服务，所以需要在灰度环境中冗余部署 这些线上服务，以便整个调用链路正常进行流量转发。此外，注册中心等一些其他依赖的中间件组件也需要冗余部署在灰度环境中，保证微服务之间的可见性问题，确保获取的节点 IP 地址只属于当前的网络环境。

该方案一般用于企业的测试、预开发环境的搭建，对于线上灰度发布引流的场景来说其灵活性不够。并且微服务多版本的存在在微服务架构中是非常常见的，需要为这些业务场景采用堆机器的方式来维护多套灰度环境。如果应用数目很小，该方式是可以被受的；如果您的应用数目过多的情况下，会造成运维、机器成本过大，成本和代价远超收益。

#### 逻辑环境隔离

另一种方案是构建逻辑上的环境隔离，我们只需部署服务的灰度版本，流量在调用链路上流转时，由经过的网关、各个中间件以及各个微服务来识别灰度流量，并动态转发至对应服务的灰度版本。如下图：

![逻辑环境隔离](https://user-images.githubusercontent.com/88811141/173314750-0a86a58f-b89f-4421-b841-015bb3cd5869.png)

上图可以很好展示这种方案的效果，我们用不同的颜色来表示不同版本的灰度流量，可以看出无论是微服务网关还是微服务本身都需要识别流量，根据治理规则做出动态决策。当服务版本发生变化时，这个调用链路的转发也会实时改变。相比于利用机器搭建的灰度环境，这种方案不仅可以节省大量的机器成 本和运维人力，而且可以帮助开发者实时快速的对线上流量进行精细化的全链路控制。

## 基于 Apache APISIX 全链路灰度产品实践

全链路灰度是微服务最核心的功能之一，也是云上用户在微服务化深入过程中必须具备的功能。全链路灰度因为涉及到的技术和场景众多，如果企业一一进行自我实现，需要花费大量人力成本对其进行扩展与运维。

MSE 服务治理提供了完整的产品化的全链路灰度解决方案，覆盖 RPC、MQ、可观测性等绝大多数场 景。只要架构是基于 Spring Cloud 或者 Dubbo 框架，应用无需升级或代码改动，即可实现企业级全链路灰度功能。

### 使用前提

#### 第一步：安装 APISIX 相关组件

1. 安装 APISIX、apisix-ingress-controller、etcd 等组件。

```C++
helm repo add apisix https://charts.apiseven.com
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update
kubectl create ns ingress-apisix
helm install apisix apisix/apisix \
  --set gateway.type=LoadBalancer \
  --set ingress-controller.enabled=true \
  --set etcd.persistence.storageClass="alicloud-disk-ssd" \
  --set etcd.persistence.size="20Gi" \
  --namespace ingress-apisix \
  --set ingress-controller.config.apisix.serviceNamespace=ingress-apisix
kubectl get service --namespace ingress-apisix
```

在 `ingress-apisix` 命名空间下可以看到无状态的 APISIX 和 `apisix-ingress-controller` 应用、以及有状态的 etcd 应用。

2. 使用 Helm 安装 APISIX Dashboard。

```SQL
helm repo add apisix https://charts.apiseven.com
helm repo update
helm install apisix-dashboard apisix/apisix-dashboard --namespace
ingress-apisix
```

3. 安装完成后，可以绑定一个 SLB。
4. 通过 `{slb-ip}:9000` 访问 APISIX Dashboard。

![Dashboard](https://user-images.githubusercontent.com/88811141/173316825-e590decb-4c35-4602-9590-41ddde8b93cf.png)

#### 第二步：开启微服务治理

这一步骤中，需要开通 MSE 微服务治理、安装 MSE 服务治理组件（ack-onepilot）并为应用开启微服务治理。具体操作信息可参考[阿里云官方教程](https://help.aliyun.com/product/123350.html)。

#### 第三步：部署 Demo 应用程序

在阿里云容器服务中部署 A、B、C 三个应用，每个应用分别部署⼀个`base` 版本和⼀个`gray` 版本；并部署⼀个 Nacos Server 应用，用于实现服务发现。具体可参考此教程完成应用部署：[部署Demo 应用程序](https://help.aliyun.com/document_detail/404845.html#h3-url-3)。部署完成后，你可以通过 APISIX Dashboard 为应用配置 `Service` 进行上游配置。

### 应用场景一：按域名进行路由

在部分场景下，可以通过不同的域名来区分线上基线环境和灰度环境。灰度环境有单独的域名可以配置，假设我们通过访问 [www.gray.com](http://www.gray.com/) 来请求灰度环境，访问 [www.base.com](http://www.base.com/) 走基线环境。

![应用场景一](https://user-images.githubusercontent.com/88811141/173319294-d27fc48a-4d42-4578-9457-4ab9072528a4.png)

调用链路 `Ingress-nginx -> A -> B -> C`，其中 A 可以是一个 `spring-boot` 的应用。

#### 配置 APISIX 路由规则

在 APISIX Dashboard 选择路由并单击创建。匹配条件中域名、请求路径选择 /*，选择对应的上游。分别配置如下路由：

- 当 `host` 为 `www.base.com` 时，路由到 id 为 `401152455435354748` 所对应的上游，即 `spring-cloud-a-svc`；
- 当 `host`为 `www.gray.com` 时，路由到 id 为 `401163331936715388` 所对应的上游，即 `spring-cloud-a-gray-svc`。

然后进行 `base` 对应的路由配置：

```JSON
{
  "uri": "/*",
  "name": "spring-cloud-a",
  "methods": [
    "GET",
    "POST",
    "PUT",
    "DELETE",
    "PATCH",
    "HEAD",
    "OPTIONS",
    "CONNECT",
    "TRACE"
  ],
  "host": "www.base.com",
  "upstream_id": "401152455435354748",
  "labels": {
  "API_VERSION": "0.0.1"
  },
  "status": 1
}
```

进行 `gray` 对应的路由配置：

```JSON
{
  "uri": "/*",
  "name": "spring-cloud-a-gray",
  "priority": 1,
  "methods": [
    "GET",
    "POST",
    "PUT",
    "DELETE",
    "PATCH",
    "HEAD",
    "OPTIONS",
    "CONNECT",
    "TRACE"
  ],
  "host": "www.gray.com",
  "upstream_id": "401163331936715388",
  "labels": {
    "API_VERSION": "0.0.1"
  },
  "status": 1
}
```

#### 配置 MSE 全链路灰度

你需要配置完成 MSE 的全链路发布，具体操作细节可参考此教程：[配置全链路灰度](https://help.aliyun.com/document_detail/404845.html)。

#### 结果验证

访问 `www.base.com` 路由到 A 应用的 `base` 版本：

```Nginx
curl -H"Host:www.base.com" http://47.97.253.177/a
A[172.18.144.15] -> B[172.18.144.125] -> C[172.18.144.90]%
```

访问 `www.gray.com` 路由到 A 应用的 `gray` 版本：

```Nginx
curl -H"Host:www.gray.com" http://47.97.253.177/a
Agray[172.18.144.16] -> Bgray[172.18.144.57] -> Cgray[172.18.144.157]%
```

### 应用场景二：按指定请求参数进行路由

有些客户端无法改写域名，希望能访问 `www.demo.com` 通过传入不同的参数来路由到灰度环境。例如下图中，通过 `env=gray` 这个请求参数，来访问灰度环境。

![应用场景二](https://user-images.githubusercontent.com/88811141/173321500-ee604a73-f41b-4fc1-8861-c591bbb9d257.png)

调用链路 `Ingress-APISIX -> A -> B -> C`，其中 A 可以是一个 `spring-boot` 的应用。

#### 配置 APISIX 路由规则

在 APISIX Dashboard 选择路由并单击创建。匹配条件中新建高级匹配规则、请求路径选择 /*，选择对应的上游。分别配置如下路由：

- 当 `host` 为 `www.demo.com`，请求参数 `env=gray` 时，路由优先匹配 `id` 为 `401163331936715388` 所对应的上游，即 `spring-cloud-a-gray-svc`；
- 当 `host` 为 www.demo.com 时，路由经会匹配 `id` 为 `401152455435354748` 所对应的上游，即 `spring-cloud-a-svc`。

然后进行 `base` 对应的路由配置：

```JSON
{
  "uri": "/*",
  "name": "spring-cloud-a",
  "methods": [
    "GET",
    "POST",
    "PUT",
    "DELETE",
    "PATCH",
    "HEAD",
    "OPTIONS",
    "CONNECT",
    "TRACE"
  ],
  "host": "www.demo.com",
  "upstream_id": "401152455435354748",
  "labels": {
    "API_VERSION": "0.0.1"
  },
  "status": 1
}
```

进行 `gray` 对应的路由配置，如下图所示：

![配置图](https://user-images.githubusercontent.com/88811141/173322176-ab677577-8595-4875-85cb-2dc799070871.png)

```JSON
{
  "uri": "/*",
  "name": "spring-cloud-a-gray",
  "priority": 1,
  "methods": [
    "GET",
    "POST",
    "PUT",
    "DELETE",
    "PATCH",
    "HEAD",
    "OPTIONS",
    "CONNECT",
    "TRACE"
  ],
  "host": "www.demo.com",
  "vars": [
    [
      "arg_env",
      "==",
      "gray"
    ]
  ],
  "upstream_id": "401163331936715388",
  "labels": {
  "API_VERSION": "0.0.1"
  },
  "status": 1
}
```

#### 配置 MSE 全链路灰度

配置 MSE 全链路灰度步骤与**应****用****场景****一**的内容一致。

#### 结果验证

此时，访问 `www.demo.com` 路由到基线环境：

```Nginx
curl -H"Host:www.demo.com" http://47.97.253.177/a
A[172.18.144.15] -> B[172.18.144.125] -> C[172.18.144.90]%
```

此时，访问 `www.demo.com` 同时 `env=gray` 时路由到灰度环境：

```Nginx
curl -H"Host:www.demo.com" http://47.97.253.177/a?env=gray
Agray[172.18.144.16] -> Bgray[172.18.144.57] -> Cgray[172.18.144.157]%
```

> 注意：其中 `47.97.253.177` 为 APISIX 的公网 IP。

## 总结

基于 Apache APISIX 灵活的路由能力，配合 MSE 全链路灰度能力，可以快速实现企业级的全链路灰度的能力。

APSIX 支持按照 Header、Cookie、Params、域名等多种方式进行路由，只需要在网关侧根据需求将流量路由至不同的“泳道”环境后，流量在对应标签的“泳道”中自动闭环，当泳道中并不存在调用链中所依赖的其他服务时，流量需要回退至基线环境，进一步在必要的时候路由回对应标签的泳道。
