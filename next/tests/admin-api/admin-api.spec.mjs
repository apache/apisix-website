/* eslint-disable no-await-in-loop -- Each search dialog must close before the next shortcut. */
import { test, expect } from '@playwright/test';

// Run against the combined production output, including Docusaurus archives.
// Do not substitute another release's JSON: success is a readiness check for
// the canonical sources, while interception below tests failure recovery.
const scalarUrl = 'https://cdn.jsdelivr.net/npm/@scalar/api-reference@1.75.1/dist/browser/standalone.js';
let scalarBundle;
test.beforeAll(async ({ request }) => {
  const response = await request.get(scalarUrl);
  expect(response.ok()).toBeTruthy();
  scalarBundle = await response.body();
});
test.beforeEach(async ({ page }, testInfo) => {
  if (testInfo.title.includes('scalar-script')) return;
  await page.route(scalarUrl, (route) => route.fulfill({
    body: scalarBundle,
    contentType: 'application/javascript',
  }));
});

const versions = ['', '3.16/', '3.17/', '3.18/', 'next/'];
['', '/zh'].forEach((locale) => {
  versions.forEach((version) => {
    const route = `${locale}/docs/apisix/${version}admin-api/`;
    test(`${route} renders, downloads, switches versions and owns the search shortcut`, async ({ page }) => {
      test.setTimeout(60000);
      await page.goto(route, { waitUntil: 'domcontentloaded' });
      const reference = page.locator('#admin-api-reference');
      await expect(reference).toBeVisible({ timeout: 16000 });
      await expect(page.locator('#api-reference-loading')).toHaveCount(0);
      await expect(page.locator('#admin-api-markdown')).toBeHidden();
      const download = page.locator('.api-download');
      const href = await download.getAttribute('href');
      expect(new URL(href, page.url()).origin).toBe(new URL(page.url()).origin);
      const response = await page.request.get(href);
      expect(response.ok()).toBeTruthy();
      const spec = await response.json();
      expect(spec.openapi).toMatch(/^3\./);
      if (version === 'next/') {
        await expect(page.locator('.scalar-api-reference .badge', { hasText: 'Next' })).toBeVisible();
        expect(spec.info.version).not.toBe('Next');
      } else if (version) expect(spec.info.version).toMatch(new RegExp(`^${version.slice(0, -1).replace('.', '\\.')}([.]|$)`));
      const downloaded = page.waitForEvent('download');
      await download.click();
      expect((await downloaded).suggestedFilename()).toBe('apisix-admin-api.json');
      await page.locator('.api-version summary').click();
      await expect(page.locator('.api-version a[aria-current="page"]')).toHaveCount(1);
      await expect(page.locator('.api-version a', { hasText: '3.18' })).toHaveAttribute('href', `${locale}/docs/apisix/3.18/admin-api/`);
      await page.keyboard.press('Escape');
      await expect(page.locator('.api-version')).not.toHaveAttribute('open', '');
      // Search dialogs must be opened and closed sequentially.
      // eslint-disable-next-line no-restricted-syntax
      for (const shortcut of ['Control+k', 'Meta+k']) {
        await page.keyboard.press(shortcut);
        await expect(page.locator('.scalar-modal-layout')).toHaveCount(1);
        await expect(page.locator('.DocSearch-Container')).toHaveCount(0);
        await page.keyboard.press(shortcut);
        await expect(page.locator('.scalar-modal-layout')).toHaveCount(1);
        await page.keyboard.press('Escape');
      }
      const hasNoOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth + 1,
      );
      expect(hasNoOverflow).toBeTruthy();
      const destination = version === 'next/' ? '' : 'next';
      const destinationHref = `${locale}/docs/apisix/${destination ? `${destination}/` : ''}admin-api/`;
      await page.locator('.api-version summary').click();
      await page.locator(`.api-version a[href="${destinationHref}"]`).click();
      await expect(page).toHaveURL(new RegExp(`/apisix/${destination ? `${destination}/` : ''}admin-api/$`));
      await expect(page.locator('#admin-api-reference')).toBeVisible({ timeout: 16000 });
    });

    test(`${route} is readable without JavaScript`, async ({ browser, baseURL }) => {
      const context = await browser.newContext({ javaScriptEnabled: false });
      const page = await context.newPage();
      await page.goto(`${baseURL}${route}`, { waitUntil: 'domcontentloaded' });
      await expect(page.locator('#admin-api-markdown')).toBeVisible();
      await expect(page.locator('#admin-api-openapi')).toBeHidden();
      await context.close();
    });

    ['missing', 'invalid-json', 'invalid-spec', 'network', 'timeout', 'scalar-script'].forEach((mode) => {
      test(`${route} restores Markdown on ${mode}`, async ({ page }) => {
        if (mode === 'timeout') await page.clock.install();
        if (mode === 'scalar-script') {
          await page.route('**/standalone.js', (request) => request.abort());
        } else {
          await page.route('**/*admin-api*.json', (request) => {
            if (mode === 'missing') return request.fulfill({ status: 404, body: '' });
            if (mode === 'network') return request.abort();
            if (mode === 'timeout') return new Promise(() => {});
            return request.fulfill({ contentType: 'application/json', body: mode === 'invalid-json' ? '{' : '{"openapi":3,"paths":null}' });
          });
        }
        const requested = mode === 'timeout' ? page.waitForRequest('**/*admin-api*.json') : undefined;
        await page.goto(route, { waitUntil: 'domcontentloaded' });
        if (mode === 'timeout') {
          await requested;
          await expect(page.locator('#api-reference-loading')).toBeVisible();
          await page.clock.fastForward(16000);
        }
        await expect(page.locator('#admin-api-markdown')).toBeVisible({ timeout: 16000 });
        await expect(page.locator('#admin-api-openapi')).toBeHidden();
        const hasNoOverflow = await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth + 1,
        );
        expect(hasNoOverflow).toBeTruthy();
      });
    });
  });

  test(`${locale}/docs/apisix/3.15/admin-api/ remains Markdown-only`, async ({ page }) => {
    await page.goto(`${locale}/docs/apisix/3.15/admin-api/`, { waitUntil: 'domcontentloaded' });
    await expect(page.locator('#admin-api-openapi')).toHaveCount(0);
    await expect(page.locator('article')).toBeVisible();
  });
});
