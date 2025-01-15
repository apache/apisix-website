---
title: "新氧数据安全网关建设及应用"
authors:
  - name: 新氧信息安全团队
    title: Author
  - name: Yilia Lin
    title: Technical Writer
    url: https://github.com/Yilialinn
    image_url: https://github.com/Yilialinn.png
keywords:
  - 开源社区
  - API 网关
  - Apache APISIX
  - 新氧科技
  - 医美
description: 新氧科技基于 Apache APISIX 完成了数据安全网关的建设，建立了从客户端到安全网关再到风控系统的纵深安全防御体系，实现了对高级威胁的全面检测和响应。
tags: [Case Studies]
image: https://static.apiseven.com/uploads/2025/01/15/2F0whwRk_soyang-cover.png
---

> 作者：马晓坤，新氧数据安全网关建设团队成员。新氧数据安全网关建设团队成员：新氧信息安全研发团队马晓坤、任怀博、郭旭鹏。
<!--truncate-->

新氧科技是行业领先的互联网医美公司，公司以 **“让每个人更美更健康”** 为使命，以 **“成为最受信赖的医美医疗服务平台”** 为愿景，致力于引领行业合规化发展。通过技术创新和服务赋能，连接用户与优质医疗资源，提供透明、高效、可信赖的 **“内容+社交+电商”** 三位一体的一站式在线医美服务平台。公司持续加大技术投入，增强平台信息和服务的可信度、透明度以及专业度，积极保护用户隐私数据，为用户提供更高质量的体验。

## 一、Apache APISIX 简介

### 我们为什么需要使用 APISIX？

Apache APISIX 是 Apache 软件基金会下的顶级项目，定位为一个云原生 API 网关，具有动态、实时、高性能等特点，能够简化 API 管理和优化数据流量控制，是现代化企业流量治理的关键工具。

使用 APISIX 网关作为所有业务的流量入口，可以提供如下关键功能：**动态路由、动态上游、动态证书、A/B 测试和灰度发布、蓝绿部署、限速、防攻击、监控与可观测性、服务治理**。

### APISIX 在新氧信息安全与数据安全的实践

Apache APISIX 结合了高性能、动态配置和插件化架构，为信息安全和数据安全提供了一站式的解决方案，它能够保护 API 数据传输的安全性、防止恶意请求或攻击、提供全面的安全审计功能、满足行业合规需求。

APISIX 虽提供了许多安全能力，但**要实现更复杂的安全功能，就需要通过插件开发进一步扩展，满足新氧的定制化需求**。

## 二、需求背景

随着新氧平台的快速发展，数据流量和 API 调用量大幅增加，业务复杂度不断提升。同时，医美行业的特殊性对用户数据隐私保护和安全合规提出了更高要求。面对日益复杂的业务需求与安全挑战，我们需要一个能够提供高性能、灵活扩展、支持动态配置的数据安全网关，来作为流量治理和安全防护、数据保护的核心组件。

## 三、新氧数据安全网关主要功能

新氧数据安全网关主要分为四大模块十大功能：

