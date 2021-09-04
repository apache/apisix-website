/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import BlogPostItem from '@theme/BlogPostItem';
import Link from '@docusaurus/Link';
import BlogSidebar from '@theme/BlogSidebar';
import Translate, {translate} from '@docusaurus/Translate';
import {ThemeClassNames, usePluralForm} from '@docusaurus/theme-common'; // Very simple pluralization: probably good enough for now

function BlogTagsPostPage(props) {
  const {metadata, items, sidebar} = props;
  const {allTagsPath, name: tagName, count} = metadata;
  const [tagsCount, setTagsCount] = useState();

  useEffect(() => {
    let totalTags = [];
    items.forEach(item => {
      const tags = item.content.frontMatter.tags;
      if (tags) {
        totalTags = totalTags.concat(tags);
      }
    });
    const tagsCount = {
      All: items.length,
    };
    totalTags.forEach(item => {
      tagsCount[item] = (tagsCount[item] || 0) + 1;
    })
    setTagsCount(tagsCount);
  }, []);

  return (
    <Layout
      title={`Posts tagged "${tagName}"`}
      description={`Blog | Tagged "${tagName}"`}
      wrapperClassName={ThemeClassNames.wrapper.blogPages}
      pageClassName={ThemeClassNames.page.blogTagsPostPage}
      searchMetadatas={{
        // assign unique search tag to exclude this page from search results!
        tag: 'blog_tags_posts',
      }}>
      <div className="container margin-vert--lg">
        <div className="row">
          <div className="col col--3">
            <BlogSidebar count={tagsCount} />
          </div>
          <main className="col col--9">
              {items.map(({content: BlogPostContent}) => (
                <BlogPostItem
                  key={BlogPostContent.metadata.permalink}
                  frontMatter={BlogPostContent.frontMatter}
                  metadata={BlogPostContent.metadata}
                  truncated>
                  <BlogPostContent />
                </BlogPostItem>
              ))}
          </main>
        </div>
      </div>
    </Layout>
  );
}

export default BlogTagsPostPage;
