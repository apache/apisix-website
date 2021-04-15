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
              src="https://user-images.githubusercontent.com/40708551/114740649-a9bf2200-9d67-11eb-8e1d-1409fb5c18c2.png"
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
      <img className="user-logo" src={'https://cdn.jsdelivr.net/gh/apache/apisix-website@master/website/static/img/' +  user.image} alt={user.caption} />
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
          Are you using this project?&nbsp;
          <a
            href="https://github.com/apache/apisix/blob/master/powered-by.md"
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

const ContributionSection = () => {

  return (
    <div className="contribution">
      <div className="center-elem contribution-text">
        <h2>Make your first contribution to Apache APISIX™</h2>
      </div>
      <div className="center-elem">
        <p>Find a good first issue to get you started !</p>
      </div>
      <div className="contribution-link">
             <Link
              to="/docs/general/contributor-guide#good-first-issues"
             >
              <GitHubLogo className="contribution-logo" />
              Good First Issues
            </Link>
      </div>
    </div>
  );
};

const NewsletterSection = () => {

  return (
    <div className="newsletter">
      <div className="center-elem news-logo">
        <svg className="news-logo-svg" width="185" height="156" viewBox="0 0 185 156" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 155.5L94 0L185 155.5H140L94 83L42.5 155.5H0Z" fill="#F8423F"/>
        <path d="M94 82.5L42.5 155H0L76.5 57L94 82.5Z" fill="url(#paint0_linear)"/>
        <path d="M140 155.5H185L94 0L140 155.5Z" fill="url(#paint1_linear)"/>
        <defs>
        <linearGradient id="paint0_linear" x1="222.5" y1="50" x2="85" y2="223.5" gradientUnits="userSpaceOnUse">
        <stop offset="0.536111" stopColor="#FC0A04"/>
        <stop offset="1" stopColor="#CF0500" stopOpacity="0.77"/>
        </linearGradient>
        <linearGradient id="paint1_linear" x1="139.5" y1="1.50861e-06" x2="226" y2="136" gradientUnits="userSpaceOnUse">
        <stop offset="0.473466" stopColor="#E2423E"/>
        <stop offset="1" stopColor="#E2423E" stopOpacity="0.77"/>
        </linearGradient>
        </defs>
      </svg>
      </div>
      <div className="center-elem news-text">
        <h2>Stay up to date about all Apache APISIX™ News</h2>
      </div>
      <div className="center-elem">
        <a className="news-button" href="/docs/general/subscribe-guide">Subscribe</a>
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
      <ContributionSection />
      <NewsletterSection />
    </Layout>
  );
};

export default Index;
