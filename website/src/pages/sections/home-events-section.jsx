import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

import "../../css/customTheme.css";
import ChevronRight from "../../assets/icons/chevron-right.svg";

const HomeEventsSection = () => {
  const { siteConfig } = useDocusaurusContext();
  const events = (siteConfig.customFields.events || [])
    .slice(0, 4)
    .map((event) => {
      const publishTime = event.fileName.slice(0, 10);
      const splittedFileName = event.fileName.split("-");
      const url = `/blog/${splittedFileName
        .slice(0, 3)
        .join("/")}/${splittedFileName.slice(3).join("-")}`;
      return (
        <div className="event-card" key={event.title}>
          <a className="event-item" href={url} target="_blank">
            <div className="event-card-title">{event.title}</div>
            <div className="event-card-time">{publishTime}</div>
            <div className="event-card-read">
              Read <ChevronRight style={{ width: "6px" }} />
            </div>
          </a>
        </div>
      );
    });

  return (
    <div className="news" style={{ padding: "50px 0" }}>
      <div>
        <h3
          className="docs-promo-head"
          style={{ width: "100%", textAlign: "center", left: "0" }}
        >
          Stay updated about APISIX
        </h3>
        <p
          className="docs-promo-subtitle"
          style={{ width: "100%", textAlign: "center", left: "0" }}
        >
          Some Recent events
        </p>
        <div className="event-card-container">{events}</div>
      </div>
      <div className="newsletter">
        <p>
          Stay up to date about all Apache APISIX™ News, subscribe to our{" "}
          <a hred="%">newsletter.</a>
        </p>
        <a className="news-button" href="/docs/general/subscribe-guide">
          Subscribe
        </a>
      </div>
    </div>
  );
};

export default HomeEventsSection;
