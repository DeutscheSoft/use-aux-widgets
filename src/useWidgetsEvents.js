import { useEffect } from 'react';
import { subscribeEvents } from './subscribeEvents.js';

export function useWidgetsEvents(widgets, events) {
  useEffect(() => {
    const subscriptions = [];

    if (!widgets) widgets = [];
    if (!events) events = [];

    const length = Math.min(widgets.length, events.length);

    for (let i = 0; i < length; i++) {
      subscribeEvents(widgets[i], events[i], subscriptions);
    }

    return () => {
      subscriptions.forEach((cb) => cb());
    };
  }, [widgets, events]);
}
