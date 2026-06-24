import React from 'react';
import BlogPostPage from '@theme-original/BlogPostPage';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

/**
 * Wraps the default blog post page to add SEO/GEO structured data to Learning
 * Center articles: Article + BreadcrumbList for every article, and FAQPage when
 * the article declares an `faq` array in its front matter. Other blog instances
 * (events, articles) are rendered untouched.
 */

interface FaqItem {
  q: string;
  a: string;
}

interface BlogAuthor {
  name: string;
  url?: string;
}

interface BlogPostContent {
  metadata: {
    permalink: string;
    title: string;
    description: string;
    date: string;
    authors: BlogAuthor[];
  };
  frontMatter: { faq?: FaqItem[]; image?: string };
  assets: { image?: string };
}

type Props = React.ComponentProps<typeof BlogPostPage>;

const LEARNING_CENTER_PREFIX = '/learning-center/';

const BlogPostPageWrapper = (props: Props): JSX.Element => {
  const { siteConfig } = useDocusaurusContext();
  const siteUrl = siteConfig.url.replace(/\/$/, '');

  const { metadata, frontMatter, assets } = (props as { content: BlogPostContent }).content;
  const {
    permalink, title, description, date, authors,
  } = metadata;

  // Only enrich Learning Center articles; leave other blog instances untouched.
  if (!permalink || !permalink.startsWith(LEARNING_CENTER_PREFIX)) {
    return <BlogPostPage {...props} />;
  }

  // Match the site's canonical form (trailingSlash: true).
  const permalinkWithSlash = permalink.endsWith('/') ? permalink : `${permalink}/`;
  const url = siteUrl + permalinkWithSlash;
  const rawImage = assets.image ?? frontMatter.image;
  const image = rawImage
    ? (rawImage.startsWith('http') ? rawImage : siteUrl + rawImage)
    : undefined;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    datePublished: date,
    dateModified: date,
    ...(image && { image }),
    author:
      authors.length > 0
        ? authors.map((author) => ({
          '@type': 'Person',
          name: author.name,
          ...(author.url && { url: author.url }),
        }))
        : { '@type': 'Organization', name: 'Apache APISIX', url: siteUrl },
    publisher: {
      '@type': 'Organization',
      name: 'Apache APISIX',
      logo: { '@type': 'ImageObject', url: `${siteUrl}/img/logo2.svg` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Learning Center',
        item: `${siteUrl}${LEARNING_CENTER_PREFIX}`,
      },
      { '@type': 'ListItem', position: 3, name: title, item: url },
    ],
  };

  const { faq } = frontMatter;
  const faqSchema = Array.isArray(faq) && faq.length > 0
    ? {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    }
    : null;

  return (
    <>
      <Head>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        {faqSchema && (
          <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        )}
      </Head>
      <BlogPostPage {...props} />
    </>
  );
};

export default BlogPostPageWrapper;
