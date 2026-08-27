import { expect, test } from '@playwright/test';

const pages = [
  '/integrations/',
  '/integrations/redis/',
  '/cookbooks/',
  '/cookbooks/redis-ai-cache/',
  '/cookbooks/redis-shared-token-quota/',
  '/zh/integrations/',
  '/zh/integrations/redis/',
  '/zh/cookbooks/',
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
  await expect(page.getByRole('heading', { level: 1, name: 'Redis® software' })).toBeVisible();
  await page.getByRole('link', {
    name: 'Cache LLM responses using Redis® software for exact and semantic matching',
  }).click();
  await expect(page.getByRole('heading', {
    level: 1,
    name: 'Cache LLM responses using Redis® software for exact and semantic matching',
  })).toBeVisible();
});

test('catalogs derive their cards and metadata from Markdown', async ({ page }) => {
  await page.goto('/integrations/');
  await expect(page.getByRole('heading', { level: 1, name: 'Connect APISIX to your stack' })).toBeVisible();
  await expect(page.getByTestId('ecosystem-card')).toHaveCount(1);
  await expect(page.locator('[data-resource="redis"]')).toContainText('Validation in progress');
  await expect(page.locator('[data-resource="redis"]')).toHaveAttribute('href', '/integrations/redis/');
  await expect(page.locator('[data-resource="redis"] img')).toHaveCount(0);
  const integrationSchema = await jsonLd(page);
  expect(integrationSchema.find((item) => item['@type'] === 'CollectionPage').mainEntity.numberOfItems).toBe(1);
  await expectNoPageOverflow(page);

  await page.goto('/zh/cookbooks/');
  await expect(page.getByRole('heading', { level: 1, name: '运行一个完整场景，而不只是复制配置' })).toBeVisible();
  await expect(page.getByTestId('ecosystem-card')).toHaveCount(2);
  await expect(page.locator('[data-resource="redis-ai-cache"]')).toContainText('使用 Redis® 软件的精确与语义匹配缓存 LLM 响应');
  await expectNoPageOverflow(page);
});

test('Redis detail pages expose translations, relationships, and source-review boundaries', async ({ page }) => {
  test.slow();
  await page.goto('/integrations/redis/');
  await expect(page.getByRole('heading', { level: 1, name: 'Redis® software' })).toBeVisible();
  await expect(page.getByText('Publication gate:')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Cache LLM responses using Redis® software for exact and semantic matching' }))
    .toHaveAttribute('href', '/cookbooks/redis-ai-cache/');
  await expect(page.getByRole('link', { name: 'Share an LLM token quota across APISIX nodes with Redis® software' }))
    .toHaveAttribute('href', '/cookbooks/redis-shared-token-quota/');
  await expect(page.locator('link[rel="canonical"]'))
    .toHaveAttribute('href', 'https://apisix.apache.org/integrations/redis/');
  await expect(page.locator('link[rel="alternate"][hreflang="zh"]'))
    .toHaveAttribute('href', 'https://apisix.apache.org/zh/integrations/redis/');
  await expect(page.locator('script:not([type="application/ld+json"])')).toHaveCount(0);
  const schema = await jsonLd(page);
  expect(schema.some((item) => item['@type'] === 'TechArticle')).toBeTruthy();
  expect(schema.some((item) => item['@type'] === 'BreadcrumbList')).toBeTruthy();
  await expectNoPageOverflow(page);

  await page.goto('/zh/cookbooks/redis-shared-token-quota/');
  await expect(page.getByRole('heading', { level: 1, name: '使用 Redis® 软件在多个 APISIX 节点间共享 LLM token 配额' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Redis® 软件' })).toHaveAttribute('href', '/zh/integrations/redis/');
  await expect(page.locator('link[rel="canonical"]'))
    .toHaveAttribute('href', 'https://apisix.apache.org/zh/cookbooks/redis-shared-token-quota/');
  await expectNoPageOverflow(page);
});
