import { useWidgetsEvents } from '../../index.js';

function run(widget: object) {
  useWidgetsEvents([widget, widget], {
    foo: () => {},
    bar: 12,
  });
}
