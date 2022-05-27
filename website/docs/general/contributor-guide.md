---
id: contributor-guide
title: Contributing flow
keywords:
- API gateway
- APISIX
- Apache APISIX
- contributor guide
description: Guidelines for Apache APISIX contributors.
---

This document describes the general flow for contributing to APISIX repos.

## What can I contribute?

Any and all forms of contributions are welcome! For example you can,

- Fix issues tagged with "[good first issue](/docs/general/contributor-guide/#good-first-issues)" or "[help wanted](https://github.com/apache/apisix/issues?q=is%3Aopen+label%3A%22help+wanted%22+sort%3Aupdated-desc)" labels.

- Join the discussions on the [mailing list](/docs/general/join/).

- Answer questions in [issues](https://github.com/apache/apisix/issues) and [discussions](https://github.com/apache/apisix/discussions).

- Review open [pull requests](https://github.com/apache/apisix/pulls?q=is%3Apr+is%3Aopen+sort%3Aupdated-desc).

- Improve the website.

- Improve documentation or write a blog post.

- Any other form of code or non-code contribution.

If you would like to contribute, let us know by sending an email to dev@apisix.apache.org!

## Choosing an issue to work on

You can also contribute by fixing one of the [open issues](https://github.com/apache/apisix/issues).

1. Once you have chosen an issue to work on or [opened a new issue](/docs/general/submit-issue), please comment on the issue and ask a [Committer or PMC](/team) to assign it to you.

2. Please check to see if the issue is already being worked on and indicate when you will be able to complete it.

3. Connect with a [Committer or PMC](/team) for providing feedback on your issue and reviewing your PR.

### Good first issues

Issues labelled "good first issues" are low hanging fruits that are easy to fix. These issues can help you make your first contributions to APISIX.

To start, you can go through this [curated list of "good first issues"](/contribute).

## Git flow

To contribute code or documentation, setup your local machine for development.

### Fork the repo and clone your fork

Fork the [APISIX repo](https://github.com/apache/apisix/) and clone your fork to your local machine.

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

6. Congratulate yourself for being an official contributor of Apache APISIX!

## Two-Factor Authentication (2FA)

Two-Factor Authentication (2FA) refers to the authentication method that combines both a password and an object (credit card, SMS, tokens, or biomarkers as fingerprint) to identify a user.

To ensure the security of the committer’s account, we need you to [configure 2FA](https://docs.github.com/en/authentication/securing-your-account-with-two-factor-authentication-2fa/configuring-two-factor-authentication) while signing in to contribute code on GitHub. For more details, please refer to [Securing your account with two-factor authentication (2FA)](https://docs.github.com/en/authentication/securing-your-account-with-two-factor-authentication-2fa).

**Note**: If 2FA is not enabled, you are liable to be removed from the project and would not be able to access Apache APISIX's repositories.

### Configuring 2FA on GitHub

You can configure 2FA using a [mobile app](https://docs.github.com/en/authentication/securing-your-account-with-two-factor-authentication-2fa/configuring-two-factor-authentication#configuring-two-factor-authentication-using-a-totp-mobile-app) or via [text message](https://docs.github.com/en/authentication/securing-your-account-with-two-factor-authentication-2fa/configuring-two-factor-authentication#configuring-two-factor-authentication-using-text-messages).

GitHub recommends using a time-based-one-time password (TOTP) mobile application to configure 2FA. Read [Configuring two-factor authentication](https://docs.github.com/en/authentication/securing-your-account-with-two-factor-authentication-2fa/configuring-two-factor-authentication) for detailed information.

### Submitting code

After enabling 2FA, [create a personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) to perform Git operations.

You can then use the username + personal access token combination in place of the username + password combination while pushing your code.
