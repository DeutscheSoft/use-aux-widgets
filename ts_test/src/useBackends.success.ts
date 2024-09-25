import { useBackends } from '../../index';

class Backend {}

function factory() {
  return new Backend();
}

async function asyncFactory() {
  return new Backend();
}

function retryTimeout(failureCount: number) {
  return failureCount * 200;
}

function onError(err: Error) {}

export function run() {
  let backend: Backend | null = null;
  let reconnect: () => void;

  useBackends({});

  {
    const result = useBackends({ foo: { factory } }).foo;
    backend = result.backend;
    reconnect = result.reconnect;
  }

  {
    const result = useBackends({ foo: { factory, retryTimeout } }).foo;
    backend = result.backend;
    reconnect = result.reconnect;
  }

  {
    const result = useBackends({ foo: { factory, retryTimeout: 23 } }).foo;
    backend = result.backend;
    reconnect = result.reconnect;
  }

  {
    const result = useBackends({
      foo: { factory, retryTimeout: 23, onError },
    }).foo;
    backend = result.backend;
    reconnect = result.reconnect;
  }

  {
    const result = useBackends({ foo: { factory: asyncFactory } }).foo;
    backend = result.backend;
    reconnect = result.reconnect;
  }

  {
    const result = useBackends({
      foo: { factory: asyncFactory, retryTimeout },
    }).foo;
    backend = result.backend;
    reconnect = result.reconnect;
  }

  {
    const result = useBackends({
      foo: { factory: asyncFactory, retryTimeout: 23 },
    }).foo;
    backend = result.backend;
    reconnect = result.reconnect;
  }

  {
    const result = useBackends({
      foo: { factory: asyncFactory, retryTimeout: 23, onError },
    }).foo;
    backend = result.backend;
    reconnect = result.reconnect;
  }
}
