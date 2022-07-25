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
import Link from '@docusaurus/Link';
import type { Props as OldBlogPostItemProps } from '@theme/BlogPostItem';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MDXProvider } from '@mdx-js/react';
import type { ScrollPosition } from 'react-lazy-load-image-component';
import { trackWindowScroll, LazyLoadImage } from 'react-lazy-load-image-component';
import Avvvatars from 'avvvatars-react';
import clsx from 'clsx';
import style from './style.module.scss';

const components = {
  blockquote: ({ children }) => children,
  p: ({ children }) => <p>{children.length > 200 ? `${children.slice(0, 200)}...` : children}</p>,
  a: ({ children }) => children,
};

const defaultImg = '/img/default-blog-header.jpg';

type BlogPostItemProps = OldBlogPostItemProps & {
  scrollPosition: ScrollPosition;
};

type BlogListPageProps = Props & {
  scrollPosition: ScrollPosition;
};

const BlogPostItem: FC<BlogPostItemProps> = (props) => {
  const {
    children, frontMatter, assets, metadata, scrollPosition,
  } = props;
  const {
    date, formattedDate, permalink, tags, title, authors,
  } = metadata;

  const image = assets.image ?? frontMatter.image ?? defaultImg;

  return (
    <article itemProp="blogPost" itemScope itemType="http://schema.org/BlogPosting">
      <Link itemProp="url" to={permalink} aria-label={`Read more about ${title}`}>
        <LazyLoadImage
          height={203}
          width={605}
          src={image}
          alt={title}
          effect="opacity"
          visibleByDefault={image === defaultImg}
          scrollPosition={scrollPosition}
        />
      </Link>
      <div className={style.content}>
        <header>
          {tags.length > 0 && (
            <div className={style.tags}>
              {tags.slice(0, 3).map((tag) => (
                <a key={tag.permalink} href={tag.permalink}>
                  {tag.label}
                </a>
              ))}
            </div>
          )}
          <Link itemProp="url" to={permalink} aria-label={`Read more about ${title}`}>
            <h2>{title}</h2>
            {children && <MDXProvider components={components}>{children}</MDXProvider>}
          </Link>
        </header>
        <footer className={style.footer}>
          {authors.length > 0 && (
            <>
              <div className={style.authors}>
                {authors.reverse().map((author) => (author.imageURL ? (
                  <LazyLoadImage
                    className={style.author}
                    key={author.name}
                    src={author.imageURL}
                    width={32}
                    height={32}
                    scrollPosition={scrollPosition}
                  />
                ) : (
                  <div className={style.author} key={author.name}>
                    <Avvvatars value={author.name as string} />
                  </div>
                )))}
              </div>
              <div className={style.divider}>•</div>
            </>
          )}
          <time dateTime={date} itemProp="datePublished">
            {formattedDate}
          </time>
        </footer>
      </div>
    </article>
  );
};

const BlogListPage: FC<BlogListPageProps> = (props) => {
  const {
    metadata, items, sidebar, scrollPosition,
  } = props;
  const {
    siteConfig: { title: siteTitle },
  } = useDocusaurusContext();
  const { blogDescription, blogTitle, permalink } = metadata;
  const isBlogOnlyMode = permalink === '/';
  const title = isBlogOnlyMode ? siteTitle : blogTitle;

  return (
    <BlogLayout
      title={title}
      description={blogDescription}
      wrapperClassName={clsx({
        [style.normalPage]: true,
        [style.firstPage]: !metadata.previousPage,
      })}
      searchMetadatas={{
        // assign unique search tag to exclude this page from search results!
        tag: 'blog_posts_list',
      }}
      sidebar={sidebar}
      toc={false}
    >
      <main itemScope itemType="http://schema.org/Blog">
        {items.map(({ content: BlogPostContent }) => (
          <BlogPostItem
            key={BlogPostContent.metadata.permalink}
            frontMatter={BlogPostContent.frontMatter}
            assets={BlogPostContent.assets}
            metadata={BlogPostContent.metadata}
            truncated={BlogPostContent.metadata.truncated}
            scrollPosition={scrollPosition}
          >
            <BlogPostContent />
          </BlogPostItem>
        ))}
      </main>
      <BlogListPaginator metadata={metadata} />
    </BlogLayout>
  );
};

export default trackWindowScroll(BlogListPage);
