---
title: Why do you need Apache APISIX when you have NGINX and Kong?
author: "Fei Han"
authorURL: "https://github.com/hf400159"
authorImageURL: "https://github.com/hf400159.png"
keywords: 
- APISIX
- API Gateway
- Kong
- Nginx
- Open Source
- API Management
description: This article introduces how the cloud native API gateway Apache APISIX solves the business pain points and usage scenarios brought by Nginx and Kong.
tags: [Case Studies]
image: https://static.apiseven.com/2022/11/07/636916ea65769.png
---

> This article describes the history of the open source API Gateway Apache APISIX architecture's evolution and compares the advantages of the two frameworks, Apache APISIX and Nginx.

<!--truncate-->

In the cloud-native era, dynamic capability and observability have become the standards for measuring API gateways. Apache APISIX has been following in the footsteps of cloud-native since its inception. However, as a new-generation API gateway that was born just three years ago, why can Apache APISIX stand out from NGINX, which has been born for more than 20 years, and Kong, which has been open source for 8 years, and become the most popular and active gateway in the cloud-native era? The most important reason is that it solves the pain points of developers and enterprises in using NGINX and Kong.

## NGINX and Kong's Disadvantages

In the era of monolithic services, NGINX can handle most scenarios, but in the cloud-native era, NGINX has two problems due to its architecture:

- First, NGINX does not support cluster management. Almost every Internet manufacturer has its own NGINX configuration management system, and there is no unified solution.
- The second is that NGINX does not support hot reloading of configurations. If a company modifies the configuration of NGINX, it can take more than half an hour to reload NGINX. And under the Kubernetes system, the upstream will change frequently. If NGINX is used, the service needs to be restarted frequently, which is unacceptable for enterprises.

The emergence of Kong solves the shortcomings of NGINX, but brings new problems:

- Kong needs to rely on PostgreSQL or Cassandra database, which makes Kong's entire architecture very bloated and will bring a high availability problem to the enterprise. If the database fails, the entire API Gateway fails.
- Kong's routing uses traversal lookup. When there are more than a thousand routes in the gateway, its performance will drop dramatically.

The emergence of APISIX solves all the above problems and becomes the most perfect API gateway in the cloud-native era. So what exactly are the advantages of Apache APISIX? Why can it become the most active API gateway in the world in just three years?

## Advantages of Apache APISIX

### Excellent architecture

First, Apache APISIX has excellent architecture, and many applications are now migrating to microservices and containerization, forming a new cloud-native era. Cloud-native, as the current technology trend, will rewrite the technical architecture of traditional enterprises. And APISIX has followed the technology trend since its inception and designed it as cloud-native architecture:

![APISIX](https://static.apiseven.com/2022/blog/0729/1.png)

As shown in the figure above, the left and right are the Data Plane and the Control Plane of APISIX:

- Data Plane: Based on NGINX's network library (without using NGINX's route matching, static configuration, and C modules), use Lua and NGINX to dynamically control request traffic;
- Control Plane: use etcd to store and synchronize gateway configuration data, administrators can notify all data plane nodes in milliseconds through Admin API or Dashboard.

When updating data, Kong uses the polling method of the database, but it may take 5-10 seconds to obtain the latest configuration; while APISIX uses the method of monitoring etcd configuration changes, which can control the time in milliseconds.

Since both APISIX and etcd support multi-point deployment, in the current architecture of APISIX, any unexpected downtime of any service will not affect the ability of APISIX to provide services accurately.

### Perfect ecosystem

The following figure shows the ecological map of APISIX. From this figure, we can accurately see that the L7 protocols that APISIX already supports include HTTP(S), HTTP2, Dubbo and IoT protocol MQTT, etc. The L4 protocol includes TCP/UDP.

The right part is some open source or SaaS services, such as SkyWalking, Prometheus, Vault, etc. At the bottom are the more common operating system environments, cloud vendors, and hardware environments. As open source software, APISIX also supports running on ARM64 servers.

