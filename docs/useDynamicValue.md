# `useDynamicValue`

Creates a state based on an AWML dynamic value. The returned state value will
change whenever the dynamic value changes. The returned setter will - when
called - call `.set()` on the dynamic value.

```ts
const [value, setValue] = useDynamicValue(dynamicValue, defaultValue, replay);
```

- **`dynamicValue`**_`: DynamicValue`_ - The dynamic value to subscribe to.
- **`defaultValue`**_`: any`_ - The default value of the state. If the dynamic
  value initially already has a value, it is used instead of `defaultValue`.
- **`replay`**_`: boolean`_ - Used as the second argument to
  `DynamicValue.subscribe`. This means that, if set to `false`, the current
  value of the dynamic value is not ignored. Defaults to `true`.

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
