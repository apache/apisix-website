---
title: "APISIX 在 360 统一七层负载均衡的落地实践"
authors:
  - name: 360 智汇云
    title: author
  - name: Yilia Lin
    title: Technical Writer
    url: https://github.com/Yilialinn
    image_url: https://github.com/Yilialinn.png
keywords:
  - APISIX
  - 360
  - API 网关
  - 七层负载均衡
  - L7
description: 360 使用 Apache APISIX 统一七层负载均衡，通过其 Admin API 和 etcd 热同步机制，实现了 VPC、云原生能力以及精细化路由的一体化升级。
tags: [Case Studies]
image: https://static.api7.ai/uploads/2025/09/05/SWaSLAns_360-zyun-cloud-use-case.webp
---

> 360 使用 Apache APISIX 统一七层负载均衡，通过其 Admin API 和 etcd 热同步机制，实现了 VPC、云原生能力以及精细化路由的一体化升级。
>
<!--truncate-->

## 360 及 360 智汇云简介

[360 公司](https://www.360.com/)是中国领先的互联网和安全技术公司，是中国首家互联网免费安全的倡导者。AI 浪潮下，致力于帮助产业和组织智转数改。

[360 智汇云](https://zyun.360.cn/)是 360 公司的智数云底座，提供数据库、中间件、存储、大数据、人工智能、计算、网络、视联物联与通信等多种产品服务以及一站式解决方案。智汇云以“汇聚数据价值，助力智能未来”为目标的企业应用开放服务平台，为各行各业的业务及应用提供强有力的产品、技术服务，帮助企业和业务实现更大的商业价值。

## 项目背景

七层负载均衡工作在 OSI 模型的应用层，支持 HTTP/HTTPS 等协议深度解析，支持丰富的高级转发规则。与四层负载均衡单纯关注 IP+ 端口不同，七层负载均衡能够理解应用层协议内容，实现更精细化的流量控制。

360 内部原有七层负载均衡存在以下两点问题：

1. 适用于经典网络场景，不支持专有网络（Virtual Private Cloud，简称 VPC），无法满足云上租户需求。

2. 后端主机组支持裸金属和虚拟机，缺失了云原生场景。

基于上述问题，统一七层负载均衡项目产生，旨在通过一套负载均衡服务，支持混合网络架构，后端主机适配多种实例类型。服务主要有以下特点：

- **智能路由决策**：通过解析 HTTP 头信息（User-Agent、Cookie）、URL 路径、SSL 会话 ID 等参数实现精细化流量调度。

- **会话保持机制**：通过注入 Cookie 或生成 SessionID 确保用户请求持续指向同一后端服务器。

- **主动健康检查**：主动探活后端 upstream 存活状态，避免 upstream 异常引发请求异常。

- **配置热加载**：配置统一变更可实时生效，减少配置维护复杂度。

- **高可用**：通过集群容灾、会话保持、可用区多活等机制保障实例的可用性。

## 服务架构设计

### 1. 整体架构

统一七层负载均衡架构分为控制面和转发面两部分。

控制面除原有 LBC-API（四七层共用）外，还引入 APISIX Admin API 用于七层规则的下发。存储使用 etcd 集群，毫秒级的变化通知机制，使得配置变更达到实时的效果，支持集群管理，更好的适配容器场景。VPC 场景下，控制面为 VPC 内 upstream 分配一个唯一 IP 用于替换 upstream 的真实 VPC IP。

第二部分是转发面，真正去处理来自客户端请求，转发用户的真实流量，支持多种功能，如身份验证、证书卸载、日志分析和可观测性等，不做数据的存储。VPC 场景中，转发面复用 FNAT 网关转发逻辑，根据唯一 IP 和真实 VPC IP 的映射关系，将流量封装 VXLAN 后发送至 upstream 所在宿主机。

![360 L7 Load Balancing Architecture](https://static.api7.ai/uploads/2025/09/04/VWV24ftv_2.1-cn.webp)

七层相关资源如 service、route、upstream 等可通过调用 LBC-API 创建/删除/修改。具体流程如下：

1. API 会继续调用 admin api vip 将请求写入 etcd 集群。

2. LBC-AGENT 程序监听 etcd 变更，将 VPC 映射配置通过命令下发至 FNAT 转发面。

3. 转发面监听 etcd 变更，使得七层转发规则生效。

4. IDC 流量直接转发至对应 IP，VPC 内流量经过额外封装转发至对应宿主机。

5. 业务申请域名解析，将域名解析到对应的 VIP（EIP/VPC 内 VIP）即可访问使用。

### 2. 服务部署架构

服务部署架构如下图所示。

- **统一接口**：stack 平台为统一请求入口，对外提供 OpenAPI 供业务方调用，容器云通过该入口进行七层负载均衡资源的接口操作，后续其他业务统一走 OpenAPI 接入。

- **高可用**：控制面/存储地域级别部署，转发面可用区（AZ）粒度集群模式部署，单台服务器宕机，请求自动切到集群其他台。

- **四七层混合部署**：复用四层已有能力，减少额外开发。

![360 Service Deployment Architecture](https://static.api7.ai/uploads/2025/09/04/RY7jvrEM_2.2-cn.webp)

## 流量路径

流量分为云上云下两种场景：

- **经典网络七层流量**：公网 EIP -> 四层负载均衡集群（idc vip）-> 七层负载均衡网关 -> IDC 可达 IP（包括虚机/POD等）。

- **VPC 云上七层流量**：公网 EIP -> 四层负载均衡集群（vpc vip） -> 七层负载均衡网关（vxlan封装）-> VPC 内 IP（包括虚机/POD等）。

<div align="center">
<img alt="Traffic Path Diagram" style="width: 65%" src="https://static.api7.ai/uploads/2025/09/04/BFDB1z4d_3.1-cn.webp"></img>
</div>

## 总结与展望

当前统一七层负载均衡服务已经在 360 公司三个地域全部上线，容器服务也适配完成。目前统一七层负载均衡仅支持了较为基础的功能，还有更多的功能扩展，如：SSL 卸载优化、转发规则支持重定向、流量镜像、支持更多协议类型等，并逐步向智能化发展，从单纯的流量分发工具演变成智能调度中枢。
