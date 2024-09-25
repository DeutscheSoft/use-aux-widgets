import { useWidgets } from './useWidgets.js';
import { useWidgetsBindings } from './useWidgetsBindings.js';
import { useWidgetsEvents } from './useWidgetsEvents.js';

export function useWidgetsWithBindingsAndEvents(
  Widget,
  widgetOptions,
  bindingDescriptions,
  events
) {
  const widgets = useWidgets(Widget, widgetOptions);

  useWidgetsBindings(widgets, bindingDescriptions);
  useWidgetsEvents(widgets, events);

  return widgets;
}
