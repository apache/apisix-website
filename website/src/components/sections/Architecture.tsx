import type { FC } from 'react';
import React from 'react';

import Translate from '@docusaurus/Translate';

import HLDesign from '../../assets/images/infographs/Architecture-min.svg';
import Pattern from '../../assets/images/PatternGrouped-min.svg';
import '../../css/landing-sections/architecture.scss';

const Architecture: FC = () => (
  <div className="arch">
    <Pattern
      className="arch-scale-svg"
      width="100vw"
      style={{
        strokeWidth: '2px',
        opacity: '0.25',
        strokeDasharray: '10000',
        position: 'absolute',
        margin: '0 auto',
        bottom: 0,
        zIndex: -10,
      }}
    />
    <h3 className="arch-head">
      <Translate id="architecture.component.title.name">
        Building for large-scale, high value systems
      </Translate>
    </h3>
    <div className="arch-subtitle">
      <p>
        <Translate id="architecture.component.title.subtitle">
          Apache APISIX provides open source API Gateway to help you manage microservices,
          delivering the ultimate performance, security, and scalable platform for all your APIs and
          microservices.
        </Translate>
      </p>
    </div>
    <div className="arch-card" style={{ position: 'relative' }}>
      <div className="hldesign">
        <HLDesign className="hldesign-graphic" />
      </div>
      <div className="arch-card-caption">
        <p>
          <Translate id="architecture.component.card.caption">
            Apache APISIX is based on NGINX and etcd. Compared with traditional API Gateways, APISIX
            has features like dynamic routing and hot-loading plugins, etc.
          </Translate>
        </p>
      </div>
      <div className="arch-card-border" />
    </div>
  </div>
);

export default Architecture;
