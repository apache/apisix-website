---
title: "Release Apache APISIX 2.7.0"
author: Serendipity96
authorURL: "https://github.com/Serendipity96"
authorImageURL: "https://avatars.githubusercontent.com/u/23514812?v=4"
---
> [@Serendipity96](https://github.com/Serendipity96), Apache APISIX contributor from [Shenzhen Zhiliu Technology Co.](https://www.apiseven.com/)
>
<!--truncate-->

Apache APISIX 2.7.0 has been released! Welcome to download and use it.

This version supports multi-language plugins, enhances the four-layer TCP proxy, and enhances Nginx configuration. More than 20 developers participated, and more than 70 pull requests have been submitted. The following is an introduction to the key features.

## Release Notes

### Multi-language plugin

With the release of the first version of apisix-java-plugin-runner,  and apisix-go-plugin-runner completes main function,  the multi-language plugin of Apache APISIX supports the two most widely used back-end programming languages. If you are still worried that the development of Apache APISIX plugin will be limited to Lua ecosystem, please try our multi-language plugin runner to develop Java / Go plugins.

### Enhanced four-layer TCP proxy

In version 2.7, we have developed new features of TCP proxy, including:

- Allow domain name configuration in upstream
- Allow mqtt-proxy plugin to configure domain name
- Support receiving TLS over TCP connection, the certificate can be dynamically configured like HTTPS certificate
- Route rules  based on SNI
- Verify client certificate dynamically

In subsequent versions, we will continue to improve TCP proxy,  stay tuned!

### Enhanced Nginx configuration

We hope to set more and more Nginx configurations dynamically, so we add our own patches and Nginx C modules to enhance native Nginx.

The following new features are currently included:

- Set mTLS dynamically
- Set client_max_body_size dynamically

In subsequent versions, we will continue to set the following Nginx configurations to dynamically:

- upstream keepalive
- gzip
- real_ip
- proxy_max_temp_file_size

## Download

Download Apache APISIX 2.7.0-Release

- Source code: please visit [download page](https://apisix.apache.org/downloads/)
- Binary installation package: please visit [installation guide](https://apisix.apache.org/zh/docs/apisix/how-to-build/)
