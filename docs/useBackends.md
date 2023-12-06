# `useBackends`

Creates a list of backends. Backends will automatically reconnect.

```ts
const backends = useBackend(options);
```

- **`options`**_`: Record<string,object>`_ - Contians one entry for each backend to
  create. The name of the entry is used as the backend name. Parameters of
  this backend will then become available through the `getBackendValue` AWML
  function with the `name + ':'` prefix.
- **`options[name].factory`**_`: () => Backend`_ - A factory function which creates the
  backend instance. If undefined is passed, no backend is being created.
  This can be used to conditionally connect.
- **`options[name].retryTimeout`**_`: number | (retryCount: number) => number`_ - This
  argument is used to configure the delay between reconnects. If
  the argument is a number, it is used as a timeout in milliseconds with
  some exponential backoff applied. If it is a function, it is called with
  one argument - the number of failed reconnects - and its return value is
  used as the retry delay in milliseconds.
- **`options[name].onError`**_`: (err: Error) => void`_ - This function is called
  whenever a connection error happens in this backend. If no callback is
  supplied, `console.error` is used.

The returns an object which contains one entry for each backend which contains

- **`result`**_`: Record<string,object>`_ - Contians one entry for each backend.
- **`result[name].backend`**_`: object|null`_ - The backend created by the corresponding factory
  function. Will be null as long as the backend is not open.
- **`result[name].reconnect`**_`: function`_ - A function which can be called to trigger the
  backend to reconnect. This can be used to trigger an early reconnect, e.g. by user
  action.

## Usage

```jsx
import { useBackends } from '@deutschesoft/use-aux-widgets';
import { LocalBackend } from '@deutschesoft/awml/src/index.pure.js';

function backendFactory() {
  return new LocalBackend();
}

function App() {
  const result = useBackend({
      local: { factory: backendFactory, retryTimeout: 50 }
      temp: { factory: backendFactory }
  });

  const localBackend = result.local.backend;
  const tempBackend = result.temp.backend;

  return (
    ...
  );
}
```
