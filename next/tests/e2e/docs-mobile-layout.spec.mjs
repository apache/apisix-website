// Playwright is a test-only dependency by design.
// eslint-disable-next-line import/no-extraneous-dependencies
import { expect, test } from '@playwright/test';

/* Viewport and schema matrices intentionally reuse one page in sequence. */
/* eslint-disable no-await-in-loop, no-restricted-syntax */

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

const ATTRIBUTE_COLUMNS = {
  'server-info': ['name', 'type', 'description'],
  degraphql: ['name', 'type', 'required', 'description'],
  'proxy-buffering': ['name', 'type', 'required', 'default', 'description'],
  'openid-connect': ['name', 'type', 'required', 'default', 'valid-values', 'description'],
  'saml-auth': [
    'name', 'type', 'required', 'encrypted', 'default', 'valid-values', 'description',
  ],
};

const ATTRIBUTE_COLUMN_MIN_WIDTHS = {
  compact: {
    name: 158,
    type: 102,
    required: 94,
    encrypted: 102,
    default: 126,
    'valid-values': 174,
    description: 206,
  },
  desktop: {
    name: 206,
    type: 118,
    required: 94,
    encrypted: 118,
    default: 142,
    'valid-values': 190,
    description: 302,
  },
};

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

  // Both remaining checks are breakpoint-dependent, and 1260px is the line
  // where .docs-layout collapses to one column (the max-width: 1260px media
  // query in global.css).
  if (geom.viewport <= 1260) {
    // Stacked: the article shares the container's inline padding with the
    // header, so their left edges line up.
    expect(
      Math.abs(geom.h1Left - geom.brandLeft),
      `${url}: article should line up with the header brand`,
    ).toBeLessThanOrEqual(1);
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

async function assertPluginTable(page, {
  path,
  shellSelector,
  contentSelector,
  expectedColumns,
  shouldOverflow,
  minimumShellWidth = 0,
  verifyShortCells = false,
  accessibleName = /Attributes/i,
}) {
  await page.goto(path);
  const shell = page.locator(shellSelector);
  const scroller = shell.locator('.table-scroll');
  const expectedOverflow = String(shouldOverflow);
  await expect(shell).toHaveAttribute('data-overflow', expectedOverflow);
  await expect(shell.locator('.docs-table--attributes')).toHaveCount(1);

  const metrics = await page.evaluate(({ content, expectedColumnCount, tableShell }) => {
    const contentElement = document.querySelector(content);
    const shellElement = document.querySelector(tableShell);
    const scrollerElement = shellElement.querySelector('.table-scroll');
    const tableElement = shellElement.querySelector('.docs-table--attributes');
    const headers = [...tableElement.querySelectorAll('thead th')];
    const bodyRows = [...tableElement.querySelectorAll('tbody tr')];
    const completeBodyRow = bodyRows
      .find((row, index) => (
        index > 0 && row.querySelectorAll(':scope > td').length === expectedColumnCount
      ))
      ?? bodyRows.find((row) => (
        row.querySelectorAll(':scope > td').length === expectedColumnCount
      ));
    const bodyCells = completeBodyRow
      ? [...completeBodyRow.querySelectorAll(':scope > td')]
      : [];
    const firstParagraph = [...contentElement.children]
      .find((element) => element.matches('p') && element.getBoundingClientRect().width > 0);
    const shortCells = [...tableElement.querySelectorAll('tbody td')]
      .filter((cell) => ['string', 'True', 'False'].includes(cell.textContent.trim()));
    const readingProbe = document.createElement('span');
    readingProbe.style.cssText = 'position:absolute;visibility:hidden;width:85ch';
    contentElement.append(readingProbe);
    const readingMaxWidth = readingProbe.getBoundingClientRect().width;
    readingProbe.remove();

    return {
      contentWidth: contentElement.getBoundingClientRect().width,
      paragraphWidth: firstParagraph?.getBoundingClientRect().width ?? 0,
      readingMaxWidth,
      shellWidth: shellElement.getBoundingClientRect().width,
      pageClientWidth: document.documentElement.clientWidth,
      pageScrollWidth: document.documentElement.scrollWidth,
      scrollerClientWidth: scrollerElement.clientWidth,
      scrollerScrollWidth: scrollerElement.scrollWidth,
      scrollerClientHeight: scrollerElement.clientHeight,
      scrollerScrollHeight: scrollerElement.scrollHeight,
      tableWidth: tableElement.getBoundingClientRect().width,
      columnWidths: headers.map((cell) => cell.getBoundingClientRect().width),
      columnKinds: headers.map((cell) => (
        [...cell.classList]
          .find((name) => name.startsWith('docs-table__col--'))
          ?.replace('docs-table__col--', '') ?? null
      )),
      bodyColumnKinds: bodyCells.map((cell) => (
        [...cell.classList]
          .find((name) => name.startsWith('docs-table__col--'))
          ?.replace('docs-table__col--', '') ?? null
      )),
      headerWhiteSpace: headers.map((cell) => getComputedStyle(cell).whiteSpace),
      shortCellWhiteSpace: shortCells.slice(0, 3)
        .map((cell) => getComputedStyle(cell).whiteSpace),
    };
  }, {
    content: contentSelector,
    expectedColumnCount: expectedColumns.length,
    tableShell: shellSelector,
  });

  expect(metrics.pageScrollWidth, `${path}: the page itself must not scroll sideways`)
    .toBeLessThanOrEqual(metrics.pageClientWidth);
  expect(metrics.paragraphWidth, `${path}: prose must retain the configured 85ch line length`)
    .toBeLessThanOrEqual(metrics.readingMaxWidth + 1);
  expect(metrics.shellWidth, `${path}: table should use the available content rail`)
    .toBeGreaterThanOrEqual(minimumShellWidth);
  const widthMode = page.viewportSize().width <= 996 ? 'compact' : 'desktop';
  const minimumWidths = ATTRIBUTE_COLUMN_MIN_WIDTHS[widthMode];
  const minimumTableWidth = expectedColumns
    .reduce((total, column) => total + minimumWidths[column], 0);
  expect(metrics.tableWidth, `${path}: preserve readable semantic column widths`)
    .toBeGreaterThanOrEqual(minimumTableWidth);
  expect(metrics.columnKinds, `${path}: every attribute column needs a semantic class`)
    .toEqual(expectedColumns);
  expect(
    metrics.bodyColumnKinds,
    `${path}: a complete body row must preserve the header's semantic column order`,
  )
    .toEqual(expectedColumns);
  metrics.columnWidths.forEach((width, index) => {
    const column = expectedColumns[index];
    expect(width, `${path}: ${column} column must remain readable`)
      .toBeGreaterThanOrEqual(minimumWidths[column]);
    if (shouldOverflow && widthMode === 'compact' && column === 'name') {
      expect(width, `${path}: compact Name must not consume the table viewport`)
        .toBeLessThanOrEqual(162);
    }
    if (shouldOverflow && widthMode === 'compact' && column === 'description') {
      expect(width, `${path}: compact Description must leave room for adjacent columns`)
        .toBeLessThanOrEqual(210);
    }
  });
  expect(metrics.headerWhiteSpace, `${path}: short headers must not break letter by letter`)
    .toEqual(expectedColumns.map(() => 'nowrap'));
  if (verifyShortCells) {
    expect(metrics.shortCellWhiteSpace, `${path}: common short values must stay on one line`)
      .toEqual(['nowrap', 'nowrap', 'nowrap']);
  }
  expect(metrics.scrollerScrollHeight, `${path}: table must not create nested vertical scrolling`)
    .toBeLessThanOrEqual(metrics.scrollerClientHeight + 1);

  if (shouldOverflow) {
    expect(metrics.scrollerScrollWidth).toBeGreaterThan(metrics.scrollerClientWidth);
    await expect(scroller).toHaveAttribute('role', 'region');
    await expect(scroller).toHaveAttribute('aria-label', accessibleName);
    await expect(scroller).toHaveAttribute('tabindex', '0');
    await expect(shell).toHaveAttribute('data-at-start', 'true');

    await scroller.focus();
    await expect(scroller).toBeFocused();
    await page.keyboard.press('ArrowRight');
    await expect.poll(() => scroller.evaluate((element) => element.scrollLeft))
      .toBeGreaterThan(0);
    await expect(shell).toHaveAttribute('data-at-start', 'false');

    const stickyMetrics = await scroller.evaluate((element) => {
      element.scrollTo({ left: Math.min(250, element.scrollWidth - element.clientWidth) });
      const firstCell = element.querySelector('tbody tr > :first-child');
      return {
        position: getComputedStyle(firstCell).position,
        cellLeft: firstCell.getBoundingClientRect().left,
        scrollerLeft: element.getBoundingClientRect().left,
      };
    });
    expect(stickyMetrics.position, `${path}: keep the attribute name visible while panning`)
      .toBe('sticky');
    expect(Math.abs(stickyMetrics.cellLeft - stickyMetrics.scrollerLeft))
      .toBeLessThanOrEqual(2);
    const leftCueOpacity = await shell.evaluate((element) => (
      getComputedStyle(element, '::before').opacity
    ));
    expect(leftCueOpacity, `${path}: the overflow cue must not wash out sticky Name text`)
      .toBe('0');
  } else {
    expect(metrics.scrollerScrollWidth).toBeLessThanOrEqual(metrics.scrollerClientWidth + 1);
    await expect(scroller).not.toHaveAttribute('role', 'region');
    await expect(scroller).toHaveAttribute('tabindex', '-1');
    await expect(shell).toHaveAttribute('data-at-start', 'true');
    await expect(shell).toHaveAttribute('data-at-end', 'true');
  }

  return metrics;
}

async function assertNoJsPluginTable(browser, {
  path,
  shellSelector,
  expectedColumns,
}) {
  const noJsPage = await browser.newPage({
    baseURL: test.info().project.use.baseURL,
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  try {
    await noJsPage.goto(path);
    const shell = noJsPage.locator(shellSelector);
    const scroller = shell.locator('.table-scroll');
    const table = scroller.locator('.docs-table--attributes');

    await expect(shell).toHaveAttribute('data-overflow', 'unknown');
    await expect(scroller).toHaveAttribute('role', 'region');
    await expect(scroller).toHaveAttribute('tabindex', '0');
    await expect(table).toHaveCount(1);
    const metrics = await table.evaluate((element) => {
      const scrollRegion = element.closest('.table-scroll');
      const semanticColumns = [...element.querySelectorAll('thead th')].map((cell) => (
        [...cell.classList]
          .find((name) => name.startsWith('docs-table__col--'))
          ?.replace('docs-table__col--', '') ?? null
      ));
      return {
        pageClientWidth: document.documentElement.clientWidth,
        pageScrollWidth: document.documentElement.scrollWidth,
        scrollerClientWidth: scrollRegion.clientWidth,
        scrollerScrollWidth: scrollRegion.scrollWidth,
        semanticColumns,
      };
    });
    expect(metrics.semanticColumns).toEqual(expectedColumns);
    expect(metrics.scrollerScrollWidth).toBeGreaterThan(metrics.scrollerClientWidth);
    expect(metrics.pageScrollWidth, 'no-JS table overflow must remain inside its scroller')
      .toBeLessThanOrEqual(metrics.pageClientWidth);
  } finally {
    await noJsPage.close();
  }
}

// docs/general/** ships from this repo, so it exists in the PR CI build too —
// no gate, and the fix is verified before anything is deployed.
test('general docs keep padding and put the nav above the article', async ({ page }) => {
  await assertDocsLayout(page, '/docs/general/contributor-guide/');
});

test('docs content rail stays wide across the sidebar breakpoint', async ({ page }) => {
  test.skip(test.info().project.name !== 'desktop-chrome', 'one desktop run covers both widths');

  let lastStackedContentWidth = 0;
  for (const width of [960, 961, 1200, 1260]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/docs/general/contributor-guide/');
    const metrics = await page.evaluate(() => ({
      contentWidth: document.querySelector('.docs-content').getBoundingClientRect().width,
      navTop: document.querySelector('.docs-sidebar').offsetTop,
      articleTop: document.querySelector('.docs-content').offsetTop,
    }));
    expect(metrics.contentWidth, `${width}px: the docs rail must not collapse beside the sidebar`)
      .toBeGreaterThanOrEqual(900);
    expect(metrics.navTop, `${width}px: docs navigation should remain above the article`)
      .toBeLessThan(metrics.articleTop);
    lastStackedContentWidth = metrics.contentWidth;
  }

  await page.setViewportSize({ width: 1261, height: 900 });
  await page.goto('/docs/general/contributor-guide/');
  const desktopMetrics = await page.evaluate(() => ({
    contentWidth: document.querySelector('.docs-content').getBoundingClientRect().width,
    navTop: document.querySelector('.docs-sidebar').offsetTop,
    articleTop: document.querySelector('.docs-content').offsetTop,
  }));
  expect(desktopMetrics.contentWidth, '1261px: keep a readable rail beside the sidebar')
    .toBeGreaterThanOrEqual(900);
  expect(
    lastStackedContentWidth - desktopMetrics.contentWidth,
    'the rail should not collapse excessively when the sidebar returns',
  ).toBeLessThanOrEqual(330);
  expect(desktopMetrics.navTop, '1261px: nav and article should switch to the same grid row')
    .toBe(desktopMetrics.articleTop);
});

test('ordinary prose tables wrap within the available docs rail', async ({ page }) => {
  await page.goto('/docs/general/how-to-contribute/');
  const shell = page.locator('.docs-content .table-shell').first();
  await expect(shell).toHaveAttribute('data-overflow', 'false');

  const metrics = await shell.evaluate((element) => {
    const scroller = element.querySelector('.table-scroll');
    const table = element.querySelector('.docs-table');
    const description = table.querySelector('tbody td:nth-child(2)');
    return {
      shellWidth: element.getBoundingClientRect().width,
      tableWidth: table.getBoundingClientRect().width,
      scrollWidth: scroller.scrollWidth,
      clientWidth: scroller.clientWidth,
      pageScrollWidth: document.documentElement.scrollWidth,
      pageClientWidth: document.documentElement.clientWidth,
      descriptionWhiteSpace: getComputedStyle(description).whiteSpace,
    };
  });

  expect(metrics.pageScrollWidth).toBeLessThanOrEqual(metrics.pageClientWidth);
  expect(metrics.tableWidth).toBeLessThanOrEqual(metrics.shellWidth + 1);
  expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.clientWidth + 1);
  expect(metrics.descriptionWhiteSpace).toBe('normal');
});

test('ordinary docs table headers can wrap instead of forcing overflow', async ({ page }) => {
  test.skip(process.env.EXPECT_DOCUSARUS_ROUTES !== 'true', 'APISIX docs need the final tree');

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/docs/apisix/security-threat-model/');
  const table = page.locator('.docs-content .table-shell').first();
  await expect(table).toHaveCount(1);
  await expect(table.locator('thead th').first()).toHaveText('Role');
  await expect(table).not.toHaveClass(/table-shell--attributes/);
  await expect(table.locator('table')).not.toHaveClass(/docs-table--attributes/);
  const whiteSpace = await table.locator('thead th').evaluateAll((headers) => (
    headers.map((header) => getComputedStyle(header).whiteSpace)
  ));
  expect(whiteSpace).toEqual(whiteSpace.map(() => 'normal'));
  const metrics = await table.evaluate((element) => ({
    firstBodyCellPosition: getComputedStyle(element.querySelector('tbody td')).position,
    pageClientWidth: document.documentElement.clientWidth,
    pageScrollWidth: document.documentElement.scrollWidth,
  }));
  expect(metrics.firstBodyCellPosition, 'ordinary table cells must not become sticky').not.toBe('sticky');
  expect(metrics.pageScrollWidth, 'ordinary table overflow must remain local to its scroller')
    .toBeLessThanOrEqual(metrics.pageClientWidth);
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

test('current APISIX plugin tables use wide screens without sacrificing readability', async ({ page }) => {
  test.skip(
    process.env.EXPECT_DOCUSARUS_ROUTES !== 'true'
      || test.info().project.name !== 'desktop-chrome',
    'desktop APISIX docs only exist in the final overlaid tree',
  );

  const currentPath = '/docs/apisix/plugins/openid-connect/';
  const table = {
    path: currentPath,
    shellSelector: '.docs-content h2#attributes + .table-shell',
    contentSelector: '.docs-content',
  };

  await page.setViewportSize({ width: 961, height: 900 });
  await assertPluginTable(page, {
    ...table,
    expectedColumns: ATTRIBUTE_COLUMNS['openid-connect'],
    shouldOverflow: false,
    minimumShellWidth: 900,
    verifyShortCells: true,
  });

  await page.setViewportSize({ width: 1440, height: 900 });
  await assertPluginTable(page, {
    ...table,
    expectedColumns: ATTRIBUTE_COLUMNS['openid-connect'],
    shouldOverflow: false,
    minimumShellWidth: 1070,
    verifyShortCells: true,
  });

  await page.setViewportSize({ width: 1920, height: 1080 });
  await assertPluginTable(page, {
    ...table,
    expectedColumns: ATTRIBUTE_COLUMNS['openid-connect'],
    shouldOverflow: false,
    minimumShellWidth: 1460,
    verifyShortCells: true,
  });

  await page.setViewportSize({ width: 2962, height: 1668 });
  await assertPluginTable(page, {
    ...table,
    expectedColumns: ATTRIBUTE_COLUMNS['openid-connect'],
    shouldOverflow: false,
    minimumShellWidth: 1460,
    verifyShortCells: true,
  });
});

test('current Attributes table remains usable without JavaScript', async ({ browser }) => {
  test.skip(
    process.env.EXPECT_DOCUSARUS_ROUTES !== 'true'
      || test.info().project.name !== 'desktop-chrome',
    'current APISIX docs only exist in the final overlaid tree',
  );

  await assertNoJsPluginTable(browser, {
    path: '/docs/apisix/plugins/openid-connect/',
    shellSelector: '.docs-content h2#attributes + .table-shell',
    expectedColumns: ATTRIBUTE_COLUMNS['openid-connect'],
  });
});

test('current Attributes tables support four, five, and seven column schemas', async ({ page }) => {
  test.skip(
    process.env.EXPECT_DOCUSARUS_ROUTES !== 'true'
      || test.info().project.name !== 'desktop-chrome',
    'desktop APISIX docs only exist in the final overlaid tree',
  );

  const cases = [
    { slug: 'degraphql', overflowAt961: false, overflowAt1440: false },
    { slug: 'proxy-buffering', overflowAt961: false, overflowAt1440: false },
    { slug: 'saml-auth', overflowAt961: true, overflowAt1440: true },
  ];

  for (const item of cases) {
    const table = {
      path: `/docs/apisix/plugins/${item.slug}/`,
      shellSelector: '.docs-content h2#attributes + .table-shell',
      contentSelector: '.docs-content',
      expectedColumns: ATTRIBUTE_COLUMNS[item.slug],
    };
    await page.setViewportSize({ width: 961, height: 900 });
    await assertPluginTable(page, {
      ...table, shouldOverflow: item.overflowAt961, minimumShellWidth: 900,
    });
    await page.setViewportSize({ width: 1440, height: 900 });
    await assertPluginTable(page, {
      ...table, shouldOverflow: item.overflowAt1440, minimumShellWidth: 1070,
    });
  }
});

test('archived APISIX plugin tables expand when space is available', async ({ page }) => {
  test.skip(
    process.env.EXPECT_DOCUSARUS_ROUTES !== 'true'
      || test.info().project.name !== 'desktop-chrome',
    'desktop APISIX docs only exist in the final overlaid tree',
  );

  const table = {
    path: '/docs/apisix/3.18/plugins/openid-connect/',
    shellSelector: '.markdown h2:has(#attributes) + .table-shell',
    contentSelector: '.markdown',
  };

  const serverResponse = await page.request.get(table.path);
  expect(serverResponse.ok(), `${table.path}: SSR document should load`).toBe(true);
  const serverHtml = await serverResponse.text();
  expect(
    serverHtml,
    `${table.path}: Attributes widths must be present before hydration`,
  ).toMatch(/<table[^>]+class="[^"]*docs-table--attributes/);
  expect(
    serverHtml,
    `${table.path}: overflow cues should wait for client measurement`,
  ).toMatch(/class="table-shell[^"]*" data-overflow="unknown"/);

  await page.setViewportSize({ width: 961, height: 900 });
  await assertPluginTable(page, {
    ...table,
    expectedColumns: ATTRIBUTE_COLUMNS['openid-connect'],
    shouldOverflow: false,
    minimumShellWidth: 880,
  });

  await page.setViewportSize({ width: 1440, height: 900 });
  await assertPluginTable(page, {
    ...table,
    expectedColumns: ATTRIBUTE_COLUMNS['openid-connect'],
    shouldOverflow: true,
    minimumShellWidth: 800,
  });

  await page.setViewportSize({ width: 1920, height: 1080 });
  await assertPluginTable(page, {
    ...table,
    expectedColumns: ATTRIBUTE_COLUMNS['openid-connect'],
    shouldOverflow: false,
    minimumShellWidth: 1150,
  });

  await page.setViewportSize({ width: 2962, height: 1668 });
  await assertPluginTable(page, {
    ...table,
    expectedColumns: ATTRIBUTE_COLUMNS['openid-connect'],
    shouldOverflow: false,
    minimumShellWidth: 1460,
  });
});

test('archived Docusaurus tables cover variable schemas and generic wrapping', async ({ page }) => {
  test.skip(
    process.env.EXPECT_DOCUSARUS_ROUTES !== 'true'
      || test.info().project.name !== 'desktop-chrome',
    'archived Docusaurus docs only exist in the final overlaid tree',
  );

  await page.setViewportSize({ width: 390, height: 844 });
  const schemaCases = [
    {
      slug: 'server-info',
      shellSelector: '.markdown .table-shell:has(> .table-scroll[aria-label^="Description"])',
      accessibleName: /Description/i,
    },
    { slug: 'degraphql' },
    { slug: 'proxy-buffering' },
    { slug: 'saml-auth' },
  ];
  for (const item of schemaCases) {
    await assertPluginTable(page, {
      path: `/docs/apisix/3.18/plugins/${item.slug}/`,
      shellSelector: item.shellSelector
        ?? '.markdown h2:has(#attributes) + .table-shell',
      contentSelector: '.markdown',
      expectedColumns: ATTRIBUTE_COLUMNS[item.slug],
      shouldOverflow: true,
      minimumShellWidth: 340,
      accessibleName: item.accessibleName ?? /Attributes/i,
    });
  }

  await page.goto('/docs/apisix/3.18/plugins/prometheus/');
  const generic = page.locator('.markdown .table-shell:not(.table-shell--attributes)').first();
  await expect(generic.locator('thead th').first()).toHaveText('Name');
  await expect(generic.locator('thead th').nth(1)).toHaveText('Description');
  await expect(generic.locator('table')).not.toHaveClass(/docs-table--attributes/);
  const metrics = await generic.evaluate((element) => ({
    firstBodyCellPosition: getComputedStyle(element.querySelector('tbody td')).position,
    headerWhiteSpace: [...element.querySelectorAll('thead th')]
      .map((header) => getComputedStyle(header).whiteSpace),
    pageClientWidth: document.documentElement.clientWidth,
    pageScrollWidth: document.documentElement.scrollWidth,
  }));
  expect(metrics.headerWhiteSpace).toEqual(metrics.headerWhiteSpace.map(() => 'normal'));
  expect(metrics.firstBodyCellPosition).not.toBe('sticky');
  expect(metrics.pageScrollWidth, 'generic Docusaurus overflow must remain local')
    .toBeLessThanOrEqual(metrics.pageClientWidth);
});

test('archived Docusaurus Attributes table works without JavaScript', async ({ browser }) => {
  test.skip(
    process.env.EXPECT_DOCUSARUS_ROUTES !== 'true'
      || test.info().project.name !== 'desktop-chrome',
    'archived Docusaurus docs only exist in the final overlaid tree',
  );

  await assertNoJsPluginTable(browser, {
    path: '/docs/apisix/3.18/plugins/openid-connect/',
    shellSelector: '.markdown h2:has(#attributes) + .table-shell',
    expectedColumns: ATTRIBUTE_COLUMNS['openid-connect'],
  });
});

test('archived Docusaurus table focus stays visible in dark mode', async ({ browser }) => {
  test.skip(
    process.env.EXPECT_DOCUSARUS_ROUTES !== 'true'
      || test.info().project.name !== 'desktop-chrome',
    'archived Docusaurus docs only exist in the final overlaid tree',
  );

  const darkPage = await browser.newPage({
    baseURL: test.info().project.use.baseURL,
    viewport: { width: 1440, height: 900 },
  });
  try {
    await darkPage.addInitScript(() => localStorage.setItem('theme', 'dark'));
    await darkPage.goto('/docs/apisix/3.18/plugins/openid-connect/');
    await expect(darkPage.locator('html')).toHaveAttribute('data-theme', 'dark');
    const shell = darkPage.locator('.markdown h2:has(#attributes) + .table-shell');
    const scroller = shell.locator('.table-scroll');
    await expect(shell).toHaveAttribute('data-overflow', 'true');
    await scroller.focus();
    await expect(scroller).toBeFocused();

    const focusMetrics = await scroller.evaluate((element) => {
      const probe = document.createElement('span');
      probe.style.color = 'var(--ifm-color-primary)';
      probe.style.backgroundColor = 'var(--ifm-background-color)';
      document.body.append(probe);
      const { color: primaryColor, backgroundColor } = getComputedStyle(probe);
      probe.remove();

      const channels = (color) => (
        (color.match(/[\d.]+/g) ?? []).slice(0, 3).map(Number)
      );
      const luminance = (color) => {
        const [red, green, blue] = channels(color).map((value) => {
          const channel = value / 255;
          return channel <= 0.04045
            ? channel / 12.92
            : ((channel + 0.055) / 1.055) ** 2.4;
        });
        return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
      };
      const foreground = luminance(primaryColor);
      const background = luminance(backgroundColor);
      const contrast = (Math.max(foreground, background) + 0.05)
        / (Math.min(foreground, background) + 0.05);
      const style = getComputedStyle(element);

      return {
        contrast,
        outlineColor: style.outlineColor,
        outlineStyle: style.outlineStyle,
        outlineWidth: parseFloat(style.outlineWidth),
        primaryColor,
      };
    });
    expect(focusMetrics.outlineStyle).toBe('solid');
    expect(focusMetrics.outlineWidth).toBeGreaterThanOrEqual(3);
    expect(focusMetrics.outlineColor).toBe(focusMetrics.primaryColor);
    expect(focusMetrics.contrast, 'focus outline needs at least 3:1 contrast').toBeGreaterThanOrEqual(3);
  } finally {
    await darkPage.close();
  }
});

test('current plugin table overflow remains local and keyboard accessible on mobile', async ({ page }) => {
  test.skip(
    process.env.EXPECT_DOCUSARUS_ROUTES !== 'true'
      || test.info().project.name !== 'mobile-chrome',
    'mobile APISIX docs only exist in the final overlaid tree',
  );

  await assertPluginTable(page, {
    path: '/docs/apisix/plugins/openid-connect/',
    shellSelector: '.docs-content h2#attributes + .table-shell',
    contentSelector: '.docs-content',
    expectedColumns: ATTRIBUTE_COLUMNS['openid-connect'],
    shouldOverflow: true,
    minimumShellWidth: 340,
  });
});

test('variable Attributes schemas keep Name visible on mobile', async ({ page }) => {
  test.skip(
    process.env.EXPECT_DOCUSARUS_ROUTES !== 'true'
      || test.info().project.name !== 'mobile-chrome',
    'mobile APISIX docs only exist in the final overlaid tree',
  );

  for (const slug of ['degraphql', 'proxy-buffering', 'saml-auth']) {
    await assertPluginTable(page, {
      path: `/docs/apisix/plugins/${slug}/`,
      shellSelector: '.docs-content h2#attributes + .table-shell',
      contentSelector: '.docs-content',
      expectedColumns: ATTRIBUTE_COLUMNS[slug],
      shouldOverflow: true,
      minimumShellWidth: 340,
    });
  }
});

test('non-Attributes field schemas intentionally use semantic table behavior', async ({ page }) => {
  test.skip(
    process.env.EXPECT_DOCUSARUS_ROUTES !== 'true'
      || test.info().project.name !== 'mobile-chrome',
    'mobile APISIX docs only exist in the final overlaid tree',
  );

  await assertPluginTable(page, {
    path: '/docs/apisix/plugins/ai-proxy/',
    shellSelector: '.docs-content h2#request-format + .table-shell',
    contentSelector: '.docs-content',
    expectedColumns: ATTRIBUTE_COLUMNS.degraphql,
    shouldOverflow: true,
    minimumShellWidth: 340,
    accessibleName: /Request Format/i,
  });
});

test('archived plugin table overflow remains local and keyboard accessible on mobile', async ({ page }) => {
  test.skip(
    process.env.EXPECT_DOCUSARUS_ROUTES !== 'true'
      || test.info().project.name !== 'mobile-chrome',
    'mobile APISIX docs only exist in the final overlaid tree',
  );

  await assertPluginTable(page, {
    path: '/docs/apisix/3.18/plugins/openid-connect/',
    shellSelector: '.markdown h2:has(#attributes) + .table-shell',
    contentSelector: '.markdown',
    expectedColumns: ATTRIBUTE_COLUMNS['openid-connect'],
    shouldOverflow: true,
    minimumShellWidth: 340,
  });
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

  const tracks = await rails.evaluate((el) => (
    getComputedStyle(el).gridTemplateColumns.split(/\s+/).filter(Boolean).map(parseFloat)
  ));

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
