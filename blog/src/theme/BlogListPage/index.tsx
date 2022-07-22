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
import Translate, { translate } from '@docusaurus/Translate';
import Link from '@docusaurus/Link';
import { useBaseUrlUtils } from '@docusaurus/useBaseUrl';
import { usePluralForm } from '@docusaurus/theme-common';
import type { Props as BlogPostItemProps } from '@theme/BlogPostItem';
import BlogPostAuthors from '@theme/BlogPostAuthors';
import TagsListInline from '@theme/TagsListInline';
import { MDXProvider } from '@mdx-js/react';
import MDXComponents from '@theme/MDXComponents';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Avvvatars from 'avvvatars-react';
import style from './style.module.scss';

const components = {
  blockquote: ({ children }) => children,
  p: ({ children }) => <p>{children.length > 200 ? `${children.slice(0, 200)}...` : children}</p>,
  a: ({ children }) => children,
};

function useReadingTimePlural() {
  const { selectMessage } = usePluralForm();
  return (readingTimeFloat: number) => {
    const readingTime = Math.ceil(readingTimeFloat);
    return selectMessage(
      readingTime,
      translate(
        {
          id: 'theme.blog.post.readingTime.plurals',
          description:
            'Pluralized label for "{readingTime} min read". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
          message: 'One min read|{readingTime} min read',
        },
        { readingTime },
      ),
    );
  };
}

const BlogPostItem: FC<BlogPostItemProps> = (props) => {
  const readingTimePlural = useReadingTimePlural();
  const { withBaseUrl } = useBaseUrlUtils();
  const {
    children,
    frontMatter,
    assets,
    metadata,
    truncated,
  } = props;
  const {
    date,
    formattedDate,
    permalink,
    tags,
    readingTime,
    title,
    authors,
  } = metadata;

  const image = assets.image ?? frontMatter.image ?? '/img/default-blog-header.jpg';

  return (
    <article
      itemProp="blogPost"
      itemScope
      itemType="http://schema.org/BlogPosting"
    >
      <Link itemProp="url" to={permalink} aria-label={`Read more about ${title}`}>
        <LazyLoadImage src={image} alt={title} height={203} width={384} />
      </Link>
      <div className={style.content}>
        <Link itemProp="url" to={permalink} aria-label={`Read more about ${title}`}>
          <header>
            {tags.length > 0 && (
              <div className={style.tags}>
                {tags.slice(0, 3).map((tag) => (
                  <a key={tag.permalink} href={tag.permalink}>
                    #
                    {tag.label}
                  </a>
                ))}
              </div>
            )}
            <h2>{title}</h2>
            {children && <MDXProvider components={components}>{children}</MDXProvider>}
          </header>
        </Link>
        <footer className={style.footer}>
          {authors.length > 0
            && (
              <>
                <div className={style.authors}>
                  {authors.map((author) => (
                    author.imageURL
                      ? (
                        <LazyLoadImage
                          className={style.author}
                          key={author.name}
                          src={author.imageURL}
                        />
                      )
                      : (
                        <div className={style.author}>
                          <Avvvatars
                            key={author.name}
                            value={author.name as string}
                          />
                        </div>
                      )
                  ))}
                </div>
                <div className={style.divider}>•</div>
              </>
            )}
          <time dateTime={date} itemProp="datePublished">{formattedDate}</time>
        </footer>
      </div>
    </article>
  );
};

const BlogListPage = (props: Props): JSX.Element => {
  const { metadata, items, sidebar } = props;
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
      wrapperClassName={style.normalPage}
      searchMetadatas={{
        // assign unique search tag to exclude this page from search results!
        tag: 'blog_posts_list',
      }}
      sidebar={sidebar}
    >
      <main
        itemScope
        itemType="http://schema.org/Blog"
      >
        {items.map(({ content: BlogPostContent }) => (
          <BlogPostItem
            key={BlogPostContent.metadata.permalink}
            frontMatter={BlogPostContent.frontMatter}
            assets={BlogPostContent.assets}
            metadata={BlogPostContent.metadata}
            truncated={BlogPostContent.metadata.truncated}
          >
            <BlogPostContent />
          </BlogPostItem>
        ))}
      </main>
      <BlogListPaginator metadata={metadata} />
    </BlogLayout>
  );
};

export default BlogListPage;
