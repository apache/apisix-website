import { expect, test } from '@playwright/test';

/** Computed horizontal padding of the first element matching `selector`. */
async function inlinePadding(page, selector) {
  return page.locator(selector).first().evaluate((el) => {
    const cs = getComputedStyle(el);
    return { left: parseFloat(cs.paddingLeft), right: parseFloat(cs.paddingRight) };
  });
}

/**
 * Discover a post from the blog index rather than naming one. A hardcoded URL
 * turns an unrelated content change into a broken test; the index is the same
 * thing a reader would follow. `/blog/20…` matches dated post URLs only —
 * `/blog/page/`, `/blog/archive/` and `/blog/tags/` do not start that way.
 */
async function firstBlogPost(page) {
  await page.goto('/blog/');
  const href = await page.locator('a[href^="/blog/20"]').first().getAttribute('href');
  expect(href, 'the blog index must list at least one post').toBeTruthy();
  return href;
}

/** Padding restored and nav ahead of the article, for any docs page. */
async function assertDocsLayout(page, url) {
  await page.goto(url);

  const pad = await inlinePadding(page, '.docs-layout');
  expect(pad.left, `${url}: .docs-layout must not zero out .container padding`).toBeGreaterThan(0);
  expect(pad.right).toBeGreaterThan(0);

  // The header was always correct, so it is the reference the article should
  // match — but only once the layout stacks; see the breakpoint note below.
  const geom = await page.evaluate(() => ({
    viewport: window.innerWidth,
    h1Left: document.querySelector('.docs-content h1').getBoundingClientRect().left,
    brandLeft: document.querySelector('.site-header .brand').getBoundingClientRect().left,
    navTop: document.querySelector('.docs-sidebar').offsetTop,
    articleTop: document.querySelector('.docs-content').offsetTop,
  }));

  expect(geom.h1Left, `${url}: article text must not touch the viewport edge`).toBeGreaterThan(0);

  // Both remaining checks are breakpoint-dependent, and 960px is the line
  // where .docs-layout collapses to one column (the max-width: 960px media
  // query in global.css).
  if (geom.viewport <= 960) {
    // Stacked: the article shares the container's inline padding with the
    // header, so their left edges line up.
    expect(Math.abs(geom.h1Left - geom.brandLeft),
      `${url}: article should line up with the header brand`).toBeLessThanOrEqual(1);
    // Stacked: the nav must precede the article. This is the defect — `order: 2`
    // used to push it below.
    expect(geom.navTop, `${url}: the docs nav must come before the article`)
      .toBeLessThan(geom.articleTop);
  } else {
    // Side by side: nav and article are grid items on the same row, so their
    // offsetTop is EQUAL. Measured on production at 1440px: both 132.
    // Asserting `toBeLessThan` here would be unsatisfiable — and asserting
    // equality is the guard that catches `order` leaking out of the media
    // query and stacking the desktop layout.
    expect(geom.navTop, `${url}: nav and article should share a grid row`)
      .toBe(geom.articleTop);
  }
}

// docs/general/** ships from this repo, so it exists in the PR CI build too —
// no gate, and the fix is verified before anything is deployed.
test('general docs keep padding and put the nav above the article', async ({ page }) => {
  await assertDocsLayout(page, '/docs/general/contributor-guide/');
});

// Same assertions over the 200-link apisix tree that motivated the report.
// Gated: apisix docs need .sync/ checkouts only the deploy pipeline has.
test('apisix docs keep padding and put the nav above the article', async ({ page }) => {
  test.skip(
    process.env.EXPECT_DOCUSARUS_ROUTES !== 'true',
    'apisix docs only exist in the final overlaid tree',
  );
  await assertDocsLayout(page, '/docs/apisix/getting-started/README/');
});

test('blog posts keep their horizontal padding', async ({ page }) => {
  await page.goto(await firstBlogPost(page));
  const pad = await inlinePadding(page, '.article-wrap');
  expect(pad.left, 'blog posts share the .article-wrap defect').toBeGreaterThan(0);
  expect(pad.right).toBeGreaterThan(0);
});

test('desktop keeps the three-column article rails', async ({ page }) => {
  test.skip(test.info().project.name !== 'desktop-chrome', 'Rails only exist at >=1240px');

  await page.goto(await firstBlogPost(page));

  // Assert the rails exist before measuring them, so a post that legitimately
  // has none fails loudly here instead of silently passing a vacuous check.
  const rails = page.locator('.article-wrap.with-rails');
  await expect(rails, 'the discovered post should render the rails layout').toHaveCount(1);

  const tracks = await rails.evaluate((el) =>
    getComputedStyle(el).gridTemplateColumns.split(/\s+/).filter(Boolean).map(parseFloat));

  expect(tracks.length, 'the rails grid must stay three columns').toBe(3);

  // The count alone is VACUOUS and must not be the only assertion here.
  // `.with-rails` uses an explicit template (190px minmax(0,760px) 230px), so
  // computed gridTemplateColumns always reports three tracks no matter how
  // narrow the container gets. Measured on production: forcing the wrapper to
  // 600px still reports 3 tracks — as "190px 44px 230px", with the reading
  // column crushed. Restoring the inline padding shrinks the middle track, it
  // never removes one, so track WIDTH is the only thing worth guarding.
  // Design target is 760px; the rule's own comment allows ~680px at 1240.
  expect(tracks[1], 'the reading column must not be squeezed by the padding fix')
    .toBeGreaterThan(700);
});
