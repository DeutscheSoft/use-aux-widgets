# `useWidgetsEvents`

Subscribes to a list of events in a list of widgets widget. The widgets are usually returned
by a call to [`useWidgets`](./useWidgets.md).

```ts
useWidgetsEvents(widgets, events) 
```

- **`widgets`**_`: Widget[]`_ - The widget instances.
- **`events`**_`: Record<string,function>[]`_ - The events and callbacks to subscribe to for each widget.
