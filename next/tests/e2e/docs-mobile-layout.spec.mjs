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

// `/edit/` is the one .article-wrap page present in every build, including the
// content-less local one, so this check needs no gate and runs everywhere.
test('the edit page keeps its horizontal padding', async ({ page }) => {
  await page.goto('/edit/');
  const pad = await inlinePadding(page, '.article-wrap');
  expect(pad.left, '.article-wrap must not zero out .container padding').toBeGreaterThan(0);
  expect(pad.right).toBeGreaterThan(0);
});

// Docs and blog article pages only exist in the assembled tree, so the rest is
// gated the same way main-pages.spec.mjs:141 gates its overlay checks.
test('docs pages keep horizontal padding and put the nav above the article', async ({ page }) => {
  test.skip(
    process.env.EXPECT_DOCUSARUS_ROUTES !== 'true',
    'Docs pages only exist in the final overlaid tree',
  );

  await page.goto('/docs/apisix/getting-started/README/');

  const pad = await inlinePadding(page, '.docs-layout');
  expect(pad.left, '.docs-layout must not zero out .container padding').toBeGreaterThan(0);
  expect(pad.right).toBeGreaterThan(0);

  // The header was always correct, so it is the reference the article should
  // match. Only meaningful below the 1140px container cap, where both are full
  // width; above it the centred container makes the comparison meaningless.
  const geom = await page.evaluate(() => ({
    viewport: window.innerWidth,
    h1Left: document.querySelector('.docs-content h1').getBoundingClientRect().left,
    brandLeft: document.querySelector('.site-header .brand').getBoundingClientRect().left,
    navTop: document.querySelector('.docs-sidebar').offsetTop,
    articleTop: document.querySelector('.docs-content').offsetTop,
  }));

  expect(geom.h1Left, 'article text must not touch the viewport edge').toBeGreaterThan(0);
  if (geom.viewport <= 1140) {
    expect(Math.abs(geom.h1Left - geom.brandLeft),
      'article should line up with the header brand').toBeLessThanOrEqual(1);
  }
  expect(geom.navTop, 'the docs nav must come before the article').toBeLessThan(geom.articleTop);
});

test('blog posts keep their horizontal padding', async ({ page }) => {
  test.skip(
    process.env.EXPECT_DOCUSARUS_ROUTES !== 'true',
    'Blog posts only exist in the final overlaid tree',
  );

  await page.goto(await firstBlogPost(page));
  const pad = await inlinePadding(page, '.article-wrap');
  expect(pad.left, 'blog posts share the .article-wrap defect').toBeGreaterThan(0);
  expect(pad.right).toBeGreaterThan(0);
});

test('desktop keeps the three-column article rails', async ({ page }) => {
  test.skip(
    process.env.EXPECT_DOCUSARUS_ROUTES !== 'true',
    'Blog posts only exist in the final overlaid tree',
  );
  test.skip(test.info().project.name !== 'desktop-chrome', 'Rails only exist at >=1240px');

  await page.goto(await firstBlogPost(page));

  // Assert the rails exist before measuring them, so a post that legitimately
  // has none fails loudly here instead of silently passing a vacuous check.
  const rails = page.locator('.article-wrap.with-rails');
  await expect(rails, 'the discovered post should render the rails layout').toHaveCount(1);

  // Restoring the inline padding narrows the content box by 2.5rem. The rails
  // grid needs 1276px of a 1340px cap, so this is the assertion that catches a
  // miscalculation squeezing it from three columns down to fewer.
  const columns = await rails.evaluate(
    (el) => getComputedStyle(el).gridTemplateColumns.split(/\s+/).filter(Boolean).length,
  );
  expect(columns, 'the rails grid must stay three columns').toBe(3);
});
