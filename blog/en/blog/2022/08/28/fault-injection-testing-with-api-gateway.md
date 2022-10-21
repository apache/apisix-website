---
title: "Fault Injection Testing with API Gateway"
authors:
  - name: Bobur Umurzokov
    title: Author
    url: https://github.com/Boburmirzo
    image_url: https://avatars.githubusercontent.com/u/14247607
keywords: 
- API gateway
- Apache APISIX
- Testing
- Fault Injection
- Microservices
description: The blog post describes how Apache APISIX is useful for testing the robustness and resilience of microservices APIs. Throughout the post, we also get to know the types of possible failure injections with the Fault Injection Plugin.
tags: [Case Studies]
image: https://static.apiseven.com/2022/10/20/6350b3f63a715.png
---

> 💁 This blog post describes how an **API Gateway** like [Apache APISIX](https://apisix.apache.org/) is useful for testing the robustness and resilience of microservices APIs.

<!--truncate-->

## Explore distributed system stability 💪

[Distributed systems](https://azure.microsoft.com/en-us/resources/designing-distributed-systems/) such as [microservices](https://docs.microsoft.com/en-us/azure/architecture/guide/architecture-styles/microservices) have led to an increase in the complexity of the systems we work with. It is difficult to have full confidence in this architecture when there are many components and “a lot of moving parts” that could potentially fail. It is critical to handle failures in service-to-service calls gracefully. Also, we want to be sure that any resilience mechanisms we have in place such as error handling code, [circuit breaker](https://dev.to/apisix/implementing-resilient-applications-with-api-gateway-circuit-breaker-ggk), [health checks](https://dev.to/apisix/implementing-resilient-applications-with-api-gateway-health-check-338c), [retry](https://docs.microsoft.com/en-us/azure/architecture/patterns/retry), fallback, redundant instances, and so on. We can verify this with the help of the testing method **[Fault Injection](https://en.wikipedia.org/wiki/Fault_injection)** 💉.

![Fault Injection Testing with Apache APISIX](https://static.apiseven.com/2022/blog/0831/afe53i95g4tt82rx8gwp.jpg)

Throughout the post, we get to know the types of possible failure injections with the **[Fault Injection Plugin](https://apisix.apache.org/docs/apisix/plugins/fault-injection/)** 🔌 and simulate failures on our existing [Product backend service](https://github.com/Boburmirzo/apisix-dotnet-docker/tree/main/ProductApi) (developed by using [ASP.NET Core WEB API](https://docs.microsoft.com/en-us/aspnet/core/?view=aspnetcore-6.0)).

### Here is a quick overview of what we cover 👇

- ✅ [Software Fault Injection](https://www.intechopen.com/chapters/56668).
- ✅ Fault injection testing (FIT) with API Gateway.
- ✅ Apache APISIX [Fault Injection Plugin](https://apisix.apache.org/docs/apisix/plugins/fault-injection/).
- ✅ Fault injection different types of failures.
- ✅ Experiment with Fault Injection Plugin.

> Application is **correct** if it acts as specified. It is **robust** if it can take a high load until it goes down. Application is **resilient** if it can go back to normal after a disruption.

## Software Fault Injection 💻💉

Among the many methods to perform Fault Injection, the technique of **Software Fault Injection** is especially getting more popular among companies managing large, complex, and distributed systems. In this software testing technique, a special piece of code associated with the system under test tries to simulate faults. It is usually completed before deployment to identify potential flaws in the running software 😱. Fault injection can better identify the nature and cause of production failures.

## Fault Injection Testing with API Gateway

The **fault injection** approach at the [API Gateway](https://apisix.apache.org/docs/apisix/terminology/api-gateway/) level can be used to test the resiliency of application or microservices APIs against various forms of failures to build confidence in the production environment. The technique can be used to inject delays and abort requests with user-specified error codes, thereby providing the ability to stage different failure scenarios such as service failures, service overloads, high network latency, network partitions, etc. Fault injection can be limited to a specific set of requests based on the (destination) upstream cluster of a request and/or a set of pre-defined request headers.

For a streaming giant like [Netflix](https://www.netflix.com/), the migration to a complex cloud-based microservices architecture would not have been possible without a revolutionary testing method known as fault injection 👊. There is a very well-known strategy like [Chaos engineering](https://en.wikipedia.org/wiki/Chaos_engineering) which uses fault injection to accomplish the goal of more reliable systems. And Netflix teams built their own _Chaos engineering tool_ called [Chaos Monkey](https://netflix.github.io/chaosmonkey/).

## Apache APISIX Fault Injection Plugin 🔌

[Apache APISIX Fault Injection Plugin](https://apisix.apache.org/docs/apisix/plugins/fault-injection/) also offers a _mechanism_ to inject some errors into our APIs and ensures that our resilience measures are effective.

Apache APISIX works in **two different modes**, both configured using the `fault-injection` plugin attributes⤵️:

1. **Delays:** Delays are timing failures. They simulate increased network latency or an overloaded upstream service.

2. **Aborts:** Aborts are crash failures. They mimic failures in upstream services. Aborts usually manifest in the form of HTTP error codes or TCP connection failures.

For detailed instructions on how to configure delays and aborts, see [Fault Injection](https://apisix.apache.org/docs/apisix/plugins/fault-injection/). You can also try out a centralized platform [API7 Cloud](https://www.api7.cloud/) ☁️ to use more advanced API Gateway [features](https://www.api7.cloud/docs/overview/api7-cloud). API7 Cloud provides a fully managed chaos engineering service with the dashboard to configure the [Fault Injection policy](https://www.api7.cloud/docs/references/policies/traffic-management/fault-injection) easily👍🏻.

## Experiment with the Fault Injection Plugin 🔬

This part shows you how to inject faults to test the resiliency of your application.

### Before you begin 🙅

☝️ Familiarize yourself with the [fault injection concept](https://microsoft.github.io/code-with-engineering-playbook/automated-testing/fault-injection-testing/).
☝️ If you followed the previous blog post about [Manage .NET Microservices APIs with Apache APISIX API Gateway](https://dev.to/apisix/manage-net-microservices-apis-with-apache-apisix-api-gateway-2cbk), make sure you have read it and completed the steps to set up `APISIX, etcd and ASP.NET WEB API` before continuing with a demo session. Or you can see the complete source code on [Github](https://github.com/Boburmirzo/apisix-dotnet-docker) and the instruction on how to build a multi-container APISIX via Docker CLI.

### Understand the demo scenario

I assume that you have the demo project [apisix-dotnet-docker](https://github.com/Boburmirzo/apisix-dotnet-docker) up and running. In the ASP.NET Core project, there is a simple API to get all products list from the service layer in [ProductsController.cs](https://github.com/Boburmirzo/apisix-dotnet-docker/blob/main/ProductApi/Controllers/ProductsController.cs) file.

Let’s suppose that we have an _online shopping sample application_ that consists of many microservices such as `Catalog, Product, Order and etc`. When we are retrieving data about products belonging to a specific catalog, there will be service-to-service interaction between Catalog and Product services. In this case, something might go wrong due to any number of reasons.

![FIT with Apache APISIX](https://static.apiseven.com/2022/blog/0831/s3a82cmrr84vyqvceuwp.jpg)

To test the shopping application’s microservices for resiliency, we are going to simulate the product service misbehaving as a faulty service:

- By adding a **delay** to the HTTP request.
- By **aborting** the HTTP requests and returning a custom status code.

### Injecting an HTTP delay fault

In the first example, we introduce a 5-second delay for every request to the product service to test if we correctly set a connection timeout for calls to the product service from the Catalog service.

> Note that you can also specify the percentage of requests to be delayed in numbers. Like 10 means: _10% of overall requests will be delayed_. In our demo case, we made it 100% to easily test the delay in time.

The following route configuration example creates a new upstream for our backend service (productapi) that runs on port `80`, and registers a route with the `fault-injection` plugin enabled. You can notice that we set the delay injection in the plugin settings:

``` shell
curl http://127.0.0.1:9080/apisix/admin/routes/1 \
-H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
  "name": "Route for Fault Injection with the delay",
  "methods": [
    "GET"
  ],
  "uri": "/api/products",
  "plugins": {
    "fault-injection": {
      "delay": {
        "duration": 5,
        "percentage": 100
      }
    }
  },
  "upstream": {
    "type": "roundrobin",
    "nodes": {
      "productapi:80": 1
    }
  }
}'
```

Below we confirm the rule was created by running another `curl` command with the time measurement:

``` bash
time curl http://127.0.0.1:9080/api/products -i
```

After you run the cmd, you will see there is some delay was introduced:

``` text
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Transfer-Encoding: chunked
Connection: keep-alive

[{"name":"Macbook Pro","price":1500.9},{"name":"SurfaceBook 3","price":1599.9}]
real    0m5.004s
user    0m0.004s
sys     0m0.000s
```

The result of fault injection is as we expected.👏

### Injecting an HTTP abort fault

In the following example, we will introduce an HTTP abort to the product microservice to check how our imaginary Catalog service responds immediately to the failures introduced by the dependent service. Let’s say when the Product service fails, we should expect an HTTP error with the `Product service currently unavailable` error message.

We can test it in action. Now we can enable abort injection with the following route settings.

``` shell
curl http://127.0.0.1:9080/apisix/admin/routes/1 \
-H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
  "name": "Route for Fault Injection with the abort",
  "methods": [
    "GET"
  ],
  "uri": "/api/products",
  "plugins": {
    "fault-injection": {
      "abort": {
        "http_status": 503,
        "body": "The product service is currently unavailable.",
        "percentage": 100
      }
    }
  },
  "upstream": {
    "type": "roundrobin",
    "nodes": {
      "productapi:80": 1
    }
  }
}'
```

If you run `curl cmd` to hit the APISIX route, now it quickly responds with HTTP 503 error which in turn very comfortable to test catalog service how it reacts to such kind of server errors from downstream services.

``` shell
curl  http://127.0.0.1:9080/api/products -i

HTTP/1.1 503 Service Temporarily Unavailable
Content-Type: text/plain; charset=utf-8
Transfer-Encoding: chunked
Connection: keep-alive
Server: APISIX/2.13.1
```

With that we can finalize our demo example.

## Summary

As we learned, by using the fault injection method, engineers can build better and more stable systems. And open source projects like [Apache APISIX](https://apisix.apache.org/) make it more accessible for us to some fault injection testing techniques and helps you to plan for unknown failures in the distributed architecture.

## Related resources

➔ [Implementing resilient applications with API Gateway (Circuit breaker)](https://dev.to/apisix/implementing-resilient-applications-with-api-gateway-circuit-breaker-ggk).

➔ [Implementing resilient applications with API Gateway (Health Check)](https://dev.to/apisix/implementing-resilient-applications-with-api-gateway-health-check-338c).

## Recommended content 💁

➔ Watch Video Tutorial:

- [Getting Started with Apache APISIX](https://youtu.be/dUOjJkb61so).
  
- [Manage .NET Microservice API with Apache APISIX API Gateway](https://youtu.be/nU8-uQkAHA4).

➔ Read the blog posts:

- [Overview of Apache APISIX API Gateway Plugins](https://dev.to/apisix/overview-of-apache-apisix-api-gateway-plugins-2m8o).

- [Run Apache APISIX on Microsoft Azure Container Instance](https://dev.to/apisix/run-apache-apisix-on-microsoft-azure-container-instance-1gdk).

- [API Security with OIDC by using Apache APISIX and Microsoft Azure AD](https://dev.to/apisix/api-security-with-oidc-by-using-apache-apisix-and-microsoft-azure-ad-50h3).

- [API Observability with Apache APISIX Plugins](https://dev.to/apisix/apis-observability-with-apache-apisix-plugins-1bnm).
