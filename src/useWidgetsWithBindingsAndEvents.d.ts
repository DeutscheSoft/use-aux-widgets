import { IBindingDescription } from '@deutschesoft/awml/src/bindings';

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
 * @param {(IBindingDescription | IBindingDescription[])[]} bindingDescriptions
 *      The description of the binding(s) to create for each widget.
 * @param {Record<string,function>[]} events
 *      The event handlers to subscribe for each widget.
 */
export function useWidgetsWithBindingsAndEvents<T>(
  Widget: WidgetType<T>, 
  options: Record<string,unknown>[],
  bindingDescriptions?: (IBindingDescription | IBindingDescription[])[],
  events?: (Record<string, (...args: any[]) => any> | null)[]
): T[];
