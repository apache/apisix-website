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
            innerHTML: JSON.stringify([
              {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: 'Apache APISIX',
                url: 'https://apisix.apache.org',
                potentialAction: {
                  '@type': 'SearchAction',
                  target: 'https://apisix.apache.org/search?q={search_term_string}',
                  'query-input': 'required name=search_term_string',
                },
              },
              {
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: 'Apache APISIX',
                url: 'https://apisix.apache.org',
                logo: 'https://apisix.apache.org/img/logo2.svg',
                sameAs: [
                  'https://github.com/apache/apisix',
                  'https://twitter.com/ApacheAPISIX',
                  'https://www.youtube.com/channel/UCgPD18cMhOg5rmPVnQhAC8g',
                ],
              },
            ]),
          },
        ],
      };
    },
  };
};
