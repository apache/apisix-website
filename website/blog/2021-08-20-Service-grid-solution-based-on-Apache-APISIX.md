---
title: "基于 Apache APISIX 的服务网格方案"
avatar: "https://avatars.githubusercontent.com/u/10428333?v=4"
author: "张超"
href: "https://github.com/tokers"
date: 2021-08-20
keywords: APISIX,服务网格,网关,控制面,架构
description: 本文将为大家介绍如何在服务网格方案中使用 Apache APISIX 作为数据面及其作为网格的 sidecar 的优势。
---

服务网格（Service Mesh）是处理服务间通信的基础设施层。它负责构成现代云原生应用程序的复杂服务拓扑来可靠地交付请求。通常会为每个服务实例提供一个“边车”（sidecar）代理实例。边车会处理服务间的通信、监控和安全相关的问题， 以及任何可以从各服务中抽象出来的逻辑。

## Apache APISIX 简介 

Apache APISIX 是一个动态、实时、高性能的 API 网关， 提供负载均衡、动态上游、灰度发布、服务熔断、身份认证、可观测性等丰富的流量管理功能。

### 功能亮点

下面列举出 Apache APISIX 的部分功能亮点，更多功能特性请访问 [Github 仓库主页](https://github.com/apache/apisix)。

#### 全动态

Apache APISIX 是全动态的云原生 API 网关，上游、SSL 证书、路由、插件等所有功能，都支持动态更新，不需要 reload 就能实时生效，不会产生断连的情况。

#### 丰富的负载均衡策略

Apache APISIX 支持比较多的负载均衡策略，如：最常用的带权轮询、一致性 hash、EWMA 算法（指数加权移动平均法）。

#### 支持服务发现、服务治理

Apahce APISIX 提供服务发现的功能，如：可以和 Consul 和 Nacos 的组件对接，实现服务发现的功能。同时也支持服务治理相关的功能，如：限流、限速、熔断等。

#### 扩展能力强

Apache APISIX 是完全基于插件进行扩展的，二次开发难度比较低，而且还能通过 Lua、Java、Go 和 WASM 等来开发自定义插件。借助灵活的插件机制，可针对内部业务完成功能定制。

### 架构

![Apache APISIX 的架构图](https://static.apiseven.com/202108/1631065632487-3e46ee68-c1fb-4546-a82f-0f81504ce560.png)

这是 Apache APISIX 的架构图，左边是数据面（Data Plane），右边是管理面（Control Plane），配置中心选择了当下最成熟的基础设施：etcd，通过 watch etcd，拿到路由、上游等数据。

在这个架构里面，找不到一个单点，其中任何一个服务出现异常宕机等事故，都不会影响 APISIX 正常对外提供服务的能力。当整体架构中的每一个点都支持高可用时，用户生产系统的高稳定性就非常容易实现。

### 活跃的社区

![](https://static.apiseven.com/202108/1631065708334-74c2c1bb-adf9-49a4-9008-4e04a815b27b.png)

Apache APISIX 有一个活跃健康的社区，截止到目前（主仓库）已经有 200 多个贡献者，和 Apache APISIX 相关的项目贡献者有近 300 人。Apache APISIX 自从 2019 年 6 月份开源以来，截止目前一共收到了 2200 多个 PR；坚持每个月发布一个版本，至今已经发布了 27 个版本。

## Apache APISIX 服务网格方案

### 为什么要使用服务网格？

各公司技术团队引入服务网格有各自的原因，如：公司里技术栈比较分散，需要在不同技术栈内完成同样的服务治理；需要维护多个版本，不同版本由不同团队维护，沟通成本比较高，这可能会带来一些差异性，可能引发一些故障。

服务网格有一个非常重要的特性，就是服务治理。把限流限速、服务发现、服务注册、熔断等功能通过服务网格的方式下沉到基础组件，使业务研发人员不需要去关注服务治理，全神贯注实现业务层的开发，效率会提高，同时服务的稳定性也会提升。这是引入服务网格可能会带来的一些好处。

### API 网关的优势

API 网关是 API 管理这个范畴的一个工具，除了把服务所提供的 API 暴露出来，供其他服务调用以外，也有一些和服务网格重叠的特性，如：服务治理 —— 服务发现、限流限速、熔断。同时还会在 API 网关层做认证、授权。这是 API 网关的一些优势。

### 基于 Apache APISIX 的服务网格

无论是使用服务网格，还是使用 API 网关，有一个共性原因是服务治理。既然二者有一些共性，那么 API 网关是否能够在服务网格里使用呢？Apache APISIX 是否能够胜任服务网格 sidecar 的角色呢？

#### 设计方案前的调研

在 2021 年 1 月，我调研了全国十几家企业对服务网格的使用情况。这些企业中有一些正在做服务网格调研的，有些正在落地的，有些已经上生产环境了。调研结果总结归纳为以下三点：

1. 大家对于服务网格的使用和落地在国内处于早期阶段（仅业务落地，同时也有大量基于虚拟机的应用并存）。
2. 主要会使用到 HTTP 代理、灰度发布和蓝绿部署等功能 。
3. 关注服务的可观测性。 

对于服务网格，大家关注的大多是上述比较基础的功能。但是服务网格的功能是十分强大的，而大家只看到了其中一小部分核心功能。

Apache APISIX 已经支持：

- HTTP 代理、gRPC 的代理 
- TCP 、UDP 代理 
- 流量切分（灰度发布、蓝绿部署） 
- 负载均衡 
- 健康检查 
- 认证（mTLS、JWTToken） 
- 可观测性 

Apache APISIX 能与 Apache SkyWalking、Prometheus、ZipKin 等组件的结合，获取 metrics 和 tracing、 logging 的数据实现可观测性。

由此可以看出 Apache APISIX 的功能满足服务网格数据面的要求。

#### Apache APISIX 作为数据面带来的问题

- **问题一：如何及时获取配置变更？**

在服务网格场景下，数据面实例可能有很多，如何保证在实例数特别多时配置变更的下发延时较低？

- **问题二：控制面的选型**

一个完整的服务网格方案必须有数据面和控制面，Apache APISIX 可以作为数据面，控制面该怎么选呢？是选现有的服务网格产品，如：Istio / Kuma / OpenServiceMesh ，还是自研？

- **问题三：对 Apache APISIX 的改造成本** 

假设 Apache APISIX 需要做些修改才能在服务网格中使用，这些修改的范围有哪些？会不会太大？比如大到需要考虑 Lua 和 OpenResty 的生态。是否需要自研实现某些功能？自研过程中踩坑的成本有多大？

如何及时获取配置变更？

![Apache APISIX 的架构图](https://static.apiseven.com/202108/1631065632487-3e46ee68-c1fb-4546-a82f-0f81504ce560.png)

从 Apache APISIX 的架构图中可以看到，控制面是使用 etcd 作为配置中心的。

etcd 是一个强一致性的分布式 KV 存储，使用 Raft 协议做分布式共识。使用 Raft 协议，每一个读写请求都需要过一遍 Raft 的状态机，比如：一个有 5 节点的 etcd 集群，至少需要 3 个节点都确认某次请求，这次请求中的数据才会提交成功。

由于 Raft 算法特性使得组件的 QPS 不能太高，客户端连接数不能太多。在服务网格中，控制面如果使用 etcd 下发配置数据，可能就会把 etcd 集群冲垮，etcd 成为了解决问题的瓶颈。

etcd Proxy 支持设置连接很多个客户端（比如一千或者更多），直接引入 etcd Proxy 组件是否能解决问题呢？答案是不能，因为 Apache APISIX 与 etcd 的通信协议是 HTTP 协议，依靠 etcd 集成的 gRPC gateway 把 HTTP 转成了 gRPC，etcd Proxy 不支持协议转换。

在服务网格场景下，数据面实例可能有很多，为保证在实例数特别多时配置变更下发延时较低，只能通过对 etcd Proxy 组件二次开发来及解决延时问题，保证及时获取配置的变更。

**控制面的选型**

以下列出了现有的两类控制面：

一类是 Istio、Kuma、OpenServiceMesh，这三个控制面的共性是数据面都是 Envoy，通过 xDS 协议把配置从控制面加载到数据面。

另一类是 Linkerd，比较老牌的一个服务网格方案，数据面和控制面都是自研的。

除了采用现有的控制面，还有一个方案就是自研。如果自研控制面，需要考虑很多方面。如：如何设计 CRDs （CustomResourceDefinition），能让管理员和控制面交互？如何解决数据从控制面下发到数据面？自研控制面的成本也是非常大的。

**对 Apache APISIX 的改造成本**

对 Apache APISIX 的改造成本涉及到 Apache APISIX 技术栈的生态。

第一个要考虑的是 Lua 语言，因为 Lua 语音的使用者比较小众，虽然 Lua 很强大，但是对它生态和工具的支持都比较匮乏。

第二个需要考虑的是 OpenResty，Apache APISIX 底层是基于 OpenResty 的，而 OpenResty 是通过将 LuaJIT 嵌入到 Nginx 里面，来实现其强大的动态能力，而因为 Nginx 社区不活跃，Lua 语言比较小众，导致 OpenResty 社区非常小，近几年社区也越来越不活跃。如果基于 OpenResty 做扩展，如：支持 xDS 协议，缺少 gRPC 的 IDL 翻译工具，需要 Envoy xDS 整套配置的 Lua 翻译，因为 Envoy 没有提供 Lua 版本的。

#### 解决方案：apisix-mesh-agent

计算机科学有一句名言：计算机科学的任意一个问题都能通过引入一个额外的间接层来解决掉。

如果只在数据面中使用 Apache APISIX，上面三个问题很难解决，而且使用起来可能有很多的问题。所以结论是：开发一个间接层。间接层是起名为 apisix-mesh-agent，现已经开源，点击跳转[项目地址](https://github.com/api7/apisix-mesh-agent)。 

## apisix-mesh-agent 的功能与优势

apisix-mesh-agent 作为 Apache APISIX 和控制面的中间层，从控制面获取配置（变更），并模拟 etcd V3 API 使 Apache APISIX 获取到配置；并创建 iptables 规则劫持出入流量。

接下来详细介绍下 apisix-mesh-agent 的功能与优势。

### 对接控制面

apisix-mesh-agent 支持 xDS 协议，这使得 Apache APISIX 能对接实现 xDS 协议的控制面，如：Istio。从控制面获得的配置格式也是 xDS 协议格式的，apisix-mesh-agent 把配置转换成 Apache APISIX 可识别的格式。使用 Apache APISIX 格式的配置有点好处：节省内存资源。因为 xDS 协议的字段比较冗余，Apache APISIX 的配置字段非常简洁，保存配置到内存，占用的内存资源比较少。

### 实现 etcd V3 API

etcd V3 API 有两类的接口，一类是 etcd 实例之间进行 Raft 协议数据传递的 API，另一类是面向客户端的 API。apisix-mesh-agent 实现的是面向客户端的 API，目前只实现了 Apache APISIX 必用 API，如：Range 、Watch。实现这些接口后，只需要在 Apache APISIX 的配置里将 etcd 的地址配置到 apisix-mesh-agent 的监听地址，Apache APISIX 不需要任何改动就可以把数据从 apisix-mesh-agent 存到内存里。

通过这个间接层，数据就能够从服务网格控制面传递到 Apache APISIX。

### 架构设计

![基于 Apache APISIX 的服务网格架构图](https://static.apiseven.com/202108/1631065948150-c5dea6fe-469d-4246-b847-d4868407c64f.jpg)

架构是按照控制面和数据面来进行拆分的，架构图的上面是控制面，控制面可以选用 Istio、Kuma 等；架构图的下面是网格的数据面，每一个服务网格的数据面有三个 Pod， 每一个 Pod 的 instance 都有自己的 sidecar 容器，在这个容器里有两个进程，分别是 Apache APISIX 和对应的 apisix-mesh-agent。apisix-mesh-agent 和对应的控制面进行交互，及时获取数据，获取后转换成 Apache APISIX 能够解析的格式，Apache APISIX 和 apisix-mesh-agent 之间通过 etcd API 交互。如此一来 Apache APISIX 就能够及时获取配置的变更并生效。

### 优势

在服务网格里使用 Apache APISIX 有什么优势呢？

**第一，Apache APISIX 自身的优势。**

Apache APISIX 是一个高性能 API 网关，上面已经介绍过它的特性，此处不再赘述。值得一提的是 Apache APISIX 是使用 Radix Tree 实现路由匹配，路由匹配性能和路由的数量无关，无论有多少路由 Apache APISIX 都能够保证非常快速地匹配到路由，时间复杂度是常数级别的。

**第二，复用 Apache APISIX 全部插件。**

Apache APISIX 目前开源了 50 多个插件，使用 Apache APISIX 作为服务网格的数据面，可以复用这些插件。如果现有插件不能满足业务需求，也可以自行开发插件， 而且 Apache APISIX 支持多语言开发插件，如 Java 和 Go。

**第三，降低运维成本。**

如果南北向流量和东西向流量的技术栈无法统一，需要在东西向上使用 Envoy，在南北向上使用 Apache APISIX，运维团队需要同时维护 2 个组件，这对运维人员来说是一个挑战。

使用基于 Apache APISIX 的服务网格方案，能够统一南北向和东西向的技术栈，只需要管理 1 个组件，大大降低了运维成本。

## 基于 Apache APISIX 的服务网格，规划与发展方向

截止目前，apisix-mesh-agent 开源仅两个月时间，还有许多功能要完善，以下是对 Apache APISIX 服务网格未来的一些规划。

**第一，对 xDS 协议做更多支持**

目前，apisix-mesh-agent 只支持了 xDS 协议中的 LDS、RDS、CDS 和 EDS，而且只使用 LDS 绑定RDS 需要的路由配置名称，直接获取路由；使用 CDS 和 EDS 直接获取服务集群的定义和服务集群的实例。

未来我们计划：

- 支持 Apache APISIX 更多数据类型的转换 
- 支持请求改写，如：URI 改写 
- 支持请求认证，如 JWT Token、mTLS 
- 支持故障注入 

**第二，提升可观测性**

在调研阶段发现，实际使用场景中大家十分重视服务的可观测性，未来支持对接更多可观测方面的组件，如：Apache SkyWalking、其他日志收集的服务器。

**第三，自研控制面**

现在服务网格的控制面依托其他开源组件（如：Istio、Kuma），使得我们可以以较低的成本使用现有的功能，而如果未来遇到问题很难解决，也会考虑去落地实现一个专属 Apache APISIX 的服务网格控制面 ，使 Apache APISIX 的能力更好地发挥出来，服务网格在使用中也更加高效、简便。
