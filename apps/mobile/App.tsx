import React, { memo } from 'react';
import { App as ExpoRouterApp } from 'expo-router/build/qualified-entry';
import { ErrorBoundaryWrapper } from './__create/SharedErrorBoundary';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Toaster } from 'sonner-native';

// Native entry: keep it minimal and avoid any window/web-only APIs
const Wrapper = memo(() => (
  <ErrorBoundaryWrapper>
    <SafeAreaProvider>
      <ExpoRouterApp />
      <Toaster />
    </SafeAreaProvider>
  </ErrorBoundaryWrapper>
));

export default function App() {
  return <Wrapper />;
}
// web-only imports remain in App.web.tsx (excluded)
