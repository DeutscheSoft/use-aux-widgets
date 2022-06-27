import { IBindingDescription } from '@deutschesoft/awml/src/bindings';

/**
 * Create a binding or a list of bindings with a widget.
 *
 * @param {Widget} widget
 *      The widget to bind to.
 * @param {IBindingDescription | IBindingDescription[]} bindingDescription
 *      The description of the binding(s) to create.
 */
export function useWidgetBinding(
  widget,
  bindingDescription: IBindingDescription | IBindingDescription[]
): void;
