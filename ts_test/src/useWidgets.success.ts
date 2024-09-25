import { useWidgets } from '../../index';

class Widget {}

function run() {
  useWidgets(Widget, [
    {
      foo: 12,
      bar: 'hello',
    },
  ]);
}
