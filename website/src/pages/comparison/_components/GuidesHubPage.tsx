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

const getSectionId = (title: string) => title.toLowerCase().replace(/\s+/g, '-');

const getGuideCount = (section: GuideSection) => (
  section.groups
    ? section.groups.reduce((sum, group) => sum + group.guides.length, 0)
    : section.guides?.length ?? 0
);

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
              Start with a hub page, then move to direct comparisons or alternative shortlists
              when your team has a concrete evaluation path.
            </p>
          </aside>
        </div>
      </section>

      <section className={`${styles.sectionTight} ${styles.pathFinder}`}>
        <p className={styles.kicker}>Find your guide</p>
        <h2 className={styles.heading}>Choose a starting point</h2>
        <p className={styles.sectionIntro}>
          Pick the path that matches the question your team is trying to answer.
        </p>
        <div className={styles.pathGrid}>
          {sections.map((section) => (
            <Link className={styles.pathCard} to={`#${getSectionId(section.title)}`} key={section.title}>
              <span>{section.title}</span>
              <strong>{getGuideCount(section)} guides</strong>
              <p>{section.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {sections.map((section) => (
        <section className={styles.section} id={getSectionId(section.title)} key={section.title}>
          <p className={styles.kicker}>Guide cluster</p>
          <h2 className={styles.heading}>{section.title}</h2>
          <p className={styles.sectionIntro}>{section.description}</p>
          {section.groups ? section.groups.map((group) => (
            <div className={styles.guideGroup} key={group.title}>
              <div className={styles.guideGroupHeader}>
                <h3>{group.title}</h3>
                <p>{group.description}</p>
              </div>
              <div className={styles.guideList}>
                {group.guides.map((guide) => (
                  <Link className={styles.guideListItem} to={guide.href} key={guide.href}>
                    <span>
                      <strong>{guide.title}</strong>
                      <small>{guide.description}</small>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )) : (
            <div className={styles.guideList}>
              {section.guides?.map((guide) => (
                <Link className={styles.guideListItem} to={guide.href} key={guide.href}>
                  <span>
                    <strong>{guide.title}</strong>
                    <small>{guide.description}</small>
                  </span>
                </Link>
              ))}
            </div>
          )}
        </section>
      ))}
    </main>
  </Layout>
);

export default GuidesHubPage;
