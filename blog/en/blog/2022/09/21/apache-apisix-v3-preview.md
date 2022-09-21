---
title: "Apache APISIX 3.0: 10 Highlights of the Open Source API Gateway"
authors:
  - name: Ming Wen
    title: Author
    url: https://github.com/moonming
    image_url: https://avatars.githubusercontent.com/u/26448043
keywords:
  - Ingress controller
  - Open Source API Gateway
  - API Management Platform
  - The Best API Gateway
  - Apache APISIX
description: The open source API Gateway Apache APISIX beta version 3.0 is coming! We have selected 10 important features to give a brief introduction before the official release.
tags: [Technology, Products]
image: https://static-site.apiseven.com/wp-content/uploads/2022/09/APISIX.webp
---

> The open source API Gateway Apache APISIX beta version 3.0 is coming! We have selected 10 important features to give a brief introduction before the official release.

<!--truncate-->

[API Gateway](https://apisix.apache.org/docs/apisix/terminology/api-gateway/) acts as a basic component for a long time, and it has been committed to providing various functions such as [rate limiting](https://apisix.apache.org/docs/apisix/plugins/limit-req/), authentication (e.g., [OpenID Provider](https://apisix.apache.org/blog/2022/07/06/use-keycloak-with-api-gateway-to-secure-apis/)), and observability at the business level.

With the iteration of server-side technologies, more and more services have begun to migrate from bare metal to Kubernetes, and the original monolithic architecture has gradually evolved into a microservice architecture. At the same time, enterprises have begun to migrate their on-premise data centers to multi-cloud or hybrid clouds.

With these technical advancements in the environments, the requirements for API gateways at the business level have become increasingly complex.

## API Gateway Apache APISIX

When [Apache APISIX](http://github.com/apache/apisix) was born, it hopes to help enterprises solve new problems in the environments of cloud-native and microservices. For example, it provides auto-expansion and contraction of the business traffic through the fully dynamic feature, and one-time modification to more conveniently achieve cluster management.

Therefore, in the architectural design of APISIX, the data plane and the control plane are separated to achieve fully dynamic and cluster management, which is mainly accomplished by etcd components.

![01.png](https://static.apiseven.com/2022/09/21/632ab5bd35b73.png)

APISIX stores and manage routing-related and plugin-related configurations in etcd. As shown in the figure above, the configurations from [Admin API](https://apisix.apache.org/docs/apisix/admin-api/) (Control Plane) are stored in etcd, while the data plane on the left mainly monitors and listens for the changes of etcd. The data plane can quickly observe changes without the need to modify any configuration files.

But just solving these problems is not enough. As a middleware that has requests from both [upstream](https://apisix.apache.org/docs/apisix/terminology/upstream/) and downstream, the API gateway plays a key position in the enterprise architecture as the traffic entrance and the connection between the service layers. API gateway’s position makes it differ from databases which only receive requests from the user's business level.

In addition to business-level requirements, API gateways also have requirements for customization and integration. How to make custom development easier for developers when using APISIX, this is another significant pain point that APISIX solves, lowering the threshold for developers to code.

In APISIX, the development of plugins is mainly done through Lua, and [LuaJIT](https://apisix.apache.org/blog/2021/08/25/why-apache-apisix-chose-nginx-and-lua/) (a Just-In-Time Compiler for Lua) is used to ensure that the compiled code performance is good enough. However, as a relatively minor language, the learning cost of Lua is high for most backend engineers. To solve this problem, APISIX provides two solutions.

## Support more languages

The first solution is to support more mainstream programming languages ​​(such as [Java](https://github.com/apache/apisix-java-plugin-runner), [Python](https://github.com/apache/apisix-python-plugin-runner), Go, etc.) through [Plugin Runner](https://apisix.apache.org/docs/apisix/external-plugin/). If you are a backend engineer, you will know at least one of these languages. Using Plugin Runner, backend engineers can communicate through local RPC to develop APISIX plugins using the programming languages they are familiar with.

The advantage of this is to reduce development costs and improve development efficiency. The disadvantage will be performance losses. So, is there a way to achieve the near-native performance of Lua using high-level languages that developers are familiar with?

![02.png](https://static.apiseven.com/2022/09/21/632ab5bddbb29.png)

## Support WASM

The second solution is to use Wasm to develop plugins, as shown in the left part of the above figure. Wasm (WebAssembly) was first used as a new type of technology that runs in browsers, but now it is also gradually showing its advantages on the server side.

We embedded [Wasm](https://apisix.apache.org/docs/apisix/wasm/) into APISIX, and users can use Wasm to compile Wasm bytecode to run in APISIX. To make use of Wasm we developed a Wasm plugin where users can develop near-native APISIX plugins using high-level programming languages.

As a result, users can use Lua, Go, Python, Wasm, etc., to write custom plugins on APISIX. By making development easy, it opens doors for APISIX plugin development.

Thanks to APISIX's architecture and performance upper hand, APISIX's global user growth has far exceeded expectations in the three years since its inception. For example, Chinese big tech companies such as [WPS](https://apisix.apache.org/blog/2021/09/28/wps-usercase/), [Sina Weibo](https://apisix.apache.org/blog/2021/07/06/the-road-to-customization-of-sina-weibo-api-gateway-based-on-apache-apisix/), and [iQiyi](https://apisix.apache.org/blog/2021/09/07/iqiyi-usercase/) are all enterprise-level users who carry tens of billions of API requests per day. There are also many users in the field of scientific research institutions such as NASA and European Factory Platformwho are using it.

## 10 New Highlights of APISIX 3.0

APISIX proposed a new [3.0 Roadmap](https://github.com/apache/apisix/issues/6473) in early 2022. In version 3.0, its iterations and updates will focus on adaptability and the ecosystem.

![03.png](https://static.apiseven.com/2022/09/21/632ab5be42c5a.png)

APISIX plans to launch beta version 3.0 at the end of September. Here, we have selected the following ten eye-catching features to give a brief introduction before the official release.

### Full Support of ARM64

ARM64 has become a very mainstream server architecture selection for cloud manufacturers. From [AWS Graviton](https://apisix.apache.org/blog/2022/06/07/installation-performance-test-of-apigateway-apisix-on-aws-graviton3/), [GCP Tau T2A](https://apisix.apache.org/blog/2022/07/22/how-is-google-cloud-tau-t2a-performing/) to Huawei Kunpeng and other products, it can be seen that various cloud manufacturers have begun to launch servers based on Arm architecture. The following graph shows the stress testing performance of APISIX on popular Arm-based servers:

![04.png](https://static.apiseven.com/2022/09/21/632ab5beacad4.png)

According to the current data, the performance of Arm-based servers is slightly better than the performance of the x86. In order to conform to the technological trend of the times, APISIX also did comprehensive CI regression testing on ARM64 to ensure that users can still run various functions smoothly when running APISIX in the Arm architecture.

### Adding gRPC Client

In version 3.0, a new `core.grpc` module will be supported. If you are familiar with NGINX and OpenResty, you should know that their support for gRPC is fairly limited, only providing basic features like reverse proxy or load balancing.

APISIX has already implemented the transcode between gRPC and HTTP protocols in the current 2.x version. In version 3.0, a new gRPC client will be added to allow developers to directly call third-party gRPC services without introducing additional components or requiring service providers to use additional HTTP interfaces, making the process much simpler.

### Redesigning Admin API

When using APISIX today, you may find that the response body of APISIX is mixed with a lot of meaningless data, such as some etcd return values that are passed directly to the client without any tailoring. Also, the entire response body’s architectural design is not ideal, with many redundant fields.

In APISIX 3.0 version, the response body’s structure has been improved. The new structure makes the overall request format and return body more RESTful, making it easier for users to use the new version of Admin API. Of course, this process also allows you to set which version of the Admin API to use through parameters, freeing users from fears of upgrading to incompatible versions.

### Data Plane(DP) and Control Plane(CP) Separation

APISIX has suffered a number of security-related vulnerabilities in the last two years. The root cause of most of the vulnerabilities is that the DP and the CP are deployed together in the default deployment mode. Once there is a security vulnerability on the data plane, an attacker can directly invade the CP through the DP, thereby affecting all other DPs.

Therefore, in version 3.0, the [deployment mode](https://apisix.apache.org/docs/apisix/next/deployment-modes/) configuration is supported, and the default deployment mode is `traditional`, that is, the DP and the CP are deployed together. Of course, the new deployment mode recommends that you set the attribute to data_plane or control_plane to completely separate them.

When they are separated completely, not only the security risks mentioned above can be solved but function iterations on the DP and CP are also easier without affecting each other.

### Improved Service Discovery Support

In the current version, APISIX has supported the integration of many service discovery components, such as Apache ZooKeeper, [Consul](https://apisix.apache.org/blog/2022/02/25/consul-api-gateway/), [Nacos](https://apisix.apache.org/blog/2022/02/21/nacos-api-gateway/), and so on. But at the moment, these integrations are all done on the data plane. Once you have a lot of nodes on the DP, it will put a lot of pressure on the subsequent service discovery components. At the same time, in the actual production environment of users, what they want is not only a simple integration like Consul KV or DNS integration but a more complete integration of functions such as health checks.
Therefore, in APISIX 3.0, we added a layer of abstraction by adding a sub-project APISIX-SEED to achieve the service discovery support at the control plane level and reduce the pressure on the service discovery component.

![05.png](https://static.apiseven.com/2022/09/21/632ab5bf916e4.png)

### Adding xRPC Framework

TCP Proxy is supported in the current version of APISIX, but there are times when a pure TCP protocol proxy is not enough. What users need is a proxy for specific application protocols, such as Redis Proxy, Kafka Proxy, etc, because some functions can only be implemented after the protocol is encoded and decoded.
Therefore, in version 3.0, APISIX implements a transport layer protocol extension framework called xRPC that allows developers to customize specific application protocols. Based on xRPC, developers can encode and decode requests and responses through Lua codes, and then realize fault injection, log reporting, and dynamic routing on the basis of understanding the content of the protocol.

Based on the xRPC framework, APISIX can provide proxy implementations for several mainstream application protocols. At the same time, users can also support their own private TCP-based application protocols based on this framework, enabling them to have precise granularity and higher order application layer control similar to HTTP protocol proxy. On top of different protocols, some common factors can be abstracted to implement related plugin features, so that different protocols can share these features.

### Supporting More Observability on Transport Layer Protocols

APISIX has always invested heavily in observability support, supporting almost all observability components, such as Zipkin, Apache SkyWalking, Datadog, and more. A variety of logging components are also supported, but most of these are carried out in the application layer.

More transport layer observability support will be added in APISIX 3.0. For example, the support for Prometheus and various logs has been added, which not only enables users to easily observe the problems of application layer traffic but also enables users to check the operation status of transport layer traffic.

### Integrating the OpenAPI Specification

API is an element that involves the entire lifecycle of development from designing to coding, testing, and deploying. In APISIX 3.0, the standard OpenAPI 3.0 specification will be supported.
Therefore, if you are managing the APIs on API design and testing software, it is very easy to manage and maintain the data in APISIX by exporting and importing it. At the same time, various APIs in APISIX can also be exported through the OpenAPI 3.0 specification, and then imported into other systems for use.
In addition, APISIX 3.0 also supports Postman-related custom formats (Postman Collection Format v2), enabling data transfer between the two, thus making integration easier.

### Full Support for Gateway API and Service Mesh

Support for the Gateway API has begun in the APISIX Ingress release version, and nearly all Gateway API configurations are supported in the latest 1.5 release.
In this case, the APISIX Ingress can be configured using the Gateway API, which means you can switch between different data planes. By the end of this year, APISIX Ingress will have more complete support for the Gateway API and additional features for the transport layer and application layer.

Different from most service mesh solutions, APISIX's service mesh solution has advantages in the data plane (due to the high performance of APISIX itself). So, in the selection of the control plane, we hope it to be compatible with some mainstream solutions in the community. Finally, by using the xDS protocol to integrate with Istio and writing the obtained configuration to the xDS configuration center of APISIX, then the specific routing rules are generated by APISIX to complete the corresponding routing requests.

This solution not only makes the entire service mesh lighter but also makes custom development and migration more convenient with the high scalability of APISIX.

### Integrate More Ecosystems

In addition to the OpenAPI standard mentioned above, a lot of ecosystem plugins will be added in version 3.0, such as OpenFunction, ClickHouse, Elasticsearch, SAML, and CAS, etc., to integrate more support for authentication, security, and observability.

One of the interesting plugins, Workflow, is about traffic scheduling, through which you can do some granular processing at the traffic control level.

![06.png](https://static.apiseven.com/2022/09/21/632ab5c01580e.png)

For example, perform a certain action when condition A is true, perform another action when condition B is true, etc. In this way, users can schedule various business traffic more conveniently.

## Summary

APISIX has grown a lot from the beginning to the upcoming 3.0 version. However, APISIX has not changed much in terms of architecture, but more in terms of ecology, compatibility, and product application.

An open source project may not be judged solely on performance and functionality, but rather on the perspective of users, developers, and enterprises to consider whether they can use the product to solve their current pain points quickly and effectively.

The highlights and new features mentioned in this article are all created through the open source community, receiving feedback from different developers and enterprise users, which all make open source products more useful and vibrant.

Finally, APISIX 3.0 is expected to be released later this year, we can look forward to a lot of technical excitement with the new version!
