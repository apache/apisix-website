# API Gateway

> This article mainly introduces the role of the API gateway and why it is needed.

Source: https://apisix.apache.org/docs/apisix/terminology/api-gateway/

## Description

An API gateway is a software pattern that sits in front of an application programming interface (API) or group of microservices, to facilitate requests and delivery of data and services. Its primary role is to act as a single entry point and standardized process for interactions between an organization's apps, data, and services and internal and external customers. The API gateway can also perform various other functions to support and manage API usage, from authentication to rate limiting to analytics.

An API gateway also acts as a gateway between the API and the underlying infrastructure. It can be used to route requests to different backends, such as a load balancer, or route requests to different services based on the request headers.

## Why use an API gateway?

An API gateway comes with a lot of benefits over a traditional API microservice. The following are some of the benefits:

- It is a single entry point for all API requests.
- It can be used to route requests to different backends, such as a load balancer, or route requests to different services based on the request headers.
- It can be used to perform authentication, authorization, and rate-limiting.
- It can be used to support analytics, such as monitoring, logging, and tracing.
- It can protect the API from malicious attack vectors such as SQL injections, DDOS attacks, and XSS.
- It decreases the complexity of the API and microservices.
