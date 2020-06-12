import { mergeHeaders } from '../fetch';

test('mergeHeaders', () => {
  expect(mergeHeaders({ timeout: 1 }, undefined)).toEqual({ timeout: 1, headers: {} });
});

test('merged', () => {
  expect(mergeHeaders({ timeout: 1 }, { method: 'get' })).toEqual({ timeout: 1, method: 'get', headers: {} });
});

test('overwrite', () => {
  expect(mergeHeaders({ timeout: 1 }, { timeout: 2 })).toEqual({ timeout: 2, headers: {} });
});

test('headers', () => {
  expect(mergeHeaders({ headers: { 'X-Foo': 'a' } }, { headers: { 'X-Bar': 'b' } })).toEqual({
    headers: { 'X-Bar': 'b', 'X-Foo': 'a' },
  });
});
