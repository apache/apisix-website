---
title: "在 KubeSphere 中使用 Apache APISIX Ingress 网关接入自定义监控"
author: "张海立"
authorURL: "https://github.com/webup"
authorImageURL: "https://avatars.githubusercontent.com/u/2936504?v=4"
keywords: 
- KubeSphere
- Apache APISIX
- Kubenetes
- Ingress Controller
- 监控
description: 本文将通过 Apache APISIX Ingress Controller 为范例，详细为大家介绍如何通过 KubeSphere 快速为 Kubernetes 集群使用不同类型的网关并进行状态监控。
tags: [Technology]
---

> 本文将通过 Apache APISIX Ingress Controller 为范例，详细为大家介绍如何通过 KubeSphere 快速为 Kubernetes 集群使用不同类型的网关并进行状态监控。

<!--truncate-->

11月初，KubeSphere 发布了 3.2.0 版本，新版本为项目网关增配了整套监控及管理页面，同时引入了集群网关来提供集群层面全局的 Ingress 网关能力。

为了让用户更了解如何在新版 KubeSphere 中部署使用第三方 Ingress Controller，本文将以 [Apache APISIX Ingress Controller](https://apisix.apache.org/docs/ingress-controller/getting-started/) 为例，为大家展示通过 KubeSphere 快速为 Kubernetes 集群使用不同类型的网关并进行状态监控。

## 准备工作

### 安装 KubeSphere

安装 KubeSphere 有两种方法：

1. [在 Linux 上直接安装](https://kubesphere.com.cn/docs/quick-start/all-in-one-on-linux/)
2. [在已有 Kubernetes 中安装](https://kubesphere.com.cn/docs/quick-start/minimal-kubesphere-on-k8s/)

KubeSphere 最小化安装版本已经包含了监控模块，因此不需要额外启用，可以通过「系统组件」页面中的「监控」标签页确认安装状态。

![确认安装状态](https://static.apiseven.com/202108/1638255471644-e1327ffc-dbed-4890-a15c-819f28731fc9.png)

### 部署 httpbin 演示应用

由于需要演示网关的访问控制能力，我们必须要先有一个可以访问的应用作为网关的后台服务。这里我们使用 [httpbin.org](httpbin.org) 提供的 [kennethreitz/httpbin](https://hub.docker.com/r/kennethreitz/httpbin/) 容器应用作为演示应用。

在 KubeSphere 中，我们可以先创建新的项目或使用已有的项目，进入项目页面后，选择「应用负载」下的「服务」直接创建无状态工作负载并生成配套服务。

![创建服务](https://static.apiseven.com/202108/1638255616585-b0f5a674-f06a-4b18-baf9-8d6006abeead.png)

使用 [kennethreitz/httpbin](https://hub.docker.com/r/kennethreitz/httpbin/) 容器默认的 `80` 端口作为服务端口，创建完成后确保在「工作负载」和「服务」页面下都可以看到 `httpbin` 的对应条目，如下图所示。

![服务](https://static.apiseven.com/202108/1638255786442-924bf704-9b9d-413f-9fc0-be6650a6ff4a.png)

![工作负载](https://static.apiseven.com/202108/1638255792974-7f354950-e34a-427a-9ff7-aa3af0a56dd6.png)

### 项目网关细节补充

**项目网关**是 KubeSphere 3.0 之后上线的功能。KubeSphere 项目中的网关是一个 NGINX Ingress 控制器。KubeSphere 内置用于 HTTP 负载均衡的机制称为**应用路由**，它定义了从外部到集群服务的连接规则。如需允许从外部访问服务，用户可创建路由资源来定义 URI 路径、后端服务名称等信息。

承接上文中已部署的 `httpbin` 服务项目，在「项目设置」中打开「网关设置」页面，然后执行「开启网关」操作。方便起见，直接选择 `NodePort` 作为「访问方式」即可。

![项目设置](https://static.apiseven.com/202108/1638256005754-d1e8bf9a-0ecc-4c6e-8ceb-0c25b04fef20.png)

确定后回到网关页面，稍等片刻后刷新页面，可以得到如下图显示的部署完成状态，在这里可以看到 NodePort 默认被赋予了两个节点端口。接招我们通过右上角的「管理」按钮「查看详情」。

![部署完成](https://static.apiseven.com/202108/1638256011357-960f6852-31b3-4702-8911-17d07ec19d7b.png)

此时我们看到的便是 3.2.0 版本关于项目/集群网关的新监控页面。下面我们就需要为 httpbin 服务创建应用路由。

从「应用负载」进入「应用路由」页面，开始「创建」路由。为路由取名为 `httpbin` 后，我们指定一个方便测试的域名，并设置「路径」为 `/`, 选择「服务」`httpbin` 和「端口」`80`。

![应用路由](https://static.apiseven.com/202108/1638241684770-ce94fe24-58a6-4b9b-9507-d802713b4c38.png)

![创建路由](https://static.apiseven.com/202108/1638241689985-149fc2f7-456b-423c-8cfc-00800dc24917.png)

直接下一步跳过高级设置后完成路由创建，可以得到如下图所示的 httpbin 应用路由项。

![应用路由项细节](https://static.apiseven.com/202108/1638256382273-109728eb-4d19-4c2b-ab92-9a2909c3eff8.png)

接下来我们就可以通过项目网关的 NodePort 地址及指定域名（如这里是 http://httpbin.ui:32516） 来访问 httpbin 应用服务，随意刷新或操作一下页面的请求生成功能，再进入网关的详情页面，便可以看到在「监控」面板上已经出现了网关的一些内置的监控指标展示。

![监控指标展示](https://static.apiseven.com/202108/1638256419345-48476f01-b293-401b-9e4f-8bf64a9fab90.png)

#### 指定 NodePort 节点端口

对于公有云环境，如果使用 NodePort 方式向外暴露访问能力，开放端口通常是有限且受控的，因此对于网关所使用的 NodePort 我们需要对它进行修改。

由于网关是被 KubeSphere 统一管理的，要修改网关服务的 NodePort 需要具备访问 `kubesphere-controls-system` 的项目权限。进入该项目后，通过「应用负载」的「服务」页面即可找到命名为 `kubesphere-router-<project-namespace>` 形式且外部访问已开放 NodePort 的网关服务。NodePort 服务端口需要通过「编辑 YAML」来直接修改。

![指定 NodePort 端口](https://static.apiseven.com/202108/1638256523468-408ee36f-aac7-4bb4-9cd3-2473a95a52f4.png)

## 开始使用集群网关

>KubeSphere 3.2.0 开始支持集群级别的全局网关，所有项目可共用同一个网关，之前已创建的项目网关也不会受到集群网关的影响。也可以统一纳管所有项目的网关，对其进行集中管理和配置，管理员用户再也不需要切换到不同的企业空间中去配置网关了。

如果您使用的是是 KubeSphere 3.2.0 版本，我们更推荐大家使用集群网关的功能来统一整个集群的应用路由。要启用集群网关也非常简单：使用具备集群管理权限的账号，进入其可管理的某个集群（如我们这里以 `default` 集群为例），在「集群设置」的「网关设置」中即可「开启网关」，同时查看「项目网关」。

![开启网关设置](https://static.apiseven.com/202108/1638256574546-920473f3-e8ac-4cf9-932b-4202888e7a54.png)

集群网关开启的方式以及对齐 NodePort 访问端口的修改和之前项目网关的操作基本完全一致，这里就不多赘述了。

但有一点需要特别注意：集群网关开启后，已经开启的项目网关还会保留；但尚未创建网关的项目是无法再创建单独的网关的，会直接使用集群网关。

下图展示了已创建网关的项目，在同时拥有项目及集群网关后，在「网关设置」页面所呈现的所有网关概览。

![网关设置页面一览](https://static.apiseven.com/202108/1638256658706-ac5107fe-2fd7-4521-b830-9ae1fdf762e1.png)

## 快速使用 Apache APISIX Ingress Controller

Apache APISIX 是一款开源的高性能、动态云原生网关，由深圳支流科技有限公司于 2019 年捐赠给 Apache 基金会，目前已成为 Apache 基金会的顶级开源项目，也是 GitHub 上最活跃的网关项目。Apache APISIX 目前已覆盖 API 网关、LB、Kubernetes Ingress、Service Mesh 等多种场景。

### 如何部署

首先添加 Apache APISIX Helm Chart 仓库。之后选定一个企业空间，通过「应用管理」下的「应用仓库」来添加如下一个 [Apache APISIX 的仓库](https://charts.apiseven.com)。

![添加仓库](https://static.apiseven.com/202108/1638256788584-dca2d21b-3ffc-4bb4-bd73-56dedb6d005a.png)

接下来创建一个名为 `apisix-system` 的项目。进入项目页面后，选择在「应用负载」中创建「应用」的方式来部署 Apache APISIX，并选择 `apisix` 应用模版开始进行部署。

![部署应用负载](https://static.apiseven.com/202108/1638241691528-80090ab6-85de-401f-96d7-58118b3cbd88.png)

>为何是直接部署 Apache APISIX 应用的 Helm Chart，而不是直接部署 Apache APISIX Ingress Controller?

这是因为 Apache APISIX Ingress Controller 目前和 Apache APISIX 网关是强关联的（如下图所示），且目前通过 Apache APISIX Helm Charts 同时部署 Apache APISIX Gateway + Dashboard + Ingress Controller 是最方便的，因此本文推荐直接使用 Apache APISIX 的 Helm Chart 进行整套组件的部署。

![为什么直接部署 APISIX](https://static.apiseven.com/202108/1638241693072-9b3146f5-bcc6-4441-b002-f1a07603a8c4.png)

将应用命名为 `apisix` 以避免多个组件（Gateway, Dashboard, Ingress Controller）的工作负载及服务名称产生不匹配的情况；在安装步骤中编辑的「应用设置」的部分，请参照以下配置进行填写（请特别注意带有【注意】标记的注释部分的说明，其余可以按需自行编辑修改）。

```shell
global:
  imagePullSecrets: []
  
apisix:
  enabled: true
  customLuaSharedDicts: []
  image:
    repository: apache/apisix
    pullPolicy: IfNotPresent
    tag: 2.10.1-alpine
  replicaCount: 1
  podAnnotations: {}
  podSecurityContext: {}
  securityContext: {}
  resources: {}
  nodeSelector: {}
  tolerations: []
  affinity: {}
  podAntiAffinity:
    enabled: false

nameOverride: ''
fullnameOverride: ''

gateway:
  type: NodePort
  externalTrafficPolicy: Cluster
  http:
    enabled: true
    servicePort: 80
    containerPort: 9080
  tls:
    enabled: false
    servicePort: 443
    containerPort: 9443
    existingCASecret: ''
    certCAFilename: ''
    http2:
      enabled: true
  stream:
    enabled: false
    only: false
    tcp: []
    udp: []
  ingress:
    enabled: false
    annotations: {}
    hosts:
      - host: apisix.local
        paths: []
    tls: []

admin:
  enabled: true
  type: ClusterIP
  externalIPs: []
  port: 9180
  servicePort: 9180
  cors: true
  credentials:
    admin: edd1c9f034335f136f87ad84b625c8f1
    viewer: 4054f7cf07e344346cd3f287985e76a2
  allow:
    ipList:
      - 0.0.0.0/0

plugins:
  - api-breaker
  - authz-keycloak
  - basic-auth
  - batch-requests
  - consumer-restriction
  - cors
  - echo
  - fault-injection
  - grpc-transcode
  - hmac-auth
  - http-logger
  - ip-restriction
  - ua-restriction
  - jwt-auth
  - kafka-logger
  - key-auth
  - limit-conn
  - limit-count
  - limit-req
  - node-status
  - openid-connect
  - authz-casbin
  - prometheus
  - proxy-cache
  - proxy-mirror
  - proxy-rewrite
  - redirect
  - referer-restriction
  - request-id
  - request-validation
  - response-rewrite
  - serverless-post-function
  - serverless-pre-function
  - sls-logger
  - syslog
  - tcp-logger
  - udp-logger
  - uri-blocker
  - wolf-rbac
  - zipkin
  - traffic-split
  - gzip
  - real-ip
  #【注意】添加此插件以配合 Dashboard 展示服务信息
  - server-info

stream_plugins:
  - mqtt-proxy
  - ip-restriction
  - limit-conn

customPlugins:
  enabled: true
  luaPath: /opts/custom_plugins/?.lua
  #【注意】如下配置保障 Prometheus 插件可对外暴露指标
  plugins:
   - name: prometheus
     attrs:
       export_addr:
         ip: 0.0.0.0
          port: 9091
      configMap:
       name: prometheus
        mounts: []

dns:
  resolvers:
    - 127.0.0.1
    - 172.20.0.10
    - 114.114.114.114
    - 223.5.5.5
    - 1.1.1.1
    - 8.8.8.8
  validity: 30
  timeout: 5

autoscaling:
  enabled: false
  minReplicas: 1
  maxReplicas: 100
  targetCPUUtilizationPercentage: 80
  targetMemoryUtilizationPercentage: 80

configurationSnippet:
  main: ''
  httpStart: ''
  httpEnd: ''
  httpSrv: ''
  httpAdmin: ''
  stream: ''

etcd:
  enabled: true
  host:
    - 'http://etcd.host:2379'
  prefix: /apisix
  timeout: 30
  auth:
    rbac:
      enabled: false
      user: ''
      password: ''
    tls:
      enabled: false
      existingSecret: ''
      certFilename: ''
      certKeyFilename: ''
      verify: true
  service:
    port: 2379
  replicaCount: 3

dashboard:
  enabled: true
  #【注意】为 Dashboard 开启 NodePort 方便后续使用
  service:
   type: NodePort

ingress-controller:
  enabled: true
  config:
    apisix:
     #【注意】一定要设置 gateway 所在的 namespace
      serviceNamespace: apisix-system
  serviceMonitor:
    enabled: true
    namespace: 'apisix-system'
    interval: 15s
```

部署成功后，点击应用名称进入详情页面，可以在「资源状态」标签页下看到如下的服务部署和工作状态运行状态展示。

![工作状态运行展示](https://static.apiseven.com/202108/1638241694605-7d88f095-fef5-43f4-9752-8dc5a2f9abc4.png)

>💡 Apache APISIX 项目另有的两个 Helm Chart 对应的默认配置参数可以分别参考：[Dashboard](https://github.com/apache/apisix-helm-chart/blob/master/charts/apisix-dashboard/values.yaml) 和 Ingress Controller 的 values.yaml。

### Dashboard 妙用

Apache APISIX 应用部署完成后，可通过 Apache APISIX Dashboard 来检验一下 Apache APISIX 网关的当前状态。

从应用负载-服务页面可以找到 `apisix-dashboard` 服务，由于我们在应用配置中已为 Dashboard 开启了 NodePort，所以这里可以直接通过 NodePort 端口来访问 Dashboard。

![Dashboard 页面设置](https://static.apiseven.com/202108/1638241699353-8d54dfe9-8439-4085-8e7d-02583a1d0d9e.png)

使用默认用户名及密码 `admin` 登录 Apache APISIX Dashboard，可以进入「系统信息」页面查看到当前连接管理的「Apache APISIX 节点」信息。

![登陆 Dashboard](https://static.apiseven.com/202108/1638241703083-0915a427-9aab-41e6-8c76-be60d70fc135.png)

### 如何使用

接下来让我们回到「应用路由」页面，再新建一个路由（如 `apisix-httpbin`），设置路径为 `/*` `httpbin` `80` 并为其添加 `kubernetes.io/ingress.class`: `apisix` 的键值。

![新建路由](https://static.apiseven.com/202108/1638241705123-6fe3ba11-bc08-4fb2-a8b1-73066ce73679.png)

![详细数据设置](https://static.apiseven.com/202108/1638241706790-3989c06d-c803-4c16-869a-6fa000b5744b.png)

#### 验证应用路由生效

回到 Apache APISIX Dashboard 进入「路由」页面，可以看到新建的应用路由已被 Apache APISIX Ingress Controller 识别后自动添加到了 Apache APISIX 网关中，在「上游」页面也可以看到自动创建的一个上游条目。

![验证生效](https://static.apiseven.com/202108/1638241712811-db1f93dd-2963-4034-b461-26733d173bae.png)

接下来回到 `apisix-system` 项目「服务」页面，找到 `apisix-gateway` 服务对应的端口，由此访问 `<apisix-httpbin 应用路由指定的域名>:<apisix-gateway 外部访问端口>`（例如此处为 `httpbin.ui:30408`）即可访问到 `apisix-httpbin` 应用路由所关联的后台服务。

![生效成功](https://static.apiseven.com/202108/1638241716159-134e6bd8-9e08-46de-8d46-39142c439b8f.png)

## 自定义监控 Apache APISIX 网关

使用 Apache APISIX 网关时可通过 Prometheus 插件以及 KubeSphere 自带的自定义监控能力来进行监控能力的加持。

### 暴露相关 Prometheus 监控指标

由于我们在前边部署 Apache APISIX 应用时已经开启了 [Prometheus 插件](https://apisix.apache.org/docs/apisix/plugins/prometheus)，所以接下来只需要把 Prometheus 监控指标的接口暴露出来即可。

进入 `apisix-system` 项目，在「工作负载」页面找到 apisix 并进入部署详情页面，随后在左侧操作面板的「更多操作」中选择「编辑设置」。

![部署工作负载](https://static.apiseven.com/202108/1638241718162-86d110b6-2c40-461c-9cf4-a13b73cf5768.png)

在弹出的面板中，进入到 `apisix` 容器编辑界面，找到「端口设置」，添加一个新的名为 `prom` 的端口映射到容器的 `9091` 端口，保存后 `apisix` 工作负载会重启。

![新建映射端口](https://static.apiseven.com/202108/1638241721050-c3e9409c-4ec8-4ff1-bcf8-045ea57ec179.png)

### 为监控指标创建 ServiceMonitor

接下来我们需要将已暴露的指标接口接入到 KubeSphere 自带的 Prometheus 中使之可被访问（被抓取指标数据）。

由于 KubeSphere 是通过 [Prometheus Operator](https://github.com/prometheus-operator/prometheus-operator) 来维护内部 Prometheus 系统，所以最快捷的方式自然是直接创建 ServiceMonitor 资源来实现指标接口的接入。

```shell
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: apisix
  namespace: apisix-system
spec:
  endpoints:
    - scheme: http
     #【注意】使用上一步中工作负载暴露的容器端口名称
     targetPort: prom
     #【注意】需要正确绑定 apisix 对应的指标接口路径
     path: /apisix/prometheus/metrics
      interval: 15s
  namespaceSelector:
    matchNames:
      - apisix-system
  selector:
    matchLabels:
      app.kubernetes.io/name: apisix
      app.kubernetes.io/version: 2.10.0
      helm.sh/chart: apisix-0.7.2
```

使用 `kubectl apply -f your_service_monitor.yaml` 创建 ServiceMonitor 资源。创建成功后，如果有集群管理权限，也可以在集群的 CRD 管理页面中搜索查看 ServiceMonitor 资源并找到名为 `apisix` 的自定义资源，也可以在这里做后续的 YAML 修改。

![创建 ServiceMonitor 资源](https://static.apiseven.com/202108/1638241723331-64cb363e-b6af-4af4-93f3-29a79c9a5e77.png)

### 指标接入自定义监控面板

在项目左侧菜单列表中找到「监控告警」中的「自定义监控」，开始「创建」自定义监控面板。

![创建自定义监控面板](https://static.apiseven.com/202108/1638241724906-d9531809-4682-49b3-b90b-d7f3a03e70e3.png)

在弹出窗口中填入「名称」，选择「自定义」监控模版，并进入「下一步」的监控面板创建。

![设置细节](https://static.apiseven.com/202108/1638241727938-cd3843f9-0e22-4316-91d2-84b56cd66f21.png)

进入编辑页面后现在左侧点击 `+` 区域，在右侧的「数据」区域进行 Prometheus 监控指标的配置。例如这里我们可以用 `sum(apisix_nginx_http_current_connections)` 来统计 Apache APISIX 网关实时的连接总数。

![加入监控指标配置](https://static.apiseven.com/202108/1638241729416-3d2024f1-9586-44ac-ad6c-7472c8924fc8.png)

保存后在页面右下角找到「+ 添加监控项」，并选择「折线图」创建 `Nginx connection state` 指标：使用 `sum(apisix_nginx_http_current_connections) by (state)` 作为指标、`{{state}}` 用作图例名称、「图例类型」为堆叠图，即可得到类似下图的结果。保存模版后即可得到第一个自定义监控面板！

![自定义监控面板生成](https://static.apiseven.com/202108/1638241730747-298fe17e-fb34-4da6-ac9d-8b1efde4521c.png)

>Apache APISIX 网关目前提供的 Prometheus 指标可以参见官方文档的[可有的指标](https://apisix.apache.org/zh/docs/apisix/plugins/prometheus/#%25E5%258F%25AF%25E6%259C%2589%25E7%259A%2584%25E6%258C%2587%25E6%25A0%2587)部分。

由于指标配置过程比较麻烦，推荐在集群层面的「自定义监控」中直接导入 [Apache APISIX Grafana 模版](https://grafana.com/grafana/dashboards/11719)（下载 JSON 并通过「本地上传」进行导入）。

![导入 Grafana 模版](https://static.apiseven.com/202108/1638241733535-168ce86b-6654-4278-941d-23fb44003c90.png)

创建完成后可直接呈现出非常丰富的 Apache APISIX 网关监控面板。KubeSphere 也同时在[积极推进](https://github.com/kubesphere/kubesphere/issues/4433)将 Grafana 模版导入的功能引入到项目的自定义监控能力中去，敬请期待！

![完美结束](https://static.apiseven.com/202108/1638241735167-4c6d3a9a-8190-41b5-9e89-7f09384c7113.png)

## 总结

通过本文非常详细的步骤介绍，大家可充分了解并跟随上手体验到如何「将 Apache APISIX Ingress 网关介入 KubeSphere 并进行自定义监控」。希望通过阅读本文，可以加深各位对 Apache APISIX Ingress Controller 与 Apache APISIX 应用理解。

作者张海立，驭势科技云平台研发总监。开源爱好者，云原生社区上海站 PMC 成员，KubeSphere Ambassador。
