import { useBackends } from '../../index';

function factory() {
  return "hello world";
}

export function run() {
  let backend: Backend | null = null;
  let reconnect: () => void;

  { 
    const result = useBackends({ foo: { factory } }).foo;
    backend = result.backend;
    reconnect = result.reconnect;
  }
}
