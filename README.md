
<h1 style="position: relative" align="center">Apache APISIX® Website
<a style="position: absolute; bottom: 10px; right: 0px" href="https://apisix.apache.org/docs/general/join"><img align="right" width="150" src="./website/static/img/join-slack.png"></a>
</h1>

<div align="center">
The website of <a href="https://github.com/apache/apisix/">Apache APISIX®</a>

A cloud-native microservices api gateway


<a href="https://apisix.apache.org/docs/general/join">��Let's go</a>
</div>


## Usage

> If you want to write a blog or fix some blog-related issues, please read [Apache APISIX Blog Contributing Guide](http://apisix.apache.org/docs/general/blog) first.

### Preparation

First, you need to install `node.js`, `yarn`, `git`.

Since the installation method may change, we recommend that you check the installation method on the corresponding official website. If you encounter any problems, please feel free to create an issue.

Then you should fork this repo, and clone your fork:

```bash
# clone your fork repo
git clone git@github.com:${your GitHub name}/apisix-website.git

# add this repo as upstream
git remote add upstream https://github.com/apache/apisix-website.git
```

### Basic

```sh
# 1. cd 
# default dir should be apisix-website
cd apisix-website

# 2. install deps
yarn

# 3. sync docs and generate repos info
yarn sync-doc && yarn generate-repos-info

# 4. start dev mode
yarn start

# tip.
# in development mode, only English site will be built
# it's a feature of docusaurus
# if you want to specify the locale, 
# for example, Chinese, your should run 
yarn start --locale zh 

# tip.
# if you want to preview the same site as online
yarn build && yarn serve
```

Next, you can modify the documentation or code, commit it and push it to GitHub when you're done. If you're not familiar with this, you can read [GitHub flow](https://docs.github.com/en/get-started/quickstart/github-flow) first.

### Advance

If you only want to modify the `*.md` files, the above guide may be sufficient.

But if you need to develop, please read the guide below.

#### Project Structure

Omitted some documents that may not be important.

```bash
apisix-website
├── .github
│   └── workflows # for GitHub CI, with steps to actually build the site
├── .husky # git hooks, currently only pre-commit is used
├── scripts # scripts to help build the site
└── website # docusaurus
    ├── articles
    ├── blog
    ├── config # are imported in scripts and docusaurus.config.js
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

Special thanks to [docusaurus](https://docusaurus.io/).

## License

[Apache License 2.0](./LICENSE)
