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
  /**
   * Optional logo URL, for ecosystem logos that are not plugin icons (e.g.
   * Kubernetes, OpenTelemetry, LLM providers). Host official colored SVGs on
   * the API7 CDN and set this; it takes precedence over `icon`.
   */
  logo?: string;
  /** Doc link. Defaults to the plugin's doc page derived from `icon`. */
  href?: string;
}

const GROUPS: { title: string; items: Integration[] }[] = [
  {
    title: 'Observability & tracing',
    items: [
      { name: 'Prometheus', icon: 'prometheus' },
      { name: 'Datadog', icon: 'datadog' },
      { name: 'Apache SkyWalking', icon: 'skywalking' },
      { name: 'Zipkin', icon: 'zipkin' },
      { name: 'Google Cloud', icon: 'google-cloud-logging' },
    ],
  },
  {
    title: 'Authentication & security',
    items: [
      { name: 'OpenID Connect', icon: 'openid-connect' },
      { name: 'Keycloak', icon: 'authz-keycloak' },
      { name: 'Casbin', icon: 'authz-casbin' },
    ],
  },
  {
    title: 'Streaming & protocols',
    items: [
      { name: 'Apache Kafka', icon: 'kafka-logger' },
      { name: 'gRPC', icon: 'grpc-transcode' },
    ],
  },
];

const IntegrationTile: FC<{ item: Integration }> = ({ item }) => {
  const href = item.href ?? (item.icon ? `/docs/apisix/plugins/${item.icon}/` : undefined);
  const inner = (
    <>
      {item.logo ? (
        <img className="integrations__img" src={item.logo} alt={item.name} loading="lazy" width={40} height={40} />
      ) : (
        <svg className="integrations__icon" aria-hidden="true">
          <use xlinkHref={`#icon${item.icon}`} />
        </svg>
      )}
      <span className="integrations__name">{item.name}</span>
    </>
  );
  return href ? (
    <Link className="integrations__tile" to={href} title={item.name}>
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
        Connect APISIX to your observability, security, and streaming tools through 100+ plugins.
      </Translate>
    </p>
    <div className="integrations__groups">
      {GROUPS.map((group) => (
        <div className="integrations__group" key={group.title}>
          <div className="integrations__group-title">{group.title}</div>
          <div className="integrations__tiles">
            {group.items.map((item) => (
              <IntegrationTile item={item} key={item.name} />
            ))}
          </div>
        </div>
      ))}
    </div>
    <Link className="integrations__cta" to="/plugins/">
      <Translate id="home.integrations.cta">Explore all 100+ plugins</Translate>
      {' →'}
    </Link>
  </section>
);

export default Integrations;
