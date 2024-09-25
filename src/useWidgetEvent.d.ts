/**
 * Subscribes to an event in a widget. The widget usually is stored in a state
 * and initialized by setting the `widgetRef` on a component created using
 * `componentFromWidget`.
 *
 * In most situations using `on<EventName>` properties on widgets is a better
 * alternative.
 *
 * @param {Widget} widget
 *      The widget instance.
 * @param {string} eventName
 *      The event to subscribe to.
 * @param {function} callback
 *      The event callback.
 */
export function useWidgetEvent(
  widget: object,
  eventName?: string,
  callback?: Function
): void;
