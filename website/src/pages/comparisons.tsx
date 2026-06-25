import type { FC } from 'react';
import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';

import '../css/comparisons.scss';

interface Comparison {
  title: string;
  description: string;
  to: string;
}

const COMPARISONS: Comparison[] = [
  {
    title: 'Apache APISIX vs Kong',
    description:
      'Architecture, performance benchmarks, plugin ecosystem, Kubernetes support, and when to choose each.',
    to: '/learning-center/apisix-vs-kong/',
  },
  {
    title: 'Apache APISIX vs AWS API Gateway',
    description:
      'Self-hosted open source vs a managed cloud service — architecture, cost at scale, and vendor lock-in.',
    to: '/learning-center/apisix-vs-aws-api-gateway/',
  },
  {
    title: 'Apache APISIX vs NGINX',
    description:
      'APISIX is built on NGINX — what a purpose-built gateway adds over raw NGINX and NGINX Plus.',
    to: '/learning-center/apisix-vs-nginx/',
  },
  {
    title: 'Apache APISIX vs Envoy',
    description:
      'A turnkey API gateway vs a service proxy that needs a separate control plane.',
    to: '/learning-center/apisix-vs-envoy/',
  },
  {
    title: 'Apache APISIX vs Traefik',
    description:
      'Throughput and plugin breadth vs container-native auto-discovery and automatic TLS.',
    to: '/learning-center/apisix-vs-traefik/',
  },
  {
    title: 'Apache APISIX vs Apigee',
    description:
      'An open-source gateway vs a full enterprise API management platform — scope and cost.',
    to: '/learning-center/apisix-vs-apigee/',
  },
  {
    title: 'Open-source API gateways compared',
    description:
      'APISIX vs Kong vs Envoy vs Traefik — a feature-by-feature look at the leading open-source gateways.',
    to: '/learning-center/open-source-api-gateway-comparison/',
  },
  {
    title: 'API gateway vs load balancer',
    description:
      'How an API gateway and a load balancer differ, where they overlap, and when to use each.',
    to: '/learning-center/api-gateway-vs-load-balancer/',
  },
  {
    title: 'Kubernetes API gateway',
    description:
      'Gateway API vs Ingress, ingress controllers, and deploying an API gateway on Kubernetes.',
    to: '/learning-center/kubernetes-api-gateway/',
  },
];

const COLLECTION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Apache APISIX API gateway comparisons',
  url: 'https://apisix.apache.org/comparisons/',
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: COMPARISONS.map((c, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: c.title,
      url: `https://apisix.apache.org${c.to}`,
    })),
  },
};

const Comparisons: FC = () => (
  <Layout>
    <Head>
      <title>
        {translate({ id: 'comparisons.meta.title', message: 'API Gateway Comparisons | Apache APISIX' })}
      </title>
      <meta
        name="description"
        content={translate({
          id: 'comparisons.meta.description',
          message:
            'Compare Apache APISIX with Kong, Envoy, Traefik and other API gateways — architecture, performance, and features.',
        })}
      />
      <link rel="canonical" href="https://apisix.apache.org/comparisons/" />
      <script type="application/ld+json">{JSON.stringify(COLLECTION_SCHEMA)}</script>
    </Head>
    <div className="comparisons">
      <header className="comparisons__header">
        <span className="comparisons__eyebrow">
          <Translate id="comparisons.eyebrow">Comparisons</Translate>
        </span>
        <h1 className="comparisons__title">
          <Translate id="comparisons.title">Compare Apache APISIX</Translate>
        </h1>
        <p className="comparisons__subtitle">
          <Translate id="comparisons.subtitle">
            See how Apache APISIX stacks up against other API gateways and architectures — and pick
            the right tool for your stack.
          </Translate>
        </p>
      </header>
      <div className="comparisons__grid">
        {COMPARISONS.map((comparison) => (
          <Link className="comparisons__card" to={comparison.to} key={comparison.to}>
            <h2 className="comparisons__card-title">{comparison.title}</h2>
            <p className="comparisons__card-desc">{comparison.description}</p>
            <span className="comparisons__card-cta">
              <Translate id="comparisons.card.cta">Read comparison</Translate>
              {' →'}
            </span>
          </Link>
        ))}
      </div>
    </div>
  </Layout>
);

export default Comparisons;
