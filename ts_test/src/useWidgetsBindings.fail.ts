import { useWidgetsBindings } from '../../index.js';
import { DynamicValue } from '@deutschesoft/awml/src/index.pure.js';

function run(widgets: object[], v: DynamicValue<number>) {
  useWidgetsBindings(widgets, {
    name: 'value',
    backendValue: v,
  });
}
