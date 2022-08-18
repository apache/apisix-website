---
title: "浅谈 Apache APISIX 的可观测性"
authors:
  - name: "庄浩潮"
    title: "Author"
    url: "https://github.com/dmsolr"
    image_url: "https://avatars.githubusercontent.com/u/29735230?v=4"
  - name: "曾奕霖"
    title: "Technical Writer"
    url: "https://github.com/yzeng25"
    image_url: "https://avatars.githubusercontent.com/u/36651058?v=4"
keywords: 
- Apache APISIX
- 可观测性
- API 网关
- SkyWalking
- Apache
- Prometheus
description: 本文介绍了云原生 API 网关 Apache APISIX 的可观测性能力以及如何通过 Apache SkyWalking 提升Apache APISIX 的可观测性能力及未来规划。
tags: [Plugins,Ecosystem]
image: https://static.apiseven.com/2022/blog/0818/plugins/skywalking.png
---

> 本文介绍了 Apache APISIX 的可观测性能力以及如何通过 Apache SkyWalking 提升Apache APISIX 的可观测性能力。

<!--truncate-->

可观测性是从系统外部去观察系统内部程序的的运行时状态和资源使用情况。衡量可观测性的主要手段包括：Metrics、Logging 和 Tracing，下图是 Metrics、Logging 和 Tracing 之间的关系。

