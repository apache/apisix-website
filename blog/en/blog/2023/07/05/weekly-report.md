---
title: "Biweekly Report (June 19 - July 02)"
keywords: 
- Apache APISIX
- API Gateway
- Weekly Report
- Contributor
description: The Apache APISIX Community Biweekly Report can help community members better grasp the progress of the Apache APISIX community so that everyone can participate in the Apache APISIX community.
tags: [Community]
image: https://static.apiseven.com/uploads/2023/07/03/o1PFlwn0_%E7%A4%BE%E5%8C%BA%E5%8F%8C%E5%91%A8%E6%8A%A5-%E5%85%AC%E4%BC%97%E5%8F%B7%E5%A4%B4%E5%9B%BE-%E8%8B%B1%E6%96%87.png
---

> We have recently fixed and improved some features of Apache APISIX, including optimizing the use of Prometheus, fixing the body-transformer and log-rotate plugins, and adding an annotation to allow rewriting of the response header for Apache APISIX Ingress Controller. Meanwhile, We are pleased to present Apache APISIX 3.4.0 with exciting new features and performance improvements. For more details, please read this biweekly report.

<!--truncate-->

## Introduction

Apache APISIX grew up as a community from the first day it was open-sourced, and quickly became the most active open-source API gateway project in the world. These achievements are inseparable from the joint efforts of community partners.

From 6.19 to 7.02, 22 contributors submitted 35 commits for Apache APISIX. Thank you for your contributions to Apache APISIX.

We have recently fixed and improved some features, and the summary of the updates is as follows:

1. APISIX now allows customizing Prometheus default bucket.

2. Fixed the problem that body-transformer plugin cannot convert empty tables properly.

3. Fixed the issue that max_kept configuration of the log-rotate plugin does not work when using a custom name.

4. With recently added annotation, APISIX Ingress Controller now allows rewriting of response headers.

"If you want to go fast, go alone. If you want to go far, go together." The Apache APISIX Community Biweekly Report can help community members better grasp the progress of the Apache APISIX community so that everyone can participate in the Apache APISIX community.

## Contributor Statistics

![Apache APISIX Contributors List](https://static.apiseven.com/uploads/2023/07/21/V68ySc8U_0619-0702.png)

![Apache APISIX New Contributors](https://static.apiseven.com/uploads/2023/07/07/M3P3D5AP_%E6%96%B0%E6%99%8B%E8%B4%A1%E7%8C%AE%E8%80%85%E6%B5%B7%E6%8A%A5.png)

## Highlights of Recent Features

### Apache APISIX

- [APISIX allows customizing prometheus default bucket](https://github.com/apache/apisix/pull/9673) (Contributor: [jiangfucheng](https://github.com/jiangfucheng))

- [Fix the problem that body-transformer plugin cannot convert empty tables properly](https://github.com/apache/apisix/pull/9669) (Contributor: [kingluo](https://github.com/kingluo))

- [Fix the issue that max_kept configuration of the log-rotate plugin does not work when using a custom name](https://github.com/apache/apisix/pull/9749) (Contributor: [monkeyDluffy6017](https://github.com/monkeyDluffy6017))

### Apache APISIX Ingress Controller

- [APISIX Ingress Controller adds annotation to allow rewriting of response headers](https://github.com/apache/apisix-ingress-controller/pull/1861) (Contributor: [Revolyssup](https://github.com/Revolyssup))

## Recent Blog Recommendations

- [Release Apache APISIX 3.4.0](https://apisix.apache.org/blog/2023/06/30/release-apache-apisix-3.4.0/)

  This release provides a new plugin loki-logger to forward logs to Grafana Loki, and allows for mTLS connection on the route level. In addition, the release also includes many other updates to continuously enhance the user experience of APISIX.

- [Connecting IoT Devices to the Cloud with APISIX MQTT Proxy](https://apisix.apache.org/blog/2023/06/30/apisix-mqtt-proxy/)

  APISIX's support for stream routes and, in extension, the MQTT protocol is often overlooked. Let's change this by looking at an end-to-end example of how APISIX can act as an MQTT proxy.

A wealth of documentation tutorials and experience has been accumulated on the Apache APISIX official website and GitHub. If you encounter problems, you can look into the documentation, search keywords in the issues, or participate in the discussion on the issues, proposing your own ideas and practical experience.
