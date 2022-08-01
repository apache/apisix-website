---
title: Biweekly Report (Dec 16 - Dec 31)
keywords:
- Apache APISIX
- Weekly Report
- Contributor
- APISIX
- API Gateway
- Apache
description: The Apache APISIX Community Weekly Report hopes to help community members better understand the weekly progress of the Apache APISIX.
tags: [Community]
---

> From 12.16 to 12.31, 33 contributors submitted 90 commits for Apache APISIX. Thank you all for your contributions to Apache APISIX.

<!--truncate-->

## Introduction

Apache APISIX has grown as a community from the first day of open source and has quickly become the most active open source API gateway project in the world. These achievements cannot be achieved without the joint efforts of our community partners.

"If you want to go fast, go alone.If you want to go far, go together." The Apache APISIX Community Weekly Report hopes to help community members better understand the weekly progress of the Apache APISIX community and and facilitate everyone to participate in the Apache APISIX community.

We have also compiled some issues suitable for newcomers to the community to participate in! If you are interested, don't miss it!

## Contributor Statistics

![Contributors List](https://static.apiseven.com/202108/1641356905327-5adada08-1312-4cbd-962b-00d1fcf9ab96.png)

![New Contributors](https://static.apiseven.com/202108/1641363865356-97a6e876-97b9-4bda-a0bd-570c4d953faa.png)

## Good first issue

### Issue #5861

**Link**: https://github.com/apache/apisix/issues/5861

**Issue description**:

Sometimes the full CI "linux_openresty"

```YAML
- linux_openresty
```

takes 50 minutes to complete.

Let's split it into multiple parts so the max single job time can be reduced.

We can pass an environment variable as the test file range in

```Shell
 FLUSH_ETCD=1 PERL5LIB=.:$PERL5LIB prove -Itest-nginx/lib -r t
```

### Issue #5900

**Link**: https://github.com/apache/apisix/issues/5900

**Issue description**:

When using `base-auth` plugins, I don't want to pass the `Authentication` header to upstream.
IMO, there is no need for upstream to perceive these authentication headers.

Now, I use proxy-rewrite plugin to rewrite the Authentication head like this:

```Bash
 "plugins": {
        "basic-auth": {},
        "proxy-rewrite": {
            "headers": {
                "Authorization": ""
            }
        }
    },
```

I think we can add a config in the `basic-auth` plugin to hide the auth head.

That will be more convenient in using these plugins. So do `key-auth` plugin.

## Highlights of Recent Features

- [Completed the controller loop and related logic for the ApisixPluginConfig custom resource. Released in APISIX Ingress controller v1.4](https://github.com/apache/apisix-ingress-controller/pull/815)（Contributor: [neverCase](https://github.com/neverCase)）

- [The limit-count plugin supports shared counters](https://github.com/apache/apisix/pull/5881)（Contributor: [spacewander](https://github.com/spacewander)）

- [Add degradation switch for ext-plugin](https://github.com/apache/apisix/pull/5897)（Contributor: [arabot777](https://github.com/arabot777)）

- [Support to use path parameter with plugin's control api](https://github.com/apache/apisix/pull/5934)（Contributor: [The-White-Lion](https://github.com/The-White-Lion)）

- [Support send APISIX data to assist decision in OPA plugin](https://github.com/apache/apisix/pull/5874)（Contributor: [bzp2010](https://github.com/bzp2010)）

- [Allow setting proxy_request_buffering without disabling proxy-mirror](https://github.com/apache/apisix/pull/5943)（Contributor: [spacewander](https://github.com/spacewander)）

The Apache APISIX project website and the Github issue have accumulated a wealth of documentation and experience, so if you encounter problems, you can read the documentation, search the issue with keywords, or participate in the discussion on the issue to put forward your own ideas and practical experience.

## Recent Blog Recommendations

- [Apache APISIX Integrates with Google Cloud Logging to Improve Log Processing](https://apisix.apache.org/blog/2021/12/22/google-logging)：

  This article will explain how to configure and use the Google Cloud Logging service in Apache APISIX.

- [Apache APISIX integrates with Open Policy Agent to enrich its ecosystem](https://apisix.apache.org/blog/2021/12/24/open-policy-agent)：

  This article introduces the opa plug-in as an example of HTTP API and details how to integrate Apache APISIX with OPA to decouple the authentication authorization of back-end services.

- [Coming soon! Apache APISIX Integrate with Apache OpenWhisk](https://apisix.apache.org/blog/2021/12/24/apisix-integrate-openwhisk-plugin)：

  This article introduces the feature prospect and usage steps of the openwhisk plug-in, which is combined with a variety of identity authentication plug-ins provided by Apache APISIX to achieve authentication and authorization and other functions.

- [Using the Apache APISIX proxy gRPC service](https://apisix.apache.org/blog/2021/12/30/apisix-proxy-grpc-service)：

  This article shows you how to proxy client HTTP traffic to the back-end gRPC service via the grpc-transcode plugin in Apache APISIX.
