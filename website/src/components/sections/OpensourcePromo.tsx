/* eslint-disable jsx-a11y/media-has-caption */
import type { FC } from 'react';
import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Translate from '@docusaurus/Translate';
import OssCanvas from '../OssCanvas';

import GitHub from '../../assets/icons/github-logo.svg';
import Video from '../Video';
import type { VideoProps } from '../Video';

const VideoChannel: FC = () => {
  const { i18n: { currentLocale } } = useDocusaurusContext();

  if (currentLocale.startsWith('zh')) {
    return (
      <a style={{ color: '#e8433e' }} href="https://space.bilibili.com/551921247">
        哔哩哔哩官方账号
      </a>
    );
  }

  return (
    <a style={{ color: '#e8433e' }} href="https://www.youtube.com/channel/UCgPD18cMhOg5rmPVnQhAC8g">
      <Translate id="openSourcePromo.component.link.Youtube">
        YouTube channel
      </Translate>
    </a>
  );
};

const videoOptions: VideoProps['options'] = {
  controls: true,
  preload: 'none',
  poster: 'https://static.apiseven.com/202202/apisix-video-poster.jpeg',
  sources: [{
    src: 'https://static.apiseven.com/apisix-website/videos/apisix-video/apisix-bobur.m3u8',
    type: 'application/x-mpegURL',
  }],
  width: 640,
  height: 360,
};

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
              What are microservices? What is an API Gateway?
              Want to learn Apache APISIX usage, but don&apos;t know where to start?
              Check out our
            </Translate>
            {' '}
            <Link style={{ color: '#e8433e' }} to={useBaseUrl('docs')}>
              <Translate id="openSourcePromo.component.link.docs">
                Docs.
              </Translate>
            </Link>
          </p>
          <p>
            <Translate id="openSourcePromo.component.subtitle.fragment2">
              Like visual information, check out our
            </Translate>
            {' '}
            <VideoChannel />
            {' '}
            <Translate id="openSourcePromo.component.subtitle.fragment3">
              for detailed tutorials. Subscribe for more.
            </Translate>
          </p>
        </div>
      </div>
      <div className="docs-promo-video">
        <Video options={videoOptions} />
      </div>
    </div>

    <div className="oss-promo">
      <div className="oss-promo-text">
        <h3 className="oss-promo-head">
          <Translate id="openSourcePromo.component.ossPromo.title">
            Building API Gateway together
          </Translate>
        </h3>
        <div className="oss-promo-subtitle" style={{ color: 'rgb(199, 199, 199)' }}>
          <p>
            <strong>
              <Translate id="openSourcePromo.component.ossPromo.subtitle">
                Apache APISIX is open source and ever-growing.
                Contributors are always welcome. Reach out to us on GitHub
              </Translate>
            </strong>
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
