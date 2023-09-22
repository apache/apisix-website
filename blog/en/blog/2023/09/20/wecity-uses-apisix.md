---
title: "Charting the Future of Urban Connectivity: WeCity Collaborates with APISIX"
authors:
  - name: Arjen Hof
    title: Author
  - name: Tim van Densen
    title: Author
keywords:
  - WeCity
  - API Gateway
  - Apache APISIX
  - API Gateway Best Practice
description: WeCity has been using APISIX for its core business since May 2023. Arjen Hof, Co-founder and CTO of WeCity, and Tim van Densen, Software Architect and Lead Developer of WeCity, shared their experience with APISIX. 
tags: [Case Studies]
image: https://static.apiseven.com/uploads/2023/09/20/6ZpgFEMr_WeCity.png
---

> WeCity has been using APISIX for its core business since May 2023. Arjen Hof, Co-founder and CTO of WeCity, and Tim van Densen, Software Architect and Lead Developer of WeCity, shared their experience with APISIX.
<!--truncate-->

## About WeCity

[WeCity](https://www.wecity.nl/en), a Dutch company, serves as the vital link between smart city solution providers and their users. By offering an array of technical and organizational tools, WeCity facilitates secure and reliable data exchange.

Currently, WeCity is actively engaged in a significant initiative led by the Dutch Ministry of Infrastructure. As part of this endeavor, WeCity has been entrusted with the development of generic services for an inventive data-driven mobility ecosystem. Within this ecosystem, our company ensures that both the supply and demand sides receive robust support while adhering to agreements that foster a dependable and trustworthy data exchange.

We would be thrilled to share our exceptional experience with [APISIX](https://apisix.apache.org/), providing hints for any enterprise looking for a cutting-edge API gateway solution that can take their applications to new heights.

## Q: Could you please use one sentence to summarize your feelings about APISIX?

A: We value APISIX for its open-source character, the philosophy behind it, its core feature focus, and response communication.

## Q: What are the biggest challenges on the horizon for your industry?

A: As mentioned, there are many different data sources regarding public space, coming from a plethora of different organizations. Making this data available in a secure, trusted way is critical. Our objective is to establish a federated network comprising data owners, platforms, providers, and consumers. The challenge is to create a governance structure that makes processes auditable, traceable, transparent, and secure.

## Q: What was your team's process before using APISIX?

A: Our goal is to enable a secure exchange of data, with full control for the data owner and options to monetize data. We have looked into many different (open-source) API management solutions. They all have pros and cons, but none of the solutions fit our architecture because they required too many modifications and were not extensible with plugins.

## Q: What were the major pain points of your process before using APISIX?

A: WeCity focused on public space and was building a data market to offer data owners the opportunity to expose their datasets to data consumers. The data owner should be able to attach plans and policies to their data. If necessary, data transformations can also be applied to standardize data according to international standards.

However, the exchange and exposure of data was cumbersome, leaving data owners with limited control. Existing solutions were often custom-made and hard to maintain. The cost associated with these processes can be substantial, while opportunities to monetize valuable data remain limited.

In addition, there were many datasets available related to public space: mobility, housing, green and nature, logistics, waste management, and more. Facilitating the secure and standardized availability of this data while ensuring complete control for the data owner presented a formidable challenge.

Data management requires multiple components, from metadata management, streaming services, data models, IAM (Identity and Access Management), metrics, monitoring, and many more. Integrating these components requires an open, flexible, and extensible architecture.

Before using APISIX, we had to define a specific approach for every partner we wanted to connect with. With APISIX we are able to apply plans and policies to different datasets and integrate them into our architecture.

## Q: Were you comparing alternative solutions? Why us? Pros and cons? How long have you been using APISIX?

A: We thoroughly evaluated various solutions, including WSO2, Kong, Gravitee, 3Scale, API Umbrella, etc. We found that many open-source options were functionally restricted, necessitating costly enterprise agreements or support contracts for additional assistance. It was imperative for us to find a solution that seamlessly integrated into our existing architecture and infrastructure, as we anticipated the need to handle diverse data types, delivery mechanisms, and security requirements.

Besides, we prefer to use open-source software in our architecture. Therefore, we followed projects the [Apache Software Foundation](https://www.apache.org/) offers and researched several other open-source API management solutions. We found APISIX on Apache and found that it is one of the truly open solutions, with an approach that aligns with our goals.

After careful consideration, we made the decision to adopt APISIX in May 2023.

## Q: Would you share some details about how your team implemented APISIX?

A: Our full infrastructure is running on Kubernetes. That is why we were pleased to see APISIX is supporting a native Kubernetes solution. We are making use of the APISIX Kubernetes Ingress Controller, which we have set up through the official APISIX Helm chart. The broad technical support of APISIX is also one of the reasons why we chose it.

## Q: How do you and your team currently use APISIX? What types of goals or tasks are you using APISIX to accomplish?

A: We are currently using APISIX as a gateway for managing our routes and consumers. For each route, it is very easy to customize the behavior through plugins. Because we receive many requests for API access from different kinds of partners and customers we have to be flexible. For example, it is very easy to set up a new route for an existing backend API which requires different rate limiting. With a few changes in the plugin confirmation, a new route is generated quickly.

We are creating these routes with the native ApisixRoute in Kubernetes and also making use of the APISIX admin API. Our customers can control their own subscription, when a subscription has been activated a route is dynamically created with a different authentication config for each customer.

## Q: Were there any internal risks or additional costs involved with implementing APISIX? If so, how did you address them?

A: The risk is that we will have to cope with data processes that are not completely known yet. We have tested different scenarios and have not found limitations yet. Also, the implementation of APISIX was rather straightforward and did not raise additional costs. When the number of data sources grows in the data market, we will need additional resources but this is part of the business plan.

## Q: What was the most obvious advantage you felt about APISIX?

A: Open source, extensible, and implementation.

## Q: By using APISIX, can you measure any improvements in productivity or time savings?

A: It will be easier for us to add new data sources to our data market and we build upon our knowledge to create plans and policies, monitor usage, and monetize subscriptions.

## Q: How would you describe APISIX if you explained it to a friend?

A: APISIX is a component manager that enables us to apply plans and policies to data sources and expose them in a secure way to consumers.

## Summary

By leveraging APISIX, WeCity securely and standardizes data availability while maintaining full control for the data owner. This enables us to apply specific plans and policies to different datasets, seamlessly integrating them into their existing architecture. The adaptability provided by APISIX greatly enhances our overall data management capabilities.

Furthermore, the introduction of APISIX streamlines the data exposure and exchange process, improving efficiency and scalability. WeCity can effortlessly handle larger volumes of data, ensuring smooth operations and facilitating future growth.

The use of APISIX establishes a robust framework for data sharing, ensuring the reliability and trustworthiness of exchanged data. This is crucial for building a sustainable and efficient mobility ecosystem that meets the needs of service providers and users.
