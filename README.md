<br>

<h1 style="position: relative" align="center">Apache APISIX® Website</h1>

<div align="center">
The website of <a href="https://github.com/apache/apisix/">Apache APISIX®</a>

A cloud-native microservices API Gateway

<a href="https://apisix.apache.org/slack"><img  width="150" src="./website/static/img/join-slack.png"></a>

</div>

<br>

## Getting Started

> If you want to write a blog or fix some blog-related issues, please read [Apache APISIX Blog Contributing Guide](http://apisix.apache.org/docs/general/blog) first.

### Pre-requisites

First, you need to install **Git**.

Then you should fork this repo, and clone your fork:

```bash
# clone your fork repo
git clone git@github.com:${your GitHub name}/apisix-website.git

# add this repo as upstream
git remote add upstream https://github.com/apache/apisix-website.git

# default dir should be apisix-website
cd apisix-website
```

### Getting started in a Dev Container

If you are using **VS Code**, **Docker**, and **Remote - Containers** plugin, you can use this to get started quickly.

> No, but want to try this way? Please read [Developing inside a Container#Installation](https://code.visualstudio.com/docs/remote/containers#_installation).

Then, start **VS Code**, run the `Remote-Containers: Open Folder in Container...` command.

> **Tip:** For details on how to do this, see the documentation [Developing inside a Container#Quick Start](https://code.visualstudio.com/docs/remote/containers#_quick-start-open-an-existing-folder-in-a-container).

After the initialization, you can skip the preparation part of the commands below and read [the rest](#previewing-documents-developing) directly.

### Getting started in the conventional way

First, you need to install **Node.js**, **Yarn**.

> **Tip:** Since the installation method may change, we recommend that you check the installation method on the corresponding official website. If you encounter any problems, please feel free to create an issue.

Then you can read [the commands](#commands) below.

## Commands

When you find that some commands do not run, or cannot be found, look at the package.json file.

This may be because the project is being updated quickly, but the corresponding developer did not find the time to update the corresponding documentation.

### Preparation

Except for the following commands that you need to run after downloading the project for the first time, you can **try running them again** when you encounter any problems.

```sh
# 1. Install deps
yarn

# 2. Prepare necessary data
yarn prepare-data

# Tip.
# The `yarn prepare-data` command contains the following three commands
# If necessary, you can run any of the following commands individually
yarn sync-doc # Sync all project documents
yarn generate-repos-info # Generate repository information for each project
yarn generate-picked-posts # Generate frontmatter information for featured blogs
```

> If you get a 403 error `Rate Limit Exceeded` from GitHub, that means you have hit the GitHub API rate limit. the project needs your [personal access token](https://github.com/settings/tokens) to unlimit it.
>
> If you don't already have one, [create one](https://github.com/settings/tokens/new), and run below command in your terminal (no scope to your personal data is needed)
>
> ```bash
> export GITHUB_TOKEN=${your token}
> ```

### Previewing documents, Developing

When you modify a document, blog, or page code, the preview in development mode is the fastest.

```sh
# Start docs part
yarn start:doc

# Tip.
# in dev, only English docs will be built
# it's a feature of docusaurus
# if you want to specify the locale,
# for example, Chinese, your should run
yarn start:doc --locale zh

# Start English Blog
yarn start:blog:en

# Start Chinese Blog
yarn start:blog:zh

# Start general docs, other pages part
yarn start:website
```

### Building

When you want to build or preview a site that looks the same as it does online, run the following commands.

```bash
# Since the local environment is slightly different from the online one,
# you must add the environment variable `preview`
preview=true yarn build
# or
yarn build:preview

# The above commands only build the site,
# to preview it locally you need the following commands
yarn serve

# You can also build and preview each part individually,
# just like in development mode
preview=true yarn build:doc && yarn serve:doc
preview=true yarn build:blog:en && yarn serve:blog:en
preview=true yarn build:blog:zh && yarn serve:blog:zh
preview=true yarn build:website && yarn serve:website
```

Next, you can modify the documentation or code, commit it and push it to GitHub when you're done. If you're not familiar with this, you can read [GitHub flow](https://docs.github.com/en/get-started/quickstart/github-flow) first.

## Advance Guide

If you only want to modify the `*.md` files, the above guide may be sufficient.

But if you need to develop, please read the guide below.

### Project Structure

Omitted some documents that may not be important.

```bash
apisix-website
├── .github
│   └── workflows # for GitHub CI, with steps to actually build the site
├── .husky # git hooks, currently only pre-commit is used
├── scripts # scripts to help build the site
├── blog
│   ├── en
│   └── zh
├── config
├── doc
└── website
    ├── articles
    ├── docs
    │   └── general # https://apisix.apache.org/docs/general/join
    ├── i18n
    │   └── zh # chinese content
    │       ├── docusaurus-plugin-content-blog # blog
    │       ├── docusaurus-plugin-content-docs # general
    │       └── docusaurus-theme-classic # translations of navbar and footer
    ├── src
    │   ├── clientModules # docusaurus feature
    │   ├── hooks # react hooks
    │   ├── pages
    │   ├── shaders
    │   └── theme # swizzled any Docs/Blog component
    ├── static
    └── docusaurus.config.js
```

## Acknowledge

Special thanks to [Docusaurus](https://docusaurus.io/).

## License

[Apache License 2.0](./LICENSE)
