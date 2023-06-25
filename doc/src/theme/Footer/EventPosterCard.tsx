import type { FC } from 'react';
import React, { useEffect, useState, useMemo } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import config from './event-poster-card.json';
// eslint-disable-next-line import/no-unresolved, import/extensions
import style from './event-poster-card.module.scss';

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

type StoreCardProps = {
  setShowStore: React.Dispatch<React.SetStateAction<string | boolean>>;
}

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

const EventPosterCardDoc: FC<Omit<EventPosterCardInfo, 'show' | 'expire'> & StoreCardProps> = (props) => {
  const { config: cardConfig, width, setShowStore } = props;
  const {
    i18n: { currentLocale },
  } = useDocusaurusContext();
  const currentConfig = useMemo<CardConfig>(() => cardConfig[currentLocale], [currentLocale]);

  const onClose = () => {
    window.sessionStorage.setItem(SHOW_STORE_KEY, 'false');
    setShowStore(false);
  };

  if (currentConfig?.disable === true) {
    return null;
  }

  return (
    <div className={style.picWrapper}>
      <button
        className={style.closeBtn}
        onClick={onClose}
        type="button"
      >
        <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
          <path
            fill="currentColor"
            d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
          />
        </svg>
      </button>
      <a
        href={currentConfig.link}
        onClick={onClose}
        target="_blank"
        rel="noreferrer"
      >
        <LazyLoadImage
          src={currentConfig.image}
          alt={currentConfig.description}
          width={width}
          style={{ maxWidth: '100vw' }}
        />
      </a>
    </div>
  );
};

const EventPosterCardDocWrapper: FC = () => {
  const { show, expire, ...rest } = config;
  const expireTimestamp = new Date(expire).getTime();
  const [storeShow, setSotreShow] = useState<string | boolean>(true);

  const getShowValue = () => window.sessionStorage.getItem(SHOW_STORE_KEY);

  useEffect(() => {
    // sessionStorage cannot store boolean, use parse to serialize the value
    const showValue = JSON.parse(getShowValue());
    setSotreShow(showValue);
  }, []);

  if (show && storeShow && expireTimestamp > Date.now()) {
    return <EventPosterCardDoc setShowStore={setSotreShow} {...(rest as Omit<EventPosterCardInfo, 'show' | 'expire'>)} />;
  }

  return null;
};

export default EventPosterCardDocWrapper;
