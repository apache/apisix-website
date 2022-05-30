---
id: documentation-style-guide
title: Documentation style guide
keywords:
  - API gateway
  - APISIX
  - Apache APISIX
  - project documentations
description: Style guide for Apache APISIX documentation.
---

This document is a style guide for Apache APISIX documentation. This document is intended for contributors to APISIX's documentation and should be followed to ensure consistency.

To learn more about contributing, see [Contributing flow](contributor-guide.md).

## Tone, content and audience

- Aim for a voice and tone that's conversational, friendly, and respectful without being frivolous. Learn more on [Voice and tone](https://developers.google.com/style/tone).
- Write for accessibility. See [General do's and don'ts](https://developers.google.com/style/accessibility#general-dos-and-donts) to learn more.
- Identify the intended audience and write for them. Find the common ground for you and your target audience.

## Language

- Use second person while writing unless it isn't appropriate.
- Use active voice while writing.
- Use standard American spellings.
- Always place [conditional clauses before instructions](https://developers.google.com/style/clause-order).
- Use the following spellings for project specific entities:
  - Use Apache APISIX instead of APISIX when referencing the project in introductions and when referencing to the project community.
  - Use APISIX instead when referencing to the project inside documentation.
  - APISIX specific component names like Plugin and Route are always capitalized.
  - Use correct acronyms when necessary. Use the expanded word in first usage and proceed to use the acronym in the rest of the references. For example:

    | ✅               | ❌               |
    | ---------------- | ---------------- |
    | URL              | url              |
    | API              | api              |
    | APISIX Dashboard | Apisix dashboard |
    | gRPC             | GRPC/grpc        |

## Formatting, punctuation and organization

- Use sentence case for all headings and subheadings.
- Use advanced markdown features and admonitions provided by Docusaurus when necessary:
  - Use [tabs](https://docusaurus.io/docs/next/markdown-features/tabs) and [synced tabs](https://docusaurus.io/docs/next/markdown-features/tabs#syncing-tab-choices) when you have to show multiple paths based on a user's configuration or environment.
  - Use [code blocks](https://docusaurus.io/docs/next/markdown-features/code-blocks) to display code. Add the file being modified as the title of the codeblock (for example, `coonf/config.yaml`). Use line highlighting to focus the attention of the use while explaining code.
  - Use [admonitions](https://docusaurus.io/docs/next/markdown-features/admonitions) to highlight important information. Use them as suggested below:
    - Note: for general information you want to stand out.
    - Tip: to give users bonus tips that build on top of the rest of the content. Can be ignored generally.
    - Important: to give extra emphasis to general information.
    - Warning: to highlight possibilities of loss of configuration or data.
    - Danger: user should be very careful about what is mentioned in the block. Use only in cases of maximum severity.
- Use tables to convey appropriate information easily. See [how they are used in FAQ](/docs/apisix/FAQ#what-is-the-difference-between-plugin-metadata-and-plugin-configs-in-apache-apisix).
- Use relative paths within markdown files `../xxx/xxx` instead of absolute paths.

### Directory structure

The documents are organized as shown below. To create a new page, create a new file in the latest folder of the language you are writing the doc in.

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

### Configuration file

The configuration file is located in `/docs/<locale>/latest/config.json` where locale represents the locale code (language). Refer to [Locale Codes](https://www.science.co.il/language/Locale-codes.php) for more info. Note that locale is always all lowercase.

You can learn more about the sidebar from the [Docusaurus docs](https://v2.docusaurus.io/docs/next/sidebar).

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

## Images and embedded content

- Use images of good quality such that the information presented is clearly visible to the reader.
- The images are currently uploaded to a private CDN to ensure smaller repo size and fast loads. Please reach out to the project team to upload/change an image.
- Use the default APISIX admin account while taking screenshots.
- Provide meaningful file names and alt text for the images.
- Please do not use a transparent background as the base color of the image. If you use an image with a white background, please make sure that the background color of the image is white, otherwise the text will be blurred when the image is enlarged.
