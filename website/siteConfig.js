/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

// List of projects/orgs using your project for the users page.
const users = [
  {
    caption: "User1",
    // You will need to prepend the image path with your baseUrl
    // if it is not '/', like: '/test-site/img/image.jpg'.
    image: "/img/undraw_open_source.svg",
    infoLink: "https://www.facebook.com",
    pinned: true,
  },
];

const siteConfig = {
  title: "Apache APISIX",
  tagline: "The Cloud-Native API Gateway",
  url: "https://apisix.apache.org/",
  baseUrl: "/",
  projectName: "apisix-website",
  organizationName: "Apache",
  headerLinks: [
    { doc: "doc1", label: "Docs" },
    { blog: true, label: "Blog" },
    { page: "help", label: "Downloads" },
    { page: "help", label: "Team" },
    { page: "help", label: "Help" },
    { search: true },
    { languages: true },
  ],

  // If you have users set above, you add it here:
  users,

  /* path to images for header/footer */
  headerIcon: "img/logo.png",
  footerIcon: false,
  favicon: "img/logo.png",

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
    "Copyright © 2019-2020 The Apache Software Foundation. Apache APISIX, and its feather logo are trademarks of The Apache Software Foundation.",

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

  // Open Graph and Twitter card images.
  ogImage: "img/undraw_online.svg",
  twitterImage: "img/undraw_tweetstorm.svg",

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
  docsSideNavCollapsible: true
};

module.exports = siteConfig;
