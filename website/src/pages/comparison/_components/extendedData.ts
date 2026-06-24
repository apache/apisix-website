import type { GatewayLandingPageData, InfoCard, MatrixRow, OptionCard, SourceLink } from './GatewayLandingPage';
import { defaultRelatedGuides } from './guideRegistry';

type ProductDescriptor = {
  shortName: string;
  fullName: string;
  category: string;
  bestFor: string;
  operatingModel: string;
  cloudNative: string;
  extensibility: string;
  decisionLens: string;
  source: SourceLink;
};

const apisixSources: SourceLink[] = [
  { label: 'Apache APISIX getting started and project overview', href: 'https://apisix.apache.org/docs/apisix/getting-started/' },
  { label: 'Apache APISIX plugin hub', href: 'https://apisix.apache.org/plugins/' },
  { label: 'Apache APISIX Ingress Controller overview', href: 'https://apisix.apache.org/docs/ingress-controller/overview/' },
  { label: 'Apache APISIX on GitHub', href: 'https://github.com/apache/apisix' },
];

const apisixResourceLinks = [
  {
    title: 'Get started with Apache APISIX',
    href: 'https://apisix.apache.org/docs/apisix/getting-started/',
    description: 'Install APISIX locally, create a first route, and add a gateway plugin.',
  },
  {
    title: 'Explore Apache APISIX plugins',
    href: '/plugins/',
    description: 'Review plugins for authentication, security, traffic control, observability, and AI traffic.',
  },
  {
    title: 'Apache APISIX Ingress Controller',
    href: 'https://apisix.apache.org/docs/ingress-controller/overview/',
    description: 'Evaluate the Kubernetes controller path for APISIX-backed ingress and gateway policy.',
  },
  {
    title: 'View Apache APISIX on GitHub',
    href: 'https://github.com/apache/apisix',
    description: 'Check source code, releases, issues, pull requests, and contribution activity.',
  },
  {
    title: 'Join the Apache APISIX community',
    href: '/docs/general/join/',
    description: 'Find community channels for questions, discussion, and project participation.',
  },
  {
    title: 'Contribute to Apache APISIX',
    href: '/docs/general/how-to-contribute/',
    description: 'Learn how to report issues, contribute code, and participate in the Apache project workflow.',
  },
];

const docsSources = {
  apisixAiGateway: { label: 'APISIX AI Gateway overview', href: 'https://apisix.apache.org/ai-gateway/' },
  apisixAiProxy: { label: 'Apache APISIX ai-proxy plugin documentation', href: 'https://apisix.apache.org/docs/apisix/plugins/ai-proxy/' },
  kong: { label: 'Kong Gateway official documentation', href: 'https://developer.konghq.com/gateway/' },
  kongKic: { label: 'Kong Ingress Controller official documentation', href: 'https://developer.konghq.com/kubernetes-ingress-controller/' },
  tyk: { label: 'Tyk official documentation', href: 'https://tyk.io/docs' },
  apigee: { label: 'Google Cloud Apigee documentation', href: 'https://docs.cloud.google.com/apigee/docs/api-platform/get-started/what-apigee' },
  aws: { label: 'Amazon API Gateway developer guide', href: 'https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html' },
  nginx: { label: 'NGINX HTTP load balancing documentation', href: 'https://docs.nginx.com/nginx/admin-guide/load-balancer/http-load-balancer/' },
  nginxIc: { label: 'NGINX Ingress Controller documentation', href: 'https://docs.nginx.com/nginx-ingress-controller/' },
  traefik: { label: 'Traefik official documentation', href: 'https://doc.traefik.io/traefik/' },
  traefikKubernetesIngress: { label: 'Traefik Kubernetes Ingress provider documentation', href: 'https://doc.traefik.io/traefik/providers/kubernetes-ingress/' },
  envoy: { label: 'Envoy official documentation', href: 'https://www.envoyproxy.io/docs/envoy/latest/intro/what_is_envoy' },
  envoyGateway: { label: 'Envoy Gateway documentation', href: 'https://gateway.envoyproxy.io/docs/' },
  gravitee: { label: 'Gravitee official documentation', href: 'https://documentation.gravitee.io/' },
  krakend: { label: 'KrakenD official documentation', href: 'https://www.krakend.io/docs/' },
  azure: { label: 'Azure API Management documentation', href: 'https://learn.microsoft.com/en-us/azure/api-management/' },
  wso2: { label: 'WSO2 API Manager documentation', href: 'https://apim.docs.wso2.com/en/latest/' },
};

