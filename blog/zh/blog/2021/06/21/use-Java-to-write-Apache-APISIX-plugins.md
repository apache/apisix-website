---
title: "使用 Java 编写 Apache APISIX 插件"
slug: 2021/06/21/use-java-to-write-apache-apisix-plugins
author: "屠正松"
authorURL: "https://github.com/tzssangglass"
authorImageURL: "https://avatars.githubusercontent.com/u/30819887?v=4"
keywords:
- Apache APISIX
- API 网关
- Java
- 插件
- Spring Cloud
description: 云原生 API 网关 Apache APISIX 已经支持了 Java 编写插件，使用者不仅可以使用 Java 语言编写插件，还可以融入 Spring Cloud 生态圈，广泛使用生态圈内的各种技术组件。
tags: [Ecosystem]
---

> Apache APISIX 支持多语言编写插件了！不会 Lua 也没关系，现在可以用你熟悉的语言编写插件，文末还有视频教程。

<!--truncate-->

## 1. 简介

### 1.1 为什么 Apache APISIX 要支持多语言编写插件

在支持多语言编程插件前，Apache APISIX 只支持使用 Lua 语言编写插件，需要开发者掌握 Lua 和 OpenResty 相关的开发能力。然而相对于主流开发语言 Java、Go 来说，Lua 和 OpenResty 属于相对小众的技术，开发者很少。如果从头开始学习 Lua 和 OpenResty，需要付出相当多的时间和精力。

开发团队在进行技术选型的时候，最重要的考量就是所选技术是否与本团队技术栈相匹配，然而小众的技术栈就限制了 Apache APISIX 在更广阔的场景下进行技术落地。

现在 Apache APISIX 支持多语言开发插件，**更重要的是支持语言所在的开发生态圈，使用者可以使用自己熟悉的技术栈来开发 Apache APISIX**。以支持 Java 为例，使用者不仅可以使用 Java 语言编写插件，还可以融入 Spring Cloud 生态圈，广泛使用生态圈内的各种技术组件。

### 1.2 Apache APISIX 多语言支持架构图

