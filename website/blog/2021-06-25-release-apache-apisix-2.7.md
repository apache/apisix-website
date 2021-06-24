---
title: "Apache APISIX 2.7.0-Release 正式发布"
author: spacewander
authorURL: "https://github.com/spacewander"
authorImageURL: "https://avatars.githubusercontent.com/u/4161644?v=4"
---
> [@spacewander](https://github.com/spacewander), Core developer of Apache APISIX from [Shenzhen Zhiliu Technology Co.](https://www.apiseven.com/)
>

<!--truncate-->
Apache APISIX 2.7.0-Release 正式发布！欢迎大家下载使用。

## Release Notes

### 新组件：开始推广 Apache APISIX 自己的 OpenResty 发行版：APISIX-OpenResty

我们有一个宏伟的愿景，就是让 Apache APISIX 能够以较低的成本替换掉 Nginx，并且在动态性上不要输给 Envoy。

要想达成这个愿景，必须要做的一件事是允许越来越多的 Nginx 配置能够被动态设置，而这又要求我们去维护一套 Nginx 的补丁和额外的 Nginx C 模块。

所以我们在原生的 OpenResty 基础上，打入自己的补丁和 Nginx C 模块，铸成自己的 OpenResty 发行版。

你也许会担心这么做是否太过激进，会不会导致 Apache APISIX 的稳定性滑坡。

事实上，我们并不是第一个这么做的人，Kong 也在维护自己的 OpenResty 发行版。我们维护自己的发行版有两大保证：

1. 紧跟 OpenResty 官方的道路。我们自己的发行版基于 OpenResty 1.19.3.2 版本，这一版本是当前官方默认的最新稳定版本。同时，我们密切关注 OpenResty 1.19.9.1 rc 版的发布工作，在其达到成熟后及时升级到这一版本。
2. OpenResty 核心开发者和 Apache APISIX 核心开发者有很大的重叠部分。这意味着 Apache APISIX 自己的 OpenResty 发行版的发展方向不会偏离原生的 OpenResty，而且有重要的功能可以及时回馈到上游。

APISIX-OpenResty 目前包含了以下新功能：

* mTLS
* 动态设置 client_max_body_size

在 Apache APISIX 后续版本中，我们也会陆续允许下面的 Nginx 配置能够被动态设置：

* upstream 的 keepalive
* gzip
* real_ip
* proxy_max_temp_file_size
* 以及更多的……

我们正在推进 APISIX-OpenResty 的 rpm / deb 包打包工作，并搭建自己的 yum / ppa 仓库。很快，只需一行命令就能安装好 Apache APISIX 和 APISIX-OpenResty。

### 新功能：TCP 代理新增加一系列功能

2.7 版本中，我们花了一些力气来开发 TCP 代理新功能，包括：

* 允许 upstream 中配置域名
* 允许 mqtt-proxy 插件配置域名
* 支持接收 TLS over TCP 连接，这一块的证书自然是可以像 HTTPS 的证书一样动态配置的
* 基于 SNI 的路由规则
* 动态校验客户端证书

在后续版本中，我们也会继续分配部分资源来完善现有的 TCP 代理功能，敬请期待！

### 完善：多语言插件功能基本可用

随着 apisix-java-plugin-runner 发布第一个版本，外加 apisix-go-plugin-runner 完成主体功能，Apache APISIX 的多语言插件功能已经支持两大最广泛使用的后端编程语言。如果你还担忧 Apache APISIX 的插件开发会受限于 Lua 生态，不妨试试使用我们的多语言 plugin runner 来开发 Java / Go 插件。

## 下载

下载 Apache APISIX 2.7.0-Release 源代码及二进制安装包，请访问下载页面: `https://apisix.apache.org/downloads/`。
