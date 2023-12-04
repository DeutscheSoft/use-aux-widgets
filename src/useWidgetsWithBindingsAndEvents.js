import { useWidgets } from './useWidgets.js';
import { useWidgetBindings } from './useWidgetBindings.js';
import { useWidgetsEvents } from './useWidgetsEvents.js';

export function useWidgetsWithBindingsAndEvents(Widget, widgetOptions, bindingDescriptions, events) {
  const widgets = useWidgets(Widget, widgetOptions);

  useWidgetBindings(widgets, bindingDescriptions);
  useWidgetsEvents(widgets, events);

  return widgets;
}
