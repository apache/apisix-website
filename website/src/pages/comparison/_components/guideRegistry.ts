export type GuideLink = {
  title: string;
  href: string;
  description: string;
};

export type GuideSection = {
  title: string;
  description: string;
  guides?: GuideLink[];
  groups?: {
    title: string;
    description: string;
    guides: GuideLink[];
  }[];
};

export const coreComparisonGuides: GuideLink[] = [
  {
    title: 'API Gateway Comparison',
    href: '/comparison/api-gateway/',
    description: 'A broad decision guide for comparing API gateways, API management platforms, ingress controllers, service mesh proxies, and reverse proxy foundations.',
  },
  {
    title: 'Open-source API Gateway Comparison',
    href: '/comparison/open-source-api-gateway/',
    description: 'Compare open-source and source-available gateway options by architecture, Kubernetes fit, extensibility, and operating model.',
  },
  {
    title: 'Kubernetes Ingress Controller Comparison',
    href: '/comparison/kubernetes-ingress-controller/',
    description: 'Compare Apache APISIX Ingress Controller, Kong Ingress Controller, Traefik, NGINX Ingress Controller, and Envoy Gateway by controller behavior and data plane fit.',
  },
  {
    title: 'AI Gateway Comparison',
    href: '/comparison/ai-gateway/',
    description: 'Compare APISIX AI Gateway and other AI gateway approaches for AI proxying, LLM load balancing, retry and fallback, token rate limiting, MCP support, and observability.',
  },
];

export const directComparisonGuides: GuideLink[] = [
  {
    title: 'Apache APISIX vs Kong',
    href: '/comparison/apisix-vs-kong/',
    description: 'Compare APISIX and Kong across open-source gateway fit, Kubernetes, plugins, policy, observability, and rollout considerations.',
  },
  {
    title: 'Apache APISIX vs Tyk',
    href: '/comparison/apisix-vs-tyk/',
    description: 'Compare APISIX and Tyk across gateway runtime needs, API management scope, governance, Kubernetes, and plugin-based policy.',
  },
  {
    title: 'Apache APISIX vs Apigee',
    href: '/comparison/apisix-vs-apigee/',
    description: 'Compare APISIX as an open-source gateway runtime with Apigee as a Google Cloud API management platform.',
  },
  {
    title: 'Apache APISIX vs AWS API Gateway',
    href: '/comparison/apisix-vs-aws-api-gateway/',
    description: 'Compare self-hosted, cloud-neutral gateway control with AWS-managed API gateway workflows.',
  },
  {
    title: 'Apache APISIX vs NGINX',
    href: '/comparison/apisix-vs-nginx/',
    description: 'Compare API gateway policy and dynamic routing with reverse proxy and load-balancing foundations.',
  },
  {
    title: 'Apache APISIX vs Traefik',
    href: '/comparison/apisix-vs-traefik/',
    description: 'Compare API gateway policy with Kubernetes ingress, provider discovery, middleware, and edge routing workflows.',
  },
  {
    title: 'Apache APISIX vs Envoy',
    href: '/comparison/apisix-vs-envoy/',
    description: 'Compare a ready API gateway with a lower-level L7 proxy and service mesh data-plane foundation.',
  },
  {
    title: 'Apache APISIX vs Gravitee',
    href: '/comparison/apisix-vs-gravitee/',
    description: 'Compare gateway runtime control with API management, developer portal, catalog, and event-native API workflows.',
  },
  {
    title: 'Apache APISIX vs KrakenD',
    href: '/comparison/apisix-vs-krakend/',
    description: 'Compare dynamic gateway policy and plugins with declarative API composition and gateway configuration.',
  },
  {
    title: 'Apache APISIX vs Azure API Management',
    href: '/comparison/apisix-vs-azure-api-management/',
    description: 'Compare open-source gateway ownership with Azure-centered managed API publishing, policy, and portal workflows.',
  },
  {
    title: 'Apache APISIX vs WSO2 API Manager',
    href: '/comparison/apisix-vs-wso2-api-manager/',
    description: 'Compare open-source gateway runtime control with full API lifecycle management and developer portal workflows.',
  },
];

