
export function subscribeBackend(factory, calculateRetryTimeout, onError, callback) {
  let active = true;
  let backend = null;
  let retryCount = 0;
  let timeoutId = -1;
  let connecting = true;
  let connect = null;

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
        connecting = false;
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
export function defaultReconnect() {}

export function defaultErrorHandler(err) {
  console.error('an error');
}

export function calculateRetryTimeout(retryTimeout, retryCount) {
  if (typeof retryTimeout === 'function') {
    return retryTimeout(retryCount);
  } else {
    if (!(retryTimeout > 0))
      retryTimeout = 500;

    return Math.min(10, Math.pow(1.4, retryCount)) * retryTimeout;
  }
}

