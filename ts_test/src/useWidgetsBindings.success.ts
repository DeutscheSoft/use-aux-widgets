import { useWidgetsBindings } from '../../index';
import { DynamicValue } from '@deutschesoft/awml/src/index.pure';

function run(widgets: object[], v: DynamicValue<number>) {
  useWidgetsBindings(widgets, [
    {
      name: 'value',
      backendValue: v,
    },
  ]);
}
