---
title: "Hyperchain Technology implements BaaS platform with APISIX"
slug: 2021/08/09/apache-apisix-in-quliankeji
author: "Weifeng Sheng"
keywords: 
- APISIX
- Kong
- Nginx
- Hyperchain
- BaaS
description: This article introduces the implementation of cloud-native API gateway Apache APISIX in the Hyperchain Blockchain BaaS platform, and the reasons for choosing Apache APISIX.
tags: [Case Studies]
image: https://static.apiseven.com/2022/blog/0817/%E8%B6%A3%E9%93%BE%E7%A7%91%E6%8A%80.png
---

> This article introduces the landing practice of Apache APISIX in Hyperchain Blockchain BaaS platform, and explains why Hyperchain Technology has chosen Apache APISIX among many gateway applications.

<!--truncate-->

## Background Information

BaaS, which is also known as “Blockchain as a Service”, is an open platform that embeds blockchain framework into cloud computing platform and provides convenient and high performance blockchain ecological environment and ecological support services for developers by taking advantage of the deployment and management of cloud service infrastructure to support their business expansion and operation. It is an open blockchain platform that supports developers’ business expansion and operation support.

Typically, a complete BaaS solution includes four main components: device access, access control, service monitoring and blockchain platform.

![BaaS introduction](https://static.apiseven.com/202108/1646723437500-89897c8a-7912-49d3-bea9-1f21e3e6e0d7.001)

**We can build blockchain network quickly and flexibly through BaaS. For enterprises, with BaaS platform, we can manage blockchain business in a unified way.**

I believe that many of you have come across the contract code on top of Ethernet. Through BaaS platform, we can easily write smart contracts on the IDE and then deploy it to our created blockchain network, and finally for the upper layer services to call the blockchain-related contracts to carry out the flow of business.

Because the chain has so many nodes, from tens to thousands, it is difficult to monitor and maintain the operation of the chain without the support of BaaS platform. By using BaaS platform, users can not only save cost, but also manage the blockchain more conveniently and the security of the whole system is higher.

The architecture of BaaS product of Hyperchain Technology is divided into four layers in total, which are resource layer, blockchain underlying layer, blockchain service layer and application layer.

![Hyperchain BaaS Architecture](https://static.apiseven.com/202108/1646723539486-3d0d42a2-217e-420d-8e6f-22eb4b37d464.002)

Now that we have a preliminary understanding of Baas platform, let’s take a look at the usage scenarios and gains of Apache APISIX on BaaS system.

## Apache APISIX Usage Scenarios and Gains

### Scenario 1: Practice on BaaS system

![Apache APISIX applied on BaaS system](https://static.apiseven.com/202108/1646814465109-4ec35266-ce3f-4547-bab7-d75edd332e0c.003)

The architecture of Hyperchain’s BaaS platform is not only microservices-based, but also divided into two layers, which are business access layer and core service layer.

BFF (Backend For Frontend) is generally to the frontend, through HTTP access. The core services are generally registered through services like Dubbo, ETCD, etc., and finally accessed using gRPC.

The role of BFF is to do business aggregation, format adaptation, and give the final result data to the frontend.

These business modules need to store the relevant information in the registry (ETCD), and then read out the information through the gateway module when it is used.

![Hyperchain BaaS Platform Workflow](https://static.apiseven.com/202108/1646814465106-81be15cb-aabf-4240-a98b-e2cd6b8bc5ad.003_1)

In the whole process, we mainly use four features of Apache APISIX.

- Routing and Forwarding
- Traffic Control
- Security and Access Control
- Dynamic Loading

Let’s learn more about how these features are used on the Hyperchain BaaS system below.

#### Routing and Forwarding

![Apache APISIX Proxy-rewrite Routing and Forwarding](https://static.apiseven.com/202108/1646723635425-8adc8c53-5a00-4457-9ac7-0b8f55308d27.004)

Hyperchain uses the official Proxy-rewrite plugin provided by Apache APISIX to perform route forwarding services.

When a request accesses port 8080, through the Proxy-rewrite plugin, the request will be accessed to the API of the corresponding service.

![Apache APISIX Proxy-rewrite Routing and Forwarding 2](https://static.apiseven.com/202108/1646723635426-c5de189b-e934-4395-b671-f0d161fa8c19.005)

The above figure shows the interface of Proxy-rewrite, we can see that you can match your own forwarding rules by regular matching, of course, you can also write HOST or by URL to match.

#### Traffic Control

Before Apache APISIX, the platform needed to write its own logic code. With Apache APISIX, we can directly use the officially provided Limit-req plugin to limit the input and output for the purpose of protecting the system.

Through the interface of the Limit-req plugin, we can easily configure parameters such as speed, bucket height, etc.

![Apache APISIX Traffic Control](https://static.apiseven.com/202108/1646723635427-0550eac8-a4dd-40c9-99f8-8ec42646fd2a.006)

In the Hyperchain BaaS platform, customers can build any chains according to their needs. At this point, the BaaS platform needs to quickly support the creation of these chains and manage their lifecycle.

The creation of these federated chains is not solved by hard code written directly on the code, but by driver components. In a privatization scenario, we need to have such driver components to provide support quickly and need to control the frequency of access to the driver processes.

![Apache APISIX Traffic Control 2](https://static.apiseven.com/202108/1646723635428-5473b0db-b7f9-4bfa-b91c-063d68a6ed60.007)

Before Apache APISIX, the platform needed to write its own logic code. With Apache APISIX, we can directly use the officially provided Limit-req plugin to limit the input and output for the purpose of protecting the system. Through the interface of the Limit-req plugin, we can easily configure parameters such as speed, bucket height, etc.

![Apache APISIX Traffic Control 3](https://static.apiseven.com/202108/1646723635429-36f04fcf-0596-43b1-9147-af79c2786ba2.008)

#### Security and Access Control

![Apache APISIX Security and Access Control](https://static.apiseven.com/202108/1646723635429-554b8e0f-8be8-4828-91cf-cc4784d30558.009)

In Hyperchain’s privatization scenario, many users don’t like to use the account system provided by the platform and ask the platform to connect to their existing account system, so Hyperchain uses Apache APISIX’s Access-Auth plugin to adapt the third-party authentication service address with it.

![Apache APISIX Security and Access Control 2](https://static.apiseven.com/202108/1646723635430-e5e6d1ad-79c5-4a4e-b82b-2803794bc7d0.010)

In Baas platform, all web requests will go through Apache APISIX’s Access-Auth plugin, complete cookie parsing and authentication, then carry user information in HEAD header and pass to back-end microservices to process business. The advantage of this is that the developer of the microservice does not need to parse the cookie, but can send the user information to the microservice module directly, which is very convenient.

#### Dynamic Loading

![Apache APISIX Dynamic Loading](https://static.apiseven.com/202108/1646723635431-1a0f5d29-2643-4d72-8ec7-265ea181bc47.011)

The client interface of Baas platform of Hyperchain does not have a “store” button on top; however, there is a “store” button on the public platform of Baas of Hyperchain. In some privatization scenarios, the “store” button is not needed, but the backend services of both are shared, and the platform interface will be displayed differently according to the demand as soon as the backend services are started.

Hyperchain uses Apache APISIX to operate in collaboration with the service center to ensure the addition and adjustment of front-end microservice business modules, which makes the online publishing process of Hyperchain’s Baas platform very easy.

### Scenario 2: Practice on blockchain nodes

![blockchain nodes](https://static.apiseven.com/202108/1646723635432-a4e185fd-3648-4a60-83b7-f767560c3a4d.012)

When a user buys a chain through the BaaS platform, its upper business or developer client connects directly to the nodes, for example, a bank connects to three on the left, an insurance connects to three on the right, or some users access a whole chain. This will bring a big problem because basically every node will be accessed, so we need to expose all the nodes on the blockchain to the public network environment.

#### Conserve public network ports

![public network ports](https://static.apiseven.com/202108/1646723635433-3999243b-7457-48d3-803a-99860c9e1bac.013)

This situation may be acceptable for private users, but for a BaaS platform like Hyperchain, which is open to all Internet users, it requires dozens or hundreds or thousands of public IPs, which is not only very costly but also a waste of public IP resources.

In order to solve this problem, Hyperchain’s Baas platform uses Apache APISIX.

#### Access Control

![Access Control](https://static.apiseven.com/202108/1646723635433-7e76d02b-99e9-479a-8cbf-a56ae120913d.014)

Unlike traditional software, different heterogeneous chains have their own very complicated RBAC permission control, so users need to add many certificates on the client side, which is a great headache.

In order to solve this pain point, Baas platform of Hyperchain Technology uses Apache APISIX’s Key-auth plugin to allow users with permission to access directly and unify the permission control of all chains.

#### Improved node stability

![blockchain nodes 2](https://static.apiseven.com/202108/1646723635434-60398981-d33b-4b7c-b43c-0aba4b0779a7.015)

One of the properties of blockchain is that, essentially, accessing any node is the same.

Just like Bitcoin, we access any node to get the data, so many users operate directly against a node.

![Improved node stability](https://static.apiseven.com/202108/1646723635435-3dd3e082-f1aa-4763-ab46-c15d34a28f58.016)

However, the direct access to a single node model is vulnerable to attacks. For example, banks have a very high concurrency, TPS can reach 4–5W/sec, and every transaction will hit this node.

In order to achieve the effect of fast dynamic scaling, Hyperchain’s Baas platform utilizes Apache APISIX HPA deployment model on Kubernetes to dynamically scale according to the traffic, effectively solving the single-point traffic impact problem.

#### Multi-protocol support

![Multi-protocol support](https://static.apiseven.com/202108/1646723635435-d68f64a9-6dc2-40d4-ab81-9604767d363d.017)

Because Hyperchain’s Baas platform uses a lot of heterogeneous chains, the protocols used are very diverse, such as HTTP, RPC, WebSocket and so on. Apache APISIX supports multi-protocols very well, which can fully meet the use of Baas platform in the relevant scenarios, which significantly reduces the development cost.

![Multi-protocol support 2](https://static.apiseven.com/202108/1646723635436-2cd77c45-6a60-4ad2-aa24-0d47758fbe3a.018)

## What were the kinks we went through before choosing Apache APISIX?

Before choosing Apache APISIX, Hyperchain’s Baas platform was already using Kong, but Kong was later abandoned.

**Why did we give up on Kong?**

Kong uses PostgreSQL to store its information, which is obviously not a good way to do it.

![Kong](https://static.apiseven.com/202108/1646723635437-69eef80d-9f35-4164-9779-b1c65bc311d8.019)

In the software industry, high availability configuration of databases is very complex. Not only do you need to have a dedicated DBA, but the implementation is also very difficult.

The Baas system of Hyperchain Technology is already using MySQL, if we need to build a PostgreSQL database here, it means that Hyperchain Technology’s Baas system needs to have two sets of relational databases. This brings problems to the implementation difficulty and operation and maintenance cost, and introduces more risks.

At the same time, because ETCD is also used in many places of Hyperchain’s Baas platform, finally, Hyperchain abandoned Kong and invested in Apache APISIX which is based on ETCD.

**Why did we give up on Nginx?**

Some of you may think, “Why not use Nginx?

Yes, Hyperchain’s BaaS platform used to use Nginx, but later we found that Nginx has many imperfections compared to Apache APISIX.

![Nginx](https://static.apiseven.com/202108/1646723635437-d6e57e5d-3a6f-4140-9a1a-68adcd3790a0.020)

- **Issues on hot starts and hot plugins**

In the Hyperchain BaaS platform, we not only need to manage the federated chain, but also need to be able to add and delete nodes at any time.

- **Clustering difficulties**

While Nginx is very difficult to cluster, Apache APISIX can be implemented with ETCD clustering enhancements.

- **Unable to proxy TCP and UDP directly**

By default, Nginx can only implement proxies for Layer 7 networks. To support Layer 4 networks, you need to recompile the Stream module, while Apache APISIX can support both Layer 4/7 proxies.

- **Lack of Dashboard**

Nginx does not have a Dashboard, and the Apache APISIX Dashboard makes it less difficult for development and operations staff to manage nodes.

## Future Plans

![Future Plans](https://static.apiseven.com/202108/1646723635438-7392246c-e644-41ca-a4aa-599533f47239.021)

### Plan 1: Use Apache APISIX provided or self-developed logging plugins

The official website of Apache APISIX already provides a lot of logging plugins, such as HTTP and UDP support, including kafka, etc. However, for a platform like Hyperchain BaaS, which needs to control thousands of blockchain networks, it is a big headache to search for fault traces in the logs when every problem occurs.

In the near future, Hyperchain will add some APM functions between BaaS system and blockchain system based on Apache APISIX. Improve the efficiency of operation and maintenance management in multi-chain scenarios.

### Plan 2: Development of monitoring plugins to achieve traceability

Domestic regulation of blockchain is very strict, and all operations need to be traceable and traceable.

In the future, Hyperchain Technology will develop regulatory plugins based on Apache APISIX to improve the regulatory capability and add VIP, whitelist, replay and other functions.

### Plan 3: Use APISIX Ingress Controller instead of Kubernetes’ default Nginx-Ingress

When deploying Kubernetes, we usually choose Nginx-Ingress to handle outbound requests, but because of some of the Nginx issues mentioned above, Hyperchain is investigating using APISIX Ingress Controller.

### Plan 4: Explore Service Mesh

Hyperchain has tried traffic-mesh before, and will try to use APISIX Mesh in the future.
