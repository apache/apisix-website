/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { FC } from 'react';
import React from 'react';

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import BlogLayout from '@theme/BlogLayout';
import BlogListPaginator from '@theme/BlogListPaginator';
import type { Props } from '@theme/BlogListPage';
import BlogPosts from '../BlogPosts';

const BlogListPage: FC<Props> = (props) => {
  const { metadata, items, sidebar } = props;
  const {
    siteConfig: { title: siteTitle },
  } = useDocusaurusContext();
  const { blogDescription, blogTitle, permalink } = metadata;
  const isBlogOnlyMode = permalink === '/';
  const title = isBlogOnlyMode ? siteTitle : blogTitle;
  // Visible H1 for the blog list page. The default Docusaurus blog index ships
  // without one, which is an on-page SEO gap (every indexable page needs an H1).
  const headingTitle = isBlogOnlyMode ? siteTitle : `${siteTitle} ${blogTitle}`;

  return (
    <BlogLayout
      title={title}
      description={blogDescription}
      searchMetadatas={{
        // assign unique search tag to exclude this page from search results!
        tag: 'blog_posts_list',
      }}
      sidebar={sidebar}
      toc={false}
    >
      <h1 className="margin-bottom--lg">{headingTitle}</h1>
      <BlogPosts
        itemType="http://schema.org/Blog"
        items={items}
        isFirstPage={!metadata.previousPage}
      />
      <BlogListPaginator metadata={metadata} />
    </BlogLayout>
  );
};

export default BlogListPage;
