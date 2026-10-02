import type { BindingDescription } from './valueTypes.js';

/**
 * Create a binding or a list of bindings with a widget.
 *
 * @param {Widget} widget
 *      The widget to bind to.
 * @param {BindingDescription | BindingDescription[]} bindingDescription
 *      The description of the binding(s) to create.
 */
export function useWidgetBinding(
  widget: object,
  bindingDescription: BindingDescription | BindingDescription[]
): void;
