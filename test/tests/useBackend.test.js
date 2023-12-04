import { renderHook } from '@testing-library/react-hooks';
import { useBackend } from './src/useBackend.js';
import { strictEqual, throws } from 'node:assert';
import test from 'node:test';

test('useBackend', () => {
  renderHook(() => {
    throws(() => useBackend());
  });

  {
    const { result } = renderHook(() => useBackend('foobar'));
    strictEqual(result.current[0], null);
    strictEqual(typeof result.current[1], 'function');
  }
});
