import type { GatewayLandingPageData, InfoCard, MatrixRow, OptionCard, SourceLink } from './GatewayLandingPage';
import { defaultRelatedGuides } from './guideRegistry';

const apisixSources: SourceLink[] = [
  { label: 'Apache APISIX getting started and project overview', href: 'https://apisix.apache.org/docs/apisix/getting-started/' },
  { label: 'Apache APISIX plugin hub', href: 'https://apisix.apache.org/plugins/' },
  { label: 'Apache APISIX Ingress Controller overview', href: 'https://apisix.apache.org/docs/ingress-controller/overview/' },
  { label: 'Apache APISIX on GitHub', href: 'https://github.com/apache/apisix' },
];

const sharedCards: InfoCard[] = [
  {
    title: 'Runtime architecture',
    body: 'Look at how configuration is stored, how data-plane nodes receive updates, and whether the gateway can operate cleanly in highly dynamic environments.',
    bullets: ['Configuration model', 'Control plane dependency', 'Change propagation', 'Failure behavior'],
  },
  {
    title: 'Open-source fit',
    body: 'For an Apache project website, the key question is how much a team can evaluate, deploy, extend, and operate from open source before choosing any commercial layer.',
    bullets: ['License and governance', 'Open plugin coverage', 'Community workflow', 'Self-hosted deployment'],
  },
  {
    title: 'Platform use cases',
    body: 'API gateways are now evaluated for microservices, Kubernetes ingress, security policy, observability, and AI/LLM traffic rather than simple request proxying alone.',
    bullets: ['Kubernetes', 'Security', 'Rate limiting', 'AI gateway readiness'],
  },
];

const apisixGuidance: InfoCard[] = [
  {
    title: 'Choose Apache APISIX when',
    body: 'You want an Apache 2.0 open-source gateway with dynamic routing, a large plugin ecosystem, Kubernetes-friendly deployment, and a path to manage both API and AI traffic.',
    bullets: ['Open-source-first evaluation', 'Frequent route and policy changes', 'Kubernetes and hybrid deployment', 'Gateway plugins for security and observability'],
  },
  {
    title: 'Evaluate other products when',
    body: 'Your team is already standardized on another platform, needs a fully managed cloud service, or prioritizes a broader API management suite over open-source gateway control.',
    bullets: ['Existing platform investment', 'Cloud-managed gateway preference', 'Packaged developer portal workflows', 'Service mesh data-plane requirements'],
  },
];

const source = {
  kong: { label: 'Kong Gateway official documentation', href: 'https://developer.konghq.com/gateway/' },
  kongKic: { label: 'Kong Ingress Controller official documentation', href: 'https://developer.konghq.com/kubernetes-ingress-controller/' },
  tyk: { label: 'Tyk official documentation', href: 'https://tyk.io/docs' },
  gravitee: { label: 'Gravitee official documentation', href: 'https://documentation.gravitee.io/' },
  traefik: { label: 'Traefik official documentation', href: 'https://doc.traefik.io/traefik/' },
  envoy: { label: 'Envoy official documentation', href: 'https://www.envoyproxy.io/docs/envoy/latest/intro/what_is_envoy' },
  krakend: { label: 'KrakenD official documentation', href: 'https://www.krakend.io/docs/' },
  nginx: { label: 'NGINX load balancing documentation', href: 'https://docs.nginx.com/nginx/admin-guide/load-balancer/http-load-balancer/' },
};

const vsKongRows: MatrixRow[] = [
  {
    criterion: 'Best-fit use case',
    apisix: 'Open-source API gateway for cloud-native traffic management, Kubernetes, plugin-driven policy, and AI gateway use cases.',
    other: 'Kong Gateway is positioned as a cloud-native API gateway for hybrid and multi-cloud microservice architectures.',
  },
  {
    criterion: 'Configuration model',
    apisix: 'APISIX uses etcd-backed dynamic configuration, which is useful when routes, upstreams, and policies change frequently.',
    other: 'Kong supports multiple deployment modes, including Konnect, on-prem, DB-backed, and DB-less workflows.',
  },
  {
    criterion: 'Kubernetes',
    apisix: 'APISIX Ingress Controller lets teams use APISIX as the gateway data plane in Kubernetes environments.',
    other: 'Kong Ingress Controller converts Kubernetes resources such as Ingress and HTTPRoute into Kong Gateway configuration.',
  },
  {
    criterion: 'Plugins and extensibility',
    apisix: 'APISIX has 100+ plugins across authentication, security, traffic, observability, transformation, AI, and other protocols.',
    other: 'Kong Gateway is extended through modules and plugins and has a broad plugin hub and ecosystem.',
  },
  {
    criterion: 'AI gateway relevance',
    apisix: 'APISIX positions AI gateway capabilities as part of its open-source gateway direction for LLM traffic management.',
    other: 'Kong also offers AI gateway-related products and plugins; evaluate open-source vs platform requirements carefully.',
  },
  {
    criterion: 'Migration lens',
    apisix: 'Evaluate route translation, plugin equivalence, authentication, observability, and staged traffic shifting.',
    other: 'Kong may remain a strong fit when teams already have Kong-specific tooling, plugins, training, or Konnect workflows.',
  },
];

