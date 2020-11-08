const users = [
  {
    caption: "360",
    image: "https://static.apiseven.com/2020/05/WechatIMG618.png",
    infoLink: "https://www.360.com",
    pinned: true,
  }, {
    caption: "HelloTalk",
    image: "https://static.apiseven.com/2020/05/HelloTalk.png",
    infoLink: "https://www.hellotalk.com/?lang=en",
    pinned: true,
  }, {
    caption: "网易",
    image: "https://static.apiseven.com/2020/05/1588907762-WechatIMG2916.png",
    infoLink: "https://www.163.com",
    pinned: true,
  }, {
    caption: "腾讯云",
    image: "https://static.apiseven.com/2020/05/%E8%85%BE%E8%AE%AF%E4%BA%91-1536x546.jpg",
    infoLink: "https://qcloud.com",
    pinned: true,
  }, {
    caption: "中国航信",
    image: "https://static.apiseven.com/2020/05/%E4%B8%AD%E5%9B%BD%E8%88%AA%E4%BF%A1.png",
    infoLink: "http://www.infosky.com.cn/publish/main/index.html",
    pinned: true,
  }
];

const siteConfig = {
  title: "Apache APISIX™",
  tagline: "Apache APISIX is a dynamic, real-time, high-performance Cloud-Native API gateway, based on the Nginx library and etcd.",
  tagline2: "Apache APISIX software provides rich traffic management features such as load balancing, dynamic upstream, canary release, circuit breaking, authentication, observability, and more.",
  url: "https://apisix.apache.org/",
  baseUrl: "/",
  projectName: "apisix-website",
  organizationName: "Apache",
  headerLinks: [
    { doc: "subscrbe-guide", label: "Docs" },
    { blog: true, label: "Blog" },
    { doc: "downloads", label: "Downloads" },
    { doc: "team", label: "Team" },
    { page: "help", label: "Help" },
    { search: true },
    { languages: true },
  ],

  // If you have users set above, you add it here:
  users,

  /* path to images for header/footer */
  headerIcon: "img/logo.png",
  footerIcon: false,
  favicon: "img/favicon.png",

  /* Colors for website */
  colors: {
    primaryColor: "#b52b27",
    secondaryColor: "#72021c",
  },

  /* Custom fonts for website */
  /*
  fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },
  */

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright:
    "Copyright © 2019-2020 The Apache Software Foundation. Apache APISIX, APISIX™, Apache, the Apache feather logo, and the Apache APISIX project logo are either registered trademarks or trademarks of the Apache Software Foundation.",

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: "default",
  },

  // Add custom scripts here that would be placed in <script> tags.
  scripts: ["https://buttons.github.io/buttons.js"],

  // On page navigation for the current documentation page.
  onPageNav: "separate",
  // No .html extensions for paths.
  cleanUrl: true,

  // For sites with a sizable amount of content, set collapsible to true.
  // Expand/collapse the links and subcategories under categories.
  // docsSideNavCollapsible: true,

  // Show documentation's last contributor's name.
  enableUpdateBy: true,

  // Show documentation's last update time.
  enableUpdateTime: true,

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  repoUrl: "https://github.com/apache/apisix",
  algolia: {
    apiKey: '79e72fedcf3719ba85c552f710ade8a3',
    appId: 'ZHVP417Y1Y',
    indexName: 'apache-apisix-website'
  },
  gaTrackingId: '',
  twitterUsername: 'ApacheAPISIX',
  scrollToTop: true,
  docsSideNavCollapsible: true,
  docsUrl: ''
};

module.exports = siteConfig;
