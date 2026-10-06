import type {
  ReadableValue,
  WritableValue,
  Subscribable,
} from './valueTypes.js';

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
 */
export function fromSubscribable<T>(
  source: Subscribable<T>,
  set: (value: T) => void | Promise<void>
): WritableValue<T>;
export function fromSubscribable<T>(source: Subscribable<T>): ReadableValue<T>;
