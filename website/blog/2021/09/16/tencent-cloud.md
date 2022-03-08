---
title: "Implementing Apache APISIX in Tencent Cloud TI-ONE Platform"
author: "Shoujun Diao"
keywords:
- Apache APISIX
- Tencent
- Kong
- Nginx
description: This article is a practical case of implementing Apache APISIX in Tencent Cloud’s production environment.
tags: [User Case]
---

> This article is a practical case of implementing Apache APISIX in Tencent Cloud’s production environment.

<!--truncate-->

## Background Information

Tencent Cloud Intelligent Titanium Machine Learning Platform (TI-ONE) is a machine learning service platform for AI engineers, providing users with full-process development support from data pre-processing, model building, model training to model evaluation. TI-ONE has rich built-in algorithm components and supports multiple algorithm frameworks to meet the needs of various AI application scenarios.

![TI-ONE Architecture](https://static.apiseven.com/202108/1646733057321-30edde1f-c6ab-4d51-b1cd-a461149ce3fe.png)

## What Does TI-ONE Need from Apache APISIX?

We divide the requirements into two categories: technical needs, i.e. the requirements of the R&D team for the API gateway; and business needs, i.e. the requirements of the users of the TI-ONE for the API gateway.

The main requirement at the technical aspect is to have cross-sectional functionality. Specifically, cross-plane functions such as authentication, flow limit, logging, monitoring, etc. are coalesced into the API gateway to decouple the back-end services, so that R&D can focus on function development and reduce maintenance costs.

Considering the demand of subsequent business connection to Tencent Cloud, the API gateway must support Tencent’s customized authentication and login mechanism and comply with Tencent Cloud API 3.0 format.

![TI-ONE's Technical Needs](https://static.apiseven.com/202108/1646733057324-fdd36204-a825-4221-85b1-09a80229f0de.png)

From the business aspect, the main consideration is user perception. When the platform is developed, AI and algorithm colleagues need an interactive programming environment, and then the API gateway needs to support Notebook. It also needs to support request-level monitoring, including logging monitoring and metrics monitoring.

We conducted research on API Gateway products to address the above requirements.

![TI-ONE's requirements on  API Gateway](https://static.apiseven.com/202108/1646733057325-b5c6a9b5-c759-4ffc-885b-7f2f4263dc97.png)

## Research and Compare Products

We have compared Envoy, Kong and Apache APISIX from multiple dimensions in our research stage.

![Envoy, Kong and Apache APISIX Comparison](https://static.apiseven.com/202108/1646733057334-3b96b9b6-cce5-4c12-a9b1-080cd85cf91e.png)

Since Envoy’s technology stack is C++, it is likely that we will have to look at the C++ source code when we need to locate the problem. It is very likely to bring us some extra problems, so Envoy was eliminated from our options in the early stage.

Kong and Apache APISIX use the same technology stack, OpenResty, but in the storage dependency aspect, Kong relies on PostgreSQL, a relational database, which is a very complex database to configure for high availability in the software industry. Not only do you need to have a dedicated DBA, but it is also very difficult to implement. Relational databases are too heavy, and we don’t need to use them to guarantee ACID and MVCC.

### Why Did TI-ONE Choose Apache APISIX?

Apache APISIX does a very good job of storing dependencies and routing rules, which is a good fit for our business scenario. Our business values routing flexibility and routing matching algorithms over other features. The complexity of Apache APISIX route matching algorithm is significantly better than Kong, and the configuration effective time is less than 1ms, and the single-core QPS is much higher than Kong.

## Architecture Alignment Based on Apache APISIX

After connecting to Apache APISIX, we have completed the gateway aspect of TI-ONE, which solves the previous requirements about technical and business level.

Apache APISIX supports http+pb, http+json, gRPC, WebSocket and other traffic. After these traffic flows go through Apache APISIX, they will go to some components custom-developed by TI-ONE.

![Apache APISIX Architecture](https://static.apiseven.com/202108/1646733057327-10beae1e-3eef-4855-ac4b-68264d9515b8.png)

The business of TI-ONE is deployed on Tencent Cloud TKE platform. In order to improve its availability, the gateway, etcd, etc. are clustered and deployed. Instead of using the Apache APISIX dashboard, Smart Titanium Machine Learning Platform interacts directly with the Admin API and writes directly to etcd.

![Add Plugin Process](https://static.apiseven.com/202108/1646733057328-8362a88e-15a9-4e13-b468-92149d49e24f.png)

## Experience Sharing

In the process of doing this, we have summarized some of the pitfalls of using Nginx and discovered some of the advantages of APISIX, which we will briefly share here.

### Counterintuitive Nginx Configuration

When I used Nginx before, I felt that Nginx was a configuration-driven product. Nginx is often counterintuitive when it comes to configuration management. One such counterintuitive pitfall was encountered by my colleague during this hands-on experience:

![Nginx Configuration Error](https://static.apiseven.com/202108/1646733057331-e8b968b4-121b-4b64-a774-6e386af018e0.png)

For those are new to Nginx, these two lines of commands are added before the `if`, and there are no other commands inside the `if` that could override them, so they should be executed. Anyone familiar with Nginx knows that the command inside the `if` overrides the outside command, but this is very counterintuitive.

### Test Cases as Documentation

In practicing using Apache APISIX practices, the Apache APISIX project test cases are written in great detail. Even if I didn’t have a deep understanding of how to call certain functions in Apache APISIX, I could often find the answers in the test cases. When I encountered some OpenResty problems later, I would look for the relevant code in these test cases, and I was able to solve the problem every time.

![Test Cases as Documentation](https://static.apiseven.com/202108/1646733057329-96e639df-c3ec-4fe7-b604-8c48e81c9572.png)

## Some Thoughts on Service Mesh

In the early stage of technology selection, apart from Envoy, Kong and Apache APISIX, some colleagues also mentioned Service Mesh. Why do we still choose Apache APISIX, given that Service Mesh is also capable of doing this? Isn’t this a regression in technology? On this issue, my view is as follows.

1. The API gateway is at the system boundary and handles north-south traffic; the Service Mesh is inside the cluster and handles east-west traffic. The functions of the two are different and cannot be directly compared.

1. Service Mesh has proven to have some performance loss. But there is also a voice that says, on the cloud, this loss may not be the performance bottleneck of the business, so this is a matter of opinion.

1. Apache APISIX customization development is more efficient thanks to the easy-to-use features of OpenResty and Lua. Even if the development team has no prior development experience with OpenResty or Lua, they can still complete the custom development requirements of the business in a short period of time.

1. Apache APISIX is less expensive to deliver than Service Mesh because the Istio community is very active and iterates very quickly, resulting in incompatibility between versions of Istio and versions of Kubernetes. In a customer’s production environment, some Kubernetes clusters may have version differences, and these Kubernetes clusters cannot share a single version of Istio, which can cause some problems in the actual delivery process.

## Personal Expectations

Thanks to Apache APISIX for creating an open source API gateway product that is extremely high performance and easy to use. During the development process of TI-ONE Network, we hope that we can learn more about using it in practice and give feedback to the Apache APISIX community.
