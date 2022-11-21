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
import Translate, { translate } from '@docusaurus/Translate';
import { usePluralForm } from '@docusaurus/theme-common';
import style from './style.module.scss';
import BlogPosts from '../BlogPosts';

function useBlogPostsPlural() {
  const { selectMessage } = usePluralForm();
  return (count: number) => selectMessage(
    count,
    translate(
      {
        id: 'theme.blog.post.plurals',
        description:
            'Pluralized label for "{count} posts". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
        message: 'One post|{count} posts',
      },
      { count },
    ),
  );
}

const BlogTagsPostsPage = (props: Props): JSX.Element => {
  const { metadata, items, sidebar } = props;
  const { allTagsPath, name: tagName, count } = metadata;
  const blogPostsPlural = useBlogPostsPlural();
  const title = translate(
    {
      id: 'theme.blog.tagTitle',
      description: 'The title of the page for a blog tag',
      message: '{nPosts} tagged with "{tagName}"',
    },
    { nPosts: blogPostsPlural(count), tagName },
  );

  return (
    <BlogLayout
      title={title}
      searchMetadatas={{
        // assign unique search tag to exclude this page from search results!
        tag: 'blog_tags_posts',
      }}
      sidebar={sidebar}
    >
      <header className={style.header}>
        <h1>{title}</h1>

        <Link href={allTagsPath} className={style.link}>
          <Translate
            id="theme.tags.tagsPageLink"
            description="The label of the link targeting the tag list page"
          >
            View All Tags
          </Translate>
        </Link>
      </header>
      <BlogPosts items={items} />
      <BlogListPaginator metadata={metadata} />
    </BlogLayout>
  );
};

export default BlogTagsPostsPage;
