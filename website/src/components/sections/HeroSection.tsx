import type { FC } from 'react';
import React from 'react';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';
import '../../css/landing-sections/hero.scss';

const STATS: { value: string; label: JSX.Element }[] = [
  { value: '100+', label: <Translate id="hero.stats.plugins">plugins</Translate> },
  { value: '~18k', label: <Translate id="hero.stats.qps">QPS / core</Translate> },
  { value: '0.2 ms', label: <Translate id="hero.stats.latency">added latency</Translate> },
  { value: 'Apache 2.0', label: <Translate id="hero.stats.license">licensed</Translate> },
];

const HeroSection: FC = () => (
  <header className="hero-sec-wrap">
    <div className="hero-text">
      <span className="hero-eyebrow">
        <Translate id="hero.component.eyebrow">Apache Software Foundation top-level project</Translate>
      </span>
      <h1 className="hero-title">
        <Translate id="hero.component.title.main">The open-source API Gateway & AI Gateway</Translate>
      </h1>
      <p className="hero-subtitle">
        <Translate id="hero.component.subtitle.main">
          High-performance traffic management for APIs, microservices, and LLM workloads —
          dynamic routing, load balancing, authentication, observability, and 100+ plugins.
        </Translate>
      </p>
      <div className="hero-ctas">
        <Link target="_parent" to={useBaseUrl('docs/apisix/getting-started')} className="btn btn-download">
          <Translate id="hero.component.download.btn">Get started</Translate>
        </Link>
        <Link target="_parent" to={useBaseUrl('plugins/')} className="btn btn-secondary">
          <Translate id="hero.component.plugins.btn">Browse 100+ plugins</Translate>
        </Link>
      </div>
      <ul className="hero-stats">
        {STATS.map((stat) => (
          <li className="hero-stats__item" key={stat.value}>
            <span className="hero-stats__value">{stat.value}</span>
            <span className="hero-stats__label">{stat.label}</span>
          </li>
        ))}
      </ul>
    </div>
  </header>
);

export default HeroSection;