![APISIX's Ecosystem](https://static.apiseven.com/2022/blog/0729/2.PNG)

APISIX not only supports many protocols and operating systems, but also supports multi-language programming plug-ins. When it first came out, APISIX only supported the use of the Lua language to write plug-ins. In this case, developers need to master the technology stack related to Lua and NGINX. However, Lua and NGINX are relatively niche technologies with few developers. Therefore, we have supported multi-language development plug-ins on APISIX, and have officially supported languages such as Java, Golang, Node.js, and Python.

![programming language](https://static.apiseven.com/2022/blog/0729/3.png)

### Active community

The figure below is the contributor growth curve, where the horizontal axis represents the timeline and the vertical axis represents the total number of contributors. We can see that the two projects, Apache APISIX and Kong, are relatively more active. Apache APISIX has maintained a very good growth rate from the first day, and is growing rapidly at a rate close to twice that of Kong, and the number of contributors has exceeded Kong, which shows the popularity of APISIX. Of course, there are many other ways to evaluate the activity of a project, such as checking the monthly active issues, the total number of PRs, etc. The good news is that APISIX is also unrivaled in these aspects.

![Contributor graph](https://static.apiseven.com/2022/blog/0729/4.png)

## APISIX Application Scenario

From the figure below, I believe you have already seen the goal of APISIX: **unified proxy infrastructure**.

![APISIX Application scenarios](https://static.apiseven.com/2022/blog/0729/5.png)

You may have questions: APISIX has to support so many scenarios, will APISIX become different?

Because the core of APISIX is a high-performance proxy service, it does not bind any environment properties. When it evolves into products such as Ingress, service mesh, etc., all external services cooperate with APISIX, and it is the external program that changes rather than APISIX itself. The following will introduce to you step-by-step how APISIX supports these scenarios.

### Load Balancer and API Gateway

The first is for traditional LB and API gateway scenarios. Because APISIX is implemented based on NGINX + LuaJIT, it has features such as high performance and security, and also supports dynamic SSL certificate offloading, SSL handshake optimization and other functions. In terms of load balancing service capabilities, it also performs better. Switching from NGINX to APISIX will not degrade performance, but also enjoy the improved management efficiency brought about by features such as dynamic and unified management.

### Microservice Gateway

APISIX currently supports the writing of extension plug-ins in multiple languages, which can solve the main problems faced by east-west microservice API gateways - heterogeneous multi-language and general problems. The built-in supported service registries include Nacos, etcd, Eureka, etc., as well as the standard DNS method, which can smoothly replace the microservice API gateways such as Zuul, Spring Cloud Gateway, and Dubbo.

### Kubernetes Ingress

At present, the official Kubernetes Ingress Controller project of K8s is mainly based on the NGINX configuration file method, so it is slightly insufficient in routing capability and loading mode and has some obvious disadvantages. For example, when adding or modifying any API, you need to restart the service to complete the update of the new NGINX configuration, but the restart of the service has a great impact on the online traffic.

The [APISIX Ingress Controller](https://apisix.apache.org/zh/docs/ingress-controller/getting-started/) perfectly solves all the problems mentioned above: it supports full dynamics and does not need to restart loading. At the same time, it inherits all the advantages of APISIX and also supports native Kubernetes CRD, which is convenient for users to migrate.

![APISIX Kubernetes Ingress](https://static.apiseven.com/2022/blog/0729/6.png)

### Service mesh

In the next five to ten years, the service mesh architecture based on the cloud-native model architecture will begin to emerge. APISIX also started to lock the track in advance. After research and technical analysis, APISIX has supported the xDS protocol, and APISIX Mesh was born, and APISIX also has a place in the field of service mesh.

![APISXI Mesh](https://static.apiseven.com/2022/blog/0729/7.png)

## Summary

It has been three years since the first day when Apache APISIX was open-sourced. The highly active community and actual user cases have proved that APISIX is the most perfect API gateway in the cloud-native era. By reading this article, I believe you have a more comprehensive understanding of APISIX and look forward to using APISIX as your API gateway in a production environment.

If you have any questions, you can leave a message in [Github issue](https://github.com/apache/apisix/issues), community contributors will respond quickly, of course, you can also join the APISIX Slack channel and mailing list, Please refer to [Join Us](https://apisix.apache.org/docs/general/join/).
