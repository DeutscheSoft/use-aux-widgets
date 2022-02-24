# `useEventHandler`

Wraps a callback into a ref. The returned function will
not change when the argument changes. The returned function
will always call the latest value in the ref.
This hook can be used to wrap event handlers.

```ts
callback = useEVentHandler(callback)
```

## Usage

```jsx
import { useEventHandler } from '@deutschesoft/use-aux-widgets';

function Button(props) {
  const onClick = useEventHandler(props.onClick);

  return (
    <button onClick={ onClick }>Click here!</button>
  );
}
```
