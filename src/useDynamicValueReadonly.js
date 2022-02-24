import { useEffect, useState } from 'react';

/**
 * Similar to `useDynamicValue`. The difference is that the returned state is
 * only the current value and no setter.
 */
export function useDynamicValueReadonly(dynamicValue, defaultValue=undefined, replay=true) {
  const [ value, setValue ] = useState(dynamicValue.hasValue ? dynamicValue.value : defaultValue);

  useEffect(() => {
    return dynamicValue.subscribe(setValue, replay);
  }, [ dynamicValue, replay ]);

  return value;
}
