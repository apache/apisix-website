---
title: Apache APISIX without etcd
authors:
  - name: Nicolas Fränkel
    title: Author
    url: https://github.com/nfrankel
    image_url: https://avatars.githubusercontent.com/u/752258
keywords:
  - Architecture
  - etcd
  - MySQL
description: >
  While a great database, etcd is not devoid of issues. In this post, I'll show how you can use Apache APISIX with MySQL.
tags: [Ecosystem]
image: https://static.apiseven.com/uploads/2023/07/26/T33IqLZ8_information-1641937.jpg
---

>While a great database, etcd is not devoid of issues. In this post, I'll show how you can use Apache APISIX with MySQL.

<!--truncate-->

<head>
    <link rel="canonical" href="https://blog.frankel.ch/apisix-without-etcd/" />
</head>

[etcd](https://etcd.io/) is an excellent key-value distributed database used internally by Kubernetes and managed by the CNCF. It's a great option, and that's the reason why Apache APISIX uses it too. Yet, it's not devoid of issues.

First, some mention scalability, but one can expect this from a distributed data store that values consistency. Another issue may be the need for more familiarity with etcd. It's relatively new, so your Ops team may need help operating it correctly while having decades of operating MySQL or Postgres. Finally, only a few etcd users are aware that it lacks maintainers:

>In the last few months, primary maintainers G.L. (Amazon, announcement) and S.B. (Red Hat) have stopped actively participating in the project. This leaves the project with only one active and two occasionally-reviewing maintainers, M.S. (Google),  P.T. (Google), both are relatively new to the project (1 month and 1 year of tenure) and S.P.Z. (IBM). Other maintainers are either dormant or have very minimal activity over the last six months. **The project is effectively unmaintained** _(emphasis mine)_.
>
>-- [Google Groups of Kubernetes Steering Committee, March 2022](https://groups.google.com/a/kubernetes.io/g/steering/c/e-O-tVSCJOk/m/N9IkiWLEAgAJ)

For all those reasons, you may prefer to use a standard SQL database with Apache APISIX. In this post, I'll show how you can use MySQL.

## The kine project

It would be a lot of effort if each product had to introduce an abstraction layer and different adapters for both etcd and other databases. kine is a project that aims to offer a translation step between etcd calls and other implementations:

> Kine is an etcdshim that translates etcd API to:
>
> * SQLite
> * Postgres
> * MySQL
> * NATS Jetstream
>
> **Features**
>
> * Can be ran standalone so any k8s (not just K3s) can use Kine
> * Implements a subset of etcdAPI (not usable at all for general purpose etcd)
> * Translates etcdTX calls into the desired API (Create, Update, Delete)
>
>-- [Kine (Kine is not etcd)](https://github.com/k3s-io/kine)

In essence, kine is a Go library that translates etcd calls to the datastore you want (among those implemented).

Yet, using kine directly is a non-trivial effort. Fortunately, [api7](https://api7.ai/), the company that gave Apache APISIX to the Apache Software Foundation, provides a component already focused on APISIX usage.

## ETCD adapter

ETCD adapter wraps kine to be APISIX-specific:

>ETCD Adapter mimics the ETCD V3 APIs best effort. It incorporates the kine as the Server side implementation, and it develops a totally in-memory watchable backend.
>
>Not all features in ETCD V3 APIs supported, this is designed for Apache APISIX, so it's inherently not a generic solution.
>
>-- [ETCD adapter](https://github.com/api7/etcd-adapter/)

Two things of note:

* At the moment of this writing, the adapter supports either local in-memory storage or MySQL
* It's available as an embeddable library but also as a standalone component

Therefore, we can design our architecture as the following:

![Overall architecture](https://static.apiseven.com/uploads/2023/07/26/aioB38NC_overall-architecture.svg)

## Demo

Let's implement the above architecture with an additional admin UI over MySQL. I'll use Docker Compose:

```yaml
version: "3"

services:
  apisix:
    image: apache/apisix:3.4.0-debian                         #1
    volumes:
      - ./config.yaml:/usr/local/apisix/conf/config.yaml:ro
    ports:
      - "9080:9080"
      - "9180:9180"
    depends_on:
      - etcd-adapter
    restart: always                                           #2
  etcd-adapter:
    build: ./etcd-adapter                                     #3
    volumes:
      - ./adapter.yml:/etcd-adapter/conf/config.yaml:ro       #4
    depends_on:
      - mysql
    restart: always                                           #2
  mysql:
    image: bitnami/mysql:8.0                                  #5
    ports:
      - "3306:3306"
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_USER: etcd
      MYSQL_PASSWORD: etcd
      MYSQL_DATABASE: apisix
  adminer:
    image: adminer:standalone                                 #6
    ports:
      - "8080:8080"
    environment:
      ADMINER_DEFAULT_SERVER: mysql
    depends_on:
      - mysql
```

1. Latest version of Apache APISIX, yeah!
2. To avoid any failure with dependencies between containers, restart until it works. Kubernetes's manifests would involve health checks
3. api7.ai still needs to provide a container. We need to build from the source code
4. Override the default configuration file with a context-specific one
5. The regular MySQL image didn't work for me. Let's take the one from Bitnami
6. Adminer, formerly known as PHP myAdmin, will help to visualize the database state

ETCD-adapter's configuration looks like this:

```yaml
server:
  host: 0.0.0.0                 #1
  port: 12379

log:
  level: info

datasource:
  type: mysql                   #2
  mysql:
    host: mysql                 #3
    port: 3306                  #3
    username: etcd              #3
    password: etcd              #3
    database: apisix
```

1. Bind any IP since Docker will assign a random one
2. Implementation type. The default is `btree`; we need to change it.
3. As configured in the `docker-compose.yml` file

Finally, here's Apache APISIX configuration:

```yaml
deployment:
  admin:
    allow_admin:
      - 0.0.0.0/0
  etcd:
    host:
      - "http://etcd-adapter:12379"   #1
```

1. Use this etcd instance, which is the adapter

## Testing

Now that we are set let's test our system by creating a route:

```bash
curl -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '{
  "methods": ["GET"],
  "uris": ["/get"],
  "upstream": {
    "nodes": {
      "httpbin.org:80": 1
    }
  }
}' http://localhost:9180/apisix/admin/routes/1
```

We can now get it:

```bash
curl -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' http://localhost:9180/apisix/admin/routes/1
```

We can also check via the Adminer interface that it has been persisted via MySQL:

![Adminer screenshot displaying the new route](https://static.apiseven.com/uploads/2023/07/26/PaAJJVIM_adminer.jpg)

Unfortunately, we need to stop at this point. Getting all routes doesn't work:

```bash
curl -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' http://localhost:9180/apisix/admin/routes
```

```json
{"header":{"revision":"1689689596"},"message":"Key not found"}
```

Worse, using the route fails:

```bash
curl localhost:9080/get
```

```json
{"error_msg":"404 Route Not Found"}
```

## Conclusion

etcd is an excellent piece of infrastructure Kubernetes uses, but there might be better choices in some contexts. Worse, it might become a security threat in the future - or is already one, because of the lack of maintenance. Being able to move away from etcd is a considerable benefit.

kine offers an etcd-compatible facade and multiple implementations. Using kine with Apache APISIX requires some adaptation effort, already done in ETCD-Adapter.

Currently, ETCD-Adapter is not feature-complete (to say the least) and requires more love. That's why it was not donated to the Apache Foundation yet. If you're a Go developer and are interested in the project, feel free to subscribe to the [Apache APISIX mailing list and/or join our Slack](https://apisix.apache.org/docs/general/join/) to offer your help.

The complete source code for this post can be found on GitHub:

{% embed https://github.com/ajavageek/apisix-mysql %}

**To go further:**

* [Kine](https://github.com/k3s-io/kine)
* [ETCD Adapter](https://github.com/api7/ETCD-adapter)
* [Goodbye etcd, Hello PostgreSQL: Running Kubernetes with an SQL Database](https://martinheinz.dev/blog/100)
