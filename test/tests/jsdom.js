import 'global-jsdom/register';

// registerBackend uses CustomEvent
// eslint-disable-next-line no-undef
global.CustomEvent = $jsdom.window.CustomEvent;
