---
title: "Discover What's Next: APISIX 3.5 Preview"
authors:
  - name: Ming Wen
    title: Author
    url: https://github.com/moonming
    image_url: https://avatars.githubusercontent.com/u/26448043?v=4
  - name: Yilia Lin
    title: Technical Writer
    url: https://github.com/Yilialinn
    image_url: https://avatars.githubusercontent.com/u/114121331?v=4
keywords:
  - Open Source
  - API gateway
  - Apache APISIX
description: APISIX 3.5 introduces a series of exciting new features that will bring users a higher level of security, performance, and scalability.
tags: [Community]
image: https://static.apiseven.com/2022/10/19/634f6677742a1.png
---

> APISIX 3.5 introduces a series of exciting new features that will bring users a higher level of security, performance, and scalability, thereby providing users with more choices and making it more convenient and flexible when building and managing APIs.
<!--truncate-->

## Introduction to APISIX

[Apache APISIX](https://apisix.apache.org/) is a dynamic, real-time, high-performance open-source API gateway that provides rich traffic management functions such as load balancing, dynamic upstream, canary release, circuit breaking, authentication, and observability. Being built based on NGINX and LuaJIT, Apache APISIX has ultra-high performance with a single-core QPS of up to 23,000 and an average delay of only 0.2 milliseconds. It can solve problems in traditional architecture, and at the same time adapt to the needs of the cloud-native era.

[APISIX](https://github.com/apache/apisix) has an active community and a rich ecosystem, with nearly 100 open-source plugins covering scenarios such as network security, performance optimization, load balancing, monitoring, and traffic management. This provides users with a powerful and flexible API gateway solution. Apache APISIX is now the most active API gateway project on GitHub addressing 1 Trillion+ API calls per day, which is still growing.

![APISIX Architecture](https://static.apiseven.com/uploads/2023/09/21/kJDnBMVX_APISIX%20Architecture.png)

APISIX solves two major [pain points of NGINX](https://apisix.apache.org/blog/2022/07/30/why-we-need-apache-apisix/).

- First, NGINX does not support cluster management. Almost every internet manufacturer has its own NGINX configuration management system. These systems have many similarities but there is no unified solution.

- The second is that NGINX does not support hot reloading of configurations. If a company modifies the configuration of NGINX, it can take more than half an hour to reload NGINX. And under the Kubernetes system, upstream will change frequently. If NGINX is used, the service needs to be restarted frequently, which is unacceptable for enterprises.

APISIX supports cluster management and dynamic loading, providing the advantages of high reliability, elastic scaling, flexibility, and seamless updates.

Being the API Gateway with the highest market share in the Asia-Pacific region, Apache APISIX has a wide range of application scenarios. It can be applied to scenarios such as gateways, Kubernetes Ingress, and service mesh, and can help enterprises quickly and safely process API and microservice traffic. At present, it has been tested and highly recognized by worldwide enterprises and organizations such as Amber Group, [Airwallex](https://apisix.apache.org/blog/2021/11/03/airwallex-usercase/), Lotus Cars, [Lenovo](https://apisix.apache.org/blog/2023/06/02/lenovo-uses-apisix/), vivo, and [WPS](https://apisix.apache.org/blog/2021/09/28/wps-usercase/).

## New features in APISIX 3.5

### Host-level TLS protocol configuration

This feature refers to configuring the version that supports TLS on the client side by specifying the global version through YAML in the NGINX-specified file. For example, all APIs only support TLS 1.2 and TLS 1.3, but some old clients need to support the earlier version of TLS 1.1. These configurations can take effect at the same time.

**Key features and benefits:**

1. Global TLS version configuration: Easily configure global settings for TLS versions on the client side by using YAML in an NGINX specification file.

2. Compatibility with older clients: By configuring and merging different TLS versions simultaneously, while ensuring that clients support the older TLS 1.1 version, smooth and continuous communication can be guaranteed.

3. Fine-grained control: APISIX uses OpenResty to dynamically specify different TLS protocols for each host. This granular control enables optimal security and flexibility in TLS configuration based on the unique needs of each API host.

```yaml
apisix:
  ssl:
    ssl_protocols: TLSv1.2 TLSv1.3
```

```json5
// curl http://127.0.0.1:9180/admin/apisix/ssls/1
{
    "cert": "$cert",
    "key": "$key",
    "snis": ["test.com"],
    "ssl_protocols": [
        "TLSv1.2",
        "TLSv1.3"
    ]
}
```

### Wasm & Coraza WAF

Among the series of new features launched by APISIX, it is commendable that APISIX integrates the `coraza-proxy-wasm` plugin. APISIX provides robust support for the development of plugins using WebAssembly (Wasm), while Coraza offers a diverse range of Wasm plugins to choose from. As a result, the integration of Coraza with APISIX entails a relatively low cost. The cross-platform nature of Wasm allows APISIX and Coraza to work together seamlessly, eliminating the need for large-scale code modification and adaptation.

**Key features and benefits:**

1. Powerful security: The `coraza-proxy-wasm` is a Wasm-based web application firewall (WAF) plugin that can detect and block common web attacks such as SQL injection and cross-site scripting (XSS),  Cross-site request forgery (CSRF), etc. by analyzing and monitoring HTTP and HTTPS traffic in real-time.

2. Flexibility and scalability: You have the flexibility to configure and manage WAF rules, which can be customized to your specific application needs. It supports custom rules and policies, which can be configured according to specific security needs, and can also be integrated with other security tools and systems to provide a more comprehensive security solution.

APISIX can be used for more applications on Wasm, but asynchronous calls are not currently supported. A version that supports asynchronous calls in Wasm is expected to be launched in early October. Later, you can also use mainstream languages ​​such as Rust or Golang to completely develop APISIX plugins.

### HTTP/3 & QUIC

APISIX's support for HTTP/3 and QUIC protocols can bring faster transfer speeds, better network performance, and higher connection efficiency. This will help improve the performance and user experience of the application and enable it to adapt to the evolving network environment.

APISIX maintains its own version of NGINX, `apisix-base`, and applies HTTP/3 and QUIC patches to it, forming its own release.

Because APISIX is built on top of NGINX and OpenResty, enabling this feature requires updating its ecosystem, particularly the upstream dependencies of NGINX and OpenResty. Currently, APISIX is awaiting the master version of OpenResty to be upgraded to NGINX 1.25 or above, after which certain patches and interfaces of APISIX will be updated. It is expected to be implemented in October.

**Key features and benefits:**

1. Faster transfer speeds: HTTP/3 and QUIC use optimized transfer mechanisms, including multiplexing, 0-RTT connection establishment, and better congestion control. These technologies can significantly increase the speed of data transfer and reduce latency, thereby providing faster response times and higher throughput.

2. Better network performance: HTTP/3 and QUIC bypass some of the limitations and performance bottlenecks of TCP by using the UDP protocol as the transport layer protocol. The UDP protocol performs better in unreliable network environments and can better adapt to network jitter and packet loss, thereby providing a more stable and reliable network connection.

3. Higher connection efficiency: HTTP/3 and QUIC adopt a 0-RTT connection establishment mechanism to establish a faster initial connection between the client and the server. This means that the round-trip delay can be reduced when establishing a connection with the server, the request-response cycle can be accelerated, and the user experience can be improved.

## APISIX Roadmap

### GitOps

APISIX is a cloud-native API gateway that enables better integration with cloud-native systems. Although APISIX configuration can be written using YAML, APISIX lacks complete integration with related ecosystems such as CICD, including Jenkins, ArgoCD, etc. The APISIX Ingress Controller project has better integration in this area, but APISIX itself does not provide a complete set of declarative tools to support GitOps when used in non-Kubernetes environments such as bare metal or virtual machines.
Over the next month, APISIX will focus on solving this problem. APISIX's declarative tool ADC can help users perform various integrations in non-Kubernetes environments in a declarative manner. After this, users can connect well with tools such as Jenkins and ArgoCD in non-Kubernetes environments, and use the internal CICD method of GitOps to control APISIX to achieve functions such as multi-environment release.

### OpenAPI

When we talk about API gateway, we are discussing more than just the API gateway itself. API gateway is only one part of the full lifecycle management of API. API lifecycle management covers API design, API documentation, testing, gateways, and monetization. The chain consists of multiple interconnected components, with the API gateway serving as a pivotal element. In order to establish seamless connectivity among these components, it is imperative to establish standardized interfaces or protocols between different systems. Open API assumes a paramount role in facilitating this integration process.

There are several versions of Open API, with the current mainstream options being OpenAPI 2.0 (commonly known as Swagger) and OpenAPI 3.0. APISIX's significant objective is to provide comprehensive support for various API definition methods, including Swagger, OpenAPI 3.0, and Postman Collection. We will enable the authoring of API definitions using YAML, a protocol format akin to OpenAPI. Once APISIX completes its GitOps support, users will have the convenience of effortlessly importing APIs defined in tools like Postman into the APISIX gateway. Additionally, they can export APIs defined within APISIX to tools such as Postman, facilitating seamless integration.

### Refactor plugin runner

APISIX supports multiple programming languages for developing plugins, including Lua, Wasm, etc. However, APISIX has encountered some challenges in Wasm development, particularly in the area of plugin runners. Currently, communication between the plugin runner and APISIX is conducted via a custom RPC protocol. However, relying solely on the demo is insufficient if users need to read request bodies or modify response content. Furthermore, when users deploy the demo in a production environment, custom RPC introduces significant retrofitting costs as users would need to modify the RPC protocol. Moreover, custom RPC can't provide robust support for various language libraries in the future.

![APISIX plugin runner](https://static.apiseven.com/uploads/2023/09/22/QOQToIY9_9269cb5f-41dd-4f3f-bff1-a5f0c3b01bdc.jpeg)

Therefore, in the new design of the plugin runner, the RPC invocation method is abandoned in favor of standard HTTP calls. In the context of HTTP calls, it can be likened to the function-based serverless approach offered by cloud service providers. Within APISIX, remote functions will be invoked through HTTP calls, abstracting away the underlying implementation language. This approach eliminates the need for a custom RPC protocol.

Next month, we will release a new demo that, while it may incur some performance trade-offs, will significantly enhance user scalability and flexibility. Users no longer need to be familiar with custom protocols but instead can operate using functions, getting greater flexibility in making choices. Users can choose Lua for more robust performance and the overall integrity of APISIX. If users find Lua is complex in maintenance, they can opt for Wasm. Alternatively, if users have less stringent performance requirements, they can utilize the function call.

### Refactor documentation

In the APISIX community, there are frequent complaints about the low quality of [documentation](https://apisix.apache.org/docs/). The lack of professionalism and numerous issues or omissions in APISIX documentation can be attributed to its nature as a community-driven project with approximately 600 contributors, half code contributors, and the other half documentation contributors. These hundreds of individuals from diverse backgrounds write the documentation in their unique ways, resulting in inconsistent quality of the content. To address this, we have planned a comprehensive overhaul of the entire documentation to ensure its quality.

We will allocate six months to reconstruct APISIX documentation, which will consist of six sections. Firstly, there will be a "Getting Started" section that will allow users to quickly understand and run APISIX within a few minutes. Following that, the "How to Guide" section will introduce common use cases for APISIX. Next, there will be a section providing background information, and explaining concepts such as the definitions of route and service. Additionally, we will provide best practices that offer detailed insights into the usage of APISIX in production environments. Another focal point will be the comprehensive introduction of approximately 100 plugins. Lastly, there will be a reference section.

## Summary

As a leading API gateway, APISIX actively integrates with more ecosystems to enrich its own functionality and enhance the user experience.

The host-level TLS protocol configuration allows users to customize TLS settings at different host levels, providing higher security and customization. APISIX supports Wasm and Coraza WAF, enabling users to write high-performance plugins using Wasm to further enhance APISIX's capabilities. Coraza WAF, on the other hand, is a powerful web application firewall that enhances APISIX's security protection. Additionally, APISIX will also support HTTP/3 and QUIC, the next-generation network protocols known for their faster transmission speed and improved performance, offering users a smoother experience.

Furthermore, APISIX has unveiled its roadmap, including GitOps, OpenAPI, and refactoring of the plugin runner and documentation. These exciting new features and blueprints of APISIX will bring users a higher level of security, performance, and scalability, providing them with more choices and making API building and management more convenient and flexible.
