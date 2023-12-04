interface WidgetType<T> extends Function {
  new (options: object): T;
}

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
export function useWidget<T>(Widget: WidgetType<T>, options: Record<string,unknown>): T;
export function useWidget<T>(Widget: WidgetType<T>): null;
export function useWidget(Widget: null | undefined, options?: Record<string,unknown> | null): null;
