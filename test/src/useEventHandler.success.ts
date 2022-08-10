import { useEventHandler } from '../../index';

export function run() {
  const cb = (a: string, b: string, c: number) => {
    return a + b + c;
  };

  const cb2 = useEventHandler(cb);

  let result: string = cb2("foo", "bar", 2.3);
}
