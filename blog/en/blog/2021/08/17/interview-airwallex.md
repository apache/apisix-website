---
title: Interview with Yang to explore API gateway in Airwallex 
author: Apache APISIX
keywords: 
- APISIX
- Airwallex
- Financial
- Data Sovereignty
description: This article introduces why SkyCloud chooses API gateway Apache APISIX and the usage scenarios and production environment performance of APISIX.
tags: [Case Studies]
image: https://static.apiseven.com/2022/blog/0817/Airwallex.png
---

> This article interviewed Airwallex Technical Platform Lead Yang Li, who is responsible for the evolution of the company's technology platform. The interview details why Airwallex chose Apache APISIX when making the technology selection, the usage scenarios of Apache APISIX in Airwallex, and the performance of Apache APISIX in the production environment.

<!--truncate-->

We had a chance to interview Yang Li, the technical platform leader of Airwallex. In the interview, Yang Li talked about why he chose Apache APISIX in the technology selection, and the application of Apache APISIX in Airwallex.

**Q: Hello Dr. Li, please briefly introduce yourself and the work you are currently engaged in.**

**Yang**: Hi, my name is Yang Li, PhD, Apache APISIX Committer, Airwallex Technical Platform Lead, responsible for the evolution of the company's technology platform. Prior to joining Airwallex, I led the Ops Chain Alliance at Wanxiang Blockchain. Prior to Wanxiang Blockchain, he led the OTC derivatives risk control platform at Citigroup.

Airwallex is a global financial technology company that empowers businesses of all sizes to operate across borders, thereby helping to grow the global economy. With technology at its core, Airwallex has built a proprietary global financial infrastructure platform with a global payment network covering more than 50 currencies in over 130 countries and regions, providing digital fintech products for businesses of all sizes to help them grow at high speed around the world in a more efficient and secure way in the globally connected information age. Since its inception in 2015, Airwallex has received over $500 million in funding from top-tier investors and now has 12 offices and over 900 employees worldwide.

