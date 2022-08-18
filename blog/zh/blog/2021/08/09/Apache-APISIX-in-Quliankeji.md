---
title: "舍弃 Kong 和 NGINX，APISIX 在趣链科技 BaaS 平台的落地实践"
slug: 2021/08/09/apache-apisix-in-quliankeji
author: "盛威锋"
keywords: 
- APISIX
- Kong
- Nginx
- API 网关
- BaaS
description: 本文介绍了云原生 API 网关 Apache APISIX 在趣链科技 BaaS 平台中的落地实践情况，以及趣链科技在众多网关应用中选择 Apache APISIX 的原因。
tags: [Case Studies]
image: https://static.apiseven.com/2022/blog/0817/%E8%B6%A3%E9%93%BE%E7%A7%91%E6%8A%80.png
---

> 本文介绍了 Apache APISIX 在趣链科技 BaaS 平台中的落地实践情况，以及趣链科技在众多网关应用中选择 Apache APISIX 的原因。

<!--truncate-->

## 业务背景

BaaS（Blockchain as a Service），中文为“区块链即服务”，是指将区块链框架嵌入云计算平台，利用云服务基础设施的部署和管理优势，为开发者提供便捷、高性能的区块链生态环境和生态配套服务，支持开发者的业务拓展及运营支持的区块链开放平台。

通常情况下，一套完整的 BaaS 解决方案包括设备接入、访问控制、服务监控和区块链平台四个主要环节。

