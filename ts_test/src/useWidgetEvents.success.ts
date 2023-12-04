import { useWidgetEvents } from '../../index';


function run(widget: object) {
  useWidgetEvents(widget, {
    foo: () => {},
    bar: () => {},
  });
}
