# `useWidgetOption`

Returns the value of an aux widget option.

```ts
const value = useWidgetOption(
  widget,
  name,
  (defaultValue = undefined),
  (debounceTime = 0)
);
```

- **`widget`**_`: Widget`_ - The widget to bind to.
- **`name`**_`: string`_ - The option name.
- **`defaultValue`**_`: any`_ - The default value of the state.
- **`debounceTime`**_`: number`_ - Optional debounce time. Defaults
  to `0`.
