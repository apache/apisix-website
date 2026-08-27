import type { MdModule } from './content';
import type { Locale } from './site';

export type LocalizedText = { en: string; zh: string };
export type VerificationStatus = 'verified' | 'documented' | 'validation-in-progress';
export type IntegrationCategory = 'data';
export type CookbookCategory = 'cost' | 'reliability';

interface BaseResource {
  slug: string;
  description: string;
  verification: VerificationStatus;
  owner: string;
  apisixVersion: string;
  externalVersion: string;
  reviewedAt: string;
  evidenceUrl: string;
  lastVerified?: string;
  verificationUrl?: string;
  href: string;
  mod: MdModule;
}

export interface IntegrationEntry extends BaseResource {
  kind: 'integration';
  name: string;
  category: IntegrationCategory;
  method: string;
  protocols: string[];
  icon?: string;
}

export interface CookbookEntry extends BaseResource {
  kind: 'cookbook';
  title: string;
  category: CookbookCategory;
  difficulty: string;
  duration: string;
  integrations: string[];
  plugins: string[];
}

type MdMap = { [key: string]: MdModule };

// Vite requires literal glob patterns. Files are copied here by sync-content.mjs.
const integrationEnModules = import.meta.glob('/content/integrations-en/*.md', { eager: true }) as MdMap;
const integrationZhModules = import.meta.glob('/content/integrations-zh/*.md', { eager: true }) as MdMap;
const cookbookEnModules = import.meta.glob('/content/cookbooks-en/*.md', { eager: true }) as MdMap;
const cookbookZhModules = import.meta.glob('/content/cookbooks-zh/*.md', { eager: true }) as MdMap;

export const verificationLabels: { [key: VerificationStatus]: LocalizedText } = {
  verified: { en: 'E2E verified', zh: '端到端已验证' },
  documented: { en: 'Documented', zh: '文档已核对' },
  'validation-in-progress': { en: 'Validation in progress', zh: '验证进行中' },
};

export const integrationCategoryLabels: { [key: IntegrationCategory]: LocalizedText } = {
  data: { en: 'Data stores, caching, and rate limiting', zh: '数据存储、缓存与限流' },
};

export const cookbookCategoryLabels: { [key: CookbookCategory]: LocalizedText } = {
  cost: { en: 'Cost and quotas', zh: '成本与配额' },
  reliability: { en: 'Reliability', zh: '可靠性' },
};

export function localize(locale: Locale, value: LocalizedText | string): string {
  return typeof value === 'string' ? value : value[locale];
}

function sourceName(mod: MdModule): string {
  return mod.file || 'ecosystem markdown';
}

function requiredString(mod: MdModule, key: string): string {
  const value = mod.frontmatter[key];
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`${sourceName(mod)}: frontmatter ${key} must be a non-empty string`);
  }
  return value.trim();
}

function stringArray(mod: MdModule, key: string): string[] {
  const value = mod.frontmatter[key];
  if (!Array.isArray(value) || value.length === 0 || value.some((item) => typeof item !== 'string' || item.trim() === '')) {
    throw new Error(`${sourceName(mod)}: frontmatter ${key} must be a non-empty string array`);
  }
  return value.map((item) => item.trim());
}

function modulesBySlug(modules: MdMap, locale: Locale): Map<string, MdModule> {
  return Object.values(modules).reduce((result, mod) => {
    const slug = requiredString(mod, 'slug');
    if (result.has(slug)) {
      throw new Error(`Duplicate ${locale} ecosystem slug: ${slug}`);
    }
    result.set(slug, mod);
    return result;
  }, new Map<string, MdModule>());
}

function localizedModule(
  enMod: MdModule,
  locale: Locale,
  zhBySlug: Map<string, MdModule>,
): MdModule {
  if (locale === 'en') return enMod;
  const slug = requiredString(enMod, 'slug');
  const zhMod = zhBySlug.get(slug);
  if (!zhMod) throw new Error(`${sourceName(enMod)}: missing Chinese translation for ${slug}`);
  if (requiredString(zhMod, 'translation_of') !== slug) {
    throw new Error(`${sourceName(zhMod)}: translation_of must equal ${slug}`);
  }
  return zhMod;
}

function verification(mod: MdModule): VerificationStatus {
  const value = requiredString(mod, 'verification');
  if (!['verified', 'documented', 'validation-in-progress'].includes(value)) {
    throw new Error(`${sourceName(mod)}: unsupported verification status ${value}`);
  }
  if (value === 'verified') {
    requiredString(mod, 'last_verified');
    requiredString(mod, 'verification_url');
  }
  return value as VerificationStatus;
}

function integrationCategory(mod: MdModule): IntegrationCategory {
  const value = requiredString(mod, 'category');
  if (value !== 'data') throw new Error(`${sourceName(mod)}: unsupported integration category ${value}`);
  return value;
}

function cookbookCategory(mod: MdModule): CookbookCategory {
  const value = requiredString(mod, 'category');
  if (!['cost', 'reliability'].includes(value)) {
    throw new Error(`${sourceName(mod)}: unsupported cookbook category ${value}`);
  }
  return value as CookbookCategory;
}

