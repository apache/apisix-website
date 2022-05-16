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

如需在 Apache APISIX 网站上进行撰写或更新[博客](/blog/)，请遵循本篇指南。

如果你对已经发布的博客内容存有疑问，欢迎提交 [issue](/docs/general/submit-issue) 进行反馈。如果你有意愿，也可自己创建一个 [PR](/docs/general/contributor-guide/#open-a-pull-request) 对该问题进行修复。

当前博客支持[中文](/zh/blog/)和[英文](/blog/)两种语言，你可以根据自己的熟悉的语言提交博客。目前中文和英文博客需要同时提交，否则在官网会出现未知错误，但是你不必担心，社区贡献者会在你提交博客之后翻译文章，届时你可以 Review 相应 PR。

你可以在 `website/blog` 目录下根据年/月/日创建一个目录，并提交英文博客。

例如：`website/blog/2022/03/01/apisix-integration-public-api-plugin.md` 该目录释义如下：

- `apisix-integration-public-api-plugin.md` 博客是在2022年03月01号发表，
- `website/blog/2022/03/01` 是该博客所在的目录。
- `https://apisix.apache.org/blog/2022/03/01/apisix-integration-public-api-plugin` 是该博客 PR 合并后的 URL。

类似的，中文博客在 `website/zh/blog` 目录下，根据上述一样的方式分类。

## 可以贡献的领域

你可以撰写博客介绍你是如何使用 Apache APISIX 的或者是如何为 Apache APISIX 做贡献。

你也可以更新已经发布的博客，包括不限于更新博客内容，修复 issues 中提到的链接损坏或是拼写错误。

### 撰写一份新博客

撰写一份新博客是为 Apache APISIX 做贡献的最好方式之一。Apache APISIX 项目的使用者和贡献者都能从你的博客中学习经验。

1. 首先要找到一个正确的地方存放新的博客。
    1. 如果你用**英文**撰写博客，请在 `website/blog` 目录下新建一个 Markdown 文件。
    2. 如果你用**中文**撰写博客，请在 `website/i18n/zh/docusaurus-plugin-content-blog` 目录下新建一个 Markdown 文件。
    3. 如果你未能找到一个合适的目录匹配年月日，你可以新建一个文件夹来存放博客。

2. 当你找到了一个存放你的博客的地方，你就可以在这个目录中创建一个 Markdown 文件。请注意，文件名使用英文，并且避免大写字母。Reviewers 可能会建议你改变文件名以提升 SEO（有些文件名含有大写字母，这一点正在 [#713](https://github.com/apache/apisix-website/issues/713) 中被修复）。

3. 你可以通过编辑 Markdown 文件把文字、图片、图表添加到你的博客中。你可以从 [Markdown 指南](https://www.markdownguide.org/)了解更多关于 Markdown 格式的信息。
    - 添加图片前请先将图片上传到[公共图片 CDN 服务](https://Markdown.apiseven.com)然后在 Markdown 文件中添加图片链接。
    <!-- This link seems to be broken -->
    - 图表总是蕴涵了大量信息，我们很乐意看到他们。从经验来看小于等于4列的图表在网页上显得更加美观。

4. 根据你新建的博客[创建一个 PR](/docs/general/contributor-guide/#open-a-pull-request)。

:::note

你可以通过在本地搭建网页检查你的修改。这可以确保在你提交 PR 之前没有任何错别字或遗留问题。我们会运行 CI 来检查捕捉这些错误，但更推荐在本地测试先做测试。

:::

<!-- Future: Move this to the contributing guide -->
运行以下命令可以在本地搭建网页：

```shell
cd website
yarn start
```

#### 配置博客元信息

每一个博客源文件都包含一个 YAML 前言或标题，它们被两行 `---` 分隔开。

元信息中包含了类似`标题`，`描述`，`作者`和`标签`的字段。一些可以参考的模板如下：

##### 单作者模板

如果你的博客只有一个作者可以使用以下模板：

```Markdown
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

##### 共同作者模板

翻译和编辑文章付出的时间和精力都是值得称赞的。为此，你可以使用共同作者模板来给博客添加多个作者。

```Markdown
title: "Blog's Title"
authors:
  - name: "Author's Name"
    title: "Author's title"
    url: "Author's GitHub"
    image_url: "Author's Image URL"
  - name: "Translator/Technical Writer's name"
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

##### 作者

这是一个必填字段，当博客是由多人共同撰写时，必须使用这个字段以便表彰作者。 `authors` 字段由以下几部分构成：

- `authors.name`: authors' names in plain text, for example: `name: "John Doe"`.
- `authors.title`: author's title in plain text, for example: `title: "Technical Writer"`.
- `authors.url`: authors' GitHub page, for example: `url: "https://github.com/yzeng25"`.
- `authors.image_url`: author's GitHub avatar, for example: `authors.image_url: "https://avatars.githubusercontent.com/u/36651058?v=4"`.

##### 关键字

这是一个提高 SEO 性能的必要字段。

通常前三个关键字是 "APISIX", "Apache APISIX" 和 "API Gateway", 后两个关键字和博客主题相关。

##### 描述

这也是一个提高 SEO 性能的必要字段。

一个对博客简短的概述就是一个好描述。一个经验法则是控制描述的字符在 150 到 170 之间。

##### 标签

这是一个用于分类的必要字段。

每篇博客可以有多个标签。下面列举了一些常用的标签和相应解释，一篇博客通常会涵盖其中部分标签。如果这其中都找不到适合的，请在提交 PR 时留下评论，我们将一起处理。请注意，这些标签和应用标签的规则可能会随着时间而改变。

- **Community**: 和社区有关的内容，比如说："如何以代码之外形式给社区做贡献?"。
- **Events**: 和活动有关的内容，比如说：直播流、活动预告、会议和项目会议。
- **Interview**: 例如，杨力博士访谈，《编程之夏》访谈。
- **Practical Case**: 包括要遵循的最佳实践。这很容易与 **Technology** 相混淆。文章的内容决定了该文章属于哪个标签。例如，"在xxx平台上运行 Apache APISIX" 属于实践案例标签，而 "Apache APISIX 与Envoy" 则属于技术标签。
- **Release**: 发布说明的标签。请注意，博客文章中的发布说明是经过打磨的，而内联的发布说明是由开发人员编写的。
- **Security**: 安全漏洞通知和解决安全漏洞的方法。目前有[五篇文章](/blog/tags/security/), 他们都同样有形如 CVE-xxxxxxx 的标题。
- **Technology**: 技术文章。需要和 **Practical Case** 区别开（见上）。
- **User Case**: 关于使用 Apache APISIX 的博客，让我们知道你是如何使用 Apache APISIX 的!

Reviewers 将在 review 你的 PR 时帮助选择合适的标签。

##### 获取作者头像 url

1. 打开你的浏览器。
2. 输入作者的GitHub页面的 url，后面加一个 .png(https://github.com/author-username.png)。
3. 这将打开作者的头像图片，你可以复制该图片的 url。
4. 复制图片 url 到 `authors.image_url` 字段。

![获取作者头像 url](https://user-images.githubusercontent.com/49474499/155665803-198d1be0-2878-4c46-9ce1-7e39697eebe8.gif)

#### 截断和摘要

```Markdown
title: "Blog's Title"
---
This is the summary.

And this is also part of the summary.

<!--truncate-->

But this is not part of the summary.
```

你可以在你的文章中使用 `<!--truncate-->` 标志来决定哪部分内容以摘要形式显示在博客列表上。

在 `<!--truncate-->` 以上的内容组成摘要。

更多信息可以参考 [Docusaurus 文档](https://docusaurus.io/docs/blog#blog-list)。

##### 描述和摘要的区别

描述和摘要本质上可能是一样的。那为什么我们要在两个字段上重复它们呢？

重复的原因是：描述主要目的是为了提高SEO，并且主要由计算机阅读，而摘要则是让人类读者了解博客的内容。

### 修正错别字、格式化并保持更新

你也可以通过修改/更新现有的博客文章做出有影响力的贡献。

1. 可以从定位博客文件的位置开始。 注意英文博客存放在 `website/blog` 目录下，而中文博客在 `website/i18n/zh/docusaurus-plugin-content-blog` 目录下。
2. 当你找到文件后，就可以开始修改。
3. 提交一个附有更新信息的 [PR](/docs/general/contributor-guide/#open-a-pull-request)。