const products: Record<string, ProductDescriptor> = {
  kong: {
    shortName: 'Kong',
    fullName: 'Kong Gateway',
    category: 'cloud-native API gateway and API platform ecosystem',
    bestFor: 'teams already invested in Kong Gateway, Kong-specific plugins, or Kong-oriented platform workflows',
    operatingModel: 'Kong supports multiple deployment and configuration modes, including self-managed and platform workflows.',
    cloudNative: 'Kong has Kubernetes paths through Kong Ingress Controller, which configures Kong Gateway from Kubernetes resources.',
    extensibility: 'Kong has a broad plugin ecosystem, but teams should verify which plugins and workflows are available in the edition they plan to run.',
    decisionLens: 'Kong can remain a good fit when existing tooling, training, plugins, and control-plane workflows are already standardized around Kong.',
    source: docsSources.kong,
  },
  tyk: {
    shortName: 'Tyk',
    fullName: 'Tyk',
    category: 'API gateway and API management platform',
    bestFor: 'teams prioritizing packaged API management, publishing, governance, and portal workflows',
    operatingModel: 'Tyk documentation emphasizes API management, API publishing, AI management, governance, and cloud or self-managed evaluation paths.',
    cloudNative: 'Tyk can be evaluated for cloud or self-managed operations; teams should validate Kubernetes workflows against their platform model.',
    extensibility: 'Tyk should be evaluated for its policy model, management workflows, and extension points rather than only raw gateway behavior.',
    decisionLens: 'Tyk can fit when API lifecycle and management workflows matter more than open-source gateway runtime control.',
    source: docsSources.tyk,
  },
  apigee: {
    shortName: 'Apigee',
    fullName: 'Google Cloud Apigee',
    category: 'Google Cloud API management platform',
    bestFor: 'organizations standardizing API programs around Google Cloud, API proxies, policies, analytics, and developer-facing API management',
    operatingModel: 'Apigee centers on API proxies, policies, environments, organizations, provisioning, and Google Cloud management workflows.',
    cloudNative: 'Apigee can support hybrid patterns, but teams should evaluate Google Cloud dependencies, networking, and control-plane requirements.',
    extensibility: 'Apigee offers policies and procedural code patterns; this is different from an open-source gateway plugin ecosystem.',
    decisionLens: 'Apigee can fit when the requirement is a broad API management suite tightly connected to Google Cloud rather than an open-source gateway runtime.',
    source: docsSources.apigee,
  },
  aws: {
    shortName: 'AWS API Gateway',
    fullName: 'Amazon API Gateway',
    category: 'AWS-managed API gateway service',
    bestFor: 'teams building REST, HTTP, or WebSocket APIs inside AWS with managed integration to AWS IAM, Lambda, CloudWatch, WAF, and related services',
    operatingModel: 'Amazon API Gateway is a managed AWS service for creating, publishing, maintaining, monitoring, and securing APIs.',
    cloudNative: 'It is strongest for AWS-native and serverless architectures; multi-cloud or self-managed gateway control should be evaluated separately.',
    extensibility: 'Custom behavior is typically implemented through AWS integrations, authorizers, policies, and surrounding AWS services rather than gateway plugins.',
    decisionLens: 'AWS API Gateway can fit when AWS-native managed convenience matters more than cloud-neutral or self-hosted gateway control.',
    source: docsSources.aws,
  },
  nginx: {
    shortName: 'NGINX',
    fullName: 'NGINX',
    category: 'reverse proxy and load balancer foundation',
    bestFor: 'teams that need mature reverse proxying, HTTP load balancing, TLS termination, and web infrastructure patterns',
    operatingModel: 'NGINX is commonly operated through configuration files and proxy/load-balancing primitives.',
    cloudNative: 'NGINX can be used in container and Kubernetes environments, but API gateway policy usually requires additional configuration, modules, or surrounding tooling.',
    extensibility: 'NGINX is highly flexible as a proxy foundation, but it is not the same as a plugin-first open-source API gateway experience.',
    decisionLens: 'NGINX can remain a good fit for reverse proxy and load-balancing tasks; APISIX is more directly oriented toward API gateway policy and dynamic routing.',
    source: docsSources.nginx,
  },
  traefik: {
    shortName: 'Traefik',
    fullName: 'Traefik Proxy',
    category: 'cloud-native proxy and ingress controller',
    bestFor: 'teams that want dynamic service discovery, Kubernetes ingress, middleware, and edge routing for cloud-native applications',
    operatingModel: 'Traefik uses provider discovery and dynamic configuration patterns for routing and middleware.',
    cloudNative: 'Traefik is strong for Kubernetes and container-native ingress workflows.',
    extensibility: 'Traefik middleware and provider integrations cover many proxy tasks; teams should compare this with APISIX plugin-based gateway policy.',
    decisionLens: 'Traefik can fit when ingress and dynamic discovery are primary; APISIX can fit when API gateway policy, plugins, and API traffic management are primary.',
    source: docsSources.traefik,
  },
  envoy: {
    shortName: 'Envoy',
    fullName: 'Envoy Proxy',
    category: 'L7 proxy and service mesh data-plane proxy',
    bestFor: 'teams building service mesh, xDS-based proxy architectures, or a custom gateway control plane',
    operatingModel: 'Envoy is a high-performance L7 proxy that often works with a control plane rather than as a complete API management product by itself.',
    cloudNative: 'Envoy is widely used in cloud-native infrastructure and service mesh data-plane architectures.',
    extensibility: 'Envoy has filters and xDS APIs, which are powerful but more infrastructure-oriented than an out-of-the-box API gateway plugin catalog.',
    decisionLens: 'Envoy can fit when teams need proxy primitives or service mesh integration; APISIX can fit when teams want a ready API gateway with plugins and admin APIs.',
    source: docsSources.envoy,
  },
  gravitee: {
    shortName: 'Gravitee',
    fullName: 'Gravitee',
    category: 'API management and event-native API platform',
    bestFor: 'teams evaluating API lifecycle management, developer portal, API catalog, and synchronous plus asynchronous API governance',
    operatingModel: 'Gravitee is documented as an API management platform with gateway, management, portal, and related platform components.',
    cloudNative: 'Gravitee has Kubernetes and operator-oriented documentation paths, but teams should validate the desired runtime and management architecture.',
    extensibility: 'Gravitee should be compared for API management breadth, policy model, portal workflows, and event-native API support.',
    decisionLens: 'Gravitee can fit when lifecycle management and portal workflows dominate; APISIX can fit when open-source gateway runtime control dominates.',
    source: docsSources.gravitee,
  },
  krakend: {
    shortName: 'KrakenD',
    fullName: 'KrakenD',
    category: 'declarative API gateway',
    bestFor: 'teams evaluating stateless gateway configuration, API aggregation, transformation, and predictable declarative operations',
    operatingModel: 'KrakenD is commonly evaluated through declarative gateway configuration and API composition patterns.',
    cloudNative: 'KrakenD can be run in containerized environments, but teams should compare Kubernetes operations and admin workflows against their platform needs.',
    extensibility: 'KrakenD has its own extension and configuration model; compare it with APISIX plugins when gateway policy needs are broad.',
    decisionLens: 'KrakenD can fit when declarative API composition is the center of the gateway; APISIX can fit when dynamic policy and plugin breadth are key.',
    source: docsSources.krakend,
  },
  azure: {
    shortName: 'Azure API Management',
    fullName: 'Azure API Management',
    category: 'Microsoft Azure API management service',
    bestFor: 'teams publishing APIs securely at scale to external, partner, and employee developers in Azure-centered environments',
    operatingModel: 'Azure API Management provides managed API publishing, gateway, policy, portal, monitoring, and Azure integration workflows.',
    cloudNative: 'Azure API Management is strongest for Azure-centered API programs, with documented hybrid and multicloud management concepts.',
    extensibility: 'Policy, portal, networking, and Azure integration features should be compared against APISIX plugins and self-managed gateway control.',
    decisionLens: 'Azure API Management can fit when managed Azure API program workflows matter more than open-source gateway ownership.',
    source: docsSources.azure,
  },
  wso2: {
    shortName: 'WSO2',
    fullName: 'WSO2 API Manager',
    category: 'API management platform',
    bestFor: 'teams evaluating full API design, publishing, developer portal, policy, rate limiting, deployment, and lifecycle management workflows',
    operatingModel: 'WSO2 API Manager documentation covers API design, gateway deployment, developer portal, policies, security, and lifecycle features.',
    cloudNative: 'WSO2 has deployment documentation for Kubernetes and multiple runtime patterns; compare operational complexity during evaluation.',
    extensibility: 'WSO2 should be evaluated as a broad API management platform, not only as a gateway runtime.',
    decisionLens: 'WSO2 can fit when open-source API management breadth is central; APISIX can fit when gateway runtime control and plugin-driven traffic policy are central.',
    source: docsSources.wso2,
  },
};

