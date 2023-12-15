---
title: APISIX Boosts Lenovo to Build Lightweight and Decentralized Gateway
authors:
  - name: Leon Yang
    title: Author
    url: https://github.com/leonyaa
    image_url: https://avatars.githubusercontent.com/u/2486554?v=4
  - name: "Yilia Lin"
    title: "Technical Writer"
    url: "https://github.com/Yilialinn"
    image_url: "https://avatars.githubusercontent.com/u/114121331?v=4"
keywords:
  - APISIX
  - Lenovo
  - Full API Lifecycle Management
  - Kong Alternatives
description: Lenovo established a decentralized gateway and centralized dev portal based on APISIX, resolving the bottlenecks of its previous system.
tags: [Case Studies]
image: https://static.apiseven.com/uploads/2023/06/02/pRRqKigM_img_v2_d8efd0f7-2a28-46c2-8ed3-6e59f17cafag.png
---

> Lenovo established a decentralized gateway and centralized dev portal based on APISIX, resolving the bottlenecks of its previous system.
<!--truncate-->

## Overview

I'm Leon Yang, a Senior IT Architect at Lenovo, dedicated to promoting the reuse of software engineering components and building a sharing technology ecosystem. In the past two years, I have published more than 20 patents in enterprise software, big data, and artificial intelligence.

Lenovo Group Limited, which was founded on November 1, 1984, as Legend and is commonly referred to as Lenovo, is an American-Chinese multinational technology company specializing in designing, manufacturing, and marketing consumer electronics, personal computers, software, business solutions, and related services.

## Background

Nowadays, businesses are becoming more and more complex. Technologies are changing with each passing day, which has greatly impacted software development. We have been looking for a more efficient way for project delivery at a lower cost, that is reusing original system resources by componentization.

