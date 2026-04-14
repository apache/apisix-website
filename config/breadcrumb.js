const SITE_URL = 'https://apisix.apache.org';

/**
 * Generate BreadcrumbList JSON-LD structured data from a URL path.
 *
 * Example for /docs/apisix/plugins/limit-req/:
 *   Home > Docs > APISIX > Plugins > limit-req
 */
function buildBreadcrumbs(urlPath) {
  // Remove trailing index.html and normalize
  const cleanPath = urlPath
    .replace(/\/index\.html$/, '/')
    .replace(/\.html$/, '/');

  // Split into segments, filter empties
  const segments = cleanPath.split('/').filter(Boolean);

  if (segments.length === 0) return null; // homepage, no breadcrumb needed

  // Build breadcrumb items
  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: SITE_URL + '/',
    },
  ];

  // Human-readable labels for known path segments
  const labels = {
    docs: 'Docs',
    apisix: 'APISIX',
    blog: 'Blog',
    plugins: 'Plugins',
    'learning-center': 'Learning Center',
    'ingress-controller': 'Ingress Controller',
    'helm-chart': 'Helm Chart',
    docker: 'Docker',
    'ai-gateway': 'AI Gateway',
    downloads: 'Downloads',
    team: 'Team',
    contribute: 'Contribute',
    showcase: 'Showcase',
    help: 'Help',
    articles: 'Articles',
    events: 'Events',
    general: 'General',
    zh: 'Chinese',
  };

  let currentPath = '';
  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    currentPath += '/' + seg;

    // Skip 'zh' locale prefix in breadcrumb display
    if (seg === 'zh' && i === 0) continue;

    const name = labels[seg] || seg.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

    items.push({
      '@type': 'ListItem',
      position: items.length + 1,
      name,
      item: SITE_URL + currentPath + '/',
    });
  }

  // Don't generate breadcrumbs for single-level pages (just Home > Page)
  if (items.length <= 1) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
}

/**
 * Docusaurus plugin that injects BreadcrumbList JSON-LD into every page
 * during the post-build phase.
 */
module.exports = function breadcrumbPlugin() {
  return {
    name: 'breadcrumb-jsonld',

    async postBuild({ outDir }) {
      const fs = require('fs');
      const path = require('path');

      function findHtmlFiles(dir) {
        const results = [];
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);
          if (entry.isDirectory()) {
            results.push(...findHtmlFiles(fullPath));
          } else if (entry.name.endsWith('.html')) {
            results.push(fullPath);
          }
        }
        return results;
      }

      const htmlFiles = findHtmlFiles(outDir);
      let injected = 0;

      for (const filePath of htmlFiles) {
        let html = fs.readFileSync(filePath, 'utf-8');

        const relativePath = path.relative(outDir, filePath);
        const urlPath = '/' + relativePath.split(path.sep).join('/');

        const breadcrumbs = buildBreadcrumbs(urlPath);
        if (!breadcrumbs) continue;

        const script = `<script type="application/ld+json">${JSON.stringify(breadcrumbs)}</script>`;
        html = html.replace('</head>', `    ${script}\n  </head>`);
        fs.writeFileSync(filePath, html, 'utf-8');
        injected++;
      }

      console.log(`  [breadcrumb] Injected BreadcrumbList into ${injected} pages`);
    },
  };
};
