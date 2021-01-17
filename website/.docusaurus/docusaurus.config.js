export default {
  "title": "Apache APISIX™",
  "tagline": "Apache APISIX is a dynamic, real-time, high-performance Cloud-Native API gateway, based on the Nginx library and etcd.",
  "url": "https://apisix.apache.org/",
  "baseUrl": "/",
  "organizationName": "Apache",
  "projectName": "apisix-website",
  "scripts": [
    "https://buttons.github.io/buttons.js"
  ],
  "favicon": "img/favicon.png",
  "customFields": {
    "tagline2": "Apache APISIX software provides rich traffic management features such as load balancing, dynamic upstream, canary release, circuit breaking, authentication, observability, and more.",
    "users": [
      {
        "caption": "360",
        "image": "https://static.apiseven.com/2020/05/WechatIMG618.png",
        "infoLink": "https://www.360.com",
        "pinned": true
      },
      {
        "caption": "HelloTalk",
        "image": "https://static.apiseven.com/2020/05/HelloTalk.png",
        "infoLink": "https://www.hellotalk.com/?lang=en",
        "pinned": true
      },
      {
        "caption": "网易",
        "image": "https://static.apiseven.com/2020/05/1588907762-WechatIMG2916.png",
        "infoLink": "https://www.163.com",
        "pinned": true
      },
      {
        "caption": "腾讯云",
        "image": "https://static.apiseven.com/2020/05/%E8%85%BE%E8%AE%AF%E4%BA%91-1536x546.jpg",
        "infoLink": "https://qcloud.com",
        "pinned": true
      },
      {
        "caption": "中国航信",
        "image": "https://static.apiseven.com/2020/05/%E4%B8%AD%E5%9B%BD%E8%88%AA%E4%BF%A1.png",
        "infoLink": "http://www.infosky.com.cn/publish/main/index.html",
        "pinned": true
      }
    ],
    "repoUrl": "https://github.com/apache/apisix",
    "docsUrl": ""
  },
  "onBrokenLinks": "log",
  "onBrokenMarkdownLinks": "log",
  "presets": [
    [
      "@docusaurus/preset-classic",
      {
        "docs": {
          "homePageId": "subscribe-guide",
          "showLastUpdateAuthor": true,
          "showLastUpdateTime": true,
          "path": "..\\docs",
          "sidebarPath": "..\\website1.0\\sidebars.json"
        },
        "blog": {},
        "theme": {
          "customCss": "..\\src\\css\\customTheme.css"
        }
      }
    ]
  ],
  "plugins": [],
  "themeConfig": {
    "navbar": {
      "title": "Apache APISIX™",
      "logo": {
        "src": "img/logo.png"
      },
      "items": [
        {
          "to": "docs/",
          "label": "Docs",
          "position": "left"
        },
        {
          "to": "docs/downloads",
          "label": "Downloads",
          "position": "left"
        },
        {
          "to": "docs/team",
          "label": "Team",
          "position": "left"
        },
        {
          "to": "/help",
          "label": "Help",
          "position": "left"
        }
      ],
      "hideOnScroll": false
    },
    "footer": {
      "links": [
        {
          "title": "Community",
          "items": [
            {
              "label": "Twitter",
              "to": "https://twitter.com/ApacheAPISIX"
            }
          ]
        }
      ],
      "copyright": "Copyright © 2019-2021 The Apache Software Foundation. Apache APISIX, APISIX™, Apache, the Apache feather logo, and the Apache APISIX project logo are either registered trademarks or trademarks of the Apache Software Foundation.",
      "style": "light"
    },
    "algolia": {
      "apiKey": "79e72fedcf3719ba85c552f710ade8a3",
      "appId": "ZHVP417Y1Y",
      "indexName": "apache-apisix-website",
      "contextualSearch": false,
      "searchParameters": {}
    },
    "colorMode": {
      "defaultMode": "light",
      "disableSwitch": false,
      "respectPrefersColorScheme": false,
      "switchConfig": {
        "darkIcon": "🌜",
        "darkIconStyle": {},
        "lightIcon": "🌞",
        "lightIconStyle": {}
      }
    },
    "docs": {
      "versionPersistence": "localStorage"
    },
    "metadatas": [],
    "prism": {
      "additionalLanguages": []
    },
    "hideableSidebar": false
  },
  "baseUrlIssueBanner": true,
  "i18n": {
    "defaultLocale": "en",
    "locales": [
      "en"
    ],
    "localeConfigs": {}
  },
  "onDuplicateRoutes": "warn",
  "themes": [],
  "titleDelimiter": "|",
  "noIndex": false
};