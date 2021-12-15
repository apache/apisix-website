---
title: "用 Chaos Mesh 测试 Apache APISIX 的恢复能力 "
date: 2021-08-06 14:50:00
keywords:
- APISIX
- Chaos Mesh
- 混沌工程
- API 网关
- CI
description: Apache APISIX 是领先的 API 网关 OSS 之一。APISIX 使用了不同种类的测试，包括单元、e2e 和模糊测试，当一些不正常但不可避免的情况发生时，例如网络故障、IO 压力或 pod 故障，APISIX 会如何表现。因此，在这里我们使用 Chaos Mesh，一个基于 Kubernetes 的混沌工程平台，可以顺利地注入不同种类的混沌，并将其整合到我们的 CI 管道中。在这个讲座的最后，听众会了解到混沌工程会在哪些方面给 API 网关带来好处，以及如何将混沌网整合到你自己的测试管道中。
---

<!-- markdownlint-disable -->

<iframe src="//player.bilibili.com/player.html?aid=334774886&bvid=BV1JA411w7w8&cid=388417850&page=1" frameborder="0" scrolling="no" allowfullscreen="true" style={{width:"100%", maxHeight: "calc(100vw / 5 * 3)", height: "calc(100vh / 5 * 3)"}}></iframe>

## 分享人简介

吴舒旸，Apache APISIX 和 Chaos Mesh 的提交者，目前在 API7 担任实习软件工程师。他领导了 Chaos Mesh 与 Apache APISIX CI 的整合工作。

## 分享主题介绍

Apache APISIX 是领先的 API 网关 OSS 之一。为了确保一切按计划进行，APISIX 使用了不同种类的测试，包括单元、e2e 和模糊测试。然而，我们仍然不确定，当一些不正常但不可避免的情况发生时，例如网络故障、IO 压力或 pod 故障，APISIX 会如何表现。

因此，在这里我们使用 Chaos Mesh，一个基于 Kubernetes 的混沌工程平台，可以顺利地注入不同种类的混沌，并将其整合到我们的 CI 管道中。在这个讲座的最后，听众会了解到混沌工程会在哪些方面给 API 网关带来好处，以及如何将混沌网整合到你自己的测试管道中。

## PPT 下载

关注 Apache APISIX 公众号，回复“ApacheCon”下载 PPT。

<img src="https://static.apiseven.com/202108/1639468506819-7f829080-19de-4d94-b103-e1d967e0baea.png" alt="Apache APISIX WeChat" style={{width: "200px"}} />
