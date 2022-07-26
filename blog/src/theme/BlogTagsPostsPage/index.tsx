/* eslint-disable import/no-extraneous-dependencies */
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { FC } from 'react';
import React from 'react';

import BlogLayout from '@theme/BlogLayout';
import BlogListPaginator from '@theme/BlogListPaginator';
import type { Props } from '@theme/BlogTagsPostsPage';
import Link from '@docusaurus/Link';
import type { Props as BlogPostItemProps } from '@theme/BlogPostItem';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MDXProvider } from '@mdx-js/react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Avvvatars from 'avvvatars-react';
import Translate, { translate } from '@docusaurus/Translate';
import { usePluralForm } from '@docusaurus/theme-common';
import style from './style.module.scss';

const components = {
  blockquote: ({ children }) => children,
  p: ({ children }) => <p>{children.length > 200 ? `${children.slice(0, 200)}...` : children}</p>,
  a: ({ children }) => children,
};

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

const BlogPostItem: FC<BlogPostItemProps> = (props) => {
  const {
    children, frontMatter, assets, metadata,
  } = props;
  const {
    date, formattedDate, permalink, tags, title, authors,
  } = metadata;

  const image = assets.image ?? frontMatter.image ?? '/img/default-blog-header.jpg';

  return (
    <article itemProp="blogPost" itemScope itemType="http://schema.org/BlogPosting">
      <Link itemProp="url" to={permalink} aria-label={`Read more about ${title}`}>
        <LazyLoadImage src={image} alt={title} height={203} width={384} />
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
                  />
                ) : (
                  <div className={style.author}>
                    <Avvvatars key={author.name} value={author.name as string} />
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
      wrapperClassName={style.normalPage}
      searchMetadatas={{
        // assign unique search tag to exclude this page from search results!
        tag: 'blog_tags_posts',
      }}
      sidebar={sidebar}
    >
      <header className={style.header}>
        <h1>{title}</h1>

        <Link href={allTagsPath}>
          <Translate
            id="theme.tags.tagsPageLink"
            description="The label of the link targeting the tag list page"
          >
            View All Tags
          </Translate>
        </Link>
      </header>
      <main itemScope>
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

export default BlogTagsPostsPage;
