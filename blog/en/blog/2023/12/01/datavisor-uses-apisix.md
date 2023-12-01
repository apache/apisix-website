---
title: "APISIX 在 DataVisor 的应用"
authors:
  - name: 赵晓彪
    title: Author
  - name: Jing Yan
    title: Technical Writer
    url: https://github.com/JYan00
    image_url: https://github.com/JYan00.png
keywords:
  - 开源社区
  - API 网关
  - Apache APISIX
  - DataVisor
description: DataVisor 专注于风险管理，其产品开发中不仅充分运用 APISIX 于生产环境，而且对 APISIX 进行多维度的二次开发，最终实现了卓越的生产效果。
tags: [Case Studies]
image: https://static.apiseven.com/uploads/2023/12/01/u6f4iMh8_DataVisor_Cover.png
---

> 作者：赵晓彪，DataVisor 高级架构师，Apache Kvrocks Committer，OpenResty 及 Apache APISIX Contributor。本文整理自 2023 年 11 月赵晓彪在 APISIX 上海 Meetup 的演讲。
<!--truncate-->

DataVisor 是一家专注于风控领域的公司，致力于防范反击战、反作弊等方面的工作。在 DataVisor 的产品开发中，我们不仅在生产环境中应用了 APISIX，还对 APISIX 进行了多个维度的二次开发，如插件方面的二次开发，并最终获得了良好的生产效果。下面将为大家简单分享 DataVisor 应用 APISIX 的经验。