![Airwallex Li Yang](https://static.apiseven.com/202108/20210816001.png)

**Q: What made you/your technical team choose to use Apache APISIX when making the technology selection?**

**Yang**: API gateway is an extremely important basic technology component, and we compared the main gateway products in 6 main dimensions during the technology selection.

- **Stability**: The stability of the API gateway is critical. 62.1% of the top 1000 websites in the world are Nginx-based, which means that the Nginx-based web server has been tested in complex and diverse scenarios in production environments; Apache APISIX's fully dynamic design also allows it to modify routes without having to reload, and the client's long links are maintained. The fully dynamic design of Apache APISIX also allows it to maintain long links to clients without having to reload when modifying routes; we also stress-tested Apache APISIX and found it to be stable when the CPU reached over 70%.

- **Performance**: Every API request passes through the API gateway, and reducing gateway performance loss can greatly reduce the overall response time of the company's API. In our PoC comparison of the major gateway products, Apache APISIX has more than 50% lower response latency than other gateways; the design of the Apache APISIX data plane also makes each instance in the cluster independent of each other, which also makes it inherently support horizontal scaling.

- **Scalability**: The API gateway model is a very important microservice architecture model, and API gateways that conform to the API gateway model must support complex enterprise features such as authentication, permission control, service discovery, flow restriction, degradation, load balancing, whitelisting, dynamic routing, etc. So what kind of customization is supported is a very critical consideration when choosing an API gateway.

- **Community Activity**: New technologies and requirements are emerging all the time, and an active community is key for API gateways to keep pace with the evolution of technology. As early as when Apache APISIX was an Apache incubation project, its community was already very active, in terms of contributor count, issue response time, and Pull Request count.

- **Private Deployment**: As a core technology architecture component, API gateways should be deployed at the edge of an enterprise's private network. Apache APISIX has good environmental adaptability and can be easily deployed on various environments, including cloud computing platforms.

- **Open Source Protocol**: Apache 2.0 gives considerable technical freedom to enterprises that customize APISIX.

**Q: What scenarios is Apache APISIX used in? What problems have been solved?**

**Yang**: We use Apache APISIX as a core component of our microservice gateway model, which is deployed at the edge of the network to provide common gateway functionality for all traffic coming into Airwallex, solving problems such as

- Data sovereignty issues: Data sovereignty is a very critical regulatory requirement for financial infrastructures that operate across borders. To this end, we developed a regulatory compliant dynamic routing plug-in using the Apache APISIX dynamic upstream selection feature. Dynamic routing can intelligently select upstreams for request distribution based on the characteristics of user requests, abstracting the complex multi-data center collaboration problem from the service layer to the gateway layer. Dynamic routing essentially has to answer two questions: How to group upstreams? How to match requests with groupings.

- Microservice Isolation: Airwallex wants the engineering teams of each microservice to have autonomous control over their own services, effectively reducing the cost of communication and coordination and improving engineering effectiveness. This architectural concept requires that infrastructure components shared by teams, such as API Gateway, support multi-tenant isolation. While ensuring the robustness and cost control of the whole system, it allows business teams to configure and extend the gateway functions according to their own needs, maintaining the independence of microservice teams and services.

- Tenant-level flow limit: In a multi-tenant environment, the traffic characteristics of each tenant are different. The same flow restriction for different tenants cannot meet the business needs, and tenant-level flow restriction can do more appropriate flow restriction based on user characteristics.

- Tenant-level whitelisting: In a multi-tenant environment, each tenant's access IP is different. Single whitelist control cannot meet the needs of tenant-level security management. Tenant-level whitelisting allows each tenant to control its own whitelist and not worry about other users in the whitelist accessing its own resources.

- Authentication: API gateways should not only support request authentication, but also support dynamic key update, which is a key part of ensuring the security of user resources.

- The API gateway can verify whether the requesting user has sufficient authority to access the interface according to the routing configuration and intercept illegal traffic in the first place.

![Airwallex arch](https://static.apiseven.com/202108/20210816002.png)

It's a bit more involved and can be simplified to make it clearer: !

![Airwallex arch](https://static.apiseven.com/202108/20210816003.png)

**Q:Did you have a smooth upgrade process in Apache APISIX? Share your feelings or stories about the upgrade process.**

In order to be able to upgrade to new versions of Apache APISIX at any time, we implemented the main features as custom plugins. This means that our code base is unlikely to conflict with the core Apache APISIX main Repo code, which helps us avoid code conflicts we might encounter. However, there are times when we need to modify the core code, at which point we try to implement these features in the open source community. When we discuss these features in the open source community, the community partners are very eager to participate in the discussion and in most cases solve our problems quickly.

**Q: How long has Apache APISIX been running in a production environment? How does it perform online?**

**Yang**: The production environment has been running for 15 months, and 99% of the response latency is within 23ms with dynamic routing, tenant-level flow restriction, tenant-level whitelisting, Authentication, Authorization, etc. The overall performance is very stable. Thanks to the excellent plug-in mechanism of Apache APISIX, we can add private plug-ins that meet business requirements with little modification to its core code. The complete testing system also further guarantees the quality of the software and allows us to add plug-ins for personalized requirements without breaking the original core logic.

**Q: What are the shortcomings of Apache APISIX and what do you hope the community will build together to improve?**

**Yang**: Apache APISIX's data-plane design brings it lossless horizontal scaling and extreme performance, but it also makes the routing configuration difficult to achieve forward compatibility, which brings some coordination difficulties for the release of new versions.

**Q: What are the follow-up plans?**

**Yang**: The follow-up plan includes three main areas.

1. using multi-layer networks to split different gateway logic into different tiers, such as distributing traffic based on data sovereignty with other gateway logic belonging to a different network tier.
2. easy-to-read and easy-to-use route management is critical to the success or failure of the API gateway, although the gateway features will continue to iterate and increase, but the route management needs to be developer-friendly so that developers can easily understand what the gateway can do for him, how to configure and how to publish.
3. Use request staining to help implement production environment testing. Implementing production environment testing with API gateway request staining can bring us flexibility and ease of use.

Thank you, Dr. Li, and we look forward to more use cases and roles for Apache APISIX in Airwallex.
