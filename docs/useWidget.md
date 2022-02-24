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
- **`options`**_`{ [name: string]: any }`_ - The options of the widget.
