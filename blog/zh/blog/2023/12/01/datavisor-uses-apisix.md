---
title: "API 网关 APISIX 在 DataVisor 的应用与实践"
authors:
  - name: 赵晓彪
    title: Author
    url: https://github.com/xiaobiaozhao
    image_url: https://github.com/xiaobiaozhao.png
  - name: Jing Yan
    title: Technical Writer
    url: https://github.com/JYan00
    image_url: https://github.com/JYan00.png
keywords:
  - 开源社区
  - API 网关
  - Apache APISIX
  - DataVisor
description: DataVisor 产品专注于风险管理，其研发过程中不仅将 APISIX 充分运用于生产环境，而且也基于 APISIX 进行了多维度的二次开发，最终实现了卓越的生产效果。
tags: [Case Studies]
image: https://static.apiseven.com/uploads/2023/12/05/gM8zRGh1_Cover_Datavisor.png
---

> 作者：赵晓彪，DataVisor 高级架构师，Apache Kvrocks Committer，OpenResty 及 Apache APISIX Contributor。本文整理自 2023 年 11 月赵晓彪在 APISIX 上海 Meetup 的演讲。
<!--truncate-->

DataVisor 是一家专注于风控领域的公司，致力于防范反击战、反作弊等方面的工作。在 DataVisor 的产品开发中，我们不仅在生产环境中应用了 APISIX，还对 APISIX 进行了多个维度的二次开发，如插件方面的二次开发，并最终获得了良好的生产效果。下面将为大家简单分享 DataVisor 应用 APISIX 的经验。

## 在生产环境中应用 APISIX

DataVisor 在产品领域中采用了一种综合的网关和认证解决方案。在我们的产品体系中，不仅仅使用了 APISIX，同时还整合了 AWS API Gateway、ALB 和 Imperva 等其他产品，以及 Application Load Balancer (ALB)，并加入了一个 OAuth 认证机制。这些组件都有一些网关功能，它们共同协作，实现了我们系统中的流量接入功能。

