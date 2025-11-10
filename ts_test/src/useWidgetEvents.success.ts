import { useWidgetEvents } from '../../index.js';

function run(widget: object) {
  useWidgetEvents(widget, {
    foo: () => {},
    bar: () => {},
  });
}
