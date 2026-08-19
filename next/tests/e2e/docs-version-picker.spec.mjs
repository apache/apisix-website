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
      // The static CI server can leave non-critical assets loading even after
      // the docs DOM is ready. The content assertion below is the actual
      // validity check, so waiting for the full load event only adds flakiness.
      await page.goto(href, { waitUntil: 'domcontentloaded' });
      // Assert on CONTENT, never on HTTP status. The e2e static server
      // (python3 -m http.server) answers an index-less directory with 200
      // plus a directory listing, so a status assertion would pass on the
      // exact build this test exists to reject. Production returns 403.
      //
      // Both selectors are required: current-version pages are Astro-built
      // and wrap content in .docs-content, while archived versions are still
      // Docusaurus-built and use .theme-doc-markdown instead. Do NOT relax
      // this to a bare `h1` — the 404 page that a 403 renders has exactly
      // one h1 (text "404"), so a bare h1 would pass on precisely the URLs
      // this test exists to reject.
      //
      // .first() is required, not cosmetic: some docs pages legitimately
      // render multiple h1s (python-plugin-runner's next/getting-started
      // already does), and toBeVisible() on a multi-element locator is a
      // Playwright strict-mode violation. Without it, an upstream doc gaining
      // a second `#` heading would fail the site deploy. A zero-match locator
      // still fails toBeVisible, so 404 pages and listings stay red.
      await expect(
        page.locator('.docs-content h1, .theme-doc-markdown h1').first(),
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
  // Positive anchor first: a 404, a redirect, or a blank page would all
  // satisfy toHaveCount(0), letting the test pass vacuously. Requiring the
  // page's own heading proves the docs page actually rendered before we
  // assert the unreleased link is absent. This page is Astro-built, so
  // .docs-content is the right container here.
  await expect(page.locator('.docs-content h1').first()).toBeVisible();
  await expect(page.locator('a[href^="/docs/helm-chart/next/"]')).toHaveCount(0);
});
