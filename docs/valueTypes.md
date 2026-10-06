# `ReadableValue` and `WritableValue`

The hooks and components in this library which connect to data sources are not
tied to AWML. They accept any object implementing one of two small interfaces.
AWML `DynamicValue` implements both, so existing code continues to work.

## `ReadableValue`

```ts
interface ReadableValue<T> {
  subscribe(subscriber: (value: T) => void, replay?: boolean): () => void;
  readonly hasValue?: boolean;
  readonly value?: T;
}
```

- `subscribe` returns an unsubscribe **function**, as AWML `DynamicValue` does.
  Objects with an `unsubscribe()` method (e.g. RxJS subscriptions) are not
  supported here, because AWML does not support them in bindings. Use
  [`fromSubscribable`](./fromSubscribable.md) to adapt such sources. The current
  value (if any) is expected to be emitted to new subscribers.
- The `replay` argument is only passed if it is `false`. Implementations which
  do not support it ignore it.
- `hasValue` and `value` are optional and only used to read the initial value
  synchronously (avoiding one render with the default value). If `hasValue` is
  defined it decides whether `value` is read, otherwise `value` is read if it
  exists. Errors thrown when reading `value` are ignored.

RxJS `BehaviorSubject`, `Subject` and `Observable` are not a `ReadableValue`
directly, but can be adapted using [`fromSubscribable`](./fromSubscribable.md).

## `WritableValue`

```ts
interface WritableValue<T> extends ReadableValue<T> {
  set(value: T): void | Promise<void>;
}
```

## Where they are used

- [`useDynamicValue`](./useDynamicValue.md) requires a `WritableValue`.
- [`useDynamicValueReadonly`](./useDynamicValueReadonly.md) requires a
  `ReadableValue`.
- The `backendValue` of binding descriptions (see
  [`useWidgetBinding`](./useWidgetBinding.md) and
  [`componentFromWidget`](./componentFromWidget.md)) can be a `WritableValue`.
  A `ReadableValue` is allowed if `readonly: true` is set. `componentFromWidget`
  sets this automatically for values without a `set()` method.

Note that `src`-based bindings and the `pipe` option still rely on AWML. In
particular, AWML operators passed to `pipe` require AWML `DynamicValue`
instances.
