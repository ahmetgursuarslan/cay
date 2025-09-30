import { jsx as _jsx } from "react/jsx-runtime";
import React, { useCallback, useEffect } from 'react';
import { SharedErrorBoundary, Button } from './SharedErrorBoundary';
import * as Updates from 'expo-updates';
import { SplashScreen } from 'expo-router/build/exports';
import { Platform, View } from 'react-native';
import { reportErrorToRemote } from './report-error-to-remote';
const DeviceErrorBoundary = ({ sentLogs, }) => {
    useEffect(() => {
        SplashScreen.hideAsync().catch(() => { });
    }, []);
    const handleReload = useCallback(async () => {
        if (Platform.OS === 'web') {
            window.location.reload();
            return;
        }
        Updates.reloadAsync().catch((error) => {
            // no-op, we don't want to show an error here
        });
    }, []);
    return (_jsx(SharedErrorBoundary, { isOpen: true, description: sentLogs
            ? 'It looks like an error occurred while trying to use your app. This error has been reported to the AI agent and should be visible to the AI soon. If it is not present please see create.xyz/docs for help'
            : 'It looks like an error occurred while trying to use your app. Please see create.xyz/docs for help', children: _jsx(View, { style: { flexDirection: 'row', gap: 8 }, children: _jsx(Button, { color: "primary", onPress: handleReload, children: "Restart app" }) }) }));
};
export class DeviceErrorBoundaryWrapper extends React.Component {
    state = { hasError: false, error: null, sentLogs: false };
    static getDerivedStateFromError(error) {
        return { hasError: true, error, sentLogs: false };
    }
    componentDidCatch(error, errorInfo) {
        this.setState({ error });
        reportErrorToRemote({ error })
            .then(({ success, error: fetchError }) => {
            this.setState({ hasError: true, sentLogs: success });
        })
            .catch((reportError) => {
            this.setState({ hasError: true, sentLogs: false });
        });
    }
    render() {
        if (this.state.hasError) {
            return _jsx(DeviceErrorBoundary, { sentLogs: this.state.sentLogs });
        }
        return this.props.children;
    }
}
