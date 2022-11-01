---
title: "Building event-driven API services using CQRS, API Gateway and Serverless"
authors:
  - name: Bobur Umurzokov
    title: Author
    url: https://github.com/Boburmirzo
    image_url: https://avatars.githubusercontent.com/u/14247607
keywords: 
- API Gateway
- Apache APISIX
- API
- Event driven
- CQRS
- Serverless
description: This blog post explores how to build event-driven API Services using these 3 well-known patterns to build a highly scalable and distributed system.
tags: [Case Studies]
image: https://static.apiseven.com/2022/11/01/63612aab60c8d.png
---

> This blog post explores how to build event-driven API Services using these 3 well-known patterns to build a highly scalable and distributed system. We will break down each concept and understand the role of each in our particular approach.

<!--truncate-->

![Event Driven Api Services](https://static.apiseven.com/2022/09/24/632e047d6835c.jpg)

Developing API services using [CQRS](https://learn.microsoft.com/en-us/azure/architecture/patterns/cqrs), [API Gateway](https://apisix.apache.org/docs/apisix/terminology/api-gateway/) and [Serverless](https://learn.microsoft.com/en-us/dotnet/architecture/serverless/serverless-architecture) combine three patterns, using the **command query responsibility separation** (_CQRS_) pattern, the **event sourcing pattern**, and the **API Gateway** pattern. The CQRS pattern separates the responsibilities of the command and query models. The event sourcing pattern takes advantage of asynchronous [event-driven](https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/event-driven) communication to improve the overall user experience. Furthermore, an API gateway should also be implemented as a resource router, thus preventing API consumers from having to deal with different URLs depending on the action being performed.

Although the three concepts are independent, they complement each other well. This blog post explores how to build event-driven API Services using these **3 well-known patterns** to build a highly scalable and [distributed system](https://en.wikipedia.org/wiki/Distributed_computing). We will break down each concept and understand the role of each in our particular approach.

## The event-driven architecture

An **event-driven architecture** makes use of events to trigger and communicate between decoupled services.  Each service publishes an event whenever it updates its data. Other services subscribe to events. When an event is received, a service updates its data.

This architecture has several benefits such as you completely **decoupling** producer and consumer services.  If one service has a failure, the rest will keep running. Consumers can respond to events immediately as they arrive. It adds **agility** as well. If you want to add another service, you can just have it subscribe to an event and have it generate new events of its own. The existing services don’t know or care that this has happened, so there’s no impact on them.

![Event driven diagram](https://static.apiseven.com/2022/09/20/63289f6bb3090.png)

## Why not use simply CRUD

Usually, we use the same data model to query and update a database that is similar to the basic **CRUD** operations (**“CREATE”, “READ”, “UPDATE”, and “DELETE”**) and it is the most straightforward way of dealing with data manipulation. We can build API services by following this simple principle. Any tool or framework that advertises itself as a quick method to bring your application to the market. But modern applications involve more complex business processes with workflows, validation, and business logic that are difficult to express using the classic CRUD paradigm.

Some of the following challenges you can think of:

- ⛔️ Since for both read and write operations, and the same DTO or data transfer object are used, there’s a chance that read and write operations will be out of sync.

- ⛔️ The application can perform a majority of reading queries (for example, searches) where your logic is not optimized for only read operations.

- ⛔️ As both read and write activities are permitted, security and permissions become more complicated to manage.

- ⛔️ Different data representations are required in order to address the multiple API consumer needs.

As a result of these difficulties, a new set of data manipulation patterns known as **CQRS** has arisen to enhance the classic CRUD methodology.

## CQRS

**CQRS** stands for _Command and Query Responsibility Segregation_, a pattern that separates reads and writes into different models, using commands to update data, and queries to read data.

> This CQRS pattern, as it is known today, was first introduced by _Greg Young_ and was inspired by _Bertrand Meyer's_ command-query separation principle. Since its introduction, the pattern has gained a lot of popularity, and several resources can be found online describing its many flavors. This [link](https://cqrs.files.wordpress.com/2010/11/cqrs_documents.pdf) is a good source describing _Young's_ original thinking behind the pattern.

This pattern helps, as instead of having a standard service and storage supporting traditional CRUD operations, **query and upsert** (updates or creates) responsibilities are split (segregated) into different services, each with its own storage. Technically, this can be implemented in HTTP so that the **Command API** is implemented exclusively with POST routes (The write side uses a schema that is optimized for updates), while the **Query API** is implemented exclusively with GET routes (The read side can use a schema that is optimized for queries) as it is illustrated in the below diagram.

![CQRS pattern example diagram](https://static.apiseven.com/2022/09/20/63289f6ad9d61.png)

This pattern is typically combined with yet another [**event sourcing pattern**](https://learn.microsoft.com/en-us/azure/architecture/patterns/event-sourcing), as it ensures that all changes made through Command API, are reflected in the read storage as well. The problem with the CQRS scenario, the read storage won't be immediately updated as part of one transaction (for example, as in the CRUD API service case because CRUD systems perform update operations directly against a data store). As a result, the query part will be not aware of the latest changes. Such a delay in storage reflecting the latest state of a resource is referred to as eventual consistency.  The event sourcing pattern is very useful because it enables different systems to consume resource state changes as a series of events in the log via an Event Hub capability as you can see in the below diagram.

![Event sourcing with CQRS diagram](https://static.apiseven.com/2022/09/20/6328a7ca2abbc.png)

The diagram also shows the product's query operations performed against the read-only storage and the product's command operations persisted in an Event Hub capability. They are then picked up by another service called **Upsert service** responsible for upserting (create, update, and logical deletes) the read storage. Once an upsert action takes place, an event is generated that can be consumed by other services interested in any changes of state in product records.

## API Gateway

**Command and Query services APIs** can be managed via lightweight, independently deployable, and scalable **API gateways** that can run anywhere that allow developers to manage API endpoints. They can handle extremely large volumes, as they run on highly scalable platforms, for example, [Apache APISIX](https://apisix.apache.org/), [Kong](https://docs.konghq.com/), [Tyk](https://tyk.io/), and [Ambassador](https://www.getambassador.io/) to name a few.

API Gateway can help with the challenges that you meet with implementing standard policies (for example, _authorization, throttling, and rate limiting_) for APIs. As an **API Gateway** acts as a central proxy to route all incoming requests from your clients to intended destinations (backend services).

You can utilize the API Gateway to expose a [REST API](https://en.wikipedia.org/wiki/Representational_state_transfer) in front of an event-driven integration. The below diagram illustrates the pattern first and foremost by showing how an API gateway implements resourcing routing to route read calls to the product's query service and upsert calls to the product's command service.

![Building event-driven API services using CQRS, API Gateway and Serverless (2).png](https://static.apiseven.com/2022/09/20/6328a93c92d67.png)

## Serverless event processing

We can create our consumer services by using **Serverless functions**. [Serverless](https://en.wikipedia.org/wiki/Serverless_computing) is a popular event-driven architectural style that is rapidly gaining traction when building and operating cloud-native applications. Serverless platforms can be categorized into two broad categories, Function as a _Service (FaaS)_ and _Backend as a Service (BaaS)_. The FaaS method allows customers to build, deploy, run, and manage their applications without managing the underlying infrastructure. When events arrive at the Event Hub, a new serverless (a piece of code or a function) is triggered to handle the event as it is shown in the next diagram.

![Serverless, CQRS, Event sourcing and API Gateway](https://static.apiseven.com/2022/09/20/6328a7ca42d26.png)

There are many FaaS providers in the market and each platform has unique scenarios in which it shines. The largest cloud companies ([AWS](https://aws.amazon.com/), [Azure](https://azure.microsoft.com/en-us/), [Google](https://cloud.google.com/)) provide solutions ([AWS Lambda](https://aws.amazon.com/lambda/), [Azure Functions](https://learn.microsoft.com/en-us/azure/azure-functions/functions-overview), and [Google Cloud Function](https://cloud.google.com/functions) respectively) that are meant to fit nearly every situation with generic cloud products.

## Conclusion

The blog post demonstrated shortly how to build event-driven API services by using some well-known patterns that is flexible to change and more easily decomposed.

Despite some notable advantages the approach has, there are also some disadvantages as well. It increases the complexity of implementation, especially when compared with traditional CRUD services.

Since our example is based on traditional REST APIs all use HTTP as the transport and protocol layer, the situation is much more complex when it comes to event-driven APIs. However, the same approach can also be applied to multiple different protocols (for example, [WebSockets](https://en.wikipedia.org/wiki/WebSocket), [MQTT](https://mqtt.org/), or [SSE](https://en.wikipedia.org/wiki/Server-sent_events)) depending on the capabilities offered by the API gateway chosen (_For example, [Apache APISIX](https://apisix.apache.org/) supports the proxy of [gRPC Web](https://apisix.apache.org/docs/apisix/plugins/grpc-web/) protocol by means of its plug-in_) how it handles conversions from one protocol to another.

### Related resources

➔ [What do you mean by “Event-Driven”?](https://martinfowler.com/articles/201701-event-driven.html).

➔ [Command Query Responsibility Segregation](https://docs.microsoft.com/en-us/azure/architecture/patterns/cqrs).

➔ [Serverless architecture](https://learn.microsoft.com/en-us/dotnet/architecture/serverless/serverless-architecture).

➔ [API Gateway](https://apisix.apache.org/docs/apisix/terminology/api-gateway/).

### Recommended content

➔ Watch Video Tutorial:

- [Getting Started with Apache APISIX](https://youtu.be/dUOjJkb61so).
  
- [APIs security with Apache APISIX](https://youtu.be/hMFjhwLMtQ8).

- [Implementing resilient applications with API Gateway (Circuit breaker)](https://youtu.be/aWzo0ysH__c).

➔ Read the blog posts:

- [Implementing resilient applications with API Gateway (Health Check)](https://dev.to/apisix/implementing-resilient-applications-with-api-gateway-health-check-338c).

- [Overview of Apache APISIX API Gateway Plugins](https://dev.to/apisix/overview-of-apache-apisix-api-gateway-plugins-2m8o).

### Community⤵️

- 🙋 [Join the Apache APISIX Community](https://apisix.apache.org/docs/general/join/)
- 🐦 [Follow us on Twitter](https://twitter.com/ApacheAPISIX)
- 📝 [Find us on Slack](https://join.slack.com/t/the-asf/shared_invite/zt-vlfbf7ch-HkbNHiU_uDlcH_RvaHv9gQ)
- 📧 [Mail to us](dev@apisix.apache.org) with your questions.
