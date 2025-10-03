// Order‑sensitive core imports (must stay at top)
import 'react-native-gesture-handler';
import 'react-native-url-polyfill/auto';
import './src/__create/polyfills';
// Provide Buffer polyfill for libs expecting Node
// @ts-ignore
global.Buffer = require('buffer').Buffer;

// Early crash surfacing before any navigation mounts
import { installCrashSniffer } from './src/safety/CrashSniffer';
installCrashSniffer();

// Central feature flag: keep expo-router disabled until white‑screen root cause resolved.
// Switch to true, then re-run app to test minimal router reinstatement.
const USE_EXPO_ROUTER = true;

// When eventually re‑enabling router, we keep these env hints (non-standard app root & sync import)
if (USE_EXPO_ROUTER) {
  (process as any).env.EXPO_ROUTER_APP_ROOT = './src/app';
  (process as any).env.EXPO_ROUTER_IMPORT_MODE = 'sync';
  require('expo-router/entry');
} else {
  // Clean production manual navigation entry (no diagnostic placeholder UI)
  const { registerRootComponent } = require('expo');
  const AppManual = require('./src/manual/AppManual').default;
  registerRootComponent(AppManual);
}
