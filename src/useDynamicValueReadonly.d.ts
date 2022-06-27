import { DynamicValue } from '@deutschesoft/awml/src/index.pure';

/**
 * Similar to `useDynamicValue`. The difference is that the returned state is
 * only the current value and no setter.
 */
export function useDynamicValueReadonly<T>(
    dynamicValue: DynamicValue<T>,
    defaultValue?: T,
    replay?: boolean
  ): T;
