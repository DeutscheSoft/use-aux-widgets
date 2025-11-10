import { useWidgetBinding } from '../../index';
import { DynamicValue } from '@deutschesoft/awml/src/index.pure.js';

function run(widget, v: DynamicValue<number>) {
  useWidgetBinding(widget, {
    name: 'value',
  });
}
