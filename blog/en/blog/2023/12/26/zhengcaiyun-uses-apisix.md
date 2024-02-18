---
title: "Building a Robust 'Highway' with APISIX: Gateway and Protocol Performance Optimization"
authors:
  - name: Xiaobin Wang
    title: Author
    url: https://github.com/wxbty
    image_url: https://github.com/wxbty.png
  - name: Jing Yan
    title: Technical Writer
    url: https://github.com/JYan00
    image_url: https://github.com/JYan00.png
keywords:
  - Open Source Community
  - API Gateway
  - Apache APISIX
  - Zhengcaiyun
description: 'Author: Xiaobin Wang, Apache Dubbo Committer, Senior Development Engineer at Zhengcaiyun. This article is based on a presentation given by Xiaobin Wang at the APISIX Shanghai Meetup in November 2023.'
tags: [Case Studies]
image: https://static.apiseven.com/uploads/2023/12/08/XDJDiILW_Zheng.jpeg
---

> Author: Xiaobin Wang, Apache Dubbo Committer, Senior Development Engineer at Zhengcaiyun. This article is based on a presentation given by Xiaobin Wang at the APISIX Shanghai Meetup in November 2023.
<!--truncate-->

In tackling cross-network data challenges, Zhengcaiyun has constructed a "highway" based on Dubbo, with APISIX serving as the central gateway for network routing and supporting common features. This article delves into the optimization of gateway and protocol performance, addressing the specific challenges encountered during the construction of the "highway" project.

## Background

The Zhengcaiyun platform serves as an exclusive hub for government procurement, catering to various government departments and state-owned enterprises. From a network architecture perspective, this platform forms a hybrid cloud network by integrating elements of public cloud, private cloud, and government cloud.