const vsTykRows: MatrixRow[] = [
  {
    criterion: 'Best-fit use case',
    apisix: 'Open-source API gateway infrastructure for teams that need flexible traffic control and cloud-native deployment.',
    other: 'Tyk documentation positions the product around API management, API publishing, AI management, and API governance.',
  },
  {
    criterion: 'Open-source evaluation',
    apisix: 'APISIX is an Apache Software Foundation top-level project with direct open-source deployment and contribution paths.',
    other: 'Tyk offers cloud and self-managed evaluation paths; teams should confirm which capabilities belong to each edition.',
  },
  {
    criterion: 'API management breadth',
    apisix: 'APISIX focuses on gateway runtime capabilities and related open-source ecosystem resources.',
    other: 'Tyk emphasizes a broader API management stack, including publishing, governance, and portal workflows.',
  },
  {
    criterion: 'Security and traffic policy',
    apisix: 'APISIX plugin categories cover authentication, security, traffic control, observability, and transformation.',
    other: 'Tyk should be evaluated for its management workflows, policy configuration, and operational model.',
  },
  {
    criterion: 'Kubernetes and cloud-native',
    apisix: 'APISIX has dedicated Kubernetes ingress/controller documentation and is suited to gateway policy in dynamic environments.',
    other: 'Tyk can run self-managed or cloud; validate Kubernetes workflows against your team’s deployment model.',
  },
  {
    criterion: 'Decision lens',
    apisix: 'Choose APISIX when open-source gateway control, plugins, Kubernetes, and API/AI traffic management are primary.',
    other: 'Choose Tyk when a packaged API management experience is the dominant requirement.',
  },
];

const openSourceRows: MatrixRow[] = [
  {
    criterion: 'Gateway category',
    apisix: 'Open-source API gateway and AI gateway for API traffic management.',
    other: 'Kong and Tyk are gateway/API management platforms; Traefik is cloud-native ingress/proxy; Envoy is an L7 proxy and service mesh data plane; KrakenD is a declarative gateway; NGINX is a reverse proxy/load balancer foundation.',
  },
  {
    criterion: 'Configuration style',
    apisix: 'Dynamic etcd-backed configuration for routes, upstreams, plugins, and gateway policy.',
    other: 'Alternatives vary from database-backed, declarative files, provider discovery, xDS control planes, or reverse-proxy configuration.',
  },
  {
    criterion: 'Kubernetes fit',
    apisix: 'APISIX Ingress Controller supports APISIX as the gateway layer in Kubernetes.',
    other: 'Kong, Traefik, Envoy-based stacks, and Gravitee have Kubernetes options; evaluate whether you need ingress, Gateway API, service mesh, or API management.',
  },
  {
    criterion: 'Extensibility',
    apisix: 'APISIX plugin hub spans authentication, security, traffic, observability, transformation, AI, and protocols.',
    other: 'Extensibility differs by product: plugin hubs, middleware, filters, policy engines, or custom code frameworks.',
  },
  {
    criterion: 'Primary trade-off',
    apisix: 'Strong open-source gateway control with operational responsibility.',
    other: 'Other products may offer managed convenience, broader API management, simpler ingress routing, or service mesh alignment.',
  },
];

