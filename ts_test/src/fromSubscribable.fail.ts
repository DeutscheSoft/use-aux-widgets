import { fromSubscribable } from '../../index.js';
import type { WritableValue } from '../../index.js';

class Stream<T> {
  subscribe(cb: (value: T) => void) {
    return () => {};
  }
}

// Without a set callback, the result is readonly.
export function run(stream: Stream<string>) {
  const a: WritableValue<string> = fromSubscribable(stream);
  return a;
}
