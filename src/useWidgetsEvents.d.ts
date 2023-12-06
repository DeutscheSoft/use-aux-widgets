/**
 * Subscribes to an event in a widget. The widget usually is stored in a state
 * and initialized by setting the `widgetRef` on a component created using
 * `componentFromWidget`.
 *
 * In most situations using `on<EventName>` properties on widgets is a better
 * alternative.
 *
 * @param {Widget[]} widgets
 *      The widget instances.
 * @param {Record<string,function>[]} events
 *      The event handlers to subscribe for each widget.
 */
export function useWidgetsEvents(
    widgets: object[],
    events: (Record<string, Function> | null)[]
  ): void;