![BaaS introduction](https://static.apiseven.com/202108/1630647228757-9e5f730c-dde0-46b6-b5f3-81a15ff40e39.png)

**通过 BaaS 可以快速灵活地搭建区块链网络，对于企业来说，有了 BaaS 平台就能够对区块链业务进行统一的管理。**

相信有不少朋友接触过以太坊上面的合约代码，通过 BaaS 平台，我们能够很轻松地在 IDE 上编写智能合约，然后把它部署到我们的创建出来的区块链网络上，最后供上层的服务调用区块链相关的合约来进行业务的流转。

因为链的节点非常多，少则几十个，多则上千个，如果没有 BaaS 平台的支持，我们很难监控和维护链的运行。通过使用 BaaS 平台，用户不仅能够节约成本，而且可以更加便捷地管理区块链，提升整个系统的安全系数。

趣链科技 BaaS 产品的架构总共分为四层，分别为资源层、区块链底层、区块链服务层和应用层。

![趣链科技 BaaS 产品的架构](https://static.apiseven.com/202108/1630647274805-f2b960c4-57af-4257-99b4-9185dd5db255.png)

现在我们对 Baas 平台有了初步的了解，下面我们来看看 Apache APISIX 在 BaaS 系统上的使用场景与收获。

## Apache APISIX 的使用场景

### 场景 1：在 BaaS 系统上的落地实践

![Apache APISIX 在 BaaS 系统上的应用](https://static.apiseven.com/202108/1637027614625-f3ca4571-19d1-4aab-95e8-e524db104968.png)

从这张图中可以看到，趣链科技 BaaS 平台的架构不仅是微服务化的，而且分为两层，分别是业务接入层和核心服务层。

BFF（Backend For Frontend）一般对着前端，通过 HTTP 接入。核心服务一般是通过类似 Dubbo、ETCD 等服务注册，最后使用 gRPC 来访问。

也就是说，趣链科技的 BaaS 平台前端连接的都是 BFF 模块，然后 BFF 模块再去连接后面的微服务模块。BFF 的作用主要就是做业务聚合、格式适配，并把最终的结果数据给到前端。

这些业务模块需要把相关信息存到注册中心（ETCD），当要使用的时候，再通过网关模块把信息读取出来。

![趣链科技 BaaS 平台业务流程](https://static.apiseven.com/202108/1630647395095-39602805-0d56-4838-add1-b8b0f6a5d716.png)

在整个流程中，我们主要用到了 Apache APISIX 的四个特性：

- 路由转发
- 流量控制
- 安全控制
- 动态加载

我们下面再来了解下这些特性在趣链 BaaS 系统上是如何使用的。

#### 路由转发

![Apache APISIX Proxy-rewrite 路由转发](https://static.apiseven.com/202108/1630647494816-d78b6ea1-b291-446c-be36-fc2aae57ca7e.png)

趣链科技使用 Apache APISIX 官方提供的 Proxy-rewrite 插件执行路由转发服务。

当一个请求访问 8080 端口，通过 Proxy-rewrite 插件，请求会被转发到对应服务的 API 上去。

![Apache APISIX Proxy-rewrite 路由转发](https://static.apiseven.com/202108/1630647560207-1f931523-c9e7-4e58-95e1-c1c56cb1af3a.png)

上图为 Proxy-rewrite 的操作界面，我们可以看到可以通过正则匹配来匹配自己的转发规则，当然也可以通过写 HOST 或者通过 URL 来匹配。

#### 限流管理

![Apache APISIX 限流管理](https://static.apiseven.com/202108/1630647608569-086d3303-027b-4e11-ac09-3a9cca9405bd.png)

在趣链 BaaS 平台中，客户可以根据自己的需要构建任何链。此时，BaaS 平台需要快速地支持创建这些链，并对它们进行生命周期管理。

这些联盟链的创建，并不是通过硬代码直接写在代码上，而是通过驱动组件来解决的。在私有化场景中，我们需要有这样驱动组件来快速地提供支持，并需要控制驱动进程的访问频率。

![Apache APISIX 限流管理](https://static.apiseven.com/202108/1630647661769-3e026b06-35c6-4b1f-9de9-054c69415e2c.png)

在没有 Apache APISIX 之前，平台需要自己写逻辑代码，有 Apache APISIX 以后，我们可以直接使用官方提供的 Limit-req 插件来限制输入输出，以达到保护系统的目的。通过 Limit-req 插件的操作界面，我们可以很方便地配置速度、桶高等参数。

![Apache APISIX 限流管理](https://static.apiseven.com/202108/1630647699093-f071ccc1-c122-4463-928e-0eb46d5aa1aa.png)

#### 安全控制、权限管理

![Apache APISIX 安全控制](https://static.apiseven.com/202108/1630647753459-a693194d-369a-47fb-b9c3-a01fb97853b7.png)

在趣链科技的私有化场景，有不少用户不喜欢用平台所提供的账号体系，要求平台对接他们现有的账户系统，所以趣链科技使用了 Apache APISIX 的 Access-Auth 插件来适配第三方的鉴权服务地址。

![Apache APISIX 安全控制](https://static.apiseven.com/202108/1630648022609-85bbfa93-ab67-4c58-9cbf-8d360115ea4f.png)

在趣链科技的 Baas 平台中，所有的 Web 请求都会经过 Apache APISIX 的 Access-Auth 插件，完成 cookie 解析和鉴权，然后在 HEAD 头中携带用户信息，传给后端的微服务来处理业务。这样做的好处是，微服务的开发者不需要去解析 Cookie，而是可以直接把用户信息发送到微服务模块，非常方便。

#### 动态加载

![Apache APISIX 动态加载](https://static.apiseven.com/202108/1630648314372-43fcba14-2822-46ca-bc97-916a89871715.png)

上图左边是趣链科技 Baas 平台的客户端界面，上面没有 “商店” 的按钮；但在上图的右边，趣链科技的 Baas 公共平台上却有一个 “商店” 的按钮。在某些私有化场景中不需要 “商店” 按钮，但二者的后台服务是共享的，只要后端服务一启动，平台界面就会根据需求进行不同的显示。

趣链科技利用 Apache APISIX 与服务中心协同运作，保证前端微服务业务模块的新增和调整，这让趣链科技 Baas 平台的线上发布流程变得非常简单。

### 场景 2：在区块链节点上的落地实践

![区块链节点](https://static.apiseven.com/202108/1630648472228-b61451ca-4e4d-4410-877c-395c8770c85e.png)

通过上图可以看到有 A、B、C 三条链，这三条链是怎么创建出来的呢？

当用户通过 BaaS 平台购买了一条链，它的上层业务或开发者客户端就可以直连节点，比如某银行连左三个，某保险连右三个，或者有的用户就访问一整条链。这样会带来一个很大的问题，因为基本上每个节点都会被访问到，所以我们需要在公网环境上把所有的区块链上的节点全部都暴露出来。

#### 节约公网端口

![公网端口](https://static.apiseven.com/202108/1630648545755-fd385832-3375-4ac9-89f6-4c2bb10780be.png)

以这张图为例，我们可以看到 6 个节点，那这条链就至少需要有 6 个公网 IP 和 6 个端口。

这种情况对私有化的用户来说可能还可以接受，但是对于像趣链这样全部对互联网用户开放的 BaaS 平台，少则需要几十个，多则需要上百个、上千个公网 IP。这样不仅成本非常高，也对公网 IP 资源造成了浪费。

为了解决这个问题，趣链科技的 Baas 平台使用了 Apache APISIX 统一对外提供服务，无需联盟链全量节点暴露外网访问端口，可以有效节约成本。

#### 访问权限控制

![访问权限控制](https://static.apiseven.com/202108/1630648599393-f4e6a152-f6d6-47a4-b42a-a9a644be37f8.png)

对于传统软件来说，因为不同的异构链访问都有自己非常复杂的 RBAC 权限控制，所以用户需要在客户端加很多证书，非常令人头疼。

为了解决这个痛点，趣链科技 BaaS 平台通过 Apache APISIX 的 Key-auth 插件让有权限的用户直接能够访问，并且统一所有链的权限控制。

#### 集群化提升节点稳定性

![区块链节点](https://static.apiseven.com/202108/1630648704337-6e02ca0e-3e51-4251-8455-5b3bb7668912.png)

区块链的一个特性是：本质上，访问任何一个节点都是一样的。就像比特币一样，我们访问任何一个节点都能拿到数据，所以很多用户直接对着某个节点进行操作。

![提升节点稳定性](https://static.apiseven.com/202108/1630648773610-b56cb8aa-f690-4b30-9933-78f429fd20bc.png)

但是，直接访问单节点的模式很容易受到攻击。比如说，银行的并发量非常高，TPS 可以达到 4-5W/秒，每一次交易都会冲击这个节点。

为了能够达到快速动态扩容的效果，趣链科技 BaaS 平台利用 Apache APISIX 在 Kubernetes 上的 HPA 部署模式，根据流量动态地扩展，有效解决了单点流量冲击问题。

#### 多协议支持

![多协议](https://static.apiseven.com/202108/1630648817779-0c1ae8f9-0b40-403a-a759-e55f4423a6cf.png)

趣链科技 BaaS 平台使用了很多的异构链，这导致使用到的协议非常多样，如 HTTP、RPC、WebSocket 等。而 Apache APISIX 能很好地支持多协议，完全能满足趣链科技 BaaS 平台在相关场景中的使用，能显著减少开发的成本。

![多协议](https://static.apiseven.com/202108/1630648857753-05f65dc5-0ea6-4e9d-b9d4-b97089f97d59.png)
ng)

## 为什么选择 Apache APISIX

在 Apache APISIX 之前，趣链科技 BaaS 平台已经在使用 Kong 了，但是后来 Kong 被放弃了。

**为什么放弃 Kong？**

Kong 使用 PostgreSQL 来存储它的信息，这显然不是一个好方式。

![Kong](https://static.apiseven.com/202108/1630648907559-71716f82-6740-468c-afe0-49daa426d93a.png)

在软件行业，数据库的高可用配置非常复杂。不仅需要配备专门的 DBA，实施难度也非常大。

趣链科技 BaaS 系统本身已经在使用 MySQL，如果这里还需要搭建一个 PostgreSQL 数据库的话，意味着趣链科技的 BaaS 系统需要有两套关系型数据库。这会给实施难度、运维成本带来更多麻烦，引入更多风险。

同时，因为趣链科技 BaaS 平台也有不少地方用到了 etcd，所以最后趣链科技选择放弃 Kong，全面投向了基于 etcd 的 Apache APISIX。

**为什么不使用 Nginx？**

可能会有朋友会想，那为什么不使用 Nginx？

其实趣链科技 BaaS 平台以前用的就是 Nginx，但是后来发现，Nginx 与 Apache APISIX 相比还是有很多不完善的地方。

![Nginx](https://static.apiseven.com/202108/1630648946732-532ee7ac-478e-4f6c-aaa6-1f7f6be60693.png)

- **热启动、热插件问题**

在趣链 BaaS 平台中，我们不仅需要对联盟链进行管理，而且要能够随时对节点进行新增、删除。如果使用 Nginx，不仅存在扩展性问题，调整配置后还需要重启。而且在插件的编写上，Nginx 上需要配置非常复杂的规则代码。

- **集群化困难**

Nginx 的集群化非常困难，而 Apache APISIX 可以通过 etcd 集群的增强功能来实现。

- **无法直接代理 TCP、UDP**

Nginx 在默认情况下只能实现七层网络的代理，如果要支持四层网络，需要把 Stream 模块重新编译，而 Apache APISIX 能同时支持四 / 七层的代理。

- **没有良好的 Dashboard**

Nginx 没有 Dashboard，而 Apache APISIX Dashboard 能让开发、运维人员对于管理节点的难度变小。

## 未来规划

![未来规划](https://static.apiseven.com/202108/1630648997393-b5e6dd0e-3a2f-4dc7-94c1-cc892054ad09.png)

### 1.运用 Apache APISIX 提供或自研的日志插件

Apache APISIX 官网已提供了不少日志插件，比如对 HTTP、UDP 的支持，包括 Kafka 等，但像趣链 BaaS 这样需要管控成千上万区块链网络的平台，当每次问题发生的时候，在日志中翻找故障痕迹都是一件非常头痛的事情。

在不久的将来，趣链科技会在 BaaS 系统和区块链系统之间，基于 Apache APISIX 增加一些 APM 功能，提升多链场景下的运维管理效率。

### 2.开发监管插件，实现操作留痕及溯源

国内对于区块链的监管非常严格，一切操作都需要留痕和溯源。未来，趣链科技会基于 Apache APISIX 开发监管插件来提升监管能力，增加 VIP、白名单、回放等功能。

### 3.使用 APISIX Ingress Controller，代替 Kubernetes 默认的 Nginx-Ingress

在部署 Kubernetes 的时候，我们一般都会选择 Nginx-Ingress 来处理外网请求，但因为上面提到的一些 Nginx 的问题，趣链科技正在调研使用 APISIX Ingress Controller。

### 4.探索 Service Mesh

趣链科技之前尝试过 traffic-mesh，未来会尝试使用 APISIX Mesh。
