---
title: "微服务中的服务发现是什么"
author: "罗泽轩"
authorURL: "https://github.com/spacewander"
authorImageURL: "https://github.com/spacewander.png"
keywords: 
- 微服务
- 服务发现
- 开源
- APISIX
- Nacos
description: 本文通过服务发现的相关背景和 APISIX 对于服务发现的应用与实践，来介绍微服务中的服务发现内容。
tags: [Ecosystem]
---

> 本文通过服务发现的相关背景和 APISIX 对于服务发现的应用与实践，来介绍微服务中的服务发现内容。

<!--truncate-->

## 服务发现是什么？为什么需要？

在互联网刚开始出现的年代，人们要想访问某个在线服务，需要输入一长串的 IP 地址。IP 地址虽然不长，但是作为一串无意义的数字，要求记住特定服务的特定地址还是很考验人的记忆力。所以后来人们就发明了域名系统。每个在线服务会到域名商注册一个域名，然后通过 DNS 建立域名和具体 IP 的联系。这样一来，人们只需要输入一个好记的域名，就能访问到具体 IP 上的在线服务。这就是最早的服务发现。

当一个公司内部的服务数到了一定的规模（比如在做了微服务拆分之后），也会遇到 IP 实在不好记的问题。这时候就需要有一套服务发现系统。公司里面各个服务在该系统上注册，然后想要访问这些服务的其他服务会从该系统上查询对应的 IP 地址，这样就不需要让某个服务“记住”复杂多变的 IP 地址了。

如下图，IP 地址的变更，会让访问者无所适从。

