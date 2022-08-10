import type { FC } from 'react';
import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import Translate from '@docusaurus/Translate';

import style from '../../css/landing-sections/home-events.module.scss';

interface EventInfo {
  title: string;
  fileName: string;
}

const Events: FC = () => {
  const { siteConfig } = useDocusaurusContext();
  const events = (siteConfig.customFields.events as EventInfo[]).slice(0, 4).map((event) => {
    const publishTime = event.fileName.slice(0, 10);
    const fileNameArr = event.fileName.split('-');
    const url = `/blog/${fileNameArr.slice(0, 3).join('/')}/${fileNameArr.slice(3).join('-')}`;
    return (
      <a className={style.eventCard} key={event.title} href={url} target="_blank" rel="noreferrer">
        <time dateTime={publishTime}>{publishTime}</time>
        <h4>{event.title}</h4>
        <div>
          Read More
          <div className={style.arrow}>
            <svg width="50%" height="100%" viewBox="0 0 256 256">
              <polygon
                fill="currentcolor"
                points="208,128 80,0 52.8,27.2 140.3,128 53,228.9 80,256"
              />
              <rect fill="currentcolor" x="-256" y="115" width="256" height="30" />
            </svg>
          </div>
        </div>
      </a>
    );
  });

  return <div className={style.events}>{events}</div>;
};

const HomeEventsSection: FC = () => (
  <div className={style.homeEvents}>
    <h3>
      <Translate id="homeEventsSection.component.title">Stay updated about APISIX</Translate>
    </h3>
    <p>
      <Translate id="homeEventsSection.component.subtitle">Some Recent events</Translate>
    </p>
    <Events />
    <div className={style.newsletter}>
      <p>
        <Translate id="homeEventsSection.component.message.news">
          Stay up to date about all Apache APISIX® News,
        </Translate>{' '}
        <a href="/docs/general/join/">
          <Translate id="homeEventsSection.component.link.newsletter">
            subscribe to our newsletter.
          </Translate>
        </a>
      </p>
      <a className={style.newsButton} href="/docs/general/join">
        <Translate id="homeEventsSection.component.link.Subscribe">Subscribe Now</Translate>
      </a>
    </div>
  </div>
);

export default HomeEventsSection;
