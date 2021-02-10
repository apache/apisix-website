---
id: downloads
title: Downloads
---

Apache APISIX is a dynamic, real-time, high-performance Cloud-Native API gateway, based on the Nginx library and etcd.

Apache APISIX software provides rich traffic management features such as load balancing, dynamic upstream, canary release, circuit breaking, authentication, observability, and more.

Use the links below to download the Apache APISIX™ from one of our mirrors.

## APISIX™

| Version | Release Date | Downloads                                                                                                                                                                                                                                              |
| ------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 2.3     | 10/02/2021   | [source](https://www.apache.org/dyn/closer.cgi/apisix/2.3/apache-apisix-2.3-src.tgz) ([asc](https://downloads.apache.org/apisix/2.3/apache-apisix-2.3-src.tgz.asc) [sha512](https://downloads.apache.org/apisix/2.3/apache-apisix-2.3-src.tgz.sha512)) |

## APISIX™ Dashboard

| Version | Release Date | Downloads                                                                                                                                                                                                                                                                                                                               |
| ------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2.3     | 11/01/2021   | [source](https://www.apache.org/dyn/closer.cgi/apisix/dashboard/2.3/apisix-dashboard-2.3-src.tgz) ([asc](https://downloads.apache.org/apisix/dashboard/2.3/apisix-dashboard-2.3-src.tgz.asc) [sha512](https://downloads.apache.org/apisix/dashboard/2.3/apisix-dashboard-2.3-src.tgz.sha512))                                           |
| 2.2     | 16/12/2020   | [source](https://www.apache.org/dyn/closer.cgi/apisix/apisix-dashboard-2.2/apache-apisix-dashboard-2.2-src.tgz) ([asc](https://downloads.apache.org/apisix/apisix-dashboard-2.2/apache-apisix-dashboard-2.2-src.tgz.asc) [sha512](https://downloads.apache.org/apisix/apisix-dashboard-2.2/apache-apisix-dashboard-2.2-src.tgz.sha512)) |

## APISIX™ Ingress Controller

| Version | Release Date | Downloads                                                                                                                                                                                                                                                                                                                                                                            |
| ------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 0.2.0   | 17/1/2021    | [source](https://www.apache.org/dyn/closer.cgi/apisix/ingress-controller/0.2.0/apache-apisix-ingress-controller-0.2.0-src.tgz) ([asc](https://downloads.apache.org/apisix/ingress-controller/0.2.0/apache-apisix-ingress-controller-0.2.0-src.tgz.asc) [sha512](https://downloads.apache.org/apisix/ingress-controller/0.2.0/apache-apisix-ingress-controller-0.2.0-src.tgz.sha512)) |

## All Releases

Find all APISIX releases in the [Archive repository](https://archive.apache.org/dist/apisix/).

[Incubating Archive repository](https://archive.apache.org/dist/incubator/apisix/) hosts older releases when APISIX was an incubator project.

## Verify the releases

[PGP signatures KEYS](https://downloads.apache.org/apisix/KEYS)

It is essential that you verify the integrity of the downloaded files using the PGP or SHA signatures. The PGP signatures can be verified using GPG or PGP. Please download the KEYS as well as the asc signature files for relevant distribution. It is recommended to get these files from the main distribution directory and not from the mirrors.

```sh
gpg -i KEYS

# or

pgpk -a KEYS

# or

pgp -ka KEYS
```

To verify the binaries/sources you can download the relevant asc files for it from main distribution directory and follow the below guide.

```sh
gpg --verify apache-apisix-********.asc apache-apisix-********

or

pgpv apache-apisix-********.asc

or

pgp apache-apisix-********.asc
```
