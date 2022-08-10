import { useState } from 'react';
import { useDynamicValueReadonly } from '../../index';
import { DynamicValue } from '@deutschesoft/awml/src/index.pure';

export function run(v: DynamicValue<number>): number {
  const foo = useDynamicValueReadonly(v);

  return foo + 2;
}
