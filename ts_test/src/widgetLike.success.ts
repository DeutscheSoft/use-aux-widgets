import {
  useWidget,
  useWidgetBinding,
  useWidgetsBindings,
  useWidgetEvent,
  useWidgetEvents,
  useWidgetsEvents,
  useWidgetOption,
  useWidgetInteraction,
} from '../../index.js';
import type { WidgetLike } from '../../index.js';

// aux-widgets has no declarations: widgets are `any` ...
declare const UntypedWidget: any;

export function run(anyWidget: any, unknownWidget: unknown, like: WidgetLike) {
  // ... which makes the result of useWidget `unknown`. This must work.
  const w = useWidget(UntypedWidget, {});
  const nothing = useWidget(null);

  for (const widget of [
    anyWidget,
    unknownWidget,
    like,
    w,
    nothing,
    null,
    undefined,
  ]) {
    useWidgetBinding(widget, []);
    useWidgetEvent(widget, 'foo', () => {});
    useWidgetEvents(widget, {});
    useWidgetOption(widget, 'value', 0);
    useWidgetInteraction(widget);
  }

  useWidgetsBindings([anyWidget, w, nothing, null, undefined], []);
  useWidgetsEvents([anyWidget, w, nothing, null, undefined], []);
}
