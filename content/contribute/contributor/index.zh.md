---
title: "贡献者指南"
date: 2020-03-29T11:46:04+08:00
include_footer: true
---

<div>
  <p>Please fee free to report bugs, submit suggestions, or submit PRs according to this guide.</p>
  <br />
  <h2 class="title">Submit an issue</h2>
  <p>1. Before submitting your issues, please go through a comprehensive search to make sure the problem cannot be solved just by searching.</p>
  <p>2. Check the <a href="https://github.com/apache/incubator-apisix/issues" target="_blank">Issue List</a> to make sure the problem is not repeated.</p>
  <p>3. Create a new issue and choose the type of issue.</p>
  <p>4. Define the issue with a clear and descriptive title.</p>
  <p>5. Fill in necessary information according to the template.</p>
  <p>6. Choose a label after issue created.</p>
  <p>7. Please pay attention to your issue, you may need provide more information during discussion.</p>
  <br />
  <h2 class="title">Developer Flow</h2>
  <p></p>
  <h3 class="subtitle">Fork repo</h3>
  <p>Fork the Apache APISIX repo to your own repo to work, then setting proper upstream.</p>
  <br />
  {{< highlight go "linenos=table" >}}
  git remote add upstream https://github.com/apache/incubator-apisix.git
  {{< / highlight >}}
  <br />
  <h3 class="subtitle">Choose an issue</h3>
  <p></p>
  <p>1. Please choose your target issue. If it is a new issue discovered or a new function enhancement to offer, please create an issue and set the right label for it.</p>
  <p>2. After choosing the relevant issue, please reply with a deadline to indicate that you are working on it.</p>
  <p>3. Find a mentor from <a href="/team">the Team page</a> and your mentor will give you feedback about your PR or issue in time.</p>
  <br />
  <h3 class="subtitle">Create your branch</h3>
  <p></p>
  <p>Switch to your forked master branch, pull codes from upstream, then create a new branch.</p>
  <br />
  {{< highlight go "linenos=table" >}}
  $ git checkout master
  $ git pull upstream master
  $ git checkout -b IssueNo
  {{< / highlight >}}
  <p></p>
  <p><strong>Notice:</strong> We will merge PR using squash, commit logs will be different form upstream if you use one older branch.</p>
  <br />
  <h3 class="subtitle">Coding</h3>
  <p></p>
  <p>1. Please obey the Code of Conduct during the process of development and finish the check before submitting the pull request.</p>
  <p>2. Then push codes to your fork repo.</p>
  <br />
  {{< highlight go "linenos=table" >}}
  $ git add modified-file-names
  $ git commit -m 'commit message'
  $ git push origin issueNo
  {{< / highlight >}}
  <br />
  <h3 class="subtitle">Submit PR</h3>
  <p></p>
  <p>1. Send a pull request to the master branch.</p>
  <p>2. The mentor will do codes review before discussing some details (including the design, the implementation and the performance) with you.</p>
  <p>3. Then congratulate to you to be an official contributor of Apache APISIX.</p>
  <br />
  <h3 class="subtitle">Delete branch</h3>
  <p></p>
  <p>You can delete the remote branch (origin/IssueNo) and the local branch (IssueNo) associated with the remote branch (origin/IssueNo) after the mentor merged the PR into the master branch.</p>
  <br />
  {{< highlight go "linenos=table" >}}
  $ git checkout master
  $ git branch -d IssueNo
  $ git push origin --delete issueNo
  {{< / highlight >}}
  <br />
  <h3 class="subtitle">Notice</h3>
  <p></p>
  <p>Please note that in order to show your ID in the contributor list, please DO NOT forget to set the configurations below:</p>
  <br />
  {{< highlight go "linenos=table" >}}
  $ git config --global user.name "username"
  $ git config --global user.email "mail address"
  {{< / highlight >}}
</div>