import { useCallback } from 'react';
import { useDynamicValueReadonly } from './useDynamicValueReadonly.js';
import { isWritableValue } from './valueHelpers.js';

function dummySetter(value) {
  /*
   * If this is called, the first argument to useDynamicValue
   * was null or undefined.
   */
  throw new Error('DynamicValue is null.');
}

function readonlySetter(value) {
  /*
   * If this is called, the first argument to useDynamicValue
   * does not have a set() method.
   */
  throw new Error('Value does not have a set() method.');
}

/**
 * Creates a state based on a dynamic value. This can be an AWML `DynamicValue`
 * or any other object which implements `WritableValue`, i.e. an object with a
 * `subscribe()` and a `set()` method. The returned state value will change
 * whenever the dynamic value changes. The returned setter will - when called -
 * call `.set()` on the dynamic value.
 *
 * @param {WritableValue} dynamicValue
 *      The dynamic value to subscribe to.
 *
 * @param [defaultValue]
 *      The default value of the state. If the dynamic value initially already
 *      has a value, it is used instead of `defaultValue`.
 *
 * @param {boolean} [replay=true]
 *      If set to `false`, the current value of the dynamic value is ignored
 *      when subscribing. This is passed as the second argument to `subscribe`
 *      only if it is `false`.
 */
export function useDynamicValue(
  dynamicValue,
  defaultValue = undefined,
  replay = true
) {
  const value = useDynamicValueReadonly(dynamicValue, defaultValue, replay);

  const setter = useCallback(
    dynamicValue
      ? isWritableValue(dynamicValue)
        ? (value) => {
            return dynamicValue.set(value);
          }
        : readonlySetter
      : dummySetter,
    [dynamicValue]
  );

  return [value, setter];
}
