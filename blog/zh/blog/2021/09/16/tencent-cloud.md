---
title: "APISIX 在腾讯云智能钛平台的落地实践"
author: "刁寿钧"
keywords:
- Apache APISIX
- API 网关
- 腾讯云
- Kong
- Nginx
description: 本文主要介绍了腾讯云智能钛平台使用云原生 API 网关 Apache APISIX 的企业案例，以及使用 Apache APISIX 作为产品流量网关的具体示例。
tags: [Case Studies]
image: https://static.apiseven.com/2022/blog/0817/%E8%85%BE%E8%AE%AF%E4%BA%91.png
---

> 本文主要介绍了腾讯云智能钛平台使用 Apache APISIX 的企业案例，以及使用 Apache APISIX 作为产品流量网关的具体例子。

<!--truncate-->

## 背景介绍

腾讯云智能钛机器学习平台（TI-ONE）是为 AI 工程师打造的一站式机器学习服务平台，为用户提供从数据预处理、模型构建、模型训练到模型评估的全流程开发支持。智能钛机器学习平台内置丰富的算法组件，支持多种算法框架，满足多种 AI 应用场景的需求。

![腾讯云智能钛机器学习平台架构图](https://static.apiseven.com/202108/1631781110822-39c59a83-aa18-4934-a2ef-43cd58866878.jpg)

## 产品需求

我们将需求分为两大类：技术需求，即研发团队对于 API 网关的需求；业务需求，即智能钛机器学习平台使用者对于 API 网关的需求。

技术层面主要需求为具备跨横切面功能。具体来说，是将鉴权、限流、日志、监控等跨横切面的功能内聚到 API 网关，对后端服务进行解耦，使研发聚焦功能开发，并且降低维护成本。

考虑到后续业务对接腾讯云的需求，API 网关必须支持腾讯定制的鉴权和登录机制以及遵守腾讯云 API 3.0 的格式。

![腾讯云网关技术需求](https://static.apiseven.com//2021/0916/20210916-200723.jpg)

业务层面则主要考虑使用者感受。平台进行开发时，AI 和算法同事需要交互式编程环境，那么就需要 API 网关支持 Notebook。完成部署后，API 网关需要具有流量分配功能和足够高的性能，满足多用户直接调用接口的场景。还需支持请求级别的监控，包括日志（Logging）监控和指标（Metrics）监控。

综合以上需求，我们进行了相关网关产品的调研。

![腾讯云网关选型考量](https://static.apiseven.com/202108/1631781748143-8e30a89c-99b8-45ed-b6e6-1dddaa838342.jpg)

## 调研对比

进入我们考察名单的有：Envoy、Kong 以及 Apache APISIX。我们从多维度对上述三个产品进行了对比，结果如下。

![竞品分析与对比](https://static.apiseven.com/202108/1631781764958-a2cadf83-80b4-4b50-ba42-76b21d0d211a.jpg)

因为 Envoy 的技术栈是 C++，需要定位问题时，很可能要去看 C++ 的源代码。这种定位问题可能会对我们造成一定的影响，所以 Envoy 这个方案否决得比较早。

Kong 和 Apache APISIX 所使用的技术栈相同，都是 OpenResty。但是在存储依赖这一栏，Kong 依赖的是关系型数据库 PostgreSQL。在软件行业，数据库的高可用配置是非常复杂的。不仅需要配备专门的 DBA，而且实施难度也非常大。关系型数据库太重了，我们并不需要使用关系型数据库来保证 ACID 和 MVCC。

### 为什么选择了 Apache APISIX

Apache APISIX 在存储依赖和路由规则这两方面做的非常好，很适合我们的业务场景。我们的业务比较看重路由灵活度和路由匹配算法。目前已接入 50 多个上游和数百条路由规则，所以我们希望路由匹配的性能越高越好。Apache APISIX 路由匹配算法复杂度明显优于 Kong，且配置生效时间小于 1ms，单核 QPS 远高于 Kong。综合以上技术和操作层面，我们最终选择了 Apache APISIX。

## 基于 Apache APISIX 的架构调整

接入 Apache APISIX 后，我们完成了智能钛机器学习平台网关方面的功能，解决了之前关于技术和业务层面的需求。

从这张图可以看到， Apache APISIX 支持 http+pb、http+json、gRPC、WebSocket 等流量。这些流量经过了 Apache APISIX 之后，会走向智能钛机器学习平台定制开发的一些组件。

![网关架构](https://static.apiseven.com/202108/1631781850656-4235a4e8-2792-48ae-9c98-b4d75628a476.jpg)

智能钛机器学习平台的业务部署在腾讯云 TKE 平台上。为了提高它的可用性，网关、 etcd 等都是集群化的部署。智能钛机器学习平台没有使用 Apache APISIX 的 dashboard，而是直接通过 Admin API 进行交互，直接写到 etcd 里面。

![增加插件处理](https://static.apiseven.com/202108/1631781876752-faf1b7d0-abbb-4313-879c-e00d2b28334a.jpg)

## 实例分享

在实战过程中，我们总结了一些使用 Nginx 的坑，也发现了一些 APISIX 的优点，在此简单分享一下。

### 反直觉的 Nginx 配置

以前使用 Nginx 的时候，感觉 Nginx 是一个配置驱动的产品。可能会造成管理困难、维护成本高等困扰。Nginx 在配置管理的时候，常常会有一些反直觉的事情。在这次实战过程中，我的同事就遇到这么一个反直觉的坑：

![Nginx 配置错误](https://static.apiseven.com/202108/1631781909354-0fada4fa-1154-4974-ae3d-292ab46e5889.jpg)

对于接触 Nginx 比较少的人来说，这两行命令加在 `if` 前面，且 `if` 里面并没有其他命令覆盖这两行命令，那么它们是必然会被执行的。熟悉 Nginx 的人都知道，`if` 里面的命令会覆盖掉外面的命令，但这非常反直觉。

### 测试用例即文档

在实践使用 Apache APISIX 实践的过程中，Apache APISIX 项目的测试用例写的非常详细。即使没有深入了解过如何在 Apache APISIX 中调用某些函数，也往往能在测试用例中找到答案。后来再遇到一些 OpenResty 的问题的时候，我就会到这些测试用例里面找一找有没有相关的代码，每次都能解决问题。

![详细的测试用例](https://static.apiseven.com/202108/1631781920390-a504ce7c-1ccd-4fb8-99a2-09d74be6bb7e.jpg)

## 思考与展望

在技术选型的初期，除了 Envoy、Kong 和 Apache APISIX 外，也有同事提到了 Service Mesh。有了 Service Mesh，为什么我们还要选择 Apache APISIX，这难道不是在技术上倒退吗？关于这个问题，我的观点是这样的：

1. API 网关在系统边界，负责处理南北向流量；Service Mesh 在集群内部，负责处理东西向流量。两者的功能不同，无法直接比较。
2. 实践证明 Service Mesh 存在一些性能损耗。但是也有一种声音说，上云了，这点损耗可能并不是业务的性能瓶颈，所以这点是见仁见智的。
3. 得益于 OpenResty 和 Lua 简单易上手的特性，Apache APISIX 的定制研发效率更高。 即使开发团队先前没有使用 OpenResty 或者 Lua 的开发经验，仍然能在很短的时间内完成了业务的定制开发需求。
4. Apache APISIX 的交付成本要低于 Service Mesh。因为 Istio 社区非常活跃，版本迭代速度非常快，导致 Istio 的各个版本和 Kubernetes 的各个版本之间有不兼容的问题。在客户的生产环境中， 一些 Kubernetes 集群可能有版本差异，而这些 Kubernetes 集群无法共用一个版本的 Istio，这在实际交付的过程中是会造成一些困扰。

## 个人期望

感谢 Apache APISIX 创造了一款性能极致而且易于上手的开源 API 网关产品。在智能钛机器学习平台网的开发过程中，希望后续可以在实践中总结出更多的使用心得，反馈给 Apache APISIX 社区。
