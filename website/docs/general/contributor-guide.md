---
id: contributor-guide
title: Contributor Guide
keywords:
- API gateway
- APISIX
- Apache APISIX
- contributor guide
description: This article is a set of guidelines for Apache APISIX contributors, including things that a contributor can do and how to do it well.
---

Please follow this guide to [report bugs](#submitting-an-issue), [submit suggestions](#submitting-an-issue), or [submit PRs](#open-a-pull-request).

## Submitting an Issue

Before submitting an issue, try solving the problem through a comprehensive search.

[Open issues](https://github.com/apache/apisix/issues) and the [discussions forum](https://github.com/apache/apisix/discussions) are good places to search for solutions before opening an issue.

1. Check the [open issues](https://github.com/apache/apisix/issues) to avoid duplication.

2. Create a [new issue](https://github.com/apache/apisix/issues/new/choose) and choose the type of issue.

3. Define the issue with a clear and descriptive title.

4. Fill in necessary information according to the template.

5. Engage in the discussions in the issue and provide more information if necessary.

## Choosing an Issue to Work On

You can also contribute by fixing one of the [open issues](https://github.com/apache/apisix/issues).

1. Once you have chosen an issue to work on or [opened a new issue](#submitting-an-issue), please comment on the issue and ask a [Committer or PMC](/team) to assign it to you.

2. Please check to see if the issue is already being worked on and indicate when you will be able to complete it.

3. Connect with a [Committer or PMC](/team) for providing feedback on your issue and reviewing your PR.

### Good First Issues

Issues labelled "good first issues" are low hanging fruits that are easy to fix. These issues can help you make your first contributions to Apache APISIX®.

The list below contains such issues spanning across all the repos in Apache APISIX®.

- [Apache APISIX®](https://github.com/apache/apisix/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)
- [Apache APISIX® Ingress Controller](https://github.com/apache/apisix-ingress-controller/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)
- [Apache APISIX® dashboard](https://github.com/apache/apisix-dashboard/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)
- [Apache APISIX® Helm Chart](https://github.com/apache/apisix-helm-chart/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)
- [Docker distribution for Apache APISIX®](https://github.com/apache/apisix-docker/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)
- [Apache APISIX® Website](https://github.com/apache/apisix-website/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)
- [Apache APISIX® Java Plugin Runner](https://github.com/apache/apisix-java-plugin-runner/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22)
- [Apache APISIX® Go Plugin Runner](https://github.com/apache/apisix-go-plugin-runner/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22)

## Git Flow

To contribute code or documentation, setup your local machine for development.

### Fork the repo and clone your fork

Fork the [Apache APISIX repo](https://github.com/apache/apisix/) and clone your fork to your local machine.

```sh
git clone https://github.com/your-username/apisix.git
```

### Add 'upstream' repo to list of remotes

Check to see if the upstream repo has been configured by listing the remotes.

```sh
git remote -v
```

If not, you can add the upstream remote.

```sh
git remote add upstream https://github.com/apache/apisix.git
```

Learn more about Git and GitHub flow by following the [GitHub Docs](https://docs.github.com/en/get-started/quickstart/fork-a-repo).

**Note**: Setup your name and email address to make sure that your ID shows up in the contributor list.

```sh
git config --global user.name "full name"
git config --global user.email "mail address"
```

### Create your branch

To keep your local fork up to date, fetch and rebase with the upstream remote.

```sh
git fetch upstream
git checkout master
git rebase upstream/master
git push origin master
```

Then, to make changes, create a new branch in your local fork.

```sh
git checkout -b issue-no
```

**Note**: The commits in a PR are squashed before merging. This could result in commit logs different from upstream if you are using an older branch.

### Commiting your changes

Contributors are expected to adhere to the [Code of Conduct](https://www.apache.org/foundation/policies/conduct.html) throughout the process.

Once you make the changes, commit the files and push the changes to your fork.

```sh
$ git add modified-file-names
$ git commit -m 'commit message'
$ git push origin issue-no
```

### Open a pull request

Once you have your changes pushed to your fork, it is time to start the process of merging it to upstream by opening a pull request.

See [GitHub flow](https://docs.github.com/en/get-started/quickstart/github-flow#create-a-pull-request) for detailed instructions on making a pull request.

1. Open a pull request to the master branch.

2. Make sure that the pull request title has a semantic prefix like `fix:` or `feat:` or any other [conventional commit types](https://github.com/commitizen/conventional-commit-types/blob/master/index.json).

3. Reach out to your mentor for starting the review process.

4. Engage in discussions and provide clarifications to reviewers' questions.

5. Wait for your PR to be approved and merged.

6. Congratulate yourself for being an official contributor of Apache APISIX®!
