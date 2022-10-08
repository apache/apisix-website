import type { FC } from 'react';
import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Translate from '@docusaurus/Translate';

import BrowserOnly from '@docusaurus/BrowserOnly';
import GitHub from '../../assets/icons/github-logo.svg';
import type { VideoProps } from '../Video';
import style from '../../css/landing-sections/os-promo.module.scss';

const VideoChannel: FC = () => {
  const {
    i18n: { currentLocale },
  } = useDocusaurusContext();

  if (currentLocale.startsWith('zh')) {
    return <a href="https://space.bilibili.com/551921247">哔哩哔哩官方账号</a>;
  }

  return (
    <a href="https://www.youtube.com/channel/UCgPD18cMhOg5rmPVnQhAC8g">
      <Translate id="openSourcePromo.component.link.Youtube">YouTube channel</Translate>
    </a>
  );
};

const videoOptions: VideoProps['options'] = {
  controls: true,
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
    <div className={style.ossPromo}>
      <h3>
        <Translate id="openSourcePromo.component.ossPromo.title">
          Building API Gateway Together
        </Translate>
      </h3>
      <div className={style.ossPromoSubtitle}>
        <p>
          <Translate id="openSourcePromo.component.ossPromo.subtitle1">
            Apache APISIX is open source and ever-growing.
          </Translate>
          <br />
          <Translate id="openSourcePromo.component.ossPromo.subtitle2">
            Contributors are always welcome, reach out to us on GitHub.
          </Translate>
        </p>
      </div>
      <div className={style.ossCta}>
        <GitHub style={{ width: '20px', margin: '0 10px 0 0' }} />
        <a href="https://github.com/apache/apisix">
          <Translate id="openSourcePromo.component.link.Github">Check us out</Translate>
        </a>
      </div>
    </div>
    <div className={style.docsPromo}>
      <div className={style.docsPromoHead}>
        <h3>
          <Translate id="openSourcePromo.component.title">Learn from developers</Translate>
        </h3>
        <div className={style.docsPromoSubtitle}>
          <p>
            <Translate id="openSourcePromo.component.subtitle.fragment1">
              What are microservices? What is an API Gateway? Want to learn Apache APISIX usage, but
              don&apos;t know where to start? Check out our
            </Translate>
            {' '}
            <Link style={{ color: '#e8433e' }} to={useBaseUrl('docs')}>
              <Translate id="openSourcePromo.component.link.docs">Docs.</Translate>
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
        <LazyLoadVideo />
      </div>
    </div>
  </div>
);

export default OpensourcePromo;
