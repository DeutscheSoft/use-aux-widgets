import { useState } from 'react';
import { useDynamicValueReadonly } from '../../index.js';
import { DynamicValue } from '@deutschesoft/awml/src/dynamic_value.js';

export function run(v: DynamicValue<number>): number {
  const foo = useDynamicValueReadonly(v, 1);

  return foo + 2;
}

export function run2(v: DynamicValue<number>): number {
  const foo = useDynamicValueReadonly(v, 12);

  return foo + 2;
}

export function run3(v: DynamicValue<number> | null): number {
  const foo = useDynamicValueReadonly(v, 1);

  return foo + 2;
}

export function run4(): number {
  useDynamicValueReadonly(null);
  useDynamicValueReadonly(undefined);
  const foo = useDynamicValueReadonly(undefined, 23);

  return foo + 2;
}
