---
title: "API Gateway Practice in Tencent with APISIX"
slug: 2021/05/24/tencent-games
author: "Xin Xu"
keywords:
- API Gateway
- APISIX
- Apache APISIX
- Tencent Games
- Infrastructure
description: This article introduces what a gateway is and its improvement to the traditional service architecture, and the implementation of APISIX within Tencent.
tags: [Case Studies]
image: https://static.apiseven.com/2022/blog/0817/%E8%85%BE%E8%AE%AF.png
---

> This article is a lecture note from the speech given by Xin Xu, an engineer in charge of internal container platform of Tencent Games, at the Apache APISIX Meetup - Shenzhen. By reading this article, you can not only learn what a gateway is and how the gateway model improves the traditional service architecture, but also understand the reasons for the birth of Tencent OTeam and how Apache APISIX is implemented inside Tencent.

<!--truncate-->

## What is an API Gateway?

### Traditional architecture

Before integrating with API Gateway, we have few ways to reuse some general functionalities, such as:

- Security: authentication, authorization, anti-replay, anti-tampering, anti-DDoS, etc.

- Reliability: service degradation, fusing, traffic limiting, and so on.

Under the traditional architecture, the most common way to deal with this case is to put them into a service framework and implement them through AOP, similar to the following architecture diagram:

