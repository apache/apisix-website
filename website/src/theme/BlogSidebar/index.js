/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import { useHistory } from '@docusaurus/router';

export default function BlogSidebar({count}) {
  const [ selected, setSelected ] = useState();
  const history = useHistory();
  const path = history.location.pathname.split('/');

  useEffect(() => {
    if (path.length === 2) {
      setSelected('All');
    } else if (path.length === 4) {
      if (path[3].indexOf('-') !== -1) {
        setSelected(path[3].replace('-', ' '));
      } else {
        setSelected(path[3]);
      }
    } else {
      setSelected('All');
    }
  }, [path]);

  if (!count) {
    return null;
  }

  const handleTagClick = (tag) => {
    setSelected(tag);
    if (tag === "All") {
      history.push('/blog');
    } else {
      if (tag.indexOf(' ') !== -1) {
        tag = tag.replace(' ', '-');
      }
      history.push(`/blog/tags/${tag}`);
    }
  };

  return (
    <div className={clsx(styles.sidebar, 'thin-scrollbar')}>
      <h3 className={styles.sidebarItemTitle}>Tags</h3>
      <div className={styles.sidebarItemList}>
        {Object.entries(count).map(([tag, num]) => (
          <div
            key={tag}
            className={`${styles.sidebarItem} ${selected === tag ? styles.selected : ''}`}
            onClick={() => handleTagClick(tag)}
          >
            <div className={styles.sidebarItemLink}>
              {tag}
            </div>
            <p>{num}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
