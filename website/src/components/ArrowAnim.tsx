import type { FC } from 'react';
import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

import Translate from '@docusaurus/Translate';

const ArrowAnim: FC = () => (
  <Link
    to={useBaseUrl('docs')}
    className="btn-docs"
  >
    <div className="goto">
      <Translate id="arrowAnim.component.link.btn">View the docs</Translate>
    </div>
    <div className="arrow">
      <svg width="70%" height="50%" viewBox="0 0 256 256">
        <polygon points="208,128 80,0 52.8,27.2 140.3,128 53,228.9 80,256" />
        <rect x="-256" y="115" width="256" height="30" />
      </svg>
    </div>
  </Link>
);

export default ArrowAnim;
