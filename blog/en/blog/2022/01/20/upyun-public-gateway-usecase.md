---
title: "The Practice of Public Gateway in CDN Scenario from UPYUN"
author: "Sylvia"
authorURL: "https://github.com/SylviaBABY"
authorImageURL: "https://avatars.githubusercontent.com/u/39793568?v=4"
keywords: 
- UPYUN
- CDN
- Apache APISIX
- Gateway
- Open Source
description: In the public network gateway scenario, UPYUN linked the internal platform and Feishu reminder function based on APISIX.
tags: [Case Studies]
image: https://static.apiseven.com/2022/blog/0817/Upyun.png
---

> In the previous sharing, we brought you the application of cloud at the Ingress level. This time, we will introduce you to the current cloud application examples under the public network gateway scenario, hoping to bring you some practical Apache APISIX scenarios to share in the cloud storage industry.

<!--truncate-->

## Overview

[UPYUN](https://www.upyun.com/) is one of the users who have deployed Apache APISIX in their business scenarios. With scenario-based CDN as its core business, UPYUN provides customers with cloud storage, cloud processing, cloud security, traffic marketing and other services to help users achieve accelerated content distribution, accelerated product development and accelerated business growth.

At present, Apache APISIX has been used and deployed in two business scenarios: "Public Gateway" and "Ingress Gateway". The community has previously published a [use case sharing about the use of Apache APISIX Ingress in UPYUN](https://apisix.apache.org/blog/2021/09/24/youpaicloud-usercase/) and this time we will introduce you some current application examples in the "public gateway" scenario, hoping to bring you some practical Apache APISIX scenarios in the "cloud storage" industry.

## Scenario Use Case

The current internal gateway architecture is shown in the figure below. The external traffic is transferred to the internal through Apache APISIX, and then the traffic is transferred to APISIX Ingress through Apache APISIX, and finally reaches the back-end service for subsequent business processing.

![Internal architecture](https://static.apiseven.com/202108/1642583583698-f062ab87-c35e-4416-843e-54d59427c782.png)

As the first gateway for external traffic, the public gateway has to take up the heavy responsibility to control all the external traffic into the internal data center.

The original public gateway deployment is Kong, but now Kong has been slowly migrated to Apache APISIX. Currently, 30% of the traffic handled by Kong has been migrated to APISIX, and the migration is still in progress.

The reason for switching from Kong to APISIX is that the Kong architecture requires a connection to a PostgreSQL database. When adding routes or restarting routes, there are thousands and thousands of connections to Postgre, and once they are updated or restarted, there is no way to control the set of connections, even with a proxy on the front side, especially the more routes there are.

Based on this, Apache APISIX began to gradually take over the public network gateway function of the cloud, and is currently mainly used in the following business scenarios services:

1. Processing API access of CDN edge nodes through APISIX gateway, mainly for subsequent traffic management
2. Handle static pages and technical support related traffic through APISIX

Since the full migration is not yet completed, Apache APISIX is currently connected to only 3 internal data centers with about 20 machines. In terms of traffic processing, Apache APISIX has done a good job in backing up and carrying traffic.

As a public network gateway, Apache APISIX not only provides unified traffic management at the entrance, but also provides different functions for user login and other scenarios at the data level.

### Plug-in scenario: Login to internal platform

At present, within the company, employees need to log in to the internal platform through email and Fishu and other related authentication for access.

Specific code examples are as follows.

```json
    "openid-connect": {
      "access_token_in_authorization_header": false,
      "bearer_only": false,
      "client_id": "upyun-oauth",
      "client_secret": "xxxx",
      "disable": false,
      "discovery": "https://xxxx.upyun.com/oauth2/.well-known/openid-configuration",
      "introspection_endpoint_auth_method": "client_secret_basic",
      "logout_path": "/logout",
      "realm": "apisix",
      "redirect_uri": "/upyun-oauth",
      "scope": "openid email profile offline_access",
      "session_contents": {
        "access_token": true,
        "user": true
      },
      "set_access_token_header": false,
      "set_id_token_header": false,
      "set_userinfo_header": true,
      "timeout": 15
    },
```

Using the `openid-connect` plugin of Apache APISIX, you can easily interface with the above platforms for employee authentication, and then unify the login to the management platform of UPYUN.

![Login Page](https://static.apiseven.com/202108/1642583971338-e3aab730-2b75-4065-ba04-4c4fa3fafad9.png)

### Plug-in scenario: linkage with Feishu task reminder

In a more detailed application scenario, FeiShu's application is also linked with the openid-connect plug-in and serverless-post-function plug-in.

Through the cooperation of the above plug-ins, relevant user information (username, email or unique user identification within the Fishu application) can be transmitted to the services behind the public network gateway. The gateway gets the relevant identification information and forwards it to the server to complete the linkage function such as Fishu reminder or @.

```c
return function(config, ctx)
  local core = require('apisix.core');
  local user = ngx.req.get_headers()['X-Userinfo'];
....
  if name then
    if not ctx.consumer_name then
      ctx.consumer_name = name;
    end;
    core.request.set_header(ctx, 'X-Forwarded-Username', name)
  end;
  if user_id then
    core.request.set_header(ctx, 'X-Forwarded-UserID', user_id)
  end;
end
```

Of course, you can also use the `consumer-restriction` plugin to restrict the Consumer's permissions in this process.

## Key factors affecting gateway selection under CDN business

As an enterprise user of Apache APISIX, and a business scenario of scenario-based CDN for cloud storage and multi-line processing, YapiCloud also shares some of their criteria for gateway product selection.

### Stability

As the external distribution of business on the cloud, the first thing that matters is stability. A stable gateway business products, in addition to ensure the external user experience, but also to ensure that the company's internal business deployment of operation and maintenance costs can be effectively controlled. Especially for some companies that are small or have few O&M team members, stability is the key factor to be considered first.

### Open source and scalability

For the technical team, open source or not also becomes an important factor in gateway selection. Thanks to the active nature of the community, the first feedback to the community when a bug appears is usually responded to quickly. Unlike closed-source software, if a bug appears, you may not know how long you have to wait to receive a new version with bug fixes after feedback through official channels. Especially for the cloud business processing situation, the response speed is directly related to the company's business.

At the same time, the high scalability of open source also brings developers more convenient adaptation and integration. Multi-language extensions such as Apache APISIX facilitate the development of more features based on APISIX for their business scenarios. While reducing development costs, it also improves the convenience for subsequent feature iterations and maintenance.

## Summary

We hope that this series of user cases will provide some ideas and directions for you in the process of gateway selection.We hope that this series of user cases will provide some ideas and directions for you in the gateway selection process.

At the same time, Apache APISIX also welcomes users who are using APISIX to actively participate in sharing related user cases and practices, and feel free to start discussions in [GitHub Discussions](https://github.com/apache/apisix/discussions) or communicate via [mailing list](https://apisix.apache.org/zh/docs/general/join).