![10 features of Soyang Data Security Gateway](https://static.apiseven.com/uploads/2025/01/15/Sj0Oy37Z_so-yang-1.webp)

网关的核心由 **“条件引擎”** 与 **“动作执行”** 组成，将数据安全网关的各类需求抽象为这两类逻辑，并进行配置化，做到秒级的配置响应。基本处理逻辑如下：

![Diagram of Request Handling in Soyang Data Security Gateway](https://static.apiseven.com/uploads/2025/01/15/qeIzVgvq_so-yang-2.webp)

目前已实现 10 个 Actions：mask、limit、watermark、log、check 等。

核心处理逻辑示例：

![Request Handling Example](https://static.apiseven.com/uploads/2025/01/15/t7bLhFYe_so-yang-3.webp)

规则配置：各类需求均可通过规则进行配置。

![Rule Configurations](https://static.apiseven.com/uploads/2025/01/15/v6ce5UeD_so-yang-4.webp)

### 功能一：统一身份管理

实现零信任的单点登录，整合飞书、微信、LDAP、手机号等多账户体系。

逻辑流程图：

![Authentication Diagram in Soyang Data Security Gateway](https://static.apiseven.com/uploads/2025/01/15/7axfi6rA_so-yang-5.webp)

### 功能二：认证与授权

支持 JWT、OAuth 2.0 等多种认证方式。

网关的认证授权即能够通过 OAuth 协议独立运行，又可以后台低成本接入，免去了登录退出的实现，后台可直接通过使用安全 SDK 直接解析授权 Cookie 或 JWT 获取认证授权数据。同时 JWT 授权的签发采用了更为安全的 RSA 算法，避免了 HS256 单一密钥泄露风险，同时也解决了为每个站点分别维护 HS256 密钥的成本。采用统一的私钥进行签发。

![Authentication and Authorization](https://static.apiseven.com/uploads/2025/01/15/M66Pl3L6_so-yang-6.webp)

### 功能三：人机识别

对多端的访问行为进行人机识别，提供统一的风控对抗能力。无需业务在每个页面中增加风控处理逻辑，网关可以配合终端安全 SDK 实现动态核验。0 成本覆盖所有业务场景。

- 增强业务服务的安全性，以柔性对抗能力包括点选、短信、人脸等核验方式分级挑战不同风险程度的用户，同时兼顾黑灰产的有效拦截与正常用户免误杀。

- 优化系统资源与数据质量，控制核心业务及场景的机器行为流量，避免攻击流量和爬虫流量的占用系统资源影响正常用户体验，避免不必要的资源成本支出，降低运营成本。

**技术实现**：以小程序举例（其他客户端逻辑相似）

![Technical Solution for Mini-Programs](https://static.apiseven.com/uploads/2025/01/15/8mdYNOTB_so-yang-7.webp)

> **技术挑战**
>
> 在对 wx.request 方法进行 Hook 时遇到了方法覆盖后未能生效的问题。通过尝试可以采取先将 wx.reqeust 方法删除再设置的方式进行 Hook。
>
> ![Technical Challenge in ](https://static.apiseven.com/uploads/2025/01/15/hd4qAACf_so-yang-8.webp)

### 功能四：统一数字水印

对接入的后台管理平台页面实现配置化数字水印接入，0 成本接入。

数字水印提供两种接入方式：

1. **网关动态注入**：由网关代理请求时注入到页面尾部实现数字水印加载；

2. **业务系统集成**：业务前端集成并发版。

![Unified Digital Watermark Solutions](https://static.apiseven.com/uploads/2025/01/15/9rG9fygB_so-yang-9.webp)

### 功能五：限速与防护

基于 IP、用户、设备的限速策略，防止恶意攻击和接口滥用。

APISIX 虽然原生提供了频现模块，但是只能根据 IP 等单一维度进行统计进行限速，不能针对特定的场景例如上下文及 NGINX 变量进行统计计数，增强版本的限速模块更能适应真实的业务场景。

计数 Key 可以灵活地根据上下文中的各种变量进行替换使用。

![Rate Limiting](https://static.apiseven.com/uploads/2025/01/15/RJzzGr9J_so-yang-10.webp)

### 功能六：接口管控

利用 OPA 等技术对后台敏感类接口及数据实现访问管理，OPA 的规则动态重载。（附 OPA 官网：[openpolicyagent.org](https://www.openpolicyagent.org/)）

逻辑流程：

![Flowchart of Interface Control](https://static.apiseven.com/uploads/2025/01/15/RZMWXw3v_so-yang-11.webp)

主要逻辑代码样例（涉及主要网关 OPA 插件以及过滤引擎核心逻辑）：

![Code Example](https://static.apiseven.com/uploads/2025/01/15/U7gI7NqS_so-yang-12.webp)

### 功能七：日志监控

记录每次请求的完整上下文信息，提供多维度监控指标，便于问题追踪。

在日志传送中遇到了 kafka 单消息体积不能过大问题，通常设置为 1 Mb，但如果请求大于 1 Mb 完整的上下文信息就会被裁断舍弃，对日志的分析造成影响，于是通过实现分片来保障日志完整性。

简要的逻辑流程：

![Flowchart of Log Monitoring](https://static.apiseven.com/uploads/2025/01/15/1KCytTgZ_so-yang-13.webp)

消息体的 PB 结构：

![PB Structure of Message](https://static.apiseven.com/uploads/2025/01/15/1rpM907i_so-yang-14.webp)

通过对 request body 以及 response body 的分批传输解决上下文体积过大问题：

![Chunked Transfer](https://static.apiseven.com/uploads/2025/01/15/UkkYRUGj_so-yang-15.webp)

### 功能八&九：数据脱敏及加解密

通过插件实现敏感信息的动态脱敏或加密处理，根据配置替换 json 结构中的敏感数据。

![Data Masking](https://static.apiseven.com/uploads/2025/01/15/4Ypu18aO_so-yang-16.webp)

### 功能十：签名校验

支持统一的签名校验机制，涵盖多端（H5、小程序、移动端等）客户端 0 成本接入无需侵入业务逻辑。

采用 Go 实现统一的签名算法，通过 GoMobile 及 Web Assembly 实现跨平台的统一签名，覆盖安卓、iOS、小程序、H5 等多端。

> **技术优势**
>
> H5 通过 hook XMLHTTPRequest 及 fetch 实现对 web 端所有请求的统一签名无需业务配合接入，覆盖所有 axios 类的三方库。

## 四、技术挑战

### 1. 签名模块：体积过大，如何优化？

签名模块中由于采用了 Go 技术栈，导致打包后的体积较大。于是引入 TinyGo 去解决包体积过大问题。但 TinyGo 的 WASM 桥实现在iOS 的 jsCore 引擎无法正常传递 Uint64 类型的对应引用ID，导致 iOS 平台的小程序无法正常加载 Go 方法。

于是重新设计了桥文件引用 ID 传递结构，以及修改了 Golang 的 syscall/js 原生库解决了兼容问题。原生 Go ref 的类型为 uint64，在 iOS 的 jsCore 环境中存在兼容问题。

![Optimize the Large Size of Signature](https://static.apiseven.com/uploads/2025/01/15/m0M7jRTV_so-yang-17.webp)

### 2. 统一数字水印模块：如何防止数字水印元素被删除？

统一数字水印模块中为了防止数字水印元素被删除，采用 **MutationObserver** 技术监听数字水印元素的修改事件，当数字水印元素及 CSS 样式被删除或被改变时，数字水印将重新添加，同时数字水印也会根据浏览器分辨率自适应去显示数字水印的尺寸及分布。

![Watermark Monitoring](https://static.apiseven.com/uploads/2025/01/15/hCCyR5fk_so-yang-18.webp)

## 五、应用实践

### 性能保障

在性能压测中性能损失约为 4%， 在规则命中及处理逻辑上使用了大量的缓存处理，使得性能损失很低，能够有效保障用户访问新氧平台的流畅度和良好的体验感。

![Performance Testing-1](https://static.apiseven.com/uploads/2025/01/15/TmEaDy6W_so-yang-19.webp)

![Performance Testing-2](https://static.apiseven.com/uploads/2025/01/15/tUK7y0dE_soyang-19-1.jpeg)

### 站点接入

认证授权接入的站点比例达 90% 以上，覆盖新氧平台全部核心及重要业务，能够确保用户隐私数据所涉及站点均在网关保护之下，其他非核心业务目前正在逐步推进接入中。

![Authentication Coverage](https://static.apiseven.com/uploads/2025/01/15/dh9Cj4Zo_so-yang-20.webp)

### 反爬防护

在反爬场景中，爬虫的拦截成功率达到 90% 以上，能够有效识别并拦截爬虫对平台数据的爬取，保护用户隐私数据及平台商业数据的安全性，防止相关数据被恶意利用，并且反爬功能稳定运行，能够支持全天候 7✕24 小时防护。

![Traffic Security-1](https://static.apiseven.com/uploads/2025/01/15/J9gNklPf_soyang-21.jpg)

![Traffic Security-2](https://static.apiseven.com/uploads/2025/01/15/ldPde4e5_so-yang-22.webp)

### 日志分析

在日志分析方面，日均处理数据量约 800GB，能够充分满足平台日志分析处理的需求，最大程度上分析流量日志是否存在数据安全隐患，及时发现、及时响应、及时处理。

![Log Analysis](https://static.apiseven.com/uploads/2025/01/15/eUrifrZG_soyang-23.jpg)

## 六、下一代数据安全网关展望

未来，我们计划进一步优化和扩展新氧数据安全网关的功能：

- 智能化流量治理：引入 AI 和机器学习技术，实现基于流量模式的动态优化。

- 更强的安全防护：开发更高级的安全插件，如行为分析、实时威胁检测等。

- 高级事件分析：利用大模型技术实现更加复杂的安全事件分析与自动响应。

- 全面数据加密与脱敏：完成传输层和数据库层的双重保护，以满足更严格的监管和业务需求。

通过持续优化和创新，我们将把数据安全网关打造成新氧技术生态中不可或缺的核心组件，为业务的快速发展和用户体验及的持续提升保驾护航，严格保障用户隐私数据的安全保密。
