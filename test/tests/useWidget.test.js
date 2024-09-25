import renderHook from './renderHook.js';
import { useWidget } from './src/useWidget.js';
import { strictEqual } from 'node:assert';
import { WidgetMock } from './WidgetMock.js';
import test from 'node:test';

test('useWidget', () => {
  {
    let options = { foo: 1 };
    let Widget = WidgetMock;
    const { result, rerender, unmount } = renderHook(() =>
      useWidget(Widget, options)
    );

    let w = result.current;
    strictEqual(typeof w, 'object');
    strictEqual(w.options.foo, 1);

    options = {
      foo: 4,
      bar: 3,
    };
    rerender();

    strictEqual(w, result.current);
    strictEqual(w.options.foo, 4);
    strictEqual(w.options.bar, 3);

    options = {
      bar: 3,
    };
    rerender();

    strictEqual(w, result.current);
    strictEqual(w.options.foo, void 0);
    strictEqual(w.options.bar, 3);

    options = null;
    rerender();
    strictEqual(null, result.current);
    strictEqual(w.isDestructed(), true);

    options = {};
    Widget = null;
    rerender();
    strictEqual(null, result.current);

    options = null;
    rerender();
    strictEqual(null, result.current);

    options = { foo: 23 };
    rerender();
    strictEqual(null, result.current);

    Widget = WidgetMock;

    rerender();
    w = result.current;
    strictEqual(typeof w, 'object');
    strictEqual(w.options.foo, 23);

    unmount();
  }
});
