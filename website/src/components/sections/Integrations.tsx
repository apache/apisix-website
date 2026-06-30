import type { FC } from 'react';
import React from 'react';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';

import '../../css/landing-sections/integrations.scss';

interface Integration {
  name: string;
  /** Plugin name whose brand-colored icon lives in the shared plugin sprite. */
  icon?: string;
  /** Colored logo served from /img/integrations/ (for non-plugin ecosystem logos). */
  logo?: string;
  /** Doc link. Falls back to the plugin doc derived from `icon`. */
  href?: string;
}

const GROUPS: { title: string; items: Integration[] }[] = [
  {
    title: 'Observability & tracing',
    items: [
      { name: 'Prometheus', icon: 'prometheus' },
      { name: 'Grafana', logo: '/img/integrations/grafana.svg', href: '/docs/apisix/plugins/prometheus/' },
      { name: 'Datadog', icon: 'datadog' },
      { name: 'OpenTelemetry', logo: '/img/integrations/opentelemetry.svg', href: '/docs/apisix/plugins/opentelemetry/' },
      { name: 'Apache SkyWalking', icon: 'skywalking' },
      { name: 'Zipkin', icon: 'zipkin' },
    ],
  },
  {
    title: 'Logging & data',
    items: [
      { name: 'Elasticsearch', logo: '/img/integrations/elasticsearch.svg', href: '/docs/apisix/plugins/elasticsearch-logger/' },
      { name: 'ClickHouse', logo: '/img/integrations/clickhouse.svg', href: '/docs/apisix/plugins/clickhouse-logger/' },
      { name: 'Google Cloud', icon: 'google-cloud-logging' },
    ],
  },
  {
    title: 'Streaming & protocols',
    items: [
      { name: 'Apache Kafka', icon: 'kafka-logger' },
      { name: 'gRPC', icon: 'grpc-transcode' },
    ],
  },
  {
    title: 'Service discovery & runtime',
    items: [
      { name: 'Kubernetes', logo: '/img/integrations/kubernetes.svg', href: '/docs/apisix/discovery/kubernetes/' },
      { name: 'Consul', logo: '/img/integrations/consul.svg', href: '/docs/apisix/discovery/consul/' },
      { name: 'NGINX', logo: '/img/integrations/nginx.svg', href: '/docs/apisix/architecture-design/apisix/' },
      { name: 'Redis', logo: '/img/integrations/redis.svg', href: '/docs/apisix/plugins/limit-count/' },
    ],
  },
  {
    title: 'Security & secrets',
    items: [
      { name: 'OpenID Connect', icon: 'openid-connect' },
      { name: 'Keycloak', icon: 'authz-keycloak' },
      { name: 'Casbin', icon: 'authz-casbin' },
      { name: 'HashiCorp Vault', logo: '/img/integrations/vault.svg', href: '/docs/apisix/terminology/secret/' },
    ],
  },
  {
    title: 'AI & LLM providers',
    items: [
      { name: 'OpenAI', href: '/docs/apisix/plugins/ai-proxy/' },
      { name: 'Anthropic', href: '/docs/apisix/plugins/ai-proxy/' },
      { name: 'AWS Bedrock', href: '/docs/apisix/plugins/ai-proxy/' },
      { name: 'DeepSeek', href: '/docs/apisix/plugins/ai-proxy/' },
      { name: 'Ollama', href: '/docs/apisix/plugins/ai-proxy/' },
    ],
  },
];

const IntegrationTile: FC<{ item: Integration }> = ({ item }) => {
  const href = item.href ?? (item.icon ? `/docs/apisix/plugins/${item.icon}/` : undefined);
  const inner = (
    <>
      {item.logo ? (
        <img className="integrations__img" src={item.logo} alt={item.name} loading="lazy" width={30} height={30} />
      ) : item.icon ? (
        <svg className="integrations__icon" aria-hidden="true">
          <use xlinkHref={`#icon${item.icon}`} />
        </svg>
      ) : null}
      <span className="integrations__name">{item.name}</span>
    </>
  );
  return href ? (
    <Link className="integrations__tile" to={href} title={item.name} target="_blank" rel="noopener noreferrer">
      {inner}
    </Link>
  ) : (
    <div className="integrations__tile" title={item.name}>
      {inner}
    </div>
  );
};

const Integrations: FC = () => (
  <section className="integrations" aria-labelledby="integrations-heading">
    <Head>
      {/* Injects the shared plugin icon sprite used by #icon<name> references. */}
      <script src="/js/plugin-icon.js" defer />
    </Head>
    <h2 id="integrations-heading" className="integrations__heading">
      <Translate id="home.integrations.title">Integrates with your stack</Translate>
    </h2>
    <p className="integrations__subtitle">
      <Translate id="home.integrations.subtitle">
        Connect APISIX to your observability, security, service discovery, and AI tools through 100+ plugins.
      </Translate>
    </p>
    <div className="integrations__tiles">
      {GROUPS.flatMap((group) => group.items).map((item) => (
        <IntegrationTile item={item} key={item.name} />
      ))}
    </div>
    <Link className="integrations__cta" to="/plugins/" target="_blank" rel="noopener noreferrer">
      <Translate id="home.integrations.cta">Explore all 100+ plugins</Translate>
      {' →'}
    </Link>
  </section>
);

export default Integrations;
