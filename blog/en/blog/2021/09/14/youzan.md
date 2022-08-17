---
title: "Youzanyun PaaS for comprehensive micro-service governance with APISX"
author: "Nuojing Dai"
keywords: 
- Apache APISIX
- Youzan
- API Gateway
- Microservice
- Cloud native
description: This article introduces how Youzan cloud-native PaaS platform uses cloud-native API gateway Apache APISIX as a product traffic gateway and the benefits it brings.
tags: [Case Studies]
image: https://static.apiseven.com/2022/blog/0817/%E6%9C%89%E8%B5%9E%E4%BA%91.png
---

> This article focuses on the enterprise case of using Apache APISIX for PaaS platform with Youzanyun native platform and how to use Apache APISIX as a specific example of the product traffic gateway.

<!--truncate-->

Youzan is a major retail technology SaaS provider that helps businesses open online stores, engage in social marketing, improve retention and repurchase, and expand new retail across all channels. This year, youzan Technologies is beginning to design and implement a new cloud native PaaS platform with a common model for release management and micro-service related governance of various applications. Apache APISIX played a key role.

## Why Need a Traffic Gateway

### Youzan OPS Platform

Youzan OPS platform is based on FLASK in the early single application, mainly to support business-oriented. It gradually went online and deployed a lot of business-side code into the containerization phase. At that time, the gateway was only a part of the function of the internal flash application, and there was no clear concept of the gateway, only as the traffic forwarding function of business application. The following illustration shows the current Gateway 1.0 business structure.

