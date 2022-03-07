---
title: "Why Tencent Cloud TI-ONE Platform use Apache APISIX as API gateway?"
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

![TI-ONE Architecture](https://static.apiseven.com/202108/1631781110822-39c59a83-aa18-4934-a2ef-43cd58866878.jpg)

## What Does TI-ONE Need from Apache APISIX?

We divide the requirements into two categories: technical needs, i.e. the requirements of the R&D team for the API gateway; and business needs, i.e. the requirements of the users of the TI-ONE for the API gateway.

The main requirement at the technical aspect is to have cross-sectional functionality. Specifically, cross-plane functions such as authentication, flow limit, logging, monitoring, etc. are coalesced into the API gateway to decouple the back-end services, so that R&D can focus on function development and reduce maintenance costs.

Considering the demand of subsequent business connection to Tencent Cloud, the API gateway must support Tencent’s customized authentication and login mechanism and comply with Tencent Cloud API 3.0 format.

![TI-ONE's Technical Needs](https://static.apiseven.com/202108/1632067141398-816af366-f7d5-47ad-ad85-3df534ada734.58)

From the business aspect, the main consideration is user perception. When the platform is developed, AI and algorithm colleagues need an interactive programming environment, and then the API gateway needs to support Notebook. It also needs to support request-level monitoring, including logging monitoring and metrics monitoring.

We conducted research on API Gateway products to address the above requirements.

![TI-ONE's requirements on  API Gateway](https://static.apiseven.com/202108/1631781748143-8e30a89c-99b8-45ed-b6e6-1dddaa838342.jpg)

## Research and Compare Products

We have compared Envoy, Kong and Apache APISIX from multiple dimensions in our research stage.

![Envoy, Kong and Apache APISIX Comparison](https://static.apiseven.com/202108/1631781764958-a2cadf83-80b4-4b50-ba42-76b21d0d211a.jpg)

Since Envoy’s technology stack is C++, it is likely that we will have to look at the C++ source code when we need to locate the problem. It is very likely to bring us some extra problems, so Envoy was eliminated from our options in the early stage.

Kong and Apache APISIX use the same technology stack, OpenResty, but in the storage dependency aspect, Kong relies on PostgreSQL, a relational database, which is a very complex database to configure for high availability in the software industry. Not only do you need to have a dedicated DBA, but it is also very difficult to implement. Relational databases are too heavy, and we don’t need to use them to guarantee ACID and MVCC.

### Why Did TI-ONE Choose Apache APISIX?

Apache APISIX does a very good job of storing dependencies and routing rules, which is a good fit for our business scenario. Our business values routing flexibility and routing matching algorithms over other features. The complexity of Apache APISIX route matching algorithm is significantly better than Kong, and the configuration effective time is less than 1ms, and the single-core QPS is much higher than Kong.

## Architecture Alignment Based on Apache APISIX

After connecting to Apache APISIX, we have completed the gateway aspect of TI-ONE, which solves the previous requirements about technical and business level.

Apache APISIX supports http+pb, http+json, gRPC, WebSocket and other traffic. After these traffic flows go through Apache APISIX, they will go to some components custom-developed by TI-ONE.

![Apache APISIX Architecture](https://static.apiseven.com/202108/1631781850656-4235a4e8-2792-48ae-9c98-b4d75628a476.jpg)

The business of TI-ONE is deployed on Tencent Cloud TKE platform. In order to improve its availability, the gateway, etcd, etc. are clustered and deployed. Instead of using the Apache APISIX dashboard, Smart Titanium Machine Learning Platform interacts directly with the Admin API and writes directly to etcd.

![Add Plugin Process](https://static.apiseven.com/202108/1631781876752-faf1b7d0-abbb-4313-879c-e00d2b28334a.jpg)

## Experience Sharing

In the process of doing this, we have summarized some of the pitfalls of using Nginx and discovered some of the advantages of APISIX, which we will briefly share here.

### Counterintuitive Nginx Configuration

When I used Nginx before, I felt that Nginx was a configuration-driven product. Nginx is often counterintuitive when it comes to configuration management. One such counterintuitive pitfall was encountered by my colleague during this hands-on experience:

![Nginx Configuration Error](https://static.apiseven.com/202108/1631781909354-0fada4fa-1154-4974-ae3d-292ab46e5889.jpg)

For those are new to Nginx, these two lines of commands are added before the `if`, and there are no other commands inside the `if` that could override them, so they should be executed. Anyone familiar with Nginx knows that the command inside the `if` overrides the outside command, but this is very counterintuitive.

### Test Cases as Documentation

In practicing using Apache APISIX practices, the Apache APISIX project test cases are written in great detail. Even if I didn’t have a deep understanding of how to call certain functions in Apache APISIX, I could often find the answers in the test cases. When I encountered some OpenResty problems later, I would look for the relevant code in these test cases, and I was able to solve the problem every time.

![Test Cases as Documentation](https://static.apiseven.com/202108/1631781920390-a504ce7c-1ccd-4fb8-99a2-09d74be6bb7e.jpg)

## Some Thoughts on Service Mesh

In the early stage of technology selection, apart from Envoy, Kong and Apache APISIX, some colleagues also mentioned Service Mesh. Why do we still choose Apache APISIX, given that Service Mesh is also capable of doing this? Isn’t this a regression in technology? On this issue, my view is as follows.

1. The API gateway is at the system boundary and handles north-south traffic; the Service Mesh is inside the cluster and handles east-west traffic. The functions of the two are different and cannot be directly compared.

1. Service Mesh has proven to have some performance loss. But there is also a voice that says, on the cloud, this loss may not be the performance bottleneck of the business, so this is a matter of opinion.

1. Apache APISIX customization development is more efficient thanks to the easy-to-use features of OpenResty and Lua. Even if the development team has no prior development experience with OpenResty or Lua, they can still complete the custom development requirements of the business in a short period of time.

1. Apache APISIX is less expensive to deliver than Service Mesh because the Istio community is very active and iterates very quickly, resulting in incompatibility between versions of Istio and versions of Kubernetes. In a customer’s production environment, some Kubernetes clusters may have version differences, and these Kubernetes clusters cannot share a single version of Istio, which can cause some problems in the actual delivery process.

## Personal Expectations

Thanks to Apache APISIX for creating an open source API gateway product that is extremely high performance and easy to use. During the development process of TI-ONE Network, we hope that we can learn more about using it in practice and give feedback to the Apache APISIX community.
