import { useWidgetBinding } from '../../index';
import { DynamicValue } from '@deutschesoft/awml/src/dynamic_value.js';

function run(widget, v: DynamicValue<number>) {
  useWidgetBinding(widget, {
    name: 'value',
    backendValue: v,
  });
}
