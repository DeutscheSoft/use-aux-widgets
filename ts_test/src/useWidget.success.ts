import { useWidget } from '../../index';

class Widget {}

function run() {
  useWidget(Widget, {
    foo: 12,
    bar: 'hello',
  });
}
