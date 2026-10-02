import { useState } from 'react';
import { useDynamicValue } from '../../index';
import { DynamicValue } from '@deutschesoft/awml/src/dynamic_value.js';

export function run(v: DynamicValue<number>) {
  const [foo, setFoo] = useDynamicValue(v, 0);

  setFoo(foo + 2);

  return foo;
}
