module.exports = function () {
  return {
    name: 'schema-org',
    injectHtmlTags() {
      return {
        headTags: [
          {
            tagName: 'script',
            attributes: {
              type: 'application/ld+json',
            },
            innerHTML: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Apache APISIX',
              url: 'https://apisix.apache.org',
            }),
          },
        ],
      };
    },
  };
};
