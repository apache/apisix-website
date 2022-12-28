---
title: "Apache APISIX 玩转 Tongsuo 国密插件"
author: "罗泽轩"
authorURL: "https://github.com/spacewander"
authorImageURL: "https://github.com/spacewander.png"
keywords: 
- Tongsuo
- 国密
- 开源
- APISIX
description: 本文通过解读国密的相关内容与标准，呈现了当下国内技术环境中对于国密功能支持的现状。并从 API 网关 Apache APISIX 的角度，带来有关国密的探索与功能呈现。
tags: [Ecosystem]
---

> 本文通过解读国密的相关内容与标准，呈现了当下国内技术环境中对于国密功能支持的现状。并从 API 网关 Apache APISIX 的角度，带来有关国密的探索与功能呈现。

<!--truncate-->

> 作者：罗泽轩，Apache APISIX PMC

## 什么是国密

顾名思义，**国密就是国产化的密码算法**。在我们日常开发过程中会接触到各种各样的密码算法，如 RSA、SHA256 等等。为了达到更高的安全等级，许多大公司和国家会制定自己的密码算法。国密就是这样一组由中国国家密码管理局制定的密码算法。在国际形势越发复杂多变的今天，密码算法的国产化替代，在一些领域已经成为了一股势不可挡的潮流。

**国密的官方名称为国家商用密码，简称商密，拼音缩写是 SM**。这也是国密标准中 SM2/3/4/7/9 等算法名称的来源。国密算法的命名方式非常简单直接，就像“绵阳九所”、“二机部”一样，都是“分类+序号”的组合。其中 SM1 和 SM4 是对称算法，对标 AES；SM2 是非对称算法，对标 RSA、ECDSA；SM3 是摘要算法，对标 MD5；等等。由于本文并非涉及到国密的实现细节，所以不会讲得非常细，也就科普下国密算法的分类。

在基础的国密算法之上，我们可以构造一个国密的垂直生态，比如实现国密算法的硬件、提供国密支持的密码库、加入国密流程的 TLS 握手协议等等。正如安全需要纵深防御一样，基于国密的信任链也需要有全软件栈上的支持。

因此，当我们谈论国密支持时，并不仅仅单独指可以用某一种国密算法进行加解密，而是指嵌合入国密的生态，支持某种国密的应用场景。

## 国密的应用场景

作为国家密码管理局制定的密码算法，国密广泛应用于电子政务（包括国家政务通、警务通等重要领域）、信创及金融业的各个应用领域。

* **政府和金融的身份认证终端**。依照现行有关规定，许多涉及政府和金融的身份认证终端（诸如 USBKey、智能 IC 卡、银行卡终端等）都需要提供对国密的支持。
* **国产开源操作系统**。许多主打国产替代的开源操作系统，会提供基于国密的安全加固功能。比如龙蜥操作系统 (Anolis OS) 提到自己实现了全栈国密能力；OpenEuler 也在做国密相关的一些功能，比如基于国密数字证书扩展了 EFI 的数字签名。
* **信创产品**。还有许多做信创生意的厂商，围绕国密推出符合相关标准的产品。例如支持使用国密算法做数字签名的 PDF 工具、支持国密接入标准的音视频软件等等。
* **基于国密 TLS 协议的生态**。也是在日常开发中接触得最多的。譬如各种国产 CA 厂商、支持了国密 TLS 的许许多多密码库和浏览器，以及国密接入的 VPN 和网关等等。

## APISIX 对国密的探索与支持

Apache APISIX 是一个动态、实时、高性能的 API 网关，提供负载均衡、动态上游、灰度发布、精细化路由、限流限速、服务降级、服务熔断、身份认证、可观测性等数百项功能。作为一个发迹于国内环境的 API 网关，APISIX 自然需要考虑下如何接入国密的生态圈。

由于国密更多地用在国内环境中，尚未被 OpenSSL 等国际主流项目所完全接纳。如果要使用国密的功能，就涉及到更换 APISIX 默认的 OpenSSL 库为其他 SSL 库。

