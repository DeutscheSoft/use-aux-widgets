import renderHook from './renderHook.js';
import { useMemoWithCleanup } from './src/useMemoWithCleanup.js';
import { strictEqual } from 'node:assert';
import test from 'node:test';

test('useMemoWithCleanup', () => {
  {
    let created = 0, removed = 0;
    const create = () => {
      created++;

      return [
        created,
        () => {
          removed++;
        }
      ];
    };
    const { result, rerender, unmount } = renderHook(() => useMemoWithCleanup(create));

    //strictEqual(created, removed+1);
    strictEqual(result.current, created);
    rerender();
    //strictEqual(created, removed+1);
    strictEqual(result.current, created);

    const tmp = created;

    unmount();
    strictEqual(tmp, created);
    strictEqual(created, removed);
  }
});
