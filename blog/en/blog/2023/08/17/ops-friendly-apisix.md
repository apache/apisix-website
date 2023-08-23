---
title: Ops friendly Apache APISIX
authors:
  - name: Nicolas Fränkel
    title: Author
    url: https://github.com/nfrankel
    image_url: https://avatars.githubusercontent.com/u/752258
keywords:
  - Operations
  - Ops
  - DevOps
  - Configuration
description: >
  Though I always worked on the Dev side of IT, I was also interested in the Ops side. I even had a short experience being a WebSphere admin: I used it several times, helping Ops deal with the Admin console while being a developer.
  Providing a single package that Ops can configure and deploy in different environments is very important. As a JVM developer, I've been happy using Spring Boot and its wealth of configuration options: command-line parameters, JVM parameters, files, profiles, environment variables, etc.
  In this short post, I'd like to describe how you can do the same with Apache APISIX in the context of containers.
tags: [Ecosystem]
image: https://static.apiseven.com/2022/10/19/634f6677742a1.png
---

>Though I always worked on the Dev side of IT, I was also interested in the Ops side. I even had a short experience being a WebSphere admin: I used it several times, helping Ops deal with the Admin console while being a developer.
>
>Providing a single package that Ops can configure and deploy in different environments is very important. As a JVM developer, I've been happy using Spring Boot and its wealth of configuration options: command-line parameters, JVM parameters, files, profiles, environment variables, etc.
>
>In this short post, I'd like to describe how you can do the same with Apache APISIX in the context of containers.

<!--truncate-->

<head>
    <link rel="canonical" href="https://blog.frankel.ch/ops-friendly-apisix/" />
</head>

## File-based configuration

The foundation of configuring Apache APISIX is file-based. The default values are found in the `/usr/local/apisix/conf/apisix/config-default.yaml` configuration file. For example, by default, Apache APISIX runs on port `9080`, and the admin port is `9180`. That's because of the default configuration:

```yaml
apisix:
  node_listen:
    - 9080           #1

#...

deployment:
  admin:
    admin_listen:
      ip: 0.0.0.0
      port: 9180     #2
```

1. Regular port
2. Admin port

To override values, we need to provide a file named `config.yaml` in the `/usr/local/apisix/conf/apisix` directory:

```yaml
apisix:
  node_listen:
    - 9090           #1
deployment:
  admin:
    admin_listen:
      port: 9190     #1
```

1. Override values

Now, Apache APISIX should run on port `9090`, and the admin port should be `9190`. Here's how to run the Apache APISIX container with the above configuration:

```bash
docker run -it --rm apache/apisix:3.4.1-debian \
                 -p 9090:9090 -p 9190:9190 \
                 -v ./config.yaml:/usr/local/apisix/conf/apisix/config.yaml
```

## Environment-based configuration

The downside of a pure file-based configuration is that you must provide a dedicated file for each environment, even if only a single parameter changes. Apache APISIX allows replacement via environment variables in the configuration file to account for that.

```yaml
apisix:
  node_listen:
    - ${{APISIX_NODE_LISTEN:=}}                  #1
deployment:
  admin:
    admin_listen:
      port: ${{DEPLOYMENT_ADMIN_ADMIN_LISTEN:=}} #1
```

1. Replace the placeholder with its environment variable value at runtime

We can reuse the same file in every environment and hydrate it with the context-dependent environment variables:

```bash
docker run -it --rm apache/apisix:3.4.1-debian \
                 -e APISIX_NODE_LISTEN=9090 \
                 -e DEPLOYMENT_ADMIN_ADMIN_LISTEN=9190 \
                 -p 9090:9090 -p 9190:9190 \
                 -v ./config.yaml:/usr/local/apisix/conf/apisix/config.yaml
```

Icing on the cake, we can also offer a default value:

```yaml
apisix:
  node_listen:
    - ${{APISIX_NODE_LISTEN:=9080}}                  #1
deployment:
  admin:
    admin_listen:
      port: ${{DEPLOYMENT_ADMIN_ADMIN_LISTEN:=9180}} #1
```

1. If no environment variable is provided, use those ports; otherwise, use the environment variables' value

The trick works in standalone mode with the `apisix. yaml` file. You can parameterize every context-dependent variable **and** secrets with it:

```yaml
routes:
  - uri: /*
    upstream:
      nodes:
        "httpbin:80": 1
    plugins:
      openid-connect:
        client_id: apisix
        client_secret: ${{OIDC_SECRET}}
        discovery: https://${{OIDC_ISSUER}}/.well-known/openid-configuration
        redirect_uri: http://localhost:9080/callback
        scope: openid
        session:
          secret: ${{SESSION_SECRET}}
```

## Conclusion

When configuring Apache APISIX, we should ensure it's as operable as possible. In this post, I've described several ways to make it so.

Happy Apache APISIX!

**To go further:**

* [Default configuration](https://github.com/apache/apisix/blob/master/conf/config-default.yaml)
* [Configuration file switching based on environment variables](https://apisix.apache.org/docs/apisix/profile/)