const kongAlternatives: OptionCard[] = [
  {
    name: 'Apache APISIX',
    summary: 'Best fit when the team wants an Apache 2.0 open-source API gateway with dynamic configuration, 100+ plugins, Kubernetes support, and AI gateway direction.',
    bestFor: 'Best for open-source-first gateway infrastructure.',
    notes: ['Apache Software Foundation governance', 'Plugin hub across security, traffic, observability, and AI', 'Kubernetes ingress controller support'],
  },
  {
    name: 'Tyk',
    summary: 'A strong alternative for teams comparing API management, API publishing, governance, and self-managed or cloud options.',
    bestFor: 'Best for API management evaluation workflows.',
    notes: ['API management and publishing docs', 'Cloud and self-managed evaluation paths', 'Governance and AI management sections in docs'],
  },
  {
    name: 'Gravitee',
    summary: 'An API management platform for managing, securing, and productizing synchronous and asynchronous APIs.',
    bestFor: 'Best for lifecycle API management and developer portal needs.',
    notes: ['API Management product', 'Developer Portal and catalog workflows', 'Kubernetes Operator documentation'],
  },
  {
    name: 'Traefik',
    summary: 'A cloud-native proxy and ingress option with Kubernetes, Docker, provider discovery, middleware, and observability docs.',
    bestFor: 'Best for Kubernetes ingress and dynamic service discovery.',
    notes: ['Kubernetes and Docker setup paths', 'Middleware and provider model', 'Observability and secure access docs'],
  },
  {
    name: 'KrakenD',
    summary: 'A declarative API gateway often evaluated for stateless gateway configuration, aggregation, transformation, and predictable operations.',
    bestFor: 'Best for declarative gateway and API composition patterns.',
    notes: ['Community documentation and product feature matrix', 'Routing and forwarding topics', 'Security, traffic, monitoring, and custom-code docs'],
  },
];

const tykAlternatives: OptionCard[] = [
  kongAlternatives[0],
  {
    name: 'Kong Gateway',
    summary: 'A mature cloud-native API gateway for hybrid and multi-cloud microservice architectures with a broad plugin ecosystem.',
    bestFor: 'Best for teams already aligned with Kong ecosystem workflows.',
    notes: ['Hybrid and multi-cloud positioning', 'Plugin hub and Gateway docs', 'Kong Ingress Controller for Kubernetes'],
  },
  kongAlternatives[2],
  kongAlternatives[4],
  kongAlternatives[3],
];

const comparisonOptions: OptionCard[] = [
  kongAlternatives[0],
  {
    name: 'Kong Gateway',
    summary: 'Cloud-native API gateway for microservices, hybrid, and multi-cloud architectures.',
    bestFor: 'Best for teams that value a mature gateway ecosystem.',
    notes: ['Gateway docs and plugin hub', 'Kubernetes ingress controller', 'Konnect/on-prem deployment options'],
  },
  {
    name: 'Tyk',
    summary: 'API management-oriented platform with cloud and self-managed evaluation paths.',
    bestFor: 'Best for API management and governance workflows.',
    notes: ['API management docs', 'API publishing and governance sections', 'Cloud and self-managed trials'],
  },
  kongAlternatives[3],
  {
    name: 'Envoy',
    summary: 'L7 proxy and communication bus designed for large service-oriented architectures and service mesh data planes.',
    bestFor: 'Best for service mesh and xDS-oriented proxy architectures.',
    notes: ['HTTP/2, HTTP/3, gRPC, routing, and filters', 'Dynamic configuration APIs', 'Strong observability model'],
  },
  kongAlternatives[2],
];

function buildPage(overrides: Partial<GatewayLandingPageData>): GatewayLandingPageData {
  return {
    seo: {
      title: '',
      description: '',
      canonical: '',
    },
    eyebrow: 'API Gateway Comparison',
    h1: '',
    deck: '',
    answerTitle: 'Short answer',
    answer: '',
    chips: ['Open source', 'API Gateway', 'Kubernetes', 'Plugins', 'Security'],
    primaryCta: { label: 'Get started with APISIX', href: 'https://apisix.apache.org/docs/apisix/getting-started/' },
    secondaryCta: { label: 'Explore APISIX plugins', href: '/plugins/' },
    panel: {
      title: 'How to read this page',
      body: 'Use this page as a decision guide, not a universal ranking. The right gateway depends on your deployment model, policy requirements, team ownership, and migration cost.',
    },
    cardsTitle: 'What to compare before choosing a gateway',
    cardsIntro: 'A useful comparison should map features to operating model and production risk, not just count checkboxes.',
    cards: sharedCards,
    matrixTitle: 'Feature and operating model comparison',
    matrixIntro: 'The matrix summarizes practical differences using official product documentation and publicly available project pages.',
    matrixOtherLabel: 'Other options',
    matrixRows: openSourceRows,
    guidanceTitle: 'How to make the decision',
    guidanceIntro: 'Start with use case fit, then validate with a small proof of concept using your real routes, policies, and observability stack.',
    guidanceCards: apisixGuidance,
    relatedLinks: defaultRelatedGuides,
    sources: apisixSources,
    faqs: [
      {
        question: 'Is Apache APISIX only for open-source users?',
        answer: 'No. APISIX is an open-source project that can be self-managed, evaluated in Kubernetes, and extended with plugins. The page keeps the focus on APISIX itself rather than commercial offerings.',
      },
      {
        question: 'Should performance decide the gateway choice?',
        answer: 'Performance matters, but it should be tested with your own route count, plugin chain, TLS settings, authentication model, and upstream behavior.',
      },
    ],
    ...overrides,
  };
}

