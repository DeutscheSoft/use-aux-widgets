interface MutableRefObject<T> {
  current: T;
}

/**
 * A ref which always contains the latest value.
 */
export function useLatest<T>(value: T): MutableRefObject<T>;
