---
title: "百万级 QPS 业务新宠，金山办公携手 Apache APISIX 打造网关实践新体验"
slug: 2021/09/28/wps-usercase
author: 张强
keywords: 
- Apache APISIX
- API 网关
- 金山办公
- WPS
description: 本文介绍了金山办公如何使用云原生 API 网关 Apache APISIX 应对百万级 QPS 业务，同时基于 Apache APISIX 更新与改进网关实践层面的内容。
tags: [Case Studies]
image: https://static.apiseven.com/2022/blog/0817/wps.png
---

> 本文由金山办公中台部门 SRE 网络负责人张强介绍了金山办公如何使用 Apache APISIX 应对百万级 QPS 业务，同时基于 Apache APISIX 更新与改进网关实践层面的内容。

<!--truncate-->

## 背景介绍

金山办公是目前国内最大的办公软件厂商，旗下产品涉及 WPS、金山文档、稻壳等。在业务层面上由数千个业务以容器化部署在内部云原生平台，目前 [Apache APISIX](https://apisix.apache.org/) 在金山办公主要负责为中台部门业务（百万级 QPS ）提供相关网关服务。

## 金山办公的网关演进

在 1.0 阶段时，我们对于 API Gateway 的特性没有什么强需求，只是想解决运维问题，所以基于 OpenResty 与 Lua 进行了自研，实现了动态 Upstream、黑名单、waf 等功能。
虽然自研成功，但在功能上却遗留了一些问题，比如：

- 动态化只做到到 Upstream 维度
- 需要 Reload 才能带出新域名
- 底层设计简单，功能扩展能力不强

后续我们对 API Gateway 功能有了强需求后，开始去调研相关的开源网关产品。

## 为什么选择了 Apache APISIX

实际上 2019 年年底开始调研网关产品时，Kong 算是一个比较流行的选择。

但后续经过测试发现，Kong 的性能不太能满足我们的需求，同时我们认为 Kong 的架构不是很优秀：因为其配置中心选用 PostgreSQL，所以 Kong 只能利用非事件驱动去更新路由，依赖每个节点去刷新路由。

进一步调研时，我们发现了 [Apache APISIX](https://github.com/apache/apisix)。首先 Apache APISIX 的性能比 Kong 强，在 Apache APISIX 的 GitHub Readme 中有个非常详细的对比图，列出了两者的[性能测试差距](https://gist.github.com/membphis/137db97a4bf64d3653aa42f3e016bd01)，这与我们自己测试下来的数据基本一致。

![Apache APISIX 与 Kong 性能对比图](https://static.apiseven.com/202108/1632796929580-a6d7847c-bba6-4417-a7f0-9c127313264e.png)

在架构方面，Apache APISIX 的 etcd 配置对我们而言是一项更优的选择。

![Apache APISIX 架构](https://static.apiseven.com/202108/1632796952262-b814e37d-cbc5-43f5-b504-ab1751a9aa83.png)

当然，最主要的原因是我们觉得社区也很重要。社区如果活跃，在版本更新迭代、问题解决和功能优化上的速度就会很快。从 GitHub 和平时的邮件反馈中我们看到了 Apache APISIX 社区的活跃，为产品功能和稳定性提供了强有力的保证。

## 网关平滑迁移经验分享

大部分朋友在开始接触 Apache APISIX 时，都会用 CLI 去生成配置并起实例。但在我们做平滑迁移的过程中，并没有使用 CLI 去生成配置。

主要原因是 Apache APISIX 在 OpenResty 中会生效一些 Phase，比如初始化 init、init_worker、HTTP 和 Upstream 相关 Phase 等。对应到 Apache APISIX 的配置后我们发现，这些都可以脱离 CLI 而存在。

所以基于上述原因，我们最终采取了如下行动进行平滑迁移：

- 不使用 Apache APISIX 的 CLI 生成配置
- 引入 Apache APISIX 的 Package Path 并将 Apache APISIX 作为 Default Server
- 保留其它静态配置中的域名，由于新域名未在静态配置中，将 Fallback 到 Apache APISIX
- 最终将静态配置逐渐迁移到 Apache APISIX 中

当然，除了上述方法，我们也给大家推荐一种「轻混模式」，即使用静态配置配合 Apache APISIX 作为 Location，引入前边提到的一些 Phase 或 Lua 代码进行配置即可。这样做可以在静态配置中引入一些特殊配置，实现动态化等效果。

## 基于 Apache APISIX 的 Shared State 改进

首先在我个人看来，「转发效率一定不是问题，而 Shared State 是影响稳定性的最大因素」，为什么这么说？

因为转发效率可以通过横向扩容去解决，但 Shared State 是所有的节点共享的，所以是至关重要的模块。

所以在使用 Apache APISIX 后，我们主要针对 Shared State 层面进行了一些调整与优化。

### 优化一：多台机器监听下的 etcd 架构优化

一般公司网关架构中，都会涉及多台机器，有的可能多至几百台，同时每台机器还要顾及 worker 数量。所以当多台机器监控相同 Key 时，etcd 的压力就会比较大，因为 etcd 的其中一个机制是为了保证数据一致性，需要所有事件返回给监听请求后才能处理新请求，当发送缓冲满了后就会丢弃请求。所以当多台机器同时监听时就会导致 etcd 超时运行，提示 Overload 报错等状况。

针对上述问题，我们使用了自研的 etcd Proxy。之前 Apache APISIX 与 etcd 的连接关系如下图左侧所示，每个节点均与 etcd 连接。所以作为一个大规模入口时，连接数量会特别大，对 etcd 造成压力。

![etcd Proxy](https://static.apiseven.com/202108/1632796985052-c2453a37-edc1-4102-bbb7-8e03627765d5.png)

既然是监听相同的 Key，我们做了一个代理来进行统一监听，当有结果反馈时，再返回给 Apache APISIX。具体架构如上图右侧所示，在 Apache APISIX 和 etcd 中间放置了 etcd Proxy 组件来监控 Key 值的变化。

### 优化二：解决路由生效过程中的性能问题

随着公司规模提升，路由数量的增长也会随之而来。我们在实践过程中发现在每次路由更新时，Apache APISIX 都会重建用来匹配路由的前缀树。这个主要是由于 `table.sort` 性能不足所导致的。

在实践过程中，我们观察到路由频繁更新时，网关 CPU 升高、丢包率升高，进一步排查后发现丢包率升高的主要原因为 Listen overflow 所造成。

![CPU 火焰图](https://static.apiseven.com/202108/1632797671795-141a410b-0dd5-4873-b3dc-56f892aa2f07.png)

在 CPU 升高现象上，通过火焰图可以明显看到大部分 CPU 的时间都是划在 `auxsort` 上，它是由 FUNCC 触发。而 FUNCC 的触发也指明了一个问题，就是证明相关数据没有经过 LuaJIT，只有图中最右侧的一小部分处理了正常请求。

出现这种现象的原因主要是 LuaJIT 的 `table.sort` 不是完全依靠 JIT 模式，这点可以在 [LuaJIT 官网 wiki](http://wiki.luajit.org/NYI) 中看到相关说明，所以在 Lua 代码环境中使用 `table.sort` 效率是比较低的。

![LuaJIT Wiki](https://static.apiseven.com/202108/1632797702785-9afdc28d-6c7a-4643-8cac-72b41fee8e2b.png)

针对这个问题，我们自己使用纯 Lua 代码实现了针对上述场景的 sort 配置进行了解决，但其实 Apache APISIX 在之后的版本更新中已经修复了这项问题，具体思路也跟我们理解的类似。

### 更多 Shared State 使用经验

1. 在修改 Apache APISIX 或者自己进行插件开发时，确保做好 Schema 校验，包含判空，尤其是在匹配部分。因为在匹配部分出问题的话，会造成整体性的影响。
2. 做好业务拆分规划。根据业务量去规划好相关 etcd Prefix 和 IP 数量，部署更稳固的集群，把系统性风险降到最低

## 开源话题讨论

### 稳定性与功能层面的取舍

目前金山办公使用 Apache APISIX 已经快两年了，作为产品用户，我认为 Apache APISIX 确实是一款稳定可信的开源产品，在绝大多数情况下，都会及时地与社区最新版本保持一致。

但是一般接触并应用过开源产品的公司应该都有体会，升级版本会有一些新功能的出现，但同时也会带来一些稳定性上的问题，所以在升级版本和稳定性中我们应该如何取舍。

这个问题肯定没有统一的答案，但是我个人觉得针对 Apache APISIX 这项产品，尽量与官网版本保持一致。

就金山办公而言，我们目前因为大规模使用到 Apache APISIX，所以对稳定性有极致追求。之前跟不上官方更新进度时也对我们的使用造成了一定程度的影响，所以推荐大家尽量与官方版本保持一致。

如果说你像我们一样，有时候可能跟不上官方版本，至少也应该做到每周查阅 [GitHub](https://github.com/apache/apisix) 的 Master Change Log 等相关文档，时刻关注产品变化。

### 基于 Apache APISIX 产品化经验

我们基于 Apache APISIX 包装了很多产品化功能，比如多机房应用比例切量、一键封禁路由等。在实践应用过程中，我们认识到 Apache APISIX 是一个极其灵活强大的产品，所以在进行产品化改造时我们就应该明白一个点：强大 = 避免不了的复杂和危险。

这点在 Apache APISIX 本身的代码设计上也有很多的体现，比如一些插件的改造可能就需要自己去编译，因为毕竟各自应用起来时场景没有办法做到统一。

最后，基于我们前边提到的实践经验，也建议大家在进行 Apache APISIX 项目产品化时，提前规划好网关共享的颗粒度，减少后续使用问题。
