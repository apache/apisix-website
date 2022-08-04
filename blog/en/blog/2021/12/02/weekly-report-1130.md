---
title: Biweekly Report (Nov.15 - Nov.30)
keywords:
- Apache APISIX
- Weekly Report
- Contributor
- APISIX
- API Gateway
- Apache
description: Apache APISIX adds the azure-functions, google-cloud-logging and openwhisk plugins, and the kafka-logger plugin to support logging request and response bodies and many other functions.
tags: [Community]
---

> From 11.15 to 11.30, 37 contributors submitted 87 commits for Apache APISIX. Thank you all for your contributions to Apache APISIX. It is your selfless contribution to make the Apache APISIX project better!

<!--truncate-->

## Introduction

Apache APISIX has grown as a community from the first day of open source and has quickly become the most active open source API gateway project in the world. These achievements cannot be achieved without the joint efforts of our community partners.

"If you want to go fast, go alone.If you want to go far, go together." The Apache APISIX Community Weekly Report hopes to help community members better understand the weekly progress of the Apache APISIX community and and facilitate everyone to participate in the Apache APISIX community.

We have also compiled some issues suitable for newcomers to the community to participate in! If you are interested, don't miss it!

## Contributor Statistics

![Contributors List](https://static.apiseven.com/202108/1638346484091-37307b33-3e48-402f-9a72-3819e4217b29.png)

![New Contributors](https://static.apiseven.com/202108/1638346484108-354ecbdd-a872-4a8f-b5c6-4903bad44eca.png)

## Good first issue

### Issue #5451

**Link**: https://github.com/apache/apisix/issues/5451

**Issue description**:

Nginx comes with a response content replacement library that can replace partial content: http://nginx.org/en/docs/http/ngx_http_sub_module.html

```Nginx
sub_filter '<a href="http://127.0.0.1:8080/'  '<a href="https://$host/';
```

There is a library that supports regular substitution (as I remember Openresty already supports it by default): ngx_http_substitutions_filter_module, which can replace content with regular expressions: ngx_http_substitutions_filter_module

```Nginx
subs_filter_types text/html text/css text/xml;
subs_filter st(\d*).example.com $1.example.com ir;
subs_filter a.example.com s.example.com;
subs_filter http://$host https://$host;
```

However, it seems that APISIX's response-rewrite plugin only supports full replacement, which is equivalent to directly replacing all responses with the return set by the plugin, and does not support partial content replacement:

```shell
curl http://127.0.0.1:9080/apisix/admin/routes/1  -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "methods": ["GET"],
    "uri": "/test/index.html",
    "plugins": {
        "response-rewrite": {
            "body": "{\"code\":\"ok\",\"message\":\"new json body\"}",
            "headers": {
                "X-Server-id": 3,
                "X-Server-status": "on",
                "X-Server-balancer_addr": "$balancer_ip:$balancer_port"
            },
            "vars":[
                [ "status","==","200" ]
            ]
        }
    },
    "upstream": {
        "type": "roundrobin",
        "nodes": {
            "127.0.0.1:80": 1
        }
    }
}'
```

Does this plugin support partial replacement or regular replacement? If not, is there any other solution for APISIX?

### Issue #5647

**Link**: https://github.com/apache/apisix/issues/5647

**Issue description**:

The current documentation provides a way to install APISIX directly using RPM on CentOS7, but the current APISIX has switched its dependency to apisix-base version without providing its RPM installation method, which will cause the installation to fail.

![Issue Screenshot](https://static.apiseven.com/202108/1638346839201-3efb9807-13a7-4106-968a-5198b22d1a67.png)

Is it possible to add the command for installing the RPM for apisix-base.

## Highlights of Recent Features

- [kafka-logger supports logging request body](https://github.com/apache/apisix/pull/5501)（Contributor: [windyrjc](https://github.com/windyrjc)）

- [New azure-functions plugin, seamlessly integrated with Azure Serverless Function](https://github.com/apache/apisix/pull/5479)（Contributor: [bisakhmondal](https://github.com/bisakhmondal)）

- [The WASM plugin supports running in the header_filter phase](https://github.com/apache/apisix/pull/5544)（Contributor: [spacewander](https://github.com/spacewander)）

- [New google-cloud-logging plugin for pushing logs to Google Cloud logging Service](https://github.com/apache/apisix/pull/5538)（Contributor: [shuaijinchao](https://github.com/shuaijinchao)）

- [New openwhisk plugin, integrated with Apache OpenWhisk serverless platform](https://github.com/apache/apisix/pull/5518)（Contributor: [bzp2010](https://github.com/bzp2010)）

- [kafka-logger and http support logging response bodies](https://github.com/apache/apisix/pull/5550)（Contributor: [dmsolr](https://github.com/dmsolr)）

- [Enriched mTLS support in APISIX Ingress for HTTPS and gRPCs type upstream](https://github.com/apache/apisix-ingress-controller/pull/755)（Contributor: [nic-6443](https://github.com/nic-6443)）

The Apache APISIX project website and the Github issue have accumulated a wealth of documentation and experience, so if you encounter problems, you can read the documentation, search the issue with keywords, or participate in the discussion on the issue to put forward your own ideas and practical experience.

## Recent Blog Recommendations

- [Using Apache APISIX Ingress Gateway to access Custom Monitoring in KubeSphere](https://apisix.apache.org/blog/2021/11/30/use-apisix-ingress-in-kubesphere)：

  This article will take Apache APISIX Ingress Controller as an example to show you in detail how to quickly use different types of gateways and status monitoring for Kubernetes clusters through KubeSphere.

- [Contributer to Committer journey @Apache APISIX](https://apisix.apache.org/blog/2021/11/26/apache-apisix-committer-experience)：

  In this article, Shivam Singh ([@1502shivam-singh](https://github.com/1502shivam-singh)) gives a brief of his journey from starting out in the Apache APISIX community, from a contributor to an Apache member and APISIX committer. His journey can help other people looking to startup in the Apache APISIX community or Open Source in general.

- [Developing APISIX Ingress Controller with Nocalhost in Kubernetes](https://apisix.apache.org/blog/2021/11/22/develop-apisix-ingress-with-nocalhost-in-kubernetes)：

  This article walks you through using Nocalhost to seamlessly connect your local development machine to a remote Kubernetes cluster, allowing you to use IDE to develop and debug Apache APISIX Ingress Controller. Giving you the ability to comfortably develop and debug your remote apps with your existing skills.

- [Apache APISIX embraces the WASM ecosystem](https://apisix.apache.org/blog/2021/11/19/apisix-supports-wasm)：

  Support for WASM will be added in the upcoming Apache APISIX version (2.11.0)! By reading this article you will learn how Apache APISIX deploys the support and development of this feature from 0 to 1.

- [How to integrate with Dapr to build Apache APISIX Gateway Controller](https://apisix.apache.org/blog/2021/11/17/dapr-with-apisix)：

  This article will show you how to create an Apache APISIX controller by integrating Dapr, includes the concept of the project and the specific operation steps.
  