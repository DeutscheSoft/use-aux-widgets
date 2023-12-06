import { renderHook } from '@testing-library/react-hooks';
import { useWidget } from './src/useWidget.js';
import { useWidgetEvents } from './src/useWidgetEvents.js';
import { strictEqual } from 'node:assert';
import { WidgetMock } from './WidgetMock.js';
import test from 'node:test';

test('useWidgetEvents', () => {
  {
    let called = 0;
    let options = { };
    const Widget = WidgetMock;
    const callback = () => {
      called++;
    }
    let events = {
      foo: callback,
    };
    const { result, rerender, unmount } = renderHook(() => {
      const widget = useWidget(Widget, options);
      useWidgetEvents(widget, events);
      return widget;
    });

    strictEqual(typeof result.current, 'object');
    result.current.emit('foo');
    strictEqual(called, 1);

    events = null;
    rerender();
    result.current.emit('foo');
    strictEqual(called, 1);

    events = { foo: callback };
    rerender();
    result.current.emit('foo');
    strictEqual(called, 2);

    options = null;
    rerender();

    options = {};
    rerender();
    result.current.emit('foo');
    strictEqual(called, 3);

    unmount();
  }
});
