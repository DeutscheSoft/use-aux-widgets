import renderHook from './renderHook.js';
import { useEventHandler } from './src/useEventHandler.js';
import { strictEqual } from 'node:assert';
import test from 'node:test';

test('useEventHandler', () => {
  let called = false;
  const { result, rerender, unmount } = renderHook(() =>
    useEventHandler(() => {
      called = true;
    })
  );

  strictEqual(called, false);
  strictEqual(typeof result.current, 'function');

  const lastCb = result.current;

  rerender();

  strictEqual(lastCb, result.current);

  result.current();

  strictEqual(called, true);
  unmount();
});
