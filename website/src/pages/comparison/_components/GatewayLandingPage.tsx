import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';

import type { GuideLink } from './guideRegistry';
import styles from './styles.module.scss';

export type Cta = {
  label: string;
  href: string;
};

export type MatrixRow = {
  criterion: string;
  apisix: string;
  other: string;
};

export type OptionCard = {
  name: string;
  summary: string;
  bestFor: string;
  notes: string[];
};

export type InfoCard = {
  title: string;
  body: string;
  bullets?: string[];
};

export type SourceLink = {
  label: string;
  href: string;
};

export type Faq = {
  question: string;
  answer: string;
};

export type GatewayLandingPageData = {
  seo: {
    title: string;
    description: string;
    canonical: string;
  };
  eyebrow: string;
  h1: string;
  deck: string;
  answerTitle: string;
  answer: string;
  chips: string[];
  primaryCta: Cta;
  secondaryCta: Cta;
  panel: {
    title: string;
    body: string;
  };
  cardsTitle: string;
  cardsIntro: string;
  cards: InfoCard[];
  matrixTitle: string;
  matrixIntro: string;
  matrixOtherLabel: string;
  matrixRows: MatrixRow[];
  optionsTitle?: string;
  optionsIntro?: string;
  options?: OptionCard[];
  guidanceTitle: string;
  guidanceIntro: string;
  guidanceCards: InfoCard[];
  resourceLinks?: GuideLink[];
  relatedLinks?: GuideLink[];
  sources: SourceLink[];
  faqs: Faq[];
};