为此，我们考察了以下的项目：

* GMSSL：北京大学开源的项目。原版基于 OpenSSL 1.0.2 修改而来。新的 GMSSL 3.0 基本上是重新开发，跟 OpenSSL 的目录结构差别很大。
* gm-BoringSSL：个人开源项目，在 BoringSSL 上增加国密支持。已有两年未改动。
* TaSSL：北京江南天安科技有限公司开源的项目。基于 OpenSSL 1.1.1 修改而来。
* Tongsuo：蚂蚁集团开源的项目。基于 OpenSSL 3.0 修改而来，项目前身是 BabaSSL，现已**改名为铜锁/Tongsuo**。
由于 GMSSL 3.0 并不基于 OpenSSL，即使能保证 API 兼容，也没办法确保能 100% 替换现有 OpenSSL 的行为，所以被首先排除。其次 gm-BoringSSL 疏于维护，也被排除。

在 TaSSL 和 Tongsuo 之中，我倾向于选择 [Tongsuo](https://github.com/Tongsuo-Project/Tongsuo)。因为 Tongsuo 在标准上拥有更强的话语权，比如 RFC 8998（TLS 1.3 中支持 SM 套件）就是由 Tongsuo 的开发者制定的。TaSSL 则是每出一个版本，就公布一个新的仓库。比如[前一个 版本](https://github.com/jntass/TASSL-1.1.1k)，感觉不太靠谱。

对于选择 Tongsuo，我个人存在一个顾虑，就是他目前基于 OpenSSL 3.0 的版本还没有发布正式的 Release 版本（第一个版本预计在 2023 年 2 月发布）。由于 Tongsuo 当前还没有一个固定的版本，因此社区决定先把国密相关的功能独立出来，以插件形式存在，有相关需求时可单独启用。

目前已在插件层面实现了服务端一侧国密双证书的支持，感兴趣的读者可以在官网查看 `gm` [插件介绍文档](https://apisix.apache.org/zh/docs/apisix/next/plugins/gm/)，自行完成 APISIX 的编译和对应插件的安装配置工作。当然，如果想即刻预览该插件的使用过程，也可以直接参考下文内容。

## 快速参考：APISIX 国密插件的使用

### 启用插件

**插件要求 Apache APISIX 运行在编译了 Tongsuo 的 APISIX-Base 上**。

首先需要安装 Tongsuo （此处我们选择编译出 Tongsuo 的动态链接库）：

```bash
# TODO: use a fixed release once they have created one.
# See https://github.com/Tongsuo-Project/Tongsuo/issues/318
git clone https://github.com/api7/tongsuo --depth 1
pushd tongsuo
./config shared enable-ntls -g --prefix=/usr/local/tongsuo
make -j2
sudo make install_sw
```

其次需要构建 APISIX-Base，让它使用 Tongsuo 作为 SSL 库：

```bash
export OR_PREFIX=/usr/local/openresty
export openssl_prefix=/usr/local/tongsuo
export zlib_prefix=$OR_PREFIX/zlib
export pcre_prefix=$OR_PREFIX/pcre

export cc_opt="-DNGX_LUA_ABORT_AT_PANIC -I${zlib_prefix}/include -I${pcre_prefix}/include -I${openssl_prefix}/include"
export ld_opt="-L${zlib_prefix}/lib -L${pcre_prefix}/lib -L${openssl_prefix}/lib64 -Wl,-rpath,${zlib_prefix}/lib:${pcre_prefix}/lib:${openssl_prefix}/lib64"
./build-apisix-base.sh
```

该插件默认是禁用状态，你需要将其添加到配置文件`./conf/config.yaml` 中才可以启用它：

```yaml
plugins:
  - ...
  - gm
```

由于 APISIX 的默认 cipher 中不包含国密 cipher，所以我们还需要在配置文件 `./conf/config.yaml` 中设置 cipher：

```yaml
apisix:
  ...
  ssl:
    ...
    # 可按实际情况调整。错误的 cipher 会导致 “no shared cipher” 或 “no ciphers available” 报错。
    ssl_ciphers: HIGH:!aNULL:!MD5
```

配置完成后，重新加载 APISIX，此时 APISIX 将会启用国密相关的逻辑。

## 测试插件

在测试插件之前，需要准备好国密双证书。Tongsuo 提供了[生成 SM2 双证书](https://www.yuque.com/tsdoc/ts/sulazb)的教程。

在下面的例子中，我们将用到如下的证书：

```plain
# 客户端加密证书和密钥
t/certs/client_enc.crt
t/certs/client_enc.key

# 客户端签名证书和密钥
t/certs/client_sign.crt
t/certs/client_sign.key

# CA 和中间 CA 打包在一起的文件，用于设置受信任的 CA
t/certs/gm_ca.crt

# 服务端加密证书和密钥
t/certs/server_enc.crt
t/certs/server_enc.key

# 服务端签名证书和密钥
t/certs/server_sign.crt
t/certs/server_sign.key
```

此外，还需要准备 Tongsuo 命令行工具。

```plain
./config enable-ntls -static
make -j2
# 生成的命令行工具在 apps 目录下
mv apps/openssl ..
```

你也可以采用非静态编译的方式，不过就需要根据具体环境，自己解决动态链接库的路径问题了。以下示例展示了如何在指定域名中启用 `gm` 插件。
要在指定域名中启用 `gm` 插件的功能，需要先创建对应的 SSL 对象：

```python
#!/usr/bin/env python
# coding: utf-8

import sys
# sudo pip install requests
import requests

if len(sys.argv) <= 3:
    print("bad argument")
    sys.exit(1)
with open(sys.argv[1]) as f:
    enc_cert = f.read()
with open(sys.argv[2]) as f:
    enc_key = f.read()
with open(sys.argv[3]) as f:
    sign_cert = f.read()
with open(sys.argv[4]) as f:
    sign_key = f.read()
api_key = "edd1c9f034335f136f87ad84b625c8f1"
resp = requests.put("http://127.0.0.1:9180/apisix/admin/ssls/1", json={
    "cert": enc_cert,
    "key": enc_key,
    "certs": [sign_cert],
    "keys": [sign_key],
    "gm": True,
    "snis": ["localhost"],
}, headers={
    "X-API-KEY": api_key,
})
print(resp.status_code)
print(resp.text)
```

然后将上面的脚本保存为 `./create_gm_ssl.py`，运行以下命令：

```plain
./create_gm_ssl.py t/certs/server_enc.crt  t/certs/server_enc.key t/certs/server_sign.crt t/certs/server_sign.key
```

输出结果如下：

```plain
200
{"key":"\/apisix\/ssls\/1","value":{"keys":["Yn...
```

完成上述准备后，可以使用如下命令测试插件是否启用成功：

```plain
./openssl s_client -connect localhost:9443 -servername localhost -cipher ECDHE-SM2-WITH-SM4-SM3 -enable_ntls -ntls -verifyCAfile t/certs/gm_ca.crt -sign_cert t/certs/client_sign.crt -sign_key t/certs/client_sign.key -enc_cert t/certs/client_enc.crt -enc_key t/certs/client_enc.key
```

其中，`./openssl` 是上文提到的 Tongsuo 命令行工具，`9443` 是 APISIX 默认的 HTTPS 端口。
如果一切正常，可以看到连接已经建立了起来，并输出如下信息：

```plain
...
New, NTLSv1.1, Cipher is ECDHE-SM2-SM4-CBC-SM3
...
```

### 禁用插件

如果不再使用此插件，可将 `gm` 插件从 `./conf/config.yaml` 配置文件中移除，然后重启 APISIX 或者通过插件热加载的接口触发插件的卸载。

如果你对该功能或者插件感兴趣，欢迎在随时在社区进行交流。
