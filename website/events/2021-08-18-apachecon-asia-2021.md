---
title: "ApacheCon Asia 2021"
author: bzp2010
authorURL: "https://github.com/bzp2010"
authorImageURL: "https://avatars.githubusercontent.com/u/8078418?v=4"
tags: [ApacheCon Asia 2021]
---

## 本文内容仅供示例

## APISIX in ApacheCon 2021

Apache APISIX 社区进行了以下分享  
balabala  
balabala

### 使用 Apache APISIX 实现限流限速

分享者：陈军旭

谈到限流限速，人们往往最先想到的是 Nginx 。然而 Nginx 通过配置文件的方式实现，每次变更都需要 reload ，这让运维工作极其繁杂。另一方面，限速的条件被限制在 Nginx 的变量范围内，使得 Nginx 难以实现业务上精细化的限流限速需求。本次分享将带来如何使用 Apache APISIX 来实现动态、精细化、分布式的限流限速，以及如何通过插件编排来实现更符合业务需求的限流限速。

[**查看分享**](/articles/2021/08/19/Speed-Limiting-With-Apache-APISIX)

### 用 Chaos Mesh 测试 Apache APISIX 的恢复能力

分享者：吴舒旸

Apache APISIX 是领先的 API 网关 OSS 之一。为了确保一切按计划进行，APISIX 使用了不同种类的测试，包括单元、e2e 和模糊测试。然而，我们仍然不确定，当一些不正常但不可避免的情况发生时，例如网络故障、IO 压力或 Pods 故障，APISIX 会如何表现。因此，在这里我们使用 Chaos Mesh，一个基于 Kubernetes 的混沌工程平台，可以顺利地注入不同种类的混沌，并将其整合到我们的 CI 管道中。在这个讲座的最后，听众会了解到混沌工程会在哪些方面给 API 网关带来好处，以及如何将混沌网整合到你自己的测试管道中。

[**查看分享**](/articles/2021/08/19/Test-Apache-APISIX-Resilience-With-Chaos-Mesh)

### 使用 Apache APISIX 进行认证和授权

分享者：朱欣欣

认证和授权是 API 网关中非常必要的功能。这样一来，位于网关后面的服务就可以得到保护，避免未经授权或恶意的访问、数据泄露和黑客攻击。Apache APISIX 是一个动态、实时、高性能的 API 网关。而且它提供了许多插件，包括像 key-auth、Open-ID、wolf-RBAC 等认证和授权。本提案介绍了如何使用 APISIX 来进行认证和授权。

[**查看分享**](/articles/2021/08/19/Using-Apache-APISIX-To-Do-Authentication-and-Authorization)

### And more
