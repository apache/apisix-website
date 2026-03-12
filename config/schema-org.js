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
              {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Apache APISIX',
                description: 'A dynamic, real-time, high-performance cloud-native API Gateway and AI Gateway.',
                url: 'https://apisix.apache.org',
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'Linux, macOS, Windows',
                license: 'https://www.apache.org/licenses/LICENSE-2.0',
                offers: {
                  '@type': 'Offer',
                  price: '0',
                  priceCurrency: 'USD',
                },
              },
            ]),
          },
        ],
      };
    },
  };
};
