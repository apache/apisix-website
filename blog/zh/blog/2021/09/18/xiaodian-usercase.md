---
title: "Apache APISIX 助力便利充电创领者小电，实现云原生方案"
author: "孙冉"
keywords: 
- Apache APISIX
- API 网关
- 小电
- 云原生
- 容器化
description: 本文介绍了国内便利充电创领者——小电通过应用云原生 API 网关 Apache APISIX，进行公司产品架构的云原生项目搭建的相关背景和实践介绍以及对公司网关未来的规划。
tags: [Case Studies]
image: https://static.apiseven.com/2022/blog/0817/%E5%B0%8F%E7%94%B5.png
---

> 本文介绍了国内便利充电创领者——小电通过应用 Apache APISIX，进行公司产品架构的云原生项目搭建的相关背景和实践介绍
> 作者孙冉，运维专家。目前就职于小电平台架构部，主要负责 K8s 集群和 API 网关的相关部署。

<!--truncate-->

## 业务背景

小电作为国内共享充电宝服务平台，目前还处于初创阶段。从运维体系、测试环境等方面来讲，当下产品的业务主要面临了以下几个问题：

- VM 传统模式部署，利用率低且不易扩展
- 开发测试资源抢占
- 多套独立的测试环境（k8s），每次部署维护步骤重复效率低
- 使用 Nginx 配置管理，运维成本极高

在 2020 年初，我们决定启动容器化项目，打算寻找一个现有方案来进行上述问题的解决。

目前公司是以「拥抱云原生」的态度来进行后续业务的方案选择，主要看重云原生模式下的微服务改造、DevOps、持续交付以及最重要的容器化特性。

