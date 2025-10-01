// Must be first import for Android to avoid gesture-handler native crash
import 'react-native-gesture-handler';
// Suppress noisy redbox overlay via patched metro runtime; avoid deprecated deep imports.

import 'react-native-url-polyfill/auto';
import './src/__create/polyfills';
global.Buffer = require('buffer').Buffer;

import 'expo-router/entry';
import { SplashScreen } from 'expo-router';
import { App } from 'expo-router/build/qualified-entry';
import { type ReactNode } from 'react';
import { AppRegistry, LogBox } from 'react-native';
import { serializeError } from 'serialize-error';
import { DeviceErrorBoundaryWrapper } from './__create/DeviceErrorBoundary';
import { ErrorBoundaryWrapper, SharedErrorBoundary } from './__create/SharedErrorBoundary';

// Keep logs visible; we can still reduce noise if needed
LogBox.ignoreLogs([]);

function WrapperComponentProvider({ children }: { children: ReactNode }) {
  return <DeviceErrorBoundaryWrapper>{children}</DeviceErrorBoundaryWrapper>;
}

AppRegistry.setWrapperComponentProvider(() => WrapperComponentProvider);
