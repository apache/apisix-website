---
title: "Apache APISIX 开源 2 周年！"
author: "赵若妃"
authorURL: "https://github.com/Serendipity96"
authorImageURL: "https://avatars.githubusercontent.com/u/23514812?v=4"
keywords:
- APISIX
- API 网关
- opensource
description: 云原生 API 网关 Apache APISIX 开源两年了，在这期间，APISIX 实现了健康检查、服务熔断、分布式追踪、支持 etcd v3 协议、服务发现等新功能。
tags: [Community]
---

> Apache APISIX 开源 2 周年啦！

<!--truncate-->

今天是 2021 年 6 月 6 日，在这个 666 的日子 [Apache APISIX](https://github.com/apache/apisix) 开源 2 周年啦！🎉

Apache APISIX 于 2019 年 6 月 6 日开源，同年 10 月进入 Apache 孵化器，也是在这短短两年时间内，成为了 **Apache 顶级项目**！

在进入 Apache 孵化器之前，Apache APISIX 仅有 20 多个 contributor，现在和 Apache APISIX 有关的项目共有 249 个 contributor，在一年半的时间，**contributor 数量增长了 10 倍**！ Apache APISIX 的社区也非常活跃，截止到今天 **249 位 contributor 共提交了 2303 个 PR ，每个月都会发布一个新版本**。

![2019.6.6 ~ 2021.6.6 contributor growth curve](https://static.apiseven.com/202108/1630116210945-cdf0888f-c823-4eae-b404-3b1d6cb1b1e6.png)

生活中，当你去买机票、刷微博、买奶茶的时候，背后的关键流量都是由 Apache APISIX 来处理的。在这两年里， Apache APISIX 已经被非常多的企业广泛使用，涵盖金融、互联网、制造、零售、运营商等等，比如美国的航空航天局（NASA)、欧盟的数字工厂、中国航信、腾讯、华为、微博、贝壳找房、中国移动、泰康、360、奈雪的茶等等。点击查看 [Apache APISIX 的用户列表](https://github.com/apache/apisix)。

**2019 年 8 月，Apache APISIX 发布了第一个版本 0.6.0**。这个版本带来很多新的特性：健康检查、服务熔断、debug 模式，分布式追踪、JWT 认证等，以及内置的 dashboard。

**1.0 版本于 2020 年 1 月 发布，是 Apache APISIX 第一个生产版本。** 这个版本不仅支持了新特性——在 URI 相同的条件下根据 header、args、优先级等条件，来匹配到不同的上游服务，而且在代码稳定性、文档方面也更加完善，如：增加自定义开发插件的文档、Oauth 插件的使用文档、dashboard 编译的文档、如何进行 a/b 测试的文档、如何开启 MQTT 插件的文档等，说明 Apache APISIX 开始在越来越多的环境中被应用起来。

**每月发布一个新版本，我们是认真的！** 在 2020 年 10 月，我们发布了 2.0 版本。2.0 版本从 etcd v2 协议迁移到 v3，只支持 etcd 3.4 以及后续的版本，支持为上游对象增加标签，为上游、路由等资源增加更多字段，使用拦截器来保护插件的路由，支持 http 和 https 监听多个端口，增加 AK/SK（HMAC）认证插件、 referer-restriction 插件。

**16 天前，我们发布了 APISIX 2.6 版本！** 在这个版本里，支持了大家呼声很高的新特性，如：**使用其他语言编写自定义插件，现在已经支持 Java 开发自定义插件，本月底还会支持使用 Go 开发自定义插件！** 除此之外，2.6 版本的生态已经完整支持 Nacos 服务发现，支持配置 IPv6 的 DNS resolver，支持修改 Prometheus 默认端口，不再暴露到数据面的端口上。

Apache APISIX 的目标不只是做一个 API 网关，**Apache APISIX 希望做云原生时代四层和七层流量处理和连接者。** 在 Apache APISIX 里所有的配置都是动态的，这对于云原生时代的弹性伸缩以及多云的部署是非常重要的。我们相信 Apache APISIX 是云原生时代最好的选择。欢迎大家加入 Apache APISIX 的开源社区，欢迎大家使用 Apache APISIX！

Apache APISIX 的发展离不开社区里的每一个小伙伴，**特别感谢 Apache APISIX 社区的 contributor 和社区用户为 Apache APISIX 发展作出的贡献。**

![apisix contributors](https://static.apiseven.com/202108/1630468565074-c7e83b82-c40d-4c56-bc66-d1be2acc645b.jpeg)

Apache APISIX 2 周岁，生日快乐！
