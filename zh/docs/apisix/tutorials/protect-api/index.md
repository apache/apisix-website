# 保护 API

> 本文介绍了如何通过 Apache APISIX 发布服务和路由。

Source: https://apisix.apache.org/zh/docs/apisix/tutorials/protect-api/

## 描述

本文将为你介绍使用限流限速和安全插件保护你的 API。

## 概念介绍

### 插件

[Plugin](/zh/docs/apisix/terminology/plugin/) 也称之为插件，它是扩展 APISIX 应用层能力的关键机制，也是在使用 APISIX 时最常用的资源对象。插件主要是在 HTTP 请求或响应生命周期期间执行的、针对请求的个性化策略。插件可以与路由、服务或消费者绑定。

:::note[注意]

如果 [路由](/zh/docs/apisix/terminology/route/)、[服务](/zh/docs/apisix/terminology/service/)、[插件配置](/zh/docs/apisix/terminology/plugin-config/) 或消费者都绑定了相同的插件，则只有一份插件配置会生效，插件配置的优先级由高到低顺序是：消费者 > 路由 > 插件配置 > 服务。同时在插件执行过程中也会涉及 6 个阶段，分别是 `rewrite`、`access`、`before_proxy`、`header_filter`、`body_filter` 和 `log`。

:::

## 前提条件

在进行该教程前，请确保你已经[公开服务](/zh/docs/apisix/tutorials/expose-api/)。

## 保护 API

在很多时候，我们的 API 并不是处于一个非常安全的状态，它随时会收到不正常的访问，一旦访问流量突增，可能就会导致你的 API 发生故障，产生不必要的损失。因此你可以通过速率限制保护你的 API 服务，限制非正常的访问请求，保障 API 服务的稳定运行。对此，我们可以使用如下方式进行：

1. 限制请求速率；
2. 限制单位时间内的请求数；
3. 延迟请求；
4. 拒绝客户端请求；
5. 限制响应数据的速率。

为了实现上述功能，APISIX 提供了多个限流限速的插件，包括 [limit-conn](/zh/docs/apisix/plugins/limit-conn/)、[limit-count](/zh/docs/apisix/plugins/limit-count/) 和 [limit-req](/zh/docs/apisix/plugins/limit-req/)。

- `limit-conn` 插件主要用于限制客户端对服务的并发请求数。
- `limit-req` 插件使用漏桶算法限制对用户服务的请求速率。
- `limit-count` 插件主要用于在指定的时间范围内，限制每个客户端总请求个数。

接下来，我们将以 `limit-count` 插件为例，为你介绍如何通过限流限速插件保护你的 API。

1. 创建路由。

:::note

您可以这样从 `config.yaml` 中获取 `admin_key` 并存入环境变量：

```bash
admin_key=$(yq '.deployment.admin.admin_key[0].key' conf/config.yaml | sed 's/"//g')
```

:::

```shell
curl -i http://127.0.0.1:9180/apisix/admin/routes/1 \
-H "X-API-KEY: $admin_key" -X PUT -d '
{
    "uri": "/index.html",
    "plugins": {
        "limit-count": {
            "count": 2,
            "time_window": 60,
            "rejected_code": 503,
            "key_type": "var",
            "key": "remote_addr"
        }
    },
  "upstream_id": "1"
}'

```

以上配置中，使用了[公开服务](/zh/docs/apisix/tutorials/expose-api/)中创建的上游创建了一个 ID 为 `1` 的路由， ，并且启用了 `limit-count` 插件。该插件仅允许客户端在 60 秒内，访问上游服务 2 次，超过两次，则会返回 `503` 错误码。

2. 测试插件。

```shell

curl http://127.0.0.1:9080/index.html

```

使用上述命令连续访问三次后，则会出现如下错误。

```
<html>
<head><title>503 Service Temporarily Unavailable</title></head>
<body>
<center><h1>503 Service Temporarily Unavailable</h1></center>
<hr><center>openresty</center>
</body>
</html>
```

返回上述结果，则表示 `limit-count` 插件已经配置成功。

## 流量控制插件

APISIX 除了提供限流限速的插件外，还提供了很多其他的关于 **traffic** 插件来满足实际场景的需求：

- [proxy-cache](/zh/docs/apisix/plugins/proxy-cache/)：该插件提供缓存后端响应数据的能力，它可以和其他插件一起使用。该插件支持基于磁盘和内存的缓存。
- [request-validation](/zh/docs/apisix/plugins/request-validation/)：该插件用于提前验证向上游服务转发的请求。
- [proxy-mirror](/zh/docs/apisix/plugins/proxy-mirror/)：该插件提供了镜像客户端请求的能力。流量镜像是将线上真实流量拷贝到镜像服务中，以便在不影响线上服务的情况下，对线上流量或请求内容进行具体的分析。
- [api-breaker](/zh/docs/apisix/plugins/api-breaker/)：该插件实现了 API 熔断功能，从而帮助我们保护上游业务服务。
- [traffic-split](/zh/docs/apisix/plugins/traffic-split/)：该插件使用户可以逐步引导各个上游之间的流量百分比。，你可以使用该插件实现蓝绿发布，灰度发布。
- [request-id](/zh/docs/apisix/plugins/request-id/)：该插件通过 APISIX 为每一个请求代理添加 `unique` ID 用于追踪 API 请求。
- [proxy-control](/zh/docs/apisix/plugins/proxy-control/)：该插件能够动态地控制 NGINX 代理的相关行为。
- [client-control](/zh/docs/apisix/plugins/client-control/)：该插件能够通过设置客户端请求体大小的上限来动态地控制 NGINX 处理客户端的请求。

## 更多操作

你可以参考[监控 API](/zh/docs/apisix/tutorials/observe-your-api/) 文档，对 APISIX 进行监控，日志采集，链路追踪等。
