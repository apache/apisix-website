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

## APISIX™ Dashboard

| Version | Release Date | Downloads                                                                                                                                                                                                                                                                                                       |
| ------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
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
