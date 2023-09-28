---
title: "Biweekly Report (August 28 - September 10)"
keywords: 
- Apache APISIX
- API Gateway
- Weekly Report
- Contributor
description: The Apache APISIX Community Biweekly Report can help community members better grasp the progress of the Apache APISIX community so that everyone can participate in the Apache APISIX community.
tags: [Community]
image: https://static.apiseven.com/uploads/2023/09/11/HoTbyoDz_%E7%A4%BE%E5%8C%BA%E5%8F%8C%E5%91%A8%E6%8A%A5-%E5%85%AC%E4%BC%97%E5%8F%B7%E5%A4%B4%E5%9B%BE-%E8%8B%B1%E6%96%87-0911.png
---

> We have recently made fixes and improvements to certain features of Apache APISIX and APISIX Ingress Controller. These include providing native JSON data structure input support for the wasm plugin, adding UNIX socket listening support for the `chaitin-waf` plugin, and introducing the ability to remove the etcd dependency required by APISIX within the APISIX Ingress to reduce architectural complexity. For more details, please refer to the biweekly report.

<!--truncate-->

## Introduction

Apache APISIX grew up as a community from the first day it was open-sourced, and quickly became the most active open-source API gateway project in the world. These achievements are inseparable from the joint efforts of community partners.

From 8.28 to 9.10, 16 contributors submitted 47 commits for Apache APISIX. Thank you for your contributions to Apache APISIX.

We have recently fixed and improved some features, and the summary of the updates is as follows:

1. Provide native JSON data structure input support for the wasm plugin

2. Add UNIX socket listening support for the `chaitin-waf` plugin

3. Introduce the ability to remove the etcd dependency required by APISIX within the APISIX Ingress to reduce architectural complexity (Experimental Feature)

"If you want to go fast, go alone. If you want to go far, go together." The Apache APISIX Community Biweekly Report can help community members better grasp the progress of the Apache APISIX community so that everyone can participate in the Apache APISIX community.

## Contributor Statistics

![Apache APISIX Contributors List](https://static.apiseven.com/uploads/2023/09/26/afJdz8VA_Group%204.png)

![Apache APISIX New Contributors](https://static.apiseven.com/uploads/2023/09/26/KLSzp6dh_0910.png)

## Highlights of Recent Features

### Apache APISIX

- [Provides native JSON data structure input support for the wasm plugin](https://github.com/apache/apisix/pull/10072) (Contributor: [Sn0rt](https://github.com/Sn0rt))

- [Add UNIX socket listening support for the `chaitin-waf` plugin](https://github.com/apache/apisix/pull/10161) (Contributor: [zclaiqcc](https://github.com/zclaiqcc))

### APISIX Ingress Controller

- [Introduce the ability to remove the etcd dependency required by APISIX within the APISIX Ingress to reduce architectural complexity](https://github.com/apache/apisix-ingress-controller/pull/1803) (Contributor: [AlinsRan](https://github.com/AlinsRan))

## Recent Blog Recommendations

- [Coraza: Elevating APISIX with Cutting-Edge WAF Features](https://apisix.apache.org/blog/2023/09/08/APISIX-integrates-with-Coraza/)
  
  The integration of APISIX and Coraza provides reliable security protection and ensures the integrity and reliability of API services.
  
- [Release Apache APISIX 3.5.0](https://apisix.apache.org/blog/2023/09/01/release-apache-apisix-3.5.0/)

  We are pleased to present Apache APISIX 3.5.0 with exciting new features and improvements to user experiences.

A wealth of documentation tutorials and experience has been accumulated on the Apache APISIX official website and GitHub. If you encounter problems, you can look into the documentation, search keywords in the issues, or participate in the discussion on the issues, proposing your own ideas and practical experience.
