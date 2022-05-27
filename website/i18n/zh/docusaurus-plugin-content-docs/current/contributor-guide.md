---
id: contributor-guide
title: 贡献指南
keywords:
- API 网关
- APISIX
- Apache APISIX
- APISIX 贡献者指南
description: Apache APISIX 贡献者指南。
---

本文介绍了如何为 Apache APISIX 社区做出贡献。

## 我能贡献什么？

你可以通过以下方式为 Apache APISIX 做出贡献：

- 修复标记为 [`good first issue`](/docs/general/contributor-guide/#good-first-issues) 或者 [`help wanted`](https://github.com/apache/apisix/issues?q=is%3Aopen+label%3A%22help+wanted%22+sort%3Aupdated-desc) 的 issue 。

- 参与[邮件列表](/docs/general/join/)上的讨论.

- 回答 [Issues](https://github.com/apache/apisix/issues) 和 [Discussions](https://github.com/apache/apisix/discussions) 中的问题。

- Review 正在进行的 [pull requests](https://github.com/apache/apisix/pulls?q=is%3Apr+is%3Aopen+sort%3Aupdated-desc).

- 改进 APISIX Website。

- 改进文档或者提交新的博客文章。

- 其他形式的代码或者非代码的贡献。

如果你有任何关于 Apache APISIX 做贡献的想法，也欢迎随时发邮件到 dev@apisix.apache.org 进行社区讨论。

## 选择想要修复的 issue

你可以选择修复一个正在进行的 [Issues](https://github.com/apache/apisix/issues)。

1. 一旦你选择了一个 issue 进行工作或[创建新的 issue](/docs/general/submit-issue)，请在该 issue 下留言，并让一个 [Committer 或者 PMC](/team) 将它分配给你。

2. 请检查 issue 的状态，并推断你是否能够完成该 issue。

3. 联系 [Committer 或者 PMC](/team) 为你处理的 issue 提供反馈和 Review。

### Good first issues

带有 `good first issues` 标签的 issue 通常是对新手友好且上手较简单的类型，你可以此作为突破口，开始你对 APISIX 的第一个贡献。

你可以浏览 [`good first issues`](/contribute) 列表，并选择想要贡献的 issue。

## 搭建本地开发环境

贡献代码或文档前，请搭建你的本地开发环境。

### Fork 项目仓库并 Clone 到本地

首先前往 Github 上的 [APISIX repo](https://github.com/apache/apisix/) 仓库。在页面右上角处，点击 Fork 按键，然后在你 Fork 的仓库中克隆到你的本地环境。

```shell
git clone https://github.com/${your-username}/apisix.git
```

### 添加 `upstream` 仓库作为本地的远程仓库

你可以通过以下命令，检查上游 repo 是否已经被配置，如果返回结果中存在四条记录则说明已经被配置。

```shell
git remote -v
```

如果返回结果中只有两条记录，你可以通过以下命令配置：

```shell
git remote add upstream https://github.com/apache/apisix.git
```

如果你需要了解更多关于 Git 和 GitHub 流程的信息，请参考 [GitHub 文档](https://docs.github.com/en/get-started/quickstart/fork-a-repo)。

:::note

你需要设置你的姓名和邮件地址，以确保你的 ID 显示在贡献者名单上。

:::

你可以使用以下命令进行设置：

```shell
git config --global user.name "full name"
git config --global user.email "mail address"
```

### 创建你的分支

为了保证本地分支保持最新，你可以拉取上游的最新变更并应用到本地分支：

```shell
git fetch upstream
git checkout master
git rebase upstream/master
git push origin master
```

如果需要修改代码，你可以通过以下命令在本地创建一个新分支：

```shell
git checkout -b issue-no
```

:::note

每个 PR 中的提交在合并之前都会被压缩。如果你使用的是较早的分支，可能会导致提交日志与上游不同。

:::

### 提交你的改动

贡献者应在整个过程中遵守[代码行为准则](https://www.apache.org/foundation/policies/conduct.html)。

当你完成了修改，就可以提交文件并推送到你的分叉上。

```shell
git add modified-file-names
git commit -m 'commit message'
git push origin issue-no
```

### 创建一个 PR

当你把修改推送到你的分支上后，就可以创建一个 PR 把它合并到上游仓库中。

查阅 [GitHub 工作流程](https://docs.github.com/en/get-started/quickstart/github-flow#create-a-pull-request) 了解提交 PR 的详细细节。

1. 创建一个到 master 分支的 PR。

2. 请确保 PR 标题有如 `fix:`，`feat:` 或者其他[提交类型](https://github.com/commitizen/conventional-commit-types/blob/master/index.json)的前缀。

3. 联系相关问题领域的 Committer/PMC 成员，开始进入 Review 流程。

4. 参与讨论并对 reviewer 的问题进行解答。

5. 等待你的 PR 被同意并合并。

6. 祝贺你成为 Apache APISIX 的官方贡献者!

## 建议操作：双重认证 (2FA)

双重认证（Two-factor authentication，下称 2FA）是指将密码和对象（如信用卡、短信、令牌或如指纹的生物标志物）结合起来识别用户的认证方法。

为了保证贡献者账户的安全，在 GitHub 上登录贡献代码时，你需要配置 [2FA](https://docs.github.com/en/authentication/securing-your-account-with-two-factor-authentication-2fa/configuring-two-factor-authentication) 。更多细节请参考[用 2FA 保护你的账户](https://docs.github.com/en/authentication/securing-your-account-with-two-factor-authentication-2fa)。

:::note

如果没有启用 2FA，你有可能会被项目移除，并且无法访问 Apache APISIX 的存储库。

:::

### 在 GitHub 上配置 2FA

你可以使用一个[手机 APP](https://docs.github.com/cn/authentication/securing-your-account-with-two-factor-authentication-2fa/configuring-two-factor-authentication#configuring-two-factor-authentication-using-a-totp-mobile-app) 或通过[短信](https://docs.github.com/cn/authentication/securing-your-account-with-two-factor-authentication-2fa/configuring-two-factor-authentication#configuring-two-factor-authentication-using-text-messages)来配置 2FA。

GitHub 建议使用基于时间的一次性密码（TOTP）手机 APP 来配置 2FA。阅读[配置 2FA](https://docs.github.com/cn/authentication/securing-your-account-with-two-factor-authentication-2fa/configuring-two-factor-authentication)获得更细节的信息。

### 提交代码

在开启了 2FA 之后，[创建一个个人访问令牌](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)来执行 Git 操作。

在推送代码时，你可以使用`用户名+个人访问令牌`组合来代替`用户名+密码`组合。