export const apisixVsKong = buildPage({
  seo: {
    title: 'Apache APISIX vs Kong: Open-Source API Gateway Comparison',
    description: 'Compare Apache APISIX and Kong Gateway across architecture, Kubernetes, plugins, security, observability, AI gateway use cases, and migration considerations.',
    canonical: 'https://apisix.apache.org/comparison/apisix-vs-kong/',
  },
  eyebrow: 'APISIX vs Kong',
  h1: 'Apache APISIX vs Kong: Open-Source API Gateway Comparison',
  deck: 'A practical, source-backed comparison for platform teams evaluating APISIX and Kong for microservices, Kubernetes, gateway policy, and API traffic control.',
  answer: 'Choose Apache APISIX when you want an Apache 2.0 open-source gateway with dynamic configuration, 100+ plugins, Kubernetes support, and API/AI traffic management. Kong can be a good fit for teams already invested in the Kong ecosystem or its platform workflows.',
  chips: ['apisix vs kong', 'kong vs apisix', 'open-source API gateway', 'Kubernetes API gateway'],
  matrixOtherLabel: 'Kong Gateway',
  matrixRows: vsKongRows,
  guidanceCards: [
    apisixGuidance[0],
    {
      title: 'Kong may fit when',
      body: 'Kong may be a better fit when your team already runs Kong, depends on Kong-specific plugins or Konnect workflows, or prioritizes its commercial ecosystem.',
      bullets: ['Existing Kong estate', 'Kong-specific tooling', 'Konnect workflows', 'Team familiarity'],
    },
  ],
  sources: [...apisixSources, source.kong, source.kongKic],
  faqs: [
    {
      question: 'Is APISIX a direct replacement for Kong?',
      answer: 'It can replace Kong in many gateway use cases, but migration depends on routes, plugins, identity providers, observability, and rollout strategy. Run both in staging before switching traffic.',
    },
    {
      question: 'Which is better for Kubernetes?',
      answer: 'Both have Kubernetes paths. APISIX has APISIX Ingress Controller; Kong has Kong Ingress Controller. Compare how each maps Ingress, HTTPRoute, plugins, and gateway policy into your platform workflow.',
    },
    {
      question: 'Does this page rely on commercial APISIX claims?',
      answer: 'No. This comparison focuses on Apache APISIX as an open-source project and uses APISIX, Kong, and Kubernetes documentation as source material.',
    },
    {
      question: 'How should teams validate the comparison?',
      answer: 'Create a proof of concept with real routes, plugin chains, authentication, rate limits, traffic splitting, and observability requirements.',
    },
  ],
});

