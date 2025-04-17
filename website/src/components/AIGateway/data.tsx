import React from 'react';
import { Text } from '@chakra-ui/react';
import { MdApi } from 'react-icons/md';

export const useAdvantages = () => [
  {
    title: 'Manage API and AI Traffic in One Gateway',
    description: 'To Keep Up with the Rapid Evolution of AI and LLMs',
    icon: MdApi,
    gridArea: ' 1 / span 2 / span 1 /span 2',
    mobileArea: 'span 1 / span 2',
    titleStyle: {},
  },
  {
    title: 'No Vendor Lock-in',
    description: 'Powered by Apache APISIX',
    gridArea: '2 / 1 / 3 / 2',
    mobileArea: '',
    titleStyle: {
      fontSize: '26px',
      backgroundImage: 'var(--chakra-colors-gradient-500)',
      backgroundClip: 'text',
      backgroundSize: '150% 110%',
    },
  },
  {
    title: '100+',
    description: 'LLMs and API management features',
    gridArea: '2 / 2 / 3 / 3',
    rowSpan: 1,
    colSpan: 1,
    mobileArea: '',
    titleStyle: {
      backgroundImage: 'var(--chakra-colors-gradient-500)',
      backgroundClip: 'text',
      backgroundSize: '150% 110%',
    },
  },
  {
    title: (
      <Text fontSize={{ base: '24px', lg: '32px' }}>
        Powerful and Open-Source Plugins for LLMs Load Balancing and Token Rate Limiting
      </Text>
    ),
    description: 'All AI plugins are fully open-source, including multi-LLM load balancing, retry and fallback mechanisms, token rate limiting, content moderation, AI RAG, prompt decorator and auditing.',
    picture:
        'https://static.api7.ai/uploads/2025/02/27/WeSPDUHf_AI_LLMs_Icon.svg',
    gridArea: '1 / 3 / 3 / 5',
    mobileArea: 'span 2/span 2/span 2/span 2',
    titleStyle: {
      color: 'initial',
    },
  },
];

export const useFeatures = () => [
  {
    title: 'Multi-LLM Load Balancing',
    description: 'Supports multiple LLM providers (OpenAI, DeepSeek, Claude, Mistral, Gemini, etc.) to prevent vendor lock-in, while dynamically adjusting LLM weights based on latency, cost, and stability.',
    icon: 'https://static.api7.ai/uploads/2025/02/27/rDktw2Bw_load-balancing.svg',
    colSpan: 4,
  },
  {
    title: 'Token Rate Limiting',
    description: 'Token usage can be rate-limited and throttled based on various dimensions such as Route, Service, Consumer, Consumer Group, or custom parameters. Supports both single-node and cluster-level rate limiting. Additionally, different rate-limiting strategies can be configured for each LLM.',
    icon: 'https://static.api7.ai/uploads/2025/02/27/G5hGqBBX_limit-count.svg',
    colSpan: 4,
  },
  {
    title: 'AI RAG',
    description: 'Through RAG, LLMs can leverage the enterprise knowledge base to answer questions or generate content, improving the professionalism and accuracy of the generated output while avoiding LLM hallucinations.',
    icon: 'https://static.api7.ai/uploads/2025/02/27/uvh9oC6A_ai-rag.svg',
    colSpan: 4,
  },
  {
    title: 'Observability of Token Usage',
    description: 'By utilizing access logs and observability components, track token usage to prevent API abuse and avoid excessive billing.',
    icon: 'https://static.api7.ai/uploads/2025/02/27/vs3HED8w_observability.svg',
    colSpan: 4,
  },
  {
    title: 'Retry and Fallback',
    description: 'Supports configurable LLM health checks, with automatic retries and fallback to other LLM services, ensuring service stability and quality.',
    icon: 'https://static.api7.ai/uploads/2025/02/27/fxWd0Rq3_retry_and_fallback.svg',
    colSpan: 4,
  },
  {
    title: 'Security',
    description: 'Utilize plugins such as Prompt Guard, Prompt Decorator, Prompt Template, Content Moderation, and Logging & Auditing to ensure the security and compliance of user inputs and LLM responses.',
    icon: 'https://static.api7.ai/uploads/2025/02/27/Q8PnOJCs_security.svg',
    colSpan: 4,
  },
];

export const useHighlights = () => [
  {
    title: 'Multiple LLM providers',
    desc: 'APISIX AI Gateway supports multiple LLMs, including but not limited to OpenAI, DeepSeek, Claude, Mistral, and Gemini, ensuring your AI applications are adaptable to diverse scenarios.',
    image:
        'https://static.api7.ai/uploads/2025/02/27/kBKyuz9O_mulitiple_LLM.avif',
    scale: '1',
    link: 'https://apisix.apache.org/blog/2025/02/24/apisix-ai-gateway-features/',
  },
];
