import { expect, test } from '@playwright/test';

async function alternateMap(page) {
  return page.locator('link[rel="alternate"][hreflang]').evaluateAll((links) => Object.fromEntries(
    links.map((link) => [link.getAttribute('hreflang'), link.getAttribute('href')]),
  ));
}

test('real document translations emit reciprocal hreflang', async ({ page }) => {
  const en = 'https://apisix.apache.org/docs/apisix/installation-guide/';
  const zh = 'https://apisix.apache.org/zh/docs/apisix/installation-guide/';

  await page.goto('/docs/apisix/installation-guide/');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', en);
  expect(await alternateMap(page)).toEqual({ en, zh, 'x-default': en });

  await page.goto('/zh/docs/apisix/installation-guide/');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', zh);
  expect(await alternateMap(page)).toEqual({ en, zh, 'x-default': en });
});

test('untranslated Chinese fallback docs canonicalize to English without hreflang', async ({ page }) => {
  await page.goto('/zh/docs/apisix/deployment-modes/');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://apisix.apache.org/docs/apisix/deployment-modes/',
  );
  await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(0);
});

test('plugin docs retain their API7 canonical contract', async ({ page }) => {
  await page.goto('/docs/apisix/plugins/jwt-auth/');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://docs.api7.ai/hub/jwt-auth',
  );
  await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(0);

  await page.goto('/zh/docs/apisix/plugins/jwt-auth/');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://docs.apiseven.com/hub/jwt-auth',
  );
  await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(0);
});

test('blog hreflang exists only for verified source pairs', async ({ page }) => {
  const en = 'https://apisix.apache.org/blog/2026/07/31/2026-jul-monthly-report/';
  const zh = 'https://apisix.apache.org/zh/blog/2026/07/31/2026-jul-monthly-report/';

  await page.goto('/blog/2026/07/31/2026-jul-monthly-report/');
  expect(await alternateMap(page)).toEqual({ en, zh, 'x-default': en });

  await page.goto('/zh/blog/2022/11/25/how-apisix-support-1000-pods/');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://apisix.apache.org/zh/blog/2022/11/25/how-apisix-support-1000-pods/',
  );
  await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(0);
  await expect(page.locator('header a[title="English"]')).toHaveAttribute('href', '/blog/');
});

test('explicit translation keys pair blog posts published on different dates', async ({ page }) => {
  const en = 'https://apisix.apache.org/blog/2023/03/10/release-apache-apisix-3.2.0/';
  const zh = 'https://apisix.apache.org/zh/blog/2023/03/09/release-apache-apisix-3.2.0/';

  await page.goto('/blog/2023/03/10/release-apache-apisix-3.2.0/');
  expect(await alternateMap(page)).toEqual({ en, zh, 'x-default': en });

  await page.goto('/zh/blog/2023/03/09/release-apache-apisix-3.2.0/');
  expect(await alternateMap(page)).toEqual({ en, zh, 'x-default': en });
});

test('English and Chinese blog feeds are published as valid RSS and Atom', async ({ request }) => {
  for (const [path, type, root] of [
    ['/blog/rss.xml', 'application/rss+xml', '<rss'],
    ['/blog/atom.xml', 'application/atom+xml', '<feed'],
    ['/zh/blog/rss.xml', 'application/rss+xml', '<rss'],
    ['/zh/blog/atom.xml', 'application/atom+xml', '<feed'],
  ]) {
    const response = await request.get(path);
    expect(response.ok(), path).toBe(true);
    expect(response.headers()['content-type'], path).toMatch(
      new RegExp(`(?:${type.replace('+', '\\+')}|application/xml|text/xml)`),
    );
    const body = await response.text();
    expect(body, path).toContain(root);
    expect(body, path).toContain('<title>Apache APISIX');
  }
});
