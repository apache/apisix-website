---
title: Why would you choose Apache APISIX instead of NGINX or Kong?
slug: 2021/06/28/why-we-need-apache-apisix
author: Yuansheng Wang
authorURL: "https://github.com/membphis"
authorImageURL: "https://avatars.githubusercontent.com/u/6814606?v=4"
keywords:
- APISIX
- Kong
- NGINX
- API Gateway
- Open Source
- API Management
description: Many companies used to use NGINX or Kong as their API gateway but switched to Apache APISIX now. As an Open Source API Gateway, Apache APISIX solves a lot of pain points for businesses.
tags: [Ecosystem]
image: https://static.apiseven.com/2022/10/08/634113b21a4aa.png
---

> This article describes the history of the open source API Gateway Apache APISIX architecture's evolution and compares the advantages of the two frameworks, Apache APISIX and NGINX.

<!--truncate-->

API gateway is an important infrastructure component in the cloud-native era. There are two common criteria to evaluate an API gateway: how dynamic it is, and how mature its observability is. Many companies used to use NGINX or Kong as their API gateway, but then later switched to Apache APISIX. As an API gateway born for the cloud-native era, Apache APISIX indeed solves a lot of pain points for businesses in various dimensions. Now you might wonder, why?

## NGINX and Kong's Limitations

In the era of monolithic services, NGINX can handle most scenarios. While in the cloud-native era, NGINX has two shortcomings due to its architecture:

- NGINX does not support cluster management. Almost every company has its own NGINX configuration management system. Although the systems are similar, there is no unified solution.
- NGINX does not support hot reloading of configurations. If the user modifies the configuration of NGINX, it will be necessary to reload NGINX. Also, in Kubernetes, the services will change frequently. So if NGINX is used to handle the traffic, you must restart the service often, which is unacceptable for enterprises.

Kong solves the shortcomings of NGINX but brings new limitations:

- Kong needs to rely on a PostgreSQL or Cassandra database, which makes Kong's entire architecture very bloated and would bring a high availability limitation to the enterprise. If the database fails, the whole API Gateway fails.
- Kong's routing uses traversal search. When there are more than a thousand routes in the gateway, its performance will dramatically drop.

The APISIX resolves all the above limitations and becomes the best API gateway in the cloud-native era.

## Advantages of Apache APISIX

### Well designed architecture

First, Apache APISIX has an excellent architecture. Cloud-native, as the current technology trend, will change the technical architecture of traditional enterprises. Many applications are migrating to microservices and containerization. APISIX has followed the technology trend since its inception:

![image](https://static.apiseven.com/2022/10/03/633a40c31bfe9.png)

As shown in the figure above, the left and right are the Data Plane and the Control Plane of APISIX:

- Data Plane: Based on NGINX's network library (without using NGINX's route matching, static configuration, and C modules), it uses Lua and NGINX to dynamically control request traffic;
- Control Plane: Administrators can operate etcd through the built-in RESTful API. With the help of the etcd's Watch mechanism, APISIX can synchronize the configuration to each node within milliseconds.

For updating data, Kong uses the database polling method; it may take 5-10 seconds to get the latest configuration, while APISIX achieves the same by monitoring etcd configuration changes, which can control the time in milliseconds.

Since both APISIX and etcd support multi-instance deployment, there is no single point of failure.

### Rich ecosystem

The following figure shows the ecosystem map of APISIX. From this figure, we can see that APISIX supports L7 protocols including HTTP(S), HTTP2, Dubbo, IoT protocol MQTT, etc. In addition, APISIX supports L4 protocols such as TCP/UDP.

The right part of the figure contains some open-source or SaaS services, such as Apache SkyWalking, Prometheus, HashiCorp Vault, etc. At the bottom of the figure are the more common operating system environments, cloud vendors, and hardware environments. As an open-source software, APISIX can also be run on ARM64 servers.