const sharedCards: InfoCard[] = [
  {
    title: 'Runtime fit',
    body: 'Start with what runs in the request path. A gateway runtime, API management suite, ingress controller, service mesh proxy, and reverse proxy have different jobs.',
    bullets: ['Request path ownership', 'Control plane model', 'Failure behavior', 'Operational blast radius'],
  },
  {
    title: 'Open-source boundary',
    body: 'For an Apache project website, the most important question is what a team can evaluate, deploy, modify, and operate from open source.',
    bullets: ['License', 'Governance', 'Plugin availability', 'Self-hosted operations'],
  },
  {
    title: 'Platform integration',
    body: 'Compare how each option fits Kubernetes, identity providers, observability, CI/CD, GitOps, and cloud networking.',
    bullets: ['Kubernetes', 'Authentication', 'Observability', 'Deployment workflow'],
  },
];

const apisixGuidance: InfoCard[] = [
  {
    title: 'Choose Apache APISIX when',
    body: 'You need an Apache 2.0 open-source API gateway with dynamic routing, a broad plugin hub, Apache APISIX Ingress Controller, and APISIX AI Gateway capabilities.',
    bullets: ['Open-source-first evaluation', 'Dynamic gateway policy', 'Kubernetes controller workflows', 'Plugin-driven security and observability'],
  },
  {
    title: 'Choose another option when',
    body: 'Another product may fit better when your main requirement is managed cloud convenience, a full API management suite, ingress-only routing, or service mesh data-plane control.',
    bullets: ['Cloud-managed gateway', 'Developer portal suite', 'Existing platform standard', 'Service mesh proxy requirements'],
  },
];

const ctas = {
  docs: { label: 'Get started with APISIX', href: 'https://apisix.apache.org/docs/apisix/getting-started/' },
  plugins: { label: 'Explore APISIX plugins', href: '/plugins/' },
  ingress: { label: 'Explore Apache APISIX Ingress Controller', href: 'https://apisix.apache.org/docs/ingress-controller/overview/' },
  github: { label: 'View APISIX on GitHub', href: 'https://github.com/apache/apisix' },
  aiGateway: { label: 'Explore APISIX AI Gateway', href: '/ai-gateway/' },
  apiGatewayHub: { label: 'Compare API gateways', href: '/comparison/api-gateway/' },
};

function buildPage(overrides: Partial<GatewayLandingPageData>): GatewayLandingPageData {
  return {
    seo: { title: '', description: '', canonical: '' },
    eyebrow: 'API Gateway Comparison',
    h1: '',
    deck: '',
    answerTitle: 'Short answer',
    answer: '',
    chips: ['API gateway', 'Open source', 'Kubernetes', 'Security'],
    primaryCta: ctas.docs,
    secondaryCta: ctas.plugins,
    panel: {
      title: 'How to use this page',
      body: 'Use this page as a decision guide, not a universal ranking. Validate any recommendation with a proof of concept that uses your own routes, policies, identity providers, logs, and deployment workflow.',
    },
    cardsTitle: 'What to evaluate',
    cardsIntro: 'The right gateway depends on runtime behavior, operational model, extensibility, and how much of the stack your team wants to own.',
    cards: sharedCards,
    matrixTitle: 'Feature and operating model comparison',
    matrixIntro: 'This matrix summarizes practical differences using official documentation and publicly available project pages.',
    matrixOtherLabel: 'Other option',
    matrixRows: [],
    guidanceTitle: 'How to decide',
    guidanceIntro: 'Start with use case fit, then test the highest-risk policies and rollout path before committing to a production change.',
    guidanceCards: apisixGuidance,
    resourceLinks: apisixResourceLinks,
    relatedLinks: defaultRelatedGuides,
    sources: apisixSources,
    faqs: [
      {
        question: 'Does this page compare non-open-source APISIX offerings?',
        answer: 'No. The content is written for the Apache APISIX open-source website and focuses on public documentation, open-source fit, and practical evaluation criteria.',
      },
      {
        question: 'Should a team decide from a feature table alone?',
        answer: 'No. Use the table to shortlist options, then test real routes, authentication, rate limits, logs, failure handling, and deployment workflows.',
      },
    ],
    ...overrides,
  };
}

function comparisonRows(product: ProductDescriptor): MatrixRow[] {
  return [
    {
      criterion: 'Best-fit use case',
      apisix: 'Open-source API gateway runtime for dynamic routing, plugin-based policy, observability, Kubernetes workflows, and APISIX AI Gateway capabilities.',
      other: product.bestFor,
    },
    {
      criterion: 'Operating model',
      apisix: 'APISIX uses dynamic configuration and open-source gateway primitives that platform teams can self-host, extend, and operate.',
      other: product.operatingModel,
    },
    {
      criterion: 'Cloud-native fit',
      apisix: 'Apache APISIX Ingress Controller provides the Kubernetes controller path for APISIX; APISIX Gateway itself can also be evaluated for hybrid and self-managed deployments.',
      other: product.cloudNative,
    },
    {
      criterion: 'Extensibility',
      apisix: 'APISIX has a plugin hub spanning authentication, security, traffic control, observability, transformation, protocols, and APISIX AI Gateway use cases.',
      other: product.extensibility,
    },
    {
      criterion: 'Open-source evaluation',
      apisix: 'APISIX is an Apache Software Foundation project licensed under Apache 2.0, with public code, issues, and contribution paths.',
      other: `Evaluate the open-source boundary of ${product.shortName}, including which features, policies, and operational workflows are available in the model you plan to run.`,
    },
    {
      criterion: 'Decision lens',
      apisix: 'Choose APISIX when open-source gateway control, plugin breadth, Kubernetes controller workflows, and APISIX AI Gateway capabilities are primary requirements.',
      other: product.decisionLens,
    },
  ];
}

function sourceList(...sources: SourceLink[]): SourceLink[] {
  const seen = new Set<string>();
  return [...apisixSources, ...sources].filter((source) => {
    if (seen.has(source.href)) return false;
    seen.add(source.href);
    return true;
  });
}

