---
title: "Apache APISIX 3.0: 11 Highlights of Open Source API Gateway"
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
description: The open source API Gateway Apache APISIX version 3.0 is coming! We have selected 11 essential features to give a brief overview.
tags: [Products]
image: https://static.apiseven.com/2022/10/19/634f6677742a1.png
---

> The open source API Gateway Apache APISIX version 3.0 is coming! We have selected 11 essential features to give a brief overview.

<!--truncate-->

[API Gateway](https://apisix.apache.org/docs/apisix/terminology/api-gateway/) has acted as an essential component for a long time. It has been committed to providing various functions such as [rate limiting](https://apisix.apache.org/docs/apisix/plugins/limit-req/), authentication (e.g., [Use Keycloak to secure APIs](https://apisix.apache.org/blog/2022/07/06/use-keycloak-with-api-gateway-to-secure-apis/)), and observability at the business level.

## API Gateway Apache APISIX

[Apache APISIX](http://github.com/apache/apisix) was born to help enterprises solve new problems in cloud-native environments and microservices. For example, it provides autoscaling of the business traffic through the fully dynamic feature and one-time modification to more conveniently achieve cluster management.

Therefore, in the architectural design of APISIX, the data plane and the control plane are separated to achieve fully dynamic and cluster management, which is mainly accomplished by etcd components.

![Apache APISIX  Architecture](https://static.apiseven.com/2022/09/21/632ab5bd35b73.png)

APISIX stores and manages routing-related and plugin-related configurations in etcd. As shown in the figure above, the configurations from [Admin API](https://apisix.apache.org/docs/apisix/admin-api/) (Control Plane) are stored in etcd, while the data plane on the left mainly monitors the changes of etcd. The data plane can quickly observe changes without needing to modify configuration files.

But just solving these problems is not enough. As a middleware with requests from both [upstream](https://apisix.apache.org/docs/apisix/terminology/upstream/) and downstream, the API gateway plays a crucial position in the enterprise architecture as the traffic entrance and the connection between the service layers. API gateway's role differs from databases that only receive requests from the user's business level.

In addition to business-level requirements, API gateways also have requirements for customization and integration. So how to make custom development easier for developers when using APISIX is another significant pain point that APISIX solves, lowering the threshold for developers to code.

In APISIX, plugins are developed mainly through Lua, and [LuaJIT](https://apisix.apache.org/blog/2021/08/25/why-apache-apisix-chose-nginx-and-lua/) (a Just-In-Time Compiler for Lua) is used to ensure that the compiled code performance is good enough.

If you are not familiar with Lua, you can use Plugin Runner, developing APISIX plugins using the programming languages you are familiar with. We also embedded [Wasm](https://apisix.apache.org/docs/apisix/wasm/) into APISIX, and you can utilize Wasm to compile Wasm bytecode to run in APISIX. As a result, users can use Lua, Go, Python, Wasm, etc., to create custom plugins on APISIX.

Thanks to APISIX's architecture and performance upper hand, APISIX's global user growth has far exceeded expectations in the three years since its inception. For example, big tech companies such as [WPS](https://apisix.apache.org/blog/2021/09/28/wps-usercase/), [Sina Weibo](https://apisix.apache.org/blog/2021/07/06/the-road-to-customization-of-sina-weibo-api-gateway-based-on-apache-apisix/), and [iQiyi](https://apisix.apache.org/blog/2021/09/07/iqiyi-usercase/) are enterprise-level users carrying tens of billions of API requests daily. In addition, scientific research institutions such as NASA and European Factory Platform are using APISIX.

## 11 New Highlights of APISIX 3.0

APISIX proposed a new [3.0 Roadmap](https://github.com/apache/apisix/issues/6473) in early 2022. In version 3.0, its iterations and updates will focus on usability and the ecosystem.

![Apache APISIX 3.0 Roadmap](https://static.apiseven.com/2022/09/22/632bd6f95717a.png)

APISIX 3.0 has been officially released in late October 2022. Let's have an overview of the exciting new highlights!

### 1. Full Support of ARM64

ARM64 has become a very mainstream server architecture selection for cloud manufacturers. From [AWS Graviton](https://apisix.apache.org/blog/2022/06/07/installation-performance-test-of-apigateway-apisix-on-aws-graviton3/), [GCP Tau T2A](https://apisix.apache.org/blog/2022/07/22/how-is-google-cloud-tau-t2a-performing/) to Huawei Kunpeng and other products, we can see that various cloud manufacturers have begun to launch servers based on the Arm architecture. The following graph shows the stress testing performance of APISIX on popular Arm-based servers:

![Apache APISIX Benchmark](https://static.apiseven.com/2022/09/21/632ab5beacad4.png)

According to the current data, the performance of Arm-based servers is slightly better than the performance of the x86. To conform to the technological trend of the times, APISIX also did comprehensive CI regression testing on ARM64 to ensure that users can still run various functions smoothly when running APISIX in the Arm architecture.

### 2. AI Plane

Apache APISIX adds an AI plane in the 3.0 version, improving the performance by 30% (measured by QPS under stress testing). The AI plane would dynamically optimize the data plane configuration, utilizing comprehensive data such as users' settings on routes and plugins, as well as log metrics. For example, the following three scenarios can be automatically optimized by the AI plane:

1. When the matching requirement is simple (e.g. only containing uri or host), cache is enabled to accelerate the route matching process
2. If there is no plugin, only the code related to the upstream would be run
3. If there is only one upstream node and no other configuration option is enabled, the upstream would be configured in a lightweight way

The AI plane brings new possibilities to traffic processing. In the future, an automatic warm-up of upstream services and security threat detection can all be processed through the AI plane.

### 3. Adding gRPC Client

In version 3.0, Apache APISIX will support a new `core.grpc` module. However, if you are familiar with NGINX and OpenResty, you should know that their support for gRPC is pretty limited, only providing basic features like reverse proxy or load balancing.

APISIX has already implemented the transcode between gRPC and HTTP protocols in the current 2.x version. In version 3.0, Apache APISIX will add a new gRPC client to allow developers to directly call third-party gRPC services without introducing additional components or requiring service providers to use different HTTP interfaces, making the process much simpler.

### 4. Redesigning Admin API

When using APISIX today, you may find that the response body of APISIX is mixed with a lot of meaningless data, such as some etcd return values that are passed directly to the client without any tailoring. Also, the entire response body’s architectural design is not ideal, with many redundant fields.

In APISIX 3.0 version, the response body’s structure has been improved. In addition, the new design makes the overall request format and returns body more RESTful, making it easier for users to use the latest version of Admin API. Of course, this process also allows you to set which version of the Admin API to use through parameters, freeing users from fears of upgrading to incompatible versions.

### 5. Data Plane(DP) and Control Plane(CP) Separation

APISIX has suffered several security-related vulnerabilities in the last two years. The root cause of most vulnerabilities is that the DP and the CP are deployed together in the default deployment mode. Therefore, once a security vulnerability exists on the data plane, an attacker can directly invade the CP through the DP, affecting all other DPs.

Therefore, in version 3.0, the [deployment mode](https://apisix.apache.org/docs/apisix/next/deployment-modes/) configuration is supported, and the default deployment mode is `traditional`, where the DP and the CP are deployed together. Of course, the new deployment mode recommends that you set the attribute to data_plane or control_plane to separate them.

When they are separated, not only can the security risks mentioned above be solved, but function iterations on the DP and CP are also more manageable without affecting each other.

### 6. Improved Service Discovery Support

In the current version, APISIX has supported the integration of many service discovery components, such as Apache ZooKeeper, [Consul](https://apisix.apache.org/blog/2022/02/25/consul-api-gateway/), [Nacos](https://apisix.apache.org/blog/2022/02/21/nacos-api-gateway/), and so on. But at the moment, these integrations are all done on the data plane. Once you have a lot of nodes on the DP, it will put much pressure on the following service discovery components. At the same time, in the actual production environment of users, they want a simple integration like Consul KV or DNS integration and complete integration of functions such as health checks.

Therefore, in APISIX 3.0, we added a layer of abstraction by adding a sub-project APISIX-SEED to achieve the service discovery support at the control plane level and reduce the pressure on the service discovery component.

![Apache APISIX with Service Discovery](https://static.apiseven.com/2022/09/21/632ab5bf916e4.png)

### 7. Adding xRPC Framework

TCP Proxy is supported in the current version of APISIX, but there are times when a pure TCP protocol proxy is insufficient. Users need a proxy for specific application protocols, such as Redis Proxy, Kafka Proxy, etc., because some functions can only be implemented after the protocol is encoded and decoded.

Therefore, in version 3.0, APISIX implements a transport layer protocol extension framework called xRPC that allows developers to customize specific application protocols. Based on xRPC, developers can encode and decode requests and responses through Lua codes and then realize fault injection, log reporting, and dynamic routing based on understanding the content of the protocol.

Based on the xRPC framework, APISIX can provide proxy implementations for several mainstream application protocols. At the same time, users can also support their own private TCP-based application protocols based on this framework, enabling them to have precise granularity and higher order application layer control similar to HTTP protocol proxy. Furthermore, on top of different protocols, some common factors can be abstracted to implement related plugin features so that other protocols can share these features.

### 8. Supporting More Observability on Transport Layer Protocols

APISIX has always invested heavily in observability support, supporting almost all observability components, such as [Zipkin](https://apisix.apache.org/blog/2022/02/28/apisix-integration-opentelemetry-plugin), [Apache SkyWalking](https://apisix.apache.org/blog/2021/12/07/apisix-integrate-skywalking-plugin/), [Datadog](https://apisix.apache.org/blog/2021/11/12/apisix-datadog/), and more. Various logging components are also supported, but most are carried out in the application layer.

Apache APISIX will add more transport layer observability support in 3.0. For example, the support for [Prometheus](https://apisix.apache.org/docs/apisix/plugins/prometheus/) and various logs has been added, enabling users to observe the problems of application layer traffic easily and enabling users to check the operation status of transport layer traffic.

### 9. Integrating the OpenAPI Specification

API is an element that involves the entire lifecycle of development, from designing to coding, testing, and deploying. In APISIX 3.0, Apache APISIX will support the standard OpenAPI 3.0 specification.

Therefore, if you manage the APIs on API design and testing software, it is straightforward to manage and maintain the data in APISIX by exporting and importing it. At the same time, various APIs in APISIX can also be shipped through the OpenAPI 3.0 specification and then imported into other systems for use.

In addition, APISIX 3.0 also supports Postman-related custom formats (Postman Collection Format v2), enabling data transfer between the two, thus making integration easier.

### 10. Full Support for Gateway API and Service Mesh

Support for the [Gateway API](https://gateway-api.sigs.k8s.io/) has begun in the [APISIX Ingress Controller](https://github.com/apache/apisix-ingress-controller/issues?q=gateway+api), and nearly all Gateway API configurations are supported in the latest 1.5 release.

In this case, the APISIX Ingress can be configured using the Gateway API, which means you can switch between different data planes. By the end of this year, APISIX Ingress will have complete support for the Gateway API and additional transport and application layer features.

Unlike most service mesh solutions, APISIX's service mesh solution has advantages in the data plane (due to the high performance of APISIX itself). So, in selecting the control plane, we hope it will be compatible with some mainstream solutions in the community. Finally, by using the xDS protocol to integrate with Istio and writing the obtained configuration to the xDS configuration center of APISIX, the specific routing rules are generated by APISIX to complete the corresponding routing requests.

This solution not only makes the entire service mesh lighter but also makes custom development and migration more convenient with the high scalability of APISIX.

### 11. Integrate with More Ecosystems

In addition to the OpenAPI standard mentioned above, many ecosystem plugins will be added in version 3.0, such as OpenFunction, ClickHouse, Elasticsearch, SAML, CAS, etc., to integrate more support for authentication, security, and observability.

One of the exciting plugins, [workflow](https://apisix.apache.org/docs/apisix/next/plugins/workflow/), is used for traffic scheduling: we can do some granular processing at the traffic control level.

```shell
curl http://127.0.0.1:9180/apisix/admin/routes/1 \
-H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
  "uri":"/hello/*",
  "plugins":{
    "workflow":{
      "rules":[
        {
          "case": [
            ["uri", "==", "/hello/rejected"]
          ],
          "actions": [
            [
              "return",
              {"code": 403}
            ]
          ]
        },
        {
          "case": [
            ["uri", "==", "/hello/v2/appid"]
          ],
          "actions": [
            [
              "limit-count",
              {
                "count": 2,
                "time_window": 60,
                "rejected_code": 429
              }
            ]
          ]
        }
      ]
    }
  },
  "upstream": {
    "type": "roundrobin",
    "nodes": {
      "127.0.0.1:1980": 1
    }
  }
}'
```

For example, perform a specific action when condition A is true, perform another action when condition B is true, etc. In this way, users can schedule various business traffic more conveniently.

## Get Started with Apache APISIX 3.0

You can now check out APISIX 3.0 on the [GitHub Release page](https://github.com/apache/apisix/releases) and [Download page](https://apisix.apache.org/downloads/)!

APISIX has grown a lot from the beginning to the 3.0 version. An open source project may not be judged solely on performance and functionality but on the perspective of users, developers, and enterprises to consider whether they can use the product to solve their current pain points quickly and effectively.

The highlights and new features mentioned in this article are all created through the open source community. Apache APISIX has become more vibrant by receiving feedback from different developers and enterprise users. If you want to join the vibe, check out the community [here](https://apisix.apache.org/docs/general/join/)!
