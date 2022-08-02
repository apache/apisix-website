---
title: "Python 助你快速上手 Apache APISIX 插件开发"
slug: 2021/09/06/python-helps-you-quickly-with-apache-apisix-development
author: "帅进超"
authorURL: "https://github.com/shuaijinchao"
authorImageURL: "https://avatars.githubusercontent.com/u/8529452?v=4"
keywords:
  - APISIX
  - API 网关
  - Python
  - APISIX Python Plugin Runner
tags: [Ecosystem]
description: 云原生 API 网关 Apache APISIX 目前已经支持了 Java、Go 以及 Python 等语言编写插件。本文将为你介绍如何使用 Python 在 APISIX 上开发自定义插件。
---

> 在 Apache APISIX Python Runner 之前社区中已经支持了 [Java](https://github.com/apache/apisix-java-plugin-runner) 和 [Go](https://github.com/apache/apisix-go-plugin-runner) 语言的 Runner，今天 Python Runner 也来了，社区中的小伙伴们在开发 Apache APISIX 的插件时又多了一种新选择。

<!--truncate-->

## 简介

### Apache APISIX

`Apache APISIX` 是一个高性能的云原生开源 API 网关，它可以对请求进行统一的拦截和治理（如：鉴权、认证、缓存、版本、熔断、审计 等等）帮助开发人员轻松的对外提供安全可靠的服务，而开发人员通过 `Apache APISIX`
的加持只需要关注业务实现即可，省去了大量花费在通用能力上的开发与维护上的时间并且也降低了整体业务架构的复杂度。

### Python

`Python` 语言作为一个解释型的高级编程语言，它 `语法简洁易上手`、`代码可读性好` ，在 `跨平台` 、`可移植性` 、`开发效率`
上都有很好的表现，同时作为一个高级编程语言它的封装抽象程度比较高屏蔽了很多底层细节（例如：`GC`
）让我们在开发的过程中可以更专注应用逻辑的开发。`Python` 作为一个有 30 年历史的老牌开发语言，它的生态以及各种模块已经非常完善，我们大部分的开发和应用场景都可以从社区中找到很成熟的模块或解决方案。`Python`
其他的优点就不再一一赘述。`Python` 的缺点也比较明显：`Python` 作为一门解释性语言，相较于 `C++` 和 `Go` 这样的编译型语言，在性能上的差距还是比较大的。

### Apache APISIX Python Runner

[apache-apisix-python-runner](https://github.com/apache/apisix-python-plugin-runner) 这个项目可以理解为 `Apache APISIX` 和 `Python`之间的一道桥梁，通过 `Python Runner` 可以把 `Python` 直接应用到 `APISIX` 的插件开发中，最重要的还是希望让更多对 `Apache APISIX` 和 `API 网关` 感兴趣的 `Python 开发者`通过这个项目更多的了解使用 `Apache APISIX`，以下为 `Apache APISIX` 多语言支持的架构图。

![Apache APISIX work flow](https://static.apiseven.com/202108/1639468460315-bb51d913-be72-4329-a47b-7e987dff21ba.png)

上图左边是 `Apache APISIX` 的工作流程，右边的 `Plugin Runner` 是各语言的插件运行器，本文介绍的 `apisix-python-plugin-runner` 就是支持 `Python`语言的 `Plugin Runner`。

当你在 `Apache APISIX` 中配置一个 `Plugin Runner` 时，`Apache APISIX` 会启动一个子进程运行 `Plugin Runner`，该子进程与 `Apache APISIX`
进程属于同一个用户，当我们重启或重新加载 `Apache APISIX` 时，`Plugin Runner` 也将被重启。

如果你为一个给定的路由配置了 `ext-plugin-*` 插件，请求命中该路由时将触发 `Apache APISIX` 通过 `Unix Socket` 向 `Plugin Runner` 发起 `RPC` 调用。调用分为两个阶段：

- [ext-plugin-pre-req](https://github.com/apache/apisix/blob/master/docs/en/latest/plugins/ext-plugin-pre-req.md)
  ：在执行 `Apache APISIX` 内置插件（Lua 语言插件）之前
- [ext-plugin-post-req](https://github.com/apache/apisix/blob/master/docs/en/latest/plugins/ext-plugin-post-req.md)
  ：在执行 `Apache APISIX` 内置插件（Lua 语言插件）之后

大家可以根据需要选择并配置 `Plugin Runner` 的执行时机。

`Plugin Runner` 会处理 `RPC` 调用，在其内部创建一个模拟请求，然后运行多语言编写的插件，并将结果返回给 Apache APISIX。

多语言插件的执行顺序是在 `ext-plugin-*` 插件配置项中定义的，像其他插件一样，它们可以被启用并在运行中重新定义。

## 部署测试

### 基础运行环境

- Apache APISIX 2.7
- Python 3.6+

`Apache APISIX` 的安装部署本文不在过多赘述，详情请参考 [Apache APISIX 官方文档：如何构建 Apache APISIX](https://github.com/apache/apisix/blob/master/docs/en/latest/how-to-build.md)
进行部署。

### 下载安装 Python Runner

```bash
$ git clone https://github.com/apache/apisix-python-plugin-runner.git
$ cd apisix-python-plugin-runner
$ make install
```

### 配置 Python Runner

#### 开发模式

##### 运行 Python Runner

```bash
$ cd /path/to/apisix-python-plugin-runner
$ APISIX_LISTEN_ADDRESS=unix:/tmp/runner.sock python3 apisix/main.py start
```

##### 修改 APISIX 配置文件

```bash
$ vim /path/to/apisix/conf/config.yaml
apisix:
  admin_key:
    - name: "admin"
      key: edd1c9f034335f136f87ad84b625c8f1
      role: admin
ext-plugin:
  path_for_test: /tmp/runner.sock
```

#### 生产模式

##### 修改 APISIX 配置文件

```bash
$ vim /path/to/apisix/conf/config.yaml
apisix:
  admin_key:
    - name: "admin"
      key: edd1c9f034335f136f87ad84b625c8f1
      role: admin
ext-plugin:
  cmd: [ "python3", "/path/to/apisix-python-plugin-runner/apisix/main.py", "start" ]
```

#### Python Runner 配置（可选）

如果需要对 `Log Level` 或 `Unix Domain Socket` 环境变量调整可以修改 `Runner` 的配置文件

```bash
$ vim /path/to/apisix-python-plugin-runner/apisix/config.yaml
socket:
  file: $env.APISIX_LISTEN_ADDRESS # Environment variable or absolute path

logging:
  level: debug # error warn info debug
```

### 启动 Python Runner

```bash
$ cd /path/to/apisix
# Start or Restart
$ ./bin/apisix [ start | restart ]
```

启动或重启 `APISIX` 即可，此时 `APISIX` 和 `Python Runner` 已经完成配置并启动。

### 测试 Python Runner

#### 配置 Apache APISIX 路由及插件信息

```bash
# 使用默认demo插件进行测试
$ curl http://127.0.0.1:9080/apisix/admin/routes/1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
  "uri": "/get",
  "plugins": {
    "ext-plugin-pre-req": {
      "conf": [
        { "name": "stop", "value":"{\"body\":\"hello\"}"}
      ]
    }
  },
  "upstream": {
        "type": "roundrobin",
        "nodes": {
            "127.0.0.1:1980": 1
        }
    }
}'
```

- `plugins.ext-plugin-pre-req.conf` 为 `Runner` 插件配置，`conf` 为数组格式可以同时设置多个插件。
- 插件配置对象中 `name` 为插件名称，该名称需要与插件代码文件和对象名称一直。
- 插件配置对象中 `value` 为插件配置，可以为 `JSON` 字符串。

#### 访问验证

```bash
$ curl http://127.0.0.1:9080/get -i
HTTP/1.1 200 OK
Date: Fri, 13 Aug 2021 13:39:18 GMT
Content-Type: text/plain; charset=utf-8
Transfer-Encoding: chunked
Connection: keep-alive
host: 127.0.0.1:9080
accept: */*
user-agent: curl/7.64.1
X-Resp-A6-Runner: Python
Server: APISIX/2.7

Hello, Python Runner of APISIX
```

## 插件开发

### 插件目录

```bash
/path/to/apisix-python-plugin-runner/apisix/plugins
```

此目录中的 `.py` 文件将会被自动加载。

### 插件示例

```bash
/path/to/apisix-python-plugin-runner/apisix/plugins/stop.py
/path/to/apisix-python-plugin-runner/apisix/plugins/rewrite.py
```

### 插件格式

```python
from apisix.runner.plugin.base import Base
from apisix.runner.http.request import Request
from apisix.runner.http.response import Response


class Stop(Base):
    def __init__(self):
        """
        Example of `stop` type plugin, features:
            This type of plugin can customize response `body`, `header`, `http_code`
            This type of plugin will interrupt the request
        """
        super(Stop, self).__init__(self.__class__.__name__)

    def filter(self, request: Request, response: Response):
        """
        The plugin executes the main function
        :param request:
            request parameters and information
        :param response:
            response parameters and information
        :return:
        """
        # 在插件中可以通过 `self.config` 获取配置信息，如果插件配置为JSON将自动转换为字典结构
        # print(self.config)

        # 设置响应头信息
        headers = request.headers
        headers["X-Resp-A6-Runner"] = "Python"
        response.headers = headers

        # 设置响应体信息
        response.body = "Hello, Python Runner of APISIX"

        # 设置响应状态码
        response.status_code = 201

        # 通过调用 `self.stop()` 中断请求流程，此时将立即响应请求给客户端
        # 如果未显示调用 `self.stop()` 或 显示调用 `self.rewrite()`将继续将请求
        # 默认为 `self.rewrite()`
        self.stop()
```

### 插件规范及注意事项

- 实现插件对象必须继承 `Base` 类
- 插件必须实现 `filter` 函数
- `filter` 函数参数只能包含 `Request` 和 `Response` 类对象作为参数
- `Request` 对象参数可以获取请求信息
- `Response` 对象参数可以设置响应信息
- `self.config` 可以获取插件配置信息
- `filter` 函数中调用 `self.stop()` 时将马上中断请求，响应数据。
- `filter` 函数中调用 `self.rewrite()` 时，将会继续请求。

## 欢迎参与

目前 `Apache APISIX` 各语言的 `Runner` 还处于早期开发阶段，我们会陆续完善其功能。成功的开源项目离不开大家的参与和贡献，欢迎各位参与 `Apache APISIX Runner`
的开发，让我们一起共建 `Apache APISIX` 与各语言的桥梁。

- [apisix-python-plugin-runner](https://github.com/apache/apisix-python-plugin-runner)
- [apisix-go-plugin-runner](https://github.com/apache/apisix-go-plugin-runner)
- [apisix-java-plugin-runner](https://github.com/apache/apisix-java-plugin-runner)

## 相关阅读

- [Go 让 Apache APISIX 如虎添翼](http://apisix.apache.org/blog/2021/08/19/go-makes-Apache-APISIX-better)
- [如何用 Java 编写 Apache APISIX 插件](https://apisix.apache.org/blog/2021/06/21/use-Java-to-write-Apache-APISIX-plugins)
