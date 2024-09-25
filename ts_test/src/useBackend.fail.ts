import { useBackend } from '../../index';

function factory() {
  return 'foo';
}

export function run() {
  const [backend, reconnect] = useBackend('foo', factory);
}
