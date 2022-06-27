/**
 * A state which is is true if the given widget is currently
 * interacted with. For example, it will be true while the user drags the handle
 * of an aux Fader widget.
 *
 * @param {Widget} widget
 * @param {number} [debounce=0]
 *      Passed to `useWidgetOption`.
 *
 * @returns {boolean}
 *      Returns true while the widget is interacted with.
 */
export function useWidgetInteraction(widget, debounce?: number): boolean;
