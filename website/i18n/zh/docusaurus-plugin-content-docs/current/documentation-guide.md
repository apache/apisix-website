---
id: documentation-style-guide
title: 中文文档写作指南
keywords:
  - API 网关
  - APISIX
  - Apache APISIX
  - 中文文档写作指南
description: Apache APISIX 中文文档的贡献指南，适用于 APISIX 中文文档的贡献者。
---

本文档是 Apache APISIX 中文文档的贡献指南，适用于为 APISIX 贡献中文文档的开发者，贡献者应遵循此文档以确保文档一致性。

要了解关于贡献的更多信息，请参考[代码贡献流程](/docs/general/contributor-guide)。

## 语气、内容和受众

- 以友好和尊重语气为目标，尽量避免强硬的词汇。例如：“你必须”，“你一定要”。该类词汇可换成：“你需要”或着直接用“用户需要”等统称。
- 确定文档的受众以及文档的目的，为你和你的目标受众找到共同点，然后进行写作。
- 避免口语化描述，不使用冷僻、生造的词汇、不使用行业黑话或互联网词汇。例如：打满。
- 不使用具有歧义的词汇。例如：“小白”，可更换为“初学者”。
- 文档中第一次出现英语词汇或者名词缩写时，应当给出全称及中文解释。例如：Apache APISIX 从底层架构来看，分为数据面（Data Plane，简称 DP）和控制面（Control Plane，简称 CP）。

## 语言

- 写作时请尽量使用第二人称，如果不适用第二人称可统一替换为统称——用户或使用者。
- 写作时使用主动语态，不要使用被动语态。
- 如果是英译中的文档，需要符合中文阅读习惯，并确保句子通顺，无语病。

:::note 注意

如果部分内容翻译后没有必要或者表达无意义，请根据上下文进行调整或删改。纯机翻没有意义，文档需要给予阅读者清晰明确的指引，而不是毫无意义的文字。

:::

