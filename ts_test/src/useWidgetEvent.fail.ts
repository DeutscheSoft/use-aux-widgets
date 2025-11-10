import { useWidgetEvent } from '../../index.js';

function run(widget: object) {
  useWidgetEvent(widget, 'foo', 23);
}
