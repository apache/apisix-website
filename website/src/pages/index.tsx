import type { FC } from 'react';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import useThemeContext from '@theme/hooks/useThemeContext';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import useWindowType from '@theme/hooks/useWindowSize';

import HeroSection from '../components/sections/HeroSection';
import Architecture from '../components/sections/Architecture';
import Features from '../components/sections/Features';
import Benefits from '../components/sections/Benefits';
import Comparison from '../components/sections/Comparison';
import OpensourcePromo from '../components/sections/OpensourcePromo';
import HomeEventsSection from '../components/sections/HomeEventsSection';
import EndCTA from '../components/sections/Endcta';
import EventPosterCard from '../components/EventPosterCard';

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
};

const ThemeResetComponent = () => {
  const { isDarkTheme, setLightTheme } = useThemeContext();
  const windowType = useWindowType();

  useEffect(() => {
    if (windowType === 'mobile') {
      //  remove mode switch at navbar-sidebar
      const sidebarModeSwitch = document.querySelector('div.navbar-sidebar__brand > div') as HTMLDivElement;
      if (sidebarModeSwitch) {
        sidebarModeSwitch.style.display = 'none';
      }
    } else {
      // remove mode switch at navbar
      const navbarModeSwitch = document.querySelector('div.navbar__items.navbar__items--right > div.react-toggle') as HTMLDivElement;
      if (navbarModeSwitch) {
        navbarModeSwitch.style.display = 'none';
      }
    }
  }, [windowType]);

  useEffect(() => {
    if (isDarkTheme) {
      setLightTheme();
    }
  }, [isDarkTheme]);

  return (null);
};

const Index: FC = () => {
  const [screenWidth] = useWindowSize();

  return (
    <Layout>
      <Head>
        <meta
          name="twitter:title"
          content="Apache APISIX® - Cloud-Native API Gateway"
        />
        <meta
          name="twitter:description"
          content="Apache APISIX is a dynamic, real-time, high-performance Cloud-Native API gateway, based on the Nginx library and etcd."
        />
        <meta
          name="twitter:site"
          content="@apacheapisix"
        />
        <meta
          name="og:description"
          content="Apache APISIX is a dynamic, real-time, high-performance Cloud-Native API gateway, based on the Nginx library and etcd."
        />
      </Head>
      <HeroSection />
      <Architecture screenWidth={screenWidth} />
      <Features />
      <Benefits screenWidth={screenWidth} />
      <Comparison />
      <OpensourcePromo />
      <HomeEventsSection />
      <EndCTA />
      <EventPosterCard />
      <ThemeResetComponent />
    </Layout>
  );
};

export default Index;
