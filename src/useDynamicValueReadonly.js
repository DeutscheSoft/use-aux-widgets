import { useEffect, useState } from 'react';
import { NO_VALUE, peekValue, subscribeValue } from './valueHelpers.js';

/**
 * Similar to `useDynamicValue`. The difference is that the returned state is
 * only the current value and no setter.
 *
 * @param {ReadableValue|undefined|null} dynamicValue
 *      The value to subscribe to. This can be an AWML `DynamicValue` or any
 *      other object which implements `ReadableValue`.
 */
export function useDynamicValueReadonly(
  dynamicValue,
  defaultValue = undefined,
  replay = true
) {
  const hasDynamicValue = !!dynamicValue;
  const [value, setValue] = useState(() => {
    if (replay && dynamicValue) {
      const current = peekValue(dynamicValue);

      if (current !== NO_VALUE) return current;
    }

    return defaultValue;
  });

  useEffect(() => {
    if (hasDynamicValue) {
      // The state is wrapped in a function to make sure that values which are
      // functions are not interpreted as updaters by React.
      return subscribeValue(
        dynamicValue,
        (value) => setValue(() => value),
        replay
      );
    } else {
      setValue(() => defaultValue);
    }
  }, [
    hasDynamicValue,
    hasDynamicValue ? dynamicValue : defaultValue,
    hasDynamicValue ? replay : false,
  ]);

  return hasDynamicValue ? value : defaultValue;
}