![Metrics、Logging 和 Tracing 关系图](https://static.apiseven.com/202108/1635993536337-f8ee034d-ef3b-40b6-9886-ebde62d8edc6.png)

举个例子，Tracing 和 Logging 重合的部分代表的是 Tracing 在 request 级别产生的日志，并通过 Tracing ID 将 Tracing 和 Logging 关联起来。对这份日志进行一定的聚合运算之后，能够得到一些 Metrics。Tracing 自身也会产生一些 Metrics，例如调用量之间的关系。

## Apache APISIX 的可观测性能力

Apache APISIX 拥有完善的可观测性能力：支持 Tracing 和 Metrics、拥有丰富的 Logging 插件生态、支持查询节点状态。

### Tracing

Apache APISIX 支持多种 Tracing 插件，包括：Zipkin、OpenTracing 和 SkyWalking。需要注意是： Tracing 插件默认处于关闭状态，使用前需要手动开启 Tracing 插件；Tracing 插件需要与路由或全局规则绑定，如果没有采样率的要求，建议与全局规则绑定，这样可以避免遗漏。

### Metrics

在 Apache APISIX 中， Metrics 的相关信息通过 Prometheus Exporter上报，兼容 Prometheus 的数据格式。在 Apache APISIX 中使用 Prometheus Plugin 有两件事情需要注意。

**第一，请尽量提高路由、服务和上游这三者名称的可读性。**

Prometheus Plugin 中有一个名为 `prefer_name` 的参数，将这个参数的值设置为 `true` 时，即：`prefer_name: true`，如果路由、服务和上游这三者的名称可读性比较强，这会带来一些好处：后续通过 Grafana 监控大屏展示参数的时候，不仅能够清楚地展示出所有的数据，还能够清晰地知晓这些数据的来源。如果 `prefer_name` 参数的值为 `false`，则只会展示资源的 ID 作为数据来源，例如 路由 ID、上游 ID，进而造成监控大屏的可读性较低的问题。

**第二，Prometheus Plugin 必须与路由或者全局规则绑定，然后才可以查看到指定资源的 Metrics。**

完成上述设置以后，Metrics 的数据会存储在 Prometheus 里面。由于 Prometheus 的存储性能很好，但展示性能欠佳，所以我们需要借助 Grafana Dashboard 展示数据。我们可以看到 Nginx 实例的 Metrics、网络带宽的 Metrics、路由和上游的 Metrics 等，详情如下图所示：

![Grafana Dashboard](https://static.apiseven.com/202108/1635993660940-9c9bbb0b-d5f1-4add-b93d-1f076de9aebd.png)

### Logging

Apache APISIX 支持多种日志插件，可以与其他外部的平台直接分享日志数据。Error Log 插件支持 HTTP 与 TCP 协议，并且兼容 SkyWalking 的日志格式。也可以通过 FluentBit 等日志收集组件，将日志同步到日志平台进行处理。

Access Log 插件目前还不支持在日志格式里面进行嵌套。因为 Access Log 插件是路由级别的，所以需要跟路由进行绑定，才可以收集到路由的访问日志。但是日志的格式是全局的，而全局只能有一份日志格式。

### 支持查询节点状态

Apache APISIX 的支持查询节点状态，启用之后，可以通过 `/apisix/status` 收集到节点的信息，包括节点数、等待链接数、处理连接数等。

![节点状态](https://static.apiseven.com/202108/1635993774170-ca3bf15d-9f55-42ac-9a2f-2d8955f74c5c.png)

### 美中不足

上文讲到，Apache APISIX 的可观测性能力非常完善，能够收集 Metrics、Logging 和 Tracing 等信息。虽然借助 Apache APISIX 的内置插件配合 Grafana Dashboard，能够解决监控数据收集和指标可视化问题，但是各种数据分散在各个平台。期望有一个可观测性分析平台能集成 Metrics、Logging、Tracing 信息，能够将所有数据联动起来。

## 使用 Apache SkyWalking 增强 Apache APISIX 的观测能力

Apache SkyWalking 是一个针对分布式系统的应用性能监控（APM）和可观测性分析平台。它提供了多维度应用性能分析手段，从分布式拓扑图到应用性能指标、Trace、日志的关联分析与告警。

![Apache SkyWalking](https://static.apiseven.com/202108/1635993914263-b7511acd-9bcf-49ca-aa32-911fc85acfac.png)

### 一站式数据处理

Apache SkyWalking 支持对接 Metrics、Logging、Tracing 等多种监控数据，兼容 Prometheus 数据模型，还可以通过 Log Analysis Language 进行二次聚合，产生新的 Metrics。

### 更详细的数据展示

Apache SkyWalking 的 Dashboard 分为上下两个区域。上部是功能选择区域，下部是面板内容。Dashboard 提供全局、服务、示例、Endpoint 等多个实体维度的 Metrics 相关信息，支持以不同的视图展示可观测性。以全局视图为例，展示的 Metrics 包括：服务负载、慢服务数量、不健康的服务数量等，如下图所示。

![数据展示](https://static.apiseven.com/202108/1635993968588-403c9219-ae66-4b97-9eee-dcb97067b789.png)

另外值得一说的是 SkyWalking Dashboard 的 Trace 视图。SkyWalking 提供了 3 种展现形式：列表、树状图和表格。Trace 视图是分布式追踪的典型视图，这些视图允许用户从不同角度查看追踪数据，特别是 Span 间的耗时关系。

SkyWalking Dashboard 也支持拓扑图。拓扑图是根据探针上行数据分析出的整体拓扑结构。拓扑图支持点击展现和下钻单个服务的性能统计、Tracing、告警，也可以点击拓扑图中的关系线，展示服务之间、服务示例间的性能 Metrics。

### 支持容器化部署

Kubernetes 是一个开源的云原生容器化集群管理平台，目标是让部署容器化的应用简单且高效。Apache SkyWalking 后台可以部署在 Kubernetes 之中，而且得益于 Kubernetes 的高效率管理，可以保证 UI 组件的高可用性。

如果在集群上部署了 Apache APISIX，Apache SkyWalking 支持以 sidecar 或服务发现的形式部署 SkyWalking Satellite，监控集群中的 Apache APISIX。

## 未来计划

Apache APISIX 在未来仍会继续加强可观测性相关的功能支持，例如：

1. 解决 SkyWalking Nginx-Lua 插件的 peer 缺失问题

2. 支持在日志中打印 trace id

3. 接入访问日志

4. 支持网关元数据

## 结语

本文介绍了 Apache APISIX 的可观测性能力以及如何通过 Apache SkyWalking 提升Apache APISIX 的可观测性能力。未来两个社区还会继续深度合作，进一步增强 Apache APISIX 的可观测性能力。希望大家能够多多地参与到 Apache APISIX 和 Apache SkyWalking 项目中来。如果你对这两个开源项目很感兴趣，却不熟悉代码，写文章、做视频、对外分享、积极参与社区和邮件列表讨论都是很不错方式。
