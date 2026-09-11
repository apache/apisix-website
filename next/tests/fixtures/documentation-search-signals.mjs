import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const SITE = 'https://apisix.apache.org';

export const API7_OWNED_DOC_SAMPLES = [
  {
    path: '/docs/apisix/getting-started/README/',
    canonical: 'https://docs.api7.ai/apisix/getting-started/',
  },
  {
    path: '/docs/apisix/getting-started/configure-routes/',
    canonical: 'https://docs.api7.ai/apisix/getting-started/configure-routes',
  },
  {
    path: '/docs/apisix/getting-started/key-authentication/',
    canonical: 'https://docs.api7.ai/apisix/getting-started/key-authentication',
  },
  {
    path: '/docs/apisix/plugins/jwt-auth/',
    canonical: 'https://docs.api7.ai/hub/jwt-auth',
  },
  {
    path: '/docs/apisix/plugins/openid-connect/',
    canonical: 'https://docs.api7.ai/hub/openid-connect',
  },
  {
    path: '/docs/apisix/plugins/proxy-rewrite/',
    canonical: 'https://docs.api7.ai/hub/proxy-rewrite',
  },
  {
    path: '/docs/apisix/plugins/limit-count/',
    canonical: 'https://docs.api7.ai/hub/limit-count',
  },
  {
    path: '/docs/apisix/plugins/prometheus/',
    canonical: 'https://docs.api7.ai/hub/prometheus',
  },
  {
    path: '/zh/docs/apisix/getting-started/README/',
    canonical: 'https://docs.apiseven.com/apisix/getting-started/',
  },
  {
    path: '/zh/docs/apisix/plugins/jwt-auth/',
    canonical: 'https://docs.apiseven.com/hub/jwt-auth',
  },
];

export const APISIX_OWNED_DOCS = [
  '/docs/',
  '/docs/apisix/installation-guide/',
  '/docs/ingress-controller/overview/',
  '/docs/ingress-controller/concepts/gateway-api/',
  '/docs/ingress-controller/concepts/deployment-architecture/',
  '/docs/ingress-controller/reference/apisix-ingress-controller/api-reference/',
];

export const HISTORICAL_NOINDEX_DOCS = [
  '/docs/apisix/3.18/installation-guide/',
  '/docs/apisix/next/installation-guide/',
  '/docs/ingress-controller/2.0.0/overview/',
  '/docs/ingress-controller/next/overview/',
];

const fixtureDirectory = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_CONTENT_ROOT = path.resolve(fixtureDirectory, '../../content/docs-apisix-en');

function walkMarkdown(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory()
      ? walkMarkdown(entryPath)
      : (entry.name.endsWith('.md') ? [entryPath] : []);
  });
}

function readFrontmatter(file) {
  const source = fs.readFileSync(file, 'utf8');
  const block = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!block) return {};
  return Object.fromEntries(block[1].split(/\r?\n/).flatMap((line) => {
    const match = line.match(/^(\w[\w-]*):\s*(.*)$/);
    return match ? [[match[1], match[2].replace(/^["']|["']$/g, '').trim()]] : [];
  }));
}

function routeId(file, contentRoot, frontmatter) {
  const relative = path.relative(contentRoot, file).replace(/\.md$/, '').split(path.sep).join('/');
  const directory = relative.includes('/') ? relative.slice(0, relative.lastIndexOf('/') + 1) : '';
  if (frontmatter.slug) {
    return frontmatter.slug.startsWith('/')
      ? frontmatter.slug.slice(1)
      : `${directory}${frontmatter.slug}`;
  }
  return frontmatter.id ? `${directory}${frontmatter.id}` : relative;
}

export function discoverApi7OwnedDocs(contentRoot = DEFAULT_CONTENT_ROOT) {
  return walkMarkdown(contentRoot).flatMap((file) => {
    const frontmatter = readFrontmatter(file);
    if (!frontmatter.canonical?.startsWith('https://docs.api7.ai/')) return [];
    const id = routeId(file, contentRoot, frontmatter);
    return [
      {
        path: `/docs/apisix/${id}/`,
        canonical: frontmatter.canonical,
      },
      {
        path: `/zh/docs/apisix/${id}/`,
        canonical: frontmatter.canonical.replace(
          'https://docs.api7.ai',
          'https://docs.apiseven.com',
        ),
      },
    ];
  }).sort((left, right) => left.path.localeCompare(right.path));
}
