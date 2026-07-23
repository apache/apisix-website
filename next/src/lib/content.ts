import { POSTS_PER_PAGE, localePrefix, type Locale } from './site';

export interface MdModule {
  frontmatter: Record<string, any>;
  file: string;
  Content: any;
  getHeadings: () => { depth: number; slug: string; text: string }[];
  rawContent?: () => string;
}

/**
 * Fallback meta description when frontmatter has none: the first real prose
 * paragraph of the document (same behavior as the current Docusaurus site).
 */
export function excerpt(mod: MdModule): string {
  const raw = mod.rawContent?.() ?? '';
  const cleaned = raw
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/^<head>[\s\S]*?<\/head>$/m, '');
  for (const block of cleaned.split(/\n\s*\n/)) {
    const t = block.trim();
    // Skip headings, admonitions, tables, html, quotes, images, code, list
    // items, and imports — but NOT prose that merely starts with a [link].
    if (!t || /^(#|:{3}|\||<|>|!\[|`|\* |- |\d+\. |import )/.test(t)) continue;
    const text = t
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
      .replace(/[*_`]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    if (text.length >= 40) return text;
  }
  return '';
}

export interface Post {
  url: string;
  slug: string;
  title: string;
  description: string;
  date: Date;
  dateStr: string;
  tags: string[];
  image?: string;
  author?: string;
  mod: MdModule;
}

// NOTE: import.meta.glob patterns must be literals (Vite static analysis).
type MdMap = Record<string, MdModule>;
const blogEnModules = import.meta.glob('/content/blog-en/**/*.md', { eager: true }) as MdMap;
const blogZhModules = import.meta.glob('/content/blog-zh/**/*.md', { eager: true }) as MdMap;
const learningModules = import.meta.glob('/content/learning-center/*.md', { eager: true }) as MdMap;
const articleModules = import.meta.glob('/content/articles/*.md', { eager: true }) as MdMap;
const docsGeneralModules = import.meta.glob('/content/docs-general/**/*.md', { eager: true }) as MdMap;
const docsApisixEn = import.meta.glob('/content/docs-apisix-en/**/*.md', { eager: true }) as MdMap;
const docsApisixZh = import.meta.glob('/content/docs-apisix-zh/**/*.md', { eager: true }) as MdMap;
const docsIngressEn = import.meta.glob('/content/docs-ingress-controller-en/**/*.md', { eager: true }) as MdMap;
const docsIngressZh = import.meta.glob('/content/docs-ingress-controller-zh/**/*.md', { eager: true }) as MdMap;
const docsHelmEn = import.meta.glob('/content/docs-helm-chart-en/**/*.md', { eager: true }) as MdMap;
const docsDockerEn = import.meta.glob('/content/docs-docker-en/**/*.md', { eager: true }) as MdMap;
const docsDockerZh = import.meta.glob('/content/docs-docker-zh/**/*.md', { eager: true }) as MdMap;
const docsJavaEn = import.meta.glob('/content/docs-java-plugin-runner-en/**/*.md', { eager: true }) as MdMap;
const docsGoEn = import.meta.glob('/content/docs-go-plugin-runner-en/**/*.md', { eager: true }) as MdMap;
const docsPythonEn = import.meta.glob('/content/docs-python-plugin-runner-en/**/*.md', { eager: true }) as MdMap;

const sidebarConfigs = import.meta.glob('/content/docs-*/config.json', { eager: true }) as Record<string, any>;

/** Sub-projects served under /docs/<key>/ via the generic route. */
export const SUBPROJECTS: Record<string, { en: MdMap; zh?: MdMap; repo: string }> = {
  'ingress-controller': { en: docsIngressEn, zh: docsIngressZh, repo: 'apisix-ingress-controller' },
  'helm-chart': { en: docsHelmEn, repo: 'apisix-helm-chart' },
  docker: { en: docsDockerEn, zh: docsDockerZh, repo: 'apisix-docker' },
  'java-plugin-runner': { en: docsJavaEn, repo: 'apisix-java-plugin-runner' },
  'go-plugin-runner': { en: docsGoEn, repo: 'apisix-go-plugin-runner' },
  'python-plugin-runner': { en: docsPythonEn, repo: 'apisix-python-plugin-runner' },
};

function baseName(file: string): string {
  return file.split('/').pop()!.replace(/\.md$/, '');
}

function toTags(fm: Record<string, any>): string[] {
  const tags = fm.tags ?? [];
  return Array.isArray(tags) ? tags.map(String) : [String(tags)];
}

/** Docusaurus blog URL rule: /blog/YYYY/MM/DD/<slug>/ from the file path date. */
function blogPost(path: string, mod: MdModule, locale: Locale): Post | null {
  const m = path.match(/blog-(?:en|zh)\/(\d{4})\/(\d{2})\/(\d{2})\/(.+)\.md$/);
  if (!m) return null;
  const [, y, mo, d, name] = m;
  const fmSlug: string | undefined = mod.frontmatter.slug;
  // Docusaurus blog URL rules, verified against the live sitemap:
  //  - frontmatter slug containing "/" replaces the whole path;
  //  - otherwise the filename is used AS-IS (case and spaces preserved —
  //    see /blog/2023/09/08/APISIX-integrates-with-Coraza/).
  const slug = fmSlug ?? name;
  const urlPath = slug.includes('/') ? slug : `${y}/${mo}/${d}/${slug}`;
  return {
    url: `${localePrefix(locale)}/blog/${urlPath}/`,
    slug: urlPath,
    title: mod.frontmatter.title ?? name,
    description: mod.frontmatter.description ?? excerpt(mod),
    date: new Date(`${y}-${mo}-${d}T00:00:00Z`),
    dateStr: `${y}-${mo}-${d}`,
    tags: toTags(mod.frontmatter),
    image: mod.frontmatter.image,
    author: mod.frontmatter.author ?? (Array.isArray(mod.frontmatter.authors) ? mod.frontmatter.authors[0]?.name : undefined),
    mod,
  };
}

function flatPost(path: string, mod: MdModule, urlBase: string, locale: Locale): Post {
  const slug = mod.frontmatter.slug ?? baseName(path);
  const date = mod.frontmatter.date ? new Date(mod.frontmatter.date) : new Date(0);
  return {
    url: `${localePrefix(locale)}${urlBase}/${slug}/`,
    slug,
    title: mod.frontmatter.title ?? slug,
    description: mod.frontmatter.description ?? excerpt(mod),
    date,
    dateStr: date.toISOString().slice(0, 10),
    tags: toTags(mod.frontmatter),
    image: mod.frontmatter.image,
    author: mod.frontmatter.author,
    mod,
  };
}

const byDateDesc = (a: Post, b: Post) => b.date.getTime() - a.date.getTime() || a.title.localeCompare(b.title);

export function getBlogPosts(locale: Locale): Post[] {
  const modules = locale === 'zh' ? blogZhModules : blogEnModules;
  return Object.entries(modules)
    .map(([p, mod]) => blogPost(p, mod, locale))
    .filter((p): p is Post => !!p)
    .sort(byDateDesc);
}

export function getLearningPosts(locale: Locale): Post[] {
  // learning-center content is EN-only today; zh URLs serve the same entries
  // (the current site does the same via Docusaurus i18n fallback).
  return Object.entries(learningModules)
    .map(([p, mod]) => flatPost(p, mod, '/learning-center', locale))
    .sort(byDateDesc);
}

export function getArticles(locale: Locale): Post[] {
  return Object.entries(articleModules)
    .map(([p, mod]) => flatPost(p, mod, '/articles', locale))
    .sort(byDateDesc);
}

export function paginate(posts: Post[], perPage = POSTS_PER_PAGE): Post[][] {
  const pages: Post[][] = [];
  for (let i = 0; i < posts.length; i += perPage) pages.push(posts.slice(i, i + perPage));
  return pages.length ? pages : [[]];
}

export function tagSlug(tag: string): string {
  return tag.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function groupByTag(posts: Post[]): Map<string, { label: string; posts: Post[] }> {
  const map = new Map<string, { label: string; posts: Post[] }>();
  for (const post of posts) {
    for (const tag of post.tags) {
      const slug = tagSlug(tag);
      if (!map.has(slug)) map.set(slug, { label: tag, posts: [] });
      map.get(slug)!.posts.push(post);
    }
  }
  return map;
}

/* ---------------- docs ---------------- */

export interface DocEntry {
  id: string; // URL id after frontmatter slug/id overrides (e.g. "FAQ", "plugins/limit-count")
  /** Pure path-derived id — the key sidebar config.json entries refer to. */
  pathId: string;
  url: string;
  title: string;
  description: string;
  mod: MdModule;
}

function docId(path: string, root: string, fm?: Record<string, any>): string {
  const rel = path.slice(path.indexOf(root) + root.length + 1).replace(/\.md$/, '');
  const dir = rel.includes('/') ? rel.slice(0, rel.lastIndexOf('/') + 1) : '';
  // Docusaurus URL precedence: frontmatter slug (root-relative if it starts
  // with "/", else relative to the doc's directory) > frontmatter id > filename.
  if (fm?.slug) {
    const s = String(fm.slug);
    return s.startsWith('/') ? s.slice(1) : `${dir}${s}`;
  }
  if (fm?.id) return `${dir}${fm.id}`;
  return rel;
}

function docTitle(mod: MdModule, id: string): string {
  return mod.frontmatter.title ?? id.split('/').pop()!;
}

export function getGeneralDocs(locale: Locale): DocEntry[] {
  return Object.entries(docsGeneralModules)
    .filter(([p]) => !p.endsWith('sidebars.json'))
    .map(([p, mod]) => {
      const id = docId(p, 'docs-general', mod.frontmatter);
      return {
        id,
        pathId: docId(p, 'docs-general'),
        url: `${localePrefix(locale)}/docs/general/${id}/`,
        title: docTitle(mod, id),
        description: mod.frontmatter.description ?? excerpt(mod),
        mod,
      };
    });
}

/** APISIX docs (current version). ZH entries fall back to EN content. */
export function getApisixDocs(locale: Locale): DocEntry[] {
  const zh = new Map(Object.entries(docsApisixZh).map(([p, mod]) => [docId(p, 'docs-apisix-zh'), mod]));
  return Object.entries(docsApisixEn).map(([p, mod]) => {
    const id = docId(p, 'docs-apisix-en');
    const effective = locale === 'zh' ? (zh.get(id) ?? mod) : mod;
    return {
      id,
      pathId: docId(p, 'docs-apisix-en'),
      url: `${localePrefix(locale)}/docs/apisix/${id}/`,
      title: docTitle(effective, id),
      description: effective.frontmatter.description ?? excerpt(effective),
      mod: effective,
    };
  });
}

/** Docs for one sub-project; zh falls back to en content at zh URLs. */
export function getSubprojectDocs(project: string, locale: Locale): DocEntry[] {
  const { en, zh } = SUBPROJECTS[project];
  const rootName = `docs-${project}-`;
  const zhMap = new Map(Object.entries(zh ?? {}).filter(([p]) => !p.endsWith('config.json'))
    .map(([p, mod]) => [docId(p, `${rootName}zh`, mod.frontmatter), mod]));
  return Object.entries(en)
    .filter(([p]) => !p.endsWith('config.json'))
    .map(([p, mod]) => {
      const id = docId(p, `${rootName}en`, mod.frontmatter);
      const effective = locale === 'zh' ? (zhMap.get(id) ?? mod) : mod;
      return {
        id,
        pathId: docId(p, `${rootName}en`),
        url: `${localePrefix(locale)}/docs/${project}/${id}/`,
        title: docTitle(effective, id),
        description: effective.frontmatter.description ?? excerpt(effective),
        mod: effective,
      };
    });
}

export function getSubprojectSidebar(project: string): SidebarNode[] {
  const cfg = Object.entries(sidebarConfigs).find(([p]) => p.includes(`docs-${project}-en/config.json`))?.[1];
  const sidebar = cfg?.default?.sidebar ?? cfg?.sidebar;
  if (!sidebar) return getSubprojectDocs(project, 'en').map((d) => ({ id: d.id }));
  const normalize = (item: any): SidebarNode => {
    if (typeof item === 'string') return { id: item };
    if (item.type === 'doc') return { id: item.id };
    return { label: item.label, items: (item.items ?? []).map(normalize) };
  };
  return sidebar.map(normalize);
}

export interface SidebarNode {
  label?: string;
  id?: string;
  items?: SidebarNode[];
}

// Resolve the apisix sidebar config from the already-globbed config set rather
// than a static import, so the homepage-only build (which ships no synced
// content/) still compiles. Missing config -> empty sidebar, version 'current'.
const apisixCfgEntry = Object.entries(sidebarConfigs)
  .find(([p]) => p.includes('docs-apisix-en/config.json'))?.[1];
const apisixCfg = ((apisixCfgEntry as any)?.default ?? apisixCfgEntry ?? {}) as any;

export function getApisixSidebar(): SidebarNode[] {
  const normalize = (item: any): SidebarNode => {
    if (typeof item === 'string') return { id: item };
    if (item.type === 'doc') return { id: item.id };
    return { label: item.label, items: (item.items ?? []).map(normalize) };
  };
  return (apisixCfg.sidebar ?? []).map(normalize);
}

export const APISIX_DOCS_VERSION: string = apisixCfg.version ?? 'current';
