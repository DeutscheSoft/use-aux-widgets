import { useMemo } from 'react';

/**
 * Returns a callback which calls a function inside of a ref.
 *
 * @param Ref
 *      A ref which contains a function.
 */
export function useRefAsCallback(ref) {
  return useMemo(() => {
    return function (...args) {
      return ref.current.apply(this, args);
    };
  }, [ref]);
}
