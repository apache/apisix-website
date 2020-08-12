---
title: "两步验证"
date: 2020-03-29T11:46:04+08:00
include_footer: true
---

<div>
<h2 class="title">两步验证（2FA）</h2>
<p>两步验证（2FA）是一种更加安全的用户认证手段，在除了使用用户名和密码之外，还需要使用其他材料（如信用卡、手机短信、令牌、指纹等生物特征）验证用户身份。为了确保提交者账户的安全性，您需要在 GitHub 上启用 2FA 来登录和提交贡献。更多的细节，请参考 <a href="https://help.github.com/articles/requiring-two-factor-authentication-in-your-organization/" target="_blank">2FA</a>。</p>
<p><strong>注意：</strong>如果您没有启用 2FA，您将会被从项目中移除，亦无法访问我们的仓库、fork 我们的私有仓库。</p>
<br />
<h2 class="title">在 GitHub 上启用 2FA</h2>
<p>具体操作细节，请参考 <a href="https://help.github.com/en/github/authenticating-to-github/configuring-two-factor-authentication" target="_blank">Enable Two Factor Authentication with TOTP</a>。</p>
<p>在启用 2FA 之后，您需要使用用户名/密码 + 验证码，来登陆 GitHub。</p>
<p><strong>提示：</strong> 如果您无法通过页面上的链接下载 APP，您可以在应用商店中搜索下载 Google Authenticator。</p>
<br />
<h2 class="title">如何提交代码</h2>
<p>在启用 2FA 之后，您需要生成私有访问令牌（Private Access Token）来进行 Git 提交之类的操作。此时，您将使用用户名 + 令牌来提交代码，而不是原先的用户名 + 密码。</p>
<p>具体操作细节，请参考 <a href="https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line" target="_blank">Create a Private Token</a>.</p>
</div>