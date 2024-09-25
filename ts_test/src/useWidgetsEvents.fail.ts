import { useWidgetsEvents } from '../../index';

function run(widget: object) {
  useWidgetsEvents([widget, widget], {
    foo: () => {},
    bar: 12,
  });
}
