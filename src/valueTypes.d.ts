/**
 * The result of subscribing to a value. This is either a plain function (as
 * returned by AWML `DynamicValue.subscribe()`) or an object with an
 * `unsubscribe()` method (as returned by e.g. RxJS).
 */
export type Unsubscribe = (() => void) | { unsubscribe(): void };

/**
 * A readable stream of values. Any AWML `DynamicValue` implements this
 * interface, as do many other observable-like objects.
 *
 * Implementations are expected to emit the current value (if any) to new
 * subscribers (`replay`), similar to a `BehaviorSubject`.
 */
export interface ReadableValue<T> {
  /**
   * Subscribe to the value.
   *
   * @param subscriber
   *      Called with every value.
   * @param replay
   *      Optional. If `false`, the current value should not be emitted to the
   *      subscriber on subscribe. This argument is only passed when it is
   *      `false`. Implementations which do not support it will ignore it.
   */
  subscribe(subscriber: (value: T) => void, replay?: boolean): Unsubscribe;

  /**
   * Optional. Whether a current value is available. If defined, it is used to
   * decide if `value` can be read.
   */
  readonly hasValue?: boolean;

  /**
   * Optional. The current value. Reading it may throw (AWML does this if no
   * value is available), in which case it is ignored.
   */
  readonly value?: T;
}

/**
 * A `ReadableValue` which can also be written to. Any AWML `DynamicValue`
 * implements this interface.
 */
export interface WritableValue<T> extends ReadableValue<T> {
  set(value: T): void | Promise<void>;
}

export interface BindingDescriptionShared {
  /** The name of the widget option to bind to. */
  name: string;
  /**
   * Optional operator applied to the backend value. Note that AWML operators
   * require AWML `DynamicValue` instances.
   */
  pipe?: (value: any) => ReadableValue<any> | WritableValue<any>;
  transformReceive?: (value: any) => any;
  transformSend?: (value: any) => any;
  replayReceive?: boolean;
  replaySend?: boolean;
  debug?: boolean;
  sync?: boolean;
  preventDefault?: boolean;
  preventChange?: boolean;
  ignoreInteraction?: boolean;
  receiveDelay?: number;
  writeonly?: boolean;
}

interface BindingDescriptionWritableBackendValue extends BindingDescriptionShared {
  backendValue: WritableValue<any>;
  readonly?: boolean;
}

interface BindingDescriptionReadonlyBackendValue extends BindingDescriptionShared {
  backendValue: ReadableValue<any>;
  /** Required if the `backendValue` does not have a `set` method. */
  readonly: true;
}

interface BindingDescriptionSrc extends BindingDescriptionShared {
  /** AWML backend address. Requires AWML backends. */
  src: string | string[];
  srcPrefix?: string | string[];
  partial?: boolean;
  debounce?: number;
  readonly?: boolean;
}

/**
 * Description of a binding between a widget option and a value.
 */
export type BindingDescription =
  | BindingDescriptionWritableBackendValue
  | BindingDescriptionReadonlyBackendValue
  | BindingDescriptionSrc;