function option(name: string, summary: string, bestFor: string, notes: string[]): OptionCard {
  return { name, summary, bestFor, notes };
}

function optionForProduct(product: ProductDescriptor): OptionCard {
  return option(
    product.fullName,
    `${product.fullName} is commonly evaluated as a ${product.category}.`,
    `Often a fit for ${product.bestFor}.`,
    [product.operatingModel, product.decisionLens],
  );
}

const apisixOption = option(
  'Apache APISIX',
  'Apache APISIX is an Apache 2.0 open-source API gateway for dynamic routing, plugin-based policy, observability, and APISIX AI Gateway capabilities.',
  'Good fit for open-source gateway infrastructure.',
  ['Apache Software Foundation governance', '100+ plugins across gateway policy categories', 'Apache APISIX Ingress Controller for Kubernetes workflows'],
);

const apisixIngressControllerOption = option(
  'Apache APISIX Ingress Controller',
  'Apache APISIX Ingress Controller is the Kubernetes controller path for using Apache APISIX as the data plane for ingress and gateway policy.',
  'Good fit for teams that want APISIX gateway policy controlled from Kubernetes resources.',
  ['Configures Apache APISIX for Kubernetes traffic', 'Pairs Kubernetes resources with APISIX plugins and routes', 'Best evaluated separately from the APISIX Gateway runtime alone'],
);

const kongIngressControllerOption = option(
  'Kong Ingress Controller',
  'Kong Ingress Controller configures Kong Gateway from Kubernetes resources such as Ingress and HTTPRoute.',
  'Good fit for teams that already want Kong Gateway as the Kubernetes data plane.',
  ['Controller for Kong Gateway', 'Separate evaluation from Kong Gateway runtime features', 'Relevant for Kubernetes-first Kong deployments'],
);

const traefikKubernetesIngressOption = option(
  'Traefik Kubernetes Ingress',
  'Traefik can act as a Kubernetes ingress controller through its Kubernetes Ingress provider and dynamic routing model.',
  'Good fit for teams that prioritize dynamic service discovery, ingress routing, and middleware-driven edge proxying.',
  ['Kubernetes Ingress provider', 'Traefik Proxy as the data plane', 'Middleware and provider discovery model'],
);

const nginxIngressControllerOption = option(
  'NGINX Ingress Controller',
  'NGINX Ingress Controller uses NGINX or NGINX Plus as the data plane for Kubernetes ingress traffic.',
  'Good fit for teams standardized on NGINX proxy and load-balancing operations.',
  ['Kubernetes ingress controller for NGINX', 'Mature proxy and load-balancing foundation', 'Separate from generic NGINX reverse proxy comparisons'],
);

const envoyGatewayOption = option(
  'Envoy Gateway',
  'Envoy Gateway is a Kubernetes-native gateway project built around Gateway API and Envoy as the data plane.',
  'Good fit for teams evaluating Gateway API and Envoy-based gateway control.',
  ['Gateway API-oriented project', 'Envoy as the data plane', 'More controller-focused than a general Envoy proxy comparison'],
);

const kongOption = optionForProduct(products.kong);
const tykOption = optionForProduct(products.tyk);
const apigeeOption = optionForProduct(products.apigee);
const awsOption = optionForProduct(products.aws);
const nginxOption = optionForProduct(products.nginx);
const traefikOption = optionForProduct(products.traefik);
const envoyOption = optionForProduct(products.envoy);
const graviteeOption = optionForProduct(products.gravitee);
const krakendOption = optionForProduct(products.krakend);
const azureOption = optionForProduct(products.azure);
const wso2Option = optionForProduct(products.wso2);

function buildComparisonPage(product: ProductDescriptor, config: {
  slug: string;
  seoTitle: string;
  meta: string;
  h1: string;
  deck: string;
  chips: string[];
  answer: string;
  secondaryCta?: GatewayLandingPageData['secondaryCta'];
  extraSources?: SourceLink[];
}): GatewayLandingPageData {
  return buildPage({
    seo: {
      title: config.seoTitle,
      description: config.meta,
      canonical: `https://apisix.apache.org${config.slug}`,
    },
    eyebrow: `APISIX vs ${product.shortName}`,
    h1: config.h1,
    deck: config.deck,
    answer: config.answer,
    chips: config.chips,
    secondaryCta: config.secondaryCta ?? ctas.plugins,
    matrixOtherLabel: product.fullName,
    matrixRows: comparisonRows(product),
    guidanceCards: [
      apisixGuidance[0],
      {
        title: `${product.shortName} may fit when`,
        body: product.decisionLens,
        bullets: [product.category, product.bestFor, product.operatingModel],
      },
    ],
    sources: sourceList(product.source, ...(config.extraSources ?? [])),
    faqs: [
      {
        question: `Is Apache APISIX a direct replacement for ${product.shortName}?`,
        answer: `It can cover many gateway runtime requirements, but it should not be treated as a drop-in replacement for every ${product.shortName} workflow. Map routes, policies, auth, observability, deployment, and team operations before changing production traffic.`,
      },
      {
        question: `When should I choose APISIX over ${product.shortName}?`,
        answer: 'Choose APISIX when open-source gateway control, plugin-based policy, dynamic routing, Apache APISIX Ingress Controller, and APISIX AI Gateway capabilities are core requirements.',
      },
      {
        question: `When might ${product.shortName} still be a good fit?`,
        answer: product.decisionLens,
      },
      {
        question: 'What should I test in a proof of concept?',
        answer: 'Test real routes, authentication, authorization, rate limits, retries, upstream failures, logs, metrics, certificates, deployment automation, and rollback behavior.',
      },
    ],
  });
}

