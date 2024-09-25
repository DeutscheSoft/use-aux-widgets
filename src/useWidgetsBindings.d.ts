import { IBindingDescription } from '@deutschesoft/awml/src/bindings';

/**
 * Create a binding or a list of bindings with a widget.
 *
 * @param {Widget[]} widgets
 *      The widgets to bind to.
 * @param {(IBindingDescription | IBindingDescription[])[]} bindingDescription
 *      The descriptions of the binding(s) to create.
 */
export function useWidgetsBindings(
  widget: object[],
  bindingDescription: (IBindingDescription | IBindingDescription[])[]
): void;
