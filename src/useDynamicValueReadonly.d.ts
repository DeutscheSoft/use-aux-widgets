import { DynamicValue } from '@deutschesoft/awml/src/index.pure';

/**
 * Similar to `useDynamicValue`. The difference is that the current value
 * is returned and no setter.
 */
export function useDynamicValueReadonly<T>(
  dynamicValue: DynamicValue<T> | undefined | null,
  defaultValue: T,
  replay?: boolean
): T;

export function useDynamicValueReadonly<T>(
  dynamicValue: DynamicValue<T> | undefined | null
): T | undefined;
