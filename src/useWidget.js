import { useMemo, useRef, useEffect } from 'react';
import { forEachChangedProperty } from './forEachChangedProperty.js';

/**
 * Creates a widget with the given options. The widget will be stored
 * internally inside of a ref and therefore the same object will be returned
 * on each call.
 * The options will be updated whenever they change.
 * This hook is useful for creating e.g. EqBands dynamically.
 *
 * @param {Function} Widget
 *      The widget implementation to create widgets from.
 * @param {Object} options
 *      The options of the widget.
 */
export function useWidget(Widget, options) {
  const optionsRef = useRef(null);
  const widget = useMemo(() => {
    if (!Widget || !options)
      return null;
    optionsRef.current = options;
    return new Widget(options);
  }, [ Widget, !!options ]);

  if (widget) {
    forEachChangedProperty(
      optionsRef.current,
      options,
      (name) => {
        widget.reset(name);
      },
      (name, value, prevValue) => {
        widget.set(name, value);
      }
    );
    optionsRef.current = options;
  }

  return widget;
}
