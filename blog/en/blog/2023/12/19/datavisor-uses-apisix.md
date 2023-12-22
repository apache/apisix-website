---
title: "Enhancing Security and Performance: DataVisor's Dynamic Use of APISIX"
authors:
  - name: Xiaobiao Zhao
    title: Author
    url: https://github.com/xiaobiaozhao
    image_url: https://github.com/xiaobiaozhao.png
  - name: Jing Yan
    title: Technical Writer
    url: https://github.com/JYan00
    image_url: https://github.com/JYan00.png
keywords:
  - open source
  - API gateway
  - Apache APISIX
  - DataVisor
  - API gateway best practice
description:  DataVisor not only uses APISIX in its production environment but also enhances APISIX through customization, and these efforts have proven successful in optimizing DataVisor's production processes.
tags: [Case Studies]
image: https://static.apiseven.com/uploads/2023/12/05/gM8zRGh1_Cover_Datavisor.png
---

> Author: Xiaobiao Zhao, DataVisor Senior Architect, Apache Kvrocks Committer, OpenResty and Apache APISIX Contributor. This article is based on a presentation given by Xiaobiao Zhao at the APISIX Shanghai Meetup in November 2023.
<!--truncate-->

DataVisor specializes in risk control, focusing on preventing activities such as counterattacks and fraud. In our development at DataVisor, we not only use APISIX in our production environment but also enhance it through customization, including the secondary development of plugins, and these efforts have proven successful in optimizing DataVisor's production processes. Read on for a practical overview of how APISIX is applied at DataVisor.

## Challenges

* **Performance Pressure:** In the risk control industry, where performance metrics are crucial, DataVisor faces the challenge of ensuring the timely and efficient execution of risk control calculations. Delays in these calculations could lead to a loss of control over potential risks in this competitive and risk-prone environment.
* **Balancing Security and User Experience:** The primary goal of risk control tasks is to intercept potentially harmful user actions while preserving a seamless user experience. DataVisor's system must ensure user safety without compromising the natural flow of user interactions, posing a challenging balance.
* **Difficulty with Gateway Tools Meeting Requirements:** Many API gateway tools on the market face issues like high latency or erratic performance. Such challenges can impact the stability and availability of DataVisor's system, especially when efficiently managing business traffic is crucial. Therefore, choosing a stable, low-latency API gateway tool is crucial for maintaining the system's smooth operation.

## Implementing APISIX in the Production Environment

In product development, DataVisor has adopted a comprehensive gateway and authentication solution. APISIX is not just a standalone component within the product ecosystem; it collaborates with other products like AWS API Gateway, Application Load Balancer (ALB), Imperva, and an integrated OAuth authentication mechanism. All these tools, each equipped with gateway functionalities, work together to facilitate traffic access within our system.

