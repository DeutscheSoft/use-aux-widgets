import { useEffect, useState } from 'react';
import { forEachChangedProperty } from './forEachChangedProperty.js';
import { subscribeBackend, defaultReconnect, defaultErrorHandler, calculateRetryTimeout } from './subscribeBackend.js';
import { useMemoWithCleanup } from './useMemoWithCleanup.js';

function compareBackendOptions(a, b) {
  if (a === b || !a && !b) return true;

  if (!a || !b) return false;

  return a.factory === b.factory &&
    a.retryTimeout === b.retryTimeout &&
    a.onError === b.onError;
}

class BackendsManager {
  constructor(onResults) {
    this.options = {};
    this.result = {};
    this.subscriptions = new Map();
    this.onResults = onResults;
  }

  unsubscribe(name) {
    const { subscriptions } = this;

    const subscription = subscriptions.get(name);
    if (!subscription)
      return;
    subscriptions.delete(name);
    subscription();
  }

  notify(name, result) {
    if (!this.onResults) return;
    const { [name]: currentResult, ...rest } = this.result;

    if (!result) {
      this.result = rest;
    } else {
      this.result = {
        [name]: {
          ...(currentResult||{}),
          ...result
        },
        ...rest,
      };
    }

    this.onResults(this.result);
  }

  update(options) {
    forEachChangedProperty(
      this.options,
      options,
      (name) => {
        this.unsubscribe(name);
        this.notify(name, null);
      },
      (name, value, prevValue) => {
        if (compareBackendOptions(value, prevValue))
          return;

        this.unsubscribe(name);

        if (!value)
          return;

        const factory = value.factory;

        if (!factory)
          return;

        this.notify(name, {
          backend: null,
          reconnect: defaultReconnect,
        });

        const [ unsubscribe, reconnect ] = subscribeBackend(
          name,
          factory,
          (retryCount) => calculateRetryTimeout(value.retryTimeout, retryCount),
          value.onError || defaultErrorHandler,
          (backend) => {
            this.notify(name, { backend: backend || null });
          }
        );

        this.subscriptions.set(name, unsubscribe);
        this.notify(name, {
          reconnect,
        });
      }
    );
    this.options = options;
  }

  dispose() {
    this.onResults = null;
    this.subscriptions.forEach((unsubscribe) => {
      if (unsubscribe)
        unsubscribe();
    });
  }
}

export function useBackends(options) {
  const [ results, setResults ] = useState({});

  const manager = useMemoWithCleanup(() => {
    const manager = new BackendsManager(setResults);

    return [
      manager,
      () => manager.dispose()
    ];
  }, [ ]);

  useEffect(() => {
    if (manager)
      manager.update(options);
  }, [ manager, options ]);

  return results;
}
