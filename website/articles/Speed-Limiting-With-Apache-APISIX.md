---
title: "使用 Apache APISIX 实现限流限速"
date: 2021-08-06 13:30:00
keywords:
- APISIX
- ApacheCon
- 限流限速
- Nginx
description: 本次分享将带来如何使用 Apache APISIX 来实现动态、精细化、分布式的限流限速，以及如何通过插件编排来实现更符合业务需求的限流限速。
---

<!-- markdownlint-disable -->

<iframe src="//player.bilibili.com/player.html?aid=674805891&bvid=BV19U4y177Vh&cid=388403877&page=1" frameborder="0" scrolling="no" allowfullscreen="true" style={{width:"100%", maxHeight: "calc(100vw / 5 * 3)", height: "calc(100vh / 5 * 3)"}}></iframe>

## 分享人简介

陈军旭，互联网老兵，曾任职于新浪、迅雷、360 等知名互联网公司。 最近两年开始深度参与开源，热爱开源。目前从事开源商业化创业。

## 分享主题介绍

谈到限流限速，人们往往最先想到的是 Nginx 。然而 Nginx 通过配置文件的方式实现，每次变更都需要 reload ，这让运维工作极其繁杂。另一方面，限速的条件被限制在 Nginx 的变量范围内，使得 Nginx 难以实现业务上精细化的限流限速需求。

本次分享将带来如何使用 Apache APISIX 来实现动态、精细化、分布式的限流限速，以及如何通过插件编排来实现更符合业务需求的限流限速。

## PPT 下载

关注 Apache APISIX 公众号，回复“ApacheCon”下载 PPT。

<img src="https://static.apiseven.com/202108/1639468506819-7f829080-19de-4d94-b103-e1d967e0baea.png" alt="Apache APISIX WeChat" style={{width: "200px"}} />
