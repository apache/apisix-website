---
title: Biweekly Report (Feb 27 - Mar 12)
keywords:
- Apache APISIX
- API Gateway
- Weekly Report
- Contributor
description: The cloud-native API gateway Apache APISIX has added functions such as enabling opentelemetry plugin to support https upstream and adding 'range_id' algorithm for 'request-id' plugin.
tags: [Community]
image: https://static.apiseven.com/uploads/2023/03/17/pf3ERDxP_%E5%8F%8C%E5%91%A8%E6%8A%A5%E5%B0%81%E9%9D%A2-0317.png
---

> From 2.27 to 3.12, 29 contributors submitted 74 commits for Apache APISIX. Thank you for your contributions to Apache APISIX.

<!--truncate-->

## Introduction

Apache APISIX grew up as a community from the first day it was open-sourced, and quickly became the most active open-source API gateway project in the world. These achievements are inseparable from the joint efforts of community partners.

"If you want to go fast, go alone. If you want to go far, go together." The Apache APISIX Community Biweekly Report can help community members better grasp the progress of the Apache APISIX community so that everyone can participate in the Apache APISIX community.

## Contributor Statistics

![Apache APISIX Contributors List](https://static.apiseven.com/uploads/2023/03/14/0rjys38r_%E7%A4%BE%E5%8C%BA%E5%8F%8C%E5%91%A8%E6%8A%A5-%E8%B4%A1%E7%8C%AE%E8%80%85%E6%B5%B7%E6%8A%A5-05%E6%9C%9F.png)

![Apache APISIX New Contributors](https://static.apiseven.com/uploads/2023/03/14/WZpcYrG7_%E7%A4%BE%E5%8C%BA%E5%8F%8C%E5%91%A8%E6%8A%A5-%E6%96%B0%E6%99%8B%E6%B5%B7%E6%8A%A5-05%E6%9C%9F.png)

## Highlights of Recent Features

### Apache APISIX

- [Support clickhouse-logger plugin log option of request/response body](https://github.com/apache/apisix/pull/8722) (Contributor: [pixeldin](https://github.com/pixeldin))

- [Support reserved environment variable "APISIX_DEPLOYMENT_ETCD_HOST"](https://github.com/apache/apisix/pull/8898) (Contributor: [An-DJ](https://github.com/An-DJ))

- [Add degraphql plugin](https://github.com/apache/apisix/pull/8959) (Contributor: [spacewander](https://github.com/spacewander))

### Apache APISIX Ingress Controller

- Add IngressClass support for custom resources of APISIX Ingress, allowing multiple sets of Ingress controllers to be deployed simultaneously in the same cluster and use custom resources.

Contributors：[AlinsRan](https://github.com/AlinsRan)，[lingsamuel](https://github.com/lingsamuel)，[Donghui0](https://github.com/Donghui0)，related PR：

- [feat: make multiple controllers handle different ApisixRoute CRDs](https://github.com/apache/apisix-ingress-controller/pull/593)

- [feat: ApisixUpstream support IngressClass](https://github.com/apache/apisix-ingress-controller/pull/1674)

- [feat: ApisixTls suuport ingressClass](https://github.com/apache/apisix-ingress-controller/pull/1714)

- [feat: support ingressClass for ApisixPluginConfig](https://github.com/apache/apisix-ingress-controller/pull/1716)

- [feat: ApisixConsumer support ingressClass](https://github.com/apache/apisix-ingress-controller/pull/1717)

- [feat: support ingressClass for ApisixGlobalRule](https://github.com/apache/apisix-ingress-controller/pull/1718)

- [feat: ApisixClusterConfig support IngressClass](https://github.com/apache/apisix-ingress-controller/pull/1720)

## Recent Blog Recommendations

- [Make your security policy auditable](https://apisix.apache.org/blog/2023/03/02/security-policy-auditable/)

  This blog shows how you can leverage OPA and Apache APISIX to move your authentication and authorization logic from the code to the infrastructure. The former allows you to audit your security policies, the latter coherence among all your upstream across all tech stacks.

- [The right feature at the right place](https://apisix.apache.org/blog/2023/01/18/consul-with-apisix/)

  This blog takes the example of per-user rate limiting to show how one can implement it in a library and an infrastructure component. Then, the author generalized this example and gave a couple of guidelines.

- [How to Integrate API Gateway and Consul? Not Consul K/V](https://apisix.apache.org/blog/2023/01/18/consul-with-apisix/)

  Apache APISIX supports the Consul service discovery registry. This article will walk you through the process of implementing service discovery and service registry in Apache APISIX.

A wealth of documentation tutorials and experience has been accumulated on the Apache APISIX official website and GitHub. If you encounter problems, you can look into the documentation, search keywords in the issues, or participate in the discussion on the issues, proposing your own ideas and practical experience.
