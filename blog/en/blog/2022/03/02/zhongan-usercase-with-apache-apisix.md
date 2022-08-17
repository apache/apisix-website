---
title: "Implement Traffic Governance in Internet Insurance with APISIX"
author: "Sylvia"
authorURL: "https://github.com/SylviaBABY"
authorImageURL: "https://avatars.githubusercontent.com/u/39793568?v=4"
keywords: 
- API Gateway
- Internet Insurance
- Apache APISIX
- Zhongan
description: we will introduce some business scenarios and practical cases of zhongan and bring you the gateway selection and implementation operation under the "Internet Insurance" scenario.
tags: [Case Studies]
image: https://static.apiseven.com/2022/blog/0817/%E4%BC%97%E5%AE%89%E4%BF%9D%E9%99%A9.png
---

> The content of this article is sorted out from the relevant sharing brought by Xu Min, head of Zhongan Insurance and Technology Infrastructure in Apache APISIX Weekly Meeting.

<!--truncate-->

Zhongan Insurance is the first and the largest Internet insurance company in China, with sales using an all-Internet format for product sales, no offline agents, and online traffic mainly through self-operated, partner company websites and channels. By actively providing personalized, customized and intelligent insurance varieties, it makes up for the lack of product capabilities of traditional insurance companies.

When looking at the technical level from the business perspective, there is a strong demand for traffic governance on the technical side in order to meet the complex business scenarios and the proprietary characteristics of the industry of Zhongan. In this article, we will introduce some business scenarios and practical cases of zhongan and bring you the gateway selection and implementation operation under the "Internet Insurance" scenario.

## Business Scenario Features

### Multiple Insurance Categories

As we mentioned at the beginning, Zhongan, as the first Internet insurance company in China, offers a very wide range of insurance products, especially like property insurance. There are many kinds of property insurance, and there may be all types that you can think of, such as car insurance, broken screen insurance and health insurance, as well as the common daily shopping refund shipping insurance for Taobao, etc.

Basically, as long as everyone encounters something in life, it may be designed as an insurance product, so the Internet insurance scene, the number of types of insurance products is its more characteristic background.

### Multi Sales Channels

Although it is said that all the operation process of Internet insurance is carried out online, it is a typical Internet+ scenario. It has both the high frequency and high concurrency of the Internet or some explosive phenomena, and also low frequency and low concurrency scenarios like others. However, it has both the flow characteristics of the Internet and also contains very many offline or traditional insurance business characteristics.

To be more precise, many scenarios of Internet insurance rely on channels for entrance, and multiple channels enable the business to release more capabilities. Therefore, the management of channel traffic is also an important part of Internet insurance in realizing the business level.

### Strong Supervision

