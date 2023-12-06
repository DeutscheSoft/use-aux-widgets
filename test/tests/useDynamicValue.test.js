import { renderHook, act } from '@testing-library/react-hooks';
import { useDynamicValue } from './src/useDynamicValue.js';
import { strictEqual, throws } from 'node:assert';
import { DynamicValue } from '@deutschesoft/awml/src/dynamic_value.js';
import test from 'node:test';

test('useDynamicValue', () => {
  {
    const dv = DynamicValue.fromConstant(42);
    const { result, unmount } = renderHook(() => useDynamicValue(dv));

    strictEqual(result.current[0], 42);

    act(() => {
      result.current[1](23);
    });

    strictEqual(23, result.current[0]);
    unmount();
  }

  {
    const dv = null;
    const { result, unmount } = renderHook(() => useDynamicValue(dv, 42));

    strictEqual(result.current[0], 42);
    throws(() => result.current[1](23));
    unmount();
  }

  {
    const dv = null;
    const { result, unmount } = renderHook(() => useDynamicValue(dv));

    strictEqual(result.current[0], undefined);
    throws(() => result.current[1](23));
    unmount();
  }
});
