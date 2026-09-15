// Playwright is intentionally isolated in the Astro application's dev dependencies.
// eslint-disable-next-line import/no-extraneous-dependencies
import { expect, test } from '@playwright/test';

async function expectNoPageOverflow(page) {
  const layout = await page.evaluate(() => {
    const root = document.documentElement;
    return {
      clientWidth: root.clientWidth,
      scrollWidth: root.scrollWidth,
    };
  });

  expect(layout.scrollWidth).toBeLessThanOrEqual(layout.clientWidth);
}

async function openContentPage(page, path) {
  const response = await page.goto(path);
  expect(response?.ok()).toBeTruthy();
  await expect(page.locator('main')).toBeVisible();
  await expectNoPageOverflow(page);
}

test('English AI gateway definition stays within documented APISIX boundaries', async ({ page }) => {
  await openContentPage(page, '/blog/2025/03/06/what-is-an-ai-gateway/');

  await expect(page.getByRole('heading', {
    level: 1,
    name: 'What Is an AI Gateway? Concept and Core Features',
  })).toBeVisible();
  await expect(page.locator('main a[href="/ai-gateway/"]').first()).toBeVisible();
  await expect(page.locator('main a[href*="/ai-content-moderation/"]')).toHaveCount(0);
  await expect(page.locator('main a[href*="/ai-aws-content-moderation/"]')).toBeVisible();
  await expect(page.locator('main a[href*="/ai-aliyun-content-moderation/"]')).toBeVisible();
  await expect(page.locator('main')).not.toContainText(/MCP Gateway|MCP support|ensure business continuity/i);
});

test('Chinese AI gateway definition stays within documented APISIX boundaries', async ({ page }) => {
  await openContentPage(page, '/zh/blog/2025/03/06/what-is-an-ai-gateway/');

  await expect(page.getByRole('heading', {
    level: 1,
    name: '什么是 AI 网关？概念与核心功能',
  })).toBeVisible();
  await expect(page.locator('main a[href="/zh/ai-gateway/"]').first()).toBeVisible();
  await expect(page.locator('main a[href*="/ai-content-moderation/"]')).toHaveCount(0);
  await expect(page.locator('main')).not.toContainText(/MCP Gateway|MCP 支持|确保.*业务不中断/);
});

test('English AI gateway comparison owns comparison intent without MCP claims', async ({ page }) => {
  await openContentPage(page, '/blog/2025/03/21/ai-gateway-vs-api-gateway-differences-explained/');

  await expect(page).toHaveTitle('AI Gateway vs API Gateway: Key Differences and When to Use Each | Apache APISIX');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    'Compare AI gateways and traditional API gateways across traffic patterns, routing, token controls, streaming, security, and operations, and learn when to use each.',
  );
  await expect(page.locator('main a[href="/ai-gateway/"]')).toBeVisible();
  await expect(page.locator('main')).not.toContainText(/MCP Gateway|MCP support|MCP adapter|AI orchestrator/i);
});

test('Chinese AI gateway comparison owns comparison intent without MCP claims', async ({ page }) => {
  await openContentPage(page, '/zh/blog/2025/03/21/ai-gateway-vs-api-gateway-differences-explained/');

  await expect(page.getByRole('heading', {
    level: 1,
    name: 'AI 网关 vs API 网关：核心差异与选择方法',
  })).toBeVisible();
  await expect(page.locator('main a[href="/zh/ai-gateway/"]')).toBeVisible();
  await expect(page.locator('main')).not.toContainText(/MCP Gateway|MCP 支持|MCP 适配|AI 编排器/);
});

test('AI gateway feature guides map claims to current plugins', async ({ page }) => {
  await openContentPage(page, '/blog/2025/02/24/apisix-ai-gateway-features/');

  await expect(page.locator('main a[href="/ai-gateway/"]').first()).toBeVisible();
  await expect(page.locator('main a[href*="/ai-proxy-multi/"]')).toBeVisible();
  await expect(page.locator('main a[href*="/ai-rate-limiting/"]')).toBeVisible();
  await expect(page.locator('main a[href*="/ai-cache/"]')).toBeVisible();
  await expect(page.locator('main a[href*="/ai-lakera-guard/"]')).toBeVisible();
  await expect(page.locator('main a[href*="/ai-aws-content-moderation/"]')).toBeVisible();
  await expect(page.locator('main')).toContainText('Semantic routing does not participate in health checks, retry, or the normal fallback strategy.');
  await expect(page.locator('main')).toContainText('records provider-reported usage after a response');
  await expect(page.locator('main')).toContainText('Cache entries are scoped by Route by default, not by Consumer.');
  await expect(page.locator('main')).toContainText('cache_key.include_consumer');
  await expect(page.locator('main')).toContainText('a client-controlled header alone is not a tenant boundary');
  await expect(page.locator('main')).toContainText('Redis Search commands');
  await expect(page.locator('main')).not.toContainText('requires Redis Stack with RediSearch');
  await expect(page.locator('main')).toContainText('when used with ai-proxy or ai-proxy-multi');
  await expect(page.locator('main')).not.toContainText(/best choice|ensure business continuity|dynamically adjust LLM weights based on cost/i);

  await openContentPage(page, '/zh/blog/2025/02/24/apisix-ai-gateway-features/');
  await expect(page.locator('main a[href="/zh/ai-gateway/"]').first()).toBeVisible();
  await expect(page.locator('main a[href*="/ai-cache/"]')).toBeVisible();
  await expect(page.locator('main a[href*="/ai-lakera-guard/"]')).toBeVisible();
  await expect(page.locator('main')).toContainText('语义路由不参与健康检查、重试或常规 fallback 策略。');
  await expect(page.locator('main')).toContainText('在收到响应后记录提供商返回的用量');
  await expect(page.locator('main')).toContainText('缓存条目默认按 Route 隔离，而不是按 Consumer 隔离。');
  await expect(page.locator('main')).toContainText('cache_key.include_consumer');
  await expect(page.locator('main')).toContainText('仅由客户端控制的请求头不能作为租户隔离边界');
  await expect(page.locator('main')).toContainText('Redis Search 命令');
  await expect(page.locator('main')).toContainText('与 ai-proxy 或 ai-proxy-multi 配合后');
  await expect(page.locator('main')).not.toContainText(/最佳选择|确保.*业务不中断|根据成本、延迟、稳定性.*动态调整/);
});

test('AI agent articles do not describe APISIX as an MCP Gateway', async ({ page }) => {
  await openContentPage(page, '/blog/2026/07/10/manage-apache-apisix-with-ai-agents/');
  await expect(page.locator('main')).not.toContainText(/MCP support|MCP Gateway/i);

  await openContentPage(page, '/zh/blog/2026/07/10/manage-apache-apisix-with-ai-agents/');
  await expect(page.locator('main')).not.toContainText(/MCP 支持|MCP Gateway/);
});
