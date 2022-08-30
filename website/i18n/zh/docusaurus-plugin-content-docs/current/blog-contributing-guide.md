---
id: blog
title: 博客贡献指南
keywords:
- API 网关
- APISIX
- Apache APISIX
- 博客
description: 如何在 Apache APISIX 官网提交或更新博客？
---

如需在 Apache APISIX 网站上进行撰写或更新[博客](https://apisix.apache.org/zh/blog/)，请遵循本篇指南。

如果你对已经发布的博客内容存有疑问，欢迎提交 [issue](/docs/general/submit-issue) 进行反馈。如果你有意愿，也可自己创建一个 [PR](/docs/general/contributor-guide/#open-a-pull-request) 对该问题进行修复。

当前博客支持[中文](https://apisix.apache.org/zh/blog/)和[英文](https://apisix.apache.org/blog/)两种语言，你可以根据自己的熟悉的语言提交博客。目前中文和英文博客需要同时提交，否则在官网会出现未知错误，但是你不必担心，社区贡献者会在你提交博客之后翻译文章，届时你可以 Review 相应 PR。

你可以在 `/apisix-website/blog/en/blog` 目录下根据年/月/日创建一个目录，并提交英文博客。

例如：`/apisix-website/blog/en/blog/2022/03/01/apisix-integration-public-api-plugin.md` 该目录释义如下：

- `apisix-integration-public-api-plugin.md` 是这篇博客的文件名，这篇博客的发布日期是 2022 年 3 月 1 日，
- `website/blog/2022/03/01` 是该博客所在的目录。
- `https://apisix.apache.org/blog/2022/03/01/apisix-integration-public-api-plugin` 是该博客 PR 合并后的 URL。

  :::note 注意

  同样的，你可以在 `/apisix-website/blog/zh/blog` 目录下提交中文博客。

  :::

## 博客类型

你不但可以提交如何使用 Apache APISIX 的博客，而且也可以提交如何为 Apache APISIX 做贡献的博客。

你也可以更新已经发布的博客，包括但不限于更新博客内容，修复 issues 中提到的链接错误、用词错误以及表述不清晰等问题。

## 提交博客流程

提交一篇新博客是为 Apache APISIX 做贡献的最好方式之一。Apache APISIX 项目的使用者和贡献者都可以从你的博客中学习经验。

1. 首先你需要在正确的路径中存放新的博客文档。
    1. 如果你用**英文**撰写博客，请在 `/apisix-website/blog/en/blog` 目录下新建一个 Markdown 文件。
    2. 如果你用**中文**撰写博客，请在 `/apisix-website/blog/zh/blog` 目录下新建一个 Markdown 文件。
    3. 如果你未能找到一个合适的目录匹配年月日，你可以新建一个文件夹来存放博客。

2. 当你找到了一个存放你的博客的目录，你就可以在该目录中创建一个 Markdown 文件。请注意，文件名请使用英文，并且避免大写字母。Reviewers 可能会建议你改变文件名以提升 SEO（部分文件名含有大写字母，已经在 [#713](https://github.com/apache/apisix-website/issues/713) 中被修复）。

3. 你可以通过编辑 Markdown 文件把文字、图片、图表添加到你的博客中。你可以从 [Markdown 指南](https://www.markdownguide.org/)了解更多关于 Markdown 格式的信息。
    - 添加图片前，你可以在 Github 上，先创建一个 [issue 的草稿](https://github.com/apache/apisix-website/issues/new?assignees=&labels=documentation&template=documentation.yaml&title=%5BDocs%5D%3A+)，然后将图片上传到 Current State，请先将图片上传到 Github 的 issue 中，然后在 Markdown 文件中添加图片链接。
    - 表格及图片蕴涵了大量信息，我们很乐意看到它们。从经验来看小于等于 4 列的表格在网页上显得更加美观。

4. 根据你新建的博客[创建一个 PR](/docs/general/contributor-guide/#创建一个-pr)。

  :::note 注意

  你可以通过在本地构建网页环境检查你的修改。这可以确保在你提交 PR 之前没有任何错别字或遗留问题。虽然 Apache APISIX Website 会运行 CI 来检查并反馈这些错误，但更推荐优先在本地环境进行测试。具体构建流程请参考[构建网页环境](https://github.com/apache/apisix-website/blob/master/README.md)。

  :::

### 配置博客元数据

每一个博客源文件都包含了一个 YAML 前言或标题，并使用两行 `---` 与正文分分隔。

元数据中包含了 `title`、`description`、`authors`、`tags` 和 `keywords` 等字段，部分内容可以参考的模板如下：

#### 单作者模板

如果你的博客只有一个作者可以使用以下模板：

```markdown
title: "Blog's Title"
authors:
  - name: "Author's Name"
    title: "Author"
    url: "Author's GitHub"
    image_url: "Author's Image URL"
keywords:
- keywords 1
- keywords 2
- keywords 3
- keywords 4
- keywords 5
description: Description of the post
tags: [tag1,tag2,...,tagn]
```

#### 共同作者模板

翻译和修改文章需要花费很多时间和精力，因此，你可以使用共同作者模板为博客添加多个作者。

```markdown
title: "Blog's Title"
authors:
  - name: "Author's Name"
    title: "Author's title"
    url: "Author's GitHub"
    image_url: "Author's Image URL"
  - name: "Translator/Technical Writer's name"
    title: "Translator or Technical Writer"
    url: "Translator/Technical Writer's GitHub"
    image_url: "Translator/Technical Writer's Image URL"
keywords:
- keywords 1
- keywords 2
- keywords 3
- keywords 4
- keywords 5
description: Description of the post
tags: [tag1,tag2,...,tagn]
```

下面将详细介绍这些字段中的每一个：

#### `authors`

这是一个必填字段，当博客是由多人共同撰写时，必须使用这个字段以便表彰作者。 `authors` 字段由以下几部分构成：

- `authors.name`：作者的姓名，例如张三：`name: "张三"`。
- `authors.title`：作者的职位，例如文档工程师：`title: "Technical Writer"`。
- `authors.url`：作者的 GitHub 主页，例如：`url: "https://github.com/yzeng25"`。
- `authors.image_url`：作者的 GitHub 头像，例如：`authors.image_url: "https://avatars.githubusercontent.com/u/36651058?v=4"`。

#### `keywords`

关键字是提升 SEO 优化文章排名的必需字段。

在中文博客中，前三个关键字通常是 `API 网关`（英文博客中请使用 API Getway）、`APISIX` 和 `Apache APISIX`，后两个关键字与博客主题相关。

#### `description`

短描述是另外一个提升 SEO 优化网站排名的必需字段，需要包括用户需要这篇文章时，可能会使用的搜索关键字。

对博客简短的概述就是一个好描述，通常描述的字符数在 150 到 160 之间即可。你可以通过[字符统计软件](https://www.eteste.com/)进行计算。

#### `tags`

标签通常被用于文章的分类。

每篇博客可以有多个标签。下面列举了一些常用的标签和相应解释，一篇博客通常会涵盖其中部分标签。如果无法找到适合的标签，请在提交 PR 时留下评论，我们将一起处理。

- **Community**：社区、社区活动有关的内容以及版本发布的标签，比如说："如何以代码之外形式给社区做贡献？"，直播预告、活动预告、会议内容和项目会议内容。
- **Security**：安全漏洞通知和解决安全漏洞的方法。目前有[六篇文章](/blog/tags/security/)，他们都同样有形如 CVE-xxxxxxx 的标题。
- **Case Studies**：关于在企业内使用 Apache APISIX 的博客，让我们知道你是如何使用 Apache APISIX 的！
- **Plugins**：与 Apache APISIX 插件相关的博客。
- **Ecosystem**：与 Apache APISIX 周边生态相关的内容。

Reviewers 将在 Review 你的 PR 时帮助你选择合适的标签。

#### 获取作者头像 URL

1. 打开你的浏览器。
2. 输入作者的 GitHub 页面的 URL，在 URL 结尾添加 `.png`，例如：

  ```text

  作者 Github URL：https://github.com/hf400159

  作者头像 URL：https://github.com/hf400159.png

  ```

3. 这时将会打开作者的头像图片，请复制该图片的 URL。
4. 复制图片 URL 到 `authors.image_url` 字段。

### 摘要

```markdown
title: "Blog's Title"
---
This is the summary.

And this is also part of the summary.

<!--truncate-->

But this is not part of the summary.
```

你可以在你的文章中使用 `<!--truncate-->` 标志来决定哪部分内容以摘要形式显示在博客列表上。

在 `<!--truncate-->` 以上的内容组成摘要。

更多信息请参考 [Docusaurus 文档](https://docusaurus.io/docs/blog#blog-list)。

#### 描述和摘要的区别

描述和摘要的内容可能是一样的，那为什么我们要在两个字段上重复使用它们呢？

描述主要目的是为了提高 SEO，并且主要由计算机阅读，而摘要则是让读者了解这篇博客的内容。

## 保持文章更新

你也可以通过修改或者更新现有的博客文章为 Apache APISIX 社区做出贡献。

1. 首先你需要找到对应的博客文件。

  :::note 注意

  中文博客存放在 `/apisix-website/blog/zh/blog` 目录下，而英文博客则存放在 `/apisix-website/blog/en/blog` 目录下。

  :::

2. 当你找到博客文件后，就可以修改对应的内容了。
3. 提交一个带有更新信息的 [PR](/docs/general/contributor-guide#创建一个-pr)。
