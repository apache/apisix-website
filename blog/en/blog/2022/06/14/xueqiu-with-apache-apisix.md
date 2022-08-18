---
title: "Architecture evolution of investment platforms with API gateway"
authors:
  - name: "Xueqiu Basic Component Team"
    title: "Author"
  - name: "Sylvia"
    title: "Technical Writer"
    url: "https://github.com/SylviaBABY"
    image_url: "https://avatars.githubusercontent.com/u/39793568?v=4"
keywords: 
- API Gateway
- Apache APISIX
- ZooKeeper
- Authentication
- Investment
- Observability
description: This article introduces how Xueqiu uses APISIX to achieve more flexible services in adjusting the active-active architecture.
tags: [Case Studies]
image: https://static.apiseven.com/2022/blog/0817/%E9%9B%AA%E7%90%83.png
---

> This article is compiled from the sharing at [Apache APISIX Summit ASIA 2022](https://apisix-summit.org/). It introduces how Xueqiu uses APISIX to achieve more flexible services in adjusting the active-active architecture.

<!--truncate-->

## Background

Founded in 2010, Xueqiu started as an investment community and has become a leading online management platform integrating investment, communication and trading in China, providing investors with quality content, real-time quotes, trading tools, wealth management and other services.

Among them, the real-time quotes service is docked to a variety of upstream data sources, through data streaming calculation, storage and distribution, providing investors with stable data services. Therefore, real-time quotes have been a major resource consumer in Xueqiu's business system, which continues to run at a high water level. An important task within Xueqiu is the ongoing stability building, which includes performance optimization of the quotes service. Even so, in the occasional case of extreme quotes, some systems still experience a slow response or even unavailability due to a surge in data volume, thus affecting the user experience.

Apache APISIX can greatly simplify the complexity of implementing a dual-active architecture. APISIX's own cloud-native features, rich community ecology and plug-ins also lay a good foundation for the future evolution of Xueqiu's cloud-native architecture. In this article, we will introduce how Xueqiu is using Apache APISIX to evolve its internal dual-active architecture.

![Original architecture](https://static.apiseven.com/2022/blog/0614/xueqiu-en1.png)

The diagram above depicts the simple architecture of Xueqiu single room period, user traffic comes in from the cloud portal (SLB), and is processed by the gateway for simple public nature logic and forwarded to the back-end service. The back-end service will be through the SDK, the authentication module integrated in the service to the Xueqiu user center to initiate user authentication, and then continue to follow the business processing.

### Dual-active transformation pain points

In the practical business scenario, some pain points of the architecture also began to emerge.

1. Complex SDK authentication module

During the implementation of the dual-active transformation, the provider and consumer of microservices cannot fully synchronize the deployment and go live. When the quotation service is first online in the cloud, and the Xueqiu user center does not yet have cloud service capabilities, there will be a cross-room invocation situation. According to the user center statistics, its RPC call volume is about billions per day, the peak can reach 50K QPS, in the high QPS scenario of the market will bring high latency.

At the same time, Xueqiu's forensic services are highly complex, and need to take into account various factors such as client version and multiple APPs under Xueqiu, in addition to OAuth2.0/JWT protocol. Because the authentication module is embedded in the service, it becomes more difficult to upgrade.

2. OpenResty less functional

Xueqiu has been using OpenResty as a gateway before, and its own functionality is slightly inadequate. Therefore, when integrating OpenResty into Xueqiu's existing monitoring system, it still requires a certain amount of work; at the same time, the extension process is cumbersome and requires the operation and maintenance side to add custom scripts to achieve.

3. Rely on self-research registration center

The current HTTP service registration of Xueqiu is to request the registry to register itself to the gateway when the back-end service is started, and request the registry to remove the service node when the service is stopped, and the registry will periodically poll the service node for health checks. However, the self-developed service is more expensive to maintain compared to open source projects.

### API gateway selection

So on top of these pain points, Xueqiu wanted to be as transparent as possible to the business side and minimize changes without introducing too many variables; the problem could be handled uniformly at the infrastructure level and the forensic services could be done in the local server room as much as possible. With the above in mind, Xueqiu decided to move the forensic services to the API gateway for completion.

Based on the pain points that became apparent in the business practice scenarios, the Xueqiu Infrastructure team began researching gateway products. Through internal requirements and the comparison of current market gateway products, the final choice of the subsequent architecture based on Apache APISIX adjustment and use.

![Ecological](https://static.apiseven.com/2022/blog/0614/xueqiu-en2.png)

## Apache APISIX Practice

### Adjusted architecture

![New architecture](https://static.apiseven.com/2022/blog/0614/xueqiu-en3.png)

The above figure shows the current dual-active architecture of Xueqiu Quotes. The left side shows the corresponding architecture in the original server room without much change; the right side shows the multi-live architecture designed based on multiple regions after going to the cloud.

The above architecture is mainly based on APISIX with the following adjustments.

- The authentication module is adjusted to the proxy layer, and APISIX is used to unify the authentication method. The JWT type can directly use the APISIX `jwt-auth` plugin for local authentication.
- Compatible with OAuth 2.0 form, the use of APISIX unified call Xueqiu user center for processing.
- Docking Xueqiu back-end RPC service registry, for JWT authentication failure to use Xueqiu back-end services to authenticate.

### Application scenario demonstration

After the back-end services are connected to APISIX, some practices are carried out mainly at the level of gateway authentication and observability.

#### Gateway authentication

As mentioned in the previous article, the authentication methods in Xueqiu's previous architecture model were not uniform. One needs to rely on the internal application side, through the form of SDK to call the user center to achieve authentication, and the other uses JWT authentication. When the two authentication methods coexist, it brings the problem of poor scalability and maintenance.

After APISIX has been implemented as a gateway, the authentication solution is managed through the APISIX gateway layer. Based on the official plugin `jwt-auth` to replace the original JWT authentication method; at the same time, combined with the internal business requirements of Xueqiu, using APISIX grpc-transcode plugin proxy call authentication services, to handle the previous OAuth 2.0 related authentication methods.

The `jwt-auth` plugin is simple to configure and use, and can be turned on in the Dashboard with complete configuration of routing and upstream/downstream information. Here is a description of how Xueqiu internally uses APISIX to call gRPC to achieve authentication.

Before implementing the call, Xueqiu has considered the following three solutions.

- Option 1: Lua call gRPC directly, because this solution in the implementation, need to consider load balancing and dynamic upstream and other related implementation, the process will be more trouble, so abandoned.
- Option 2: Lua concurrent callback to Golang, which is discarded due to lack of practical experience within the company.
- Option 3: Lua makes HTTP calls and the gRPC interface is implemented using the APISIX `grpc-transcode` plugin. Thanks to the APISIX community's premise of fast iteration of plugin optimization, we finally chose option 3 to implement gRPC calls.

During the implementation, manual synchronization of the protocol buffers file is still required. This is because if the protocol buffers file is modified by the user center but does not match the protocol buffers file saved by APISIX, it will cause authentication problems.

#### Observability under the multi-dimensional monitoring

Xueqiu's daily use scenario, usually after the site is online is required to monitor many indicators, focusing on the following three main parts.

- NGINX connection status and import/export traffic
- HTTP error status code rate (for troubleshooting service or upstream and downstream problems)
- APISIX request latency time consumption (APISIX to forward the logic implementation of the time consuming)

For example, the APISIX latency metric can be very high in some cases (as shown in the figure below), which is actually related to the calculation logic of the latency metric. The current calculation logic of the APISIX latency metric is: the time taken for a single HTTP request on NGINX - the delay in routing the request upstream. The difference between the two elapsed times is the APISIX latency metric data.

![Delay indicator](https://static.apiseven.com/2022/06/blog/xueqiu-5.png)

After using APISIX, adding or modifying some plugins will lead to some logic changes, which may lead to deviations in the time-consuming related data. In order to avoid confusing the authenticity of the data, Xueqiu has also increased the monitoring level based on the plugin level of time consumption monitoring. In order to ensure the accuracy of each data monitoring, it also facilitates the subsequent plug-in level business transformation, locating some problems through time consumption in advance, thus facilitating troubleshooting.

![Data manifestation](https://static.apiseven.com/2022/06/blog/xueqiu-6.png)

You can also take advantage of APISIX's observability capabilities to collect Access log information and format it for unified delivery to the traffic dashboard for view aggregation. It is easier to understand the overall trend in advance from multiple perspectives, identify potential problems and deal with them in time.

![Summary](https://static.apiseven.com/2022/06/blog/xueqiu-7.png)

#### Extending the ZooKeeper registry

Currently, Xueqiu gRPC service calls are based on the Zookeeper registry for registration and discovery. In the process of authentication, the API gateway needs to access the Xueqiu user center gRPC service for authentication when the local JWT verification fails, which requires the API gateway to obtain the back-end gRPC service address list from the registry. apisix-seed, the official plugin of APISIX, can integrate with ZooKeeper for service discovery, but combined with Xueqiu's own use The official APISIX plugin apisix-seed can be integrated with ZooKeeper for service discovery, but combined with Xueqiu's own use scenario requirements, in APISIX is more for their own business related expansion.

The specific implementation is mainly on a content node of APISIX, when the worker process starts to poll the ZK-Rest cluster like in the figure below, and then regularly pull the source data information and actual information of the whole service, update to the local cache in the worker process, and use it to update the service list.

![Extend ZooKeeper](https://static.apiseven.com/2022/blog/0614/xueqiu-en4.png)

As you can see from the above diagram, the ZK-Rest cluster is equivalent to accessing the data of ZooKeeper through the form of Rest. Therefore, the whole process is actually less functional (mainly based on its own business scenario requirements), and only one instance of it needs to be added to achieve the high availability feature, eliminating some complex operations.

However, this operation also brings a rather obvious disadvantage. When the ZK-Rest cluster needs to be polled regularly, it may cause a delay in updating the service list. So here is an idea for your reference only.

## Summary and Outlook

Currently, Apache APISIX is working well as a gateway layer within Xueqiu. Specifically, it shows that:

- Achieving unified authentication, fusing and flow limiting at the gateway layer.
- Reducing the overall system coupling and improving the quality of service in a dual-room scenario.
- With the APISIX monitoring system, the unified monitoring scheme from gateway to service is improved.
- Providing good support for full-link exclusion.
- Provides a more elegant implementation of both gRPC protocol conversion and service management.

In subsequent use, Xueqiu is also planning the following processes:

- Use of APISIX Ingress Controller applied to K8s clusters.
- Using the `grpc-transcode` plugin for HTTP/gRPC protocol conversion to achieve a unified back-end interface form.
- Using `traffic-spilt` plugin for traffic marking, docking to Nacos registry, achieving full-link grayscale and other service governance.

And in the follow-up plan, we use Apache APISIX to replace the existing OpenResty, and finally realize the management of north-south traffic in the whole domain.
