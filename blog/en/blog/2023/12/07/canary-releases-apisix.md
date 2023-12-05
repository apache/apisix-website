---
title: Canary releases with Apache APISIX
authors:
  - name: Nicolas Fränkel
    title: Author
    url: https://github.com/nfrankel
    image_url: https://avatars.githubusercontent.com/u/752258
keywords:
  - DevOps
  - Canary releases
  - Deployment strategies
description: >
  In a few words, the idea of canary releases is to deliver a new software version to only a fraction of the users, analyze the results, and decide whether to proceed further or not. If results are not aligned with expectations, roll back; if they are, increase the number of users exposed until all users benefit from the new version.
  In this post, I'd like to detail this introduction briefly, explain different ways to define the fraction, and show how to execute it with Apache APISIX.
tags: [Ecosystem]
image: https://static.apiseven.com/uploads/2023/12/05/OH9weScF_bird-5285011.jpg
---

>In a few words, the idea of canary releases is to deliver a new software version to only a fraction of the users, analyze the results, and decide whether to proceed further or not. If results are not aligned with expectations, roll back; if they are, increase the number of users exposed until all users benefit from the new version.
>
>In this post, I'd like to detail this introduction briefly, explain different ways to define the fraction, and show how to execute it with Apache APISIX.

<!--truncate-->

<head>
    <link rel="canonical" href="https://blog.frankel.ch/canary-releases-apisix/" />
</head>

## Introduction to canary releases

The term "canary" originates from the coal mining industry. When mining, it's not uncommon to release toxic gases: In a small enclosed space, it can mean quick death. Worse, the gas may be odorless, so miners would breathe it until it was too late to leave. Carbon monoxide is quite common in coal mines and is not detectable by human senses.

For this reason, miners brought canaries with them underground. If the canary suddenly dropped dead, chances were high that such a gas pocket had been breached, and it was high time to leave the place.

Years ago, we brought this approach to releasing a new software version. The analogy goes like this: miners are the Ops team deploying the version, the canary consists of all tools to measure the impact of the release, and the gas is a (critical) bug.

The most crucial part is that **you need to measure the impact** of the release, including failure rates, HTTP status codes, etc., and compare them with those of the previous version. It's outside the scope of this post, but again, it's critical if you want to benefit from canary releases. The second most important part is the ability to roll back fast if the new version is buggy.

## Canary releases vs. feature flags

Note that canary releases are not the only way to manage the risk of releasing new code. For example, feature flags are another popular way:

* The canary approach delivers the complete set of features in the new component version
* Feature flags deploy the component as well, but dedicated configuration parameters allow activating and deactivating each feature individually

Feature flags represent a more agile approach (in the true sense of the word) toward rollbacks. If one feature out of 10 is buggy, you don't need to undeploy the new version; you only deactivate the buggy feature. However, this superpower comes at the cost of additional codebase complexity, regardless of whether you rely on third-party products or implement it yourself.

On the other hand, canary requires a mature deployment pipeline to be able to deploy and undeploy at will.

## Approaches to canary releases

The idea behind canary releases is to allow only a fraction of users to access the new version. Most canary definitions only define "fraction" as a percentage of users. However, there's more to it.

The first step may be to allow only vetted users to check that the deployment in the production environment works as expected. In this case, you may forward only a specific set of internal users, _e.g._, testers, to the new version. If you know the people in advance, and the system authenticates users, you can configure it by identity; if not, you need to fallback to some generic way, _e.g._, HTTP headers - `X-Canary: Let-Me-Go-To-v2`.

Remember that we must monitor the old and the new systems to look at discrepancies. If nothing shows up, it's an excellent time to increase the pool of users forwarded to the new version. I assume you eat your own dog food, _i.e._; team members use the software they're developing. If you don't, for example, an e-commerce site for luxury cars, you're welcome to skip this section.

To enlarge the fraction of users while limiting the risks, we can now indiscriminately provide the new version to internal users. We can configure the system to forward to the new version based on the client IP to do this. At a time when people were working on-site, it was easy as their IPs were in a specific range. Remote doesn't change much since users probably access the company's network via a VPN.

Again, monitor and compare at this point.

## The whole nine yards

