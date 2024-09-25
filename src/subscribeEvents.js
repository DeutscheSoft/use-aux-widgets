export function subscribeEvents(widget, events, subscriptions) {
  if (!widget || widget.isDestructed()) return;
  if (!events) return;

  for (const eventName in events) {
    const callback = events[eventName];

    if (!callback) continue;

    subscriptions.push(widget.subscribe(eventName, callback));
  }
}
