---
title: "有了 NGINX 和 Kong，为什么还需要 Apache APISIX"
slug: 2021/06/28/why-we-need-apache-apisix
author: "王院生"
authorURL: "https://github.com/membphis"
authorImageURL: "https://avatars.githubusercontent.com/u/6814606?v=4"
keywords:
- APISIX
- Kong
- Nginx
- API 网关
- 开源
description: 本文介绍了云原生 API 网关 Apache APISIX 架构演进历史，对比 Nginx 和 Kong 这两个框架 Apache APISIX 的优势是什么，并且介绍 APISIX 未来的趋势。
tags: [Ecosystem]
---

> 本文介绍了 Kong 和 NGINX 的痛点，以及 Apache APISIX 如何解决它们的痛点，并且为你介绍了 Apache APISIX 的应用场景。

<!--truncate-->

云原生时代，动态和可观测性成为衡量 API 网关的标准之一。Apache APISIX 自诞生之初就一直跟随着云原生的脚步前行。然而 Apache APISIX 作为一个诞生刚刚三年的新一代网关，为什么可以从诞生 20 多年的 NGINX 与开源 8 年的 Kong 中突出重围，成为云原生时代最流行以及最活跃的网关？我认为其中最重要的原因是解决了开发者和企业在使用 NGINX 和 Kong 中的痛点。

## NGINX 与 Kong 的痛点

在单体服务时代，使用 NGINX 可以应对大多数的场景，而到了云原生时代，NGINX 因为其自身架构的原因则会出现两个问题：

- 首先是 NGINX 不支持集群管理。几乎每家互联网厂商都有自己的 NGINX 配置管理系统，系统虽然大同小异但是一直没有统一的方案。
- 其次是 NGINX 不支持配置的热加载。很多公司一旦修改了配置，重新加载 NGINX 的时间可能需要半个小时以上。并且在 Kubernetes 体系下，上游会经常发生变化，如果使用 NGINX 来处理就需要频繁重启服务，这对于企业是不可接受的。

而 Kong 的出现则解决了 NGINX 的痛点，但是又带来了新的问题：

- Kong 需要依赖于 PostgreSQL 或 Cassandra 数据库，这使 Kong 的整个架构非常臃肿，并且会给企业带来高可用的问题。如果数据库故障了，那么整个 API 网关都会出现故障。
- Kong 的路由使用的是遍历查找，当网关内有超过上千个路由时，它的性能就会出现比较急剧的下降。

而 APISIX 的出现则解决了上述所有问题，成为了云原生时代最完美的 API 网关。那么 Apache APISIX 的优势到底是什么？为什么可以在短短三年的时间里成为全世界最活跃的网关？

## APISIX 的优势

### 优异的架构

首先 Apache APISIX 拥有优异的架构，现在很多应用都在向微服务、容器化迁移，形成新的云原生时代。云原生作为当下的技术潮流，将重写传统企业的技术架构。而 APISIX 自诞生之初就跟随技术潮流，并将其设计为云原生架构：

