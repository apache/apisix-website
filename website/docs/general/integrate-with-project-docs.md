---
id: integrate-with-project-docs
title: Integrate with Project documentations
---

## Directory Structure

Put all Markdown files into the latest directory

```
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

## Configuration file

This file is located in `/docs/<locale>/latest/config.json`, where locale is locale codes, please refer to https://www.science.co.il/language/Locale-codes.php, locale is all lowercase. Don't forget to remove the comment after copying JSON.

More information about sidebar can be found at https://v2.docusaurus.io/docs/next/sidebar

```jsonc
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

## Markdown formatting restrictions

- Use relative paths within Markdown files `../xxx/xxx`, not absolute paths `/docs/en/xxx/xxx`. If you want to refer to files outside the docs directory, please use https://github.com/apache/apisix-xxx/blob/master/xxx/xxx.xxx

- You need to use Markdown syntax when introducing images, i.e. `![image name](./assets/xxxx.png)`. Images cannot be introduced using HTML tags, i.e. `<img src=". /assets/xxxx.png" />`

- If the Markdown file contains HTML tags within it, be sure to make sure the tags are closed. For example `<br>` must be written as `<br/>`
