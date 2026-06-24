import type { FC } from 'react';
import React from 'react';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';

import '../../css/landing-sections/ai-gateway-home.scss';

interface Capability {
  title: JSX.Element;
  desc: JSX.Element;
  href: string;
}

const CAPABILITIES: Capability[] = [
  {
    title: <Translate id="home.ai.cap.proxy.t">Multi-LLM proxy</Translate>,
    desc: (
      <Translate id="home.ai.cap.proxy.d">
        Route to OpenAI, Anthropic, AWS Bedrock, DeepSeek, Ollama and 20+ providers through one endpoint.
      </Translate>
    ),
    href: '/docs/apisix/plugins/ai-proxy/',
  },
  {
    title: <Translate id="home.ai.cap.lb.t">LLM load balancing</Translate>,
    desc: (
      <Translate id="home.ai.cap.lb.d">
        Distribute traffic across providers and models for throughput and resilience.
      </Translate>
    ),
    href: '/docs/apisix/plugins/ai-proxy-multi/',
  },
  {
    title: <Translate id="home.ai.cap.fallback.t">Retry &amp; fallback</Translate>,
    desc: (
      <Translate id="home.ai.cap.fallback.d">
        Fail over to a backup model or provider automatically when one is unavailable.
      </Translate>
    ),
    href: '/docs/apisix/plugins/ai-proxy-multi/',
  },
  {
    title: <Translate id="home.ai.cap.token.t">Token rate limiting</Translate>,
    desc: (
      <Translate id="home.ai.cap.token.d">
        Cap usage and cost with token-based rate limits per consumer.
      </Translate>
    ),
    href: '/docs/apisix/plugins/ai-rate-limiting/',
  },
  {
    title: <Translate id="home.ai.cap.security.t">Prompt security</Translate>,
    desc: (
      <Translate id="home.ai.cap.security.d">
        Guardrails, content moderation, and prompt decoration before requests reach the model.
      </Translate>
    ),
    href: '/docs/apisix/plugins/ai-prompt-guard/',
  },
  {
    title: <Translate id="home.ai.cap.mcp.t">MCP support</Translate>,
    desc: (
      <Translate id="home.ai.cap.mcp.d">
        Expose and govern Model Context Protocol tools through the gateway.
      </Translate>
    ),
    href: '/ai-gateway/',
  },
];

const PROVIDERS = ['OpenAI', 'Anthropic', 'AWS Bedrock', 'DeepSeek', 'Ollama'];

const AIGatewaySection: FC = () => (
  <section className="ai-home">
    <div className="ai-home__inner">
      <span className="ai-home__eyebrow">
        <Translate id="home.ai.eyebrow">AI Gateway</Translate>
      </span>
      <h2 className="ai-home__title">
        <Translate id="home.ai.title">The same gateway, now for your LLM traffic</Translate>
      </h2>
      <p className="ai-home__subtitle">
        <Translate id="home.ai.subtitle">
          Proxy, secure, and govern traffic to 20+ LLM providers — with the performance, plugins,
          and observability you already run for your APIs.
        </Translate>
      </p>

      <div className="ai-home__flow">
        <span className="ai-home__node">
          <Translate id="home.ai.flow.apps">AI apps &amp; agents</Translate>
        </span>
        <span className="ai-home__arrow" aria-hidden="true">→</span>
        <span className="ai-home__node ai-home__node--apisix">Apache APISIX</span>
        <span className="ai-home__arrow" aria-hidden="true">→</span>
        <span className="ai-home__providers">
          {PROVIDERS.map((provider) => (
            <span className="ai-home__provider" key={provider}>{provider}</span>
          ))}
          <span className="ai-home__provider ai-home__provider--more">
            <Translate id="home.ai.flow.more">+ more</Translate>
          </span>
        </span>
      </div>

      <div className="ai-home__grid">
        {CAPABILITIES.map((capability) => (
          <Link className="ai-home__card" to={capability.href} key={capability.title.props.id}>
            <h3 className="ai-home__card-title">{capability.title}</h3>
            <p className="ai-home__card-desc">{capability.desc}</p>
          </Link>
        ))}
      </div>

      <Link className="ai-home__cta" to="/ai-gateway/">
        <Translate id="home.ai.cta">Explore the AI Gateway</Translate>
        {' →'}
      </Link>
    </div>
  </section>
);

export default AIGatewaySection;
