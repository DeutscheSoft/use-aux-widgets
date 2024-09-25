/**
 * A variation of the standard useState which debounces value changes by a given
 * delay. This can be useful where the state can change quickly (e.g. due to a
 * pointermove event) and the resulting state change may lead to performance
 * issues.
 *
 * Value changes are delayed using `setTimeout` only if the last change is less
 * than `debounceTime` milliseconds in the past. This means - for instance -
 * that the first state change will always happen immediately.
 *
 * @param {number} debounceTime
 *      The number of milliseconds to debounce values.
 *
 * @param [defaultValue]
 *      The default value of the state. This valus is passed to
 *      `useState`.
 *
 * @returns
 *      Returns both the state value and a setter.
 */
export function useDebouncedState<T>(
  debounceTime: number,
  defaultValue?: T
): [T, (value: T) => void];
