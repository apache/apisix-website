---
title: Geo-routing with Apache APISIX
authors:
  - name: Nicolas Fränkel
    title: Author
    url: https://github.com/nfrankel
    image_url: https://avatars.githubusercontent.com/u/752258
keywords:
  - Georouting
  - GeoIP
  - Nginx
description: Apache APISIX, the Apache-led API Gateway, comes out of the box with many plugins to implement your use case. Sometimes, however, the plugin you're looking for is not available. While creating your own is always possible, it's sometimes necessary. Today, I'll show you how to route users according to their location without writing a single line of Lua code.
tags: [Case Studies]
image: https://repository-images.githubusercontent.com/560493734/4073382d-d3de-42b8-aa58-d0a139978768
---

> Apache APISIX, the Apache-led API Gateway, comes out of the box with many plugins to implement your use case. Sometimes, however, the plugin you're looking for is not available. While creating your own is always possible, it's sometimes necessary. Today, I'll show you how to route users according to their location without writing a single line of Lua code.

<!--truncate-->

<head>
    <link rel="canonical" href="https://blog.frankel.ch/georouting-apisix/" />
</head>

## Why geo-routing?

Geo-routing is to forward HTTP requests based on a user's physical location, inferred from their IP. There are many reasons to do that, and here is a couple of them.

Note that I'll use the country as the location-dependent factor, but any smaller or bigger scale works. It's the scale I'm most familiar with - and probably the most useful.

First, most applications are not meant to be geo-dependent. The app your team has just developed probably only makes sense in a single country, if not a single region. In this case, geo-routing will never be a problem.

