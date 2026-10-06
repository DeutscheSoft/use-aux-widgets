import { fromSubscribable } from '../../index.js';
import type { ReadableValue, WritableValue } from '../../index.js';

class Subject<T> {
  constructor(public value: T) {}
  subscribe(cb: (value: T) => void) {
    return { unsubscribe() {} };
  }
  next(value: T) {}
}

class Stream<T> {
  subscribe(cb: (value: T) => void) {
    return () => {};
  }
}

export function run(subject: Subject<number>, stream: Stream<string>) {
  const a: ReadableValue<number> = fromSubscribable(subject);
  const b: WritableValue<number> = fromSubscribable(subject, (v) =>
    subject.next(v)
  );
  const c: ReadableValue<string> = fromSubscribable(stream);
  return [a, b, c];
}
