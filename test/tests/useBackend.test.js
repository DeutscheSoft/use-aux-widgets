import renderHook from './renderHook.js';
import { getBackend } from '@deutschesoft/awml/src/backends.js';
import { useBackend } from './src/useBackend.js';
import assert, { strictEqual, throws } from 'node:assert';
import { BackendMock } from './BackendMock.js';
import test from 'node:test';
import delay from './delay.js';

const reconnectTimeout = 50;

test('useBackend', async () => {
  renderHook(() => {
    throws(() => useBackend());
  });

  {
    const { result, unmount } = renderHook(() => useBackend('foobar'));
    strictEqual(result.current[0], null);
    strictEqual(typeof result.current[1], 'function');
    strictEqual(getBackend('foobar'), void 0);
    unmount();
  }

  {
    let foobarB;
    const factory = () => {
      foobarB = new BackendMock(true);
      return foobarB;
    };
    const { result, unmount } = renderHook(() => useBackend('foobar', factory));

    strictEqual(result.current[0], foobarB);
    strictEqual(getBackend('foobar'), foobarB);

    unmount();
    strictEqual(getBackend('foobar'), void 0);
  }

  // Test a backend which is closed on first run
  {
    let lastError = null;
    const onError = (err) => {
      lastError = err;
      if (err.message === 'Backend closed after create.') return;
      console.error(err);
    };
    let foobarB;
    let fail = true;
    const factory = () => {
      foobarB = new BackendMock(true);
      if (fail) {
        foobarB.triggerError(new Error('hello'));
      }
      return foobarB;
    };
    const { result, unmount, rerender } = renderHook(() =>
      useBackend('foobar', factory, reconnectTimeout, onError)
    );

    strictEqual(result.current[0], null);
    strictEqual(getBackend('foobar'), void 0);
    assert(lastError !== null);
    lastError = null;

    fail = false;
    // The first connect failed, will reconnect after 500+200 ms
    await delay(reconnectTimeout * 1.4 + 20);
    strictEqual(lastError, null);
    rerender();
    strictEqual(result.current[0], foobarB);
    strictEqual(getBackend('foobar'), foobarB);

    unmount();
    strictEqual(getBackend('foobar'), void 0);
  }

  {
    let lastError = null;
    const onError = (err) => {
      lastError = err;
      if (err.message === 'hello') return;
      console.error(err);
    };
    let foobarB;
    let fail = true;
    const factory = () => {
      if (fail) throw new Error('hello');
      foobarB = new BackendMock(true);
      return foobarB;
    };
    const { result, unmount, rerender } = renderHook(() =>
      useBackend('foobar', factory, reconnectTimeout, onError)
    );

    strictEqual(result.current[0], null);
    strictEqual(getBackend('foobar'), void 0);
    assert(lastError !== null);
    lastError = null;

    fail = false;
    // The first connect failed, will reconnect after 500+200 ms
    await delay(reconnectTimeout * 1.4 + 20);
    strictEqual(lastError, null);
    rerender();
    strictEqual(result.current[0], foobarB);
    strictEqual(getBackend('foobar'), foobarB);

    unmount();
    strictEqual(getBackend('foobar'), void 0);
  }

  // Check that close or error reconnect
  {
    let lastError = null;
    const onError = (err) => {
      lastError = err;
      if (err.message === 'hello') return;
      console.error(err);
    };
    let foobarB;
    const factory = () => {
      foobarB = new BackendMock(true);
      return foobarB;
    };
    const { result, unmount, rerender } = renderHook(() =>
      useBackend('foobar', factory, reconnectTimeout, onError)
    );

    strictEqual(result.current[0], foobarB);
    strictEqual(getBackend('foobar'), foobarB);

    foobarB.close();
    // will reconnect after 500 ms
    await delay(reconnectTimeout + 20);
    rerender();
    assert(foobarB.isOpen);
    strictEqual(result.current[0], foobarB);
    strictEqual(getBackend('foobar'), foobarB);

    const err = new Error('hello');

    foobarB.triggerError(err);
    strictEqual(lastError, err);
    lastError = null;
    await delay(550);
    strictEqual(lastError, null);
    rerender();
    assert(foobarB.isOpen);
    strictEqual(result.current[0], foobarB);
    strictEqual(getBackend('foobar'), foobarB);

    unmount();
    strictEqual(getBackend('foobar'), void 0);
  }

  // Check that reconnect can be triggered
  {
    let lastError = null;
    const onError = (err) => {
      lastError = err;
      if (err.message === 'hello') return;
      console.error(err);
    };
    let foobarB;
    const factory = () => {
      foobarB = new BackendMock(true);
      return foobarB;
    };
    const { result, unmount, rerender } = renderHook(() =>
      useBackend('foobar', factory, reconnectTimeout, onError)
    );

    strictEqual(result.current[0], foobarB);
    strictEqual(getBackend('foobar'), foobarB);

    foobarB.close();
    result.current[1]();
    // will reconnect after 0 ms
    await delay(5);
    rerender();
    assert(foobarB.isOpen);
    strictEqual(result.current[0], foobarB);
    strictEqual(getBackend('foobar'), foobarB);

    const err = new Error('hello');

    foobarB.triggerError(err);
    strictEqual(lastError, err);
    lastError = null;
    await delay(reconnectTimeout + 20);
    strictEqual(lastError, null);
    rerender();
    assert(foobarB.isOpen);
    strictEqual(result.current[0], foobarB);
    strictEqual(getBackend('foobar'), foobarB);

    unmount();
    strictEqual(getBackend('foobar'), void 0);
  }
});
