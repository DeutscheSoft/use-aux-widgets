import { useWidgetsBindings } from '../../index.js';
import { DynamicValue } from '@deutschesoft/awml/src/dynamic_value.js';

function run(widgets: object[], v: DynamicValue<number>) {
  useWidgetsBindings(widgets, [
    {
      name: 'value',
      backendValue: v,
    },
  ]);
}
