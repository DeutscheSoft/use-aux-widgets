interface MutableRefObject<T> {
  current: T;
}

/**
 * Returns a callback which calls a function inside of a ref.
 *
 * @param Ref
 *      A ref which contains a function.
 */
export function useRefAsCallback<T extends (...args: any[]) => any>(ref: MutableRefObject<T>): T;
