import { hasOwnProperty } from './hasOwnProperty.js';

// Calls removeCb for each property which is in
// a but not in b. Calls addCb for all properties
// which are in b and are not identical to that in a.
export function forEachChangedProperty(a, b, removeCb, addCb) {
  if (a === b) return;
  if (a)
    for (const name in a) {
      if (b && hasOwnProperty(b, name)) continue;
      removeCb(name, a[name]);
    }

  if (b)
    for (const name in b) {
      const value = b[name];
      const prevValue = a ? a[name] : void 0;
      if (prevValue === value) continue;
      addCb(name, value, prevValue);
    }
}
