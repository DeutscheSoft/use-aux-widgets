export class WidgetMock {
  constructor(options) {
    this.element = {};
    this.options = { ...options };
    this.eventHandlers = new Map();
  }

  set(key, value) {
    this.options[key] = value;
  }

  get(key) {
    return this.options[key];
  }

  reset(key) {
    delete this.options[key];
  }

  destroy() {
    this.options = null;
    this.eventHandlers = null;
  }

  isDestructed() {
    return this.options === null;
  }

  subscribe(eventName, callback) {
    const eventHandlers = this.eventHandlers;
    let handlers = eventHandlers.get(eventName);
    
    if (!handlers) {
      eventHandlers.set(eventName, handlers = new Set());
    }

    handlers.add(callback);

    return () => {
      handlers.delete(callback);
    };
  }

  emit(eventName, ...args) {
    const eventHandlers = this.eventHandlers;
    const handlers = eventHandlers.get(eventName);

    if (!handlers)
      return;

    handlers.forEach((cb) => {
      cb.apply(this, args);
    });
  }


}
