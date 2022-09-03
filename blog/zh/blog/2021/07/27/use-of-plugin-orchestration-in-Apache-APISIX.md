---
title: "插件编排在 Apache APISIX 中的应用与实践"
slug: 2021/07/27/use-of-plugin-orchestration-in-apache-apisix
author: "琚致远"
authorURL: "https://github.com/juzhiyuan"
authorImageURL: "https://avatars.githubusercontent.com/u/2106987?v=4"
keywords:
- API 网关
- APISIX
- 插件编排
- Apache APISIX Dashboard
description: 通过阅读本文，你可以了解云原生 API 网关 Apache APISIX 及其基本使用场景，以及在低代码潮流下，Apache APISIX 是如何集成“拖拽”的插件编排能力的。
tags: [Ecosystem]
---

> 通过阅读本文，您可以了解 Apache APISIX 与基本使用场景，以及在低代码潮流下，Apache APISIX 是如何集成“拖拽”的插件编排能力的。本文作者琚致远，Apache APISIX PMC，在[支流科技](https://api7.ai/)负责企业产品与大前端技术。

<!--truncate-->

## 什么是 Apache APISIX

Apache APISIX 是一个生产可用的七层全流量处理平台，可作为 API 网关处理业务流量入口，具有极高性能、超低延迟的显著特性。它内置了 50 多种插件，覆盖身份验证、安全防护、流量控制、Serverless、可观测性等多个方面，可满足企业客户常见的使用场景。

如下方架构图所示，Apache APISIX 分为数据面（左侧）与控制面（右侧）两部分：通过控制面下发配置到 ETCD，数据面借助丰富的插件处理内外流量。

![Apache APISIX architecture](https://static.apiseven.com/202108/1639466553989-ecae1a31-8121-4390-a830-f386b9b12322.png)

Apache APISIX 暴露了一组接口，方便我们为 API 绑定插件。如果我们希望为 API 增加限速能力，只需为 API 绑定 `limit-req` 插件：

``` shell
curl -X PUT http://127.0.0.1:9080/apisix/admin/routes/1 -d '

 {
   "uri": "/get",
   "methods": ["GET"],
   "upstream": {
     "type": "roundrobin",
     "nodes": {
       "httpbin.org:80": 1
     }
   },
   "plugins": {
     "limit-req": {
       "rate": 1,
       "burst": 2,
       "rejected_code": 503,
       "key": "remote_addr"
     }
   }
 }'
```

调用成功后，当请求到达该 API 时将进行限速管控。

该示例使用 `limit-req` 实现 API 限速（特定功能），若针对“根据某个插件的处理结果，决定后续的请求处理逻辑”这种场景化需求，该怎么做呢？当前，现有的插件机制无法满足这种需求，这时便引申出插件编排的能力来解决这个问题。

## 什么是插件编排

插件编排是低代码的一种表现形式，它可以帮助企业降低使用成本、增加运维效率，是企业数字化转型过程中不可或缺的能力。借助低代码 API 网关 Apache APISIX 中插件编排能力，我们可以轻松地将 50+ 插件通过“拖拽”的方式进行组合编排，被编排的插件也能够共享上下文信息，最终实现场景化需求。

扩展上述 API 限速的场景：请求使用 `key-auth`插件进行身份认证，若认证通过，将由`kafka-logger` 插件接管并进行日志记录；若认证失败（插件返回 401 状态码），将使用`limit-req` 插件进行限速。

见如下操作视频：

<iframe
    height="350"
    width="100%"
    src="https://api7-website-1301662268.file.myqcloud.com/202107/%E6%8F%92%E4%BB%B6%E7%BC%96%E6%8E%92.mp4"
    frameborder="0">
</iframe>

该视频中，Web 界面列出了目前已有的插件与画板，我们可以将插件拖拽到画板上进行编排，并填写插件绑定的数据，然后便完成了整个流程。在整个过程中：

1. 操作可视化：我们除了可以使用界面可视化创建 API 之外，还可以通过编排能力直观、清晰地进行场景化设计；
2. 流程可复用：通过导入、导出画板的 JSON 数据，可以便捷地复用编排生成的工程数据。
3. 组合新“插件”：将每一个场景视作一个插件，通过使用条件元件组合不同的插件，来实现插件创造“插件”。

## 实现原理

那么 Apache APISIX 是如何与低代码能力结合的呢？这需要数据面 Apache APISIX 与控制面 Apache APISIX Dashboard 共同配合完成。整体流程如下：

![Apache APISIX plugin orchestration flow](https://static.apiseven.com/202108/1639466624894-039f4e63-fd21-403a-94c5-6efc8425eb0f.png)

### Apache APISIX

在 Apache APISIX 中，我们在 Route 实体中新增了 `script` 执行逻辑 [PR](https://github.com/apache/apisix/pull/1982)，可用于接收 Dashboard 生成的 Lua 函数并执行，它支持调用已有插件以复用代码。另外，它也作用于 HTTP 请求的生命周期中的各个阶段，如 `access`、`header_filer`、`body_filter` 等，系统会在相应阶段自动执行 `script` 函数对应阶段代码，见如下 `script` 示例：

```shell
{

  "script": "local _M = {} \n function _M.access(api_ctx) \n ngx.log(ngx.INFO,\"hit access phase\") \n end \nreturn _M"

}
```

### Apache APISIX Dashboard

在 Dashboard 中，它包含了 Web 与 ManagerAPI 共两个子组件：Web 用于提供可视化界面，方便我们配置 API 网关；ManagerAPI 用于提供 RESTful API，供 Web 或其它客户端调用以便操作配置中心（默认为 ETCD），进而间接地控制 Apache APISIX。

为了生成合法、有效的 script 函数，ManagerAPI 选择了 DAG 有向无环图的数据结构进行底层设计，并自主研发了 `dag-to-lua` [项目](https://github.com/api7/dag-to-lua)：它将根节点作为开始节点，根据判断条件决定下一个流转插件，这将有效避免逻辑死循环。如下为 DAG 数据结构的示意图：

![Apache APISIX plugin orchestration DAG data structure](https://static.apiseven.com/202108/1639466682723-dcfd5c1b-9ae7-42b4-b3c2-c00aaf7a5996.png)

对应到 ManagerAPI 接收的 `script` 参数上，示例如下：

```shell
{
  "conf": {
    "1-2-3": {
      "name": "plugin-a",
      "conf": {
        ...

      }
    },

    "4-5-6": {
      "name": "plugin-b",
      "conf": {
        ...
      }
    },
    "7-8-9": {
      "name": "plugin-c",
      "conf": {
        ...
      }
    }
  },

  "rule": {
    "root": "1-2-3", // 起始节点 ID
    "1-2-3": [
      [
        "code == 200",
        "4-5-6"
      ], [
        "",
        "7-8-9"
      ]
    ]
  }
}
```

即客户端将最终编排后的数据转换为上述格式后，ManagerAPI 会借助 `dag-to-lua` 项目生成 Lua 函数，并交给 Apache APISIX 执行。

在 Web 侧，经过挑选、对比与项目验证，我们选择了蚂蚁金服开源的 X6 图编辑引擎作为插件编排 Web 部分的底层框架，除了完善、清晰的文档外，一系列开箱即用的交互组件以及节点可定制化能力也是我们选择它的原因。

![X6 introduction](https://static.apiseven.com/202108/1639466742487-269ebd5a-4f6c-47c3-a941-1275a4b3d178.png)

在编排实现过程中，我们抽象出了通用元件与插件元件的概念：通用元件是指开始节点、结束节点与条件判断节点，插件元件则是每一个可用的 Apache APISIX 插件，通过将这些元件拖拽到画板中来完成插件编排的流程。如图所示：

![Apache APISIX dashboard plugin orchestration demo1](https://static.apiseven.com/202108/1639466805116-0e1c9a83-e5d0-40c1-8a76-8cb1402a491c.png)

在拖拽过程中，我们需要限制一系列的边界条件，这里有几个例子：

当插件未配置时，系统将出现「存在未配置的元件」的错误提示，可以直观地看到哪个插件没有配置数据：

![Apache APISIX dashboard plugin orchestration demo2](https://static.apiseven.com/202108/1639466853301-a67de136-633d-4b5d-9062-ac17bf625063.png)

当编辑某条 API 时，若该 API 已经绑定了插件数据，当使用插件编排模式时，系统在检测后将出现警告信息，只有用户明确确认希望使用编排模式时，系统才能继续进行。这可以有效避免 API 数据被误操作的情况。

![Apache APISIX dashboard plugin orchestration demo3](https://static.apiseven.com/202108/1639466907551-07ec82f9-8988-4a66-a5f2-d3944d4f239c.png)

此外，还存在诸如开始元件只能有一个输出、条件判断元件只能有一个输入等情况。试想：如果系统不加限制地让用户操作，不合理的插件组合既无意义，又会产生无法预料的错误，因此不断丰富边界条件，也是在设计插件编排时需要着重考虑的问题。

当我们完成编排后，将使用 X6 暴露的 API 生成流程图的 JSON 数据，然后转换为系统需要的 DAG 数据，最终生成 Lua 函数。

## 未来展望

通过拖拽的方式，可以使得使用人员更方便地组合插件来满足不同的场景，以提升 API 网关可扩展能力与运维体验。在实际使用过程中，存在如下可以继续优化的问题：

1. 目前元件的边界判断条件还不够丰富，通过继续完善这些条件，以减少不合理的编排组合；
2. 当前编排示例不多，提供更多的参考示例可方便开发者学习、供用户使用；
3. 当前 Apache APISIX 使用了插件定义的 code 进行状态返回（异常则返回状态码，请求终止），可以支持更多 HTTP Response 字段甚至修改插件定义来扩展插件编排能力，如下述插件定义：

```shell
local _M = {
  version = 0.1,
  priority = 2500,
  type = 'auth',
  name = plugin_name,
  schema = schema,
  # 新增的 result 字段，可存储插件运行结果，并传递到下个插件。
  result = {
    code = {
      type = "int"
    }
  }
}
```
