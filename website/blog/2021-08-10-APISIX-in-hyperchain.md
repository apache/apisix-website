
title: "舍弃Kong和Nginx，Apache APISIX 在趣链科技 BaaS 平台的落地实践"
author: 盛威锋
authorURL: ""
authorImageURL: ""
keywords:
- API 网关
- APISIX
- Apache APISIX
- 趣链科技
- BaaS
description: 本文介绍了 Apache APISIX 在趣链区块链 BaaS 平台中的落地实践情况，以及阐述了为何趣链科技在众多网关应用中选择了 Apache APISIX。
<!--truncate-->

> 作者盛威锋，现趣链科技区块链服务平台（BaaS） 架构师。长期从事国产自主区块链服务平台技术的研发，相关成果服务于包括建设银行、光大银行等国内多个大中型银行的总行级区块链建设项目，对区块链运行机制、联盟跨域组网、区块链应用落地等方面有深刻理解与实践。

## 背景说明

什么是 BaaS？

BaaS（Blockchain as a Service），中文为“区块链即服务”，是指将区块链框架嵌入云计算平台，利用云服务基础设施的部署和管理优势，为开发者提供便捷、高性能的区块链生态环境和生态配套服务，支持开发者的业务拓展及运营支持的区块链开放平台。

通常情况下，一套完整的 BaaS 解决方案包括设备接入、访问控制、服务监控和区块链平台四个主要环节。