export const apisixVsTyk = buildPage({
  seo: {
    title: 'Apache APISIX vs Tyk: API Gateway and API Management Comparison',
    description: 'Compare Apache APISIX and Tyk across open-source gateway fit, API management, Kubernetes, plugins, security, traffic policy, and evaluation criteria.',
    canonical: 'https://apisix.apache.org/comparison/apisix-vs-tyk/',
  },
  eyebrow: 'APISIX vs Tyk',
  h1: 'Apache APISIX vs Tyk: API Gateway and API Management Comparison',
  deck: 'A focused comparison for teams deciding between an open-source gateway runtime and an API management-oriented platform.',
  answer: 'Choose Apache APISIX when open-source gateway control, plugin-based policy, Kubernetes, and API/AI traffic management are primary. Tyk may fit teams that prioritize packaged API management, API publishing, governance, and portal workflows.',
  chips: ['apisix vs tyk', 'tyk vs apisix', 'API management', 'open-source gateway'],
  matrixOtherLabel: 'Tyk',
  matrixRows: vsTykRows,
  guidanceCards: [
    apisixGuidance[0],
    {
      title: 'Tyk may fit when',
      body: 'Tyk may be a good fit when your evaluation centers on API management, publishing, governance, and developer experience workflows beyond the gateway runtime.',
      bullets: ['API management stack', 'API publishing', 'Governance workflows', 'Cloud or self-managed trials'],
    },
  ],
  sources: [...apisixSources, source.tyk],
  faqs: [
    {
      question: 'Is APISIX an API management platform like Tyk?',
      answer: 'APISIX is primarily an open-source API gateway. It handles runtime traffic management, security, routing, observability, and plugins. Tyk positions broader API management workflows in its documentation.',
    },
    {
      question: 'When should I choose APISIX over Tyk?',
      answer: 'Choose APISIX when your first requirement is gateway runtime control, open-source governance, Kubernetes traffic management, and plugin extensibility.',
    },
    {
      question: 'When might Tyk be a better fit?',
      answer: 'Tyk may fit when packaged API publishing, governance, and portal workflows are more important than open-source gateway runtime control.',
    },
    {
      question: 'What should I test before choosing?',
      answer: 'Test authentication, rate limits, gateway policy, observability, admin workflows, Kubernetes deployment, and how each product maps to your API lifecycle.',
    },
  ],
});

export const openSourceComparison = buildPage({
  seo: {
    title: 'Best Open-Source API Gateways: APISIX, Kong, Tyk, Traefik, Envoy, Gravitee, and KrakenD',
    description: 'Compare popular open-source API gateway and proxy options across architecture, Kubernetes, extensibility, security, observability, and best-fit use cases.',
    canonical: 'https://apisix.apache.org/comparison/open-source-api-gateway/',
  },
  eyebrow: 'Open-source API Gateway Comparison',
  h1: 'Best Open-Source API Gateways for Cloud-Native Teams',
  deck: 'Compare Apache APISIX, Kong, Tyk, Traefik, Envoy, Gravitee, KrakenD, and NGINX-oriented gateway architectures using practical criteria and official documentation.',
  answer: 'Apache APISIX is a strong open-source API gateway when your team needs dynamic gateway configuration, 100+ plugins, Kubernetes support, security policy, observability, and AI gateway direction. Other projects may fit better for API management suites, ingress-only routing, service mesh data planes, or reverse proxy foundations.',
  chips: ['open source API gateway', 'best API gateway', 'cloud-native gateway', 'gateway comparison'],
  matrixOtherLabel: 'Other open-source or source-available options',
  matrixRows: openSourceRows,
  optionsTitle: 'Common open-source API gateway options',
  optionsIntro: 'This shortlist focuses on products that appear frequently in API gateway evaluations and are referenced in official documentation or public project pages.',
  options: comparisonOptions,
  sources: [...apisixSources, source.kong, source.tyk, source.traefik, source.envoy, source.gravitee, source.krakend, source.nginx],
  faqs: [
    {
      question: 'What is the best open-source API gateway?',
      answer: 'There is no universal best choice. APISIX is strong for open-source gateway control, plugins, Kubernetes, and AI gateway direction. Envoy is strong as a service mesh data plane. Traefik is strong for dynamic ingress and proxy workflows. Kong, Tyk, Gravitee, and KrakenD fit different API platform and gateway patterns.',
    },
    {
      question: 'Is Envoy an API gateway?',
      answer: 'Envoy can serve edge proxy and gateway-like roles, but it is most often evaluated as an L7 proxy and service mesh data plane. Teams usually pair it with a control plane for full gateway workflows.',
    },
    {
      question: 'Is NGINX an API gateway?',
      answer: 'NGINX is a widely used reverse proxy and load balancer foundation. Teams can build API gateway behavior around it, but they should compare the required policy, plugin, management, and Kubernetes workflows directly.',
    },
    {
      question: 'Why include AI gateway criteria?',
      answer: 'Many API teams are adding LLM and AI agent traffic to their platform roadmap. If this matters to your architecture, evaluate model routing, retries, fallbacks, token-aware policy, and observability early.',
    },
  ],
});

