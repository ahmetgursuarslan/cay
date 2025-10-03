import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';

// GPT5-AUTO-FIX: Guard env access in native/Hermes builds
const groupId = (typeof process !== 'undefined' && process?.env?.EXPO_PUBLIC_PROJECT_GROUP_ID)
  ? process.env.EXPO_PUBLIC_PROJECT_GROUP_ID
  : 'app';
export const authKey = `${groupId}-jwt`;

/**
 * This store manages the authentication state of the application.
 */
export const useAuthStore = create((set) => ({
  isReady: false,
  auth: null,
  setAuth: (auth) => {
    if (auth) {
      SecureStore.setItemAsync(authKey, JSON.stringify(auth));
    } else {
      SecureStore.deleteItemAsync(authKey);
    }
    set({ auth });
  },
}));

/**
 * This store manages the state of the authentication modal.
 */
export const useAuthModal = create((set) => ({
  isOpen: false,
  mode: 'signup',
  open: (options) => set({ isOpen: true, mode: options?.mode || 'signup' }),
  close: () => set({ isOpen: false }),
}));