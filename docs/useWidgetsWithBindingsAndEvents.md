# `useWidgetsWithBindingsAndEvents`

Creates a list of widgets from the given options and installs a list of bindings and events.

```ts
const widgets = useWidgetsWithBindingsAndEvents(
    widgetImplementation,
    options,
    bindings,
    events
);
```

- **`widgetImplementation`**_`: typeof Widget`_ - A widget implementation to
  create instance for.
- **`options`**_`Record<string,unknown>[]`_ - An array of options objects.
  For each options object, one widget is created and returned.
- **`bindings`**_`: (IBindingDescription | IBindingDescription[])[]`_ - The
  description of the binding(s) to create for each widget.
- **`events`**_`: Record<string,function>[]`_ - The events and callbacks to subscribe to for each widget.
- **`widgets`**_`(typeof Widget)[]`_ - The resulting widgets.
