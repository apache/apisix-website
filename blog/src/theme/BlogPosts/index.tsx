/* eslint-disable react/require-default-props, @typescript-eslint/no-explicit-any */
import Link from '@docusaurus/Link';
import type { Props as OldBlogPostItemProps } from '@theme/BlogPostItem';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MDXProvider } from '@mdx-js/react';
import type { ScrollPosition } from 'react-lazy-load-image-component';
import { trackWindowScroll, LazyLoadImage } from 'react-lazy-load-image-component';
import Avvvatars from 'avvvatars-react';
import clsx from 'clsx';
import type {
  FC, HTMLAttributes, DetailedHTMLProps, ImgHTMLAttributes,
} from 'react';
import React from 'react';
import useWindowType from '@theme/hooks/useWindowSize';
import shuffle from 'lodash.shuffle';
import { useLocation } from '@docusaurus/router';
import { translate } from '@docusaurus/Translate';

// pickedPosts will be auto generated
// eslint-disable-next-line import/no-unresolved
import pickedPosts from '../../../config/picked-posts-info';

import 'react-lazy-load-image-component/src/effects/blur.css';
import style from './style.module.scss';
import { imgPropsParse } from '../BlogPostPage';

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

const Placeholder = (props: ImgHTMLAttributes<HTMLImageElement>) => {
  const { title, src, alt } = props;
  const innerStyle = {
    width: 605,
    borderRadius: '1rem',
    backgroundColor: '#d2d2d7',
  };

  if (src?.endsWith('webp')) {
    return (
      <div style={innerStyle}>
        <img {...props} alt={alt} style={innerStyle} />
      </div>
    );
  }
  return (
    <div>
      <noscript>
        <img {...props} alt={title} />
      </noscript>
      <div style={innerStyle} />
    </div>
  );
};

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
    className,
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

  const image = assets?.image ?? frontMatter.image ?? defaultImg;

  return (
    <article
      className={className}
      itemProp="blogPost"
      itemScope
      itemType="http://schema.org/BlogPosting"
    >
      <Link itemProp="url" to={permalink} aria-label={`Read more about ${title}`}>
        <LazyLoadImage
          height={232}
          width={605}
          alt={title}
          {...imgPropsParse({ src: image }, Placeholder)}
          effect={effect}
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
                {authors.map((author) => (author.imageURL ? (
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

type PickedBlogItemProps = Omit<LazyProps, 'scrollPosition'> & {
  info: any;
};

const PickedBlogItem: FC<PickedBlogItemProps> = ({
  info,
  delayMethod,
  delayTime,
  useIntersectionObserver,
}) => (
  <BlogPostItem
    className={style.pickedPosts}
    key={info.title}
    frontMatter={info}
    assets={undefined}
    metadata={info}
    truncated={info.summary}
    {...{ delayMethod, delayTime, useIntersectionObserver }}
  >
    <div className={style.featuredPost}>
      {translate({
        id: 'blog.picked.posts.component.title',
        message: 'Featured',
      })}
    </div>
    <p>{info.summary}</p>
  </BlogPostItem>
);

const BlogPosts: FC<BlogPostsProps> = ({
  items,
  isFirstPage = false,
  scrollPosition,
  delayMethod,
  delayTime,
  useIntersectionObserver,
  ...props
}) => {
  const posts = items.map(({ content: BlogPostContent }) => (
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
  ));

  const max = pickedPosts.length > 10 ? pickedPosts.length - 10 : pickedPosts.length;
  const endIdx = isFirstPage ? 2 * Math.floor(max / 2) : 3;
  const { pathname } = useLocation();

  if (!pathname.includes('/tags/')) {
    if (isFirstPage) {
      posts.splice(
        1,
        0,
        pickedPosts
          .slice(0, endIdx)
          .map((info) => (
            <PickedBlogItem
              key={info.title}
              info={info}
              {...{ delayMethod, delayTime, useIntersectionObserver }}
            />
          )),
      );
    } else {
      const finalPickedPosts = shuffle(pickedPosts).slice(0, endIdx);
      const positions = shuffle(Array.from({ length: 9 }, (_, idx) => idx)).slice(0, 3);
      positions.forEach((fromIdx) => {
        const info = finalPickedPosts.pop();
        posts.splice(
          fromIdx,
          0,
          <PickedBlogItem info={info} {...{ delayMethod, delayTime, useIntersectionObserver }} />,
        );
      });
    }
  }

  return (
    <main
      className={clsx({
        [style.normalPage]: true,
        [style.firstPage]: isFirstPage,
      })}
      itemScope
      {...props}
    >
      {posts}
    </main>
  );
};

export default trackWindowScroll(BlogPosts);