![Lenovo-system-architecture](https://static.apiseven.com/uploads/2023/06/05/qTyereco_Lenovo-system-architecture.jpeg)

The first step is to build an out-of-the-box reusable internal API ecosystem with a large number of components. Therefore, our team can reuse existing software assets by componentizing technical functions and standardizing the architecture. It is an effective way for enterprises, enabling developers no longer need to face a variety of technology selections.

Consequently, our team started developing its internal applications based on component-based patterns, reducing engineering application development costs, and improving software delivery with quality and efficiency. Meantime, we established a high-quality enterprise API service ecosystem for fully reusing the capabilities of internal systems and external partners, thus constructing powerful business solutions.

## Challenges of Centralized API Gateway Architecture in Complex Enterprise Environments

The API gateway plays a vital role in the API ecosystem. The following picture shows how we use the API gateway in different scenarios.

![Challenges-of-Centralized-API-Gateway](https://static.apiseven.com/uploads/2023/06/05/gI5G0TAE_Challenges-of-Centralized-API-Gateway.jpeg)

In a large enterprise, there will be an intranet and a DMZ (demilitarized zone). In the intranet, if hundreds of application systems need to implement API calls through the API gateway, a centralized intranet gateway will be established to be responsible for API routing, authentication, WAF control, etc. If the API service is to provide external network services, according to the strict architecture design, a centralized gateway needs to be deployed in the DMZ. The API call goes through the DMZ and then will be exposed to the public network through the relevant firewall.

There are many challenges in this process.

- Distributed API information and incorrect use of API bring **high operational costs**.

- **Limited scalability and availability** because of a single point of failure. If the gateway fails, all requests will be blocked, resulting in downtime and disruption of services (centralized team resource).

- Too many API scenarios and routes deployed in one gateway node can **easily become overwhelming and cause latency issues**.

- **Excessive resource usage or failure** by an API can negatively impact the performance of all APIs.

- Installing an etcd / ZK for each API gateway makes the **architecture too heavy**. (using admin console)

- Heterogeneous system architecture has **multiple API authorizations** from API gateway and API service providers, which adds complexity to API usage.

## Why Lenovo Opted for APISIX

We chose APISIX mainly because APISIX has merits in the below aspects.

- Built with NGINX and LuaJIT, APISIX has **high performance, rich OpenResty library, and is easy for customization**. In the past, we adopted multiple commercial API gateway products that were positioned in the leading quadrant of Gartner. However, these products posed challenges in meeting the unique needs of enterprises, such as customizing authorization flows and dashboards.

- **APISIX Provides lightweight deployment architecture**. We need a lightweight gateway that can function as a component embedded within an application. However, most commercial or open-source API gateway products are too heavy for our system.

- **Dynamic hot reloading** allows for publishing APIs without the need to restart systems, reducing downtime and improving business system operation SLA.

- **Flexible plugin customization** enables developers to create personalized processes that meet the unique needs of the enterprise.

- With the strong support of an **active community ecosystem and a wide range of high-quality plugins like kafka-logger and authz-keycloak**, we benefit from enhanced functionality and extensive customization options.

- **The enabled Web Application Firewall (WAF) provides essential security measures and traffic control features** to enhance the overall protection and performance of our system.

- **Friendly open-source license: Apache License 2.0.** Lenovo only considers using two protocols, Apache License 2.0 and MIT in terms of security compliance.

## Decentralized Gateway and Centralized Dev Portal based on APISIX

Our team adopted several measures to integrate its architecture with APISIX.

![API-Dev-Portal](https://static.apiseven.com/uploads/2023/06/05/hkkTZixS_API%20Dev%20Portal.jpeg)

### Build Centralized API Dev Portal

We established its Centralized API Dev Portal to improve the efficiency and quality of API management and use of API.

![Build-Centralized-API-Dev-Portal](https://static.apiseven.com/uploads/2023/06/05/3V2Xea7k_Build%20Centralized%20API%20Dev%20Portal.jpeg)

The Dev Portal has the following features.

- Provide unified API service catalog management and API information publishing, including API specifications, use cases & samples, and access control policies

- Provide developers with an easy-to-use API marketplace to search, test, and subscribe to APIs efficiently

- Provide a convenient way for tracking gateway status and notifying the changes of API subscription and policies

- Use API analytics to track API usage, measure the performance of API gateways and API services (exception, throughput, latency, etc.)

### Build Centralized Registry Center

![Build-Centralized-Registry-Center](https://static.apiseven.com/uploads/2023/06/05/CvfRTSda_Build%20Centralized%20Registry%20Center.jpeg)

Set up a Centralized Registry Center (etcd) for gateway health-check and API subscription synchronization to deploy multiple registry centers.

API Dev Portal publishes API subscriptions to the Registry Center when developers subscribe to API under a specified gateway.

Gateway sends a heartbeat to the Registry Center regularly, usually every 10 seconds, to inform the Registry Center that it is still alive. When the subscription under the gateway changes, the Registry Center will trigger the gateway to pull the updates of API subscriptions and deploy them locally. This process ensures that the gateway is always up-to-date with the latest API subscription information.

The API log & metrics reporter running as a daemon in the gateway can be configured to regularly post key metrics of the API to the Kafka topic. And the metrics then be consumed by the log receiver of API Analytics.

### Provide Lightweight Gateway

Lenovo provided a lightweight gateway delegated in business applications or domains that provides secure access to applications and services without a centralized gateway. This approach allows more granular control over access and authentication, improves scalability and performance, and reduces the risk of a single point of failure.

### Offload Authorization of API Provision Services

By offloading the authorization of API provision services and delegating the authorization of API consumers to the business applications or domains, Lenovo can better manage their API security and improve the developer experience.

## Achievements after Using APISIX

After implementing APISIX, a significant number of changes were made within Lenovo.

### Improved Performance with Flexible Configuration

**APISIX's remarkable scalability offers Lenovo the necessary flexibility for customization.** With APISIX,  Lenovo's decentralized gateway architecture provides high-performance and highly scalable enterprise-level API gateway solutions, effectively eliminating the bottleneck caused by centralization.

Previously, the system resources constrain the number of APIs that can be deployed in a single cluster to less than 1,000. The gateway performance is bottlenecked by some resource-intensive APIs, resulting in an average throughput of **less than 4,000 TPS**. Furthermore, any API failure will degrade the overall API routing performance and affect all clients.

However, by leveraging APISIX, Lenovo's decentralized gateway architecture enables the efficient deployment of gateway nodes and APIs based on specific business scenarios. Each gateway node can be configured and optimized independently according to its system resources and workload. Consequently, there is no longer a limit on the total number of APIs that can be deployed across the network. Moreover, with proper tuning, **the gateway performance can be significantly improved to exceed 20,000 TPS**.

### Inreased Security and Scalability

**Deploying a lightweight gateway as a component of an application or business domain improved the application security, as well as greatly enhanced the flexibility of deploying API by scenarios.**

Each business scenario can benefit from independent API routing and customized security policies, which provide complete isolation between different scenarios. This enables each business scenario to perform API changes and start-stop operations according to specific plans.

So far, **more than 100 low-code business applications have leveraged this lightweight API gateway component architecture, which has enhanced their performance and resilience** without being hampered by the unified gateway operation and maintenance challenges. This lightweight API gateway component architecture is projected to encompass most of the business scenarios in the next 2 to 3 years.

### Realized Full API Lifecycle Management

**Centralized API Dev Portal enables API providers to efficiently manage the full API lifecycle in a unified manner for all gateways.**

Utilizing an API Dev Portal to manage API information can effectively prevent various business teams from duplicating their API admin tools. Additionally, it enables the possibility of establishing unified API technical standards, documentation standards, and security standards. To integrate complex heterogeneous systems or legacy systems from different business domains, the API Dev Portal also provides various [authorization](https://api7.ai/blog/apisix-permission-policy) processes extended from the APISIX plugin for the backend services of APIs, such as Basic Authorization, oAuth2, Customized Header, and so on. So far, **100+ developers are using the API Dev Portal for API management**.

### Provided Unified API Management Marketplace

API Marketplaces, such as the one facilitated by APISIX, play a vital role in simplifying the process of finding the required APIs for developers. These marketplaces also facilitate efficient sharing and discovery of API information across departments in large enterprises, thereby reducing the time spent on searching for APIs.

Currently, **the API market is already being leveraged by over 1000 developers from various business domains to search and access the necessary API information**. It has proven to be an indispensable tool for streamlining the development process and ensuring access to the most up-to-date and accurate API information.

As APISIX continues to expand its functionality and coverage within the API market, more developers are expected to rely on it as a valuable resource for their development needs. **APISIX provides developers with a centralized platform to search for and access the APIs they require, significantly saving them time and effort during the development process.** Furthermore, the API market powered by APISIX offers developers a collaborative environment to share their own APIs, fostering innovation and collaboration within the development community.

### Achieved Enhanced Monitoring

API Analytics and [Monitoring](https://api7.ai/blog/apache-apisix-datadog-integration) provides businesses with valuable insights into the performance of their APIs. **APISIX plays a crucial role in assisting Lenovo in monitoring its platforms, enabling developers to optimize APIs for enhanced performance, scalability, and reliability.** Additionally, it aids in the early detection of potential risks, such as errors and latency, preventing them from becoming significant problems.

## Summary and Outlook

I believe that the combination of a high-performance tech stack and a flexible open-source architecture empowers organizations, including ours, to create robust and efficient solutions. This powerful combination equips us with the necessary tools and capabilities to tackle complex challenges and deliver exceptional outcomes.

Considering these remarkable capabilities, we at Lenovo have immense confidence in APISIX and its vibrant community. With the unwavering support of APISIX, we are in a favorable position to achieve remarkable milestones and maintain our leadership in technological advancements within the industry. By leveraging the strengths of APISIX, we can drive innovation, foster growth, and continue to lead the way in delivering cutting-edge solutions that cater to the evolving needs of the market.
