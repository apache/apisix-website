---
title: "How APISIX implemented in China Mobile Cloud"
author: "Yanshan Chen"
keywords: 
- Apache APISIX
- China Mobile
- OSS
- User Case
- API Gateway
description: This article introduces how China Mobile Cloud develops products and improves and updates its functions based on the cloud-native API gateway Apache APISIX.
tags: [Case Studies]
image: https://static.apiseven.com/2022/blog/0817/%E7%A7%BB%E5%8A%A8%E4%BA%91.png
---

> This article is compiled from a presentation given by Yanshan Chen from China Mobile Cloud Competence Center at ApacheCon 2021 Asia. By reading this article, you can learn how China Mobile Cloud is developing and improving and updating its products based on Apache APISIX to create a better mobile cloud object storage.

<!--truncate-->

## Background Information

As the builder of China Mobile’s cloud facilities, provider of cloud services and aggregator of cloud ecology, China Mobile’s Cloud Competence Center has assumed six major responsibilities for mobile cloud: technology research and development, planning and construction, operation and maintenance, cooperation and introduction, sales support, and support for cloud deployment.

As of October 2020, a total of 25 public cloud nodes have been built nationwide, with a provincial coverage rate of over 80%. Among them, object storage EOS, as one of the underlying infrastructure capabilities, has been deployed in all resource pools, and the overall available scale has reached EB level.

Mobile cloud object storage has gone through four generations of development history changes. Starting from self-research and development, through functional expansion, deep customization, performance improvement to the latest generation has a cross-regional global correction and deletion architecture, to achieve the effect of off-site multi-live disaster recovery. Throughout the years, it can be said that the progress is rapid.

In the early stage of cloud object storage technology selection, we investigated many API gateways, including Nginx, Apache APISIX, etc., and finally chose Apache APISIX, which can not only meet the current business requirements, but also provide more ideas and choices for our products in terms of system availability and maintainability, which is similar to that of Apache APISIX. The overall product evolution plan and technology stack are more compatible.

## Why Did We Choose Apache APISIX as a Gateway?

### Why Did We Abandon Nginx?

#### Reason 1: Lack of Overall Capabilities

Apache APISIX as a microservice gateway, compared with other API gateways, its upstream routing plugins are fully dynamic, and no restart is required to modify the configuration. The plugin also supports hot-loading, so you can plug and unplug and modify the plugin at any time. These capabilities are not available in Nginx, especially in scenarios with very high business continuity requirements.

#### Reason 2: Inflexible Configuration

Apache APISIX supports all-platform, multi-protocol, fully dynamic, fine-grained routing, security protection, and is O&M friendly, and can be docked to Prometheus, SkyWalking, etc., with highly scalable These are the capabilities that are needed in real production.

### Why Did We Choose Apache APISIX?

#### Reason 1: Based on the Need for Product Architecture

As mentioned earlier, object storage has now gone through four generations of development. With the richness of the product features, the scale of the entire architecture cluster becomes larger, there is a need for more control surface policies, including traffic governance, service governance and other policies to ensure the stable operation of the entire system.

#### Reason 2: Implementation of Fine-grained Business Functions

Apache APISIX features, functional plugins, and custom development capabilities are available to meet our business needs during subsequent development.

#### Reason 3: SLA Service Level Guarantee

The general SLA service level availability emphasizes two metrics: system mean time to failure and system mean time to repair failure. How to effectively lengthen the system mean time to failure? How to effectively reduce the system mean time to repair? These two questions are our key considerations. Apache APISIX has good traffic management and service management related capabilities in both fault isolation and self-healing.

