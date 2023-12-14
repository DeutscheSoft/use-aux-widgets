import renderHook from './renderHook.js';
import { useEffect } from 'react';
import { strictEqual } from 'node:assert';
import test from 'node:test';

test('StrictMode', () => {
  let called = 0;
  let cleaned = 0;
  const hook = () => {
    useEffect(() => {
      called++;
      return () => {
        cleaned++; 
      };
    }, []);
  };
  const { rerender, unmount } = renderHook(hook);

  strictEqual(called, 2);
  strictEqual(cleaned, 1);

  rerender();

  strictEqual(called, 2);
  strictEqual(cleaned, 1);

  unmount();

  strictEqual(called, 2);
  strictEqual(cleaned, 2);
});
