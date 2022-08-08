---
title: Biweekly Report (Jul 1 - Jul 15)
keywords:
- Apache APISIX
- API Gateway
- Weekly Report
- Contributor
description: The cloud native API gateway Apache APISIX has added functions such as supporting custom plugin priorities and checking plugin_metadata in configuration files in the past two weeks.
tags: [Community]
---

> From Jul 1st to Jul 15th, 28 contributors submitted 99 commits for Apache APISIX. Thank you all for your contributions to Apache APISIX. It is your selfless contribution to make the Apache APISIX project better!

<!--truncate-->

## Introduction

Apache APISIX has grown as a community from the first day of open source and has quickly become the most active open source API gateway project in the world. These achievements cannot be achieved without the joint efforts of our community partners.

"If you want to go fast, go alone.If you want to go far, go together." The Apache APISIX Community Weekly Report hopes to help community members better understand the weekly progress of the Apache APISIX community and and facilitate everyone to participate in the Apache APISIX community.

We have also compiled some issues suitable for newcomers to the community to participate in! If you are interested, don't miss it!

## Contributor Statistics

![Contributors List](https://static.apiseven.com/2022/weeklyreport/0721/4.jpg)

![New Contributors](https://static.apiseven.com/2022/weeklyreport/0721/5yingwen.png)

## Good first issue

### Issue #1146

**Link**: https://github.com/apache/apisix-ingress-controller/issues/1146

**Description**: We should add a new `make dev-env entry` in Makefile, to start a dev environment.

It should do something:

- Use kind create a new cluster
- Deploy APISIX + etcd
- Build `apisix-ingress-controller`’s image
- Deploy `apisix-ingress-controller`

Most of them are already contained in the current Makefile, we need to organize them.

### Issue #1129

**Link**: https://github.com/apache/apisix-ingress-controller/issues/1129

**Description**: In the current project's `e2e`, a lot of `time.sleep` is used. This will undoubtedly increase the overall time-consuming of CI.

https://pkg.go.dev/k8s.io/apimachinery/pkg/util/wait package provides tools for polling or listening for changes to a condition.

We can replace the current `time.sleep` with `wait` for a more elegant way of determining whether our desired state has been reached.

## Highlights of Recent Features

- [Add annotations to combine ApisixPluginConfig with k8s ingress resource](https://github.com/apache/apisix-ingress-controller/pull/1139)（Contributor: [dickens7](https://github.com/dickens7)）

- [Fix ID conflict when route replication in APISIX Dashboard](https://github.com/apache/apisix-dashboard/pull/2501)（Contributor: [SkyeYoung](https://github.com/SkyeYoung)）

- [Add PKCE support to the openid-connect plugin](https://github.com/apache/apisix/pull/7370)（Contributor: [qihaiyan](https://github.com/qihaiyan)）

- [Filter fields supported by all objects](https://github.com/apache/apisix/pull/7391)（Contributor: [tzssangglass](https://github.com/tzssangglass)）
