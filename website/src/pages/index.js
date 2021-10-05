import React, { useState, useEffect, useLayoutEffect } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import useThemeContext from '@theme/hooks/useThemeContext';

import HeroSection from "./sections/heroSection";
import Architecture from "./sections/architecture";
import Features from "./sections/features";
import Benefits from "./sections/benefits";
import Comparison from "./sections/comparison";
import OpensourcePromo from "./sections/opensourcePromo";
import NewsSection from "./sections/newsSection";
import EndCTA from "./sections/endcta";
import EventPosterCard from "./sections/components/eventPosterCard";

const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

const Showcase = () => {
  const {isDarkTheme, setLightTheme, setDarkTheme} = useThemeContext();
  
  useEffect(() => {    
    if(isDarkTheme) {
      setLightTheme(true);
    }
  }, [])
  
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
        <p>
        A wide variety of Companies and Organizations use APISIX for Research, Production and Commercial products
          <br />&nbsp;
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

const Index = (props) => {

  const [screenWidth, screenHeight] = useWindowSize();

  return (
    <Layout>
      <HeroSection />
      <Showcase />
      <Architecture screenWidth={screenWidth} screenHeight={screenHeight}/>
      <Features screenWidth={screenWidth} screenHeight={screenHeight}/>
      <Benefits screenWidth={screenWidth} screenHeight={screenHeight}/>
      <Comparison />
      <OpensourcePromo />
      <NewsSection />
      <EndCTA />
      <EventPosterCard />
    </Layout>
  );
};

export default Index;
