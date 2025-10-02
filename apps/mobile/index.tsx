// Must be first import for Android to avoid gesture-handler native crash
import 'react-native-gesture-handler';
// Polyfills and globals
import 'react-native-url-polyfill/auto';
import './src/__create/polyfills';
// @ts-ignore
global.Buffer = require('buffer').Buffer;

// Standard Expo Router entry
import 'expo-router/entry';
