const { js2xml, xml2js } = require('xml-js');
const { stat, readFile, writeFile } = require('node:fs/promises');
const Listr = require('listr');

const sitemapXMLs = [
  [
    '../website/build/sitemap.xml',
    '../doc/build/sitemap.xml',
    '../blog/en/build/sitemap.xml',
  ],
  [
    '../website/build/zh/sitemap.xml',
    '../doc/build/zh/sitemap.xml',
    '../blog/zh/build/sitemap.xml',
  ],
];

/**
 * URL patterns to exclude from the sitemap.
 *
 * Why:
 * - Versioned doc URLs (e.g. /docs/apisix/3.14/) duplicate the latest
 *   unversioned paths (e.g. /docs/apisix/) and bloat the sitemap.
 *   Only the unversioned (latest) URLs should be indexed.
 * - /docs/.../next/ pages are for unreleased development docs.
 * - /search pages are blocked by robots.txt — keeping them in
 *   the sitemap sends contradictory signals to crawlers.
 * - /blog/tags/ and /blog/page/ are low-value aggregation/pagination
 *   pages, also blocked by robots.txt.
 */
const excludePatterns = [
  // Versioned docs: /docs/<project>/<version>/ where version is digits.digits
  /\/docs\/[\w-]+\/\d+\.\d+\//,
  // Development "next" docs
  /\/docs\/[\w-]+\/next\//,
  // Search pages (blocked by robots.txt)
  /\/search\/?$/,
  // Blog tag and pagination pages (blocked by robots.txt)
  /\/blog\/tags\//,
  /\/blog\/page\//,
];

/**
 * Returns true if the URL should be excluded from the sitemap.
 */
function shouldExclude(url) {
  return excludePatterns.some((pattern) => pattern.test(url));
}

/**
 * Filter out excluded URLs from a sitemap object and return removal count.
 */
function filterSitemapUrls(sitemap) {
  const urls = Array.isArray(sitemap.urlset.url)
    ? sitemap.urlset.url
    : [sitemap.urlset.url];
  const before = urls.length;
  sitemap.urlset.url = urls.filter((entry) => {
    const loc = entry.loc && entry.loc._text;
    return !loc || !shouldExclude(loc);
  });
  return before - sitemap.urlset.url.length;
}

const tasks = new Listr([
  {
    title: `Check sitemap.xml files exist`,
    task: () => Promise.all(
      sitemapXMLs
        .flat()
        .map((f) => stat(f).then((stat) => (stat.isFile()
          ? Promise.resolve()
          : Promise.reject(new Error(`${f} is not a file`))))),
    ),
  },
  {
    title: `Merge and filter sitemap.xml files`,
    task: () => new Listr(
      sitemapXMLs.map((group) => ({
        title: `Merge ${group[0]}`,
        task: () => Promise.all(
          group.map((f) => readFile(f, 'utf8').then((xml) => xml2js(xml, { compact: true }))),
        )
          .then((sitemaps) => {
            const res = sitemaps[0];
            for (let i = 1; i < sitemaps.length; i += 1) {
              res.urlset.url = [
                ...res.urlset.url,
                ...sitemaps[i].urlset.url,
              ];
            }
            const removed = filterSitemapUrls(res);
            console.log(`  Filtered out ${removed} URLs from ${group[0]}`);
            return res;
          })
          .then((sitemap) => writeFile(group[0], js2xml(sitemap, { compact: true }, 'utf-8'))),
      })),
      { concurrent: sitemapXMLs.length },
    ),
  },
]);

tasks
  .run()
  .then(() => {
    console.log(`[Finish] Generate sitemap.xml`);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
