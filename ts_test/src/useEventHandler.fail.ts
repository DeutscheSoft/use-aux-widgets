import { useEventHandler } from '../../index';

export function run() {
  const cb = (a: string, b: string, c: number) => {
    return a + b + c;
  };

  const cb2 = useEventHandler(cb);

  // Note: wrong arguments
  let result: string = cb2(4, 'foo', 'bar');
}
