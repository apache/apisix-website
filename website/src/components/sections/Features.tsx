import type { FC } from 'react';
import React from 'react';
import Translate from '@docusaurus/Translate';

import styles from '../../css/landing-sections/features.module.scss';

const Features: FC = () => (
  <div className={styles.features}>
    <section className={styles.head}>
      <h2>
        <Translate id="features.component.why.title">Why APISIX API Gateway?</Translate>
      </h2>
      <h3>
        <Translate id="features.component.why.subtitle">
          Reduce time fighting bugs, focus on designing world-class systems with API Gateway
        </Translate>
      </h3>
      <p>
        <Translate id="features.component.why.message">
          APISIX API Gateway offers nearly 100 open-source plugins, comprehensive API management
          capabilities, and advanced technical advantages.
        </Translate>
      </p>
    </section>
  </div>
);

export default Features;
