---
title: ApacheCon Asia 2021
slug: 2021/08/23/apachecon-asia-2021
keywords:
- APISIX
- ApacheCon
- Apache Way
- Commercial
description: ApacheCon Asia 2021 takes place online from August 6-8. The Apache APISIX community has submitted related topics such as rate limit, authentication, service mesh, etc.
tags: [Community]
---

> ApacheCon is the official global conference series of the Apache Software Foundation. Since 1998, ApacheCon has been attracting participants at all levels to explore the "technologies of tomorrow" in more than 350 Apache projects and their diverse communities. ApacheCon Asia is an online ApacheCon conference with the primary goal of better serving the rapidly growing number of Apache users and contributors in the Asia-Pacific region. ApacheCon Asia 2021 takes place online August 6-8, 2021.

<!--truncate-->

The Apache APISIX community actively participated in this annual open source event, presenting a rich set of 8 API/microservices technology-related topics.

## Implementing Flow Limiting with Apache APISIX

Shared by: Junxu Chen

Nginx is often the first thing that comes to mind when it comes to limiting speed. However, Nginx is implemented through a configuration file, which requires reloading every time you make a change, making it extremely cumbersome to run and maintain. On the other hand, speed limiting conditions are limited to Nginx variables, making it difficult to achieve fine-grained speed limiting for business purposes. This session will show how to use Apache APISIX to achieve dynamic, fine-grained, and distributed rate-limiting, and how to use plug-in orchestration to achieve rate-limiting that better meets business needs.

[**View**](/articles/Speed-Limiting-With-Apache-APISIX)

## Testing Apache APISIX resilience with Chaos Mesh

Shared by: Shuyang Wu

Apache APISIX is one of the leading API gateways OSS. To make sure everything is going as planned, APISIX uses different kinds of tests, including unit, e2e, and fuzzy tests. However, we are still not sure how APISIX will behave when some abnormal but unavoidable circumstances occur, such as network failure, IO stress or Pods failure. So here we use Chaos Mesh, a Kubernetes-based chaos engineering platform that can smoothly inject different kinds of chaos and integrate them into our CI pipeline. At the end of this talk, the audience will learn where Chaos Engineering will benefit the API gateway and how to integrate Chaos Mesh into your own test pipeline.

[**View**](/articles/Test-Apache-APISIX-Resilience-With-Chaos-Mesh)

## Authentication and authorization with Apache APISIX

Shared by: Xinxin Zhu

Authentication and authorization are very essential features in API gateways. This way, services located behind the gateway are protected from unauthorized or malicious access, data leakage, and hacking. Apache APISIX is a dynamic, real-time, high-performance API gateway. And it offers a number of plug-ins, including authentication and authorization like key-auth, Open-ID, wolf-RBAC, etc. This proposal describes how to use APISIX for authentication and authorization.

[**View**](/articles/Using-Apache-APISIX-To-Do-Authentication-and-Authorization)

## Relying on the community to let Apache APISIX grow fast

Shared by: Yuansheng Wang

In the past year, APISIX has become the most active API gateway project in the world, not only because of its advanced technology, but also because of the highly active community. As of today, there are 225 contributors from all over the world, and the number is still growing rapidly. This session will introduce APISIX's experience in practicing "community over code". As an idealistic startup, how to combine with Apache culture to make the startup grow fast.

[**View**](/articles/Relying-On-The-Community-To-Get-Apache-APISIX-Up-Speed)

## Apache APISIX from open source project to the road to commercialization

Shared by: Ming Wen

Ming Wen, Founder of api7.ai, Chairman of Apache APISIX PMC, and member of Apache Foundation, will speak on "Apache APISIX from Open Source to Commercialization".

[**View**](/articles/Apache-APISIX-From-OpenSource-Commercialization)

## Using Echarts to render renderings of community events

Shared by: Yi Sun

The open source repository was analyzed by 1. contributor growth curve; 2. monthly contributor activity; 3. to reflect the health of the open source project, here we share some experiences and some interesting things about how to make these two graphs.

[**View**](/articles/Rendering-Community-Events-Using-ECharts)

## Running an open source commercialization company according to the Apache Way, does it work

Shared by: Ming Wen

The Apache Way is a proven community success for countless open source projects, so does the Apache Way work for open source commercial companies? Does it work in the business world? Through 2 years of operating as an open source commercial company, Tributary Technologies hopes to answer this question with the company's personal experience.

[**View**](/articles/Apache-APISIX-From-OpenSource-Commercialization-by-Apache-Way)

## The appeal of open source

Shared by: Ju Zhiyuan

The Apache Software Foundation's top project, Apache APISIX, and its subprojects have merged 250+ PRs in the last 30 days, and the contributor trend is very positive. In addition, the high quality mailing list, active QQ groups and GitHub are attracting a lot of community attention. As the Apache APISIX PMC, what are some of the things Apache APISIX has done to catalyze an active community from my perspective?

[**View**](/articles/The-Appeal-of-OpenSource)

## Apache APISIX Application and Practice in Mobile Cloud Object Storage EOS

Shared by: Yanshan Chen

This talk is about the application and practice of Apache APISIX in China Mobile's public cloud object storage EOS. Firstly, we introduced China Mobile's public cloud construction plan and the evolution of object storage products, then we explained why we chose Apache APISIX as the load balancing gateway, and introduced the three phases of EOS traffic management architecture evolution in detail. At the same time, we also share what practical production problems we have solved based on Apache APISIX, what solutions and development work we have done, and finally, we explain some of our future evolution plans.

[**View**](/articles/Apache-APISIX-in-China-Mobile-Cloud)

## How to extend Apache APISIX as a service grid side car

Shared by: Chao Zhang

In this topic, I will introduce the apisix-mesh-agent project, which has some capabilities to extend Apache APISIX as a sidecar program in a service grid scenario, and more importantly, it uses the xDS protocol to get configuration from control planes like Istio, Kuma, etc. After that, I will present future plans and expectations regarding the use of Apache APISIX in service grids.

[**View**](/articles/How-To-Extend-Apache-APISIX-into-a-Service-Mesh-Sidecar)

## The Evolution of Apache APISIX

Shared by: Zexuan Luo

In this topic, I will introduce the evolution of Apache APISIX, including: 1. The good decisions we made; 2. The bad decisions we made; 3. Our future plans

[**View**](/articles/The-Evolution-of-Apache-APISIX)

## Implementation of Kubernetes Ingress based on Apache APISIX

Shared by: Wei Jin

Introducing the advantages of Apache APISIX-based Kubernetes Ingress and the features of Apache APISIX Ingress.

[**View**](/articles/Apache-APISIX-Kubernetes-Ingress)

## Apache APISIX's Incubator Journey

Shared by: Ming Wen

The Incubator Journey of Apache APISIX

[**View**](/articles/Apache-APISIX-Incubator-Journey)
