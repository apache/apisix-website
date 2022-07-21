/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Seo from '@theme/Seo';
import BlogLayout from '@theme-original/BlogLayout';
import BlogPostItem from '@theme-original/BlogPostItem';
import BlogPostPaginator from '@theme-original/BlogPostPaginator';
import type { Props } from '@theme-original/BlogPostPage';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ThemeClassNames } from '@docusaurus/theme-common';
import MDXComponents from '@theme-original/MDXComponents';
import type { ImageProps } from 'rc-image';
import Image from 'rc-image';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MDXProvider } from '@mdx-js/react';
import { LazyLoadComponent } from 'react-lazy-load-image-component';

const components = {
  ...MDXComponents,
  img: (props: ImageProps) => (
    <LazyLoadComponent>
      <Image {...props} preview={{ mask: 'Click to Preview' }} />
    </LazyLoadComponent>
  ),
};

const BlogPostPage = (props: Props): JSX.Element => {
  const { content: BlogPostContents, sidebar } = props;
  const { frontMatter, assets, metadata } = BlogPostContents;
  const {
    title,
    description,
    nextItem,
    prevItem,
    date,
    tags,
    authors,
  } = metadata;
  const { hide_table_of_contents: hideTableOfContents, keywords } = frontMatter;

  const image = assets.image ?? frontMatter.image;

  return (
    <BlogLayout
      wrapperClassName={ThemeClassNames.wrapper.blogPages}
      pageClassName={ThemeClassNames.page.blogPostPage}
      sidebar={sidebar}
      toc={
        !hideTableOfContents && BlogPostContents.toc
          ? BlogPostContents.toc
          : undefined
      }
    >
      <Seo
        // TODO refactor needed: it's a bit annoying but Seo MUST be inside BlogLayout
        // otherwise  default image (set by BlogLayout) would shadow the custom blog post image
        title={title}
        description={description}
        keywords={keywords}
        image={image}
      >
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={date} />

        {/* TODO double check those article metas array syntaxes, see https://ogp.me/#array */}
        {authors.some((author) => author.url) && (
          <meta
            property="article:author"
            content={authors
              .map((author) => author.url)
              .filter(Boolean)
              .join(',')}
          />
        )}
        {tags.length > 0 && (
          <meta
            property="article:tag"
            content={tags.map((tag) => tag.label).join(',')}
          />
        )}
      </Seo>

      <BlogPostItem
        frontMatter={frontMatter}
        assets={assets}
        metadata={metadata}
        isBlogPostPage
      >
        <MDXProvider components={components}>
          <BlogPostContents />
        </MDXProvider>
      </BlogPostItem>

      {(nextItem || prevItem) && (
        <BlogPostPaginator nextItem={nextItem} prevItem={prevItem} />
      )}
    </BlogLayout>
  );
};

export default BlogPostPage;
