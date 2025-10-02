import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';

const settingsKey = `${process.env.EXPO_PUBLIC_PROJECT_GROUP_ID}-settings`;

const defaultState = {
  profile: { firstName: '', lastName: '', bio: '' },
  contact: { email: '', phone: '' },
  notifications: { push: true, email: false, sound: true, vibrate: true },
  appearance: { theme: 'system' }, // 'system' | 'light' | 'dark'
  language: 'tr',
  isReady: false,
};

export const useSettingsStore = create((set, get) => ({
  ...defaultState,
  init: async () => {
    try {
      const raw = await SecureStore.getItemAsync(settingsKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        set({ ...defaultState, ...parsed, isReady: true });
        return;
      }
    } catch (e) {
      // ignore and fall back to defaults
    }
    set({ ...defaultState, isReady: true });
  },
  save: async (partial) => {
    const next = { ...get(), ...partial };
    // omit functions and non-serializable
    const serializable = {
      profile: next.profile,
      contact: next.contact,
      notifications: next.notifications,
      appearance: next.appearance,
      language: next.language,
    };
    await SecureStore.setItemAsync(settingsKey, JSON.stringify(serializable));
    set(partial);
  },
}));
