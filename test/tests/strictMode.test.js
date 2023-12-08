import renderHook from './renderHook.js';
import { useEffect } from 'react';
import { useBackend } from './src/useBackend.js';
import { strictEqual, throws } from 'node:assert';
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
  const { result, rerender, unmount } = renderHook(hook);

  strictEqual(called, 2);
  strictEqual(cleaned, 1);

  rerender();

  unmount();

  strictEqual(cleaned, 2);
});
