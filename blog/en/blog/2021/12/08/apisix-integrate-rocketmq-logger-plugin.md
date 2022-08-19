---
title: "API Log Monitor with Apache APISIX & RocketMQ"
authors: 
  - name: "Zhou Yu"
    title: "Author"
    url: "https://github.com/yuz10"
    image_url: "https://avatars.githubusercontent.com/u/14816818?v=4"
  - name: "Sylvia"
    title: "Technical Writer"
    url: "https://github.com/SylviaBABY"
    image_url: "https://avatars.githubusercontent.com/u/39793568?v=4"
keywords: 
- Apache APISIX
- Apache RocketMQ
- API
- Log processing
- Monitoring function
description: The rocketmq-logger log plugin added by the API gateway Apache APISIX can help you connect with the RocketMQ cluster more conveniently when using APISIX.
tags: [Plugins,Ecosystem]
image: https://static.apiseven.com/2022/blog/0818/plugins/RocketMQy.png
---

> This article will introduce the latest integration of Apache APISIX and Apache RocketMQ rocketmq-logger plugin features and use. With this plugin, you can connect to the RocketMQ cluster more easily when using Apache APISIX.

<!--truncate-->

Since Apache RocketMQ came to the global developers' attention in 2016, it has grown to become the core data base of the technology middle office in multiple fields such as e-commerce, finance, education, and technology.

According to incomplete statistics, more than 70% of domestic users (including top 100 enterprises in various fields such as finance, insurance, wealth and brokerage) have deployed Apache RocketMQ at scale on their core application links, including the top 5 global cloud vendors have also launched cloud product services about Apache RocketMQ.

In addition to regular applications for core business message processing, a large number of companies are using Apache RocketMQ for log processing and analysis.

## Plug-in Introduction

To meet the needs of enterprise users for log processing, Apache APISIX has released `rocketmq-logger`, a logging plugin based on Apache RocketMQ that supports pushing API interface request logs to RocketMQ clusters as JSON.

The plugin uses the TCP protocol natively supported by RocketMQ, and achieves high concurrency and high performance access through the non-blocking TCP socket API provided by OpenResty.

Also, the API log format sent using the `rocketmq-logger` plugin is the same as other logging plugins, with support for bulk logging, custom log formats, retry support, and other features.

In addition, the plug-in also supports TLS encrypted transmission, as well as configuring AK, SK authentication to access Apache RocketMQ, to meet the needs of users for data security.

## How to Use

### Start RocketMQ

Start RocketMQ locally with the following command, for details refer to the [official documentation](https://rocketmq.apache.org/docs/quick-start/).

```shell
wget https://dlcdn.apache.org/rocketmq/4.9.2/rocketmq-all-4.9.2-bin-release.zip

unzip rocketmq-all-4.9.2-bin-release.zip

cd rocketmq-4.9.2/

nohup sh bin/mqnamesrv &

nohup sh bin/mqbroker -n 127.0.0.1:9876 -c conf/broker.conf &
```

### Enable the plugin in Apache APISIX

Enabling the `rocketmq-logger` plugin for a given route in a production environment requires only a single command.

```shell
curl http://127.0.0.1:9080/apisix/admin/routes/1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "plugins": {
       "rocketmq-logger": {
           "nameserver_list" : [ "127.0.0.1:9876" ],
           "topic" : "test",
       }
    },
    "upstream": {
       "nodes": {
           "127.0.0.1:1980": 1
       },
       "type": "roundrobin"
    },
    "uri": "/hello"
}'
```

When the `rocketmq-logger` plugin is enabled, any request to the endpoint `URI/hello` will push the log to Apache RocketMQ.

Details of the specific supported parameters can be found in the following table.

| Name             | Type    | Description                                             |
| ---------------- | ------- |  ------------------------------------------------ |
| nameserver_list  | object  | Nameserver list of rocketmq to be pushed.|
| topic            | string  | The topic to be pushed.                  |
| key              | string  | The keys that sent the message.          |
| tag              | string  | The tags that sent the message.          |
| timeout          | integer | The timeout for sending data.            |
| use_tls          | boolean | Whether to enable TLS encryption.        |
| access_key       | string  | An empty access key, string certified by ACL indicates that ACL is not enabled.     |
| secret_key       | string  | ACL certified secret key.                |

#### Plugin metadata settings

Of course, if you do not want to use the default log format during use, you can also set the metadata for the plugin.

The first thing you can do is to adjust the relevant log format in the form of a template.

| Name             |  Default Value |  Description                                             |
| ---------------- |  ------------- | ------------------------------------------------ |
| log_format       |  {"host": "$host", "@timestamp": "$time_iso8601", "client_ip": "$remote_addr"} |    Declare the log format as a key-value pair in JSON format. For the value section, only strings are supported. If it starts with `$`, it indicates that you want to get the __APISIX__ variable or [Nginx built-in variable](http://nginx.org/en/docs/varindex.html). In particular, __this setting takes effect globally__, which means that when log_format is specified, it will take effect on all Route or Service bound to http-logger. |

Once the log format is adjusted, you need to send a request to the `/apisix/admin/plugin_metadata` endpoint to update the metadata, as described in the code below.

```shell
curl http://127.0.0.1:9080/apisix/admin/plugin_metadata/rocketmq-logger -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "log_format": {
        "host": "$host",
        "@timestamp": "$time_iso8601",
        "client_ip": "$remote_addr"
    }
}'
```

## Disable the Plugin

If you no longer use the plugin, you can disable the `rocketmq-logger` plugin by removing the appropriate JSON configuration from the plugin configuration. This process does not require a restart of the service and will take effect immediately by entering the code below.

```shell
curl http://127.0.0.1:9080/apisix/admin/routes/1  -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "methods": ["GET"],
    "uri": "/hello",
    "plugins": {},
    "upstream": {
        "type": "roundrobin",
        "nodes": {
            "127.0.0.1:1980": 1
        }
    }
}'
```
