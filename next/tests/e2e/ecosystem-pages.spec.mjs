import { expect, test } from '@playwright/test';

const pages = [
  '/integrations/',
  '/integrations/localai/',
  '/integrations/redis/',
  '/cookbooks/',
  '/cookbooks/localai-chat-completions/',
  '/cookbooks/redis-ai-cache/',
  '/cookbooks/redis-shared-token-quota/',
  '/zh/integrations/',
  '/zh/integrations/localai/',
  '/zh/integrations/redis/',
  '/zh/cookbooks/',
  '/zh/cookbooks/localai-chat-completions/',
  '/zh/cookbooks/redis-ai-cache/',
  '/zh/cookbooks/redis-shared-token-quota/',
];

async function expectNoPageOverflow(page) {
  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
}

async function jsonLd(page) {
  return JSON.parse(await page.locator('script[type="application/ld+json"]').textContent());
}

test('all Integration and Cookbook routes are generated', async ({ request }) => {
  for (const path of pages) {
    const response = await request.get(path);
    expect(response.ok(), path).toBeTruthy();
  }
});

test('header navigation reaches an Integration and its Cookbook', async ({ page }, testInfo) => {
  await page.goto('/');

  if (testInfo.project.name === 'mobile-chrome') {
    await page.locator('.mobile-toggle > summary').click();
    const docs = page.locator('.mobile-nav-group').filter({ hasText: 'Docs' });
    await docs.locator('summary').click();
    await expect(docs.getByRole('link', { name: 'Docs', exact: true })).toHaveAttribute('href', '/docs/');
    const ecosystem = page.locator('.mobile-nav-group').filter({ hasText: 'Ecosystem' });
    await ecosystem.locator('summary').click();
    await ecosystem.getByRole('link', { name: 'Integrations', exact: true }).click();
  } else {
    const ecosystem = page.locator('.main-nav .nav-drop').filter({ hasText: 'Ecosystem' });
    await ecosystem.locator('summary').click();
    await ecosystem.getByRole('link', { name: 'Integrations', exact: true }).click();
  }

  await expect(page).toHaveURL(/\/integrations\/$/);
  await page.locator('[data-resource="redis"]').click();
  await expect(page.getByRole('heading', { level: 1, name: 'Redis' })).toBeVisible();
  await page.getByRole('link', {
    name: 'Cache LLM responses with Redis: exact and semantic matching',
  }).click();
  await expect(page.getByRole('heading', {
    level: 1,
    name: 'Cache LLM responses with Redis: exact and semantic matching',
  })).toBeVisible();
});

test('catalogs derive their cards and metadata from Markdown', async ({ page }) => {
  await page.goto('/integrations/');
  await expect(page.getByRole('heading', { level: 1, name: 'Connect APISIX to your stack' })).toBeVisible();
  await expect(page.getByTestId('ecosystem-card')).toHaveCount(2);
  await expect(page.locator('[data-resource="localai"]')).toContainText('Validation in progress');
  await expect(page.locator('[data-resource="localai"]')).toHaveAttribute('href', '/integrations/localai/');
  await expect(page.locator('[data-resource="redis"]')).toContainText('Validation in progress');
  await expect(page.locator('[data-resource="redis"]')).toHaveAttribute('href', '/integrations/redis/');
  await expect(page.locator('[data-resource="redis"] img')).toHaveCount(0);
  const integrationSchema = await jsonLd(page);
  expect(integrationSchema.find((item) => item['@type'] === 'CollectionPage').mainEntity.numberOfItems).toBe(2);
  await expectNoPageOverflow(page);

  await page.goto('/zh/cookbooks/');
  await expect(page.getByRole('heading', { level: 1, name: 'Apache APISIX 实践指南' })).toBeVisible();
  await expect(page.getByTestId('ecosystem-card')).toHaveCount(3);
  await expect(page.locator('[data-resource="localai-chat-completions"]')).toContainText('通过 APISIX 代理 LocalAI Chat Completions');
  await expect(page.locator('[data-resource="redis-ai-cache"]')).toContainText('使用 Redis 缓存 LLM 响应：精确匹配与语义匹配');
  const cookbookSchema = await jsonLd(page);
  const cookbookList = cookbookSchema.find((item) => item['@type'] === 'CollectionPage').mainEntity;
  expect(cookbookList.numberOfItems).toBe(3);
  expect(cookbookList.itemListElement.map((item) => item.url)).toEqual(expect.arrayContaining([
    'https://apisix.apache.org/zh/cookbooks/localai-chat-completions/',
    'https://apisix.apache.org/zh/cookbooks/redis-ai-cache/',
    'https://apisix.apache.org/zh/cookbooks/redis-shared-token-quota/',
  ]));
  await expectNoPageOverflow(page);
});