function renderJsonLd(data: GatewayLandingPageData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

const Card: React.FC<{ card: InfoCard }> = ({ card }) => (
  <article className={styles.card}>
    <h3>{card.title}</h3>
    <p>{card.body}</p>
    {card.bullets ? (
      <ul>
        {card.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    ) : null}
  </article>
);

const CtaLink: React.FC<{ cta: Cta; variant: 'primary' | 'secondary' }> = ({ cta, variant }) => (
  <Link className={variant === 'primary' ? styles.primaryCta : styles.secondaryCta} to={cta.href}>
    {cta.label}
  </Link>
);

const GatewayLandingPage: React.FC<{ data: GatewayLandingPageData }> = ({ data }) => (
  <Layout>
    <Head>
      <title>{data.seo.title}</title>
      <link rel="canonical" href={data.seo.canonical} />
      <meta name="description" content={data.seo.description} />
      <meta property="og:title" content={data.seo.title} />
      <meta property="og:description" content={data.seo.description} />
      <meta property="og:url" content={data.seo.canonical} />
      <meta name="twitter:title" content={data.seo.title} />
      <meta name="twitter:description" content={data.seo.description} />
      <script type="application/ld+json">{JSON.stringify(renderJsonLd(data))}</script>
    </Head>

    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.eyebrow}>{data.eyebrow}</div>
        <div className={styles.heroGrid}>
          <div>
            <h1>{data.h1}</h1>
            <p className={styles.dek}>{data.deck}</p>
            <ul className={styles.chips}>
              {data.chips.map((chip) => (
                <li className={styles.chip} key={chip}>{chip}</li>
              ))}
            </ul>
            <div className={styles.ctaRow}>
              <CtaLink cta={data.primaryCta} variant="primary" />
              <CtaLink cta={data.secondaryCta} variant="secondary" />
            </div>
          </div>
          <aside className={`${styles.heroPanel} ${styles.answerPanel}`}>
            <h2>{data.answerTitle}</h2>
            <p>{data.answer}</p>
          </aside>
        </div>
      </section>

      <section className={styles.sectionTight}>
        <div className={styles.heroPanel}>
          <h2>{data.panel.title}</h2>
          <p>{data.panel.body}</p>
        </div>
      </section>

      <section className={styles.section}>
        <p className={styles.kicker}>Evaluation criteria</p>
        <h2 className={styles.heading}>{data.cardsTitle}</h2>
        <p className={styles.sectionIntro}>{data.cardsIntro}</p>
        <div className={styles.grid}>
          {data.cards.map((card) => (
            <Card card={card} key={card.title} />
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <p className={styles.kicker}>Comparison matrix</p>
        <h2 className={styles.heading}>{data.matrixTitle}</h2>
        <p className={styles.sectionIntro}>{data.matrixIntro}</p>
        <div className={styles.matrixWrap}>
          <table className={styles.matrix}>
            <thead>
              <tr>
                <th>Criterion</th>
                <th>Apache APISIX</th>
                <th>{data.matrixOtherLabel}</th>
              </tr>
            </thead>
            <tbody>
              {data.matrixRows.map((row) => (
                <tr key={row.criterion}>
                  <td><strong>{row.criterion}</strong></td>
                  <td className={styles.highlightColumn}>{row.apisix}</td>
                  <td>{row.other}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {data.options ? (
        <section className={styles.section}>
          <p className={styles.kicker}>Alternative shortlist</p>
          <h2 className={styles.heading}>{data.optionsTitle}</h2>
          <p className={styles.sectionIntro}>{data.optionsIntro}</p>
          <div className={styles.grid}>
            {data.options.map((option, index) => (
              <article className={styles.card} key={option.name}>
                <h3><span className={styles.rank}>{index + 1}</span>{option.name}</h3>
                <p>{option.summary}</p>
                <ul>
                  {option.notes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
                <div className={styles.bestFor}>{option.bestFor}</div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className={styles.section}>
        <p className={styles.kicker}>Decision guide</p>
        <h2 className={styles.heading}>{data.guidanceTitle}</h2>
        <p className={styles.sectionIntro}>{data.guidanceIntro}</p>
        <div className={styles.gridTwo}>
          {data.guidanceCards.map((card) => (
            <Card card={card} key={card.title} />
          ))}
        </div>
      </section>

      {data.resourceLinks ? (
        <section className={styles.sectionTight}>
          <div className={styles.resourcePanel}>
            <div>
              <p className={styles.kicker}>Open-source next steps</p>
              <h2>Continue with Apache APISIX resources</h2>
              <p>
                Move from evaluation to hands-on testing with documentation, plugins,
                Kubernetes resources, GitHub, and community channels.
              </p>
            </div>
            <div className={styles.resourceLinks}>
              {data.resourceLinks.map((resource) => (
                <Link className={styles.resourceLink} to={resource.href} key={resource.href}>
                  <strong>{resource.title}</strong>
                  <span>{resource.description}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {data.relatedLinks ? (
        <section className={styles.section}>
          <p className={styles.kicker}>Related guides</p>
          <h2 className={styles.heading}>Continue comparing API gateway options</h2>
          <p className={styles.sectionIntro}>
            Use these related pages to move from broad comparison to alternatives or APISIX evaluation.
          </p>
          <div className={styles.guideGrid}>
            {data.relatedLinks.map((guide) => (
              <Link className={styles.guideCard} to={guide.href} key={guide.href}>
                <h3>{guide.title}</h3>
                <p>{guide.description}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section className={styles.section}>
        <div className={styles.sourcePanel}>
          <p className={styles.kicker}>Source notes</p>
          <h2 className={styles.heading}>Data used for this comparison</h2>
          <p className={styles.sectionIntro}>
            This page uses official product documentation and project pages where possible. It avoids vendor benchmark claims unless a reader can verify them independently.
          </p>
          <ul className={styles.sourceList}>
            {data.sources.map((source) => (
              <li key={source.href}>
                <a href={source.href} target="_blank" rel="noreferrer">{source.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.section}>
        <p className={styles.kicker}>FAQ</p>
        <h2 className={styles.heading}>Common questions</h2>
        <div className={styles.faqGrid}>
          {data.faqs.map((faq) => (
            <article className={styles.faqItem} key={faq.question}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  </Layout>
);

export default GatewayLandingPage;
