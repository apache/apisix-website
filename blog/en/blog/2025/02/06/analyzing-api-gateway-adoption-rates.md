---
title: Analyzing API Gateway Adoption Rates Through Internet Data
authors:
  - name: Ming Wen
    title: Author
    url: https://github.com/moonming
    image_url: https://github.com/moonming.png
  - name: Yilia Lin
    title: Technical Writer
    url: https://github.com/Yilialinn
    image_url: https://github.com/Yilialinn.png
keywords:
  - APISIX
  - Adoption Rates
  - API Gateway
description: Explore 2025 API gateway adoption trends with data-driven insights on Kong, APISIX, and Traefik. Learn how companies and regions shape API gateway usage.
tags: [Ecosystem]
image: https://static.apiseven.com/uploads/2025/02/06/qX7Uwq66_1738762325395.png
---

<head>
    <link rel="canonical" href="https://www.linkedin.com/pulse/analyzing-api-gateway-adoption-rates-through-internet-ming-wen-prync/?trackingId=e7XGKblnQF%2BVlG5FDouG%2Fg%3D%3D" />
</head>

> Explore 2025 API gateway adoption trends with data-driven insights on Kong, APISIX, and Traefik. Learn how companies and regions shape API gateway usage.

<!--truncate-->

## Key Takeaways

1. **Internet-wide scans** give us a broad view of API gateway deployment but may be influenced by large-scale deployments from a few organizations.

2. **Company-based data** from sources like BuiltWith helps us understand which businesses use specific API gateways, adding context to raw adoption numbers.

3. Different API gateways have varying levels of adoption across **industries and regions**, suggesting that market preferences play a role in selection.

4. Combining multiple data sources provides a more balanced perspective on API gateway adoption trends.

## Introduction

API gateways play a crucial role in modern software architecture, acting as a control point for routing, security, and performance optimization. With a variety of options available, engineers often consider adoption rates as a key factor when selecting an API gateway. While reports from firms like Gartner and G2 provide valuable insights, they rely on surveys and curated datasets, which may be influenced by vendor-driven narratives. Instead, I wanted to explore a more data-driven, large-sample, and manipulation-resistant method to analyze API gateway adoption rates.

## Measuring API Gateway Adoption with Internet-Wide Scans

To find a more objective measure, I turned to internet-wide scanning techniques that reveal API gateways publicly exposed on the internet. Most API gateways are designed to expose services to external consumers, making them discoverable via network scanning tools. I initially explored both FOFA and Shodan as internet search engines, but found FOFA’s dataset to be more comprehensive for this analysis.

By querying FOFA for public-facing instances of Kong, Apache APISIX, WSO2, and Traefik as of early February 2025, I obtained the following results:

![Nodes using Kong API Gateway](https://static.apiseven.com/uploads/2025/02/06/FTPivIkZ_nodes-using-kong-api-gateway.png)

![Nodes using APISIX API Gateway](https://static.apiseven.com/uploads/2025/02/06/DTRZsW0F_nodes-using-apisix-api-gateway.png)

![Nodes using of WSO2 API Gateway](https://static.apiseven.com/uploads/2025/02/06/0TZnI0iW_nodes-using-wso2-api-gateway.png)

![Nodes using Traefik API Gateway](https://static.apiseven.com/uploads/2025/02/06/UujJSm8z_nodes-using-traefik-api-gateway.png)

As of early February 2025, Kong API Gateway had **345,000** deployments, Apache APISIX had **147,000**, while WSO2 and Traefik had **14,000** and **2,700**, respectively.

These results provide a broad sample size and offer a high-level perspective on API gateway adoption. However, there are potential biases: a single organization deploying thousands of nodes could skew the data, and this method does not reveal which companies are using a particular API gateway. If smaller companies dominate the dataset, the practical implications for enterprise adoption may be limited.

## A Different Perspective: Identifying API Gateway Usage by Companies

To complement the internet-wide scan, I analyzed API gateway adoption from a company-centric perspective using BuiltWith, a service that tracks technology adoption across websites. BuiltWith allows us to see which companies use specific API gateways rather than just counting exposed nodes. I searched for Kong, Apache APISIX, and KrakenD but could not find data on other API gateways. If anyone has insights into other sources, I’d be happy to update this analysis.

Here are the BuiltWith results:

![Websites using Kong API Gateway](https://static.apiseven.com/uploads/2025/02/06/hxhkPZsj_websites-using-kong-api-gateway.png)

![Websites using APISIX API Gateway](https://static.apiseven.com/uploads/2025/02/06/wnSMOa8f_websites-using-apisix-api-gateway.png)

![Websites using KrakenD API Gateway](https://static.apiseven.com/uploads/2025/02/06/pwC3zOJa_websites-using-krakend-api-gateway.png)

Based on BuiltWith data, in early February 2025, **37,000** companies were using Kong API Gateway, **5,200** companies were using Apache APISIX, and **2,000** companies were using KrakenD.

Most companies using **Kong** are based in the **United States**, **KrakenD** is primarily adopted in **Europe**, while **Apache APISIX** has adopters distributed across **the United States and China**.

These results provide a different view—one that highlights enterprise adoption trends across different regions and industries. By examining this data, we can infer not just overall adoption but also sector-specific preferences for API gateways.
