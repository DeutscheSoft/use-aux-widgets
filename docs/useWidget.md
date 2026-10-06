# `useWidget`

Creates a widget with the given options. The widget will be stored
internally inside of a ref and therefore the same object will be returned
on each call.
The options will be updated whenever they change.
This hook is useful for creating e.g. EqBands dynamically.

```ts
const widget = useWidget(widgetImplementation, option);
```

- **`widgetImplementation`**_`: typeof Widget`_ - A widget implementation to
  create an instance for.
- **`options`**_`Record<string,unknown>`_ - The options of the widget.

The widget is created in an effect. The first render therefore returns no widget
(`null` or `undefined`) and the component has to handle that. The hook owns the
widget and destroys it when the component unmounts or when
`widgetImplementation` changes, so do not call `destroy()` yourself. Passing
`options` as an inline object is fine; only changed options are applied.

For a widget which is part of your JSX, use
[`componentFromWidget`](./componentFromWidget.md) instead.