![2021-06-21-1](https://static.apiseven.com/202108/1639464774923-50cebc94-6344-4ea6-88a6-2b424c5f8567.png)

上图左边是 Apache APISIX 的工作流程，右边的 plugin runner 是指插件运行器，泛指多语言支持的项目。本文档下面提到的 apisix-java-plugin-runner 项目就是支持 Java 语言的 plugin runner。

当你在 Apache APISIX 中配置一个 plugin runner 时，Apache APISIX 会启动一个子进程运行 plugin runner，该子进程与 Apache APISIX 进程属于同一个用户。当我们重启或重新加载 Apache APISIX 时，plugin runner 也将被重启。

如果你为一个给定的路由配置了 ext-plugin-* 插件，命中该路由的请求将触发  Apache APISIX，通过 unix socket 向 plugin runner 执行 RPC 调用。调用细分为两个阶段：

- ext-plugin-pre-req: 在执行 Apache APISIX 内置插件(Lua 语言插件)之前
- ext-plugin-post-req: 在执行 Apache APISIX 内置插件(Lua 语言插件)之后

根据需要配置 plugin runner 的执行时机。

plugin runner 会处理 RPC 调用，在其内部创建一个模拟请求，然后运行多语言编写的插件，并将结果返回给 Apache APISIX。

多语言插件的执行顺序是在 ext-plugin-* 插件配置项中定义的。像其他插件一样，它们可以被启用并在运行中重新定义。

## 2. 搭建开发环境

首先需要搭建 Apache APISIX 的运行环境或者开发环境，参考 [构建 Apache APISIX](https://github.com/apache/apisix/blob/master/docs/zh/latest/how-to-build.md)，以及 Java 项目的开发环境，参考 [构建 apisix-java-plugin-runner](https://github.com/apache/apisix-java-plugin-runner/blob/main/docs/development.md)。

**注意**：Apache APISIX 和 apisix-java-plugin-runner 需要位于同一实例上。

## 3. 进入调试模式

### 3.1 设置 Apache APISIX 进入调试模式

这里是指让 Apache APISIX 以调试的方式运行外部插件，在 `config.yaml` 中增加以下配置

```text
ext-plugin:
  path_for_test: /tmp/runner.sock
```

这个配置的意思是，Apache APISIX  相当于 client 端，会监听位于 `/tmp/runner.sock` 位置上的 Unxi Domain Socket 链接。

### 3.2 设置 apisix-java-plugin-runner 进入调试模式

在启动 `Main class(org.apache.apisix.plugin.runner.PluginRunnerApplication)`之前，需要配置用户级的环境变量 `APISIX_LISTEN_ADDRESS=unix:/tmp/runner.sock` 和 `APISIX_CONF_EXPIRE_TIME=3600`。

如果你是使用 IDEA 进行开发，那么配置好的环境变量示意如下：

![2021-06-21-2](https://static.apiseven.com/202108/1639464890287-ee6bbc3a-3f8b-4de7-9ce4-7670fb0c3f64.png)

apisix-java-plugin-runner 相当于 server 端，在启动时会主动创建 `/tmp/runner.sock` 文件，并在这个文件上与 Apache APISIX 进行 Unix Domain Socket 通信。

## 4. 开发

### 4.1 场景

我们以一个场景来代入开发过程：需要验证请求 header 中 token 的有效性，验证 token 的方式是用请求中携带 token 作为参数，访问 SSO 固定的接口，如果 token 验证通过则放行请求，验证失败则阻止请求。

### 4.2 配置 Apache APISIX

先给插件命名为 `TokenValidator`，然后设计属性，为了尽可能做到动态配置，属性设计如下

```json
{
  "validate_header": "token",
  "validate_url": "https://www.sso.foo.com/token/validate",
  "rejected_code": "403"
}
```

启动 Apache APISIX，然后新增一条路由配置，指定该路由需要调用 apisix-java-plugin-runner 的 `TokenValidator` 插件，示例如下

```shell
curl http://127.0.0.1:9080/apisix/admin/routes/1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "uri":"/get",
    "plugins":{
        "ext-plugin-pre-req":{
            "conf":[
                {
                    "name":"TokenValidator",
                    "value":"{\"validate_header\":\"token\",\"validate_url\":\"https://www.sso.foo.com/token/validate\",\"rejected_code\":\"403\"}"
                }
            ]
        }
    },
    "upstream":{
        "nodes":{
            "httpbin.org:80":1
        },
        "type":"roundrobin"
    }
}
```

需要注意的是，`TokenValidator` 的属性需要经过 json 转义，作为 string 类型进行配置。

（这里上游地址配置为 httpbin.org，方便调试）

### 4.3 开发 Java 插件

在 runner-plugin/src/main/java/org/apache/apisix/plugin/runner/filter 目录下，新增 `TokenValidatr.java`，代码初始骨架如下

```Java
package org.apache.apisix.plugin.runner.filter;

import org.apache.apisix.plugin.runner.HttpRequest;
import org.apache.apisix.plugin.runner.HttpResponse;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;


@Component
public class TokenValidator implements PluginFilter {

    @Override
    public String name() {
        return "TokenValidator";
    }

    @Override
    public Mono<Void> filter(HttpRequest request, HttpResponse response, PluginFilterChain chain) {
        return chain.filter(request, response);
    }
}
```

需要继承 `PluginFilter`接口，重写 `name` 和 `filter`函数。

重写 `name` 的返回值，和前面配置 APISIX 的路由属性中 "name" 保持一致。

完整代码如下：

```Java
package org.apache.apisix.plugin.runner.filter;

import com.google.gson.Gson;
import org.apache.apisix.plugin.runner.HttpRequest;
import org.apache.apisix.plugin.runner.HttpResponse;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.Map;

@Component
public class TokenValidator implements PluginFilter {

    @Override
    public String name() {
        return "TokenValidator";
    }

    @Override
    public Mono<Void> filter(HttpRequest request, HttpResponse response, PluginFilterChain chain) {
        // parse `conf` to json
        String configStr = request.getConfig(this);
        Gson gson = new Gson();
        Map<String, Object> conf = new HashMap<>();
        conf = gson.fromJson(configStr, conf.getClass());

        // get configuration parameters
        String token = request.getHeader((String) conf.get("validate_header"));
        String validate_url = (String) conf.get("validate_url");
        boolean flag = validate(token, validate_url);

        // token verification results
        if (!flag) {
            String rejected_code = (String) conf.get("rejected_code");
            response.setStatusCode(Integer.parseInt(rejected_code));
            return chain.filter(request, response);
        }

        return chain.filter(request, response);
    }

    private Boolean validate(String token, String validate_url) {
        //TODO: improve the validation process
        return true;
    }
}
```

### 4.4 测试

在 Apache APISIX 上配置的上游服务是 httpbin.org，可以访问 Apache APISIX，触发路由，让 Apache APISIX 调用 apisix-java-plugin-runner 去执行 TokenValidator 插件，测试一下 Java 插件效果。

```shell
curl -H 'token: 123456' 127.0.0.1:9080/get
{
 "args": {},
 "headers": {
 "Accept": "/",
 "Host": "127.0.0.1",
 "Token": "123456",
 "User-Agent": "curl/7.71.1",
 "X-Amzn-Trace-Id": "Root=1-60cb0424-02b5bf804cfeab5252392f96",
 "X-Forwarded-Host": "127.0.0.1"
 },
 "origin": "127.0.0.1",
 "url": "http://127.0.0.1/get"
}
```

## 5. 部署

插件开发完成后，部署操作可以参考 [部署 apisix-java-plugin-runner](https://github.com/apache/apisix-java-plugin-runner/blob/main/docs/how-it-works.md#run)。

## 6. 视频教程

<iframe
    height="350"
    width="600"
    src="https://api7-website-1301662268.file.myqcloud.com/2021-06-21-use-Java-to-write-Apache-APISIX-plugins.mp4"
    frameborder="0">
</iframe>
