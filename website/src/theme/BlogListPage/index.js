/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import BlogPostItem from '@theme/BlogPostItem';
import BlogListPaginator from '@theme/BlogListPaginator';
import BlogSidebar from '@theme/BlogSidebar';
import { ThemeClassNames } from '@docusaurus/theme-common';

import styles from './styles.module.css';

function BlogListPage(props) {
  const { metadata, items, sidebar } = props;
  const {
    siteConfig: { title: siteTitle },
  } = useDocusaurusContext();
  const { blogDescription, blogTitle, permalink } = metadata;
  const isBlogOnlyMode = permalink === '/';
  const title = isBlogOnlyMode ? siteTitle : blogTitle;
  const [tagsCount, setTagsCount] = useState();

  useEffect(() => {
    let totalTags = [];
    items.forEach(item => {
      const tags = item.content.frontMatter.tags;
      if (tags) {
        totalTags = totalTags.concat(tags);
      }
    });
    const tagsCount = {
      All: items.length,
    };
    totalTags.forEach(item => {
      tagsCount[item] = (tagsCount[item] || 0) + 1;
    })
    setTagsCount(tagsCount);
  }, []);

  return (
    <Layout
      title={title}
      description={blogDescription}
      wrapperClassName={ThemeClassNames.wrapper.blogPages}
      pageClassName={ThemeClassNames.page.blogListPage}
      searchMetadatas={{
        // assign unique search tag to exclude this page from search results!
        tag: 'blog_posts_list',
      }}>
      <div className={styles.backgroundBox}></div>
      <div className="container margin-vert--lg">
        <div className={styles.titleBox}>
          <div className="row">
            <div className="col col--12">
              <h1>Blog</h1>
              <span>We love open source.</span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col col--3">
            <BlogSidebar count={tagsCount} />
          </div>
          <main className="col col--9">
            {items.map(({ content: BlogPostContent }) => (
              <BlogPostItem
                key={BlogPostContent.metadata.permalink}
                frontMatter={BlogPostContent.frontMatter}
                metadata={BlogPostContent.metadata}
                truncated={BlogPostContent.metadata.truncated}>
                <BlogPostContent />
              </BlogPostItem>
            ))}
            <BlogListPaginator metadata={metadata} />
          </main>
        </div>
      </div>
    </Layout>
  );
}

export default BlogListPage;
