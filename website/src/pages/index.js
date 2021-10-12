import React, { useState, useEffect, useLayoutEffect } from "react";
import useThemeContext from '@theme/hooks/useThemeContext';
import Layout from "@theme/Layout";

import HeroSection from "./sections/heroSection";
import Architecture from "./sections/architecture";
import Features from "./sections/features";
import Benefits from "./sections/benefits";
import Comparison from "./sections/comparison";
import OpensourcePromo from "./sections/opensourcePromo";
import HomeEventsSection from "./sections/home-events-section";
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

const ThemeResetComponent = () => {
  const {isDarkTheme, setLightTheme, setDarkTheme} = useThemeContext();

  useEffect(() => {    
    const children = document.querySelector(".navbar__items--right").childElementCount;
    document.querySelector(".navbar__items--right").childNodes[children-2].style.display = "none";

    if(isDarkTheme) {
      setLightTheme(true);
    }    
  }, [])

  return (
    <></>
  );
};

const Index = () => {

  const [screenWidth, screenHeight] = useWindowSize();

  return (
    <Layout>
      <HeroSection />
      <Architecture screenWidth={screenWidth} screenHeight={screenHeight} />
      <Features screenWidth={screenWidth} screenHeight={screenHeight} />
      <Benefits screenWidth={screenWidth} screenHeight={screenHeight} />
      <Comparison />
      <OpensourcePromo />
      <HomeEventsSection />
      <EndCTA />
      <EventPosterCard />
      <ThemeResetComponent/>
    </Layout>
  );
};

export default Index;
