---
title: "如何在 ARM Ubuntu 中构建 Apache APISIX"
authors:
  - name: "郭奇"
    title: "Author"
    url: "https://github.com/guoqqqi"
    image_url: "https://avatars.githubusercontent.com/u/72343596?v=4"
keywords: 
- Apache APISIX
- arm
- ubuntu
- Apple Macbook Pro M1
description: 通过阅读本文，您将了解如何在 ARM Ubuntu 中通过源码构建 Apache APISIX（M1 芯片环境）。
tags: [Ecosystem]
image: https://static.apiseven.com/2022/blog/0818/ecosystem/ubuntu.png
---

> 通过阅读本文，您将了解如何在 ARM Ubuntu 中通过源码构建 Apache APISIX（M1 芯片环境）。ARM Ubuntu 系统借助了 [https://multipass.run/](https://multipass.run/) 安装。

<!--truncate-->

## 前提准备

### 克隆源码

首先根据 [官方文档](https://apisix.apache.org/docs/apisix/how-to-build/) 克隆 Apache APISIX 源码仓库并进入项目目录。

```shell
git clone https://github.com/apache/apisix.git
cd apisix
git checkout release/2.11
```

### 安装 OpenResty

首先通过脚本一键安装项目所需要的依赖，在**项目根目录**运行如下命令。

```shell
bash utils/install-dependencies.sh
```

![安装依赖.png](https://static.apiseven.com/202108/1641911830267-75310d03-1039-4f5a-a8b1-94c01474a086.png)

通过错误提示可知，是由于未能成功安装 `OpenResty` 导致。根本原因是默认没有 `ARM 64` 平台的源。

所以需要我们手动安装 `OpenResty`，具体安装步骤可参考 [https://openresty.org/cn/linux-packages.html#ubuntu](https://openresty.org/cn/linux-packages.html#ubuntu)。

#### 步骤一：安装导入 GPG 公钥时所需的依赖包

具体代码示例可参考下方（整个安装过程完成后可以随时删除它们）。

```shell
sudo apt-get -y install --no-install-recommends wget gnupg ca-certificates
```

#### 步骤二：导入 GPG 密钥

```shell
wget -O - https://openresty.org/package/pubkey.gpg | sudo apt-key add -
```

如下图所示，出现导入成功提示。

![导入 GPG 密钥.png](https://static.apiseven.com/202108/1641911867662-8d1dcb8d-7c1e-4ddd-ad60-2d7448b6c544.png)

#### 步骤三：添加 OpenResty 官方 APT 仓库

对于 x86_64 或 amd64 系统，可以使用以下命令。

```shell
echo "deb http://openresty.org/package/ubuntu $(lsb_release -sc) main" \
    | sudo tee /etc/apt/sources.list.d/openresty.list
```

而对于 ARM64 或 aarch64 系统，则可以使用下面的命令（在 M1 上运行可运行该命令，上个命令会报错）。

```shell
echo "deb http://openresty.org/package/arm64/ubuntu $(lsb_release -sc) main" \
    | sudo tee /etc/apt/sources.list.d/openresty.list
```

#### 步骤四：更新 APT 索引

```shell
sudo apt-get update
```

之后可以按照下方代码来安装软件包，这里我们以 `OpenResty` 为例。

```shell
sudo apt-get -y install openresty
```

#### 步骤五：删除对应关联包（可选）

最后，我们可以通过以下命令来删除该包和其对应的关联包。

```shell
sudo apt-get -y install --no-install-recommends software-properties-common
```

至此，`OpenResty` 安装完毕。

![OpenResty 安装成功.png](https://static.apiseven.com/202108/1641911892167-2a6b56a9-aad8-400b-99d9-8401718c6ba9.png)

### 安装项目依赖

首先，重新运行安装依赖脚本。并运行 `LUAROCKS_SERVER=https://luarocks.cn` 命令安装依赖。

```shell
bash utils/install-dependencies.sh
```

![安装项目依赖.png](https://static.apiseven.com/202108/1641911909131-3f30b00e-2939-480e-809d-ccd17e5f15c4.png)

之后运行下述命令。

```shell
curl https://raw.githubusercontent.com/apache/apisix/master/utils/linux-install-luarocks.sh -sL | bash -
```

![安装依赖反馈.png](https://static.apiseven.com/202108/1641911924788-7e0d2f90-90d6-41cc-8c98-450cdf55a3c1.png)

根据上图反馈发现错误提示，然后执行以下命令。

```shell
sudo apt install wget sudo unzip
```

接着我们再重新运行下述命令。

```shell
curl https://raw.githubusercontent.com/apache/apisix/master/utils/linux-install-luarocks.sh -sL | bash -
```

最后运行安装依赖指令 `LUAROCKS_SERVER=https://luarocks.cn make deps`。

![项目依赖安装成功.png](https://static.apiseven.com/202108/1641911942296-0ed90547-80b3-4e80-be5a-89cf60ba67b4.png)

至此，大部分依赖都已成功安装完毕，但又有新的错误提示出现（看起来是两个仓库未能成功克隆下来）。没关系，暂时没什么影响，这里可以先执行 APISIX 的安装命令。

```shell
make install
// 如果出现权限不足的提示，用 sudo make install
```

![执行 APISIX 安装.png](https://static.apiseven.com/202108/1641911956728-0a64adb1-0bc5-489c-bf5b-929177325ab4.png)

## 安装 etcd

启动 Apache APISIX 之前需要先安装 etcd，具体安装步骤可参考[官方文档](https://apisix.apache.org/docs/apisix/2.10/install-dependencies/#ubuntu-1604--1804)

:::info 提示
由于该安装教程并不是针对 arm 写的，虽然成功安装了 etcd，但未能成功将 etcd 运行起来，原因是由于默认使用 x86 的二进制文件导致。具体踩坑部分这里就不再赘述，直接放上正确步骤供大家参考。
:::

### 在 Docker 中运行 etcd 服务

#### 步骤一：安装 Docker

```shell
sudo apt install docker.io
```

:::tip
docker 常用的命令(如果出现无权限错误，请在命令前添加 sudo)：

- 查看所有容器列表 `docker ps -a`
- 查看正在运行的容器列表 `docker ps`
- 查看镜像列表 `docker image list`
- 删除所有容器 `docker container prune`
- 删除所有镜像 `docker image prune -f -a`
:::

更多关于 Docker 的使用可参考[Docker 入门教程 - 阮一峰的网络日志](https://www.ruanyifeng.com/blog/2018/02/docker-tutorial.html)。

#### 步骤二：拉取并运行 etcd

```shell
sudo docker run -d --name etcd -p 2379:2379 -e ETCD_UNSUPPORTED_ARCH=arm64 -e ETCD_LISTEN_CLIENT_URLS=http://0.0.0.0:2379 -e ETCD_ADVERTISE_CLIENT_URLS=http://0.0.0.0:2379 gcr.io/etcd-development/etcd:v3.5.1-arm64
```

需要注意的是，该操作中镜像需要开启代理进行。

![运行 etcd.png](https://static.apiseven.com/202108/1641912022850-0ad47270-79e2-4227-a786-9d478906b8b0.png)

#### 步骤三：验证 etcd 启动状态

```shell
sudo docker ps -a
```

![验证 etcd 开启状态.png](https://static.apiseven.com/202108/1641912040567-141b520e-4c33-448d-ba33-86e01a9f6114.png)

通过上图反馈可知，etcd 已经成功启动。

## 启动 Apache APISIX

经过上述操作，目前所有依赖项目都已准备完毕，现在就可以启动 Apache APISIX 了。

### 步骤一：安装依赖

```shell
make deps
make install
```

### 步骤二：初始化依赖并启动 APISIX

```shell
apisix init

# start APISIX
apisix start

# stop APISIX
apisix stop
```

![成功启动 APISIX.png](https://static.apiseven.com/202108/1641912056163-67b0f11b-a122-4f5b-b7a6-c09662443cce.png)

Apache APISIX 已成功启动。更多安装搭建 Apache APISIX 的步骤细节可参考[官方文档](https://apisix.apache.org/docs/apisix/how-to-build)。

## 总结

本文通过详细步骤，为大家展示了如何在 Macbook M1 芯片系统下进行 Apache APISIX 的部署与安装。总体实践下来，多多少少会出现一些踩坑的过程，但总体体验下来依旧是部署成功。

如果各位有更好的建议，欢迎大家为 Apache APISIX [构建文档](https://apisix.apache.org/docs/apisix/how-to-build/) 贡献，留下您的建议，来帮助更多的人。
