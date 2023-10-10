---
title: "APISIX 新特性之 GitOps 声明式配置"
authors:
  - name: Jintao Zhang
    title: Author
    url: https://github.com/tao12345666333
    image_url: https://avatars.githubusercontent.com/u/3264292?v=4
  - name: Yilia Lin
    title: Technical Writer
    url: https://github.com/Yilialinn
    image_url: https://avatars.githubusercontent.com/u/114121331?v=4
keywords:
  - 开源社区
  - API 网关
  - Apache APISIX
description: APISIX 引入了新的周边工具：支持 GitOps 声明式，帮助用户在非 Kubernetes 环境中以声明式的方式进行各种集成。
tags: [Community]
image: https://static.apiseven.com/2022/10/19/634f6677742a1.png
---

APISIX 引入了新的周边工具 ADC，用以支持 GitOps 声明式，帮助用户在非 Kubernetes 环境中以声明式的方式进行各种集成。
<!--truncate-->

随着云原生和微服务的普及，API 网关成为了连接和管理不同微服务之间的重要组件。然而，随着服务数量的增加和场景需求的频繁变更，传统的命令式配置方式已经变得难以管理和维护。GitOps 是一种基于版本控制系统和自动化工作流程的运维模式，它将配置和策略以声明式的方式进行管理，从而提供了更高效、可靠和可追溯的操作方式。

为了提高开发者的效率和操作的可靠性，APISIX 引入了新的周边工具 ADC，用以支持 GitOps 声明式。APISIX 通过支持 GitOps 声明式特性进一步加强了与现代化开发和运维流程的整合。

## 为什么支持 GitOps 声明式配置

尽管 APISIX 提供了 stand-alone 模式，可以用 YAML 文件为 APISIX 提供配置，但 APISIX 缺乏与 CI/CD 等相关生态系统，如 Jenkins、ArgoCD 等生态的完整集成。虽然 APISIX Ingress Controller 项目在这方面进行了许多对接和集成工作，但 APISIX 本身在裸金属或虚拟机等非 Kubernetes 环境中使用时，并没有提供一套完整的声明式工具来支持 GitOps。

在传统的 API 网关管理中，配置和策略通常以命令式的方式进行操作，需要通过命令行工具或管理界面手动修改。传统的管理方式方式存在一些挑战，例如：

- **配置管理繁琐**：手动修改配置容易出错，尤其当网关规模庞大时。
- **可追溯性差**：难以追踪配置的变更历史和版本控制。
- **缺乏一致性**：多个环境之间的配置差异导致开发、测试和生产环境的不一致性。

APISIX 开发团队意识到，支持 GitOps 声明式有以下几点好处：

1. **提高开发者效率**：使用 GitOps 的声明式配置方式，开发者可以直接通过修改和提交代码库中的配置文件来管理 API 网关的配置。这种方式与开发者已经熟悉的开发流程相结合，减少了学习和切换工具的成本，并提高了开发者的效率。

2. **增强操作的可靠性**：通过将配置文件存储在版本控制系统中，可以确保配置的一致性和可靠性。每个配置更改都可以追踪到其变更历史，并且可以轻松回滚到先前的配置状态。这使得操作变得可追溯、可审计，并减少了由于人为错误导致的故障风险。

3. **简化多环境管理**：在开发、测试和生产环境中，往往需要管理不同的配置。通过使用 GitOps，可以轻松创建不同的分支或标签来管理不同环境的配置文件，从而实现环境之间的一致性，并减少了手动配置的错误。

4. **促进团队协作**：GitOps 的工作流程可以促进团队成员之间的协作和交流。开发者可以通过提交合并请求、代码审查等方式共同参与到 API 网关配置的开发和维护中，提高团队的协作效率和代码质量。

## APISIX 如何支持 GitOps 声明式配置

### ADC 及其使用场景和功能

ADC 全称是 APISIX declarative CLI ，是一个 APISIX 的声明式配置工具。APISIX 通过 ADC 帮助用户在非 Kubernetes 环境中以声明式的方式进行各种集成。

**ADC 允许通过命令行的方式与 APISIX 实例进行交互，当前已经实现如下功能：**

