import type { ReadableValue } from './valueTypes.js';

/**
 * Similar to `useDynamicValue`. The difference is that the current value
 * is returned and no setter. The value can be an AWML `DynamicValue` or any
 * other object which implements `ReadableValue`.
 */
export function useDynamicValueReadonly<T>(
  dynamicValue: ReadableValue<T> | undefined | null,
  defaultValue: T,
  replay?: boolean
): T;

export function useDynamicValueReadonly<T>(
  dynamicValue: ReadableValue<T> | undefined | null
): T | undefined;
