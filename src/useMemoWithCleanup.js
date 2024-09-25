import { useState, useEffect } from 'react';

export function useMemoWithCleanup(callback, dependencies) {
  const [value, setValue] = useState(void 0);

  useEffect(() => {
    const [value, cleanup] = callback();
    setValue(value);
    if (cleanup) return cleanup;
  }, dependencies || []);

  return value;
}
