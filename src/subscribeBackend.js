import {
  registerBackend,
  unregisterBackend,
} from '@deutschesoft/awml/src/backends.js';

function waitForEvents(backend, eventNames, continuation) {
  const callbacks = eventNames.map((eventName, index) => {
    return (...args) => {
      eventNames.forEach((eventName, i) => {
        backend.off(eventName, callbacks[i]);
      });
      continuation(eventName, args);
    };
  });
  callbacks.forEach((callback, i) => {
    backend.on(eventNames[i], callback);
  });
}

function waitForOpen(backend, continuation) {
  if (backend.isOpen) {
    continuation('open', backend);
  } else if (backend.isInit) {
    waitForEvents(backend, ['open', 'error', 'close'], (eventName, args) => {
      switch (eventName) {
        case 'open':
          continuation('open', backend);
          break;
        case 'error':
          continuation('error', args[0]);
          break;
        case 'close':
          continuation('close');
          break;
      }
    });
  } else {
    continuation('error', new Error('Backend closed after create.'));
  }
}

function waitForClose(backend, continuation) {
  waitForEvents(backend, ['error', 'close'], (eventName, args) => {
    switch (eventName) {
      case 'error':
        continuation('error', args[0]);
        break;
      case 'close':
        continuation('close');
        break;
    }
  });
}

function safeCall(callback, ...args) {
  try {
    callback(...args);
  } catch (err) {
    console.error(err);
  }
}

function connect(name, factory, continuation) {
  try {
    const task = factory();

    if (task.then) {
      task
        .then((backend) => {
          waitForOpen(backend, continuation);
        })
        .catch((err) => {
          continuation('error', err);
        });
    } else {
      const backend = task;
      waitForOpen(backend, continuation);
    }
  } catch (err) {
    continuation('error', err);
  }
}

export function subscribeBackend(
  name,
  factory,
  calculateRetryTimeout,
  onError,
  callback
) {
  let active = true;
  let backend = null;
  let retryCount = 0;
  let retryId;

  const clearRetry = () => {
    if (retryId !== undefined) {
      clearTimeout(retryId);
      retryId = undefined;
    }
  };

  const triggerRetryAt = (timeout) => {
    clearRetry();
    if (!active) return;
    retryId = setTimeout(() => {
      retry();
    }, timeout);
  };

  const triggerRetry = () => {
    const timeout = calculateRetryTimeout(retryCount);
    triggerRetryAt(timeout);
  };

  const retry = () => {
    connect(name, factory, (eventName, result) => {
      if (eventName === 'open') {
        backend = result;
        if (!active) {
          backend.close();
          return;
        }

        registerBackend(name, backend);
        safeCall(callback, backend);

        retryCount = 0;

        waitForClose(backend, (eventName, result) => {
          unregisterBackend(name, backend);
          backend = null;
          if (eventName === 'error') {
            safeCall(onError, result);
          }
          safeCall(callback, null);
          triggerRetry();
        });
      } else {
        if (!active) return;
        retryCount++;

        if (eventName === 'error') {
          const error = result;
          safeCall(onError, error);
        }

        triggerRetry();
      }
    });
  };

  const unsubscribe = () => {
    if (!active) return;
    active = false;

    clearRetry();
    if (backend) {
      try {
        if (backend.isOpen || backend.isInit) backend.close();
      } catch (err) {
        console.error('Backend.close() failed: %o', err);
      }
    }
  };

  const triggerReconnect = () => {
    if (!active) return;

    if (backend) return;

    triggerRetryAt(0);
  };

  retry();

  return [unsubscribe, triggerReconnect];
}

// does nothing
export function defaultReconnect() {}

export function defaultErrorHandler(err) {
  console.error('useBackend error:', err);
}

export function calculateRetryTimeout(retryTimeout, retryCount) {
  if (typeof retryTimeout === 'function') {
    return retryTimeout(retryCount);
  } else {
    if (!(retryTimeout > 0)) retryTimeout = 500;

    return Math.min(10, Math.pow(1.4, retryCount)) * retryTimeout;
  }
}
