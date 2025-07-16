const { ssrTemplate } = require('../config/ssrTemplate');

module.exports = {
  title: 'Apache APISIX® -- Cloud-Native API Gateway and AI Gateway',
  tagline:
    'APISIX is a dynamic, high-performance API Gateway with features like load balancing, canary release, authentication, and observability. As an AI Gateway, it enables AI proxying, LLM load balancing, retries, fallbacks, token-based rate limiting, and security to enhance AI agent efficiency and reliability.',
  url: 'https://apisix.apache.org',
  baseUrl: '/',
  trailingSlash: true,
  organizationName: 'Apache',
  projectName: 'apisix-website',
  favicon: 'https://static.apiseven.com/202202/favicon.png',
  customFields: {
    tagline2:
      'Apache APISIX provides rich traffic management features such as load balancing, dynamic upstream, canary release, circuit breaking, authentication, observability, and more.',
    showcases: require('./static/data/showcases.json'),
    events: {
      en: require('./static/data/events.json'),
      zh: require('./static/data/events.zh.json'),
    },
    repoUrl: 'https://github.com/apache/apisix',
    docsUrl: '',
    docs: require('../config/docs.js'),
    downloads: require('../config/downloads.js'),
    team: require('../config/team.js'),
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
  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'ignore',
  noIndex: false,
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: 'docs/general',
          routeBasePath: '/docs/general',
          sidebarPath: require.resolve('./docs/general/sidebars.json'),
          editUrl({ docPath }) {
            return `https://github.com/apache/apisix-website/edit/master/website/docs/general/${docPath}`;
          },
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/customTheme.scss'),
        },
        sitemap: {
          changefreq: 'daily',
          priority: 0.5,
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
    ['docusaurus-plugin-sass', {}],
    require.resolve('../config/schema-org'),
  ],
  themeConfig: {
    navbar: {
      hideOnScroll: true,
      title: 'Apache APISIX®',
      logo: {
        src: 'img/logo2.svg',
      },
      items: require('../config/navbar.js'),
    },
    hideableSidebar: true,
    announcementBar: {
      id: 'query',
      backgroundColor: '#e8433e',
      textColor: 'white',
      content:
        '\u{1F914} Introducing APISIX AI Gateway – Built for LLMs and AI workloads. <a target="_blank" rel="noopener noreferrer" href="/ai-gateway/"> Learn More</a>',
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
        content: 'APISIX is a dynamic, high-performance API Gateway with features like load balancing, canary release, authentication, and observability. As an AI Gateway, it enables AI proxying, LLM load balancing, retries, fallbacks, token-based rate limiting, and security to enhance AI agent efficiency and reliability.',
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
  },
  scripts: [
    {
      src: 'https://widget.kapa.ai/kapa-widget.bundle.js',
      'data-website-id': '24b59d9a-682e-4c3d-9e83-bf2ee85cdc19',
      'data-project-name': 'APISIX',
      'data-project-color': '#E8442E',
      'data-project-logo': 'https://static.apiseven.com/202202/apache-apisix.png',
      'data-modal-disclaimer': 'This is a custom LLM for APISIX with access to all developer documentation, GitHub issues and discussions.',
      'data-modal-example-questions': 'Why we need APISIX?,How to deploy APISIX?,How to manage API Observability in APISIX?,How to proxy GraphQL requests?',
      async: true,
    },
  ],
  stylesheets: [],
  /**
   * We need to check if we build site for preview env,
   * or preview site will load static assets from the asf-site branch.
   * See ssrTemplate -> jsDelivr
   */
  ssrTemplate,
};
