# `useBackend`

Creates a backend which automatically reconnects on error.

```ts
const [ backend, triggerReconnect ] = useBackend(name, factory, retryTimeout,
                                                 onError);
```

- **`name`**_`: string`_ - The name to use for this backend. Parameters of
  this backend will then become available through the `getBackendValue` AWML
  function with the `name + ':'` prefix.
- **`factory`**_`: () => Backend`_ - A factory function which creates the
  backend instance. If undefined is passed, no backend is being created.
  This can be used to conditionally connect.
- **`retryTimeout`**_`: number | (retryCount: number) => number`_ - This
  argument is used to configure the delay between reconnects. If
  the argument is a number, it is used as a timeout in milliseconds with
  some exponential backoff applied. If it is a function, it is called with
  one argument - the number of failed reconnects - and its return value is
  used as the retry delay in milliseconds.
- **`onError`**_`: (err: Error) => void`_ - This function is called
  whenever a connection error happens in this backend. If no callback is
  supplied, `console.error` is used.

## Usage

```jsx
import { useBackend } from '@deutschesoft/use-aux-widgets';
import { LocalBackend } from '@deutschesoft/awml/src/index.pure.js';

function backendFactory() {
  return new LocalBackend();
}

function App() {
  const [ backend ] = useBackend('local', backendFactory, 50);

  return (
    ...
  );
}
```
