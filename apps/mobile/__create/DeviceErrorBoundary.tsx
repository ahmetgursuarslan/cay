// @ts-nocheck
import React, { type ReactNode, useCallback, useEffect, useState } from 'react';
import { SharedErrorBoundary, Button } from './SharedErrorBoundary';
import * as Updates from 'expo-updates';
import { SplashScreen } from 'expo-router/build/exports';
import { DevSettings, LogBox, Platform, View } from 'react-native';
import { serializeError } from 'serialize-error';

type ErrorBoundaryState = { hasError: boolean; error: unknown | null; sentLogs: boolean };

const DeviceErrorBoundary = ({
  sentLogs,
}: {
  sentLogs: boolean;
}) => {
  useEffect(() => {
    SplashScreen.hideAsync().catch(() => {});
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
  return (
    <SharedErrorBoundary
      isOpen
      description={
        sentLogs
          ? 'It looks like an error occurred while trying to use your app. This error has been reported to the AI agent and should be visible to the AI soon. If it is not present please see create.xyz/docs for help'
          : 'It looks like an error occurred while trying to use your app. Please see create.xyz/docs for help'
      }
    >
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <Button color="primary" onPress={handleReload}>Restart app</Button>
      </View>
    </SharedErrorBoundary>
  );
};

export class DeviceErrorBoundaryWrapper extends React.Component<
  { children: ReactNode },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false, error: null, sentLogs: false };

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    return { hasError: true, error, sentLogs: false };
  }
  componentDidCatch(error: unknown, errorInfo: React.ErrorInfo): void {
    this.setState({ error });
    // defer require to avoid TS type resolution issues
    const { reportErrorToRemote } = require('./report-error-to-remote') as {
      reportErrorToRemote: (arg: { error: unknown }) => Promise<{ success: boolean; error?: unknown }>;
    };
    reportErrorToRemote({ error })
      .then(({ success, error: fetchError }: { success: boolean; error?: unknown }) => {
        this.setState({ hasError: true, sentLogs: success });
      })
      .catch((reportError: unknown) => {
        this.setState({ hasError: true, sentLogs: false });
      });
  }

  render() {
    if (this.state.hasError) {
      return <DeviceErrorBoundary sentLogs={this.state.sentLogs} />;
    }
    return this.props.children;
  }
}
