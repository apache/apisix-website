export type GuideLink = {
  title: string;
  href: string;
  description: string;
  priority?: 'P0' | 'P1' | 'P2';
};

export type GuideSection = {
  title: string;
  description: string;
  guides: GuideLink[];
};

export const coreComparisonGuides: GuideLink[] = [
  {
    title: 'API Gateway Comparison',
    href: '/comparison/api-gateway/',
    description: 'A broad decision guide for comparing API gateways, API management platforms, ingress controllers, service mesh proxies, and reverse proxy foundations.',
    priority: 'P0',
  },
  {
    title: 'Open-source API Gateway Comparison',
    href: '/comparison/open-source-api-gateway/',
    description: 'Compare open-source and source-available gateway options by architecture, Kubernetes fit, extensibility, and operating model.',
    priority: 'P0',
  },
  {
    title: 'Kubernetes API Gateway Comparison',
    href: '/comparison/kubernetes-api-gateway/',
    description: 'Compare Kubernetes gateway and ingress options for platform teams evaluating routing, policy, observability, and ownership.',
    priority: 'P1',
  },
  {
    title: 'AI Gateway Comparison',
    href: '/comparison/ai-gateway/',
    description: 'Compare AI gateway approaches for LLM traffic, model routing, retries, fallbacks, token-aware policy, and observability.',
    priority: 'P1',
  },
];

export const directComparisonGuides: GuideLink[] = [
  {
    title: 'Apache APISIX vs Kong',
    href: '/comparison/apisix-vs-kong/',
    description: 'Compare APISIX and Kong across open-source gateway fit, Kubernetes, plugins, policy, observability, and migration considerations.',
    priority: 'P0',
  },
  {
    title: 'Apache APISIX vs Tyk',
    href: '/comparison/apisix-vs-tyk/',
    description: 'Compare APISIX and Tyk across gateway runtime needs, API management scope, governance, Kubernetes, and plugin-based policy.',
    priority: 'P0',
  },
  {
    title: 'Apache APISIX vs Apigee',
    href: '/comparison/apisix-vs-apigee/',
    description: 'Compare APISIX as an open-source gateway runtime with Apigee as a Google Cloud API management platform.',
    priority: 'P1',
  },
  {
    title: 'Apache APISIX vs AWS API Gateway',
    href: '/comparison/apisix-vs-aws-api-gateway/',
    description: 'Compare self-hosted, cloud-neutral gateway control with AWS-managed API gateway workflows.',
    priority: 'P1',
  },
  {
    title: 'Apache APISIX vs NGINX',
    href: '/comparison/apisix-vs-nginx/',
    description: 'Compare API gateway policy and dynamic routing with reverse proxy and load-balancing foundations.',
    priority: 'P1',
  },
  {
    title: 'Apache APISIX vs Traefik',
    href: '/comparison/apisix-vs-traefik/',
    description: 'Compare API gateway policy with Kubernetes ingress, provider discovery, middleware, and edge routing workflows.',
    priority: 'P1',
  },
  {
    title: 'Apache APISIX vs Envoy',
    href: '/comparison/apisix-vs-envoy/',
    description: 'Compare a ready API gateway with a lower-level L7 proxy and service mesh data-plane foundation.',
    priority: 'P1',
  },
  {
    title: 'Apache APISIX vs Gravitee',
    href: '/comparison/apisix-vs-gravitee/',
    description: 'Compare gateway runtime control with API management, developer portal, catalog, and event-native API workflows.',
    priority: 'P2',
  },
  {
    title: 'Apache APISIX vs KrakenD',
    href: '/comparison/apisix-vs-krakend/',
    description: 'Compare dynamic gateway policy and plugins with declarative API composition and gateway configuration.',
    priority: 'P2',
  },
  {
    title: 'Apache APISIX vs Azure API Management',
    href: '/comparison/apisix-vs-azure-api-management/',
    description: 'Compare open-source gateway ownership with Azure-centered managed API publishing, policy, and portal workflows.',
    priority: 'P2',
  },
  {
    title: 'Apache APISIX vs WSO2 API Manager',
    href: '/comparison/apisix-vs-wso2-api-manager/',
    description: 'Compare open-source gateway runtime control with full API lifecycle management and developer portal workflows.',
    priority: 'P2',
  },
];

