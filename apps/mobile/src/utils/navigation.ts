import * as React from 'react';
import { useRouter } from 'expo-router';

/**
 * useSafeBack
 * Returns a memoized handler that attempts to go back if possible; otherwise replaces to a fallback route.
 * Default fallback goes to the home tab.
 */
export const useSafeBack = (fallback: string = '/(tabs)/home') => {
  const router = useRouter();
  return React.useCallback(() => {
    try {
      // router.canGoBack() exists on expo-router; guard for environments where it may be undefined
      // If we can go back in history, prefer that; otherwise replace to a known safe route
      // Also defensively catch any runtime errors and perform a replace to fallback
      // to avoid development-only GO_BACK warnings turning into runtime issues.
      // @ts-ignore - canGoBack is available at runtime, but types may vary across versions
      if (typeof router.canGoBack === 'function' && router.canGoBack()) {
        router.back();
      } else {
        router.replace(fallback);
      }
    } catch (e) {
      router.replace(fallback);
    }
  }, [router, fallback]);
};

/**
 * goHome
 * Convenience helper to jump to home tab explicitly.
 */
export const goHome = () => {
  const router = useRouter();
  router.replace('/(tabs)/home');
};

export default useSafeBack;
