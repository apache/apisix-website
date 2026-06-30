import type { FC } from 'react';
import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Translate from '@docusaurus/Translate';

import BrowserOnly from '@docusaurus/BrowserOnly';
import type { VideoProps } from '../Video';
import style from '../../css/landing-sections/os-promo.module.scss';

const VideoChannel: FC = () => {
  const {
    i18n: { currentLocale },
  } = useDocusaurusContext();

  if (currentLocale.startsWith('zh')) {
    return <a href="https://space.bilibili.com/551921247" target="_blank" rel="noopener noreferrer">哔哩哔哩官方账号</a>;
  }

  return (
    <a href="https://www.youtube.com/channel/UCgPD18cMhOg5rmPVnQhAC8g" target="_blank" rel="noopener noreferrer">
      <Translate id="openSourcePromo.component.link.Youtube">YouTube channel</Translate>
    </a>
  );
};

const videoOptions: VideoProps['options'] = {
  controls: true,
  fluid: true,
  preload: 'none',
  poster: 'https://static.apiseven.com/202202/apisix-video-poster.jpeg',
  sources: [
    {
      src: 'https://static.apiseven.com/apisix-website/videos/apisix-video/apisix-bobur.m3u8',
      type: 'application/x-mpegURL',
    },
  ],
  width: 640,
  height: 360,
};

const LazyLoadVideo = () => (
  <BrowserOnly>
    {() => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
      const Video = require('../Video').default;
      return <Video options={videoOptions} />;
    }}
  </BrowserOnly>
);

const OpensourcePromo: FC = () => (
  <div className={style.osPromotion}>
    <div className={style.docsPromo}>
      <div className={style.docsPromoHead}>
        <h3>
          <Translate id="openSourcePromo.component.title">New to Apache APISIX?</Translate>
        </h3>
        <div className={style.docsPromoSubtitle}>
          <p>
            <Translate id="openSourcePromo.component.subtitle.fragment1">
              New to microservices or API gateways? Get up and running with our
            </Translate>
            {' '}
            <Link style={{ color: '#e8433e' }} to={useBaseUrl('docs')} target="_blank" rel="noopener noreferrer">
              <Translate id="openSourcePromo.component.link.docs">Docs.</Translate>
            </Link>
          </p>
          <p>
            <Translate id="openSourcePromo.component.subtitle.fragment2">
              Prefer to learn by watching? Head to our
            </Translate>
            {' '}
            <VideoChannel />
            {' '}
            <Translate id="openSourcePromo.component.subtitle.fragment3">
              for step-by-step video tutorials.
            </Translate>
          </p>
        </div>
      </div>
      <div className={style.docsPromoVideo}>
        <LazyLoadVideo />
      </div>
    </div>
  </div>
);

export default OpensourcePromo;