export const alternativeGuides: GuideLink[] = [
  {
    title: 'Top Kong Alternatives',
    href: '/alternatives/kong-alternative/',
    description: 'Evaluate APISIX, Tyk, Gravitee, Traefik, and KrakenD as Kong alternatives for gateway and platform teams.',
    priority: 'P0',
  },
  {
    title: 'Top Tyk Alternatives',
    href: '/alternatives/tyk-alternative/',
    description: 'Compare APISIX, Kong, Gravitee, KrakenD, and Traefik as alternatives to Tyk for gateway and API management needs.',
    priority: 'P0',
  },
  {
    title: 'Top Apigee Alternatives',
    href: '/alternatives/apigee-alternative/',
    description: 'Compare APISIX, Kong, AWS API Gateway, Azure API Management, and WSO2 as alternatives to Apigee.',
    priority: 'P1',
  },
  {
    title: 'Top AWS API Gateway Alternatives',
    href: '/alternatives/aws-api-gateway-alternative/',
    description: 'Evaluate open-source, hybrid, cloud-managed, and API management alternatives to AWS API Gateway.',
    priority: 'P2',
  },
  {
    title: 'Top NGINX Alternatives',
    href: '/alternatives/nginx-alternative/',
    description: 'Compare API gateway, ingress, proxy, and traffic management alternatives to NGINX for API use cases.',
    priority: 'P2',
  },
  {
    title: 'Top Traefik Alternatives',
    href: '/alternatives/traefik-alternative/',
    description: 'Compare Kubernetes ingress, API gateway policy, service mesh proxy, and reverse proxy alternatives to Traefik.',
    priority: 'P2',
  },
  {
    title: 'Top Envoy Alternatives',
    href: '/alternatives/envoy-alternative/',
    description: 'Compare API gateway, ingress, service mesh, and reverse proxy alternatives to Envoy.',
    priority: 'P2',
  },
  {
    title: 'Top Gravitee Alternatives',
    href: '/alternatives/gravitee-alternative/',
    description: 'Compare APISIX, Kong, Tyk, WSO2, and Azure API Management as alternatives to Gravitee.',
    priority: 'P2',
  },
];

export const migrationGuides: GuideLink[] = [
  {
    title: 'Migrating from Kong to Apache APISIX',
    href: '/migration/kong-to-apisix/',
    description: 'Plan route, plugin, authentication, rate limit, observability, Kubernetes, and rollout mapping from Kong to APISIX.',
    priority: 'P1',
  },
  {
    title: 'Migrating from NGINX to Apache APISIX',
    href: '/migration/nginx-to-apisix/',
    description: 'Move API-specific policy from reverse proxy configuration into an open-source API gateway runtime.',
    priority: 'P1',
  },
  {
    title: 'Migrating from Tyk to Apache APISIX',
    href: '/migration/tyk-to-apisix/',
    description: 'Separate gateway runtime behavior from API management workflows when evaluating APISIX after Tyk.',
    priority: 'P2',
  },
  {
    title: 'Migrating from Apigee to Apache APISIX',
    href: '/migration/apigee-to-apisix/',
    description: 'Map API proxies, policies, authentication, observability, cloud dependencies, and rollout strategy from Apigee to APISIX.',
    priority: 'P2',
  },
  {
    title: 'Migrating from AWS API Gateway to Apache APISIX',
    href: '/migration/aws-api-gateway-to-apisix/',
    description: 'Plan a move from AWS-managed gateway workflows to cloud-neutral or Kubernetes-based APISIX deployments.',
    priority: 'P2',
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
    title: 'Compare API gateways',
    description: 'Start here when your team is comparing API gateway categories, open-source options, Kubernetes gateways, AI gateways, or a named vendor against Apache APISIX.',
    guides: [
      ...coreComparisonGuides,
      ...directComparisonGuides,
    ],
  },
  {
    title: 'Explore alternatives',
    description: 'Use these pages when the search intent is broader than one direct comparison and the evaluator wants a practical shortlist.',
    guides: alternativeGuides,
  },
  {
    title: 'Plan migrations',
    description: 'Use these guides for close-to-action evaluation where teams are mapping an existing gateway or proxy setup to Apache APISIX.',
    guides: migrationGuides,
  },
];

export const alternativeSections: GuideSection[] = [
  {
    title: 'API gateway alternatives',
    description: 'Alternative pages for users actively looking beyond a named gateway or API management platform.',
    guides: alternativeGuides,
  },
];

export const migrationSections: GuideSection[] = [
  {
    title: 'Migration planning guides',
    description: 'Migration pages for close-to-action searches where teams are mapping existing gateway behavior to APISIX.',
    guides: migrationGuides,
  },
];

export const defaultRelatedGuides: GuideLink[] = [
  {
    title: 'API Gateway Guides',
    href: '/comparison/',
    description: 'Browse comparison, alternative, and migration guides for Apache APISIX evaluation.',
  },
  coreComparisonGuides[0],
  coreComparisonGuides[1],
  {
    title: 'API Gateway Alternatives',
    href: '/alternatives/',
    description: 'Browse alternative pages for Kong, Tyk, Apigee, AWS API Gateway, NGINX, Traefik, Envoy, and Gravitee.',
  },
  {
    title: 'API Gateway Migration Guides',
    href: '/migration/',
    description: 'Browse migration guides for moving selected gateway runtime responsibilities to Apache APISIX.',
  },
];
