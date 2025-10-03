
import React, { useEffect, useMemo, useState } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import ErrorBoundary from '@/components/ErrorBoundary';
import BootScreen from '@/components/BootScreen';

// Auth hook (can be mocked via flag below)
const MOCK_AUTH = true; // set true to bypass real auth & avoid white screen
let useAuth;
try {
  if (!MOCK_AUTH) {
    useAuth = require('@/utils/auth/useAuth').useAuth;
  } else {
    useAuth = () => ({ isReady: true, initiate: () => {}, user: { id: 'mock', email: 'demo@example.com', verified: true } });
  }
} catch {
  useAuth = () => ({ isReady: true, initiate: () => {}, user: { id: 'mock', email: 'demo@example.com', verified: true } });
}

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 5 * 60 * 1000, retry: 1, refetchOnWindowFocus: false } }
});

let __FONTS_EVER__ = false;

function AppShell() {
  const { initiate, isReady, user } = useAuth();
  // Skip per-run font gating to avoid blocking touches; assume fonts ok after first load
  const [fontsLoaded] = useFonts({ Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold });
  if (fontsLoaded && !__FONTS_EVER__) __FONTS_EVER__ = true;
  const fontsEffective = true; // force ready rendering
  // When mocking auth we ignore isReady to prevent gating causing white screen
  const ready = useMemo(() => (MOCK_AUTH ? fontsEffective : (isReady && fontsEffective)), [isReady, fontsEffective]);

  useEffect(() => { if (!MOCK_AUTH) { initiate && initiate(); } }, [initiate]);
  useEffect(() => { SplashScreen.preventAutoHideAsync().catch(()=>{}); const t = setTimeout(()=>SplashScreen.hideAsync().catch(()=>{}), 3000); return ()=>clearTimeout(t); }, []);
  useEffect(() => { if (ready) SplashScreen.hideAsync().catch(()=>{}); }, [ready]);
  // Removed font timeout logic; we always proceed.

  if (!ready) return <BootScreen />;

  return (
    <Stack screenOptions={{ headerShown:false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="verify-profile" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="edit-profile" />
      <Stack.Screen name="contact-settings" />
      <Stack.Screen name="privacy-settings" />
      <Stack.Screen name="notification-settings" />
      <Stack.Screen name="theme-settings" />
      <Stack.Screen name="language-settings" />
      <Stack.Screen name="help" />
      <Stack.Screen name="about" />
      <Stack.Screen name="add-review" />
      <Stack.Screen name="logout" />
    </Stack>
  );
}

function TouchLoggerWrapper({ children }) {
  return (
    <GestureHandlerRootView
      style={{ flex:1 }}
      onTouchStart={() => { console.log('[TOUCH] root touch start'); }}
      onResponderGrant={() => { console.log('[TOUCH] responder grant'); }}
    >
      {children}
    </GestureHandlerRootView>
  );
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <TouchLoggerWrapper>
        <ErrorBoundary>
          <AppShell />
        </ErrorBoundary>
      </TouchLoggerWrapper>
    </QueryClientProvider>
  );
}
