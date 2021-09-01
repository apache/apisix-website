const React = require("react");
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import './styles.scss';

const Container = (props) => {
  return (
      <div className="hero text--center showcase">
        <div className="container">
          {props.children}
        </div>
      </div>
  );
}

const Header = (props) => {
  return (
      <div className="header">
        <div className="title">
          Use cases
        </div>
        <div className="tips">
          This project is used by all these folks
          <br />
          Are you using this project?&nbsp;
          <a
              href="https://github.com/apache/apisix/blob/master/powered-by.md"
              target="_blank"
              rel="noopener external nofollow"
          >
            <u>Add your company</u>
          </a>
        </div>
      </div>
  );
}

const Content = (props) => {
  const { siteConfig } = useDocusaurusContext();
  if (!(siteConfig.customFields.showcases || []).length) {
    return null;
  }
  const showcases = siteConfig.customFields.showcases.map((user) => (
    <div className="item" key={user.infoLink}>
      <UserCard
          image={'https://cdn.jsdelivr.net/gh/apache/apisix-website@master/website/static/img/' + user.image}
          caption={user.caption}
          infoLink={user.infoLink}
      />
    </div>
  ));

  return (
    <div className="content">
      {showcases}
    </div>
  );
}

const UserCard = (props) => {
  return (
      <div className="user-card">
        <img className="logo" src={props.image} alt={props.user}/>
        <div className="caption">{props.caption}</div>
        <a className="button" href={props.infoLink}>Learn more</a>
      </div>
  );
}

const Showcase = (props) => {
  return (
      <Layout>
        <Container>
          <Header/>
          <Content/>
        </Container>
      </Layout>
  );
};

export default Showcase;
