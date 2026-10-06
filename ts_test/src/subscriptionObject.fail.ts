import { useDynamicValueReadonly } from '../../index.js';

// AWML cannot handle subscription objects. They have to be adapted using
// fromSubscribable.
class SubjectLike {
  subscribe(cb: (value: number) => void) {
    return { unsubscribe() {} };
  }
}

export function run(v: SubjectLike) {
  return useDynamicValueReadonly(v);
}
