import { useWidgets } from '../../index.js';

class Widget {}

function run() {
  useWidgets(Widget, {
    foo: 12,
    bar: 'hello',
  });
}
