import { useDynamicValue } from '../../index.js';
import type { ReadableValue } from '../../index.js';

// A readonly value cannot be used with useDynamicValue.
export function run(v: ReadableValue<number>) {
  const [foo, setFoo] = useDynamicValue(v);

  return foo;
}
