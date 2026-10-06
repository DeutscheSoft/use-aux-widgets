function normalizeSubscription(subscription) {
  if (typeof subscription === 'function') return subscription;

  if (subscription && typeof subscription.unsubscribe === 'function')
    return () => subscription.unsubscribe();

  return () => {};
}

/*
 * There are two separate classes, instead of adding a `set` method to a single
 * kind of object when needed. This way objects of each class always have the
 * same shape.
 */

class ReadableSubscribableAdapter {
  constructor(source) {
    this._source = source;
  }

  subscribe(callback, replay = true) {
    // The source is expected to emit its current value on subscribe. If
    // replay is false we drop what is emitted synchronously.
    let skip = replay === false;

    try {
      return normalizeSubscription(
        this._source.subscribe((value) => {
          if (skip) return;
          callback(value);
        })
      );
    } finally {
      skip = false;
    }
  }
}

class WritableSubscribableAdapter extends ReadableSubscribableAdapter {
  constructor(source, set) {
    super(source);
    this._set = set;
  }

  set(value) {
    return this._set(value);
  }
}

/**
 * Adapts an observable-like source (e.g. an RxJS `Observable` or
 * `BehaviorSubject`) to the `ReadableValue` or `WritableValue` interface.
 *
 * The result can be used wherever this library expects a `ReadableValue` or
 * `WritableValue`, including the `backendValue` of bindings. This is needed
 * because AWML requires `subscribe()` to return an unsubscribe function and
 * does not support subscription objects.
 *
 * Note that the adapter should be created once (e.g. using `useMemo`) and not
 * on every render, because bindings are compared by identity.
 *
 * @param {Subscribable} source
 *      The source to adapt.
 * @param {function} [set]
 *      If given, the result has a `set()` method which calls this function.
 *      Without it, the result is readonly.
 *
 * @returns {ReadableValue|WritableValue}
 */
export function fromSubscribable(source, set) {
  if (set === void 0) return new ReadableSubscribableAdapter(source);

  if (typeof set !== 'function') throw new TypeError('Expected function.');

  return new WritableSubscribableAdapter(source, set);
}
