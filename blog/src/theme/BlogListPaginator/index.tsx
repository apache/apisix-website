/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
import type { Props } from '@theme/BlogListPaginator';
import clsx from 'clsx';
import { Icon } from '@iconify/react';
import arrowLeft from '@iconify/icons-akar-icons/arrow-left';
import arrowRight from '@iconify/icons-akar-icons/arrow-right';
import style from './style.module.scss';

const iconSize = {
  width: '1.2em',
  height: '1.2em',
};

const BlogListPaginator = (props: Props): JSX.Element => {
  const { metadata } = props;
  const { previousPage, nextPage } = metadata;

  return (
    <nav
      className={clsx('pagination-nav', style.nav)}
      aria-label={translate({
        id: 'theme.blog.paginator.navAriaLabel',
        message: 'Blog list page navigation',
        description: 'The ARIA label for the blog pagination',
      })}
    >
      <div className="pagination-nav__item">
        {previousPage && (
          <Link className="pagination-nav__link" to={previousPage}>
            <div className={clsx('pagination-nav__label', style.alignMiddle)}>
              <Icon icon={arrowLeft} {...iconSize} />
              {' '}
              <Translate
                id="theme.blog.paginator.newerEntries"
                description="The label used to navigate to the newer blog posts page (previous page)"
              >
                Newer Posts
              </Translate>
            </div>
          </Link>
        )}
      </div>
      <div className="pagination-nav__item pagination-nav__item--next">
        {nextPage && (
          <Link className="pagination-nav__link" to={nextPage}>
            <div className={clsx('pagination-nav__label', style.alignMiddle, style.justifyEnd)}>
              <Translate
                id="theme.blog.paginator.olderEntries"
                description="The label used to navigate to the older blog posts page (next page)"
              >
                Older Posts
              </Translate>
              {' '}
              <Icon icon={arrowRight} {...iconSize} />
            </div>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default BlogListPaginator;