At this point, everything should work as expected for internal users, either a few or all. But just as no plan survives contact with the enemy, no usage can mimic the whole diversity of a production workload. In short, we need to let regular users access the new version, but in a controlled way, just as we gradually increased the number of users so far: start with a small fraction, monitor it, and if everything is fine, increase the fraction.

Here's how to do it with Apache APISIX. Apache APISIX offers a plugin-based architecture and provides a plugin that caters to our needs, namely the `traffic-split` plugin.

>The `traffic-split` Plugin can be used to dynamically direct portions of traffic to various Upstream services.
>
>This is done by configuring `match`, which are custom rules for splitting traffic, and `weighted_upstreams` which is a set of Upstreams to direct traffic to.
>
>-- [traffic-split](https://apisix.apache.org/docs/apisix/plugins/traffic-split/)

Let's start with some basic upstreams, one for each version:

```yaml
upstreams:
  - id: v1
    nodes:
      "v1:8080": 1
  - id: v2
    nodes:
      "v2:8080": 1
```

We can use the `traffic-split` plugin to forward most of the traffic to v1 and a fraction to v2:

```yaml
routes:
  - id: 1
    uri: "*"                                                     #1
    upstream_id: v1
    plugins:
      traffic-split:
        rules:
          - weighted_upstreams:                                  #2
            - upstream_id: v2                                    #3
              weight: 1                                          #3
            - weight: 99                                         #3
```

1. Define a catch-all route
2. Configure how to split traffic; here, weights
3. Forward 99% of the traffic to v1 and 1% to v1. Note that the weights are relative to each other. To achieve 50/50, you can set weights 1 and 1, 3 and 3, 50 and 50, etc.

Again, we monitor everything and make sure results are as expected. Then, we can increase the fraction of the traffic forwarded to v2, _e.g._:

```yaml
routes:
  - id: 1
    uri: "*"
    upstream_id: v1
    plugins:
      traffic-split:
        rules:
          - weighted_upstreams:
            - upstream_id: v2
              weight: 5                                          #1
            - weight: 95                                         #1
```

1. Increase the traffic to v2 to 5%

Note that Apache APISIX reloads changes to the file above every second. Hence, you split traffic in near-real time. Alternatively, you can use the Admin API to achieve the same.

## More controlled releases

In the above, I moved from internal users to a fraction of external users. Perhaps releasing to every internal user is too big a risk in your organization, and you need even more control. Note that you can further configure the `traffic-split` plugin in this case.

```yaml
routes:
  - id: 1
    uri: /*
    upstream_id: v1
    plugins:
      traffic-split:
        rules:
          - match:
            - vars: [["http_X-Canary","~=","Let-Me-Go-To-v2"]]   #1
          - weighted_upstreams:
            - upstream_id: v2
              weight: 5
            - weight: 95
```

1. Only split traffic if the `X-Canary` HTTP header has the configured value.

The following command always forwards to v1:

```bash
curl http://localhost:9080
```

The following command also always forwards to v1:

```bash
curl -H 'X-Canary: Let-Me-Go-To-v1' http://localhost:9080
```

The following command splits the traffic according to the configured weights, _i.e._, 95/5:

```bash
curl -H 'X-Canary: Let-Me-Go-To-v2' http://localhost:9080
```

## Conclusion

This post explained canary releases and how you can configure one via Apache APISIX. You can start with several routes with different priorities and move on to the `traffic-split` plugin.  The latter can even be configured further to allow more complex use cases.

The complete source code for this post can be found on [GitHub](https://github.com/ajavageek/canary-release).

**To go further:**

* [CanaryRelease on Martin Fowler's bliki](https://martinfowler.com/bliki/CanaryRelease.html)
* [traffic-split](https://apisix.apache.org/docs/apisix/plugins/traffic-split/)
* [Implementation of canary release solution based on Apache APISIX](https://apisix.apache.org/blog/2022/06/14/how-mse-supports-canary-release-with-apache-apisix/)
* [Canary Release in Kubernetes With Apache APISIX Ingress](https://navendu.me/posts/canary-in-kubernetes/)
* [Smooth Canary Release Using APISIX Ingress Controller with Flagger](https://api7.ai/blog/apisix-ingress-and-flagger-smooth-canary-release)
* [Apache APISIX Canary Deployments](https://fluxcd.io/flagger/tutorials/apisix-progressive-delivery/)
