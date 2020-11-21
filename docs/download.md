---
id: downloads
title: Downloads
---
Apache APISIX is a dynamic, real-time, high-performance Cloud-Native API gateway, based on the Nginx library and etcd.

Apache APISIX software provides rich traffic management features such as load balancing, dynamic upstream, canary release, circuit breaking, authentication, observability, and more.

Use the links below to download the Apache APISIX™ from one of our mirrors.

## APISIX™

| Version | Release Date | Downloads                                                                                                                                                                                                                                                                                                             |
| ------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2.0     | 27/10/2020   | [source](https://www.apache.org/dyn/closer.cgi/apisix/2.0/apache-apisix-2.0-src.tgz) ([asc](https://downloads.apache.org/apisix/2.0/apache-apisix-2.0-src.tgz.asc) [sha512](https://downloads.apache.org/apisix/2.0/apache-apisix-2.0-src.tgz.sha512))
| 1.5     | 05/08/2020   | [source](https://www.apache.org/dyn/closer.cgi/apisix/1.5/apache-apisix-1.5-src.tar.gz) ([asc](https://downloads.apache.org/apisix/1.5/apache-apisix-1.5-src.tar.gz.asc) [sha512](https://downloads.apache.org/apisix/1.5/apache-apisix-1.5-src.tar.gz.sha512))                                                       |
| 1.4.1   | 20/07/2020   | [source](https://www.apache.org/dyn/closer.cgi/apisix/1.4.1/apache-apisix-1.4.1-src.tar.gz) ([asc](https://downloads.apache.org/apisix/1.4.1/apache-apisix-1.4.1-src.tar.gz.asc) [sha512](https://downloads.apache.org/apisix/1.4.1/apache-apisix-1.4.1-src.tar.gz.sha512))                                           |
| 1.4     | 29/06/2020   | [source](https://www.apache.org/dyn/closer.cgi/apisix/apisix/1.4/apache-apisix-1.4-incubating-src.tar.gz) ([asc](https://downloads.apache.org/apisix/apisix/1.4/apache-apisix-1.4-incubating-src.tar.gz.asc) [sha512](https://downloads.apache.org/apisix/apisix/1.4/apache-apisix-1.4-incubating-src.tar.gz.sha512)) |
| 1.3     | 24/05/2020   | [source](https://www.apache.org/dyn/closer.cgi/apisix/apisix/1.3/apache-apisix-1.3-incubating-src.tar.gz) ([asc](https://downloads.apache.org/apisix/apisix/1.3/apache-apisix-1.3-incubating-src.tar.gz.asc) [sha512](https://downloads.apache.org/apisix/apisix/1.3/apache-apisix-1.3-incubating-src.tar.gz.sha512)) |
| 1.2     | 20/04/2020   | [source](https://www.apache.org/dyn/closer.cgi/apisix/apisix/1.2/apache-apisix-1.2-incubating-src.tar.gz) ([asc](https://downloads.apache.org/apisix/apisix/1.2/apache-apisix-1.2-incubating-src.tar.gz.asc) [sha512](https://downloads.apache.org/apisix/apisix/1.2/apache-apisix-1.2-incubating-src.tar.gz.sha512)) |
| 1.1     | 24/02/2020   | [source](https://www.apache.org/dyn/closer.cgi/apisix/apisix/1.1/apache-apisix-1.1-incubating-src.tar.gz) ([asc](https://downloads.apache.org/apisix/apisix/1.1/apache-apisix-1.1-incubating-src.tar.gz.asc) [sha512](https://downloads.apache.org/apisix/apisix/1.1/apache-apisix-1.1-incubating-src.tar.gz.sha512)) |
| 1.0     | 15/01/2020   | [source](https://www.apache.org/dyn/closer.cgi/apisix/apisix/1.0/apache-apisix-1.0-incubating-src.tar.gz) ([asc](https://downloads.apache.org/apisix/apisix/1.0/apache-apisix-1.0-incubating-src.tar.gz.asc) [sha512](https://downloads.apache.org/apisix/apisix/1.0/apache-apisix-1.0-incubating-src.tar.gz.sha512)) |
| 0.9     | 24/11/2019   | [source](https://www.apache.org/dyn/closer.cgi/apisix/apisix/0.9/apache-apisix-0.9-incubating-src.tar.gz) ([asc](https://downloads.apache.org/apisix/apisix/0.9/apache-apisix-0.9-incubating-src.tar.gz.asc) [sha512](https://downloads.apache.org/apisix/apisix/0.9/apache-apisix-0.9-incubating-src.tar.gz.sha512)) |

## APISIX™ Dashboard

| Version | Release Date | Downloads                                                                                                                                                                                                                                                                                                       |
| ------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1.5     | 12/08/2020   | [source](https://www.apache.org/dyn/closer.cgi/apisix/dashboard-1.5/apache-apisix-dashboard-1.5.tar.gz) ([asc](https://downloads.apache.org/apisix/dashboard-1.5/apache-apisix-dashboard-1.5.tar.gz.asc) [sha512](https://downloads.apache.org/apisix/dashboard-1.5/apache-apisix-dashboard-1.5.tar.gz.sha512)) |
| 2.0     | 20/11/2020   | [source](https://www.apache.org/dyn/closer.cgi/apisix/dashboard-2.0/apache-apisix-dashboard-2.0-src.tgz) ([asc](https://downloads.apache.org/apisix/dashboard-2.0/apache-apisix-dashboard-2.0-src.tgz.asc) [sha512](https://downloads.apache.org/apisix/dashboard-2.0/apache-apisix-dashboard-2.0-src.tgz.sha512)) |

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
gpg --verify apache-apisix-**\*\*\*\***.asc apache-apisix-****\*****

or

pgpv apache-apisix-**\*\*\*\***.asc

or

pgp apache-apisix-**\*\*\*\***.asc
```