function buildAlternativePage(product: ProductDescriptor, config: {
  slug: string;
  seoTitle: string;
  meta: string;
  h1: string;
  deck: string;
  chips: string[];
  answer: string;
  options: OptionCard[];
  extraSources?: SourceLink[];
}): GatewayLandingPageData {
  return buildPage({
    seo: {
      title: config.seoTitle,
      description: config.meta,
      canonical: `https://apisix.apache.org${config.slug}`,
    },
    eyebrow: `${product.shortName} Alternatives`,
    h1: config.h1,
    deck: config.deck,
    answer: config.answer,
    chips: config.chips,
    secondaryCta: ctas.apiGatewayHub,
    matrixOtherLabel: `${product.shortName} alternative landscape`,
    matrixRows: comparisonRows(product),
    optionsTitle: `Top ${product.shortName} alternatives to evaluate`,
    optionsIntro: 'This shortlist is grouped by practical fit, not presented as a universal ranking. Validate each option against your own gateway, API management, and platform requirements.',
    options: config.options,
    guidanceCards: [
      apisixGuidance[0],
      {
        title: `${product.shortName} may still fit when`,
        body: product.decisionLens,
        bullets: [product.bestFor, product.operatingModel, 'Existing team knowledge or platform investment'],
      },
    ],
    sources: sourceList(product.source, ...(config.extraSources ?? [])),
    faqs: [
      {
        question: `Which ${product.shortName} alternative should teams evaluate first?`,
        answer: `Apache APISIX is a strong option when the requirement is open-source API gateway infrastructure. Other alternatives may be better when the main need is managed cloud API management, ingress-only routing, service mesh proxying, or full lifecycle API management.`,
      },
      {
        question: `Why look for a ${product.shortName} alternative?`,
        answer: 'Teams usually compare alternatives because of open-source requirements, deployment model, cloud lock-in, plugin needs, Kubernetes operations, API management scope, or rollout cost.',
      },
      {
        question: 'Should I compare alternatives with a checklist only?',
        answer: 'No. Use the checklist to narrow the field, then run a proof of concept using real routes, policies, auth, logs, metrics, and failure scenarios.',
      },
      {
        question: 'Does this page promote a non-open-source APISIX product?',
        answer: 'No. It is written for the Apache APISIX open-source website and points readers toward APISIX docs, plugins, GitHub, community, and related open-source resources.',
      },
    ],
  });
}

export const apisixVsApigee = buildComparisonPage(products.apigee, {
  slug: '/comparison/apisix-vs-apigee/',
  seoTitle: 'Apache APISIX vs Apigee: Open-Source Gateway vs API Management',
  meta: 'Compare Apache APISIX and Google Apigee across open-source gateway control, API management scope, Google Cloud fit, policies, Kubernetes, and rollout planning.',
  h1: 'Apache APISIX vs Apigee: Open-Source Gateway vs API Management',
  deck: 'A practical comparison for teams deciding whether they need an open-source API gateway runtime, a Google Cloud API management platform, or both in different parts of the architecture.',
  chips: ['apisix vs apigee', 'apigee alternative', 'open-source API gateway', 'API management'],
  answer: 'Choose Apache APISIX when you need open-source gateway runtime control, plugins, Apache APISIX Ingress Controller, and APISIX AI Gateway capabilities. Choose Apigee when the main requirement is a Google Cloud-centered API management program with API proxies, policies, analytics, and developer-facing management workflows.',
});

export const apisixVsNginx = buildComparisonPage(products.nginx, {
  slug: '/comparison/apisix-vs-nginx/',
  seoTitle: 'Apache APISIX vs NGINX: API Gateway vs Reverse Proxy',
  meta: 'Compare Apache APISIX and NGINX for API gateway policy, reverse proxying, load balancing, dynamic routing, plugins, Kubernetes, security, and observability.',
  h1: 'Apache APISIX vs NGINX: API Gateway vs Reverse Proxy',
  deck: 'A decision guide for teams deciding whether to keep gateway logic in NGINX-style proxy configuration or move API traffic policy into Apache APISIX.',
  chips: ['apisix vs nginx', 'nginx alternative', 'API gateway vs reverse proxy', 'load balancing'],
  answer: 'Use APISIX when API-specific routing, plugins, dynamic configuration, authentication, rate limits, observability, and Kubernetes gateway workflows are primary. Keep NGINX when mature reverse proxying and HTTP load balancing are the main requirements.',
});

export const apisixVsTraefik = buildComparisonPage(products.traefik, {
  slug: '/comparison/apisix-vs-traefik/',
  seoTitle: 'Apache APISIX Ingress Controller vs Traefik: Kubernetes Ingress Comparison',
  meta: 'Compare Apache APISIX Ingress Controller and Traefik across Kubernetes ingress, dynamic routing, middleware, gateway plugins, security, observability, and API traffic management.',
  h1: 'Apache APISIX Ingress Controller vs Traefik: Kubernetes Ingress Comparison',
  deck: 'A comparison for Kubernetes and platform teams evaluating Apache APISIX Ingress Controller, Traefik, dynamic service discovery, and API gateway policy.',
  chips: ['apisix vs traefik', 'traefik alternative', 'Kubernetes API gateway', 'ingress controller'],
  answer: 'Choose Apache APISIX Ingress Controller when you want Kubernetes resources to configure Apache APISIX as the data plane with APISIX plugins, security, observability, and API traffic policy. Choose Traefik when dynamic ingress routing, provider discovery, and middleware-driven edge proxying are the main fit.',
  secondaryCta: ctas.ingress,
});

export const apisixVsEnvoy = buildComparisonPage(products.envoy, {
  slug: '/comparison/apisix-vs-envoy/',
  seoTitle: 'Apache APISIX vs Envoy: API Gateway vs L7 Proxy',
  meta: 'Compare Apache APISIX and Envoy for API gateway use cases, service mesh data planes, xDS control planes, filters, Kubernetes, security, and observability.',
  h1: 'Apache APISIX vs Envoy: API Gateway vs L7 Proxy',
  deck: 'A practical boundary-setting guide for teams deciding between a ready API gateway and a lower-level L7 proxy foundation.',
  chips: ['apisix vs envoy', 'envoy alternative', 'API gateway vs proxy', 'service mesh'],
  answer: 'Use APISIX when you want an open-source API gateway with admin APIs, plugins, and gateway policy out of the box. Use Envoy when your team is building or operating a service mesh, xDS control plane, or custom proxy architecture.',
});

export const apisixVsAwsApiGateway = buildComparisonPage(products.aws, {
  slug: '/comparison/apisix-vs-aws-api-gateway/',
  seoTitle: 'Apache APISIX vs AWS API Gateway: Open-Source vs Managed API Gateway',
  meta: 'Compare Apache APISIX and Amazon API Gateway across managed AWS APIs, self-hosted gateway control, Kubernetes, hybrid cloud, security, monitoring, and rollout planning.',
  h1: 'Apache APISIX vs AWS API Gateway: Open-Source vs Managed API Gateway',
  deck: 'A comparison for teams deciding between AWS-managed API Gateway convenience and open-source gateway control with Apache APISIX.',
  chips: ['apisix vs aws api gateway', 'aws api gateway alternative', 'hybrid cloud gateway', 'serverless API gateway'],
  answer: 'Choose APISIX when cloud-neutral, self-hosted, Kubernetes, hybrid, or plugin-driven gateway control matters. Choose AWS API Gateway when the API is AWS-native and managed integration with Lambda, IAM, CloudWatch, WAF, and related AWS services is the priority.',
});

