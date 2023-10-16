---
title: "Release Apache APISIX 3.6.1"
authors:
  - name: "Ashish Tiwari"
    title: "Author"
    url: "https://github.com/Revolyssup"
    image_url: "https://avatars.githubusercontent.com/u/43276904?v=4"
  - name: "Traky Deng"
    title: "Technical Writer"
    url: "https://github.com/kayx23"
    image_url: "https://avatars.githubusercontent.com/u/39619599?v=4"
keywords:
- Apache APISIX
- API Gateway
- API Management Platform
- New Release
- Cloud Native
description: The Apache APISIX 3.6.1 version is released on October 17, 2023. This release includes a few bug fixes.
tags: [Community]
---

We are glad to present Apache APISIX 3.6.1 with a number of bug fixes and continuous improvements to user experiences.

<!--truncate-->

## Bug Fixes

- Keep health check target state when upstream changes ([PR #10312](https://github.com/apache/apisix/pull/10312))
- Fix and optimize TLS in upstream schema ([PR #10269](https://github.com/apache/apisix/pull/10269))
- Add name field in `plugin_config` schema for consistency ([PR #10315](https://github.com/apache/apisix/pull/10315))
- Update schema description for `cors` plugin ([PR #10314](https://github.com/apache/apisix/pull/10314))
- Use warn logging level for `get_target_status` failure ([PR #10156](https://github.com/apache/apisix/pull/10156))

## Changelog

For a complete list of changes in this release, please see [CHANGELOG](https://github.com/apache/apisix/blob/master/CHANGELOG.md#361).