test('LocalAI pages expose translations, relationships, and validation boundaries', async ({ page }) => {
  test.slow();
  await page.goto('/integrations/localai/');
  await expect(page.getByRole('heading', { level: 1, name: 'LocalAI' })).toBeVisible();
  await expect(page.getByText('Verification note:')).toBeVisible();
  await expect(page.locator('.resource-facts')).toContainText('LocalAI 4.7.1');
  await expect(page.locator('.resource-facts')).toContainText('HTTP, SSE');
  await expect(page.locator('.resource-prose code').filter({ hasText: /^http:\/\/localai:8080$/ }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: 'Proxy LocalAI chat completions with APISIX' }))
    .toHaveAttribute('href', '/cookbooks/localai-chat-completions/');
  await expect(page.locator('link[rel="canonical"]'))
    .toHaveAttribute('href', 'https://apisix.apache.org/integrations/localai/');
  await expect(page.locator('link[rel="alternate"][hreflang="zh"]'))
    .toHaveAttribute('href', 'https://apisix.apache.org/zh/integrations/localai/');
  await expectNoPageOverflow(page);

  await page.goto('/cookbooks/localai-chat-completions/');
  await expect(page.getByRole('heading', { level: 1, name: 'Proxy LocalAI chat completions with APISIX' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'Create the Chat Completions Route' })).toBeVisible();
  await expect(page.locator('pre code').filter({ hasText: '"proxy-rewrite"' }))
    .toContainText('xi-api-key');
  await expect(page.getByRole('link', { name: 'LocalAI', exact: true }))
    .toHaveAttribute('href', '/integrations/localai/');
  await expect(page.locator('link[rel="canonical"]'))
    .toHaveAttribute('href', 'https://apisix.apache.org/cookbooks/localai-chat-completions/');
  await expect(page.locator('link[rel="alternate"][hreflang="zh"]'))
    .toHaveAttribute('href', 'https://apisix.apache.org/zh/cookbooks/localai-chat-completions/');
  await expectNoPageOverflow(page);

  await page.goto('/zh/integrations/localai/');
  await expect(page.getByRole('heading', { level: 1, name: 'LocalAI' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: '接入方式' })).toBeVisible();
  await expect(page.getByRole('link', { name: '通过 APISIX 代理 LocalAI Chat Completions' }))
    .toHaveAttribute('href', '/zh/cookbooks/localai-chat-completions/');
  await expect(page.locator('link[rel="canonical"]'))
    .toHaveAttribute('href', 'https://apisix.apache.org/zh/integrations/localai/');
  await expect(page.locator('link[rel="alternate"][hreflang="en"]'))
    .toHaveAttribute('href', 'https://apisix.apache.org/integrations/localai/');
  await expectNoPageOverflow(page);

  await page.goto('/zh/cookbooks/localai-chat-completions/');
  await expect(page.getByRole('heading', { level: 1, name: '通过 APISIX 代理 LocalAI Chat Completions' })).toBeVisible();
  await expect(page.locator('.resource-facts')).toContainText('30 分钟');
  await expect(page.locator('pre code').filter({ hasText: '"proxy-rewrite"' }))
    .toContainText('Cookie');
  await expect(page.getByRole('link', { name: 'LocalAI', exact: true }))
    .toHaveAttribute('href', '/zh/integrations/localai/');
  await expect(page.locator('link[rel="canonical"]'))
    .toHaveAttribute('href', 'https://apisix.apache.org/zh/cookbooks/localai-chat-completions/');
  await expect(page.locator('link[rel="alternate"][hreflang="en"]'))
    .toHaveAttribute('href', 'https://apisix.apache.org/cookbooks/localai-chat-completions/');
  await expectNoPageOverflow(page);
});

test('Redis detail pages expose translations, relationships, and source-review boundaries', async ({ page }) => {
  test.slow();
  await page.goto('/integrations/redis/');
  await expect(page.getByRole('heading', { level: 1, name: 'Redis' })).toBeVisible();
  await expect(page.getByText('Verification note:')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Cache LLM responses with Redis: exact and semantic matching' }))
    .toHaveAttribute('href', '/cookbooks/redis-ai-cache/');
  await expect(page.getByRole('link', { name: 'Share an LLM token quota across APISIX nodes with Redis' }))
    .toHaveAttribute('href', '/cookbooks/redis-shared-token-quota/');
  await expect(page.locator('tr').filter({ hasText: 'Shared request quota' }))
    .toContainText('limit-count');
  await expect(page.locator('link[rel="canonical"]'))
    .toHaveAttribute('href', 'https://apisix.apache.org/integrations/redis/');
  await expect(page.locator('link[rel="alternate"][hreflang="zh"]'))
    .toHaveAttribute('href', 'https://apisix.apache.org/zh/integrations/redis/');
  await expect(page.locator('script:not([type="application/ld+json"])')).toHaveCount(0);
  const schema = await jsonLd(page);
  expect(schema.some((item) => item['@type'] === 'TechArticle')).toBeTruthy();
  expect(schema.some((item) => item['@type'] === 'BreadcrumbList')).toBeTruthy();
  await expectNoPageOverflow(page);

  await page.goto('/zh/integrations/redis/');
  await expect(page.getByRole('heading', { level: 1, name: 'Redis' })).toBeVisible();
  await expect(page.locator('tr').filter({ hasText: '共享请求配额' }))
    .toContainText('limit-count');
  await expect(page.locator('link[rel="canonical"]'))
    .toHaveAttribute('href', 'https://apisix.apache.org/zh/integrations/redis/');
  await expect(page.locator('link[rel="alternate"][hreflang="en"]'))
    .toHaveAttribute('href', 'https://apisix.apache.org/integrations/redis/');
  await expectNoPageOverflow(page);

  await page.goto('/zh/cookbooks/redis-shared-token-quota/');
  await expect(page.getByRole('heading', { level: 1, name: '使用 Redis 在多个 APISIX 节点间共享 LLM token 配额' })).toBeVisible();
  await expect(page.locator('.breadcrumbs').getByRole('link', { name: 'Cookbook', exact: true }))
    .toHaveAttribute('href', '/zh/cookbooks/');
  await expect(page.locator('.resource-facts')).toContainText('35 分钟');
  await expect(page.getByRole('link', { name: 'Redis' })).toHaveAttribute('href', '/zh/integrations/redis/');
  await expect(page.locator('link[rel="canonical"]'))
    .toHaveAttribute('href', 'https://apisix.apache.org/zh/cookbooks/redis-shared-token-quota/');
  await expectNoPageOverflow(page);
});
