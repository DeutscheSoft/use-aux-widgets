# `useWidgetEvent`

Subscribes to an event in a widget. The widget usually is stored in a state
and initialized by setting the `widgetRef` on a component created using
`componentFromWidget`.

In most situations using `on<EventName>` properties on widgets is a better
alternative.

```ts
useWidgetEvent(widget, eventName, callback);
```

- **`widget`**_`: Widget`_ - The widget instance.
- **`eventName`**_`: string`_ - The event to subscribe to.
- **`callback`**_`: function`_ - The event callback.

The subscription is removed automatically when the widget, the event name or the
component goes away. The callback does not need to be memoized: it is wrapped
using [`useEventHandler`](./useEventHandler.md), so a new function on each render
does not cause a resubscription and the latest one is always called. `widget`
can be `null` or `undefined` (e.g. before it exists), in which case nothing is
subscribed.
