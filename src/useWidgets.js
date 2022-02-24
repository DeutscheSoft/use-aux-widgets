import { useMemo, useRef, useEffect } from 'react';
import { forEachChangedProperty } from './forEachChangedProperty.js';

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
  const widgets = useMemo(
    () => optionsRef.current.map((options) => new Widget(options)),
    [ Widget ]
  );

  const updateCount = Math.min(options.length, widgets.length);
  const currentOptions = optionsRef.current;

  for (let i = 0; i < updateCount; i++) {
    const widget = widgets[i];

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

  if (updateCount < widgets.length) {
    for (let i = updateCount; i < widgets.length; i++) {
      widgets[i].destroy();
    }
    widgets.length = updateCount;
  } else if (updateCount < options.length) {
    widgets.length = options.length;
    for (let i = updateCount; i < options.length; i++) {
      widgets[i] = new Widget(options[i]);
    }
  }

  optionsRef.current = options;

  useEffect(() => {
    return () => {
      widgets.forEach((widget) => widget.destroy());
    };
  }, [ widgets ]);
}
