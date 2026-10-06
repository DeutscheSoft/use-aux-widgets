# Overview

`use-aux-widgets` connects [`aux-widgets`](https://github.com/DeutscheSoft/aux-widgets)
to React. Widgets have their own lifecycle (they are created, drawn, and
destroyed), and so do bindings and event subscriptions. The hooks and
components in this library tie all of these to the React lifecycle so that you
do not have to manage them manually.

The list below shows which function to use for which task. Most applications
only need the first few entries.

- Show a widget in your UI: [`componentFromWidget`](./componentFromWidget.md)
- Set widget options: properties on the component
- React to widget events: `on<Event>` properties on the component
- Connect a widget option to data: `$` binding properties on the component
- Create a widget which is not in the JSX:
  [`useWidget`](./useWidget.md) with
  [`useWidgetBinding`](./useWidgetBinding.md)
- Subscribe to events of a widget you hold a reference to:
  [`useWidgetEvent`](./useWidgetEvent.md)

## 1. Widgets as components

Create a component once for each widget type (usually at module level, or in
`useMemo` if it depends on props) using
[`componentFromWidget`](./componentFromWidget.md) and use it like any other
React component.

```jsx
import { componentFromWidget } from '@deutschesoft/use-aux-widgets';
import { Fader } from '@deutschesoft/aux-widgets/src/index.pure.js';

const FaderComponent = componentFromWidget(
  Fader,
  // Bindings: makes the `value$` property available.
  { value$: { name: 'value' } },
  // Default options.
  { min: -96, max: 6 },
  // Default class name.
  'my-fader'
);

function Channel({ gain$, onMute }) {
  return <FaderComponent value$={gain$} onUseraction={onMute} />;
}
```

The widget is created when the component mounts, updated when its properties
change, and destroyed when it unmounts. Bindings and event subscriptions are
cleaned up with it.

- **Options** are properties with the same name as the widget option. Defaults
  given to `componentFromWidget` apply unless a property overrides them, e.g.
  `<FaderComponent max={12} />`. The default class name is kept when a
  `className` property is added.
- **Events** are `on<Event>` properties (`onUseraction` subscribes to
  `useraction`). The handler can change on every render, so inline functions
  are fine.
- **Bindings** are `$` properties. They keep a widget option and a data source
  (an AWML `DynamicValue` or any [`WritableValue`](./valueTypes.md)) in sync in
  both directions. Prefer them over copying values into React state and back
  into options.

This covers most use cases.

## 2. Data

Data sources are usually implemented by your application. Anything with a
`subscribe()` (and `set()` for two-way bindings) method works, see
[`ReadableValue` and `WritableValue`](./valueTypes.md). Pass them down as props
and bind them to widgets (see above). You only need
[`useDynamicValue`](./useDynamicValue.md) or
[`useDynamicValueReadonly`](./useDynamicValueReadonly.md) when React itself
needs the value, for example to render it as text.

If your application uses AWML backends, [`useBackend`](./useBackend.md) and
[`useBackends`](./useBackends.md) manage their connection lifecycle, including
reconnecting. Many applications do not need them.

## 3. Widgets outside of the JSX tree

Some widgets are not rendered by React but are passed to another widget, for
example the bands of an equalizer. For those use:

- [`useWidget`](./useWidget.md) (or [`useWidgets`](./useWidgets.md) for lists)
  to create and own the widget.
- [`useWidgetBinding`](./useWidgetBinding.md) (or
  [`useWidgetsBindings`](./useWidgetsBindings.md)) to bind its options.
- [`useWidgetsWithBindingsAndEvents`](./useWidgetsWithBindingsAndEvents.md) to
  do all of this for a list at once.

The hooks create the widget and destroy it again; never destroy these widgets
yourself.

## 4. Events on widgets you hold a reference to

If you need to subscribe to a widget which is not directly in your component,
get a reference through the `widgetRef` property of a component created with
`componentFromWidget` and subscribe using
[`useWidgetEvent`](./useWidgetEvent.md) (or
[`useWidgetEvents`](./useWidgetEvents.md)). The subscription is removed
automatically when the widget or the component goes away. Whenever an `on<Event>`
property can do the job, use that instead.

## Where to go next

Each function in the [README](../README.md#usage) has its own reference page
with details on its arguments and behavior.
