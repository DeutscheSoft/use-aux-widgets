import { useBackends } from '../../index';

class Backend { }

function factory() {
  return new Backend();
}

export function run() {
  let backend: Backend | null = null;
  let reconnect: () => void;

  { 
    const result = useBackends({ foo: { factory } }).bar;
    backend = result.backend;
    reconnect = result.reconnect;
  }
}
