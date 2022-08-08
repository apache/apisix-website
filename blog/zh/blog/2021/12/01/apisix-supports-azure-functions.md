---
title: "API 网关 APISIX 现已支持 Azure Functions"
author: "Bisakh Mondal"
authorURL: "https://github.com/bisakhmondal"
authorImageURL: "https://avatars.githubusercontent.com/u/41498427?v=4"
keywords: 
- Apache APISIX
- API 网关
- Azure Functions
- Microsoft
- Serverless
description: 本文介绍了 API 网关 Apache APISIX 新增的插件 `azure-functions`，并展示了如何将 Azure Functions（一种广泛使用的 serverless 解决方案）集成到 APISIX 中。
tags: [Ecosystem]
---

> 本文介绍了 Apache APISIX 最近新增的插件 `azure-functions`，并详细说明了如何将 Azure Functions 集成到 Apache APISIX 中。

<!--truncate-->

![Apache APISIX 支持 Azure Functions 集成](https://static.apiseven.com/202108/1638431191799-e1202fc7-d3b5-48db-a222-0c70a8b70da0.png)

Apache APISIX 为 Microsoft Azure Functions 提供了对 serverless 框架的支持。Apache APISIX 建议定义一个启用了无服务器插件的路由，而不是在应用程序中采用硬编码函数 URL。它使开发者能够灵活地热更新函数 URI。此外，因为 Apache APISIX 有非常强大的认证支持，这种方法还可以减轻应用逻辑中的授权和认证问题，可以用来识别和授权客户消费者访问带有 FAAS 的特定路由。本文介绍了 Apache APISIX 最近新增的插件 `azure-functions`，并详细说明了如何将 Azure Functions（一种广泛使用的 serverless 解决方案）集成到 Apache APISIX 中。

## azure-functions 插件工作原理

`azure-functions` 插件让用户为网关 URI 定义一个上游的 azure `HTTP Trigger` serverless 功能。如果启用，该插件将终止正在进行的对该 URI 的请求，并代表客户向 azure FAAS（新的上游）发起一个新的请求，其中包括用户设置的合适的授权细节、请求头、请求体、参数（这三个部分都是从原始请求中传递的），并将响应体、状态码和头返回给向 Apache APISIX 代理发出请求的原始客户。

该插件支持通过 API 密钥和 azure active directory 对 azure FAAS 服务进行授权。

## 如何在 Apache APISIX 中使用 azure-functions 插件

该插件的主要目标是将路由配置中指定的网关路由代理到 azure function URI 上。本节为您介绍如何在 azure 云上配置和创建 serverless HTTP Trigger。

1. 首先进入 Azure 并设置一个试用计划，最多可免费调用 100 万次。要了解更多关于定价的情况，请访问[这里](https://azure.microsoft.com/en-us/services/functions/#pricing)。

1. 访问[Azure Portal](https://portal.azure.com/#home)。
    1. 首先，创建一个资源组，为 FAAS 创建逻辑分区。
    ![创建资源组](https://static.apiseven.com/202108/1638349069240-911b8640-2de6-4f82-b75b-fb937b0bad40.png)
    1. 用你选择的 URL 创建一个 function 应用。
    ![创建一个 function 应用](https://static.apiseven.com/202108/1638349121520-01abe8e6-bc09-4be7-b010-f7baec59f89a.png)

1. 在 VSCode 编辑器中安装 [Azure Functions 插件](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions)。安装后，通过插件认证，并安装 azure function core tool，用于本地开发。

    ```shell
    npm install -g azure-functions-core-tools@3 --unsafe-perm true
    ```

1. 将下面的代码段部署到我们刚才通过 VSCode 中的 Azure Functions 扩展面板创建的同一个function 应用中。

    ```javascript
    module.exports = async function (context, req) {
    context.log('HTTP trigger invoked on Test-APISIX.')

    const name = req.query.name || (req.body && req.body.name)
    const responseMessage = name
        ? 'Hello, ' + name
        : 'This HTTP triggered function executed successfully. Pass a name in the query string or in the request body to generate a personalized response.'

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage,
    }
    }
    ```

> 这个代码段从查询参数中获取用户名字（如果不存在，则从请求体中获取）并向用户问好。

### 启用 azure-functions 插件

下面我们将通过一个示例为大家说明如何为一个特定的路由启用 `azure-functions` 插件。我们假设你的 HTTP Trigger 已经部署并准备好提供服务。

```shell
# enable plugin for a specific route
curl http://127.0.0.1:9080/apisix/admin/routes/1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "plugins": {
        "azure-functions": {
            "function_uri": "http://test-apisix.azurewebsites.net/api/HttpTrigger",
            "authorization": {
                "apikey": "<Generated API key to access the Azure-Function>"
            }
        }
    },
    "uri": "/azure"
}'
```

现在，任何对 Apache APISIX 网关上的 URI `/azure` 的请求（HTTP/1.1、HTTPS、HTTP2）都将触发对上述函数 URI 的 HTTP 调用，响应体与响应头和响应代码将被代理回给客户端。例如：

```shell
curl -i -XGET http://localhost:9080/azure\?name=Bisakh
HTTP/1.1 200 OK
Content-Type: text/plain; charset=utf-8
Transfer-Encoding: chunked
Connection: keep-alive
Request-Context: appId=cid-v1:38aae829-293b-43c2-82c6-fa94aec0a071
Date: Wed, 19 Nov 2021 18:46:55 GMT
Server: APISIX/2.10.2

Hello, Bisakh
```

考虑到，Apache APISIX 也是在[config-default.yaml](https://github.com/apache/apisix/blob/master/conf/config-default.yaml#L26)上以 `enable_http2: true` 运行，端口为 9081，客户端和 Apache APISIX 代理之间的任何 `HTTP/2` 通信将被代理到 azure faas，类似于 HTTP/1.1，响应将被代理回给客户端，并有适当的标题，例如：

```shell
curl -i -XGET --http2 --http2-prior-knowledge http://localhost:9081/azure\?name=Bisakh
HTTP/2 200
content-type: text/plain; charset=utf-8
request-context: appId=cid-v1:38aae829-293b-43c2-82c6-fa94aec0a071
Date: Wed, 19 Nov 2021 18:46:56 GMT
server: APISIX/2.10.2

Hello, Bisakh
```

### 停用 azure-functions 插件

如果需要停用 azure-functions 该插件，只需在插件配置中删除相应的 JSON 配置，禁用`azure-functions`插件，并添加合适的上游配置。Apache APISIX 插件是热加载的，因此不需要重新启动 Apache APISIX。

```shell
curl http://127.0.0.1:9080/apisix/admin/routes/1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "uri": "/azure",
    "plugins": {},
    "upstream": {
        "type": "roundrobin",
        "nodes": {
            "127.0.0.1:1980": 1
        }
    }
}'
```

## 自定义配置

在启用 `azure-functions` 插件创建新路由时，在最小的配置中，`function_uri` 是插件配置的强制性属性，指向函数的 URL。有很多额外的选项，可以通过插件参数和元数据参数进行调整。

### 插件参数解释

|名称|类型|必填|默认值|有效值|描述|
|----|----|--------|-------|-----|-----------|
|function_uri|string|是|n/a|n/a|触发 serverless functions 代码的 azure functions 端点（例如：http://test-apisix.azurewebsites.net/api/HttpTrigger）。|
|authorization|object|否|n/a|n/a|访问云 functions 的授权凭证。|
|authorization.apikey|string|否|n/a|n/a|授权内的字段。生成API密钥来授权对该端点的请求。|
|authorization.clientid|string|否|n/a|n/a|授权内的字段。客户端ID（azure active directory），用于授权对该端点的请求。|
|timeout|integer|否|3000|[100,...]|代理请求超时，以毫秒为单位。|
|ssl_verify|boolean|否|true|true/false|是否启用执行服务器的SSL验证。|
|keepalive|boolean|否|true|true/false|是否重复使用同一个代理连接。设置为false则禁用keepalives并立即关闭连接。|
|keepalive_pool|integer|否|5|[1,...]|池中的最大连接数。|
|keepalive_timeout|integer|否|60000|[1000,...]|最大的空闲超时，以毫秒为单位。|

这为严格约束 azure FAAS 的行为提供了很大的灵活性--从配置超时到 keepalive 池以及验证无服务器FAAS 的 SSL 证书。说实话，当涉及到无服务器时，这实际上意味着很多，因为服务是事件驱动的，而且资源是由云提供商即时分配的。

### Metadata 参数解释

同样，有一些属性可以通过使用元数据进行调整。

|名称|类型|必填|默认值|有效值|描述|
|----|----|--------|-------|-----|-----------|
|master_apikey|string|否|""|n/a|可用于访问 azure functions URI 的 API KEY。|
|master_clientid|string|否|""|n/a|可用于授权 function URI的客户ID（active directory）。|

`azure-functions` 插件的元数据提供了授权回退的功能。它定义了 `master_apikey` 和 `master_clientid` (azure active directory client id)，用户可以为关键任务的应用部署定义主 API 密钥或客户端 ID。因此，如果在插件属性中没有找到授权细节，元数据中的授权细节就会启动。

优先级排序如下

- 首先，该插件在 Apache APISIX 代理的请求头中寻找 `x-functions-key` 或 `x-functions-clientid` 键。

- 如果没有找到，azure-functions 插件会检查插件属性中的授权细节。如果存在，它会将相应的标头添加到发送到 Azure cloud function 的请求中。

- 如果在插件属性中没有找到授权细节，Apache APISIX 将为该插件获取元数据配置并使用主密钥。

要添加一个新的主 APIKEY，请用更新的元数据向 `/apisix/admin/plugin_metadata` 端点提出请求，如下所示：

```shell
curl http://127.0.0.1:9080/apisix/admin/plugin_metadata/azure-functions \
-H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "master_apikey" : "<Your azure master access key>"
}'
```

## 总结

`azure-functions` 插件是 Apache APISIX 为 serverless 设计的第二个插件。我们正在开发其他 serverless 插件，并会在即将发布的 Apache APISIX 版本中介绍这些插件。如果大家感兴趣，请[提交 Issue](https://github.com/apache/apisix/issues/new/choose)来分享你的意见，也可以在我们的[邮件列表](https://apisix.apache.org/docs/general/join)中分享开发新插件的建议!
