---
title: "发布指南"
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
    {{% contribute/release/gpg-key-generator-zh %}}
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
    <h3 class="subtitle">id.apache.org 中录入 Key Fingerprint</h3>
    <p>获取 Key Fingerprint</p>
    {{< highlight go "linenos=table" >}}
    # 注意下方 Key fingerprint 部分
    $ gpg --list-keys --fingerprint
    /home/resty/.gnupg/pubring.gpg
    ------------------------------
    pub   4096R/30B5FD72 2020-01-02
          Key fingerprint = 0F91 BE0A 55A7 B22F DE1A  CEEC 3352 48FD 30B5 FD72
    uid                  Yuansheng Wang <membphis@apache.org>
    sub   4096R/3D2F913D 2020-01-02
    {{< / highlight >}}
    <h3 class="subtitle">登录 id.apache.org 填写 Key Fingerprint</h3>
    <p>点击左下角的 Submit changes... 按钮提交保存。</p>
    <h3 class="subtitle">Apache svn 中添加自己的 GPG 公钥</h3>
    <p>下载 svn 目录</p>
    {{< highlight go "linenos=table" >}}
    $ svn --username=${Apache 用户名} co https://dist.apache.org/repos/dist/dev/apisix
    {{< / highlight >}}
    <p>进入 apisix 目录并查看其中文件:</p>
    {{< highlight go "linenos=table" >}}
    $ cd apisix
    $ ls
    KEYS
    {{< / highlight >}}
    <p>导出公钥到追加到 KEYS 文件：</p>
    {{< highlight go "linenos=table" >}}
    $ gpg -a --export ${GPG用户名}  >> KEYS
    {{< / highlight >}}
    <p>提交修改后的 KEYS 文件，把公钥信息保存到 svn 服务器：</p>
    {{< highlight go "linenos=table" >}}
    $ svn --username=${Apache 用户名} commit -m "added ${Apache 邮箱} gpg pub key"
    Authentication realm: <https://dist.apache.org:443> ASF Committers
    Password for 'membphis': # 输入密码
    Store password unencrypted (yes/no)? yes
    Sending        KEYS
    Transmitting file data .
    Committed revision 37434.
    {{< / highlight >}}
    <h3 class="subtitle">制作安装包并上传到 Apache svn</h3>
    <p>每个安装包都有版本，这里以准备 1.0-rc1 版本为例。在制作安装包之前，先确保在 github 上已经准备好分支 v1.0。</p>
    {{< highlight go "linenos=table" >}}
    # 进入 Apache svn 的 apisix 目录，应只有一个 KEYS 文件
    $ ls
    KEYS

    # 新建版本号目录并进入，比如：1.0-rc1
    $ mkdir 1.0-rc1 && cd 1.0-rc1

    # 下载安装包
    git clone -b v1.0 git@github.com:apache/incubator-apisix.git apache-apisix-1.0

    # 检查版本号
    $ cd apache-apisix-1.0 && ./utils/check-version.sh 1.0 && cd ..

    # 删除 .git 文件夹
    $ rm -rf apache-apisix-1.0/.git

    # 制作压缩包
    $ tar zcvf apache-apisix-1.0-rc1-src.tar.gz apache-apisix-1.0

    # 制作签名（这步会弹出对话框，提示你输入生成 gpg 时录入的密码）
    $ gpg --armor --detach-sign apache-apisix-1.0-rc1-src.tar.gz

    # 生成 sha512 校验文件
    $ shasum -a512 apache-apisix-1.0-rc1-src.tar.gz > apache-apisix-1.0-rc1-src.tar.gz.sha512

    # 删除 apache-apisix-1.0-rc1
    $ rm -rf apache-apisix-1.0

    # 后退到 Apache svn 的 apisix 根目录，并确认文件目录
    $ cd .. && tree
    .
    ├── 1.0-rc1
    │   ├── apache-apisix-1.0-rc1-src.tar.gz
    │   ├── apache-apisix-1.0-rc1-src.tar.gz.asc
    │   └── apache-apisix-1.0-rc1-src.tar.gz.sha512
    └── KEYS

    1 directory, 4 files

    # 添加新文件到 svn
    $ svn add *
    A         1.0-rc1
    A  (bin)  1.0-rc1/apache-apisix-1.0-rc1-src.tar.gz.asc
    A  (bin)  1.0-rc1/apache-apisix-1.0-rc1-src.tar.gz
    A         1.0-rc1/apache-apisix-1.0-rc1-src.tar.gz.sha512
    svn: warning: W150002: '/home/resty/git/apache_svn/apisix/KEYS' is already under version control
    svn: E200009: Could not add all targets because some targets are already versioned
    svn: E200009: Illegal target for the requested operation

    # 提交修改到 Apache svn 服务器
    $ svn --username=${Apache 用户名} commit -m "release 1.0-rc1"
    Adding         1.0-rc1
    Adding  (bin)  1.0-rc1/apache-apisix-1.0-rc1-src.tar.gz
    Adding  (bin)  1.0-rc1/apache-apisix-1.0-rc1-src.tar.gz.asc
    Adding         1.0-rc1/apache-apisix-1.0-rc1-src.tar.gz.sha512
    Transmitting file data ...
    Committed revision 37435.
    {{< / highlight >}}
    <h3 class="subtitle">发投票邮件到 dev 邮件列表</h3>
    <p><a href="https://lists.apache.org/thread.html/r19d355210af8e9459e3e7a72578c511a13b226e5214ade3edf41c965%40%3Cdev.apisix.apache.org%3E">点击此处查看参考邮件</a> 主要参考内容：邮件发送人（apache 邮箱）、邮件标题、邮件正文（主要是修改版本号和链接地址）。</p>
    <h3 class="subtitle">统计投票结果</h3>
    <p><a href="https://lists.apache.org/thread.html/r567ee0a770f92032d85ea1621bc756772e6d0ab033f299642f1f623d%40%3Cdev.apisix.apache.org%3E">点击此处查看参考邮件</a> 发起投票邮件后需要等待72小时，然后统计投票结果并发送一封 result 邮件到 dev@apisix.apache.org。</p>
    <h3 class="subtitle">发 announce 邮件</h3>
    <p><a href="https://lists.apache.org/thread.html/r612cf8db32ca15a1ca73167e3baf89ca9ab30100368b200d495d39a3%40%3Cdev.apisix.apache.org%3E">点击此处查看参考邮件</a> 在 dev@apisix.apache.org 和 announce@apache.org 两个邮件列表发起 announce 邮件</p>
    <h3 class="subtitle">将安装包从 dev 移动到 release 目录下</h3>
    <p>去掉包名中的 RC，将 KEYS 文件以及安装包移动到 <a href="https://dist.apache.org/repos/dist/release/apisix/">此地址</a></p>
    <h3 class="subtitle">更新下载信息</h3>
    <p>更新<a href="http://apisix.apache.org/downloads/">此地址</a> 的下载信息，源码在 https://github.com/apache/incubator-apisix-website</p>
  </section>
</div>
