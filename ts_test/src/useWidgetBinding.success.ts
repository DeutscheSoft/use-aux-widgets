import { useWidgetBinding } from '../../index';
import { DynamicValue } from '@deutschesoft/awml/src/dynamic_value.js';

function run(widget: object, v: DynamicValue<number>) {
  useWidgetBinding(widget, {
    name: 'value',
    backendValue: v,
  });
}