export const apisixVsGravitee = buildComparisonPage(products.gravitee, {
  slug: '/comparison/apisix-vs-gravitee/',
  seoTitle: 'Apache APISIX vs Gravitee: API Gateway Runtime vs API Management Platform',
  meta: 'Compare Apache APISIX and Gravitee across open-source gateway runtime, API management, developer portal, event-native APIs, Kubernetes, policy, and operations.',
  h1: 'Apache APISIX vs Gravitee: API Gateway Runtime vs API Management Platform',
  deck: 'A comparison for teams deciding whether their first need is a runtime API gateway or a broader API management and developer portal platform.',
  chips: ['apisix vs gravitee', 'gravitee alternative', 'API management', 'open-source API gateway'],
  answer: 'Choose APISIX when gateway runtime control, plugins, Kubernetes, and API traffic policy are primary. Choose Gravitee when the evaluation centers on API lifecycle management, developer portal, catalog, and event-native API governance.',
});

export const apisixVsKrakend = buildComparisonPage(products.krakend, {
  slug: '/comparison/apisix-vs-krakend/',
  seoTitle: 'Apache APISIX vs KrakenD: Dynamic API Gateway vs Declarative Gateway',
  meta: 'Compare Apache APISIX and KrakenD across dynamic configuration, declarative gateway design, plugins, API composition, Kubernetes, security, and observability.',
  h1: 'Apache APISIX vs KrakenD: Dynamic API Gateway vs Declarative Gateway',
  deck: 'A practical comparison for teams evaluating dynamic gateway policy against declarative API gateway and aggregation patterns.',
  chips: ['apisix vs krakend', 'krakend alternative', 'declarative API gateway', 'API composition'],
  answer: 'Choose APISIX when dynamic gateway policy, plugin breadth, and Kubernetes operations are central. Choose KrakenD when declarative API composition, aggregation, and predictable configuration are the core gateway pattern.',
});

export const apisixVsAzureApiManagement = buildComparisonPage(products.azure, {
  slug: '/comparison/apisix-vs-azure-api-management/',
  seoTitle: 'Apache APISIX vs Azure API Management: Open-Source Gateway vs Managed API Platform',
  meta: 'Compare Apache APISIX and Azure API Management across managed API publishing, open-source gateway runtime, hybrid cloud, policies, developer portal, and APISIX AI Gateway criteria.',
  h1: 'Apache APISIX vs Azure API Management: Open-Source Gateway vs Managed API Platform',
  deck: 'A comparison for teams deciding between Azure-centered API management and an open-source gateway runtime for cloud-neutral or Kubernetes use cases.',
  chips: ['apisix vs azure api management', 'azure api management alternative', 'managed API platform', 'hybrid API gateway'],
  answer: 'Choose APISIX when open-source gateway ownership, Apache APISIX Ingress Controller, plugin-driven policy, and cloud-neutral deployment are primary. Choose Azure API Management when managed API publishing, Azure integration, portal, policy, and AI gateway workflows are the primary requirement.',
});

export const apisixVsWso2ApiManager = buildComparisonPage(products.wso2, {
  slug: '/comparison/apisix-vs-wso2-api-manager/',
  seoTitle: 'Apache APISIX vs WSO2 API Manager: Open-Source Gateway vs API Management Suite',
  meta: 'Compare Apache APISIX and WSO2 API Manager across gateway runtime, API lifecycle management, developer portal, policies, Kubernetes, security, and observability.',
  h1: 'Apache APISIX vs WSO2 API Manager: Open-Source Gateway vs API Management Suite',
  deck: 'A comparison for teams deciding between APISIX as an open-source gateway runtime and WSO2 as a broader API management platform.',
  chips: ['apisix vs wso2', 'wso2 api manager alternative', 'open-source API management', 'API gateway'],
  answer: 'Choose APISIX when open-source gateway runtime control, plugins, and Kubernetes operations matter most. Choose WSO2 API Manager when full API lifecycle, developer portal, publishing, and management workflows are the primary selection criteria.',
});

