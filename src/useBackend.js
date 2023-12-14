import { useState, useRef, useEffect } from 'react';
import { useRefAsCallback } from './useRefAsCallback.js';
import { useEventHandler } from './useEventHandler.js';
import { useLatest } from './useLatest.js';
import { subscribeBackend, defaultReconnect, defaultErrorHandler, calculateRetryTimeout } from './subscribeBackend.js';

/**
 * Creates a backend which automatically reconnects on error.
 *
 * @param {string} name
 *      The name to use for this backend. Parameters of this backend will
 *      then become available through the `getBackendValue` AWML function
 *      with the `name + ':'` prefix.
 * @param {function} factory
 *      A factory function which creates the backend instance.
 * @param {function|number} [retryTimeout=500]
 *      This argument is used to configure the delay between reconnects. If
 *      the argument is a number, it is used as a timeout in milliseconds with
 *      some exponential backoff applied. If it is a function, it is called with
 *      one argument - the number of failed reconnects - and its return value is
 *      used as the retry delay in milliseconds.
 * @param {function} [onError]
 *      This function is called whenever a connection error happens in this
 *      backend. If no callback is supplied, `console.error` is used.
 *
 * @returns
 *      Returns an array which contains the backend (or null when not connected)
 *      and a callback which can be used to trigger a reconnect.
 */
export function useBackend(name, factory, retryTimeout, onError) {
  onError = useEventHandler(onError || defaultErrorHandler);
  retryTimeout = useLatest(retryTimeout || 500);

  const [ backend, setBackend ] = useState(null);
  const reconnect = useRef(defaultReconnect);

  if (typeof name !== 'string' || !name)
    throw new TypeError('expected string.');

  useEffect(() => {
    if (!factory) {
      setBackend(null);
      return;
    }

    const [ unsubscribe, triggerReconnect ] = subscribeBackend(
      name,
      factory,
      (retryCount) => calculateRetryTimeout(retryTimeout.current, retryCount),
      onError,
      (backend) => {
        setBackend(backend);
      }
    );

    reconnect.current = triggerReconnect;

    return () => {
      reconnect.current = defaultReconnect;
      unsubscribe();
    };
  }, [ name, setBackend, factory, retryTimeout, onError ]);

  return [ backend, useRefAsCallback(reconnect) ];
}
