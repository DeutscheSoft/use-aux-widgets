import type { BindingDescription } from './valueTypes.js';

/**
 * Create a binding or a list of bindings with a widget.
 *
 * @param {Widget[]} widgets
 *      The widgets to bind to.
 * @param {(BindingDescription | BindingDescription[])[]} bindingDescription
 *      The descriptions of the binding(s) to create.
 */
export function useWidgetsBindings(
  widget: object[],
  bindingDescription: (BindingDescription | BindingDescription[])[]
): void;
