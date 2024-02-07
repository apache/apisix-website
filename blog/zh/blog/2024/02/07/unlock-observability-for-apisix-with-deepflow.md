---
title: "基于 DeepFlow 构建 APISIX 的统一可观测性能力"
authors:
  - name: 李倩
    title: Author
  - name: 彭斌
    title: Author
keywords:
  - APISIX
  - DeepFlow
description: 本文旨在阐述如何利用 DeepFlow 基于 eBPF 的零侵扰特性构建 APISIX 可观测性解决方案。
tags: [Ecosystem]
image: https://static.apiseven.com/uploads/2024/02/07/9QAMhtmJ_deepflow-cover.jpeg
---

> 本文旨在阐述如何利用 DeepFlow 基于 eBPF 的零侵扰特性构建 APISIX 可观测性解决方案。
<!--truncate-->

随着应用组件的可观测性逐渐受到重视，Apache APISIX 引入插件机制丰富了可观测数据源。然而，这些数据分散在多个平台，形成了数据孤岛。本文旨在阐述如何利用 DeepFlow 基于 eBPF 的零侵扰特性构建 APISIX 可观测性解决方案，在此基础上统一集成 APISIX 插件已有的丰富数据源，消除孤岛、构建统一的可观测性平台，以全面监控和分析 APISIX 网关。通过 DeepFlow，APISIX 可以实现从流量监控、追踪分析、到性能优化的全面可观测性，消除数据分散并提供中心化的监控视图，加速故障排查和性能调优，让 DevOps 和 SRE 团队的工作更加高效。本文将重点梳理 APISIX 的追踪数据、指标数据、访日日志及性能剖析数据如何对接 DeepFlow。

