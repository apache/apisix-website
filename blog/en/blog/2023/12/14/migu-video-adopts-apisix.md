---
title: "How to Supercharge Large-Scale Video Operations with APISIX"
authors:
  - name: Yu Xia
    title: Author
  - name: Yilia Lin
    title: Technical Writer
    url: https://github.com/Yilialinn
    image_url: https://github.com/Yilialinn.png
keywords:
  - open source
  - API gateway
  - Apache APISIX
  - Migu Video
  - API gateway best practice
description: Explore the ultimate guide on optimizing large-scale video operations using APISIX in Migu Video.
tags: [Case Studies]
image: https://static.apiseven.com/uploads/2023/12/06/ZYrbfw7r_Migu-video.png
---

> Author: Yu Xia, Senior DevOps Engineer at Migu Video Construction and Operation Center. This article is based on a presentation given by Yu Xia at the APISIX Shanghai Meetup in November 2023.
<!--truncate-->

Today, I would like to share with you some of the experiences and achievements of Migu Video in implementing and practicing APISIX in large-scale video business scenarios. I will share our experiences and accomplishments from six perspectives.

## About Migu Video

Migu Culture Technology Co., Ltd (Migu), is a subsidiary of China Mobile, specializing in the field of mobile internet. It functions as an integrated professional entity responsible for providing, operating, and servicing digital content products. Migu serves as the sole operational entity under China Mobile's music, video, reading, gaming, and new digital business sectors. It encompasses five sub-companies: Migu Music, Migu Video, Migu Digital Media, Migu Fun, and Migu Animation.

Migu has emerged as a leading comprehensive platform in China that boasts an extensive collection, including over 35 million songs, 4.6 million videos, 600,000 publications, 1,100 games, and 750,000 episodes of new digital content.

Looking ahead, Migu is committed to innovating in "Internet + Digital Content" operations. It aims to integrate various contents with multiple channels, actively engaging in cross-domain IP operations. Migu is dedicated to building four major platforms: new media integration, digital content aggregation, copyright transactions, and content entrepreneurship and innovation. Its goal is to bring about a transformation in users' entertainment lifestyles.

## Why Do We Need APISIX？

During the technology selection, we noticed that APISIX is an open-source API gateway that provides high performance, high availability, and scalability. APISIX also supports multiple protocols, including HTTP, WebSocket, gRPC, and various plugins such as rate limiting, authentication, authorization, and logging, making it suitable for various API gateway requirements in different scenarios. Additionally, APISIX has unique advantages in microservices frameworks and cloud-native environments.

We particularly value APISIX for its high performance, dynamic routing capabilities, security protection, and the flexibility of its plugin system.

## Requirements for Large-Scale Video Services

Migu Video faced several challenges in its business scenarios, including high concurrent access, high-security requirements, and fault recovery. The live streaming scenarios are demanding in transmission requirements and require support for multiple formats and protocols, and content delivery acceleration through Content Delivery Network (CDN). These are the characteristics of our business. Luckily, APISIX, as a high-performance solution, can help us address these challenges.

- **High Traffic and High Concurrency**: Video services typically face a large number of user requests and require handling high concurrency situations.

- **High Real-time Requirement**: It is crucial to ensure real-time data transmission and display in live streaming and similar scenarios.

- **Support for Multiple Formats and Protocols**: Video services may involve various video formats and transmission protocols.

- **CDN Acceleration**: To provide a better user experience, video services often make use of CDN for accelerated content delivery.

### APISIX Implementation in Large-Scale Video Services

Next, let's delve into the specific use cases of APISIX in our video service business, focusing on traffic scheduling and management, dynamic routing, and security protection.

- **Traffic Scheduling and Management**: We have been exploring traffic scheduling and management, aiming to control the traffic scheduling and rate limiting, thus avoiding or intercepting certain requests by leveraging APISIX plugins.

- **Dynamic Routing**: Dynamic routing was one of the key features that initially attracted us to APISIX. Previously, our centralized gateway mainly relied on a version of OpenResty. However, due to the frequent changes in our business and routing information, making online modifications to the routing configuration posed certain risks. APISIX, with its dynamic routing and hot configuration through Dashboard, allows us to publish changes without reloading the service, which is highly valuable to us.

- **Security Protection**: We aim to utilize APISIX's security protection features to safeguard our video services from various network attacks effectively. For example, by configuring APISIX's firewall rules, we can filter out malicious requests and ensure the stable operation of our business.

### Gateway Customization Based on APISIX

Currently, Migu Video has completed their customization of 11 sets of gateways, as well as 4 sets of environments waiting for release to the production environments.

These 11 sets of gateways cover the main gateways of our centralized business. For example, there is a public gateway for user login, a user management center gateway responsible for user authentication capabilities, a sales gateway for user product purchases, and the Professional User Generated Content (PUGC) gateway required for the newly added live streaming business in 2023. Additionally, we have also transformed the gateway for cinema ticketing.

The current APISIX gateway environment at Migu generally follows a dual-data center architecture. Each data center has multiple APISIX services, a set of etcd clusters with 3 nodes typically, and a Dashboard service for frontend route configuration. Additionally, we use self-developed signature verification and token verification plugins, mainly for gateway signature and token validation.

