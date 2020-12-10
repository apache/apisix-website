/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const Help = (props) => {
  const { siteConfig } = useDocusaurusContext();

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
      <layout className="mainContainer documentContainer postContainer">
        <div className="post">
          <header className="postHeader">
            <h1>Need help?</h1>
          </header>
          <p>This project is maintained by a dedicated group of people.</p>
          {/* <GridBlock contents={supportLinks} layout="threeColumn" /> */}
          {supportLinks.map(({ title, content }, idx) => (
            <div
              key={idx}
            >
              <h3>{title}</h3>
              <p>{content}</p>
            </div>
          ))}
        </div>
      </layout>
    </div>
  );
}

export default Help;