export const apiGatewayComparison = buildPage({
  seo: {
    title: 'API Gateway Comparison: APISIX, Kong, Tyk, Traefik, Envoy, NGINX, Gravitee, and KrakenD',
    description: 'Compare API gateways and related proxy platforms by architecture, deployment model, Kubernetes support, plugins, security, observability, and AI gateway readiness.',
    canonical: 'https://apisix.apache.org/comparison/api-gateway/',
  },
  eyebrow: 'API Gateway Comparison',
  h1: 'API Gateway Comparison for Platform and Infrastructure Teams',
  deck: 'A vendor-neutral decision guide for comparing API gateways, API management platforms, ingress controllers, service mesh proxies, and reverse proxy foundations.',
  answer: 'Use Apache APISIX when open-source gateway control, dynamic traffic management, plugins, Kubernetes, and API/AI traffic policy are your primary needs. Evaluate Kong, Tyk, Gravitee, Traefik, Envoy, NGINX, and KrakenD when your requirements lean toward API platform workflows, ingress discovery, service mesh, reverse proxy operations, or declarative API composition.',
  chips: ['API gateway comparison', 'API management', 'Kubernetes ingress', 'service mesh proxy', 'open source'],
  matrixOtherLabel: 'How other gateway categories compare',
  matrixRows: openSourceRows,
  optionsTitle: 'Products commonly evaluated together',
  optionsIntro: 'The products below are grouped by practical use case rather than presented as a one-size-fits-all ranking.',
  options: comparisonOptions,
  cardsTitle: 'Evaluation dimensions for API gateway buyers',
  cardsIntro: 'The most useful comparison separates runtime gateway behavior from broader platform, portal, and management workflows.',
  cards: [
    ...sharedCards,
    {
      title: 'Commercial and operational model',
      body: 'The right option depends on whether your team wants open-source control, cloud-managed convenience, API management workflows, or a proxy foundation.',
      bullets: ['Self-managed vs managed', 'Open source vs commercial', 'Data residency', 'Upgrade ownership'],
    },
    {
      title: 'Search intent fit',
      body: 'Users searching for API gateway comparison usually want a shortlist, not a single vendor claim. This page groups options by architecture and best-fit use case.',
      bullets: ['API gateway', 'API management', 'Kubernetes ingress', 'Service mesh', 'Reverse proxy'],
    },
    {
      title: 'Proof-of-concept path',
      body: 'A meaningful comparison should end with a small PoC using real routes, identity providers, rate limits, logs, and failure scenarios.',
      bullets: ['Routes', 'Plugins', 'Auth', 'Observability'],
    },
  ],
  sources: [...apisixSources, source.kong, source.kongKic, source.tyk, source.traefik, source.envoy, source.gravitee, source.krakend, source.nginx],
});

export const kongAlternative = buildPage({
  seo: {
    title: 'Top 5 Kong Alternatives for API Gateway Teams',
    description: 'Compare top Kong alternatives including Apache APISIX, Tyk, Gravitee, Traefik, and KrakenD for open-source API gateway, Kubernetes, and API management use cases.',
    canonical: 'https://apisix.apache.org/alternatives/kong-alternative/',
  },
  eyebrow: 'Kong Alternatives',
  h1: 'Top 5 Kong Alternatives for API Gateway Teams',
  deck: 'A practical shortlist for teams looking beyond Kong Gateway and comparing open-source gateway infrastructure, API management workflows, Kubernetes ingress, and declarative API gateway options.',
  answer: 'The strongest Kong alternative depends on why you are looking. Apache APISIX is the most relevant APISIX-site recommendation when you need an Apache 2.0 open-source gateway with dynamic configuration, 100+ plugins, Kubernetes support, and AI gateway direction. Tyk, Gravitee, Traefik, and KrakenD may fit different management, ingress, or declarative gateway needs.',
  chips: ['kong alternative', 'open-source Kong alternative', 'API gateway alternative', 'Kubernetes gateway'],
  matrixOtherLabel: 'Kong alternative landscape',
  matrixRows: vsKongRows,
  optionsTitle: 'Top Kong alternatives to evaluate',
  optionsIntro: 'This list is not a universal ranking. It groups the most relevant Kong alternatives by common API gateway evaluation use cases.',
  options: kongAlternatives,
  guidanceCards: [
    apisixGuidance[0],
    {
      title: 'Also evaluate Kong when',
      body: 'Kong remains relevant if your team already uses Kong, depends on Kong-specific plugins, or values its platform and Konnect workflows.',
      bullets: ['Existing Kong deployment', 'Kong plugin requirements', 'Konnect control plane workflows', 'Kong team expertise'],
    },
  ],
  sources: [...apisixSources, source.kong, source.tyk, source.gravitee, source.traefik, source.krakend],
  faqs: [
    {
      question: 'What is the best open-source Kong alternative?',
      answer: 'Apache APISIX is a strong option for teams that want an Apache 2.0 open-source gateway with dynamic configuration, plugins, Kubernetes support, and AI gateway direction.',
    },
    {
      question: 'Why would a team look for a Kong alternative?',
      answer: 'Common reasons include open-source feature access, configuration model preferences, Kubernetes operating model, plugin needs, migration strategy, or avoiding commitment to a specific commercial platform workflow.',
    },
    {
      question: 'Should I migrate from Kong immediately?',
      answer: 'No. Compare route models, plugin equivalence, identity providers, observability, and rollout risk first. Run APISIX in staging or in parallel before switching production traffic.',
    },
    {
      question: 'Are Tyk and Gravitee gateway alternatives or API management alternatives?',
      answer: 'They are often evaluated in API management contexts. If your requirement is purely gateway runtime control, compare that separately from portal, governance, and lifecycle management.',
    },
  ],
});

