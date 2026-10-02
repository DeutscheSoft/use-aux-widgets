import type { WritableValue } from './valueTypes.js';

/**
 * Creates a state based on a dynamic value. This can be an AWML `DynamicValue`
 * or any other object which implements `WritableValue`, i.e. an object with a
 * `subscribe()` and a `set()` method. The returned state value will change
 * whenever the dynamic value changes. The returned setter will - when called -
 * call `.set()` on the dynamic value.
 *
 * @param {WritableValue|undefined|null} dynamicValue
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
export function useDynamicValue<T>(
  dynamicValue: WritableValue<T> | undefined | null,
  defaultValue: T,
  replay?: boolean
): [T, (value: T) => Promise<void> | void];

export function useDynamicValue<T>(
  dynamicValue: WritableValue<T> | undefined | null
): [T | undefined, (value: T) => Promise<void> | void];
