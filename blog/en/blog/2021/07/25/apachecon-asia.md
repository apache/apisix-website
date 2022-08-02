---
title: "ApacheCon Asia 2021: Apache APISIX Technical Topics"
author: Apache APISIX
keywords:
- API Gateway
- APISIX
- Apache APISIX
- ApacheCon
description: This article introduces the topics shared by the cloud native API gateway Apache APISIX at ApacheCon Asia, including identity authentication, current limit and speed limit, etc.
tags: [Community]
---

> ApacheCon is the official global conference series of the Apache Software Foundation. Since 1998, ApacheCon has been attracting participants at all levels to explore the "technologies of tomorrow" across more than 350 Apache projects and their diverse communities. ApacheCon Asia is the ApacheCon organizing committee's online conference for the Asia-Pacific region. ApacheCon Asia 2021 will be held online from August 6-8 this year.

<!--truncate-->

## About ApacheCon Asia 2021

ApacheCon is the official global conference series of the Apache Software Foundation. Since 1998, ApacheCon has been attracting participants at all levels to explore the "technologies of tomorrow" across more than 350 Apache projects and their diverse communities.

ApacheCon Asia is the ApacheCon organizing committee's online ApacheCon conference for the Asia-Pacific region, with the primary goal of better serving the rapidly growing number of Apache users and contributors in the region. ApacheCon Asia 2021 will be held online from August 6-8 this year.

