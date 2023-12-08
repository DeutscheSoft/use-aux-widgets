import renderHook from './renderHook.js';
import { useWidgets } from './src/useWidgets.js';
import { useWidgetsEvents } from './src/useWidgetsEvents.js';
import assert, { strictEqual } from 'node:assert';
import { WidgetMock } from './WidgetMock.js';
import test from 'node:test';

test('useWidgetEvents', () => {
  {
    let called = 0;
    const options = [ { }, { } ];
    const Widget = WidgetMock;
    const callback = () => {
      called++;
    };
    let events = [
      {
        foo: callback,
      },
      {
        bar: callback,
      }
    ];
    const { result, rerender, unmount } = renderHook(() => {
      const widgets = useWidgets(Widget, options);
      useWidgetsEvents(widgets, events);
      return widgets;
    });

    assert(Array.isArray(result.current));
    strictEqual(result.current.length, 2);
    result.current[0].emit('foo');
    result.current[1].emit('foo');
    strictEqual(called, 1);
    result.current[0].emit('bar');
    result.current[1].emit('bar');
    strictEqual(called, 2);

    events = null;
    rerender();
    result.current[0].emit('foo');
    result.current[1].emit('foo');
    strictEqual(called, 2);

    events = [
        null,
        { foo: callback }
    ];
    rerender();
    result.current[0].emit('foo');
    result.current[1].emit('foo');
    strictEqual(called, 3);

    unmount();
  }
});
