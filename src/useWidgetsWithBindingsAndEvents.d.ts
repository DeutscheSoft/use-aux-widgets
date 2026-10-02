import type { BindingDescription } from './valueTypes.js';

interface WidgetType<T> extends Function {
  new (options: object): T;
}

/**
 * Creates a list of widgets with bindings and event handlers.
 *
 * @param {Function} Widget
 *      The widget implementation to create widgets from.
 * @param {Object[]} options
 *      The options of the widget.
 * @param {(BindingDescription | BindingDescription[])[]} bindingDescriptions
 *      The description of the binding(s) to create for each widget.
 * @param {Record<string,function>[]} events
 *      The event handlers to subscribe for each widget.
 */
export function useWidgetsWithBindingsAndEvents<T>(
  Widget: WidgetType<T>,
  options: Record<string, unknown>[],
  bindingDescriptions?: (BindingDescription | BindingDescription[])[],
  events?: (Record<string, Function> | null)[]
): T[];
