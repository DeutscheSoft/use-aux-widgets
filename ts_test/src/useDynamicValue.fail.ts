import { useState } from 'react';
import { useDynamicValue } from '../../index.js';
import { DynamicValue } from '@deutschesoft/awml/src/index.pure.js';

export function run(v: DynamicValue<number>) {
  const [foo, setFoo] = useDynamicValue(v);

  setFoo(foo + 'bar');

  return foo;
}
