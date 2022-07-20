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
    title: `Merge sitemap.xml files`,
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
