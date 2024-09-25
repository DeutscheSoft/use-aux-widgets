import { useEffect, useState } from 'react';

/**
 * Similar to `useDynamicValue`. The difference is that the returned state is
 * only the current value and no setter.
 */
export function useDynamicValueReadonly(
  dynamicValue,
  defaultValue = undefined,
  replay = true
) {
  const hasDynamicValue = !!dynamicValue;
  const [value, setValue] = useState(
    replay && dynamicValue && dynamicValue.hasValue
      ? dynamicValue.value
      : defaultValue
  );

  useEffect(() => {
    if (hasDynamicValue) {
      return dynamicValue.subscribe(setValue, replay);
    } else {
      setValue(defaultValue);
    }
  }, [
    hasDynamicValue,
    hasDynamicValue ? dynamicValue : defaultValue,
    hasDynamicValue ? replay : false,
  ]);

  return hasDynamicValue ? value : defaultValue;
}
