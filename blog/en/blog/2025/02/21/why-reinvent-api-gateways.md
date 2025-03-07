---
title: "Why We Are Reinventing API Gateways: The Story Behind Apache APISIX"
authors:
  - name: Ming Wen
    title: Author
    url: https://www.linkedin.com/in/ming-wen-api7/
    image_url: https://github.com/moonming.png
  - name: Yilia Lin
    title: Technical Writer
    url: https://github.com/Yilialinn
    image_url: https://github.com/Yilialinn.png
keywords:
  - API Gateway
  - Cloud API Gateway
  - Open Source API Gateway
description: Discover the journey of Apache APISIX, from a small windowless office to a global open-source success. Learn why we created APISIX, its rapid growth, and how it addresses modern API gateway needs.
tags: [Community]
image: https://static.api7.ai/uploads/2025/03/07/uwv68gCg_story-behind-apache-pisix.webp
---

<head>
  <link rel="canonical" href="https://www.linkedin.com/pulse/why-we-reinventing-api-gateways-story-behind-apache-apisix-ming-wen-h3yqc/" />
</head>

>Apache APISIX has quickly become a leading API gateway, with over 460 contributors and 15K+ GitHub stars. This article explores its journey from a small project to a widely-used, open-source solution, addressing key challenges in modern API management.

<!--truncate-->

In just over five years, Apache APISIX has grown from a new open-source project to one of the most widely used API gateways in the world. Today, APISIX is an Apache Software Foundation (ASF) Top-Level Project, with over 460 contributors, 15K+ GitHub stars, and 100+ plugins. It is deployed across industries like telecommunications, automotive, financial services, and retail, with some of the largest known users running APISIX on over 10,000 CPU cores.

But how did this all start?

To answer that, we need to go back to early 2019, when two engineers, working in a small windowless office, started building an API gateway from scratch. This article tells the story of why we created APISIX, and why we open-sourced it and donated to the Apache Software Foundation.

## The Beginning: From a Windowless Room to a Global Open-Source Project

Back in 2019, existing API gateways had already been around for years. However, as cloud-native technologies and microservices architectures gained momentum, we saw a growing gap between the available API gateways and the new requirements emerging in modern infrastructures.

After months of research, we identified several critical pain points that existing solutions like NGINX and Kong API Gateway failed to address:

- **Configuration synchronization**: Needed real-time, incremental config updates across distributed API gateways.
- **Immediate configuration application**: Changes should take effect in milliseconds, not minutes.
- **High scalability**: Should handle 100K+ routes efficiently without performance degradation.
- **Hot reloading**: Plugin updates and configuration changes shouldn't require process restarts.

Determined to solve these problems, we spent several months designing and developing an MVP (Minimum Viable Product). We made three key architectural choices that still differentiate APISIX today:

1. **Using etcd for configuration storage and synchronization**, ensuring real-time updates across distributed nodes.

2. **Adopting a prefix tree (Trie) for route matching**, enabling ultra-fast lookups even with thousands of routes.

3. **Leveraging Lua for plugin execution**, allowing hot-reloading of plugins without restarting the gateway.

By mid-2019, we open-sourced our work and released APISIX on GitHub.

## Becoming an Apache Top-Level Project

In October 2019, we decided to donate APISIX to the Apache Software Foundation (ASF). By July 2020, just nine months later, APISIX graduated as an Apache Top-Level Project—one of the fastest-growing open-source projects in ASF history.

Throughout this journey, we worked without external funding, no VC backing, and no income for over a year. It was purely driven by our belief that the world needed a modern, high-performance, and open API gateway.

## Why Did We Create APISIX?

Many API gateways already existed—so why reinvent the wheel?

We saw an opportunity to fundamentally improve API management by addressing the following key technical gaps:

![API Gateway Feature Gap](https://static.api7.ai/uploads/2025/02/21/1rsgP5ka_api-gateway-feature-gap.jpeg)

If your API gateway requirements include:

✅ Real-time, millisecond-level config synchronization

✅ Handling thousands of routes without latency spikes

✅ Ultra-low latency (under 5ms) for API processing

✅ Hot plugin reloading without restarting the gateway

Then Apache APISIX is your best choice.

## Why Did We Donated APISIX to the Apache Software Foundation?

Many open-source projects are controlled by a single vendor, which can lead to licensing changes (as seen with Redis and ELK). Our goal wasn't just to build a successful product at API7 but to ensure that APISIX remains a truly open project for the global community.

By donating APISIX to the Apache Software Foundation, we ensured:

- **Vendor neutrality**: No single company controls APISIX.
- **Long-term sustainability**: The project follows Apache governance, protecting its open-source nature.
- **Global adoption**: Apache projects are trusted by enterprises worldwide.

This decision wasn't made lightly—building a successful commercial company (API7.ai) while simultaneously donating its core technology was an unconventional path. However, we believed this was the best way to maximize APISIX's impact.

## A New Path for Open Source and Business

Most companies either:

1. Start open-source projects as side projects while building their business first.
2. Keep key technologies closed-source to maintain a competitive edge.

We did the opposite:

- **2019**: Built APISIX from scratch.
- **2019**: Open-sourced APISIX on GitHub.
- **2019**: Donated it to Apache Software Foundation.
- **2020**: APISIX became an Apache Top-Level Project.
- **2021**: Expanded API7 from a two-person team into a company offering enterprise solutions based on APISIX.

This unique journey means that APISIX is engineer-led, community-driven, and deeply committed to open-source principles—something rare in today's software landscape.

## Conclusion: Reinventing API Gateways with an Open Future

Our mission with APISIX was never just about building a product—it was about reshaping API management for the cloud-native era.

With a thriving global community, rapid innovation, and enterprise adoption, Apache APISIX is set to become the de facto API gateway for modern applications.

Whether you're a startup, enterprise, or open-source enthusiast, if you're looking for a high-performance, cloud-native API gateway, we invite you to explore APISIX.
