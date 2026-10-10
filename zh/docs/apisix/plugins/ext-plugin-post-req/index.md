# ext-plugin-post-req

> 本文介绍了关于 Apache APISIX `ext-plugin-post-req` 插件的基本信息及使用方法。

Source: https://apisix.apache.org/zh/docs/apisix/plugins/ext-plugin-post-req/

## 描述

`ext-plugin-post-req` 插件的功能与 `ext-plugin-pre-req` 插件的不同之处在于：`ext-plugin-post-req` 插件是在内置 Lua 插件执行之后且在请求到达上游之前工作。

你可以参考 [ext-plugin-pre-req](/zh/docs/apisix/plugins/ext-plugin-pre-req/) 文档，学习如何配置和使用 `ext-plugin-post-req` 插件。
