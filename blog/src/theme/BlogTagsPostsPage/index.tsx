/* eslint-disable import/no-extraneous-dependencies */
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import BlogLayout from '@theme/BlogLayout';
import BlogListPaginator from '@theme/BlogListPaginator';
import type { Props } from '@theme/BlogTagsPostsPage';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import { useBlogTagsPostsPageTitle } from '@docusaurus/theme-common/internal';
import style from './style.module.scss';
import BlogPosts from '../BlogPosts';

const BlogTagsPostsPage = (props: Props): JSX.Element => {
  const {
    tag, items, sidebar, listMetadata,
  } = props;
  const title = useBlogTagsPostsPageTitle(tag);

  return (
    <BlogLayout
      title={title}
      searchMetadata={{
        // assign unique search tag to exclude this page from search results!
        tag: 'blog_tags_posts',
      }}
      sidebar={sidebar}
    >
      <header className={style.header}>
        <h1>{title}</h1>

        <Link href={tag.allTagsPath} className={style.link}>
          <Translate
            id="theme.tags.tagsPageLink"
            description="The label of the link targeting the tag list page"
          >
            View All Tags
          </Translate>
        </Link>
      </header>
      <BlogPosts items={items} />
      <BlogListPaginator metadata={listMetadata} />
    </BlogLayout>
  );
};

export default BlogTagsPostsPage;
