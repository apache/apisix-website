---
title: The right feature at the right place
authors:
  - name: Nicolas Fränkel
    title: Author
    url: https://github.com/nfrankel
    image_url: https://avatars.githubusercontent.com/u/752258
keywords:
  - Cross-cutting concerns
  - Architecture
  - Resiliency
  - Solution Architecture
description: >
  Before moving to Developer Relations, I transitioned from Software Architect to Solution Architect long ago. It's a reasonably common career move. The problem in this situation is two-fold:

  1. You know perfectly well software libraries
  2. You don't know well infrastructure components

  It seems logical that people in this situation try to solve problems with the solutions they are most familiar with. However, it doesn't mean it's the best approach. It's a bad one in most cases.
tags: [Ecosystem]
image: https://static.apiseven.com/uploads/2023/03/01/UTBANOhW_choice-geedae7b7e1.jpg
---

> Before moving to Developer Relations, I transitioned from Software Architect to Solution Architect long ago. It's a reasonably common career move. The problem in this situation is two-fold:
>
> 1. You know perfectly well software libraries
> 2. You don't know well infrastructure components
>
>It seems logical that people in this situation try to solve problems with the solutions they are most familiar with. However, it doesn't mean it's the best approach. It's a bad one in most cases.

<!--truncate-->

<head>
    <link rel="canonical" href="https://blog.frankel.ch/right-feature-right-place/" />
</head>

## A concrete example

Imagine an API application. It runs on the JVM, and it's written in the "Reactive" style with the help of the Spring Boot framework.

One of the requirements is to limit the number of calls a user can make in a timeframe. In the API world, such a Rate Limiting feature is widespread.

With my software architect hat on, I'll search for a JVM library that does it. Because I have a bit of experience, I know of the excellent Bucket4J library:

>Java rate-limiting library based on token-bucket algorithm
>
>-- [Bucket4J](https://github.com/bucket4j/bucket4j)

It's just a matter of integrating the library into my code:

```kotlin
val beans = beans {
    bean {
        val props = ref<BucketProperties>()                  //1
        BucketFactory().create(                              //2
            props.size,
            props.refresh.tokens,
            props.refresh.duration
        )
    }
    bean {
        coRouter {
            val handler = HelloHandler(ref())                //3
            GET("/hello") { handler.hello(it) }
            GET("/hello/{who}") { handler.helloWho(it) }
        }
    }
}

class HelloHandler(private val bucket: Bucket) {             //3

    private suspend fun rateLimit(                           //4
        req: ServerRequest,
        f: suspend (ServerRequest) -> ServerResponse
    ) = if (bucket.tryConsume(1))
            f.invoke(req)
        else
            ServerResponse.status(429).buildAndAwait()

    suspend fun hello(req: ServerRequest) = rateLimit(req) { //5
        ServerResponse.ok().bodyValueAndAwait("Hello World!")
    }
}
```

1. Get configuration properties from a `@ConfigurationProperties`-annotated class
2. Create a properly-configured bucket
3. Pass the bucket to the handler
4. Create a reusable rate-limiting wrapper based on the bucket
5. Wrap the call

At this point, the bucket is for the whole app. If we want a dedicated bucket per user, as per the requirements, we need to:

1. Bring in Spring Security to authenticate users (or write our own authentication mechanism)
2. Create a bucket per user
3. Store the bucket server-side and bind it to the user session

While it's perfectly acceptable, it's a lot of effort for a feature that one can implement cheaper elsewhere.

## The golden case for API Gateways

>A place for everything, everything in its place

This quote is associated with Samuel Smiles, Mrs. Isabella Beeton, and Benjamin Franklin.

In any case, cross-cutting features don't belong in the application but in infrastructure components. Our feature is an API, so it's a perfect use-case for an API Gateway. We can simplify the code by removing Bucket4J and configuring an API Gateway in front of the application.

Here's how to do it with [Apache APISIX](https://apisix.apache.org/).

```yaml
consumers:
  - username: joe
    plugins:
      key-auth:                               #1
        key: joe
  - username: jane
    plugins:
      key-auth:                               #1
        key: jane
routes:
  - uri: /hello*
    upstream:
      type: roundrobin
      nodes:
        "resilient-boot:8080": 1
    plugins:
      limit-req:                              #2
        rate: 1
        burst: 0
        key: consumer_name                    #3
        rejected_code: 429
      key-auth: ~                             #1
```

1. We use a simple HTTP header for authentication for demo purposes. Real-world apps would use OAuth2.0 or OpenID Connect, but the principle is the same
2. Rate limiting plugin
3. Configure a bucket per consumer

## Discussion: what belongs where?

Before answering the question, let me go through a detour first. The book [Thinking, Fast and Slow](https://en.wikipedia.org/wiki/Thinking,_Fast_and_Slow) makes the case that the brain has two "modes":

>The book's main thesis is that of a dichotomy between two modes of thought: "System 1" is fast, instinctive and emotional; "System 2" is slower, more deliberative, and more logical.

Also, System 2 is much more energy-consuming. Because we are lazy, we tend to favor System 1 - fast and instinctive. Hence, as architects, we will generally favor the following:

* Solutions we are familiar with, _e.g._, libraries for former software architects
* Rules to apply blindly. As a side comment, it's the main reason for herd mentality in the tech industry, such as "microservices everywhere"

Hence, take the following advice as guidelines and not rules. Now that this has been said, here's my stance.

First, you need to categorize whether the feature is purely technical. For example, classical rate-limiting to prevent <abbr title="Distributed Denial of Service">DDoS</abbr> is purely technical. Such technical features belong in the infrastructure: every Reverse-Proxy worth its salt has this kind of rate-limiting.

The more business-related a feature, the closer it must be to the application. Our use-case is slightly business-related because rate-limiting is per user. Still, the API Gateway provides the feature out of the box.

Then, know your infrastructure components. It's impossible to know all the components, but you should have a passing knowledge of the elements available inside your org. If you're using a Cloud Provider, get a map of all their proposed services.

Regarding the inability to know all the components, talk to your SysAdmins. My experience has shown me that most organizations must utilize their SysAdmins effectively. The latter would like to be more involved in the overall system architecture design but are rarely requested to. Most SysAdmins love to share their knowledge!

You also need to think about configuration. If you need to configure each library component on each instance, that's a huge red flag; prefer an infrastructure component. Some libraries offer a centralized configuration solution, _e.g._, [Spring Cloud Config](https://docs.spring.io/spring-cloud-config/). Carefully evaluate the additional complexity of such a component and its failure rate compared to other dedicated infrastructure components.

Organizations influence choice *a lot*. The same problem in two different organizational contexts may result in two opposite solutions. Familiarity with a solution generally trumps other solutions' better fit.

Finally, as I mentioned in the introduction, your experience will influence your choices: former software architects prefer app-centric solutions, and former sys admins infrastructure solutions. One should be careful to limit one's bias toward one's preferred solution, which might not be the best fit in a different context.

## Conclusion

In this post, I've taken the example of per-user rate limiting to show how one can implement it in a library and an infrastructure component. Then, I generalized this example and gave a couple of guidelines. I hope they will help you make better choices regarding where to place a feature in your system.

The complete source code for this post can be found on [GitHub](https://github.com/ajavageek/resilient-boot).

**To go further:**

* [Bucket4J](https://github.com/bucket4j/bucket4j)
* [Spring Cloud Config](https://docs.spring.io/spring-cloud-config/)
* [Apache APISIX rate limiting plugin](https://apisix.apache.org/docs/apisix/plugins/limit-req/)