export const kubernetesIngressControllerComparison = buildPage({
  seo: {
    title: 'Kubernetes Ingress Controller Comparison: APISIX, Kong, Traefik, NGINX, and Envoy Gateway',
    description: 'Compare Kubernetes ingress controller and gateway controller options including Apache APISIX Ingress Controller, Kong Ingress Controller, Traefik, NGINX Ingress Controller, and Envoy Gateway.',
    canonical: 'https://apisix.apache.org/comparison/kubernetes-ingress-controller/',
  },
  eyebrow: 'Kubernetes Ingress Controller Comparison',
  h1: 'Kubernetes Ingress Controller Comparison for Platform Teams',
  deck: 'Compare Kubernetes ingress controller and gateway controller options by controller behavior, data plane, Gateway API or Ingress support, policy model, observability, and operational ownership.',
  answer: 'Keep this comparison at the controller layer: Apache APISIX Ingress Controller should be compared with Kong Ingress Controller, Traefik Kubernetes Ingress, NGINX Ingress Controller, and Envoy Gateway. Use APISIX vs Kong Gateway or APISIX vs NGINX pages when the question is about gateway runtime or reverse proxy behavior instead.',
  chips: ['Kubernetes Ingress Controller', 'Apache APISIX Ingress Controller', 'Kong Ingress Controller', 'Gateway API'],
  primaryCta: ctas.ingress,
  secondaryCta: ctas.docs,
  cardsTitle: 'What to compare in an ingress controller',
  cardsIntro: 'This page focuses on Kubernetes controllers that translate cluster resources into gateway or proxy data-plane configuration.',
  cards: [
    {
      title: 'Controller and data plane',
      body: 'Separate the Kubernetes controller from the data plane it configures. The controller workflow and the gateway/proxy runtime are related but not identical.',
      bullets: ['Controller resources', 'Data-plane ownership', 'Change propagation', 'Failure behavior'],
    },
    {
      title: 'Kubernetes API fit',
      body: 'Check whether the controller supports the Kubernetes resources your platform team wants to standardize on.',
      bullets: ['Ingress', 'Gateway API', 'Custom resources', 'Annotations'],
    },
    {
      title: 'Policy attachment',
      body: 'Compare how each controller attaches authentication, rate limiting, TLS, traffic splitting, observability, and custom gateway behavior.',
      bullets: ['Plugins or middleware', 'Route policy', 'Security controls', 'Logs and metrics'],
    },
  ],
  matrixTitle: 'Kubernetes ingress controller comparison',
  matrixIntro: 'Compare these options as Kubernetes controllers first, then evaluate their underlying gateway or proxy data plane separately.',
  matrixOtherLabel: 'Other ingress controller options',
  matrixRows: [
    {
      criterion: 'Controller role',
      apisix: 'Apache APISIX Ingress Controller watches Kubernetes resources and configures Apache APISIX as the data plane.',
      other: 'Kong Ingress Controller configures Kong Gateway; Traefik uses its Kubernetes providers; NGINX Ingress Controller configures NGINX or NGINX Plus; Envoy Gateway configures Envoy through Gateway API-oriented workflows.',
    },
    {
      criterion: 'Data plane',
      apisix: 'Apache APISIX is the data plane, so teams can use APISIX routing, upstreams, plugins, traffic control, observability, and security behavior.',
      other: 'Other controllers use their own data planes and policy systems. Evaluate the controller and data plane together, but do not collapse them into one generic API gateway comparison.',
    },
    {
      criterion: 'Ingress and Gateway API fit',
      apisix: 'Use Apache APISIX Ingress Controller when the team wants Kubernetes-native control for APISIX-backed ingress and gateway policy.',
      other: 'Use the same lens for each alternative: confirm Ingress, Gateway API, custom resources, annotations, and rollout workflow against your platform standard.',
    },
    {
      criterion: 'Policy attachment',
      apisix: 'Apache APISIX Ingress Controller lets teams connect Kubernetes routing resources with APISIX plugins for authentication, traffic control, security, and logs.',
      other: 'Kong Ingress Controller, Traefik, NGINX Ingress Controller, and Envoy Gateway use different combinations of plugins, middleware, filters, policies, annotations, and custom resources.',
    },
    {
      criterion: 'Comparison boundary',
      apisix: 'Compare Apache APISIX Ingress Controller with other ingress or gateway controllers. Compare Apache APISIX Gateway with gateway runtimes on separate pages.',
      other: 'For Kong, compare Kong Ingress Controller at the controller layer and Kong Gateway at the gateway runtime layer. The same separation applies to NGINX, Envoy, and Traefik.',
    },
  ],
  optionsTitle: 'Kubernetes ingress controller options to evaluate',
  optionsIntro: 'Shortlist options by controller behavior, the data plane each controller configures, and how your team wants to attach gateway policy from Kubernetes.',
  options: [apisixIngressControllerOption, kongIngressControllerOption, traefikKubernetesIngressOption, nginxIngressControllerOption, envoyGatewayOption],
  sources: sourceList(docsSources.kongKic, docsSources.traefikKubernetesIngress, docsSources.nginxIc, docsSources.envoyGateway),
});

export const aiGatewayComparison = buildPage({
  seo: {
    title: 'AI Gateway Comparison: APISIX AI Gateway, Apigee, Azure API Management, Kong, and Tyk',
    description: 'Compare AI gateway options for LLM traffic management, AI proxying, LLM load balancing, retry and fallback, token rate limiting, MCP support, security, observability, and API gateway integration.',
    canonical: 'https://apisix.apache.org/comparison/ai-gateway/',
  },
  eyebrow: 'AI Gateway Comparison',
  h1: 'AI Gateway Comparison for LLMs and AI Agents',
  deck: 'A practical guide for teams extending API gateway infrastructure to LLM APIs, AI agents, AI proxying, LLM load balancing, token rate limiting, retry and fallback, MCP support, security, and observability.',
  answer: 'APISIX AI Gateway is relevant when teams want AI gateway capabilities in an open-source gateway context. It focuses on AI proxying, LLM load balancing, retry and fallback, token rate limiting, MCP support, and security for AI agents. Apigee and Azure API Management document AI gateway capabilities in managed API management environments, while Kong and Tyk should be evaluated for their own AI gateway and API management workflows.',
  chips: ['APISIX AI Gateway', 'AI gateway', 'LLM gateway', 'AI agents', 'MCP support'],
  primaryCta: ctas.aiGateway,
  secondaryCta: ctas.plugins,
  matrixOtherLabel: 'Other AI gateway options',
  matrixRows: [
    {
      criterion: 'Primary goal',
      apisix: 'Use APISIX AI Gateway to manage traffic between applications, AI agents, and LLM providers through an open-source gateway layer.',
      other: 'Managed API management platforms may package AI gateway capabilities with cloud identity, portal, analytics, and policy workflows.',
    },
    {
      criterion: 'LLM traffic concerns',
      apisix: 'Evaluate AI proxying, LLM load balancing, retry and fallback, token rate limiting, MCP support, authentication, logging, and upstream resilience.',
      other: 'Each platform should be tested for model provider support, policy granularity, observability, and operational ownership.',
    },
    {
      criterion: 'Open-source fit',
      apisix: 'APISIX keeps the evaluation centered on open-source gateway infrastructure.',
      other: 'Other options may be cloud-managed, separately packaged, or broader API management suites.',
    },
  ],
  optionsTitle: 'AI gateway options to evaluate',
  optionsIntro: 'AI gateway evaluation is still evolving. Use official documentation and a proof of concept with real LLM providers, token limits, fallback behavior, MCP tools, logs, and security controls.',
  options: [apisixOption, apigeeOption, azureOption, kongOption, tykOption],
  sources: sourceList(docsSources.apisixAiGateway, docsSources.apisixAiProxy, docsSources.apigee, docsSources.azure, docsSources.kong, docsSources.tyk),
});

export const apigeeAlternative = buildAlternativePage(products.apigee, {
  slug: '/alternatives/apigee-alternative/',
  seoTitle: 'Top Apigee Alternatives for Open-Source and Hybrid API Gateway Teams',
  meta: 'Compare Apigee alternatives including Apache APISIX, Kong, AWS API Gateway, Azure API Management, and WSO2 for API gateway and API management use cases.',
  h1: 'Top Apigee Alternatives for API Gateway and API Management Teams',
  deck: 'A practical shortlist for teams evaluating alternatives to Google Cloud Apigee, with a clear distinction between open-source gateway runtime and full API management suites.',
  chips: ['apigee alternative', 'open-source Apigee alternative', 'API management alternative', 'hybrid API gateway'],
  answer: 'APISIX is a strong Apigee alternative when the requirement is open-source gateway runtime control, Kubernetes, plugins, and cloud-neutral deployment. It is not a one-to-one replacement for every Apigee API management, portal, or analytics workflow.',
  options: [apisixOption, kongOption, awsOption, azureOption, wso2Option],
  extraSources: [docsSources.kong, docsSources.aws, docsSources.azure, docsSources.wso2],
});

