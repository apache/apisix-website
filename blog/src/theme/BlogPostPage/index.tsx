/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { HTMLAttributes } from 'react';
import React from 'react';
import Seo from '@theme/Seo';
import BlogLayout from '@theme/BlogLayout';
import BlogPostItem from '@theme-original/BlogPostItem';
import type { Props } from '@theme-original/BlogPostPage';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ThemeClassNames } from '@docusaurus/theme-common';
import MDXComponents from '@theme-original/MDXComponents';
import type { ImageProps } from 'rc-image';
import Image from 'rc-image';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MDXProvider } from '@mdx-js/react';
import { parseSrcset, stringifySrcset } from 'srcset';
import BlogPostPaginator from '../BlogPostPaginator';

const urlParse = (url: string) => {
  const urlParseArr = url.split('/');
  const name = urlParseArr.at(-1) as string;
  return {
    host: urlParseArr.slice(0, 3).join('/'),
    folderPath: urlParseArr.slice(3, -1).join('/'),
    name,
    ext: name.split('.').at(-1) as string,
  };
};

const imgPropsParse = (
  props: Omit<ImageProps, 'placeholder'>,
  Placeholder: |
    ((props: ImageProps) => JSX.Element) |
    ((props: HTMLAttributes<HTMLImageElement>) => JSX.Element),
): any => {
  const {
    src, srcSet, ...restProps
  } = props;
  const isFromCDN = src?.includes('static.apis');

  if (!isFromCDN || !src || !['png', 'jpg', 'jpeg'].some((s) => src.endsWith(s))) {
    return props;
  }

  const otherProps = {};
  const u = urlParse(src);
  const webpSrc = `${u.host}/apisix-webp/${u.folderPath}/${u.name.replace(u.ext, 'webp')}`;
  const thumbnailWebpSrc = `${u.host}/apisix-thumbnail/${u.folderPath}/${u.name.replace(u.ext, 'webp')}`;

  Object.assign(otherProps, {
    src: webpSrc,
    type: 'image/webp',
    srcSet: stringifySrcset([
      ...parseSrcset(srcSet || ''),
      {
        url: webpSrc,
      }, {
        url: src,
      },
    ]),
    placeholderSrc: thumbnailWebpSrc,
    placeholder: <Placeholder
      {...restProps}
      src={thumbnailWebpSrc}
      srcSet={stringifySrcset([{
        url: thumbnailWebpSrc,
      }, {
        url: `${u.host}/apisix-thumbnail/${u.folderPath}/${u.name}`,
      }])}
    />,
  });

  return { ...restProps, ...otherProps };
};

const components = {
  ...MDXComponents,
  img: (props: ImageProps) => (
    <Image
      {...imgPropsParse(props, (ps) => <Image {...ps} preview={false} />)}
      preview={{ mask: 'Click to Preview' }}
      loading="lazy"
    />
  ),
};

const BlogPostPage = (props: Props): JSX.Element => {
  const { content: BlogPostContents, sidebar } = props;
  const { frontMatter, assets, metadata } = BlogPostContents;
  const {
    title, description, nextItem, prevItem, date, tags, authors,
  } = metadata;
  const { hide_table_of_contents: hideTableOfContents, keywords } = frontMatter;

  const image = assets.image ?? frontMatter.image;

  return (
    <BlogLayout
      wrapperClassName={ThemeClassNames.wrapper.blogPages}
      pageClassName={ThemeClassNames.page.blogPostPage}
      sidebar={sidebar}
      toc={!hideTableOfContents && BlogPostContents.toc ? BlogPostContents.toc : undefined}
      frontMatter={frontMatter}
      metadata={metadata}
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
          <meta property="article:tag" content={tags.map((tag) => tag.label).join(',')} />
        )}
      </Seo>

      <BlogPostItem frontMatter={frontMatter} assets={assets} metadata={metadata} isBlogPostPage>
        <MDXProvider components={components}>
          <BlogPostContents />
        </MDXProvider>
      </BlogPostItem>

      {(nextItem || prevItem) && <BlogPostPaginator nextItem={nextItem} prevItem={prevItem} />}
    </BlogLayout>
  );
};

export { imgPropsParse };
export default BlogPostPage;
