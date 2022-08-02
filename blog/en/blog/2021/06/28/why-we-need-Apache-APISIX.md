---
title: Why do you need Apache APISIX when you have NGINX and Kong?
slug: 2021/06/28/why-we-need-apache-apisix
author: Yuansheng Wang
authorURL: "https://github.com/membphis"
authorImageURL: "https://avatars.githubusercontent.com/u/6814606?v=4"
keywords: 
- APISIX
- Kong
- Nginx
- API Gateway
- Open Source
- API Management
description: This article describes the history of the open source API Gateway Apache APISIX architecture's evolution and compares the advantages of the two frameworks, Apache APISIX and Nginx.
tags: [Ecosystem]
---

> This article describes the history of the open source API Gateway Apache APISIX architecture's evolution and compares the advantages of the two frameworks, Apache APISIX and Nginx.

<!--truncate-->

:::tip

For the latest articles, please see: [Why do you need Apache APISIX when you have NGINX and Kong?](https://apisix.apache.org/blog/2022/07/30/why-we-need-apache-apisix/)

:::

Hello everyone, I'm happy to share, "Why do you need Apache APISIX when you have NGINX and Kong."

We are doing a replacement project for NGINX and Kong because of the background of our backend architecture evolution. So I will start by sharing with you the backend architecture evolution process, which is very important.

![membphis](https://static.apiseven.com/202108/1646374573876-7643caae-1913-4569-a5c4-59c1f2ef7597.jpg)

First of all, I would like to introduce myself. My name is Yuansheng Wang. I wrote an e-book called "OpenResty Best Practices" in 2015 and formed a community of over 10,000 people through this book. Since then, I have become increasingly interested in the open-source itself. Before 2015, I was mainly a user of open-source software, then slowly became a community co-organizer, and then later became a community leader.

![api7.ai](https://static.apiseven.com/202108/1646299683035-0e3b8a0b-0c7f-4321-b28c-813ff7de3dd1.jpg)

I've been a teacher and, eventually, a community leader. In 2019, my partner Ming Wen and I founded API7.ai Inc, an open source-based company. This company carries a lot of unique ideas for both of us, and we can also say that we are doing the ideals of every ordinary programmer, not wanting to be mediocre 996. I often tell others that my dream is to "engrave my name into the history books," but the sad thing is that human beings no longer need history books.

![api7.ai team](https://static.apiseven.com/202108/1646300062135-77ba46a0-f819-4d23-b432-34b072769b09.jpg)

This is our team, we mainly collaborate remotely, and it's harder to get everyone together. When there were only five or six people in the early stages of the company, it was relatively easy to get the team together, but it hasn't been together since this year, and this is the most together we've had so far this year (but there are still a few students who didn't make it together).

As a technology-driven company, technology has a big say there, and respect for technology starts with respect for technical talents. So there is no 996, no punching in and out, remote office, welcome to contact us, look forward to dreaming and ideal you to join our company.

![APISIX architecture](https://static.apiseven.com/202108/1646300168459-f161d6d8-6407-4a4c-ac4a-45e8c6896e4e.jpg)

The topic of this talk needs some background, so let's start with the history of backend architecture evolution. First, let's review this diagram, the right part from top to bottom is not a specific data flow diagram. Instead, it is the history of our backend architecture evolution. Spring Cloud architecture mainly serves JAVA language developers. Kubernetes is a container orchestration to support any language and the recent community hot topic service grid.

I often ask colleagues, let's look at the next five years, or even ten years later, which architecture is the ultimate solution? From the current information, the service mesh will probably win. Even if it has many problems, I believe we could solve them.

![APISIX architecture](https://static.apiseven.com/202108/1646300313346-409ada0c-b015-49e2-8b14-0f314a33d853.jpg)

At the beginning of the venture, it was exciting to go through this diagram in my head. We were able to see that as we gradually iterated on the backend architecture, we introduced a variety of different components. For example, when we got to SOA, a service-oriented architecture, we introduced reverse proxy components, usually NGINX and HAProxy. When we iterated to microservice architecture, we usually chose some more modern API gateway products, such as Kong and Traefik. Of course, some users would continue to use NGINX because of their regular habits. Although it has weaknesses and inconveniences, it is stable and reliable. On a side note, from a global market share perspective, NGINX became the most dominant Web Server in April 2019.

As the backend architecture continues to iterate and enters the Kubernetes era, the traffic portal Ingress will use the official Kubernetes Ingress by default, based on the NGINX local configuration file. Some companies in China are also using Traefik as Ingress, which has a lot to do with the large base of Golang developers in China.

Let's look at the left side of the more interesting JAVA. Spring Cloud's built-in API gateway has experienced Zuul and Zuul2, which are still not good: in performance and architecture, so Spring Cloud officially launched a new project, Spring Cloud Gateway, the final formation of the family bucket solution.

Finally, the service mesh has formed a choice Istio (CP) and Envoy (DP) in the bottom right part of the service mesh. Later we see the Alibaba open-source MOSN, in a nutshell: the Golang version of Envoy.

![APISIX architecture](https://static.apiseven.com/202108/1646300450364-7318620a-0876-472e-8d7b-880c0f4a7ac2.jpg)

Reviewing the previous architecture evolution diagram, I believe you have found out where the problem is. From top to bottom, from left to right, for different scenarios, we finally "reasonably" introduced various components to solve our problems, the architect's rule of survival: choose the most suitable at the moment.

When we have few tools, we always compromise between functionality, dynamics, performance, etc. Although we have long been accustomed to and even numb to the rapid development of IT technology, are they still the most appropriate solution today?

![Nginx](https://static.apiseven.com/202108/1646300822188-c239210d-ee4c-4025-a2a5-9e40da1e7863.jpg)

As you can see, these are NGINX drawbacks, such as NGINX's low activity community:

- The NGINX repository in Github is only a mirror.
- The GitHub Issue feature is disabled.
- It is impossible to submit an issue.
- The official team will not merge even if you submit a PR.

In addition, NGINX is weak in its routing. For example, if I want to do a canary release based on a request parameter such as id, you will find that NGINX is entirely unable to achieve it. So we can see a lot of small open-source projects. As long as the above canary release scenario is solved, it can be an independent open source project. In addition, gRPC calls are becoming increasingly popular in microservice calls, but NGINX support for it is only "simple to use."

Finally, almost every Internet vendor has its own NGINX configuration system team for the NGINX cluster management. Although the system is similar, there is no unified solution. More than a decade has been blank.

[Kong](https://static.apiseven.com/202108/1646300936515-b20593d2-db75-49f1-869b-a0d5bc757eba.jpg)

Before talking further about Kong, I would like to share with you what cloud-native is. This word has existed for a long time, but there has been no unified and clear definition until now. I synthesize several cloud vendors' descriptions and outline two main cloud-native features: first, it should support containers, and second, it should support flexible and scalable deployment. I think Kong does not fully meet the second. For example, the official central PostgreSQL relational database is a single point that can not help flexible expansion and capacity contraction, making its architecture selection hard.

The architecture is hard to choose.

![Nginx Kong](https://static.apiseven.com/202108/1646300936518-a8927896-8353-4aed-9e8d-c1055d398a5c.jpg)

Finally, here is a summary of the problems with NGINX and Kong.

- NGINX and Kong both have different application scenarios.
- NGINX lacks an official cluster management solution.
- Kong's control plane is not entirely cloud-native architecture.

Before introducing the open-source API Gateway Apache APISIX, we must thank the two products above for thinking on the shoulders of giants, giving us a higher starting point from the beginning.

![APISIX architecture](https://static.apiseven.com/202108/20210625011.png)

The left and right of this diagram are DP (Data Plane) and CP (Control Plane), the same as the familiar backend service system. APISIX did not try to build something new by itself from the first day of the architecture, so we chose the most mature etcd for the configuration center.

In this architecture, you can't find a single point. Therefore, any abnormal downtime of any of the services here will not affect APISIX's ability to provide services to the public. Furthermore, when every point in the overall architecture supports high availability, the high stability of the user's production system is effortless.

![APISIX eco](https://static.apiseven.com/202108/20210625012.png)

The above picture is a diagram of the APISIX Ecosystem, from which you can see what currently supports peripheral ecologies. On the left side are the supported protocols. You can see the standard Layer 7 protocols such as HTTP(S), HTTP2, Dubbo, QUIC, IoT protocol MQTT, and the Layer 4 protocols such as TCP/UDP. On the right are some open source or SaaS services such as Apache SkyWalking, Prometheus, HashiCorp Vault, etc. Below are some common OS environments, cloud vendors, and hardware environments. As a global company, we also support richer platforms such as ARM64.

![APISIX Advantages](https://static.apiseven.com/202108/1646300936527-193b1d17-db08-424f-b382-12a75eadbb6e.jpg)

To give you a brief report on the current state of APISIX, APISIX has become the most active open-source API gateway project in the world in the two years since it became open source, and this state has been going on for more than a year. Remember the bottom sentence, APISIX has been **production available, with better features, performance, and architecture across the board than Kong**. In September 2019, Ke Holdings Inc already used the API Management Platform APISIX project in production environments.

![APISIX Community](https://static.apiseven.com/202108/1646318520391-a44d3d7f-221a-4f42-81ec-1d14be6f85dc.png)

According to this Contributor Over Time graph, the horizontal coordinate is the timeline, and the vertical coordinate is the total number of contributors. We can see that APISIX and Kong are two relatively more active projects. APISIX has been growing at a phenomenal rate since the first day of open source and is growing at nearly twice the rate of Kong, which shows how popular APISIX is. Of course, there are many other ways to evaluate the activity of a project, such as checking monthly active issues, PR totals, etc. I'm happy to say that APISIX is still number one in terms of activity in these ways.

[APISIX Advantages](https://static.apiseven.com/202108/1646300936531-618d6784-b8a6-4dbd-ae46-3d62b6ccabe2.jpg)

After our actual customer visits, the feature of supporting multiple languages is essential. After all, many companies have their standard technology stacks, and many are blank for NGINX C and Lua. APISIX officially supported multiple languages a few days ago, currently supports Java, and will gradually support Golang, Rust, NodeJS, and other languages.

APISIX's entire dynamic and high performance are inseparable from the surrounding ecology's high quality. Other peripheral libraries, such as jsonschema, ipmatcher, etc., are better than open-source API Gateways.

![APISIX arch](https://static.apiseven.com/202108/1646300936534-5d24d9f4-8578-4ae1-ba14-1be1cd37782c.jpg)

APISIX support for multi-language features has been put into the open-source project. Interested users are welcome to follow and participate at any time. The advantage of this implementation is that it is simple and universal, and everyone can natively use their familiar language.

![Apache APISIX](https://static.apiseven.com/202108/1646300936543-e4e862ae-b896-407c-b71c-9fb12cd1ff86.jpg)

After this talk, what are the advantages of APISIX for you? See the image above.

I think the first three (foundation project, security, stability) are the most important. As a foundation project, it no longer belongs to a person or a company but is the property of all humankind, and we can use it forever. The security and stability of APISIX are due to its cornerstone, NGINX, which has become the most popular and widely used web server, and its heritage is still awe-inspiring.

High performance, dynamics, and an active community are the trump cards of APISIX, and they have formed a healthy interaction.

If one sentence sums up the pride of APISIX, I think it is:**APISIX, the most active API gateway project in the world**. With this consensus, we tilt more resources to the community, and we believe the community will make APISIX grow soundly and healthily.

![APISIX goal](https://static.apiseven.com/202108/1646300936545-46e9d399-f5cf-4a11-8622-c1b9529e2649.jpg)

The APISIX goal: **Unified Proxy Infrastructure**.

You may be wondering if APISIX is going to support so many scenarios. Here I will explain briefly that the core of APISIX is a high-performance proxy service that does not bind any environment properties. When it evolves into Ingress, Service Mesh, etc., it is the external service that works with APISIX and the external program that changes rather than APISIX itself. And we will explain how APISIX supports these scenarios step by step.

![API gateway](https://static.apiseven.com/202108/1646301506774-7af6d29e-b723-41f0-8275-38539d30aed9.jpg)

For traditional LB and API Gateway scenarios, APISIX has the advantage of going from static to all dynamic, with no more reloads, as many tech companies start with a half-hour NGINX reload. The aforementioned canary release scenario of modulating based on request-id can be quickly done in APISIX using fine-grained routing.

![API gateway](https://static.apiseven.com/202108/1646300936549-4b27533d-1a2e-4d65-8c70-470807493d95.jpg)

![APISIX Ingress Controller](https://static.apiseven.com/202108/1646300936551-b463c6b9-7def-432d-b4a4-0bf26de28b38.jpg)

APISIX Ingress Controller solves all the problems mentioned above and inherits all the advantages of APISIX, in addition to supporting native K8s CRD for easy migration.

![service mesh](https://static.apiseven.com/202108/1646300936553-041cdf4e-c918-4e90-804f-c5f31b2a309e.jpg)

Service mesh, it is necessary to talk to you about it. What is the most likely mainstream server-side architecture in the next five or ten years? I would choose the service mesh.

![APISIX Mesh](https://static.apiseven.com/202108/1646311189556-00b1c555-9dad-4513-84fb-736fbc7e6761.jpg)

The diagram on the right shows the internal architecture of APISIX Mesh.

![APISIX goal](https://static.apiseven.com/202108/1646300936556-fb75e4af-8880-4aa4-a3a1-54914d3c7b3c.jpg)

After talking so much about the present of APISIX, let's also talk about the future of APISIX.

Because APISIX is an Apache Foundation project, it is no longer the property of individuals or companies but all humanity. This gives everyone in the community the right to decide which direction it will go.

The default configuration center for the open-source version of APISIX is etcd. While it is still the best choice, we often hear about support for other configuration centers when talking to users because etcd is so new that it is not on the list of supported products in the company's existing operations and maintenance products. So we plan to make APISIX work with other configuration centers.

![APISIX data plane](https://static.apiseven.com/202108/1646311124305-eebfd917-43b7-459a-99f8-150f33336d91.jpg)

APISIX is already on the road to the full traffic data plane, and I believe we all ask questions such as: Why do we need to unify traffic forwarding? Does unification bring value to the enterprise? What are the benefits to the technical staff? With these questions in mind, let's look at the following diagram.

![APISIX goal](https://static.apiseven.com/202108/1646311097068-1c54852d-1272-434e-86c6-ed946e875792.jpg)

Unification itself is not the goal, but the benefits after unification are the logic behind our pursuit, and several different perspectives are given below to elaborate separately.

- Operation and maintenance role: use the same operation and maintenance tools to collect logs, metrics, etc., and reuse existing accumulations.

- Development role: based on standardized APISIX plugin development, the capabilities can be easily reused, and the accumulated experience can be applied to different product lines such as LB, API Gateway, K8s Ingress, etc.

- Company value: Unify technology stack, reduce company operation cost, reduce the difficulty of transitioning to microservices and cloud-native, and accelerate enterprise digital transformation.

Last but not least is the APISIX [Slack channel](https://apisix.apache.org/docs/general/join#join-the-slack-channel), any questions can be left here, or on [Github issue](https://github.com/apache/apisix/issues), there will be someone to respond quickly, thanks again.

Click [here](https://www.bilibili.com/video/BV1w54y1V73Z) to watch the recording video.
