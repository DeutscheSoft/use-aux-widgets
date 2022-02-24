import { useCallback } from 'react';

/**
 * Returns a callback which calls a function inside of a ref.
 *
 * @param Ref
 *      A ref which contains a function.
 */
export function useRefAsCallback(ref) {
  return useCallback((...args) => {
    return ref.current(...args);
  }, [ ref ]);
}
