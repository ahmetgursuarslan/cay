import { jsx as _jsx } from "react/jsx-runtime";
// Suppress noisy redbox overlay via patched metro runtime; avoid deprecated deep imports.
import 'react-native-url-polyfill/auto';
import './src/__create/polyfills';
global.Buffer = require('buffer').Buffer;
import 'expo-router/entry';
import { App } from 'expo-router/build/qualified-entry';
import { AppRegistry, LogBox } from 'react-native';
import { DeviceErrorBoundaryWrapper } from './__create/DeviceErrorBoundary';
if (__DEV__) {
    LogBox.ignoreAllLogs();
    LogBox.uninstall();
    function WrapperComponentProvider({ children, }) {
        return _jsx(DeviceErrorBoundaryWrapper, { children: children });
    }
    AppRegistry.setWrapperComponentProvider(() => WrapperComponentProvider);
    AppRegistry.registerComponent('main', () => App);
}
