# `useWidgetEvent`

Subscribes to an event in a widget. The widget usually is stored in a state
and initialized by setting the `widgetRef` on a component created using
`componentFromWidget`.

In most situations using `on<EventName>` properties on widgets is a better
alternative.

```ts
useWidgetEvent(widget, eventName, callback) 
```

- **`widget`**_`: Widget`_ - The widget instance.
- **`eventName`**_`: string`_ - The event to subscribe to.
- **`callback`**_`: function`_ - The event callback.
