---
title: "Practice in UPYUN with APISIX Ingress"
author: "Zhuo Chen"
keywords: 
- Apache APISIX
- Apache APISIX Ingress
- UPYUN
- API Gateway
- Container gateway
description: This article describes the update and adjustment of UPYUN's internal gateway architecture after you selected Apache Apisix Ingress, and shares some of the practice scenarios in use.
tags: [Case Studies]
image: https://static.apiseven.com/2022/blog/0817/Upyun.png
---

> This article describes the update and adjustment of UPYUN's internal gateway architecture after you selected Apache Apisix Ingress, and shares some of the practice scenarios in use. Chen Zhuo, a cloud development engineer, is responsible for cloud storage, cloud processing, and gateway application development.

<!--truncate-->

## Background

The range of Ingress products on the market has grown and the range of options has expanded considerably. These products fall into roughly two architectural categories. One, like K8s Ingress and Apache APISIX Ingress, are based on traditional agents such as Nginx and OpenResty, and use k8s-Client and Golang to do Controller. There is also an emerging class of agents and controllers using the Golang language, such as Traefik.

Ingress-Nginx is still used by most businesses in UPYUN, and the overall architecture is as follows.

![Ingress-Nginx architecture](https://static.apiseven.com/202108/1632469775377-8303128c-e8a6-4594-a87b-ac6942f4895e.png)

The lower layer is data plane OpenResty. The upper Controller listens primarily for resource changes from APIServer and generates `nginx.conf` configuration file, and then Reload OpenResty. If the POD IP changes, the Upstream Upstream node replacement can be transmitted directly to the OpenResty Lua code via the HTTP interface.

The extensibility of Ingress-Nginx is achieved mainly through Annotations, and the configuration file itself has simple syntax and routing rules. Lua can be configured on demand, and the extension of the Lua plug in improves Operability of customization.

![Ingress-Nginx extensibility](https://static.apiseven.com/202108/1632469835090-20c409f6-0416-4b2f-9ad7-4c836638f892.png)

But Ingress-Nginx has some drawbacks, such as:

- The development of plug-ins depends on complex components, poor portability
- Weak semantic ability
- Any change to Ingress requires Reload, which is unfriendly to long links

These issues caused some confusion in maintaining the existing logic, so we started looking for alternatives to the relevant container gateways.

## Research Phase

In choosing an alternative to Ingress-Nginx, we focused on Traefik and Apache APISIX Ingress.

![Traefik](https://static.apiseven.com/202108/1632469875567-61dd6fbd-757f-419f-a769-99e6aaf46f0c.png)

Traefik is cloud-native, with extremely simple configuration files, a distributed configuration, and support for a variety of automated configuration discovery. Not only support K8s, ETCD, Golang eco-language support is better, and the development cost is lower, iteration and testing ability is better. But it falls short at other levels, such as:

- Weak expansibility
- Reload is not supported
- Not as good as Nginx in terms of performance and functionality (though it’s also less expensive)

Unlike Nginx, which is rich in plugins and instructions, you can solve a problem by adding an instruction, and you may need to pair an Nginx with Traefik when you deploy online.

In summary, although Traefik has advantages on operations, we are worried about its drawbacks on extension and operational efficiency concerns, so we did not choose Traefik.

## Why Apache APISIX Ingress

### Internal Cause

Apache APISIX’s cluster of gateways, which were previously replaced from Kong, is currently hosted in multiple data centers within the company. Later, based on the Apache APISIX plug-in system, we developed some internal plug-in, such as internal permission system check, precision rate limit and so on.

### Efficiency of Maintenance

We also have some K8s clusters, and the cluster gateway in these containers is using Ingress Nginx. When the plug-in system wasn’t supported before, we customized some of the plug-ins on Ingress Nginx. So Apache APISIX and Nginx have a lot of overlap in their internal data center and container gateways.

To avoid subsequent development and maintenance, we want to replace all of the Ingress Nginx container internal gateways with Apache APISIX Ingress to achieve component unification at the gateway level.

## Tuning Update Based on Apache APISIX Ingress

Currently Apache APISIX Ingress is in the early stages of UPYUN. Because of the rapid iteration of Apache APISIX Ingress, we haven’t yet applied it to some important businesses, just to try it out in a new cluster.

### Restructuring

With Apache APISIX Ingress, the internal architecture looks like this.

![After using APISIX Ingress architecture](https://static.apiseven.com/202108/1632469909488-3685d104-e458-4145-8ccb-6cecbd383161.png)

Unlike the aforementioned Ingress-Nginx architecture, the underlying data surface has been replaced with the Apache APISIX cluster. The upper Controller listens for APIServer changes and then distributes the configuration resources through the ETCD to all nodes in the entire Apache APISIX cluster.

![Profile comparison](https://static.apiseven.com/202108/1632469956257-b9cb6a91-a082-437c-9395-d62ffb75280f.png)

Because Apache APISIX supports dynamic routing changes, it is different from Ingress-Nginx on the right. In Apache APISIX, the same Location is used when traffic enters, and routing is done in Lua Code, which is easy to deploy. And the right Ingress-Nginx compared to its `nginx.conf` configuration file is complex and requires a Reload for every Ingress change.

### Apache APISIX Ingress Controller

Apache APISIX Ingress Controller relies on Apache APISIX’s dynamic routing capabilities for its functional implementation. It monitors resource changes at APIServer, performs data structure conversion, data validation, and DIFF computation, and finally applies it to the Apache APISIX Admin API.

Apache APISIX Ingress Controller also has a highly available scheme, implemented directly through the leader-election mechanism of K8s, without the need to introduce additional external components.

#### Declarative Configuration

Currently Apache APISIX Ingress Controller supports two declarative configurations, Ingress Resource and CRD Resource. The former is more suitable for the replacement of gateway controls from Ingress-Nginx and is the most cost-effective in terms of conversion costs. However, its shortcomings are obvious, such as too weak semantic ability, no specific specifications, and capacity development can only be achieved through annotations.

![Ingress Resource](https://static.apiseven.com/202108/1632469994485-209d3a21-d761-4b2c-a974-c913b443b0d2.png)

UPYUN selected the second declarative configuration, the more semantic CRD Resource. Structured data can be configured this way, with the capabilities that Apache APISIX supports.

![CRD Resource](https://static.apiseven.com/202108/1632470033850-b619da2f-5926-44ca-95bb-69ee1cdaf209.png)

If you want to learn more about Apache APISIX Ingress Controller dry goods, see Apache Apisix PMC Zhang Chao’s [sharing video](https://www.bilibili.com/video/BV1eB4y1u7i1?spm_id_from=333.999.0.0) on Meetup.

### Functional Enhancement

#### Effect 1: Log Level Efficiency

We currently have multiple Apache APISIX clusters in our company, including the data center gateway and the container gateway that all started using Apache APISIX uniformly so that they can be consolidated into a set of logic for subsequent processing/consumption of related logs.

![Log level](https://static.apiseven.com/202108/1632470075980-46d13ac7-babb-40a5-b105-73f1105d16e7.png)

Of course, Apache APISIX’s logging plug-in support is also very rich. Internally we use Kafka-Logger, which allows you to customize the log format. Like the other log plug-ins in the figure below, custom formats may not yet be supported due to the number of users, partners with relevant needs are welcome to use and submit PR to extend the current logging plug-in functionality.

![Plug-in list](https://static.apiseven.com/202108/1632470099306-ffc74dfb-384b-4014-a0b4-14267dcf7bce.png)

#### Effect Two: Improve the Monitoring and Health Check

At the monitoring level, Apache APISIX also supports Prometheus, SkyWalking, and so on, and we use Prometheus internally.

Apache APISIX is a basic proxy for the monitoring and request of APP status codes. But Apache APISIX’s own health checks are not well controlled. What we’re doing now is deploying a service inside K8s and generating multiple pods, applying that service to Apache APISIX Ingress, and then checking the entire link to see if Apache APISIX is healthy.

![Health check](https://static.apiseven.com/202108/1632470120106-3e577e2e-ea43-4f50-8e3c-066b5f1e7238.png)

## Practice the Solution Using Apache APISIX Ingress

### Scenario 1: K8s Application Changes

In using K8s with Apache APISIX Ingress, you need to do the following:

- The selection of update strategy suggests using rolling update to ensure that most of the POD is available, but also need to consider the problem of stable load
- We should start K8s internal health check for POD to ensure the business availability of POD and avoid the POD being unable to provide the normal service after the request
- Make most endpoints available on Apache APISIX Upstream

In practice, we also encounter the problem of transmission delay. The POD update path is shown below, after the POD Ready through the layer-by-layer steps of information transfer, some of the links in the middle may appear delay problems. In some extreme cases, the link time may be increased by a few seconds and the Endpoint update may not be up to date.

![Link issue](https://static.apiseven.com/202108/1632470165257-cb16e489-b546-4451-917a-6c72648769d8.png)

The solution in this case is to wait a few seconds after the first batch of POD becomes Ready before continuing with the next batch when the update occurs. The goal is to ensure that most endpoints in the Apache APISIX Upstream are available.

### Scenario 2: Upstream Health Screening Problem

Due to APIServer’s state-oriented design, there are also latency issues when synchronizing with Apache APISIX, which can result in “502 error status warnings”during the update process. Problems like this require a health check at the gateway level for the Upstream Endpoint.

First of all, an Upstream Endpoint health check is not practical because Endpoint is too time consuming. The monitoring check at the HTTP layer is not suitable for the operation because the status code can not be determined.

The best way to do this is to do a passive health check based on TCP at the gateway level. If your network connection time out is not reachable, consider the POD as a problem that needs to be degraded. This allows for independent control without touching other parts of the business, as long as you check at the TCP level.

### Scenario：mTLS Connecting to ETCD

Because the Apache APISIX cluster uses one-way authentication by default, using Apache APISIX as a container gateway might turn on two-way authentication by default when connecting to the same ETCD cluster with K8s (which uses two-way authentication in K8s ETCD) , this in turn led to the following certificate issues:

![Certificate issues](https://static.apiseven.com/202108/1632470191228-5c2a3666-8d21-4b19-a5be-e09e7db4d488.png)

Instead of connecting directly to the ETCD via gRPC, Apache APISIX first connects to the gRPC-gateway inside the ETCD via the HTTP protocol, and then to the real gRPC Server. There’s an extra component in the middle, so there’s an extra two-way validation.

A client certificate is required when the gRPC-gateway connects to the gRPC Server. The ETCD does not provide a configuration for this certificate, but uses the Server certificate of the gRPC Server directly. This is equivalent to a certificate being validated both on the client and the server. If your gRPC server server-side certificate has an extension enabled (indicating that the certificate can only be used for server-side validation) , remove the extension, or add an extension that can also be used for client-side validation.

At the same time, the bottom layer of OpenResty does not support mTLS. When you need to connect to an upstream service or ETCD via mTLS, you need to use apisix-nginx-module to build an OpenResty after patch. Apisix-build-tools can find related build scripts.

## Future Expectations

While we are currently only using Apache APISIX Ingress in the testing phase, we believe that in the near future, with the application of an iterative feature update and internal architecture migration, apache APISIX Ingress will be applied uniformly to all container gateways to UPYUN.
