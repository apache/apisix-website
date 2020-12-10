/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Layout from '@theme/Layout';
import styles from './styles.module.css';

const Users = () => {
  const users = [
    {
      caption: "360",
      image: "https://static.apiseven.com/2020/05/WechatIMG618.png",
      infoLink: "https://www.360.com",
      pinned: true,
    }, {
      caption: "HelloTalk",
      image: "https://static.apiseven.com/2020/05/HelloTalk.png",
      infoLink: "https://www.hellotalk.com/?lang=en",
      pinned: true,
    }, {
      caption: "网易",
      image: "https://static.apiseven.com/2020/05/1588907762-WechatIMG2916.png",
      infoLink: "https://www.163.com",
      pinned: true,
    }, {
      caption: "腾讯云",
      image: "https://static.apiseven.com/2020/05/%E8%85%BE%E8%AE%AF%E4%BA%91-1536x546.jpg",
      infoLink: "https://qcloud.com",
      pinned: true,
    }, {
      caption: "中国航信",
      image: "https://static.apiseven.com/2020/05/%E4%B8%AD%E5%9B%BD%E8%88%AA%E4%BF%A1.png",
      infoLink: "http://www.infosky.com.cn/publish/main/index.html",
      pinned: true,
    }
  ];

  if ((users || []).length === 0) {
    return null;
  }

  const showcase = users.map((user) => (
    <a href={user.infoLink} key={user.infoLink}>
      <img src={user.image} alt={user.caption} title={user.caption} style={{ padding: 20, maxHeight: 128, width: 128 }} />
    </a>
  ));

  return (
    <div className="mainContainer">
      <Layout padding={['bottom', 'top']}>
        <div className={styles.section}>
          <div className={styles.prose}>
            <h1>Who is Using This?</h1>
            <p>This project is used by many folks</p>
          </div>
          <div className={styles.showcase}>
            <div className={styles.box}>{showcase}</div>
          </div>
          <div className={styles.box2}>
            <p>Are you using this project?</p>
            <a
              href="https://github.com/apache/apisix/blob/master/doc/powered-by.md"
              class="button button--primary">
              Add your company
            </a>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default Users;
