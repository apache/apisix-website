module.exports = {
  title: "Apache APISIX™",
  tagline:
    "Apache APISIX is a dynamic, real-time, high-performance Cloud-Native API gateway, based on the Nginx library and etcd.",
  url: "https://apisix.apache.org/",
  baseUrl: "/",
  organizationName: "Apache",
  projectName: "apisix-website",
  favicon: "img/favicon.png",
  customFields: {
    tagline2:
      "Apache APISIX software provides rich traffic management features such as load balancing, dynamic upstream, canary release, circuit breaking, authentication, observability, and more.",
    showcases: require("./static/data/showcases.json"),
    events: require("./static/data/events.json"),
    repoUrl: "https://github.com/apache/apisix",
    docsUrl: "",
    downloads: [
      {
        name: "APISIX™",
        nameInParamCase: "apisix",
        description: "A dynamic, real-time, high-performance API gateway.",
        shape: "triangle",
        color: "var(--ifm-color-primary)",
        githubRepo: "apache/apisix",
        version: "2.3",
        releaseDate: "2021-02-09",
      },
      {
        name: "APISIX™ Dashboard",
        nameInParamCase: "dashboard",
        description:
          "Designed to make it as easy as possible for users to operate Apache APISIX through a frontend interface.",
        shape: "square",
        color: "#10B981",
        githubRepo: "apache/apisix-dashboard",
        version: "2.4",
        releaseDate: "2021-02-12",
      },
      {
        name: "APISIX™ Ingress Controller",
        nameInParamCase: "ingress-controller",
        description: "An Apache APISIX control plane component.",
        shape: "hexagon",
        color: "#2563EB",
        githubRepo: "apache/apisix-ingress-controller",
        version: "0.3.0",
        releaseDate: "2021-02-11",
      },
    ],
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
  plugins: [
    [
      "@docusaurus/plugin-content-blog",
      {
        id: "events",
        routeBasePath: "events",
        path: "events",
      },
    ],
  ],
  themeConfig: {
    navbar: {
      title: "Apache APISIX™",
      logo: {
        src: "img/logo.png",
      },
      items: [
        {
          to: "/subscribe-guide",
          label: "Docs",
          position: "right",
        },
        {
          to: "/blog",
          label: "Blog",
          position: "right",
        },
        {
          to: "/events",
          label: "Events",
          position: "right",
        },
        {
          to: "/downloads",
          label: "Downloads",
          position: "right",
        },
        {
          to: "/team",
          label: "Team",
          position: "right",
        },
        {
          to: "/help",
          label: "Help",
          position: "right",
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
      apiKey: "ad95c83c2872f173de8bcc4a0351c5c2",
      indexName: "apache-apisix-website",
    },
    colorMode: {
      disableSwitch: true,
    },
    metadatas: [
      {
        name: "description",
        content:
          "Apache APISIX is a dynamic, real-time, high-performance Cloud-Native API gateway, based on the Nginx library and etcd.",
      },
    ],
  },
  stylesheets: [
    "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap",
  ],
};
