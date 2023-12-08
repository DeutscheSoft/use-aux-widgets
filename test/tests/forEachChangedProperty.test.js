import { forEachChangedProperty } from './src/forEachChangedProperty.js';
import { deepStrictEqual } from 'node:assert';
import test from 'node:test';

test('forEachChangedProperty', () => {
  const removed = [], added = [];

  const removeCb = (name, value) => {
    removed.push({ name, value });
  };

  const addCb = (name, value, previousValue) => {
    added.push({ name, value, previousValue });
  };

  forEachChangedProperty(
    {},
    {},
    removeCb,
    addCb
  );

  deepStrictEqual(removed, []);
  deepStrictEqual(added, []);

  forEachChangedProperty(
    {},
    {
      foo: 32
    },
    removeCb,
    addCb
  );

  deepStrictEqual(removed, []);
  deepStrictEqual(added, [
    { name: 'foo', value: 32, previousValue: undefined }
  ]);

  added.length = 0;

  forEachChangedProperty(
    {
      foo: 23
    },
    {
      foo: 42
    },
    removeCb,
    addCb
  );

  deepStrictEqual(removed, []);
  deepStrictEqual(added, [
    { name: 'foo', value: 42, previousValue: 23 }
  ]);

  added.length = 0;

  forEachChangedProperty(
    {
      foo: 23
    },
    {
    },
    removeCb,
    addCb
  );

  deepStrictEqual(removed, [
    { name: 'foo', value: 23 }
  ]);
  deepStrictEqual(added, [ ]);
  removed.length = 0;

  // Check that both from and to can be missing
  forEachChangedProperty(
    { foo: 23 },
    null,
    removeCb,
    addCb);
  deepStrictEqual(removed, [
    { name: 'foo', value: 23 }
  ]);
  deepStrictEqual(added, []);
  removed.length = 0;

  forEachChangedProperty(
    null,
    { foo: 23 },
    removeCb,
    addCb);
  deepStrictEqual(added, [
    { name: 'foo', value: 23, previousValue: undefined }
  ]);
  deepStrictEqual(removed, []);
  removed.length = 0;

});
