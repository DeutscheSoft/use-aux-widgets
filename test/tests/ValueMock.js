/**
 * Minimal implementations of ReadableValue and WritableValue which do not
 * depend on AWML.
 */

/**
 * Behaves like an AWML DynamicValue. `subscribe` returns a function, supports
 * `replay` and `hasValue` is defined.
 */
export class PlainValue {
  constructor(hasValue = false, value = undefined) {
    this._hasValue = hasValue;
    this._value = value;
    this.subscribers = new Set();
    this.subscribeArgs = [];
  }

  get hasValue() {
    return this._hasValue;
  }

  get value() {
    if (!this._hasValue) throw new Error('no value');
    return this._value;
  }

  subscribe(cb, ...args) {
    this.subscribeArgs.push(args);
    const replay = args.length ? args[0] : true;
    this.subscribers.add(cb);
    if (replay && this._hasValue) cb(this._value);
    return () => {
      this.subscribers.delete(cb);
    };
  }

  set(value) {
    this._hasValue = true;
    this._value = value;
    this.subscribers.forEach((cb) => cb(value));
  }
}

/**
 * Behaves like a BehaviorSubject: There is no `hasValue`, the `value` is always
 * available, `subscribe` always replays and returns an object with an
 * `unsubscribe` method. Note that the second argument to `subscribe` is an
 * error callback in RxJS.
 */
export class SubjectLikeValue {
  constructor(value) {
    this.value = value;
    this.subscribers = new Set();
    this.subscribeArgs = [];
  }

  subscribe(cb, ...args) {
    this.subscribeArgs.push(args);
    this.subscribers.add(cb);
    cb(this.value);
    return {
      unsubscribe: () => {
        this.subscribers.delete(cb);
      },
    };
  }

  next(value) {
    this.value = value;
    this.subscribers.forEach((cb) => cb(value));
  }

  set(value) {
    this.next(value);
  }
}

/**
 * A readable value without set(), hasValue or value. Does not replay.
 */
export class StreamValue {
  constructor() {
    this.subscribers = new Set();
  }

  subscribe(cb) {
    this.subscribers.add(cb);
    return () => {
      this.subscribers.delete(cb);
    };
  }

  emit(value) {
    this.subscribers.forEach((cb) => cb(value));
  }
}
