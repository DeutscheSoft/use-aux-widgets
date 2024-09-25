import { useEffect } from 'react';
import { subscribeEvents } from './subscribeEvents.js';

export function useWidgetEvents(widget, events) {
  if (widget && widget.isDestructed()) widget = null;

  useEffect(() => {
    const subscriptions = [];

    subscribeEvents(widget, events, subscriptions);

    if (!subscriptions.length) return;

    return () => {
      subscriptions.forEach((cb) => cb());
    };
  }, [widget, events]);
}
