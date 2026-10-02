# `useDynamicValue`

Creates a state based on a dynamic value. This can be an AWML `DynamicValue` or
any other object which implements
[`WritableValue`](./valueTypes.md#writablevalue), i.e. an object with a
`subscribe()` and a `set()` method. The returned state value will change
whenever the dynamic value changes. The returned setter will - when called -
call `.set()` on the dynamic value.

```ts
const [value, setValue] = useDynamicValue(dynamicValue, defaultValue, replay);
```

- **`dynamicValue`**_`: WritableValue`_ - The dynamic value to subscribe to.
- **`defaultValue`**_`: any`_ - The default value of the state. If the dynamic
  value initially already has a value, it is used instead of `defaultValue`.
- **`replay`**_`: boolean`_ - If set to `false`, the current value of the
  dynamic value is ignored when subscribing. It is passed as the second argument
  to `subscribe` only if it is `false`. Defaults to `true`.

## Usage

```jsx
import { useDynamicValue } from '@deutschesoft/use-aux-widgets';

function Channel(props) {
  const { mute$ } = props;

  const [muted, setMuted] = useDynamicValue(mute$);

  const onClick = () => {
    setMuted(!muted);
  };

  return (
    <div className="channel">
      <button onClick={onClick}>{muted ? 'Muted' : 'Not Muted'}</button>
    </div>
  );
}
```
