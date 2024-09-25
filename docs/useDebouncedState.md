# `useDebouncedState`

A variation of the standard useState which debounces value changes by a given
delay. This can be useful where the state can change quickly (e.g. due to a
pointermove event) and the resulting state change may lead to performance
issues.

Value changes are delayed using `setTimeout` only if the last change is less
than `debounceTime` milliseconds in the past. This means - for instance -
that the first state change will always happen immediately.

```ts
const [value, setValue] = useDebouncedState(debounceTime, defaultValue);
```

- **`debounceTime`**_`: number`_ - The number of milliseconds to debounce
  values.
- **`defaultValue`**_`: `_ - The default value of the state. This valus is
  passed to `useState`.

## Usage

```jsx
import { useDebouncedState } from '@deutschesoft/use-aux-widgets';

function App() {
  const [x, setX] = useDebouncedState(50, 0);
  const [y, setY] = useDebouncedState(50, 0);

  const onMouseMove = useCallback((ev) => {
    setX(ev.clientX);
    setY(ev.clientY);
  }, []);

  return (
    <div onMouseMove={onMouseMove}>
      Mouse at ({x}, {y}).
    </div>
  );
}
```