![APISIX_Datavisor](https://static.apiseven.com/uploads/2023/12/01/98FBGSY0_1.png)

### Why We Chose APISIX

When deciding on a solution for our production setup, we carefully compared options and settled on APISIX for several reasons:

1. **Cost-Effectiveness:** Compared to basic application gateways from cloud providers (like ALB), APISIX offers significant cost savings for our operations.
2. **High Performance, Low Latency:** APISIX stands out for its outstanding performance. Unlike other API Gateway tools, APISIX not only avoids noticeable delays but is also less prone to performance spikes, such as P99 or P9999, which ensures a smoother experience without significant latency issues.
3. **Industry-Specific Focus:** In the field of risk control, our business system requires a rapid risk control computation time of 50 milliseconds. Failing to complete this computation promptly results in the immediate dismissal of the risk control result. The main goal of risk control is to intercept potentially harmful user actions without disrupting their normal activities.

### Utilizing APISIX in Practice

Currently, we are expanding the usage of APISIX across a growing range of business scenarios.

Given that DataVisor does not engage in direct business activities and primarily serves various vendors who call upon our services, APISIX acts as the gateway for traffic deployed on the public network. This deployment approach may seem somewhat unconventional in practical scenarios. Typically, APISIX might be situated on an intranet or one layer below the public network. However, our strategy to deploy it directly on the public network allows APISIX to efficiently manage traffic originating from diverse business channels.

![APISIX_Datavisor_process](https://static.apiseven.com/uploads/2023/12/01/aN1bmljK_2.png)

To offer a more concrete understanding of how we implement APISIX in our production environment, a typical use case is provided below.

Customer A initiates access to our system via the red route to acquire an authorization access token. Subsequently, it interacts with our internal authorization server or connects to other authorization servers, such as the widely used Okta, through APISIX. Our primary authentication mechanism involves routing all traffic to Okta for the initial authentication process.

Once customers obtain different tokens, APISIX's routing capabilities will direct this authenticated traffic to various Kubernetes clusters. Presently, we have deployed an active-active Kubernetes cluster, with traffic being routed to either Cluster A or Cluster B. Typically, we direct traffic to one Kubernetes cluster, while the other serves as a reserve, only handling traffic during extensive upgrades or cluster updates.

![APISIX_Datavisor_server](https://static.apiseven.com/uploads/2023/12/01/w2VYY9Ji_3.png)

Regarding the usage of the gateway, we have opted for a relatively straightforward and standard deployment approach. An interesting observation is that we can place APISIX outside our Kubernetes cluster. This step is made possible by APISIX's outstanding performance, requiring minimal CPU resources. Utilizing smaller instances outside the cluster to deploy APISIX has proven effective in handling significant network traffic.

In our production setting, we have deployed three APISIX nodes, each potentially configured with only two cores. We employ minicomputers with 2G or 4G of memory to manage the traffic load. If there are concerns about APISIX's performance, I am confident they can be put to rest. Its performance is expected to rival that of NGINX and OpenResty, and perhaps even surpass my initial expectations.

## Customizing APISIX

### Enhancing the Privileged Process

While there is not a concept of privileged process in NGINX, it is present in OpenResty, where it stands at the same level as worker processes. This process is somewhat special because it doesn't handle incoming network traffic—it does not listen on any ports. However, it can perform various computations and data collection tasks. As a result, we have extended this privileged process to cater to our specific needs.

![APISIX_Datavisor_backend](https://static.apiseven.com/uploads/2023/12/01/VNkXA43W_4.png)

The diagram above provides a clear overview of the relationship between APISIX and our backend services. Our primary utilization of APISIX is for receiving and distributing traffic.

At the gateway level, APISIX conducts pre-processing before the traffic enters. What sets our configuration apart is the introduction of a small process at the APISIX layer. This process, functioning akin to a Sidecar, operates concurrently with the APISIX process, responsible for executing its designated tasks. Following this step, it transmits the gathered data to APISIX, which, in turn, conveys it back to the upper layer of the system to perform specific business rules. While this usage pattern is relatively uncommon and typically not encountered in common business scenarios, it may be applicable in risk control.

![APISIX_Datavisor_worker](https://static.apiseven.com/uploads/2023/12/01/AXvYYBiG_5.png)

How is the implementation of the privileged process handled? Our model typically follows a master-worker structure, with worker processes responsible for managing business traffic and the master process forking a unique privileged process. In our development, we restrict the privileged process to just one. Thus, we have devised a distinct strategy: within the privileged process, we fork another process to handle additional tasks, ensuring it does not interfere with the demanding responsibilities of the privileged process.

For data collection, communication between the privileged process and worker processes is facilitated through a shared-dict. The performance of shared-dict is notably robust, meeting the demands of the majority of scenarios.

### Expanding ssl-certificate-phase

![APISIX_Datavisor_clienthello](https://static.apiseven.com/uploads/2023/12/01/CPnBHmIW_6.png)

Expanding the ssl-certificate-phase involves integrating APISIX using the NGINX + Lua framework. Initially, APISIX lacked support for extensive script injection during the TLS handshake phase. When the OpenResty community later introduced the ability to inject code during the ssl-client-hello phase, we noticed a lag in the APISIX community's adoption. Consequently, we had to manually modify APISIX.

Referencing the existing code structure, we introduced our code into the APISIX process, enabling its execution during the client-hello phase. While Lua provides several capabilities during this phase, it has some limitations. In many scenarios, we find it beneficial to utilize NGINX for module development or create a small dynamic library for NGINX to accomplish specific tasks.

Presently, OpenResty and Lua showcase exceptional capabilities in loading dynamic libraries. The Foreign Function Interface (FFI) feature allows seamless integration of dynamic libraries. Defining the necessary external interfaces in the dynamic library and exporting functions to Lua through simple FFI commands results in unexpectedly improved performance. Code written in this FFI + Lua pattern performs comparably to code written purely in the C language, achieving around 70% of its performance. In essence, it stands out as a top-performing solution. Furthermore, as runtime increases, performance tends to exhibit further enhancements.

### Developing Plugins

![APISIX_Datavisor_plugin](https://static.apiseven.com/uploads/2023/12/22/k1Lg7rBk_7.jpg)

As a result of our modifications to APISIX, numerous functionalities in the packaged product are embedded deeply within the project, making dynamic adjustments challenging. Accordingly, we opted to package specific plugins, integrate them into the APISIX project, and then make modifications using the Dashboard.

The process of developing plugins with APISIX is highly convenient and facilitates the effortless creation of high-performance plugins. Presently, APISIX supports not only Lua for plugin development but also multiple programming languages such as Java, Go, and Python. This versatility empowers users to implement a diverse array of functionalities.

## Benefits of APISIX on Production

The deployment of APISIX has resulted in an overall enhancement of our system's performance, yielding exceptional production outcomes.

* **Latency Reduction:** One of the standout features of APISIX is its remarkable ability to substantially reduce latency. In comparison to alternative solutions, we have observed shorter processing times for user requests, a critical factor in delivering a better user experience.
* **Throughput Boost:** The introduction of APISIX has led to a significant increase in throughput, allowing the system to handle concurrent requests with greater efficiency. Unlike using other API gateway products, we have achieved successful large-scale request processing, ensuring the stability and reliability of the system under high loads through APISIX. This outcome solidifies a dependable foundation for managing spikes in user traffic.

![APISIX_Datavisor_effect](https://static.apiseven.com/uploads/2023/12/22/aHwCZUGj_8.png)

## Outlook for APISIX

APISIX stands as a vibrant community committed to monthly version iterations. Therefore, we have two anticipated functional improvements for the upcoming development of APISIX.

### Dynamic Addition and Update via the Dashboard

Currently, completing plugin development does not allow for hot updates. Transmitting plugins directly to the APISIX server through the post method is not feasible; it necessitates repackaging the APISIX server and restarting, particularly when it comes to the Dashboard. Hence, we hope APISIX can introduce hot update functionality, facilitating more convenient dynamic addition and updating of plugins through the Dashboard.

### Support for CPU-Intensive Calculations using run_worker_thread

NGINX introduced a specialized mechanism known as thread. These threads primarily handle non-network-related tasks, such as activities with high CPU utilization (data encryption/decryption and compression). Despite being unrelated to network I/O, high CPU usage may potentially cause some blocking of other network requests within the process.

With this in mind, I hope APISIX can implement a similar feature. The ability of APISIX to handle certain intricate functional computations, such as data encryption/decryption and caching, would be a valuable enhancement.

### Summary

To sum up, DataVisor's application experience with APISIX is noteworthy. We prioritized the performance demands within the risk control domain and successfully addressed practical challenges through a distinctive approach to secondary development. These experiences have not only proven successful in technical implementation but have also established a sturdy foundation for our company's resilient operation in the risk control industry.

Through sharing these insights, we aim to offer beneficial references for other companies in the industry, collectively driving the ongoing innovation and progress of risk control technology.