![Strong supervision](https://static.apiseven.com/202108/1646628024098-e18d1cc9-f5d4-42e8-b8cf-d9adb13ee9a5.png)

In addition to the business area, as an industry that deals directly with money, insurance is also part of finance, so it is a financial product that will be supervised by the CBRC just like banks and securities, and comply with the corresponding terms and conditions. At the same time, the CBRC basically puts forward different requirements for business and technical aspects every year, and these are to go along with and develop.

For example, the red and green parts in the above diagram belong to the architectural approach for the separation of regulatory channels or front-end business from core business. Here there are also some regulatory requirements for the security level, including the governance of the two places and three centers and for the isolation of the middleware data business. The requirements for traffic governance and security are relatively strict.

## Scenario Pain Points and Needs

Considering the real use scenario, each company actually has different levels and needs for traffic management. For example, some companies may prefer the gateway to be more front-loaded and act as an edge gateway, while others may want the gateway to handle north-south traffic or co-manage east-west and north-south traffic.

From some common perspectives (closer to the business scenario of Zhongan), the following pain points and solution directions have been sorted out, i.e. the shortcomings of the gateway level in the current business scenario and the action directions that we want to make up afterwards.

![Pain points](https://static.apiseven.com/202108/1646630173098-4a408c81-c09d-43c9-a97d-652a1105b36c.png)

And in the real scenario of gateway deployment, in addition to the above issues, it is also necessary to consider the overall business requirements and the adaptation of multiple types of gateways in the deployment process. The following figure shows the logical deployment in the traffic governance process, mainly involving traffic gateway, microservice gateway, unified operation gateway, BaaS gateway and domain gateway.

![Logical deployment in the traffic governance](https://static.apiseven.com/202108/1646632229629-35e7661b-82da-41cd-814b-8f3a527b7290.png)

After sorting out the current problems, the technical team of Zhongan started to focus the gateway selection on some more mature open source products and began a new round of exploration.

## Target Apache APISIX

Since Zhongan has defined "open source products" at the beginning of the selection process, it has given certain reference standards from the enterprise perspective in evaluating open source products, and has given Apache APISIX the most direct recognition from these perspectives.

![Why Apache APISIX](https://static.apiseven.com/202108/1646279255593-ef10624b-daf5-4fad-91ba-aed723925608.png)

Of course, in addition to evaluating the open source products themselves, Zhongan also compared Kong and Traefik, which are still in use in the company's business, and also contacted the MSE products shared by AliCloud, among others.

In the end, a comprehensive side-by-side comparison was conducted in the following projects, and it can be seen that Apache APISIX is well suited to Zhongan's business needs in both long-term and short-term planning at the enterprise level.

![Comprehensive details](https://static.apiseven.com/202108/1646629377542-caa6e75a-01d3-447e-b60d-3b405d9b61b7.png)

## Apache APISIX Based Landing Case

### Metering and Billing for BaaS Products

Zhongan is now gradually BaaS its underlying products within the business. Because of the financial attributes, the implementation requirements for BaaS products will be higher, and the infrastructure products need to achieve the same unified standard measurement and billing as cloud products.

![BaaS case](https://static.apiseven.com/202108/1646632943025-f024f316-8bc4-4318-8416-a05f5da4aaf1.png)

Because all the products used in the company need to achieve financial statement-style regulatory requirements. Therefore, in this scenario, real-name authentication and related auditing functions are required, and the APISIX forensics module is needed here. This means that any call process within the company needs to be audited and recorded, including the number of calls, expenses incurred, etc. So in this process, Apache APISIX's powerful logging-related features also play a very good support.

At the same time, the audit process also requires peak audit calculations, which involves a lot of billing formulas that include not only the number of calls, but also peak information. So based on APISIX's functional support, we can also realize the presentation of relevant Metrics indicators, thus laying a solid foundation for metering and billing scenarios.

![Audit process](https://static.apiseven.com/202108/1646633267273-f7737cdf-59ad-441f-b76d-8a172e46a7bb.png)

The specific implementation framework can be found in the above diagram, where the configuration center is a pure layer 7 traffic protocol, so it can be fully integrated into the metering and billing system, including ES and APISIX itself, etc. The specific operation is mainly based on the current structure of APISIX to do some definitions, such as to call several requirements for the company's business, as well as using some plug-ins of APISIX for the implementation of related orchestration capabilities.

### Multi-tenant and Multi-channel Traffic Segregation

In the face of the multi-insurance multi-channel scenario of Zhongan, multi-tenant multi-channel traffic isolation has also become a requirement with industry characteristics.

Based on Apache APISIX, Zhongan has also made some plans for the requirements and strong control in multi-channel scenario. Thanks to APISIX's powerful traffic orchestration and plugin orchestration functions, it provides a traffic precision control effect never experienced before in Internet insurance scenarios.

For example, if some business parties are large and have large channels, they may create a separate cluster for the channels to use; but some channels are smaller, maybe 10% of them are large, but most of them are small. Based on such a scenario, one can try to fuse these small channels into one gateway entity or instance, and then share it.

Of course here it will involve each application in the process of access, because different channels will have different upstream and downstream to dock, it will generate different domain names. The isolation based on this scenario (structured in the figure below) is called first-level isolation.

![First-level isolation](https://static.apiseven.com/202108/1646633613102-961cda91-be0e-475f-beb3-3b8f77c4ec5a.png)

But when the channel is docked in the need for follow-up related operations, although the process is exactly the same but the next business control capacity requirements are different from those mentioned above, so it is necessary to carry out secondary isolation of the channel again (as shown in the structure below). Through such a level of isolation plus two isolation mode, it can be a good solution to the gateway in the multi-tenant multi-channel traffic isolation.

![Two isolation mode](https://static.apiseven.com/202108/1646635887658-f357d9b8-ac83-41d1-8e3d-a8ae1eae8588.png)

## Future Plan and Expectations

### Strengthen Cross-departmental Synergy

At present, Zhongan has not only one business, but also many subsidiaries, so we will definitely face many large-scale deployments of such multi-departmental business in the follow-up process.

Therefore, when promoting the related technology stack, it must not be led by only one department, but more of a cross-departmental collaboration, so as to realize the deployment of Apache APISIX in Zhongan as soon as possible.

### Update Nacos Service Registry Based on Apache APISIX

At present, Zhongan is doing lossless service up/down based on Nacos, so in the following plan, APISIX will be interfaced with Nacos to achieve unified management. This will allow microservices to be routed to Apache APISIX for lossless or source data-based traffic distribution. Of course, we will also continue to use APISIX to improve BaaS-related capabilities.

### Continue to Watch the Service Mesh Product

However, because of the rapid development of business, the current service grid can not meet the current business implementation space. Therefore, we continue to look at external service grid products, such as APISIX Service Mesh, or try to use APISIX in combination with etcd.

## Summary

In the process of pursuing traffic governance and implementation of some ground plans, we are not only using Apache APISIX as an edge gateway to control point traffic, but also based on the overall architecture for traffic control. That is, for the whole DevOps lifecycle, such as whether the testing scenario can provide testing capability or multi-version development capability; whether the production side can provide traffic recording and playback capability; whether the big data department can produce related sandbox environment to evaluate better models and isolate the domain environment and other capabilities.

![Summary](https://static.apiseven.com/202108/1646634773029-3192409f-8302-4f1e-8b7f-fef4f2f5df2f.png)

We hope that in the subsequent implementation practice, Zhongan can realize the complete implementation of overall traffic governance based on Apache APISIX, and help the traffic control and security governance in the Internet insurance field.

:::note

1. The specific terms involved in the architecture diagram in the text are all abstract understanding, not the real environment with words.
2. API Gateway side-by-side comparison data comes from the Internet, which may deviate from the latest or real data, and does not represent the official website data.

:::
