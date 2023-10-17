import { renderHook, act } from '@testing-library/react-hooks';
import { useDynamicValueReadonly } from './src/useDynamicValueReadonly.js';
import { strictEqual } from 'node:assert';
import { DynamicValue } from '@deutschesoft/awml/src/dynamic_value.js';
import { map } from '@deutschesoft/awml/src/operators.js';
import test from 'node:test';

test('useDynamicValueReadonly', () => {
  {
    const dv = DynamicValue.fromConstant(42);
    const { result } = renderHook(() => useDynamicValueReadonly(dv));

    strictEqual(result.current, 42);

    act(() => {
      dv.set(23);
    });

    strictEqual(23, result.current);
  }

  {
    const dv1 = new DynamicValue();
    const dv = map(dv1, (val) => val);
    const { result } = renderHook(() => useDynamicValueReadonly(dv));

    strictEqual(result.current, undefined);

    act(() => { 
      dv1.set(42);
    });

    strictEqual(result.current, 42);
  }

  {
    const dv = null;
    const { result } = renderHook(() => useDynamicValueReadonly(dv, 42));

    strictEqual(result.current, 42);
  }

  {
    const dv = null;
    const { result } = renderHook(() => useDynamicValueReadonly(dv));

    strictEqual(result.current, undefined);
  }
});
