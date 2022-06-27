/**
 * Wraps a callback into a ref. The returned function will
 * not change when the argument changes. The returned function
 * will always call the latest value in the ref.
 * This hook can be used to wrap event handlers.
 */
export function useEventHandler<T extends (...args: any[]) => any>(cb: T): T;
