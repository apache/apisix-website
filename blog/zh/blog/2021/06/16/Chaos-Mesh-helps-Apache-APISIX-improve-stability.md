---
title: "Chaos Mesh 助力 Apache APISIX 提升稳定性"
slug: 2021/06/16/chaos-mesh-helps-apache-apisix-improve-stability
author: "吴舒旸"
authorURL: "https://github.com/Yiyiyimu"
authorImageURL: "https://avatars.githubusercontent.com/u/34589752?v=4"
keywords:
- APISIX
- Apache APISIX
- API 网关
- Chaos Mesh
- 稳定性
description: 本文介绍了如何使用 Chaos Mesh 测试 API 网关 Apache APISIX 的相关流程及场景，用来提升 APISIX 的稳定性。并且介绍了未来 APISIX 的测试计划。
tags: [Ecosystem]
---

> 本文描述了如何在多种场景下使用 Chaos Mesh，为 Apache APISIX 提升稳定性。

<!--truncate-->

Apache APISIX 是 Apache 基金会下的顶级项目，目前在生产环境中已经通过每日几百亿次请求量的考验。随着社区的发展，Apache APISIX 的功能越来越多，需要与外部组件产生的交互也越来越多，随之而来的不确定性呈指数级增长。在社区中，我们也收到了用户反馈的一些问题，这里举两个例子。

### 场景一

在 Apache APISIX 的配置中心， etcd 与 Apache APISIX 之间出现意外的高网络延迟时，Apache APISIX 能否仍然正常运行进行流量过滤转发？

### 场景二

用户在 issue 反馈，当 etcd 集群中的一个节点失效而集群仍然可以正常运行时，会出现与 Apache APISIX admin API 交互报错的情况。

尽管 Apache APISIX 在 CI 中通过单元 / e2e / fuzz 测试覆盖了大部分情景，然而尚未覆盖到与外部组件的交互。当发生网络波动、硬盘故障、或是进程被杀掉等难以预料的异常行为时，Apache APISIX 能否给出合适的错误信息、是否可以保持或自行恢复到正常的运行状态呢？为了测试覆盖到用户提出的场景，以及在投入生产环境前主动发现类似的问题，经过社区讨论决定使用 PingCAP 开源的混沌工程平台 Chaos Mesh 进行测试。

混沌工程是一种在系统基础设施上进行试验，主动找出系统中的脆弱环节的方法，从而确保系统具有抵御生产环境中失控环境的能力。混沌工程最早由 Netflix 提出，用以模拟从而抵御早期云服务的不稳定性。随着技术的演进，现在的混沌工程平台提供了更多种类的故障可供注入，依靠 Kubernetes 也可以更方便地控制故障半径。这些都是 Apache APISIX 选择 Chaos Mesh 的重要原因，但作为开源社区，Apache APISIX 深知只有活跃的社区才能确保软件稳定使用和快速迭代，而这也是 Chaos Mesh 更加吸引人的特点。

## 如何在 APISIX 上应用混沌工程

混沌工程在单纯的注入故障以外，逐渐形成了一套完整的方法论。根据 Principle of Chaos Engineering 的推荐，部署混沌工程实验需要五个步骤：

1. 定义稳态，即找到一个证明正常运行的可量化指标。
2. 做出假设，假设指标在实验组和对照组都始终保持稳定状态。
3. 设计实验，引入运行中可能出现的故障。
4. 验证假设，即通过比较实验组和对照组的结果证伪假设。
5. 修复问题。

接下来以上述两个用户反馈场景为例，依照这五个步骤为大家介绍 Apache APISIX 应用混沌工程的流程。

### 场景一

![2021-06-16-1](https://static.apiseven.com/202108/1639462804552-8d51872f-3419-4e64-b365-4ef7cbb2a388.png)

用一幅图来描述这个场景。对照上面的五个步骤，首先需要找到衡量 Apache APISIX 正常运行的可量化指标。在测试时最主要的方法是利用 Grafana 对 Apache APISIX 运行指标进行监测，找到可衡量的指标后，在 CI 中就可以从 Prometheus 中单独提取数据进行比较判断，这里使用了路由转发的 Request per Second（RPS）和 etcd 的可连接性 作为评价指标。另一点就是需要对日志进行分析，对于 Apache APISIX 就是查看 Nginx 的 error.log 判断是否有报错以及报错是否符合预期。

在对照组也就是引入 Chaos 前进行实验，检测 set/get route 均能成功，etcd 可连接，并记录此时的 RPS。之后，使用 network chaos 添加 5s 的网络延迟 ，再次进行实验，此时 set route 失败，get route 成功，etcd 无法连接，RPS 与之前相比无明显变化。实验符合预期。

### 场景二

![2021-06-16-2](https://static.apiseven.com/202108/1639462935848-b87400d3-e59b-4e6d-84f9-25c2771d48d3.png)

进行同样的对照组实验之后引入 pod-kill chaos，复现了预期的错误。在随机删除集群中少数 etcd 节点的情况下，etcd 可连接性表现出时有时无，日志则打印出了大量连接拒绝的报错。更加有趣的是，在删除 etcd 端点列表的第一个或第三个节点时，设置路由正常返回，而只有在删除 etcd 端点列表中的第二个节点时，设置路由会报错 “connection refused”。

排查发现原因在于 Apache APISIX 使用的 etcd lua API 选择端点时并不是随机而是顺序选择，因此新建 etcd client 进行的操作就相当于只绑定在一个 etcd 端点上导致持续性的失败。修复这个问题之后，还为 etcd lua API 添加了健康检查，确保不会在断开连接的 etcd 上进行大量的重复；以及增加了 etcd 集群完全断开连接时的回退检查，避免大量报错冲爆日志。

## 未来计划

### 1. 借助 e2e 模拟场景进行混沌测试

目前在 Apache APISIX 中，仍然主要依靠人来识别系统中可能的脆弱点进行测试修复。对于开源社区来说，与之前提到的 Netflix 在企业中应用混沌工程不同，尽管在 CI 中测试，无需担心混沌工程的故障半径对生产环境的影响，但同时也无法覆盖生产环境中的复杂而全面的场景。

为了覆盖更多的场景，未来社区计划利用现有的 e2e 测试模拟更加完整的场景，进行更大范围、更强随机性的混沌测试。

### 2. 为更多 Apache APISIX 项目添加混沌测试

除了为 Apache APISIX 找到更多可能的脆弱点之外，社区还计划为 Apache APISIX Dashboard 和 Apache APISIX Ingress Controller 等更多项目添加混沌测试。

### 3. 为 Chaos Mesh 添加功能

在部署 Chaos Mesh 时遇见一些暂不支持的功能，包括网络延迟的目标不支持选择 service，网络混沌无法指定容器端口注入等，Apache APISIX 社区未来也会协助 Chaos Mesh 添加相关功能。希望开源社区都会越来越好。
