---
title: Biweekly Report (Apr 15 - Apr 30)
keywords:
- Apache APISIX
- API Gateway
- Kubernetes
- TiDB
- Contributor
description: The Apache APISIX Community Weekly Report hopes to help community members better understand the weekly progress of the Apache APISIX community.
tags: [Community]
---

> From April 15th to April 30th, 28 contributors submitted 88 commits for Apache APISIX. Thank you all for your contributions to Apache APISIX.

<!--truncate-->

## Introduction

Apache APISIX has grown as a community from the first day of open source and has quickly become the most active open source API gateway project in the world. These achievements cannot be achieved without the joint efforts of our community partners.

"If you want to go fast, go alone.If you want to go far, go together." The Apache APISIX Community Weekly Report hopes to help community members better understand the weekly progress of the Apache APISIX community and and facilitate everyone to participate in the Apache APISIX community.

We have also compiled some issues suitable for newcomers to the community to participate in! If you are interested, don't miss it!

## Contributor Statistics

![Contributors List](https://static.apiseven.com/202108/1652147147760-64ccf980-1c1e-473b-b04f-ee28e52cf33d.png)

![New Contributors](https://static.apiseven.com/202108/1652147147758-9dcadcd2-7190-4846-9a5b-b0c4a1098e66.png)

## Good first issue

### Issue #6923

**Link**: https://github.com/apache/apisix/issues/6923

**Issue description**:

As a user, I want to let `api-breaker` plugin return the default response body. Refer to the document [api-breaker](https://apisix.apache.org/zh/docs/apisix/plugins/api-breaker/), when upstream is in the unhealthy state, the `api-breaker` returns `unhealthy.http_statuses` only, without a response body.

In order to be more compatible to the client, return a default response body is useful.

## Highlights of Recent Features

- [Inject kubernetes discovery environment variable](https://github.com/apache/apisix/pull/6869)(Contributor: [zhixiongdu027](https://github.com/zhixiongdu027))

- [xRPC added simple redis support](https://github.com/apache/apisix/pull/6873)(Contributor: [spacewander](https://github.com/spacewander))

- [xRPC added basic stream support](https://github.com/apache/apisix/pull/6885)（Contributor: [spacewander](https://github.com/spacewander))

- [Feat(xRPC): support dynamic upstream](https://github.com/apache/apisix/pull/6901)(Contributor: [spacewander](https://github.com/spacewander))

- [Feat(xRPC): support dynamic upstream with upstream_id](https://github.com/apache/apisix/pull/6919)(Contributor: [spacewander](https://github.com/spacewander))

The Apache APISIX project website and the Github issue have accumulated a wealth of documentation and experience, so if you encounter problems, you can read the documentation, search the issue with keywords, or participate in the discussion on the issue to put forward your own ideas and practical experience.

## Recent Blog Recommendations

- [Best Practices for TiDB-based Apache APISIX High Availability Configuration](https://apisix.apache.org/blog/2022/04/22/apisix-with-tidb-practice)

In the TiDB Hackathon 2021, the APISIX team (team leader: Chao Zhang, team members: Zeping Bai, Zhengsong Tu, Jinghan Chen) presented the ability of TiDB to interface with Apache APISIX to implement a universal configuration center. In this article, we will bring you some stories behind the project and the future outlook, if you are interested in the project, please feel free to participate in the project.
