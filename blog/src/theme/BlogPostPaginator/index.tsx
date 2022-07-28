/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Translate, { translate } from '@docusaurus/Translate';
import Link from '@docusaurus/Link';
import type { Props } from '@theme/BlogPostPaginator';
import clsx from 'clsx';
import style from './style.module.scss';

const BlogPostPaginator = (props: Props): JSX.Element => {
  const { nextItem, prevItem } = props;

  return (
    <nav
      className="pagination-nav docusaurus-mt-lg"
      aria-label={translate({
        id: 'theme.blog.post.paginator.navAriaLabel',
        message: 'Blog post page navigation',
        description: 'The ARIA label for the blog posts pagination',
      })}
    >
      <div className="pagination-nav__item">
        {prevItem && (
          <Link className="pagination-nav__link" to={prevItem.permalink}>
            <div className={clsx('pagination-nav__sublabel', style.sublabel)}>
              <Translate
                id="theme.blog.post.paginator.newerPost"
                description="The blog post button label to navigate to the newer/previous post"
              >
                Newer Post
              </Translate>
            </div>
            <div className="pagination-nav__label">{prevItem.title}</div>
          </Link>
        )}
      </div>
      <div className="pagination-nav__item pagination-nav__item--next">
        {nextItem && (
          <Link className="pagination-nav__link" to={nextItem.permalink}>
            <div className={clsx('pagination-nav__sublabel', style.sublabel)}>
              <Translate
                id="theme.blog.post.paginator.olderPost"
                description="The blog post button label to navigate to the older/next post"
              >
                Older Post
              </Translate>
            </div>
            <div className="pagination-nav__label">{nextItem.title}</div>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default BlogPostPaginator;
