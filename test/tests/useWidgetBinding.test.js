import { renderHook } from '@testing-library/react-hooks';
import { useWidget } from './src/useWidget.js';
import { useWidgetBinding } from './src/useWidgetBinding.js';
import { strictEqual, deepEqual } from 'node:assert';
import { WidgetMock } from './WidgetMock.js';
import { DynamicValue } from '@deutschesoft/awml/src/dynamic_value.js';
import test from 'node:test';

test('useWidgetBinding', () => {
  {
    const options = { foo: 3 };
    const Widget = WidgetMock;
    const backendValue = DynamicValue.fromConstant(1);
    let bindings = {
      name: 'foo',
      backendValue,
    };
    const { result, rerender, unmount } = renderHook(() => {
      const widget = useWidget(Widget, options);
      useWidgetBinding(widget, bindings);
      return widget;
    });

    const w = result.current;
    strictEqual(typeof w, 'object');
    deepEqual({ foo: 1 }, w.options);

    backendValue.set(3);
    rerender();
    deepEqual({ foo: 3 }, w.options);

    bindings = [
      bindings,
      {
        name: 'bar',
        backendValue,
      }
    ];
    rerender();
    deepEqual({ foo: 3, bar: 3 }, w.options);

    backendValue.set(4);
    rerender();
    deepEqual({ foo: 4, bar: 4 }, w.options);
    unmount();
  }
});
