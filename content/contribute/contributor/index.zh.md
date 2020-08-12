---
title: "贡献者指南"
date: 2020-03-29T11:46:04+08:00
include_footer: true
---

<div>
  <p>请按照这份指南，报告 bugs、提出建议或提交 PR，不必拘谨。</p>
  <br />
  <h2 class="title">提交 Issue</h2>
  <p>1. 在提交 Issue 之前，请充分利用搜索，确保问题无法通过搜索结果解决。</p>
  <p>2. 检查 <a href="https://github.com/apache/incubator-apisix/issues" target="_blank">Issue 列表</a> 确保没有重复的问题</p>
  <p>3. 创建一个新的 Issue 并选择恰当的 Issue 类型。</p>
  <p>4. 用一个清晰准确的描述性标题来描述您的 Issue。</p>
  <p>5. 根据模板，填写必要的信息。</p>
  <p>6. 为您的 Issue 选择恰当的标签。</p>
  <p>7. 请关注您的 Issue，您可能需要在讨论中提供更多的信息。</p>
  <br />
  <h2 class="title">开发者流程</h2>
  <p></p>
  <h3 class="subtitle">Fork 代码仓库</h3>
  <p>请 Fork 一份 Apache APISIX 的代码仓库到您自己的仓库中，然后设定恰当的上游分支。</p>
  <br />
  {{< highlight go "linenos=table" >}}
  git remote add upstream https://github.com/apache/incubator-apisix.git
  {{< / highlight >}}
  <br />
  <h3 class="subtitle">选择一个 Issue</h3>
  <p></p>
  <p>1. 请选择您的目标 Issue。如果您希望报告一个新发现的 Issue 或者一个新的功能增强，请先创建 Issue 并设定恰当的标签。</p>
  <p>2. 在选择一个有价值的 Issue 之后，请回复一个截止时间来表明您正在尝试解决它。</p>
  <p>3. 在 <a href="/team">团队页面</a> 选择一个导师，他将会及时对您的 Issue 和 PR 做出反馈。</p>
  <br />
  <h3 class="subtitle">创建您的分支</h3>
  <p></p>
  <p>切换到您已经 fork 的 master 分支，从上游拉取代码，然后创建一个新的分支。</p>
  <br />
  {{< highlight go "linenos=table" >}}
  $ git checkout master
  $ git pull upstream master
  $ git checkout -b IssueNo
  {{< / highlight >}}
  <p></p>
  <p><strong>注意：</strong> 我们将会使用 squash 合并 PR，较老的分支上的提交记录可能会与上游不同。</p>
  <br />
  <h3 class="subtitle">Coding</h3>
  <p></p>
  <p>1. 请在开发过程中遵守行为准则，并在提交 Pull Request 之前完成检查。</p>
  <p>2. 然后将您的代码推送到您 fork 的仓库中。</p>
  <br />
  {{< highlight go "linenos=table" >}}
  $ git add modified-file-names
  $ git commit -m 'commit message'
  $ git push origin issueNo
  {{< / highlight >}}
  <br />
  <h3 class="subtitle">提交 PR</h3>
  <p></p>
  <p>1. 向 master 分支发送一个 pull request。</p>
  <p>2. 导师会复查您的代码，并与您讨论一些细节问题，包括设计、实现、性能等。</p>
  <p>3. 祝贺您成为 Apache APISIX 的一名正式贡献者。</p>
  <br />
  <h3 class="subtitle">删除分支</h3>
  <p></p>
  <p>在导师将您的 PR 合并到 master 分支之后，您可以删除远程分支（origin/IssueNo）及与之关联的本地分支（IssueNo）。</p>
  <br />
  {{< highlight go "linenos=table" >}}
  $ git checkout master
  $ git branch -d IssueNo
  $ git push origin --delete issueNo
  {{< / highlight >}}
  <br />
  <h3 class="subtitle">提示</h3>
  <p></p>
  <p>请注意，为了让您的 ID 显示在贡献者列表中，请不要忘记进行下面的设置：</p>
  <br />
  {{< highlight go "linenos=table" >}}
  $ git config --global user.name "username"
  $ git config --global user.email "mail address"
  {{< / highlight >}}
</div>