- 涉及到运算符的句子，运算符连接的部分需要使用代码块表示。例如：我们都知道 `2+3=5`。
- 句子要求
  - 避免使用长句。不包含任何标点符号的单个句子，或者以逗号分隔的句子构件，长度尽量保持在 20 个字以内；20～29 个字的句子，可以接受；30～39 个字的句子，语义必须明确，才能接受；多于 40 个字的句子，任何情况下都不能接受。
  - 尽量使用简单句和并列句，避免使用复合句。
  - 同样一个意思，尽量使用肯定句表达，不使用否定句表达。
  - 避免使用双重否定句。
  - 在标题、正文、导航或目录中，请不要使用`&`代替`和`，`/`代替`或`。请参考[一般注意事项](https://developers.google.com/style/accessibility#general-dos-and-donts)了解更多信息。
  - 句子中需要正确使用`的`、`地`、`得`。
- 对项目特定词汇使用以下拼写：
  - 在介绍中引用项目和引用项目社区时，使用 Apache APISIX 而不是 APISIX。
  - 在文档中引用项目时，请使用 APISIX。
  - APISIX 特定的组件名称，如 Plugin、Route、Service 和 Consumer 等组件名称始终保持首字母大写。如果是表示概念则使用英文书写，如果表示一个实体（例如：创建一个路由），则使用中文名称。
  - 必要时使用正确的首字母缩略词，例如：

    | ✅              | ❌               |
    | ---------------- | ---------------- |
    | URL              | url              |
    | API              | api              |
    | APISIX Dashboard | Apisix dashboard |
    | gRPC             | GRPC/grpc        |
    | NGINX            | Nginx            |

    如不清楚某些词汇到底应该以哪种形态出现，请及时使用搜索引擎进行查询。

## 格式、标点和目录

- 关于 Markdown 使用指南，请参考 [Markdown 基本要素](https://shd101wyy.github.io/markdown-preview-enhanced/#/zh-cn/markdown-basics)
- 标题和副标题应当是有意义且简短概括的，不要出现「短句」来充当标题的现象。
- 必要时请使用 Docusaurus 提供的高级功能：
  - 当你必须根据用户的配置或环境显示多个路径时，请使用[标签](https://docusaurus.io/docs/next/markdown-features/tabs)和[同步标签选项](https://docusaurus.io/docs/next/markdown-features/tabs#syncing-tab-choices)。
  - 使用[代码块](https://docusaurus.io/docs/next/markdown-features/code-blocks)显示代码。
    - 添加正在修改的文件作为代码块的标题（例如：`./conf/config.yaml`）。在解释代码时使用行高亮提高使用者的注意力。
    - 代码是可执行的，不要在代码前加上系统自带符号，例如 `$ cd Desktop` 应修改为 `cd Desktop`。
    - 多行多条代码请分别用代码块表示。
    - 长代码需要进行格式化处理，让用户直观地看到命令全文。
    - 命令与返回结果需要使用不同的代码块进行展示。
  - 使用 [admonitions](https://docusaurus.io/docs/next/markdown-features/admonitions) 突出显示重要信息。以下是每个 admonitions 的使用场景：
    - Note（注意）：为用户提供基于其他内容的额外提示。
    - Tip（提示）：想要突出的一般信息，该信息需要用户关注的。
    - Important（重要）：用户需要关注的一般信息，该信息可能需要用户特别注意。
    - Warning（警告）：用户需要特别关注的信息，该操作可能会导致配置或者数据丢失。
    - Danger（危险）：用户应该非常小心该提示中提到的内容，仅在最严重的情况下使用，该操作会导致配置或者数据丢失。

    示例如下：

    ```shell
     ::note 注意

     为用户提供基于其他内容的额外提示。

     :::  
    ```

- 请使用表格描述恰当的内容。
  - 请尽量保证表格内容不包含空置的行和列。
  - 表格中的描述需要简洁。
- 请正确使用标点符号。在中文文档中，请使用中文标点符号。
- 空格规范
  - 中文与英文、阿拉伯数字之间需要包含一个空格。英文和阿拉伯数字在标点符号前或者标点符号后，不需要加空格。可参考如下示例：
    - APISIX 于 2019 年 10 月加入 Apache 软件基金会。
    - 如果想要使用 `jwt-auth` 插件，你需要创建一个 Route。
  - 单位与数字之前需要有空格。
    - 该连接保持 1 ms。
- 在 Markdown 文件中请使用相对路径而不是绝对路径。
- 如有多条类似内容进行描述时，请使用列表形式让描述更加清晰。
  - 有序列表：通常用来表示列表之间有前后顺序，例如操作步骤。
  - 无序列表：无序列表中，各个列表之间属于并列关系，没有先后顺序之分，列表前后需要用空行包围。对于有多项参数或者需要描述的，请使用无序列表。
- 链接
  - 链接文本需要有意义。例如“请参考 [ApacheAPISIX 官网](https://apisix.apache.org/)”，而不是“请参考[这里](https://apisix.apache.org/)”
  - 链接不能裸露。例如：“请参考 https://apisix.apache.org”。
  - 内链请使用相对路径。
  - 如果你需要修改文档内的目录，请确保没有其他文档引用它。如果其他文档引用了你需要修改的内容，请一并修改其他文档。
  - 如果你引用的内容有中文版本，请使用中文链接。
- 对于需要在代码或者文本中表示一个变量的，请使用`${变量名称}`。
- 如果一个值表示的是字符串，请使用`"1"`。如果表示的是一个数值，请使用`1`。

### 目录结构

目前，Apache APISIX 官网的文档目录如下所示。如果要创建新文档，请选择文档写作时所用语言的 `latest` 文件夹中创建一个新文件。

```text
/docs
├── assets
│   ├── images
│   │   ├── xxxxx.png
│   └── other
│       └── xxxxx.xxx
├── en
│
└── zh
|    └── latest
|        ├── doc1.md
│       └── folder
│           └── doc2.md
│               └── folder2
│                   └── doc3.md
│
```

### 配置文件

配置文件位于 `/docs/<locale>/latest/config.json` 中，其中 locale 表示区域设置代码（语言）。有关详细信息，请参考[本地语言](https://www.science.co.il/language/Locale-codes.php)。请注意，语言环境全部都是小写。

您可以从 [Docusaurus 文档](https://v2.docusaurus.io/docs/next/sidebar)中了解有关侧边栏的更多信息。

```json
{
  "version": 2.3,
  "sidebar": [
    // The left sidebar of the APISIX website
    {
      "type": "doc",
      "id": "doc2" // id is the filename of the md file
    },
    {
      "type": "category", // category is a collapsed column, nestable
      "label": "folder",
      "items": [
        {
          "type": "doc",
          "id": "folder/doc2"
        },
        {
          "type": "category",
          "label": "folder2",
          "items": [
            "folder2/doc3"
          ]
        }
      ]
    },
    {
      "type": "link",
      "label": "CHANGELOG",
      "href": "https://github.com/apache/apisix/blob/master/CHANGELOG"
    }
  ]
}
```

## 为你的文章添加图片

- 支持的图片格式包括：PNG，JPG 等。
- 请使用高分辨率的图片，使所呈现的信息对用户清晰可见。
- 目前 APISIX 官网文档中所需图片需要上传到私有 CDN，以确保更小的存储库大小和快速加载。如需在文档中添加图片，请联系项目团队以上传/更改图片。
- 在截屏时请使用默认的 APISIX 管理员帐户。
- 在添加图片时，切勿只放图片链接而不添加描述，否则会 Lint 出现报错情况。正常图片链接应为：![图片描述](图片链接）。
- 请不要使用透明背景作为图片的底色。如果使用的图片为白色背景，请确保图片底色为白色，否则图片放大后会导致文字模糊。

## 文档架构

如需在本网站【文档-Apache APISIX】下添加技术文档（插件类文档），可参考以下内容架构：

- 插件描述（使用该插件可以做什么，为什么开发了此插件等背景信息）；
- 属性（使用该插件时可以配置哪些属性）；
- 如何使用该插件，可包含以下内容：
  - 前提条件（可选）
  - 启用插件
  - 测试插件
  - 禁用插件
- 注意事项（可选）；
- 插件后续计划（可选）。
如需详细示例，请参考 [`jwt-auth`](https://apisix.apache.org/zh/docs/apisix/plugins/jwt-auth)。
