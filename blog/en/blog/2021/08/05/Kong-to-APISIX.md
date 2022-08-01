---
title: "Kong-To-APISIX Migration Tool"
slug: 2021/08/05/kong-to-apisix
author: "吴舒旸"
authorURL: "https://github.com/Yiyiyimu"
authorImageURL: "https://avatars.githubusercontent.com/u/34589752?v=4"
keywords:
- APISIX
- Kong
- Migration Tool
- API Gateway
description: You can use the Kong-To-APISIX migration tool to migrate Kong's configuration to the cloud-native API gateway Apache APISIX with one click.
tags: [Ecosystem]
---

> Apache APISIX is a production-ready open source seven-layer full traffic processing platform that serves as an API gateway for business entry traffic with high performance, low latency, official dashboard support, and over fifty plugins. If you are using Kong and are interested in APISIX but struggle to get started, try our just open source migration tool Kong-To-APISIX to help you migrate smoothly with one click.

<!--truncate-->

Apache APISIX is a production-ready open source seven-layer full traffic processing platform that serves as an API gateway for business entry traffic with high performance, low latency, official dashboard support, and over fifty plugins. If you are using Kong and are interested in APISIX but struggle to get started, try our just open source migration tool Kong-To-APISIX to help you migrate smoothly with one click.

## What is Kong-To-APISIX

[Kong-To-APISIX](https://github.com/api7/kong-to-apisix) leverages the declarative configuration files of Kong and APISIX to migrate configuration data, and adapts to the architecture and functionality of both sides. Currently, we support the migration of configuration data for Route, Service, Upstream, Target, Consumer and three plugins Rate Limiting, Proxy Caching and Key Authentication on one side of Kong, and we have completed a minimal demo using Kong’s Getting Started Guide as an example . We have completed a minimal demo.

## How to migrate configuration

1. To export a Kong declarative configuration file using Deck, refer to the following steps: [Kong Official Document: Backup and Restore of Kong’s Configuration](https://docs.konghq.com/deck/1.7.x/guides/backup-restore/)

1. Download the repository and run the migration tool, which will generate the declarative configuration file `apisix.yaml` to be used.

      ```shell
      git clone https://github.com/api7/kong-to-apisix

      cd kong-to-apisix

      make build

      ./bin/kong-to-apisix migrate --input kong.yaml --output apisix.yaml

      # migrate succeed
      ```

1. Use `apisix.yaml` to configure APISIX, refer to [Apache APISIX Official Document: Stand-alone mode](https://apisix.apache.org/docs/apisix/stand-alone).

## Demo Test

1. Make sure docker is up and running, deploy the test environment, and use docker-compose to run APISIX and Kong.

   ```shell
   git clone https://github.com/apache/apisix-docker

   cd kong-to-apisix

   ./tools/setup.sh
   ```

1. Add configuration to Kong and test it according to Kong's Getting Started Guide.
   1. Expose services via Service and Route for routing and forwarding
   1. Set up Rate Limiting and Proxy Caching plugins for flow limiting caching
   1. Set up Key Authentication plugin for authentication
   1. Set up load balancing via Upstream and Target

1. Export Kong's declarative configuration file to `kong.yaml`.

   ```shell
   go run ./cmd/dumpkong/main.go
   ```

1. Run the migration tool, import `kong.yaml` and generate the APISIX configuration file `apisix.yaml` to docker volumes.

   ```shell
   export EXPORT_PATH=./repos/apisix-docker/example/apisix_conf
   go run ./cmd/kong-to-apisix/main.go
   ```

1. Test whether the migrated routes, load balancing, plugins, etc. are working properly on Apache APISIX side.

   1. Test key auth plugin.

      ```shell
      curl -k -i -m 20 -o /dev/null -s -w %{http_code} http://127.0.0.1:9080/mock
      # output: 401
      ```

   1. Test proxy cache plugin.

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

   1. Test limit count plugin.

      ```shell
      for i in {1..5}; do
         curl -s -o /dev/null -X GET http://127.0.0.1:9080/mock -H "apikey: apikey" -H "Host: mockbin.org"
      done
      curl -k -i -m 20 -o /dev/null -s -w %{http_code} http://127.0.0.1:9080/mock -H "apikey: apikey" -H "Host: mockbin.org"
      # output: 429
      ```

   1. Test load balance.

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

## Conclusion

Subsequent development plans for the migration tool are presented in the Roadmap on Kong-To-APISIX's [GitHub repository](https://github.com/api7/kong-to-apisixc). Feel free to test and use Kong-To-APISIX, and discuss any questions you may have in the Issues section of the repository. Anyone who is interested in this project is welcome to contribute to it!
