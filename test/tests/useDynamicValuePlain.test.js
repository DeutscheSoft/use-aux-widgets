import renderHook from './renderHook.js';
import { useDynamicValue } from './src/useDynamicValue.js';
import { useDynamicValueReadonly } from './src/useDynamicValueReadonly.js';
import { strictEqual, deepStrictEqual, throws, ok } from 'node:assert';
import { act } from '@testing-library/react';
import { fromSubscribable } from './src/fromSubscribable.js';
import { PlainValue, SubjectLikeValue, StreamValue } from './ValueMock.js';
import test from 'node:test';

// The tests run in StrictMode, i.e. subscribe() can be called more than once.
function assertAllArgs(dv, expected) {
  ok(dv.subscribeArgs.length > 0);
  dv.subscribeArgs.forEach((args) => deepStrictEqual(args, expected));
}

function assertNoArgs(dv) {
  assertAllArgs(dv, []);
}

test('useDynamicValue with plain objects', () => {
  {
    const dv = new PlainValue(true, 42);
    const { result, unmount } = renderHook(() => useDynamicValue(dv));

    strictEqual(result.current[0], 42);
    assertNoArgs(dv, 'replay=true is not passed on.');

    act(() => {
      result.current[1](23);
    });

    strictEqual(result.current[0], 23);
    strictEqual(dv._value, 23);
    unmount();
    strictEqual(dv.subscribers.size, 0);
  }

  {
    const dv = new PlainValue();
    const { result, unmount } = renderHook(() => useDynamicValue(dv, 5));

    strictEqual(result.current[0], 5);

    act(() => {
      dv.set(7);
    });

    strictEqual(result.current[0], 7);
    unmount();
  }

  {
    const dv = new PlainValue(true, 42);
    const { result, unmount } = renderHook(() => useDynamicValue(dv, 5, false));

    strictEqual(result.current[0], 5);
    assertAllArgs(dv, [false]);
    unmount();
  }
});

test('useDynamicValue with an adapted subject-like object', () => {
  const subject = new SubjectLikeValue(1);
  const dv = fromSubscribable(subject, (value) => subject.next(value));
  const { result, unmount } = renderHook(() => useDynamicValue(dv));

  // The initial value is received from the subscription.
  strictEqual(result.current[0], 1);
  // The subject must not see the replay argument (an error callback in RxJS).
  subject.subscribeArgs.forEach((args) => deepStrictEqual(args, []));

  act(() => {
    subject.next(2);
  });

  strictEqual(result.current[0], 2);

  act(() => {
    result.current[1](3);
  });

  strictEqual(subject.value, 3);
  strictEqual(result.current[0], 3);

  unmount();
  strictEqual(subject.subscribers.size, 0, 'unsubscribe() was not called.');
});

test('useDynamicValue with a readonly object', () => {
  const dv = new StreamValue();
  const { result, unmount } = renderHook(() => useDynamicValue(dv, 1));

  strictEqual(result.current[0], 1);

  act(() => {
    dv.emit(2);
  });

  strictEqual(result.current[0], 2);
  throws(() => result.current[1](3), /set\(\)/);
  unmount();
  strictEqual(dv.subscribers.size, 0);
});

test('useDynamicValueReadonly with plain objects', () => {
  {
    const dv = new StreamValue();
    const { result, unmount } = renderHook(() =>
      useDynamicValueReadonly(dv, 'a')
    );

    strictEqual(result.current, 'a');

    act(() => {
      dv.emit('b');
    });

    strictEqual(result.current, 'b');
    unmount();
    strictEqual(dv.subscribers.size, 0);
  }

  {
    // values which are functions must not be treated as updaters.
    const dv = new PlainValue();
    const f = () => 42;
    const { result, unmount } = renderHook(() => useDynamicValueReadonly(dv));

    act(() => {
      dv.set(f);
    });

    strictEqual(result.current, f);
    unmount();
  }
});
