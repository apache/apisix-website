# Apache APISIX 2.10.0(LTS 版本)正式发布

> 云原生 API 网关 Apache APISIX 2.10.0 版本正式发布！这是 Apache APISIX 首个 LTS 版本，同时支持了 service 增加 hosts 属性、支持设置镜像请求的比例等新功能。

Source: https://apisix.apache.org/zh/blog/2021/09/29/release-apache-apisix-2.10/

> Apache APISIX 2.10.0 版本正式发布！

<!--truncate-->

Apache APISIX 2.10 版本正式发布！🎉 这是 Apache APISIX 首个 LTS 版本，同时支持 10+ 个新功能和新插件。快速阅读了解 2.10 版本的新特性吧！

## 里程碑：第一个 LTS 版本

对于 Apache APISIX 来说，本次发布的 2.10.0 是一个具有里程碑意义的版本，因为 Apache APISIX 2.10.0 是我们的第一个 LTS（Long Time Support）的版本。

我们会在 Apache APISIX 2.10.0 的基础上发布后续的 patch 版本，也就是 2.10.1、2.10.2 等版本。这些版本会从主分支上 backport bugfix。

按计划，10 月份我们会发布首个 LTS 版本的首个 patch 版本，也就是 Apache APISIX 2.10.1。

之后我们会交替发布 2.10.x（例如 2.10.2 ）和 2.x（例如 2.11.0）两个版本线，保持功能迭代的同时，确保 LTS 版本能够得到较新的 bugfix。

## 新功能：service 增加 hosts 属性

在 Apache APISIX 2.10.0 版本里面，我们给 `service` 加上了 `hosts` 属性。就像 `service` 里面其他字段一样，`route` 可以从 `service` 中继承 `hosts` 属性。

下面的配置：

```json
# services/1
{
    "hosts": ["bar.com"]
}
# routes/1
{
    "upstream": {
        "nodes": {
            "127.0.0.1:1980": 1
        },
        "type": "roundrobin"
    },
    "service_id": "1",
    "uri": "/hello"
}
```

相当于：

```json
# routes/1
{
    "upstream": {
        "nodes": {
            "127.0.0.1:1980": 1
        },
        "type": "roundrobin"
    },
    "hosts": ["bar.com"],
    "uri": "/hello"
}
```

这么修改之后，Apache APISIX 里面的 `route` 和 `service` 的关系与 Nginx 里面的 `location` 和 `server` 的关系越来越相似。 可以这么说，本次修改让 `service` 从鸡肋变成了鸡腿，把 `service` 又拉回了 Apache APISIX 配置核心三角：[Route](http://apisix.apache.org/zh/docs/apisix/terminology/route)、 [Upstream](http://apisix.apache.org/zh/docs/apisix/terminology/upstream)、[Service](http://apisix.apache.org/zh/docs/apisix/terminology/service) 之中。

## 新功能：支持设置镜像请求的比例

proxy-mirror 插件支持设置镜像请求的比例，是用户们一直在期待的功能，我们在 Apache APISIX 2.10.0 上支持了这个功能。

通过设置 `sample_ratio`，可以控制被镜像到测试服务的请求数量。比如，下述的配置将 `sample_ratio` 设置为 0.5，会将一半的请求镜像到测试服务上：

```json
{
    "plugins": {
        "proxy-mirror": {
            "host": "http://127.0.0.1:1986",
            "sample_ratio": 0.5
        }
    },
    "upstream": {
        "nodes": {
            "127.0.0.1:1980": 1
        },
        "type": "roundrobin"
    },
    "uri": "/hello"
}
```

## 新组件：APISIX Python Plugin Runner

继 [Java Plugin Runner](https://apisix.apache.org/blog/2021/06/21/use-Java-to-write-Apache-APISIX-plugins/) 和 [Go Plugin Runner](https://apisix.apache.org/blog/2021/08/19/go-makes-Apache-APISIX-better/) 之后，Apache APISIX 又迎来了新的 Plugin Runner。

[Apache APISIX Python Plugin Runner](https://github.com/apache/apisix-python-plugin-runner) 已于 9 月 6 日发布了 0.1.0 版本。

Python 是一门有着深厚群众基础的编程语言，一直以容易上手和灵活多变而著称。如今你我也能用这门语言，给 Apache APISIX 编写插件了。

除了 Python Plugin Runner 之外，社区的伙伴也在开发其他编程语言的 Plugin Runner，比如 [JavaScript Plugin Runner](https://github.com/zenozeng/apisix-javascript-plugin-runner)，欢迎大家参与开发。

## 下载

除了上述新功能和组件外，Apache APISIX 2.10.0 版本还引入了十余个新功能和插件，详情请查看本次发布对应的 [Change log](https://github.com/apache/apisix/blob/release/2.10/CHANGELOG.md#2100)。

下载 Apache APISIX 2.10.0

- 源代码：请访问[下载页面](https://apisix.apache.org/downloads/)
- 二进制安装包：请访问[安装指南](https://apisix.apache.org/zh/docs/apisix/how-to-build/)
