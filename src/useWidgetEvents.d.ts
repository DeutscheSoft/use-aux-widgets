/**
 * Subscribes to events in a widget. The widget usually is stored in a state
 * and initialized by setting the `widgetRef` on a component created using
 * `componentFromWidget`.
 *
 * @param {Widget} widget
 *      The widget instance.
 * @param {Record<string,function>} events
 *      The event to subscribe to.
 */
export function useWidgetEvents(
    widget,
    events: Record<string, (...args: any[]) => any>
  ): void;
