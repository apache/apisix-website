---
title: "从 Traefik 到 APISIX，汽车智能计算平台公司「地平线」在 Ingress Controller 的探索和实践"
authors:
  - name: "张昕"
    title: "Author"
  - name: "韩飞"
    title: "Technical Writer"
    url: "https://github.com/hf400159"
    image_url: "https://github.com/hf400159.png"
keywords: 
- 汽车智能
- AI 芯片
- 地平线
- Apache APISIX
- Ingress
description: 地平线作为一家致力于汽车自动驾驶芯片的公司，在业务迭代中为何从 Traefik 切换到了 APISIX Ingress 去支撑业务。
tags: [Case Studies]
image: https://static.apiseven.com/2022/10/15/6349fb68bf814.png
---

> 地平线作为一家致力于汽车自动驾驶芯片的公司，在业务迭代中为何从 Traefik 切换到了 APISIX Ingress 去支撑业务？

<!--truncate-->

> 作者张昕，地平线云原生开发工程师。

在当前的汽车行业，大多数公司都在向自动驾驶和新能源方向转型，而对于自动驾驶方面，每家企业都投入了大量的资源来完成自动驾驶模型的开发与训练，其中出现了很多明星企业，比如汽车智能计算平台引领者——地平线。地平线主要从事汽车智能计算平台的研发，具有领先的深度学习算法和芯片设计能力，致力于通过底层技术赋能，推动汽车产业的创新发展。

智能汽车是机器人时代第一个大终端，地平线同时也通过软硬件的结合，广泛赋能泛机器人行业的应用落地。在硬件层面，地平线基于自主研发的专用计算架构 BPU（Brain Processing Unit），推出面向智能驾驶的计算平台征程系列和面向泛机器人的旭日系列。

在软件层面，面向智能汽车 AI 软件产品开发及迭代需求，地平线打造地平线艾迪®AI 开发平台，能够为智能汽车 AI 开发者提供数据标注、训练、优化、部署、管理与性能分析等能力。整套基础设施，开箱即用，用户无需从零搭建一套复杂的自动驾驶跨平台系统，只需聚焦于核心价值积累。

