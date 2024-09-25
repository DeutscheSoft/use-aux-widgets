import { useRef, useEffect } from 'react';
import { Bindings } from '@deutschesoft/awml/src/bindings.js';
import { compareBindingDescriptions } from './compareBindingDescriptions.js';
import { useMemoWithCleanup } from './useMemoWithCleanup.js';

function useBindingDescription(bindingDescription) {
  const ref = useRef(null);

  if (!compareBindingDescriptions(ref.current, bindingDescription)) {
    ref.current = bindingDescription;
  }

  return ref.current;
}

function useBindingsForWidget(widget) {
  return useMemoWithCleanup(() => {
    if (!widget || widget.isDestructed()) return [null, null];

    const bindings = new Bindings(widget, widget.element);
    return [bindings, () => bindings.dispose()];
  }, [widget]);
}

/**
 * Create a binding or a list of bindings with a widget.
 *
 * @param {Widget} widget
 *      The widget to bind to.
 * @param {IBindingDescription | IBindingDescription[]} bindingDescription
 *      The description of the binding(s) to create.
 */
export function useWidgetBinding(widget, bindingDescription) {
  if (widget && widget.isDestructed()) widget = null;
  bindingDescription = useBindingDescription(bindingDescription);

  const bindings = useBindingsForWidget(widget);

  useEffect(() => {
    if (bindings && widget && !widget.isDestructed())
      bindings.update(bindingDescription);
  }, [widget, bindings, bindingDescription]);
}
