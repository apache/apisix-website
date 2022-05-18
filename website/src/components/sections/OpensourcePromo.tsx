import type { FC } from 'react';
import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

import Translate from '@docusaurus/Translate';
import OssCanvas from '../OssCanvas';

import '../../css/customTheme.css';
import GitHub from '../../assets/icons/github-logo.svg';

const OpensourcePromo: FC = () => (
  <div className="ossPromotion">
    <div className="docs-promo">
      <div className="docs-promo-text">
        <h3 className="docs-promo-head">
          <Translate id="openSourcePromo.component.title">Learn from developers</Translate>
        </h3>
        <div className="docs-promo-subtitle">
          <p>
            <Translate id="openSourcePromo.component.subtitle.fragment1">
              Want to learn Apache APISIX usage, but don&apos;t know where to start. Check out our
            </Translate>
            {' '}
            <Link style={{ color: '#e8433e' }} to={useBaseUrl('docs')}>
              <Translate id="openSourcePromo.component.link.docs">
                docs.
              </Translate>
            </Link>
          </p>
          <p>
            <Translate id="openSourcePromo.component.subtitle.fragment2">
              Like visual information, check out our
            </Translate>
            {' '}
            <a style={{ color: '#e8433e' }} href="https://www.youtube.com/channel/UCgPD18cMhOg5rmPVnQhAC8g">
              <Translate id="openSourcePromo.component.link.Youtube">
                Youtube channel
              </Translate>
            </a>
            {' '}
            <Translate id="openSourcePromo.component.subtitle.fragment3">
              for detailed tutorials. Subscribe for more.
            </Translate>
          </p>
        </div>
      </div>
      <div className="docs-promo-video">
        <video preload="none" src="https://static.apiseven.com/apisix-website/videos/apisix.mp4" loading="lazy" autoPlay poster="" muted loop width="70%" height="auto" controls />
      </div>
    </div>

    <div className="oss-promo">
      <div className="oss-promo-text">
        <h3 className="oss-promo-head">
          <Translate id="openSourcePromo.component.ossPromo.title">
            Be a part of building APISIX
          </Translate>
        </h3>
        <div className="oss-promo-subtitle" style={{ color: 'rgb(199, 199, 199)' }}>
          <p>
            <Translate id="openSourcePromo.component.ossPromo.subtitle">
              Apache APISIX is opensource and ever-growing.
              Contributors are always welcome. Reach out to us on GitHub
            </Translate>
          </p>
          <div className="oss-promo-cta">
            <GitHub style={{ width: '20px', margin: '0 10px 0 0' }} />
            <a href="https://github.com/apache/apisix" style={{ textDecoration: 'none' }}>
              <Translate id="openSourcePromo.component.link.Github">
                Check us out
              </Translate>
            </a>
          </div>
        </div>
      </div>
      <div className="oss-promo-infograph">
        <OssCanvas />
      </div>
    </div>
  </div>
);

export default OpensourcePromo;
