import assert from 'node:assert/strict';
import { test } from 'node:test';
import { apiReferenceDisplaySpec, isApiReferenceSpec } from './admin-api-spec.ts';

test('accepts patch releases and development versions without crossing release series', () => {
  const spec = { openapi: '3.1.0', info: { title: 'Admin API', version: '3.18.0' }, paths: {} };
  assert.equal(isApiReferenceSpec(spec, '3.18', 'admin-api'), true);
  assert.equal(isApiReferenceSpec(spec, '3.19', 'admin-api'), false);
  assert.equal(isApiReferenceSpec(spec, 'next', 'admin-api'), true);
  assert.equal(isApiReferenceSpec({ ...spec, info: { title: 'Admin API', version: '3.19.0' } }, '3.19.0', 'admin-api'), true);
  assert.equal(isApiReferenceSpec({ ...spec, info: { ...spec.info, title: 'Control API' } }, '3.18', 'control-api'), true);
  assert.equal(isApiReferenceSpec(spec, '3.18', 'control-api'), false);
});

test('labels only the rendered Next copy without mutating the canonical spec', () => {
  const spec = { openapi: '3.1.0', info: { title: 'Admin API', version: '3.19.0' }, paths: {} };
  const display = apiReferenceDisplaySpec(spec, 'next');
  assert.equal(display.info.version, 'Next');
  assert.equal(spec.info.version, '3.19.0');
  assert.equal(apiReferenceDisplaySpec(spec, '3.19'), spec);
});

test('rejects malformed documents without throwing', () => {
  [null, [], {}, { openapi: 3 },
    { openapi: '3.1.0', info: { title: 'Admin API', version: '3.18.0' }, paths: null },
    { openapi: '3.1.0', info: { title: 'Admin API', version: '3.18.0' }, paths: [] }].forEach((spec) => {
    assert.equal(isApiReferenceSpec(spec, '3.18'), false);
  });
});
