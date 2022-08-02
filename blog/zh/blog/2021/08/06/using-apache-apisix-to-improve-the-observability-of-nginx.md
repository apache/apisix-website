---
title: "如何利用 Apache APISX 提升 NGINX 的可观测性"
author: "金卫"
authorURL: "https://github.com/gxthrj"
authorImageURL: "https://avatars.githubusercontent.com/u/4413028?v=4"
keywords:
- API 网关
- APISIX
- Apache APISIX
- Nginx
- 可观测性
description: 本文将从 Nginx 可观测性、Apache APISIX 与 Nginx 的关系、Apache APISIX 可观测性，以及结合 Apache SkyWalking 进一步提升可观测性等方面分享关于可观测性的方案与实践。
tags: [Ecosystem]
---

> 本文将从 Nginx 可观测性、Apache APISIX 与 Nginx 的关系、Apache APISIX 可观测性，以及结合 Apache SkyWalking 进一步提升可观测性这些方面分享关于可观测性的方案与实践。

<!--truncate-->

## 概述

“可观测性“是一种度量手段，方便掌握基础设施、系统平台或者应用程序的运行状况。常见的手段是收集 metrics、logging 和 tracing 及 events 数据，可以帮助开发人员和运维人员检测、调查、预警和纠正系统问题。

本文将从 Nginx 可观测性、Apache APISIX 与 Nginx 的关系、Apache APISIX 可观测性，以及结合 Apache SkyWalking 进一步提升可观测性这些方面分享关于可观测性的方案与实践。

## Nginx 的可观测性

### Nginx 常见监控方式

Nginx 在一定程度上能够做到可观测，以下罗列出 Nginx 的常见监控方式：

1. ngx_http_stub_status_module
2. VTS module + exporter + prometheus + grafana（如果 Nginx 版本比较低，需要引入 exporter ）
3. Nginx Amplify SaaS

#### ngx_http_stub_status_module

ngx_http_stub_status_module 主要收集实例级别的统计信息。

#### VTS module

VTS module 有 3 个比较明显的缺点：

1. **安装复杂**：虽然 VTS module 能够采集指标，采集的指标类型也比较多，但是它的安装比较复杂。如果想要采用 VTS module，需要重新编译 Nginx，在编译 Nginx 之前加入 VTS moudle，完成编译后重新安装 Nginx 才可以正常使用 VTS。

2. **扩展能力弱**：VTS 扩展能力分为两部分，一是在编译之前给 VTS 增加扩展；二是在编译之后增加扩展 —— 修改 nginx.conf 配置文件。通过修改 nginx.conf 文件来增加扩展会使 Nginx reload，生产环境直接 reload 或多或少会对业务产生一些影响。

3. **社区更新缓慢**：VTS module 最新的一次更新是在 2018 年，已经停摆 3 年了。

#### Nginx Amplify SaaS

Nginx Amplify 是一个 SaaS 服务，Nginx Amplify 在远端提供服务，在 Nginx 服务之外安装 Agent。
在 Nginx 之外安装采集模块，那么在采集指标上就会有限制，只能拿到 Nginx 暴露出来的信息，没有暴露的内部信息是拿不到的。

另外，由于 Nginx Amplify SaaS 是一个 SaaS 服务，需要通过公网将采集到的数据传到服务端，这会带来一些安全隐患，同时把一些企业用户阻挡在外面。或许 Nginx Amplify 的目标群体是 Nginx plus 这样的企业用户，不是开源用户。

另外，Nginx Amplify SaaS 社区也不活跃，已经停摆 2 年。

### Nginx 的缺陷

Nginx 在 Events 收集上自身有缺陷，这里列举出两个问题：

1. Nginx 基于 nginx.conf 进行配置，修改后通过 reload nginx.conf 文件使配置生效。除 reload 事件外，没有其他 Events 可用，我们无法得知每次修改文件的变化，如：起初只配置 1 个路由，修改文件增加 10 个路由，只有 reload 事件无法得知增加的到低是哪 10 个路由。

2. Nginx 开源产品缺少主动健康检查。Nginx 是一个反向代理，真正的后端服务可能会出现重启、升级或者异常的情况，如果没有主动的健康检查，依靠被动检查，只能在流量出现异常的时候，才知道服务出了问题，这会丢掉很多 Events，导致上游 Events 事件信息不完整。

