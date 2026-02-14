import type { FC } from 'react';
import React, { useEffect } from 'react';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';

import BrowserOnly from '@docusaurus/BrowserOnly';
import useWindowType from '@theme/hooks/useWindowSize';
import useBaseUrl from '@docusaurus/useBaseUrl';
import ArrowAnim from '../ArrowAnim';
import '../../css/landing-sections/hero.scss';

const LazyLoadHeroCanvas = () => {
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

const HeroSection: FC = () => {
  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector('.hero-sec-wrap');
      const navbar = document.querySelector('.navbar');
      
      if (heroSection && navbar) {
        const heroRect = heroSection.getBoundingClientRect();
        const isInHeroSection = heroRect.top <= 100 && heroRect.bottom >= 0;
        
        if (isInHeroSection) {
          document.body.classList.add('hero-navbar');
        } else {
          document.body.classList.remove('hero-navbar');
        }
      }
    };

    // Set initial state
    handleScroll();
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.classList.remove('hero-navbar');
    };
  }, []);

  return (
    <div className="hero-sec-wrap" style={{ width: '100%' }}>
      <LazyLoadHeroCanvas />
      <div className="hero-text">
        <h1 className="hero-title">
          <Translate id="hero.component.title.fragment1">API Gateway & AI Gateway for APIs and AI Agents</Translate>
        </h1>
        <h2
          className="hero-subtitle"
          style={{
            color: '#E8433E', fontSize: 32, fontWeight: 700, lineHeight: 1.2,
          }}
        >
          <Translate id="hero.component.title.fragment2">
            Open-Source, Community-Driven, Future-Ready
          </Translate>
        </h2>
        <h3 className="hero-subtitle">
          <Translate id="hero.component.subtitle.content">
            APISIX API Gateway provides rich traffic management features like load balancing, dynamic
            upstream, canary release, circuit breaking, auth, and observability.
          </Translate>
        </h3>
        <div className="hero-ctas">
          <Link target="_parent" to={useBaseUrl('docs/apisix/getting-started')} className="btn btn-download">
            <Translate id="hero.component.download.btn">Getting Started</Translate>
          </Link>
          <ArrowAnim />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
