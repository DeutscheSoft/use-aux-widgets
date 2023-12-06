import { renderHook } from '@testing-library/react-hooks';
import { useWidgets } from './src/useWidgets.js';
import { useWidgetsBindings } from './src/useWidgetsBindings.js';
import assert, { deepEqual, strictEqual } from 'node:assert';
import { WidgetMock } from './WidgetMock.js';
import { DynamicValue } from '@deutschesoft/awml/src/dynamic_value.js';
import test from 'node:test';

test('useWidgetsBindings', () => {
  {
    const options = [ { }, { } ];
    const Widget = WidgetMock;
    const backendValue = DynamicValue.fromConstant(1);
    let bindings = [
      { name: 'foo', backendValue, },
      { name: 'bar', backendValue, }
    ];
    const { result, rerender, unmount } = renderHook(() => {
      const widgets = useWidgets(Widget, options);
      useWidgetsBindings(widgets, bindings);
      return widgets;
    });

    assert(Array.isArray(result.current));
    strictEqual(result.current.length, 2);
    deepEqual(result.current[0].options, { foo: 1 });
    deepEqual(result.current[1].options, { bar: 1 });

    bindings = null;
    rerender();
    backendValue.set(4);
    deepEqual(result.current[0].options, { foo: 1 });
    deepEqual(result.current[1].options, { bar: 1 });

    bindings = [
        null,
        { name: 'foo', backendValue }
    ];
    rerender();
    deepEqual(result.current[0].options, { foo: 1 });
    deepEqual(result.current[1].options, { bar: 1, foo: 4 });

    bindings = null;
    rerender();
    backendValue.set(23);
    deepEqual(result.current[0].options, { foo: 1 });
    deepEqual(result.current[1].options, { bar: 1, foo: 4 });

    bindings = [
      { name: 'foo', backendValue, },
      { name: 'bar', backendValue, }
    ];
    rerender();
    deepEqual(result.current[0].options, { foo: 23 });
    deepEqual(result.current[1].options, { bar: 23, foo: 4 });

    unmount();
  }
});