![IP 变更](https://static.apiseven.com/2022/11/14/637210cb18c04.png)

通过引入域名系统作为服务发现机制，现在可以灵活对待 IP 的变更了。

![引入服务发现](https://static.apiseven.com/2022/11/09/636b130c875ca.png)

## 常见服务发现系统介绍

鉴于本人的能力有限，本文内容仅介绍了与 APISIX 相关的，还请各位多多见谅。

作为一个服务发现系统，它需要满足至少四个功能：

1. 提供注册的 API。
2. 提供查询的 API。
3. 高可用，毕竟服务发现系统是整个系统的神经，不能麻痹甚至瘫痪。
4. 生态完整。众所周知，程序员是一群很懒惰的人，最好有一个库，引入进来就能跟 API 完成对接。

下面让我们来看看市面上主流的几个开源服务发现系统。

### Consul

[Consul](https://github.com/hashicorp/consul) 是由著名的开源项目孵化公司 Hashicorp 开发的服务发现系统。作为一个在 2014 年 4 月 17 日就发布了第一版的老牌软件，Consul 有着最为丰富的生态，甚至有第三方开发者为它开发了 Haskell 的 SDK。大部分 Consul 的 SDK 只是对其 HTTP API 的封装，所以其实开发量并不大。

Consul 支持通过 HTTP API 来完成服务的注册和查询。它支持在查询时通过 HTTP long polling 来实现及时的数据推送，避免轮询。此外 Consul 也支持通过 DNS 的方式查询对应服务的实例。

Consul 的部署方式比较有趣。Consul 的每个实例叫做 agent，它既可以是客户端，也可以是服务端。在客户端，Consul 会维持一个客户端的状态；对于服务端， Consul 通过一致性算法 Raft，支持分布式部署，以此来实现高可用。

### Eureka

[Eureka](https://github.com/Netflix/eureka) 是由 Netflix 开源出来的项目。它也是相当的古老，有迹可循的[提交](https://github.com/Netflix/eureka/commit/53939453474e39a8a68236f940c72de043ea20bd)可以追溯到 2012 年。不过这个项目已经有 1 年不维护了。许多用户迁移到下文会提到的 Nacos 上面。

Eureka 支持通过 HTTP API 和 Java SDK 来交互。许多 Eureka 的用户，其实是通过 Spring Cloud 等 Java 生态圈里的项目带进来的。Eureka 高可用的设计，如果要用 CAP 的术语来描述，属于 AP，即允许网络分裂时客户端看到过期的数据，避免因为网络问题出现次生灾害。

### Nacos

[Nacos](https://github.com/alibaba/nacos) 是由阿里巴巴开发的服务发现系统。其名称来自于 Naming and Configuration Service 前几个字母的汇总。自 2018 年 7 月 20 日发布了 0.1.0 版本以来，Nacos 目前已经发展到了 2.1 版本。

就像阿里巴巴的许多开源项目一样，Nacos 在中国的 Java 开发者中相当流行，其知名度甚至比 Eureka 还要大不少。

它支持通过 HTTP API 和 Java/Go/Python/NodeJS/C# 等 SDK 来完成服务的注册和查询。目前，Nacos 开发者也在开发基于 gRPC 的新 API。对于 HTTP API，目前 Nacos 只支持通过轮询的方式来获取服务列表。所以 Nacos 官方更加推荐采取 SDK 的方式。其 SDK 的实现，是轮询+基于 UDP 的推送两种方式，因此会有更好的实时性。另外 Nacos 也在开发基于 gRPC 的新 API，该 API 将会引入服务端推送的能力，对于那些不能接入 SDK 的系统将是一大利好。

Nacos 的高可用，一方面是客户端 SDK 中提供了持久化的能力，另外服务端通过 Raft 和 Distro 两套协议实现了一致性。

## 常见对接方式及各自优缺点

抛开私有协议不谈，服务发现的对接方式可以分成三类：

1. HTTP 轮询
2. DNS
3. HTTP long poll 或 gRPC server stream

HTTP 轮询胜在实现简单，不过并不具有实时性。

DNS 的性能开销是最小的。由于 DNS cache 的存在，DNS 也并不具有实时性。DNS 对比于其他方式，有个好处在于它是一套广为接受、实现无关的标准。但是凡事总有两面性，这意味着服务发现系统无法给 DNS 响应增加一些额外的字段，除非活用 DNS 响应里的 Additional 字段，但是这么一来就需要客户端特别的处理。

HTTP long poll 或 gRPC server stream 是三者中最有实时性的，另外由于他们都是基于 HTTP 的，所以可以方便地自定义响应。而缺点就是客户端实现起来相对有难度。

## APISIX 如何对接服务发现系统

作为一个云原生的网关，APISIX 支持从服务发现系统中获取上游节点，而且是同时支持在数据面和控制面上对接服务发现系统。

### 数据面

APISIX 在数据面上支持跟 DNS、Eureka、Consul（KV 模式）、Nacos、K8s 对接。

在对接 DNS 服务发现，APISIX 会通过 DNS 的 SRV 或 A/AAAA 记录获取某个服务具体的上游节点。当请求访问上游时，会先尝试从 DNS cache 中获取，如果没有，则发起 DNS 查询，得到对应记录里面的具体 IP 地址。

至于其他的服务发现类型，则是在后台同步的。当请求访问上游时，从当前同步到的数据里获取服务名对应的那一部分数据。对于 K8s 和 Consul KV，由于他们支持 HTTP long polling，所以我们可以通过该方式实时获取变更的 IP 地址。而对于 Eureka 和 Nacos，目前我们只是通过轮询的方式来获取数据。

### 控制面

APISIX 同时还支持在控制面上做服务发现。我们正在开发 [apisix-seed](https://github.com/api7/apisix-seed/)，该项目会从服务发现系统中同步数据到 etcd 中，这样数据面就能从 etcd 中同步最新的上游节点了。

目前我们已经在控制面上实现了对 Nacos 和 Zookeeper 的支持。由于在控制面上的服务发现支持，是通过官方提供的 SDK 实现的，所以可以拥有普通的 HTTP 对接所没有的优势。比如在 apisix-seed 的 Nacos 实现中，我们支持基于 UDP 的推送，所以数据的时效性要比 HTTP 轮询较好。

## APISIX 支持服务发现有哪些场景优势

通过在网关上直接集成服务发现，可以大大简化服务上线的工作量。配置 APISIX 来对接你的服务发现系统，然后剩下的事就让 APISIX 替你操心好了。

举个例子，假设你的公司正在使用 Nacos 来作为服务发现系统，那么你只需要配置 APISIX，启用 Nacos 服务发现功能，后面只要把服务名配置到 APISIX 的上游，APISIX 就会自动获取该上游对应的具体 IP 节点。

这一优势在需要在网关迁移时，比如从 Spring Cloud Gateway 迁移到 APISIX 上来，可以明显减少所需的工作量。如果过去用的 Spring Cloud Gateway 使用了 Eureka 抑或 Nacos 来做服务发现，那么迁移到新系统时，仅需在 APISIX 里面启用对 Eureka 或 Nacos 的支持，即可完成过渡工作。

下图是「还呗」在这方面的技术实践，替换 Spring Cloud Gateway 是为了进一步提升稳定性、强监管以及准确性和有效性：

![还呗架构调整](https://static.apiseven.com/2022/11/09/636b130d299e4.png)

> 引用「还呗」原文：
> 作为企业来说，成本优先依旧是需要考虑的原则。野蛮生长阶段可能只需要尽快实现业务，而在目前大环境下，预算范围之内肯定是成本优先。这样的话，效率和成本永远只能保住一项。因此在成本有限的情况下，企业就会少谈技术的先进性。技术人员在选型的过程中，就不会考虑当下选择的这个技术对团队有多大冲击、对现有的运维和架构带来多少收益等等，更多是从成本角度考虑。

此外，APISIX 支持同时配置多个服务发现。许多公司由于历史原因，可能会存在多套服务发现系统。比如就我知道的情况，有的公司会同时有旧的 Eureka 服务发现和新的 Nacos 服务发现。APISIX 只需要同时启用 Eureka 和 Nacos，就可以应对这种情况。

如果你现在是直接在 APISIX 上配置上游节点，也可以考虑另外部署服务发现系统，并改由服务发现系统来存储具体的节点配置。将上游节点的配置，由 APISIX 移动到专门的服务发现系统，好处在于客户端可以自己来完成服务的注册，而且专门的服务发现系统往往会提供额外的功能，如更丰富的健康检查等。

未来，我们也会在 APISIX Ingress Controller 上支持集成各种服务注册发现组件，便于用户使用。到那时，用户将不仅仅能在 APISIX Ingress Controller 上指定 K8s service 的 endpoints 作为上游节点，还能够把服务发现得到的节点整合进来。
