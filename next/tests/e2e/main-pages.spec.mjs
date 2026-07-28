import { expect, test } from '@playwright/test';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const downloads = require('../../../config/downloads.js');
const pluginGroups = require('../../../website/static/data/plugins.json');
const apisixRelease = downloads.find((project) => project.githubRepo === 'apache/apisix');
const pluginCount = pluginGroups.reduce((total, group) => total + group.plugins.length, 0);

async function expectNoPageOverflow(page) {
  const layout = await page.evaluate(() => {
    const root = document.documentElement;
    const overflow = [...document.querySelectorAll('body *')]
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          element: element.tagName.toLowerCase(),
          className: typeof element.className === 'string' ? element.className : '',
          left: Math.round(rect.left),
          right: Math.round(rect.right),
        };
      })
      .filter(({ left, right }) => left < -1 || right > root.clientWidth + 1)
      .slice(0, 5);

    return {
      clientWidth: root.clientWidth,
      scrollWidth: root.scrollWidth,
      overflow,
    };
  });

  expect(layout.scrollWidth, JSON.stringify(layout.overflow)).toBeLessThanOrEqual(layout.clientWidth);
}

async function expectImageLoaded(locator) {
  await locator.scrollIntoViewIfNeeded();
  await expect.poll(() => locator.evaluate((image) => image.naturalWidth)).toBeGreaterThan(0);
}

test('AI Gateway has complete responsive content and valid footer links', async ({ page }, testInfo) => {
  await page.goto('/ai-gateway/');

  await expect(page.getByRole('heading', {
    level: 1,
    name: 'Open-Source AI Gateway for LLMs and AI Agents',
  })).toBeVisible();
  await expect(page.locator('.feature')).toHaveCount(6);
  await expectImageLoaded(page.locator('.architecture-image'));
  await expectNoPageOverflow(page);

  if (testInfo.project.name === 'mobile-chrome') {
    const visualClearance = await page.evaluate(() => {
      const hero = document.querySelector('.ai-hero').getBoundingClientRect();
      const facts = document.querySelector('.hero-facts').getBoundingClientRect();
      return Math.round(hero.bottom - facts.bottom);
    });
    expect(visualClearance).toBeGreaterThan(280);
  }

  await expect(page.locator('footer a[href="/docs/general/events/"]')).toHaveText('Events');
  await expect(page.locator('footer a[href="/user-stories/"]')).toHaveCount(0);
});

test('Plugin Hub renders the complete catalog without page overflow', async ({ page }, testInfo) => {
  await page.goto('/plugins/');

  await expect(page.getByRole('heading', { level: 1, name: 'Powerful plugins. Open integrations.' }))
    .toBeVisible();
  await expect(page.getByTestId('plugin-group')).toHaveCount(pluginGroups.length);
  await expect(page.getByTestId('plugin-card')).toHaveCount(pluginCount);
  await expect(page.locator('[data-plugin="ai-proxy"]'))
    .toHaveAttribute('href', '/docs/apisix/plugins/ai-proxy/');
  await expectImageLoaded(page.getByTestId('plugin-card').first().locator('img'));
  await expectNoPageOverflow(page);

  if (testInfo.project.name === 'mobile-chrome') {
    const categoryNav = await page.locator('.category-nav nav').evaluate((nav) => ({
      clientWidth: nav.clientWidth,
      scrollWidth: nav.scrollWidth,
    }));
    expect(categoryNav.scrollWidth).toBeGreaterThan(categoryNav.clientWidth);
  }
});

test('Downloads exposes release artifacts, signatures, and checksums', async ({ page }) => {
  await page.goto('/downloads/');

  await expect(page.getByRole('heading', { level: 1, name: 'Downloads' })).toBeVisible();
  await expect(page.getByTestId('download-project')).toHaveCount(downloads.length);

  const apisix = page.locator('[data-project="apache/apisix"]');
  await expect(apisix).toContainText(apisixRelease.version);
  await apisix.locator('summary').click();
  await expect(apisix.getByRole('link', { name: 'ASC', exact: true })).toBeVisible();
  await expect(apisix.getByRole('link', { name: 'SHA512', exact: true })).toBeVisible();
  await expect(apisix.getByRole('link', { name: 'Source archive' }))
    .toHaveAttribute('href', `https://www.apache.org/dyn/closer.cgi/${apisixRelease.downloadPath}.tgz`);
  await expectNoPageOverflow(page);
});

test('Chinese routes keep localized primary content', async ({ page }) => {
  await page.goto('/zh/ai-gateway/');
  await expect(page.getByRole('heading', { level: 1, name: '面向 LLM 与 AI Agent 的开源 AI 网关' }))
    .toBeVisible();
  await expect(page.locator('link[rel="canonical"]'))
    .toHaveAttribute('href', 'https://apisix.apache.org/zh/ai-gateway/');
  await expectNoPageOverflow(page);

  await page.goto('/zh/plugins/');
  await expect(page.getByRole('heading', { level: 1, name: '强大的插件，开放的集成。' }))
    .toBeVisible();
  await expect(page.getByTestId('plugin-card')).toHaveCount(pluginCount);
  await expectNoPageOverflow(page);

  await page.goto('/zh/downloads/');
  await expect(page.getByRole('heading', { level: 1, name: '下载' })).toBeVisible();
  await expect(page.getByTestId('download-project')).toHaveCount(downloads.length);
  await expectNoPageOverflow(page);
});
