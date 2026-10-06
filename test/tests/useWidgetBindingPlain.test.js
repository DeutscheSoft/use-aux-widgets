import './jsdom.js';
import renderHook from './renderHook.js';
import { useWidget } from './src/useWidget.js';
import { useWidgetBinding } from './src/useWidgetBinding.js';
import { componentFromWidget } from './src/componentFromWidget.js';
import { strictEqual, deepStrictEqual } from 'node:assert';
import { WidgetMock } from './WidgetMock.js';
import { PlainValue, StreamValue, SubjectLikeValue } from './ValueMock.js';
import { fromSubscribable } from './src/fromSubscribable.js';
import { act, render } from '@testing-library/react';
import { createElement } from 'react';
import test from 'node:test';

test('useWidgetBinding with plain objects', () => {
  {
    const backendValue = new PlainValue(true, 1);
    const { result, unmount } = renderHook(() => {
      const widget = useWidget(WidgetMock, { foo: 3 });
      useWidgetBinding(widget, { name: 'foo', backendValue });
      return widget;
    });

    const w = result.current;
    deepStrictEqual(w.options, { foo: 1 });

    act(() => {
      backendValue.set(3);
    });
    deepStrictEqual(w.options, { foo: 3 });

    // widget -> backend
    w.emit('useraction', 'foo', 9);
    strictEqual(backendValue._value, 9);
    unmount();
    strictEqual(backendValue.subscribers.size, 0);
  }

  {
    const backendValue = new StreamValue();
    const { result, unmount } = renderHook(() => {
      const widget = useWidget(WidgetMock, { foo: 3 });
      useWidgetBinding(widget, { name: 'foo', backendValue, readonly: true });
      return widget;
    });

    const w = result.current;

    act(() => {
      backendValue.emit(5);
    });
    deepStrictEqual(w.options, { foo: 5 });

    // This must not throw even though the value cannot be set.
    w.emit('useraction', 'foo', 9);
    unmount();
    strictEqual(backendValue.subscribers.size, 0);
  }
});

test('componentFromWidget with plain objects', () => {
  const Component = componentFromWidget(WidgetMock, {
    foo$: { name: 'foo' },
    bar$: { name: 'bar' },
  });

  let widget = null;
  const widgetRef = (w) => {
    widget = w;
  };

  const writable = new PlainValue(true, 4);
  const readable = new StreamValue();

  const { unmount } = render(
    createElement(Component, { widgetRef, foo$: writable, bar$: readable })
  );

  strictEqual(widget.get('foo'), 4);

  act(() => {
    readable.emit(7);
  });
  strictEqual(widget.get('bar'), 7);

  widget.emit('useraction', 'foo', 6);
  strictEqual(writable._value, 6);

  // This must not throw.
  widget.emit('useraction', 'bar', 8);

  unmount();
  strictEqual(writable.subscribers.size, 0);
  strictEqual(readable.subscribers.size, 0);
});

test('useWidgetBinding with adapted subscription objects', () => {
  // AWML cannot handle subscribe() returning an object. This is why
  // fromSubscribable is needed. Make sure bindings are cleaned up correctly.
  {
    const subject = new SubjectLikeValue(1);
    const backendValue = fromSubscribable(subject, (v) => subject.next(v));
    const { result, unmount } = renderHook(() => {
      const widget = useWidget(WidgetMock, { foo: 3 });
      useWidgetBinding(widget, { name: 'foo', backendValue });
      return widget;
    });

    const w = result.current;
    deepStrictEqual(w.options, { foo: 1 });

    act(() => {
      subject.next(3);
    });
    deepStrictEqual(w.options, { foo: 3 });

    w.emit('useraction', 'foo', 9);
    strictEqual(subject.value, 9);

    unmount();
    strictEqual(subject.subscribers.size, 0, 'two-way binding leaked.');
  }

  {
    const subject = new SubjectLikeValue(1);
    const backendValue = fromSubscribable(subject);
    const { result, unmount } = renderHook(() => {
      const widget = useWidget(WidgetMock, { foo: 3 });
      useWidgetBinding(widget, { name: 'foo', backendValue, readonly: true });
      return widget;
    });

    deepStrictEqual(result.current.options, { foo: 1 });

    unmount();
    strictEqual(subject.subscribers.size, 0, 'readonly binding leaked.');
  }
});
