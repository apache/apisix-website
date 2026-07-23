export const SITE = 'https://apisix.apache.org';
// Title-tag suffix — matches production's "<page> | Apache APISIX" pattern.
export const SITE_NAME = 'Apache APISIX';
export const DEFAULT_DESCRIPTION = 'APISIX is a dynamic, high-performance API Gateway with features like load balancing, canary release, authentication, and observability. As an AI Gateway, it enables AI proxying, LLM load balancing, retries, fallbacks, token-based rate limiting, and security to enhance AI agent efficiency and reliability.';
// Served from public/img/logo2.svg in production (same URL as today);
// hotlinked from the live site during prototyping.
export const LOGO = '/img/logo2.svg';
export const FAVICON = 'https://static.apiseven.com/202202/favicon.png';
// Social-share card image (og:image / twitter:image) — matches production.
export const SOCIAL_IMAGE = 'https://static.apiseven.com/202202/apache-apisix.png';
export const POSTS_PER_PAGE = 9;

export type Locale = 'en' | 'zh';

export const localePrefix = (locale: Locale) => (locale === 'zh' ? '/zh' : '');

export const t = (locale: Locale, en: string, zh: string) => (locale === 'zh' ? zh : en);

export interface NavItem {
  label: string;
  labelZh?: string;
  href: string;
  items?: NavItem[];
}

// Mirrors config/navbar.js of the current site.
export const NAV: NavItem[] = [
  {
    label: 'Docs',
    labelZh: '文档',
    href: '/docs/',
    items: [
      { label: 'Apache APISIX®', href: '/docs/apisix/getting-started/README/' },
      { label: 'Apache APISIX® Ingress Controller', href: '/docs/ingress-controller/overview/' },
      { label: 'Apache APISIX® Helm Charts', href: '/docs/helm-chart/apisix/' },
      { label: 'Apache APISIX® Docker', href: '/docs/docker/build/' },
      { label: 'Apache APISIX® Java Plugin Runner', href: '/docs/java-plugin-runner/development/' },
      { label: 'Apache APISIX® Go Plugin Runner', href: '/docs/go-plugin-runner/getting-started/' },
      { label: 'Apache APISIX® Python Plugin Runner', href: '/docs/python-plugin-runner/getting-started/' },
      { label: 'General', href: '/docs/general/join/' },
    ],
  },
  { label: 'Learning Center', labelZh: '学习中心', href: '/learning-center/' },
  { label: 'AI Gateway', href: '/ai-gateway/' },
  { label: 'Blog', labelZh: '博客', href: '/blog/' },
  { label: 'Plugin Hub', labelZh: '插件中心', href: '/plugins/' },
  { label: 'Downloads', labelZh: '下载', href: '/downloads/' },
  { label: 'Team', labelZh: '团队', href: '/team/' },
];

export const FOOTER = {
  cols: [
    {
      title: 'ASF',
      links: [
        { label: 'Foundation', href: 'https://www.apache.org/' },
        { label: 'License', href: 'https://www.apache.org/licenses/' },
        { label: 'Events', href: 'https://www.apache.org/events/current-event' },
        { label: 'Security', href: 'https://www.apache.org/security/' },
        { label: 'Sponsorship', href: 'https://www.apache.org/foundation/sponsorship.html' },
        { label: 'Thanks', href: 'https://www.apache.org/foundation/thanks.html' },
      ],
    },
    {
      title: 'Community',
      links: [
        { label: 'GitHub', href: 'https://github.com/apache/apisix' },
        { label: 'Slack', href: 'https://apisix.apache.org/docs/general/join/#join-the-slack-channel' },
        { label: 'Twitter', href: 'https://twitter.com/ApacheAPISIX' },
        { label: 'YouTube', href: 'https://www.youtube.com/channel/UCgPD18cMhOg5rmPVnQhAC8g' },
      ],
    },
    {
      title: 'More',
      links: [
        { label: 'Blog', href: '/blog/' },
        { label: 'Plugin Hub', href: '/plugins/' },
        { label: 'Learning Center', href: '/learning-center/' },
        { label: 'Contribute', href: '/contribute/' },
      ],
    },
  ],
  legal: 'Copyright © 2019-2026 The Apache Software Foundation. Apache APISIX, APISIX®, Apache, the Apache feather logo, and the Apache APISIX project logo are either registered trademarks or trademarks of the Apache Software Foundation.',
};

export const ORG_JSONLD = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Apache APISIX',
    url: SITE,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Apache APISIX',
    url: SITE,
    logo: 'https://apisix.apache.org/img/logo2.svg',
    sameAs: [
      'https://github.com/apache/apisix',
      'https://twitter.com/ApacheAPISIX',
      'https://www.youtube.com/channel/UCgPD18cMhOg5rmPVnQhAC8g',
    ],
  },
];
