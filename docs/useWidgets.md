# `useWidgets`

Creates a list of widgets from the given options.

```ts
const widgets = useWidgets(widgetImplementation, options);
```

- **`widgetImplementation`**_`: typeof Widget`_ - A widget implementation to
  create instance for.
- **`options`**_`{ [name: string]: any }[]`_ - An array of options objects.
  For each options object, one widget is created and returned.
- **`widgets`**_`(typeof Widget)[]`_ - The resulting widgets.
