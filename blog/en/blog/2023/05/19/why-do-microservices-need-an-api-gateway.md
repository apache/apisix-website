---
title: Why Do Microservices Need an API Gateway
authors:
  - name: API7.ai
    title: Author
    url: https://github.com/api7
    image_url: https://avatars.githubusercontent.com/u/61078451?s=200&v=4
keywords:
  - Apache APISIX
  - Microservices
  - Alternatives to Kong
description: Let's learn the importance of API gateway in the microservices architecture, and compare common API gateways.
tags: [Ecosystem]
image: https://static.apiseven.com/uploads/2023/02/16/CHqaC3Xw_Ecosystem%20%E6%A8%A1%E6%9D%BF1.png
canonical_url: "https://api7.ai/blog/why-do-microservices-need-an-api-gateway"
---

>The microservices architecture has been widely adopted by many companies. As the data and API quantity of microservices increases, it is crucial to choose an excellent API gateway for high-traffic governance: APISIX.
<!--truncate-->

## What Are Microservices

Microservice architecture, usually referred to as [microservices](https://api7.ai/blog/what-are-microservices), is a type of architecture used to develop applications. With microservices, large applications can be broken down into multiple independent components, each with its own responsibilities. When processing a user request, an application based on microservices may call many internal microservices to generate its response jointly. Microservices are a result of internet development, and the rapid growth of internet has caused the architecture of systems to change constantly.

Overall, the architecture of systems has roughly evolved from monolithic architecture to SOA architecture to microservice architecture. The specific progression and pros/cons of each architecture are outlined in the table below.

| Architecture Type | Description                                                                                                                      | Advantages                                                                                                                                                                      | Disadvantages                                                                                                         |
|----|-------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------|
| Monolithic Application Architecture   |    Pack all functional code into a single service.  | 1. Simple architecture with low project development and maintenance costs.                                                                                                                                                | Coupling all modules together is beneficial for developing and maintaining small projects, but it can create issues for large projects, including <br/> 1. The modules in the project are too tightly coupled, and a performance issue in one module may cause the entire project to become unavailable;<br/> 2. The project needs better scalability. |
|    [SOA Architecture](https://en.wikipedia.org/wiki/Service-oriented_architecture)      |   The term stands for "service-oriented architecture," which typically involves multiple services. <br/>A service typically exists independently in an operating system process, and communication between services is achieved through dependencies or communication mechanisms, <br/> Ultimately, it provides a series of functions.                                                                                                                                      | 1. System integration: From a systemic perspective, it resolves communication issues between enterprise systems by converting their previously disordered and unstructured network connections into a managed and structured star configuration.<br/> 2. Service-oriented system: From a functional perspective, it abstracts business logic into reusable and combinable services and uses service orchestration to achieve the rapid reconstruction of business processes.<br/> 3. Business service-oriented: From the perspective of the enterprise, it abstracts enterprise functions into reusable and combinable services. | 1. Centralizing services creates dependencies between services, and a malfunction in one service can trigger a cascading failure across other services. <br/> 2. The dependencies and invocation relationships between services are complex, making testing and deployment difficult.                             |
|      Microservice Architecture          |    Microservices are the sublimation of SOA. One of the key emphases of the microservices architecture is "the need to thoroughly componentize and serviceize business", <br/>The original single business system will be split into multiple parts that can be developed, designed, and deployed independently.<br/>These parts will run as small, independent applications. Each application will collaborate and communicate with the others to achieve integration and interactivity, which is the essence of a microservices architecture.                                                                                                                                                                                                                        | 1. Decentralization;<br/> 2. Componentization achieved through services;<br/> 3. Dividing services and development teams based on business capabilities;<br/> 4. Infrastructure automation (DevOps, automated deployment).                                                                                    | 1. The development cost is relatively high;<br/> 2. Cause fault tolerance issues for services; <br/> 3. Cause data consistency issues；<br/> 4. Involve distributed transactions

Therefore, microservices are an inevitable result of Internet development, and the system architecture of many traditional companies is gradually becoming microservice-oriented.

However, with Internet business development, the number of APIs is also increasing dramatically, and gateways for unified API management will also face challenges. Choosing a more robust API gateway can effectively enhance the system's capabilities in monitoring, disaster recovery, authentication, and rate limiting.

## What Is an API Gateway?

API gateway provides a unified interface for interactions between clients and service systems and serves as a central point for managing requests and responses. Choosing a suitable API gateway can simplify development and improve system operation and management efficiency.

In a microservices architecture, an API gateway serves as a solution for system design by integrating various microservices from different modules and coordinating services in a unified manner.

As a system access aspect, the API gateway provides a unified entry point for clients, hides the implementation details of the system architecture, and makes microservices more user-friendly. It also integrates some common features such as [authentication](https://api7.ai/blog/api-gateway-authentication), [rate limiting](https://api7.ai/blog/rate-limiting-in-api-management), and circuit breaking to avoid individual development of each microservice, improve efficiency, and standardize the system, such as identity authentication, monitoring, load balancing, rate limiting, degradation, and application detection.

## Why Do Microservices Need an API Gateway?

![API gateway in microservices](https://static.apiseven.com/uploads/2023/02/16/IQnuGi7N_111.jpg)

As shown in the above diagram, the API gateway serves as an intermediate layer between the client and microservices. It can provide microservices to the outside world at a unified address and route the traffic to the correct service nodes within the internal cluster based on appropriate rules.

Without an API gateway, the inlets and outlets of the traffic are not unified, and the client needs to know the access information of all services. The significance of microservices will not exist. Therefore, a microservices gateway is necessary for a microservice architecture. Additionally, the API gateway plays a vital role in system observability, identity authentication, stability, and [service discovery](https://api7.ai/blog/what-is-service-discovery-in-microservices).

### Challenges Faced by Microservices

The microservices gateway should first have API routing capabilities. As the number of microservices increases, so does the number of APIs. The gateway can also be used as a traffic filter in specific scenarios to provide certain optional features. Therefore, higher demands are placed on the microservices API gateway, such as:

- Observability: In the past, troubleshooting in monolithic applications was often done by checking logs for error messages and exception stacks. However, in a microservices architecture with many services, problem diagnosis becomes very difficult. Therefore, how to monitor the operation of microservices and provide rapid alarms when anomalies occur poses a great challenge to developers.
- Authentication and Authorization: In a microservices architecture, an application is divided into several micro-applications, which need to authenticate access and be aware of the current user and their permissions.The [authentication](https://api7.ai/blog/understanding-microservices-authentication-services) method in monolithic application architecture is unsuitable, especially when access is not only from a browser but also from other service calls. In a microservices architecture, various authentication scenarios must be considered, including external application access, user-service authentication, and service-service authentication.
- System stability: If the number of requests exceeds the processing capacity of a microservice, it may overwhelm the service, even causing a cascading effect that affects the system's overall stability.
- Service discovery: The decentralized management of microservices also presents challenges for implementing load balancing.

### Solutions

API gateway, as the intermediate bridge between the client and the server, provides a unified management mechanism for the microservices system. In addition to basic functions such as request distribution, API management, and conditional routing, it also includes identity authentication, monitoring and alarm, tracing analysis, load balancing, rate limiting, isolation, and circuit breaking.

**Identity authentication**: The following diagram illustrates how microservices are united with an API gateway for identity authentication, where all requests go through the gateway, effectively hiding the microservices.

![API gateway authentication in microservices](https://static.apiseven.com/uploads/2023/02/16/zk9D3gB5_222.jpg)

**Monitoring and Alerting/Tracing Analysis**:

As the intermediary between the client and server, the API gateway is an excellent carrier for monitoring microservices.

The primary responsibility of the API gateway's monitoring function is to detect connection anomalies between the gateway and the backend servers in a timely manner. Users can view log information, monitoring information, tracing, etc. on the monitoring platform for the API. Furthermore, any anomalies that arise on the host will be automatically reported to the control panel. Specific gateways can issue dual alerts to both the client and server.

![Monitoring and Tracing Analysis Diagram](https://static.apiseven.com/uploads/2023/02/16/s0CwNZmu_333.jpeg)

**Rate limiting, isolation, and circuit breaking**:

As the scale of internet businesses continues to increase, so does the concurrency of systems. Multiple services are often called by each other, and a core link may call up to ten services. If the RT (response time) of a certain service rises sharply and upstream services continue to request, a vicious cycle will occur. The more upstream waiting for results, the more upstream services will be blocked, and the entire process will eventually become unusable, leading to a service avalanche.

Therefore, it is necessary to regulate and manage the incoming traffic. The following diagram shows how microservice systems combine API gateways to perform rate limiting, isolation, and circuit breaking.

![Rate limiting, isolation, and circuit breaking](https://static.apiseven.com/uploads/2023/02/16/6IssHFUK_444.jpg)

### Selection of Mainstream Gateways

Many open-source gateway implementations are available in microservices, including NGINX, Kong, Apache APISIX, and Envoy. For the Java technology stack, there are options such as Netflix Zuul, Spring Cloud Gateway, Soul, etc. But you may wonder, "[Why would you choose Apache APISIX instead of NGINX and Kong](https://api7.ai/blog/why-choose-apisix-instead-of-nginx-or-kong)?"

Here's a brief comparison.

| Gateway | Painpoints                                                                                                                      | Advantages                                                                                                          |
|---|------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------|
| [NGINX](https://www.nginx.com/) | 1. Reloading is required for changes to take effect in the configuration, which can't keep pace with the progress of cloud-native technologies.                                                                                                   | 1. old-style applications;<br/> 2. Stable, reliable, and time-tested; <br/> 3. High Performance                                                                                                                |
| [Apache APISIX](https://apisix.apache.org/) | 1. The documentation is not rich or clear enough and needs improvement.                                                                                                                | 1. Apache Foundation Top-Level Project;<br/> 2. The technical architecture is more in line with cloud-native principles;<br/> 3. Excellent performance;<br/> 4. Rich ecosystem;<br/> 5. In addition to supporting Lua development plugins, it also supports language plugins for Java, Go, Python, Node, and others.                                          |
| [Kong](https://konghq.com/) | 1. The default use of PostgreSQL or Cassandra databases makes the entire architecture very bloated and can bring about high availability issues;<br/> 2. The routing uses a traversal search algorithm, which can lead to a significant decrease in performance when there are more than thousands of routes in the gateway;<br/> 3. Some important features require payment; | 1. The pioneer of open-source API gateways with a large user base;<br/> 2. Performance meets the needs of most users;<br/> 3. Rich ecosystem;<br/> 4. It supports Lua and Go plugin development;                                                    |
|   [Envoy](https://envoy.com/)   | 1. It is developed in C++, which makes it difficult for secondary development;<br/> 2. In addition to developing filters with C++, it also supports WASM and Lua.                                                              | 1. The CNCF graduated project is more suitable for service mesh scenarios and supports the deployment of multi-language architectures;                                                                                                      |
|     [Spring Cloud Gateway](https://cloud.spring.io/spring-cloud-gateway/reference/html/)      | 1. Although the Spring community is mature, there is a lack of resources for Gateway.                                                                                                  | 1. The gateway provides a wealth of out-of-the-box features, which can be used through SpringBoot configuration or hand-coded calls; <br/> 2. Spring framework is highly extensible with strong scalability, easy configuration, and good maintainability;    <br/> 3. The Spring community is mature; <br/> 4. Easy to use;<br/> 5. Convenient for the Java technology stack. |

## Summary

As the internet world continues to develop, enterprises rapidly evolve, leading to constant changes in system architecture. The microservices architecture has been widely adopted by many companies.

As the data and API quantity of microservices increases, it is crucial to choose an excellent API gateway for high-traffic governance.

This article compares common API gateways, highlighting their respective advantages and disadvantages. Suppose you are in the process of selecting an API gateway technology, encountering performance issues in your microservice system, or looking to build an efficient and stable microservice system. In that case, this article aims to provide you with some helpful insights.
