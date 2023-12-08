import renderHook from './renderHook.js';
import { useBackends } from './src/useBackends.js';
import assert, { deepEqual, strictEqual } from 'node:assert';
import { BackendMock } from './BackendMock.js';
import test from 'node:test';

test('useBackends', () => {
  {
    let options = {
      foobar: { },
    };
    const { result, rerender, unmount } = renderHook(() => useBackends(options));
    deepEqual(result.current, {});

    let foobarB = null;

    options = {
      foobar: {
        factory: () => {
          foobarB = new BackendMock(true);
          return foobarB;
        },
      }
    };
    rerender();
    strictEqual(typeof result.current, 'object');
    strictEqual(typeof result.current.foobar, 'object');
    strictEqual(typeof result.current.foobar.reconnect, 'function');
    strictEqual(result.current.foobar.backend, foobarB);

    options = {};
    rerender();
    deepEqual(result.current, {});
    assert(!foobarB.isOpen);
    assert(!foobarB.isInit);
    foobarB = null;

    options = {
      foobar: {
        factory: () => {
          foobarB = new BackendMock(false);
          return foobarB;
        },
      }
    };
    rerender();
    strictEqual(typeof result.current, 'object');
    strictEqual(typeof result.current.foobar, 'object');
    strictEqual(typeof result.current.foobar.reconnect, 'function');
    strictEqual(result.current.foobar.backend, null);

    foobarB.triggerOpen();
    rerender();
    strictEqual(result.current.foobar.backend, foobarB);

    unmount();
  }
});
