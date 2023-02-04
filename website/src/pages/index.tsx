import type { FC } from 'react';
import React, { useEffect } from 'react';
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

// structured data for improved SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "softwareApplication",
  name: "Apache APISIX",
  alternateName: "APISIX",
  description: "Open source and cloud native API gateway, based on the Nginx library and etcd.",
  abstract: "High-performance, cloud-native, open source API Gateway from the Apache Software Foundation.",
  url: "https://apisix.apache.org",
  thumbnailUrl:
    "https://raw.githubusercontent.com/apache/apisix/master/logos/apisix-white-bg.jpg",
  sameAs: [
    "https://twitter.com/ApacheAPISIX",
    "https://github.com/apache/apisix",
    "https://www.youtube.com/@apacheapisix",
    "https://www.linkedin.com/company/apache-apisix/",
  ],
  isPartOf: "Apache Software Foundation",
  maintainer: "Apache Software Foundation",
};

const Index: FC = () => (
  <Layout>
    <ThemeResetComponent />
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

      <script type="application/ld+json">
        { JSON.stringify(structuredData) }
      </script>

    </Head>
    <HeroSection />
    <Architecture />
    <Features />
    <Benefits />
    <Comparison />
    <OpensourcePromo />
    <HomeEventsSection />
    <EndCTA />
    <EventPosterCard />
  </Layout>
);

export default Index;
