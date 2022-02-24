import { useState, useRef, useCallback, useEffect } from 'react';

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
export function useDebouncedState(debounceTime, defaultValue) {
  const [ state, setState ] = useState(defaultValue);
  const ref = useRef({
    lastSet: 0,
    timerId: -1,
    lastValue: null,
  });

  const debouncedSetter = useCallback((value) => {
    const current = ref.current;
    const { lastSet, timerId } = current;
    const now = performance.now();
    const time = now - lastSet;

    if (!debounceTime || time >= debounceTime) {
      current.lastSet = now;
      setState(value);
    } else {
      if (timerId === -1) {
        current.timerId = setTimeout(() => {
          const value = current.lastValue;
          current.timerId = -1;
          current.lastSet = performance.now();
          setState(value)
        }, debounceTime - time);
      }

      current.lastValue = value;
    }
  }, [ debounceTime ]);

  useEffect(() => {
    return () => {
      const { timerId } = ref.current;
      if (timerId !== -1) {
        clearTimeout(timerId);
        ref.current.timerId = -1;
      }
    };
  }, []);

  return [ state, debouncedSetter ];
}
