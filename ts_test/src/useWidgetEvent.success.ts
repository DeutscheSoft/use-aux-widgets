import { useWidgetEvent } from '../../index.js';

function run(widget: object) {
  useWidgetEvent(widget, 'foo', () => {});
  useWidgetEvent(
    widget,
    'bar',
    function (this: object, key: string, value: number) {
      return false;
    }
  );
  useWidgetEvent(widget, 'foo');
}
