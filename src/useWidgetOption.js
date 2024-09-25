import { useEffect } from 'react';
import { useDebouncedState } from './useDebouncedState.js';

/**
 * Returns the value of an aux widget option.
 *
 * @param {Widget|null} widget
 *      The aux widget.
 *
 * @param {string} name
 *      The option name.
 *
 * @param {defaultValue} [defaultValue]
 *      The default value of the state. This is only used when called
 *      with `widget` equal to `null`.
 *
 * @param {number} [debounce=0]
 *      Debounces the state by the given number of milliseconds. It will make
 *      sure that the state changes not more than every `debounce`
 *      milliseconds.
 *
 * @returns
 *      Returns the value of the option or `defaultValue` if `widget` is `null`.
 */
export function useWidgetOption(widget, name, defaultValue, debounce = 0) {
  if (widget && widget.isDestructed()) widget = null;

  const [value, setValue] = useDebouncedState(
    debounce,
    widget ? widget.get(name) : defaultValue
  );

  useEffect(() => {
    if (!widget || widget.isDestructed()) return;

    setValue(widget.get(name));

    return widget.subscribe('set_' + name, (value) => {
      setValue(value);
    });
  }, [widget, name, setValue]);

  return value;
}
