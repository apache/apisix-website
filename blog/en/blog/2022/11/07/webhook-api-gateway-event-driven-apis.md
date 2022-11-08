---
title: "Event-Driven APIs with Webhook and API Gateway"
authors:
  - name: Bobur Umurzokov
    title: Author
    url: https://github.com/Boburmirzo
    image_url: https://avatars.githubusercontent.com/u/14247607
keywords: 
- API Gateway
- Apache APISIX
- API
- Architecture
- Use-cases
- Webhook
- Event-driven
description: This post elaborates on building event-driven APIs by making use of Webhook and API Gateway, we understand the role of each in this solution.
tags: [Case Studies]
image: https://static.apiseven.com/2022/11/07/6368d30abf672.png
---

> There are many ways and technology options to consider when implementing an event-driven API. For example, we explored how to [build event-driven APIs using these 3 well-known patterns](https://dev.to/apisix/building-event-driven-api-services-using-cqrs-api-gateway-and-serverless-af4): [CQRS](https://learn.microsoft.com/en-us/azure/architecture/patterns/cqrs), [API Gateway](https://apisix.apache.org/docs/apisix/terminology/api-gateway/) and [Serverless](https://learn.microsoft.com/en-us/dotnet/architecture/serverless/serverless-architecture) on the previous blog post. This post elaborates on **building event-driven APIs by making use of Webhook and API Gateway**, we understand the role of each in this solution. Firstly, let’s turn our attention to the initial problem statement without the webhook in place.

<!--truncate-->

## Need for a webhook

Consuming applications expect to be informed of any change of state on a specific record or records.

Examples:

- Updating or adding customers in a CRM system triggers an event.
- Currency exchange rates from a foreign exchange application informs users about currency change.
- New post on a user's blog notifies subscribers.
- New order creation on an online shopping application informs another service in the system.
- An orchestrator service wants to be notified when Service A completes a task and when to handover the task to Service B in a data ingestion pipeline and so on.

The majority of APIs only support these types of requirements by having the consuming application constantly poll for changes. This means that the consuming application has to make frequent API calls to find out any changes of state in the desired resource. This is highly inefficient, and calls may result in empty payloads when there haven't been any updates. Also, what if the called HTTP API accepts our HTTP request but takes a long time to handle it, this could affect the user experience, especially when the behavior is reflected in the user interface (meaning a user has to refresh a page to get the latest changes).

Instead of having to constantly poll for changes, create a subscription endpoint against a specific resource so consuming applications can register their interest to be informed on any change of state (an event) by providing a call-back endpoint. At this point, it becomes the API's responsibility to send back any change of state by posting the updates to the registered endpoint.

![poll for changes vs webhook](https://static.apiseven.com/2022/11/07/6368cda2cbae7.png)

## What’s Webhook?

A [webhook](https://en.wikipedia.org/wiki/Webhook) is a software architecture approach that allows applications and services to submit a web-based notification to other applications whenever a specific event occurs. The application provides a way for users to register or connect API calls to certain events under specific conditions, such as when a new user, account, or order is created or an order ships out of a warehouse.

Webhooks are generally used to notify clients of events, in real-time, as they occur. They normally take the form of HTTP POST endpoints that can be requested with a JSON body and it is fully managed by an event consumer. An event producer, such as an API server, can send event notifications to a webhook when something interesting happens.

## Webhook and API Gateway in Event-Driven Architecture

Leveraging Webhook and API Gateway enables you to build an event-driven API that can be decoupled from your main application code. Enabling you to call external systems that have subscribed via webhooks in complete isolation from your application code.

![Webhook with an API Gateway](https://static.apiseven.com/2022/11/06/6367bd7b2ad1a.png)

As you can see in the preceding architectural diagram, there are two main flows.

### Subscription process

In the first flow on the left, API Consumers can subscribe to the API by registering a Webhook URL as the callback. A consuming application subscribing for changes in a resource by making a POST call (with the call-back URL in the body) to a resource subscription API endpoint (for example, `/{resource}/subscribe`) exposed in an API gateway. Once the API gateway receives the call, it routes the request to the subscription service, which then adds the subscriber details to a database.

![the first flow Subscription process](https://static.apiseven.com/2022/11/07/6368be4e9bba1.png)

It is also possible to unsubscribe from the API. In this scenario, API Gateway’s tasks first identify unknown messages so be sure that the request is always authenticated and credentials are valid,  it returns a `2xx response` immediately as an acknowledgment or if the request cannot be authenticated or there is an error getting the payload into a staging system, an error is returned. Then it is also passing the request to the responsible service based on the path provided by the consumer.

### Callback process

In the second flow on the right, we are delivering events to API consumers asynchronously through the call-back component and the API Gateway. An event listener service queries the database as subscribers are matched against particular processed events. The event listener service then creates call-back commands and publishes them in an Event Hub so a call-back service can execute all API calls (and retries if necessary) via the API gateway.

![the second flow Callback process](https://static.apiseven.com/2022/11/07/6368be5603f54.png)

There, API Gateway plays not only a role of a reverse proxy but can convert internal calls from one format to another. For example, the call-back service is using another [AMQP](https://www.amqp.org/) (Advanced Message Queuing Protocol) messaging protocol but the API should make a REST call to the consumer’s callback endpoint, in this gateway an API Gateway such as [Apache APISIX](https://apisix.apache.org/) can help. It can receive a REST request, then transform it to the desired format and forward it to a service, get the response, and return it to the client in REST format utilizing its [different plug-ins](https://apisix.apache.org/docs/apisix/plugins/response-rewrite/).

Also, it comes with other concerns like securing it with certificates and preventing [DDoS attacks](https://en.wikipedia.org/wiki/Denial-of-service_attack). And it enables a monitoring feature for your webhook to be able to see what is going on with the webhook, you know like what is wrong with the configuration on the API provider side.

One of the most efficient ways to handle the **webhook processing part** of the above architecture by using API Gateway of your choice and an event-driven serverless function.

## Summary

As we understood throughout the post, Webhook tries to decouple the concerns like a message acknowledgment and the processing messages in the API and no synchronous business logic is performed. However, the above architectural example we discussed can be a complicated pattern to implement given that it has many moving parts and the API are not aware of a consuming application endpoint is up and running but that can be improved. In addition to this, Webhooks force the event consumer to establish a publicly accessible HTTP endpoint to receive events that are not secure enough. We can secure it properly by enabling some authentication mechanism (Basic auth, JWT or other ways) with the API Gateway capabilities.

### Related resources

➔ [Building event-driven API services using CQRS, API Gateway and Serverless](https://dev.to/apisix/building-event-driven-api-services-using-cqrs-api-gateway-and-serverless-af4).

➔ [API Gateway](https://apisix.apache.org/docs/apisix/terminology/api-gateway/).

### Recommended content 💁

➔ Watch Video Tutorial:

- [Getting Started with Apache APISIX](https://youtu.be/dUOjJkb61so).
  
- [APIs security with Apache APISIX](https://youtu.be/hMFjhwLMtQ8).

- [Implementing resilient applications with API Gateway (Circuit breaker)](https://youtu.be/aWzo0ysH__c).

➔ Read the blog posts:

- [Implementing resilient applications with API Gateway (Health Check)](https://dev.to/apisix/implementing-resilient-applications-with-api-gateway-health-check-338c).

- [10 most common use cases of an API Gateway](https://apisix.apache.org/blog/2022/10/27/ten-use-cases-api-gateway/).
