---
title: "Get More Details About xRPC"
authors:
  - name: "Jinchao Shuai"
    title: "Author"
    url: "https://github.com/shuaijinchao"
    image_url: "https://avatars.githubusercontent.com/u/8529452?v=4"
  - name: "Sylvia"
    title: "Technical Writer"
    url: "https://github.com/SylviaBABY"
    image_url: "https://avatars.githubusercontent.com/u/39793568?v=4"
keywords: 
- Multiple protocols
- Apache APISIX
- Java
- Multilingual
- Ecology
description: This article brings you APISIX's upcoming xRPC framework, as well as a detailed presentation of Apache APISIX in multi-language development support.
tags: [Ecosystem]
---

> This article brings you Apache APISIX's upcoming xRPC framework and related details, as well as a detailed presentation of Apache APISIX in multi-language development support.

<!--truncate-->

As business scenarios and requirements become more complex and diverse, more and more standards and protocols are emerging, and Apache APISIX, as a top open source project of the Apache Foundation, has been actively participating in and promoting the expansion of related ecological aspects.

In this article, we will bring you examples of Apache APISIX's upcoming xRPC framework and multilingual plug-ins from two perspectives: **multi-protocol proxy and multilingual support**.

## Multiprotocol Proxy

In Apache APISIX, each request corresponds to a Route object. There are currently two main proxy scenarios for Apache APISIX.