![Zhengcaiyun_platform](https://static.apiseven.com/uploads/2023/12/26/Fw3u6Lp7_1.png)

When Zhejiang governmental departments engage in procurement activities on the Zhengcaiyun platform, they are essentially utilizing the cloud-based operational framework. This cloud platform, situated in Zhejiang, forms a microservices network system. It serves as a platform that the company independently deploys and manages. Beyond Zhejiang, several other provinces also leverage the cloud platform for their procurement needs.

Moreover, the platform extends its services to branch offices established in different provinces, each having distinct requirements. These branch offices deploy the same microservices framework, adapting to the administrative divisions of their respective provinces but operating within the local environment. Additionally, non-administrative entities, like banks, may opt for private deployment.

All these microservices collectively form a segment of the hybrid cloud network. Consequently, cross-network data transmission becomes a common scenario for the business.

In response to this demand, Zhengcaiyun initiated the "highway" project in late 2022. The project aimed to consolidate existing network transmission solutions, providing a unified, user-friendly, and high-speed cross-network business experience. As the integration of cross-network solutions progresses, an increasing portion of the company's cross-network traffic is directed toward this novel infrastructure.

## "Highway" Project

The "highway" project unfolds in three distinctive phases. The initial phase sees the deployment of the "highway" project based on Dubbo. Subsequently, the second phase consolidates prior solutions into the new framework. The third and final phase aims to address challenges emerging from the initial phases and undertake further refinements.

In the initial phase, a pioneering architecture was designed using Dubbo, with APISIX playing a central role. Each node represents an island, signifying different provinces or other administrative divisions. Interestingly, the cloud platform itself serves as a unique island, and our platform encompassed multiple such islands, collectively forming a hybrid cloud network.

![Highway_structure1](https://static.apiseven.com/uploads/2023/12/26/fId3VYse_2.jpg)

Why did we choose the star-shaped network architecture for this project? The need for cross-network communication existed right from the inception of Zhengcaiyun. In the early days, business operations involved point-to-point data transfers across networks, eventually leading to the formation of a mesh architecture. Previously, we had various projects and solutions related to cross-network operations—some provided by the foundational platform and others developed independently by businesses. The primary goal of the current "Highway" project is to integrate these solutions, establish a unified technical foundation, reduce individual operational costs, and streamline processes. This allows businesses to concentrate on their core activities while incorporating more common features.

Developing individual solutions for each business could lead to functional limitations as they would only focus on their specific areas. On the other hand, opening up business operations for others might introduce challenges, such as the need to support custom features that the business itself does not prioritize.

The star-shaped architecture of the "Highway" is the outcome of this integration. In the previous mesh structure, interconnecting each island required a series of intricate processes. For instance, coordinating with the operations and maintenance teams in provinces like Shanxi and Shanghai, having them open specific ports, deploying services based on those ports, and establishing network interactions. This resulted in numerous complex lines within the mesh structure. With n islands, there could be approximately n squared lines. The star-shaped architecture simplifies this, avoiding the intricacies of pairwise connections found in the earlier mesh structure.

## Challenges

After the successful trial of new business in the first half of 2023 under the "Highway" project, we initiated the gradual migration of historical cross-network solutions in the latter half of the year. Monitoring revealed increased pressure from the growing traffic, evidenced by:

* **Frequent alerts from the heartbeat application:** To ensure the stability of the highway, we deployed a universal heartbeat application on each segment, responsible for network interconnectivity. This application triggers alerts if any issues arise. For instance, if requests slow down within a specific timeframe, exceeding 1 second per request, we promptly receive alerts. Monitoring indicated a frequent occurrence of alerts from the heartbeat application.

* **Declines in monitoring metrics such as response time (RT) and throughput:** We also employed the Prometheus-formatted BRAF interface for monitoring. On this interface, certain response volume and throughput curves exhibited a noticeable downward trend.

The pressure in these two aspects gradually manifested as we transitioned historical solutions into the "Highway" project, coupled with the increasing traffic volume.

To ensure the stability of our business operations and enhance the overall user experience, we have implemented a range of optimization strategies. Broadly speaking, our efforts have centered around three key approaches:

![Optimization_solutions](https://static.apiseven.com/uploads/2024/01/29/xThKSktL_3_1.jpg)

* **Resource Optimization:** This step involves the relatively straightforward reallocation of resources. We have taken specific measures, such as isolating resources for single points like the central gateway and Dubbo gateway, aiming to minimize the impact of potential failures on the overall system. Additionally, actions like directly increasing the number of pods and upgrading CPUs have proven effective in alleviating pressure. While these measures ensure ample resource reserves to meet high-load demands, it is important to note that this approach does not address fundamental architectural shortcomings. If certain resources cannot be horizontally scaled due to such limitations, issues may persist under specific conditions and might not be promptly resolved.
  
* **Performance Optimization:** This approach necessitates a deep dive into architectural optimizations to mitigate the shortcomings identified by the bucket model. Maximizing performance utilization is paramount for achieving system-wide horizontal scalability.

* **Best Practices Guidance:** Recognizing that each framework has its limitations, we have actively guided users to avoid operations that could potentially lead to issues. In instances where users insist on certain operations, we provide informed advice. For instance, the Dubbo framework, used for cross-network transmission, defaults to supporting high traffic but with small requests concurrency. The high-speed highway built on Dubbo exhibits similar characteristics. We have advised users against transmitting large files through Dubbo, as it could exert significant pressure on our system. Instead, we recommend alternative methods for file transmission.

By adopting a holistic approach that combines resource readiness, performance optimization, and user guidance for sensible operations, we have ensured the stability and high availability of our system.

## Issues and Goals

### The Process of Cross-Network RPC Requests

![Highway_structure2](https://static.apiseven.com/uploads/2023/12/26/Ij2SKNMh_4.jpg)

In our system, particularly between Provinces A and B, we often encounter the necessity for cross-network RPC requests. These requests might span various provinces and their respective microservices architectures. Despite each province sharing an essentially identical set of codes in Clusters A and B, housing both APP1 and APP2, differences arise. Certain islands may exclude APP2, like the file service unnecessary in third-tier cities, resulting in its non-deployment. Cross-network needs, such as accessing the SMS service, highlight the indispensability of certain components.

When APP1 initiates a call to APP2, the standard scenario involves local cluster invocation in the absence of routing information. However, our innovation lies in the introduction of the "Highway" SDK in APP1. This SDK empowers APP1 to embed routing information during Dubbo calls, which can assume diverse formats. Consequently, we gain the capability to specify the destination of the request. For instance, Province B.

The SDK in APP1 orchestrates the redirection of traffic to Cluster A's Dubbo gateway. Subsequently, the Dubbo gateway transforms the Dubbo request into an HTTP request, directing it to APISIX within the novel network architecture. APISIX, in turn, forwards the HTTP request to the intended service.

Upon receiving the request, APISIX initiates the parsing of routing information, identifying the necessity to redirect it to Province B. Subsequently, APISIX dispatches the request to the Dubbo gateway of Province B. Here, the Dubbo gateway in Province B, armed with routing insights, parameters, requests, and serialization protocols, employs Dubbo's generic call once more. Ultimately, the request finds its way to APP2 in Province B.

### The Significance of Dubbo Gateway

During this process, questions regarding the necessity of a Dubbo gateway might arise. The Dubbo gateway's function revolves around transforming protocol data into HTTP, and is it plausible to skip the Dubbo gateway and directly route requests to the central gateway?

Understanding why a Dubbo gateway is indispensable involves considering several factors. Firstly, the Dubbo gateway plays a crucial role in translating data from the Dubbo protocol to the HTTP protocol. While skipping this step might appear to save a single operation in some instances, it involves critical IP convergence and feature convergence tasks. These tasks are intricately linked to the features of the initial version. Moreover, the implementation of the Dubbo gateway has some shortcomings. It operates as a Java-based Spring Boot program and introduces the Dubbo SDK. When an APP's request undergoes a transition and there is no corresponding provider, Dubbo defaults to returning a "Service not found" error, akin to HTTP's "404 not found."

To address this concern, we took the initiative to enhance Dubbo. Through tailored development of the source code, we empowered Dubbo to forward requests and contributed these enhancements to the Dubbo community.

### Gateways in the Comprehensive Architecture

Within the comprehensive architecture, three gateways are employed, consisting of a central gateway and two Dubbo gateways. The central gateway utilizes APISIX, a tool previously employed in the first version of the "Highway" project. Its primary function involves executing routing (reverse proxy) and directing requests to clusters in various networks based on HTTP Header information. While using APISIX, certain challenges were faced, particularly related to the Dashboard. For example, issues arose when attempting to export route configurations from the test environment to the production environment, leading to errors in the Dashboard. In essence, the utilization of APISIX in this context aligns with standard gateway scenarios.

## Performance Analysis of Cross-Network RPC

![RPC_analysis](https://static.apiseven.com/uploads/2024/01/29/vW9R6PGC_5_1.jpg)

* **Client:** The client is already equipped with Dubbo's SDK, which encompasses proxy generation, method invocation, parameter serialization, and initiating network requests. Altering this component is currently challenging due to our adoption of a unified Dubbo, ensuring the stability of the SDK's behavior remains unchanged.

* **Local Network:** Transitioning traffic within the local cluster involves Dubbo's transport mechanism. This entails considerations like I/O models, the Dubbo protocol, and data formats (e.g., parameters). Dubbo utilizes a Netty-based asynchronous non-blocking I/O model, perfectly aligning with its performance requirements. The Dubbo protocol adopts a straightforward and adaptable structure for data packets, efficiently encoding and decoding data in binary format based on specific needs.

* **Dubbo Gateway:** In this process, the Dubbo gateway acts as a traffic-forwarding entity, without the responsibility of handling business logic. It brings forth considerations related to the I/O model of message reception: choosing between blocking or asynchronous message reception. Additionally, it involves packet parsing, incurring some costs as Dubbo data transforms HTTP data, including serialization and deserialization. There are also custom extensions based on the local cluster, incorporating common features like rate limiting and authentication.

* **Public Gateway:** Post-gateway request processing, the flow is directed to APISIX's central gateway through HTTP, utilizing HttpClient for outward-bound journeys. As HttpClient is inherently blocking, it might exhibit slightly inadequate performance. The decision to build our gateway rather than adopting existing solutions was primarily driven by the urgency to implement quickly in the first version, with performance optimization deferred as subsequent work. Yet, a significant challenge arises in this approach due to the unique process of converting the Dubbo protocol to HTTP. Currently, no gateway supports this specific custom behavior. Consequently, we decided to tackle this challenge with a self-developed solution, utilizing a Netty-based Java application. When it comes to the public network, considerations include I/O models, HTTP protocols, and data formats, all of which led us to choose the high-performance APISIX.

* **Central Gateway:** In the broader architecture, APISIX, as the central gateway, plays a pivotal role, especially in facilitating company-level common functions. It is responsible for efficient traffic handling, forwarding, and supporting common extensions. With the central gateway becoming a single point in the new network architecture, concerns related to single-point failures are duly addressed. Our current strategy regards common extensions as company-level functions, allowing for extensions at this level, such as traffic interception and execution of corresponding operations. The plugin-based features of APISIX empower us to make additional extensions, for example, discouraging unordered cross-domain calls and conducting audits only after console-registered information (e.g., app name, responsible person, etc.) verification. In addressing single-point failure concerns, we have implemented fault isolation and resource isolation in the central gateway. We maintain stringent requirements for stability and scalability, both of which are well met by APISIX.

* **Cluster Target:** Following central gateway request forwarding, the process aligns closely with the preceding local network scenario. Since it is a midpoint call, the form may vary slightly. Due to a series of operations, the Dubbo data packet is now encapsulated via HTTP. After parsing, it can't undergo point-to-point calls and still requires Dubbo's generic invocation. Understanding the interface name, parameters, etc., then proceeds with the call, returning along the original path.

## Optimization Objective: Boosting Throughput

![Optimization_goal](https://static.apiseven.com/uploads/2023/12/26/rcuQEhy0_6.png)

Performance testing was carried out before the initial version of the architecture went live to thoroughly understand potential bottlenecks in the cross-network RPC architecture. Without performance testing and robust data support, establishing the system's baseline would be challenging. Consequently, a series of performance tests were conducted to enhance our system optimization.

The testing scripts were intricately linked to the request volume, progressively increasing the size of requested data from 2 KB to 8 KB. During testing, specific conditions were set, such as halting the test when CPU utilization approached approximately 80%, and the disk switch reached around 80%. This allowed us to observe performance outcomes. By systematically adjusting these preconditions and incrementally scaling up the data load, we gained insights into the final performance metrics.

Our findings pointed to the primary bottleneck being bandwidth. Performance discrepancies were most noticeable when variations in bandwidth were present. Despite retesting by tweaking gateway and CPU parameters, the results did not deviate significantly from the original, eliminating these potential influencing factors. Performance limitations surfaced in cases of data overload on the network. Thus, we inferred that the bottleneck lay in bandwidth. Particularly for different island ends, with each possessing distinct bandwidth capacities, coordination with the operations teams of each island end became imperative. For instance, Shanghai might have 30 Mbps of bandwidth, while Shanxi could boast 50 Mbps, illustrating superior performance in Shanxi.

Drawing from the preceding analysis, we identified the primary issue as the traffic gateway and the secondary concern as the imperative need for HTTP protocol optimization.

## Gateway Optimization in Practice

### Challenges with Custom Dubbo Gateway

When using our custom Dubbo gateway, we've encountered several challenges.

* **I/O Mode:** Converting Dubbo to HTTP essentially employs a tunneling mechanism. Due to the intricacies of the network, we've opted for using HTTP as the conduit to transmit data through this tunnel, which is later unpacked at the destination. One drawback of this tunneling approach is that there's a need for protocol data conversion within this tunnel, particularly when reaching the Dubbo gateway. Some of the components we developed ourselves might not achieve optimal performance.

* **Dual Serialization:** When dealing with dual serialization, it involves a JavaBeanDescriptor object, an API in Dubbo. During serialization and deserialization, business objects can't be directly serialized in parameters, requiring encapsulation in the SDK to convert JavaBeans into a structure internal to Dubbo. After reaching the destination, this process is reversed to ensure smooth serialization and deserialization of business objects in the parameters. Moreover, there is an additional layer of complexity due to Dubbo's use of Hessian2 for serialization. Using Hessian2 for dual serialization could introduce a significant performance overhead.

* **Other Business Extensions:** The Dubbo gateway demands certain business extensions, not just on the central gateway but also on the local cluster gateway. Additionally, we need some readily deployable features, such as rate limiting.

### Reasons for Opting for APISIX

We have decided to replace our internally developed Dubbo gateway with APISIX for several reasons. Given the potential challenges associated with our custom gateway, we prefer not to allocate excessive resources in this domain. Instead, we plan to integrate a pre-built, professional solution immediately to conserve development resources and enhance efficiency. The decision to choose APISIX is influenced by the following factors, providing insights for others:

* **Vibrant Community, Code Excellence:** APISIX boasts an actively engaged open-source community, ensuring a high standard of code quality.

* **Robust Architecture, Exceptional Performance:** Developed on the foundation of high-performance OpenResty, APISIX is designed to achieve performance excellence from both architectural and design perspectives, meeting our fundamental requirements for gateway performance.

* **Remarkable Extensibility:** APISIX demonstrates remarkable extensibility, accommodating our custom requirements. Essentially, we aim to benefit from NGINX-like high performance while retaining the flexibility to extend functionality based on our specific needs.

## Optimizing Protocols

In terms of protocols, we experimented with adopting the Dubbo protocol as a tunneling protocol, replacing the conventional HTTP protocol.

![Dubbo_optimization](https://static.apiseven.com/uploads/2023/12/26/bivRZ1ku_7.png)

### Advantages

Leveraging the Dubbo protocol as our tunneling protocol offers several key advantages:

* **Seamless Integration with APISIX Gateway:** Given our reliance on the APISIX gateway, we aimed for a direct Dubbo-to-Dubbo transformation, eliminating the need for dual serialization rounds and bypassing calls to essential infrastructures. As discussed in the earlier HttpClient plan, employing a single-threaded synchronous calling method requires waiting for the completion of each call before proceeding with subsequent operations. In high-concurrency scenarios, this method proves highly inefficient, and previous solutions we employed gradually proved inadequate for accommodating our growing business volume, prompting the need for an update.

* **Binary Protocol Prowess:** Binary protocols, in general, outshine their text-based counterparts, representing a relatively classical form of protocol.

* **Elimination of Redundant Headers:** Various HTTP clients may carry superfluous Header information, and adopting the Dubbo protocol helps sidestep the inclusion of such invalid redundant data.

* **Long Connection Multiplexing:** APISIX introduces multiplexing capabilities. Long connections facilitate the simultaneous transmission of multiple requests. In contrast, while HTTP allows continuous request dispatch, it requires waiting for the completion of each request before initiating subsequent ones. This disparity in concurrency efficiency is notable between HTTP and Dubbo.

* **Layer 4 Protocol Extension Framework:** APISIX implements the xRPC Layer 4 protocol extension framework, empowering developers to tailor application-specific protocols. With the xRPC framework, APISIX supports proxy implementations for various major application protocols. Users can also introduce their private, TCP-based application protocols based on this framework, offering precision akin to the HTTP protocol proxy and elevated Layer 7 control. By harnessing APISIX's xRPC extension, we have effectively introduced the capability for direct Dubbo protocol forwarding, ensuring comprehensive Dubbo protocol transmission throughout the entire process.

### Limitations

Undoubtedly, during the utilization of the Dubbo protocol, certain distinctive limitations come to the forefront:

* **Limited Permeability:** An evident challenge with the Dubbo protocol lies in its limited permeability. Considering Dubbo as a proprietary protocol, our network may traverse several physical devices, including not only software-based gateways (APISIX/NGINX/WAF) but also certain physical devices. This could potentially pose some obstacles.

* **Inability to Selectively Retrieve Key Information:** Unlike the HTTP protocol, which can selectively extract Header information into the gateway's memory and efficiently forward the Body using a zero-copy approach, the Dubbo protocol falls short in this aspect.

Throughout this practical experimentation, although we employed Dubbo, it essentially served as an exploratory endeavor. Our ability to harness it is contingent upon our internal infrastructure. Despite the seamless network within the internal cluster, the adoption of containerization through K8s has introduced distinct namespaces. Consequently, calls between these namespaces might only be feasible via domain names.

### Results

Upon the integration of the Dubbo protocol, we witnessed a remarkable improvement in optimization:

#### Reduced Payload Size, Enhanced Network Throughput

The Dubbo protocol exhibits a more concise design with fewer carried header details. Its design prioritizes compactness, using 1 bit for representation where a byte is not necessary, such as with boolean type indicators. In contrast, HTTP, for broader compatibility, includes extensive contextual and metadata information in the request headers. For internal communication, where the server and client characteristics remain relatively constant, much of this additional information becomes redundant. Notably, Dubbo's official performance tests indicate that in scenarios involving high concurrency and small data volumes, the Tps (transactions per second) of the Dubbo protocol surpasses that of HTTP by approximately 30%-50%.

Moreover, Dubbo leverages long-lasting connections, allowing the recycling of established TCP connections, which effectively minimizes the costs associated with connection establishment.

#### Reduced Overhead in Transport Protocol

Given that the entire pipeline adopts a unified protocol, it circumvents the packaging and unpackaging overhead inherent in dealing with different protocols.

## Shortcomings in the Current Revamp

In the latter part of 2022, we amalgamated and upgraded various cross-island solutions, resulting in the current "highway" scheme. This ensures standardized cross-island practices and resolves numerous business challenges encountered in previous approaches. By replacing the tunnel protocol, our goal was to optimize the network I/O model and enhance link-forwarding efficiency. Preliminary tests showed a reduction of around one-third of the Round Trip Time (RT) for a single 2k packet request.

However, practical business scenarios have revealed some emerging challenges in this architecture.

### Inadequate Scenario Support

For companies with a business structure akin to ours, where the cloud platform belongs to the company's internal and fully controllable LAN, and the island side operates on its secure network policy, our cross-network RPC needs to traverse various devices and gateways in the mixed cloud network to reach services on the other side of the cloud island. The Dubbo protocol, being a proprietary protocol, is not universally suitable for most cross-island scenarios.

Presently, this mode can only be employed in certain internal networks, such as communication between independently deployed AI clusters and platform business clusters. However, leveraging the excellent scalability of the "highway" architecture allows us to automatically switch protocols in different scenarios. This way, while benefiting from the advantages of the Dubbo protocol, we can also fall back to the HTTP protocol. Importantly, our protocol extension doesn't entail the removal of existing protocols.

### Insufficient Enhancement of Network Throughput

When dealing with interfaces that require the transmission of a substantial amount of data, and this data cannot be accommodated within a single RPC request or response, it necessitates sending the data in batches. Under the Dubbo protocol, such scenarios are processed sequentially. Despite the Dubbo protocol's commendable performance for individual requests, there is still room for improvement in overall throughput.

As previously mentioned, before the initial version of our cross-network solution was rolled out, we conducted performance stress tests. The testing scenario involved cloud-side calls to the island, data uploads, 30Mbps bandwidth, and the incremental increase of concurrency while sending 2KB data. With 30Mbps entrance bandwidth and 2KB data, TPS exceeded 500/s, making entrance bandwidth the bottleneck. When the amount of sent data increased to 80KB, TPS decreased by approximately 16 times, and RT increased by about 1.5 times. Monitoring data indicates that once TPS reaches a certain threshold, bandwidth becomes a limiting factor.

In the current real-world business scenario of the "Highway," throughput emerges as the primary bottleneck in the initial version. The recent upgrades to the gateway and protocol have notably reduced RT metrics, offering a considerable improvement in overall throughput.

## Future Plans

### Exploration of the Triple Protocol

Following the extension of APISIX's protocol, we opted for APISIX to replace our in-house Dubbo gateway, achieving the anticipated optimization in communication efficiency. However, we have identified two significant pain points to address: scenario support and communication efficiency. Consequently, our focus turned to investigating the primary communication protocol of Dubbo3—the Triple protocol.

The Triple protocol, designed by Dubbo3, is an RPC communication protocol based on HTTP. It fully embraces the gRPC protocol, supporting various communication models such as Request-Response and Streaming, and is compatible with both HTTP/1 and HTTP/2. Several features of the Triple protocol address our project's specific needs.

* Full compatibility with the HTTP/2-based gRPC protocol: Despite the Triple protocol sounding like a proprietary solution, it's a standardized, public protocol compatible with both HTTP/1 and HTTP/2. This signifies robust penetrability, effectively resolving one of our pain points—scenario support.

* Compatibility with HTTP/1 and HTTP/2, exhibiting robust penetrability.

* The efficiency boost introduced by binary framing, coupled with header compression significantly reducing payload, results in a substantial enhancement in network throughput for HTTP/2.

* As the primary protocol for Dubbo, it retains the advantage of sidestepping protocol conversion, aligning seamlessly with the "Highway" architecture.

### APISIX Extending Triple

![APISIX_triple](https://static.apiseven.com/uploads/2023/12/26/x7tTAqj3_8.jpg)

APISIX leverages its xRPC mechanism to seamlessly extend new application protocols. The xRPC not only provides us with the ability to replay interfaces but also enhances the intuitiveness of implementing custom protocols. Building upon the lessons learned from previous use cases, like Redis, which has successfully extended protocols, we find APISIX to be a versatile platform.

In our hands-on experience with various protocol extensions, APISIX stands out as a platform based on NGINX capable of forwarding TCP layer-4 protocols. While it is entirely feasible to use NGINX to route Dubbo to other network clusters due to its focus on TCP layer-4 protocols, we've chosen to extend APISIX. The reason behind this choice lies in the necessity to not just forward TCP protocols and data but also read and process this data. Whether implementing rate limiting or other essential features, we find it crucial to carry out these tasks at this level.

By integrating the Triple protocol extension into APISIX during this process, we have effectively organized data into a structure akin to a session. This case means that when developing plugins, we can seamlessly pass read header information and other relevant content to the plugin, facilitating the extension of functionalities—a significant advantage aligning with our architectural needs.

### Elevating the Triple Protocol

Building on the insights gained from working with the Dubbo2 protocol, our focus now shifts to driving the upgrade of the Triple protocol to tackle performance issues.

### Validating Performance through Stress Testing

Our architecture has undergone comprehensive stress testing, providing us with a clear understanding of existing bottlenecks. Moving forward, our commitment extends to continuous testing, delving deeper into the untapped performance potential of this foundational infrastructure.

### Charting the Course for the Future High-Speed Highway Architecture

![Highway_future](https://static.apiseven.com/uploads/2024/01/29/YYqx5vTw_9_1.jpg)

Looking at the architecture's evolution, there is a potential shift on the horizon: the former Java-based Dubbo gateway has now evolved into APISIX. We have initiated the adoption of this model in our testing environment and ongoing research. However, this transition has not been implemented in the production environment as of now. Our strategy involves upgrading the entire cluster post the complete implementation of Triple.
