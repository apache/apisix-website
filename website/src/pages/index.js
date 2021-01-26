const React = require('react');
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';


const Index = (props) => {
  const { siteConfig } = useDocusaurusContext();

  const HomeSplash = () => (
    <div className="hero text--center">
      <div className="container">
        <div className="inner">
          <div className="padding-vert--md">
            <h1 className="hero__title">{siteConfig.title}</h1>
            <p className="hero__subtitle">{siteConfig.tagline}</p>
            <p className="hero__subtitle">{siteConfig.customFields.tagline2}</p>
          </div>
          <div className="pluginWrapper buttonWrapper">
            <Link
              to="https://github.com/apache/apisix"
              className="button  button--outline button--primary"
            >
              View on GitHub
            </Link>
            <Link
              to={useBaseUrl('/docs/downloads')}
              className="button  button--outline button--primary"
            >
              Downloads
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
  const LearnHow = () => (
    <div className="hero">
      <div className="Learnhow">
        <div className="container">
          <div className="row">
            <div className="col col--7">
              <p className="hero__title">
                <small>Description</small>
              </p>
              <p className="hero__subtitle">
                <small>
                  Cloud-native microservices API gateway, delivering the
                  ultimate performance, security, open source and scalable
                  platform for all your APIs and microservices. Apache APISIX is
                  based on Nginx and etcd. Compared with traditional API
                  gateways, APISIX has dynamic routing and plug-in hot loading,
                  which is especially suitable for API management under
                  micro-service system.
                </small>
              </p>
            </div>
            <div className="col">
              <img
                className="image"
                src="https://github.com/apache/apisix/blob/master/doc/images/apisix.png?raw=true"
                align="right"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const Showcase = () => {
    if ((siteConfig.customFields.users || []).length === 0) {
      return null;
    }
    const showcase = siteConfig.customFields.users
      .filter((user) => user.pinned)
      .map((user) => (
        <a href={user.infoLink} key={user.infoLink}>
          <img
            className="logo"
            src={user.image}
            alt={user.caption}
            title={user.caption}
          />
        </a>
      ));

    return (
      <div className="hero text--center">
        <div className="container">
          <div className="productShowcaseSection">
            <h1>Who is Using This?</h1>
          </div>
          <p>This project is used by all these folks</p>
          <div className="logos">{showcase}</div>
          <div className="more-users">
            <Link
              to= './Users'
              className="button button--primary button--outline "
            >
              <small>More {siteConfig.title} Users</small>
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <HomeSplash />
      <LearnHow />
      <Showcase />
    </Layout>
  );
};

export default Index;
