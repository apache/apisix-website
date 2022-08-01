---
title: "Release Apache APISIX 2.7.0"
author: "Ruofei Zhao"
authorURL: "https://github.com/Serendipity96"
authorImageURL: "https://avatars.githubusercontent.com/u/23514812?v=4"
keywords:
- Apache APISIX
- Release Notes
Description: API Gateway Apache APISIX 2.7.0-Release is officially released! This release supports multilingual plugins, enhanced L4 TCP proxy, and NGINX functionality.
tags: [Community]
---

> Apache APISIX 2.7.0 has been released! Welcome to download and use it.

<!--truncate-->

This version supports multi-language plugins, enhances the four-layer TCP proxy and Nginx configuration. More than 20 developers participated, and 70 plus pull requests have been submitted. The following is an introduction to the key features.

## Release Notes

### Multi-language plugin

With the release of the first version of apisix-java-plugin-runner, and apisix-go-plugin-runner completes its main functions, the multi-language plugin of Apache APISIX supports the two most widely used back-end programming languages. If you are still worried that the development of Apache APISIX plugin will be limited to Lua ecosystem, please try our multi-language plugin runner to develop Java / Go plugins.

### Enhanced four-layer TCP proxy

In version 2.7, we have developed new features of TCP proxy, including:

- Allow domain name configuration in upstream
- Allow mqtt-proxy plugin to configure domain name
- Support for receiving TLS over TCP connections, the certificate of which can be dynamically configured just like HTTPS certificate
- SNI-based route rules
- Dynamic verification of client certificates

In future releases, we will continue to improve TCP proxy, so stay tuned!

### Enhanced Nginx configuration

We hope to dynamically set more and more Nginx configurations, so we add our own patches and Nginx C modules to enhance the native Nginx.

The following new features are currently included:

- Dynamically set mTLS
- Dynamically set client_max_body_size

In future releases, we will continue to allow the following Nginx configurations to be set dynamically:

- upstream keepalive
- gzip
- real_ip
- proxy_max_temp_file_size

## Download

Download Apache APISIX 2.7.0-Release

- Source code: please visit [download page](https://apisix.apache.org/downloads/)
- Binary installation package: please visit [Installation Guide](https://apisix.apache.org/zh/docs/apisix/how-to-build/)
