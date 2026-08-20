import { getBlogPosts } from './content';
import { SITE, type Locale } from './site';

type FeedFormat = 'rss' | 'atom';
const FEED_ITEMS = 20;

function xml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll('\'', '&apos;');
}

function feedMeta(locale: Locale) {
  const prefix = locale === 'zh' ? '/zh' : '';
  return {
    title: locale === 'zh' ? 'Apache APISIX 中文博客' : 'Apache APISIX Blog',
    description: locale === 'zh'
      ? 'Apache APISIX 的项目动态、技术实践与社区文章。'
      : 'Project updates, technical practices, and community stories from Apache APISIX.',
    language: locale === 'zh' ? 'zh-CN' : 'en',
    home: `${SITE}${prefix}/blog/`,
    prefix,
  };
}

function renderRss(locale: Locale): string {
  const posts = getBlogPosts(locale).slice(0, FEED_ITEMS);
  const meta = feedMeta(locale);
  const updated = posts[0]?.date ?? new Date(0);
  const items = posts.map((post) => {
    const url = `${SITE}${post.url}`;
    return `<item><title>${xml(post.title)}</title><link>${xml(url)}</link><guid isPermaLink="true">${xml(url)}</guid><pubDate>${post.date.toUTCString()}</pubDate><description>${xml(post.description)}</description></item>`;
  }).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0"><channel><title>${xml(meta.title)}</title><link>${xml(meta.home)}</link><description>${xml(meta.description)}</description><language>${meta.language}</language><lastBuildDate>${updated.toUTCString()}</lastBuildDate>${items}</channel></rss>\n`;
}

function renderAtom(locale: Locale): string {
  const posts = getBlogPosts(locale).slice(0, FEED_ITEMS);
  const meta = feedMeta(locale);
  const updated = posts[0]?.date ?? new Date(0);
  const self = `${SITE}${meta.prefix}/blog/atom.xml`;
  const entries = posts.map((post) => {
    const url = `${SITE}${post.url}`;
    return `<entry><title>${xml(post.title)}</title><id>${xml(url)}</id><link href="${xml(url)}"/><updated>${post.date.toISOString()}</updated><summary>${xml(post.description)}</summary></entry>`;
  }).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<feed xmlns="http://www.w3.org/2005/Atom"><title>${xml(meta.title)}</title><id>${xml(meta.home)}</id><link href="${xml(self)}" rel="self" type="application/atom+xml"/><link href="${xml(meta.home)}"/><updated>${updated.toISOString()}</updated>${entries}</feed>\n`;
}

export default function blogFeedResponse(locale: Locale, format: FeedFormat): Response {
  const body = format === 'rss' ? renderRss(locale) : renderAtom(locale);
  const contentType = format === 'rss' ? 'application/rss+xml' : 'application/atom+xml';
  return new Response(body, {
    headers: {
      'Content-Type': `${contentType}; charset=utf-8`,
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