![Integrating APISIX with DeepFlow](https://static.apiseven.com/uploads/2024/02/07/klRaMpb4_deepflow-1.jpeg)

## 1. 安装 APISIX 和 DeepFlow

基于 DeepFlow 建构 APISIX 的统一可观测性能力，需要先将 DeepFlow 及 APISIX 都部署起来。本文为了方便，将 DeepFlow 和 APISIX 都以 K8s 服务的形式部署在一个 All-in-One 的 K8s 集群中，整个部署过程大概 5 分钟左右完成。详细的部署过程，参考 [DeepFlow 官方部署文档](https://apisix.apache.org/docs/apisix/3.2/installation-guide/)及 [APISIX 官方部署文档](https://deepflow.io/docs/zh/ce-install/all-in-one/)。

> 注意：为了发挥 DeepFlow 基于 eBPF 的可观测性能力，请确保服务器 Linux 操作系统内核在 4.14 之上。

## 2. 分布式追踪

使用 DeepFlow 实现 APISIX 及后端服务的分布式追踪能力有两种方案：利用 eBPF，DeepFlow 可以在不修改 APISIX 及后端服务配置及代码的前提下实现开箱即用的 RPC 粒度分布式追踪；而当后端服务已具备 APM（Application Performance Monitoring） 能力 —— 比如已经使用了 OpenTelemetry 或者 SkyWalking 等工具时，可结合 APISIX 的 Tracers 插件，将所有追踪数据统一集成到 DeepFlow，实现全链路的应用函数粒度的分布式追踪。

![Integrating APISIX with DeepFlow](https://static.apiseven.com/uploads/2024/02/07/hA587UwF_deepflow-2.jpeg)

### 2.1 方式一：DeepFlow eBPF AutoTracing

DeepFlow 的分布式追踪（AutoTracing）能力是开箱即用的，无需 APISIX 开启任何插件，仅需要将 deepflow-agent 部署在 APSIX 所在的服务器即可。在 Grafana 中找到 DeepFlow 提供的 Distributed Tracing Dashboard，即可对某一个调用点击发起追踪，并看到这个调用在 APISIX 及其后端服务中的全链路追踪过程。如下图所示：

①：通过 nodeport 的形式访问到 APISIX 网关服务所在 K8s Node 的端口
②：进入到 APISIX 网关服务所对应的 POD 的网卡
③：进入到 APISIX 网关服务中的 OpenResty 进程
④：完成业务处理，经由 OpenResty 进程将请求转发给后端服务
⑤：经由 APISIX 网关服务所对应的 POD 网卡转发
⑥/⑦：将请求转发给后端服务

![Integrating APISIX with DeepFlow](https://static.apiseven.com/uploads/2024/02/07/XNkYJZ13_deepflow-3.jpeg)

### 2.2 方式二：DeepFlow eBPF + OpenTelemetry

此方式为 APISIX 利用 OpenTelemetry 插件生成 Trace 数据，后端服务也具备 APM 能力并且可将生成的 Trace 数据转化为 OpenTelemetry 格式。当 APISIX 与后端服务都将 Trace 数据发送给 DeepFlow 时，DeepFlow 能够生成包含 APM `应用 SPAN`、eBPF `系统 SPAN`、cBPF `网络 SPAN` 的无盲点全栈调用链追踪火焰图。

当我们希望得到应用进程内部函数粒度的分布式追踪链路，或者后端服务在处理一个调用时使用了线程池（会导致 DeepFlow AutoTracing 断链）时，可以采用这种方式。

**2.2.1 部署具备 APM 能力的后端服务**

为了展示完整的追踪效果，我们首先在 APISIX 网关后面部署了一个支持 OpenTelemetry 能力的 Demo 应用。Demo 应用的部署可参考：[DeepFlow Demo - 一键部署基于 Spring Boot 编写的五个微服务组成的 WebShop 应用](https://deepflow.io/docs/zh/integration/input/tracing/opentelemetry/#%E5%9F%BA%E4%BA%8E-spring-boot-demo-%E4%BD%93%E9%AA%8C)。在 APISIX 上创建访问后端服务的路由，访问域名为 apisix.deepflow.demo。

```
apiVersion: apisix.apache.org/v2
kind: ApisixRoute
metadata:
  name: deepflow-apisix-demo
  namespace: deepflow-otel-spring-demo
spec:
  http:
    - name: deepflow-apisix-demo
      match:
        hosts:
          - apisix.deepflow.demo
        paths:
          - "/*"
      backends:
        - serviceName: web-shop
          servicePort: 18090
```

**2.2.2 在 APSIX 中开启 OpenTelemetry 插件**

在 APISIX 配置中添加 opentelemetry plugins：

```
## vim ./apisix/.values.yaml
plugins:
  - opentelemetry
#...
pluginAttrs:
  opentelemetry:
    resource:
      service.name: APISIX
    collector:
      ## 将数据传给 deepflow-agent
      ## 当然，这里也可以发给 otel-collector 进行处理后，再由 otel-collectorf发送至 deepflow-agent
      address: deepflow-agent.deepflow.svc.cluster.local/api/v1/otel/trace
      request_timeout: 3

## 添加后更新 helm upgrade --install -n apisix apisix ./apisix
```

针对指定路由开启 OpenTelemetry 功能：

```
## 查看路由 ID
## 找到对应域名的路由 ID
curl -s http://10.109.77.186:9180/apisix/admin/routes -H 'X-API-KEY: 此处为 apisix-admin token' | jq
```

```
## 针对具体路由开启 otel 功能
curl http://10.109.77.186:9180/apisix/admin/routes/此处为路由ID -H 'X-API-KEY: 此处为 apisix-admin token' -X PUT -d '
{
    "name": "deepflow-apisix-demo",            ## 给这个路由配置个名字
    "methods": ["GET"],
    "uris": ["/*"],
    "plugins": {
        "opentelemetry": {
            "sampler": {
                "name": "always_on"
            },
            "additional_attributes": [        ## 可通过 additional_attributes 自定义 Span 标签
                "deepflow=demo"
            ]
        }
    },
    "upstream": {
        "type": "roundrobin",                 ## RR 轮询
        "nodes": {                            ## 上游地址
            "10.1.23.200:18090": 1            ## 服务访问地址:上游编号
        }
    }
}'
```

**2.2.3 使用 DeepFlow 集成 OpenTelemetry 追踪数据**

通过 DeepFlow Agent 集成 OpenTelemetry 的 Span 数据，功能默认开启，无需额外配置。

```
## 查看 deepflow-agent 默认配置
## deepflow-ctl agent-group-config example

## 这个参数控制是否启接收外部数据源，包括 Prometheus Telegraf OpenTelemetry 和 SkyWalking
## Data Integration Socket
## Default: 1. Options: 0 (disabled), 1 (enabled).
## Note: Whether to enable receiving external data sources such as Prometheus,
##   Telegraf, OpenTelemetry, and SkyWalking.
#external_agent_http_proxy_enabled: 1
```

**2.2.4 OpenTelemetry 集成效果展示**

我们在客户端发起一条访问 WebShop 服务的命令：

```
curl -H "Host: apisix.deepflow.demo" 10.1.23.200:44640/shop/full-test
## 此处 IP 为 k8s 集群节点 IP，44640 端口为 APISIX 9180 暴露的 NodePort
```

在 Grafana 中打开 DeepFlow 提供的 Distributed Tracing Dashboard，找到对应的调用点击发起追踪，能看到 APISIX 与后端服务都能追踪出来，且 APM 生成的应用 SPAN 与 DeepFlow 生成的网络 SPAN 及系统 SPAN 都完整的关联在一张火焰图上：

> 注：火焰图中的 A 表示 APM 生成的应用 SPAN，N 和 S 表示 DeepFLow 生成的网络 SPAN 及系统 SPAN。

![Integrating APISIX with DeepFlow](https://static.apiseven.com/uploads/2024/02/07/UqbPnqST_deepflow-4.jpeg)

## 3. 性能指标

对于性能指标，在 DeepFlow 中同样能开箱即用查看 Endpoint 粒度的 RED（吞吐、时延、异常）性能指标，以及丰富的 TCP 网络性能指标（吞吐、重传、零窗、建连异常等）。同样，APISIX 的 Metrics 类的插件 —— 比如 Prometheus、node-status 等插件获取到的实例、路由粒度的 HTTP 状态码、带宽、连接数、时延等指标数据，可集成到 DeepFlow 中，并在 APISIX 提供的 Grafana Dashboard 中查看。

![Integrating APISIX with DeepFlow](https://static.apiseven.com/uploads/2024/02/07/moFwGgPH_deepflow-5.jpeg)

### 3.1 开箱即用的 eBPF 性能指标

在 APISIX 所在的服务器上部署 deepflow-agent 后，可自动采集应用及网络层面非常细粒度的指标量，例如精细到某个客户端、某个 Endpoint 的请求速率、响应时延、异常状态；某一次 TCP 建连时延，建连异常等等。详细的指标量可参考 [DeepFlow 官网关于指标量的介绍](https://deepflow.io/docs/zh/features/universal-map/metrics-and-operators/)。在 Grafana 中打开 DeepFlow 提供的 Applicaiton - xxx Ingress  Dashboard，可查看 APISIX 相关的应用层性能指标，在 Network xxx Dashboard 中可查看网络相关的指标。

![Integrating APISIX with DeepFlow](https://static.apiseven.com/uploads/2024/02/07/lbVMAzAa_deepflow-6.jpeg)

![Integrating APISIX with DeepFlow](https://static.apiseven.com/uploads/2024/02/07/3615sk3K_deepflow-7.jpeg)

### 3.2 在 APISIX 中开启 Prometheus 插件

在 APISIX 配置中添加 Prometheus 插件：

```
## vim ./apisix/.values.yaml
plugins:
  - prometheus
# ...
pluginAttrs:
  prometheus:
    export_uri: /metrics    ## 默认 uri 为 /apisix/prometheus/metrics
    export_addr:
      ip: 0.0.0.0           ## 抓取地址
      port: 9091            ## 默认端口 9091
    metrics:
      http_status:          ## 具体作用在 apisix_http_status 指标中
        extra_labels:       ## 添加额外内容
          - upstream_addr: $upstream_addr        ## 例如此处添加一个上游服务器地址(此处的变量是NGINX变量)
          - upstream_status: $upstream_status    ## 例如此处添加一个上游服务器状态(此处的变量是NGINX变量)
                                                 ## APISIX 自带变量：https://apisix.apache.org/docs/apisix/3.2/apisix-variable/
                                                 ## NGINX 自带变量：https://nginx.org/en/docs/varindex.html
```

启用 Prometheus 插件：

```
## 注：上面启用了 otel 功能，所以此处要在启用 otel 的基础上开启 prometheus

curl http://10.109.77.186:9180/apisix/admin/routes/此处为路由ID -H 'X-API-KEY: 此处为 apisix-admin token' -X PUT -d '
{
    "name": "deepflow-apisix-demo",       ## 给这个路由配置个名字
    "methods": ["GET"],
    "uris": ["/*"],
    "plugins": {
        "prometheus":{                    ## 启用 prometheus
            "prefer_name": true           ## 为"true"时，Prometheus 指标中，打印路由/服务名称而不是 ID
        }
    },
    "upstream": {
        "type": "roundrobin",
        "nodes": {
            "10.1.23.200:18090": 1
        }
    }
}'
```

### 3.3 使用 Prometheus 拉取 APISIX 指标数据

Prometheus 采集 APISIX metrics（此处以 Prometheus CRD 部署方式举例）：

```
## ServiceMonitor 方式采集 (Prometheus 以 CRD 形式部署在 k8s 中)
## APISIX values.yaml 文件中提供了对应模块
serviceMonitor:
  ## 是否启用
  enabled: true
  ## 创建在哪个命名空间
      namespace: "apisix"
  ## servicemonitor 名称，默认为 fullname
  name: ""
  ## 抓取间隔
  interval: 15s
  ## metrics 暴露的 uri
  path: /metrics
  ## 给抓取到的指标添加前缀
  metricPrefix: apisix_
  ## 抓取端口
  containerPort: 9091
  ## 添加 labels
  labels:
    ## 此次使用项目为 kube-prometheus，使用此标签使 kube-prometheus 识别 servicemonitor
    app.kubernetes.io/part-of: kube-prometheus
  annotations: {}
```

此时需要一个 Prometheus 后端服务用于采集 APISIX 插件生成的指标，所以需要先部署一个 prometheus-server。但实际上由于不依赖 prometheus-server 存储这些指标，因此可以部署一个 Agent Mode 的 prometheus-server，或者使用更加轻量级的 grafana-agent 替代 prometheus-server。假设已经部署了 prometheus-server，开启 RemoteWrite 可将指标数据发送给 DeepFlow：

```
## https://prometheus.io/docs/prometheus/latest/configuration/configuration/#remote_write
## https://deepflow.io/docs/zh/integration/input/metrics/prometheus/#配置-remote-write

## kube-prometheus 方式发送至 DeepFlow (yaml 清单中添加远程写入)
apiVersion: monitoring.coreos.com/v1
kind: Prometheus
metadata:
  labels:
    ...
  name: k8s
  namespace: monitoring
spec:
  enableRemoteWriteReceiver: true
  remoteWrite:
    ## 注：此处为 deepflow-agent svc 地址，要按实际位置写
    - url: "http://deepflow-agent.deepflow.svc.cluster.local/api/v1/prometheus"
```

### 3.4 使用 DeepFlow 集成 Prometheus 指标数据

通过 DeepFlow Agent 集成 Prometheus 指标数据，功能默认开启，无需额外配置。

```
## 查看 deepflow-agent 默认配置
## deepflow-ctl agent-group-config example

## 这个参数控制是否启接收外部数据源，包括 Prometheus Telegraf OpenTelemetry 和 SkyWalking
## Data Integration Socket
## Default: 1. Options: 0 (disabled), 1 (enabled).
## Note: Whether to enable receiving external data sources such as Prometheus,
##   Telegraf, OpenTelemetry, and SkyWalking.
#external_agent_http_proxy_enabled: 1
```

### 3.5 Prometheus 集成效果展示

由于 DeepFlow 支持 PromQL，只需要将 Grafana 中 APISIX 提供的 [Grafana Dashboard](https://github.com/apache/apisix/blob/master/docs/assets/other/json/apisix-grafana-dashboard.json) 的数据源改为 DeepFlow，即可查看 APISIX 原生的丰富性能指标了，指标的使用说明参考[官方文档中关于 Prometheus 插件的说明](https://apisix.apache.org/docs/apisix/plugins/prometheus/)。

![Integrating APISIX with DeepFlow](https://static.apiseven.com/uploads/2024/02/07/3S4sUpX2_deepflow-8.jpeg)

## 4. 访问日志和持续剖析

![Integrating APISIX with DeepFlow](https://static.apiseven.com/uploads/2024/02/07/7KO1FcJL_deepflow-8.1.jpeg)

对于访问日志，此时无需 APISIX 做什么修改，仅需要将 deepflow-agent 部署在 APSIX 所在的服务器即可，在 Grafana 中打开 DeepFlow 提供的 Application - Request Log Dashboard 即可查看访问日志，包含了 Request 及 Response 中 header 信息，并可分析每一次请求的响应时延和错误码。

![Integrating APISIX with DeepFlow](https://static.apiseven.com/uploads/2024/02/07/4bOa7VKs_deepflow-9.jpeg)

DeepFlow 还通过 eBPF 获取应用程序的函数调用栈快照（企业版功能），可绘制 APISIX 进程的 On-CPU Profile，函数调用栈中除了包含业务函数以外，还可展现动态链接库、内核系统调用函数的耗时情况。

![Integrating APISIX with DeepFlow](https://static.apiseven.com/uploads/2024/02/07/KveTMwaQ_deepflow-10.jpeg)

## 5. 什么是 APISIX

Apache APISIX 是一个动态、实时、高性能的开源 API 网关，提供负载均衡、动态上游、灰度发布、服务熔断、身份认证、可观测性等丰富的流量管理功能。Apache APISIX 基于 NGINX 和 LuaJIT 构建，具有超高性能，单核 QPS 高达 23000，平均延迟仅为 0.2 毫秒。

Apache APISIX 的应用场景非常广泛，可应用于 API 网关、Kubernetes Ingress 和服务网格等场景，帮助企业快速、安全地处理 API 和微服务流量。目前已获得 Zoom、Airwallex、Lotus Cars、vivo、欧洲数字工厂等全球企业和组织的测试和高度认可。

Apache APISIX 于 2019 年开源并由 [API7.ai](https://api7.ai/) 捐赠给 Apache 软件基金会，目前是 GitHub 上最活跃的 API 网关项目，每天处理超万亿次的 API 调用，并且这一数字仍在增长。

GitHub 地址：[https://github.com/apache/apisix](https://github.com/apache/apisix)

## 6. 什么是 DeepFlow

DeepFlow 是云杉网络开发的一款可观测性产品，旨在为复杂的云基础设施及云原生应用提供深度可观测性。DeepFlow 基于 eBPF 实现了应用性能指标、分布式追踪、持续性能剖析等观测信号的零侵扰（Zero Code）采集，并结合智能标签（SmartEncoding）技术实现了所有观测信号的全栈（Full Stack）关联和高效存取。使用 DeepFlow，可以让云原生应用自动具有深度可观测性，从而消除开发者不断插桩的沉重负担，并为 DevOps/SRE 团队提供从代码到基础设施的监控及诊断能力。

GitHub 地址：[https://github.com/deepflowio/deepflow](https://github.com/deepflowio/deepflow)

访问 [DeepFlow Demo](https://deepflow.io/docs/zh/ce-install/overview/)，体验零插桩、全覆盖、全关联的可观测性。
