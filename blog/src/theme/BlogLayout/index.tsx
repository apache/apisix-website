/* eslint-disable react/prop-types */

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { FC } from 'react';
import React from 'react';
import Layout from '@theme/Layout';
import BlogSidebar from '@theme/BlogSidebar';
import TOC from '@theme/TOC';
import {
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share';
import useWindowType from '@theme/hooks/useWindowSize';
import type { Props } from '@theme/BlogLayout';
import Link from '@docusaurus/Link';
import Sticky from 'react-stickynode';
import clsx from 'clsx';
import style from './style.module.scss';

const Share = ({ metadata }) => {
  const { title, description, permalink } = metadata;
  const url = `https://apisix.apache.org${permalink}`;
  return (
    <section className={style.shareSection}>
      <h4>Share</h4>
      <div>
        <LinkedinShareButton title={title} summary={description} url={url}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
        <TwitterShareButton url={url} title={title} via="ApacheAPISIX">
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <RedditShareButton title={title} url={url}>
          <RedditIcon size={32} round />
        </RedditShareButton>
      </div>
    </section>
  );
};

const tags = [
  {
    label: 'Case Studies',
    url: '/blog/tags/case-studies/',
  },
  {
    label: 'Ecosystem',
    url: '/blog/tags/ecosystem/',
  },
  {
    label: 'Authentication',
    url: '/blog/tags/authentication/',
  },
  {
    label: 'Plugins',
    url: '/blog/tags/plugins/',
  },
  {
    label: 'Community',
    url: '/blog/tags/community/',
  },
  {
    label: 'Vulnerabilities',
    url: '/blog/tags/vulnerabilities/',
  },
];

const TagsHeader: FC = () => {
  const windowType = useWindowType();
  return (
    <Sticky innerZ={199} className={style.placeholder} enabled={windowType !== 'mobile'}>
      {(s) => (
        <div className={clsx(style.tagsHeader, s.status === Sticky.STATUS_FIXED && style.expand)}>
          {tags.map((tag) => (
            <Link key={tag.url} to={tag.url} target="_parent">
              {tag.label}
            </Link>
          ))}
        </div>
      )}
    </Sticky>
  );
};

const BlogLayout: FC<Props> = (props) => {
  const {
    sidebar, toc, children, metadata, ...layoutProps
  } = props;
  const hasSidebar = sidebar && sidebar.items.length > 0;
  const windowType = useWindowType();

  return (
    <Layout {...layoutProps}>
      <TagsHeader />

      <div className="container margin-vert--lg">
        <div className="row">
          {hasSidebar && (
            <aside className="col col--3">
              <BlogSidebar sidebar={sidebar!} />
            </aside>
          )}
          <div className={clsx({ col: true, 'col--10': toc })}>{children}</div>
          {toc && windowType !== 'mobile' && (
            <div className={clsx('col col--2', style.section)}>
              {metadata && <Share metadata={metadata} />}
              <section className={style.tocSection}>
                <h4>Table of Contents</h4>
                <TOC toc={toc} style={{ position: 'static' }} />
              </section>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default BlogLayout;
