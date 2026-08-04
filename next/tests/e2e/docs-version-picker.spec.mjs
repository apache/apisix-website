import { expect, test } from '@playwright/test';

// One representative page per project and locale. A project's version picker
// markup is identical on every one of its pages, so walking all 249 pages
// would only make the suite slow.
const DOC_PAGES = [
  '/docs/apisix/getting-started/README/',
  '/zh/docs/apisix/getting-started/README/',
  '/docs/ingress-controller/overview/',
  '/docs/docker/build/',
];

for (const pagePath of DOC_PAGES) {
  test(`version links on ${pagePath} open real docs pages`, async ({ page }) => {
    test.setTimeout(120_000);
    test.skip(
      process.env.EXPECT_DOCUSARUS_ROUTES !== 'true',
      'Archived versions only exist in the final overlaid tree',
    );

    await page.goto(pagePath);
    const hrefs = await page
      .locator('.version-picker a')
      .evaluateAll((anchors) => anchors.map((a) => a.getAttribute('href')));

    expect(hrefs.length, `${pagePath} should render a version picker`).toBeGreaterThan(0);

    for (const href of hrefs) {
      await page.goto(href);
      // Assert on CONTENT, never on HTTP status. The e2e static server
      // (python3 -m http.server) answers an index-less directory with 200
      // plus a directory listing, so a status assertion would pass on the
      // exact build this test exists to reject. Production returns 403.
      await expect(
        page.locator('.docs-content h1'),
        `${href} must be a docs page, not a directory listing`,
      ).toBeVisible();
    }
  });
}

test('helm-chart offers no unreleased entry', async ({ page }) => {
  test.skip(
    process.env.EXPECT_DOCUSARUS_ROUTES !== 'true',
    'Sub-project docs only exist in the final overlaid tree',
  );

  // Docusaurus does not version-publish helm-chart, so /docs/helm-chart/next/
  // has never existed and any link to it is a 403 by construction.
  await page.goto('/docs/helm-chart/apisix/');
  await expect(page.locator('a[href^="/docs/helm-chart/next/"]')).toHaveCount(0);
});
