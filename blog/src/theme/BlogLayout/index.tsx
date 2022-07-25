/* eslint-disable react/prop-types */

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import clsx from 'clsx';
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

import type { Props } from '@theme/BlogLayout';
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

const BlogLayout = (props: Props): JSX.Element => {
  const {
    sidebar, toc, children, metadata, ...layoutProps
  } = props;
  const hasSidebar = sidebar && sidebar.items.length > 0;

  return (
    <Layout {...layoutProps}>
      <div className="container margin-vert--lg">
        <div className="row">
          {hasSidebar && (
            <aside className="col col--3">
              <BlogSidebar sidebar={sidebar!} />
            </aside>
          )}
          <div className="col col--10">{children}</div>
          {toc && (
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
