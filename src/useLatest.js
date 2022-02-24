import { useRef } from 'react';

/**
 * A ref which always contains the latest value.
 */
export function useLatest(value) {
  const ref = useRef(value);
  ref.current = value;
  return ref;
}