![地平线公司](https://static.apiseven.com/2022/10/25/635796032156c.png)

对于一家快速发展的科技公司而言，如何保证业务稳定运行与轻松管理是非常重要的，而网关则是保证业务稳定的第一道关卡。由于之前网关存在了一些无法解决的问题，因此地平线对网关重新进行选型，最终选择了 [Apache APISIX Ingress Controller](https://apisix.apache.org/zh/docs/ingress-controller/getting-started/) 作为公司的流量网关，统一提供服务。

## 网关选型之路

### Traefik 的不足

在使用 APISIX Ingress 之前，业务系统使用的 Ingress Controller 是 Traefik 1.x 版本，但是存在以下几个问题：

* Traefik 1.x 是通过 Ingress 来配置路由规则的，部分插件需要通过添加 `annotation` 的方式进行配置。这种方式，只能针对当前 Ingress下的所有规则添加插件，无法实现更细粒度的配置。

* Traefik 1.x 不支持具体规则可视化配置，无法根据 Request URL 通过页面直接定位到具体服务。

* Traefik 的默认配置文件（`configmap`）内容较少，许多默认配置需要翻阅官方文档，并且有些参数和 NGINX 默认配置不一致，导致维护起来比较麻烦。

针对以上问题，地平线的技术团队决定更换 Ingress Controller，在选型初期也有考虑将 Traefik 升级到 Traefik 2.0 解决上述问题，但是因为也需要采用新的 CRD 来进行升级，迁移成本也不低，不如尝试下其他 Ingress 方案。

### APISIX Ingress 的优势

在选型初期，我们主要对比了 APISIX Ingress、Kong Ingress 和 Envoy，但是除了 APISIX Ingress 其他网关或多或少在功能或性能上无法满足现有场景的需求，因此最终选择了 APISIX Ingress，除了一些通用的功能外，我们更看重以下几点：

* 插件丰富：插件生态好，APISIX 支持的插件，均可以使用 `apisix-ingress-controller` 做声明式配置，并且可以针对 `ApisixRoute` 下的单条 `backend` 定制插件。

* 可视化配置：搭配 APISIX Dashboard 可以看到每条`apisix` `route`。如果同一域名配置在多个 `namespace` 或者是多个 `yaml` 文件中，发生冲突时可以结合 APISIX Dashboard 搜索 `path` 前缀即可快速定位。

* 细粒度校验：APISIX Ingress Controller 会对其管理的 CRD 声明的资源进行校验，假如在 CRD 中声明了不存在的 Service，则会将报错信息存储在 `ApisixRoute` 的 `event` 中，此次变更也不会生效，在一定程度上减少了一些因误操作造成的问题。

* 功能丰富：APISIX 支持热更新和热插件、代理请求重写、多种身份认证、多语言插件开发等诸多特性，更多功能请参考 [APISIX 的功能](https://github.com/apache/apisix/tree/master/docs/zh/latest#%E7%89%B9%E6%80%A7)。

* 社区活跃：Issue 的响应速度很快，相对其他社区， APISIX 活跃开发者数量多。

* 高性能：从下图中，可以看到在和 Envoy 进行压测对比时，APISIX 的性能是 Envoy 的 120% 左右，并且核心数越多 QPS 差距越大。

![性能对比图](https://static.apiseven.com/2022/10/25/6357960098fe0.png)

## 整体架构

从下面的架构图中可以看出，APISIX Ingress 作为一个全流量的入口，无论是命令行工具、Web、SaaS 平台或者 OpenAPI，所有访问的流量均通过 APISIX Ingress 进入上游（业务服务）。而在认证鉴权上，因为公司本身有一个专门的认证服务，所以直接使用了 APISIX 的 `forward-auth` 插件，实现外部鉴权认证。

![应用 APISIX 的架构](https://static.apiseven.com/2022/10/25/63579600ca70e.png)

在网关层，所有的流量均是通过访问域名进入，此时流量会先经过 LVS，由 LVS 分别转发到后端的 APISIX 节点中，最后再由 APISIX 根据路由规则对流量进行分发，转发至相对应的 Pod 中。而在 LVS 上，为了使 LVS 可以直接指向 APISIX Ingress， 他们也将 APISIX Ingress 默认端口由 `9180` 更换为 `80` ，可以更方便地对流量进行转发处理。

![流量处理过程](https://static.apiseven.com/2022/10/25/63579606c7a90.png)

## 使用场景

了解完整体架构后，接下来将分享几个我们公司目前利用 APISIX Ingress 实现的场景。

### 超大文件上传

首先是大文件上传场景，该场景在一般公司可能会比较少，但是如果是做 AI 模型训练的公司，这个场景就比较常见了。该场景主要是在地平线模型训练系统中，研发车采集到的数据会通过网络上传到该系统中，数据大小一般都是在几百 GB 以上，在不调整 APISIX 任何参数的情况下，上传数据量过大时就会发生 OOM。

![文件数据](https://static.apiseven.com/2022/10/25/63579603ed287.png)

因为默认 `client_body_buffer_size` 是 `1MB`，缓冲区满了就会把临时文件写入磁盘，因此造成磁盘 IO 过高。

![磁盘反应](https://static.apiseven.com/2022/10/25/63579600a13fd.png)

如果将写入临时文件的目录指向 `/dev/shm` 共享内存，则又会导致 APISIX（cache）过高。

![缓存反应](https://static.apiseven.com/2022/10/25/6357960182c2b.png)

经过不断的调试，发现是因为 APISIX 没有开启流式上传，针对这个场景，我们将 APISIX 版本由 2.11 升级至 2.13，并且对 APISIX 的参数进行了调整，首先更改 `apisix configmap`启用流式上传的参数 `proxy_request_buffering off`，其次再通过 APISIX Ingress Controller 提供的 CRD `ApisixPluginConfig` 将可复用的配置抽离出来，作为 `namespace` 级别的配置为需要此场景的路由动态设置 `client_max_body_size` 的大小。

![数据细节](https://static.apiseven.com/2022/10/25/6357960290e3f.png)

### 多云环境下的服务调用

在多云环境下的服务调用中，部分业务流量首先会到达本地 IDC，之后会经过 APISIX Ingress 到达 Pod，而在 Pod 中，有些服务则会通过域名访问 Acloud 的服务，部分场景也会存在服务与服务之间进行调用。

主要是涉及到多云训练，用户会以 IDC 为入口，选择集群后即可将任务提交到对应的云端集群。

![多云服务调用](https://static.apiseven.com/2022/10/25/635796054b054.png)

### 使用 `forward-auth` 实现外部认证

在我们刚开始使用 APISIX Ingress 时，APISIX 并没有支持 `forward-auth` 插件，因此我们基于 [`apisix-go-plugin-runner`](https://apisix.apache.org/zh/docs/go-plugin-runner/getting-started/) 自定义了一个插件，但是这样做就多了一层 gRPC 的调用，调试比较困难，很多日志都无法看到。

而在今年年初 APISIX 支持了 [`forward-auth`](https://apisix.apache.org/zh/docs/apisix/plugins/forward-auth/) 插件，我们就将自定义插件更换为官方插件，这样就减少一层 gRPC 的调用，也更加方便进行监控。

![外部认证流程](https://static.apiseven.com/2022/10/25/635796062d19a.png)

### 应用监控

在应用监控中，我们在全局启用了 APISIX 的 `prometheus` 插件，并针对自身业务进行了一些调试和优化，比如增加了实时并发数、QPS、APISIX 实时接口成功率以及 APISIX 的实时带宽，对 APISIX 进行更细粒度地监控。

![应用监控示例](https://static.apiseven.com/2022/10/25/63579601ca17f.png)

## 总结

当前我们仅在部分业务线使用了 Apache APISIX Ingress Controller 作为流量网关，后续也将上线其他业务，为社区带来更加丰富的应用场景。如果你也正在对 Ingress Controller 进行选型，希望通过阅读本文，能够给你一些帮助。

越来越多的用户在生产环境中使用 Apache APISIX Ingress，如果你也正在使用 APISIX Ingress，欢迎在社区中[分享你的使用案例](https://github.com/apache/apisix-ingress-controller/issues/501)。
