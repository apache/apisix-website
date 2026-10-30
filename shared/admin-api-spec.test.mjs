import assert from 'node:assert/strict';
import { test } from 'node:test';
import { isAdminApiSpec } from './admin-api-spec.ts';

test('accepts patch releases and development versions without crossing release series', () => {
  const spec = { openapi: '3.1.0', info: { title: 'Admin API', version: '3.18.0' }, paths: {} };
  assert.equal(isAdminApiSpec(spec, '3.18'), true);
  assert.equal(isAdminApiSpec(spec, '3.19'), false);
  assert.equal(isAdminApiSpec(spec, 'next'), true);
  assert.equal(isAdminApiSpec({ ...spec, info: { title: 'Admin API', version: '3.19.0' } }, '3.19.0'), true);
});

test('rejects malformed documents without throwing', () => {
  [null, [], {}, { openapi: 3 },
    { openapi: '3.1.0', info: { title: 'Admin API', version: '3.18.0' }, paths: null },
    { openapi: '3.1.0', info: { title: 'Admin API', version: '3.18.0' }, paths: [] }].forEach((spec) => {
    assert.equal(isAdminApiSpec(spec, '3.18'), false);
  });
});
