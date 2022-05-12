---
id: contributor-guide
title: 贡献流程
keywords:
- API 网关
- APISIX
- Apache APISIX
- 贡献者指南
description: Apache APISIX 贡献者指南。
---

本文档描述了任何贡献到 Apache APISIX 的通用流程。

## 我能贡献什么？

欢迎任意形式的形式的贡献！比如说你可以，

- 修复标记为 "[good first issue](/docs/general/contributor-guide/#good-first-issues)" 的issue 或者 "[help wanted](https://github.com/apache/apisix/issues?q=is%3Aopen+label%3A%22help+wanted%22+sort%3Aupdated-desc)" 的label。

- 参与[邮件列表](/docs/general/join/)上的讨论.

- 回答 [issues](https://github.com/apache/apisix/issues) 和 [discussions](https://github.com/apache/apisix/discussions)中的问题。

- 审查正在进行的 [pull requests](https://github.com/apache/apisix/pulls?q=is%3Apr+is%3Aopen+sort%3Aupdated-desc).

- 改进网站。

- 改进文档或者提供新的文档博客。

- 任何其他形式的代码或非代码的贡献。

如果你有意愿为 Apache APISIX 做一些贡献，可以向发送邮件到dev@apisix.apache.org让我们知道！

## 选择一个issue去贡献

你可以选择修复一个 [正在进行的 issues](https://github.com/apache/apisix/issues)。

1. 一旦你选择了一个issue进行工作或 [发起一份新issue](#submitting-an-issue)，请在该issue下留言，并让一个[Committer 或者 PMC](/team) 将它分配给你。

2. 请检查issue是否已经在处理中，并推断你是否能够完成该问题。

3. 联系一位 [Committer 或者 PMC](/team) 给你处理的issue提供反馈和代码审查。

### Good first issues

带有 "good first issues" 标签的issue比较简单直接，您可以此作为突破口，开始你对APISIX的第一个贡献。

你可以从浏览["good first issues"列表](/contribute)开始。

## Git 流程

贡献代码或文档前，请搭建你的本地开发环境。

### Fork 项目仓库并 Clone到本地

首先前往Github上的[APISIX repo](https://github.com/apache/apisix/)仓库。在页面右上角处，点击 Fork 按键，然后在你Fork的仓库中克隆到你的本地环境。

```sh
git clone https://github.com/your-username/apisix.git
```

### 添加 'upstream' 仓库作为本地的远程仓库

通过列出远程仓库，检查上游 repo 是否已被配置。

```sh
git remote -v
```

如果没有的话，需要手动配置：

```sh
git remote add upstream https://github.com/apache/apisix.git
```

了解更多关于Git和GitHub流程的信息，请查阅 [GitHub 文档](https://docs.github.com/en/get-started/quickstart/fork-a-repo).

**注意**: git中设置你的姓名和电子邮件地址，以确保你的ID显示在贡献者名单上。

```sh
git config --global user.name "full name"
git config --global user.email "mail address"
```

### 创建你的分支

为了使你的本地分叉保持最新，你可以从上游远程获取并变基。

```sh
git fetch upstream
git checkout master
git rebase upstream/master
git push origin master
```

然后，要进行修改，在你的本地分叉中创建一个新的分支。

```sh
git checkout -b issue-no
```

**注意**: PR中的提交在合并前会被压缩。如果你使用的是较早的分支，这可能会导致提交日志与上游不同。

### 提交你的改动

贡献者应在整个过程中遵守[代码行为准则](https://www.apache.org/foundation/policies/conduct.html) 。

当你完成了修改，就可以提交文件并推送到你的分叉上。

```sh
$ git add modified-file-names
$ git commit -m 'commit message'
$ git push origin issue-no
```

### 开启一个PR

当你把修改推送到你的分支上后，就可以通过开启一个PR开始把它合并到上游仓库中。

查阅 [GitHub 工作流程](https://docs.github.com/en/get-started/quickstart/github-flow#create-a-pull-request) 了解提交PR的详细细节。

1. 创建一个到master分支的PR。

2. 确保PR标题有如 `fix:` ， `feat:` 或其他 [约定俗成的提交类型](https://github.com/commitizen/conventional-commit-types/blob/master/index.json)的前缀。

3. 联系你的mentor，开始review流程。

4. 参与讨论并对reviewer的问题进行解答。

5. 等待你的PR被同意并合并。

6. 祝贺你成为Apache APISIX的官方贡献者!

## 双重认证 (2FA)

双重认证（Two-factor authentication，下称2FA）是指将密码和对象（如信用卡、短信、令牌或如指纹的生物标志物）结合起来识别用户的认证方法。

为了保证贡献者账户的安全，在GitHub上登录贡献代码时我们需要你 [配置 2FA](https://docs.github.com/en/authentication/securing-your-account-with-two-factor-authentication-2fa/configuring-two-factor-authentication)。更多细节请参考 [用2FA确保你的账户安全](https://docs.github.com/en/authentication/securing-your-account-with-two-factor-authentication-2fa)。

**注意**: 如果不启用2FA，你有可能被从项目中删除，并将无法访问Apache APISIX的存储库。

### 在GitHub上配置2FA

你可以使用一个[移动软件](https://docs.github.com/en/authentication/securing-your-account-with-two-factor-authentication-2fa/configuring-two-factor-authentication#configuring-two-factor-authentication-using-a-totp-mobile-app) 或通过[短信](https://docs.github.com/en/authentication/securing-your-account-with-two-factor-authentication-2fa/configuring-two-factor-authentication#configuring-two-factor-authentication-using-text-messages)来配置2FA。

GitHub 建议使用基于时间的一次性密码（TOTP）移动应用程序来配置 2FA。阅读[配置2FA](https://docs.github.com/en/authentication/securing-your-account-with-two-factor-authentication-2fa/configuring-two-factor-authentication)获得更细节的信息。

### 提交代码

在开启了2FA之后，[创建一个个人访问令牌](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)来执行Git操作。

在推送代码时，你可以使用用户名+个人访问令牌组合来代替用户名+密码组合。