![什么是 BaaS](https://static.apiseven.com/202108/1630055890130-aa2ebc9f-ad39-4f2c-85b8-2bb9a258a2e6.png)

**我们可以通过 BaaS 来快速灵活地搭建区块链网络，对于企业来说，有了 BaaS 平台以后就能够对区块链业务进行统一的管理。**

相信有不少朋友接触过以太坊上面的合约代码，通过BaaS平台，我们能够很轻松地在 IDE 上编写智能合约，然后把它部署到我们的创建出来的区块链网络上，最后供上层的服务调用区块链相关的合约来进行业务的流转。 

因为链的节点非常多，少则几十个，多则上千个，如果没有 BaaS 平台的支持，我们很难监控和维护链的运行。通过使用 BaaS 平台，用户不仅能够节约成本，而且可以对区块链更加便捷地进行管理，整个系统的安全系数也更高。 

趣链科技 BaaS 产品的架构总共分为四层，分别为资源层、区块链底层、区块链服务层和应用层。

![趣链科技 BaaS 产品架构](https://static.apiseven.com/202108/1630055936301-0da677aa-1773-4830-ad24-4d2cafd0d049.png)

现在我们对 Baas 平台有了初步的了解，下面我们来看看 Apache APISIX 在 BaaS 系统上的使用场景与收获。

## Apache APISIX 的使用场景与收获

### 场景1：在BaaS系统上的落地实践

![Apache APISIX 在BaaS系统上的落地实践](https://static.apiseven.com/202108/1630055990508-aa786c31-a612-4d0d-8f49-8478dd969323.png)

从这张图中可以看到，趣链科技的 BaaS 平台的架构不仅是微服务化的，而且分为两层，分别是业务接入层和核心服务层。 

BFF（Backend For Frontend） 一般是对着前端，通过 HTTP 接入。核心服务一般是通过类似 Dubbo 、ETCD 等服务注册，最后使用 gRPC 来访问。

也就是说，趣链科技的 BaaS 平台前端连接的都是 BFF 模块，然后 BFF 模块再去连接后面的微服务模块。BFF 的作用主要就是做业务聚合、格式适配，并把最终的结果数据给到前端。

![Apache APISIX 在BaaS系统上的落地实践](https://static.apiseven.com/202108/1630056020364-00f8fea8-8f65-421c-be71-7e1f8d7f8635.png)

这些业务模块需要把相关信息存到注册中心（ETCD），当要使用的时候，再通过网关模块把信息读取出来。

![Apache APISIX 在BaaS系统上的落地实践](https://static.apiseven.com/202108/1630056064266-43fbdb62-73ae-4311-befb-b8d5a483970f.png)

在整个流程中，我们主要是利用 Apache APISIX 的四个特点：

- 路由转发
- 流量控制
- 安全控制
- 动态加载

我们下面再来了解下这些特性在趣链BaaS系统上是如何使用的。

#### 路由转发

![路由转发](https://static.apiseven.com/202108/1630056098792-5b0a95ec-e13c-4e1e-8bf5-3e4b15f7d684.png)

趣链科技使用 Apache APISIX 官方提供的 Proxy-rewrite 插件执行路由转发服务。

当一个请求访问 8080 端口，通过 Proxy-rewrite 插件，请求会被访问到对应的服务的 API 上去。 

![Proxy-rewrite 插件](https://static.apiseven.com/202108/1630056120865-707e9353-ca15-48ac-8bc9-62dd595352b2.png)

上图为 Proxy-rewrite 的操作界面，我们可以看到我们可以通过正则匹配来匹配自己的转发规则，当然我们也可以通过写 HOST，或者通过 URL 来匹配。 

#### 限流管理

![限流管理](https://static.apiseven.com/202108/1630056145755-e7bf857b-1453-4f1f-9aa3-cd0c6bf49d6b.png)

在趣链BaaS平台中，客户可以根据自己的需要，构建任何链。此时，BaaS 平台需要快速地支持创建这些链，并对它们进行生命周期管理。

这些联盟链的创建，并不是通过硬代码直接写在代码上，而是通过驱动组件来解决的。在私有化场景中，我们需要有这样驱动组件来快速地提供支持，并需要控制驱动进程的访问频率。 

![限流管理](https://static.apiseven.com/202108/1630056160666-5d0dc2ef-5166-4295-ba6f-5084081b3bf6.png)

在没有 Apache APISIX 之前，平台需要自己写逻辑代码，有 Apache APISIX 以后，我们可以直接使用官方提供的 Limit-req 插件来限制输入输出，以达到保护系统的目的。

通过 Limit-req 插件的操作界面，我们可以很方便的配置速度、桶高等参数。

![限流管理](https://static.apiseven.com/202108/1630056185755-707b7280-fb2c-4e2f-8a8a-70c4f94a678f.png)

#### 安全控制、权限管理

![鉴权流程](https://static.apiseven.com/202108/1630056252523-2370a89f-bb4e-4440-a29a-9421c265a456.png)

在趣链科技的私有化场景，有不少用户不喜欢用平台所提供的账号体系，要求平台对接他们现有的账户系统，所以趣链科技使用 Apache APISIX 的 Access-Auth 插件，利用它来适配第三方的鉴权服务地址。

![API鉴权示意图](https://static.apiseven.com/202108/1630056274807-bb101905-ec8f-4105-a716-1e07bf4acfeb.png)

在趣链科技的 Baas 平台中，所有的 Web 请求都会经过 Apache APISIX 的 Access-Auth 插件，完成 cookie 解析和鉴权，然后在 HEAD 头中携带用户信息，传给后端的微服务来处理业务。这样做的好处就是，微服务的开发者不需要去解析Cookie，而是可以直接把用户信息发送到微服务模块，非常方便。

#### 动态加载

![动态加载](https://static.apiseven.com/202108/1630056309017-abeed83f-667b-4dc7-a9e5-b46d98e535f5.png)

上图的左边是趣链科技的 Baas 平台的客户端的界面，上面没有 “商店” 的按钮；但在上图的右边，趣链科技的 Baas 公共平台上就有一个 “商店” 的按钮。在某些私有化场景中不需要 “商店” 的按钮，但二者的后台服务是共享的，只要后端服务一启动，平台界面就会根据需求进行不同的显示。

趣链科技利用 Apache APISIX，与服务中心协同运作，保证前端微服务业务模块的新增和调整，这让趣链科技的 Baas 平台的线上发布流程变得非常简单。 

### 场景2：在区块链节点上的落地实践

![创建区块链](https://static.apiseven.com/202108/1630056325750-de72cdc2-c6c0-4695-a4b9-57ea6b873fc7.png)

通过上图，大家可以看到有A、B、C三条链，这三条链是怎么创建出来的呢？

当用户通过 BaaS 平台购买了一条链，它的上层业务或开发者客户端就直连节点，比如某银行连左三个，某保险连右三个，或者有的用户就访问一整条链。这样会带来一个很大的问题，因为基本上每个节点都会被访问到，所以我们需要在公网环境上把所有的区块链上的节点全部都暴露出来。

#### 节约公网端口

![节约公网端口](https://static.apiseven.com/202108/1630056369385-d9a04ea1-be75-4ac9-9d2f-a46699f60840.png)

以这张图为例，我们可以看到 6 个节点，那这条链就至少需要有 6 个公网 IP 和 6 个端口。

这种情况对私有化的用户来说可能还可以接受，但是对于像趣链这样的全部对互联网用户开放的 BaaS 平台，少则需要几十个，多则需要上百个、上千个公网 IP。这样不仅成本非常高，并且也对公网 IP 资源造成了浪费。

为了解决这个问题，趣链科技的 Baas 平台使用了 Apache APISIX。

#### 访问权限控制

![访问权限控制](https://static.apiseven.com/202108/1630056383524-f6062049-a45a-403d-9b77-abbdd1d381eb.png)

与传统软件不同，因为不同的异构链访问都有自己非常复杂的 RBAC 权限控制，所以用户需要在客户端加很多证书，非常令人头疼。

为了解决这个痛点，趣链科技的 Baas 平台通过 Apache APISIX 的 Key-auth 插件让有权限的用户直接能够访问，并且统一所有链的权限控制。 

#### 集群化提升节点稳定性

![集群化提升节点稳定性](https://static.apiseven.com/202108/1630056398157-40cdfa27-661b-43d8-8ae2-d645e1ec4b66.png)

区块链的一个特性是：本质上，访问任何一个节点都是一样的。

就像比特币一样，我们访问任何一个节点都能拿到数据，所以很多用户直接对着某个节点进行操作。

![集群化提升节点稳定性](https://static.apiseven.com/202108/1630056418136-2fa2b550-1f39-4212-b2be-979b454dc599.png)

但是，直接访问单节点的模式很容易受到攻击。比如说，银行的并发量非常高，TPS可以达到4-5W/秒，每一次交易都会冲击这个节点。

为了能够达到快速动态扩容的效果，趣链科技的 Baas 平台利用 Apache APISIX 在 Kubernetes 上的 HPA 部署模式，根据流量动态地扩展，有效解决单点流量冲击问题。 

#### 多协议支持

![多协议支持](https://static.apiseven.com/202108/1630056439176-2836cbdc-0cc2-45ad-8d2d-63986f9ed602.png)

因为趣链科技的 Baas 平台使用了很多的异构链，这导致使用到的协议非常的多样，如HTTP、RPC、WebSocket 等。而 Apache APISIX 对多协议的支持是做得非常好，完全能满足趣链科技的 Baas 平台在相关场景中的使用，这显著地减轻了开发的成本。 

![多协议支持](https://static.apiseven.com/202108/1630056453306-b7b01911-53e4-4bd9-aa5b-f6574a9606d6.png)

## 在选择 Apache APISIX 之前

在选择 Apache APISIX 之前，趣链科技的 Baas 平台已经在使用 Kong 了，但是后来 Kong 被放弃了。

### 为什么放弃 Kong？

Kong 使用 PostgreSQL 来存储它的信息，这显然不是一个好方式。

![Kong](https://static.apiseven.com/202108/1630056477255-eaca54b7-5e5c-4d65-a832-d6a5b57fe7af.png)

在软件行业，数据库的高可用配置是非常复杂的。不仅需要配备专门的DBA，实施难度也非常大。

对趣链科技的 Baas 系统本身已经在使用 MySQL，如果这里还需要搭建一个 PostgreSQL 数据库的话，意味着趣链科技的 Baas 系统需要有两套关系型数据库。这给实施难度、运维成本带来了麻烦，引入了更多风险。

同时，因为趣链科技的 Baas 平台也有不少地方用到了ETCD，所以最后，趣链科技放弃 Kong，全面投向了基于 ETCD 的 Apache APISIX。

### 为什么不使用 Nginx？

可能会有朋友会想，那为什么不使用 Nginx？

是的，趣链科技的 BaaS 平台以前就是用 Nginx，但是后来发现，Nginx 与 Apache APISIX 相比，有很多不完善的地方。

![Nginx](https://static.apiseven.com/202108/1630056493519-affcfda1-b34c-4452-8ba8-5ca15791958b.png)

#### 热启动、热插件问题

在趣链 BaaS 平台中，我们不仅需要对联盟链进行管理，而且要能够随时对节点进行的新增、删除。

如果使用 Nginx，不仅存在扩展性问题，调整配置后还需要重启。而且在插件的编写上，Nginx 上需要配置非常复杂的规则代码。

#### 集群化困难

Nginx的集群化非常困难，而 Apache APISIX 可以通过 ETCD 集群的增强功能来实现。

#### 无法直接代理 TCP、UDP

Nginx 在默认情况下只能实现七层网络的代理，如果要支持四层网络，需要把 Stream 模块重新编译，而 Apache APISIX 能同时支持四/七层的代理。

#### 没有良好的Dashboard

Nginx 没有 Dashboard，而 Apache APISIX Dashboard 能让开发、运维人员对于节点的管理难度变小。

## 未来规划

![未来规划](https://static.apiseven.com/202108/1630056523131-b7924f96-a967-4cae-abc7-56bbd8d2ad17.png)

### 运用 Apache APISIX 提供或自研的日志插件

Apache APISIX 官网已提供不少的日志插件，比如对 HTTP、UDP 的支持，包括 kafka 等，但像趣链 BaaS 这样需要管控成千上万区块链网络的平台，当每次问题发生的时候，在日志中翻找故障痕迹都是一件非常头痛的事情。

在不久的将来，趣链科技会在 BaaS 系统和区块链系统之间，基于 Apache APISIX 增加一些 APM 功能。提升多链场景下的运维管理效率。

### 开发监管插件，实现操作留痕及溯源

国内对于区块链的监管非常严格，一切的操作都需要留痕和溯源。

未来，趣链科技会基于 Apache APISIX 开发监管插件来提升监管能力，增加 VIP、白名单、回放等功能。

### 使用 APISIX Ingress Controller，代替 Kubernetes 默认的 Nginx-Ingress

在部署 Kubernetes 的时候，我们一般都会选择 Nginx-Ingress 来处理外网请求，但因为上面提到的一些 Nginx 的问题，趣链科技正在调研使用 APISIX Ingress Controller。

### 探索 Service Mesh

趣链科技之前尝试过 traffic-mesh，未来会尝试使用 APISIX Mesh。
