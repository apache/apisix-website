import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';

const source = await readFile(new URL('../src/components/Analytics.astro', import.meta.url), 'utf8');
const script = source.match(/<script is:inline>([\s\S]*?)<\/script>/)[1];

function visit(hostname, existing = {}) {
  const loaded = [];
  const window = { location: { hostname }, ...existing };
  const document = {
    createElement: () => ({}),
    head: { appendChild: element => loaded.push(element) },
  };
  vm.runInNewContext(script, { window, document });
  return { window, loaded };
}

test('production queues one page configuration and loads the matching tag asynchronously', () => {
  const { window, loaded } = visit('apisix.apache.org');
  assert.equal(loaded.length, 1);
  assert.equal(loaded[0].async, true);
  assert.equal(loaded[0].src, 'https://www.googletagmanager.com/gtag/js?id=G-WQLBQL6GY3');
  assert.deepEqual(Array.from(window.dataLayer[0]).slice(0, 1), ['js']);
  assert.equal(window.dataLayer[1][0], 'config');
  assert.equal(window.dataLayer[1][1], 'G-WQLBQL6GY3');
  assert.equal(window.dataLayer[1][2].cookie_domain, 'apisix.apache.org');
  window.gtag('event', 'download');
  assert.deepEqual(Array.from(window.dataLayer[2]), ['event', 'download']);
});

for (const hostname of ['localhost', '127.0.0.1', 'apisix-pwa.netlify.app', 'apache.org', 'apisix.apache.org.example.com']) {
  test(`does not load or configure Google Analytics on ${hostname}`, () => {
    const { window, loaded } = visit(hostname);
    assert.equal(loaded.length, 0);
    assert.equal(window.gtag, undefined);
    assert.equal(window.dataLayer, undefined);
  });
}

test('preserves pre-existing Google tag queue', () => {
  const dataLayer = [['consent', 'default', { analytics_storage: 'denied' }]];
  const { window } = visit('apisix.apache.org', { dataLayer });
  assert.equal(window.dataLayer, dataLayer);
  assert.equal(dataLayer[0][0], 'consent');
  assert.equal(dataLayer.length, 3);
});
