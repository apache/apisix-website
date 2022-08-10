import type { FC } from 'react';
import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Translate from '@docusaurus/Translate';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import useWindowType from '@theme/hooks/useWindowSize';
import ArrowAnim from '../ArrowAnim';
import style from '../../css/landing-sections/endcta.module.scss';

const EndCTA: FC = () => {
  const windowType = useWindowType();

  return (
    <div className={style.endcta}>
      <p className={style.text}>
        <span>Try </span>
        <span className={style.apisix}>Apache APISIX </span>
        <span>today.</span>
        {windowType === 'desktop' && (
          <LazyLoadImage
            className={style.rocket}
            src="https://static.apiseven.com/202202/rocket.gif"
            alt="Rocket"
            width="6vw"
            height="6vw"
          />
        )}
      </p>
      <div className={style.links}>
        <Link to={useBaseUrl('downloads')} className="btn btn-download">
          <Translate id="hero.component.download.btn">Downloads</Translate>
        </Link>
        <ArrowAnim />
      </div>
    </div>
  );
};

export default EndCTA;
