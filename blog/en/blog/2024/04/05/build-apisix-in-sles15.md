---
title: "How to build APISIX in SLES 15"
authors:
  - name: "Oier Saizar"
    title: "Author"
    url: "https://github.com/osaizar"
    image_url: "https://avatars.githubusercontent.com/u/9879984"
keywords: 
- Apache APISIX
- SLES
- Suse
description: By reading this article, you will learn how to build Apache APISIX for Suse Linux Enterprise 15
tags: [Ecosystem]
---

> By reading this article you will learn how to build Apache APISIX SLES 15 from source code.
> The build process will be done in the [SLE BCI 15 SP5 Base Container](https://registry.suse.com/categories/bci/repositories/bci-bci-base-15sp5)

<!--truncate-->

## Install dependencies

Before starting to build APISIX we need to install some dependencies needed to launch the build process:

```shell
zypper install -y git sudo make wget
```

## Clone the APISIX repository

Next, we can clone the APISIX repository:

```shell
git clone https://github.com/apache/apisix.git
cd apisix
```

## Modify the utils/install-dependencies.sh script

Currently the `utils/install-dependencies.sh` script does not support SLES 15, so we will need to modify it slightly to add support for this distro:

```shell
wget https://raw.githubusercontent.com/osaizar/apisix/master/utils/install-dependencies.sh
mv install-dependencies.sh utils/install-dependencies.sh
chmod 755 utils/install-dependencies.sh
```

This will add an `install_dependencies_with_zypper` function to the script that will handle all the needed dependencies for SLES 15.

## Build APISIX from source

We are ready to follow the [Building APISIX from source](https://apisix.apache.org/docs/apisix/next/building-apisix/) documentation.

We can launch the next commands to build and install APISIX:

```shell
make deps
make install
```

## Installing etcd

APISIX needs etcd to work, we can install etcd following the [official documentation](https://apisix.apache.org/docs/apisix/next/building-apisix/#installing-etcd)

```shell
ETCD_VERSION='3.4.18'
wget https://github.com/etcd-io/etcd/releases/download/v${ETCD_VERSION}/etcd-v${ETCD_VERSION}-linux-amd64.tar.gz
tar -xvf etcd-v${ETCD_VERSION}-linux-amd64.tar.gz && \
  cd etcd-v${ETCD_VERSION}-linux-amd64 && \
  sudo cp -a etcd etcdctl /usr/bin/
  cd ..
nohup etcd >/tmp/etcd.log 2>&1 &
```

## Creating a nobody user & group

Before launching APISIX we need to create a user and a group both called `nobody`.
This is necessary for `openresty` to launch correctly.

```shell
useradd nobody -U
```

## Running APISIX

Finally APISIX can be initialized and started:

```shell
apisix init
apisix start
```
