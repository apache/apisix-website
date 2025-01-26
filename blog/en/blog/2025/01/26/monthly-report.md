---
title: "Monthly Report (January 01 - January 26)"
keywords: ["Apache APISIX", "API Gateway", "Monthly Report", "Contributor"]
description: Our monthly Apache APISIX community report generates insights into the project's monthly developments. The reports provide a pathway into the Apache APISIX community, ensuring that you stay well-informed and actively involved.
tags: [Community]
image: https://static.apiseven.com/uploads/2025/01/26/IW13p0Ux_monthly-report-cover-en-jan.png
---

> We have recently added a new feature within Apache APISIX, which supports anonymous consumers in authentication. For detailed information, please read the monthly report.
<!--truncate-->

## Introduction

From its inception, the Apache APISIX project has embraced the ethos of open-source community collaboration, propelling it into the ranks of the most active global open-source API gateway projects. The proverbial wisdom of 'teamwork makes the dream work' rings true in our way and is made possible by the collective effort of our community.

From January 1 to January 26, 5 contributors made 17 commits to Apache APISIX. We sincerely appreciate your contributions to Apache APISIX.

## Contributor Statistics

![Apache APISIX Contributors List](https://static.apiseven.com/uploads/2025/01/26/REIh62gM_contributors-jan.png)

## Recent Feature Highlight

[Support Anonymous Consumer in Authentication](https://github.com/apache/apisix/pull/11917) (Contributor: [Revolyssup](https://github.com/Revolyssup))

Previously, the built-in user authentication logic in APISIX is either successful authentication reflected to the corresponding Consumer object, or authentication failure directly returned to the caller authentication failure return.

Some users wanted a dummy consumer framed as an "anonymous" consumer to be attached to the request when authentication fails so that certain rules (as plugins) defined in the "anonymous" consumer will be applied.

## Conclusion

The [official website](https://apisix.apache.org/) and [GitHub Issues](https://github.com/apache/apisix/issues) of Apache APISIX provide a wealth of documentation of tutorials and real-world use cases. If you encounter any issues, you can refer to the documentation, search for keywords in Issues, or participate in discussions on Issues to share your ideas and practical experiences.
