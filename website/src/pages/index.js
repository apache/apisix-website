const React = require("react");
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Layout from "@theme/Layout";
import GitHubLogo from "../assets/icons/github-logo.svg";
import { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import ChevronRight from "../assets/icons/chevron-right.svg";

const HomeSplash = () => {
  const [featureWordIndex, setFeatureWordIndex] = useState(0);
  const featureWords = ["Dynamic", "Real-Time", "Performant"];

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
            <h1 className="title slogan">
              A&nbsp;
              <span className="feature-word">
                <CSSTransition
                  in={isShow}
                  timeout={2000}
                  classNames="feature-word-text"
                  appear={true}
                >
                  <span>{featureWords[featureWordIndex]}</span>
                </CSSTransition>
              </span>
              <span className="hide-on-mobile">&nbsp;</span>Cloud-Native API
              Gateway
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
              src="https://github.com/apache/apisix/blob/master/docs/assets/images/apisix.png?raw=true"
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
  if (!(siteConfig.customFields.showcases || []).length) {
    return null;
  }
  const showcases = siteConfig.customFields.showcases.map((user) => (
    <a href={user.infoLink} key={user.infoLink} target="_blank">
      <img className="user-logo" src={user.image} alt={user.caption} />
    </a>
  ));
  const middleIndex = (showcases.length / 2).toFixed(0);

  return (
    <div className="hero text--center showcase">
      <div className="container">
        <div className="product-showcase-section">
          <h1>Who is Using This?</h1>
        </div>
        <p>
          This project is used by all these folks
          <br />
          Are you using this project?
          <a
            href="https://github.com/apache/apisix/blob/master/docs/en/latest/powered-by.md"
            target="_blank"
            rel="noopener"
          >
            <u>Add your company</u>
          </a>
        </p>
        <div className="user-logos">
          <div className="logo-row">
            <span className="user-logos-container">
              <section>
                <span>{showcases.slice(0, middleIndex)}</span>
                <span>{showcases.slice(0, middleIndex)}</span>
              </section>
            </span>
          </div>
          <div className="logo-row">
            <span className="user-logos-container">
              <section>
                <span>{showcases.slice(middleIndex, showcases.length)}</span>
                <span>{showcases.slice(middleIndex, showcases.length)}</span>
              </section>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const EventsSection = () => {
  const { siteConfig } = useDocusaurusContext();
  const events = (siteConfig.customFields.events || [])
    .slice(0, 4)
    .map((event) => {
      const publishTime = event.fileName.slice(0, 10);
      const splittedFileName = event.fileName.split("-");
      const url = `/events/${splittedFileName
        .slice(0, 3)
        .join("/")}/${splittedFileName.slice(3).join("-")}`;
      return (
        <a className="event-item" key={event.title} href={url} target="_blank">
          <div>
            <div className="event-title">{event.title}</div>
            <div className="event-publish-time">{publishTime}</div>
          </div>
          <div className="event-read-button">
            Read <ChevronRight />
          </div>
        </a>
      );
    });
  return (
    <div className="hero text--center events-section">
      <div className="container">
        <div>
          <h1 className="color-primary">Events</h1>
        </div>
        <div className="events-view-all-button">
          <a href="/events" target="_blank">
            <u>View All Events</u>
          </a>
        </div>
        <div className="events-container">{events}</div>
      </div>
    </div>
  );
};

const Index = (props) => {
  return (
    <Layout>
      <HomeSplash />
      <LearnHow />
      <EventsSection />
      <Showcase />
    </Layout>
  );
};

export default Index;
