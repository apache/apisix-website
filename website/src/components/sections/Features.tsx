import type { CSSProperties, FC } from 'react';
import React from 'react';
import Link from '@docusaurus/Link';
import { animated } from 'react-spring';
import Translate from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ArrowAnim from '../ArrowAnim';
import useWindowSize from '../../hooks/useWindowSize';

import styles from '../../css/landing-sections/features.module.scss';

const DashboardPlayground = () => {
  const [width] = useWindowSize();

  if (width < 1025) {
    return null;
  }

  return (
    <Link
      className={styles.dashboardLink}
      to="http://20.210.250.99:9000/user/login/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className={styles.dashboard}>
        <h3 className={styles.dashboardTitle}>Dashboard Playground</h3>

        <div className={styles.dashboardAccount}>
          <div>
            username <span>admin</span>
          </div>
          <div>
            passwd <span>admin</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

interface FeatProps {
  style?: CSSProperties;
}

type Feat = FC<FeatProps>;

const DashboardFeat: Feat = (props) => (
  <animated.div className={styles.feat} {...props}>
    <div className={styles.left}>
      <section>
        <h2>
          <Translate id="features.component.easyDashboard.title">Easy-to-use Dashboard</Translate>
        </h2>
        <div>
          <Translate id="features.component.easyDashboard.message">
            The Apache APISIX Dashboard is designed to make it as easy as possible for users to
            operate Apache APISIX through a frontend interface. It’s opensource and ever evolving,
            feel free to contribute.
          </Translate>
          <div className={styles.action}>
            <Link to={useBaseUrl('downloads')} className="btn btn-download">
              <Translate id="features.component.easyDashboard.downloadBtn">Downloads</Translate>
            </Link>
            <ArrowAnim />
          </div>
        </div>
        <DashboardPlayground />
      </section>
    </div>

    <div className={styles.right}>
      <LazyLoadImage
        src="https://static.apiseven.com/202202/apisix-dashboard.png"
        alt="apisix-dashboard"
      />
    </div>
  </animated.div>
);

const CodeFeat: Feat = (props) => (
  <animated.div className={styles.feat} {...props}>
    <div className={styles.left}>
      <section>
        <h2>
          <Translate id="features.component.userFlexible.title">User Flexible</Translate>
        </h2>
        <p>
          <Translate id="features.component.userFlexible.message">
            The Apache APISIX dashboard is flexible to User demand, providing option to create
            custom modules through code matching your requirements, alongside the existing no-code
            toolchain.
          </Translate>
        </p>
      </section>
    </div>

    <div className={styles.right}>
      <LazyLoadImage src="https://static.apiseven.com/202202/code-sample.png" alt="code-snippet" />
    </div>
  </animated.div>
);

const PluginFeat: Feat = (props) => (
  <animated.div className={styles.feat} {...props}>
    <div className={styles.left}>
      <section>
        <h2>
          <Translate id="features.component.pluginised.title">Pluginised Workflow</Translate>
        </h2>
        <p>
          <Translate id="features.component.pluginised.message">
            No need to reinvent the wheel again and again. Use inbuilt plugins to create high
            performance systems in tight deadlines. For something custom, there is option of
            building custom plugins.
          </Translate>
        </p>
      </section>
    </div>

    <div className={styles.right}>
      <LazyLoadImage
        src="https://static.apiseven.com/202202/pluginised.png"
        alt="plugin-workflow"
      />
    </div>
  </animated.div>
);

const Features: FC = () => (
  <div className={styles.features}>
    <section className={styles.head}>
      <h2>
        <Translate id="features.component.why.title">Why APISIX Gateway?</Translate>
      </h2>
      <h3>
        <Translate id="features.component.why.subtitle">
          Reduce time fighting bugs, focus on designing world-class systems with API Gateway
        </Translate>
      </h3>
      <p>
        <Translate id="features.component.why.message">
          Apache APISIX is the first open-source API Gateway that includes a built-in low-code
          Dashboard, which offers a powerful and flexible UI for developers to use.
        </Translate>
      </p>
    </section>

    <div className={styles.container}>
      <DashboardFeat />
      <CodeFeat />
      <PluginFeat />
    </div>
  </div>
);

export default Features;
