import type { FC } from 'react';
import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Translate from '@docusaurus/Translate';

import Layout from '@theme/Layout';
import './styles.scss';

const Container: FC = (props) => {
  const { children } = props;

  return (
    <div className="hero text--center showcase">
      <div className="container">
        {children}
      </div>
    </div>
  );
};

const Header: FC = () => (
  <div className="header">
    <div className="title">
      <Translate id="showcase.website.title">Showcase</Translate>
    </div>
    <div className="tips">
      <Translate id="showcase.website.tips.used">This project is used by all these folks</Translate>
      <br />
      <Translate id="showcase.website.tips.wantUse">Are you using this project?&nbsp;</Translate>
      <a
        href="https://github.com/apache/apisix/blob/master/powered-by.md"
        target="_blank"
        rel="noopener noreferrer"
      >
        <u><Translate id="showcase.website.link.addYourCompany">Add your company</Translate></u>
      </a>
    </div>
  </div>
);

interface UserCardProps {
  infoLink: string;
  image: string;
  caption: string;
}

const UserCard: FC<UserCardProps> = (props) => {
  const { infoLink, image, caption } = props;
  return (
    <div className="user-card">
      <a href={infoLink}>
        <img className="logo" src={image} alt={caption} />
      </a>
    </div>
  );
};

const Content: FC = () => {
  const { siteConfig } = useDocusaurusContext();
  if (!(siteConfig.customFields.showcases || []).length) {
    return null;
  }
  const showcases = siteConfig.customFields.showcases.map((user) => (
    <div className="col col--2 item" key={user.infoLink}>
      <UserCard
        image={`https://static.apiseven.com/202202/${user.image}`}
        caption={user.caption}
        infoLink={user.infoLink}
      />
    </div>
  ));

  return (
    <div className="row content">
      {showcases}
    </div>
  );
};

const Showcase: FC = () => (
  <Layout>
    <Container>
      <Header />
      <Content />
    </Container>
  </Layout>
);

export default Showcase;
