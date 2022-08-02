---
title: Biweekly Report (Apr 1 - Apr 14)
keywords:
- Apache APISIX
- API Gateway
- Weekly Report
- Contributor
description: The Apache APISIX Community Weekly Report hopes to help community members better understand the weekly progress of the Apache APISIX community.
tags: [Community]
---

> From April 1st to  April 14th, 36 contributors submitted 75 commits for Apache APISIX. Thank you all for your contributions to Apache APISIX.

<!--truncate-->

## Introduction

Apache APISIX has grown as a community from the first day of open source and has quickly become the most active open source API gateway project in the world. These achievements cannot be achieved without the joint efforts of our community partners.

"If you want to go fast, go alone.If you want to go far, go together." The Apache APISIX Community Weekly Report hopes to help community members better understand the weekly progress of the Apache APISIX community and and facilitate everyone to participate in the Apache APISIX community.

We have also compiled some issues suitable for newcomers to the community to participate in! If you are interested, don't miss it!

## Contributor Statistics

![Contributors List](https://static.apiseven.com/202108/1650443415345-e067c6d9-1f39-4152-a7cc-4379fd4f17f3.jpg)

![New Contributors](https://static.apiseven.com/202108/1650443438975-33d7f4fb-01ca-4877-848e-35b1f6869d2a.png)

## Good first issue

### Issue #6803

**Link**: https://github.com/apache/apisix/issues/6803

**Issue description**:

When use `openid-connect` plugins with the wrong `redirect_uri` in Apache APISIX, as shown below:

```Bash
   "plugins":{
        "openid-connect":{
             ...
            "scope":"openid profile",
            "bearer_only":false,
            "introspection_endpoint_auth_method":"client_secret_post",
            "redirect_uri":"http://127.0.0.1:9080/"
             ...
        }
    },
```

Then, request the "127.0.0.1:9080/", will get 500, and the error log is as follow:

![500 Error](https://static.apiseven.com/202108/1650443701999-958f2096-d44d-4cd0-99b5-6e8833c361c6.png)

```YAML
2022/04/07 17:13:50 [error] 31780#3492140: *1959 [lua] openidc.lua:1378: authenticate(): request to the redirect_uri path but there's no session state found, client: 127.0.0.1, server: _, request: "GET / HTTP/1.1", host: "127.0.0.1:9080"
2022/04/07 17:13:50 [error] 31780#3492140: *1959 [lua] openid-connect.lua:304: phase_func(): OIDC authentication failed: request to the redirect_uri path but there's no session state found, client: 127.0.0.1, server: _, request: "GET / HTTP/1.1", host: "127.0.0.1:9080"
```

This type of log is very unclear and the user does not know what to expect. Error logging should be improved to improve the experience of using the `Openid-connect` plug-in.

### Issue #6797

**Link**:https://github.com/apache/apisix/issues/6797

**Issue description**:

When using the `file-logger` plugin, it is possible to send the logging to stdout by defining `/dev/stdout`. This in order to use the docker output and relais this in kubernetes to a ELK stack. Though an error is thrown indicating a permission denied for the current user.failed to open file: `/dev/stdout`, error info: `/dev/stdout`: Permission denied while logging request

## Highlights of Recent Features

- [Add the function of hiding header for `key-auth` plugin](https://github.com/apache/apisix/pull/6670)(Contributor: [bin-ya](https://github.com/bin-ya))

- [Support ZooKeeper service discovery](https://github.com/apache/apisix/pull/6751)(Contributor: [shuaijinchao](https://github.com/shuaijinchao))

- [Feat(`request-id`): add algorithm support nanoid](https://github.com/apache/apisix/pull/6779)（Contributor: [aikin-vip](https://github.com/aikin-vip))

- [Feat(`response-rewrite`): support filters](https://github.com/apache/apisix/pull/6750)(Contributor: [kwanhur](https://github.com/kwanhur))

The Apache APISIX project website and the Github issue have accumulated a wealth of documentation and experience, so if you encounter problems, you can read the documentation, search the issue with keywords, or participate in the discussion on the issue to put forward your own ideas and practical experience.

## Recent Blog Recommendations

- [Apache APISIX Summit ASIA 2022: API Gateway, Service Mesh and Open Source Ecology](https://apisix.apache.org/blog/2022/04/12/apisix-summit-asia-2022)

Since Apache APISIX was officially open sourced on June 6, 2019, it has been growing rapidly as a community. In just over two years, the number of global contributors has exceeded 400, and the number is still growing rapidly. During this time, the Apache APISIX community has also successively gained recognition from domestic and foreign developers.

The Apache APISIX community will organize the Apache APISIX Summit ASIA 2022 on May 20-21, 2022.

[Click here](https://apisix-summit.org) to register for Apache APISIX Summit ASIA 2022.
