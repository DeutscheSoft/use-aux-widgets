interface BackendOptions<T extends object> {
  factory: () => T;
  retryTimeout?: number | ((failureCount: number) => number);
  onError?: (err: Error | Event) => void;
}

interface BackendResult<T> {
  readonly backend: T|null;
  readonly reconnect: () => void;
}

type ResultFromOptions<Type> = Type extends BackendOptions<infer BackendType> ? BackendResult<BackendType> : never;
type BackendsOptions = Record<string, BackendOptions<object>>;
type ResultsFromOptions<Type> = {
  readonly [Property in keyof Type]: ResultFromOptions<Type[Property]>;
}

/**
 * Creates a list of backends. Backends will automatically reconnect.
 *
 * The argument is an object which contains one entry for each backend to create.
 * The property name is the name used for the backend, the property values are objects which
 * contain entries for
 *
 * @param options
 *      The name to use for this backend. Parameters of this backend will
 *      then become available through the `getBackendValue` AWML function
 *      with the `name + ':'` prefix.
 * @param {function} options[name].factory
 *      A factory function which creates the backend instance.
 * @param {function|number} [options[name].retryTimeout=500]
 *      This argument is used to configure the delay between reconnects. If
 *      the argument is a number, it is used as a timeout in milliseconds with
 *      some exponential backoff applied. If it is a function, it is called with
 *      one argument - the number of failed reconnects - and its return value is
 *      used as the retry delay in milliseconds.
 * @param {function} [options[name].onError]
 *      This function is called whenever a connection error happens in this
 *      backend. If no callback is supplied, `console.error` is used.
 *
 * @returns
 *      Returns an object which contains an entry for each backend. Each entry value
 *      is an object which contains the backend `backend` and the reconnect function
 *      `reconnect`.
 */
export function useBackends<T extends BackendsOptions>(options: T): ResultsFromOptions<T>;
