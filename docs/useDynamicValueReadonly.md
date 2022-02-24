# `useDynamicValueReadonly`

Similar to `useDynamicValue`. The difference is that the returned state is
only the current value and no setter.

```ts
const value = useDynamicValue(dynamicValue, defaultValue, replay);
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

  const muted = useDynamicValue(mute$);

  return (
    <div className='channel'>
      <button>{ muted ? 'Muted' : 'Not Muted' }</button>
    </div>
  );
}
```
