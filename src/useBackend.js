import { registerBackend, unregisterBackend } from '@deutschesoft/awml/src/index.pure.js'
import { useState, useRef, useEffect } from 'react';
import { useRefAsCallback } from './useRefAsCallback.js';
import { useEventHandler } from './useEventHandler.js';
import { useLatest } from './useLatest.js';

function subscribeBackend(factory, calculateRetryTimeout, onError, callback) {
  let active = true;
  let backend = null;
  let retryCount = 0;
  let timeoutId = -1;
  let connecting = true;
  let connect;

  const retry = () => {
    if (!active) return;

    callback(backend = null);

    const timeout = calculateRetryTimeout(retryCount++);

    if (timeout > 0) {
      timeoutId = setTimeout(
        () => {
          timeoutId = -1;
          if (!active) return;
          connect();  
        },
        timeout);
    } else {
      connect();
    }
  };

  const onOpen = () => {
    retryCount = 0;

    if (!active) {
      backend.close();
      backend = null;
    }

    backend.on('close', () => {
      if (!active)
        return;

      retryCount = 0;
      retry();
    });

    callback(backend);
  };

  connect = () => {
    try {
      const onBackend = (_backend) => {
        backend = _backend;

        backend.on('error', (error) => {
          retry();
          onError(error);
        });

        if (_backend.isOpen) {
          onOpen(_backend);
        } else if (_backend.isInit) {
          if (!active) {
            _backend.close();
          } else {
            _backend.on('open', onOpen);
          }
        } else {
          if (active)
            retry();
        }
      };

      const task = factory();

      if (typeof task !== 'object') {
        retry();
      } else {
        if (typeof task.then === 'function') {
          task.then(
            onBackend,
            (error) => {
              onError(error);     
              retry();
            }
          );
        } else {
          onBackend(task); 
        }
      }
    } catch (error) {
      if (!active) return;
      onError(error);
      retry();
    }
  };

  const unsubscribe = () => {
    if (!active) return;
    active = false;

    if (backend) {
      backend.close(); 
      backend = null;
    }

    if (timeoutId !== -1)
      clearTimeout(timeoutId);
  };

  const triggerReconnect = () => {
    if (!active) return;

    if (backend && backend.isOpen) return;
    if (connecting) return;

    if (timeoutId !== -1) {
      clearTimeout(timeoutId);
      timeoutId = -1;
    }

    connect();
  };

  connect();

  return [ unsubscribe, triggerReconnect ];
}

// does nothing
function defaultReconnect() {}

function defaultErrorHandler(err) {
  console.error(err);
}

function calculateRetryTimeout(retryTimeout, retryCount) {
  if (typeof retryTimeout === 'function') {
    return retryTimeout(retryCount);
  } else if (typeof retryTimeout === 'number') {
    return Math.min(10, Math.pow(1.4, retryCount)) * retryTimeout;
  }
}

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

  useEffect(() => {
    if (!factory) {
      setBackend(null);
      return;
    }

    const [ unsubscribe, triggerReconnect ] = subscribeBackend(
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
  }, [ setBackend, factory, retryTimeout, onError ]);

  useEffect(() => {
    if (!backend) return;

    registerBackend(name, backend);

    return () => {
      unregisterBackend(name, backend);
    };
  }, [ backend, name ]);

  return [ backend, useRefAsCallback(reconnect) ];
}
