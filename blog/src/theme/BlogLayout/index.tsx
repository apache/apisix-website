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

import type {Props} from '@theme/BlogLayout';

function BlogLayout(props: Props): JSX.Element {
  const {sidebar, toc, children, ...layoutProps} = props;
  const hasSidebar = sidebar && sidebar.items.length > 0;

  return (
    <Layout {...layoutProps}>
      {hasSidebar && (
        <aside className="col col--3">
          <BlogSidebar sidebar={sidebar!} />
        </aside>
      )}
      {children}
      {toc && (
        <div className="col col--2">
          <TOC toc={toc} />
        </div>
      )}
    </Layout>
  );
}

export default BlogLayout;
