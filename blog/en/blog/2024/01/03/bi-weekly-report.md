---
title: "Biweekly Report (December 18 - December 31)"
keywords: ["Apache APISIX", "API Gateway", "Weekly Report", "Contributor"]
description: Our bi-weekly Apache APISIX community report is your window into the project's weekly developments. It is a tool to facilitate your seamless integration into the Apache APISIX community, ensuring that you stay well-informed and actively involved.
tags: [Community]
image: https://static.apiseven.com/uploads/2024/01/03/7NwLI3ky_ENG.png
---

> We have recently made some additions and improvements to specific features within Apache APISIX. The updates include the `limit-count` plugin configuration supporting environment variables, the `response-rewrite` plugin supporting gzip when using the filters.regex option, and upgrading OpenSSL 1.1.1 to OpenSSL 3.0 version. For additional information, please consult the bi-weekly report.
<!--truncate-->
## Introduction

From its inception, the Apache APISIX project has embraced the ethos of open-source community collaboration, propelling it into the ranks of the most active global open-source API gateway projects. The proverbial wisdom of 'Many hands make light work' rings true in our way, made possible by the collective dedication of our community.

From 12.18 to 12.31, a total of 18 contributors made 32 commits to Apache APISIX. We sincerely appreciate your contributions to Apache APISIX.

We have recently added and enhanced several plugins, and here is a summary of the updates:

1. The `limit-count` plugin configuration supports environment variables

2. The `response-rewrite` plugin supports gzip when using the filters.regex option

3. Upgrade OpenSSL 1.1.1 to OpenSSL 3.0 version

Our bi-weekly Apache APISIX community report is your window into the project's weekly developments. It is a tool to facilitate your seamless integration into the Apache APISIX community, ensuring that you stay well-informed and actively involved.

## Contributor Statistics

![Apache APISIX Contributors List](https://static.apiseven.com/uploads/2024/01/03/CPoS8MJV_Con.png)

![Apache APISIX New Contributors](https://static.apiseven.com/uploads/2024/01/03/Cs8W4P1U_New.png)

## Highlight of Recent Feature

- [The `limit-count` plugin configuration supports environment variables](https://github.com/apache/apisix/pull/10607) (Contributor: [ikatlinsky](https://github.com/ikatlinsky))

- [The `response-rewrite` plugin supports gzip when using the filters.regex option](https://github.com/apache/apisix/pull/10637) (Contributor: [yuweizzz](https://github.com/yuweizzz))

- [Upgrade OpenSSL 1.1.1 to OpenSSL 3.0 version](https://github.com/apache/apisix/pull/10724) (Contributor: [AlinsRan](https://github.com/AlinsRan))

## Recent Blog Recommendations

- [Enhancing Security and Performance: DataVisor's Dynamic Use of APISIX](https://apisix.apache.org/blog/2023/12/19/datavisor-uses-apisix/)

  Author: Xiaobiao Zhao, DataVisor Senior Architect, Apache Kvrocks Committer, OpenResty and Apache APISIX Contributor. This article is based on a presentation given by Xiaobiao Zhao at the APISIX Shanghai Meetup in November 2023.
  
- [Apache APISIX plugin priority, a leaky abstraction?](https://apisix.apache.org/blog/2023/12/14/apisix-plugins-priority-leaky-abstraction/)

  Apache APISIX builds upon the OpenResty reverse-proxy to offer a plugin-based architecture. The main benefit of such an architecture is that it brings structure to the configuration of routes. It's a help at scale, when managing hundreds or thousands of routes.

- [How to Supercharge Large-Scale Video Operations with APISIX](https://apisix.apache.org/blog/2023/12/14/migu-video-adopts-apisix/)

  Author: Yu Xia, Senior DevOps Engineer at Migu Video Construction and Operation Center. This article is based on a presentation given by Yu Xia at the APISIX Shanghai Meetup in November 2023.

A wealth of documentation tutorials and experience has been accumulated on the Apache APISIX official website and GitHub. If you encounter problems, you can look into the documentation, search keywords in the issues, or participate in the discussion on the issues, proposing your own ideas and practical experience.
