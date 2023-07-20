---
title: "Biweekly Report (July 03 - July 16)"
keywords: 
- Apache APISIX
- API Gateway
- Weekly Report
- Contributor
description: The Apache APISIX Community Biweekly Report can help community members better grasp the progress of the Apache APISIX community so that everyone can participate in the Apache APISIX community.
tags: [Community]
image: https://static.apiseven.com/uploads/2023/07/17/shxmVhkq_%E8%8B%B1%E6%96%87%E5%A4%B4%E5%9B%BE.png
---

> We have recently fixed and improved some features of Apache APISIX, including updates to the mock plugin which now supports adding headers, resolution of an error in the limit-count plugin when using the http variable in stream mode, fixing a cache key conflict issue in the etcd watch implementation, and the addition of a new feature to the admin API that allows forceful deletion of resources using the "force" parameter. Meanwhile, We are pleased to present Apache APISIX 3.4.0 with exciting new features and performance improvements. For more details, please read this biweekly report.

<!--truncate-->

## Introduction

Apache APISIX grew up as a community from the first day it was open-sourced, and quickly became the most active open-source API gateway project in the world. These achievements are inseparable from the joint efforts of community partners.

From 7.03 to 7.16, 21 contributors submitted 45 commits for Apache APISIX. Thank you for your contributions to Apache APISIX.

We have recently fixed and improved some features, and the summary of the updates is as follows:

1. The mock plugin now supports adding headers.

2. Fixed an issue in the limit-count plugin where using the http variable in stream mode caused errors.

3. Fixed a cache key conflict issue in the etcd watch implementation.

4. Added a new feature to the admin API that allows forceful deletion of resources using the "force" parameter.

"If you want to go fast, go alone. If you want to go far, go together." The Apache APISIX Community Biweekly Report can help community members better grasp the progress of the Apache APISIX community so that everyone can participate in the Apache APISIX community.

## Contributor Statistics

![Apache APISIX Contributors List](https://static.apiseven.com/uploads/2023/07/19/a5J3z3cg_%E6%89%80%E6%9C%89%E8%B4%A1%E7%8C%AE%E8%80%85.png)

![Apache APISIX New Contributors](https://static.apiseven.com/uploads/2023/07/19/y2VSsYjg_contributor0719.png)

## Highlights of Recent Features

### Apache APISIX

- [Mock plugin now supports adding headers](https://github.com/apache/apisix/pull/9720) (Contributor: [shreemaan-abhishek](https://github.com/shreemaan-abhishek))

- [Fixed the issue of using the http variable in stream mode causing errors in the limit-count plugin](https://github.com/apache/apisix/pull/9816) (Contributor: [Sn0rt](https://github.com/Sn0rt))

- [Fixed the conflict issue of update_count in etcd watch implementation](https://github.com/apache/apisix/pull/9811) (Contributor: [kingluo](https://github.com/kingluo))

- [Added the ability to force delete resources through the admin API](https://github.com/apache/apisix/pull/9810) (Contributor: [lingsamuel](https://github.com/lingsamuel))

## Recent Blog Recommendations

- [Accelerating API Gateway Excellence: Apache APISIX Community Meetup in Malaysia](https://apisix.apache.org/blog/2023/07/11/2023-apisix-meetup-malaysia/)
  
  Kuala Lumpur, the capital of Malaysia, witnessed the success of the 2023 APISIX open-source Community Meetup on July 4th.

- [Release Apache APISIX 3.4.0](https://apisix.apache.org/blog/2023/06/30/release-apache-apisix-3.4.0/)

  This release provides a new plugin loki-logger to forward logs to Grafana Loki, and allows for mTLS connection on the route level. In addition, the release also includes many other updates to continuously enhance the user experience of APISIX.

- [Connecting IoT Devices to the Cloud with APISIX MQTT Proxy](https://apisix.apache.org/blog/2023/06/30/apisix-mqtt-proxy/)

  APISIX's support for stream routes and, in extension, the MQTT protocol is often overlooked. Let's change this by looking at an end-to-end example of how APISIX can act as an MQTT proxy.

A wealth of documentation tutorials and experience has been accumulated on the Apache APISIX official website and GitHub. If you encounter problems, you can look into the documentation, search keywords in the issues, or participate in the discussion on the issues, proposing your own ideas and practical experience.
