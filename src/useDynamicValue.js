import { useState, useEffect, useCallback } from 'react';

function dummySetter(value) {
  /*
   * If this is called, the first argument to useDynamicValue
   * was null or undefined.
   */
  throw new Error('DynamicValue is null.');
}

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
  const hasDynamicValue = !!dynamicValue;
  const [ value, setValue ] = useState(
    (replay && dynamicValue && dynamicValue.hasValue) ? dynamicValue.value : defaultValue
  );

  const setter = useCallback(dynamicValue ? (value) => {
    return dynamicValue.set(value);
  } : dummySetter, [ dynamicValue ]);

  useEffect(() => {
    if (hasDynamicValue) {
      return dynamicValue.subscribe(setValue, replay);
    } else {
      setValue(defaultValue);
    }
  }, [ hasDynamicValue, hasDynamicValue ? dynamicValue : defaultValue, hasDynamicValue ? replay : false ]);

  return [ value, setter ];
}
