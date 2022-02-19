---
id: integrate-with-project-docs
title: Integrating Project Documentation
keywords:
- API gateway
- APISIX
- Apache APISIX
- project documentations
description: This article explains Apache APISIX documents' directory structure, the configuration file, and markdown formatting restrictions.
---

## Directory Structure

The docs are organized as shown below. To create a new page, create a new file in the latest folder of the language you are writing the doc in.

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
│       ├── folder
│       │   └── doc2.md
│       │       └── folder2
│       │           └── doc3.md
│       └── config.json
├── es
│   └── latest
│       └── ...
└── zh
    └── latest
        └── ...
```

## Configuration File

The configuration file is located in `/docs/<locale>/latest/config.json` where locale represents the locale code (language). Refer to [Locale Codes](https://www.science.co.il/language/Locale-codes.php) for more info. Note that locale is always all lowercase.

You can learn more about the sidebar from the [Docusaurus docs](https://v2.docusaurus.io/docs/next/sidebar).

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

## Markdown Formatting Guide

Please follow this guide while working with markdown files.

- Always use relative paths within markdown files `../xxx/xxx` and not absolute paths `/docs/en/xxx/xxx`. To refer files outside the docs directory, use the format `https://github.com/apache/apisix-xxx/blob/master/xxx/xxx.xxx`

- Always use markdown syntax to include images (`![image name](./assets/xxxx.png)`). **Don't** use HTML tags as an alternative (`<img src=". /assets/xxxx.png" />`).

- Make sure to close the HTML tags if the markdown file has any. For example, a `<br>` tag must be written as `<br/>`.