![为什么选择云原生](https://static.apiseven.com/202108/1631946996654-5cb0668b-bd15-42f8-9446-06ba11449367.png)

## 为什么需要 Apache APISIX

基于上述云原生模式的选择，我们开启了容器化方案搭建。方案主要有三部分组成：

1. **自研 Devops 平台 - DNA**：这个平台主要是用于项目管理、变更管理（预发、生产环境）、应用生命周期管理（DNA Operator）和 CI/CD 相关功能的嵌入。
2. **基于 k8s Namespace 的隔离**：之前我们所有的开发项目环境，包括变更环境等都全部注册在一起，所以环境与环境之间的相互隔离成为我们必要的处理过程。
3. **动态管理路由的网关接入层**：考虑到内部的多应用和多环境，这时就需要有一个动态管理的网关接入层来进行相关的操作处理。

### 网关选择

在网关选择上，我们对比了以下几个产品：OpenShift Route、Nginx Ingress 和 Apache APISIX。

OpenShift 3.0 开始引入 OpenShift Route ，作用是通过 Ingress Operator 为 Kubernetes 提供 Ingress Controller，以此来实现外部入栈请求的流量路由。但是在后续测试中，功能支持方面不完善且维护成本很高。同时 Nginx Ingres 也存在类似的问题，使用成本和运维成本偏高。

在参与 Apache APISIX 的调研过程中我们发现，Apache APISIX 的核心就是提供路由和负载均衡相关功能，同时还支持：

- 动态路由加载、实时更新
- etcd 存储下的无状态高可用模式
- 横向扩展
- 跨源资源共享（CORS）、Proxy Rewrite 插件
- API 调用和自动化设置
- Dashboard 清晰易用

当然，作为一个开源项目，Apache APISIX 有着非常高的社区活跃度，也符合我们追求云原生的趋势，综合考虑我们的应用场景和 Apache APISIX 的产品优势，最终将项目环境中所有路由都替换为 Apache APISIX。

## 应用 Apache APISIX 后的变化

### 整体架构

我们目前的产品架构与在 K8s 中使用 Apache APISIX 大体类似。主要是将 Apache APISIX 的 Service 以 LoadBalancer 类型暴露到外部。然后用户通过请求访问传输到 Apache APISIX，再将路由转发到上游的相关服务中。

![整体架构](https://static.apiseven.com/2021/0918/20220816-171733.jpg)

额外要提的一点是，为什么我们把 etcd 放在了技术栈外。一是因为早些版本解析域名时会出现偏差，二是因为在内部我们进行维护和备份的过程比较繁琐，所以就把 etcd 单独拿了出来。

### 业务模型

![业务模型](https://static.apiseven.com/2021/0918/20220816-172217.jpg)

上图是接入 Apache APISIX 后的业务环境改造模型。每个开发或项目进行变更时，DNA 都会创建一个变更，同时转化为 k8s Namespace 资源。

因为 k8s Namespace 本身就具备资源隔离的功能，所以在部署时我们基于 Namespace 提供了多套项目变更环境，同时包含所有应用副本并注册到同一个 Eureka。我们改造了 Eureka 使得它可以支持不同 Namespace 的应用副本隔离，保证互相不被调用。

### 功能加持

将上述架构和业务模型实践起来后，每个项目变更都会产生对应的 Namespace 资源，同时 DNA Operator 就会去创建对应的 APP 资源，最后去生成相应的 Apache APISIX 路由规则。

#### 功能一：项目变更多环境

在变更环境中我们有两种场景，一个是点对点模式，即一个域名对应一个应用。开发只需要启用域名，DNA 里就会利用 Apache APISIX 去生成对应路由，这种就是单一路径的路由规则。

![单一路径](https://static.apiseven.com/2021/0918/20220816-172249.jpg)

另一种场景就是多级路径路由。在这种场景下我们基于 Apache APISIX 将项目变更中需要的多个 APP 路由指向到当前 Namespace 环境，其关联 APP 路由则指向到一套稳定的 Namespace 环境中（通常为 Stable 环境）。

![多级路径](https://static.apiseven.com/2021/0918/20220816-172458.jpg)

#### 功能二：自动化流程

基于上述项目环境的一些路由规则，搭配 Apache APISIX 的 API 调用功能做了一个控制中心，集合了一些包括域名前缀和对应的应用实例等功能。

比如某个新应用上线时，可以申请一条相应的路由规则，然后把规则加到控制中心中。需要请求路由时，就可以一键启用这条路由规则并自动同步到 Apache APISIX。

![自动化流程](https://static.apiseven.com/2021/0918/20220816-172538.jpg)

另外我们也提供了单一普通路由申请，包括线上环境和测试环境，或者一些对外公网的暴露与测试需求等，也可以调用 Apache APISIX 接口。

![普通路由](https://static.apiseven.com//2021/0918/20220816-172610.jpg)

## 基于 Apache APISIX 的具体实践

### 基于 OpenShift 部署

OpenShift 具有非常严格的 SCC 机制，在利用 OpenShift 去部署 Apache APISIX 时遇到了很多问题，所以每次发版都要重新去做编译。

另外基于 Apache APISIX 提供的 Docker 镜像功能，我们将日常的一些基础软件进行了更新，比如调优和问题查看，通过 Image Rebuild 功能上传到内部镜像仓库。

### 跨版本平滑处理

我们一开始使用的 Apache APISIX 为 1.5 版本，在更新到最新版本的过程中，我们经历了类似 etcd v2 版本性能下降、增加了 CORS 插件强校验等情况。

![平滑处理](https://static.apiseven.com/202108/1632294589632-e113850d-57a6-4a82-be21-63ec8e78f842.png)

基于此，我们采取了版本切流的方案，新版本启用并创建新的 Service 以及暴露相关 SLB 信息。通过 Service 的 Selector 属性，将 Gateway 切换到新版本的 Apache APISIX 中。另一方面我们也会将流量进行切分处理，将部分流量通过 DNS 解析到新版本 Apache APISIX SLB 地址，来实现版本更迭的平滑处理。

### 解决 etcd 压缩问题

在使用期间我们也观察到 Load 一直突高不下的情况，经检查发现 etcd 内的数据量已达到 600 多兆，所以我们采取了定期压缩 etcd 的措施，将历史事物数据全部清除。具体代码可参考：

```sh
$ ETCDCTL_API=3 etcdctl --endpoints=http://etcd-1:2379 compact 1693729
$ ETCDCTL_API=3 etcdctl --endpoints=http://etcd-1:2379 defrag
```

### 获取 Client-IP

在线上业务场景中，我们需要获取到源 IP 去做相关的业务处理。刚好 Apache APISIX 提供了「X-Real-IP」的功能，通过配置 real_ip_header 和开启 externalTrafficPolicy 的 Local 模式进行相关获取操作。

## 未来期望

众所周知，小电现在是主做共享充电宝业务场景，所以在属性上也是偏物联网方向。

从业务层面出发，我们也还有一些重要业务比如 MQTT 类型的应用。目前它们在容器内还是以 SLB 模式去暴露的，希望后续也可以接入到整个 Apache APISIX 集群里。

从前端层面来讲，目前的前端应用还是部署在容器里，后续我们也打算将前端应用直接接入 Apache APISIX，通过 Proxy Rewrite 插件功能直接指向我们的阿里云 OSS 域名。这样可以节省容器部署的资源，进行更方便地管理。

在对 Apache APISIX 项目上，我们经过实践部署也产生了一些改进需求，希望后续 Apache APISIX 的版本更迭中可以进行相关功能的支持或完善。比如：

1. 技术管理层面进行多集群功能的添加
2. 开发层面进行更细粒度的用户权限管理
3. 功能层面支持 SSL 证书滚动更新
4. Apache APISIX-Ingress-Controller 相关业务接入
