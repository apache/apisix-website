---
title: How to choose the right API Style and Technology
authors:
  - name: Bobur Umurzokov
    title: Author
    url: https://github.com/Boburmirzo
    image_url: https://avatars.githubusercontent.com/u/14247607
keywords:
  - API Style
  - Rest
  - Event driven
  - API Technologies
  - API resources
description: "How to decide on the right API style and which technology to choose for a style."
tags: [Case Studies]
image: https://static.apiseven.com/2022/12/06/638e30968ec3e.png
---

> In this post, we’ll go through **the 5 most popular API styles** and look at very common questions like “_How to decide on the right API style and which technology to choose for a style_” and provide practical scenarios where an [API Gateway](https://apisix.apache.org/docs/apisix/terminology/api-gateway/) can supplement their weaknesses.

<!--truncate-->

<head>
    <link rel="canonical" href="https://iambobur.com/2022/12/06/how-to-choose-the-right-api-style-and-technology/" />
</head>

## No best API style

[API](https://en.wikipedia.org/wiki/API)s are an essential design element in any software architecture that interconnects components digitally and allows various systems and devices to communicate easily with each other.  When we built a new API, initially we think about the API design, and how the API interacts with the external world by using which **style and technology**.

Note that there is no single best way of approaching all problems in a software design. The same is true with API styles. There is no “_best_” API style. They all have strengths and weaknesses that depend on the problem that is being addressed.

Let’s go through each style and understand the main properties, interaction model, and limitations.

1. Resource.
2. Hypermedia.
3. Query.
4. Tunnel.
5. Event-Based.

Then we pick a suitable style and technology that works well for the given style.

## Resource style

The **resource style** as the name implies is _resource-oriented_. Many of today’s APIs use the resource style, and this can be easily verified by the popularity of [OpenAPI](https://www.openapis.org/), which is the most popular way of describing resource-oriented APIs. In this style, the main focus is on which resources to expose to consumers so that they can interact with these resources.

![Resource API style](https://static.apiseven.com/2022/12/06/638e3095ee0e7.png)

The resource in this context can be assumed to be similar in scope to what you would have in resources such as web pages when designing a website. The idea of resources gives us a great way to expose the relevant aspects of an API’s functionality and at the same time allows us to hide implementation details behind the resources. There can be resources for persistent concepts such as products, product categories, and customer information. Also, there can be resources for process-oriented concepts such as ordering products or selecting a shipping option.

For the resource style, there is [REST](https://en.wikipedia.org/wiki/Representational_state_transfer) as an architectural pattern, but that doesn’t mean that REST gives you concrete technologies. For REST, choosing [HTTP](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) as a protocol is a preferred choice, and for the representation format, it’s probably safe to say that [JSON](https://www.json.org/json-en.html) by far overshadows any other representation (such as the [XML](https://en.wikipedia.org/wiki/XML) that was popular before JSON). When a client request is made through a RESTful API, it transfers a representation of the state of the resource to the endpoint.

In developing REST APIs with many collections of resources that are integrated with backend HTTP endpoints, you can use [API Gateway features](https://apisix.apache.org/docs/apisix/getting-started/) to help you with all aspects of the API lifecycle, from creation to monitoring your production APIs. API Gateway REST APIs use a request/response model where a client sends a request to a service and the service responds back synchronously. You can read more about [how to choose the right API Gateway](https://iambobur.com/2022/11/22/how-to-choose-the-right-api-gateway/) for your REST APIs.

Resource style lacks is the ability to better represent workflows across these resources. The **hypermedia style** adds a key component to the resource style to address resource-linking concerns.

## Hypermedia Style

Just as on the web, the most important paths across resources can be navigated by simply _using links_ between them (instead of having to know each resource individually and enter its URI in the browser’s address bar); the [hypermedia style](https://www.infoq.com/articles/hypermedia-api-tutorial-part-one/) does the same but for the resources of an API.

![Hypermedia API Style](https://static.apiseven.com/2022/12/06/638e3097625fa.png)

On the web, humans read pages and then decide which link to follow. For hypermedia APIs, this decision is usually made by a machine. This means that links need to have machine-readable labels so that machines can identify the available options and then make a choice. These labels are conceptually similar to the text of a link that humans click on web pages, but the labels are represented in the machine-readable representation of resources, which nowadays in many cases will be JSON.  In a hypermedia API, where you can “_navigate_” across resources using the links between them. Resource style sometimes requires [HATEOAS](https://api-university.com/blog/rest-apis-with-hateoas/).

> _HATEOAS_ is an abbreviation for Hypermedia As The Engine Of Application State. HATEOAS is the aspect of REST, which allows for dynamic resource routing.

There are two main advantages of **hypermedia APIs over resource-style APIs**:

- They provide all the links necessary in the previous response to choose the available resources in the next step.
- Links span resources, and it doesn’t matter whether these resources are provided by one API or several APIs.

All of this sounds very positive because the Hypermedia style provides the necessary knowledge for API consumers to discover your API themselves and what resources you offer to them. You can build a hypermedia-driven REST service with any programming language and framework used in your stack. For example, using [ASP.NET Web API](https://learn.microsoft.com/en-us/archive/msdn-magazine/2013/january/asp-net-building-hypermedia-web-apis-with-asp-net-web-api) or [Spring Boot Rest API](https://spring.io/guides/gs/rest-hateoas/).

However, the ease of browsing may increase the risk of the learner skipping through the materials and getting fragmented information. Also, since data is shared between client and server, it can also lead to “_chatty_” APIs that require a number of interactions for the client to access all required information, and what if API endpoints are exposed by multiple backend services (microservices and serverless APIs)?. The latter challenge can be solved by leveraging an API Gateway with _a response aggregator/composer_ functionality.

Moreover, API consumers do not know what they want from the very beginning and it is more efficient to write a query to get exactly what they want as is offered by the **query style** in the next section.

## Query Style

The _query style_ is rather different from the resource and hypermedia styles because it provides _a single entry point_ to access a potentially large set of resources. The idea of the query style is that these resources are managed in a structured form by the API provider. This structure can be queried, and the response contains the query results. At some level, this can be seen as similar to how databases work. They have an underlying data model for the data they store, and a query language that can be used to select and retrieve parts of that data.

![Query API Style](https://static.apiseven.com/2022/12/06/638e309758164.png)

One benefit of the query style is that each consumer can request exactly what they want. This means that with a well-constructed query, it may be possible to combine results that would have required numerous requests in resource/hypermedia APIs. For example, instead of sending several HTTP requests to different endpoints, you can `POST` a single “_query_” for all you need.

For the query style, it’s probably fair to say that [GraphQL](https://graphql.org/) by now is by far the most popular choice when it comes to building [single-page applications](https://en.wikipedia.org/wiki/Single-page_application) (SPAs). It is a language for querying databases from client-side applications. The big advantage that GraphQL has is that it plugs into a JSON-based ecosystem. While GraphQL does not use JSON for queries, it returns results in JSON which make it easy to process in JSON-focused environments.

Although query style has negligible disadvantages over its advantages, we can identify one of them is the query complexity. API consumers need to have a good understanding of the underlying data and query models (so that they know how to use the query API properly and make efficient requests to avoid recursion or getting too many nested resources). Also, it is more complicated to implement a simplified cache with GraphQL than implement it in resource style because REST APIs have multiple endpoints, they can leverage native HTTP caching to avoid re-fetching resources.  Another problem with GraphQL is rate-limiting where you say we allow only this amount of requests.

Nevertheless, the last two mentioned downsides (caching and rate-limiting) can be developed by introducing the API Gateway between the client and data store to win in this situation. For example, an open-source  [Apache APISIX](https://apisix.apache.org/) API Gateway has the matching ability to recognize GraphQL syntax. By efficiently matching GraphQL statements carried in requests, it can filter out abnormal traffic to further apply [rate-limiting policies](https://apisix.apache.org/docs/apisix/tutorials/protect-api/) and improve system performance with its [caching capability](https://apisix.apache.org/docs/apisix/tutorials/cache-api-responses/).

## Tunnel Style

In _tunnel style_, an API is a collection of functions that can be invoked remotely. APIs become a simple extension of what is in a local programming scenario where all exposed procedures are available as APIs. The tunnel style is convenient for developers because it can take very little effort to create APIs.

![Tunnel API Style](https://static.apiseven.com/2022/12/06/638e3095e2fe3.png)

A common technique used in this style is the [Remote Procedure Call](https://en.wikipedia.org/wiki/Remote_procedure_call) method.  RPC is a request-response protocol, where a client sends a request to a remote server to execute a specific procedure, and then the client receives a response back. However, RPC APIs are much more difficult to maintain and update than REST APIs, so again RPC APIs aren’t used as much in modern API development.

[gRPC](https://grpc.io/) is an efficient tunnel-style (RPC) implementation and is well-suited for distributed systems. It has SDKs for many languages and platforms, so it can be used widely, for communication across platforms and languages. gRPC is super fast and efficient because it uses [Protocol Buffers](https://en.wikipedia.org/wiki/Protocol_Buffers) (protobufs) to serialize and deserialize, the HTTP/2 standard for optimized binary transfers,  and bidirectional streaming to avoid (long) polling and blocking HTTP calls.

Tools can be used to expose procedures as APIs, in which case a lot of the task of “creating the API” can be automated. There still should be some management layer for securing the APIs, but that can be addressed by using a component such as an API gateway and its [gRPC proxying](https://apisix.apache.org/blog/2021/12/30/apisix-proxy-grpc-service/) ability to convert payloads from one format to another over the same transport (from REST to gRPC or vice versa) if different API protocols are used in the system.

## Event-Based Style

In the _event-based style_, the API provider creates events that are then delivered to consumers of the API instead of consumers requesting something from the provider. Consuming applications expect to be informed of any change of state on a specific record or records on API. There are many ways and technology options to consider when implementing an event-driven API. For example, we explored [how to build Event-Driven APIs with Webhook and API Gateway](https://apisix.apache.org/blog/2022/11/07/webhook-api-gateway-event-driven-apis/) in this post.

![Event-Based API Style](https://static.apiseven.com/2022/12/06/638e31d5902df.png)

Another approach is that event consumers connect to a _message broker_ that decouples them from event producers. The message broker takes care of managing events, and consumers must subscribe to certain event types so that the broker can make sure that events of this type are delivered to subscribers. In this case, the architecture is much more centered around the delivery broker, and all event producers and consumers are connected to this message broker. In this case, a good technology to consider can be [Kafka](https://kafka.apache.org/) which is Kafka is highly scalable and resilient.

Some drawbacks of choosing an event-based style are, it takes more time to implement compared to other styles, it may trigger multiple duplicate messages across different services if the style is not properly applied, error handling and troubleshooting can be challenging without installing & configuring third-party tools to monitor the event flow effectively. However, you can put the API Gateway in front of even-driven APIs when [observing modern applications](https://dev.to/apisix/apis-observability-with-apache-apisix-plugins-1bnm) with its simple built-in integration to several monitoring platforms.

## Wrapping Up

As we reviewed,  5 styles were the foundation of popular approaches and technologies such as [REST](https://en.wikipedia.org/wiki/Representational_state_transfer), [OpenAPI](https://www.openapis.org/), [HTTP](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol), [gRPC](https://grpc.io/), [GraphQL](https://graphql.org/), and [Kafka](https://kafka.apache.org/). The most important lesson to learn about these **5 API styles** is that there is no “best style”. When it comes to choosing an API style, it all boils down to the **following 3 classes**: _a problem, consumers, and context_.

**Problem** - As discussed in the individual styles, each style has a certain focus and certain strengths. Thus, it is important to think about the problem that is addressed with an API.

**Consumer** - Every API is built for consumption, and thus an API’s consumers always should be an important design aspect. Since APIs ideally are reused, it’s not always possible to plan for all consumers and their constraints, but it makes sense to design with at least some consumers in mind and to make assumptions about others.

**Context** - Most APIs are part of an API landscape. That landscape can have a different audience and scope, depending on whether the API is meant for internal, partner, or public use.

Ultimately, the style that you and your team are more familiar with and easier to build might be a good fit for your project. Sometimes, we need to use different styles together in one software project.  

### Related resources

- [API fundamentals](https://developer.ibm.com/articles/api-fundamentals/).

- [API Styles: SOAP, REST, RPC, GraphQL and more](https://api-university.com/blog/styles-for-apis-soap-rest-and-rpc/).

### Recommended content

- [How to build Event-Driven APIs with Webhook and API Gateway](https://apisix.apache.org/blog/2022/11/07/webhook-api-gateway-event-driven-apis/)

- [10 most common use cases of an API Gateway](https://apisix.apache.org/blog/2022/10/27/ten-use-cases-api-gateway/).

- [How to choose the right API Gateway](https://iambobur.com/2022/11/22/how-to-choose-the-right-api-gateway/).

- [A poor man's API](https://apisix.apache.org/blog/2022/11/23/poor-man-api/).
