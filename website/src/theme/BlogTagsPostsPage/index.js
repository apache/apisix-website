/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import BlogPostItem from '@theme/BlogPostItem';
import BlogSidebar from '@theme/BlogSidebar';
import { ThemeClassNames } from '@docusaurus/theme-common'; // Very simple pluralization: probably good enough for now

function BlogTagsPostPage(props) {
  const { metadata, items } = props;
  const { name: tagName } = metadata;
  const [, setTagsCount] = useState();
  const tagsTotal = typeof window !== 'undefined' && JSON.parse(localStorage.getItem('tagsTotal'));

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
            <BlogSidebar count={tagsTotal} />
          </div>
          <main className="col col--9">
            {items.map(({ content: BlogPostContent }) => (
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
