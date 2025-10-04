import React, { memo } from 'react';
import { App as ExpoRouterApp } from 'expo-router/build/qualified-entry';
import { DeviceErrorBoundaryWrapper } from './__create/DeviceErrorBoundary';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Toaster } from 'sonner-native';
import { AuthModal } from './src/utils/auth/useAuthModal';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Native entry: keep it minimal and avoid any window/web-only APIs
const Wrapper = memo(() => (
  <DeviceErrorBoundaryWrapper>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ExpoRouterApp />
        <AuthModal />
        <Toaster />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  </DeviceErrorBoundaryWrapper>
));

export default function App() {
  return <Wrapper />;
}
// web-only imports remain in App.web.tsx (excluded)
