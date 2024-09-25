import { useState, useEffect, useRef } from 'react';
import { Bindings } from '@deutschesoft/awml/src/bindings.js';
import { compareBindingDescriptions } from './compareBindingDescriptions.js';

function useBindingsForWidgets(widgets) {
  const [descriptions, setDescriptions] = useState([]);

  useEffect(() => {
    const tmp = widgets.map((widget) => {
      if (!widget || widget.isDestructed()) return null;

      return new Bindings(widget, widget.element);
    });

    setDescriptions(tmp);

    return () => {
      tmp.forEach((bindings) => {
        if (bindings) bindings.dispose();
      });
    };
  }, [widgets]);

  return descriptions;
}

function compareListOfBindingDescriptions(a, b) {
  if (a === b || (!a && !b)) return true;

  if (!a || !b) return false;

  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; i++) {
    if (!compareBindingDescriptions(a[i], b[i])) return false;
  }

  return true;
}

function useBindingDescriptions(bindingDescriptions) {
  const ref = useRef(null);

  if (!compareListOfBindingDescriptions(ref.current, bindingDescriptions)) {
    ref.current = bindingDescriptions;
  }

  return ref.current;
}

export function useWidgetsBindings(widgets, bindingDescriptions) {
  const bindings = useBindingsForWidgets(widgets);

  if (!bindingDescriptions) {
    bindingDescriptions = [];
  } else if (!Array.isArray(bindingDescriptions)) {
    throw new TypeError('expected list of binding descriptions.');
  }

  if (!Array.isArray(widgets)) throw new TypeError('expected list of widgets.');

  bindingDescriptions = useBindingDescriptions(bindingDescriptions);

  useEffect(() => {
    for (let i = 0; i < bindings.length; i++) {
      const widget = widgets[i];

      if (widget && !widget.isDestructed())
        bindings[i].update(bindingDescriptions[i] || null);
    }
  }, [bindings, widgets, bindingDescriptions]);
}