However, some apps do grow along with the business. When it happens, the need for [internationalization and localization](https://en.wikipedia.org/wiki/Internationalization_and_localization) appears. It's the app's responsibility to handle such geo-dependent factors. <abbr title="internationalization">i18n</abbr> should be handled natively by the tech stack, _e.g._, in [Java](https://docs.oracle.com/javase/8/docs/technotes/guides/intl/index.html). <abbr title="localization">l10n</abbr> is more _ad hoc_ but shouldn't be a problem either.

Issues arise when business rules diverge from country to country, chiefly because of laws. Other reasons include a partnership. Imagine an e-commerce shop that has branches in many countries. You may choose the delivery partner, but depending on the country, available partners are different. While keeping a single codebase is always a wise choice, even the best design can only slow down the chaos from many business rules. At one point, splitting the God app into multiple country-dependent apps is inevitable.

Sometimes, you don't even have a choice. A country decides you have to store your database on their territory, so you cannot share it anymore and have to split both storage and app. I witnessed it first-hand with Russia in 2015: we had to deploy a custom version of our e-commerce application just for Russia.

Finally, you may also want to deploy a new app version for a single country only. In this case, you should monitor not (only) technical metrics but business ones over time. Then you'll decide whether to expand the new version to other countries based on them or work more on the latest version before deploying further.

## Setting up Apache APISIX for geo-routing

Though I'm a developer by trade (and passion!), I'm pragmatic. I'm convinced that every line of code I don't write is a line I don't need to maintain. Apache APISIX doesn't offer geo-routing, but it's built on top of Nginx. The latter provides a [geo-routing](http://nginx.org/en/docs/http/ngx_http_geoip_module.html) feature, albeit not by default.

The following instructions are based on Docker to allow everybody to follow them regardless of their platform.

We need several steps to set up geo-routing on Apache APISIX:

1. Create a custom Docker image
    * Add the required library module
    * Add its dependencies
2. Configure Apache APISIX
3. Enjoy!

Nginx geo-routing requires the `ngx_http_geoip_module` module. But if we try to install it via a package manager, it also installs `nginx`, which conflicts with the `nginx` instance embedded in Apache APISIX. As we only need the library, we can get it from the relevant Docker image:

```Dockerfile
FROM nginx:1.21.4 as geoiplib

FROM apache/apisix:2.15.0-debian

COPY --from=geoiplib /usr/lib/nginx/modules/ngx_http_geoip_module.so \      #1
                     /usr/local/apisix/modules/ngx_http_geoip_module.so
```

Copy the library from the `nginx` image to the `apache/apisix` one

The regular package install installs all the dependencies, even the ones we don't want. Because we only copy the library, we need to install the dependencies manually. It's straightforward:

```Dockerfile
RUN apt-get update \
 && apt-get install -y libgeoip1
```

Nginx offers two ways to activate a module: via the command line or dynamically in the `nginx.conf` configuration file. The former is impossible since we're not in control, so the latter is our only option. To update the Nginx config file with the module at startup time, Apache APISIX offers a hook in its config file:

```yaml
nginx_config:
  main_configuration_snippet: |
    load_module     "modules/ngx_http_geoip_module.so";
```

The above will generate the following:

```
# Configuration File - Nginx Server Configs
# This is a read-only file, do not try to modify it.
master_process on;

worker_processes auto;
worker_cpu_affinity auto;

# main configuration snippet starts
load_module     "modules/ngx_http_geoip_module.so";

...
```

The [GeoIP module](http://nginx.org/en/docs/http/ngx_http_geoip_module.html) relies on the [Maxmind GeoIP database](https://dev.maxmind.com/geoip/geolite2-free-geolocation-data). We installed it implicitly in the previous step; we have to configure the module to point to it:

```yaml
nginx_config:
  http_configuration_snippet: |
    geoip_country   /usr/share/GeoIP/GeoIP.dat;
```

From this point on, every request going through Apache APISIX is geo-located. It translates as Nginx adding additional variables. As per the documentation:

>The following variables are available when using this database:
>
>`$geoip_country_code`
> two-letter country code, for example, `"RU"`, `"US"`.
>`$geoip_country_code3`
> three-letter country code, for example, `"RUS"`, `"USA"`.
>`$geoip_country_name`
> country name, for example, `"Russian Federation"`, `"United States"`.
>
> -- [Module ngx_http_geoip_module](http://nginx.org/en/docs/http/ngx_http_geoip_module.html)

## Testing geo-routing

You may believe that the above works - and it does, but I'd like to prove it.

I've created a [dedicated project](https://github.com/ajavageek/apisix-georouting) whose architecture is simple:

* Apache APISIX configured as above
* Two upstreams, one in English and one in French

```yaml
upstreams:
  - id: 1
    type: roundrobin
    nodes:
      "english:8082": 1
  - id: 2
    type: roundrobin
    nodes:
      "french:8081": 1
routes:
  - uri: /
    upstream_id: 1
  - uri: /
    upstream_id: 2
#END
```

With this snippet, every user accesses the English upstream. I intend to direct users located in France to the French upstream and the rest to the English one. For this, we need to configure the second route:

```yaml
routes:
  - uri: /
    upstream_id: 2
    vars: [["geoip_country_code", "==", "FR"]]   #1
    priority: 5                                  #2
```

1. The magic happens here; see below.
2. By default, route matching rules are evaluated in arbitrary order. We need this rule to be evaluated first. So we increase the priority - the default is 10.

Most Apache APISIX users are used to matching on routes, methods, and domains, but there's [more to it](https://apisix.apache.org/docs/apisix/admin-api/#uri-request-parameters). One can match on Nginx variables, as shown above. In our case, the route matches if the `geoip_country_code` variable is equal to `"FR"`.

Note that `vars` values readability over power. Use the `filter_func(vars)` attribute if you need more complex logic.

We can still not test our feature at this point, as we would need to change our IP address. Fortunately, it's possible to cheat (a bit), and the cheat is helpful in other scenarios. Imagine that Apache APISIX is not directly exposed to the Internet but sits behind a reverse proxy. There might be multiple reasons for this: "history", a single RP pointing to multiple gateways under the responsibility of different teams, etc.

In this case, the client IP would be the RP's proxy. To propagate the original client IP, the agreed-upon method is to add an `X-Forwarded-For` request HTTP header:

>The X-Forwarded-For (XFF) request header is a de-facto standard header for identifying the originating IP address of a client connecting to a web server through a proxy server.
>
>When a client connects directly to a server, the client's IP address is sent to the server (and is often written to server access logs). But if a client connection passes through any forward or reverse proxies, the server only sees the final proxy's IP address, which is often of little use. That's especially true if the final proxy is a load balancer which is part of the same installation as the server. So, to provide a more-useful client IP address to the server, the `X-Forwarded-For` request header is used.
>
> -- [X-Forwarded-For](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-For)

The Nginx module offers this configuration but restricts it to an IP range. For testing, we configure it to _any_ IP; in production, we should set it to the RP IP.

```yaml
nginx_config:
  http:
    geoip_proxy     0.0.0.0/0;
```

We can finally test the setup:

```bash
curl localhost:9080
```

```
{
  "lang": "en",
  "message": "Welcome to Apache APISIX"
}
```

```bash
curl -H "X-Forwarded-For: 212.27.48.10" localhost:9080    #1
```

1. `212.27.48.10` is a French IP address

```
{
  "lang": "fr",
  "message": "Bienvenue à Apache APISIX"
}
```

## Bonus: logs and monitoring

It's straightforward to use the new variable in the Apisix logs. I'd advise it for two reasons:

* At the beginning to make sure everything is ok
* In the long run, to monitor traffic, _e.g._, send it to Elasticsearch and display it on a Kibana dashboard

Just configure it accordingly:

```yaml
nginx_config:
  http:
    access_log_format: "$remote_addr - $remote_user [$time_local][$geoip_country_code] $http_host \"$request\" $status $body_bytes_sent $request_time \"$http_referer\" \"$http_user_agent\" $upstream_addr $upstream_status $upstream_response_time"
```

Keep the default log variables and add the country code

## Conclusion

Geo-routing is a requirement for successful apps and businesses. Apache APISIX doesn't provide it out-of-the-box. In this post, I showed how it could still be straightforward to set it up using the power of Nginx.

You can find the source code for this post on GitHub.

**To go further:**

* [Module ngx_http_geoip_module](http://nginx.org/en/docs/http/ngx_http_geoip_module.html)
* [Converting Static Modules to Dynamic Modules](https://www.nginx.com/resources/wiki/extending/converting/)
* [Customize Nginx configuration](https://apisix.apache.org/docs/apisix/customize-nginx-configuration/)
* [GeoIP Update](https://github.com/maxmind/geoipupdate)
