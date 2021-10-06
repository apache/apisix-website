/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import Layout from '@theme/Layout';
import BlogPostItem from '@theme/BlogPostItem';
import BlogPostPaginator from '@theme/BlogPostPaginator';
import TOC from '@theme/TOC';
import EditThisPage from '@theme/EditThisPage';
import { ThemeClassNames } from '@docusaurus/theme-common';
import Link from '@docusaurus/Link';

import styles from './styles.module.css';

function BlogPostPage(props) {
  const { content: BlogPostContents, sidebar } = props;
  const { frontMatter, metadata } = BlogPostContents;
  const { title, description, nextItem, prevItem, editUrl } = metadata;
  const { hide_table_of_contents: hideTableOfContents } = frontMatter;

  return (
    <Layout
      title={title}
      description={description}
      wrapperClassName={ThemeClassNames.wrapper.blogPages}
      pageClassName={ThemeClassNames.page.blogPostPage}>
      {BlogPostContents && (
        <div className="container margin-vert--lg">
          <div className="row">
            <aside className="col col--3">
              <nav className={styles.sidebar}>
                <h3>{sidebar.title}</h3>
                {sidebar.items.map((item) => {
                  return (
                    <Link key={item.title} href={item.permalink}>
                      <p>{item.title}</p>
                    </Link>
                  )
                })}
              </nav>
            </aside>
            <main className="col col--7">
              <BlogPostItem
                frontMatter={frontMatter}
                metadata={metadata}
                isBlogPostPage>
                <Link onClick={() => history.back()}>
                  Back All
                </Link>
              </BlogPostItem>
              <BlogPostContents />
              <div>{editUrl && <EditThisPage editUrl={editUrl} />}</div>
              {(nextItem || prevItem) && (
                <div className="margin-vert--xl">
                  <BlogPostPaginator nextItem={nextItem} prevItem={prevItem} />
                </div>
              )}
            </main>
            {!hideTableOfContents && BlogPostContents.toc && (
              <div className="col col--2">
                <TOC toc={BlogPostContents.toc} />
              </div>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
}

export default BlogPostPage;
