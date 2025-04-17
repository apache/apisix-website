const { ssrTemplate } = require('../config/ssrTemplate');

const getEditUrl = (props) => {
  const {
    projectName, version, locale, docPath, defaultBranch = 'master',
  } = props;
  // eslint-disable-next-line no-nested-ternary
  const ver = version === 'current'
    ? defaultBranch
    : projectName === 'apisix-ingress-controller'
      ? `v${version}`
      : `release/${version}`;

  return `${locale === 'zh' ? '/zh' : ''}/edit#https://github.com/apache/${projectName}/edit/${ver}/docs/${locale}/latest/${docPath}`;
};

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
    repoUrl: 'https://github.com/apache/apisix',
    docsUrl: '',

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
        docs: false,
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
      '@docusaurus/plugin-content-docs',
      {
        id: 'docs-apisix',
        path: 'docs/apisix',
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
        routeBasePath: '/docs/apisix',
        sidebarPath: require.resolve('./docs/apisix/sidebars.json'),
        editUrl(props) {
          return getEditUrl({
            ...props,
            projectName: 'apisix',
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
        editUrl(props) {
          return getEditUrl({
            ...props,
            projectName: 'apisix-dashboard',
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
        editUrl(props) {
          return getEditUrl({
            ...props,
            projectName: 'apisix-ingress-controller',
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
        editUrl(props) {
          return getEditUrl({
            ...props,
            projectName: 'apisix-helm-chart',
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
        editUrl(props) {
          return getEditUrl({
            ...props,
            projectName: 'apisix-docker',
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
        sidebarPath: require.resolve(
          './docs/apisix-java-plugin-runner/sidebars.json',
        ),
        editUrl(props) {
          return getEditUrl({
            ...props,
            projectName: 'apisix-java-plugin-runner',
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
        sidebarPath: require.resolve(
          './docs/apisix-go-plugin-runner/sidebars.json',
        ),
        editUrl(props) {
          return getEditUrl({
            ...props,
            projectName: 'apisix-go-plugin-runner',
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
        sidebarPath: require.resolve(
          './docs/apisix-python-plugin-runner/sidebars.json',
        ),
        editUrl(props) {
          return getEditUrl({
            ...props,
            projectName: 'apisix-python-plugin-runner',
          });
        },
      },
    ],
    ['docusaurus-plugin-sass', {}],
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
        content:
          'APISIX is a dynamic, high-performance API Gateway with features like load balancing, canary release, authentication, and observability. As an AI Gateway, it enables AI proxying, LLM load balancing, retries, fallbacks, token-based rate limiting, and security to enhance AI agent efficiency and reliability.',
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
  stylesheets: [],
  /**
   * We need to check if we build site for preview env,
   * or preview site will load static assets from the asf-site branch.
   * See ssrTemplate -> jsDelivr
   */
  ssrTemplate,
};
