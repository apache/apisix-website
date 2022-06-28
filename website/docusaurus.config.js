const { ssrTemplate } = require('./config/ssrTemplate');

const getEditUrl = ({
  projectName,
  version,
  locale,
  docPath,
  defaultBranch = 'master',
}) => (version === 'current' ? `https://github.com/apache/${projectName}/edit/${defaultBranch}/docs/${locale}/latest/${docPath}` : null);

module.exports = {
  title: 'Apache APISIX® -- Cloud-Native API Gateway',
  tagline:
    'Apache APISIX is a dynamic, real-time, high-performance Cloud-Native API gateway, based on the Nginx library and etcd.',
  url: 'https://apisix.apache.org',
  baseUrl: '/',
  organizationName: 'Apache',
  projectName: 'apisix-website',
  favicon: 'https://static.apiseven.com/202202/favicon.png',
  customFields: {
    tagline2:
      'Apache APISIX provides rich traffic management features such as load balancing, dynamic upstream, canary release, circuit breaking, authentication, observability, and more.',
    showcases: require('./static/data/showcases.json'),
    events: require('./static/data/events.json'),
    eventPosterCard: require('./static/data/event-poster-card.json'),
    repoUrl: 'https://github.com/apache/apisix',
    docsUrl: '',
    docs: require('./config/docs.js'),
    downloads: require('./config/downloads.js'),
    team: require('./config/team.js'),
    plugins: require('./static/data/plugins.json'),

    allRepos: [
      'apache/apisix',
      'apache/apisix-dashboard',
      'apache/apisix-website',
      'apache/apisix-docker',
      'apache/apisix-ingress-controller',
      'apache/apisix-helm-chart',
      'apache/apisix-control-plane',
      'apache/apisix-java-plugin-runner',
      'apache/apisix-go-plugin-runner',
      'apache/apisix-python-plugin-runner',
    ],
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh'],
    localeConfigs: {
      en: {
        label: 'English',
      },
      zh: {
        label: '简体中文',
      },
    },
  },
  onBrokenLinks: 'log',
  onBrokenMarkdownLinks: 'log',
  noIndex: false,
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          path: 'docs/general',
          routeBasePath: '/docs/general',
          sidebarPath: require.resolve('./docs/general/sidebars.json'),
          editUrl({
            docPath,
          }) {
            return `https://github.com/apache/apisix-website/edit/master/website/docs/general/${docPath}`;
          },
        },
        blog: {
          path: 'blog',
          blogSidebarTitle: 'All posts',
          blogSidebarCount: 'ALL',
        },
        theme: {
          customCss: '../src/css/customTheme.css',
        },
        sitemap: {
          changefreq: 'daily',
          priority: 0.5,
        },
        pages: {
          exclude: ['**/downloads/ProjectCard.js'],
        },
      },
    ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'events',
        routeBasePath: 'events',
        path: 'events',
      },
    ],
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'articles',
        routeBasePath: 'articles',
        path: 'articles',
        blogSidebarCount: 0,
        blogTitle: 'Article',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'docs-apisix',
        path: 'docs/apisix',
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
        routeBasePath: '/docs/apisix',
        sidebarPath: require.resolve('./docs/apisix/sidebars.json'),
        editUrl({
          docPath,
          version,
          locale,
        }) {
          return getEditUrl({
            projectName: 'apisix',
            locale,
            docPath,
            version,
          });
        },
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'docs-apisix-dashboard',
        path: 'docs/apisix-dashboard',
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
        routeBasePath: '/docs/dashboard',
        sidebarPath: require.resolve('./docs/apisix-dashboard/sidebars.json'),
        editUrl({
          docPath,
          version,
          locale,
        }) {
          return getEditUrl({
            projectName: 'apisix-dashboard',
            locale,
            docPath,
            version,
          });
        },
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'docs-apisix-ingress-controller',
        path: 'docs/apisix-ingress-controller',
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
        routeBasePath: '/docs/ingress-controller',
        sidebarPath: require.resolve(
          './docs/apisix-ingress-controller/sidebars.json',
        ),
        editUrl({
          docPath,
          version,
          locale,
        }) {
          return getEditUrl({
            projectName: 'apisix-ingress-controller',
            locale,
            docPath,
            version,
          });
        },
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'docs-apisix-helm-chart',
        path: 'docs/apisix-helm-chart',
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
        routeBasePath: '/docs/helm-chart',
        sidebarPath: require.resolve('./docs/apisix-helm-chart/sidebars.json'),
        editUrl({
          docPath,
          version,
          locale,
        }) {
          return getEditUrl({
            projectName: 'apisix-helm-chart',
            locale,
            docPath,
            version,
          });
        },
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'docs-apisix-docker',
        path: 'docs/apisix-docker',
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
        routeBasePath: '/docs/docker',
        sidebarPath: require.resolve('./docs/apisix-docker/sidebars.json'),
        editUrl({
          docPath,
          version,
          locale,
        }) {
          return getEditUrl({
            projectName: 'apisix-docker',
            locale,
            docPath,
            version,
          });
        },
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'docs-apisix-java-plugin-runner',
        path: 'docs/apisix-java-plugin-runner',
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
        routeBasePath: '/docs/java-plugin-runner',
        sidebarPath: require.resolve('./docs/apisix-java-plugin-runner/sidebars.json'),
        editUrl({
          docPath,
          version,
          locale,
        }) {
          return getEditUrl({
            projectName: 'apisix-java-plugin-runner',
            locale,
            docPath,
            version,
            defaultBranch: 'main',
          });
        },
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'docs-apisix-go-plugin-runner',
        path: 'docs/apisix-go-plugin-runner',
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
        routeBasePath: '/docs/go-plugin-runner',
        sidebarPath: require.resolve('./docs/apisix-go-plugin-runner/sidebars.json'),
        editUrl({
          docPath,
          version,
          locale,
        }) {
          return getEditUrl({
            projectName: 'apisix-go-plugin-runner',
            locale,
            docPath,
            version,
          });
        },
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'docs-apisix-python-plugin-runner',
        path: 'docs/apisix-python-plugin-runner',
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
        routeBasePath: '/docs/python-plugin-runner',
        sidebarPath: require.resolve('./docs/apisix-python-plugin-runner/sidebars.json'),
        editUrl({
          docPath,
          version,
          locale,
        }) {
          return getEditUrl({
            projectName: 'apisix-python-plugin-runner',
            locale,
            docPath,
            version,
          });
        },
      },
    ],
    ['docusaurus-plugin-sass', {}],
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            from: ['/docs/general/community', '/docs/general/subscribe-guide'],
            to: '/docs/general/join',
          },
        ],
      },
    ],
  ],
  themeConfig: {
    navbar: {
      hideOnScroll: true,
      title: 'Apache APISIX®',
      logo: {
        src: 'img/logo2.svg',
      },
      items: require('./config/navbar.js'),
    },
    hideableSidebar: true,
    footer: {
      links: [
        {
          title: 'ASF',
          items: [
            {
              label: 'Foundation',
              to: 'https://www.apache.org/',
            },
            {
              label: 'License',
              to: 'https://www.apache.org/licenses/',
            },
            {
              label: 'Events',
              to: 'https://www.apache.org/events/',
            },
            {
              label: 'Security',
              to: 'https://www.apache.org/security/',
            },
            {
              label: 'Sponsorship',
              to: 'https://www.apache.org/foundation/sponsorship.html',
            },
            {
              label: 'Thanks',
              to: 'https://www.apache.org/foundation/thanks.html',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              to: 'https://github.com/apache/apisix/issues',
            },
            {
              label: 'Slack',
              to: '/docs/general/join',
            },
            {
              label: 'Twitter',
              to: 'https://twitter.com/ApacheAPISIX',
            }, {
              label: 'YouTube',
              to: 'https://www.youtube.com/channel/UCgPD18cMhOg5rmPVnQhAC8g',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog/',
            }, {
              label: 'Showcase',
              to: '/showcase',
            }, {
              label: 'Plugin Hub',
              to: '/plugins',
            },
          ],
        },
      ],
      logo: {
        alt: 'Apache Software Foundation',
        src: 'https://static.apiseven.com/202202/asf_logo_wide_small.png',
        href: 'https://www.apache.org/',
      },

      copyright:
        'Copyright © 2019-2022 The Apache Software Foundation. Apache APISIX, APISIX®, Apache, the Apache feather logo, and the Apache APISIX project logo are either registered trademarks or trademarks of the Apache Software Foundation.',
    },
    announcementBar: {
      id: 'query',
      backgroundColor: '#e8433e',
      textColor: 'white',
      content:
        '\u{1F914} Have queries regarding API Gateway? Join Slack channel to discuss <a target="_blank" rel="noopener noreferrer" href="/docs/general/join">join #apisix channel</a>! ⭐️',
    },
    prism: {
      theme: require('prism-react-renderer/themes/github'),
      darkTheme: require('prism-react-renderer/themes/dracula'),
      defaultLanguage: 'bash',
    },
    algolia: {
      appId: '38VC84A2WJ',
      apiKey: '73248b6e5908d49bb7986c4aef5fd30d',
      indexName: 'apache_apisix',
      contextualSearch: true,
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    image: 'https://static.apiseven.com/202202/apache-apisix.png',
    metadatas: [
      {
        name: 'description',
        content:
          'Open Source and Cloud-Native API gateway, based on the Nginx library and etcd.',
      },
      {
        name: 'robots',
        content: 'index,follow',
      },
      {
        name: 'twitter:card',
        content: 'summary',
      },
    ],
    gtag: {
      trackingID: 'GTM-K24PRPS',
    },
  },
  stylesheets: [],
  /**
   * We need to check if we build site for preview env,
   * or preview site will load static assets from the asf-site branch.
   * See ssrTemplate -> jsDelivr
  */
  ssrTemplate,
};
