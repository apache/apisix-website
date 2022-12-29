---
title: "当 Amazon Lambda 遇上 Apache APISIX 可以擦出什么火花？"
author: "程小兰"
url: "https://github.com/Hazel6869"
image_url: "https://github.com/Hazel6869.png"
keywords:
- Amazon
- Lambda
- AWS 
- APISIX
- Serverless
description: 本文通过介绍了 Serverless 的相关内容，引出了一个好的网关在 Serverless 架构下的重要性。而 APISIX 就是这样的一个网关。
tags: [Ecosystem]
---

> 本文通过介绍了 Serverless 的相关内容，引出了一个好的网关在 Serverless 架构下的重要性。而 APISIX 就是这样的一个网关。

<!--truncate-->

> 作者程小兰，API7.ai 技术工程师

## 什么是 Serverless

Serverless 的基础概念是将运行服务所需的基础设施交由云服务提供商管理，以及一些自部署的 Serverless 平台，从而让使用 Serverless 的工程师可以专注于面向客户业务应用层的开发，而不需要在基础设施的构建、管理、扩容等任务上投入过多精力。

目前，很多云服务提供商也在推出 Serverless 相关的产品。比如 Amazon Serverless 的核心是名为 [AWS Lambda](https://aws.amazon.com/lambda) 的计算服务。

如下图所示，和传统的开发、编译、部署运行方式不同，使用 Amazon Serverless 计算服务 Lambda，仅需要上传源文件，选择执行环境并执行，便能得到运行结果。在该过程中，服务器部署、runtime 安装、编译等，都由 Amazon Serverless 计算平台管理执行。

![download_image.png](https://static.apiseven.com/2022/11/29/6386054bc6c9c.png)

对工程师来说，只需要维护源代码和 Amazon Serverless 执行环境的相关配置即可。与此相关的技术还有 BaaS（Backend as a Service，后端即服务），是指我们无需编写或者管理所有服务端组件，把应用中的各个部分完全外包出去，而 Serverless 则是一种新的运行代码的托管环境。

### **为什么需要 Serverless**

对于开发人员而言，Serverless 可以对程序执行细节进行抽象，让业务开发工程师专注于代码本身。从上图的对比也可以看出，基于 Serverless 的开发，对于开发人员来说更友好。

从成本角度来看，使用 Serverless 只需按照使用量付费；从服务性能角度来看， Serverless 可以自动响应任何规模的代码执行请求，可以通过调整函数内存大小优化代码执行时间和响应时间。

### **使用 Serverless 时为什么需要一个网关？**

虽然 Serverless 对于开发人员提供了非常大的优势，但 Serverless 服务的使用也存在一些问题。

比如将函数 URL 硬编码到应用程序中；其次应用程序逻辑的授权和身份验证问题也比较繁琐；再者，更新云服务提供商的过程也是一个比较艰巨的工程。

而网关可以天然地解决上述问题，通过二者配合的方式，Serverless 可以更好地解决上述问题。如下图所示，描述的是如何使用 Amazon Serverless 的相关服务迅速组装一个简单的 Web Service，网关将在授权等问题中发挥重要作用。

这里以 Apache APISIX 为例，它为流行的云服务提供商（AWS、Azure）提供 Serverless 框架支持；可以定义一个路由去启用 Serverless 插件，而不是将函数 URL 硬编码到应用程序中；同时，为开发人员提供了热更新函数 URI 的灵活性，更新不同的 FaaS 云服务提供商也没有什么额外的麻烦；此外，这种方法也减轻了应用程序逻辑的授权和身份验证问题。

![download_image (1).png](https://static.apiseven.com/2022/11/29/6385ff2ce13c3.png)

## **Apache APISIX 与 Serverless**

[Apache APISIX](https://apisix.apache.org/) 是 Apache 软件基金会下的云原生 API 网关，它兼具动态、实时、高性能等特点，提供了负载均衡、动态上游、灰度发布（金丝雀发布）、服务熔断、身份认证、可观测性等丰富的流量管理功能。

我们可以使用 Apache APISIX 来处理传统的南北向流量，也可以处理服务间的东西向流量。同时，它也支持作为 K8s Ingress Controller 来使用。APISIX 通过插件来扩充生态，目前也内置了各类插件，覆盖了 API 网关的各种领域，如认证鉴权、安全、可观测性、流量管理、多协议接入等，当然，也包含很多 Serverless 相关插件。

### **AWS Lambda 插件**

`aws-lambda` 插件用于将 AWS Lambda 作为动态上游集成至 APISIX，从而实现将访问指定 URI 的请求代理到 AWS 云。用户使用该插件终止对已配置 URI 的请求，并代表客户端向 AWS Lambda Gateway URI 发起一个新的请求。

这个新请求中携带了之前配置的授权详细信息，包括请求头、请求体和参数（以上参数都是从原始请求中传递的），之后 `aws-lambda` 插件会将带有响应头、状态码和响应体的响应信息返回给使用 APISIX 发起请求的客户端。该插件支持通过 AWS API key 和 AWS IAM secrets 进行授权。 插件细节可参考[官方文档](https://apisix.apache.org/zh/docs/apisix/plugins/aws-lambda)或者[博客](https://blog.bisakh.com/blog/aws-lambda-apisix)。

### **Serverless 相关插件汇总**

除了 Amazon Lambda，Apache APISIX 目前还支持与 Azure Function、Lua 函数和 Apache OpenWhisk 等 Serverless 相关生态的集成，从而提供了相应的 Serverless 插件，具体如下表所示。

|    插件名称   | 描述 |
| :--------: | :------------ |
| [serverless](https://apisix.apache.org/docs/apisix/plugins/serverless/) |     用户可以通过 Serverless 插件上传自定义的 Lua 脚本，并根据配置中的 phase 来指定代码运行阶段。例如在 access 阶段对请求进行访问控制，在 header filter，body filter 阶段，对响应头或响应体进行修改，或者在 log 阶段打印个性化日志等。另外，由于 Serverless 插件是热加载的，因此我们不需要重新启动 Apache APISIX 便可立即生效。      |
| [Azure Function](https://apisix.apache.org/docs/apisix/plugins/azure-functions/)  |   用于将 Azure Serverless Function 作为动态上游集成至 APISIX，从而实现将访问指定 URI 的请求代理到 Microsoft Azure 云服务。启用 azure-functions 插件后，该插件会终止对已配置 URI 的请求，并代表客户端向 Azure Functions 发起一个新的请求。该新请求中携带了之前配置的授权详细信息，包括请求头、请求体和参数（以上参数都是从原始请求中传递的）。之后便会通过 azure-functions 插件，将带有响应头、状态码和响应体的信息返回给使用 APISIX 发起请求的客户端。  |
| [OpenWhisk](https://apisix.apache.org/docs/apisix/plugins/openwhisk/)|   用于将开源的分布式无服务器平台 Apache OpenWhisk 作为动态上游集成至 APISIX。启用 openwhisk 插件后，该插件会终止对已配置 URI 的请求，并代表客户端向 OpenWhisk 的 API Host 端点发起一个新的请求，然后 openwhisk 插件会将响应信息返回至客户端。    |
|[OpenFunction](https://apisix.apache.org/docs/apisix/plugins/openfunction/)    | 用于将开源的分布式无服务器平台 CNCF OpenFunction 作为动态上游集成至 APISIX。启用 openfunction 插件后，该插件会终止对已配置 URI 的请求，并代表客户端向 OpenFunction 的 function 发起一个新的请求，然后 openfunction 插件会将响应信息返回至客户端。  |

![download_image (2).png](https://static.apiseven.com/2022/12/01/638842425ec60.png)

## **总结**

近年来，随着微服务架构的出现，很多企业都开始将业务架构迁移到云端，不少云服务提供商也在推出 Serverless 相关的产品，基于 Serverless 的开发已经成为一种十分便利的开发模式。

本文通过介绍了 Serverless 的相关内容，引出了一个好的网关在 Serverless 架构下的重要性。而 APISIX 就是这样的一个网关，当然本文并未在具体使用细节上进行更丰富的描述，仅仅简单介绍了 APISIX 中的 Serverless 类型的插件 。如果你对这类插件的使用感兴趣，也欢迎在社区中进行更丰富的实践与讨论。
