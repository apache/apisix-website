import type { FC } from 'react';
import React, { useEffect } from 'react';
import useThemeContext from '@theme/hooks/useThemeContext';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import { translate } from '@docusaurus/Translate';
import useWindowType from '@theme/hooks/useWindowSize';

import HeroSection from '../components/sections/HeroSection';
import Architecture from '../components/sections/Architecture';
import Features from '../components/sections/Features';
import Benefits from '../components/sections/Benefits';
import Comparison from '../components/sections/Comparison';
import OpensourcePromo from '../components/sections/OpensourcePromo';
import EndCTA from '../components/sections/Endcta';
import TrustedBy from '../components/sections/TrustedBy';
import Pathways from '../components/sections/Pathways';
import Integrations from '../components/sections/Integrations';

// Structured data for the homepage. Organization + WebSite are already injected
// globally by config/schema-org.js; these add product-level (SoftwareApplication)
// and FAQ markup to improve rich results and AI-answer eligibility.
const SOFTWARE_APPLICATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Apache APISIX',
  applicationCategory: 'DeveloperApplication',
  applicationSubCategory: 'API Gateway',
  operatingSystem: 'Linux, Docker, Kubernetes',
  description:
    'Apache APISIX is a dynamic, high-performance, open-source API gateway and AI gateway with load balancing, authentication, rate limiting, observability, and 100+ plugins.',
  url: 'https://apisix.apache.org/',
  license: 'https://www.apache.org/licenses/LICENSE-2.0',
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  author: {
    '@type': 'Organization',
    name: 'The Apache Software Foundation',
    url: 'https://www.apache.org/',
  },
};

const HOMEPAGE_FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is Apache APISIX?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Apache APISIX is an open-source, high-performance API gateway and AI gateway. It is a top-level project of the Apache Software Foundation and provides load balancing, authentication, rate limiting, observability, and 100+ plugins for managing API and LLM traffic at scale.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Apache APISIX free and open source?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Apache APISIX is licensed under the Apache License 2.0 and is completely free and open source, with no open-core paywall — all plugins and features are available in the open-source project.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between an API gateway and an AI gateway?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An API gateway manages traffic for general APIs, while an AI gateway adds capabilities optimized for LLM workloads such as multi-provider AI proxying, LLM load balancing, token-based rate limiting, retries and fallback, and prompt security. Apache APISIX provides both.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Apache APISIX support Kubernetes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Apache APISIX runs on Kubernetes and provides an Ingress Controller, along with Helm charts and a Docker image for cloud-native deployments.',
      },
    },
  ],
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

const Index: FC = () => (
  <Layout>
    <ThemeResetComponent />
    <Head>
      <title>{translate({ id: 'homepage.meta.title', message: 'Apache APISIX - Open Source API Gateway & AI Gateway' })}</title>
      <link rel="canonical" href="https://apisix.apache.org/" />
      <meta
        name="description"
        content="Apache APISIX is a dynamic, high-performance, open-source API gateway and AI gateway. Features include load balancing, authentication, rate limiting, AI proxying, LLM load balancing, and 100+ plugins."
      />
      <meta
        property="og:title"
        content="Apache APISIX - Open Source API Gateway &amp; AI Gateway"
      />
      <meta
        property="og:description"
        content="Apache APISIX is a dynamic, high-performance, open-source API gateway and AI gateway. Features include load balancing, authentication, rate limiting, AI proxying, LLM load balancing, and 100+ plugins."
      />
      <meta property="og:url" content="https://apisix.apache.org/" />
      <meta
        name="twitter:title"
        content="Apache APISIX - Open Source API Gateway &amp; AI Gateway"
      />
      <meta
        name="twitter:description"
        content="Apache APISIX is a dynamic, high-performance, open-source API gateway and AI gateway. Features include load balancing, authentication, rate limiting, AI proxying, LLM load balancing, and 100+ plugins."
      />
      <script type="application/ld+json">{JSON.stringify(SOFTWARE_APPLICATION_SCHEMA)}</script>
      <script type="application/ld+json">{JSON.stringify(HOMEPAGE_FAQ_SCHEMA)}</script>
    </Head>
    <HeroSection />
    <TrustedBy />
    <Pathways />
    <Architecture />
    <Features />
    <Integrations />
    <Benefits />
    <Comparison />
    <OpensourcePromo />
    <EndCTA />
  </Layout>
);

export default Index;
