import renderHook from './renderHook.js';
import { useDynamicValueReadonly } from './src/useDynamicValueReadonly.js';
import { strictEqual } from 'node:assert';
import { DynamicValue } from '@deutschesoft/awml/src/dynamic_value.js';
import { map } from '@deutschesoft/awml/src/operators.js';
import test from 'node:test';

test('useDynamicValueReadonly', () => {
  {
    const dv = DynamicValue.fromConstant(42);
    const { result, rerender, unmount } = renderHook(() => useDynamicValueReadonly(dv));

    strictEqual(result.current, 42);

    dv.set(23);
    rerender();

    strictEqual(23, result.current);
    unmount();
  }

  {
    const dv1 = new DynamicValue();
    const dv = map(dv1, (val) => val);
    const { result, unmount, rerender } = renderHook(() => useDynamicValueReadonly(dv));

    strictEqual(result.current, undefined);

    dv1.set(42);
    rerender();

    strictEqual(result.current, 42);
    unmount();
  }

  {
    const dv = null;
    const { result, unmount } = renderHook(() => useDynamicValueReadonly(dv, 42));

    strictEqual(result.current, 42);
    unmount();
  }

  {
    const dv = null;
    const { result, unmount } = renderHook(() => useDynamicValueReadonly(dv));

    strictEqual(result.current, undefined);
    unmount();
  }
});
