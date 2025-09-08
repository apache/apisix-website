---
title: "360 Built Unified L7 Load Balancer Using Apache APISIX"
authors:
  - name: 360 ZYUN Cloud
    title: Author
  - name: Yilia Lin
    title: Technical Writer
    url: https://github.com/Yilialinn
    image_url: https://github.com/Yilialinn.png
keywords:
  - open source
  - API gateway
  - Apache APISIX
  - 360
  - L7 load balancing
  - API gateway use case
description: 360 unifies Layer 7 load balancing using APISIX, gaining VPC, cloud-native, and fine-grained routing in one seamless upgrade.
tags: [Case Studies]
image: https://static.api7.ai/uploads/2025/09/05/SWaSLAns_360-zyun-cloud-use-case.webp
---

> 360 unifies Layer 7 load balancing using APISIX, gaining VPC, cloud-native, and fine-grained routing in one seamless upgrade.
>
<!--truncate-->

## About 360 and 360 ZYUN Cloud

360 Security Technology Inc., also branded as [Qihoo 360](https://www.linkedin.com/company/qihoo-360/), is a leading Internet and security technology enterprise and the first advocate of free Internet security in China. In the wave of AI, it is committed to helping industries and organizations achieve intelligent digital transformation.

360 ZYUN Cloud is the intelligent data cloud foundation of 360, offering a wide range of products and services, including databases, middleware, storage, big data, artificial intelligence, computing, networking, video, and IoT integration, and communications, as well as one-stop solutions.

Positioned as an open enterprise application service platform with the mission of "aggregating the value of data and enabling an intelligent future," 360 ZYUN Cloud provides robust products and technical services for businesses and applications across industries, helping enterprises and organizations unlock greater commercial value.

## Project Background

Layer 7 (L7) load balancing, which operates at the application layer of the OSI model, provides deep inspection of protocols like HTTP/HTTPS and supports a rich set of advanced routing rules. Unlike Layer 4 (L4) load balancing, which only considers IP addresses and ports, L7 load balancing understands application-layer content, enabling far more granular traffic control.

Our existing internal L7 load-balancing system at 360 faced two critical limitations:

1. It was built for traditional data center infrastructure and did not support Virtual Private Clouds (VPCs), making it unable to meet the needs of our cloud-based tenants.
2. While it supported bare-metal and virtual machine backends, it was not designed for modern, cloud-native workloads such as containers.

To overcome these challenges, we initiated the Unified L7 Load Balancing project. The goal was to build a single, comprehensive load balancing service that supports a hybrid network architecture and can route traffic to diverse backend instance types.

The core features required for this new service were:

* **Intelligent Routing:** Fine-grained traffic routing by parsing HTTP headers (`User-Agent`, `Cookie`), URL paths, and other parameters.
* **Session Persistence:** Ensuring user requests are consistently directed to the same backend server by injecting cookies or generating session IDs.
* **Active Health Checks:** Proactively monitoring the health of backend upstreams to prevent requests from being sent to unhealthy instances.
* **Dynamic Configuration (Hot Reloading):** Allowing configuration changes to take effect in real-time without service interruptions, simplifying maintenance.
* **High Availability (HA):** Ensuring instance reliability through cluster-based failover, session persistence, and multi-AZ deployments.

## Service Architecture Design

### 1. Overall Architecture

The unified L7 load balancing architecture is composed of two main components: a **control plane** and a **data plane**.

The **control plane** is responsible for configuration management. In addition to our existing `LBC-API` (shared by L4 and L7), we integrated the `apisix admin API` for managing L7 rules. We use an `etcd` cluster as the configuration store; its millisecond-level notification mechanism enables real-time configuration updates, which is ideal for scalable, containerized environments. In VPC scenarios, the control plane assigns a unique internal IP to each upstream to mask its real VPC IP address.

The **data plane** is the component that processes client requests and forwards user traffic. It is stateless but supports a wide range of functions, including authentication, SSL/TLS offloading, logging, and observability. For VPC traffic, the data plane integrates with our FNAT gateway's forwarding logic. Using the mapping between the unique internal IP and the real VPC IP, it encapsulates traffic in **VXLAN** packets before sending them to the host machine where the upstream instance is running.

![360 L7 Load Balancing Architecture](https://static.api7.ai/uploads/2025/09/04/yXqvnBrv_2.1-en.webp)

L7 resources (e.g., `service`, `route`, `upstream`) are managed via calls to the internal `LBC-API`. The workflow is as follows:

1. The API then calls the `apisix admin API` to persist the configuration into the `etcd` cluster.
2. The `LBC-AGENT` process listens for changes in `etcd` and applies VPC IP mapping configurations to the FNAT data plane.
3. The APISIX data plane nodes also listen for changes in `etcd`, allowing new L7 routing rules to take effect dynamically.
4. Traffic from our on-prem data center (IDC) is forwarded directly to its destination IP, while traffic destined for VPCs is encapsulated and forwarded to its host.
5. To use the service, teams simply point their application's DNS to the corresponding Virtual IP (EIP for public services or a VPC-internal VIP).

### 2. Service Deployment Architecture

Our deployment architecture is shown in the diagram below. It has several features:

* **Unified Interface:** Our internal "Stack" platform provides a single OpenAPI for all teams, including our container cloud platform, to manage their L7 load balancing resources.
* **High Availability:** The control plane and storage are deployed at a regional level. The data plane is deployed in a clustered mode within each Availability Zone (AZ), ensuring that if one server fails, requests are automatically redirected to other nodes in the cluster.
* **Hybrid L4/L7 Deployment:** We reuse existing L4 capabilities, which reduces development overhead and creates a seamless hybrid infrastructure.

![360 Service Deployment Architecture](https://static.api7.ai/uploads/2025/09/04/vAoZwckf_2.2-en.webp)

### Traffic Path

Traffic flows through one of two primary paths depending on the environment:

* **Classic Network (On-Prem) L7 Traffic:**
    Public EIP -> L4 Load Balancer (idc vip) -> **L7 LB Gateway** -> IDC-routable IP (VM, pod, etc.)
* **VPC Cloud L7 Traffic:**
    Public EIP -> L4 Load Balancer (vpc vip) -> **L7 LB Gateway with VXLAN encapsulation** -> VPC-internal IP (VM, pod, etc.)

<div align="center">
<img alt="Traffic Path Diagram" style="width: 65%" src="https://static.api7.ai/uploads/2025/09/04/zO2tt4qq_3.1-en.webp"></img>
</div>

### Conclusion & Future Outlook

The unified Layer-7 load balancing service has now been fully launched across all three regions within 360, and container services have also been adapted.

At present, the unified Layer-7 load balancing only supports relatively basic features, with more functional enhancements planned, such as SSL offloading optimization, supporting forwarding rules with redirect, traffic mirroring, and support for additional protocol types. It is gradually evolving toward intelligence, transforming from a simple traffic distribution tool into an intelligent scheduling hub.
