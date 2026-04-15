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
        What is an AI Gateway? APISIX AI Gateway for LLMs & AI Agents
      </title>
      <link rel="canonical" href="https://apisix.apache.org/ai-gateway/" />

      <meta
        name="description"
        content="An AI gateway manages traffic between applications and LLM providers. Apache APISIX AI Gateway provides LLM load balancing, retry and fallback, token rate limiting, MCP protocol support, and enhanced security for AI agents and applications."
      />

      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content="What is an AI Gateway? APISIX AI Gateway for LLMs & AI Agents"
      />
      <meta property="og:url" content="https://apisix.apache.org/ai-gateway/" />
      <meta
        property="og:description"
        content="An AI gateway manages traffic between applications and LLM providers. Apache APISIX AI Gateway provides LLM load balancing, token rate limiting, MCP support, and security for AI agents."
      />

      <meta
        name="twitter:title"
        content="What is an AI Gateway? APISIX AI Gateway for LLMs &amp; AI Agents"
      />
      <meta
        name="twitter:description"
        content="An AI gateway manages traffic between applications and LLM providers. Apache APISIX AI Gateway provides LLM load balancing, token rate limiting, MCP support, and security for AI agents."
      />

      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'What is an AI Gateway?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'An AI gateway is a specialized API gateway that sits between applications and AI/LLM providers, managing traffic routing, load balancing, token rate limiting, security, and observability for AI workloads.',
              },
            },
            {
              '@type': 'Question',
              name: 'What is the difference between an AI Gateway and an API Gateway?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'An API gateway handles general API traffic management, while an AI gateway is optimized for AI-specific needs like LLM load balancing, token-based rate limiting, prompt caching, model fallback, and support for AI protocols like MCP.',
              },
            },
            {
              '@type': 'Question',
              name: 'Does Apache APISIX support AI Gateway features?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. Apache APISIX includes AI gateway capabilities such as AI proxying for 20+ LLM providers, LLM load balancing, retry and fallback, token-based rate limiting, prompt decoration, and content moderation plugins.',
              },
            },
          ],
        })}
      </script>
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
