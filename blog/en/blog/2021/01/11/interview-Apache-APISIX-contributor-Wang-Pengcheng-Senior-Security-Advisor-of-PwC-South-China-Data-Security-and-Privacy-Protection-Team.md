---
title: Apache APISIX Contributor Interview | Pengcheng Wang from PricewaterhouseCoopers 
slug: 2021/01/11/interview-apache-apisix-contributor-wang-pengcheng-senior-security-advisor-of-pwc-south-china-data-security-and-privacy-protection-team
author: Ming Wen
authorURL: "https://github.com/moonming"
authorImageURL: "https://avatars.githubusercontent.com/u/26448043?v=4"
keywords:
- API Gateway
- APISIX
- Apache APISIX
- PricewaterhouseCoopers 
- CVE
description: PricewaterhouseCoopers reported a vulnerability in the Admin API default token of the API gateway Apache APISIX.
tags: [Vulnerabilities]
image: https://static.apiseven.com/2022/blog/0818/cve/CVE-2020-13945.png
---

> Recently, Pengcheng Wang, a senior security consultant from PwC's South China Data Security and Privacy team, reported the first CVE for Apache APISIX to the National Information Security Vulnerability Sharing Platform (CNVD) and the Apache Software Foundation: Apache APISIX Admin API Default Token Vulnerability (CVE-2020- 13945). To thank Pengcheng for his contribution to the Apache APISIX community, we also had an interview with Pengcheng.

<!--truncate-->

## Contributor Profile

Pengcheng Wang is a senior security consultant in PwC South China data security and privacy team. He provides data security and privacy compliance consulting, red-blue confrontation, security operations and other technical services for many leading companies, and currently holds many security certifications such as cisp/cisp-pte/cisp-dsg/CEH/iso27701/ccsk.

## Interview Text

**Editor**: Congratulations to Pengcheng! And thank you for your contribution to the Apache APISIX community! Can you tell us a little bit about yourself and your team?

**Pengcheng**: I'm Pengcheng Wang, from the PwC Guangzhou Data Security and Privacy team, providing data security and privacy consulting services to PwC clients. As a security consultant and open source technology enthusiast, I am quite excited to help the team get the first CVE and also make a little contribution to Apache APISIX.

**Editor**: PricewaterhouseCoopers is an accounting firm in most people's mind, but I didn't expect that it also provides professional security services. How did you learn about Apache APISIX?

**Pengcheng**: PwC not only provides traditional financial audit services, but now also provides a series of security testing and privacy compliance consulting services such as security operations, enterprise security consulting, data security and compliance, privacy consulting, Internet of Vehicles, Internet of Things, etc. In the middle of 2020, when we did penetration testing on several clients, we found that they all used Apache APISIX, an open source product as an API gateway. Although this was a new product for us, it was already being used by so many quality customers that we decided to look into the security aspects of Apache APISIX to see if it was reliable and if there were any security vulnerabilities. Then we discovered that there was a fixed token issue that would allow a malicious attacker to take direct control of the API gateway and affect normal business operations. **But in the default configuration of Apache APISIX, this security issue does not arise, and it is only when users change the default control plane IP restrictions without changing the default token that they expose themselves to risk.**

**Editor**: Our team also has colleagues from a security background, and we understand how important security is for a product. Are there any other issues with Apache APISIX that you have found in your security testing?

**Pengcheng**: Not yet. The previous test was just a shallow security test from a black-box perspective, and we will try to white-box audit the code to see if there are other vulnerabilities from a security perspective. If found, will also be the first time to report to the Apache Software Foundation security department, to contribute to the open source community.

**Editor**: Thank you very much to Pengcheng and PwC Guangzhou data security and privacy protection team colleagues! For open source projects, not only is code and documentation a contribution, but reporting on security issues is also a very important contribution! Do you have any plans for follow-up?

**Pengcheng**: Our team will actively participate in the Apache APISIX community to help the community prevent and discover security risks as early as possible, so that everyone can use a safe and secure API gateway.

## First CVE for Apache APISIX

The first CVE for Apache APISIX: Apache APISIX Admin API Default Token Vulnerability (CVE-2020-13945), see [Security Vulnerability Details](https://nvd.nist.gov/vuln/detail/CVE-2020-13945) for detail.

![2021-01-11-1](https://static.apiseven.com/202108/1639461621848-2d567a42-7cab-44ab-8afc-a9c80c8a3ab8.png)
