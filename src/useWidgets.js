import { useState, useRef, useEffect } from 'react';
import { forEachChangedProperty } from './forEachChangedProperty.js';

function createWidget(Widget, options) {
  return new Widget(Object.assign({}, options));
}

/**
 * Creates a list of widgets from the given options.
 *
 * @param {Function} Widget
 *      The widget implementation to create widgets from.
 * @param {Object[]} options
 *      The list of options to create widgets from.
 */
export function useWidgets(Widget, options) {
  const optionsRef = useRef(options);
  const widgetsRef = useRef([]);
  const [ widgets, setWidgets ] = useState(widgetsRef.current);

  // Create or destroy widgets based on the length of options and update
  // options if they changed.
  useEffect(() => {
    const currentOptions = optionsRef.current;
    let widgets = widgetsRef.current;
    const updateCount = Math.min(options.length, widgets.length);

    if (options.length !== widgets.length || widgets.some((widget) => !(widget instanceof Widget))) {
      // create a copy
      widgets = widgets.slice(0);
    }

    for (let i = 0; i < updateCount; i++) {
      const widget = widgets[i];
      if (!(widget instanceof Widget)) {
        widget.destroy();
        widgets[i] = createWidget(Widget, options[i]);
      } else {
        forEachChangedProperty(
          currentOptions[i],
          options[i],
          (name) => {
            widget.reset(name);
          },
          (name, value, prevValue) => {
            widget.set(name, value);
          }
        );
      }
    }

    if (updateCount < widgets.length) {
      for (let i = updateCount; i < widgets.length; i++) {
        widgets[i].destroy();
      }
      widgets.length = updateCount;
    } else if (updateCount < options.length) {
      widgets.length = options.length;
      for (let i = updateCount; i < options.length; i++) {
        widgets[i] = new Widget(Object.assign({}, options[i]));
      }
    }

    optionsRef.current = options;

    if (widgetsRef.current !== widgets) {
      widgetsRef.current = widgets;
      setWidgets(widgets);
    }
  }, [ Widget, options, setWidgets ]);

  useEffect(() => {
    return () => {
    };
  }, []);

  return widgets;
}
