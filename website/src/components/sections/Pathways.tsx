import type { FC } from 'react';
import React from 'react';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';

import '../../css/landing-sections/pathways.scss';

interface Pathway {
  id: string;
  title: JSX.Element;
  description: JSX.Element;
  cta: JSX.Element;
  to: string;
}

const PATHWAYS: Pathway[] = [
  {
    id: 'build',
    to: '/docs/apisix/getting-started/',
    title: <Translate id="home.pathways.build.title">Get started</Translate>,
    description: (
      <Translate id="home.pathways.build.desc">
        Install APISIX and configure your first route in minutes.
      </Translate>
    ),
    cta: <Translate id="home.pathways.build.cta">Read the docs</Translate>,
  },
  {
    id: 'learn',
    to: '/learning-center/',
    title: <Translate id="home.pathways.learn.title">Learn the concepts</Translate>,
    description: (
      <Translate id="home.pathways.learn.desc">
        API gateway, AI gateway, rate limiting, mTLS, Kubernetes and more.
      </Translate>
    ),
    cta: <Translate id="home.pathways.learn.cta">Explore the learning center</Translate>,
  },
  {
    id: 'case-studies',
    to: '/blog/tags/case-studies/',
    title: <Translate id="home.pathways.cases.title">Case studies</Translate>,
    description: (
      <Translate id="home.pathways.cases.desc">
        See how teams run Apache APISIX in production at scale.
      </Translate>
    ),
    cta: <Translate id="home.pathways.cases.cta">Read case studies</Translate>,
  },
];

const Pathways: FC = () => (
  <section className="pathways" aria-label="Get started with Apache APISIX">
    {PATHWAYS.map((pathway) => (
      <Link className="pathways__card" to={pathway.to} key={pathway.id}>
        <h3 className="pathways__title">{pathway.title}</h3>
        <p className="pathways__desc">{pathway.description}</p>
        <span className="pathways__cta">
          {pathway.cta}
          {' →'}
        </span>
      </Link>
    ))}
  </section>
);

export default Pathways;
