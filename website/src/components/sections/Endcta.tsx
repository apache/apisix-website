import type { FC } from 'react';
import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

import Translate from '@docusaurus/Translate';

import '../../css/customTheme.css';
import ArrowAnim from '../ArrowAnim';

const EndCTA: FC = () => (
  <div className="endcta" style={{ padding: '50px 0', background: '#FF90A3', margin: '0 0 -32px 0' }}>
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
        <img className="rocket" src="https://raw.githubusercontent.com/apache/apisix-website/master/website/src/assets/images/rocket.gif" alt="Rocket" />
      </p>
    </div>
    <div className="endcta-btns">
      <div className="hero-ctas">
        <Link
          to={useBaseUrl('downloads')}
          className="btn btn-download"
        >
          <Translate id="hero.webpage.download.btn">Downloads</Translate>
        </Link>
        <ArrowAnim />
      </div>
    </div>
  </div>
);

export default EndCTA;
