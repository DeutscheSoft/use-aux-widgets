import {
  useDynamicValue,
  useDynamicValueReadonly,
  useWidgetBinding,
  useWidgetsBindings,
} from '../../index.js';
import type {
  ReadableValue,
  WritableValue,
  BindingDescription,
} from '../../index.js';
import { DynamicValue } from '@deutschesoft/awml/src/dynamic_value.js';

// An AWML DynamicValue implements both interfaces.
export function awml(v: DynamicValue<number>) {
  const r: ReadableValue<number> = v;
  const w: WritableValue<number> = v;
  const d: BindingDescription = { name: 'foo', backendValue: v };
  return [r, w, d];
}

// A plain object with a function as unsubscribe.
class Plain implements WritableValue<string> {
  subscribe(cb: (value: string) => void) {
    cb('x');
    return () => {};
  }
  set(value: string) {}
}

// A subject-like object.
class SubjectLike implements WritableValue<number> {
  value = 1;
  subscribe(cb: (value: number) => void) {
    cb(this.value);
    return { unsubscribe() {} };
  }
  set(value: number) {}
}

// A readonly object.
class Stream implements ReadableValue<boolean> {
  subscribe(cb: (value: boolean) => void) {
    return () => {};
  }
}

export function hooks(a: Plain, b: SubjectLike, c: Stream) {
  const [s, setS] = useDynamicValue(a, '');
  const [n, setN] = useDynamicValue(b);
  const [x, setX] = useDynamicValue(null as WritableValue<number> | null, 1);
  const bool: boolean = useDynamicValueReadonly(c, false);
  const str: string = useDynamicValueReadonly(a, '');
  const num: number = useDynamicValueReadonly(b, 1);
  const num2: number = useDynamicValueReadonly(
    null as DynamicValue<number> | null,
    1
  );

  setS(s + 'foo');
  setN(1);
  setX(x + 1);
  return [n, bool, str, num, num2];
}

export function bindings(
  widget: object,
  a: Plain,
  b: SubjectLike,
  c: Stream,
  d: DynamicValue<number>
) {
  useWidgetBinding(widget, { name: 'foo', backendValue: a });
  useWidgetBinding(widget, [
    { name: 'foo', backendValue: b },
    { name: 'bar', backendValue: c, readonly: true },
    { name: 'baz', backendValue: d, readonly: true },
    { name: 'baz', src: 'foo:bar' },
  ]);
  useWidgetsBindings(
    [widget, widget],
    [{ name: 'foo', backendValue: c, readonly: true }, []]
  );
}
