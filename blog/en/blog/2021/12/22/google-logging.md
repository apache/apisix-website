---
title: APISIX Integrates with Google Cloud Logging
authors:
  - name: "Jinchao Shuai"
    title: "Author"
    url: "https://github.com/shuaijinchao"
    image_url: "https://avatars.githubusercontent.com/u/8529452?v=4"
  - name: "Yilin Zeng"
    title: "Technical Writer"
    url: "https://github.com/yzeng25"
    image_url: "https://avatars.githubusercontent.com/u/36651058?v=4"
keywords:
- Apache APISIX
- Google Cloud
- Google Logging
- APISIX
- API Gateway
description: This article describes how to interface with the Google Cloud Logging service through the google-cloud-logging plugin of API Gateway Apache APISIX.
tags: [Plugins,Ecosystem]
image: https://static.apiseven.com/2022/blog/0818/plugins/Google-cloud.png
---

> This article will explain how to configure and use the Google Cloud Logging service in Apache APISIX.

<!--truncate-->

![Apache APISIX-Google Cloud Logging cover](https://static.apiseven.com/202108/1640155567091-2611f8b8-8181-42d8-8756-e892b3768a8d.png)

Logging is an important infrastructure for distributed systems. It can help developers observe the status of service operation, improve the efficiency of service troubleshooting and diagnosis, and conduct multi-dimensional analysis to improve the overall stability and operational efficiency of the system.

[Google Cloud Logging](https://cloud.google.com/logging/) is a real-time log management service provided by Google Cloud, offering EB-level storage, search, analysis, and alerting services. Google Cloud Logging's log browser allows you to search, sort, and analyze logs easily and efficiently, and Google Cloud Logging also provides saved queries and rich graphical features to make log screening results retrievable and more intuitive.

Apache APISIX has previously supported the integration of [HTTP Logger](https://github.com/apache/apisix/blob/master/docs/en/latest/plugins/http-logger.md) , [TCP Logger](https://github.com/apache/apisix/blob/master/docs/en/latest/plugins/tcp-logger.md), [Kafka Logger](https://github.com/apache/apisix/blob/master/docs/en/latest/plugins/kafka-logger.md), [UDP Logger](https://github.com/apache/apisix/blob/master/docs/en/latest/plugins/udp-logger.md), [RocketMQ Logger](https://github.com/apache/apisix/blob/master/docs/en/latest/plugins/rocketmq-logger.md), [SkyWalking Logger](https://github.com/apache/apisix/blob/master/docs/en/latest/plugins/skywalking-logger.md), [Aliyun Cloud Logging(SLS)](https://github.com/apache/apisix/blob/master/docs/en/latest/plugins/sls-logger.md) and many other open source and cloud logging service solutions.

Recently, Apache APISIX has also added support for Google Cloud Logging, giving users a new logging solution when using Apache APISIX as a gateway: use [google-cloud-logging](https://github.com/apache/apisix/blob/master/docs/en/latest/plugins/google-cloud-logging.md) to forward Apache APISIX request logs to the Google Cloud Logging service for analysis and storage.

When the plugin is enabled, Apache APISIX will take the request context information in Log Phase and serialize it into Google Cloud Logging's [LogEntry](https://cloud.google.com/logging/docs/reference/v2/rest/v2/LogEntry), then submit the serialized log data to the batch queue, and when the batch queue triggers a user-set time or entry threshold, the log data will be forwarded to Google Cloud Logging service via Google Cloud API to the Google Cloud Logging service.

This article will explain how to configure and use the Google Cloud Logging service in Apache APISIX.

## Configure Google Cloud

1. Open your browser and visit Google Cloud Homepage.
2. Enter your username and password to log in to the Google Cloud console.
3. Click the Google Cloud console left menu and select "IAM & Admin > Create a Project" to start creating a project.
   ![create a project](https://static.apiseven.com/202108/1640137078950-3a0b472b-df9f-4f75-9c03-816138860f74.png)
4. Enter a project name, select an organization name, and click "CREATE" to create the project.
   ![create a project-2](https://static.apiseven.com/202108/1640137136967-effec599-2263-45e7-874d-53a547b83aae.png)
5. When the project is created successfully, the top right corner of the console indicates that the creation was successful.
   ![project notification](https://static.apiseven.com/202108/1640137177601-6ac703ef-99e4-4ac2-82e3-5b978348f458.png)
6. Click in the window to select the project, or select the project operation path in the top navigation bar of the console home page. After selecting the project, you will be redirected to the console home page, where you can already see the data about the current project in the top navigation bar and the project information in the information center.
   ![view your project](https://static.apiseven.com/202108/1640137215687-4a2a4789-09d3-4cc0-85fa-be67762cf9b7.png)
7. After you finish creating the project, you need to create a service account for the project. Please go back to the Google Cloud console home page and click "IAM & Admin > Service Account" on the left menu to start creating a service account.
   ![start creating a service account](https://static.apiseven.com/202108/1640137733012-6c9808c8-9c96-401e-a680-03a276b964c0.png)
8. Click "CREATE SERVICE ACCOUNT" to create the service account.
   ![create a service account](https://static.apiseven.com/202108/1640137784375-e47cbe0e-7735-4e7b-a881-1a9ec1c12ffc.png)
9. Enter the service account name and ID (the ID usually follows the account generation), and then click "CREATE AND CONTINUE".
    ![create a service account-2](https://static.apiseven.com/202108/1640137834702-76166e6f-ed98-4a85-a759-2ce78f795794.png)
10. Click on "Role" and type "Logging Admin" in the search box to search for this role and select "Logging Admin" as the role.
    ![create a service account-3](https://static.apiseven.com/202108/1640137883981-0f780040-8398-4d38-9600-a5e54b29b48e.png)
11. Click "DONE" to complete the service account creation and jump to the service account home page. At this point you can see the account you just created and its details in the list.
    ![service account information](https://static.apiseven.com/202108/1640137970837-ed1994be-87d0-48b8-bec5-010200fe1f1d.png)
12. Click "Manage keys" in the last column of the service account to enter the secret key management interface.
    ![enter secret key management interface](https://static.apiseven.com/202108/1640138660649-cd57da29-5965-4251-9deb-300de830dfd9.png)
13. Click "ADD KEY > Create new key" to start creating a new secret key.
    ![create a new secret key](https://static.apiseven.com/202108/1640138732589-1aea201b-de2d-455a-8c04-c3f5a28dfa91.png)
14. Select the secret key type as "JSON" in the pop-up page, and then click "CREATE" to create a new secret key.
    ![create a new secret key-2](https://static.apiseven.com/202108/1640138785425-23ee8efe-bc0d-428a-a627-2f428440da37.png)
15. The private key information will be automatically downloaded to the system default Downloads directory through your browser . When you enable google-cloud-logging plugin, you need to use the information in this private key, so please save the private key file.
    ![Download your key](https://static.apiseven.com/202108/1640138820163-aa459874-e78e-4156-ab74-58fc7e2ae13f.png)

## Configure Apache APISIX

### Enable google-cloud-logging plugin

#### Option 1: Upload key file configuration

1. Upload the private key file to the Apache APISIX node server.
2. Configure the file path to the `google-cloud-logging.auth_file`, as shown below:

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
            // Google Cloud Logging Private Key File
            "auth_file":"/path/to/apache-apisix-fcafc68c2f41.json",
            // Maximum number of entries per batch queue.
            "batch_max_size": 1,
            // Maximum time to refresh the buffer in seconds.
            "inactive_timeout": 10
        }
    }
}'
```

#### Option 2: Declare configurations in JSON

1. Open the private key file.
2. Configure the value of `project_id` to `google-cloud-logging.auth_config.project_id`.
3. Configure the value of `private_key` to `google-cloud-logging.auth_config.private_key`.
As shown below:

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
            // Google Cloud Logging Private Key File
            "auth_config":{
                "project_id":"apache-apisix",
                "private_key":"-----BEGIN RSA PRIVATE KEY-----your private key-----END RSA PRIVATE KEY-----"
            },
            // Maximum number of entries per batch queue.
            "batch_max_size": 1,
            // Maximum time to refresh the buffer in seconds.
            "inactive_timeout": 10
        }
    }
}'
```

#### Parameters

|Name|Required|Defualt Value|Description|
|:-----|:-----|:-----|:-----|
|auth_config|No|n/a|Google Cloud Logging Private Key File. Either auth_config or auth_file must be configured.|
|auth_config.private_key|Yes|n/a|Google Cloud Logging Private Key.|
|auth_config.project_id|Yes|n/a|Project ID of Google Service Account.|
|auth_config.token_uri|No|oauth2.googleapis.com/token|The URI of the token requesting the Google Services account.|
|auth_config.entries_uri|No|logging.googleapis.com/v2/entries:write|Google Log Service Write Log Entry API.|
|auth_config.scopes|No|["https://www.googleapis.com/auth/logging.read","https://www.googleapis.com/auth/logging.write","https://www.googleapis.com/auth/logging.admin","https://www.googleapis.com/auth/cloud-platform"]|Google Services account access scope, refer to: [OAuth 2.0 Scopes for Google APIs](https://developers.google.com/identity/protocols/oauth2/scopes#logging)|
|auth_file|No|n/a|Path to the Google Services account JSON file (either auth_config or auth_file must be configured)|
|ssl_verify|No|TRUE|Enable SSL authentication, configured according to [OpenResty documentation](https://github.com/openresty/lua-nginx-module#tcpsocksslhandshake) options.|
|resource|No|{"type": "global"}|Google Monitored Resources, please refer to [MonitoredResource](https://cloud.google.com/logging/docs/reference/v2/rest/v2/MonitoredResource).|
|log_id|No|apisix.apache.org%2Flogs|Google Log ID, reference: [LogEntry](https://cloud.google.com/logging/docs/reference/v2/rest/v2/LogEntry).|
|max_retry_count|No|0|Maximum number of retries before removal from the processing pipeline.|
|retry_delay|No|1|Number of seconds that process execution should be delayed if execution fails.|
|buffer_duration|No|60|The maximum duration (in seconds) of the oldest entry in the batch must be processed first.|
|inactive_timeout|No|10|Maximum time to refresh the buffer in seconds.|
|batch_max_size|No|100|Maximum time to refresh the buffer in seconds.|

### Verify plugin is running normally

1. Run the following command to send a request to Google Cloud Logging.

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

2. Open your browser and visit Google Cloud Homepage.
3. Enter your username and password to log in to the Google Cloud console.
4. View the log of requests sent through the log browser, and the returned results are shown below.
   ![View the log](https://static.apiseven.com/202108/1640139014263-fac86f87-d008-475c-aeae-289ab4ba62a8.png)

### Disable google-cloud-logging plugin

You can remove the google-cloud-logging related configuration block to deactivate the plugin if you are finished using it.

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

## Summary

This article describes the detailed steps for interfacing Apache APISIX and Google Cloud Logging. We hope this article will give you a clearer understanding of using Google Cloud Logging in Apache APISIX and facilitate the subsequent hands-on operation.

Apache APISIX is not only committed to maintaining its own high performance, but also has always attached great importance to the construction of open source ecology. At present, Apache APISIX has 10+ logging-related plugins and supports interfacing with mainstream open source logging projects in the industry.

If you have a need to interface to other logs, visit Apache APISIX's [GitHub](https://github.com/apache/apisix/issues) and leave your suggestions via issue; or subscribe to the Apache APISIX [mailing list](https://apisix.apache.org/docs/general/join/) and express your thoughts via email.

## Related articles

[Apache APISIX Integrates with SkyWalking to Create a Full Range of Log Processing](https://apisix.apache.org/blog/2021/12/07/apisix-integrate-skywalking-plugin/)

[Apache APISIX & RocketMQ Helps User API Log Monitoring Capabilities](https://apisix.apache.org/blog/2021/12/08/apisix-integrate-rocketmq-logger-plugin/)
