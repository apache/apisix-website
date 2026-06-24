import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';

import type { GuideSection } from './guideRegistry';
import styles from './styles.module.scss';

type GuidesHubPageProps = {
  seo: {
    title: string;
    description: string;
    canonical: string;
  };
  eyebrow: string;
  h1: string;
  deck: string;
  sections: GuideSection[];
};

const GuidesHubPage: React.FC<GuidesHubPageProps> = ({
  seo,
  eyebrow,
  h1,
  deck,
  sections,
}) => (
  <Layout>
    <Head>
      <title>{seo.title}</title>
      <link rel="canonical" href={seo.canonical} />
      <meta name="description" content={seo.description} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:url" content={seo.canonical} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
    </Head>

    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.eyebrow}>{eyebrow}</div>
        <div className={styles.heroGrid}>
          <div>
            <h1>{h1}</h1>
            <p className={styles.dek}>{deck}</p>
            <div className={styles.ctaRow}>
              <Link className={styles.primaryCta} to="/comparison/api-gateway/">Start with the comparison guide</Link>
              <Link className={styles.secondaryCta} to="https://apisix.apache.org/docs/apisix/getting-started/">Get started with APISIX</Link>
            </div>
          </div>
          <aside className={`${styles.heroPanel} ${styles.answerPanel}`}>
            <h2>How to use these guides</h2>
            <p>
              Start with a hub page, then move to direct comparisons, alternatives, or migration guides
              when your team has a concrete evaluation path.
            </p>
          </aside>
        </div>
      </section>

      {sections.map((section) => (
        <section className={styles.section} key={section.title}>
          <p className={styles.kicker}>Guide cluster</p>
          <h2 className={styles.heading}>{section.title}</h2>
          <p className={styles.sectionIntro}>{section.description}</p>
          <div className={styles.guideGrid}>
            {section.guides.map((guide) => (
              <Link className={styles.guideCard} to={guide.href} key={guide.href}>
                <div className={styles.guideMeta}>{guide.priority ?? 'Guide'}</div>
                <h3>{guide.title}</h3>
                <p>{guide.description}</p>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </main>
  </Layout>
);

export default GuidesHubPage;