- **配置连接信息**：ADC 可以配置要连接的 APISIX 实例的地址、端口、登录令牌等信息。
- **验证配置**：ADC 提供了验证 APISIX 配置文件语法的功能。
- **配置同步**：可以通过 ADC 将本地的配置文件同步到 APISIX 实例。
- **配置导出**：可以通过 ADC 从 APISIX 实例导出配置文件。
- **比较配置差异**：ADC 可以比较本地配置和 APISIX 实例上的配置差异。
- **OpenAPI 转换**：ADC 可以将 OpenAPI 规范文件转换成 APISIX 的配置文件。
- **运行诊断**：ADC 支持 ping 等诊断命令，帮助调试 ADC 与网关的连接。

ADC 本质上提供了一套声明式的 APISIX 配置和管理能力，通过简单的命令就能实现配置的同步，不需要手动调用 admin API 或者通过 Dashboard 等。

## APISIX 如何使用 ADC 实现声明式配置

### 安装 APISIX 和 ADC

参考 [APISIX 文档](https://apisix.apache.org/zh/docs/apisix/getting-started/README/)，安装好 APISIX。再使用 `go install` 命令将 ADC 二进制安装到 `$GOPATH/bin` 目录：

```shell
go install github.com/api7/adc@latest
```

增加这行代码到你的 `$PATH` 环境变量：

```shell
export PATH=$PATH:$GOPATH/bin
```

如果你没有安装 Go，则可以下载最新版本的 `adc` 二进制来运行，把它加到你的 `/bin` 文件夹。

```shell
wget https://github.com/api7/adc/releases/download/v0.2.0/adc_0.2.0_linux_amd64.tar.gz
tar -zxvf adc_0.2.0_linux_amd64.tar.gz
mv adc /usr/local/bin/adc
```

你可以在[发布页](https://github.com/api7/adc/releases/tag/v0.2.0)上找到其他操作系统的二进制文件。将来，这些文件将发布在像 Homebrew 这样的软件包管理工具上。

运行下列代码，确认 `adc` 已经安装好：

```shell
adc --help
```

如果一切正常，你将看到可用子命令的列表以及使用它们的方法。

### 在 ADC 中配置 APISIX 实例

接下来，在 ADC 中配置 APISIX 实例。

```shell
adc configure
```

它将提示你填入 APISIX 服务器地址和 token。如果都填写正确，可以看到下面的内容：

```shell
ADC configured successfully!
Connected to APISIX successfully!
```

我们可以使用子命令 `ping` 随时检查 APISIX 的连接情况：

```shell
adc ping
```

### 验证 APISIX 配置文件

创建一个基本的 APISIX 配置，该配置具有将流量转发到上游的路由：

```yaml title="config.yaml"
name: "Basic configuration"
version: "1.0.0"
services:
  - name: httpbin-service
    hosts:
      - api7.ai
    upstream:
      name: httpbin
      nodes:
        - host: httpbin.org
          port: 80
          weight: 1
routes:
  - name: httpbin-route
    service_id: httpbin-service
    uri: "/anything"
    methods:
      - GET
```

一旦 ADC 连接到正在运行的 APISIX 实例，我们就可以使用它来验证此配置，然后再通过运行以下代码来应用它：

```shell
adc validate -f config.yaml
```

如果配置有效，会收到类似的响应：

```shell
Read configuration file successfully: config name: Basic configuration, version: 1.0.0, routes: 1, services: 1.
Successfully validated configuration file!
```

### 同步配置到 APISIX 实例

现在可以使用 ADC 将有效配置与连接的 APISIX 实例同步。要执行此操作，请运行：

```shell
adc sync -f config.yaml
```

这将创建我们在配置文件中声明的路由和服务：

```shell
creating service: "httpbin-service"
creating route: "httpbin-route"
Summary: created 2, updated 0, deleted 0
```

要验证路由是否正确创建，让我们尝试发送一个请求：

```shell
curl localhost:9080/anything -H "host:api7.ai"
```

如果一切都正确，我们将收到 [httpbin.org]((https://httpbin.org)) 的回复。

### 比较本地配置和运行配置

现在，让我们通过添加另一个路由来更新 `config.yaml` 文件中的本地配置：

```yaml title="config.yaml" {20-24}
name: "Basic configuration"
version: "1.0.0"
services:
  - name: httpbin-service
    hosts:
      - api7.ai
    upstream:
      name: httpbin
      nodes:
        - host: httpbin.org
          port: 80
          weight: 1
routes:
  - name: httpbin-route-anything
    service_id: httpbin-service
    uri: "/anything"
    methods:
      - GET
  - name: httpbin-route-ip
    service_id: httpbin-service
    uri: "/ip"
    methods:
      - GET
```

在将此配置与 APISIX 同步之前，ADC 允许你检查它与现有 APISIX 配置之间的差异。可以运行以下操作：

```shell
adc diff -f config.yaml
```

在应用配置之前，能够看到添加和删除的配置，也能了解到更改的内容。

### 将 OpenAPI 定义转换为 APISIX 配置

ADC 还支持使用 OpenAPI 定义。ADC 允许将 [OpenAPI 格式](https://spec.openapis.org/oas/v3.0.0)的定义转换为 APISIX 配置。

例如，如果你以 OpenAPI 格式记录了 API，如下所示：

```yaml title="openAPI.yaml"
openapi: 3.0.0
info:
  title: httpbin API
  description: Routes for httpbin API
  version: 1.0.0
servers:
  - url: http://httpbin.org
paths:
  /anything:
    get:
      tags:
        - default
      summary: Returns anything that is passed in the request data
      operationId: getAnything
      parameters:
        - name: host
          in: header
          schema:
            type: string
          example: "{{host}}"
      responses:
        "200":
          description: Successfully return anything
          content:
            application/json: {}
  /ip:
    get:
      tags:
        - default
      summary: Returns the IP address of the requester
      operationId: getIP
      responses:
        "200":
          description: Successfully return IP
          content:
            application/json: {}
```

你可以使用子命令 `openapi2apisix` 将其转换为 APISIX 配置，如下所示：

```shell
adc openapi2apisix -o config.yaml -f openAPI.yaml
```

这将创建一个配置文件，如下所示：

```yaml title="config.yaml"
name: ""
routes:
- desc: Returns anything that is passed in the request data
  id: ""
  methods:
  - GET
  name: getAnything
  uris:
  - /anything
- desc: Returns the IP address of the requester
  id: ""
  methods:
  - GET
  name: getIP
  uris:
  - /ip
services:
- desc: Routes for httpbin API
  id: ""
  name: httpbin API
  upstream:
    id: ""
    name: ""
    nodes: null
version: ""
```

正如我们所看到的，配置是不完整的，仍然需要手动添加大量配置。我们正在改进 ADC，以弥补 OpenAPI 定义和可以直接映射到 APISIX 配置之间的差距。

### 提示：使用自动完成

ADC 可以为你提供很多帮助，而且功能列表一定会增加。要了解如何使用任何子命令，可以使用 `--help` 或 `-h` 标志，它将显示该子命令的文档。

为了让它变得更简单，你可以使用 `completion` 子命令为你的 `shell` 环境生成一个自动完成脚本。例如，如果使用的是 zsh shell，则可以运行：

```shell
adc completion zsh
```

然后，你可以将输出复制粘贴到你的 `.zshrc` 文件中，之后在你使用 `adc` 时，它将显示提示。

ADC 仍处于初级阶段，并且正在不断改进。要了解有关该项目的更多信息、报告错误或建议功能，请访问 [github.com/api7/adc](github.com/api7/adc)。

## 总结

APISIX 通过使用声明式配置工具 ADC 支持 GitOps 声明式特性，提供了一种更简化、可靠和可追溯的管理方式，使开发者能够更高效地管理和部署 API 网关的配置。这项新特性为团队协作、环境一致性和配置管理带来了许多好处，为构建可靠的云原生架构提供了有力支持。

用户能在非 Kubernetes 环境中与 Jenkins、ArgoCD 等工具进行良好的对接，并使用 GitOps 的内部 CI/CD 方式来控制 APISIX 的各种行为，实现多环境发布等功能。
