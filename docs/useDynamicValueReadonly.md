# `useDynamicValueReadonly`

Similar to `useDynamicValue`. The difference is that the returned state is
only the current value and no setter. Any object which implements
[`ReadableValue`](./valueTypes.md#readablevalue) can be used, e.g. an AWML
`DynamicValue` or an RxJS `BehaviorSubject`.

```ts
const value = useDynamicValueReadonly(dynamicValue, defaultValue, replay);
```

- **`dynamicValue`**_`: ReadableValue`_ - The value to subscribe to.
- **`defaultValue`**_`: any`_ - The default value of the state. If the dynamic
  value initially already has a value, it is used instead of `defaultValue`.
- **`replay`**_`: boolean`_ - If set to `false`, the current value is ignored
  when subscribing. It is passed as the second argument to `subscribe` only if
  it is `false`. Defaults to `true`.

## Usage

```jsx
import { useDynamicValueReadonly } from '@deutschesoft/use-aux-widgets';

function Channel(props) {
  const { mute$ } = props;

  const muted = useDynamicValueReadonly(mute$);

  return (
    <div className="channel">
      <button>{muted ? 'Muted' : 'Not Muted'}</button>
    </div>
  );
}
```
