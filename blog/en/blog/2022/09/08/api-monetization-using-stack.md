---
title: "API monetization using an API Management and a billing provider"
authors:
  - name: Bobur Umurzokov
    title: Author
    url: https://github.com/Boburmirzo
    image_url: https://avatars.githubusercontent.com/u/14247607
keywords: 
- API Gateway
- Apache APISIX
- Monetization
- API
- Microservices
- Rate limiting
- Quota
description: 💁🏼 This blog post gives you an idea of building your technology stack with an API Gateway and a payment provider that can help you run quickly and securely your API monetization system which simply provides flexibility for your customers.
tags: [Case Studies]
image: https://static.apiseven.com/2022/10/25/6357addd22a01.png
---

> 💁🏼 This blog post gives you an idea of building your technology stack with an [API Gateway](https://apisix.apache.org/docs/apisix/terminology/api-gateway/) and a [payment provider](https://en.wikipedia.org/wiki/List_of_online_payment_service_providers) that can help you run quickly and securely your API monetization system which simply provides flexibility for your customers.

<!--truncate-->

![Api Monetization Technological Stack](https://static.apiseven.com/2022/09/08/63199c499a244.png)

## API Monetization

As an owner of API, you develop some code and deploy it to a server. That server might have a bunch of HTTP/HTTPs endpoints that do something useful. Maybe like retrieving data about all current discounts and voucher information from different markets in your city. And other developers want to use this data but they do not want to implement the same solution on their own. So, they reach out to you for permission to make requests to your server.

Using **APIs** is an ideal way to **monetize your services**. An API lets you reach customers through multiple channels and allows third-party applications or developers to consume your data. API monetization is a way that businesses can use APIs to convert usages of the data into money 💸. When it comes to making money from your APIs, there are multiple ways. Most often you think about how to get started with the right tools and how to set up billing for your APIs.

### Here is a quick overview of what we covered 👇

- ✅ Monetization options.
- ✅ Two common ways to monetize APIs.
- ✅ Simple API monetization stack components: an API Management and a billing provider.
- ✅ How API Management and a payment platform work together.
- ✅ How to apply rate limiting policies.
- ✅ How Apache APISIX can be useful to monitor and limit API usage.

![APISIX API Monetization](https://static.apiseven.com/2022/09/08/63199c4a813a7.png)

## API monetization models

There are several pricing approaches you can take for monetization. When you are developing **API monetization strategies**, you should always consider that you deliver high-quality, consistent value to your API users. As the API Provider, you talk to your current API users to identify problems your service is solving and offer pricing models according to the target customer. For example, if customers use one specific feature of your API more than others, you could spin that feature off into its own product with its own pricing plan.

![API Monetization customer agreement](https://static.apiseven.com/2022/09/08/63199c4a07f63.png)

Some API billing models for monetization include:

- [Freemium](https://en.wikipedia.org/wiki/Freemium).
- [Pay as you go](https://en.wikipedia.org/wiki/Pay-as-you-use).
- [Subscription](https://en.wikipedia.org/wiki/Subscription_business_model).
- [Pay-per-transaction](https://en.wikipedia.org/wiki/Pay_per_sale).
- [Revenue share](https://en.wikipedia.org/wiki/Revenue_sharing).
- [Pay for ad-free content](https://en.wikipedia.org/wiki/Pay-per-click).
- [Paid partner](https://www.softwareag.com/en_corporate/resources/what-is/api-monetization.html#:~:text=low%2Dcost%20apps.-,Paid%20partner%3A,-In%20this%20model).

![API Monetization models](https://static.apiseven.com/2022/09/08/63199c603bd09.png)

In the freemium model, Developers have access to a basic API for free up to a specific threshold and transition to pay-per-use in a tiered pricing model when they exceed that limit. This model is quite often used to explore API use cases, test your APIs, or make quick a proof of concept. You can learn more about other models in depth [here](https://www.softwareag.com/en_corporate/resources/what-is/api-monetization.html).

## Two common ways to monetize APIs

Let’s take a look closely at the most common ways to directly monetize your APIs like the **Subscription billing model**, where you charge your customers a flat monthly fee to access your APIs; and **Metered billing model**, where you charge your customers based on the number of API calls they make.

### Subscription Billing Model

In this model, API Consumer pays for a set of numbers of calls per month. For example, a consumer pays $100 to access up to 10,000 API calls per month. Whether they make 0 API calls or 10,000 API calls, the consumer is charged $100 each month.

### Metered Billing Model

With a **Metered Billing model**, API Consumers can make as many calls as they want per month and you only charge the consumer a fee for each API call they make. If the customer makes 7,000 API calls at $0.01 per call then the bill at the end of the month would be $70.

### Calculating bills

Calculating bills in subscription-based pricing model is very straightforward because you don’t need to count how many API calls were made. Instead, you charge each user a flat monthly fee. However, calculating bills for metered users might be a little bit challenging since we need to have custom code in your API service that not only tracks API usage but it should be also capable of applying rate limiting policies to the APIs depending on users accessing your APIs.

![Calculating bills](https://static.apiseven.com/2022/09/08/63199ca23e5bc.png)

In this case, we might need to consider a suitable API monetization stack with existing solutions to build a solid foundation for your API monetization that reduces the time and investment required to build your own service to measure API usage.

## Two simple API monetization stack components

We can choose the combination of two elements for our API monetization stack that most modern businesses are using nowadays: API Management like **an API Gateway** and **a billing provider**. Let’s break down each component and understand the role of each in API monetization.

### API Management

API Management service itself offers two helpful features such as _API Gateway and API Analytics_). **API analytics feature** can be used for tracking API usage because the analytics is able to collect API consumption metrics around every API call made by each of your API consumers. This usage data can be used to bill each consumer and send an invoice to collect monthly payments.

For example, [Apache APISIX](https://apisix.apache.org/) can also integrate with a variety of observability platforms like [Prometheus](https://prometheus.io/), [OpenTelemetry](https://opentelemetry.io/), [Apache Skywalking](https://skywalking.apache.org/) and etc. by using its [connector plugins](https://apisix.apache.org/plugins/) 🔌 to further analyze API performance and gain complete visibility.

**API Gateway** can help with the challenges that you meet with implementing cross-cutting concerns for APIs. As an API Gateway acts as a central proxy to route all incoming requests from your clients to intended destinations (backend services), it can make securing and managing your APIs much easier. Most gateways support a wide variety of authorization and authentication protocols to control API access, caching mechanisms for API responses, or support for rate limiting and exposing quotas with API usage details.  

There are many popular open-source projects available like [Apache APISIX](https://apisix.apache.org/) or alternative enterprise SaaS solutions such as [Azure API Management](https://docs.microsoft.com/en-us/azure/api-management/), [API7 Cloud](https://api7.ai/cloud) in a public cloud. You can investigate the pros and cons of each to choose the more suitable one for your needs.

![Apache APISIX API Gateway](https://static.apiseven.com/2022/09/08/63199cc33bd68.png)

#### Apply rate limit policies

Resources cost money 💰. We can protect an API by adding _a rate limit policy_ with Apache APISIX as it is a basic step toward API Monetization. Apache APISIX allows you to set throttling limits per each API consumer and quotas to your APIs and allows you to control third-party usage of your API by ensuring you are able to monetize your API.

APISIX uses its `limit-count` (_rate limiting_) plugin. [API rate limiting plugin](https://apisix.apache.org/docs/apisix/plugins/limit-count/) can prevent an API not only from being overwhelmed or from possible malicious attacks but also it can enforce a limit on the number of data clients can consume. Later you can charge API consumers by the quantity of data used (the number of requests).

With the help of APISIX `rate-limiting` plugin, you can also configure the different rate limits for authenticated and unauthenticated requests. It also defines the limit quota in the [response headers](https://apisix.apache.org/docs/apisix/plugins/limit-count/) to track the maximum number of requests you are permitted to make or the number of requests remaining in the current rate limit window.

Refer to the documentation to understand [Consumer concept](https://apisix.apache.org/docs/apisix/terminology/consumer/) and learn the different ways to set up [rate limiting](https://apisix.apache.org/docs/apisix/plugins/limit-count/) with Apache APISIX.

### A billing provider

Next, for your API monetization stack, you need a 3rd-party recurring billing solution, such as [Stripe](https://stripe.com/en-gb-ee), [Recurly](https://recurly.com/), [Hypercurrent](https://www.hypercurrent.io/), and many more. But again, we do not recommend any particular payment service in this post and leave the choice of which payment provider to use up to you. The billing provider obviously needs to receive usage charges for each customer, issue an invoice, and support multiple billing models, currencies 💵 💴 💶 💷, and payment methods.

### How API Management and a billing platform work together

To make these two API monetization components work well together, you need to integrate API Management and billing software. For instance, Apache APISIX tracks API usage in real-time saves consumption details and exposes a dedicated endpoint with an API usage report. On the other hand, the billing provider enables you to send a monthly invoice to each of your consumer’s API usage.

You’ll also want to be aware of what it takes to integrate the billing provider with your current solution by considering the fact that different providers have different ways to integrate mainly through _API communication_. We will describe the integration process with Apache APISIX with a step-by-step tutorial in our next post in this series.

## Conclusion

As we went through the post, there is an effortless way to monetize your API that consists of two components an API Management service and a billing provider.  To get started, identify your API monetization model as the first step. Next, manage your APIs with an API Gateway, and set throttling limits and quotas to your APIs. Then, choose a proper payment provider to deal with processing payment transactions, issuing invoices, and managing subscriptions. On a later stage, apply API analytics to your system so you can monitor API usage and scale it as needed. You can review the analytics reports regularly to understand how your monetization strategy is being adopted by API consumers.

### Related resources

➔ [What is API monetization?](https://www.softwareag.com/en_corporate/resources/what-is/api-monetization.html).

➔ [Best SaaS Subscription Billing Solution](https://www.zeni.ai/blog/best-saas-subscription-billing-solution-chargebee-vs-recurly-vs-stripe-billing).

➔ [API Monetization Models](https://medium.com/@madhukaudantha/api-monetization-models-f9d21c95bdc8).

### Recommended content 💁

➔ Watch Video Tutorial:

- [Getting Started with Apache APISIX](https://youtu.be/dUOjJkb61so).
  
- [APIs security with Apache APISIX](https://youtu.be/hMFjhwLMtQ8).

➔ Read the blog posts:

- [Overview of Apache APISIX API Gateway Plugins](https://dev.to/apisix/overview-of-apache-apisix-api-gateway-plugins-2m8o).

- [API Observability with Apache APISIX Plugins](https://dev.to/apisix/apis-observability-with-apache-apisix-plugins-1bnm).

### Community⤵️

🙋 [Join the Apache APISIX Community](https://apisix.apache.org/docs/general/join/)
🐦 [Follow us on Twitter](https://twitter.com/ApacheAPISIX)
📝 [Find us on Slack](https://join.slack.com/t/the-asf/shared_invite/zt-vlfbf7ch-HkbNHiU_uDlcH_RvaHv9gQ)
📧 [Mail to us](dev@apisix.apache.org) with your questions.
