---
title: "Apache APISIX 贡献者专访 | 普华永道高级安全顾问王鹏诚"
slug: 2021/01/11/interview-apache-apisix-contributor-wang-pengcheng-senior-security-advisor-of-pwc-south-china-data-security-and-privacy-protection-team
author: "温铭"
authorURL: "https://github.com/moonming"
authorImageURL: "https://avatars.githubusercontent.com/u/26448043?v=4"
keywords:
- API 网关
- APISIX
- 普华永道
- 漏洞
description: 普华永道报告了 API 网关 Apache APISIX 的 Admin API 默认 Token 漏洞，为了感谢鹏诚对 Apache APISIX 社区做的贡献，我们也特意对鹏诚进行了专访。
tags: [Vulnerabilities]
image: https://static.apiseven.com/2022/blog/0818/cve/CVE-2020-13945.png
---

> 近日，来自普华永道华南数据安全及隐私保护团队的高级安全顾问王鹏诚向国家信息安全漏洞共享平台（CNVD）和 Apache 软件基金会，报告了 Apache APISIX 的第一个 CVE：Apache APISIX Admin API 默认 Token 漏洞（CVE-2020-13945）。为了感谢鹏诚对 Apache APISIX 社区做的贡献，我们也特意对鹏诚进行了专访。

<!--truncate-->

## 贡献者简介

王鹏诚，普华永道华南数据安全及隐私保护团队担任高级安全顾问，为多家龙头企业提供数据安全与隐私合规咨询、红蓝对抗、安全运营等技术服务，目前拥有 cisp/cisp-pte/cisp-dsg/CEH/iso27701/ccsk 等多项安全认证。

## 专访正文

**小编**：恭喜鹏诚！也感谢鹏诚为 Apache APISIX 社区做的贡献！能简单介绍下您和您的团队嘛？

**鹏诚**：大家好，我是王鹏诚，来自普华永道广州数据安全及隐私保护团队，为普华永道的客户提供数据安全和隐私保护的专业咨询服务。做为一名安全咨询顾问和开源技术爱好者，帮助团队拿到第一枚 CVE 同时也为 Apache APISIX 做了一点贡献，还是蛮激动的。

**小编**：普华永道在大部分人的印象中是会计师事务所，没想到还提供专业的安全服务。请问你们是如何了解到 Apache APISIX 的呢？

**鹏诚**：普华永道不仅提供传统的财务审计服务，现在还提供安全运营、企业安全咨询、数据安全与合规、隐私咨询、车联网、物联网等一系列的安全测试与隐私合规咨询服务。2020 年中，我们在对几个客户做渗透测试的时候，发现他们都使用了 Apache APISIX 这个开源产品作为 API 网关。虽然这对于我们而言是一个新的产品，但是已经被这么多优质客户使用，我们决定对 Apache APISIX 进行安全方面的研究，看看其是否可靠，是否有安全漏洞。然后我们发现其存在固定 token 的问题，该问题将会导致恶意攻击者可直接控制 API 网关而影响到正常业务开展。**但是在 Apache APISIX 的默认配置下，并不会产生这个安全问题，只有在用户修改了默认的控制平面的 IP 限制而没有修改默认 token，才会把自己暴露在风险之中。**

**小编**：我们团队也有来自安全背景的同事，我们了解安全对于一个产品而言是多么重要。请问在你们的安全测试中，是否还发现了 Apache APISIX 的其他问题呢？

**鹏诚**：暂时还没有。之前的测试只是站在黑盒角度并且比较浅的一次安全测试，后续会尝试白盒审计相关代码，从安全的角度看看是否会有其他的漏洞。如果发现的话，也会第一时间向 Apache 软件基金会的安全部门报告，来为开源社区贡献自己的力量。

**小编**：非常感谢鹏诚和普华永道广州数据安全及隐私保护团队的同事！对于开源项目而言，不仅代码和文档是贡献，报告安全问题也一样是非常重要的贡献！请问后续有什么相应的计划吗？

**鹏诚**：我们团队后面也会积极参与到 Apache APISIX 的社区中来，帮助社区预防和尽早发现安全隐患，让大家用上安全可靠的 API 网关。

## Apache APISIX 的第一个 CVE

Apache APISIX 的第一个 CVE：Apache APISIX Admin API 默认 Token 漏洞（CVE-2020-13945）。[安全漏洞详情](https://nvd.nist.gov/vuln/detail/CVE-2020-13945)

![2021-01-11-1](https://static.apiseven.com/202108/1639461621848-2d567a42-7cab-44ab-8afc-a9c80c8a3ab8.png)