![APISIX](https://static.apiseven.com/2022/blog/0729/1.png)

如上图所示，左右分别是 APISIX 的数据面（Data Plane）和控制面（Control Plane）：

- 数据面：以 NGINX 的网络库为基础（未使用 NGINX 的路由匹配、静态配置和 C 模块），使用Lua 和 NGINX 动态控制请求流量；
- 控制面：使用 etcd 来存储和同步网关的配置数据，管理员通过 Admin API 或者 Dashboard 可以在毫秒级别内通知到所有数据面节点。

在更新数据上，Kong 采用轮询数据库的方式，但是可能需要 5-10 秒才能获取到最新的配置；而 APISIX 则采用监听 etcd 的配置变更的方式，可以将时间控制在毫秒级，达到实时生效的效果。
而且由于 APISIX 和 etcd 均支持多点部署，因此在 APISIX 当前架构中，任何一个服务出现异常宕机等事故，都不会影响 APISIX 正常对外提供服务的能力。

### 完善的生态

下图为 APISIX 的生态图，从该图可以准确看到 APISIX 已经支持的 7 层协议有 HTTP(S)、HTTP2、Dubbo 和物联网协议 MQTT 等等，4 层协议有 TCP/UDP。
右侧部分则是一些开源或者 SaaS 服务，比如 SkyWalking、Prometheus 、Vault 等等。而最下面则是比较常见的操作系统环境、云厂商和硬件环境。而作为一个开源软件，APISIX 也支持在 ARM64 的服务器上运行。

![APISIX's Ecosystem](https://static.apiseven.com/2022/blog/0729/2.PNG)

APISIX 不仅支持众多协议与操作系统，而且也支持多语言编程插件。APISIX 诞生之初仅支持使用 Lua 语言编写插件，这种情况下就需要开发者掌握 Lua 和 NGINX 相关的技术栈。然而 Lua 和 NGINX 属于相对小众的技术，开发者很少。因此我们在 APISIX 上支持了多语言开发插件，目前已经正式支持了 Java、Golang、Node.js、Python 等语言。

![programming language](https://static.apiseven.com/2022/blog/0729/3.png)

### 活跃的社区

下图是贡献者增长曲线，其中横坐标代表时间线，纵坐标代表贡献者总数。我们可以看到 APISIX 和 Kong 这两个项目相对更活跃，APISIX 的增长速度从开源第一天就保持着非常不错的增长率，在以接近 Kong 两倍的速度快速成长，并且贡献者数量已经远远超过了 Kong，由此可见 APISIX 受欢迎程度。当然评价一个项目活跃度还有很多其他方法，比如查看每月活跃 Issue、PR 总数等方式，值得高兴的是 APISIX 在这些方面也是一骑绝尘。

![Contributor graph](https://static.apiseven.com/2022/blog/0729/4.png)

## APISIX 的应用场景

从下图中，相信你已经看出 APISIX 的目标：**统一代理基础设施**。

![APISIX Application scenarios](https://static.apiseven.com/2022/blog/0729/5.png)

也许你会有疑问：APISIX 要支持这么多场景，是否会让 APISIX 变得四不像？

因为 APISIX 的核心是高性能代理服务，自身不绑定任何环境属性。当它演变为 Ingress、服务网格等产品时，都是外部服务与 APISIX 配合，变化的是外部程序而不是 APISIX 自身，下面将逐步为大家介绍 APISIX 是如何支持这些场景的。

### Load Balancer 和 API 网关

首先是针对传统的 LB 和 API 网关场景，因为 APISIX 基于 NGINX + LuaJIT 实现，所以天然具备高性能、安全等特性，并且原生支持了动态 SSL 证书卸载、SSL 握手优化等功能，在负载均衡的服务能力上也更优秀。从 NGINX 切换到 APISIX 不仅性能不会下降，而且可以享受到动态、统一管理等特性带来的管理效率的提升。

### 微服务网关

APISIX 目前支持多种语言编写扩展插件，可以解决东西向微服务 API 网关面临的主要问题——异构多语言和通用问题。内置支持的服务注册中心有 Nacos、etcd、Eureka 等，还有标准的 DNS 方式，可以平滑替代 Zuul、Spring Cloud Gateway、Dubbo 等微服务 API 网关。

### Kubernetes Ingress

目前 K8s 官方 Kubernetes Ingress Controller 项目主要基于 NGINX 配置文件的方式，所以在路由能力和加载模式上稍显不足，并且存在一些明显劣势。比如添加、修改任何 API 时，需要重启服务才能完成新 NGINX 配置的更新，但重启服务，对线上流量的影响是非常大的。

而 [APISIX Ingress Controller](https://apisix.apache.org/zh/docs/ingress-controller/getting-started/) 则完美解决了上面提到的所有问题：支持全动态，无需重启加载。同时继承了 APISIX 的所有优势，还支持原生 Kubernetes CRD，方便用户迁移。

![APISIX Kubernetes Ingress](https://static.apiseven.com/2022/blog/0729/6.png)

### 服务网格

未来五到十年，基于云原生模式架构下的服务网格架构开始崭露头角。APISIX 也提前开始锁定赛道，通过调研和技术分析后，APISIX 已经支持了 xDS 协议，APISIX Mesh 就此诞生，在服务网格领域  APISIX 也拥有了一席之地。

![APISXI Mesh](https://static.apiseven.com/2022/blog/0729/7.png)

## 总结

Apache APISIX 自开源第一天，迄今为止已经有三年的时间了，高活跃度的社区以及实际的[用户案例](https://apisix.apache.org/zh/blog/tags/case-studies/)证明了 APISIX 是云原生时代最完美的 API 网关。通过阅读本文，相信你已经对 APISIX 有了更全面的认识，期待你在生产环境中使用 APISIX 作为你的 API 网关。

更多信息请观看[有了 NGINX 和 Kong，为什么还需要 Apache APISIX?](https://www.bilibili.com/video/BV1w54y1V73Z?p=1&share_medium=android&share_plat=android&share_source=COPY&share_tag=s_i&timestamp=1621812452&unique_k=PEusrt)