![APISIX_Datavisor](https://static.apiseven.com/uploads/2023/12/01/98FBGSY0_1.png)

### 为何选择 APISIX

在选择适用于我们生产环境的解决方案时，我们对比了多个选项，最终选择了 APISIX。这是因为与其他工具相比，像 ALB 这样由云厂商提供的简单应用网关虽然易于使用，但其相对较高的成本使得我们不太倾向选择。

我们将 APISIX 应用于生产环境已经有大约一年多的时间。在这期间，APISIX 的稳定性和性能给我们留下了深刻的印象。

APISIX 的突出特点之一是其卓越的性能。相对于其他 API Gateway 工具，APISIX 不会出现比较高的延迟，也不容易出现 P99 或 P9999 毛刺。一般来说，APISIX 会帮我们刷新毛刺。在风控领域，我们对这些性能指标格外关注，因为我们的业务系统规定了风控计算仅有 50 毫秒的计算时间。在这极短的时间内，如果无法完成风控计算，将直接舍弃风控结果。风控要拦截用户的危险操作，但不能影响用户的正常操作。因此，我们对 P99 和 P9999 毛刺等格外重视。

### 如何使用 APISIX

目前，APISIX 在我们的生产环境中的应用越来越广泛。

由于 DataVisor 本身没有直接的业务，产品主要销售给各种各样的厂家，由他们调用我们的服务；因此，APISIX 实际上是被我们部署在公网的流量入口，这在实际应用中可能相对较为少见。通常情况下，APISIX 可能会被部署在内网或公网再下一层的网络上，而我们选择将其直接部署在公网，由 APISIX 帮助我们承接来自不同业务上的流量。

![APISIX_Datavisor_process](https://static.apiseven.com/uploads/2023/12/01/aN1bmljK_2.png)

为了更具体地说明我们在生产环境中对 APISIX 的应用，以下是一个典型的应用场景示例：

客户 A 首先通过红色线路访问我们的系统，以获取授权访问的 token，然后访问我们内部的授权服务器；或通过 APISIX 接入其他的授权服务器，例如海外常用的 Okta。我们主要使用Okta对流量进行鉴权，首先将所有流量转发到 Okta，再由 Okta 进行第一步鉴权。

接下来，客户拿到不同的 token 后，我们通过 APISIX 的路由选择，将这些经过授权服务器鉴权的流量录入到不同的 Kubernetes 集群中。目前，我们已经部署了一个双活 Kubernetes 集群，其中流量被路由到 A 集群或者 B 集群。通常情况下，我们会将流量录入到一个 Kubernetes 集群，另一个集群用于储备，只有在进行大范围升级或者集群升级时才会进行分流。

![APISIX_Datavisor_server](https://static.apiseven.com/uploads/2023/12/01/w2VYY9Ji_3.png)

在网关的使用方面，我们采用了相对简单和常规的部署模式。有一个有趣的观察是，我们可以将 APISIX 部署在我们的 Kubernetes 集群之外。这是因为 APISIX 具有非常高的性能，基本上不会消耗太多 CPU，在集群之外使用小型机型来部署 APISIX 已经能够承接大量的网络流量。

在我们的生产环境中，我们部署了三个 APISIX 节点，每个节点可能只配置了两核，然后使用 2G 或 4G 的小型机器来承接流量。如果大家对 APISIX 的性能有所担忧，我认为是可以放心的。它的性能应该能够媲美 NGINX 与 OpenResty，甚至比我之前的预期要好。

## 对 APISIX 的二次开发

### 扩展特权进程

在 NGINX 中并不存在特权进程这个概念，但在 OpenResty 中有所体现，它与 worker 进程处于同一级别。这个进程相对来说较为特殊，因为它并不具备接入网络流量的能力，即不监听任何端口，但却可以执行一系列的计算和采集任务。因此，我们对这个特权进程进行了一定的扩展。

![APISIX_Datavisor_backend](https://static.apiseven.com/uploads/2023/12/01/VNkXA43W_4.png)

上面的示意图相对较为简明，呈现了 APISIX 与我们后端服务之间的关系。我们主要用 APISIX 来接收和分发流量。

在网关层，APISIX 在流量进入之前进行预处理，而我们独特的地方在于在 APISIX 这一层引入了一个小进程。这个进程类似于 Sidecar，它在与 APISIX 进程同时运行的同时，负责执行自身的任务。随后，它将采集到的数据发送给 APISIX，再由 APISIX 传递回到自身的上层，去做一些业务逻辑。这种用法相对较为罕见，通常业务场景较少涉及，但在风控领域可能会遇到这种情况。

接下来，我将简要说明我们特权进程的实现方式。我们的模型通常采用 master-worker 结构，其中 worker 进程负责处理业务流量，而 master 进程则会 fork 出一个特殊的特权进程。在我们的开发中，特权进程只能有一个。因此，我们采取了一种特殊的策略，即在特权进程中 fork 了另一个进程，由这个进程执行其他任务，以避免干扰特权进程繁忙的工作。

在数据采集方面，特权进程和 worker 进程通过 shared-dict 进行通信。shared-dict 的性能是非常高的，对于大多数场景都能够满足需求。

![APISIX_Datavisor_worker](https://static.apiseven.com/uploads/2023/12/01/AXvYYBiG_5.png)

### 扩展 ssl-certificate-phase

![APISIX_Datavisor_clienthello](https://static.apiseven.com/uploads/2023/12/01/CPnBHmIW_6.png)

这一扩展涉及到 APISIX 基于 NGINX + Lua 框架的引入。起初，APISIX 并不支持在 TLS 中的握手阶段进行大量的脚本注入。随后，当 OpenResty 社区支持了在 ssl-client-hello 阶段注入代码的功能时，我们注意到 APISIX 社区尚未跟进。因此，我们只能采取手动修改 APISIX 的方式。

我们参考了之前的代码结构，在 APISIX 的流程中插入了我们自己的代码，使其在 client-hello 阶段运行我们的一些代码。在 client-hello 阶段，可以实现的功能很多，但在 Lua 层面相对较为有限。在许多情况下，我们需要借助 NGINX 进行 module 开发，或者为 NGINX 创建一个小的动态库来完成这些任务。

动态库实际上是一个非常出色的功能，目前 OpenResty 和 Lua 在加载动态库这方面表现得非常出色。有一个名为 ffi 的功能，可以轻松加载动态库。只需在动态库中编辑好所需的外部接口，然后通过几个简单的 ffi 命令即可将动态库中的函数导出到 Lua 来使用，它将提供出乎意料的性能提升。

根据我的经验，使用 ffi + Lua 这种模式编写出来的代码性能大致相当于纯 C 语言编写的 70%。换句话说，假如纯 C 语言一秒可以执行 100 次，它每秒就能执行 70 次，基本可以认为是性能第一。而且，随着运行时间的增加，呈现出来的效果会越来越好。

### 插件开发

在完成上述功能之后，我们发现在实际使用中仍存在一些困扰。由于我们对 APISIX 进行了二次开发，打包出来的产品中，许多功能仍然硬编码在整个项目中，难以进行动态调整。因此，我们决定打包一些插件，将它们整合到 APISIX 项目中，然后用 Dashboard 再进行修改。

![APISIX_Datavisor_plugin](https://static.apiseven.com/uploads/2023/12/01/6qx3Rqi1_7.png)

使用 APISIX 进行插件开发非常便利，可以轻松地开发高性能插件。目前，APISIX 不仅支持 Lua 插件开发，还支持多种编程语言，包括 Java、Go，还有 Python，帮助用户实现各种各样的功能。

## APISIX 带来的生产效果

部署 APISIX 后，我们取得了优异的生产效果。相较于其他两个厂商提供的类似 API 网关的产品，我们的解决方案在性能、延迟和吞吐量方面都实现了显著的提升。

![APISIX_Datavisor_effect](https://static.apiseven.com/uploads/2023/12/01/vMYMM2cA_8.png)

## 对 APISIX 的展望

APISIX 是一个极富活力的社区，会持续进行每月的版本迭代。在这一领域，我对 APISIX 的未来发展有两点功能改进的展望。

### APISIX 通过 Dashboard 动态新增与更新

当前情况下，一旦插件开发完成，我们就无法实现热更新。插件无法直接通过 post 方式传递到 APISIX server，依然需要重新打包 APISIX server 并重新启动，尤其在 Dashboard 方面。因此，我们期望 APISIX 能够实现热更新的功能，使得插件的动态新增与更新能够更为便捷地通过 Dashboard 实现。

### 支持使用 run_worker_thread 做 CPU 敏感型的计算

NGINX 中引入了一项名为线程的特殊机制。这些线程的主要任务是处理一些与网络无关的任务，例如高 CPU 利用率的活动（数据的加解密和压缩）。虽然它与网络 I/O 无关，但高 CPU 使用率可能导致该进程中其他网络请求受到一定的阻塞。

因此，我希望 APISIX 能引入类似的功能。如果能使用 APISIX 处理一些复杂功能计算，比如数据的加解密和转存等，将是一项有益的改进。
