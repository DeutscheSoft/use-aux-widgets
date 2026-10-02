/**
 * The type of widget arguments.
 *
 * aux-widgets does not (yet) ship TypeScript declarations. Widgets have
 * therefore always been untyped (i.e. `any`) for users of this library. In
 * order to keep supporting this without requiring users to declare types for
 * aux-widgets, this is currently `unknown`: anything can be passed as a widget.
 * Passing `null` or `undefined` is allowed as well. In this case the hooks
 * behave as if no widget was given.
 *
 * Once aux-widgets provides declarations, this type is expected to be replaced
 * by the corresponding widget type.
 */
export type WidgetLike = unknown;
