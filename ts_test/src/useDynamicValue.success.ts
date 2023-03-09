import { useState } from 'react';
import { useDynamicValue } from '../../index';
import { DynamicValue } from '@deutschesoft/awml/src/index.pure';

export function run(v: DynamicValue<number>) {
  const [ foo, setFoo ] = useDynamicValue(v);

  setFoo(foo + 2);

  return foo;
}
