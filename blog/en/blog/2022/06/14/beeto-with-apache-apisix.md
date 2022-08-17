---
title: "Practice of localized application with API gateway in the Middle East"
authors:
  - name: "Lilin Hu"
    title: "Author"
  - name: "Sylvia"
    title: "Technical Writer"
    url: "https://github.com/SylviaBABY"
    image_url: "https://avatars.githubusercontent.com/u/39793568?v=4"
keywords: 
- API Gateway
- Apache APISIX
- Beeto
- the Middle East
- Traffic
- Security
description: This article introduces how the Middle East social software Beeto uses APISIX to achieve localized deployment in security and scalability.
tags: [Case Studies]
image: https://static.apiseven.com/2022/blog/0817/beeto.png
---

> This article is based on the sharing made by Hu Lilin (Beeto Platform R&D) at the [Apache APISIX Summit ASIA 2022](https://apisix-summit.org/), and introduces how the Middle East social software Beeto uses APISIX to achieve localized deployment.

<!--truncate-->

## Introduction

Beeto is a social app for the Middle East market focusing on Arabic language, with localized product design and technical architecture. It has been ranked No.4 in the Top Charts list of Saudi iOS app store, surpassing the old social giant Facebook.

In fact, the Middle East is considered a more mature region in the Internet field, with a very high penetration of active users in social networks, especially in the Saudi region, where the Internet users have reached 90% in 2019, and the penetration rate of active users in Saudi Arabia will already be ranked 9th in 2020.

The maturity of the Internet market has brought about international software coverage, with the likes of WhatsApp, YouTube and Instagram being the mainstream local social software. But looking back, you will find that there is basically no localized social software in the Middle East like Weibo in China. Therefore, before Beeto was born, we aimed at the direction of "Middle East Internet is mature and high penetration rate, but little localization" and started to prepare the product focusing on "localization features".

![Localization appeal](https://static.apiseven.com/2022/06/blog/beeto-en1.png)

Beeto in the Middle East is actually benchmarked against feed stream applications like Twitter and Facebook, so a relatively complete framework was planned from the beginning in the deployment of the business architecture. For example, to meet the social attributes of relationship interaction, content consumption (graphics, live video, crosstown advertising, etc.), as well as financial and service categories of reward, cash withdrawal, voting and lottery, and other kinds of business, and even including the platform side of the regulation, content security audit and other requirements.

As we mentioned earlier, the maturity of the Internet in the Middle East market is bound to have high quality requirements for a product launch, so to effectively enter the Middle East market, it is not possible to make a simple functional application first and go live.

So the first version of Beeto's business structure is a complete, and in line with the mainstream social software should have a variety of features in one product. At the same time, Beeto's goal was clear: to become the largest Arabic social platform and the best Arabic community in the Middle East with "localized features".

## Pain points in architecture design

In order to go local, Beeto needs to meet the existing local social needs at the business level, but also needs to do some localization operations at the technical level, such as service deployment and data storage. Technical friends familiar with Weibo or Twitter should know that it takes dozens or even hundreds of architectural systems to collaborate behind such a huge information flow product.

### Monolithic Service

![Service division](https://static.apiseven.com/2022/06/blog/beeto-en2.png)

The current Beeto product's services can be divided into these categories. The implementation of these services actually needs to be deployed locally in the Middle East. If we split each business by service, each service is actually a separate monolithic architecture.

![monolithic architecture](https://static.apiseven.com/2022/blog/0614/beeto-en3.png)

The above diagram shows a very common deployment architecture. Take Beeto's feed stream service, if you want to realize the user browsing feed stream demand, you have to support public network access, i.e. north-south traffic access; at the same time, the feed stream service will also provide some internal calls in the form of similar topic business, i.e. east-west traffic calls. Therefore, the overall service property is to explicitly support both external and internal invocation modes, and user traffic is load balanced through seven layers and assigned to different servers before invoking different storage resources, similar to the east-west direction. The whole seven-tier cluster is responsible for handling north-south and east-west traffic, load balancing, security authentication and node monitoring.

When the services of multiple services are combined together, the overall architecture is formed as shown below.

![Overall architecture](https://static.apiseven.com/2022/blog/0614/beeto-en4.png)

As you can see, several services exist in both the adaptation layer, the business layer and the basic service layer. The deployment architecture of each service has the single architectural details mentioned earlier, so there are several seven-tier clusters in between, which is actually a very large and complex set of system architecture already.

But because the current Beeto product is still in the start-up phase, especially the product itself in the Middle East local landing, while the R & D staff in China situation, according to the above-mentioned scale deployment, need to invest very large server costs and maintenance costs. Also later as business increases, the number of individual services will inevitably increase, both in terms of cost and O&M operations will become more difficult to control.

### Difficulty in landing multiple services

In addition to the complexity of deploying the architecture mentioned above, the invocation between services within the cluster is actually very complex.

North-south traffic is dispersed across service pools, and east-west traffic is interspersed across services, with the invocation relationships between these services intertwined. For each set of services, these invocation relationships need to be maintained, resulting in unclear and unmanageable invocation chains.

![Technical stack differentiation](https://static.apiseven.com/2022/06/blog/beeto-5.png)

In addition to the complexity of the invocation relationship, there are also differences in the technology stack between each service. For example, in terms of invocation protocols, some services provide HTTP while others are RPC; and in terms of development languages, there is a mix of Java, Go, and other languages.

From these details, it can be seen that such a multi-service architecture system will obviously expose the problem of high deployment and maintenance costs when local implementation is carried out, while each set of seven layers of services requires investment in server costs, and the differences in the traffic of each service will lead to uneven traffic, resulting in low utilization of resources such as servers, resulting in a waste of resources.

Since the current cost of Beeto is focused on business upgrades and iterations, the architecture design is more inclined to facilitate maintenance and unified management, so how to achieve this goal?

## APISIX for Beeto architecture

In order to solve the pain point of inconvenient service management and high cost investment, and to benefit from the dynamic performance of APISIX with etcd which is more in line with Beeto's product requirements, APISIX was introduced as a gateway in the architecture deployment and a cluster of gateways was built, as shown in the figure below.

![New architecture](https://static.apiseven.com/2022/blog/0614/beeto-en6.png)

The gateway cluster provides extension tools such as registry, service control, service monitoring, protocol forwarding and application plugins for all services. The clusters of each service can be registered at the gateway in a unified manner, and new services up and down can all be done directly through the gateway.

![Cluster link](https://static.apiseven.com/2022/blog/0614/beeto-en7.png)

Also with the introduction of gateways, the call links for the entire cluster become very clear. North-south traffic is routed and forwarded by the gateway, while east-west traffic is forwarded by the gateway for services on the intranet. At the functional level, APISIX is responsible for unified maintenance of the authentication invoked by these traffic flows, so that the performance differences and traffic differences between the services are clearly understood at the gateway level.

To summarize, the introduction of APISIX gateways for architectural integration.

- Solved the problem of unified north-south and east-west traffic, saved resources and labor costs, and realized dynamic and unified management.
- The deployment architecture of business services focuses on the services themselves, thus realizing the independent existence of the gateway and business insensitivity.
- Through extension plugins, functions such as permission verification, route distribution and health check of each service are hosted by the gateway.
- New business go-live and service migration can be done dynamically, which is very friendly to operation and maintenance.

Of course, as the gateway carries all the traffic in this architecture, the number of services will increase later as the services continue to expand, and the maintenance cost of the gateway will then increase, and new response options will need to be considered. However, in the current context, this solution is still the optimal choice.

## Practices applying APISIX

Apache APISIX as a gateway can handle multiple policies such as security authentication, service forwarding, and health checks in a unified way at the gateway layer. Therefore, Beeto has done a lot of experimentation at the business practice level after the introduction of APISIX.

### Security: Authentication Plugin

#### North-South Traffic: Cookie

We talked earlier about the public network users' access traffic uniformly passing through the gateway. The authentication for public network users is based on user requests authenticated by cookies. When a user request arrives at the gateway carrying a cookie, it is authenticated at the gateway by an authentication plugin.

![Cookie handling process](https://static.apiseven.com/2022/blog/0614/beeto-en8.png)

As shown in the flowchart above, the plugin internally performs localization validation and then performs authentication verification of the remote service according to the policy. When the request completes the cookie verification, it is then forwarded to the specified service.

The advantages of doing so are mainly in two aspects.

- The information security of user cookies is ensured. Because cookies are sensitive data, the execution process ensures that only the gateway layer can receive and process them, and no other business layers can access them. Prevent security problems caused by inconsistent business processing rules, but also effectively avoid the human factor and irregularities caused by cookie leakage and other security issues.
- Reduce the complexity of each service cookie authentication. As mentioned above, cookies need to be verified locally or remotely in the process, and when cookies are upgraded, each service needs to be upgraded simultaneously. Through the gateway for unified management and verification, in the processing of business services to eliminate the cost of verification, only need to focus on the results, using the results of business rules processing, thus ensuring that each business processing more focused on the business itself.

#### East-West Traffic: Token

In the diagram below, Service A calls Service B. Generally speaking, it is only necessary to provide an API when calling each other. However, in the internal process, we need to understand "who called the API, how it was called, whether permission verification is required, and whether the researcher needs to be controlled", and so on, which need to be handled internally.

![Token handling process](https://static.apiseven.com/2022/blog/0614/beeto-en9.png)

With the APISIX gateway, the process becomes much simpler. All the internal service calls only need to register with the Auth Authentication Service, and each service is issued an App key, which is used to indicate the identity ID of the service. After the authentication is passed, the authentication mark will be passed to the invoked service, and the whole process will be unified for authentication registration and completion of mutual invocation.

Thanks to the Token rule of App key, the above operation is easy to trace the source of invocation, so as to carry out troubleshooting and permission control, and also play an effective control on illegal invocation.

So whether it is the authentication of north-south traffic or east-west traffic, the advantage of unified authentication is to ensure the security and uniformity of the cluster, and it is very helpful in problem identification and invocation control.

### Scalability: Stateless Service Scaling Migration

The overall deployment architecture of Beeto's clusters is based on APISIX gateway clusters - stateless service business service clusters - stateful service data center clusters from top to bottom. When deployed locally in the Middle East, they are deployed on major cloud clusters. According to the scale of cloud coverage in the Middle East and the cloud vendors in different regions, the expansion and migration of cloud services need to be considered when deploying the services.

In the process of migration, Beeto focused on the migration of stateless services. Because of the migration cost of the data center, it is not suitable to do dynamic adjustment; at the same time, most of the request pressure is carried by the stateless service, so it is very important to ensure that the stateless service has a good scalability premise.

![Migration process](https://static.apiseven.com/2022/blog/0614/beeto-en10.png)

In Beeto's architecture, service scalability is mainly reflected in two aspects, namely, individual service scalability and overall cluster scalability. For example, if a single service runs out of resources and needs to be scaled up, APISIX gateways can be used to dynamically add nodes to achieve the scaling. Similarly, in cross-cluster or cross-cloud situations, cluster scalability can be achieved by deploying multiple APISIX gateways and migrating different services to different gateway nodes.

For business services, the overall architecture remains unchanged, and dynamic scaling of individual services and service migration can be achieved at the gateway layer. The scheme and objectives of the whole process are clear, and once changes are involved, they do not cause instability of the overall architecture.

### Functional Extensibility: Business Dynamic Forwarding

In addition to these familiar gateway general scenarios, Apache APISIX also provides a great help to Beeto at the business dynamic forwarding level.

Those who are familiar with the UI and back-end of APP should know that different product pages are provided by different services. A page is made up of different modules, and the content of them is all sent from the interface. What module's data is sent down from the interface is rendered as what on the end. This is a joint client-side rendering specification, which aims to make the client-side rendering process more generic and the business processing more flexible.

For example, in the implementation of PageA above, the client calls the interface of Service A, sends the corresponding module data, and completes the rendering of PageA. This operation causes a problem, the client needs to maintain each page and interface to each service. If the content changes, it is necessary to make a release solution, which is not friendly in terms of operability and efficiency.

The main idea to solve the above problem is to realize the unified distribution of services in the overall architecture. That is, the client first unifies the request interface address, forwards all requests of this type to one interface, processes the request parameters and URL rules for the URL address at the gateway layer, and then introduces the distribution plugin. Finally, according to the configuration rules, the parsed requests are forwarded directly to the specified services at the gateway layer.

![Business dynamic forwarding](https://static.apiseven.com/2022/blog/0614/beeto-en12.png)

The client only needs to determine the rendering specification throughout the process and does not need to care about the source of the data. The gateway layer takes the responsibility of service distribution and forwards the traffic directly. Meanwhile, the plugin configuration file in APISIX can be dynamically updated in real time, and the forwarding rules can be dynamically adjusted, which is very flexible. In fact, for applications like BFF (Backend for Frontend) architecture, such requirements can be solved at the gateway layer.

## Summary

This article presents Beeto's design thinking and business-level application practices after the introduction of Apache APISIX gateway from Beeto's product design perspective. With the support of APISIX gateway, it helps Beeto to realize the scenario of localized deployment, unified management and friendly operation and maintenance in the Middle East, while controlling the resource cost and business product lines.
