---
title: "Release Apache APISIX 2.10.0"
author: "Zexuan Luo"
authorURL: "https://github.com/spacewander"
authorImageURL: "https://avatars.githubusercontent.com/u/4161644?v=4"
keywords:
- Apache APISIX
- API Gateway
- Release Notes
- APISIX 2.10
description: API Gateway Apache APISIX 2.10.0 is officially released! This is the first LTS release of Apache APISIX and supports more than 10 features and plugins at the same time.
tags: [Community]
---

> Apache APISIX 2.10.0 is released!

<!--truncate-->

Apache APISIX 2.10.0 is officially released! 🎉 This is the first LTS release of Apache APISIX with support for 10+ new features and new plugins. Have a quick read to learn about the new features in version 2.10.0!

## Milestone: The First LTS Release

This 2.10.0 release is a milestone for Apache APISIX, as Apache APISIX 2.10.0 is our first LTS (Long Time Support) release.

We will be releasing subsequent patch versions on top of Apache APISIX 2.10.0, i.e. 2.10.1, 2.10.2, etc. These releases will backport bugfixes from the main branch.

In October, we plan to release the first patch for the first LTS version, Apache APISIX 2.10.1.

We will then release alternating version lines 2.10.x (e.g. 2.10.2) and 2.x (e.g. 2.11.0) to keep the features iterative while ensuring that the LTS version gets the newer bugfixes.

## New Feature: Add Hosts Attribute to Service

In Apache APISIX 2.10.0, we added the `hosts` property to `service`. Like the other fields in `service`, `route` can inherit the `hosts` attribute from `service`.

For example, the following configurations are equivalent in Apache APISIX 2.10.0:

```json
# services/1
{
    "hosts": ["bar.com"]
}
# routes/1
{
    "upstream": {
        "nodes": {
            "127.0.0.1:1980": 1
        },
        "type": "roundrobin"
    },
    "service_id": "1",
    "uri": "/hello"
}
```

```json
# routes/1
{
    "upstream": {
        "nodes": {
            "127.0.0.1:1980": 1
        },
        "type": "roundrobin"
    },
    "hosts": ["bar.com"],
    "uri": "/hello"
}
```

With this change, the relationship between `route` and `service` in Apache APISIX is becoming more and more similar to the relationship between `location` and `server` in Nginx. This change brings `service` back into the core Apache APISIX configuration: [Route](http://apisix.apache.org/docs/apisix/terminology/route), [Upstream](http://apisix.apache.org/docs/apisix/terminology/upstream), and [Service](http://apisix.apache.org/docs/apisix/terminology/service).

## New Feature: Support Setting the Ratio of Mirror Requests

The proxy-mirror plugin's support for setting the ratio of mirrored requests is a feature users have been waiting for, and we support it on Apache APISIX 2.10.

By setting `sample_ratio`, you can control the number of requests that are mirrored to the test service. For example, the following configuration with `sample_ratio` set to 0.5 will mirror half of the requests to the test service.

```json
{
    "plugins": {
        "proxy-mirror": {
            "host": "http://127.0.0.1:1986",
            "sample_ratio": 0.5
        }
    },
    "upstream": {
        "nodes": {
            "127.0.0.1:1980": 1
        },
        "type": "roundrobin"
    },
    "uri": "/hello"
}
```

## New Plugin: APISIX Python Plugin Runner

Following [Java Plugin Runner](https://apisix.apache.org/blog/2021/06/21/use-Java-to-write-Apache-APISIX-plugins/) and [Go Plugin Runner](https://apisix.apache.org/blog/2021/08/19/go-makes-Apache-APISIX-better/), there is a new Plugin Runner for Apache APISIX.

The [Apache APISIX Python Plugin Runner](https://github.com/apache/apisix-python-plugin-runner) has been released in version 0.1.0 on September 6.

Python is a popular programming language that has always been known for its ease of use and flexibility. Now you and I can use the language to write plugins for Apache APISIX.

In addition to the Python Plugin Runner, our community partners are also developing Plugin Runners for other programming languages, such as the [JavaScript Plugin Runner](https://github.com/zenozeng/apisix-javascript-plugin-runner), and everyone is welcome to participate in the development.

## Download

In addition to the above new features and components, the Apache APISIX 2.10.0 release introduces more than a dozen new features and plugins, for details please see the [Change log](https://github.com/apache/apisix/blob/release/2.10/) corresponding to this release CHANGELOG.md#2100).

Download Apache APISIX 2.10.0

- Source code: Please visit [Download page](https://apisix.apache.org/downloads/)
- Binary installation package: Please visit [Installation Guide](https://apisix.apache.org/docs/apisix/how-to-build/)