![image](https://static.apiseven.com/2022/10/03/633a40c2e47c3.png)

APISIX supports not only many protocols and operating systems but also supports [multi-language programming plugins](https://apisix.apache.org/docs/). When it first came out, APISIX only supported using the Lua language to write plugins. In this case, developers need to master the technology stack related to Lua and NGINX. However, Lua and NGINX are relatively niche technologies familiar to few developers. Therefore, we have then enabled plugin development on APISIX with multiple languages, and have officially supported languages such as [Java](https://apisix.apache.org/docs/java-plugin-runner/development/), [Golang](https://apisix.apache.org/docs/go-plugin-runner/getting-started/), Node.js, and [Python](https://apisix.apache.org/docs/python-plugin-runner/getting-started/).

![image](https://static.apiseven.com/2022/10/03/633a3fc3ebe67.png)

### Active community

The figure below is the contributor growth curve, where the horizontal axis represents the timeline, and the vertical axis represents the total number of contributors. We can see that the two projects, Apache APISIX and Kong, are relatively more active. Apache APISIX has maintained an excellent growth rate from the first day and is growing rapidly at a rate close to twice that of Kong. As of July 2022, the number of contributors to APISIX has exceeded Kong, which shows the popularity of APISIX. Of course, there are many other ways to evaluate the activity of a project, such as the monthly active issues, the total number of PRs, etc. The good news is that APISIX is also unrivaled in these aspects.

![image](https://static.apiseven.com/2022/10/03/633a3fc6ef2f7.png)

## Unified proxy infrastructure

From the figure below, I believe you have already understood the goal of APISIX: unifying the proxy infrastructure.

![image](https://static.apiseven.com/2022/10/03/633a40c31027f.png)

Because the core of APISIX is a high-performance proxy service, it does not bind any environment properties. Therefore, when it evolves into products such as Ingress and Service Mesh, you don't have to change the internal structure of APISIX. The following will introduce to you step-by-step how APISIX supports these scenarios.

### Load balance and API gateway

The first is for traditional LB and API gateway scenarios. Because APISIX is implemented based on NGINX + LuaJIT, it has high-performance and security features, and supports the dynamically loading of an SSL certificate, SSL handshake optimization, and other functions. In terms of load balancing, APISIX also performs better. Switching from NGINX to APISIX will not degrade performance but rather improve management efficiency brought about by features such as unified management.

### Microservice Gateway

APISIX allows you to write extension plugins in multiple languages, which can solve the main problem faced by east-west microservice API gateways - how to manage in a unified way in heterogeneous environments. APISIX also supports service discovery like Nacos, etcd and Eureka, and standard DNS methods, which can completely replace microservice API gateways such as Zuul, Spring Cloud Gateway, and Dubbo.

### Kubernetes Ingress

Currently, the official Kubernetes Ingress Controller project of K8s is mainly developed based on the NGINX configuration file, so it is slightly insufficient in routing capability and loading mode and has some obvious limitations. For example, when adding or modifying any API, you need to restart the service to complete the update of the new NGINX configuration. Restarting the service has a great impact on online traffic.

The [APISIX Ingress Controller](https://apisix.apache.org/docs/ingress-controller/getting-started/) perfectly resolves all the limitations mentioned above: it supports fully hot reloading. At the same time, it inherits all the advantages of APISIX and also supports native Kubernetes CRD, which is convenient for users to migrate.

![image](https://static.apiseven.com/2022/10/03/633a3fc73575c.png)

### Service mesh

In the next five to ten years, the service mesh architecture based on the cloud-native model will begin to emerge. APISIX has also started to lock the track in advance. After abundant research and technical analysis, APISIX has supported the xDS protocol. APISIX Mesh was born, and APISIX also has a place in the field of service mesh.

![image](https://static.apiseven.com/2022/10/03/633a3fc7373ff.png)

## Summary

It has been three years since the first day Apache APISIX was open-sourced. The highly active community and [case studies](https://apisix.apache.org/blog/tags/case-studies/) have proved that APISIX is the perfect API gateway in the cloud-native era. By reading this article, I believe you have a more comprehensive understanding of APISIX.

If you have any questions, you can leave a message in [GitHub issue](https://github.com/apache/apisix/issues); community contributors will respond quickly; of course, you can also join the APISIX Slack channel and mailing list; please refer to [Join Us](https://apisix.apache.org/docs/general/join/).
