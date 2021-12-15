---
title: "如何将 Apache APISIX 扩展为一个服务网格的边车"
date: 2021-08-07 13:30:00
keywords:
- APISIX
- Service Mesh
- Kubernetes
- API Gateway
description: 在这个主题中将介绍 apisix-mesh-agent 项目，它有一些能力将 Apache APISIX 扩展为服务网格场景中的边车程序，更重要的是，它使用 xDS 协议从 Istio、Kuma 等控制平面获取配置。之后，我将介绍关于在服务网中使用 Apache APISIX 的未来计划和期望。
---
<!-- markdownlint-disable -->

<iframe src="//player.bilibili.com/player.html?aid=932594160&bvid=BV16M4y1V7ZW&cid=394694138&page=1" frameborder="0" scrolling="no" allowfullscreen="true" style={{width:"100%", maxHeight: "calc(100vw / 5 * 3)", height: "calc(100vh / 5 * 3)"}}></iframe>

## 分享人简介

张超，Apache APISIX PMC，OpenResty 贡献者，开源爱好者，现在我正在研究 Service Mesh、Kubernetes 和 API Gateway。

## 分享主题介绍

在这个主题中，我将介绍 [apisix-mesh-agent](https://github.com/api7/apisix-mesh-agent) 项目，它有一些能力将 Apache APISIX 扩展为服务网格场景中的边车程序，更重要的是，它使用 xDS 协议从 Istio、Kuma 等控制平面获取配置。之后，我将介绍关于在服务网中使用 Apache APISIX 的未来计划和期望。

## PPT 下载

关注 Apache APISIX 公众号，回复“ApacheCon”下载 PPT。

<img src="https://static.apiseven.com/202108/1639468506819-7f829080-19de-4d94-b103-e1d967e0baea.png" alt="Apache APISIX WeChat" style={{width: "200px"}} />