![Two proxy scenarios](https://static.apiseven.com/202108/1642732975469-74071c65-e869-4133-857f-822b58d6b86e.png)

The first is the HTTP protocol proxy, which is currently the most commonly used request proxy in APISIX. Based on the HTTP protocol proxy, Apache APISIX currently implements dozens of traffic governance capabilities, such as fine-grained flow control, security, and observability.

The second is a TCP and UDP-based dynamic protocol proxy and load balancing, which provides the most basic traffic admission capabilities and link-level logging capabilities. This proxy model can proxy any TCP/UDP protocol-based requests such as MySQL, Redis, Mongo or DNS. However, since it is a TCP/UDP based proxy without upper application layer protocols, it can only get some basic information about the quaternion, so it is a little bit weaker in terms of scalability.

### Why xRPC

Due to the limitations of Stream Route in terms of protocol proxies, and our desire to support more application layer protocols on APISIX to serve more users and application scenarios, the xRPC framework was born.

The xRPC framework makes it very easy to extend protocol capabilities, both specific and private data protocols, **with precise granularity and higher-level 7-level control similar to HTTP protocol proxies**, such as request-level observability, advanced access control, and proxy policies.

### What is xRPC

xRPC literally means that X is an abstract representation of a protocol resource. And RPC is what we consider all resources passing through the gateway as a process dispatch, i.e. it is a protocol extension framework. So in terms of positioning, xRPC is a base framework rather than an implementation of a specific protocol.

![xRPC architecture](https://static.apiseven.com/202108/1642733068660-f479ffcc-5bda-49de-bbd9-0d04d7259450.png)

As you can see from the above architecture, xRPC is a framework based on APISIX Core extensions. On top of this framework, users can implement different application layer protocols, such as Redis, MySQL, Mongo and Postgres. On top of the different protocols, you can abstract some common factors and implement related plug-in capabilities so that different protocols can share these capabilities.

So the main role of xRPC can be summarized as: **providing access to standardized application layer protocols, supporting cross-protocol capability sharing, and allowing users to get the ability to extend custom protocols.**

#### Sample Application Scenarios

With the xRPC protocol framework in place, what scenarios can it address? Here are a few examples.

- Example 1: Redis does not support TLS in earlier versions. If there are multiple versions of Redis in our system, and we cannot upgrade Redis in production for some reasons, but we need to add TLS capability. In this case, we can use the xPRC-based Redis Protocol to solve the above situation.
- Example 2: When we want to limit the frequency of certain IPs or callers and want to visualize the frequency of each call source, which Redis does not support. This is perfectly solved by using the Redis Protocol, which is extended by xRPC.
- Example 3: If you want to use MySQL to temporarily enable the slow query function, you just need to access MySQL Protocol and configure the relevant policy in APISIX, which saves you from the tedious step of logging into the instance machine by machine.

Of course, there are many similar application scenarios, and we hope that after the release of the feature, you can experience and practice more in the actual application. The process of invoking xPRC is shown in the following diagram.

![Invoke process](https://static.apiseven.com/2022/blog/0121/179175317-5cf30a8b-aac2-4538-b9a9-27f99d8d13db.png)

Once the upstream services are taken over by Apache APISIX, the different upstream application services can be managed in a unified manner. Functions such as logging, monitoring, security, and troubleshooting can all be accomplished through a standardized set of policies.

#### Planned Implementation Phases

The current design of the Apache APISIX xRPC framework is initially divided into 5 phases.

![5 phases about xRPC](https://static.apiseven.com/2022/blog/0121/179175336-3a229407-a9ac-418e-9bde-a48f4a42e056.png)

- Phase 1: Read Read data and protocol decoding.
- Phase 2: Access Phase Access phase. Provide plug-in access function, which can realize the demand scenarios of security, flow control and access.
- Phase 3: Proxy data forwarding and load balancing. Provides access support for custom load balancing policies and algorithms.
- Phase 4: Send Sending data and protocol encoding.
- Phase 5: Log Phase Logging phase. Provide plug-in access to realize the logging and logging requirements scenarios.

## Multilingual Ecology

In order to meet the increasingly rich and large computing language base, creating code support for multi-language environment has become the first threshold to cope with future technology development. Apache APISIX has also done a lot of exploration and practice on the road of multi-language development.

For example, it has recently implemented support for WebAssembly. For details and features, please refer to the article "[Apache APISIX Embraces WASM Ecology](https://apisix.apache.org/blog/2021/11/19/apisix-supports-wasm)". Of course, the support for WASM in Apache APISIX is still experimental, and we will continue to improve the support for WASM in the future. If you are interested in this project, please feel free to contribute to the [wasm-nginx-module](https://github.com/api7/wasm-nginx-module) project.

In the meantime, Apache APISIX already supports multiple development languages through the "xPluginRunner Multilanguage Plugin Runtime" before WASM support is implemented. That is, when developing APISIX plug-ins, users can write and extend APISIX plug-ins not only with Lua code, which is natively supported by APISIX, but also with their own familiar languages, such as Go, Java and Python.

### xPluginRunner

![Implementation of xPluginRunner](https://static.apiseven.com/202108/1642733411405-19b13181-0f5e-46af-837b-66e485f2e0b0.png)

The implementation of xPluginRunner is shown in the figure above. The whole communication process is "before" and "after" the execution of the built-in plug-ins, APISIX will initiate local RPC requests to the plug-in runtime of each language. In the plug-in runner, the computation and policy processing within each plug-in is implemented, and the result is finally responded to APISIX for subsequent decision making based on the response result.

The xPluginRunner serves as a bridge for communication with Apache APISIX, and mainly implements the parsing of private data protocols and the encapsulation and unencapsulation of RPC messages.

Currently, the Apache APISIX xPluginRunner solution is in a relatively stable stage, and we know from the community feedback that some enterprises have started to try it in production environments. If you are interested in this project, you are also welcome to participate in various development language plug-in projects.

- [apisix-go-plugin-runner](https://github.com/apache/apisix-go-plugin-runner)
- [apisix-java-plugin-runner](https://github.com/apache/apisix-java-plugin-runner)
- [apache-apisix-python-runner](https://github.com/apache/apisix-python-plugin-runner)

Finally, we will show you how to develop APISIX plugins based on Java Plugin Runner with a simple Java example.

### Java Plugin Runner Example

First of all, when developing the plugin, we need to implement the Interface of PluginFilter. `name` method in the Interface is mainly used to identify and extract the plugin name, and `filter` method is used to filter the request (i.e., execute the plugin body logic).

![Plugin](https://static.apiseven.com/2022/blog/0121/179175341-dfae292d-3aa2-42ed-a306-c87c47b5ace2.png)

![Interface](https://static.apiseven.com/202108/1642733657248-5b7db563-f95f-4683-997e-47e76eeda4d9.png)

One additional point to note is that the `request` and `response` parameters appearing in the above code have fixed logic in the Runner (all Runners apply):

1. If you want the request to continue to be forwarded and only do some policy settings (such as rewriting the request parameters, headers, etc.), you can simply manipulate the `request` object.
2. If you want to terminate the request, you can do it with the `response` object (e.g. set the response body, response headers, status codes, etc.).

:::note Note
APISIX will terminate the current request as soon as it senses that the `response` object in the Runner has been manipulated.
:::

Once the plug-in development is completed, it is time to practice the application in APISIX.

First, compile Runner and the plug-ins in the project into jar packages and configure the absolute path of the jar packages into the main APISIX configuration file in the following way.

![Put jar packages into the main APISIX configuration](https://static.apiseven.com/202108/1642733807923-9e3ad231-0094-4e37-a830-29973b43e495.png)

Finally, restart Apache APISIX and you are ready for the routing and plugin configuration and request validation sessions.

![Route setting](https://static.apiseven.com/202108/1642733908224-64f3ec2c-6d33-4130-b8b6-0fe10e00c48e.png)

![Request validation](https://static.apiseven.com/202108/1642733944940-69b06c71-22f7-45e4-9b6d-7f1b62167180.png)

## Summary

This article brings you the upcoming release of the xRPC framework for Apache APISIX and related details, as well as a detailed demonstration of Apache APISIX in multi-language development support.

The article also shows the details of Apache APISIX's multilanguage development support. It shows the ecology-oriented efforts of Apache APISIX from both the multiprotocol proxy and multilanguage support perspectives.

Feel free to start a discussion in [GitHub Discussions](https://github.com/apache/apisix/discussions) or communicate via the [mailing list](https://apisix.apache.org/zh/docs/general/join).
