/**
 * Helpers for working with objects implementing the `ReadableValue` and
 * `WritableValue` interfaces (see `valueTypes.d.ts`). These do not depend on
 * AWML.
 */

/** Returned by `peekValue` if no current value is available. */
export const NO_VALUE = Symbol('NO_VALUE');

/**
 * Returns true if `value` implements `ReadableValue`.
 */
export function isReadableValue(value) {
  return (
    value !== null &&
    typeof value === 'object' &&
    typeof value.subscribe === 'function'
  );
}

/**
 * Returns true if `value` implements `WritableValue`.
 */
export function isWritableValue(value) {
  return isReadableValue(value) && typeof value.set === 'function';
}

/**
 * Synchronously returns the current value of a `ReadableValue` or `NO_VALUE` if
 * there is none.
 *
 * If `hasValue` is defined, it decides if `value` is read. Otherwise `value`
 * is read if it exists (e.g. for `BehaviorSubject`).
 */
export function peekValue(readable) {
  const { hasValue } = readable;

  if (hasValue === false) return NO_VALUE;

  if (hasValue === void 0 && !('value' in readable)) return NO_VALUE;

  try {
    return readable.value;
  } catch (err) {
    // AWML throws if no value is available.
    return NO_VALUE;
  }
}

/**
 * Subscribes to a `ReadableValue` and returns the unsubscribe function.
 *
 * The `replay` argument is only passed to `subscribe` if it is `false`. This
 * way the default case also works with implementations whose `subscribe()` has
 * a different second argument.
 */
export function subscribeValue(readable, callback, replay = true) {
  return replay === false
    ? readable.subscribe(callback, false)
    : readable.subscribe(callback);
}
