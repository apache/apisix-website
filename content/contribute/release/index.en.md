---
title: "Release Guide"
date: 2020-01-07T11:46:04+08:00
include_footer: true
---

<div class="release-guide">
  <section>
    <h2 class="title">GPG 设置</h2>
    <br />
    <h3 class="subtitle">安装 GPG</h3>
    <p>在 GnuPG 官网下载安装包。 GnuPG 的 1.x 版本和 2.x 版本的命令有细微差别，下列说明以 GnuPG-2.1.23 版本为例。</p>
    <p>安装完成后，执行以下命令查看版本号。</p>
    {{< highlight go "linenos=table" >}}
    gpg --version
    {{< / highlight >}}
    <h3 class="subtitle">创建 Key</h3>
    <p>安装完成后，执行以下命令创建key。</p>
    <p>GnuPG-2.x可使用：</p>
    {{< highlight go "linenos=table" >}}
    gpg --full-gen-key
    {{< / highlight >}}
    <p>GnuPG-1.x可使用：</p>
    {{< highlight go "linenos=table" >}}
    gpg --gen-key
    {{< / highlight >}}
    <p>根据提示完成key：</p>
    <p class="warning">注意：请使用Apache mail生成GPG的Key。</p>
    {{< highlight go "linenos=table" >}}
    {{% contribute/release/gpg-key-generator %}}
    {{< / highlight >}}
    <h3 class="subtitle">查看生成的key</h3>
    {{< highlight go "linenos=table" >}}
    gpg --list-keys
    {{< / highlight >}}
    <p>执行结果：</p>
    {{< highlight go "linenos=table" >}}
    // 笔者本地电脑
    $ gpg --list-keys
    /home/resty/.gnupg/pubring.gpg
    ------------------------------
    pub   4096R/30B5FD72 2020-01-02      
    uid   Yuansheng Wang <membphis@apache.org>
    sub   4096R/3D2F913D 2020-01-02
    {{< / highlight >}}
    <p>其中 30B5FD72 为公钥 ID。</p>
    <h3 class="subtitle">将公钥同步到服务器</h3>
    <p>命令如下：</p>
    {{< highlight go "linenos=table" >}}
    // 最后参数是上面生成的公钥 ID。
    $ gpg --keyserver hkp://pool.sks-keyservers.net --send-key 30B5FD72
    gpg: sending key 30B5FD72 to hkp server pool.sks-keyservers.net
    {{< / highlight >}}
    <p>pool.sks-keyservers.net为随意挑选的<a href="https://sks-keyservers.net/status/" target="_blank">公钥服务器</a>，每个服务器之间是自动同步的，选任意一个即可。</p>
  </section>
</div>