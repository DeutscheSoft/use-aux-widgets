import { useWidgetEvent } from '../../index';

function run(widget: object) {
  useWidgetEvent(widget, 'foo', 23);
}