function integrationFromModule(
  enMod: MdModule,
  locale: Locale,
  zhBySlug: Map<string, MdModule>,
): IntegrationEntry {
  const translated = localizedModule(enMod, locale, zhBySlug);
  const slug = requiredString(enMod, 'slug');
  const status = verification(enMod);
  return {
    kind: 'integration',
    slug,
    name: requiredString(translated, 'title'),
    description: requiredString(translated, 'description'),
    category: integrationCategory(enMod),
    method: requiredString(translated, 'method'),
    verification: status,
    owner: requiredString(enMod, 'owner'),
    apisixVersion: requiredString(enMod, 'apisix_version'),
    externalVersion: requiredString(enMod, 'external_version'),
    protocols: stringArray(enMod, 'protocols'),
    reviewedAt: requiredString(enMod, 'reviewed_at'),
    evidenceUrl: requiredString(enMod, 'evidence_url'),
    ...(status === 'verified' ? {
      lastVerified: requiredString(enMod, 'last_verified'),
      verificationUrl: requiredString(enMod, 'verification_url'),
    } : {}),
    href: `/integrations/${slug}/`,
    ...(typeof enMod.frontmatter.icon === 'string' ? { icon: enMod.frontmatter.icon } : {}),
    mod: translated,
  };
}

function cookbookFromModule(
  enMod: MdModule,
  locale: Locale,
  zhBySlug: Map<string, MdModule>,
): CookbookEntry {
  const translated = localizedModule(enMod, locale, zhBySlug);
  const slug = requiredString(enMod, 'slug');
  const status = verification(enMod);
  return {
    kind: 'cookbook',
    slug,
    title: requiredString(translated, 'title'),
    description: requiredString(translated, 'description'),
    category: cookbookCategory(enMod),
    difficulty: requiredString(translated, 'difficulty'),
    duration: requiredString(translated, 'duration'),
    verification: status,
    owner: requiredString(enMod, 'owner'),
    apisixVersion: requiredString(enMod, 'apisix_version'),
    externalVersion: requiredString(enMod, 'external_version'),
    integrations: stringArray(enMod, 'integrations'),
    plugins: stringArray(enMod, 'plugins'),
    reviewedAt: requiredString(enMod, 'reviewed_at'),
    evidenceUrl: requiredString(enMod, 'evidence_url'),
    ...(status === 'verified' ? {
      lastVerified: requiredString(enMod, 'last_verified'),
      verificationUrl: requiredString(enMod, 'verification_url'),
    } : {}),
    href: `/cookbooks/${slug}/`,
    mod: translated,
  };
}

function validateTranslations(enModules: MdMap, zhModules: MdMap, collection: string): void {
  const enBySlug = modulesBySlug(enModules, 'en');
  const zhBySlug = modulesBySlug(zhModules, 'zh');
  enBySlug.forEach((_, slug) => {
    const zhMod = zhBySlug.get(slug);
    if (!zhMod) throw new Error(`${collection}: missing Chinese translation for ${slug}`);
    if (requiredString(zhMod, 'translation_of') !== slug) {
      throw new Error(`${sourceName(zhMod)}: translation_of must equal ${slug}`);
    }
  });
  zhBySlug.forEach((_, slug) => {
    if (!enBySlug.has(slug)) throw new Error(`${collection}: Chinese translation has no English source: ${slug}`);
  });
}

function build(locale: Locale): { integrations: IntegrationEntry[]; cookbooks: CookbookEntry[] } {
  validateTranslations(integrationEnModules, integrationZhModules, 'integrations');
  validateTranslations(cookbookEnModules, cookbookZhModules, 'cookbooks');
  const integrationZhBySlug = modulesBySlug(integrationZhModules, 'zh');
  const cookbookZhBySlug = modulesBySlug(cookbookZhModules, 'zh');
  const integrations = Object.values(integrationEnModules)
    .map((mod) => integrationFromModule(mod, locale, integrationZhBySlug))
    .sort((a, b) => a.name.localeCompare(b.name));
  const cookbooks = Object.values(cookbookEnModules)
    .map((mod) => cookbookFromModule(mod, locale, cookbookZhBySlug))
    .sort((a, b) => a.title.localeCompare(b.title));
  const integrationSlugs = new Set(integrations.map((entry) => entry.slug));
  cookbooks.forEach((cookbook) => {
    cookbook.integrations.forEach((slug) => {
      if (!integrationSlugs.has(slug)) {
        throw new Error(`${sourceName(cookbook.mod)}: unknown integration ${slug}`);
      }
    });
  });
  return { integrations, cookbooks };
}

export function getIntegrations(locale: Locale): IntegrationEntry[] {
  return build(locale).integrations;
}

export function getCookbooks(locale: Locale): CookbookEntry[] {
  return build(locale).cookbooks;
}

export function findIntegration(locale: Locale, slug: string): IntegrationEntry | undefined {
  return getIntegrations(locale).find((entry) => entry.slug === slug);
}

export function findCookbook(locale: Locale, slug: string): CookbookEntry | undefined {
  return getCookbooks(locale).find((entry) => entry.slug === slug);
}

export function relatedCookbooks(locale: Locale, integrationSlug: string): CookbookEntry[] {
  return getCookbooks(locale).filter((entry) => entry.integrations.includes(integrationSlug));
}
