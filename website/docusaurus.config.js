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
        version: "2.5",
        releaseDate: "2021-04-05",
        firstDocPath: "/getting-started",
      },
      {
        name: "APISIX™ Dashboard",
        nameInParamCase: "dashboard",
        description:
          "Designed to make it as easy as possible for users to operate Apache APISIX through a frontend interface.",
        shape: "square",
        color: "#10B981",
        githubRepo: "apache/apisix-dashboard",
        version: "2.6",
        releaseDate: "2021-04-22",
        firstDocPath: "/USER_GUIDE",
      },
      {
        name: "APISIX™ Ingress Controller",
        nameInParamCase: "ingress-controller",
        description: "An Apache APISIX control plane component.",
        shape: "hexagon",
        color: "#2563EB",
        githubRepo: "apache/apisix-ingress-controller",
        version: "0.5.0",
        releaseDate: "2021-04-11",
        firstDocPath: "/getting-started",
      }
    ],

    team: require("./static/data/team.json"),
    allRepos: [
      "apache/apisix",
      "apache/apisix-dashboard",
      "apache/apisix-website",
      "apache/apisix-docker",
      "apache/apisix-ingress-controller",
      "apache/apisix-helm-chart",
      "apache/apisix-control-plane",
    ],
  },
  i18n: {
    defaultLocale: "en",
    locales: ["en", "zh"],
    localeConfigs: {
      en: {
        label: "English",
      },
      zh: {
        label: "简体中文",
      },
    },
  },
  onBrokenLinks: "log",
  onBrokenMarkdownLinks: "log",
  noIndex: true,
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          path: "docs/general",
          routeBasePath: "/docs/general",
          sidebarPath: require.resolve("./docs/general/sidebars.json"),
          editUrl: function ({
            locale,
            version,
            versionDocsDirPath,
            docPath,
            permalink,
          }) {
            return `https://github.com/apache/apisix-website/edit/master/website/docs/general/${docPath}`;
          },
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
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "docs-apisix",
        path: "docs/apisix",
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
        routeBasePath: "/docs/apisix",
        sidebarPath: require.resolve("./docs/apisix/sidebars.json"),
        editUrl: function ({
          locale,
          version,
          versionDocsDirPath,
          docPath,
          permalink,
        }) {
          return `https://github.com/apache/apisix/edit/master/docs/${locale}/latest/${docPath}`;
        },
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "docs-apisix-dashboard",
        path: "docs/apisix-dashboard",
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
        routeBasePath: "/docs/dashboard",
        sidebarPath: require.resolve("./docs/apisix-dashboard/sidebars.json"),
        editUrl: function ({
          locale,
          version,
          versionDocsDirPath,
          docPath,
          permalink,
        }) {
          return `https://github.com/apache/apisix-dashboard/edit/master/docs/en/latest/${docPath}`;
        },
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "docs-apisix-ingress-controller",
        path: "docs/apisix-ingress-controller",
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
        routeBasePath: "/docs/ingress-controller",
        sidebarPath: require.resolve(
          "./docs/apisix-ingress-controller/sidebars.json"
        ),
        editUrl: function ({
          locale,
          version,
          versionDocsDirPath,
          docPath,
          permalink,
        }) {
          return `https://github.com/apache/apisix-ingress-controller/edit/master/docs/en/latest/${docPath}`;
        },
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "docs-apisix-helm-chart",
        path: "docs/apisix-helm-chart",
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
        routeBasePath: "/docs/helm-chart",
        sidebarPath: require.resolve("./docs/apisix-helm-chart/sidebars.json"),
        editUrl: function ({
          locale,
          version,
          versionDocsDirPath,
          docPath,
          permalink,
        }) {
          return `https://github.com/apache/apisix-helm-chart/edit/master/docs/en/latest/${docPath}`;
        },
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "docs-apisix-docker",
        path: "docs/apisix-docker",
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
        routeBasePath: "/docs/docker",
        sidebarPath: require.resolve("./docs/apisix-docker/sidebars.json"),
        editUrl: function ({
          locale,
          version,
          versionDocsDirPath,
          docPath,
          permalink,
        }) {
          return `https://github.com/apache/apisix-docker/edit/master/docs/en/latest/${docPath}`;
        },
      },
    ],
  ],
  themeConfig: {
    navbar: {
      hideOnScroll: true,
      title: "Apache APISIX™",
      logo: {
        src: "img/logo2.svg",
      },
      items: [
        {
          label: "Docs",
          position: "right",
          to: "/docs",
          items: [
            {
              label: "APISIX™️",
              to: "/docs/apisix/getting-started",
            },
            {
              label: "APISIX™️ Dashboard",
              to: "/docs/dashboard/USER_GUIDE",
            },
            {
              label: "APISIX™️ Ingress Controller",
              to: "/docs/ingress-controller/getting-started/",
            },
            {
              label: "Apache™️ APISIX Helm Charts",
              to: "/docs/helm-chart/apisix/",
            },
            {
              label: "Apache™️ APISIX Docker",
              to: "/docs/docker/build/",
            },
            {
              label: "General",
              to: "/docs/general/security",
            },
          ],
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
        {
          type: "localeDropdown",
          position: "right",
        },
      ],
    },
    hideableSidebar: true,
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
      apiKey: "287206c9872faf0e77b7c5228d4c3789",
      indexName: "apache_apisix",
      contextualSearch: true,
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    metadatas: [
      {
        name: "description",
        content:
          "Apache APISIX is a dynamic, real-time, high-performance Cloud-Native API gateway, based on the Nginx library and etcd.",
      },
    ],
    gtag: {
      trackingID: "G-WQLBQL6GY3",
    },
  },
  stylesheets: [
    "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap",
  ],
};