### Nginx 可观测性总结

Nginx 的开源版本没有提供非常好用的监控。虽然 Nginx 提供了一些监控工具，但这些工具的安装和配置非常复杂，几乎没有扩展性。可能这些工具的设计并不是为了可观测性，只是为了能看到指标或统计数据，方便定位问题。现在有各种可观测性设置类的产品，但是很难集成到 Nginx 上。

另外，Nginx 社区停滞不前，导致 Nginx 迭代速度慢。

## Apache APISIX 概述

### Apache APISIX 与 Nginx 的关系

![Apache APISIX 与 Nginx 的关系](https://static.apiseven.com/202108/1630651158638-aba4e627-d2d6-4bf5-b431-61eb3913a296.png)

Apache APISIX 基于 Nginx 实现，但只依赖 Nginx 的网络库，在 Nginx 基础上，Apache APISIX 实现了自己的核心的代码，并预留了扩展机制。

在表格中列出了 Apache APISIX 和 Nginx 的功能对比，Apache APISIX 既可以做反向代理，又可以实现一些 Nginx 不支持的功能，如：主动健康检查、流量管理、横向扩缩容等，而且这些功能都是开源的。

- **API 设计**：在 API 设计方面使用 Apache APISIX 更加简单。
- **开源 Dashboard**：在界面上就能把反向代理全部配置完。
- **主动健康检查**：Apache APISIX 支持主动健康检查，可以结合 Events 完善可观测性。
- **流量管理**：适合监测数据，或者在业务发布上线时使用。
- **横向扩缩容**：Apache APISIX 支持横向扩缩容，这个特性得益于 Apache APISIX 的架构（见下图）。
- **插件扩展机制**：Apache APISIX 的插件扩展机制使其具有极为强大的扩展能力。
- **插件编排**：按照业务需求，将多个插件按照逻辑编排，组合起来使用。
- **证书管理**：Apache APISIX 支持动态的证书管理。

![Apache APISIX 架构图](https://static.apiseven.com/202108/1630651158643-ecc67e12-2076-41e5-88d8-baa14144f35d.png)

### Apache APISIX 简介

Apache APISIX 是一个动态、实时、高性能的 API 网关，提供负载均衡、动态上游、灰度发布、服务熔断、身份认证、可观测性等丰富的流量管理功能。Apache APISIX 也是全世界最活跃的开源 API 网关项目，是生产可用的高性能网关。全球已有数百家企业使用 Apache APISIX 处理关键业务流量，涵盖金融、互联网、制造、零售、运营商等等，比如美国航空航天局（NASA）、欧盟的数字工厂、中国航信、中国移动、腾讯、华为、微博、网易、贝壳找房、360、泰康等。

### Apache APISIX 解决方案

![Apache APISIX 全流量解决方案](https://static.apiseven.com/202108/1630651158645-83c22975-ebf1-4861-8b61-38639a28875a.png)

上图左边，从上往下是从单体服务到 SOA（面向服务的架构）到微服务的演进过程。

在 SOA 下，网关一般采用 Nginx 或者 HAProxy；在微服务架构下，网关使用 Nginx 做负载均衡。微服务架构有两个比较常见的解决方案：一个是基于 Java 技术栈实现，如 Spring Cloud 系列；另一个是 Service Mesh。

在这个演进过程中，Apache APISIX 处于什么位置，能做什么呢？

简单的说，左图中红色的部分（Nginx / HAProxy / Kong / Spring Cloud Zuul / Spring Cloud Gateway / Traefik / Envoy / Ingress Nginx）都可以替换为 Apache APISIX 的解决方案。

**在 SOA 下有 Apache APISIX SLB 解决方案，在微服务架构下有 Apache APISIX Gateway，在 Kubernetes 部署有 Apache APISIX Ingress，在 Service Mesh 里部署有 Apache APISIX mesh**。

![Apache APISIX 全流量数据面](https://static.apiseven.com/202108/1630651158648-dffd59dd-15c2-4f76-832e-5ed3763b18e5.png)

从业务请求的流量方面看，当客户端发起请求时会经过 LB，经过 Gateway，请求被分发到后端业务服务。红色的部分（LB / Gateway / Spring Cloud Gateway / K8s Ingress / Sidecar）都可以选择 Apache APISIX 作为解决方案。Apache APISIX 支持多语言开发插件，可以在 Java 体系下使用 Java 编写插件。

Apache APISIX 是全流量的数据面，在 LB、Gateway、Ingress、sidecar 方面 Apache APISIX 都有相应的解决方案，他们是统一的解决方案，在可观测性方面也是统一的方案。当解决方案统一时，管理控制链也是很容易实现出来的。

## Apache APISIX 的可观测性

简单了解完 Nginx 和 Apache APISIX 之后，现在有两个问题：Apache APISIX 在可观测性上可以做哪些事情？Apache APISIX 可观测性上的优势在哪里？

### Apache APISIX 支持采集的数据类型

Apache APISIX 支持采集的数据类型：

1. Tracing - 集成 SkyWalking
2. Metrics - 集成 SkyWalking / Prometheus
3. Logging - 集成 SkyWalking / 其他日志平台

Apache APISIX 是一个网关类的产品，可以替代 Nginx 或者其他的网关；在可观测性上 Apache APISIX 可以集成多个 APM 或可观测性系统，如：Tracing 部分可以集成 SkyWalking，Metrics 指标上可以集成 SkyWalking 或 Prometheus，Logging 可以集成 SkyWalking 以及其他一些日志系统。

### Apache APISIX 在可观测性上的优势

#### 高度扩展能力

为什么 Apache APISIX 拥有强大的扩展能力？因为 Apache APISIX 支持多语言编写插件，可以使用 Lua、Java、Golang 等编程语言编写插件。Apache APISIX 可以通过插件扩展自身的能力。上文提到的三种数据类型，都是通过插件机制来实现的。

#### 灵活的配置能力

举三个例子来介绍一下 Apache APISIX 灵活的配置能力。

第一个例子是 **Apache APISIX 可以在运行时修改 logging 的配置**，如：增加或修改日志字段。修改日志字段是一个比较常见的需求，比如：业务刚开始上线时，配置好了日志字段，系统运行一段时间后，需要修改或者增加几个日志字段。如果使用 Nginx，通过修改 nginx.conf 文件实现需求，reload 使配置生效。 **Apache APISIX 只需要通过脚本把字段配置好，就会动态生效**。

第二个灵活配置能力的例子是 Prometheus 的使用。在 Apache APISIX 里，想要创建 / 删除某一个 metric 或者扩展 metrics labels，只需要在 Prometheus 插件里新增一个 metircs 或者填写相关信息，Apache APISIX 有 hot reload 机制可以直接生效，不需要重启。

第三个灵活的配置能力体现在 Apache APISIX 的实现。Apache APISIX 把路由对象全部管理起来，在内存里有一套对象管理机制。在 Apache APISIX 里给某个 API 加插件，生效的级别可以细化到 API，每一个 API 都可以绑定插件，也可以从 API 上把插件去掉。 Apache APISIX 可以精细化控制到每一个服务里面每一个 API 的可观测性数据采集。换句话说，你可以只采集最关心的数据，而且这些配置都是动态生效的，可以随时调整。

#### 活跃的社区

Apache APISIX 最重要的一个优势是有一个活跃的社区，一个活跃的社区可以让产品快速迭代、变得越来越完善，让大家的需求得到满足。

![Apache APISIX 社区活跃度对比图](https://static.apiseven.com/202108/1630651158650-2c4a287f-45a3-4c49-94d1-5be3914e5f69.png)

上图展示的是 Apache APISIX（绿色）、Kong（浅蓝）、mosn（黄色）、bfe（深蓝）贡献者增长曲线，Apache APISX 增长趋势最快，曲线最为陡峭。 Apache APISIX 社区活跃度在同类型项目里面是最活跃的。

## 结合 Apache SkyWalking，在可观测性上做进一步提升

Apache APISIX 与 Apache SkyWalking 结合可以做哪些提升？除了 SkyWalking tracing 插件，还可以将 tracing、metrics、logging、events 汇聚到 SkyWalking，借助 SkyWalking 的聚合能力让数据实现联动。

### SkyWalking Satellite

SkyWalking Satellite 由 Apache APISIX 社区、Apache SkyWalking 社区、百度深度合作开发。

![Apache APISIX SkyWalking Satellite](https://static.apiseven.com/202108/1630651158652-130e62e1-32dd-4705-9f24-ceffd039560a.png)

SkyWalking Satellite 按照上图步骤采集数据，SkyWalking Satellite 可以部署到更靠近产生数据的前端，以 sidecar 的形式存在。

图中从上往下业务请求经过 Apache APISIX 代理到 Upstream，Satellite 在 Apache APISIX 的旁边，以 sidecar 的形式部署，收集 Apache  APISIX 的 tracing、metrics、logging 这三种数据类型的数据，通过 GRPC 协议发送给 SkyWalking。

最重要的一点是：**在这种部署方式下，Apache  APISIX 不需要做任何改动就可以直接将三种数据类型集成到 SkyWalking**。

### ALS 方案

ALS（Access Log Service）将经过 Apache  APISIX 的访问日志发送出来，在普通的 access log 上增加特殊的字段，如：增加关键字段便于生成拓扑图，同时聚合出 metrics。

ALS 方案最大的好处是可以直接通过 access log 方式分析和聚合出拓扑图、metrics 、logging 这三种类型的数据。
在使用 Prometheus 时，如果配置了 URI 级别的 metrics 指标的统计，会导致整个 metrics 急剧膨胀。因为 URI 级别的服务可能有几十个，每个 metrics 后面可能有许多 labels，这会降低网关性能，增加 metrics 获取难度。**使用 ALS 方案，通过流的方式将数据发送给 SkyWalking，把计算的事情交给 SkyWalking，后续也方便查询**，不会出现每隔几秒钟拉取一次非常庞大的数据的情况。

### 将 Events 整合到 SkyWalking

常用的 Events 包括：配置分发、集群变化、健康检查。

**配置分发**：在配置 API 分发时，可能会新增路由、修改路由、删除路由或增加插件。

**集群变化**：集群发生变化时，需要知道集群里的服务数。如：扩容时 IP 会发生变化，变化体现在网关收到消息的时候。每个过程都是一个事件，这些事件都需要被暴露出来。

**健康检查**：主动探测是否健康，例如：业务请求失败率突然变高，事件探测到业务服务不健康，此时可以快速定位到问题。

## 延伸阅读

### Apache APISIX 的扩展机制的实现原理及其对稳定性的影响

问题：Apache APISIX 的扩展机制是怎么实现的？扩展这个功能是否对 Apache APISIX 本身稳定性有影响？

答：Apache APISIX 扩展机制得益于它的架构，可以在各个 phases（rewrite / access / header_filter / body_filter / preread_filter / log）增加业务逻辑。

至于稳定性方面， Apache  APISIX 已经开源了近 50 个插件，每一个插件都会有端到端的测试，这些插件都是经过验证的、是稳定可用的。但是自定义插件要遵循一定的规范，虽然很简单，但是大家也不能太随意。自定义插件的稳定性保证，需要由业务方自己来保证。

### 如何确认规则已生效

问：Nginx 的 nginx.conf 文件里面可能配置了很多规则，后面的规则可能被前面的规则拦截，不清楚后面的规则是否生效，Apache APISIX 是否有什么方法知道哪些规则已生效？

答：Nginx 的 nginx.conf 文件配置越多，配置服务越复杂，这个文件越难以维护。但是在 Apache APISIX 里配置文件是固定的，Apache APISIX 官方提供的配置就是在大多数场景下的最优配置，其他路由的配置是通过 API 的方式配置进去的，路由配置都是在内存里面的。

在管理方式上，可以通过多种组织方式管理你的路由，例如，可以通过 Dashboard 来管理。

举例说明，比如有一个服务叫 ABC，在这个服务下面可会有各种路由定义，路由定义通过列表的方式进行查看，路由里有一个字段叫优先级，可以通过配置路由的优先级字段，让相似的路由规则按照优先级依次匹配。另外一种路由查看方式是在 dashboard 中给 API 打上标签，可以让路由的管理变得更加人性化，便于按照标签过滤查询路由列表。

## 关于作者

金卫，Apache APISIX PMC 和 Apache SkyWalking committer。

![金卫个人介绍](https://static.apiseven.com/202108/1630651158654-2e028970-9e09-4d52-bf72-ab53aa98706b.png)
