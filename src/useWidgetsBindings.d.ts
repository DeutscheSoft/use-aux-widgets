import type { BindingDescription } from './valueTypes.js';
import type { WidgetLike } from './widgetTypes.js';

/**
 * Create a binding or a list of bindings with a widget.
 *
 * @param {WidgetLike[]} widgets
 *      The widgets to bind to.
 * @param {(BindingDescription | BindingDescription[])[]} bindingDescription
 *      The descriptions of the binding(s) to create.
 */
export function useWidgetsBindings(
  widgets: WidgetLike[],
  bindingDescription: (BindingDescription | BindingDescription[])[]
): void;
