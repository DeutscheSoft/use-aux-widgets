import renderHook from './renderHook.js';
import { useWidget } from './src/useWidget.js';
import { useWidgetEvent } from './src/useWidgetEvent.js';
import { strictEqual } from 'node:assert';
import { WidgetMock } from './WidgetMock.js';
import test from 'node:test';

test('useWidgetEvent', () => {
  {
    let called = 0;
    let options = { };
    const Widget = WidgetMock;
    let eventName = 'foo';
    let callback = () => { called++; };
    const { result, rerender, unmount } = renderHook(() => {
      const widget = useWidget(Widget, options);
      useWidgetEvent(widget, eventName, callback);
      return widget;
    });

    let w = result.current;
    strictEqual(typeof w, 'object');
    w.emit(eventName);
    strictEqual(called, 1);

    eventName = null;
    rerender();
    w.emit('foo');
    strictEqual(called, 1);

    eventName = 'foo';
    callback = () => { called++; };
    rerender();
    w.emit('foo');
    strictEqual(called, 2);

    options = null;
    rerender();

    options = {};
    rerender();
    w = result.current;
    w.emit('foo');
    strictEqual(called, 3);

    callback = function() {
      strictEqual(this, w);
      called++;
    };
    rerender();
    w = result.current;
    w.emit('foo');
    strictEqual(called, 4);

    unmount();
  }
});
