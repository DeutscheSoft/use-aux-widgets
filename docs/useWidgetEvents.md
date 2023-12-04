# `useWidgetEvents`

Subscribes to a list of events in a widget. The widget usually is stored in a state
and initialized by setting the `widgetRef` on a component created using
`componentFromWidget`.

In most situations using `on<EventName>` properties on widgets is a better
alternative.

```ts
useWidgetEvents(widget, events) 
```

- **`widget`**_`: Widget`_ - The widget instance.
- **`events`**_`: Record<string,function>`_ - The events and callbacks to subscribe to.
