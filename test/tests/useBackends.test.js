import renderHook from './renderHook.js';
import { getBackend } from '@deutschesoft/awml/src/backends.js';
import { useBackends } from './src/useBackends.js';
import assert, { deepEqual, strictEqual } from 'node:assert';
import { BackendMock } from './BackendMock.js';
import test from 'node:test';

test('useBackends', async () => {
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
    strictEqual(getBackend('foobar'), foobarB);

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
    strictEqual(getBackend('foobar'), void 0);

    foobarB.triggerOpen();
    rerender();
    strictEqual(result.current.foobar.backend, foobarB);
    strictEqual(getBackend('foobar'), foobarB);

    unmount();

    strictEqual(getBackend('foobar'), void 0);
  }
});
