import { expect, test } from '@playwright/test';

const PRODUCTION = 'https://apisix.apache.org';
const baseURL = (process.env.PLAYWRIGHT_BASE_URL ?? 'http://127.0.0.1:4321').replace(/\/$/, '');

const matomoStub = `(() => {
  const commands = [];
  window.__matomoCommands = commands;
  (window._paq || []).forEach((command) => commands.push(command));
  window._paq = { push: (...pushed) => pushed.forEach((command) => commands.push(command)) };
})();`;

async function serveAsProduction(page) {
  await page.route('https://analytics.apache.org/**', async (route) => {
    if (new URL(route.request().url()).pathname === '/matomo.js') {
      await route.fulfill({ contentType: 'text/javascript', body: matomoStub });
    } else {
      await route.fulfill({ status: 204, body: '' });
    }
  });
  await page.route(`${PRODUCTION}/**`, async (route) => {
    const { pathname, search } = new URL(route.request().url());
    const response = await route.fetch({ url: `${baseURL}${pathname}${search}` });
    await route.fulfill({ response });
  });
}

test.afterEach(async ({ page }) => {
  await page.unrouteAll({ behavior: 'ignoreErrors' });
});

const recorded = (page) => page.waitForFunction(() => window.__matomoCommands, null, { timeout: 10_000 })
  .then(() => page.evaluate(() => window.__matomoCommands));

const pageViews = (commands) => {
  const views = [];
  let pending = {};
  commands.forEach(([name, value]) => {
    if (name === 'setCustomUrl') pending.url = value;
    if (name === 'setDocumentTitle') pending.title = value;
    if (name === 'setReferrerUrl') pending.referrer = value;
    if (name === 'trackPageView') {
      views.push(pending);
      pending = { ...pending, referrer: undefined };
    }
  });
  return views;
};

test('Astro pages send one cookieless page view to site 17', async ({ page, context }) => {
  await serveAsProduction(page);
  for (const path of ['/', '/zh/', '/blog/', '/integrations/redis/']) {
    await page.goto(`${PRODUCTION}${path}`);
    const commands = await recorded(page);
    expect(commands).toContainEqual(['disableCookies']);
    expect(commands).toContainEqual(['setSiteId', '17']);
    expect(commands).toContainEqual(['setTrackerUrl', 'https://analytics.apache.org/matomo.php']);
    expect(pageViews(commands)).toEqual([
      { url: `${PRODUCTION}${path}`, title: await page.title() },
    ]);
  }
  expect(await context.cookies()).toEqual([]);
});

test('non-production hosts load no tracker', async ({ page }) => {
  const requests = [];
  await page.route('https://analytics.apache.org/**', async (route) => {
    requests.push(route.request().url());
    await route.abort();
  });
  await page.goto('/');
  await page.waitForTimeout(3_500);
  expect(await page.evaluate(() => window._paq)).toBeUndefined();
  expect(requests).toEqual([]);
});

test('Docusaurus client-side navigation is tracked once per page', async ({ page }) => {
  test.setTimeout(90_000);
  test.skip(
    process.env.EXPECT_DOCUSARUS_ROUTES !== 'true'
      || test.info().project.name !== 'desktop-chrome',
    'Docusaurus archives only exist in the final overlaid tree',
  );

  await serveAsProduction(page);
  const start = `${PRODUCTION}/docs/apisix/next/plugins/cors/`;
  await page.goto(start);
  await expect(page.locator('#__docusaurus')).toHaveCount(1);
  const startTitle = await page.title();
  expect(pageViews(await recorded(page))).toEqual([{ url: start, title: startTitle }]);

  const anchor = page.locator('.table-of-contents a[href^="#"]').first();
  await anchor.click();
  await expect(page).toHaveURL(/#/);

  const target = page
    .locator('.menu a.menu__link[href^="/docs/apisix/next/"]:not([href*="/plugins/cors/"]):visible')
    .first();
  const targetPath = await target.getAttribute('href');
  await target.click();
  await expect(page).toHaveURL(`${PRODUCTION}${targetPath}`);
  await expect.poll(async () => pageViews(await recorded(page)).length).toBe(2);

  const [, view] = pageViews(await recorded(page));
  expect(view.url).toBe(`${PRODUCTION}${targetPath}`);
  expect(view.referrer).toBe(start);
  expect(view.title).toBe(await page.title());
  expect(view.title).not.toBe(startTitle);

  await page.goBack();
  await expect(page).toHaveURL(/\/plugins\/cors\//);
  await expect.poll(async () => pageViews(await recorded(page)).length).toBe(3);
  expect(pageViews(await recorded(page))[2].title).toBe(startTitle);
});
