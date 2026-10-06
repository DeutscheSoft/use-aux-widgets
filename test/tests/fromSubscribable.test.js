import { fromSubscribable } from './src/fromSubscribable.js';
import { peekValue, NO_VALUE } from './src/valueHelpers.js';
import { strictEqual, deepStrictEqual, throws, ok } from 'node:assert';
import { SubjectLikeValue, StreamValue } from './ValueMock.js';
import test from 'node:test';

test('fromSubscribable: subscribe returns a function', () => {
  const subject = new SubjectLikeValue(1);
  const value = fromSubscribable(subject);
  const received = [];

  const unsubscribe = value.subscribe((v) => received.push(v));

  strictEqual(typeof unsubscribe, 'function');
  subject.next(2);
  deepStrictEqual(received, [1, 2]);

  unsubscribe();
  strictEqual(subject.subscribers.size, 0);
  subject.next(3);
  deepStrictEqual(received, [1, 2]);

  // sources which return a function are fine, too.
  const stream = new StreamValue();
  const unsubscribe2 = fromSubscribable(stream).subscribe(() => {});
  strictEqual(stream.subscribers.size, 1);
  unsubscribe2();
  strictEqual(stream.subscribers.size, 0);
});

test('fromSubscribable: replay', () => {
  const subject = new SubjectLikeValue(1);
  const value = fromSubscribable(subject);
  const received = [];

  const unsubscribe = value.subscribe((v) => received.push(v), false);
  deepStrictEqual(received, []);
  subject.next(2);
  deepStrictEqual(received, [2]);
  unsubscribe();

  // never passes more than one argument on.
  subject.subscribeArgs.forEach((args) => deepStrictEqual(args, []));
});

test('fromSubscribable: set', () => {
  const subject = new SubjectLikeValue(1);

  const readonly = fromSubscribable(subject);
  ok(!('set' in readonly));

  const calls = [];
  const writable = fromSubscribable(subject, (v) => calls.push(v));
  writable.set(5);
  deepStrictEqual(calls, [5]);

  throws(() => fromSubscribable(subject, 42), TypeError);
});

test('fromSubscribable: no value or hasValue', () => {
  // Only subscribe() (and optionally set()) is part of the result.
  const subject = new SubjectLikeValue(1);
  const value = fromSubscribable(subject);

  ok(!('value' in value));
  ok(!('hasValue' in value));
  strictEqual(peekValue(value), NO_VALUE);
});