![SLA Service Level](https://static.apiseven.com/202108/1631500451210-60ba58d6-1fc4-4db6-b658-5e0066bb1c9b.png)

## What Did We Change in Apache APISIX Data Plane?

### Improvement 1: Separate Access for Internal and External Network Requests

Currently our business model has two domains, the intranet domain and the extranet domain. The intranet domain name access is the east-west access of the resource pool, such as the internal virtual machine of the resource pool, application platform class products, etc. The extranet domain name is equivalent to pure public network access, such as: public cloud, toC and toB customers in the public network, accessing object storage via satellite or physical private line.

By accessing Apache APISIX, we realize multi-domain certificate configuration for internal and external domain names, and provide encrypted access function, and realize the function of dynamic loading of SSL certificate. For 24-hour uninterrupted business, it is very important to be able to dynamically update SSL certificate.

### Improvement 2: Request for Fuse Protection

Here we first give you a brief description of the current Object Storage EOS node management after accessing Apache APISIX. The entire object store is divided into a data plane and a control plane. The data plane mainly carries the I/O flow of the whole business. The business data is processed from APISIX’s Layer 7 traffic governance module as the entry point, through the APISIX back-end upstream Accesser, which is the main module for business interface processing.

![Fuse Protection](https://static.apiseven.com/202108/1646731748455-69e4da37-1a58-4303-968e-3a636e308d04.png)

The control plane has several main services, including the autopilot service Manager, the observable system Observer, and the chaos engineering fault injection module Checker. there is also an additional overall interaction orchestration system Orchestrator and a canary release platform Publisher.

![Control Plane Services](https://static.apiseven.com/202108/1646731771583-36c98076-1434-4bb6-820d-41de725223bf.png)

In order to achieve request fusion protection, the data plane is connected to Apache APISIX to achieve the processing capability of request intervention. The observable system at the control plane is mainly built based on Prometheus, which collects indicators and alerts, and finally realizes the overall fusion protection at the back-end.

### Improvement 3: Customize Constant Key to Achieve Global Flow-limit

limit-conn key This plugin mainly supports remote_addr, server_addr, X-Forwarded-For, X-Real-IP, but cannot do full limit flow for north-south gateway traffic.
In order to match our business requirements, we customize a constant constant as the range of imit-conn key. The right side of the above figure is the modified configuration after accessing Apache APISIX, and the constant constant constant key is used to achieve the function of global flow-limit.

![Global Flow-limit](https://static.apiseven.com/202108/1646731806833-166c115f-26bb-4657-a7c1-9a24e043f399.png)

### Improvement 4: New Function Feature Switches

#### Switch 1: Temporarily Turn off an Object Storage Function

In the gateway layer by accessing Apache APISIX, it is compatible with the S3 interface specification to avoid wasting resources on the access layer and persistence layer of the back-end service.

#### Switch 2: Support the Highest Priority for GET Requests

With the support of GET request priority, GET requests have the highest priority when retrieving user data, higher than PUT, DELETE and other requests.

#### Switch 3: Return 501 Not Implemented for Ordered List Requests

In the object storage will generally have a bucket of Ordered List feature requirements. The third and fourth generation of mobile cloud object storage for tens of billions of file objects, if still using Ordered List, on the one hand, request access to the back-end response time will be particularly long, on the other hand, will take up more resources, the stability of the back-end a greater challenge.

Therefore, after accessing Apache APISIX, the request will be rejected directly at the gateway level, and the status code of 501 Not Implemented will be returned.

### Improvement 5: Transparent Upgrade/Expansion/Configuration Change

Combined with the Apache APISIX Layer 7 governance capabilities, we perform upgrades, scaling and configuration changes to key components upstream and across the I/O path to control back-end weighting through dynamic scaling and dynamic upgrade operations for subsequent request processing.

### Improvement 6: Request Log Tracking Analysis Based on Request-id

Based on access.log, we have implemented a centralized log collection management method to collect APISIX logs and logs of other processes, and then perform a comprehensive analysis.

![Log Tracking](https://static.apiseven.com/202108/1646731841734-478f5fe5-186c-4d1e-b754-009ba4942ead.png)

The configuration item on the right side of the image above uses the request-id plugin of Apache APISIX. Each request is assigned a request-id when it passes through APISIX, which is used in the business logic processing layer (Accesser) and the data persistence layer, which in turn filters out the log timestamps of the different components in the official Loki panel and helps to automate some analysis using AI later.

### Improvement 7: Cross Available Zones Request Scheduling Feature

The backend of the current load balancing is a seven-layer traffic governance layer based on APISIX implementation, which achieves multi-live capability by equal ECMP + BGP routing. We define three traffic types, each APISIX node receives service traffic and only hits the upstream service of this node to process (level0, purple line), similar to SideCar mode.
If a node has a problem upstream, it will be forwarded to other upstream nodes in the same AZ for processing (green line). If all upstream nodes hang, the ability to invoke requests across AZs (level2, red line) is implemented based on Apache APISIX, which writes the requests to other AZs and finally achieves request scheduling across AZs.

![Cross Available Zones Request Scheduling](https://static.apiseven.com/202108/1646731904721-e1b2a9ee-0f3c-41da-8a6b-c20a027df1b6.png)

## Future Plans

The future of mobile cloud object storage will fully embrace cloud-native, and gradually achieve the following plans:

1. Integrate data surface functions, and eventually achieve a comprehensive containerized deployment orchestration.

1. Successively access the APISIX-based Ingress Controller, through APISIX to unify access portal.

1. Strengthen the integration capability with Autopilot Manager and Observer subsystem to further achieve fault isolation and self-healing.

1. Move the authentication capability of object storage S3 to the interface layer. Better achieve unified authentication and security access to protect the back-end effect.
