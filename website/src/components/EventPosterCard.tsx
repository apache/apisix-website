import type { FC } from 'react';
import React, { useCallback, useMemo, useEffect } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useSpring, animated } from 'react-spring';
import useSessionStorage from 'react-use/lib/useSessionStorage';
// eslint-disable-next-line import/no-unresolved, import/extensions
import config from '../../../config/event-poster-card.json';
import style from '../css/event-poster-card.module.scss';

type CardConfig =
  | {
      image: string;
      link: string;
      description: string;
      disable?: false;
    }
  | {
      disable: true;
    };

interface EventPosterCardInfo {
  show: boolean;
  expire: string;
  config: {
    en: CardConfig;
    zh: CardConfig;
  };
  width: string | number;
}

const SHOW_STORE_KEY = 'SHOW_EVENT_ENTRY';

const EventPosterCard: FC<Omit<EventPosterCardInfo, 'show' | 'expire'>> = (props) => {
  const { config: cardConfig, width } = props;
  const {
    i18n: { currentLocale },
  } = useDocusaurusContext();
  const currentConfig = useMemo<CardConfig>(() => cardConfig[currentLocale], [currentLocale]);
  const [, setStoreShow] = useSessionStorage(SHOW_STORE_KEY, 'true');

  const [styles, api] = useSpring(() => ({
    from: {
      x: 500,
      opacity: 0,
    },
  }));

  useEffect(() => {
    api.start({
      to: {
        x: 0,
        opacity: 1,
      },
      delay: 800,
    });
  }, []);

  const onClose = useCallback(
    async () => Promise.all(
      api.start({
        to: {
          x: 500,
          opacity: 0,
        },
      }),
    ).then(() => setStoreShow('false')),
    [api],
  );

  if (currentConfig?.disable === true) {
    return null;
  }

  return (
    <animated.div className={style.picWrapper} style={styles}>
      <button className={style.closeBtn} onClick={onClose} type="button">
        <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
          <path
            fill="currentColor"
            d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
          />
        </svg>
      </button>
      <a href={currentConfig.link} onClick={onClose} target="_blank" rel="noreferrer">
        <LazyLoadImage
          src={currentConfig.image}
          alt={currentConfig.description}
          width={width}
          style={{ maxWidth: '100vw' }}
        />
      </a>
    </animated.div>
  );
};

const EventPosterCardWrapper: FC = () => {
  const [storeShow] = useSessionStorage(SHOW_STORE_KEY);
  const { show, expire, ...rest } = config;
  const expireTimestamp = new Date(expire).getTime();

  if (show && !storeShow && expireTimestamp > Date.now()) {
    return <EventPosterCard {...(rest as Omit<EventPosterCardInfo, 'show' | 'expire'>)} />;
  }

  return null;
};

export default EventPosterCardWrapper;
