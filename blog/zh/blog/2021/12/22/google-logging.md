---
title: API 网关现已支持对接 Google Cloud Logging
authors:
  - name: "帅进超"
    title: "Author"
    url: "https://github.com/shuaijinchao"
    image_url: "https://avatars.githubusercontent.com/u/8529452?v=4"
  - name: "曾奕霖"
    title: "Technical Writer"
    url: "https://github.com/yzeng25"
    image_url: "https://avatars.githubusercontent.com/u/36651058?v=4"
keywords:
- Apache APISIX
- Google Cloud
- API 网关
- Google Logging
- APISIX
description: 本文介绍了如何通过 API 网关 Apache APISIX 的 google-cloud-logging 插件与 Google Cloud Logging 服务对接，并将 Apache APISIX 的日志上传到 Google 云中。
tags: [Plugins, Ecosystem]
image: https://static.apiseven.com/2022/blog/0818/plugins/Google-cloud.png
---

> 本文将为大家介绍如何在 Apache APISIX 中配置和使用 Google Cloud Logging 服务。

<!--truncate-->

![Apache APISIX-Google Cloud logging cover](https://static.apiseven.com/202108/1640155567091-2611f8b8-8181-42d8-8756-e892b3768a8d.png)

日志是大型分布式系统的重要基础设施，可以帮助开发者检查观测服务运行的状态，提高服务故障排查和诊断效率以及进行多维度的分析，以此提高系统整体的稳定性和运行效率。

Google Cloud Logging 是由 Google Cloud 提供的全代管式实时日志管理服务，提供 EB 级的存储、搜索、分析和提醒等服务。通过 Google Cloud Loging 的日志浏览器你可以简单高效的对日志进行对日志进行搜索、排序和分析，并且 Google Cloud Logging 还提供了保存查询和丰富的图表功能可以使日志筛查结果可回溯且有更直观的呈现。

Apache APISIX 在此之前已经支持集成了 [HTTP Logger](https://github.com/apache/apisix/blob/master/docs/en/latest/plugins/http-logger.md) 、[TCP Logger](https://github.com/apache/apisix/blob/master/docs/en/latest/plugins/tcp-logger.md)、[Kafka Logger](https://github.com/apache/apisix/blob/master/docs/en/latest/plugins/kafka-logger.md)、[UDP Logger](https://github.com/apache/apisix/blob/master/docs/en/latest/plugins/udp-logger.md)、[RocketMQ Logger](https://github.com/apache/apisix/blob/master/docs/en/latest/plugins/rocketmq-logger.md)、[SkyWalking Logger](https://github.com/apache/apisix/blob/master/docs/en/latest/plugins/skywalking-logger.md)、[Aliyun Cloud Logging（SLS）](https://github.com/apache/apisix/blob/master/docs/en/latest/plugins/sls-logger.md)等众多开源及云日志服务解决方案。

最近，Apache APISIX 对 Google Cloud Logging 也完成了支持，在使用 Apache APISIX 作为网关时用户又多了一种新的日志解决方案：使用 google-cloud-logging 插件，将 Apache APISIX 的请求日志转发到 Google Cloud Logging 服务中进行分析和存储。

启用该插件后， Apache APISIX 将在 Log Phase 获取请求上下文信息并序列化为 Google Cloud Logging 的日志格式，然后将序列化后的日志数据提交到批处理队列中，当批处理队列触发用户设置的时间或条目阈值时会将日志数据通过 Google Cloud API 批量转发到 Google Cloud Logging 服务中。

本文将为大家介绍如何在 Apache APISIX 中配置和使用 Google Cloud Logging 服务。

## 配置 Google Cloud

1. 打开浏览器，访问 Google Cloud 首页。
2. 输入用户名和密码，登录 Google Cloud 控制台。
3. 单击 Google Cloud 控制台左侧菜单，选择 “IAM & Admin > Create a Project”，开始创建项目。
   ![创建项目](https://static.apiseven.com/202108/1640137078950-3a0b472b-df9f-4f75-9c03-816138860f74.png)
4. 输入项目名称，选择组织名称，单击 “CREATE” 创建项目。
   ![创建项目-2](https://static.apiseven.com/202108/1640137136967-effec599-2263-45e7-874d-53a547b83aae.png)
5. 创建项目成功后，控制台右上角提示创建成功。
   ![成功创建项目](https://static.apiseven.com/202108/1640137177601-6ac703ef-99e4-4ac2-82e3-5b978348f458.png)
6. 在窗口中点击选择项目，或在控制台首页顶部导航栏选择项目操作路径。选择项目后，将跳转至控制台首页，此时在顶部导航栏和信息中心的项目信息中已经可以看到当前项目的相关数据。
   ![查看项目](https://static.apiseven.com/202108/1640137215687-4a2a4789-09d3-4cc0-85fa-be67762cf9b7.png)
7. 完成项目创建后，你需要为该项目创建服务账号。请返回 Google Cloud 控制台首页，单击左侧菜单“IAM & Admin > Service Account”，开始创建服务账号。
   ![开始创建服务账号](https://static.apiseven.com/202108/1640137733012-6c9808c8-9c96-401e-a680-03a276b964c0.png)
8. 单击“CREATE SERVICE ACCOUNT”创建服务账号。
   ![创建服务账号](https://static.apiseven.com/202108/1640137784375-e47cbe0e-7735-4e7b-a881-1a9ec1c12ffc.png)
9. 输入服务账号名称及 ID（ID 一般跟随账号生成），然后单击 “CREATE AND CONTINUE”。
    ![创建服务账号-2](https://static.apiseven.com/202108/1640137834702-76166e6f-ed98-4a85-a759-2ce78f795794.png)
10. 单击“Role”，在搜索框中输入“Logging Admin”搜索这个角色，选择“Logging Admin”作为角色。
    ![创建服务账号-3](https://static.apiseven.com/202108/1640137883981-0f780040-8398-4d38-9600-a5e54b29b48e.png)
11. 单击“DONE”，完成服务账号创建，跳转到服务账号首页。此时你可以在列表中看到刚刚创建的账号及详情。
    ![查看账号及详情](https://static.apiseven.com/202108/1640137970837-ed1994be-87d0-48b8-bec5-010200fe1f1d.png)
12. 在服务账号最后一列的操作栏单击“Manage keys”，进入秘钥管理界面。
    ![进入秘钥管理界面](https://static.apiseven.com/202108/1640138660649-cd57da29-5965-4251-9deb-300de830dfd9.png)
13. 单击“ADD KEY > Create new key”，开始创建新秘钥。
    ![创建新秘钥](https://static.apiseven.com/202108/1640138732589-1aea201b-de2d-455a-8c04-c3f5a28dfa91.png)
14. 在弹窗页中选择秘钥类型为“JSON”，然后单击“CREATE”，创建新秘钥。
    ![创建新秘钥-2](https://static.apiseven.com/202108/1640138785425-23ee8efe-bc0d-428a-a627-2f428440da37.png)
15. 私钥信息将通过浏览器自动下载到系统默认 Downloads 目录中，启用 google-cloud-logging 插件时，需要使用这个私钥中的信息，因此请妥善保存私钥文件。
    ![下载私钥文件](https://static.apiseven.com/202108/1640138820163-aa459874-e78e-4156-ab74-58fc7e2ae13f.png)

## 配置 Apache APISIX

### 启用 google-cloud-logging 插件

#### 方式一：上传私钥文件配置

1. 将私钥文件上传到 Apache APISIX 节点服务器中。
2. 将文件路径配置到 `google-cloud-logging. auth_file` 配置项上，如下所示：

```shell
curl http://127.0.0.1:9080/apisix/admin/routes/1  -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "uri":"/logging.do",
    "upstream":{
        "type":"roundrobin",
        "nodes":{
            "127.0.0.1:1980":1
        }
    },
    "plugins":{
        "google-cloud-logging":{
            // Google Cloud Logging 私钥文件
            "auth_file":"/path/to/apache-apisix-fcafc68c2f41.json",
            // 每个批处理队列最大容纳日志条目数
            "batch_max_size": 1,
            // 刷新批处理队列缓冲区的最大时间（以秒为单位）
            "inactive_timeout": 10
        }
    }
}'
```

#### 通过 JSON 文本配置

1. 打开私钥文件。
2. 将 `project_id` 的值配置到 `google-cloud-logging. auth_config.project_id` 配置项中。
3. 将 `private_key` 的值配置到 `google-cloud-logging. auth_config. private_key` 配置项中。

如下所示：

```shell
curl http://127.0.0.1:9080/apisix/admin/routes/1  -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "uri":"/logging.do",
    "upstream":{
        "type":"roundrobin",
        "nodes":{
            "127.0.0.1:1980":1
        }
    },
    "plugins":{
        "google-cloud-logging":{
            // Google Cloud Logging 私钥文件
            "auth_config":{
                "project_id":"apache-apisix",
                "private_key":"-----BEGIN RSA PRIVATE KEY-----your private key-----END RSA PRIVATE KEY-----"
            },
            // 每个批处理队列最大容纳日志条目数
            "batch_max_size": 1,
            // 刷新批处理队列缓冲区的最大时间（以秒为单位）
            "inactive_timeout": 10
        }
    }
}'
```

#### 参数说明

|参数名称|是否必填|默认值|描述|
|:-----|:-----|:-----|:-----|
|auth_config|否|n/a|Google Cloud Logging 私钥文件，必须配置 auth_config 或 auth_file 之一|
|auth_config.private_key|是|n/a|Google Cloud Logging 的私钥参数|
|auth_config.project_id|是|n/a|谷歌服务帐号的项目 ID|
auth_config.token_uri|否|oauth2.googleapis.com/token|请求 Google Service Account 的令牌的 URI|
|auth_config.entries_uri|否|logging.googleapis.com/v2/entries:write|Google Cloud Logging 写入日志条目的 API|
|auth_config.scopes|否|["https://www.googleapis.com/auth/logging.read","https://www.googleapis.com/auth/logging.write","https://www.googleapis.com/auth/logging.admin","https://www.googleapis.com/auth/cloud-platform"]|谷歌服务账号的访问范围, 参考：[OAuth 2.0 Scopes for Google APIs](https://developers.google.com/identity/protocols/oauth2/scopes#logging)|
|auth_file|否|n/a|谷歌服务账号 JSON 文件的路径（必须配置 auth_config 或 auth_file 之一）|
|ssl_verify|否|TRUE|启用 SSL 验证, 配置根据 [OpenResty documentation](https://github.com/openresty/lua-nginx-module#tcpsocksslhandshake)选项|
|resource|否|{"type": "global"}|谷歌监控资源，参考：[MonitoredResource](https://cloud.google.com/logging/docs/reference/v2/rest/v2/MonitoredResource)|
|log_id|否|apisix.apache.org%2Flogs|谷歌日志 ID，参考：[LogEntry](https://cloud.google.com/logging/docs/reference/v2/rest/v2/LogEntry).|
|max_retry_count|否|0|从处理管道中移除之前的最大重试次数|
|retry_delay|否|1|如果执行失败，流程执行应延迟的秒数|
|buffer_duration|否|60|必须先处理批次中最旧条目的最大期限（以秒为单位）|
|inactive_timeout|否|10|刷新缓冲区的最大时间（以秒为单位）|
|batch_max_size|否|100|每个批处理队列可容纳的最大条目数|

### 验证插件是否成功运行

1. 运行以下命令，向 Google Cloud Logging 发送请求。

  ```shell
  curl -i http://127.0.0.1:9080/logging.do
  HTTP/1.1 200 OK
  Content-Type: text/html; charset=utf-8
  Transfer-Encoding: chunked
  Connection: keep-alive
  Date: Fri, 10 Dec 2021 09:57:52 GMT
  Server: APISIX/2.11.0

  Hello, Google Cloud Logging
  ```

2. 打开浏览器，访问 Google Cloud 首页。
3. 输入用户名和密码，登录 Google Cloud 控制台。
4. 通过日志浏览器查看发送的请求日志，返回结果如下图所示。
   ![查看日志](https://static.apiseven.com/202108/1640139014263-fac86f87-d008-475c-aeae-289ab4ba62a8.png)

### 停用 google-cloud-logging 插件

如使用结束，可以移除 `google-cloud-logging` 相关配置块进行停用该插件。

```shell
curl http://127.0.0.1:9080/apisix/admin/routes/1  -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "uri":"/logging.do",
    "upstream":{
        "type":"roundrobin",
        "nodes":{
            "127.0.0.1:1980":1
        }
    },
    "plugins":{
    }
}'
```

## 总结

本文为大家描述了 Apache APISIX 和 Google Cloud Logging 对接的详细操作步骤，希望通过本文可以让大家对于在 Apache APISIX 中使用 Google Cloud Logging 有更清晰的理解，方便后续进行上手实操。

Apache APISIX 不仅致力于保持自身的高性能，也一直非常重视开源生态的建设。目前 Apache APISIX 已经拥有了 10+ 个日志相关的插件，支持与业界主流的开源日志项目对接。

如果你有对接其他日志的需求，不妨访问 Apache APISIX 的 [GitHub](https://github.com/apache/apisix/issues)，通过 issue 留下你的建议；或订阅 Apache APISIX 的[邮件列表](https://apisix.apache.org/zh/docs/general/join)，通过邮件表达你的想法。

## 相关阅读

[强强联合！APISIX 集成 SkyWalking 打造全方位日志处理](https://apisix.apache.org/zh/blog/2021/12/07/apisix-integrate-skywalking-plugin/)

[Apache APISIX 携手 RocketMQ 为实时 API 日志监控功能再下一城](https://apisix.apache.org/zh/blog/2021/12/08/apisix-integrate-rocketmq-logger-plugin/)
