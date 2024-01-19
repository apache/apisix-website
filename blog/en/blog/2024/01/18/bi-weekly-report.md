---
title: "Biweekly Report (January 01 - January 14)"
keywords: ["Apache APISIX", "API Gateway", "Weekly Report", "Contributor"]
description: Our bi-weekly Apache APISIX community report is your window into the project's weekly developments. It is a tool to facilitate your seamless integration into the Apache APISIX community, ensuring that you stay well-informed and actively involved.
tags: [Community]
image: https://static.apiseven.com/uploads/2024/01/18/3j9gLLve_Cover_ENG.png
---

> We have recently made some additions and improvements to specific features within Apache APISIX. The updates include the newly added include_req_body option for some log-related plugins, supporting one-click compilation and installation of apisix and apisix-runtime from source code, the `response-rewrite` plugin supporting Brotli compression when using the filters.regex option, and supporting the uri_param_ variable when using the radixtree_uri_with_parameter routing engine. For additional information, please consult the bi-weekly report.
<!--truncate-->
## Introduction

From its inception, the Apache APISIX project has embraced the ethos of open-source community collaboration, propelling it into the ranks of the most active global open-source API gateway projects. The proverbial wisdom of 'Many hands make light work' rings true in our way, made possible by the collective dedication of our community.

From 01.01 to 01.14, a total of 20 contributors made 32 commits to Apache APISIX. We sincerely appreciate your contributions to Apache APISIX.

We have recently added and enhanced several plugins, and here is a summary of the updates:

1. Newly added include_req_body option for some log-related plugins

2. Support one-click compilation and installation of apisix and apisix-runtime from source code

3. The `response-rewrite` plugin supports Brotli compression when using the filters.regex option

4. Support the uri_param_ variable when using the radixtree_uri_with_parameter routing engine

Our bi-weekly Apache APISIX community report is your window into the project's weekly developments. It is a tool to facilitate your seamless integration into the Apache APISIX community, ensuring that you stay well-informed and actively involved.

## Contributor Statistics

![Apache APISIX Contributors List](https://static.apiseven.com/uploads/2024/01/18/2DEKfgEm_List_Cons.png)

![Apache APISIX New Contributors](https://static.apiseven.com/uploads/2024/01/18/XLn0OLo4_List_New.png)

## Highlight of Recent Feature

- [Newly added include_req_body option for some log-related plugins](https://github.com/apache/apisix/pull/10738) (Contributor: [smileby](https://github.com/smileby))

- [Support one-click compilation and installation of apisix and apisix-runtime from source code](https://github.com/apache/apisix/pull/10729) (Contributor: [Vacant2333](https://github.com/Vacant2333))

- [The `response-rewrite` plugin supports Brotli compression when using the filters.regex option](https://github.com/apache/apisix/pull/10733) (Contributor: [yuweizzz](https://github.com/yuweizzz))

- [Support the uri_param_ variable when using the radixtree_uri_with_parameter routing engine](https://github.com/apache/apisix/pull/10645) (Contributor: [boekkooi-lengoo](https://github.com/boekkooi-lengoo))

## Recent Blog Recommendations

- [Release Apache APISIX 3.8.0](https://apisix.apache.org/blog/2024/01/15/release-apache-apisix-3.8.0/)

  We are glad to present Apache APISIX 3.8.0 with exciting new features, bug fixes, and other improvements to user experiences.

- [Enhancing Security and Performance: DataVisor's Dynamic Use of APISIX](https://apisix.apache.org/blog/2023/12/19/datavisor-uses-apisix/)

  Author: Xiaobiao Zhao, DataVisor Senior Architect, Apache Kvrocks Committer, OpenResty and Apache APISIX Contributor. This article is based on a presentation given by Xiaobiao Zhao at the APISIX Shanghai Meetup in November 2023.

- [Apache APISIX plugin priority, a leaky abstraction?](https://apisix.apache.org/blog/2023/12/14/apisix-plugins-priority-leaky-abstraction/)

  Apache APISIX builds upon the OpenResty reverse-proxy to offer a plugin-based architecture. The main benefit of such an architecture is that it brings structure to the configuration of routes. It's a help at scale, when managing hundreds or thousands of routes.

A wealth of documentation tutorials and experience has been accumulated on the Apache APISIX official website and GitHub. If you encounter problems, you can look into the documentation, search keywords in the issues, or participate in the discussion on the issues, proposing your own ideas and practical experience.
