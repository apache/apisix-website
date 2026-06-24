import React from 'react';

import GuidesHubPage from './_components/GuidesHubPage';
import { apiGatewayGuideSections } from './_components/guideRegistry';

export default function ComparisonHubPage() {
  return (
    <GuidesHubPage
      seo={{
        title: 'API Gateway Guides: Compare, Evaluate, and Migrate | Apache APISIX',
        description: 'Browse Apache APISIX guides for API gateway comparisons, alternatives, migration planning, open-source gateways, Kubernetes gateways, and AI gateways.',
        canonical: 'https://apisix.apache.org/comparison/',
      }}
      eyebrow="API Gateway Guides"
      h1="API Gateway Guides"
      deck="Compare API gateways, explore practical alternatives, and plan migrations to Apache APISIX with source-backed guides for platform and infrastructure teams."
      sections={apiGatewayGuideSections}
    />
  );
}
