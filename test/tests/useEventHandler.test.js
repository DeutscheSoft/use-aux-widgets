import { renderHook, act } from '@testing-library/react-hooks';
import { useEventHandler } from './src/useEventHandler.js';
import { strictEqual } from 'node:assert';
import test from 'node:test';

test('useEventHandler', () => {
  let called = false;
  const { result, rerender } = renderHook(() => useEventHandler(() => {
    called = true;
  }));

  strictEqual(called, false);
  strictEqual(typeof result.current, 'function');

  const lastCb = result.current;

  rerender();

  strictEqual(lastCb, result.current);

  act(() => {
    result.current();
  });

  strictEqual(called, true);
});
