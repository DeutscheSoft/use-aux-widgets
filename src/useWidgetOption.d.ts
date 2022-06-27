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
export function useWidgetOption<T>(
  widget,
  name: string,
  defaultValue: T,
  debounce?: number): T;
