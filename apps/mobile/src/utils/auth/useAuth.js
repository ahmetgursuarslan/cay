import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useCallback, useEffect, useMemo } from 'react';
import { create } from 'zustand';
import { Modal, View } from 'react-native';
import { useAuthModal, useAuthStore, authKey } from './store';


/**
 * This hook provides authentication functionality.
 * It may be easier to use the `useAuthModal` or `useRequireAuth` hooks
 * instead as those will also handle showing authentication to the user
 * directly.
 */
export const useAuth = () => {
  const { isReady, auth, setAuth } = useAuthStore();
  const { isOpen, close, open } = useAuthModal();

  const initiate = useCallback(() => {
    let didSet = false;
    const finish = (stored) => {
      if (didSet) return;
      didSet = true;
      try {
        const parsed = stored ? JSON.parse(stored) : null;
        useAuthStore.setState({ auth: parsed, isReady: true });
      } catch (_) {
        useAuthStore.setState({ auth: null, isReady: true });
      }
    };

    // Fallback timeout so UI never blocks if SecureStore hangs
    const timeout = setTimeout(() => finish(null), 1500);
    SecureStore.getItemAsync(authKey)
      .then((auth) => finish(auth))
      .catch(() => finish(null))
      .finally(() => clearTimeout(timeout));
  }, []);

  useEffect(() => {}, []);

  const signIn = useCallback(() => {
    open({ mode: 'signin' });
  }, [open]);
  const signUp = useCallback(() => {
    open({ mode: 'signup' });
  }, [open]);

  const signOut = useCallback(() => {
    setAuth(null);
    close();
  }, [close]);

  return {
    isReady,
    isAuthenticated: isReady ? !!auth : null,
    signIn,
    signOut,
    signUp,
    auth,
    setAuth,
    initiate,
  };
};

/**
 * This hook will automatically open the authentication modal if the user is not authenticated.
 */
export const useRequireAuth = (options) => {
  const { isAuthenticated, isReady } = useAuth();
  const { open } = useAuthModal();

  useEffect(() => {
    if (!isAuthenticated && isReady) {
      open({ mode: options?.mode });
    }
  }, [isAuthenticated, open, options?.mode, isReady]);
};

export default useAuth;