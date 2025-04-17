import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import ChakraWrapper from '../components/ChakraWrapper';
import Hero from '../components/AIGateway/Hero';
import Advantage from '../components/AIGateway/Advantage';
import Features from '../components/AIGateway/Features';
import Highlights from '../components/AIGateway/Highlights';

const ChakraTestPage: React.FC = () => (
  <Layout>
    <Head>
      <title>
        APISIX AI Gateway - LLM Proxy for Efficient, Secure AI Workloads
      </title>

      <meta
        name="description"
        content="Apache APISIX AI Gateway provides LLM load balancing, retry and fallback, token rate limiting, and enhanced security for your AI applications."
      />

      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content="APISIX AI Gateway - LLM Proxy for Efficient, Secure AI Workloads"
      />
      <meta
        property="og:site_name"
        content="Apache APISIX® -- Cloud-Native API Gateway and AI Gateway"
      />
      <meta
        property="og:description"
        content="Apache APISIX AI Gateway provides LLM load balancing, retry and fallback, token rate limiting, and enhanced security for your AI applications."
      />

      <meta name="twitter:card" content="summary" />
      <meta
        name="twitter:title"
        content="APISIX AI Gateway - LLM Proxy for Efficient, Secure AI Workloads"
      />
      <meta
        name="twitter:description"
        content="Apache APISIX AI Gateway provides LLM load balancing, retry and fallback, token rate limiting, and enhanced security for your AI applications."
      />
    </Head>
    <ChakraWrapper>
      <Hero />
      <Advantage />
      <Features />
      <Highlights />
    </ChakraWrapper>
  </Layout>
);

export default ChakraTestPage;
