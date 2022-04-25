---
id: documentation-style-guide
title: 中文文档写作指南
keywords:
  - API gateway
  - APISIX
  - Apache APISIX
  - project documentations
description: Style guide for Apache APISIX documentation.
---

本文档是 Apache APISIX 中文文档的贡献指南，适用于 APISIX 中文文档的贡献者，贡献者应遵循此文档以确保文档一致性。

要了解关于贡献的更多信息，请参考 [Contributor Guide](../docs/general/contributor-guide.md)。

## 语气、内容和受众

- 以友好和尊重语气为目标，尽量避免强硬的词汇。例如：“你必须”，“你一定要”。该类词汇可换成：“你需要”。
- 确定文档的受众以及文档的目的，为你和你的目标受众找到共同点，然后进行写作。
- 避免口语化描述，不使用冷僻、生造的词汇、不使用行业黑话。例如：打满。
- 不使用侮辱性词汇。例如：“小白”，可更换为“初学者”。
- 文档中第一次出现英语词汇或者名词缩写时，应当给出全称及中文解释。例如：Apache APISIX 从底层架构来看，分为 Data Plane（数据面）和 Control Plane（控制面）。

## 语言

- 写作时请尽量使用第二人称，如果不适用第二人称可换成其他人称。
- 写作时使用主动语态。
- 句子要求
  - 避免使用长句。不包含任何标点符号的单个句子，或者以逗号分隔的句子构件，长度尽量保持在 20 个字以内；20～29 个字的句子，可以接受；30～39 个字的句子，语义必须明确，才能接受；多于 40 个字的句子，任何情况下都不能接受。
  - 尽量使用简单句和并列句，避免使用复合句。
  - 同样一个意思，尽量使用肯定句表达，不使用否定句表达。
  - 避免使用双重否定句。
- 请不要在标题、文本、导航或目录中使用`&`代替`和`，`/` 代替 `或`。请参考[一般注意事项](https://developers.google.com/style/accessibility#general-dos-and-donts) 了解更多信息。
- 对项目特定词汇使用以下拼写：
  - 在介绍中引用项目和引用项目社区时，使用 Apache APISIX 而不是 APISIX。
  - 当引用文档中的项目时，请使用 APISIX。
  - APISIX 特定的组件名称，如 Plugin、Route、Service 和 Consumer 等组件名称始终保持首字母大写。
  - 必要时使用正确的首字母缩略词，例如：

    | ✅              | ❌               |
    | ---------------- | ---------------- |
    | URL              | url              |
    | API              | api              |
    | APISIX Dashboard | Apisix dashboard |
    | gRPC             | GRPC/grpc        |
    | NGINX            | Nginx            |

## 格式、标点和目录

- 标题和副标题应当是有意义的，可以概括文档内容。
- 必要时请使用 Docusaurus 提供的高级功能：
  - 当你必须根据用户的配置或环境显示多个路径时，请使用[标签](https://docusaurus.io/docs/next/markdown-features/tabs)和[同步标签选项](https://docusaurus.io/docs/next/markdown-features/tabs#syncing-tab-choices)。
  - 使用[代码块](https://docusaurus.io/docs/next/markdown-features/code-blocks)显示代码。
    - 添加正在修改的文件作为代码块的标题（例如：`coonf/config.yaml`）。在解释代码时使用行高亮提高使用者的注意力。
    - 代码需要是可执行，建议不要在代码前加上系统自带符号。
    - 多行多条代码请分别用代码块表示。
    - 长代码需要进行格式化处理，让用户直观的看到命令全文。
  - 使用[admonitions](https://docusaurus.io/docs/next/markdown-features/admonitions) 突出显示重要信息。按照以下建议使用它们：
    - Tip：为用户提供基于其他内容的额外提示。一般可以忽略。
    - Note：想要突出的一般信息，该信息需要用户关注的。
    - Important：用户需要关注的一般信息，该信息可能需要用户特别注意。
    - Warning：用户需要特别关注的信息，该操作可能会导致配置或者数据丢失。
    - Danger：用户应该非常小心该提示中提到的内容，仅在最严重的情况下使用，该操作会导致配置或者数据丢失。
- 请使用表格描述恰当的内容。请参考[常见问题](/docs/apisix/FAQ#what-is-the-difference-between-plugin-metadata-and-plugin-configs-in-apache-apisix)。
  - 表格中如果尽量不包含空列和空行。
  - 表格中的描述需要简洁。
- 中文与英文、阿拉伯数字之间需要包含一个空格。英文和阿拉伯数字在标点符号前或者标点符号后，不需要加空格。
- 在 markdown 文件中请使用相对路径而不是绝对路径。
- 请使用列表使描述更加清晰。
  - 有序列表：通常用来表示列表之间有前后顺序，例如操作步骤。
  - 无序列表：无序列表中，各个列表之间属于并列关系，没有先后顺序之分，列表前后需要用空行包围。对于有多项参数或者需要描述的，请使用无序列表。
- 链接
  - 链接文本需要有意义。例如“请参考[ApacheAPISIX 官网](https://apisix.apache.org/)”，而不是 “请参考[这里](https://apisix.apache.org/)”
  - 链接不能裸露。例如：“请参考https://apisix.apache.org”。
  - 内链请使用相对路径。

### 目录结构

文档的目录如下所示。如果要创建新文档，请选择文档写作时所用语言的 `latest` 文件夹中创建一个新文件。

```text
/docs
├── assets
│   ├── images
│   │   ├── xxxxx.png
│   └── other
│       └── xxxxx.xxx
├── en
│   └── latest
│       ├── doc1.md
│       └── folder
│           └── doc2.md
│               └── folder2
│                   └── doc3.md
│
└── zh
    └── latest
        └── ...
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

## 图片和嵌入内容

- 请使用高质量的图片，使所呈现的信息对用户清晰可见。
- 图片需要当前上传到私有 CDN，以确保更小的存储库大小和快速加载。请联系项目团队以上传/更改图片。
- 在截屏时请使用默认的 APISIX 管理员帐户。
- 为图片提供有意义的文件名和替代文本。
