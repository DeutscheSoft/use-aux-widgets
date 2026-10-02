import { useWidgetBinding } from '../../index.js';
import type { ReadableValue } from '../../index.js';

// A readonly backend value requires readonly: true.
export function run(widget: object, v: ReadableValue<number>) {
  useWidgetBinding(widget, { name: 'foo', backendValue: v });
}
