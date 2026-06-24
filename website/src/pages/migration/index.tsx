import React from 'react';

import GuidesHubPage from '../comparison/_components/GuidesHubPage';
import { migrationSections } from '../comparison/_components/guideRegistry';

export default function MigrationHubPage() {
  return (
    <GuidesHubPage
      seo={{
        title: 'API Gateway Migration Guides | Apache APISIX',
        description: 'Browse Apache APISIX migration guides for Kong, NGINX, Tyk, Apigee, and AWS API Gateway evaluation and migration planning.',
        canonical: 'https://apisix.apache.org/migration/',
      }}
      eyebrow="Migration Guides"
      h1="API Gateway Migration Guides"
      deck="Plan practical migrations to Apache APISIX by mapping routes, policies, authentication, traffic control, observability, Kubernetes workflows, and rollout strategy."
      sections={migrationSections}
    />
  );
}
