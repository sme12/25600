import { useCallback, useSyncExternalStore } from 'react';
import { readTheme } from '#/lib/theme';
import type { Theme } from '#/lib/theme';

export function useTheme(): Theme {
  const subscribe = useCallback((onChange: () => void) => {
    const observer = new MutationObserver(onChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => observer.disconnect();
  }, []);
  return useSyncExternalStore(subscribe, readTheme);
}
