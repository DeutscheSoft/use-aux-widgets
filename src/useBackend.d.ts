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
export function useBackend<T extends object>(
  name: string,
  factory?: (() => Promise<T>) | (() => T),
  retryTimeout?: number | ((failureCount) => number),
  onError?: (err: Error) => void): [ T|null, () => void ];
