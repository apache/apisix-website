import { defineConfig } from 'astro/config';
import remarkDirective from 'remark-directive';
import { remarkAdmonitions } from './scripts/remark-admonitions.mjs';
import { remarkHeadingIds } from './scripts/remark-heading-ids.mjs';

// Static-only rebuild of apisix.apache.org.
// URL contract: every public URL is identical to the current Docusaurus site
// (trailing slash, /zh/ locale prefix, case-preserving doc slugs like /docs/apisix/FAQ/).
export default defineConfig({
  site: 'https://apisix.apache.org',
  output: 'static',
  trailingSlash: 'always',
  // inlineStylesheets:'never' keeps CSS in /_astro/ even if it drops below
  // Vite's inline threshold, so the deploy overlay's _astro/ dependency holds.
  build: { format: 'directory', inlineStylesheets: 'never' },
  markdown: {
    remarkPlugins: [remarkDirective, remarkAdmonitions, remarkHeadingIds],
    shikiConfig: { theme: 'github-dark-default' },
  },
});
