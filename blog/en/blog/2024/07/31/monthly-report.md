---
title: "Monthly Report (July 01 - July 31)"
keywords: ["Apache APISIX", "API Gateway", "Monthly Report", "Contributor"]
description: Our monthly Apache APISIX community report generates insights into the project's monthly developments. The reports provide a pathway into the Apache APISIX community, ensuring that you stay well-informed and actively involved.
tags: [Community]
image: https://static.apiseven.com/uploads/2024/07/31/U3v43S1b_report-july-en.png
---

> We have recently made some additions and improvements to specific features within Apache APISIX. The main improvement is moving the default values from `config-default.yaml` to a hardcoded Lua file. For detailed information, please read the monthly report.
<!--truncate-->

## Introduction

From its inception, the Apache APISIX project has embraced the ethos of open-source community collaboration, propelling it into the ranks of the most active global open-source API gateway projects. The proverbial wisdom of 'teamwork makes the dream work' rings true in our way and is made possible by the collective effort of our community.

From July 1 to June 31, a total of 13 contributors made 21 commits to Apache APISIX. We sincerely appreciate your contributions to Apache APISIX.

## Contributor Statistics

![Apache APISIX Contributors List](https://static.apiseven.com/uploads/2024/07/31/Uk3y8OVm_july-contributors.png)

![Apache APISIX New Contributors](https://static.apiseven.com/uploads/2024/07/31/x59QmPpL_new-contributors-july.png)

## Recent Feature Highlight

- [Move `config-default.yaml` default values to hardcoded Lua file](https://github.com/apache/apisix/pull/11312)（Contributor: [bzp2010](https://github.com/bzp2010))

  Apache APISIX has two configuration files: `config.yaml` which can be modified by users and `config-default.yaml`, the default configuration file. When APISIX starts, it reads these two configuration files and merges and overwrites the user configuration file with the default configuration to create the configuration that is used at runtime.
  
  However, in actual use, users are often unclear on how to modify custom configurations. To simplify the configuration process and avoid unintended issues from modifying the default file, we moved the default configuration values to a hardcoded Lua file. This allows users to focus on customizing the `config.yaml` file without the risk of accidentally changing the default settings.

## Recent Blog Recommendations

- [Advanced URL rewriting with Apache APISIX](https://apisix.apache.org/blog/2024/07/18/advanced-url-rewrite-apisix/)
  
  Explore how to leverage Apache APISIX's [`proxy-rewrite`](https://apisix.apache.org/docs/apisix/plugins/proxy-rewrite/) and [`serverless`](https://apisix.apache.org/docs/apisix/plugins/serverless/) plugins to achieve advanced URL rewriting, simplify API design, and boost development efficiency.

- [Dynamic watermarking with imgproxy and Apache APISIX](https://apisix.apache.org/blog/2024/07/11/watermarking-infrastructure/)
  
  Discover how to leverage the power of Apache APISIX and [imgproxy](https://docs.imgproxy.net/features/watermark) to implement dynamic watermarking and on-the-fly image processing for your web applications.

The [official website](https://apisix.apache.org/) and [GitHub Issues](https://github.com/apache/apisix/issues) of Apache APISIX provide a wealth of documentation of tutorials and real-world use cases. If you encounter any issues, you can refer to the documentation, search for keywords in Issues, or participate in discussions on Issues to share your ideas and practical experiences.
