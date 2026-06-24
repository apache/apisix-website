import React from 'react';

import GuidesHubPage from '../comparison/_components/GuidesHubPage';
import { alternativeSections } from '../comparison/_components/guideRegistry';

export default function AlternativesHubPage() {
  return (
    <GuidesHubPage
      seo={{
        title: 'API Gateway Alternatives | Apache APISIX',
        description: 'Browse API gateway alternative guides for Kong, Tyk, Apigee, AWS API Gateway, NGINX, Traefik, Envoy, and Gravitee.',
        canonical: 'https://apisix.apache.org/alternatives/',
      }}
      eyebrow="Alternative Guides"
      h1="API Gateway Alternatives"
      deck="Explore alternatives to common API gateways, API management platforms, ingress controllers, and proxy foundations from an Apache APISIX open-source perspective."
      sections={alternativeSections}
    />
  );
}
