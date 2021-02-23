---
id: contributor-guide
title: Contributor Guide
---

Please fee free to report bugs, submit suggestions, or submit PRs according to this guide.

## Submit an issue

1. Before submitting your issues, please go through a comprehensive search to make sure the problem cannot be solved just by searching.

2. Check the Issue List to make sure the problem is not repeated.

3. Create a new issue and choose the type of issue.

4. Define the issue with a clear and descriptive title.

5. Fill in necessary information according to the template.

6. Choose a label after issue created.

7. Please pay attention to your issue, you may need provide more information during discussion.

## Developer Flow

### Fork repo

Fork the Apache APISIX repo to your own repo to work, then setting proper upstream.

```sh
git remote add upstream https://github.com/apache/apisix.git
```

### Choose an issue

1. Please choose your target issue. If it is a new issue discovered or a new function enhancement to offer, please create an issue and set the right label for it.

2. After choosing the relevant issue, please reply with a deadline to indicate that you are working on it.

3. Find a mentor from the Team page and your mentor will give you feedback about your PR or issue in time.

### Create your branch

Switch to your forked master branch, pull codes from upstream, then create a new branch.

```sh
$ git checkout master
$ git pull upstream master
$ git checkout -b IssueNo
```

Notice: We will merge PR using squash, commit logs will be different form upstream if you use one older branch.

### Coding

1. Please obey the Code of Conduct during the process of development and finish the check before submitting the pull request.

2. Then push codes to your fork repo.

```sh
$ git add modified-file-names
$ git commit -m 'commit message'
$ git push origin issueNo
```

### Submit PR

1. Send a pull request to the master branch.

2. The mentor will do codes review before discussing some details (including the design, the implementation and the performance) with you.

3. Also make sure that the pull request title has a semantic prefix like `fix:` or `feat:` or any other [conventional commit types](https://github.com/commitizen/conventional-commit-types/blob/master/index.json).

4. Then congratulate to you to be an official contributor of Apache APISIX.

### Delete branch

You can delete the remote branch (origin/IssueNo) and the local branch (IssueNo) associated with the remote branch (origin/IssueNo) after the mentor merged the PR into the master branch.

```sh
$ git checkout master
$ git branch -d IssueNo
$ git push origin --delete issueNo
```

### Notice

Please note that in order to show your ID in the contributor list, please DO NOT forget to set the configurations below:

```sh
$ git config --global user.name "username"
$ git config --global user.email "mail address"
```
