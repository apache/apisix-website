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
        Open-Source AI Gateway for LLMs and AI Agents | Apache APISIX
      </title>
      <link rel="canonical" href="https://apisix.apache.org/ai-gateway/" />

      <meta
        name="description"
        content="Use Apache APISIX as an open-source LLM gateway and proxy for model routing, load balancing, retries, fallback, token rate limiting, security, and observability."
      />

      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content="Open-Source AI Gateway for LLMs and AI Agents | Apache APISIX"
      />
      <meta property="og:url" content="https://apisix.apache.org/ai-gateway/" />
      <meta
        property="og:description"
        content="Use Apache APISIX as an open-source LLM gateway and proxy for model routing, load balancing, retries, fallback, token rate limiting, security, and observability."
      />
      <meta
        property="og:image"
        content="https://static.api7.ai/uploads/2025/04/17/zdPVQ1zg_apisix-ai-gateway.png"
      />

      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="Open-Source AI Gateway for LLMs and AI Agents | Apache APISIX"
      />
      <meta
        name="twitter:description"
        content="Use Apache APISIX as an open-source LLM gateway and proxy for model routing, load balancing, retries, fallback, token rate limiting, security, and observability."
      />
      <meta
        name="twitter:image"
        content="https://static.api7.ai/uploads/2025/04/17/zdPVQ1zg_apisix-ai-gateway.png"
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