![ApacheCon Asia 2021](https://static.apiseven.com/202108/1635750552467-1d0013df-9caa-43a3-bed2-b914d856c413.png)

The ApacheCon Asia 2021 team has recently announced the conference program. The Apache APISIX community is actively involved in this annual open source event, and has proposed a total of 8 API/microservices technology-related topics, which are rich in content and welcome your attention. For those who cannot attend the online conference, ApacheCon Asia 2021 also provides a replay and recorded video of each topic, please visit [Apache Local Community](https://space.bilibili.com/609014805).

## About API / Microservices Technology Topics

APIs are the cornerstone of service connectivity, allowing us to build services and make them available to users; as applications become more complex, monolithic applications are gradually being split into microservices, allowing for rapid iteration of products while also creating technical challenges in security, maintenance, and observability.

Apache APISIX is the top project of Apache and the most active open source gateway project in the world. In this topic, you will not only learn about the Apache APISIX design philosophy, but also learn about the best practices of the Apache APISIX project.

## Application and Practice of Apache APISIX in Mobile Cloud Object Storage EOS

### Session Description

This talk is about the application and practice of Apache APISIX in China Mobile's public cloud object storage EOS. First, we introduce the construction plan of China Mobile's public cloud and the evolution of object storage products, then we explain why we chose Apache APISIX as the load balancing gateway, and introduce the three stages of EOS traffic management architecture evolution. At the same time, we also shared what practical production problems we solved based on Apache APISIX, what solutions and development work we did, and finally, we explained some of our future evolution plans.

### Sharing Guests

![Yanshan Chen](https://static.apiseven.com/202108/1639465900639-ce850138-e0f5-4264-a902-be8ca94b93c0.png)

Yanshan Chen - After graduation, he has been working on distributed storage software development and architecture design, and has been deeply involved in the construction process of mobile cloud, focusing on the selection of major technology solutions and landing development and construction work related to object storage. At the same time, he has rich practical experience in the field of distributed object storage, and is currently thinking about implementing object storage traffic governance based on APISIX seven-tier gateway to achieve further architectural upgrade.

### Share Time

2021-08-07 15:30 GMT+8

## Using Apache APISIX to implement flow limiting and speed limiting

When it comes to speed limiting, Nginx is the first thing that comes to mind, but Nginx is implemented through a configuration file that requires reloads for each change, making it extremely cumbersome to run and maintain. On the other hand, speed limiting conditions are limited to Nginx variables, making it difficult to achieve fine-grained speed limiting for business purposes.

This session will show how to use Apache APISIX to achieve dynamic, fine-grained, and distributed reload limiting, and how to use plug-in orchestration to achieve reload limiting that better meets business needs.

### Guest Speakers

![Junxu Chen](https://static.apiseven.com/202108/1639465952917-9089d8e8-4509-4d14-91d9-84b587cb5e7d.png)

Junxu Chen - Internet veteran, worked in Sina, Xunlei, 360 and other well-known Internet companies, Apache APISIX Committer.

### Share time

2021-08-06 13:30 GMT+8

## Testing Apache APISIX recovery with Chaos.com

Apache APISIX is one of the leading API gateways OSS. To ensure that everything goes as planned, APISIX uses different kinds of tests, including unit, e2e and fuzzy tests. However, we are still not sure how APISIX will behave when some abnormal but unavoidable circumstances occur, such as network failure, IO stress or pod failure.

Therefore, here we use Chaos Mesh, a Kubernetes-based chaos engineering platform that can smoothly inject different kinds of chaos and integrate them into our CI pipeline. At the end of this talk, the audience will learn where Chaos Engineering will benefit the API gateway and how to integrate Chaos Mesh into your own test pipeline.

### Sharing Guests

![Shuyang Wu](https://static.apiseven.com/202108/1639466011014-75736153-f109-4318-a693-38e3bb59cbdd.png)

Shuyang Wu - Committer for Apache APISIX and Chaos Mesh, he leads the integration of Chaos Mesh with Apache APISIX CI.

### Share Time

2021-08-06 14:50 GMT+8

## Authentication and Authorization with Apache APISIX

Authentication and authorization are very necessary features in API gateways. This way, the services located behind the gateway are protected from unauthorized or malicious access, data leakage, and hacking. Apache APISIX is a dynamic, real-time, high-performance API gateway. And it provides many plug-ins, including authentication and authorization like key-auth, Open-ID, wolf-RBAC, etc. This proposal describes how to use Apache APISIX for authentication and authorization.

### Sharing Guests

![Xinxin Zhu](https://static.apiseven.com/202108/1639466066729-9b4d07e2-47f3-4725-99d5-5266864e1c73.png)

Xinxin Zhu - Apache APISIX Committer, with years of CDN experience and familiar with gateways.

### Share time

2021-08-06 15:30 GMT+8

## Relying on the community to make Apache APISIX grow fast

In the past year, Apache APISIX has become the most active API gateway project in the world, not only because of its advanced technology, but also because of the highly active community. As of today, there are 225 contributors from all over the world, and the number is still growing rapidly. This session will introduce APISIX's experience in practicing "community over code". As an idealistic startup, how to combine with Apache culture to make the startup grow fast.

### Guest Speakers

![Yuansheng Wang](https://static.apiseven.com/202108/1639466127487-bc14552c-5326-43f6-8753-c0df363c3922.png)

Yuansheng Wang - Founder and PMC member of open source enthusiast Apache APISIX.

### Share time

2021-08-06 16:10 GMT+8

## How to extend Apache APISIX as a side car for a service grid

In this topic I will introduce the apisix-mesh-agent project, which has some capabilities to extend Apache APISIX as a sidecar in a service grid scenario, and more importantly, it uses the xDS protocol to get configurations from control planes like Istio, Kuma, etc. Afterwards, I will present future plans and expectations regarding the use of Apache APISIX in service grids.

### Sharing Guests

![Chao Zhang](https://static.apiseven.com/202108/1639466178896-23fb5c6e-ccb1-46e0-ac02-55fef1b3bedf.png)

Chao Zhang - Apache APISIX PMC, OpenResty contributor, open source enthusiast, now working on Service Mesh, Kubernetes and API Gateway.

### Share time

2021-08-07 13:30 GMT+8

### Evolution of Apache APISIX

Apache APISIX is one of the most popular API gateways: https://github.com/apache/apisix I will describe the evolution of Apache APISIX, including.

1. the good decisions we've made
2. the bad decisions we've made
3. our future plans

### Sharing Guests

![Zexuan Luo](https://static.apiseven.com/202108/1639466430768-b416eea2-e8e3-4a50-91b9-2d6b05aead10.png)

Zexuan Luo - Apache APISIX PMC, OpenResty developer.

### Share time

2021-08-07 14:10 GMT+8

### Apache APISIX-based implementation of KUBERNETES INGRESS

Introducing the benefits of Apache APISIX-based Kubernetes Ingress and the features of Apache APISIX Ingress.

### Sharing Guests

![Jin Wei](https://static.apiseven.com/202108/1639466497596-7e4b91a9-2367-457a-ad33-0c5db7b87c24.png)

Wei Jin - Apache APISIX PMC, Apache apisix-ingress-controller Founder, Apache Skywalking Committer.

### Share time

2021-08-07 14:50 GMT+8
