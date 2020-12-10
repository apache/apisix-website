/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Layout from "@theme/Layout";
import styles from './styles.module.css';

const Help = () => {
  const supportLinks = [
    {
      content: 'Learn more using the [documentation on this site.](https://github.com/apache/apisix/tree/master/doc)',
      title: 'Browse Docs',
    },
    {
      content: 'Ask questions about the documentation and project',
      title: 'Join the community',
    },
    {
      content: "Find out what's new with this project",
      title: 'Stay up to date',
    },
  ];

  return (
    <div className="docMainWrapper wrapper">
      <Layout className="mainContainer documentContainer postContainer">
        <div className={styles.post}>
          <header className="postHeader">
            <h1>Need help?</h1>
          </header>
          <p className={styles.spacing}>This project is maintained by a dedicated group of people.</p>
          <div class="row">
            {supportLinks.map(({ title, content }, idx) => (
              <div
                class="col"
                key={idx}
              >
                <h3>{title}</h3>
                <div>{content}</div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default Help;
