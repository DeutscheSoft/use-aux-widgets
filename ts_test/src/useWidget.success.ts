import { useWidget } from '../../index.js';

class Widget {}

function run() {
  useWidget(Widget, {
    foo: 12,
    bar: 'hello',
  });
}