export const tykAlternative = buildPage({
  seo: {
    title: 'Top 5 Tyk Alternatives for Open-Source API Gateway and API Management Evaluation',
    description: 'Compare top Tyk alternatives including Apache APISIX, Kong, Gravitee, KrakenD, and Traefik for API gateway, Kubernetes, traffic policy, and API management use cases.',
    canonical: 'https://apisix.apache.org/alternatives/tyk-alternative/',
  },
  eyebrow: 'Tyk Alternatives',
  h1: 'Top 5 Tyk Alternatives for API Gateway and API Management Teams',
  deck: 'A structured shortlist for teams comparing Tyk with open-source API gateway runtimes, API management platforms, Kubernetes ingress options, and declarative gateways.',
  answer: 'Apache APISIX is a strong Tyk alternative when your first requirement is an open-source gateway runtime with dynamic traffic management, plugins, Kubernetes support, and API/AI gateway direction. Kong, Gravitee, KrakenD, and Traefik may fit other API platform, management, or ingress-focused requirements.',
  chips: ['tyk alternative', 'open-source Tyk alternative', 'API management alternative', 'gateway comparison'],
  matrixOtherLabel: 'Tyk alternative landscape',
  matrixRows: vsTykRows,
  optionsTitle: 'Top Tyk alternatives to evaluate',
  optionsIntro: 'Use this shortlist to separate gateway runtime requirements from API management, portal, governance, and ingress requirements.',
  options: tykAlternatives,
  guidanceCards: [
    apisixGuidance[0],
    {
      title: 'Also evaluate Tyk when',
      body: 'Tyk remains relevant when your team prioritizes its API management, publishing, governance, AI management, or cloud/self-managed platform workflows.',
      bullets: ['API management stack', 'Governance and publishing', 'Portal workflows', 'Existing Tyk deployment'],
    },
  ],
  sources: [...apisixSources, source.tyk, source.kong, source.gravitee, source.krakend, source.traefik],
  faqs: [
    {
      question: 'What is the best Tyk alternative for open-source gateway infrastructure?',
      answer: 'Apache APISIX is a strong candidate when you need open-source API gateway control, dynamic configuration, plugins, Kubernetes support, and APISIX AI Gateway direction.',
    },
    {
      question: 'Is Kong a Tyk alternative?',
      answer: 'Yes, Kong is commonly evaluated against Tyk for API gateway and API platform use cases. The better fit depends on deployment model, plugin needs, management workflows, and existing team expertise.',
    },
    {
      question: 'Is Gravitee closer to Tyk than APISIX?',
      answer: 'Gravitee is closer to Tyk when the evaluation centers on API management lifecycle, portal, catalog, and governance. APISIX is closer when gateway runtime control is the primary need.',
    },
    {
      question: 'How should I compare Tyk alternatives?',
      answer: 'Separate gateway runtime requirements from API management requirements, then test routing, authentication, rate limits, observability, Kubernetes operations, and migration cost.',
    },
  ],
});
