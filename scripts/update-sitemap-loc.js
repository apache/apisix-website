/**
 * This script updates the sitemap.xml file with the correct location
 * See https://github.com/apache/apisix-website/issues/705
*/

const convert = require('xml-js');
const fs = require('fs');

const SITEMAP_XML_PATH = '../website/build/sitemap.xml';
try {
  if (!fs.existsSync(SITEMAP_XML_PATH)) {
    throw new Error(`${SITEMAP_XML_PATH} does not exist`);
  }

  const xml = fs.readFileSync(SITEMAP_XML_PATH, 'utf8');
  const result = JSON.parse(convert.xml2json(xml, { compact: true }));
  result.urlset.url = result.urlset.url.map((item) => {
    // eslint-disable-next-line no-underscore-dangle
    const targetLoc = item.loc._text.endsWith('/') ? item.loc._text : `${item.loc._text}/`;
    return {
      loc: {
        _text: targetLoc,
      },
      changefreq: item.changefreq,
      priority: item.priority,
    };
  });
  fs.writeFileSync(SITEMAP_XML_PATH, convert.json2xml(result, { compact: true, spaces: 4 }), 'utf8');
  console.log(`Updated ${SITEMAP_XML_PATH} successfully`);
} catch (error) {
  console.warn(error);
}
