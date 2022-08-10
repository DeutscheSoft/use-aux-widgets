import { useWidgetBinding } from '../../index';
import { DynamicValue } from '@deutschesoft/awml/src/index.pure';

function run(widget, v: DynamicValue<number>) {
  useWidgetBinding(widget, {
    name: 'value',
  });
}
