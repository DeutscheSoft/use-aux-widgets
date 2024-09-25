import renderHook from './renderHook.js';
import { useWidgets } from './src/useWidgets.js';
import assert, { strictEqual, deepEqual, notStrictEqual } from 'node:assert';
import { WidgetMock } from './WidgetMock.js';
import test from 'node:test';

test('useWidgets', () => {
  {
    let options = [{ foo: 1 }, { bar: 1 }];
    const Widget = WidgetMock;
    const { result, rerender, unmount } = renderHook(() =>
      useWidgets(Widget, options)
    );

    let a = result.current;
    assert(Array.isArray(a));
    strictEqual(a.length, options.length);

    options.forEach((o, i) => {
      strictEqual(typeof a[i], 'object');
      assert(a[i] instanceof Widget);
      deepEqual(a[i].options, options[i]);
    });

    // Check that widgets are updated but not recreated and that the
    // returned array remains the same
    options = [options[1], options[0]];
    rerender();
    strictEqual(a, result.current);
    result.current.forEach((w, i) => strictEqual(w, a[i]));
    options.forEach((o, i) => {
      strictEqual(typeof a[i], 'object');
      assert(a[i] instanceof Widget);
      deepEqual(a[i].options, options[i]);
    });

    // Add one widget at the end
    options = [...options, { flu: 3 }];
    rerender();
    notStrictEqual(a, result.current);
    a.forEach((w, i) => strictEqual(w, result.current[i]));
    a = result.current;
    options.forEach((o, i) => {
      strictEqual(typeof a[i], 'object');
      assert(a[i] instanceof Widget);
      deepEqual(a[i].options, options[i]);
    });

    // Remove one widgets
    options = [options[0], options[1]];
    rerender();
    notStrictEqual(a, result.current);
    result.current.forEach((w, i) => strictEqual(w, a[i]));
    assert(a[2].isDestructed());
    a = result.current;
    options.forEach((o, i) => {
      strictEqual(typeof a[i], 'object');
      assert(a[i] instanceof Widget);
      deepEqual(a[i].options, options[i]);
    });

    options = [];
    rerender();
    deepEqual(result.current, []);
    a.forEach((w) => assert(w.isDestructed()));

    unmount();
  }

  {
    const options = [{ foo: 1 }, { bar: 1 }];
    const Widget = WidgetMock;
    const { unmount } = renderHook(() => useWidgets(Widget, options));

    unmount();
  }
});
