import { useBackend } from '../../index';

class Backend { }

function factory() {
  return new Backend();
}

async function asyncFactory() {
  return new Backend();
}

function retryTimeout(failureCount: number) {
  return failureCount * 200;
}

function onError(err: Error) {
}

export function run() {
  let backend: Backend | null = null;
  let reconnect: () => void;

  useBackend('foo');

  [ backend, reconnect ] = useBackend('foo', factory);
  [ backend, reconnect ] = useBackend('foo', factory, 23);
  [ backend, reconnect ] = useBackend('foo', factory, retryTimeout);
  [ backend, reconnect ] = useBackend('foo', factory, retryTimeout, onError);

  [ backend, reconnect ] = useBackend('foo', asyncFactory);
  [ backend, reconnect ] = useBackend('foo', asyncFactory, 23);
  [ backend, reconnect ] = useBackend('foo', asyncFactory, retryTimeout);
  [ backend, reconnect ] = useBackend('foo', asyncFactory, retryTimeout, onError);
}
