/* eslint-disable react/require-default-props, @typescript-eslint/no-explicit-any */
import Link from '@docusaurus/Link';
import type { Props as OldBlogPostItemProps } from '@theme/BlogPostItem';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MDXProvider } from '@mdx-js/react';
import type { ScrollPosition } from 'react-lazy-load-image-component';
import { trackWindowScroll, LazyLoadImage } from 'react-lazy-load-image-component';
import Avvvatars from 'avvvatars-react';
import clsx from 'clsx';
import type { FC, HTMLAttributes, DetailedHTMLProps } from 'react';
import React from 'react';
import useWindowType from '@theme/hooks/useWindowSize';
import 'react-lazy-load-image-component/src/effects/blur.css';
import style from './style.module.scss';

const components = {
  blockquote: ({ children }) => children,
  p: ({ children }) => <p>{children.length > 200 ? `${children.slice(0, 200)}...` : children}</p>,
  a: ({ children }) => children,
};

const defaultImg = '/img/default-blog-header.jpg';

interface LazyProps {
  scrollPosition: ScrollPosition;
  delayMethod?: string;
  delayTime?: number;
  useIntersectionObserver?: boolean;
}

type BlogPostItemProps = OldBlogPostItemProps & LazyProps;

type BlogPostsProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  items: any;
  isFirstPage?: boolean;
} & LazyProps;

const BlogPostItem: FC<BlogPostItemProps> = (props) => {
  const {
    children,
    frontMatter,
    assets,
    metadata,
    scrollPosition,
    delayMethod,
    delayTime,
    useIntersectionObserver,
  } = props;
  const delayProps = {
    scrollPosition,
    delayMethod,
    delayTime,
    useIntersectionObserver,
  };
  const {
    date, formattedDate, permalink, tags, title, authors,
  } = metadata;
  const windowType = useWindowType();
  const effect = windowType === 'mobile' ? 'opacity' : 'blur';

  const image = assets.image ?? frontMatter.image ?? defaultImg;

  return (
    <article itemProp="blogPost" itemScope itemType="http://schema.org/BlogPosting">
      <Link itemProp="url" to={permalink} aria-label={`Read more about ${title}`}>
        <LazyLoadImage
          height={232}
          width={605}
          src={image}
          alt={title}
          effect={effect}
          placeholder={(
            <div>
              <noscript>
                <img src={image} alt={title} />
              </noscript>
              <div
                style={{
                  width: 605,
                  height: 232,
                  borderRadius: '1rem',
                  backgroundColor: '#d2d2d7',
                }}
              />
            </div>
          )}
          visibleByDefault={image === defaultImg}
          {...delayProps}
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
                    effect={effect}
                    placeholder={(
                      <div>
                        <noscript>
                          <img src={author.name} alt={author.imageURL} />
                        </noscript>
                        <div
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: '50%',
                            backgroundColor: '#d2d2d7',
                          }}
                        />
                      </div>
                      )}
                    {...delayProps}
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

const BlogPosts: FC<BlogPostsProps> = ({
  items,
  isFirstPage = false,
  scrollPosition,
  delayMethod,
  delayTime,
  useIntersectionObserver,
  ...props
}) => (
  <main
    className={clsx({
      [style.normalPage]: true,
      [style.firstPage]: isFirstPage,
    })}
    itemScope
    {...props}
  >
    {items.map(({ content: BlogPostContent }) => (
      <BlogPostItem
        key={BlogPostContent.metadata.permalink}
        frontMatter={BlogPostContent.frontMatter}
        assets={BlogPostContent.assets}
        metadata={BlogPostContent.metadata}
        truncated={BlogPostContent.metadata.truncated}
        {...{ delayMethod, delayTime, useIntersectionObserver }}
      >
        <BlogPostContent />
      </BlogPostItem>
    ))}
  </main>
);

export default trackWindowScroll(BlogPosts);