export const awsApiGatewayAlternative = buildAlternativePage(products.aws, {
  slug: '/alternatives/aws-api-gateway-alternative/',
  seoTitle: 'Top AWS API Gateway Alternatives for Hybrid and Open-Source API Gateway Teams',
  meta: 'Compare AWS API Gateway alternatives including Apache APISIX, Kong, Apigee, Azure API Management, and Tyk for managed, hybrid, and open-source gateway use cases.',
  h1: 'Top AWS API Gateway Alternatives for Hybrid and Open-Source API Gateway Teams',
  deck: 'A shortlist for teams that need API gateway options beyond AWS-native managed APIs, especially for Kubernetes, hybrid cloud, self-managed, or open-source gateway control.',
  chips: ['aws api gateway alternative', 'open-source API gateway', 'hybrid API gateway', 'self-hosted API gateway'],
  answer: 'APISIX is a strong AWS API Gateway alternative when cloud-neutral deployment, Kubernetes, plugin-based policy, and self-managed gateway control matter. AWS API Gateway remains a good fit for AWS-native serverless APIs.',
  options: [apisixOption, kongOption, apigeeOption, azureOption, tykOption],
  extraSources: [docsSources.kong, docsSources.apigee, docsSources.azure, docsSources.tyk],
});

export const nginxAlternative = buildAlternativePage(products.nginx, {
  slug: '/alternatives/nginx-alternative/',
  seoTitle: 'Top NGINX Alternatives for API Gateway and Kubernetes Traffic Management',
  meta: 'Compare NGINX alternatives including Apache APISIX, Traefik, Envoy, Kong, and KrakenD for API gateway, ingress, reverse proxy, and traffic management use cases.',
  h1: 'Top NGINX Alternatives for API Gateway and Kubernetes Traffic Management',
  deck: 'A practical shortlist for teams moving beyond reverse proxy and load-balancing patterns toward API gateway policy, Kubernetes ingress, or service mesh proxying.',
  chips: ['nginx alternative', 'API gateway alternative', 'reverse proxy alternative', 'Kubernetes gateway'],
  answer: 'APISIX is a strong NGINX alternative when the task is API gateway policy, dynamic routing, authentication, rate limiting, observability, and Kubernetes gateway workflows. NGINX remains strong for reverse proxy and load balancing.',
  options: [apisixOption, traefikOption, envoyOption, kongOption, krakendOption],
  extraSources: [docsSources.traefik, docsSources.envoy, docsSources.kong, docsSources.krakend],
});

export const traefikAlternative = buildAlternativePage(products.traefik, {
  slug: '/alternatives/traefik-alternative/',
  seoTitle: 'Top Traefik Alternatives for Kubernetes API Gateway and Ingress Teams',
  meta: 'Compare Traefik alternatives including Apache APISIX, NGINX, Envoy, Kong, and KrakenD for Kubernetes ingress, API gateway policy, and proxy use cases.',
  h1: 'Top Traefik Alternatives for Kubernetes API Gateway and Ingress Teams',
  deck: 'A shortlist for teams comparing dynamic ingress routing with API gateway policy, service mesh proxying, and reverse proxy foundations.',
  chips: ['traefik alternative', 'Kubernetes ingress alternative', 'API gateway', 'cloud-native proxy'],
  answer: 'APISIX is a strong Traefik alternative when API gateway policy, plugins, security, observability, Apache APISIX Ingress Controller, and APISIX AI Gateway capabilities are more important than ingress and provider discovery alone.',
  options: [apisixOption, nginxOption, envoyOption, kongOption, krakendOption],
  extraSources: [docsSources.nginx, docsSources.envoy, docsSources.kong, docsSources.krakend],
});

export const envoyAlternative = buildAlternativePage(products.envoy, {
  slug: '/alternatives/envoy-alternative/',
  seoTitle: 'Top Envoy Alternatives for API Gateway, Proxy, and Kubernetes Teams',
  meta: 'Compare Envoy alternatives including Apache APISIX, NGINX, Traefik, Kong, and KrakenD for API gateway, service mesh, ingress, and proxy architectures.',
  h1: 'Top Envoy Alternatives for API Gateway, Proxy, and Kubernetes Teams',
  deck: 'A shortlist for teams deciding whether they need a lower-level L7 proxy, a ready API gateway, an ingress controller, or a reverse proxy foundation.',
  chips: ['envoy alternative', 'API gateway vs proxy', 'service mesh proxy', 'Kubernetes gateway'],
  answer: 'APISIX is a strong Envoy alternative when the team wants a ready API gateway with plugins and admin APIs. Envoy remains strong when the requirement is service mesh data-plane proxying or custom xDS-based architectures.',
  options: [apisixOption, nginxOption, traefikOption, kongOption, krakendOption],
  extraSources: [docsSources.nginx, docsSources.traefik, docsSources.kong, docsSources.krakend],
});

export const graviteeAlternative = buildAlternativePage(products.gravitee, {
  slug: '/alternatives/gravitee-alternative/',
  seoTitle: 'Top Gravitee Alternatives for API Gateway and API Management Teams',
  meta: 'Compare Gravitee alternatives including Apache APISIX, Kong, Tyk, WSO2, and Azure API Management for gateway runtime and API management use cases.',
  h1: 'Top Gravitee Alternatives for API Gateway and API Management Teams',
  deck: 'A shortlist for teams comparing API management platforms, developer portal workflows, open-source gateway runtimes, and cloud-managed API programs.',
  chips: ['gravitee alternative', 'API management alternative', 'open-source API gateway', 'developer portal'],
  answer: 'APISIX is a strong Gravitee alternative when the requirement is open-source gateway runtime control, plugins, Kubernetes, and API traffic policy. Gravitee may fit better when API management, portal, catalog, and event-native API workflows dominate.',
  options: [apisixOption, kongOption, tykOption, wso2Option, azureOption],
  extraSources: [docsSources.kong, docsSources.tyk, docsSources.wso2, docsSources.azure],
});