![Traditional architecture](https://static.apiseven.com/202108/1630640321175-ee272ad4-d8ee-45f3-8b67-9630fb534a82.png)

The traditional architecture diagram has the following modules.

- Backend: Backend services

- AOP: AOP layering carried by the framework;

- SD: Service Center, used for internal service discovery. In cloud-native technologies, we often use Service to replace this component;

- LB: Load balancer, we use it on the network boundary as an entry point for external traffic.

This kind of architecture was widespread in the design of the early years, which gave birth to many extensive and comprehensive service frameworks, such as Dubbo, SpringCloud, etc., and we will find that most of them have many similar features.

The advantage of this architecture is that the upstream and downstream relationships are more accessible and more apparent, and it reduces one forwarding in the network transmission. But their disadvantages are also obvious:

- Standard features force business service updates: since code references are used, we have to recompile business services to make the features effective. Some teams that do not achieve rolling release have to release during the idle of the business.

- Hard to manage versions: Since we cannot upgrade all services to the latest version every time we release, after a period, the performance of various services will be inconsistent.

Why not put those same functions in a standalone service, which can upgrade or maintain separately?

### Gateway mode

![Gateway mode](https://static.apiseven.com/202108/1630640321180-bd19ad6c-6116-4982-98e8-3b626285ed03.png)

Compared with traditional architecture, We can see an additional component between the backend services and the LB: Gateway.

A gateway usually contains many standard and reusable features, such as Authentication, Traffic Management, etc. The following are the benefits we could get:

- Gateway is a dependent component on the systems, and we could have a better maintain experience.

- Gateway is language-independent.
  
However, the gateway mode also has its disadvantages:

- Because we proxy traffic to the gateway first, we have one more forwarding and higher latency. It will cause a higher complexity of troubleshooting problems.

- If the gateway does not work correctly, it may become a bottleneck for the entire system.

How to balance the benefits and disadvantages of the gateway model is a challenge for the technical team. Let’s see how the Tencent OTeam works with Apache APISIX.

## Introduction

### OTeam

Tencent’s OTeam is a group of teams, and every team maintains one or several technical products. They aim to build a stable but robust mid-platform for internal systems. One of the OTeam supports Tencent’s internal Apache APISIX customization distribution.

In order to integrate the duplicate wheels within the company and sink the technical middle ground. Tencent put several technical products of the same nature into the same Oteam, integrating the maintenance staff and firing them all together, so that they could gradually merge into one big and comprehensive product, which is Oteam.

Some Oteams have as many as a dozen products under them, while others have only one. For example, the Oteam where Apache APISIX is located has only one product, Apache APISIX. The original purpose of this Oteam is to maintain the customization features of Apache APISIX within Tencent.

### Apache APISIX

[Apache APISIX](https://apisix.apache.org/) is a Top-Level Project from the Apache Software Foundation, and here are some key points:

- Apache APISIX is a cloud-native, dynamic API gateway based on OpenResty, with a higher routing performance than Kong.

- Apache APISIX provides rich traffic management features such as load balancing, dynamic upstream, canary release, circuit breaking, authentication, observability, and more.

- Apache APISIX is good at handling traditional north-south traffic, as well as east-west traffic between services. It can also be used as a k8s ingress controller.

- Apache APISIX default uses ETCD as the configuration center, which can update the configuration in seconds.

- Apache APISIX graduates from Apache Software Foundation and only takes a few months.

## Tencent OTeam’s operational strategy

![OTeam operational strategy](https://static.apiseven.com/202108/1646831516782-bd2d1b56-0e63-4dc8-a53a-c891c6a11d6d.png)

The above diagram shows how the OTeam works with Apache APISIX’s community:

- Users give feedback or requirements via GitHub Issue.

- OTeam members discuss solutions at weekly meetings or reply directly in Issue.

- Implement features or fix bugs according to discussion.

- Code Review and CI check, then release if necessary.

This process is just like other Open Source projects. Here are some key points:

- After solving the Issue, Tencent engineers will determine whether the problem is also a common problem for the community. If so, they will file a PR to the community.

- Tencent OTeam will regularly review Apache APISIX’s new features to determine whether it is stable and whether it is also a pain point for Tencent. If the answer is yes, pick the relevant codes.

In the beginning, OTeam would sync codes with Apache APISIX every 12 hours so that we could follow up Apache APISIX quickly, but this approach brought some problems:

- After syncing codes with Apache APISIX, we could make sure regulations are correct but couldn’t ensure the codes are stable. Some occasional errors happened in concurrency cases.

- The merged codes sometimes cause multiple PR upstream conflicts logically, but Apache APISIX and OTeam’s CI cannot detect this case. Only when we merge PRs to the master branch could we find something wrong happened.

For these reasons, OTeam is now moving to pick codes for required features after internal reviews.

## OTeam Trend

As of May 2021, OTeam has landed Apache APISIX for more than ten teams within Tencent, with the enormous daily business request traffic exceeding one billion. At the same time, OTeam has also developed more than ten features for Apache APISIX, including Service Discovery, RPC Protocol Conversion, and connect with the monitoring platform.

At the same time, OTeam has also contributed some standard features to Apache APISIX’s community. At present, two members of the OTeam team are also PMCs of the Apache APISIX, and OTeam has contributed more than 50 PRs to the community. We believe that OTeam will keep cooperating with the Apache APISIX community in the future.

## OTeam Internal Features

### Internal pain points

OTeam’s primary responsibility is to maintain Apache APISIX’s features for Tencent. Let’s take a look at what pain points OTeam met.

- The RPC framework is not friendly to the frontend: there are many legacy projects within Tencent that use the TARS framework, it does not directly support the HTTP protocol like TRPC, it only supports the most traditional TCP protocol of the RPC framework, and the transport content uses a specific binary protocol. We need to maintain an intermediate service to convert these interfaces into a frontend-friendly HTTP + JSON form.

- Diversification of service centers: There are many Service Centers in Tencent’s internal services, such as CL5, L5, Polaris, etc. Although we will gradually use the same Service Center, we will use multiple service centers simultaneously during this extended period. The initial Apache APISIX does not support this.

- Alarm: As a gateway, the alarm is not a direction it should pay attention to, but as a fundamental component, the alarm must be a required component to the team. How to solve the alarm problem is also a pain point.

- Security: Tencent has a large amount of traffic and security requirements. A log of toC products are using OTeam, and they have to face a large number of users’ misuse and attacks from the network. The most typical cases are DDos, replay, tampering requests, etc. Can we solve these issues at the gateway layer?

### Problem-solving

![OTeam arichitecture](https://static.apiseven.com/202108/1646831157962-78e0d276-37d9-4bf7-a841-b9600b0ce1f9.png)

The above diagram comes from a simplification of a landing case within Tencent. We can see several problems just raised have been solved in OTeam:

- Protocol Conversion: based on Apache APISIX, OTeam achieves TRPC and TARS protocol conversion. Those who do not perform HTTP legacy services can directly use the conversion plugin in the gateway to attaining HTTP and RPC transfer requirements without writing intermediate services.

- Multiple Service Centers: We have contributed this feature to the community.
Report to monitoring platform: Tencent OTeam uses plugins to connect with monitoring platforms. Users only need to do some configurations, and then the system will automatically report metrics, logs. By the way, users can configure alarm policies on the monitoring platform.

- Anti-replay and anti-tampering: OTeam implements anti-replay and anti-tampering plugins, allowing external businesses that need these capabilities to use them directly out of the box to protect their APIs security.

We hope that these examples can help you explore more Apache APISIX usage scenarios and better use it as a helpful platform. For example, someone used the gateway to implement some API specifications mandatory according to Tencent Cloud policies.

## Summary

OTeam helped the business team solve their pain points and continuously improved the features of Apache APISIX within Tencent, and move forward with the development of the community.

If your team does not have a gateway, you can search and learn more about Apache APISIX and are welcome to participate in the Apache APISIX community.

For more videos about Apache APISIX, please visit https://www.bilibili.com/video/BV1yK4y1G7CP/ .
