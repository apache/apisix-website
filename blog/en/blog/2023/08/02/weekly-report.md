---
title: "Biweekly Report (July 17 - July 30)"
keywords: 
- Apache APISIX
- API Gateway
- Weekly Report
- Contributor
description: The Apache APISIX Community Biweekly Report can help community members better grasp the progress of the Apache APISIX community so that everyone can participate in the Apache APISIX community.
tags: [Community]
image: https://static.apiseven.com/uploads/2023/07/31/zId2YcIt_%E8%8B%B1%E6%96%87%E5%A4%B4%E5%9B%BE.png
---

> We have recently fixed or improved some features of Apache APISIX, including fixing `lua-resty-jwt` security issues, disallowing the simultaneous configuration of allowlist and denylist in ua-restriction, fixing the configuration of the `google-cloud-logging` plugin, and allowing the sending of headers upstream returned by OPA server. For more details, please read this biweekly report.

<!--truncate-->

## Introduction

Apache APISIX grew up as a community from the first day it was open-sourced, and quickly became the most active open-source API gateway project in the world. These achievements are inseparable from the joint efforts of community partners.

From 7.17 to 7.30, 16 contributors submitted 38 commits for Apache APISIX. Thank you for your contributions to Apache APISIX.

We have recently fixed and improved some features, and the summary of the updates is as follows:

1. Upgraded `api7-lua-resty-jwt` to version 0.2.5.

2. Allowlist and denylist cannot be enabled at the same time.

3. Fixed the configuration of the `google-cloud-logging` plugin.

4. Allowed sending headers upstream returned by OPA server.

"If you want to go fast, go alone. If you want to go far, go together." The Apache APISIX Community Biweekly Report can help community members better grasp the progress of the Apache APISIX community so that everyone can participate in the Apache APISIX community.

## Contributor Statistics

![Apache APISIX Contributors List](https://static.apiseven.com/uploads/2023/07/31/RIIPKarO_%E6%89%80%E6%9C%89%E8%B4%A1%E7%8C%AE%E8%80%85.png)

![Apache APISIX New Contributors](https://static.apiseven.com/uploads/2023/07/31/kRFlqxZk_%E6%96%B0%E6%99%8B%E8%B4%A1%E7%8C%AE%E8%80%85.png)

## Highlights of Recent Features

### Apache APISIX

- [Upgraded `api7-lua-resty-jwt` to version 0.2.5](https://github.com/apache/apisix/pull/9837) (Contributor: [Sn0rt](https://github.com/Sn0rt))

- [Allowlist and denylist cannot be enabled at the same time](https://github.com/apache/apisix/pull/9841) (Contributor: [jiangfucheng](https://github.com/jiangfucheng))

- [Fixed the configuration of the `google-cloud-logging` plugin](https://github.com/apache/apisix/pull/9622) (Contributor: [kindomLee](https://github.com/kindomLee))

- [Allowed sending headers upstream returned by OPA server](https://github.com/apache/apisix/pull/9710) (Contributor: [Revolyssup](https://github.com/Revolyssup))

## Recent Blog Recommendations

- [Release Apache APISIX 3.4.1](https://apisix.apache.org/blog/2023/07/21/release-apache-apisix-3.4.1/)

  We are pleased to present Apache APISIX 3.4.1 with a security patch for JWT.

- [Accelerating API Gateway Excellence: Apache APISIX Community Meetup in Malaysia](https://apisix.apache.org/blog/2023/07/11/2023-apisix-meetup-malaysia/)
  
  Kuala Lumpur, the capital of Malaysia, witnessed the success of the 2023 APISIX open-source Community Meetup on July 4th.

- [Release Apache APISIX 3.4.0](https://apisix.apache.org/blog/2023/06/30/release-apache-apisix-3.4.0/)

  This release provides a new plugin loki-logger to forward logs to Grafana Loki, and allows for mTLS connection on the route level. In addition, the release also includes many other updates to continuously enhance the user experience of APISIX.

- [Connecting IoT Devices to the Cloud with APISIX MQTT Proxy](https://apisix.apache.org/blog/2023/06/30/apisix-mqtt-proxy/)

  APISIX's support for stream routes and, in extension, the MQTT protocol is often overlooked. Let's change this by looking at an end-to-end example of how APISIX can act as an MQTT proxy.

A wealth of documentation tutorials and experience has been accumulated on the Apache APISIX official website and GitHub. If you encounter problems, you can look into the documentation, search keywords in the issues, or participate in the discussion on the issues, proposing your own ideas and practical experience.
