import { useRef, useMemo, useEffect } from 'react';
import { Bindings } from '@deutschesoft/awml/src/bindings.js';

function compareBindingDescription(a, b) {
  if (a === b || !a && !b)
    return true;

  if (!a || !b)
    return false;

  for (const name in a) {
    if (a[name] !== b[name]) return false;
  }

  for (const name in b) {
    if (a[name] !== b[name]) return false;
  }

  return true;
}

function compareBindingDescriptions(a, b) {
  if (a === b)
    return true;

  if (typeof a !== typeof b)
    return false;

  if (Array.isArray(a) !== Array.isArray(b))
    return false;

  if (Array.isArray(a)) {
    if (a.length !== b.length)
      return false;

    for (let i = 0; i < a.length; i++) {
      if (!compareBindingDescription(a[i], b[i]))
        return false;
    }

    return true;
  } else if (typeof a === 'object') {
    return compareBindingDescription(a, b);
  }

  return false;
}

function useBindingDescription(bindingDescription) {
  const ref = useRef(null);

  if (!compareBindingDescriptions(ref.current, bindingDescription)) {
    ref.current = bindingDescription;
  }

  return ref.current;
}

function useBindingsForWidget(widget) {
  return useMemo(() => {
    if (!widget || widget.isDestructed())
      return null;

    return new Bindings(widget, widget.element);
  }, [ widget ]);
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
  }, [ widget, bindings, bindingDescription ]);

  useEffect(() => {
    if (bindings)
      return () => {
        bindings.dispose();
      };
  }, [ bindings ]);
}
