---
id: blog
title: Contribute a blog post
keywords:
- API gateway
- APISIX
- Apache APISIX
- blog
- how to write a blog 
description: This article contains guidelines for contributors who want to write/update blogs posts on the Apache APISIX website.
---

Please follow this guide while writing/updating [blog posts](/blog/) on the Apache APISIX website.

Please [submit an issue](/docs/general/submit-issue) if you find any issues in the published blog posts. Also feel free to [open a pull request](/docs/general/contributor-guide/#open-a-pull-request) to fix the issue yourself.

The blogs are written in both [English](/blog/) and [Chinese](/zh/blog/). Contributors are encouraged to write blogs in their preferred language. Translations can be handled later and you can review the pull request.

English blogs are located in the `/apisix-website/blog/en/blog`  directory, in which they are categorized by year, month and date.

For example, `/apisix-website/blog/en/blog/2022/03/01/apisix-integration-public-api-plugin.md` means that a blog named `develop-apisix-ingress-with-nocalhost-in-kubernetes.md` was published on November 22nd, 2021, and it is located in the `/apisix-website/blog/en/blog/2021/11/22` directory. Once it is reviewed and megered, the URL should be: `https://apisix.apache.org/blog/2022/03/01/apisix-integration-public-api-plugin/`.

Similarly, Chinese blogs are located in `/apisix-website/blog/zh/blog` directory and follow the same patterns described above.

## Areas to contribute

You are encouraged to write blogs posts about how you use Apache APISIX or how you are contributing to Apache APISIX.

You can also update the existing blogs by updating the content or fixing issues like broken links and typos.

### Writing a new blog

Writing a new blog post is one of the best ways to contribute to Apache APISIX. Users and contributors of the project will be able to learn from your experience through your content.

1. To create a post, first find the right place to store it.
    1. If you are submitting a blog written in **English**, create a markdown file under the `/apisix-website/blog/en/blog` directory.
    2. If you are submitting a blog written in **Chinese**, create a markdown file under the `/apisix-website/blog/zh/blog` directory.
    3. If you don't find a directory that matches the year, month or date, you can create one yourself to store your post.

2. Once you find a place to store your post, you can create a markdown file in the directory. Note that the file name should be in English with no capitalized letters. Reviewers might suggest changing the file name to improve SEO (some of the file names contain capital letters and this is being fixed in [#713](https://github.com/apache/apisix-website/issues/713)).

3. You can add text, images, diagrams and charts to your post by adding them to the markdown file. You can learn more about formatting in markdown from [The Markdown Guide](https://www.markdownguide.org/).
    - To add images to your post, first upload the images to this [public image CDN service](https://markdown.apiseven.com) and copy the links to the markdown file.
    <!-- This link seems to be broken -->
    - Charts and diagrams are always cool and we are happy to see them! From experience, charts with 4 columns or less fit perfectly to any screen.

4. [Open a pull request](/docs/general/contributor-guide/#open-a-pull-request) with your new blog post.

  :::note

  You can inspect your changes locally by building the website. This can ensure that there aren't any typos or issues left behind before you make a PR. We run CI checks to catch these errors but it is a recommended practice to test it locally.

  :::

<!-- Future: Move this to the contributing guide -->
You can check your changes by building the web environment locally. This ensures no typos or lingering issues before you submit a PR. Although the Apache APISIX Website will run CI to check and report these errors, it is recommended to test in the local environment first. For the specific construction process, please refer to [Building a Webpage Environment](https://github.com/apache/apisix-website/blob/master/README.md).

#### Configuring blog headers

Each of the blog posts have a YAML front matter or a header before the content. These are enclosed within the two `---` in the markdown file.

The header section contains fields such as `title`, `description`, `authors`, and `tags`. A description of these fields and templates to copy are described below.

##### Single author template

You can use template if your post only has a single author.

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

##### Co-author template

Translating and editing articles consume time and effort and deserves credit. For this, you can use the co-author template to add multiple authors to the blog post.

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

Each of these fields are described in detail below.

##### authors

This is a required field to be used when the blog is co-authored by two or more people to give credit to both the authors. `authors` field is composed of the following fields.

- `authors.name`: authors' names in plain text, for example: `name: "John Doe"`.
- `authors.title`: author's title in plain text, for example: `title: "Technical Writer"`.
- `authors.url`: authors' GitHub page, for example: `url: "https://github.com/yzeng25"`.
- `authors.image_url`: author's GitHub avatar, for example: `authors.image_url: "https://avatars.githubusercontent.com/u/36651058?v=4"`.

##### keywords

This is a required field used to enhance SEO performance.

Usually the first three keywords are "APISIX", "Apache APISIX" and "API Gateway", and the last two are specific to the blog post.

##### description

This is also a required field used to enhance SEO performance.

A brief summary of the blog post would be a good description. A good rule of thumb is to keep the number of characters in the description between 150 and 160. You can calculate with [Character Statistics Software](https://charactercalculator.com/).

##### tags

This is a required filed used to categorize the blog post.

Each post can have multiple tags. The tags used currently are given below and each post usually fits into one or more of these tags.

Each post can have more than one tag. The available tags and explanations are as follows. If none of the tags below fits, please leave a comment in your pull request, and we will handle it together. Please note that these tags and rules of applying tags could change over time.

- **Community**: Content related to community, community activities, and version release tags, such as: "How to contribute to the community in a form other than code?", live broadcast preview, event preview, meeting content and project meeting content.
- **Security**: Security Vulnerability Notifications and Methods to Address Security Vulnerabilities. There are currently [six articles](/blog/tags/security/), and they all have the same title as CVE-xxxxxxx.
- **Case Studies**: Blog about using Apache APISIX in the enterprise, let us know how you are using Apache APISIX!
- **Plugins**: Blog related to Apache APISIX plugins.
- **Ecosystem**: Content related to the surrounding ecology of Apache APISIX.

Reviewers will help you find the right tags while reviewing your PR.

##### Obtaining authors.image_url

1. Open your browser.
2. Enter the URL of the author's GitHub page, adding `.png` to the end of the URL, for example:

  ```text

  Author Github URL: https://github.com/yzeng25

  Author Avatar URL: https://github.com/yzeng25.png
  
  ```

3. This will open the author's avatar image and you can copy the url to the image.
4. Paste this image url to the `authors.image_url` field.

#### Truncate and summary

```markdown
title: "Blog's Title"
---
This is the summary.

And this is also part of the summary.

<!--truncate-->

But this is not part of the summary.
```

You can use the `<!--truncate-->` marker in your posts to decide what will be shown as the post summary in the list of posts page.

Anything above `<!--truncate-->` will be part of this summary.

You can learn more from the [Docusaurus docs](https://docusaurus.io/docs/blog#blog-list).

##### Difference between Description and Summary

Summary and description could essentially be the same. Then why do we repeat them on two fields?

Well, the description's primary purpose is for SEO enhancement and is mainly read by computers where as the summary gives human readers an idea about the content of the blog post.

### Fixing typos, formatting and keeping up-to-date

You can also make impactful contributions by fixing/updating the existing blog posts.

1. To start, locate the file for the blog post. Note that English blogs are located in the `website/blog` directory and the Chinese blogs are located in `website/i18n/zh/docusaurus-plugin-content-blog` directory.
2. Once you locate the file, make the necessary changes.
3. [Open a pull request](/docs/general/contributor-guide/#open-a-pull-request) with the updated blog post.