### Useful Plugins

In addition to our self-developed plugins, we also utilize the built-in Prometheus and Grafana plugins provided by APISIX, primarily for monitoring the APISIX gateway.

Except that, during the initial deployment of APISIX, we received technical support from the original manufacturer-API7.ai. They assisted us in conducting inspections in the production environment and addressed various issues. This included adjustments to plugins and resource allocation, resolving potential issues that may have been encountered in the live environment.

### Monitoring and Alerting

Apart from some aided monitoring solutions, we mostly use Prometheus and Grafana.

Prometheus and Grafana are official plugins provided by APISIX. We primarily use them to monitor metrics such as error rates, latency, TPS, the health of the etcd clusters, shared memory status, and message-sending rate within the APISIX gateway.

These metrics are typically displayed in visual charts, providing a more intuitive and clear view of the system's performance.

## APISIX Adaptation for Other Operating Systems

To enhance the competitiveness of our group, we needed to use many other operating systems, during which we encountered some challenges.

- **Environment Differences**: Due to certain differences among Windows, Unix, Linux, and other operating systems, we had to make adjustments for compatibility with different dependency libraries

- **Package Management**: Owing to the customized dependency packages of various operating systems, we needed to reconfigure some foundational software packages to ensure compatibility.

- **Performance**: Initially, we were unsure about the performance of APISIX on a new operating system. Therefore, we conducted several testing phases.

First, we adapted APISIX to the operating system in a test environment and resolved any dependency package-related issues. Then, we conducted stress testing on a set of PUGC gateways. This business has already been extensively deployed in our services during the Four International Competitions in 2023, including the Hangzhou Asian Games, the Summer World University Games in Chengdu, the 2023 FIFA Women's World Cup, and the 2023 FIBA Basketball World Cup.

Currently, the practical testing of APISIX on the new operating system has proved that APISIX can perfectly  meet our business requirements by handling many concurrent live-streaming sessions on the new operating system.

### Strategic Development Approach: Containerizing APISIX

One of our development strategies is to containerize APISIX. Currently, our main environment is based on VM, but we plan to transition to Kubernetes (K8s) in the future. Considering that many gateways within Migu have already migrated into APISIX, we have chosen the APISIX Ingress Controller as our gateway for containerization.

Currently, our VM environment is based on LVS (Linux Virtual Server), but we expect to transition to using the APISIX Ingress Controller in a containerized environment.

The containerization plan will be conducted in two steps. First, due to the high stability requirements of our business, we may initially replace some services, allowing VM and containerized environments to coexist. Then, we will enable a gradual migration from VM to containerization.

## Practical Effects and Optimization

### Improvement in Business Performance with APISIX

- **Enhanced Request Processing Efficiency**: APISIX utilizes a high-performance asynchronous non-blocking design, enabling it to handle a large number of concurrent requests. This significantly improves the request processing efficiency for video-related businesses.

- **Reduced Latency**: Through APISIX's intelligent routing and proximity-based node distribution strategies, network latency for video-related businesses is effectively reduced, thereby enhancing user experience.

- **Increased Stability**: APISIX itself has high availability and fault-tolerance mechanisms, reducing the impact of backend service failures and improving the overall stability of the business.

### Significance and Value of Implementation

- **Enhanced Performance**: With APISIX's high-performance and high-concurrency capabilities, video-related businesses can better handle access requests from a large number of users, ensuring business stability and availability.

- **Simplified Architecture and Operations**: APISIX provides rich functionalities and plugins, resulting in a more streamlined backend architecture while reducing operational complexity. This, in turn, improves development and operational efficiency.

- **Improved Scalability**: Leveraging APISIX's distributed nature, video-related businesses can easily scale horizontally to meet the growing demands of the business.

## Looking to the Future

Currently, Migu Video is facing some challenges, which also serve as our future research directions. These include integrating the use of APISIX rate-limiting plugins to implement mechanisms such as setting thresholds for circuit breaking and degradation. Additionally, we aim to match business needs by implementing proactive health checks for the gateway and introducing a graphical routing configuration interface for the Ingress Controller.

We have high expectations for the future development of APISIX, which include:

- **Enhanced Functionality Plugins**: We anticipate that APISIX will provide a broader range of more comprehensive functionality plugins to meet the demands of various business scenarios.

- **Improved Performance**: With the continuous development of technologies such as 5G and cloud computing, the performance requirements for gateways are becoming increasingly demanding. We hope that APISIX will continuously optimize its performance to meet higher-level requirements.

- **Deeper Ecosystem Collaboration**: We hope that APISIX will engage in extensive collaboration with more open-source projects and commercial companies, working together to build a more comprehensive technological ecosystem.

In summary, APISIX, as a distributed gateway, plays a crucial role in Migu's large-scale video-related businesses. Its practical implementation not only enhances business performance and simplifies backend architecture but also provides strong support for the rapid development of the business. In the future, we look forward to the continuous evolution of APISIX, bringing more value and innovation to large-scale video-related businesses and other domains.
