import type { FC } from 'react';
import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Translate from '@docusaurus/Translate';

import BrowserOnly from '@docusaurus/BrowserOnly';
import useWindowType from '@theme/hooks/useWindowSize';
import ArrowAnim from '../ArrowAnim';
import '../../css/landing-sections/hero.scss';

const LazyLoadHeroCanvas = () => {
  const windowType = useWindowType();
  if (windowType === 'mobile') return null;

  return (
    <BrowserOnly>
      {() => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
        const HeroCanvas = require('../HeroCanvas').default;
        return <HeroCanvas />;
      }}
    </BrowserOnly>
  );
};

const HeroSection: FC = () => (
  <div className="hero-sec-wrap" style={{ width: '100%' }}>
    <div className="hero-text">
      <h1 className="hero-title">
        <Translate id="hero.component.title.fragment1">Full Lifecycle API Management</Translate>
      </h1>
      <h2 className="hero-subtitle" style={{ color: '#E8433E', fontSize: 32, fontWeight: 700 }}>
        <Translate id="hero.component.title.fragment2">
          API Gateway, Ingress Controller, etc.
        </Translate>
      </h2>
      <h3 className="hero-subtitle">
        <Translate id="hero.component.subtitle.content">
          Apache APISIX provides rich traffic management features like Load Balancing, Dynamic
          Upstream, Canary Release, Circuit Breaking, Authentication, Observability, etc.
        </Translate>
      </h3>
      <div className="hero-ctas">
        <Link to={useBaseUrl('downloads')} className="btn btn-download">
          <Translate id="hero.component.download.btn">Downloads</Translate>
        </Link>
        <ArrowAnim />
      </div>
    </div>
    <div className="add-margin">
      <LazyLoadHeroCanvas />
    </div>
  </div>
);

export default HeroSection;
