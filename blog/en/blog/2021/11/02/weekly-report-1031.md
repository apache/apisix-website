---
title: Weekly Report (Oct.15 - Oct.31)
keywords:
- Apache APISIX
- Weekly Report
- Contributor
- APISIX
- API Gateway
- Apache
description: The Apache APISIX Community Weekly Report hopes to help community members better understand the weekly progress of the Apache APISIX community.
tags: [Community]
---

> From 10.15 to 10.31, 31 contributors submitted 93 commits for Apache APISIX. Thank you all for your contributions to Apache APISIX. It is your selfless contribution to make the Apache APISIX project better!

<!--truncate-->

## Introduction

Apache APISIX has grown as a community from the first day of open source and has quickly become the most active open source API gateway project in the world. These achievements cannot be achieved without the joint efforts of our community partners.

"If you want to go fast, go alone.If you want to go far, go together." The Apache APISIX Community Weekly Report hopes to help community members better understand the weekly progress of the Apache APISIX community and and facilitate everyone to participate in the Apache APISIX community.

We have also compiled some issues suitable for newcomers to the community to participate in! If you are interested, don't miss it!

## Contributor Statistics

![Contributors List](https://static.apiseven.com/202108/1635733917401-732f84d0-24a1-4c31-acea-4e45f5e56816.png)

![New Contributors](https://static.apiseven.com/202108/1635735281818-c6cb23ce-4242-44ee-a569-38a46b607253.31eng)

## Good first issue

### Issue #686

**Link**: https://github.com/apache/apisix-website/issues/686

**Issue description**: In order to speed up the loading speed of pictures/images on the Apache APISIX official website, we need to migrate all pictures/images to CDN.

### Issue #5305

**Link**: https://github.com/apache/apisix/issues/5305

**Issue description**:

Currently I has test the proxy-mirror plugin in apisix, but I find that the feature of this plugin is different from the ngx_http_mirror_module in nginx. The mirror moudle of nginx can add the uri behind the host in "proxy_pass" directive, for example:

```Groovy
location / {
mirror /mirror;
proxy_pass http://backend;
}

location = /mirror {
internal;
proxy_pass http://test_backend$request_uri;
}
```

But when I test the proxy-mirror plugin in apisix dashboard, it prompts a message that the blank cannot be filled with URI. Will the proxy-mirror plugin be optimized to support the URI?

![Issue Screenshot](https://static.apiseven.com/202108/1635734126653-8fe4c1e7-5b9a-4e78-b747-fb30cbae7f36.png)

### Issue #5342

**Link**: https://github.com/apache/apisix/issues/5342

**Issue description**: Share limit counter between routes.

To do this, you need to specify the key of the route's corresponding limit-count in lrucache so that the same limit object is shared across multiple routes. lrucache keys (hereafter called groups to distinguish them from limit keys) are currently generated automatically, ensuring that each route's group is independent. For this change, we need to be able to specify the group in the limit-count.

```yaml
"limit-count": {
        "group": "group_id_blah"
        "count": 2,
        "time_window": 60,
        "rejected_code": 503,
        "key": "remote_addr"
}
```

Note that the configuration of the same group needs to be the same, which currently needs to be guaranteed by the caller, otherwise the limit object obtained by the group will be different from the configuration.

### Issue #5343

**Link**: https://github.com/apache/apisix/issues/5343

**Issue description**: Add a request_body switch to the schema, and each body can be used by expr to decide whether to log or not. Without this switch, the body is not logged.

```json
"kafka-logger": {
   "broker_list":{
       "127.0.0.1":9092
    },
   "kafka_topic" : "test2",
   "request_body": {
       "expr": [
          ["request_length", "<", "1024"],
       ]
   },
   "key" : "key1",
   "batch_max_size": 1,
   "name": "kafka logger"
}
```

`expr` can be evaluated by lua-resty-expr. request body can be fetched by core.request.get_body.

## Highlights of Recent Features

- [APISIX Ingress introduces custom resources of ApisixRoute v2beta2 version, and discards the backend field](https://github.com/apache/apisix-ingress-controller/pull/698)（Contributor: [tao12345666333](https://github.com/tao12345666333)）

- [APISIX Ingress upgraded the CRD resource version to v1 to better support K8s v1.22 and above](https://github.com/apache/apisix-ingress-controller/pull/697)（Contributor: [tao12345666333](https://github.com/tao12345666333)）

- [APISIX Ingress adds documentation on how to use gRPC proxy](https://github.com/apache/apisix-ingress-controller/pull/699)（Contributor: [gxthrj](https://github.com/gxthrj)）

- [APISIX Dashboard supports proto management API](https://github.com/apache/apisix-dashboard/pull/2099)（Contributor: [bzp2010](https://github.com/bzp2010)）

- [APISIX Dashboard supports transferring dashboard static resources as gzip](https://github.com/apache/apisix-dashboard/pull/2178)（Contributor: [nic-6443](https://github.com/nic-6443)）

The Apache APISIX project website and the Github issue have accumulated a wealth of documentation and experience, so if you encounter problems, you can read the documentation, search the issue with keywords, or participate in the discussion on the issue to put forward your own ideas and practical experience.

## Recent Blog Recommendations

- [Apache APISIX Extensions Guide](http://apisix.apache.org/blog/2021/10/29/Extension-guide)：

  This article provides an extension guide for Apache APISIX, aiming to provide users with some ideas for extending Apache APISIX.

- [From 0 to 1, How APISIX Ingress Has Grown and Gained Since Joining The Community](https://apisix.apache.org/blog/2021/10/26/APISIX-Ingress/)：

  This article describes the growth of APISIX Ingress and the details of the enhancements and community help that APISIX Ingress has received since joining the community.

- [Tutorial: How to use Cert Manager to manage certificates in Apache APISIX Ingress Controller](https://apisix.apache.org/blog/2021/10/22/cert-manager-in-ingress/)：

  This article shows how to create a certificate and pair it with Apache APISIX Ingress Controller via the Cert Manager.
