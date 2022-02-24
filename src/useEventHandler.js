import { useRef } from 'react';
import { useRefAsCallback } from './useRefAsCallback.js';

/**
 * Wraps a callback into a ref. The returned function will
 * not change when the argument changes. The returned function
 * will always call the latest value in the ref.
 * This hook can be used to wrap event handlers.
 */
export function useEventHandler(cb) {
  const callback = useRef(cb);

  callback.current = cb;

  return useRefAsCallback(callback);
}
