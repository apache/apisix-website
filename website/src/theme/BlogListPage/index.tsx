import React from 'react';
import BlogListPage from '@theme-original/BlogListPage';
import Head from '@docusaurus/Head';

/**
 * Wraps the default blog list page so the Learning Center index carries its
 * own meta description. The description passed through Layout props is
 * rendered inside LayoutHead, where the trailing themeConfig `metadatas`
 * block deliberately overrides it with the site-wide default; a <Head>
 * rendered here sits after LayoutHead in the tree, so react-helmet lets it
 * win. Other blog instances (events, articles) are rendered untouched.
 */

type Props = React.ComponentProps<typeof BlogListPage> & {
  metadata: { permalink: string; blogDescription: string };
};

const LEARNING_CENTER_PREFIX = '/learning-center';

const BlogListPageWrapper: React.FC<Props> = (props) => {
  const { metadata } = props;
  const isLearningCenter = metadata.permalink.startsWith(LEARNING_CENTER_PREFIX);

  return (
    <>
      <BlogListPage {...props} />
      {isLearningCenter && metadata.blogDescription && (
        <Head>
          <meta name="description" content={metadata.blogDescription} />
          <meta property="og:description" content={metadata.blogDescription} />
        </Head>
      )}
    </>
  );
};

export default BlogListPageWrapper;
