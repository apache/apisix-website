---
title: "如何使用 Nocalhost 开发 APISIX Ingress Controller"
author: "Garry Chen"
authorURL: "https://github.com/neaped"
authorImageURL: "https://avatars.githubusercontent.com/u/3713305?v=4"
keywords: 
- Kubernetes
- API 网关
- Apache APISIX Ingress
- Nocalhost
- Controller
- 部署开发
description: 本文将为您介绍如何使用 Nocalhost 将本地开发机无缝连接到一个远程 Kubernetes 集群，同时配合 IDE 来开发和调试 Apache APISIX Ingress Controller。
tags: [Ecosystem]
---

> 本文将为您介绍如何使用 Nocalhost 将本地开发机无缝连接到一个远程 Kubernetes 集群，同时配合 IDE 来开发和调试 Apache APISIX Ingress Controller。利用现有技术栈更顺畅地开发和调试远程应用。

<!--truncate-->

## 环境准备

- 准备一个可用的 Kubernetes 集群。可使用任意拥有命名空间管理权限的 Kubernetes 集群
- 本地已安装好 [Helm v3.0+](https://helm.sh)
- 集群中已安装好 Apache APISIX
- GoLand IDE 2020.03+ (本文应用的是 2021.2 版本)
- 安装 [Nocalhost JetBrains plugin](https://nocalhost.dev/zh-CN/docs/installation#install-jetbrains-plugin) 插件
- 安装 [Go 1.13](https://golang.org/dl/) 或更高版本

## 部署 Apache APISIX Ingress Controller

在 GoLand 中通过 Nocalhost 部署 Apache APISIX Ingress Controller，操作如下：

1. 在 GoLand 中打开 Nocalhost 插件
2. 选择将要部署 APISIX Ingress Controller 的命名空间
3. 右键点击选定的命名空间, 选择 **`Deploy Application`**, 然后选择 **`Helm Repo`** 作为安装方法
4. 在下面的对话框中：

    1. 在 `Name` 中输入：`apisix-ingress-controller`
    2. 在 `Chart URL` 中输入：`https://charts.apiseven.com`

![部署 APISIX ingress controller](https://static.apiseven.com/202108/1637131316244-f1a58c88-8628-4918-a4c4-1ad287742fd0.gif)

部署完成后，我们通过在 IDE 内启用端口转发来测试 `apisix-ingress-controller`:

1. 在 Nocalhost 插件的 Workloads 中找到 `apisix-ingress-controller`，右键点击并选择 **`Port Forward`**
2. 添加端口转发 `8080:8080`
3. 在本地访问 [`http://127.0.0.1:8080/healthz`](http://127.0.0.1:8080/healthz) 并检查结果

![测试部署是否成功](https://static.apiseven.com/202108/1637131450462-842c3baf-b7a4-4598-be0b-27486bf1cf28.gif)

## 开发

### 步骤一：进入开发模式

1. 右键点击 `apisix-ingress-controller` 工作负载，选择 **`Start DevMode`**
2. 如果您已经将源码克隆到本地，请选择您的源代码目录。否则通过输入仓库地址 https://github.com/apache/apisix-ingress-controller.git 来让 Nocalhost 克隆你的源代码到本地
3. 等待操作完成，Nocalhost 将在进入 DevMode 后在 IDE 内打开远程终端

现在通过在远程终端中输入以下命令来启动 `apisix-ingress-controller` 进程：

```bash
go run main.go ingress --config-path conf/config-default.yaml
```

`apisix-ingress-controller` 启动后，可通过 [`http://127.0.0.1:8080/healthz`](http://127.0.0.1:8080/healthz) 访问服务，并检查结果.

![进入开发模式](https://static.apiseven.com/202108/1637131513751-b9184c10-4da3-4ab2-b403-56ae2360704a.gif)

### 步骤二：修改代码并检查结果

现在我们来修改一下代码并看看效果：

1. 停止 `apisix-ingress-controller` 进程
2. 在 Goland 中搜索 `healthz` 并找到 `router.go` 文件。 将 `healthzResponse` 的状态代码从 `ok` 更改为 `Hello Nocalhost`
3. 重新启动进程并在本地检查更改结果

![无需重新构建镜像或重启容器，几秒后便可以看到改动的结果](https://static.apiseven.com/202108/1637131699629-a0766f66-0faa-4bf8-9013-284e5f2bdd57.gif)

### 步骤三：结束开发模式

现在关闭开发窗口并退出开发模式：

1. 右键点击 `apisix-ingress-controller`
2. 选择 **`End DevMode`**

Nocalhost 将使 `apisix-ingress-controller` 结束 DevMode, 并重置 `apisix-ingress-controller` 到其原始版本。启用端口转发来看看退出开发模式后的结果。

![结束 DevMode](https://static.apiseven.com/202108/1637131766524-dba7b756-ae0b-42d1-8ff0-6ac14059ce11.gif)

注意：在开发模式下修改代码时，所有代码更改都只在**开发容器**中生效。

退出 DevMode 后，Nocalhost 将会将远程容器重置为原始状态(进入 DevMode 之前的版本)。这样，在退出 DevMode 后，对代码进行修改不会对原始环境造成任何更改或影响。

## 调试

调试应用程序是一件麻烦的事，在 Kubernetes 集群中调试应用程序则更加麻烦。但 Nocalhost 可以帮助我们在调试 Kubernetes 集群中的程序时获得和在 IDE 中直接调试本地程序同样的体验。

### 步骤一：开启远程调试

我们可以通过以下方式开启远程调试

- 右键点击 `apisix-ingress-controller` 并选择 **`Remote Debug`**
- Nocalhost 将会先让 `apisix-ingress-controller` 进入 DevMode，并运行在 [`dev config`](https://nocalhost.dev/zh-CN/docs/config/config-develop) 定义的调试命令

![开始远程调试](https://static.apiseven.com/202108/1637132327260-7bba1d81-cf70-4982-9a07-51cc379e6bea.gif)

### 步骤二：设置断点

在 `healthz` 函数上设置一个断点。悬停在行号左侧，然后点击红点。设置好断点后，在浏览器中访问 [`http://127.0.0.1:8080/healthz`](http://127.0.0.1:8080/healthz)，会触发断点，GoLand 会跳到前台。点击调试相关按钮可对程序进行调试。

此外，因为我们启用了 `dev.hotReload`，所以每次更改代码时，Nocalhost 将自动重新运行调试命令。这可以让我们频繁更改和调试代码时变得方便很多。

![设置断点并运行服务](https://static.apiseven.com/202108/1637132455552-86f44c0c-94d1-4ad9-a79d-0e2c6957d60b.gif)

## 远程运行

Nocalhost 不仅仅可以远程调试，还为我们在 Kubernetes 集群中运行服务以及热加载提供了一种更简单的方式。

我们可以通过以下步骤使用 Remote Run 功能：

- 右键点击 `apisix-ingress-controller`，并选择 **`Remote Run`**
- Nocalhost 将会先让 `apisix-ingress-controller` 进入 DevMode，并运行在 [`dev config`](https://nocalhost.dev/zh-CN/docs/config/config-develop) 定义的运行命令

每次更改代码完代码后，Nocalhost 都会自动触发运行命令，将程序运行起来。

![Remote run](https://static.apiseven.com/202108/1637133046432-84810667-c3ee-4d71-8a33-eb1833fd9ce2.gif)

## 总结

通过本文，我们为大家展示了如何使用 Nocalhost 来开发和调试 Kubernetes 集群中的 Apache APISIX Ingress Controller。借助 Nocalhost 的能力，我们不再需要等待缓慢的本地开发过程，而是可以通过即时反馈和高效的云本地开发环境进行快速部署与迭代.
