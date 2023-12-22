---
title: "Biweekly Report (December 04 - December 17)"
keywords: ["Apache APISIX", "API Gateway", "Weekly Report", "Contributor"]
description: Our bi-weekly Apache APISIX community report is your window into the project's weekly developments. It is a tool to facilitate your seamless integration into the Apache APISIX community, ensuring that you stay well-informed and actively involved.
tags: [Community]
image: https://static.apiseven.com/uploads/2023/12/20/XSUtxSaY_EN.png
---

> We have recently made some additions and improvements to specific features within Apache APISIX. The updates include adding `jwe decrypt` and `brotli` plugins, adding more attributes to `openid-connect` plugin, allowing `CORS` plugin to support Timing-Allow-Origin, and using lua-resty-events as the default event mechanism. For additional information, please consult the bi-weekly report.
<!--truncate-->

## Introduction

From its inception, the Apache APISIX project has embraced the ethos of open-source community collaboration, propelling it into the ranks of the most active global open-source API gateway projects. The proverbial wisdom of 'Many hands make light work' rings true in our way, made possible by the collective dedication of our community.

From 12.04 to 12.17, a total of 21 contributors made 46 commits to Apache APISIX. We sincerely appreciate your contributions to Apache APISIX.

We have recently added and enhanced several plugins, and here is a summary of the updates:

1. Add `jwe decrypt` plugin

2. Add more attributes to `openid-connect` plugin

3. Add support for the Timing-Allow-Origin header in `CORS` plugin

4. Add `brotli` plugin

5. Use lua-resty-events as the default event mechanism

Our bi-weekly Apache APISIX community report is your window into the project's weekly developments. It is a tool to facilitate your seamless integration into the Apache APISIX community, ensuring that you stay well-informed and actively involved.

## Contributor Statistics

![Apache APISIX Contributors List](https://static.apiseven.com/uploads/2023/12/20/qNS4Ydta_CON.png)

![Apache APISIX New Contributors](https://static.apiseven.com/uploads/2023/12/20/GycOBJie_NEW.png)

## Highlight of Recent Feature

- [Add `jwe decrypt` plugin](https://github.com/apache/apisix/pull/10252) (Contributor: [fishioon](https://github.com/fishioon))

- [Add more attributes to `openid-connect` plugin](https://github.com/apache/apisix/pull/10591) (Contributor: [kayx23](https://github.com/kayx23))

- [Add support for the Timing-Allow-Origin header in `CORS` plugin](https://github.com/apache/apisix/pull/9365) (Contributor: [skimdz86](https://github.com/skimdz86))

- [Add `brotli` plugin](https://github.com/apache/apisix/pull/10515) (Contributor: [yuweizzz](https://github.com/yuweizzz))

- [Add new lua-resty-events as the default event mechanism](https://github.com/apache/apisix/pull/10550) (Contributor: [bzp2010](https://github.com/bzp2010))

## Recent Blog Recommendations

- [Apache APISIX plugin priority, a leaky abstraction?](https://apisix.apache.org/blog/2023/12/14/apisix-plugins-priority-leaky-abstraction/)

  Apache APISIX builds upon the OpenResty reverse-proxy to offer a plugin-based architecture. The main benefit of such an architecture is that it brings structure to the configuration of routes. It's a help at scale, when managing hundreds or thousands of routes.

- [How to Supercharge Large-Scale Video Operations with APISIX](https://apisix.apache.org/blog/2023/12/14/migu-video-adopts-apisix/)

  Author: Yu Xia, Senior DevOps Engineer at Migu Video Construction and Operation Center. This article is based on a presentation given by Yu Xia at the APISIX Shanghai Meetup in November 2023.

- [Canary releases with Apache APISIX](https://apisix.apache.org/blog/2023/12/07/canary-releases-apisix/)

  In a few words, the idea of canary releases is to deliver a new software version to only a fraction of the users, analyze the results, and decide whether to proceed further or not. If results are not aligned with expectations, roll back; if they are, increase the number of users exposed until all users benefit from the new version.

A wealth of documentation tutorials and experience has been accumulated on the Apache APISIX official website and GitHub. If you encounter problems, you can look into the documentation, search keywords in the issues, or participate in the discussion on the issues, proposing your own ideas and practical experience.
