const React = require("react");
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Layout from "@theme/Layout";
import GitHubLogo from "../assets/icons/github-logo.svg";
import { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";

const HomeSplash = () => {
  const [featureWordIndex, setFeatureWordIndex] = useState(0);
  const featureWords = ["Dynamic", "Real-Time", "High-Performance"];

  const [isShow, setIsShow] = useState(true);

  const changeFeatureWordIndex = (index) => {
    setIsShow(false);
    setFeatureWordIndex(index);
    setIsShow(true);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (featureWordIndex >= featureWords.length - 1) {
        changeFeatureWordIndex(0);
      } else {
        changeFeatureWordIndex(featureWordIndex + 1);
      }
    }, 3600);
    return () => clearInterval(timer);
  }, [featureWordIndex]);

  return (
    <div className="hero home-splash">
      <div className="container">
        <div className="inner">
          <div className="padding-vert--md">
            <h1 className="title brand">Apache APISIX™</h1>
            <h1 className="title slogan">
              A&nbsp;
              <span className="feature-word">
                <CSSTransition
                  in={isShow}
                  timeout={2000}
                  classNames="feature-word-text"
                  appear={true}
                  onEnter={(el) => {}}
                  onEntering={(el) => {}}
                  onEntered={(el) => {}}
                  onExit={(el) => {}}
                  onExiting={(el) => {}}
                  onExited={(el) => {}}
                >
                  <span>{featureWords[featureWordIndex]}</span>
                </CSSTransition>
              </span>
              &nbsp;Cloud-Native API Gateway
            </h1>
            <div className="subtitle">
              Provides rich traffic management features such as load balancing,
              dynamic upstream, canary release, circuit breaking,
              authentication, observability, and more. Based on the Nginx
              library and etcd.
            </div>
          </div>
          <div className="pluginWrapper button-wrapper">
            <Link
              to="https://github.com/apache/apisix"
              className="button  button--outline button--primary github"
            >
              <GitHubLogo className="github-logo" />
              View on GitHub
            </Link>
            <Link
              to={useBaseUrl("downloads")}
              className="button  button--outline button--primary secondary"
            >
              Downloads
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const LearnHow = () => (
  <div className="hero">
    <div className="learn-how">
      <div className="container">
        <div className="row">
          <div className="col col--7">
            <p className="hero__title">
              <small>Description</small>
            </p>
            <p className="hero__subtitle">
              <small>
                Cloud-native microservices API gateway, delivering the ultimate
                performance, security, open source and scalable platform for all
                your APIs and microservices. Apache APISIX is based on Nginx and
                etcd. Compared with traditional API gateways, APISIX has dynamic
                routing and plug-in hot loading, which is especially suitable
                for API management under micro-service system.
              </small>
            </p>
          </div>
          <div className="col">
            <img
              className="image"
              src="https://github.com/apache/apisix/blob/master/doc/images/apisix.png?raw=true"
              align="right"
              alt="apisix-description"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Showcase = () => {
  const { siteConfig } = useDocusaurusContext();
  if ((siteConfig.customFields.users || []).length === 0) {
    return null;
  }
  const showcase = siteConfig.customFields.users.map((user) => (
    <a href={user.infoLink} key={user.infoLink} target="_blank">
      <img className="user-logo" src={user.image} alt={user.caption} />
    </a>
  ));
  const middleIndex = (showcase.length / 2).toFixed(0);

  return (
    <div className="hero text--center showcase">
      <div className="container">
        <div className="product-showcase-section">
          <h1>Who is Using This?</h1>
        </div>
        <p>
          This project is used by all these folks
          <br />
          Are you using this project?{" "}
          <a
            href="https://github.com/apache/apisix/blob/master/doc/powered-by.md"
            target="_blank"
            rel="noopener"
          >
            <u>Add your company</u>
          </a>
        </p>
        <div className="user-logos">
          <div className="logo-row">
            <span className="user-logos-container">
              <section>{showcase.slice(0, middleIndex)}</section>
            </span>
          </div>
          <div className="logo-row">
            <span className="user-logos-container">
              <section>{showcase.slice(middleIndex, showcase.length)}</section>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Index = (props) => {
  return (
    <Layout>
      <HomeSplash />
      <LearnHow />
      <Showcase />
    </Layout>
  );
};

export default Index;
