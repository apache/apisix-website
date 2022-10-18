const { ssrTemplate } = require('../../config/ssrTemplate');

const description = 'Open Source and Cloud-Native API gateway, based on the Nginx library and etcd.';

const metadatas = [
  {
    name: 'description',
    content: description,
  },
  {
    property: 'og:description',
    content: description,
  },
  {
    name: 'robots',
    content: 'index,follow',
  },
  {
    name: 'twitter:card',
    content: 'summary',
  },
];

module.exports = {
  title: 'Apache APISIX® -- Cloud-Native API Gateway',
  tagline:
    'Apache APISIX is a dynamic, real-time, high-performance Cloud-Native API gateway, based on the Nginx library and etcd.',
  url: 'https://apisix.apache.org',
  baseUrl: '/',
  trailingSlash: true,
  organizationName: 'Apache',
  projectName: 'apisix-website',
  favicon: 'https://static.apiseven.com/202202/favicon.png',
  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'ignore',
  noIndex: false,
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    localeConfigs: {
      en: {
        label: 'English',
      },
      zh: {
        label: '简体中文',
      },
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: false,
        blog: {
          blogSidebarCount: 0,
          postsPerPage: 9,
        },
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
  plugins: [['docusaurus-plugin-sass', {}]],
  themeConfig: {
    navbar: {
      hideOnScroll: true,
      title: 'Apache APISIX®',
      logo: {
        src: 'img/logo2.svg',
      },
      items: require('../../config/navbar.js'),
    },
    hideableSidebar: true,
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
    metadatas,
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
