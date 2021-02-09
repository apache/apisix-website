module.exports = {
  title: "Apache APISIX™",
  tagline: "Apache APISIX is a dynamic, real-time, high-performance Cloud-Native API gateway, based on the Nginx library and etcd.",
  url: "https://apisix.apache.org/",
  baseUrl: "/",
  organizationName: "Apache",
  projectName: "apisix-website",
  scripts: ["https://buttons.github.io/buttons.js"],
  favicon: "img/favicon.png",
  customFields: {
    tagline2:
      "Apache APISIX software provides rich traffic management features such as load balancing, dynamic upstream, canary release, circuit breaking, authentication, observability, and more.",
    users: [
      {
        caption: "360",
        image: "https://static.apiseven.com/2020/05/WechatIMG618.png",
        infoLink: "https://www.360.com",
        pinned: true,
      },
      {
        caption: "HelloTalk",
        image: "https://static.apiseven.com/2020/05/HelloTalk.png",
        infoLink: "https://www.hellotalk.com/?lang=en",
        pinned: true,
      },
      {
        caption: "网易",
        image:
          "https://static.apiseven.com/2020/05/1588907762-WechatIMG2916.png",
        infoLink: "https://www.163.com",
        pinned: true,
      },
      {
        caption: "腾讯云",
        image:
          "https://static.apiseven.com/2020/05/%E8%85%BE%E8%AE%AF%E4%BA%91-1536x546.jpg",
        infoLink: "https://qcloud.com",
        pinned: true,
      },
      {
        caption: "中国航信",
        image:
          "https://static.apiseven.com/2020/05/%E4%B8%AD%E5%9B%BD%E8%88%AA%E4%BF%A1.png",
        infoLink: "http://www.infosky.com.cn/publish/main/index.html",
        pinned: true,
      },
    ],
    repoUrl: "https://github.com/apache/apisix",
    docsUrl: "",
  },
  onBrokenLinks: "log",
  onBrokenMarkdownLinks: "log",
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          path: "docs",
          routeBasePath: "/",
          editUrl:
            "https://github.com/apache/apisix-website/edit/master/website",
          sidebarPath: "../website/sidebars.json",
        },
        blog: {
          path: "blog",
        },
        theme: {
          customCss: "../src/css/customTheme.css",
        },
      },
    ],
  ],
  plugins: [],
  themeConfig: {
    navbar: {
      // title: "Apache APISIX™",
      logo: {
        src: "img/logo.png",
      },
      items: [
        {
          to: "/docs",
          label: "Docs",
          position: "left",
        },
        {
          to: "/blog",
          label: "Blog",
          position: "left",
        },
        {
          to: "/downloads",
          label: "Downloads",
          position: "left",
        },
        {
          to: "/team",
          label: "Team",
          position: "left",
        },
        {
          to: "/help",
          label: "Help",
          position: "left",
        },
      ],
    },

    footer: {
      links: [
        {
          title: "ASF",
          items: [
            {
              label: "Foundation",
              to: "https://www.apache.org/",
            },
            {
              label: "License",
              to: "https://www.apache.org/licenses/",
            },
            {
              label: "Events",
              to: "https://www.apache.org/events/",
            },
            {
              label: "Security",
              to: "https://www.apache.org/security/",
            },
            {
              label: "Sponsorship",
              to: "https://www.apache.org/foundation/sponsorship.html",
            },
            {
              label: "Thanks",
              to: "https://www.apache.org/foundation/thanks.html",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "GitHub Issue Tracker",
              to: "https://github.com/apache/apisix/issues",
            },
            {
              label: "Slack",
              to: "https://apisix.slack.com/",
            },
            {
              label: "Twitter",
              to: "https://twitter.com/ApacheAPISIX",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "User Showcase",
              to: "https://apisix.apache.org/users/",
            },
            {
              label: "Blog",
              to: "https://apisix.apache.org/blog/",
            },
          ],
        },
      ],
      logo: {
        alt: "Apache Software Foundation",
        src: "img/asf_logo_wide_small.png",
        href: "https://www.apache.org/",
      },

      copyright:
        "Copyright © 2019-2021 The Apache Software Foundation. Apache APISIX, APISIX™, Apache, the Apache feather logo, and the Apache APISIX project logo are either registered trademarks or trademarks of the Apache Software Foundation.",
    },
    algolia: {
      apiKey: "79e72fedcf3719ba85c552f710ade8a3",
      appId: "ZHVP417Y1Y",
      indexName: "apache-apisix-website",
    },
  },
  stylesheets: [
    "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap",
  ],
};
