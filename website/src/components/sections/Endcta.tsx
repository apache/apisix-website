import type { FC } from 'react';
import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

import Translate from '@docusaurus/Translate';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import ArrowAnim from '../ArrowAnim';

const EndCTA: FC = () => (
  <div className="endcta" style={{ padding: '50px 0', background: '#FF90A3' }}>
    <div className="endcta-text">
      <p style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center', whiteSpace: 'pre',
      }}
      >
        Try
        <span style={{ color: '#E8433E' }}>
          {' '}
          Apache APISIX
          {' '}
        </span>
        today
        <LazyLoadImage className="rocket" src="https://static.apiseven.com/202202/rocket.gif" alt="Rocket" width="6vw" height="6vw" />
      </p>
    </div>
    <div className="endcta-btns">
      <div className="hero-ctas">
        <Link
          to={useBaseUrl('downloads')}
          className="btn btn-download"
        >
          <Translate id="hero.component.download.btn">Downloads</Translate>
        </Link>
        <ArrowAnim />
      </div>
    </div>
  </div>
);

export default EndCTA;
