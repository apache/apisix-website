---
title: Biweekly Report (Mar 13 - Mar 26)
keywords:
- Apache APISIX
- API Gateway
- Weekly Report
- Contributor
description: The cloud-native API gateway Apache APISIX has added functions such as supporting variables when rewriting the header in the proxy rewrite plugin and updating the default HTTP router from `radixtree_uri` to `radixtree_host_uri`.
tags: [Community]
image: https://static.apiseven.com/uploads/2023/03/30/UzHMz9yZ_%E9%A3%9E%E4%B9%A620230301-134628.png
---

> From 3.13 to 3.26, 25 contributors submitted 54 commits for Apache APISIX. Thank you for your contributions to Apache APISIX.

<!--truncate-->

## Introduction

Apache APISIX grew up as a community from the first day it was open-sourced, and quickly became the most active open-source API gateway project in the world. These achievements are inseparable from the joint efforts of community partners.

"If you want to go fast, go alone. If you want to go far, go together." The Apache APISIX Community Biweekly Report can help community members better grasp the progress of the Apache APISIX community so that everyone can participate in the Apache APISIX community.

We have also sorted out some issues for newcomers to the community to participate in! If you are interested, don't miss it!

## Contributor Statistics

![Apache APISIX Contributors List](https://static.apiseven.com/uploads/2023/03/28/csedWKi7_%E7%A4%BE%E5%8C%BA%E5%8F%8C%E5%91%A8%E6%8A%A5-%E8%B4%A1%E7%8C%AE%E8%80%85%E6%B5%B7%E6%8A%A5-06%E6%9C%9F.png)

![Apache APISIX New Contributors](https://static.apiseven.com/uploads/2023/03/28/cyWb9xTh_%E7%A4%BE%E5%8C%BA%E5%8F%8C%E5%91%A8%E6%8A%A5-%E6%96%B0%E6%99%8B%E6%B5%B7%E6%8A%A5-06%E5%91%A8.png)

## Good First Issues

### Issue #9182

**Link:** [https://github.com/apache/apisix/issues/9182](https://github.com/apache/apisix/issues/9182)

**Description:** Correct the URI in `expose-api` tutorial.

### Issue #1740

**Link:** [https://github.com/apache/apisix-ingress-controller/issues/1740](https://github.com/apache/apisix-ingress-controller/issues/1740)

**Description:** Add a spec for a discovery related fields to ApisixUpstream reference.

## Highlights of Recent Features

### Apache APISIX

- [support variable when rewrite header in proxy rewrite plugin](https://github.com/apache/apisix/pull/9112) (Contributor: [monkeyDluffy6017](https://github.com/monkeyDluffy6017))

- [Update the default HTTP router from `radixtree_uri` to `radixtree_host_uri`.](https://github.com/apache/apisix/pull/9047) (Contributor: [monkeyDluffy6017](https://github.com/monkeyDluffy6017))

## Recent Blog Recommendations

- [Release Apache APISIX 3.2.0](https://apisix.apache.org/blog/2023/03/10/release-apache-apisix-3.2.0/)

  As the first LTS version since the 3.0 version, APISIX 3.2.0 is officially released! This release is a significant milestone for the 3.x era to replace the 2.x era.

- [Make your security policy auditable](https://apisix.apache.org/blog/2023/03/02/security-policy-auditable/)

  This blog shows how you can leverage OPA and Apache APISIX to move your authentication and authorization logic from the code to the infrastructure. The former allows you to audit your security policies, the latter coherence among all your upstream across all tech stacks.

- [The right feature at the right place](https://apisix.apache.org/blog/2023/01/18/consul-with-apisix/)

  This blog takes the example of per-user rate limiting to show how one can implement it in a library and an infrastructure component. Then, the author generalized this example and gave a couple of guidelines.

A wealth of documentation tutorials and experience has been accumulated on the Apache APISIX official website and GitHub. If you encounter problems, you can look into the documentation, search keywords in the issues, or participate in the discussion on the issues, proposing your own ideas and practical experience.
