import { useState, useEffect, useCallback } from 'react';

/**
 * Creates a state based on an AWML dynamic value. The returned state value will
 * change whenever the dynamic value changes. The returned setter will - when
 * called - call `.set()` on the dynamic value.
 *
 * @param {DynamicValue} dynamicValue
 *      The dynamic value to subscribe to.
 *
 * @param [defaultValue]
 *      The default value of the state. If the dynamic value initially already
 *      has a value, it is used instead of `defaultValue`.
 *
 * @param {boolean} [replay=true]
 *      Used as the second argument to `DynamicValue.subscribe`. This means
 *      that, if set to `false`, the current value of the dynamic value is not
 *      ignored.
 */
export function useDynamicValue(dynamicValue, defaultValue=undefined, replay=true) {
  const [ value, setValue ] = useState((replay && dynamicValue.hasValue) ? dynamicValue.value : defaultValue);

  const setter = useCallback((value) => {
    return dynamicValue.set(value);
  }, [ dynamicValue ]);

  useEffect(() => {
    return dynamicValue.subscribe(setValue, replay);
  }, [ dynamicValue, replay ]);

  return [ value, setter ];
}
