import type { FC } from 'react';
import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import Translate from '@docusaurus/Translate';

import '../../css/customTheme.css';
import ChevronRight from '../../assets/icons/chevron-right.svg';

interface EventInfo {
  title: string;
  fileName: string;
}

const HomeEventsSection: FC = () => {
  const { siteConfig } = useDocusaurusContext();
  const events = (siteConfig.customFields.events as EventInfo[])
    .slice(0, 4)
    .map((event) => {
      const publishTime = event.fileName.slice(0, 10);
      const splittedFileName = event.fileName.split('-');
      const url = `/blog/${splittedFileName
        .slice(0, 3)
        .join('/')}/${splittedFileName.slice(3).join('-')}`;
      return (
        <div className="event-card" key={event.title}>
          <a className="event-item" href={url} target="_blank" rel="noreferrer">
            <div className="event-card-title">{event.title}</div>
            <div className="event-card-time">{publishTime}</div>
            <div className="event-card-read">
              Read
              {' '}
              <ChevronRight style={{ width: '6px' }} />
            </div>
          </a>
        </div>
      );
    });

  return (
    <div className="news" style={{ padding: '50px 0' }}>
      <div>
        <h3
          className="docs-promo-head"
          style={{ width: '100%', textAlign: 'center', left: '0' }}
        >
          <Translate id="homeEventsSection.component.title">Stay updated about APISIX</Translate>
        </h3>
        <p
          className="docs-promo-subtitle"
          style={{ width: '100%', textAlign: 'center', left: '0' }}
        >
          <Translate id="homeEventsSection.component.subtitle">Some Recent events</Translate>
        </p>
        <div className="event-card-container">{events}</div>
      </div>
      <div className="newsletter">
        <p>
          <Translate id="homeEventsSection.component.message.news">
            Stay up to date about all Apache APISIX™ News, subscribe to our
          </Translate>
          {' '}
          <a href="%">
            <Translate id="homeEventsSection.component.link.newsletter">
              newsletter.
            </Translate>
          </a>
        </p>
        <a className="news-button" href="/docs/general/join">
          <Translate id="homeEventsSection.component.link.Subscribe">
            Subscribe
          </Translate>
        </a>
      </div>
    </div>
  );
};

export default HomeEventsSection;
