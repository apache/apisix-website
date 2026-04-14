const SITE_URL = 'https://apisix.apache.org';

/**
 * Docusaurus plugin that injects hreflang <link> tags and canonical URLs
 * into every HTML page during the post-build phase.
 *
 * For each page, it generates:
 *   <link rel="alternate" hreflang="en"        href="https://apisix.apache.org/..." />
 *   <link rel="alternate" hreflang="zh"        href="https://apisix.apache.org/zh/..." />
 *   <link rel="alternate" hreflang="x-default" href="https://apisix.apache.org/..." />
 *   <link rel="canonical" href="..." />  (if not already present)
 */
module.exports = function hreflangPlugin() {
  return {
    name: 'hreflang',

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

      for (const filePath of htmlFiles) {
        let html = fs.readFileSync(filePath, 'utf-8');

        // Determine relative path from outDir
        const relativePath = path.relative(outDir, filePath);

        // Determine the current locale based on file path
        const isZh = relativePath.startsWith('zh' + path.sep);

        // Compute the path without locale prefix
        const pathWithoutLocale = isZh
          ? relativePath.slice(3) // remove "zh/"
          : relativePath;

        // Normalize path separators for URL
        const urlPath = pathWithoutLocale.split(path.sep).join('/');

        // Build URLs
        const enUrl = `${SITE_URL}/${urlPath}`.replace(/\/index\.html$/, '/');
        const zhUrl = `${SITE_URL}/zh/${urlPath}`.replace(/\/index\.html$/, '/');
        const currentUrl = isZh ? zhUrl : enUrl;

        // Build hreflang tags
        const hreflangTags = [
          `<link rel="alternate" hreflang="en" href="${enUrl}" />`,
          `<link rel="alternate" hreflang="zh" href="${zhUrl}" />`,
          `<link rel="alternate" hreflang="x-default" href="${enUrl}" />`,
        ].join('\n    ');

        // Add canonical tag if not already present
        const hasCanonical = html.includes('rel="canonical"');
        const canonicalTag = hasCanonical
          ? ''
          : `<link rel="canonical" href="${currentUrl}" />`;

        // Inject before </head>
        const injection = [hreflangTags, canonicalTag]
          .filter(Boolean)
          .join('\n    ');
        html = html.replace('</head>', `    ${injection}\n  </head>`);

        fs.writeFileSync(filePath, html, 'utf-8');
      }
    },
  };
};