![1.0 business structure](https://static.apiseven.com/202108/1646730623405-a0e0b22b-40ca-49c2-bd9b-fd77547bc404.png)

As the entire system in the early days mainly focused on the direction of the business, so did not generate too much momentum to carry out the transformation. From 2018 onwards, through internal communication, we found that if there is not a good gateway layer governance, the subsequent product function and business access will bring more and more obvious bottlenecks.

### Issues with no-gateway Layer Governance

#### Performance

1. Every time you add a back-end service, you need to make a coding change
2. The traffic forwarding code is implemented simply in Python and is not designed as a “Gateway”
3. The performance limitations of the FLASK framework are limited to 120-150 QPS per machine
4. Repeat the wheel: each of the different business requirements produces a set of corresponding entrances
5. It’s messy. It’s complicated

Based on this problem, our action direction is: the professional work to the professional system to do.

#### Internal Operational Aspects

![Internal problems](https://static.apiseven.com/202108/1646730664670-a57a07d3-4a10-4201-9455-410e1d05428d.png)

1. The number of internal services to manage is very high (hundreds)
2. Some services do not dock with CAS implementation authentication
3. The cost of new service docking CAS exists, and the repeated development is time-consuming and labor-consuming
4. All services are configured directly at the access layer, with no internal service specifications or best practices

With these two aspects of the problem, we began to gateway products related research.

## Why Apache APISIX

We also initially investigated a number of gateway systems, such as Apache APISIX, Kong, Traefik and MOSN, as well as two related projects within our company, YZ7 and Tether.

![Gateway pre-section](https://static.apiseven.com/202108/1631607308093-b2135819-6d17-41d4-b2fb-10cbefa3c27b.png)

Considering the maturity and extensibility of the product, we finally made a choice between Kong and Apache APISIX.

![Multi-dimensional comparison](https://static.apiseven.com/202108/1646793171947-28500d69-44c3-4afe-9808-e21b30265aad.png)

As you can see from the image above, the two are basically the same in many ways, so the storage side has become a key consideration. Because etcd is mature in our company’s internal operation and maintenance system, Apache APISIX is a little better than Kong.

At the same time, considering the open source project level, Apache APISIX’s domestic communication and follow-up processing speed is very good, the project’s plug-in system is rich and comprehensive, for each phase of the use of the type are relatively consistent.

So after research in 2020, [Apache APISIX](https://github.com/apache/apisix)  was finally chosen as the gateway for the upcoming cloud native PaaS platform in Youzan.

## After Using Apache APISIX

When we started accessing Apache APISIX, the two problems mentioned above were solved one by one.

### Effect 1: Optimized Architecture Performance

Apache APISIX is deployed as an entry point to gateway at the edge of the internal service area, through which all requests to the front end pass. At the same time, we use the plug-in function of Apache APISIX to connect with the company’s internal CAS single sign-on system. At the same time in the front end we provide a responsible for authentication SDK Apache APISIX authentication interface docking, to achieve a complete and automated process system.

![Optimized architecture](https://static.apiseven.com/202108/1646730763458-7c60675d-4edf-4e4b-9d8b-c3619679af58.png)

So the problem was solved:

1. Each time you add a new back-end service, you simply call the Apache APISIX interface and write the new service configuration
2. Traffic forwarding is done through Apache APISIX, which is excellent at what the gateway does
3. The gateway is no longer a performance bottleneck in the architecture
4. For different business requirements, you can use the same gateway to achieve uniformity; business details vary, you can achieve through plug-ins

### Effect 2: Internal Service Access Standardization

After accessing Apache APISIX, the company’s new internal service will have its own authentication function, access costs are very low, business can directly start to develop business code. At the same time when the new service access, according to the norms of internal services for the relevant routing configuration, back-end services can be unified access authentication after the user identity, save time and effort.

Some of the fine-tuning details of the in-house service are briefly described here.

#### Authentication Plugin OPS-JWT-Auth

The authentication plug-in is developed based on JWT-Auth protocol. When a user accesses the front end, the front end calls the SDK first to get the available JWT-Token locally. Then through the following path to get the user’s valid information, placed in the front-end of a storage, complete login authentication.

![Login authentication](https://static.apiseven.com/202108/1646730872779-8ca9bc05-a3ea-4cc5-95dc-b8b2a8e3e2d1.png)

#### Deployment Configuration Upgrade

At the deployment level, we implemented the current multi-cluster configuration deployment after three iterations from the simpler version.

- Version 1: Double Room 4 independent nodes, the hypervisor is written to each node’s etcd
- Version 2: Double Room 4 independent nodes, the main room three nodes etcd cluster
- Version 3: Three Rooms 6 independent nodes, three rooms etcd cluster

For now we’re going to mix computing with storage deployment, and then we’re going to deploy a really high availability ETCD cluster that can be isolated from the governance plane Apache APISIX runtime, deploy in stateless mode.

#### New Authentication Plugin PAT-Auth

This year we added the Person Access Token (Pat) authentication plug-in, which, like calling the Open API on GitHub, generates a personal Token that can call the Open API as a Person.

Because our own operating platform also has some such requirements, for example, some local development plug-ins need to personally access the interface on the cloud platform, in this case the personal way Token is more convenient, allow developers to license themselves.

While multiple Auth plug-ins have been supported since Apache APISIX 2.2, one Consumer can now run multiple Auth plug-in scenario implementations.

## More Plans to Explore

### Upgrade Operations Automation

We also experienced a few version changes during our use of Apache APISIX. But each upgrade, more or less because of compatibility and lead to the transformation of development, after the completion of the online changes, operating efficiency is low. So in the future we will try to deploy a three-room etcd cluster on the storage surface at the same time as Apache APISIX runs the surface containerization implementation for automatic distribution.

### Use the Traffic Split Plugin

[traffic split](https://github.com/apache/apisix/blob/master/docs/en/latest/plugins/traffic-split.md) is a plug-in that Apache APISIX has introduced in recent releases with the primary function of traffic separation. With this plug-in, we can according to some of the traffic head characteristics, use it to complete the relevant operations automatically.

![traffic split](https://static.apiseven.com/202108/1631607412159-bc84d447-ef28-4726-8ee1-b960415ac5ce.png)

As shown above, a traffic split plug-in is introduced in the routing configuration, and when region = Region1 is present, it is routed to Upstream1. Through such a rule configuration, the operation of traffic control is completed.

### East-west Flow Management

In our usage scenario, we are more involved in multi-service of intranet, and we can rely on Apache APISIX for traffic management when calling authentication. Both service A and service B can use it to call service C, with the addition of an authenticated plug-in to set its call object scope, environment scope, or rate, and fuse limit, etc. , to do something like this.

![Flow management](https://static.apiseven.com/202108/1631607435661-c22c61c4-396b-4412-9643-b6ccb16cfb1c.png)

### With the Internal Access System

Then we’re going to Dock Apache Apisix with the company’s permission system, and after authentication, determine if the user has access to a resource on the back end, the administrator of the permissions only needs to make a uniform configuration on the administration plane.

![System docking](https://static.apiseven.com/202108/1646730958671-7a7dff8f-7b4a-4488-ae31-e99bb06dc7f3.png)

One of the benefits of this is that all back-end services do not need to be individually managed, since all current traffic is handled through the gateway layer.

### Go Plugin Development

Apache APISIX currently supports multiple computing languages at the computing language level, such as Java, Go, and Python. It just so happens that our recently implemented cloud native PaaS platform is also starting to move the technology stack from Python to Go.

Hopefully we will be able to update some of the plug-ins we have implemented with Go in the future with Apache APISIX, hopefully bringing more benefits to the like product in subsequent iterations.
