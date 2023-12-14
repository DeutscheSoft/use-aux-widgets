import './jsdom.js';
import { renderHook } from '@testing-library/react';
import { StrictMode } from 'react';

export default function myRenderHook(hook) {
  const result = renderHook(
    hook,
    {
      wrapper: StrictMode
    });

  const rerender = (options) => {
    return result.rerender({ children: null, ...(options||{}) });
  };

  return {
    ...result,
    rerender
  };
}
