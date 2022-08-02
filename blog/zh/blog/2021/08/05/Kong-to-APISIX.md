---
title: "Kong-To-APISIX 迁移工具"
slug: 2021/08/05/kong-to-apisix
author: "吴舒旸"
authorURL: "https://github.com/Yiyiyimu"
authorImageURL: "https://avatars.githubusercontent.com/u/34589752?v=4"
keywords:
- APISIX
- Kong
- 迁移工具
- API 网关
description: 你可以使用 Kong-To-APISIX 迁移工具，一键将 Kong 的配置迁移到云原生 API 网关 Apache APISIX 中，实现服务的无缝切换。本文介绍了详细的使用方法以及测试示例。
tags: [Ecosystem]
---

> Apache APISIX 是一个生产可用的开源七层全流量处理平台，可作为 API 网关处理业务入口流量，具有极高性能、超低延迟，官方支持 dashboard 以及超过五十种插件。如果你正在使用 Kong，对 APISIX 感兴趣又苦于难以上手，不妨试试我们刚开源的迁移工具 Kong-To-APISIX，助你一键平滑迁移。

<!--truncate-->

Apache APISIX 是一个生产可用的开源七层全流量处理平台，可作为 API 网关处理业务入口流量，具有极高性能、超低延迟，官方支持 dashboard 以及超过五十种插件。如果你正在使用 Kong，对 APISIX 感兴趣又苦于难以上手，不妨试试我们刚开源的迁移工具 Kong-To-APISIX，助你一键平滑迁移。

## 工具能力

Kong-To-APISIX 利用 Kong 和 APISIX 的声明式配置文件实现了配置数据的迁移，并根据两侧架构和功能的不同做出相应适配。目前我们支持了 Kong 一侧 Route、Service、Upstream、Target，Consumer 以及三个插件 Rate Limiting、Proxy Caching 以及 Key Authentication 的配置迁移，并以 Kong 的 [Getting Started Guide](https://docs.konghq.com/getting-started-guide/2.4.x/overview/) 为例，完成了一个最小的 demo。

## 使用方法

1. 使用 Deck 导出 Kong 声明式配置文件，点击查看[具体步骤](https://docs.konghq.com/deck/1.7.x/guides/backup-restore/)

2. 下载仓库并运行迁移工具，迁移工具会生成声明式配置文件 `apisix.yaml` 待使用

```shell
git clone https://github.com/api7/kong-to-apisix

cd kong-to-apisix

make build

./bin/kong-to-apisix migrate --input kong.yaml --output apisix.yaml

# migrate succeed
```

3. 使用 `apisix.yaml`配置 APISIX， 点击查看[具体步骤](https://apisix.apache.org/docs/apisix/stand-alone)。

## Demo 测试

1. 确保 docker 正常运行，部署测试环境，使用 docker-compose 拉起 APISIX、Kong

```shell
git clone https://github.com/apache/apisix-docker

cd kong-to-apisix

./tools/setup.sh
```

2. 根据 Kong 的 Getting Started Guide，为 Kong 添加配置并进行测试：

   a. 通过 Service 和 Route 暴露服务，进行路由转发

   b. 设置 Rate Limiting 和 Proxy Caching 插件做限流缓存

   c. 设置 Key Authentication 插件做认证

   d. 通过 Upstream 和 Target 设置负载均衡

```shell
./examples/kong-example.sh
```

3. 导出 Kong 的声明式配置文件到 `kong.yaml`

```shell
go run ./cmd/dumpkong/main.go
```

4. 运行迁移工具，导入 `kong.yaml` 并生成 APISIX 配置文件 `apisix.yaml` 至 docker volumes

```shell
export EXPORT_PATH=./repos/apisix-docker/example/apisix_conf

go run ./cmd/kong-to-apisix/main.go
```

5. 在 APISIX 一侧测试迁移过后的路由、负载均衡、插件等是否正常运行

a. 测试 key auth 插件

```shell
curl -k -i -m 20 -o /dev/null -s -w %{http_code} http://127.0.0.1:9080/mock
# output: 401
```

​b. 测试 proxy cache 插件

```shell
# access for the first time
curl -k -I -s  -o /dev/null http://127.0.0.1:9080/mock -H "apikey: apikey" -H "Host: mockbin.org"
# see if got cached
curl -I -s -X GET http://127.0.0.1:9080/mock -H "apikey: apikey" -H "Host: mockbin.org"
# output:
#   HTTP/1.1 200 OK
#   ...
#   Apisix-Cache-Status: HIT
```

​c. 测试 limit count 插件

```shell
for i in {1..5}; do
    curl -s -o /dev/null -X GET http://127.0.0.1:9080/mock -H "apikey: apikey" -H "Host: mockbin.org"
done
curl -k -i -m 20 -o /dev/null -s -w %{http_code} http://127.0.0.1:9080/mock -H "apikey: apikey" -H "Host: mockbin.org"
# output: 429
```

​d. 测试负载均衡

```shell
httpbin_num=0
mockbin_num=0for i in {1..8}; do
   body=$(curl -k -i -s http://127.0.0.1:9080/mock -H "apikey: apikey" -H "Host: mockbin.org")
   if [[ $body == *"httpbin"* ]]; then
      httpbin_num=$((httpbin_num+1))
   elif [[ $body == *"mockbin"* ]]; then
      mockbin_num=$((mockbin_num+1))
   fi
   sleep 1.5done
echo "httpbin number: "${httpbin_num}", mockbin number: "${mockbin_num}
# output:
#   httpbin number: 6, mockbin number: 2
```

## 总结

迁移工具的后续开发计划已在 Kong-To-APISIX 的 GitHub 仓库的 Roadmap 中呈现，欢迎大家访问 Kong-To-APISIX 的 [GitHub 仓库地址](https://github.com/api7/kong-to-apisix) ，测试与使用 Kong-To-APISIX。
欢迎任何对这个项目感兴趣的人一同来为这个项目作贡献！有任何问题都可以在仓库的 Issues 区讨论。
