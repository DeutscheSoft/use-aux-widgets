import { useBackend } from '../../index.js';

function factory() {
  return 'foo';
}

export function run() {
  const [backend, reconnect] = useBackend('foo', factory);
}
