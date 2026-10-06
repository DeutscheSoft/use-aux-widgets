# `fromSubscribable`

Adapts an observable-like source (e.g. an RxJS `Observable` or `BehaviorSubject`)
to the [`ReadableValue` or `WritableValue`](./valueTypes.md) interface.

AWML requires `subscribe()` to return an unsubscribe _function_ and does not
support subscription objects (with an `unsubscribe()` method) in bindings. This
adapter makes such sources usable with all hooks and bindings of this library.

```ts
const readable = fromSubscribable(source);
const writable = fromSubscribable(source, set);
```

- **`source`**_`: Subscribable`_ - An object with a `subscribe(next)` method
  which returns either an unsubscribe function or an object with an
  `unsubscribe()` method, i.e. an RxJS `Observable`, `Subject` or
  `BehaviorSubject`.
- **`set`**_`: (value) => void | Promise<void>`_ - Optional. If given, the
  result is a `WritableValue` and `set()` calls this function. Otherwise the
  result is a `ReadableValue`.

Notes:

- The initial value is received when subscribing (a `BehaviorSubject` emits it
  synchronously). The result has no `hasValue` or `value` properties.
- The `replay` argument of `subscribe` is never passed on to the source. If it
  is `false`, values emitted synchronously during `subscribe` are dropped.
- Create the adapter once (e.g. using `useMemo`) and not on every render:
  bindings and hooks compare values by identity.

## Usage

```jsx
import { useMemo } from 'react';
import {
  fromSubscribable,
  useDynamicValue,
} from '@deutschesoft/use-aux-widgets';

function Channel(props) {
  const { mute$ } = props; // an RxJS Observable<boolean>

  const value = useMemo(
    () => fromSubscribable(mute$, (value) => mute$.next(value)),
    [mute$]
  );

  const [muted, setMuted] = useDynamicValue(value, false);

  return (
    <button onClick={() => setMuted(!muted)}>
      {muted ? 'Muted' : 'Not Muted'}
    </button>
  );
}
```