export const alternativeGuides: GuideLink[] = [
  {
    title: 'Top Kong Alternatives',
    href: '/alternatives/kong-alternative/',
    description: 'Evaluate APISIX, Tyk, Gravitee, Traefik, and KrakenD as Kong alternatives for gateway and platform teams.',
  },
  {
    title: 'Top Tyk Alternatives',
    href: '/alternatives/tyk-alternative/',
    description: 'Compare APISIX, Kong, Gravitee, KrakenD, and Traefik as alternatives to Tyk for gateway and API management needs.',
  },
  {
    title: 'Top Apigee Alternatives',
    href: '/alternatives/apigee-alternative/',
    description: 'Compare APISIX, Kong, AWS API Gateway, Azure API Management, and WSO2 as alternatives to Apigee.',
  },
  {
    title: 'Top AWS API Gateway Alternatives',
    href: '/alternatives/aws-api-gateway-alternative/',
    description: 'Evaluate open-source, hybrid, cloud-managed, and API management alternatives to AWS API Gateway.',
  },
  {
    title: 'Top NGINX Alternatives',
    href: '/alternatives/nginx-alternative/',
    description: 'Compare API gateway, ingress, proxy, and traffic management alternatives to NGINX for API use cases.',
  },
  {
    title: 'Top Traefik Alternatives',
    href: '/alternatives/traefik-alternative/',
    description: 'Compare Kubernetes ingress, API gateway policy, service mesh proxy, and reverse proxy alternatives to Traefik.',
  },
  {
    title: 'Top Envoy Alternatives',
    href: '/alternatives/envoy-alternative/',
    description: 'Compare API gateway, ingress, service mesh, and reverse proxy alternatives to Envoy.',
  },
  {
    title: 'Top Gravitee Alternatives',
    href: '/alternatives/gravitee-alternative/',
    description: 'Compare APISIX, Kong, Tyk, WSO2, and Azure API Management as alternatives to Gravitee.',
  },
];

export const comparisonSections: GuideSection[] = [
  {
    title: 'Start here',
    description: 'Use these pages to choose the right gateway category before comparing individual products.',
    guides: coreComparisonGuides,
  },
  {
    title: 'Apache APISIX vs competitors',
    description: 'Direct comparisons where APISIX is part of the main search intent.',
    guides: directComparisonGuides,
  },
];

export const apiGatewayGuideSections: GuideSection[] = [
  {
    title: 'Compare API Gateways',
    description: 'Start here when your team is comparing API gateway categories, open-source options, Kubernetes gateways, AI gateways, or a named vendor against Apache APISIX.',
    groups: [
      {
        title: 'Start with a gateway category',
        description: 'Use these pages when the search is still about choosing the right type of API gateway.',
        guides: coreComparisonGuides,
      },
      {
        title: 'Compare Apache APISIX with a product',
        description: 'Use these pages when the evaluator already has another gateway or API management platform in mind.',
        guides: directComparisonGuides,
      },
    ],
  },
  {
    title: 'Explore Alternatives',
    description: 'Use these pages when the search intent is broader than one direct comparison and the evaluator wants a practical shortlist.',
    guides: alternativeGuides,
  },
];

export const alternativeSections: GuideSection[] = [
  {
    title: 'API gateway alternatives',
    description: 'Alternative pages for users actively looking beyond a named gateway or API management platform.',
    guides: alternativeGuides,
  },
];

export const defaultRelatedGuides: GuideLink[] = [
  {
    title: 'API Gateway Guides',
    href: '/comparison/',
    description: 'Browse comparison and alternative guides for Apache APISIX evaluation.',
  },
  coreComparisonGuides[0],
  coreComparisonGuides[1],
  {
    title: 'API Gateway Alternatives',
    href: '/alternatives/',
    description: 'Browse alternative pages for Kong, Tyk, Apigee, AWS API Gateway, NGINX, Traefik, Envoy, and Gravitee.',
  },
];
